import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./Login.css";

export default function Login(props) {
  const [state, setState] = useState({
    user: undefined,
    email: undefined
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setState({
      user: Cookies.get("user"),
      email: Cookies.get("email")
    });
    setRefresh(false);
  }, [refresh]);

  function onSuccess(response) {
    Cookies.set("user", response.profileObj.givenName, { expires: 7 });
    Cookies.set("email", response.profileObj.email, { expires: 7 });
    setRefresh(true);
  }

  function onFailure(response) {
    console.log("Error Login Fail: " + response);
  }

  function onLogout() {
    Cookies.remove("email");
    Cookies.remove("user");
    setRefresh(true);
  }

  return (
    <React.Fragment>
      {state.user && <div>Welcome, {state.user}!</div>}
      <div>
        <GoogleLogin
          clientId="680587798801-qp0mndlka16fgm91ed97gkoot3ru5145.apps.googleusercontent.com"
          scope="profile"
          buttonText="Sign in with Google"
          uxMode="popup"
          redirectUri="http://localhost:3000"
          onSuccess={onSuccess}
          onFailure={onFailure}
          theme={"dark"}
          cookiePolicy={"single_host_origin"}
        />
        <br />
        <br />
        <GoogleLogout
          clientId="680587798801-qp0mndlka16fgm91ed97gkoot3ru5145.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={onLogout}
          theme={"dark"}
        />
      </div>
    </React.Fragment>
  );
}
