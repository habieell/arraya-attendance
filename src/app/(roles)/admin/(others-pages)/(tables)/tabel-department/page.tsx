import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import Departmenttable from "@/components/tables/DepartmentTable";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Arraya Holding : Data Department",
  description:
    "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
  // other metadata
};

export default function Page() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Department" />
      <div className="space-y-6">
        <ComponentCard title="Data Department">
          <Departmenttable />
        </ComponentCard>
      </div>
    </div>
  );
}
