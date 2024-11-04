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
import { User } from "@prisma/client";
import { toastError, toastSuccess } from "@/components/custom/PushToast";

const EditModal = ({
  setActionDone,
  selectedEdit,
}: {
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEdit: User;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<User>(selectedEdit);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.put(
        `/api/superuser/pengawas/update/${data.id}`,
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
            <DialogTitle>Edit Data Pengawas</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-3">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-2 gap-5"
                >
                  <div className="">
                    <p className="mb-1">NIP</p>
                    <Input
                      name="username"
                      required
                      autoComplete="off"
                      value={data.username as string}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <p className="mb-1">Nama Lengkap</p>
                    <Input
                      name="fullName"
                      required
                      autoComplete="off"
                      value={data.fullName as string}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <p className="mb-1">Pangkat</p>
                    <Input
                      name="pangkat"
                      required
                      autoComplete="off"
                      value={data.pangkat as string}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <p className="mb-1">Jabatan</p>
                    <Input
                      name="jabatan"
                      required
                      autoComplete="off"
                      value={data.jabatan as string}
                      onChange={handleChange}
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
