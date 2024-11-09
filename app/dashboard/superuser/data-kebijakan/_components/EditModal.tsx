"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  FileWarning,
  LoaderCircle,
  PencilIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toastError, toastSuccess } from "@/components/custom/PushToast";
import { DocumentKebijakan } from "@prisma/client";
import { debounce } from "@/lib/utils";

const EditModal = ({
  setActionDone,
  selectedEdit,
}: {
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEdit: DocumentKebijakan;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [data, setData] = useState<DocumentKebijakan>(selectedEdit);
  const [isUrlPublic, setIsUrlPublic] = useState<boolean>(false);
  const [fetchingDoc, setFetchingDoc] = useState<boolean>(false);
  const [docPreview, setDocPreview] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name == "documentUrl") {
      debouncedCheckPublicDocUrl(value);
    }
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const debouncedCheckPublicDocUrl = useCallback(
    debounce(async (url) => {
      if (!url) {
        setIsUrlPublic(false);
        setDocPreview("");
        return;
      }
      await checkPublicDocUrl(url as string);
    }, 1000),
    []
  );

  useEffect(() => {
    if (open) {
      debouncedCheckPublicDocUrl(data.documentUrl);
    }
  }, [open, data.documentUrl, debouncedCheckPublicDocUrl]);

  const checkPublicDocUrl = async (url: string) => {
    try {
      setFetchingDoc(true);
      await axios.get(url);
      const docId = url.split("/")[5];
      setDocPreview(`https://drive.google.com/file/d/${docId}/preview`);
      setIsUrlPublic(true);
    } catch (error) {
      console.error(error);
      setDocPreview("");
      setIsUrlPublic(false);
    } finally {
      setFetchingDoc(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.put(
        `/api/superuser/kebijakan/update/${data.id}`,
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Kebijakan</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-3">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-4"
                >
                  <div className="w-full">
                    <p className="mb-1">Nama Kebijakan</p>
                    <Input
                      name="documentName"
                      required
                      autoComplete="off"
                      value={data.documentName ?? ("" as string)}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex mb-1 justify-between items-center">
                      <div className="">
                        URL Dokumen Kebijakan
                        {" (Pastikan dokumen bersifat publik)"}
                      </div>
                      <div className="">
                        {fetchingDoc ? (
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : isUrlPublic ? (
                          <CheckCircleIcon
                            size={18}
                            className="text-green-500"
                          />
                        ) : (
                          <FileWarning size={18} className="text-yellow-600" />
                        )}
                      </div>
                    </div>
                    <Input
                      name="documentUrl"
                      required
                      autoComplete="off"
                      value={data.documentUrl ?? ("" as string)}
                      onChange={handleChange}
                    />
                  </div>
                  {isUrlPublic && docPreview && (
                    <div className="w-full">
                      <iframe
                        loading="lazy"
                        src={docPreview}
                        className="w-full h-[600px] rounded-lg"
                      />
                    </div>
                  )}
                  <Button disabled={submitting} variant="blue" type="submit">
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
