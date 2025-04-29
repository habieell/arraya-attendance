import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import PerizinanTable from "@/components/tables/PerizinanTable";

export default function BasicTables() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Perizinan" />
      <div className="space-y-6">
        <ComponentCard title="Data Perizinan Karyawan">
          <PerizinanTable />
        </ComponentCard>
      </div>
    </div>
  );
}
