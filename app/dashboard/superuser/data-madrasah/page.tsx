"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import { FileDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import ImportModal from "./_components/ImportModal";
import { Madrasah } from "@prisma/client";
import { madrasahColumnsDataTable } from "@/types/tableColumns";

export default function DataMadrasah() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const [data, setData] = useState<Madrasah[]>([]);

  useEffect(() => {
    fetchMadrasah();
  }, []);

  useEffect(() => {
    if (actionDone) {
      fetchMadrasah();
    }
  }, [actionDone]);

  const fetchMadrasah = async () => {
    setFetching(true);
    try {
      const response = await axios.get("/api/superuser/madrasah/all");
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

  return (
    <>
      <div className="flex justify-between w-full flex-row md:flex-col mb-6">
        <PageTitle
          title="Data Madrasah"
          description="Kelola data madrasah yang terdaftar di sistem"
        />
      </div>

      <DataTable
        columns={madrasahColumnsDataTable}
        searchParam="name"
        searchDisplay="Nama"
        fetching={fetching}
        data={data}
        moreAction={<MoreAction />}
      />
    </>
  );
}
