import React from "react";
import { toLocaleTime } from "../helpers/functions";
import "./Table.css";

export default function Table(props) {
  return (
    <React.Fragment>
      {props.orders &&
        props.orders.map((order, order_index) => {
          return (
            <div id="tableRoot" key={order_index}>
              <table className="box-table">
                <thead id="tableHead">
                  <tr id="order_id">
                    <th>Order ID</th>
                    <th>{order.id}</th>
                    <th>Date Created</th>
                    <th>{toLocaleTime(order.date_create)}</th>
                  </tr>
                  <tr id="customer_status">
                    <th>Customer</th>
                    <th>{order.name}</th>
                    <th>Order Status</th>
                    <th>{order.order_status}</th>
                  </tr>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {props.items.map((item, item_index) => {
                    return (
                      item.order_id === order.id && (
                        <tr key={item_index}>
                          <td>{item.description}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price * item.quantity}</td>
                        </tr>
                      )
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
    </React.Fragment>
  );
}
