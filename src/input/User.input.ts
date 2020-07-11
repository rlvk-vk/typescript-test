import { IsEmail, Length } from 'class-validator'
import { InputType, Field } from 'type-graphql'
import { User } from '../models/User.model'

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    name: string

    @Field()
    @IsEmail()
    email: string

    @Field()
    @Length(8)
    password: string
}
