import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);



app.get ("/", (req,res) => {
        res.send("backend is running");
});

export default app;