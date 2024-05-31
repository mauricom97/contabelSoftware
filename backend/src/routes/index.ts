import express from "express";
import user from "./user";
import company from "./company";
import billstopay from "./billstopay";
import expenseCategory from "./expenseCategory";
import suppliers from "./suppliers";
import entity from "./entity";
import upload from "./upload";

const router = express.Router();

router.use("/billstopay", billstopay);
router.use("/user", user);
router.use("/company", company);
router.use("/expensecategory", expenseCategory);
router.use("/entity", entity);
router.use("/suppliers", suppliers);
router.use("/upload", upload);
export default router;
