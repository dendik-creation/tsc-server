"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2Icon } from "lucide-react";
import axios from "axios";
import { toastError, toastSuccess } from "./PushToast";

export const DeleteModal = ({
  title,
  description,
  targetUrl,
  setActionDone,
}: {
  title: string;
  description: string;
  targetUrl: string;
  setActionDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const handleDelete = () => {
    setDeleting(true);
    axios
      .delete(targetUrl)
      .then(() => {
        setOpen(false);
        setActionDone(true);
        toastSuccess("Berhasil Hapus Data");
      })
      .catch(() => {
        toastError("Gagal Hapus Data");
      })
      .finally(() => {
        setDeleting(false);
      });
  };
  return (
    <>
      <AlertDialog onOpenChange={() => setOpen(!open)} open={open}>
        <AlertDialogTrigger asChild>
          <Button variant="red" size="icon">
            <Trash2Icon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batalkan</AlertDialogCancel>
            <Button
              disabled={deleting}
              variant="destructive"
              onClick={handleDelete}
            >
              {deleting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Hapus</span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
