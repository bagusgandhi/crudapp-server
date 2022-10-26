const express = require('express');
const authRouter = require('./Routes/auth.route');
const productRouter = require('./Routes/product.route');
const AppError = require('./Utils/appError');
const errorHandler = require('./Controllers/error.controller');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())


app.use('/api/v1/users', authRouter);
app.use('/api/v1/products', productRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`can't find the ${req.originalUrl} on this server!`));
  });

app.use(errorHandler)

module.exports = app;
