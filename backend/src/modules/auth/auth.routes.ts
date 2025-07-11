import { Router } from "express";
import { validate } from "../../middlewares/validator.middleware";
import { registerSchema } from "./types/register";
import { AuthController } from "./auth.controller";
import { loginSchema } from "./types/login";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

const AuthRouter = Router()

AuthRouter.post("/register", validate(registerSchema), AuthController.register)
AuthRouter.post("/login", validate(loginSchema), AuthController.login)
AuthRouter.post("/is-logged-in", AuthMiddleware(), AuthController.isLoggedIn)
AuthRouter.post("/logout", AuthMiddleware(), AuthController.logout)

export default AuthRouter