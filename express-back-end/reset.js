require("dotenv").config();
const { Pool } = require("pg");
const dbParams = require("./db_config");
const fs = require("fs");

const db = new Pool(dbParams);

db.connect((error, client) => {
  console.log(process.env.DB_HOST);
  if (error) {
    console.log(error);
  } else {
    console.log("connected");
  }
});
