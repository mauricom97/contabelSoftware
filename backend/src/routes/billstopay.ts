import express from "express";
import create from "../controllers/billsToPay/create";
import get from "../controllers/billsToPay/get";
import index from "../controllers/billsToPay/index";
import auth from "../middlewares/auth";
const router = express.Router();

router.post("/", auth, create);
router.get("/", auth, index);
router.get("/filters", auth, get);
export default router;
