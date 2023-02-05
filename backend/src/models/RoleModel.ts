import { UserModel } from "./UserModel";

export interface BaseRole{
    id?: number;
    name: string;
}

export interface Role extends BaseRole{
    users?: UserModel[];
}
