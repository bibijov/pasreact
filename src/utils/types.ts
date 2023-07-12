export type autoSkola = {
  ime: string;
  adresa: string;
  brojtelefona: Array<UserData>;
  id: number;
};
export type Upit = {
  id: number;
  korisnik_id: number;
  instruktor_id: number;
  datum: string;
  vreme: string;
  stanje: string;
};
export type Instruktor = {
  ime: string;
  id: number;
  korisnik_id: number;
  auto: string;
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
