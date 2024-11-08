import {
  createMadrasah,
  createOperatorMadrasah,
  getOperatorSingle,
} from "@/services/madrasah/service";
import { generateRandomString } from "@/services/other";
import { Madrasah, User } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const body = (await request.json()) as Madrasah;
  try {
    const password = generateRandomString(8);
    const operator: User = {
      username: body.npsn,
      fullName: `Operator ${body.name}`,
      role: "MADRASAH",
      firstPassword: password,
      password: await bcrypt.hash(password, 10),
    } as User;
    await createOperatorMadrasah(operator as User);
    const madrasah: Madrasah = {
      ...body,
      MadrasahOperatorId: (await getOperatorSingle(undefined, body.npsn))
        ?.id as number,
    } as Madrasah;
    await createMadrasah(madrasah as Madrasah);

    return NextResponse.json({ message: "Madrasah Baru Ditambahkan" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Gagal Menambahkan Data" },
      { status: 500 }
    );
  }
}
