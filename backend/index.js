import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log("Hello from ZenCartopia Server...");
    res.send("Welcome to ZenCartopia!");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
