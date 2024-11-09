"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { documentKebijakanColumnsDataTable } from "@/types/tableColumns";
import { DocumentKebijakan } from "@prisma/client";
import { DeleteModal } from "@/components/custom/DeleteModal";
import EditModal from "./_components/EditModal";
import CreateModal from "./_components/CreateModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

export default function DataKebijakan() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const [data, setData] = useState<DocumentKebijakan[]>([]);

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
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
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
          <Link
            href={row.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant={"yellow"} size={"icon"}>
              <ExternalLinkIcon />
            </Button>
          </Link>
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

      <DataTable
        columns={documentKebijakanColumnsDataTable}
        searchParam="documentName"
        searchDisplay="Nama Dokumen"
        fetching={fetching}
        data={data}
        rowActions={rowActions}
        moreAction={<MoreAction />}
      />
    </>
  );
}
