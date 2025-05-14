import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import ShiftTable from "@/components/tables/ShiftTable";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Arraya Holding : Data Jam Kerja",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function Page() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Shift" />
      <div className="space-y-6">
        <ComponentCard title="Data Shift">
          <ShiftTable />
        </ComponentCard>
      </div>
    </div>
  );
}
