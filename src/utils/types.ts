export type autoSkola = {
  ime: string;
  adresa: string;
  brojtelefona: Array<UserData>;
  id: number;
};
export type UserRole =
  | "schooladmin"
  | "globaladmin"
  | "schoolinstructor"
  | "schoolteacher"
  | "student";
export interface UserData {
  id: number;
  ime: string;
  email: string;
  uloga: UserRole;
  autoskola_id: number;
  profilnaURL: string;
  // polozioTeoriju?: boolean;
  // brOdvozanihCasova?: number;
  // voziAuto?: string;
}
