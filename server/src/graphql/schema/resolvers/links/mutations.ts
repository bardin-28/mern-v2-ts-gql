import Link from '../../../../db/models/Link'
import User from '../../../../db/models/User'
import { ApolloError } from 'apollo-server-errors';

// @ts-ignore
import shortid from 'shortid'

const linksMutations = {
  createLink: async (_: any, { original }: any, context: any) => {
    // @ts-ignore
    const baseUrl = process.env.BASE_URL;
    let userEmail = context.user.email || '';
    const owner = await User.findOne({ userEmail })

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
    let userEmail = context.user.email || '';

    const owner = await User.findOne({ userEmail })

    if (owner === null || owner.links === undefined) {
      throw new ApolloError('No such user', 'NO_SUCH_USER')
    }

    const deletedLink = await Link.findOneAndDelete({ _id: id });


    if (deletedLink === null) {
      throw new ApolloError('No such link', 'NO_SUCH_LINK')
    }
    console.log(id, deletedLink, 'iddd2')

    // owner?.links.push(createdLink)


    // const index = array.indexOf(5);
    // if (index > -1) { // only splice array when item is found
    //   array.splice(index, 1); // 2nd parameter means remove one item only
    // }

    // await owner.save()

    return deletedLink
  },

}

export default linksMutations;
