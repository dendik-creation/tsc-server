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
import { Download, FileUp, LoaderCircle, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  toastError,
  toastSuccess,
  toastWarning,
} from "@/components/custom/PushToast";
import axios from "axios";

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
      }
      setFile(file);
    }
  };

  const handleDownload = () => {
    window.location.href = "/example_file_format/import_madrasah.xlsx";
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (uploading && open !== newOpen) {
      toastWarning("Tunggu proses import selesai...");
      return;
    }

    setOpen(newOpen);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      const response = await axios.post(
        "/api/superuser/madrasah/import",
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
      <Dialog onOpenChange={handleOpenChange} open={open}>
        <DialogTrigger asChild>
          <Button
            variant="yellow"
            className="flex justify-start items-center gap-2"
          >
            <FileUp />
            <span>Import</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Data Madrasah</DialogTitle>
            <DialogDescription asChild>
              <div className="">
                <p>
                  Akses operator akan dibuat pada proses import data tiap
                  madrasah
                </p>
                <div className="mt-2">
                  <div className="">
                    <p className="mb-1">Import File (xlsx)</p>
                    <form onSubmit={handleSubmit}>
                      <Input
                        id="madrasah_import_file"
                        required
                        className="mb-3"
                        type="file"
                        disabled={uploading}
                        onChange={handleChangeFile}
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <Button
                          disabled={uploading}
                          type="submit"
                          variant="yellow"
                          className="w-full col-span-2"
                        >
                          {uploading ? (
                            <LoaderCircle className="animate-spin" />
                          ) : (
                            <div className="flex justify-start items-center gap-2">
                              <UploadIcon />
                              <span>Import</span>
                            </div>
                          )}
                        </Button>
                        <Button
                          variant="blue"
                          type="button"
                          disabled={uploading}
                          className="flex justify-center w-full items-center gap-2 col-span-1"
                          onClick={handleDownload}
                        >
                          <Download />
                          <span>Download format file</span>
                        </Button>
                      </div>
                    </form>
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
