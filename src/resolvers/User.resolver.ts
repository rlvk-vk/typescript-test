import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { UserInput } from '../input/User.input'
import UserModel, { User } from '../models/User.model'

@Resolver(User)
class UserResolver {
    @Query((returns) => User)
    user(@Arg('id') id: string) {
        return UserModel.findById(id)
    }

    @Query((returns) => [User])
    users() {
        return UserModel.find()
    }

    @Mutation((returns) => User)
    async addUser(@Arg('data') data: UserInput): Promise<User> {
        return (await UserModel.create(data)).save()
    }
}

export default UserResolver
