import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT||5000;
import mongoDB from "./config/db.js";
import router from "./routers/index.js";
mongoDB();

const app=express();
const allowedOrigins = [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_DEV_URL,
    "http://localhost:5173",
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        // Allow non-browser requests and configured frontend origins.
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
// app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/", router);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})
