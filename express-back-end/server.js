const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const PORT = 8080;
const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((error, client) => {
  console.log(process.env.DB_HOST);
  if (error) {
    console.log(error);
  } else {
    console.log("connected");
  }
});

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

// Sample GET route
App.get("/api/data", (req, res) =>
  res.json({
    message: "Seems to work!"
  })
);

App.post("/api/new", (req, res) => {
  console.log(JSON.stringify(req.body));
  db.query(
    `
    INSERT INTO customers (name, phone_number, address)
    VALUES ($1, $2, $3)
    RETURNING id;
    `,
    [req.body.newOrder.name, 0, req.body.newOrder.address]
  )
    .then(data1 => {
      console.log(data1.rows[0].id);
      db.query(
        `
        INSERT INTO orders (order_status, note, customer_id)
        VALUES ($1, $2, $3)
        RETURNING id;
        `,
        [req.body.newOrder.status, req.body.newOrder.note, data1.rows[0].id]
      ).then(data2 => {
        console.log(data2.rows[0].id);
        for (let item of Object.keys(req.body.newOrder.items)) {
          console.log(req.body.newOrder.items[item]);
          db.query(
            `
            INSERT INTO items (description, price, quantity, sub_total, order_id)
            VALUES ($1, $2, $3, $4, $5)
            `,
            [
              req.body.newOrder.items[item].description,
              Number(req.body.newOrder.items[item].price),
              Number(req.body.newOrder.items[item].quantity),
              Number(req.body.newOrder.items[item].price) *
                Number(req.body.newOrder.items[item].quantity),
              data2.rows[0].id
            ]
          );
        }
        res.json({ message: "New Order Created!" });
      });
    })
    .catch(err => console.log(err));
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
