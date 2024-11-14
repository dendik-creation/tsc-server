"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DocumentKebijakan } from "@prisma/client";
import { DeleteModal } from "@/components/custom/DeleteModal";
import EditModal from "./_components/EditModal";
import CreateModal from "./_components/CreateModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ExternalLinkIcon, SearchIcon, SearchXIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default function DataKebijakan() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const [data, setData] = useState<DocumentKebijakan[]>([]);
  const [filtered, setFiltered] = useState<DocumentKebijakan[]>([]);

  useEffect(() => {
    fetchKebijakan();
  }, []);

  useEffect(() => {
    if (actionDone) {
      setTimeout(() => {
        fetchKebijakan();
        setActionDone(false);
      }, 1000);
    }
  }, [actionDone]);

  const fetchKebijakan = async () => {
    setFetching(true);
    try {
      const response = await axios.get("/api/superuser/kebijakan/all");
      setData(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value == "") {
      setFiltered(data);
      return;
    }
    const filteredData = data.filter((item) => {
      return item.documentName.toLowerCase().includes(value.toLowerCase());
    });
    setFiltered(filteredData);
  };

  const MoreAction = () => {
    return (
      <>
        <div className="flex justify-start items-center gap-3">
          <CreateModal setActionDone={setActionDone} />
        </div>
      </>
    );
  };

  const rowActions = (row: DocumentKebijakan) => {
    return (
      <>
        <div className="flex items-center justify-start gap-3">
          <EditModal selectedEdit={row} setActionDone={setActionDone} />
          <DeleteModal
            setActionDone={setActionDone}
            targetUrl={`/api/superuser/kebijakan/delete/${row.id}`}
            title={"Hapus Kebijakan"}
            description={"Apakah anda yakin ingin menghapus kebijakan ini?"}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex justify-between w-full flex-row md:flex-col mb-6">
        <PageTitle
          title="Data Kebijakan"
          description="Dokumen kebijakan untuk sistem dan pengguna"
        />
      </div>

      <div className="flex lg:flex-row flex-col lg:gap-0 gap-3 items-start lg:items-center justify-between py-4">
        <div className="flex-1 relative lg:max-w-sm w-full">
          <Input
            placeholder={`Cari berdasarkan Nama Dokumen`}
            className="lg:max-w-sm w-full"
            onChange={handleFilter}
          />
          <SearchIcon className="absolute w-4 right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        <MoreAction />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-lime-100 font-semibold">#</TableHead>
              <TableHead className="bg-lime-100 font-semibold">
                Nama Dokumen
              </TableHead>
              <TableHead className="bg-lime-100 font-semibold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetching ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 3 }, (_, i) => (
                    <TableCell key={i}>
                      <Skeleton className="h-6" key={i} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length > 0 ? (
              filtered.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Link
                      className="group"
                      href={row.documentUrl}
                      target="_blank"
                    >
                      <div className="flex justify-start items-center gap-2 group-hover:underline underline-offset-2 text-blue-800">
                        <span>{row.documentName}</span>
                        <ExternalLinkIcon size={14} />
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>{rowActions(row)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  <div className="w-full flex flex-col items-center justify-center h-full gap-2">
                    <SearchXIcon width={64} className="text-red-400" />
                    <span>Tidak ada data</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
