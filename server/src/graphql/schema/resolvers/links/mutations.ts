import Link from '../../../../db/models/Link'
import User from '../../../../db/models/User'
import { ApolloError } from 'apollo-server-errors';

const shortid = require('shortid');

const linksMutations = {
  createLink: async (_: any, { original }: any, context: any) => {
    // @ts-ignore
    const baseUrl = process.env.BASE_URL;
    let ownerEmail = context.user.email || '';

    const owner = await User.findOne({ email: ownerEmail })

    if (owner === null || owner.links === undefined ) {
      throw new ApolloError('No such user', 'NO_SUCH_USER')
    }

    const code = shortid.generate()

    const short = `${baseUrl}/t/${code}`

    const link = new Link({
      code, original, short, owner: owner?._id
    })

    const createdLink = await link.save()

    owner?.links.push(createdLink)

    await owner.save()

    return link
  },
  deleteLink: async (_: any, { id }: any, context: any) => {
    let ownerEmail = context.user.email || '';

    const owner = await User.findOne({ email: ownerEmail })

    if (owner === null || owner.links === undefined) {
      throw new ApolloError('No such user', 'NO_SUCH_USER')
    }

    // If trying to delete not yours link
    if (!owner.links?.includes(id)) {
      throw new ApolloError('No such link', 'NO_SUCH_LINK')
    }

    const deletedLink = await Link.findOneAndDelete({ _id: id });

    if (deletedLink === null) {
      throw new ApolloError('No such link', 'NO_SUCH_LINK')
    }

    const deletedLinkIndex =  owner.links.findIndex((link: any) => link?._id === deletedLink?._id);

    owner.links.splice(deletedLinkIndex, 1);

    await owner.save()

    return deletedLink
  },
  updateLink: async (_: any, { id, original }: any, context:any) => {
    let ownerEmail = context.user.email || '';

    const owner = await User.findOne({ email: ownerEmail })

    // If trying to update not yours link
    if (!owner?.links?.includes(id)) {
      throw new ApolloError('No such link', 'NO_SUCH_LINK')
    }

    const updatedLink = await Link.findOneAndUpdate({ _id: id }, { original });

    if (updatedLink === null) {
      throw new ApolloError('Unsuccessful updating link', 'NO_SUCH_LINK')
    }

    return updatedLink;
  },
}

export default linksMutations;
