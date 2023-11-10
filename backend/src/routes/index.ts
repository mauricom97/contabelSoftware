import express from 'express';
import User from './user'

const router = express.Router()

router.use('/users', User)


export default router