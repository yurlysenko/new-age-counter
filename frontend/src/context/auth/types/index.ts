export interface ILoginDto {
  username: string;
  password: string;
}

export interface IAuthContext {
  authenticated: boolean | null;
  login: (dto: ILoginDto) => Promise<void>;
  logout: () => Promise<void>;
  payload: IJwtPayload | undefined;
}

export interface IJwtPayload {
  access_token: string;
  role: "ADMIN" | "MEMBER";
  sub: string;
  username: string;
}
