import express from "express";
import filter from "../controllers/suppliers/filtersSuppliers";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/filter", auth, filter);

export default router;
