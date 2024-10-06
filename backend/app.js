import express from "express";

import router from "./src/routes/index.js";

const app = express();

app.use(express.json());

app.use("/api", router);

app.listen(3000, () => {
    console.log("Starting server...");
    console.log("Server is running on port 3000");
});
