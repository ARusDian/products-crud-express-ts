import { BaseRoleModel, OrderModel, ProductModel } from ".";

export interface BaseUserModel {
    id?: number;
    name: string;
    email: string;
    password?: string;
    role?: BaseRoleModel;
    roleId?: number;
    orders?: OrderModel[];
    products? : ProductModel[];

}

export interface UserModel extends BaseUserModel {
    id: number;
}

export interface UserRegistrationModel extends BaseUserModel {
    confirmPassword: string;
}
