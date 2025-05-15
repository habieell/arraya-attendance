import { User } from "./user";
import { Leave } from "./leave";

export interface LeaveApproval {
    id: number;
    leave: Leave;
    level: string;
    approved_by: User;
    status: string;
    note: string;
    approved_at: string;
    created_at: Date;
  }
