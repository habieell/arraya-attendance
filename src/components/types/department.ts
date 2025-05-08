import { Company } from "./company";
import { Branch } from "./branch";
import { User } from "./user"

export interface Department {
    id: number;
    name: string;
    company: Company | null;
    branch: Branch | null;
    director: User | null;
  }


export interface DepartmentCreate {
    id: number;
    name: string;
    company_id: string;
    branch_id: string;
    director_id: string;
}  