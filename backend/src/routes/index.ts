import express from "express";
import user from "./user";
import company from "./company";
import billstopay from "./billstopay";

const router = express.Router();

router.use("/billstopay", billstopay);
router.use("/user", user);
router.use("/company", company);
export default router;
