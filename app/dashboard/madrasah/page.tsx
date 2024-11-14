"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import { NavItems, userNavs } from "@/components/partials/userNavs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserSession } from "@/context/UserSessionProvider";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardMadrasah() {
  const [fecthing, setFetching] = useState<boolean>(false);
  const { userSession } = useUserSession();
  const [userNav, setUserNav] = useState<NavItems>([]);
  useEffect(() => {
    if (userSession?.userRole) {
      setUserNav(userNavs(userSession?.userRole as string));
      setFetching(false);
    } else {
      setFetching(true);
    }
  }, [userSession]);
  return (
    <>
      <div className="flex justify-between w-full flex-row md:flex-col mb-6">
        <PageTitle
          title="Dashboard"
          description={`Selamat Datang, ${userSession?.fullName}`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {!fecthing && userNav
          ? userNav.slice(1).map((item, idx) => (
              <Card className="relative overflow-hidden" key={idx}>
                <CardHeader>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <Link className="z-10" href={item.url}>
                    <Button className="bg-gray-800 flex items-center group transition-all gap-1 w-full">
                      <span>Lihat Halaman</span>
                      <ChevronRightIcon className="group-hover:translate-x-2 transition-all" />
                    </Button>
                  </Link>
                  <div className="absolute -bottom-7 -right-3">
                    <item.icon
                      className="text-gray-800 opacity-30"
                      size={128}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          : Array.from({ length: 5 }).map((_, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <Skeleton className="w-1/3 h-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="w-full h-4" />
                </CardContent>
              </Card>
            ))}
      </div>
    </>
  );
}
