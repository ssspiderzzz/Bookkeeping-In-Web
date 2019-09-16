DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) DEFAULT '',
  phone_number INT,
  address VARCHAR(255) DEFAULT ''
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_status VARCHAR(255),
  date_create TIMESTAMP,
  date_end TIMESTAMP,
  note VARCHAR(255),
  customer_id INT REFERENCES customers(id)
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) DEFAULT '',
  price INT
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INT REFERENCES orders(id),
  item_id INT REFERENCES items(id),
  quantity INT,
  sub_total INT
);
