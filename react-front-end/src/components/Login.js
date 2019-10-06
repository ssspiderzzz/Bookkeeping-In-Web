import React, { useState } from "react";
import MuiThemeProvider from "@material-ui/core/MuiThemeProvider";
import RaisedButton from "@material-ui/core/RaisedButton";
import TextField from "@material-ui/core/TextField";

export default function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: ""
  });

  function handleClick() {}

  return (
    <React.Fragment>
      <div>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your Username"
              floatingLabelText="Username"
              onChange={(event, newValue) => setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => setState({ password: newValue })}
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              onClick={event => handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    </React.Fragment>
  );
}
