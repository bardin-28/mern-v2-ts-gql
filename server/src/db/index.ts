import { Pool } from "pg";

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
});

const sql = `SELECT * FROM pg_tables`

const connectToDB = async () => {
    try {
        await pool.connect();
    } catch (err) {
        console.log(err);
    }
};

connectToDB();

(async () => {
    const {rows}: any = await pool.query(sql, [process.env.DB_USER], (err, res) => {
        console.log(err, res)
    })
    console.log(rows)
    pool.end()
})()

export default pool;
