const express = require("express");
import startApolloServer from "./graphql";
const mongoose = require('mongoose');

const app = express();

startApolloServer(app);

// const {
//     DB_USER,
//     DB_PASSWORD,
//     DB_HOST,
//     DB_PORT,
//     DB_NAME
// } = process.env;
//
// const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.connect( process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    let db = mongoose.connection;
    console.log(db, 'success!')
}).catch((error: any) => console.log(error, 'error'))
