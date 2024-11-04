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
import { Download, FileUp, LoaderCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toastError, toastSuccess } from "@/components/custom/PushToast";

const ImportModal = ({
  setActionDone,
}: {
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (
        file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        toastError("File harus berformat .xlsx");
        return;
      }
      setFile(file);
    }
  };

  const handleDownload = () => {
    window.location.href = "/example_file_format/import_pengawas.xlsx";
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      const response = await axios.post(
        "/api/superuser/pengawas/import",
        { file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setOpen(!open);
      setActionDone(true);
      setFile(null);
      toastSuccess(response?.data?.message);
    } catch (error) {
      const { response } = error as { response: { data: { error: string } } };
      toastError(response?.data?.error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <Dialog onOpenChange={() => setOpen(!open)} open={open}>
        <DialogTrigger asChild>
          <Button
            variant="yellow"
            className="flex justify-start items-center gap-2"
          >
            <FileUp />
            <span>Import</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Import Data Pengawas</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-2">
                <div className="flex justify-between items-center gap-4">
                  <div className="">
                    <p className="mb-1">Import File (xlsx)</p>
                    <form onSubmit={handleSubmit}>
                      <Input
                        id="pengawas_import_file"
                        required
                        className="mb-3"
                        type="file"
                        onChange={handleChangeFile}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      />
                      <Button
                        disabled={uploading}
                        type="submit"
                        variant="yellow"
                        className="w-full"
                      >
                        {uploading ? (
                          <LoaderCircle className="animate-spin" />
                        ) : (
                          <span>Import</span>
                        )}
                      </Button>
                    </form>
                  </div>
                  <div className="">
                    <p className="mb-2">Contoh Format File (xlsx)</p>
                    <Button
                      variant="blue"
                      className="flex justify-center w-full items-center gap-2"
                      onClick={handleDownload}
                    >
                      <Download />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportModal;
