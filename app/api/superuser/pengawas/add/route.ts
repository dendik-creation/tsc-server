import { createPengawas } from "@/services/pengawas/service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    await createPengawas(body);
    return NextResponse.json({ message: "Pengawas Baru Ditambahkan" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Gagal Menambahkan Data" },
      { status: 500 }
    );
  }
}
