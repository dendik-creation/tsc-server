import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(buffer));

  const worksheet = workbook.worksheets[0];
  const data = [];

  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 1) {
      const rowData = {
        pengawasId: row.getCell(1).value,
        MadrasahOperatorId: row.getCell(2).value,
        npsn: row.getCell(3).value,
        name: row.getCell(4).value,
      };
      data.push(rowData);
    }
  });

  try {
    await db.madrasah.createMany({
      data,
      skipDuplicates: true, // Option to skip duplicate entries
    });

    return NextResponse.json({ message: "Data imported successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to import data" },
      { status: 500 }
    );
  }
}
