"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle, PencilIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Madrasah } from "@prisma/client";
import { toastError, toastSuccess } from "@/components/custom/PushToast";
import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import { determineMadrasahCategory } from "@/services/madrasah/service";

const EditModal = ({
  setActionDone,
  selectedEdit,
  pengawasOption,
}: {
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEdit: Madrasah;
  pengawasOption: ComboboxOption[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<Madrasah>(selectedEdit);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "name") {
      const madrasahCategory = (await determineMadrasahCategory(
        value
      )) as string;
      setData((prev) => ({
        ...prev,
        name: value,
        category: madrasahCategory || "",
      }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCombobox = (name: string, value: string | number | undefined) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.put(
        `/api/superuser/madrasah/update/${data.id}`,
        data
      );
      setOpen(!open);
      setActionDone(true);
      toastSuccess(response?.data?.message);
    } catch (error) {
      const { response } = error as { response: { data: { error: string } } };
      toastError(response?.data?.error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Dialog onOpenChange={() => setOpen(!open)} open={open}>
        <DialogTrigger asChild>
          <Button variant="blue" size="icon">
            <PencilIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Data Madrasah</DialogTitle>
            <DialogDescription asChild>
              <div className="">
                <p>
                  Informasi penuh madrasah akan dilengkapi oleh masing-masing
                  operator madrasah
                </p>
                <div className="mt-3"></div>
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-2 gap-5"
                >
                  <div className="">
                    <p className="mb-1">NPSN</p>
                    <Input
                      name="npsn"
                      required
                      autoComplete="off"
                      value={data.npsn ?? ("" as string)}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <p className="mb-1">Nama Madrasah</p>
                    <Input
                      name="name"
                      required
                      autoComplete="off"
                      value={data.name ?? ("" as string)}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <p className="mb-1">Jenjang {"(Auto)"}</p>
                    <Input
                      name="category"
                      required
                      readOnly={true}
                      autoComplete="off"
                      value={data.category?.toUpperCase() ?? ("" as string)}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <p className="mb-1">Pengawas</p>
                    <Combobox
                      inputName="pengawasId"
                      inputValue={data.pengawasId as number}
                      valueType="number"
                      dataList={pengawasOption}
                      setInputValue={handleCombobox}
                    />
                  </div>
                  <Button
                    disabled={submitting}
                    variant="blue"
                    type="submit"
                    className="col-span-2"
                  >
                    {submitting ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      "Update"
                    )}
                  </Button>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditModal;
