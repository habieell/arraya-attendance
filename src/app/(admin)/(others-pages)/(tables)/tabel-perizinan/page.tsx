import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import { Metadata } from "next";
import React from "react";
import PerizinanTable from "@/components/tables/PerizinanTable";

export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table page for TailAdmin Tailwind CSS Admin Dashboard Template",
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tabel Perizinan" />
      <div className="space-y-6">
        <ComponentCard title="Data Perizinan Karyawan">
          <PerizinanTable />
        </ComponentCard>
      </div>
    </div>
  );
}
