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
import { NavItems, userNavs } from "./partials/userNavs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserSession } from "@/services/auth/service";

export let globalNavs: NavItems = [];

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
  globalNavs = items;
  return (
    <Sidebar>
      <SidebarContent className="bg-gray-800">
        <SidebarHeader className="font-bold mt-3 mx-3">
          <div className="px-3 py-2 text-center border-slate-700 border-2 border-dashed rounded-md">
            <span className="text-white" style={{ letterSpacing: "2px" }}>
              Tree Smart Coach
            </span>
          </div>
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
                    isActive={
                      pathname == item.url ||
                      pathname.includes(item.url.split("/")[3])
                    }
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
