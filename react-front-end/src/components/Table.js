import React from "react";
import EachOrder from "./EachOrder";
import "./Table.css";

export default function Table(props) {
  return (
    <React.Fragment>
      {props.orders &&
        props.orders.map((order, order_index) => {
          return (
            <EachOrder
              order={order}
              order_index={order_index}
              items={props.items}
            />
          );
        })}
    </React.Fragment>
  );
}
