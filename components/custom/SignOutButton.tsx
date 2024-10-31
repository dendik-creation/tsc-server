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
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function SignOutButton() {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSignOut = () => {
    setLoading(true);
    axios
      .post("/api/auth/signout")
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        toast.error("Gagal Sign Out");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <AlertDialog onOpenChange={() => setOpen(!open)} open={open}>
        <AlertDialogTrigger className="relative w-full flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0">
          Sign Out
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin ?</AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan keluar dari sistem dan harus sign in kembali untuk akses
              sistem
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              disabled={loading}
              variant="destructive"
              onClick={handleSignOut}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Sign Out</span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
