import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";

const router = new Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/users", UserController.getAllUsers);
router.get("/user/:id", UserController.getUser);
router.delete('/delete/:id',UserController.deleteUser)
router.post("/verify",UserController.verify);
router.post("/pass-reset-send", UserController.sendPassResetCode);
router.post("/verify-pass-reset",UserController.passVerifyReset);
router.post("/update-pass", UserController.updatePass);
router.put("/pass-reset-stop", UserController.passResetStop);
export default router;
