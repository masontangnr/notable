const Pool = require("pg").Pool

const pool = new Pool({
  user: process.env.user,
  host:process.env.host,
  database:process.env.database,
  password:process.env.password,
  port: 5432
})

pool.connect(function(err) {
  if (err) {
    console.error('Database pool failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

module.exports = pool;