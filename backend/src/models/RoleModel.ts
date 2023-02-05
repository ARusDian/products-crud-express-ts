import { UserModel } from "./UserModel";

export interface BaseRoleModel{
    id?: number;
    name: string;
}

export interface RoleModel extends BaseRoleModel {
    id: number;
    users?: UserModel[];
}
