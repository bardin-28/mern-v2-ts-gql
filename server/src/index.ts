import express from "express";

const app = express();

import startApolloServer from "./graphql";
import startDB from "./db";

startApolloServer(app);
startDB()

app.get('/', (req: any, res: any) => {
    res.send(`Hello to my GraphQL api! :)`)
})

