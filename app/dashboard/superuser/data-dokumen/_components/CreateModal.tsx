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
import { BadgePlusIcon, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toastError, toastSuccess } from "@/components/custom/PushToast";
import { DocumentReference } from "@prisma/client";

const CreateModal = ({
  setActionDone,
}: {
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<DocumentReference>({} as DocumentReference);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post("/api/superuser/document/add", data);
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
          <Button
            variant="teal"
            className="flex justify-start items-center gap-2"
          >
            <BadgePlusIcon />
            <span>Baru</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Persyaratan Dokumen Baru</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-3">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-2"
                >
                  <div className="">
                    <p className="mb-1">Nama Dokumen</p>
                    <Input
                      name="documentName"
                      required
                      autoComplete="off"
                      value={data.documentName as string}
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    disabled={submitting}
                    variant="teal"
                    type="submit"
                    className="col-span-2"
                  >
                    {submitting ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      "Submit"
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

export default CreateModal;
