import { deletePengawas } from "@/services/pengawas/service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await deletePengawas(parseInt(id));

    return NextResponse.json({ message: "Hapus Pengawas Berhasil" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal Hapus Data" }, { status: 500 });
  }
}
