import { getMadrasahAndKepala } from "@/services/madrasah/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { npsn: string } }
) {
  const { npsn } = params;
  try {
    const response = await getMadrasahAndKepala(npsn);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
