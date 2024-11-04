import { PageTitle } from "@/components/partials/PageTitle";
import React from "react";

export default function DashboardSuperUser() {
  return (
    <>
      <div className="flex justify-between w-full flex-row md:flex-col">
        <PageTitle
          title="Dashboard"
          description="Pantau statistik data yang telah diolah sistem"
        />
      </div>
    </>
  );
}
