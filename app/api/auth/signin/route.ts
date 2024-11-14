import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { cookies } from "next/headers";

const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedData = signInSchema.safeParse(body);
  if (!parsedData.success) {
    return NextResponse.json(
      { error: parsedData.error.errors },
      { status: 400 }
    );
  }

  const { username, password } = parsedData.data;

  try {
    const user = await db.user.findUnique({
      where: { username },
    });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { error: "Username atau password salah" },
        { status: 401 }
      );
    }

    const userPayload = {
      userId: user.id,
      userName: user.username,
      userRole: user.role,
      fullName: user.fullName,
    };

    const userSession = jwt.sign(userPayload, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    const userToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    await db.session.create({
      data: {
        userId: user.id,
        token: userToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    };
    cookies().set("user_session", userSession, cookieOptions);
    cookies().set("user_token", userToken, cookieOptions);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
