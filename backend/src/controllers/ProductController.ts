import { createProductService, deleteProductService, getProductByIdService, getProductsService, updateProductService } from "../services";
import { Request, Response } from 'express';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await getProductsService();
        res.status(200).json(products);
    }
    catch (error) {
        let message = 'Something went wrong';
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(500).json({message : message });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await getProductByIdService(Number(req.params.id));
        res.status(200).json(product);
    }
    catch (error) {
        let message = 'Something went wrong';
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(404).json({message : message });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await createProductService(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        let message = 'Something went wrong';
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(404).json({message : message });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await updateProductService(Number(req.params.id), req.body);
        res.status(200).json(product);
    }
    catch (error) {
        let message = 'Something went wrong';
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(404).json({message : message });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await deleteProductService(Number(req.params.id));
        res.status(200).json(product);
    }
    catch (error) {
        let message = 'Something went wrong';
        if (error instanceof Error) {
            message = error.message;
        }
        res.status(404).json({message : message });
    }
}
