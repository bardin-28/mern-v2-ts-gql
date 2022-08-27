import {gql} from "apollo-server-express";

const userTypeDefs = gql`
   type Query {
    getAllUsers: [User!]!
    getUser(email: String!): User!
    getCurrentUser: User!
   }

   type Mutation {
    createUser(email: String!, password: String!, first_name: String!, last_name: String!): User!
    loginUser(email: String!, password: String!): User!
    updateUser(email: String, password: String, first_name: String, last_name: String): User!
    deleteUser(email: String! ): User!
  }

  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    token: String!
    links: [Link!]
  }

  input RegisterInput {
    email: String!
    password: String!
    first_name: String!
    last_name: String!
  }

  input LoginInput {
    email: String
    password: String
  }
`

export default userTypeDefs
