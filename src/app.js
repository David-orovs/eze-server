/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import morgan from 'morgan';
import requestRouter from './routes/requestRoutes';
import { notFoundError, serverError } from './controllers/errorController';

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Database connected successfully ✨'))
  .catch((error) => {
    console.error('Database connection failed 💥:', error.message);
    process.exit(1);
  });

const app = express();

app.use(cors());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
if (app.get('env') === 'development') app.use(morgan('dev'));

app.use('/requests', requestRouter);

app.use(notFoundError);
app.use(serverError);

export default app;
