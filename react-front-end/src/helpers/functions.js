export function toLocaleTime(time) {
  const local_time = new Date(time).toLocaleString("en-US", {
    timeZone: "America/Vancouver"
  });
  const splited_time = local_time.split(",")[0].split("/");
  let yyyy = splited_time[2];
  let mm = splited_time[0];
  let dd = splited_time[1];
  if (mm.length === 1) {
    mm = "0" + mm;
  }
  if (dd.length === 1) {
    dd = "0" + dd;
  }
  return yyyy + "-" + mm + "-" + dd;
}
