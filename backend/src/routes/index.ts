import express from 'express';
import user from './user'
import company from './company'

const router = express.Router()

router.use('/user', user)
router.use('/company', company)
export default router