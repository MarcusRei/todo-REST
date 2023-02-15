require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const listRoutes = require("./routes/listRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { notFoundMiddleware } = require("./middleware/notFoundMiddleware");

//1 Create Express app
const app = express();

//3 Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Processing ${req.method} request to ${req.path}`);
  next();
});

//4 Create Routes

app.use("/api/v1/users/todos", todoRoutes);
app.use("/api/v1/users/lists", listRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

//5 Error Handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

//2 Server Setup
const port = process.env.PORT;
async function run() {
  try {
    //connect to MongoDB database (via Mongoose)
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_CONNECT);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    //Start server; listen to requests on port
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

run();
