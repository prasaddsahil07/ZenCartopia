import cookieParser from "cookie-parser";
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log("Hello from ZenCartopia Server...");
    res.send("Welcome to ZenCartopia!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
