require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");
const configViewEngine = require("./config/viewEngine");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8888;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configViewEngine(app);

const webAPI = express.Router();
webAPI.get("/", getHomePage);
app.use("/", webAPI);

app.use("/v1/api/", require("./routes/api"));
(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})().catch((err) => {
  console.error("Failed to start the server:", err);
  process.exit(1);
})();


