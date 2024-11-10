"use client";
import { globalNavs } from "@/components/app-sidebar";
import { PageTitle } from "@/components/partials/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardSuperUser() {
  const [fecthing, setFetching] = useState<boolean>(false);
  useEffect(() => {
    setFetching(true);
    setTimeout(() => {
      setFetching(false);
    }, 1000);
  }, []);
  return (
    <>
      <div className="flex justify-between w-full flex-row md:flex-col mb-6">
        <PageTitle
          title="Dashboard"
          description="Pantau statistik data yang telah diolah sistem"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {!fecthing && globalNavs
          ? globalNavs.slice(1).map((item, idx) => (
              <Card className="relative overflow-hidden" key={idx}>
                <CardHeader>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </CardHeader>
                <CardContent>
                  <Link className="z-10" href={item.url}>
                    <Button className="bg-gray-800 w-full">
                      Lihat Halaman
                    </Button>
                  </Link>
                  <div className="absolute -bottom-5 -right-3">
                    <item.icon
                      className="text-gray-800 opacity-30"
                      size={128}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          : Array.from({ length: 4 }).map((_, idx) => (
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
