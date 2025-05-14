import { Company } from "./company";

export interface Branch {
    id: number;
    company: Company;
    name: string;
    address: string;
    contact: string;
}

export interface BranchCreate {
    id: number;    
    company_id: string;
    name: string;
    address: string;
    contact: string;
  }


