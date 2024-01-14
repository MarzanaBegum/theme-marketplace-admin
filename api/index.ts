import axios from "axios";
import { getCookie } from "cookies-next";

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://themehive.onrender.com";

export const api = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        "admin-hash": getCookie("admin-auth"),
    },
});
