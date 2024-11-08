import { deleteDocument } from "@/services/document/service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    await deleteDocument(parseInt(id));

    return NextResponse.json({ message: "Hapus Persyaratan Dokumen Berhasil" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal Hapus Data" }, { status: 500 });
  }
}
