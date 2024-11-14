"use client";
import { PageTitle } from "@/components/partials/PageTitle";
import { useUserSession } from "@/context/UserSessionProvider";
import React, { useCallback, useEffect, useState } from "react";
import IdentitasMadrasah from "./_components/IdentitasMadrasah";
import { KepalaMadrasah as KepalaMadrasahT, Madrasah } from "@prisma/client";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KepalaMadrasah from "./_components/KepalaMadrasah";

export default function ProfilMadrasah() {
  const { userSession } = useUserSession();
  const [fetching, setFetching] = useState<boolean>(false);
  const [actionDone, setActionDone] = useState<boolean>(false);
  const [madrasah, setMadrasah] = useState<Madrasah>();
  const [tab, setTab] = useState<string>("identitas");
  const [kepalaMadrasah, setKepalaMadrasah] = useState<KepalaMadrasahT>();

  const fetchInfo = useCallback(async () => {
    try {
      setFetching(true);
      const { data } = await axios.get(
        `/api/madrasah/profil/${userSession?.userName}`
      );
      setMadrasah(data?.madrasah as Madrasah);
      setKepalaMadrasah(data?.kepalaMadrasah as KepalaMadrasahT);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  }, [userSession]);

  useEffect(() => {
    if (actionDone) {
      fetchInfo();
      setActionDone(false);
    }
  }, [actionDone, fetchInfo]);

  useEffect(() => {
    if (userSession) {
      fetchInfo();
    }
  }, [fetchInfo, userSession]);
  return (
    <>
      <div className="flex justify-between w-full flex-row md:flex-col mb-6">
        <PageTitle
          title="Profil Madrasah & Kepala"
          description="Kelola profil dari madrasah dan kepala madrasah"
        />
      </div>
      <div className="flex flex-col gap-5">
        <Tabs
          defaultValue={tab}
          onValueChange={(value) => setTab(value)}
          className="w-full"
        >
          <TabsList className="w-full gap-8 bg-transparent">
            <TabsTrigger
              disabled={fetching}
              className="w-[300px] mb-8 text-md"
              value="identitas"
            >
              Profil Madrasah
            </TabsTrigger>
            <TabsTrigger
              disabled={fetching}
              className="w-[300px] mb-8 text-md"
              value="kepala"
            >
              Kepala Madrasah
            </TabsTrigger>
          </TabsList>
          <TabsContent value="identitas">
            <IdentitasMadrasah
              madrasah={madrasah as Madrasah}
              fetching={fetching}
              setActionDone={setActionDone}
            />
          </TabsContent>
          <TabsContent value="kepala">
            <KepalaMadrasah
              kepalaMadrasah={kepalaMadrasah as KepalaMadrasahT}
              fetching={fetching}
              setActionDone={setActionDone}
              madrasahId={madrasah?.id as number}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
