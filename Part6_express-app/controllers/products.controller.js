const productModel = require('../models/products.model');

async function createProduct(req, res, next) {
    try {
        const createProduct = await productModel.create(req.body);
        res.status(201).json(createProduct);
        return createProduct;
    }
    catch (error) {
        next(error);
    }
}

async function getProducts(req, res, next) {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json(allProducts);
        return allProducts;
    }
    catch (error) {
        next(error);
    }
}

async function getProductById(req, res, next) {
    try {
        const product = await productModel.findById(req.params.productId);
        if(product) {
            res.status(200).json(product);
            return product;
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        next(error);
    }
}

async function updateProductById(req, res, next) {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if(updatedProduct) {
            res.status(200).json(updatedProduct);
            return updatedProduct;
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        next(error);
    }
}

async function deleteProductById(req, res, next) {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.productId);
        if(deletedProduct) {
            res.status(200).json(deletedProduct);
            return deletedProduct;
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
};