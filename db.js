const Pool = require("pg").Pool;

const pool = new Pool({
    user : "postgres",
    password: "1775",
    host:"localhost",
    port:5432,
    database: "perntodo"
});


module.exports = pool;