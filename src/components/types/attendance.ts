import { User } from "./user";

export interface Attendance {
    id: string;
    user: User;
    date: Date;
    chek_in_time: string | null;
    chek_out_time: string | null;
    latitude_in: string | null; 
    longitude_in: string | null;
    latitude_out: string | null;
    longitude_out: string | null;
    photo_in: string | null;
    photo_out: string | null;
    note: string | null;
  }
