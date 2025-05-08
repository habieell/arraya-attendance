import { Department } from "./department";

export interface Position {
    id: number;
    name: string;
    department: Department;
    level: string;
  }
 
  export interface PositionCreate {
    id: number;
    name: string;
    department_id: string;
    level: string;
  }