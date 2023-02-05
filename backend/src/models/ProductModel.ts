import { BaseUserModel } from ".";

export interface BaseProductModel { 
    id?: number;
    name: string;   
    price: number;
    user?: BaseUserModel;
    userId?: number;
}

export interface ProductModel extends BaseProductModel {
    id: number;
}
