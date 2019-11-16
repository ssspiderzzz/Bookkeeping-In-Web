import React from "react";
import Cookies from "js-cookie";
import Button from "@material-ui/core/Button";
import { GoogleLogin } from "react-google-login";
import background from "./images/background/bg.jpg";
import "./Login.css";
import axios from "axios";

export default function Login(props) {
  function onSuccess(response) {
    Cookies.set("user", response.profileObj.givenName, { expires: 7 });
    Cookies.set("email", response.profileObj.email, { expires: 7 });

    const id_token = response.getAuthResponse().id_token;
    // const config = {
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }
    // };
    axios.post(`/api/verify`, { id_token: id_token }).then(res_userCheck => {
      console.log(`id_token sent`, res_userCheck.data.id);
      props.setRefresh(prev => prev + 1);
    });
  }

  function onFailure(response) {
    console.log("Error Login Fail: " + response);
  }

  function guestLogin() {
    Cookies.set("user", "Guest", { expires: 1 });
    Cookies.set("email", "guest-login", { expires: 1 });
    props.setRefresh(prev => prev + 1);
  }

  return (
    <React.Fragment>
      <img id="background" src={background} alt="background"></img>
      {!props.auth.user && !props.auth.email && (
        <div id="signInContainer">
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
          <p>OR</p>
          <Button onClick={guestLogin} variant="contained" color="primary">
            Sign in as Guest
          </Button>
        </div>
      )}
    </React.Fragment>
  );
}
