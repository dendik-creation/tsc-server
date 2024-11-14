"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/context/UserSessionProvider";

export default function DashboardPage() {
  const { userSession } = useUserSession();
  const router = useRouter();

  useEffect(() => {
    switch (userSession?.userRole as string) {
      case "SUPERUSER":
        router.push("/dashboard/superuser");
        break;
      case "PENGAWAS":
        router.push("/dashboard/pengawas");
        break;
      case "MADRASAH":
        router.push("/dashboard/madrasah");
        break;
      default:
        router.push("/auth/signin");
        break;
    }
  }, [router, userSession]);

  return null;
}
