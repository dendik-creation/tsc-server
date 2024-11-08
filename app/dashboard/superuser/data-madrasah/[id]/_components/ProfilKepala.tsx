import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { KepalaMadrasah } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { IdCardIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const ProfilKepala = ({
  kepalaMadrasah,
  fetching,
}: {
  kepalaMadrasah: KepalaMadrasah;
  fetching: boolean;
}) => {
  const MakePoint: React.FC<{
    value: string;
    label: string;
    className?: string;
  }> = ({ value, label, className }) => {
    return (
      <div className={cn("flex flex-col z-10", className)}>
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
            <div className="grid grid-cols-2 gap-3">
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
            <h3 className="font-semibold text-xl">Kepala Madrasah</h3>
          </CardHeader>
          <CardContent>
            <IdCardIcon
              width={!isMobile ? 300 : 210}
              height={!isMobile ? 300 : 210}
              className="absolute z-0 text-muted -bottom-20 -right-6"
            />
            <div className="grid z-10 grid-cols-1 xl:grid-cols-2 gap-2">
              <MakePoint label="Nama" value={kepalaMadrasah?.name} />
              <MakePoint label="NIP" value={kepalaMadrasah?.nip} />
              <MakePoint label="NUPTK" value={kepalaMadrasah?.nuptk} />
              <MakePoint
                label="Pendidikan"
                value={
                  kepalaMadrasah?.education && kepalaMadrasah?.major
                    ? `${kepalaMadrasah?.education} ${kepalaMadrasah?.major}`
                    : "-"
                }
              />
              <MakePoint
                label="TMT"
                value={kepalaMadrasah?.tmt?.toDateString()}
              />
              <MakePoint
                label="Tempat Tangggal Lahir"
                value={
                  kepalaMadrasah?.bornPlace && kepalaMadrasah?.bornDate
                    ? `${kepalaMadrasah?.bornPlace} ${kepalaMadrasah?.bornDate}`
                    : "-"
                }
              />
              <MakePoint label="Email" value={kepalaMadrasah?.email} />
              <MakePoint label="No. Telp" value={kepalaMadrasah?.phone} />

              <MakePoint
                label="Alamat Rumah"
                className="xl:col-span-2"
                value={kepalaMadrasah?.homeAddress as string}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ProfilKepala;
