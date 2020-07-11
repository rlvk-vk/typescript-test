import { getModelForClass, prop } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({ description: 'The User model' })
export class User {
    @Field((type) => ID)
    id: string

    @Field()
    @prop({ required: true })
    name: string

    @Field()
    @prop({ required: true, unique: true })
    email: string

    @Field()
    @prop({ required: true })
    password: string
}

export default getModelForClass(User)
