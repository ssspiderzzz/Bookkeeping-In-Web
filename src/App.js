import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Home, PostAdd, LibraryBooks } from "@material-ui/icons";
import axios from "axios";
import _ from "lodash";
import MenuAppBar from "./components/MenuAppBar";
import Table from "./components/Table";
import NewOrder from "./components/NewOrder";
import Login from "./components/Login";
import "./App.css";
import Cookies from "js-cookie";

export default function App(props) {
  const [state, setState] = useState("");
  const [auth, setAuth] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [authRefresh, setAuthRefresh] = useState(false);

  useEffect(() => {
    setAuth({
      user: Cookies.get("user"),
      email: Cookies.get("email")
    });
    setAuthRefresh(false);
  }, [authRefresh]);

  useEffect(() => {
    axios.get("/api/data").then(res => {
      console.log(res.data.orders.rows);
      console.log(res.data.items.rows);
      setState({
        orders: _.sortBy(res.data.orders.rows, "id"),
        items: _.sortBy(res.data.items.rows, "id")
      });
      setRefresh(false);
    });
  }, [refresh]);

  return (
    <div className="App">
      <MenuAppBar
        auth={auth}
        setAuth={setAuth}
        setAuthRefresh={setAuthRefresh}
      />
      <div id="main">
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
                <Login
                  auth={auth}
                  setAuth={setAuth}
                  setAuthRefresh={setAuthRefresh}
                />
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
