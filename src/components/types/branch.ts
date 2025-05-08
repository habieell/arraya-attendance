import { Company } from "./company";

export interface Branch {
    id: number;
    company: Company;
    name: string;
    address: string;
    contact: string;
}
