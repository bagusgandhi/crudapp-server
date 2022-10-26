const jwt = require('jsonwebtoken');
const User = require('../Models/user.models');
const AppError = require('../Utils/appError');
const { promisify } = require('util');

// fungsi untuk membuat token JWT
const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
})

exports.register = async (req, res, next) => {
    try {
        const { name, email, gender, password, passwordConfirm } = req.body;
        const newUser = await User.create({
            name,
            email,
            gender,
            password,
            passwordConfirm
        });
    
        const token = signToken(newUser._id)
    
        res.status(201).json({
            status: 'success',
            requestAt: Date.now(),
            message: 'Account Created successfull',
            token,
            data: {
                user: newUser,
            },
        });
    }catch(err){
        return next(new AppError(err.message, err.status));
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return next(new AppError('please provide an email and password', 400));
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError('Incorrect email or password', 401));
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            requestAt: Date.now(),
            message: 'Login successfull',
            user_id: user._id,
            token,
        });  
    }catch(err){
        return next(new AppError(err.message, err.status));
    }
}

exports.protect = async (req, res, next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
    
        if(!token){
            return next(new AppError('You are not login, please login first', 401));
        }
    
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        const freshUser = await User.findById(decode.id);
    
        if(!freshUser){
            return next(new AppError('The user to this token no loger exist', 401));
        }
    
        req.user = freshUser;
        next();
    }catch(err){
        return next(new AppError(err.message, err.status));
    }

}
