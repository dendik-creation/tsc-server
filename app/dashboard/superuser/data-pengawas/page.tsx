"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import { FileDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import ImportModal from "./_components/ImportModal";
import { pengawasColumnsDataTable } from "@/types/tableColumns";
import { User } from "@prisma/client";
import CreateModal from "./_components/CreateModal";
import EditModal from "./_components/EditModal";
import { DeleteModal } from "@/components/custom/DeleteModal";

export default function DataMadrasah() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetchPengawas();
  }, []);

  useEffect(() => {
    if (actionDone) {
      fetchPengawas();
      setActionDone(false);
    }
  }, [actionDone]);

  const fetchPengawas = async () => {
    setFetching(true);
    try {
      const response = await axios.get("/api/superuser/pengawas/all");
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
          <ImportModal setActionDone={setActionDone} />
          <Button
            variant="green"
            className="flex justify-start items-center gap-2"
          >
            <FileDown />
            <span>Export</span>
          </Button>
        </div>
      </>
    );
  };

  const rowActions = (row: User) => {
    return (
      <>
        <div className="flex items-center justify-start gap-3">
          <EditModal selectedEdit={row} setActionDone={setActionDone} />
          <DeleteModal
            setActionDone={setActionDone}
            targetUrl={`/api/superuser/pengawas/delete/${row.id}`}
            title={"Hapus Data Pengawas"}
            description={"Apakah anda yakin ingin menghapus data pengawas ini?"}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex justify-between w-full flex-row md:flex-col mb-6">
        <PageTitle
          title="Data Pengawas"
          description="Kelola data pengawas yang terdaftar di sistem"
        />
      </div>

      <DataTable
        columns={pengawasColumnsDataTable}
        searchParam="fullName"
        searchDisplay="Nama Lengkap"
        fetching={fetching}
        data={data}
        rowActions={rowActions}
        moreAction={<MoreAction />}
      />
    </>
  );
}
