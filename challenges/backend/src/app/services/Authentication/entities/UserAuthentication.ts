interface UserAuthentication {
  password: string;
  meta?: string;
}
interface UserAuthenticationDTO extends UserAuthentication {
  email: string;
}

export { UserAuthenticationDTO, UserAuthentication };
