import React, { useReducer, useState } from "react";
import reducer, {
  ADD_ITEM,
  EDIT_ITEM,
  EDIT_GENERAL_INFO
} from "../reducer/application";
import { toLocaleTime } from "../helpers/functions";
import axios from "axios";
import "./EditOrder.css";
import add_icon from "./images/add-64.png";
import check_icon from "./images/check-64.png";

export default function EditOrder(props) {
  const [editOrder, dispatch] = useReducer(reducer, {
    order_id: props.order.id,
    customer_id: props.order.customer_id,
    date_create: props.order.date_create,
    name: props.order.name,
    status: props.order.order_status,
    address: "",
    phone_number: "",
    note: "",
    items: props.items
  });

  const [errorCheck, setErrorCheck] = useState(false);

  function addItem() {
    let id = Object.keys(editOrder.items).length + 1;
    dispatch({ type: ADD_ITEM, id: id });
  }

  function onGeneralInfoChange(event, current_field) {
    dispatch({
      type: EDIT_GENERAL_INFO,
      value: event.target.value,
      field: current_field
    });
  }

  function onChangeHandler(event, current_index, current_field) {
    dispatch({
      type: EDIT_ITEM,
      id: current_index + 1,
      value: event.target.value,
      field: current_field
    });
  }

  function handleSubmit() {
    if (editOrder.name && editOrder.status) {
      axios
        .post("/api/edit/", { editOrder: editOrder })
        .then(() => {
          window.location.href = "/";
        })
        .catch(err => console.log(err));
      setErrorCheck(false);
      props.setEditID("");
    } else {
      setErrorCheck(true);
    }
  }

  return (
    <React.Fragment>
      {errorCheck && (
        <div id="errorEmpty">Please enter Customer Name and Status.</div>
      )}
      <div id="editOrderTable">
        <table className="box-table">
          <thead id="tableHead">
            <tr id="order_id">
              <th>Order ID</th>
              <th>{editOrder.order_id}</th>
              <th>Date Created</th>
              <th>{toLocaleTime(editOrder.date_create)}</th>
            </tr>
            <tr id="customer_status">
              <th>Customer</th>
              <th>
                <input
                  onChange={event => onGeneralInfoChange(event, "name")}
                  value={editOrder.name}
                ></input>
              </th>
              <th>Order Status</th>
              <th>
                <input
                  onChange={event => onGeneralInfoChange(event, "status")}
                  value={editOrder.status}
                ></input>
              </th>
            </tr>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(editOrder.items).map((id, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      onChange={event =>
                        onChangeHandler(event, index, "description")
                      }
                      value={editOrder.items[id].description}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, index, "price")}
                      value={editOrder.items[id].price}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event =>
                        onChangeHandler(event, index, "quantity")
                      }
                      value={editOrder.items[id].quantity}
                    ></input>
                  </td>
                  <td>
                    {editOrder.items[id].price * editOrder.items[id].quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div id="button_group">
        <span id="add_text">Add Item</span>
        <span>
          <input
            id="add_button"
            type="image"
            src={add_icon}
            alt="Add"
            onClick={addItem}
          ></input>
        </span>
        <span id="check_text">Save Changes</span>
        <span>
          <input
            id="check_button"
            type="image"
            src={check_icon}
            alt="Check"
            onClick={handleSubmit}
          ></input>
        </span>
      </div>
    </React.Fragment>
  );
}
