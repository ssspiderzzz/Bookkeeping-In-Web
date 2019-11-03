import React from "react";
import Cookies from "js-cookie";
import { GoogleLogin } from "react-google-login";
import "./Login.css";

export default function Login(props) {
  function onSuccess(response) {
    Cookies.set("user", response.profileObj.givenName, { expires: 7 });
    Cookies.set("email", response.profileObj.email, { expires: 7 });
    props.setAuthRefresh(true);
  }

  function onFailure(response) {
    console.log("Error Login Fail: " + response);
  }

  return (
    <React.Fragment>
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
      </div>
    </React.Fragment>
  );
}
