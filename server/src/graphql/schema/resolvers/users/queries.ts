import User from '../../../../db/models/User';
import { ApolloError } from "apollo-server-errors";
// @ts-ignore
import jwt from 'jsonwebtoken';

const usersQueries = {
    getAllUsers: async () => await User.find(),
    getUser: async (_: any, { email }: any) => {
        let user = await User.findOne({ email }).select("-links");

        if (!user) {
            throw new ApolloError('No such user', 'USER_NOT_FOUND')
        }

        return user
    },
    getCurrentUser: async (_:any, args:any, context: any) => {
      let email = context.user.email || '';

      if (email === '') {
        throw new ApolloError('No token', 'TOKEN_NOT_FOUND')
      }

      const user = await User.findOne({ email })

      if (!user) {
        throw new ApolloError('No such user', 'USER_NOT_FOUND')
      }

      return user
    }
}

export default usersQueries;
