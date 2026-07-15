export type jwtPayloadAt = {
  sub: number;
  email: string;
};

export type jwtPayloadRt = {
  sub: number;
  email: string;
  refreshToken: string;
};
