import User from '../../../db/models/User';

const usersMutations = {
    createUser: async (_: any, {email, password, first_name, last_name}: any) => {
        const user = new User({ email, password, first_name, last_name });
        await user.save();
        return user
    },
    updateUser: async (_: any, { email, password, first_name, last_name }: any) => {
        const updatedUser = await User.findOneAndUpdate({ email }, { email, password, first_name, last_name });
        return updatedUser;
    },
    deleteUser: async (_: any, { email }: any) => {
        const deletedUser = await User.findOneAndDelete({ email });
        return deletedUser
    }
}

export default usersMutations;
