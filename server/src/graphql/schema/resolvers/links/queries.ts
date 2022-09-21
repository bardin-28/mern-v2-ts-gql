import Link from '../../../../db/models/Link';
import User from "../../../../db/models/User";
import {ApolloError} from "apollo-server-errors";

const linksQueries = {
  getAllLinks: async (_: any, { limit, offset }: any) => await Link.find().limit(limit).skip(offset),
  getUserLinks: async (_: any, { limit, offset }: any, context: any) => {
    let userEmail = context.user.email || '';

    const owner = await User.findOne({ userEmail })

    if (owner === null || owner.links === undefined) {
      throw new ApolloError('No such user', 'NO_SUCH_USER')
    }

    const link =  await Link.find({owner: owner._id}).limit(limit).skip(offset)

    if (link === null || link === undefined) {
      throw new ApolloError('Unexpected error', 'NO_SUCH_LINK')
    }

   return link
  },
  getLink: async (_: any, { id }: any, context: any) => {
    let userEmail = context.user.email || '';

    const owner = await User.findOne({ userEmail })

    if (owner === null || owner.links === undefined) {
      throw new ApolloError('No such user', 'NO_SUCH_USER')
    }

    // If trying to get not yours link
    if (!owner.links?.includes(id)) {
      throw new ApolloError('No such link', 'NO_SUCH_LINK')
    }

    const link = await Link.findOne({ _id: id });

    if (link === null) {
      throw new ApolloError('No such link', 'NO_SUCH_LINK')
    }

    return link
  },
}

export default linksQueries;
