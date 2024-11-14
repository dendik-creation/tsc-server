import { DocumentReference, Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const pengawasColumnsDataTable: ColumnDef<
  Prisma.UserGetPayload<{
    include: {
      pengawasMadrasah: true;
    };
  }>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "username",
    header: "NIP",
    accessorFn: (row) => row.username ?? "-",
  },
  {
    accessorKey: "fullName",
    header: "Nama Lengkap",
    accessorFn: (row) => row.fullName ?? "-",
  },
  {
    accessorKey: "pangkat",
    header: "Pangkat",
    accessorFn: (row) => row.pangkat ?? "-",
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
    accessorFn: (row) => row.jabatan ?? "-",
  },
  {
    header: "Jumlah Madrasah",
    accessorFn: (row) => row.pengawasMadrasah.length ?? "-",
  },
];

export const madrasahColumnsDataTable: ColumnDef<
  Prisma.MadrasahGetPayload<{
    include: {
      pengawas: true;
    };
  }>
>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "npsn",
    header: "NPSN",
    accessorFn: (row) => row.npsn ?? "-",
  },
  {
    accessorKey: "name",
    header: "Nama",
    accessorFn: (row) => row.name ?? "-",
  },
  {
    accessorKey: "category",
    header: "Jenjang",
    accessorFn: (row) =>
      row.category == "mts" ? "MTs" : row.category?.toUpperCase(),
  },
  {
    accessorKey: "madrasahStatus",
    header: "Status",
    accessorFn: (row) => row.madrasahStatus ?? "-",
  },
  {
    accessorKey: "pengawas",
    header: "Pengawas",
    accessorFn: (row) => row.pengawas?.fullName ?? "-",
  },
];

export const documentReferenceColumnsDataTable: ColumnDef<DocumentReference>[] =
  [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "documentName",
      header: "Nama Dokumen",
      accessorFn: (row) => row.documentName ?? "-",
    },
  ];
