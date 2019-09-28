import React, { useState } from "react";
import EachOrder from "./EachOrder";
import "./Table.css";

export default function Table(props) {
  const [editID, setEditID] = useState("");

  return (
    <React.Fragment>
      {props.orders &&
        props.orders.map((order, order_index) => {
          return (
            <React.Fragment>
              {order.id !== editID && (
                <EachOrder
                  order={order}
                  order_index={order_index}
                  items={props.items}
                  setEditID={setEditID}
                />
              )}
              {order.id === editID && <div>Testing</div>}
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
}
