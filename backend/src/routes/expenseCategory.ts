import express from "express";
import create from "../controllers/expenseCategory/create";
import get from "../controllers/expenseCategory/get";
import auth from "../middlewares/auth";
const router = express.Router();

router.post("/", auth, create);
router.get("/", auth, get);

export default router;
