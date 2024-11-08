import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Madrasah } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SchoolIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ProfilMadrasah = ({
  madrasah,
  fetching,
}: {
  madrasah: Madrasah;
  fetching: boolean;
}) => {
  const MakePoint: React.FC<{
    value: string;
    label: string;
    className?: string;
  }> = ({ value, label, className }) => {
    return (
      <div className={cn("flex flex-col w-full z-10", className)}>
        <h5 className="font-semibold text-muted-foreground">{label}</h5>
        <p className=" break-words">{value ?? "-"}</p>
      </div>
    );
  };
  const isMobile = useIsMobile();
  return (
    <>
      {fetching ? (
        <Card>
          <CardHeader>
            <Skeleton className="w-32 h-4" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full relative overflow-hidden">
          <CardHeader>
            <h3 className="font-semibold text-xl">Profil Madrasah</h3>
          </CardHeader>
          <CardContent>
            <SchoolIcon
              width={!isMobile ? 300 : 210}
              height={!isMobile ? 300 : 210}
              className="absolute z-0 text-muted -bottom-12 -right-10"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <MakePoint label="Nama" value={madrasah?.name} />
              <MakePoint label="NPSN" value={madrasah?.npsn} />
              <MakePoint
                label="Jenjang"
                value={madrasah?.category?.toLocaleUpperCase() as string}
              />
              <MakePoint
                label="Status"
                value={madrasah?.madrasahStatus as string}
              />
              <MakePoint label="Email" value={madrasah?.email as string} />
              <MakePoint label="No. Telp" value={madrasah?.phone as string} />
              <MakePoint
                label="Provinsi"
                value={madrasah?.province as string}
              />
              <MakePoint label="Kabupaten" value={madrasah?.city as string} />
              <MakePoint
                label="Kecamatan"
                value={madrasah?.district as string}
              />
              <MakePoint label="Desa" value={madrasah?.village as string} />
              <MakePoint
                label="Alamat Lengkap"
                className="xl:col-span-2"
                value={madrasah?.address as string}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProfilMadrasah;
