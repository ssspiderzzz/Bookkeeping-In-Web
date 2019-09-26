import React from "react";
import { toLocaleTime } from "../helpers/functions";
import "./Table.css";
import edit_icon from "./images/edit-64.png";
import delete_icon from "./images/delete-40.png";

export default function Table(props) {
  return (
    <React.Fragment>
      {props.orders &&
        props.orders.map((order, order_index) => {
          return (
            <div key={order_index}>
              <div id="tableRoot">
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
              <div id="button_group">
                <span id="edit_text">Edit</span>
                <span>
                  <input
                    id="edit_button"
                    type="image"
                    src={edit_icon}
                    alt="Edit"
                  ></input>
                </span>
                <span id="delete_text">Delete</span>
                <span>
                  <input
                    id="delete_button"
                    type="image"
                    src={delete_icon}
                    alt="Delete"
                  ></input>
                </span>
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
}
