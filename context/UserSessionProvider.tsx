// components/UserSessionProvider.tsx
"use client";

import { getUserSession } from "@/services/auth/service";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
export type UserSession = {
  userId: number;
  userName: string;
  userRole: string;
  fullName: string;
} | null;

export type UserSessionContextType = {
  userSession: UserSession;
};

const UserSessionContext = createContext<UserSessionContextType | undefined>(
  undefined
);

export const useUserSession = () => {
  const context = useContext(UserSessionContext);
  if (!context) {
    throw new Error("useUserSession must be used within a UserSessionProvider");
  }
  return context;
};

export const UserSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userSession, setUserSession] = useState<UserSession>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/auth/signin") return;
    getUserSession()
      .then((user) => setUserSession(user))
      .catch((error) => console.error("Failed to fetch user session:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserSessionContext.Provider value={{ userSession }}>
      {children}
    </UserSessionContext.Provider>
  );
};
