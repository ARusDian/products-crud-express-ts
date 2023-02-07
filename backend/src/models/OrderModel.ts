import { ProductModel, UserModel } from ".";

export interface BaseOrderModel {
    id?: number;
    userId: number;
    
    user? : UserModel;
    products?: ProductModel[];

}

export interface OrderModel extends BaseOrderModel {
    id: number;
    products : ProductModel[];
}
