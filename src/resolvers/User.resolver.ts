import { validate } from 'class-validator'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import UserInput from '../input/User.input'
import UserModel, { User } from '../models/User.model'
import UserService from '../services/User.service'

@Resolver(User)
class UserResolver {
    @Query((returns) => User)
    user(@Arg('id') id: string) {
        return UserService.findOne(id)
    }

    @Query((returns) => [User])
    users() {
        return UserService.find()
    }

    @Mutation((returns) => User)
    async addUser(@Arg('data') data: UserInput): Promise<User> {
        const errors = await validate(data)

        if (errors.length) {
            throw new Error('The entered data is not valid')
        }

        return (await UserModel.create(data)).save()
    }
}

export default UserResolver
