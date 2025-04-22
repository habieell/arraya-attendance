import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/dashboard/EcommerceMetrics";
import React from "react";
// import MonthlyTarget from "@/components/dashboard/MonthlyTarget";
// import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/dashboard/StatisticsChart";
import RecentOrders from "@/components/dashboard/RecentOrders";
// import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Buat EcommerceMetrics mengambil lebar penuh */}
      <div className="col-span-12">
        <EcommerceMetrics />
      </div>

      {/* Sisanya tetap seperti sebelumnya */}
      <div className="col-span-12 xl:col-span-7 space-y-6">
        {/* <MonthlySalesChart /> */}
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <MonthlyTarget /> */}
      </div>

      <div className="col-span-12">
        <RecentOrders />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}
    </div>
  );
}

