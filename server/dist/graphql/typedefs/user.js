"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const userType = (0, apollo_server_express_1.gql) `
    type User {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
    }
`;
exports.default = userType;
