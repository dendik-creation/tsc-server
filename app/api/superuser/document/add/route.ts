import { createDocument } from "@/services/document/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await createDocument(body);
    return NextResponse.json({
      message: "Persyaratan Dokumen Baru Ditambahkan",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Gagal Menambahkan Data" },
      { status: 500 }
    );
  }
}
