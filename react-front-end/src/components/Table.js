import React, { useState } from "react";
import EachOrder from "./EachOrder";
import EditOrder from "./EditOrder";
import "./Table.css";

export default function Table(props) {
  const [editID, setEditID] = useState("");

  return (
    <React.Fragment>
      {props.orders &&
        props.orders.map((order, order_index) => {
          const order_items = props.items.filter(
            item => item.order_id === order.id
          );
          return (
            <React.Fragment>
              {order.id !== editID && (
                <EachOrder
                  order={order}
                  order_index={order_index}
                  items={order_items}
                  setEditID={setEditID}
                />
              )}
              {order.id === editID && (
                <EditOrder
                  order={order}
                  order_index={order_index}
                  items={order_items}
                  setEditID={setEditID}
                />
              )}
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
}
