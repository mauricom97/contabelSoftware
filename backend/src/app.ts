import express from 'express';
import { Router, Request, Response } from 'express';
const app = express();
const route = Router();
const port = 4450;

app.use(express.json());

route.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(route);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}!`);
});