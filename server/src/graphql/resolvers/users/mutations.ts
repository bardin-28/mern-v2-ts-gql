import User from '../../../db/models/User';

const usersMutations = {
    createUser: async (_: any, {email, password, first_name, last_name}: any) => {
        const user = new User({ email, password, first_name, last_name });
        await user.save();
        return user
    }
}

export default usersMutations;
