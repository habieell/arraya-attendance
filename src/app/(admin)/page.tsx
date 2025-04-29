import type { Metadata } from "next";
import { AbsenMeter } from "@/components/dashboard/AbsenMeter";
import React from "react";
import AbsenHarian from "@/components/dashboard/AbsenHarian";

export const metadata: Metadata = {
  title:
    "Arraya | Admin Dashboard",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Buat EcommerceMetrics mengambil lebar penuh */}
      <div className="col-span-12">
        <AbsenMeter />
      </div>

      <div className="col-span-12">
        <AbsenHarian />
      </div>
    </div>
  );
}

