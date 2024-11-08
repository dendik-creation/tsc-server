"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import { EyeIcon, FileDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import ImportModal from "./_components/ImportModal";
import { Madrasah, Prisma, User } from "@prisma/client";
import { madrasahColumnsDataTable } from "@/types/tableColumns";
import CreateModal from "./_components/CreateModal";
import { ComboboxOption } from "@/components/ui/combobox";
import { DeleteModal } from "@/components/custom/DeleteModal";
import EditModal from "./_components/EditModal";
import Link from "next/link";

export default function DataMadrasah() {
  const [fetching, setFetching] = useState<boolean>(false);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const [data, setData] = useState<
    Prisma.MadrasahGetPayload<{ include: { pengawas: true } }>[]
  >([]);
  const [pengawasOption, setPengawasOption] = useState<ComboboxOption[]>(
    [] as ComboboxOption[]
  );
  useEffect(() => {
    fetchMadrasah();
  }, []);

  const getPengawasAsOption = async () => {
    try {
      const response = await axios.get("/api/superuser/pengawas/all");
      const options = response?.data?.map(
        (pengawas: User) =>
          ({
            label: pengawas.fullName,
            value: pengawas.id,
          } as ComboboxOption)
      );
      setPengawasOption(options as unknown as ComboboxOption[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPengawasAsOption();
  }, []);

  useEffect(() => {
    if (actionDone) {
      setTimeout(() => {
        fetchMadrasah();
        setActionDone(false);
      }, 1000);
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
          <CreateModal
            pengawasOption={pengawasOption}
            setActionDone={setActionDone}
          />
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

  const rowActions = (row: Madrasah) => {
    return (
      <>
        <div className="flex items-center justify-start gap-3">
          <Link href={`/dashboard/superuser/data-madrasah/${row.id}`}>
            <Button variant="teal" size="icon">
              <EyeIcon />
            </Button>
          </Link>
          <EditModal
            selectedEdit={row}
            setActionDone={setActionDone}
            pengawasOption={pengawasOption}
          />
          <DeleteModal
            setActionDone={setActionDone}
            targetUrl={`/api/superuser/madrasah/delete/${row.npsn}`}
            title={"Hapus Data Madrasah"}
            description={
              "Akses operator akan ikut terhapus apabila madrasah ini dihapus?"
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
          title="Data Madrasah"
          description="Kelola data madrasah yang terdaftar di sistem"
        />
      </div>

      <DataTable
        columns={madrasahColumnsDataTable}
        searchParam="name"
        searchDisplay="Nama Madrasah"
        fetching={fetching}
        data={data}
        rowActions={rowActions}
        moreAction={<MoreAction />}
      />
    </>
  );
}
