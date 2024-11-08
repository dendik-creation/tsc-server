import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { User } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { UserCog2Icon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const AksesOperator = ({
  operator,
  fetching,
}: {
  operator: User;
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
            <h3 className="font-semibold text-xl">Akses Operator</h3>
          </CardHeader>
          <CardContent>
            <UserCog2Icon
              width={!isMobile ? 160 : 120}
              height={!isMobile ? 160 : 120}
              className="absolute z-0 text-muted -bottom-10 -right-6"
            />
            <div className="grid z-10 grid-cols-1 xl:grid-cols-2 gap-2">
              <MakePoint label="Username" value={operator?.username} />
              <MakePoint label="Password" value={"********"} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AksesOperator;
