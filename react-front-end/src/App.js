import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
              <span id="home_button">Home Page</span>
            </Link>
            <Link to="/new">
              <span id="new_button">New Order</span>
            </Link>
            <Link to="/lists">
              <span id="new_button">Lists</span>
            </Link>
            <Link to="/login">
              <span id="new_button">Login</span>
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
            <Route exact path="/login" component={Login} />
          </div>
        </Router>
      </div>
    </div>
  );
}
