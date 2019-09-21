import React, { useReducer } from "react";
import reducer, { ADD_ITEM, EDIT_ITEM } from "../reducer/application";
import axios from "axios";
import "./NewOrder.css";

export default function NewOrder(props) {
  const [newOrder, dispatch] = useReducer(reducer, {
    customer: "",
    items: {}
  });

  function addItem() {
    let id = Object.keys(newOrder.items).length + 1;
    dispatch({ type: ADD_ITEM, id: id });
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
            {Object.keys(newOrder.items).map((id, index) => {
              return (
                <tr key={index}>
                  <td>
                    <input
                      onChange={event =>
                        onChangeHandler(event, index, "product")
                      }
                      value={newOrder.items[id].product}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, index, "unit")}
                      value={newOrder.items[id].unit}
                    ></input>
                  </td>
                  <td>
                    <input
                      onChange={event => onChangeHandler(event, index, "price")}
                      value={newOrder.items[id].price}
                    ></input>
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
