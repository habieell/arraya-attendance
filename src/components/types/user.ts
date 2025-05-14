// /types/user.ts
import { UserProfile } from "./userProfile";
import { Company } from "./company";
import { Branch } from "./branch";
import { Department } from "./department";
import { Position } from "./position";
import { Role } from "./role";
import { Attendance } from "./attendance";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    company: Company;
    branch: null|Branch;
    department: Department;
    position: Position;
    profile: null|UserProfile;
    attendance: null|Attendance[];
  }

  export interface UserCreate {
    id: number;
    name: string;
    email: string;
    password: string;
    role_id: string;
    company_id:string;
    branch_id: null|string;
    department_id: string;
    position_id: string;
    full_name: null|string;
    birth_date: null| Date;
    birth_place: null|string;
    address: null|string;
    phone_number: null|string;
    gender: null|string;
    photo: null|string;

  }
  