import React, { useState, useReducer } from "react";
import axios from "axios";
import "./NewOrder.css";

export default function NewOrder(props) {
  const ADD_ITEM = "ADD_ITEM";
  const EDIT_ITEM = "EDIT_ITEM";

  function reducer(orderDetails, action) {
    switch (action.type) {
      case ADD_ITEM:
        return {
          ...orderDetails,
          items: [...orderDetails.items, { product: "", unit: 0, price: 0 }]
        };
      case EDIT_ITEM:
        return {
          ...orderDetails,
          items: [
            ...orderDetails.items,
            { product: action.value, unit: 0, price: 0 }
          ]
        };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [newOrder, dispatch] = useReducer(reducer, {
    customer: "",
    items: []
  });

  function addItem() {
    dispatch({ type: "ADD_ITEM" });
  }

  function onChangeHandler(event, current_index) {
    console.log(event.target.value);
    console.log(current_index);
    dispatch({
      type: "EDIT_ITEM",
      index: current_index,
      value: event.target.value
    });
  }

  function handleSubmit() {
    axios
      .post("/api/new", { body: newOrder })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <React.Fragment>
      <div id="tableRoot">
        <table className="box-table">
          <thead id="tableHead">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Unit</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {newOrder.items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, index)}
                    ></input>
                  </td>
                  <td>
                    <input value={item.product}></input>
                  </td>
                  <td>
                    <input></input>
                  </td>
                  <td>
                    <input></input>
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
