import express from 'express';
import create from '../controllers/company/create';

const router = express.Router();

router.post('/', create)

export default router;