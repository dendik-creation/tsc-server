import { NextResponse } from "next/server";
import axios from "axios";
import { LocationID } from "@/app/dashboard/madrasah/profil-madrasah/_components/IdentitasMadrasah";

export async function GET() {
  const KUDUS_CITYCODE = "33.19";
  try {
    const { data } = (await axios.get(
      `https://wilayah.id/api/districts/${KUDUS_CITYCODE}.json`
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
