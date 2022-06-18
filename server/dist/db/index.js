"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
});
const sql = `SELECT * FROM pg_tables`;
const connectToDB = async () => {
    try {
        await pool.connect();
    }
    catch (err) {
        console.log(err);
    }
};
connectToDB();
(async () => {
    const { rows } = await pool.query(sql, [process.env.DB_USER], (err, res) => {
        console.log(err, res);
    });
    console.log(rows);
    pool.end();
})();
exports.default = pool;
