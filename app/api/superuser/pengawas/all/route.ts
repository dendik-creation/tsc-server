import { getPengawasAll } from "@/services/pengawas/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await getPengawasAll();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
