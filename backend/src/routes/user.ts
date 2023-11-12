import express from 'express';
import create from '../controllers/user/create';
import login from '../controllers/user/login';

const router = express.Router();

router.post('/', create)
router.post('/login', login)

export default router;