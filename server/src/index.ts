const express = require("express");
import startApolloServer from "./graphql";
import pool from "./db";

const app = express();

startApolloServer(app)


// pool.connect();
