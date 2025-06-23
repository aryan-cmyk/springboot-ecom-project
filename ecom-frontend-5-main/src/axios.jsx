import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api",
});
delete API.defaults.headers.common["Authorization"];
export default API;
