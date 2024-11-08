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

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    value: MadrasahDocument;
    label: string;
    className?: string;
  }> = ({ value, label, className }) => {
    return (
      <div
        className={cn(
          "w-full my-1 p-2 flex justify-start border relative items-center rounded-md z-10",
          className,
          value ? "bg-blue-50 border-blue-100" : "bg-red-50 border-red-100"
        )}
      >
        <p
          className={cn(
            "break-words text-sm",
            value && "line-through opacity-60"
          )}
        >
          {label}
        </p>
        {value ? (
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <ExternalLinkIcon
                onClick={() => window.open(value.documentUrl, "_blank")}
                size={18}
                className="text-blue-600 cursor-pointer absolute z-20 right-4"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Lihat Dokumen</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <FileWarningIcon
                size={18}
                className="text-red-600 cursor-pointer absolute z-20 right-4"
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Dokumen belum dilengkapi madrasah</p>
            </TooltipContent>
          </Tooltip>
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
              className="absolute z-0 text-muted -bottom-12 -right-8"
            />
            <div className="grid grid-cols-2 gap-3">
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
