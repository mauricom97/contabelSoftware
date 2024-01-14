import express from "express";
import create from "../controllers/user/create";
import login from "../controllers/user/login";
import getUser from "../controllers/user/getUser";
import auth from "../middlewares/auth";

const router = express.Router();

router.post("/", create);
router.post("/login", login);
router.get("/getUser", auth, getUser);

export default router;
