import React, { useReducer, useState } from "react";
import reducer, {
  ADD_ITEM,
  EDIT_ITEM,
  EDIT_GENERAL_INFO
} from "../reducer/application";
import { toLocaleTime } from "../helpers/functions";
import axios from "axios";
import "./EditOrder.css";
import DropdownList from "./DropdownList";
import ButtonIcon from "./ButtonIcon";

export default function EditOrder(props) {
  const [editOrder, dispatch] = useReducer(reducer, {
    order_id: props.order.id,
    customer_id: props.order.customer_id,
    date_create: props.order.date_create,
    customer_name: props.order.customer_name,
    order_status: props.order.order_status,
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

  function onChangeHandler(event, id, current_field) {
    dispatch({
      type: EDIT_ITEM,
      id: id,
      value: event.target.value,
      field: current_field
    });
  }

  function handleSubmit() {
    if (editOrder.customer_name && editOrder.order_status) {
      axios
        .post("/api/edit/", { editOrder: editOrder })
        .then(() => {
          props.setRefresh(prev => prev + 1);
          props.setEditID("");
        })
        .catch(err => console.log(err));
      setErrorCheck(false);
    } else {
      setErrorCheck(true);
    }
  }

  function back() {
    props.setEditID("");
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
                  onChange={event =>
                    onGeneralInfoChange(event, "customer_name")
                  }
                  value={editOrder.customer_name}
                ></input>
              </th>
              <th>Order Status</th>
              <th>
                <span>{editOrder.order_status}</span>
                <DropdownList onGeneralInfoChange={onGeneralInfoChange} />
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
                        onChangeHandler(event, id, "description")
                      }
                      value={editOrder.items[id].description}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, id, "price")}
                      value={editOrder.items[id].price}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, id, "quantity")}
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
        <ButtonIcon icon_type="back" action={back} />
        <ButtonIcon icon_type="add" action={addItem} />
        <ButtonIcon icon_type="check" action={handleSubmit} />
      </div>
    </React.Fragment>
  );
}
