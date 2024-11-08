import { NextResponse } from "next/server";
import { importPengawas } from "@/services/pengawas/service";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    const allowedFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!file) {
      return NextResponse.json(
        { error: "File harus disertakan" },
        { status: 400 }
      );
    }

    if (!allowedFileTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File harus berformat .xlsx" },
        { status: 400 }
      );
    }

    const pengawasData = await importPengawas(file);
    await db.user.createMany({
      data: pengawasData,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: "Import Pengawas Berhasil" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal Import Data" }, { status: 500 });
  }
}
