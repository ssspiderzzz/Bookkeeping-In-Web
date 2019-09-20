import React, { useState } from "react";
import "./NewOrder.css";

export default function NewOrder(props) {
  const [newOrder, setNewOrder] = useState({
    product: "",
    unit: 0,
    price: 0
  });

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
            <tr key={0}>
              <td>
                <input></input>
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
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
