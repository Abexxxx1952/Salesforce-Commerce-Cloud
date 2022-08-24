const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const errorHandlerMiddleware = require("./Middleware/error-handler");
const notFound = require("./middleware/not-found");

const connectDB = require("./initDB");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

// Routes

const UserRoute = require("./Routes/User.route");
const CsvRequestRoute = require("./Routes/CsvRequest.route");

app.use("/", UserRoute);
app.use("/", CsvRequestRoute);

// Error handler

app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log("Server started on port " + PORT + "...")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
