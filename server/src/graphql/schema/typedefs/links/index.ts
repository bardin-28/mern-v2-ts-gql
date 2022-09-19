import {gql} from "apollo-server-express";

const linkTypeDefs = gql`
  extend type Query {
    getAllLinks: [Link!]!
  }

  extend type Mutation {
    createLink(original: String!): Link!
    deleteLink(id: String!): Link!
  }

  type Link {
    id: ID!
    original: String!
    short: String!
    code: String!
    date: String!
    clicks: Int!
    owner: User!
  }

  input CreateLink {
    original: String!
  }
`

export default linkTypeDefs
