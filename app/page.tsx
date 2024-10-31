"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserSession } from "@/services/auth/session";

export default function IndexPage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const getUserRole = async () => {
      const userData = await getUserSession();
      setUserRole(userData?.userRole || "");
    };

    getUserRole();
  }, []);

  useEffect(() => {
    switch (userRole) {
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
  }, [router, userRole]);

  return null;
}
