import express from 'express';
import createError from 'http-errors';
import logger from 'morgan';
import helmet from 'helmet';


import imageRouter from './src/routes/images.route.js';
import { config  } from './src/configs/general.config.js';

const { port, hostname } = config;
const app = express();

app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet())

app.use('/images', imageRouter);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404));
});


/* Error handler middleware */
app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    
    return;
});
  
app.listen(port, hostname, () => {
    console.log(`listening at http://${hostname}:${port}`);
});

export default app;
