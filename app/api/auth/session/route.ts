import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(request: Request) {
  const target = new URL(request.url).searchParams.get("target");

  if (!target) {
    return NextResponse.json(
      { error: "Parameter 'target' is required" },
      { status: 400 }
    );
  }

  const userSessionToken = cookies().get("user_session")?.value;
  const userAccessToken = cookies().get("user_token")?.value;

  try {
    if (target === "user") {
      if (!userSessionToken) {
        return NextResponse.json(
          { error: "User session not found" },
          { status: 404 }
        );
      }
      const user = jwt.verify(userSessionToken, process.env.JWT_SECRET!);
      return NextResponse.json({ user });
    }

    if (target === "token") {
      if (!userAccessToken) {
        return NextResponse.json(
          { error: "Access token not found" },
          { status: 404 }
        );
      }
      const accessToken = jwt.verify(userAccessToken, process.env.JWT_SECRET!);
      return NextResponse.json({ token: accessToken });
    }

    return NextResponse.json(
      { error: "Invalid target value" },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
