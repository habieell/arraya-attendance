import { Company } from "./company";

export interface Shift {
    id: number;
    company: Company;
    name: string;
    start_time: Date;
    end_time: Date;
  }
 
  export interface ShiftCreate {
    id: number;    
    company_id: string;
    name: string;
    start_time: Date;
    end_time: Date;
  }