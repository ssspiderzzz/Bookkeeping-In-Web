import axios from "axios";
import _ from "lodash";

export function fetchAllData(setState, email) {
  console.log("Fetching data from server...");
  axios
    .post("/api/userCheck", {
      withCredentials: true,
      email: email
    })
    .then(res_userCheck => {
      if (res_userCheck.data.id) {
        axios
          .post(`/api/data`, {
            id: res_userCheck.data.id
          })
          .then(res => {
            if (res.data.orders.rows) console.log(`Data received`);
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
