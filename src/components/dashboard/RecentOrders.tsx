import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

// Define the TypeScript interface for the table rows
interface Product {
  id: number;
  name: string;
  department: string;
  masuk: Date;
  keluar: Date;
  image: string;
  status: "Tepat Waktu" | "Telat";
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    name: "Fufu Fafa",
    department: "IT",
    masuk: new Date("2025-04-21T08:00:00"),
    keluar: new Date("2025-04-21T17:00:00"),
    status: "Tepat Waktu",
    image: "/images/karyawan/karyawan-01.jpeg",
  },
  {
    id: 2,
    name: "Riva Siahaan",
    department: "Korupsi",
    masuk: new Date("2025-04-21T08:15:00"),
    keluar: new Date("2025-04-21T17:05:00"),
    status: "Tepat Waktu",
    image: "/images/karyawan/karyawan-03.png",
  },
  {
    id: 3,
    name: "Fredrin",
    department: "Tembak",
    masuk: new Date("2025-04-21T09:20:00"),
    keluar: new Date("2025-04-21T17:00:00"),
    status: "Telat",
    image: "/images/karyawan/karyawan-02.jpg",
  },
  {
    id: 4,
    name: "Wowo",
    department: "Kepimpinan",
    masuk: new Date("2025-04-21T09:10:00"),
    keluar: new Date("2025-04-21T16:50:00"),
    status: "Telat",
    image: "/images/karyawan/karyawan-04.jpg",
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    department: "1 Variant",
    masuk: new Date("2025-04-21T07:55:00"),
    keluar: new Date("2025-04-21T17:00:00"),
    status: "Tepat Waktu",
    image: "/images/product/product-05.jpg",
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-8 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Absen Hari ini
        </h3>
        <div className="flex items-center gap-3">
          
          {/* ini search bar */}
          

          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Nama Karyawan
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Jam Masuk
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Jam Keluar
              </TableCell>
              <TableCell className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                      <Image
                        width={50}
                        height={50}
                        src={product.image}
                        className="h-[50px] w-[50px] object-cover"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {product.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {product.department}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.masuk.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.keluar.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>

                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Tepat Waktu"
                        ? "success"
                        : "warning"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
