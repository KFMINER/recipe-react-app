import axios, { CanceledError } from "axios";

export default axios.create({
  baseURL: 'https://recipe-express-app-production.up.railway.app/api'
});

export { CanceledError };