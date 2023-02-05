import { ProductModel } from ".";

export interface BaseCategoryModel {
    id?: number;
    name: string;
    products? : ProductModel[];
}

export interface CategoryModel extends BaseCategoryModel {
    id: number;
}


