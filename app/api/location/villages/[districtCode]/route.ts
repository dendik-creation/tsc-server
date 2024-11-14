import { LocationID } from "@/app/dashboard/madrasah/profil-madrasah/_components/IdentitasMadrasah";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { districtCode: string } }
) {
  const { districtCode } = params;
  try {
    const { data } = (await axios.get(
      `https://wilayah.id/api/villages/${districtCode}.json`
    )) as { data: { data: LocationID[] } };
    return NextResponse.json(data?.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
