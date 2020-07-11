import UserInput from '../input/User.input'
import UserModel, { User } from '../models/User.model'
import { UserInputError } from 'apollo-server-express'
import { IService } from '../types/service.types'

class UserService implements IService<User, UserInput> {
    public async find() {
        return UserModel.find()
    }

    public async findOne(id: string) {
        return UserModel.findOne({ _id: id })
    }

    public async create(data: UserInput) {
        try {
            const user = (await UserModel.create(data)).save()

            return {
                user
            }
        } catch (error) {
            throw new UserInputError(error.message)
        }
    }
}

export default new UserService()
