export interface BackendUser {
  username: string;
  email: string;
  password: string;
  roles: RoleName[];
}

export interface RoleName {
  name: string;
}
