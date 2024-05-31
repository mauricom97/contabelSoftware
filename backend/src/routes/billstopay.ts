import express from "express";
import create from "../controllers/billsToPay/create";
import importBills from "../controllers/billsToPay/importBills";
import get from "../controllers/billsToPay/get";
import index from "../controllers/billsToPay/index";
import del from "../controllers/billsToPay/delete";
import auth from "../middlewares/auth";
const router = express.Router();

router.post("/", auth, create);
router.post("/import", auth, importBills);
router.get("/", auth, index);
router.delete("/", auth, del);
router.get("/filters", auth, get);
export default router;
