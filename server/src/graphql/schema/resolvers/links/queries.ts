import Link from '../../../../db/models/Link';
import User from "../../../../db/models/User";
import {ApolloError} from "apollo-server-errors";

const linksQueries = {
  getAllLinks: async () => await Link.find(),
  getLink: async (_: any, { id }: any, context: any) => {
    let userEmail = context.user.email || '';

    const owner = await User.findOne({ userEmail })

    if (owner === null || owner.links === undefined) {
      throw new ApolloError('No such user', 'NO_SUCH_USER')
    }

    const deletedLink = await Link.findOne({ _id: id });


    if (deletedLink === null) {
      throw new ApolloError('No such link', 'NO_SUCH_LINK')
    }

    return deletedLink
  },
}

export default linksQueries;
