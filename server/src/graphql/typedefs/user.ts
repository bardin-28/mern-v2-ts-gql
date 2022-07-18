import { gql } from "apollo-server-express";

const userType = gql`
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        token: String
    }
    
    input RegisterInput {
        email: String!
        password: String!
        first_name: String
        last_name: String
    }
    
    input LoginInput {
        email: String!
        password: String!
    }
`

export default userType;


