import axios from "axios";
import _ from "lodash";

export function fetchAllData(setState, setRefresh) {
  axios.get("/api/data").then(res => {
    console.log(res.data.orders.rows);
    console.log(res.data.items.rows);
    setState({
      orders: _.orderBy(res.data.orders.rows, "id", "desc"),
      items: _.orderBy(res.data.items.rows, "id")
    });
    setRefresh(false);
  });
}

export function userCheck() {
  axios.get("/api/userCheck").then(id => {
    if (id) {
      axios.get("/api/data").then(res => {});
    }
  });
}
