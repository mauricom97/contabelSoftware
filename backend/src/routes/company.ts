import express from "express";
import create from "../controllers/company/create";
import auth from "../middlewares/auth";
import userCompanies from "../controllers/company/getUserCompany";
const router = express.Router();

router.post("/", auth, create);
router.get("/", auth, userCompanies);

export default router;
