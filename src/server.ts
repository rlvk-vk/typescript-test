import { ApolloServer } from 'apollo-server-express'
import express, { Express } from 'express'
import { connect } from 'mongoose'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import UserResolver from './resolvers/User.resolver'

class Server {
    private readonly isDevelopment =
        <string>process.env.NODE_ENV !== 'production'
    private readonly port = parseInt(<string>process.env.PORT) || 4000
    private readonly app: Express

    constructor() {
        this.app = express()
        this.setupMongoose()
        this.setupServer()
    }

    private async setupMongoose() {
        const url: string = <string>process.env.MONGODB_URL || ''

        await connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        console.log(`💾 Connected to database`)
    }

    private async setupServer() {
        const schema = await buildSchema({
            resolvers: [UserResolver],
            emitSchemaFile: false,
            validate: false
        })

        const server = new ApolloServer({
            schema,
            context: (request) => {
                return {
                    request: request.req
                }
            },
            debug: this.isDevelopment,
            playground: this.isDevelopment
        })

        server.applyMiddleware({ app: this.app })

        this.app.listen({ port: this.port }, () => {
            console.log(
                `🚀 Server ready at http://localhost:${this.port}${server.graphqlPath}`
            )
        })
    }
}

new Server()
