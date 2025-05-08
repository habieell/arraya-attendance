import { Company } from "./company";

export interface Shift {
    id: number;
    company: Company;
    name: string;
    start_time: string;
    end_time: string;
  }
 
  export interface ShiftCreate {
    id: number;
    name: string;
    department_id: string;
    level: string;
  }