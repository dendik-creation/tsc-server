import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("user_token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Token tidak ditemukan" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = (decoded as { userId: number }).userId;

    await db.session.deleteMany({
      where: { userId: userId },
    });

    const res = NextResponse.json({ message: "Sign out berhasil" });

    res.cookies.delete("user_session");
    res.cookies.delete("user_token");

    return res;
  } catch (error) {
    console.error("Error during sign out:", error);
    return NextResponse.json(
      { error: "Token tidak valid atau sudah kadaluarsa" },
      { status: 401 }
    );
  }
}
