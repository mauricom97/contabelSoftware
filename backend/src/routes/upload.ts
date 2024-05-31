import express from "express";
import auth from "../middlewares/auth";
import sheetFiles from "../controllers/uploadFiles/sheetFiles";
const router = express.Router();

import multerConfig from "../middlewares/multerConfig";

router.post("/sheetFiles", multerConfig.single("file"), auth, sheetFiles);

export default router;
