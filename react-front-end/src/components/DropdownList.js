import React from "react";
import "./DropdownList.css";
import dropdown_icon from "./images/dropdown-48.png";

export default function DropdownList(props) {
  const user_setting = [
    "Waiting for Payment",
    "Paid",
    "Shipping",
    "Delivering",
    "Done"
  ];

  return (
    <div className="dropdown">
      <img alt="dropdown_icon" src={dropdown_icon} className="dropbtn"></img>
      <div className="dropdown-content">
        {user_setting.map((status, index) => {
          return (
            <React.Fragment key={index}>
              <input
                type="button"
                onClick={event =>
                  props.onGeneralInfoChange(event, "order_status")
                }
                value={status}
              ></input>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
