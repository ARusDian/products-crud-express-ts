import { BaseCategoryModel, BaseUserModel } from ".";

export interface BaseProductModel { 
    id?: number;
    name: string;   
    price: number;
    user?: BaseUserModel;
    userId?: number;
    category?: BaseCategoryModel[];
}

export interface ProductModel extends BaseProductModel {
    id: number;
}
