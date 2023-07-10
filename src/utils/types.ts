export type autoSkola = {
  ime: string;
  emailAdmina: string;
  predavaci: Array<UserData>;
};
export type UserRole =
  | "schooladmin"
  | "globaladmin"
  | "schoolinstructor"
  | "schoolteacher"
  | "student";
export interface UserData {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  skola: string;
  polozioTeoriju?: boolean;
  brOdvozanihCasova?: number;
  voziAuto?: string;
}
