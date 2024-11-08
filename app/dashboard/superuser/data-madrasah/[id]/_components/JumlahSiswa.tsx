import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { StudentCount } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ShapesIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GroupedData = {
  [year: string]: StudentCount[];
};

const JumlahSiswa = ({
  studentCounts,
  fetching,
}: {
  studentCounts: StudentCount[];
  fetching: boolean;
}) => {
  const [studentByYear, setStudentByYear] = useState<GroupedData>({});
  const [selectedYear, setSelectedYear] = useState<StudentCount[]>([]);
  const [currentYear, setCurrentYear] = useState<string>("");

  useEffect(() => {
    const grouped = studentCounts?.reduce((acc: GroupedData, item) => {
      const year = item.yearAdded;
      if (!acc[year]) acc[year] = [];
      acc[year].push(item);
      return acc;
    }, {});
    setStudentByYear(grouped);
  }, [fetching, studentCounts]);

  useEffect(() => {
    if (studentByYear) {
      const current = new Date().getFullYear().toString();
      setCurrentYear(current);
      setSelectedYear(studentByYear[current] || null);
    }
  }, [studentByYear]);

  const handleChangeYear = (year: string) => {
    setCurrentYear(year);
    setSelectedYear(studentByYear[year] || null);
  };

  const MakePoint: React.FC<{
    value: StudentCount;
    className?: string;
  }> = ({ value, className }) => {
    return (
      <TableRow className={cn(className)}>
        <TableCell>{value.grade}</TableCell>
        <TableCell>{value.rombel}</TableCell>
        <TableCell>{value.male}</TableCell>
        <TableCell>{value.female}</TableCell>
        <TableCell className="font-medium text-right">
          {value.totalStudent}
        </TableCell>
      </TableRow>
    );
  };
  const isMobile = useIsMobile();
  return (
    <>
      {fetching ? (
        <Card>
          <CardHeader>
            <Skeleton className="w-32 h-4" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full relative overflow-hidden">
          <CardHeader className="flex flex-row justify-between items-center">
            <h3 className="font-semibold text-xl">Jumlah Siswa</h3>
            {studentCounts?.length > 0 && (
              <Select onValueChange={handleChangeYear} value={currentYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Tahun" />
                </SelectTrigger>
                <SelectContent>
                  {studentByYear &&
                    Object?.keys(studentByYear).map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          </CardHeader>
          <CardContent>
            <ShapesIcon
              width={!isMobile ? 160 : 120}
              height={!isMobile ? 160 : 120}
              className="absolute z-0 text-muted -bottom-10 -right-4"
            />
            <div className="w-full z-10">
              <Table>
                <TableCaption>
                  {studentCounts?.length > 0
                    ? "Jumlah Siswa Berdasarkan Tahun"
                    : "Tidak ada data"}
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="lg:w-[190px]">Kelas</TableHead>
                    <TableHead className="lg:w-[140px]">
                      Jumlah Rombel
                    </TableHead>
                    <TableHead>Laki-laki</TableHead>
                    <TableHead>Perempuan</TableHead>
                    <TableHead className="text-right">Total Siswa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedYear?.map((value) => (
                    <MakePoint key={value.id} value={value} />
                  ))}
                </TableBody>
                {studentCounts?.length > 0 && (
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>Total Keseluruhan</TableCell>
                      <TableCell className="text-right font-semibold text-lg">
                        {selectedYear &&
                          selectedYear?.reduce((a, b) => a + b.totalStudent, 0)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default JumlahSiswa;
