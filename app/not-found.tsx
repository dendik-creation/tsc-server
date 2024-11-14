"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <main className="grid min-h-screen place-items-center bg-gray-800 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {"404".split("").map((char, index) => (
          <span
            key={index}
            className={cn(
              "text-6xl mx-8 font-semibold font-mono text-indigo-500 animate-pulse duration-500",
              {
                "delay-0": index === 0,
                "delay-100": index === 1,
                "delay-200": index === 2,
              }
            )}
          >
            {char}
          </span>
        ))}
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Halaman Tidak Ada
        </h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
          Halaman yang dicari mungkin tidak ada bahkan tidak dibuat.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            variant={"blue"}
            size={"lg"}
            className="w-full flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ChevronLeftIcon />
            <span>Kembali</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
