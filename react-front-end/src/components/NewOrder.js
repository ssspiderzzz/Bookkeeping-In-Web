import React, { useReducer } from "react";
import reducer, {
  ADD_ITEM,
  EDIT_ITEM,
  EDIT_GENERAL_INFO
} from "../reducer/application";
import axios from "axios";
import "./NewOrder.css";

export default function NewOrder(props) {
  const [newOrder, dispatch] = useReducer(reducer, {
    name: "",
    status: "",
    address: "",
    phone_number: "",
    note: "",
    items: {}
  });

  function addItem() {
    let id = Object.keys(newOrder.items).length + 1;
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
    axios
      .post("/api/new", { newOrder: newOrder })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <React.Fragment>
      <div id="tableRoot">
        <table className="box-table">
          <thead id="tableHead">
            <tr id="customer_status">
              <th>Customer</th>
              <th>
                <input
                  onChange={event => onGeneralInfoChange(event, "name")}
                  value={newOrder.name}
                ></input>
              </th>
              <th>Order Status</th>
              <th>
                <input
                  onChange={event => onGeneralInfoChange(event, "status")}
                  value={newOrder.status}
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
            {Object.keys(newOrder.items).map((id, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      onChange={event =>
                        onChangeHandler(event, index, "description")
                      }
                      value={newOrder.items[id].description}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event =>
                        onChangeHandler(event, index, "quantity")
                      }
                      value={newOrder.items[id].quantity}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, index, "price")}
                      value={newOrder.items[id].price}
                    ></input>
                  </td>
                  <td>
                    {newOrder.items[id].quantity * newOrder.items[id].price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button onClick={addItem}>Add New Item</button>
      <button onClick={handleSubmit}>Submit</button>
    </React.Fragment>
  );
}
