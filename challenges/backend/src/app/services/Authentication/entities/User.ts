interface User {
  token: string;
  authenticated: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  type: string;
  privileges: string;
}
export { User };
