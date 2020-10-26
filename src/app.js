/* eslint-disable no-console */
import path from 'path';
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
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
if (app.get('env') === 'development') app.use(morgan('dev'));

app.use('/api/requests', requestRouter);

// if (process.env.NODE_ENV === 'production') {
app.all('*', (req, res, next) => {
  res.sendFile('index.html');
});
// } else {
//   app.use(notFoundError);
// }

app.use(serverError);

export default app;
