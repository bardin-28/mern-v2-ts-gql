"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./users");
const resolvers = {
    Query: {
        ...users_1.userQueries
    }
};
exports.default = resolvers;
