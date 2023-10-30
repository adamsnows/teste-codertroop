import axios from "axios";

const api = axios.create({
  baseURL: "https://portal-api-campeoes.herokuapp.com/",
});

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

export default api;
