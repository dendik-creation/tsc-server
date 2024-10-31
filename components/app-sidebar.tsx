"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { userNavs } from "./partials/userNavs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSession } from "@/services/auth/session";

export function AppSidebar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const getUserRole = async () => {
      const userData = await getUserSession();
      setUserRole(userData?.userRole || "");
    };

    getUserRole();
  }, []);
  const items = userNavs(userRole);
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-800">
        <SidebarHeader className="font-bold mt-3 mx-2">
          <div className="text-white">Tree Smart Coach</div>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index: number) => (
                <SidebarMenuItem
                  className={`${
                    index === 0 ? "mb-4" : ""
                  } text-white/80 transition-all`}
                  key={item.title}
                >
                  <SidebarMenuButton
                    isActive={pathname == item.url}
                    className="transition-all"
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
