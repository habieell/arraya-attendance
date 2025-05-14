import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import TypeLeaveTable from "@/components/tables/TypeLeavesTable";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Arraya Holding : Data Type Leave",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function Page() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Type Leave" />
      <div className="space-y-6">
        <ComponentCard title="Data Type Leave">
          <TypeLeaveTable />
        </ComponentCard>
      </div>
    </div>
  );
}
