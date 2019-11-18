import axios from "axios";
import _ from "lodash";

export function fetchAllData(setState, id_token) {
  console.log("Fetching data from server...");
  axios.post(`/api/verify`, { id_token: id_token }).then(res_userCheck => {
    axios
      .post(`/api/data`, {
        id: res_userCheck.data
      })
      .then(res => {
        if (res.data.orders.rows) console.log(`Data received`);
        setState({
          orders: _.orderBy(res.data.orders.rows, "id", "desc"),
          items: _.orderBy(res.data.items.rows, "id")
        });
      });
  });
}
