import User from '../../../db/models/User';
import { ApolloError } from "apollo-server-errors";

const usersQueries = {
    getAllUsers: async () => await User.find(),
    getUser: async (_: any, { email }: any) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new ApolloError('No such user', 'USER_NOT_FOUND')
        }

        return user
    },
}

export default usersQueries;
