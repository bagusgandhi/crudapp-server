const Product = require('../Models/product.model');
const AppError = require('../Utils/appError');

exports.getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find({ user_id: req.user._id });

        const data = products.map((product) => ({
            _id: product._id,
            title: product.title,
            price: product.price,
            image: product.image,
            updateAt: product.updatedAt
        }));

        res.status(200).json({
            status: 'success',
            requestAt: Date.now(),
            message: 'Get All Product successfull',
            data,
        });
    }catch(err){
        return next(new AppError(err.message, err.status));
    }

    
}

exports.addNewProduct = async (req, res, next) => {
    try {
        const { title, description, price, image } = req.body;
    
        const product = await Product.create({
            title,
            description,
            price,
            image,
            user_id: req.user._id
        });
    
        res.status(201).json({
            status: 'success',
            requestAt: Date.now(),
            message: 'Add New Product successfull',
            data: product,
        });
    }catch(err){
        return next(new AppError(err.message, err.status));
    }

}

exports.productById = async (req, res, next) => {
    try {
        const data = await Product.findOne({ 
            _id: req.params.product_id, 
            user_id: req.user._id 
        });
    
        if(!data){
            return next(new AppError('Product Not Found with that id', 404));
        }
    
        res.status(200).json({
            status: 'success',
            requestAt: Date.now(),
            message: 'Get Product By Id successfull',
            data,
        });
    }catch(err){
        return next(new AppError(err.message, err.status));
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findOneAndDelete({ 
            _id: req.params.product_id, 
            user_id: req.user._id 
        });
    
        if(!product){
            return next(new AppError('Product Not Found with that id', 404));
        }
    
        res.status(204).json({
            status: 'success',
            requestAt: Date.now(),
            message: 'Product Successfully deleted',
            data: {
                _id: product._id,
                title: product.title
            }
        })
    }catch(err){
        return next(new AppError(err.message, err.status));
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate({ 
            _id: req.params.product_id, 
            user_id: req.user._id 
        }, req.body);
    
        if(!updatedProduct) {
            return next(new AppError('Product Not Found with that id', 404));
        }
    
        const { _id, title, updatedAt } = updatedProduct;
    
        res.status(200).json({
            status: 'success',
            requestAt: Date.now(),
            message: 'Product Successfully updated',
            data: {
                _id,
                title, 
                updatedAt 
            }
        });
    }catch(err){
        return next(new AppError(err.message, err.status));
    }
}