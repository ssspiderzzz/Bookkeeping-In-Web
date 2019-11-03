import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Home, PostAdd, LibraryBooks } from "@material-ui/icons";
import axios from "axios";
import _ from "lodash";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import NewOrder from "./components/NewOrder";
import Login from "./components/Login";
import "./App.css";

export default function App(props) {
  const [state, setState] = useState("");
  const [refresh, setRefresh] = useState(false);

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
      <Navbar></Navbar>
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
            <Route exact path="/" render={() => <Login />} />
            <Route
              exact
              path="/lists"
              render={() => (
                <Table
                  orders={state.orders}
                  items={state.items}
                  setRefresh={setRefresh}
                ></Table>
              )}
            />
            <Route exact path="/new" component={NewOrder} />
          </div>
        </Router>
      </div>
    </div>
  );
}
