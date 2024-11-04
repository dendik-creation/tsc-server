import { Madrasah, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const pengawasColumnsDataTable: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "NIP",
  },
  {
    accessorKey: "fullName",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "pangkat",
    header: "Pangkat",
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
  },
];

export const madrasahColumnsDataTable: ColumnDef<Madrasah>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "npsn",
    header: "NPSN",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "category",
    header: "Jenjang",
  },
  {
    accessorKey: "madrasahStatus",
    header: "Status",
  },
  {
    accessorKey: "accreditationStatus",
    header: "Akreditasi",
  },
  {
    accessorKey: "accreditationYear",
    header: "Tahun Akreditasi",
  },
];
