import { createKebijakan } from "@/services/kebijakan/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await createKebijakan(body);
    return NextResponse.json({
      message: "Kebijakan Baru Ditambahkan",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Gagal Menambahkan Data" },
      { status: 500 }
    );
  }
}
