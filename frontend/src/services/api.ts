import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-3-12-152-137.us-east-2.compute.amazonaws.com",
  // baseURL: "http://localhost:3001/",
});

export default api;
