DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS items CASCADE;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) DEFAULT '',
  phone_number VARCHAR(255) DEFAULT '',
  address VARCHAR(255) DEFAULT ''
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  order_status VARCHAR(255),
  date_create TIMESTAMP DEFAULT NOW(),
  date_end TIMESTAMP,
  note VARCHAR(255),
  customer_id INT REFERENCES customers(id)
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR(255) DEFAULT '',
  price INT,
  quantity INT,
  sub_total INT,
  order_id INT REFERENCES orders(id)
);
