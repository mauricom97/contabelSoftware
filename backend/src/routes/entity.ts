import express from "express";
import create from "../controllers/entity/create";
import auth from "../middlewares/auth";
import index from "../controllers/entity/index";
import filters from "../controllers/entity/filters";
const router = express.Router();

router.post("/", auth, create);
router.get("/", auth, index);
router.get("/filters", auth, filters);

export default router;
