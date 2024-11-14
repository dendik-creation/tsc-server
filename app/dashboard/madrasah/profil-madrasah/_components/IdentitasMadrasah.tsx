"use client";

import { Madrasah } from "@prisma/client";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { determineMadrasahCategory } from "@/services/madrasah/service";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { LoaderCircleIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toastError, toastSuccess } from "@/components/custom/PushToast";

export type LocationID = {
  code: string;
  name: string;
  postal_code?: string;
};

const IdentitasMadrasah = ({
  madrasah,
  fetching,
  setActionDone,
}: {
  madrasah: Madrasah;
  fetching: boolean;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [madrasahState, setMadrasahState] = useState<Madrasah>({} as Madrasah);
  const [onSubmitting, setSubmitting] = useState<boolean>(false);
  const [fetchingVillage, setFetchingVillage] = useState<boolean>(false);
  const [districtList, setDistrictList] = useState<ComboboxOption[]>([]);
  const [villageList, setVillageList] = useState<ComboboxOption[]>([]);

  const getVillageList = useCallback(
    async (districtCode: string) => {
      try {
        setFetchingVillage(true);
        const { data } = (await axios.get(
          `/api/location/villages/${districtCode}`
        )) as { data: LocationID[] };
        const options = data.map((v) => ({
          value: v.code,
          label: v.name.toUpperCase(),
        }));
        setVillageList(options);
        if (madrasah?.village != null) {
          const selectedVillage = options.find(
            (v) => v.label === madrasah.village
          );
          if (selectedVillage) {
            setMadrasahState((prevState) => ({
              ...prevState,
              village: selectedVillage.value,
            }));
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFetchingVillage(false);
      }
    },
    [madrasah]
  );

  const getDistrictList = useCallback(async () => {
    try {
      const { data } = (await axios.get("/api/location/districts")) as {
        data: LocationID[];
      };
      const options = data.map((v) => ({
        value: v.code,
        label: v.name.toUpperCase(),
      }));
      setDistrictList(options);
      if (madrasah?.district != null) {
        const selectedDistrict = options.find(
          (v) => v.label === madrasah.district
        );
        if (selectedDistrict) {
          setMadrasahState((prevState) => ({
            ...prevState,
            district: selectedDistrict.value,
          }));
          await getVillageList(selectedDistrict.value);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [getVillageList, madrasah]);

  const getInitial = useCallback(async () => {
    setMadrasahState({
      ...madrasah,
      province: "JAWA TENGAH",
      city: "KUDUS",
    });
    await getDistrictList();
  }, [madrasah, getDistrictList]);

  useEffect(() => {
    if (madrasah) {
      getInitial();
    }
  }, [madrasah, getInitial]);

  const handleInputChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name == "name") {
      const madrasahCategory = (await determineMadrasahCategory(
        value
      )) as string;
      setMadrasahState((prev) => ({
        ...prev,
        name: value,
        category: madrasahCategory || "",
      }));
    } else {
      setMadrasahState({
        ...madrasahState,
        [name]: value,
      });
    }
  };

  const handleComboboxChange = (
    name: string,
    value: number | string | undefined
  ) => {
    if (name == "district") {
      setVillageList([]);
      getVillageList(value as string);
      setMadrasahState({
        ...madrasahState,
        district: value as string,
        village: null,
      });
    } else if (name == "village") {
      setMadrasahState({
        ...madrasahState,
        [name]: value as string,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setMadrasahState({
      ...madrasahState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      madrasahState?.madrasahStatus == null ||
      madrasahState?.district == null ||
      madrasahState?.village == null
    ) {
      toastError("Lengkapi form dahulu!");
      return;
    }
    try {
      setSubmitting(true);
      const response = await axios.put(
        `/api/madrasah/profil/update-madrasah/${madrasahState?.id}`,
        {
          ...madrasahState,
          district: districtList.find((v) => v.value == madrasahState?.district)
            ?.label,
          village: villageList.find((v) => v.value == madrasahState?.village)
            ?.label,
        }
      );
      toastSuccess(response?.data?.message);
      setActionDone(true);
    } catch (error) {
      const { response } = error as { response: { data: { error: string } } };
      toastError(response?.data?.error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      {fetching || !madrasahState || districtList.length == 0 ? (
        <Card>
          <CardHeader>
            <Skeleton className="w-32 h-4" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-lg">Profil Madrasah</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 w-full">
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">NPSN</p>
                  <Input
                    id="npsn"
                    name="npsn"
                    value={madrasahState?.npsn ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">Nama</p>
                  <Input
                    id="name"
                    name="name"
                    value={madrasahState?.name ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">Jenjang {"(Auto)"}</p>
                  <Input
                    id="category"
                    name="category"
                    value={madrasahState?.category?.toUpperCase() ?? ""}
                    required
                    readOnly
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">Status Madrasah</p>
                  <Select
                    name="madrasahStatus"
                    onValueChange={(value) =>
                      handleSelectChange("madrasahStatus", value)
                    }
                    value={madrasahState?.madrasahStatus ?? ""}
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Pilih salah satu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="negeri">Negeri</SelectItem>
                      <SelectItem value="swasta">Swasta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">Email</p>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={madrasahState?.email ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">No Telp</p>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={madrasahState?.phone ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">Provinsi</p>
                  <Input
                    id="province"
                    name="province"
                    value={madrasahState?.province ?? ""}
                    required
                    readOnly
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">Kabupaten</p>
                  <Input
                    id="city"
                    name="city"
                    value={madrasahState?.city ?? ""}
                    required
                    readOnly
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full z-10">
                  <p className="text-sm mb-1">Kecamatan</p>
                  <Combobox
                    inputName="district"
                    inputValue={madrasahState?.district as string}
                    valueType="string"
                    dataList={districtList}
                    setInputValue={handleComboboxChange}
                  />
                </div>
                <div className="flex flex-col w-full z-10">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm">Desa</p>
                    {fetchingVillage && (
                      <LoaderCircleIcon
                        className="animate-spin text-green-600"
                        size={16}
                      />
                    )}
                  </div>
                  <Combobox
                    inputName="village"
                    inputValue={madrasahState?.village as string}
                    valueType="string"
                    dataList={villageList}
                    setInputValue={handleComboboxChange}
                  />
                </div>
                <div className="flex flex-col w-full col-span-2 z-10">
                  <p className="text-sm mb-1">Alamat Lengkap</p>
                  <Textarea
                    id="address"
                    name="address"
                    value={madrasahState?.address ?? ""}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    autoComplete="off"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={onSubmitting}
                variant={"green"}
                className="w-full"
              >
                {onSubmitting ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default IdentitasMadrasah;
