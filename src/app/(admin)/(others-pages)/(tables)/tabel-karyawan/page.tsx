import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import KaryawanTable from "@/components/tables/KaryawanTable";
import React from "react";

export default function BasicTables() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Karyawan" />
      <div className="space-y-6">
        <ComponentCard title="Data Karyawan">
          <KaryawanTable />
        </ComponentCard>
      </div>
    </div>
  );
}
