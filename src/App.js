import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Home, PostAdd, LibraryBooks } from "@material-ui/icons";
import { fetchAllData } from "./helpers/fetchData";
import MenuAppBar from "./components/MenuAppBar";
import Table from "./components/Table";
import NewOrder from "./components/NewOrder";
import Login from "./components/Login";
import "./App.css";
import { gapi } from "gapi-script";
import Cookies from "js-cookie";
import Axios from "axios";

export default function App(props) {
  const [state, setState] = useState("");
  const [auth, setAuth] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [auth2, setAuth2] = useState(0);

  useEffect(() => {
    window.onload = () => {
      console.log(`Data refresh on window fully loaded...`);
      window.gapi.auth2.getAuthInstance().then(GoogleAuth => {
        const GoogleUser = GoogleAuth.currentUser.get();
        if (GoogleUser.isSignedIn()) {
          console.log("check if user is signed in:");
          console.log(GoogleUser.isSignedIn());
          console.log("user email:");
          console.log(GoogleUser.getBasicProfile().getEmail());
          setAuth({
            user: GoogleUser.getBasicProfile().getGivenName(),
            email: GoogleUser.getBasicProfile().getEmail()
          });
          fetchAllData(setState, GoogleUser.getAuthResponse().id_token);
        } else {
          console.log(`No user log in`);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (window.gapi.auth2) {
      console.log(`Data refreshing...`);
      window.gapi.auth2.getAuthInstance().then(GoogleAuth => {
        const GoogleUser = GoogleAuth.currentUser.get();
        console.log(GoogleUser.isSignedIn());
        if (GoogleUser.isSignedIn()) {
          console.log(`Google user sign in detected...`);
          setAuth({
            user: GoogleUser.getBasicProfile().getGivenName(),
            email: GoogleUser.getBasicProfile().getEmail()
          });
          fetchAllData(setState, GoogleUser.getAuthResponse().id_token);
        }
      });
    }
  }, [refresh]);

  return (
    <div className="App">
      <MenuAppBar auth={auth} setRefresh={setRefresh} />
      <div id="main">
        <button
          onClick={() => {
            setAuth2(prev => prev + 1);
          }}
        >
          {" "}
          check auth2 status{" "}
        </button>
        <Router>
          <div id="nav_button">
            <Link to="/">
              <Button id="HomeButton" variant="contained" color="default">
                <Home id="HomeIcon" />
                Home
              </Button>
            </Link>
            <Link to="/new">
              <Button id="PostAddButton" variant="contained" color="primary">
                <PostAdd id="PostAddIcon" />
                Add New
              </Button>
            </Link>
            <Link to="/lists">
              <Button
                id="LibraryBooksButton"
                variant="contained"
                color="secondary"
              >
                <LibraryBooks id="LibraryBooksIcon" />
                Full List
              </Button>
            </Link>
            <hr />
            <Route
              exact
              path="/"
              render={() => (
                <Login auth={auth} setAuth={setAuth} setRefresh={setRefresh} />
              )}
            />
            <Route
              exact
              path="/lists"
              render={() =>
                auth.email && (
                  <Table
                    orders={state.orders}
                    items={state.items}
                    setRefresh={setRefresh}
                  />
                )
              }
            />
            <Route
              exact
              path="/new"
              render={() => auth.email && <NewOrder auth={auth} />}
            />
          </div>
        </Router>
      </div>
    </div>
  );
}
