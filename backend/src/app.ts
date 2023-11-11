import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);


export default app;