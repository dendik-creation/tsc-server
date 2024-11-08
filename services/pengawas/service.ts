import { db } from "@/lib/db";
import ExcelJS from "exceljs";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { generateRandomString } from "@/services/other";
export const getPengawasAll = async () => {
  return await db.user.findMany({
    where: {
      role: "PENGAWAS",
    },
    select: {
      id: true,
      username: true,
      fullName: true,
      pangkat: true,
      jabatan: true,
      role: true,
      pengawasMadrasah: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getPengawasSingle = async (id?: number, nip?: string) => {
  return await db.user.findUnique({
    where: {
      id: id ?? undefined,
      username: nip ?? undefined,
    },
    select: {
      id: true,
      username: true,
      fullName: true,
      pangkat: true,
      jabatan: true,
      role: true,
    },
  });
};

export const createPengawas = async (pengawas: User) => {
  return await db.user.create({
    data: {
      ...pengawas,
      role: "PENGAWAS",
      firstPassword: generateRandomString(8),
      password: await bcrypt.hash(generateRandomString(8), 10),
    },
  });
};

export const updatePengawas = async (id: number, data: User) => {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      username: data.username,
      fullName: data.fullName,
      pangkat: data.pangkat,
      jabatan: data.jabatan,
    },
  });
};

export const deletePengawas = async (id: number) => {
  return await db.user.delete({
    where: {
      id,
    },
  });
};

export const importPengawas = async (file: File): Promise<User[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(buffer));

  const worksheet = workbook.worksheets[0];
  const pengawasData: User[] = [];

  const rows: ExcelJS.Row[] = [];
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 1) {
      rows.push(row);
    }
  });

  for (const row of rows) {
    const randPassword = generateRandomString(8);
    const eachPengawas = {
      username: row.getCell(2).value as string,
      fullName: row.getCell(3).value as string,
      pangkat: row.getCell(4).value as string,
      jabatan: row.getCell(5).value as string,
      role: "PENGAWAS",
      firstPassword: randPassword,
      password: await bcrypt.hash(randPassword, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    pengawasData.push(eachPengawas as User);
  }

  return pengawasData;
};
