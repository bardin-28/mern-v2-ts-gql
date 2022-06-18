import { userQueries } from "./users";

const resolvers = {
    Query: {
        ...userQueries
    }
}

export default resolvers
