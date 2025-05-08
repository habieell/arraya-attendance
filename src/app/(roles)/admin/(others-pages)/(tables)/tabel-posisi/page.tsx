import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import PositionTable from "@/components/tables/PositionTable";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Arraya Holding : Data Posisi",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function Page() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Posisi" />
      <div className="space-y-6">
        <ComponentCard title="Data Posisi">
          <PositionTable />
        </ComponentCard>
      </div>
    </div>
  );
}
