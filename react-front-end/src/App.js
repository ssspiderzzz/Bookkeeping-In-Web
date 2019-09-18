import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import "./App.css";

const testData = [
  { product: "item", unit: 2, price: 5 },
  { product: "item1", unit: 4, price: 7 },
  { product: "item2", unit: 1, price: 6 },
  { product: "item4", unit: 5, price: 7 },
  { product: "item5", unit: 4, price: 7 },
  { product: "item6", unit: 1, price: 6 },
  { product: "item7", unit: 5, price: 7 }
];

export default function App(props) {
  const [state, setState] = useState("");

  const fetchData = () => {
    axios.get("/api/data").then(response => {
      console.log(response.data);
      console.log(response.data.message);
      setState({
        message: response.data.message
      });
    });
  };

  return (
    <div className="App">
      <Navbar></Navbar>
      <button onClick={() => fetchData()}>FetchData</button>
      <p>{state.message}</p>
      <Table data={testData}></Table>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>
          <hr />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    </div>
  );
}
