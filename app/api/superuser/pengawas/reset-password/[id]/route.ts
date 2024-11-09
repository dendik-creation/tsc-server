import { resetPassword } from "@/services/other";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { password } = await request.json();
  try {
    await resetPassword(parseInt(id), password as string);

    return NextResponse.json({ message: "Reset Password Berhasil" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Gagal Reset Password" },
      { status: 500 }
    );
  }
}
