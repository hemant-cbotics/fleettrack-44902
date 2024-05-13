export type TUserPermissionPrivillege = "r" | "w" | "";

export type TUserPermission = {
  driver_admin: TUserPermissionPrivillege[],
}