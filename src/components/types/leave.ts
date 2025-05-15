import { User } from "./user";
import { TypeLeaves } from "./typeLeaves";

export interface Leave {
    id: number;
    user: User;
    TypeLeave: TypeLeaves;
    url_photo: string;
    start_date: Date;
    end_date: Date;
    status: string;
    current_approval_level: string;
    description: string;
    created_at: Date;
  }
