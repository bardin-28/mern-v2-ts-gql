import User from '../../../db/models/User';

const usersQueries = {
    getAllUsers: async () => await User.find(),
    getUser: async (_: any, { email }: any) => await User.findOne({ email }),
}

export default usersQueries;
