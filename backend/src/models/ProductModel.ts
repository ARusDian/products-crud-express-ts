export interface BaseProductModel { 
    id?: number;
    name: string;   
    price: number;
}

export interface ProductModel extends BaseProductModel {
    id: number;
}
