"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer } = require('apollo-server-express');
const schema_1 = __importDefault(require("./schema"));
const apollo_server_core_1 = require("apollo-server-core");
async function startApolloServer(app) {
    const server = new ApolloServer({
        introspection: true,
        csrfPrevention: true,
        cache: 'bounded',
        cors: true,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
        ],
        context: ({ req, res }) => {
            return {
                req,
                res,
            };
        },
        ...schema_1.default
    });
    await server.start();
    server.applyMiddleware({ app, path: "/api" });
    await new Promise(resolve => app.listen({ port: 5000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
}
exports.default = startApolloServer;
