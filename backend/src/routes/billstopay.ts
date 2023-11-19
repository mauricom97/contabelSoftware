import express from "express";
import create from "../controllers/billsToPay/create";
import get from "../controllers/billsToPay/get";
import auth from "../middlewares/auth";
const router = express.Router();

router.post("/", auth, create);
router.get("/", auth, get);
export default router;
