import dotenv from "dotenv";
dotenv.config();
const urlApi =
    process.env.NEXT_PUBLIC_API_NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL_PROD
        : process.env.NEXT_PUBLIC_API_URL_DEV;
export default urlApi;
