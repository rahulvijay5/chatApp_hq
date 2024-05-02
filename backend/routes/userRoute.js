import express from "express";
import { generateResponse, getOtherUsers, getStatusByUserId, getUserStatus, login, logout, register, updateUserStatus } from "../controllers/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/").get(isAuthenticated,getOtherUsers);

router.route("/updatestatus").post(updateUserStatus);
router.route("/status").get(isAuthenticated, getUserStatus);
router.get('/status/:userId', isAuthenticated, getStatusByUserId);

router.route('/ai/chat').post(generateResponse);

export default router;