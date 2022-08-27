import {gql} from "apollo-server-express";

const linkTypeDefs = gql`
  extend type Query {
    getAllLinks: [Link!]!
  }

  extend type Mutation {
    createLink(from: String! to: String!): Link!
  }

  type Link {
    id: ID!
    from: String!
    to: String!
    code: String!
    date: String!
    clicks: Int!
    user: User!
  }

  input CreateLink {
    from: String!
    to: String!
  }
`

export default linkTypeDefs
