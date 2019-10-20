import React, { useState } from "react";

export default function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  function handleClick() {
    console.log(state);
  }

  return (
    <React.Fragment>
      <div>
        <input
          onChange={event =>
            setState({ ...state, username: event.target.value })
          }
        />
        <br />
        <input
          type="password"
          onChange={(event, newValue) =>
            setState({ ...state, password: event.target.value })
          }
        />
        <br />
        <button type="Submit" onClick={event => handleClick(event)}>
          Sign In
        </button>
        <p>--- or ---</p>
        <div
          id="google-sign-in"
          class="g-signin2"
          data-onsuccess="onSignIn"
        ></div>
      </div>
    </React.Fragment>
  );
}
