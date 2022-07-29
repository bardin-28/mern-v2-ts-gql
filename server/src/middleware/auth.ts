import { AuthenticationError } from "apollo-server-errors";
// @ts-ignore
import jwt from 'jsonwebtoken';

module.exports = (req: any, res: any, next: any ) => {
    if (req.method === 'OPTIONS'){
        return next
    }

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        if (token) {
            try {
                // @ts-ignore
                const user = jwt.verify(token, process.env.JWT_SECRET);
                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expired token')
            }
        }
        throw new Error('Authentication token must be "Bearer [token]"')
    }

    throw new Error('Authentication token must be provided')
}
