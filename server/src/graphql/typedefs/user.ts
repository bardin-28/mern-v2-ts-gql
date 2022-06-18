import { gql } from "apollo-server-express";

const userType = gql`
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
    }
`

export default userType;


