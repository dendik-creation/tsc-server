import { getMadrasahAll } from "@/services/madrasah/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getMadrasahAll();
    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
