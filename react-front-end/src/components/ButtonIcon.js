import React from "react";
import add_icon from "./images/add-64.png";
import check_icon from "./images/check-64.png";
import back_icon from "./images/back-64.png";
import edit_icon from "./images/edit-64.png";
import delete_icon from "./images/delete-40.png";
import "./ButtonIcon.css";

export default function ButtonIcon(props) {
  const text_id = `${props.icon_type}_text`;
  const button_id = `${props.icon_type}_button`;
  let icon;
  let text;
  switch (props.icon_type) {
    case "add":
      icon = add_icon;
      text = "Add Item";
      break;
    case "check":
      icon = check_icon;
      text = "Save";
      break;
    case "back":
      icon = back_icon;
      text = "Cancel Changes";
      break;
    case "edit":
      icon = edit_icon;
      text = "Edit";
      break;
    case "delete":
      icon = delete_icon;
      text = "Delete";
      break;
    default:
      console.log("Undefined icon type!");
  }
  return (
    <React.Fragment>
      <span id={text_id}>{text}</span>
      <span>
        <input
          id={button_id}
          type="image"
          src={icon}
          alt={props.icon_type}
          onClick={props.action}
        ></input>
      </span>
    </React.Fragment>
  );
}
