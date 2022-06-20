import { gql } from "apollo-server-express";

const indexType = gql`
    # Queries
    type Query {
        getAllUsers: [User!]!
        getUser(email: String!): User
    }

    # Mutations
    type Mutation {
        createUser(email: String!, password: String!, first_name: String!, last_name: String!): User!
    }
`

export default indexType;



