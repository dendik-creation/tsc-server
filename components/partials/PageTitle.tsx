"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const PageTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  useEffect(() => {
    document.title = `${title} | TSC`;
  }, [title]);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-start items-center gap-5">
        {pathname.split("/").length > 3 && (
          <Button
            onClick={() => router.back()}
            className="h-full py-5"
            size={"icon"}
            variant={"outline"}
          >
            <ChevronLeftIcon className="text-gray-800" />
          </Button>
        )}
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-2xl">{title}</h2>
          <span className="text-slate-700">{description}</span>
        </div>
      </div>
    </>
  );
};
