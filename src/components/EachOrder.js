import React, { useState } from "react";
import { toLocaleTime } from "../helpers/functions";
import axios from "axios";
import ButtonIcon from "./ButtonIcon";
import "./EachOrder.css";

export default function EachOrder(props) {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteID, setDeleteID] = useState("");

  function handleEdit(id) {
    props.setEditID(id);
  }

  function confirm(id) {
    setDeleteID(id);
    setDeleteMessage(`Deleting order #${id}, are you sure?`);
  }

  function back() {
    setDeleteID(``);
    setDeleteMessage(``);
  }

  function handleDelete(id) {
    axios
      .post(`/api/delete/${id}`)
      .then(() => {
        setDeleteID(``);
        setDeleteMessage(``);
        props.setRefresh(true);
      })
      .catch(err => console.log(err));
  }

  return (
    <React.Fragment>
      <div id="tableRoot">
        <table className="box-table">
          <thead id="tableHead">
            <tr id="order_id">
              <th>Order ID</th>
              <th>{props.order.id}</th>
              <th>Date Created</th>
              <th>{toLocaleTime(props.order.date_create)}</th>
            </tr>
            <tr id="customer_status">
              <th>Customer</th>
              <th>{props.order.customer_name}</th>
              <th>Order Status</th>
              <th>{props.order.order_status}</th>
            </tr>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(props.items).map((id, item_index) => {
              return (
                <tr key={item_index}>
                  <td>{props.items[id].description}</td>
                  <td>{props.items[id].price}</td>
                  <td>{props.items[id].quantity}</td>
                  <td>{props.items[id].price * props.items[id].quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div id="button_group">
        {deleteMessage && deleteID === props.order.id && (
          <div id="confirmBox">
            <p id="delete_message">{deleteMessage}</p>
            <button id="yes" onClick={() => handleDelete(props.order.id)}>
              YES
            </button>
            <button id="no" onClick={back}>
              NO
            </button>
          </div>
        )}
        {!deleteMessage &&
          (deleteID !== props.order.id && (
            <React.Fragment>
              <ButtonIcon
                icon_type="edit"
                action={() => handleEdit(props.order.id)}
              />
              <ButtonIcon
                icon_type="delete"
                action={() => confirm(props.order.id)}
              />
            </React.Fragment>
          ))}
      </div>
    </React.Fragment>
  );
}
