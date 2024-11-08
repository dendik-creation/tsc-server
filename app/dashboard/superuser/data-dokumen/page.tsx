"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { documentReferenceColumnsDataTable } from "@/types/tableColumns";
import { DocumentReference } from "@prisma/client";
import { DeleteModal } from "@/components/custom/DeleteModal";
import CreateModal from "./_components/CreateModal";
import EditModal from "./_components/EditModal";

export default function DataPengawas() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const [data, setData] = useState<DocumentReference[]>([]);

  useEffect(() => {
    fetchDocumentReference();
  }, []);

  useEffect(() => {
    if (actionDone) {
      setTimeout(() => {
        fetchDocumentReference();
        setActionDone(false);
      }, 1000);
    }
  }, [actionDone]);

  const fetchDocumentReference = async () => {
    setFetching(true);
    try {
      const response = await axios.get("/api/superuser/document/all");
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

  const rowActions = (row: DocumentReference) => {
    return (
      <>
        <div className="flex items-center justify-start gap-3">
          <EditModal selectedEdit={row} setActionDone={setActionDone} />
          <DeleteModal
            setActionDone={setActionDone}
            targetUrl={`/api/superuser/document/delete/${row.id}`}
            title={"Hapus Data Dokumen"}
            description={
              "Apakah anda yakin ingin menghapus persyaratan dokumen ini?"
            }
          />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex justify-between w-full flex-row md:flex-col mb-6">
        <PageTitle
          title="Persyaratan Dokumen"
          description="Kelola dokumen wajib yang harus di upload oleh madrasah"
        />
      </div>

      <DataTable
        columns={documentReferenceColumnsDataTable}
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
