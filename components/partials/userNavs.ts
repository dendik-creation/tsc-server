import {
  Contact,
  FileCheck2,
  Grid2X2,
  LucideProps,
  MessagesSquare,
  School,
  Siren,
  UserSearch,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type NavItems = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}[];

const superUserNavs: NavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/superuser",
    icon: Grid2X2,
  },
  {
    title: "Pengawas",
    url: "/dashboard/superuser/data-pengawas",
    icon: UserSearch,
  },
  {
    title: "Madrasah",
    url: "/dashboard/superuser/data-madrasah",
    icon: School,
  },
  {
    title: "Persyaratan Dokumen",
    url: "/dashboard/superuser/data-dokumen",
    icon: FileCheck2,
  },
  {
    title: "Kebijakan",
    url: "/dashboard/superuser/data-kebijakan",
    icon: Siren,
  },
];

const pengawasNavs: NavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/pengawas",
    icon: Grid2X2,
  },
  {
    title: "Madrasah",
    url: "/dashboard/pengawas/data-madrasah",
    icon: School,
  },
  {
    title: "Chat",
    url: "/dashboard/pengawas/chat",
    icon: MessagesSquare,
  },
  {
    title: "Kebijakan",
    url: "/dashboard/pengawas/data-kebijakan",
    icon: Siren,
  },
];

const madrasahNavs: NavItems = [
  {
    title: "Dashboard",
    url: "/dashboard/madrasah",
    icon: Grid2X2,
  },
  {
    title: "Profil Madrasah",
    url: "/dashboard/madrasah/profil-madrasah",
    icon: School,
  },
  {
    title: "Guru dan Tenaga Pendidik",
    url: "/dashboard/madrasah/data-guru",
    icon: Contact,
  },
  {
    title: "Chat",
    url: "/dashboard/madrasah/chat",
    icon: MessagesSquare,
  },
  {
    title: "Kebijakan",
    url: "/dashboard/madrasah/data-kebijakan",
    icon: Siren,
  },
];
export const userNavs = (userRole: string) => {
  switch (userRole) {
    case "SUPERUSER":
      return superUserNavs;
    case "PENGAWAS":
      return pengawasNavs;
    case "MADRASAH":
      return madrasahNavs;
    default:
      return [];
  }
};
