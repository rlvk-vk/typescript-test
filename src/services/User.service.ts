// class UserController {
//     public async find() {
//         return User.find()
//     }
//
//     public async findOne(id: string) {
//         return User.findOne({ _id: id })
//     }
//
//     public async create(input: IUserInput) {
//         try {
//             const user = new User(input)
//             const token = await user.generateAuthToken()
//             await user.save()
//
//             return {
//                 user,
//                 token
//             }
//         } catch (error) {
//             throw new UserInputError(error.message)
//         }
//     }
// }
