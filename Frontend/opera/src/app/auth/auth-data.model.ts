export interface LoginData {
  email: string;
  password: string;
}

export interface SignInResponse {
  /* expiresIn: number, */
  userID: string;
  authority: string;
  responseHexCode: string;
  responseMsg: string;
  token: string;
}

export class SignUpData {
  public constructor(init?: Partial<SignUpData>) {
    Object.assign(this, init);
  }
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  gender: string;
  city: string;
  address: string;
}

export interface ServerResponse {
  responseHexCode: string;
  responseMsg: string;
}
