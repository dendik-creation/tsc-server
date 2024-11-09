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
import { DicesIcon, KeyIcon, LoaderCircle } from "lucide-react";
import axios from "axios";
import { toastError, toastSuccess } from "./PushToast";
import { Input } from "../ui/input";
import { generateRandomString } from "@/services/other";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ResetPasswordModal = ({
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
  const [resetting, setResetting] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleRandomPassword = () => {
    setPassword(generateRandomString(8));
  };
  const handleReset = () => {
    setResetting(true);
    axios
      .put(targetUrl, { password })
      .then((res) => {
        setOpen(false);
        setActionDone(true);
        toastSuccess(res?.data?.message ?? "Berhasil Reset Password");
      })
      .catch(() => {
        toastError("Gagal Reset Password");
      })
      .finally(() => {
        setResetting(false);
      });
  };
  return (
    <>
      <AlertDialog onOpenChange={() => setOpen(!open)} open={open}>
        <AlertDialogTrigger asChild>
          <Button
            variant="yellow"
            size={title.toLowerCase().includes("operator") ? "sm" : "icon"}
            className="flex items-center gap-2"
          >
            <KeyIcon />
            {title.toLowerCase().includes("operator") && (
              <span>Reset Password</span>
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="">
                <p className="">{description}</p>
                <p className="mb-3">Simpan password dibawah sebelum reset</p>
                <div className="relative w-full">
                  <Input
                    name="resetPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value ?? "")}
                    type="text"
                  />

                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <DicesIcon
                        size={18}
                        id="randomPassword"
                        onClick={handleRandomPassword}
                        className="absolute cursor-pointer text-gray-800 right-4 top-3"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Generate Password</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batalkan</AlertDialogCancel>
            <Button
              disabled={resetting || password == ""}
              variant="yellow"
              onClick={handleReset}
            >
              {resetting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Reset</span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
