import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { DocumentReference, MadrasahDocument } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  ExternalLinkIcon,
  FileCheck2Icon,
  FileWarningIcon,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const KelengkapanDokumen = ({
  documents,
  documentReferences,
  fetching,
}: {
  documents: MadrasahDocument[];
  documentReferences: DocumentReference[];
  fetching: boolean;
}) => {
  const MakePoint: React.FC<{
    value: MadrasahDocument | boolean;
    label: string;
    className?: string;
  }> = ({ value, label, className }) => {
    return (
      <div
        className={cn(
          "w-3/4 my-1 p-2 flex justify-start border gap-5 items-center rounded-md z-10",
          className,
          (value as boolean)
            ? "bg-blue-50 border-blue-100"
            : "bg-red-50 border-red-100"
        )}
      >
        <p className={cn("break-words", value && "line-through opacity-60")}>
          {label}
        </p>
        {value ? (
          <ExternalLinkIcon
            size={18}
            className="text-blue-600 cursor-pointer"
          />
        ) : (
          <FileWarningIcon size={18} className="text-red-600" />
        )}
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
            <div className="grid grid-cols-1 gap-2">
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full relative overflow-hidden">
          <CardHeader>
            <h3 className="font-semibold text-xl">Kelengkapan Dokumen</h3>
          </CardHeader>
          <CardContent>
            <FileCheck2Icon
              width={!isMobile ? 200 : 110}
              height={!isMobile ? 200 : 110}
              className="absolute z-0 text-muted -bottom-8 -right-10"
            />
            <div className="grid grid-cols-1 gap-3">
              {documentReferences.map((documentRef, idx) => (
                <MakePoint
                  label={documentRef.documentName}
                  value={
                    documents.find(
                      (doc) => doc.documentReferenceId === documentRef.id
                    ) as MadrasahDocument
                  }
                  key={idx}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default KelengkapanDokumen;
