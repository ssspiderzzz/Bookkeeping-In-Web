import React from "react";
import "./Table.css";

export default function Table(props) {
  return (
    <React.Fragment>
      {props.data && (
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
              {props.data.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>{data.product}</td>
                    <td>{data.unit}</td>
                    <td>{data.price}</td>
                    <td>{data.price * data.unit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
}
