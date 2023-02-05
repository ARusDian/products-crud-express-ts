import { BaseRoleModel } from ".";

export interface BaseUserModel {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role?: BaseRoleModel;
    roleId?: number;
}

export interface UserModel extends BaseUserModel {
    id: number;
}

export interface UserRegistrationModel extends BaseUserModel {
    confirmPassword: string;
}
