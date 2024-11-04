import { redirect } from "next/navigation";
import { getUserSession } from "@/services/auth/service";

export default async function IndexPage() {
  const userData = await getUserSession();

  const userRole = userData?.userRole || "";

  switch (userRole) {
    case "SUPERUSER":
      redirect("/dashboard/superuser");
      break;
    case "PENGAWAS":
      redirect("/dashboard/pengawas");
      break;
    case "MADRASAH":
      redirect("/dashboard/madrasah");
      break;
    default:
      redirect("/auth/signin");
      break;
  }

  return null;
}
