import axios from "axios";
import _ from "lodash";

export function fetchAllData(setState) {
  console.log("Fetching data from server...");
  axios.get("/api/userCheck", { withCredentials: true }).then(res_userCheck => {
    if (res_userCheck.data.id) {
      axios.get("/api/data").then(res => {
        console.log(res.data.orders.rows);
        console.log(res.data.items.rows);
        setState({
          orders: _.orderBy(res.data.orders.rows, "id", "desc"),
          items: _.orderBy(res.data.items.rows, "id")
        });
      });
    } else {
      console.log(`No users found`);
    }
  });
}
