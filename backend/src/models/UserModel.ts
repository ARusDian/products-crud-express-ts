export interface BaseUserModel {
    id?: number;
    name: string;
    password: string;
    email: string;
}

export interface UserModel extends BaseUserModel {
    id: number;
}

export interface UserRegistrationModel extends BaseUserModel {
    confirmPassword: string;
}
