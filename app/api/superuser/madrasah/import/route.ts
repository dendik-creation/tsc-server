import { NextResponse } from "next/server";
import { importMadrasah } from "@/services/madrasah/service";

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

    if (await importMadrasah(file)) {
      return NextResponse.json({
        message: "Madrasah & Operatornya berhasil dibuat",
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal Import Data" }, { status: 500 });
  }
}
