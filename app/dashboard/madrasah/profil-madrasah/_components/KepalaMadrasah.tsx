import { KepalaMadrasah as KepalaMadrasahT } from "@prisma/client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/airbnb.css";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toastError, toastSuccess } from "@/components/custom/PushToast";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";

export default function KepalaMadrasah({
  kepalaMadrasah,
  fetching,
  setActionDone,
  madrasahId,
}: {
  kepalaMadrasah: KepalaMadrasahT;
  fetching: boolean;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
  madrasahId: number;
}) {
  const [form, setForm] = useState<KepalaMadrasahT>({} as KepalaMadrasahT);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const setFlatpickrDate = useCallback((id: string, date?: Date) => {
    flatpickr(`#${id}`, {
      mode: "single",
      dateFormat: "j M Y",
      defaultDate: date ?? undefined,
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
      onChange: (selectedDates) => {
        setForm((prevForm) => ({
          ...prevForm,
          [id]: new Date(selectedDates[0]),
        }));
      },
    });
  }, []);

  useEffect(() => {
    setForm({ ...kepalaMadrasah, madrasahId });
  }, [kepalaMadrasah, madrasahId]);

  useEffect(() => {
    if (form && Object.keys(form).length > 0) {
      setFlatpickrDate("bornDate", form?.bornDate);
      setFlatpickrDate("tmt", form?.tmt);
    }
  }, [form, setFlatpickrDate]);

  const handleInputChange = async (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name == "bornPlace" ? value.toUpperCase() : value,
    }));
  };

  const handleSelectChange = async (name: string, value: string) => {
    if (form.education || kepalaMadrasah.education) {
      setForm((prevForm) => ({
        ...prevForm,
        education: value,
      }));
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form?.bornDate || !form?.tmt) {
      toastError("Lengkapi form data dahulu");
      return;
    }
    try {
      setSubmitting(true);
      const response = await axios.put(
        `/api/madrasah/profil/update-kepala/${madrasahId}`,
        form
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
      {fetching || !form ? (
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
            <h3 className="font-semibold text-lg">Profil Kepala Madrasah</h3>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 w-full">
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">NIP</p>
                  <Input
                    id="nip"
                    name="nip"
                    value={form?.nip ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">Nama</p>
                  <Input
                    id="name"
                    name="name"
                    value={form?.name ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">Tempat Lahir</p>
                  <Input
                    id="bornPlace"
                    name="bornPlace"
                    value={form?.bornPlace ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">Tanggal Lahir</p>
                  <Input
                    id="bornDate"
                    name="bornDate"
                    required
                    className="form-datepicker"
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">NUPTK</p>
                  <Input
                    id="nuptk"
                    name="nuptk"
                    value={form?.nuptk ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">
                    Pendidikan Terakhir {"(Magister, Professor)"}
                  </p>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("education", value)
                    }
                    value={form?.education ?? ""}
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Pilih salah satu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s1">S1 Sarjana</SelectItem>
                      <SelectItem value="s2">S2 Magister</SelectItem>
                      <SelectItem value="s3">S3 Professor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">Jurusan Pendidikan Terakhir</p>
                  <Input
                    id="major"
                    name="major"
                    value={form?.major ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">TMT</p>
                  <Input id="tmt" name="tmt" required autoComplete="off" />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">Email</p>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form?.email ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-sm mb-1">No Telp</p>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form?.phone ?? ""}
                    required
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col w-full col-span-2">
                  <p className="text-sm mb-1">Alamat Rumah</p>
                  <Textarea
                    id="homeAddress"
                    name="homeAddress"
                    value={form?.homeAddress ?? ""}
                    required
                    rows={3}
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={submitting}
                variant={"green"}
                className="w-full"
              >
                {submitting ? (
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
}
