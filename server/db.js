import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "matvey230709",
  host: "localhost",
  port: 5432,
  database: "nobik_posts",
});

export default pool;
