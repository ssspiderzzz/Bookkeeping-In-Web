import axios from "axios";
import _ from "lodash";

export function fetchAllData(setState, id_token) {
  console.log("Fetching data from server...");
  if (id_token) {
    console.log(`inside usercheck`);
    axios
      .post(`/api/data`, {
        id: id_token
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
}
