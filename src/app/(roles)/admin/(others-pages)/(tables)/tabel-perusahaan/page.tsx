import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import CompanyTable from "@/components/tables/CompanyTable";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Arraya Holding : Users Company",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function page() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Perusahaan" />
      <div className="space-y-6">
        <ComponentCard title="Data Perusahaan">
          <CompanyTable />
        </ComponentCard>
      </div>
    </div>
  );
}
