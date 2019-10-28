import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./Login.css";

export default function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const [user, setUser] = useState("");

  function handleClick() {
    console.log(state);
  }

  function responseGoogle(response) {
    const res = JSON.stringify(response);
    setTimeout(() => {
      console.log("google response:" + res);
      if (res) console.log(JSON.stringify(response.profileObj));
    }, 3000);
  }

  function onSuccess(response) {
    setUser(response.profileObj.email);
  }

  function onLogout(response) {
    setUser(response);
  }

  return (
    <React.Fragment>
      {user && <div>Welcome, {user}!</div>}
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
          scope="profile"
          buttonText="Sign in with Google"
          uxMode="redirect"
          redirectUri="http://localhost:3000"
          onSuccess={onSuccess}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <br />
        <br />
        <GoogleLogout
          clientId="680587798801-qp0mndlka16fgm91ed97gkoot3ru5145.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={onLogout}
        />
      </div>
    </React.Fragment>
  );
}
