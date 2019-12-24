export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  ID: number;
  UserName: string;
  User_Password: string;
  First_Name: string;
  Last_Name: string;
  Birth_Date: string;
  Gender: string;
  City: string;
  User_Address: string;
  Email: string;
  Title: string;
  Verified: boolean;
}

export interface SignInResponse {
  /* expiresIn: number, */
  user: User;
}

export class SignUpData {
  public constructor(init?: Partial<SignUpData>) {
    Object.assign(this, init);
  }
  ID: number;
  UserName: string;
  // tslint:disable-next-line: variable-name
  User_Password: string;
  // tslint:disable-next-line: variable-name
  First_Name: string;
  // tslint:disable-next-line: variable-name
  Last_Name: string;
  // tslint:disable-next-line: variable-name
  Birth_Date: string;
  Gender: string;
  City: string;
  // tslint:disable-next-line: variable-name
  User_Address: string;
  Email: string;
  Title: string;
  Verified: boolean;
}
