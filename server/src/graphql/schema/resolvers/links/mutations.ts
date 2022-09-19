import Link from '../../../../db/models/Link'
import User from '../../../../db/models/User'
import { ApolloError } from 'apollo-server-errors';

// @ts-ignore
import shortid from 'shortid'

const linksMutations = {
  createLink: async (_: any, { from, to }: any, context: any) => {
    let userEmail = context.user.email || '';

    if (userEmail === '') {
      throw new ApolloError('No such user', 'NO_SUCH_USER')
    }
    console.log(userEmail)
    const owner = await User.findOne({ userEmail })

    console.log(owner)
    if (owner === null || owner.links === undefined) {
      throw new ApolloError('No such user', 'NO_SUCH_USER')
    }

    const code = shortid.generate()

    const link = new Link({
      code, to, from, owner: owner?._id, clicks: 0
    })

    const createdLink = await link.save()

    owner?.links.push(createdLink)

    await owner.save()

    return link
  },
}

export default linksMutations;
