import express from 'express';
import create from '../controllers/user/create';

const router = express.Router();

router.post('/', create)

export default router;