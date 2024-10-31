"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, LogIn } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

type Credentials = {
  username: string;
  password: string;
};

export default function SignIn() {
  const [onSubmit, setSubmit] = useState<boolean>(false);
  const [credentials, setCredential] = useState<Credentials>({
    username: "",
    password: "",
  });
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmit(true);
    await axios
      .post("/api/auth/signin", credentials)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
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
        <div className="flex h-screen w-screen overflow-hidden flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <LogIn className="mx-auto h-20 w-auto text-blue-600" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
                <div className="mt-2">
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
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="●●●●●●"
                    required
                    autoComplete="current-password"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={onSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {onSubmit ? (
                    <LoaderCircle className="animate-spin" size={48} />
                  ) : (
                    "Masuk"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  );
}
