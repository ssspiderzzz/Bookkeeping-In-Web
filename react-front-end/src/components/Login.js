import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import "./Login.css";

export default function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  function handleClick() {
    console.log(state);
  }

  function responseGoogle(response) {
    console.log(response);
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
        <GoogleLogin
          clientId="680587798801-qp0mndlka16fgm91ed97gkoot3ru5145.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          uxMode="redirect"
          redirectUri="http://localhost:3000"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </React.Fragment>
  );
}
