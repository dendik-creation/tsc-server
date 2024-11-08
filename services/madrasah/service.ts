import { db } from "@/lib/db";
import { Madrasah, User } from "@prisma/client";
import ExcelJS from "exceljs";
import bcrypt from "bcryptjs";
import { generateRandomString } from "../other";
import { getPengawasSingle } from "../pengawas/service";

export const getMadrasahAll = async () => {
  return await db.madrasah.findMany({
    include: {
      pengawas: true,
    },
  });
};

export const getMadrasahDetail = async (id: number) => {
  return await db.madrasah.findUnique({
    where: {
      id,
    },
    include: {
      pengawas: true,
      staffGuru: true,
      studentCount: {
        orderBy: {
          yearAdded: "desc",
        },
      },
      kepalaMadrasah: true,
      madrasahOperator: true,
      madrasahDocuents: true,
      accreditation: {
        orderBy: {
          accreditationYear: "desc",
        },
      },
    },
  });
};

export const getOperatorSingle = async (id?: number, npsn?: string) => {
  return await db.user.findUnique({
    where: {
      id: id ?? undefined,
      username: npsn ?? undefined,
    },
    select: {
      id: true,
      username: true,
      fullName: true,
      role: true,
    },
  });
};

export const createOperatorMadrasah = async (data: User[] | User) => {
  return await db.user.createMany({
    data,
    skipDuplicates: true,
  });
};

export const createMadrasah = async (data: Madrasah[] | Madrasah) => {
  return await db.madrasah.createMany({
    data,
    skipDuplicates: true,
  });
};

export const updateMadrasah = async (id: number, data: Madrasah) => {
  return await db.madrasah.update({
    where: {
      id,
    },
    data: {
      npsn: data.npsn,
      name: data.name,
      category: data.category,
      pengawasId: data.pengawasId,
    },
  });
};

export const deleteMadrasah = async (npsn: string) => {
  await db.madrasah.delete({
    where: {
      npsn,
    },
  });
  await db.user.delete({
    where: {
      username: npsn,
    },
  });
  return true;
};

export const determineMadrasahCategory = async (madrasahName: string) => {
  const lowerCaseName = madrasahName.toLowerCase().split(" ")[0];

  if (lowerCaseName.includes("ra")) {
    return "ra";
  } else if (lowerCaseName.includes("mi")) {
    return "mi";
  } else if (lowerCaseName.includes("mts")) {
    return "mts";
  } else if (lowerCaseName.includes("ma")) {
    return "ma";
  }

  return undefined;
};

export const importMadrasah = async (file: File): Promise<boolean> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(Buffer.from(buffer));

  const worksheet = workbook.worksheets[0];
  const operatorData: User[] = [];
  const madrasahData: Madrasah[] = [];

  const rows: ExcelJS.Row[] = [];
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber > 1) {
      rows.push(row);
    }
  });

  for (const row of rows) {
    const randPassword = generateRandomString(8);
    // Create Operator IF Not Exist
    const eachOperator = {
      username: row.getCell(4).value?.toString() as string,
      fullName: `Operator ${row.getCell(3).value?.toString() as string}`,
      role: "MADRASAH",
      firstPassword: randPassword,
      password: await bcrypt.hash(randPassword, 10),
    } as User;
    if (
      !operatorData.some(
        (operator) => operator.username === eachOperator.username
      )
    ) {
      operatorData.push(eachOperator);
    }
  }

  // Create In Database
  await createOperatorMadrasah(operatorData);

  for (const row of rows) {
    // Create Madrasah
    const eachMadrasah = {
      npsn: row.getCell(4).value?.toString() as string,
      name: row.getCell(3).value?.toString() as string,
      pengawasId: (
        await getPengawasSingle(
          undefined,
          row.getCell(2).value?.toString() as string
        )
      )?.id as number,
      MadrasahOperatorId: (
        await getOperatorSingle(
          undefined,
          row.getCell(4).value?.toString() as string
        )
      )?.id as number,
      category: (await determineMadrasahCategory(
        row.getCell(3).value?.toString() as string
      )) as string,
    } as Madrasah;
    madrasahData.push(eachMadrasah);
  }

  // Create In Database
  await createMadrasah(madrasahData);

  return true;
};
