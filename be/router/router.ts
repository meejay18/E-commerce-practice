import { Router } from "express";
import {
  createAccount,
  loginUser,
  readAllUsers,
  verifyUser,
} from "../controller.ts/userController";

const router: any = Router();

router.route("/create-acc").post(createAccount);
router.route("/login").post(loginUser);
router.route("/verify/:userID").get(verifyUser);
router.route("/read-one/:userID").get(verifyUser);
router.route("/read-all").get(readAllUsers);

export default router;
