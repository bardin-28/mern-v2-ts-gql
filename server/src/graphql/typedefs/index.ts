import { gql } from "apollo-server-express";

const indexType = gql`
    # Queries
    type Query {
        getAllUsers: [User!]!
    }

    # Mutations

`

export default indexType;



