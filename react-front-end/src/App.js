import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Table from "./components/Table";
import "./App.css";

const testData = [
  { product: "item", unit: 2, price: 5, total: 10 },
  { product: "item1", unit: 4, price: 7, total: 28 },
  { product: "item2", unit: 1, price: 6, total: 6 }
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
    </div>
  );
}
