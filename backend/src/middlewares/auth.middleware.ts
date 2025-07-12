import {NextFunction, Request, Response} from "express"
import { UnAuthorizedException } from "../misc/errors"
import { JWTService } from "../modules/auth/jwt.service"
import { JWTSignInPayload } from "../modules/auth/types/jwt"

export const AuthMiddleware = () => {
    return async function(req: Request, res: Response, next: NextFunction) {
        const authToken = req.cookies?.["auth-token"]
        if(!authToken) throw new UnAuthorizedException()
        console.log(process.env.ACCESS_TOKEN_SECRET)
        const response = JWTService.verify<JWTSignInPayload>(authToken, process.env.ACCESS_TOKEN_SECRET!)
        if(!response) throw new UnAuthorizedException()
        req.user = response

        next()
    }
}