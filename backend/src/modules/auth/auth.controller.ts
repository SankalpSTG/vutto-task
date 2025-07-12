import {Request, Response} from "express"
import { RegisterType } from "./types/register"
import { AuthService } from "./auth.service"
import { Responses } from "../../misc/responses"
import { LoginType } from "./types/login"
import { USER_SESSION_DURATION } from "./constants"

const register = async (req: Request, res: Response) => {
    const body = req.body as RegisterType
    const response = await AuthService.register(body)
    if(process.env.ENVIRONMENT == "development"){
        res.cookie("auth-token", response.accessToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            maxAge: USER_SESSION_DURATION,
        })
    }else{
        res.cookie("auth-token", response.accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: USER_SESSION_DURATION,
            path: "/",
            domain: ".latencot.com",
            sameSite: "none",
        })
    }
    res.status(200).json(Responses.successResponse(response))
}

const login = async (req: Request, res: Response) => {
    const body = req.body as LoginType
    const response = await AuthService.login(body)
    if(process.env.ENVIRONMENT == "development"){
        res.cookie("auth-token", response.accessToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            maxAge: USER_SESSION_DURATION,
        })
    }else{
        res.cookie("auth-token", response.accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: USER_SESSION_DURATION,
            path: "/",
            domain: ".latencot.com",
            sameSite: "none",
        })
    }
    res.status(200).json(Responses.successResponse(response))
}

const isLoggedIn = async (req: Request, res: Response) => {
    res.status(200).json(Responses.successResponse())
}

const logout = async (req: Request, res: Response) => {
    if(process.env.ENVIRONMENT == "development"){
        res.clearCookie("auth-token", {
            httpOnly: true,
            secure: false,
            maxAge: USER_SESSION_DURATION,
        })
    }else{
        res.clearCookie("auth-token", {
            httpOnly: true,
            secure: true,
            maxAge: USER_SESSION_DURATION,
            domain: ".latencot.com",
            sameSite: "none",
        })
    }
    res.status(200).json(Responses.successResponse())
}

export const AuthController = {
    register,
    login,
    isLoggedIn,
    logout
}