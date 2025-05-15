import ComponentCard from "@/components/common/ComponentCard";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";
import LeaveApprovalTable from "@/components/tables/LeaveApprovalTable";

export const metadata: Metadata = {
  title: "Next.js Basic Table | Tabel Approve",
  description:
    "This is Next.js Basic Table page for TailAdmin Tailwind CSS Admin Dashboard Template",
};

export default function ApprovalTables() {
  return (
    <div>
      <PageBreadCrumb pageTitle="Tabel Perizinan" />
      <div className="space-y-6">
        <ComponentCard title="Data Perizinan Karyawan">
          <LeaveApprovalTable />
        </ComponentCard>
      </div>
    </div>
  );
}
