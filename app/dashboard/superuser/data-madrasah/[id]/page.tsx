"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DocumentReference,
  KepalaMadrasah,
  Madrasah,
  MadrasahDocument,
  Prisma,
  StudentCount,
  User,
} from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProfilMadrasah from "./_components/ProfilMadrasah";
import ProfilKepala from "./_components/ProfilKepala";
import KelengkapanDokumen from "./_components/KelengkapanDokumen";
import AksesOperator from "./_components/AksesOperator";
import JumlahSiswa from "./_components/JumlahSiswa";

export default function MadrasahDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const [fetching, setFetching] = useState<boolean>(false);
  const [documentReferences, setDocumentReferences] = useState<
    DocumentReference[]
  >([]);
  const [madrasah, setMadrasah] = useState<
    Prisma.MadrasahGetPayload<{
      include: {
        pengawas: true;
        staffGuru: true;
        studentCount: true;
        kepalaMadrasah: true;
        madrasahOperator: true;
        madrasahDocuents: true;
        accreditation: true;
      };
    }>
  >();
  const fetchMadrasah = async () => {
    try {
      const { data } = await axios.get(`/api/superuser/madrasah/${id}`);
      setMadrasah(data);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };
  const fetchDocumentReference = async () => {
    try {
      const { data } = await axios.get("/api/superuser/document/all");
      setDocumentReferences(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      await fetchMadrasah();
      await fetchDocumentReference();
      setFetching(false);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="mb-6">
        {fetching ? (
          <div className="flex flex-col gap-2">
            <Skeleton className="h-8 w-1/6" />
            <Skeleton className="h-5 w-1/4" />
          </div>
        ) : (
          <>
            <PageTitle
              title={madrasah?.name as string}
              description="Informasi detail tentang madrasah terkait"
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfilMadrasah madrasah={madrasah as Madrasah} fetching={fetching} />
        <ProfilKepala
          kepalaMadrasah={madrasah?.kepalaMadrasah as KepalaMadrasah}
          fetching={fetching}
        />
        <KelengkapanDokumen
          documents={madrasah?.madrasahDocuents as MadrasahDocument[]}
          documentReferences={documentReferences}
          fetching={fetching}
        />
        <AksesOperator
          operator={madrasah?.madrasahOperator as User}
          fetching={fetching}
        />
        <JumlahSiswa
          studentCounts={madrasah?.studentCount as StudentCount[]}
          fetching={fetching}
        />
      </div>
    </>
  );
}
