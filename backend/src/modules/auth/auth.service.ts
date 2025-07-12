import { BadRequestException } from "../../misc/errors";
import { UserService } from "../user/user.service";
import { EncryptService } from "./encrypt.service";
import { JWTService } from "./jwt.service";
import { LoginType } from "./types/login";
import { RegisterType } from "./types/register";

const register = async (data: RegisterType) => {
    let user = await UserService.findOneByEmail(data.email)
    if(user) throw new BadRequestException("account already exists")
    
    user = await UserService.createUser({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: await EncryptService.hashPassword(data.password),
    })
    const accessToken = JWTService.sign({
        userId: user.id,
    }, process.env.ACCESS_TOKEN_SECRET!, 
    process.env.ACCESS_TOKEN_EXPIRY!)
    return {
        accessToken: accessToken,
    }
}

const login = async (data: LoginType) => {
    let user = await UserService.findOneByEmail(data.email)
    if(!user) throw new BadRequestException("invalid credentials")

    const passwordMatch = await EncryptService.verifyPassword(data.password, user.password)
    if(!passwordMatch) throw new BadRequestException("invalid credentials")
    
    const accessToken = JWTService.sign({
        userId: user.id,
    }, process.env.ACCESS_TOKEN_SECRET!, 
    process.env.ACCESS_TOKEN_EXPIRY!)

    return {
        accessToken: accessToken,
    }
}

export const AuthService = {
    register,
    login,
}