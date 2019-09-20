import React, { useState } from "react";
import axios from "axios";
import "./NewOrder.css";

export default function NewOrder(props) {
  const [newOrder, setNewOrder] = useState({
    items: [
      {
        product: "",
        unit: 0,
        price: 0
      }
    ]
  });

  function addItem() {
    setNewOrder(prev => [
      ...prev.items,
      {
        product: "",
        unit: 0,
        price: 0
      }
    ]);
  }

  function onChangeHandler(event, index) {
    console.log(event.target.value);
    console.log(index);
    setNewOrder(prev => {
      const items = prev.items;
      items[index].product = event.target.value;
      return items;
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
                      value={item.product}
                    ></input>
                  </td>
                  <td>
                    <input></input>
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
