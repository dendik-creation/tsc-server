"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BlocksIcon,
  LoaderCircle,
  LockIcon,
  LogIn,
  UserIcon,
} from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { toastError } from "@/components/custom/PushToast";
import Image from "next/image";

type Credentials = {
  username: string;
  password: string;
};

export default function SignIn() {
  const [onSubmit, setSubmit] = useState<boolean>(false);
  const [successAuth, setSuccessAuth] = useState<boolean>(false);
  const [credentials, setCredential] = useState<Credentials>({
    username: "",
    password: "",
  });
  useEffect(() => {
    document.title = "Sign in | TSC";
  }, []);
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    await axios
      .post("/api/auth/signin", credentials)
      .then(() => {
        setSuccessAuth(true);
        window.location.reload();
      })
      .catch((err) => {
        toastError(err.response.data.error);
      })
      .finally(() => {
        setSubmit(false);
      });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredential((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <>
        <div className="flex h-screen w-screen bg-slate-100 overflow-hidden flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8">
          <div className="bg-white relative overflow-hidden flex items-center justify-center lg:justify-between lg:max-w-4xl w-fit px-6 py-5 rounded-md">
            <div className="lg:block hidden ms-6">
              <Image
                src="/icon/base_icon.png"
                alt="logo"
                width={300}
                height={300}
                priority={true}
              />
            </div>
            <div className="md:px-16 lg:px-0 lg:mx-16 lg:my-8 my-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <LogIn className="mx-auto h-20 w-auto text-blue-600" />
                <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Masuk Untuk Akses
                </h2>
                <center className="text-slate-400">
                  Masukkan username dan password Anda
                </center>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2 relative">
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        value={credentials.username}
                        onChange={handleChange}
                        required
                        className="w-full"
                        autoComplete="off"
                        placeholder="Username"
                      />
                      <UserIcon
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        width={16}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2 relative">
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="•••"
                        required
                        autoComplete="current-password"
                        className="w-full"
                      />
                      <LockIcon
                        width={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      disabled={onSubmit || successAuth}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      {successAuth ? (
                        <div
                          className="flex gap-2 items-center"
                          style={{
                            animation: "pulse 0.8s ease-in-out infinite",
                          }}
                        >
                          <BlocksIcon size={48} />
                          <span>Menyiapkan</span>
                        </div>
                      ) : onSubmit ? (
                        <LoaderCircle className="animate-spin" size={48} />
                      ) : (
                        <div className="flex gap-2 items-center">
                          <LogIn size={48} />
                          <span>Masuk</span>
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
