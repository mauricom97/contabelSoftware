import express from "express";
import create from "../controllers/company/create";
import auth from "../middlewares/auth";
import userCompanies from "../controllers/company/getUserCompany";
import getCompaniesWithId from "../controllers/company/getCompany";
const router = express.Router();

router.post("/", auth, create);
router.get("/", auth, userCompanies);
router.get("/findCompany", auth, getCompaniesWithId);

export default router;
