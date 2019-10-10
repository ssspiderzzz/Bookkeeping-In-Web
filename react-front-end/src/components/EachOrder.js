import React, { useState } from "react";
import { toLocaleTime } from "../helpers/functions";
import axios from "axios";
import ButtonIcon from "./ButtonIcon";

export default function EachOrder(props) {
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteID, setDeleteID] = useState("");

  function handleEdit(id) {
    props.setEditID(id);
  }

  function handleDelete(id) {
    axios
      .post(`/api/delete/${id}`)
      .then(() => {
        setDeleteID(id);
        setDeleteMessage(
          `Order#${id} has been deleted. Page would be refreshed in 3 seconds.`
        );
        setTimeout(() => {
          props.setRefresh(true);
        }, 3000);
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
          <span id="delete_message">{deleteMessage}</span>
        )}
        <ButtonIcon
          icon_type="edit"
          action={() => handleEdit(props.order.id)}
        />
        <ButtonIcon
          icon_type="delete"
          action={() => handleDelete(props.order.id)}
        />
      </div>
    </React.Fragment>
  );
}
