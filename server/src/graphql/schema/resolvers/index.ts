import { userQueries, usersMutations } from "./users";
import { linksMutations, linksQueries } from "./links";
import Link from "../../../db/models/Link";
import User from "../../../db/models/User";

const resolvers = {
    Query: {
        ...userQueries,
        ...linksQueries
    },
    Mutation: {
        ...usersMutations,
        ...linksMutations
    },
    User: {
      // links: async (parent: any) => {
      //   const links = await Link.find({owner: parent._id})
      //   return links
      // }
    },
    Link: {
      owner: async (parent: any) => {
        const user = await User.find({_id: parent.owner})

        return user[0]
      }
    }
}

export default resolvers
