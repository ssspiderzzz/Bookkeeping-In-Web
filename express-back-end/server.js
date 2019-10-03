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

App.get("/api/data", (req, res) => {
  db.query(
    `
    SELECT * 
    FROM orders JOIN customers ON customer_id = customers.id
    `
  )
    .then(data1 => {
      db.query(`SELECT * FROM items`).then(data2 => {
        res.json({ orders: data1, items: data2 });
      });
    })
    .catch(err => console.log(err));
});

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
      db.query(
        `
        INSERT INTO orders (order_status, note, customer_id)
        VALUES ($1, $2, $3)
        RETURNING id;
        `,
        [
          req.body.newOrder.order_status,
          req.body.newOrder.note,
          data1.rows[0].id
        ]
      ).then(data2 => {
        for (let item of Object.keys(req.body.newOrder.items)) {
          if (req.body.newOrder.items[item].description) {
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
        }
        res.redirect("/");
      });
    })
    .catch(err => console.log(err));
});

App.post("/api/delete/:id", (req, res) => {
  db.query(
    `
  DELETE FROM items WHERE order_id = $1;
  `,
    [req.params.id]
  )
    .then(() => {
      db.query(
        `
    DELETE FROM orders WHERE orders.id = $1;
    `,
        [req.params.id]
      ).then(res.json(`Order Delete!`));
    })
    .catch(err => console.log(err));
});

App.post("/api/edit", (req, res) => {
  console.log(JSON.stringify(req.body));
  db.query(
    `
    UPDATE customers
    SET name = $1, phone_number = $2, address = $3
    WHERE id = $4;
    `,
    [
      req.body.editOrder.name,
      req.body.editOrder.phone_number,
      req.body.editOrder.address,
      req.body.editOrder.customer_id
    ]
  )
    .then(data1 => {
      db.query(
        `
    UPDATE orders
    SET order_status = $1, note = $2
    WHERE id = $3;
    `,
        [
          req.body.editOrder.order_status,
          req.body.editOrder.note,
          req.body.editOrder.order_id
        ]
      ).then(data2 => {
        for (let item of Object.keys(req.body.editOrder.items)) {
          if (req.body.editOrder.items[item].id) {
            db.query(
              `
                  UPDATE items 
                  SET description = $1, price = $2, quantity = $3, sub_total = $4
                  WHERE id = $5;
                  `,
              [
                req.body.editOrder.items[item].description,
                Number(req.body.editOrder.items[item].price),
                Number(req.body.editOrder.items[item].quantity),
                Number(req.body.editOrder.items[item].price) *
                  Number(req.body.editOrder.items[item].quantity),
                req.body.editOrder.items[item].id
              ]
            );
          } else {
            db.query(
              `
                  INSERT INTO items (description, price, quantity, sub_total, order_id)
                  VALUES ($1, $2, $3, $4, $5)
                  `,
              [
                req.body.editOrder.items[item].description,
                Number(req.body.editOrder.items[item].price),
                Number(req.body.editOrder.items[item].quantity),
                Number(req.body.editOrder.items[item].price) *
                  Number(req.body.editOrder.items[item].quantity),
                req.body.editOrder.order_id
              ]
            );
          }
        }
        res.json("Edit succeed!");
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
