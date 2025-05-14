// /types/company.ts
import { Shift } from "./shift";

export interface Company {
    id: number;
    name: string;
    address: string;
    contact: string;
    shift : Shift;
  }
  