import { UserModel } from "../../schemas/user.schema"
import { CreateUserType } from "./types/user.dto"

const createUser = async (data: CreateUserType) => {
    return await UserModel.create(data)
}

const findOneByEmail = async (email: string) => {
    return await UserModel.findOne({email})
}

export const UserService = {
    findOneByEmail,
    createUser,
}