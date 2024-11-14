import { updateMadrasahByOperator } from "@/services/madrasah/service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  delete body["id"];
  try {
    await updateMadrasahByOperator(parseInt(id), body);

    return NextResponse.json({ message: "Update Madrasah Berhasil" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal Update Data" }, { status: 500 });
  }
}
