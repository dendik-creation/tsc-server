import { getDocumentAll } from "@/services/document/service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getDocumentAll();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
