import express from "express";
import {
  registerController,
  logincontroller,
  testController,
  isAdmin,
} from "../controllers/authController.js";
import { requireSignIN } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerController);
router.post("/login", logincontroller);
router.post("/test", requireSignIN, isAdmin, testController);
export default router;
