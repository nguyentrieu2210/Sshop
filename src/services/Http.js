import { BASE_API } from "../shared/contants/app";
import axios from "axios";
const Http = axios.create({
    baseURL: BASE_API,
});
export default Http;