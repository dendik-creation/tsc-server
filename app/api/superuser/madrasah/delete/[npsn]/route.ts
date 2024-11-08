import { deleteMadrasah } from "@/services/madrasah/service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { npsn: string } }
) {
  const { npsn } = params;
  try {
    await deleteMadrasah(npsn);

    return NextResponse.json({ message: "Madrasah Berhasil Dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal Hapus Data" }, { status: 500 });
  }
}
