const User = require('../Models/user.models');
const AppError = require('../Utils/appError');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if(!user){
            return next(new AppError('User Not found', 404));
        }

        res.status(200).json({
            status: 'success',
            requestAt: Date.now(),
            message: 'Get Profile successfull',
            data: user,
        });

    }catch(err){
        return next(new AppError(err.message, err.status));
    }
}