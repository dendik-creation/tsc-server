import { updateDocument } from "@/services/document/service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();
  try {
    await updateDocument(parseInt(id), body);

    return NextResponse.json({
      message: "Update Persyaratan Dokumen Berhasil",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal Update Data" }, { status: 500 });
  }
}
