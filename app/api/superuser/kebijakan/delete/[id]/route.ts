import { deleteKebijakan } from "@/services/kebijakan/service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await deleteKebijakan(parseInt(id));

    return NextResponse.json({ message: "Hapus Kebijakan Berhasil" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal Hapus Data" }, { status: 500 });
  }
}
