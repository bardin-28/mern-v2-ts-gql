import { userQueries } from "./users";
import { usersMutations } from "./users";

const resolvers = {
    Query: {
        ...userQueries
    },
    Mutation: {
        ...usersMutations
    }
}

export default resolvers
