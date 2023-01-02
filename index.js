const express = require("express");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

const errorHandlerMiddleware = require("./Middleware/error-handler");
const notFound = require("./Middleware/not-found");

const connectDB = require("./initDB");

const app = express();

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
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
