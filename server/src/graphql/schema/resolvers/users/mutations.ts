import User from '../../../../db/models/User';
import { ApolloError } from 'apollo-server-errors';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersMutations = {
    createUser: async (_: any, { email, password, first_name, last_name }: any) => {
        // See if an old user exists with this email
        const oldUser = await  User.findOne({ email })

        if (oldUser) {
            throw new ApolloError('User already exist', 'USER_ALREADY_EXIST')
        }

        // Encrypt password
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Build out new User
        const newUser = new User({
            email: email.toLowerCase(),
            password: encryptedPassword,
            first_name,
            last_name
        });

        // Create JWT (attach to our User model)
        const token = jwt.sign(
            {
                user_id: newUser._id,
                email
            },
            process.env.JWT_SECRET,
            {
              // FIXME: need research about expires functional
              expiresIn: '24h'
            }
        );

        newUser.token = token;

        // Save our User
        await newUser.save();
        return newUser
    },
    loginUser: async (_: any, { email, password }: any) => {
        // See if user exists with the email
        const user = await  User.findOne({ email });

        // Check if the entered password correct
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create a NEW token
            const token = jwt.sign(
                {
                    user_id: user._id,
                    email
                },
                process.env.JWT_SECRET,
                {
                    // FIXME: need research about expires functional
                    expiresIn: '24h'
                }
            );
            user.token = token;

            await user.save();

            return user;

        } else {
            // If user doesn't exist, return error
            throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD', {
              errors: { password: 'Incorrect password' }
            })
        }
    },
    updateUser: async (_: any, { email, password, first_name, last_name }: any, context: any) => {
      let ownerEmail = context.user.email || '';

      const owner = await User.findOne({ email: ownerEmail })

      // If trying to update different account or no such user
      if (owner === null || owner.links === undefined || owner.email !== email) {
        throw new ApolloError('No such user', 'NO_SUCH_USER')
      }

      const updatedUser = await User.findOneAndUpdate({ email }, { email, password, first_name, last_name });

      return updatedUser;
    },
    deleteUser: async (_: any, { email }: any, context: any) => {
      let ownerEmail = context.user.email || '';

      const owner = await User.findOne({ email: ownerEmail })

      // If trying to delete different account or no such user
      if (owner === null || owner.links === undefined || owner.email !== email) {
        throw new ApolloError('No such user', 'NO_SUCH_USER')
      }

      const deletedUser = await User.findOneAndDelete({ email });

      return deletedUser
    }
}

export default usersMutations;
