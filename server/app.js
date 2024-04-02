const path = require("path");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const dotenv = require("dotenv");
const cors = require("cors");
const notFound = require("./middlewares/notFound");
const tasks = require("./routes/tasks");
const users = require("./routes/users");

// Load environment variables from .env file
dotenv.config();

// middleware
//app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/v1/", users);
app.use("/api/v1/", users);
app.use("/api/v1/tasks", tasks);

// Serve Vite-built frontend files from the 'dist' directory
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle requests to index.html so that client-side routing works
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.use(notFound);

const PORT = process.env.PORT || 3000;

// launch the server only if we are connected to the DB
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Listening to Server with ${PORT}...`);
    });
  } catch (error) {
    // console.log(error);
    console.log("oh no!");
  }
};

start();
