// /types/user.ts

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: string;
    companyid:string;
    branchId: null|string;
    departmentId: string;
    positionId: string;

  }
  