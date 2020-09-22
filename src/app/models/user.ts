import { PermissionLevel } from "./../shared/permissionLevel";
export class User {
  id: number;
  username: string;
  password: string;
  permission: number;
  tokenString: string;
}
