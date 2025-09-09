require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const configViewEngine = require("./config/viewEngine");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/home", require("./routes/home"));
app.use("/api/products", require("./routes/productRoutes"));

app.get("/", (req, res) => res.send("Fullstack demo backend is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
