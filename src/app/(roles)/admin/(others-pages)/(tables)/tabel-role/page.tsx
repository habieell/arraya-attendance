import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import RoleTable from "@/components/tables/RoleTable";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Role" />
      <div className="space-y-6">
        <ComponentCard title="Data Role">
          <RoleTable />
        </ComponentCard>
      </div>
    </div>
  );
}
