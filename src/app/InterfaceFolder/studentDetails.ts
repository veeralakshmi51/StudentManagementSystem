import { Role } from "../EnumFolder/role";

export interface studentDetails {
  id?: string;
  firstName: string;
  lastName: string;
  studentId: string;
  rollNumber: string;
  email: string;
  course: string;
  department: string;
  admissionDate: string;
  phone: string;
  address: string;
  age: string;
  dob: string;
  gender: string;
  password:string;
  role:Role.student;
  profileImg?:string;
}

export interface staffDetails {
  id?:string;
  staffId: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  joinDate: string;
  role:Role.staff;
  password:string;
}
export interface admin {
  id?:string;
  adminId: string;
  name: string;
  email: string;
  role:Role.admin;
}
