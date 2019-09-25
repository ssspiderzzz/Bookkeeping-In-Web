import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import NewOrder from "./components/NewOrder";
import "./App.css";

export default function App(props) {
  const [state, setState] = useState("");

  useEffect(() => {
    axios.get("/api/data").then(res => {
      console.log(res.data.orders.rows);
      console.log(res.data.items.rows);
      setState({
        orders: res.data.orders.rows,
        items: res.data.items.rows
      });
    });
  }, []);

  return (
    <div className="App">
      <Navbar></Navbar>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/new">New Order</Link>
            </li>
          </ul>
          <hr />
          <Route exact path="/" />
          <Route path="/new" component={NewOrder} />
        </div>
      </Router>

      <Table orders={state.orders} items={state.items}></Table>
    </div>
  );
}
