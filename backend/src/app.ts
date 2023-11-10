// import { Sequelize, sequelize } from './db/models';
import express from 'express'
import dotenv from 'dotenv';
import routes from './routes';
dotenv.config();
const port = process.env.PORT || 4450;



const app = express();

app.use(express.json())

app.use(routes);
app.listen(port, () => `server running on port ${port}`)