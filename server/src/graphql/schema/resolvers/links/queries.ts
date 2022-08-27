import Link from '../../../../db/models/Link';

const linksQueries = {
  getAllLinks: async () => await Link.find(),
}

export default linksQueries;
