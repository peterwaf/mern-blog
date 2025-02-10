const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
//allow public access static files
app.use(express.static("public"));
app.use(cors());
dotenv.config();
app.use(express.json());
const UsersRoute = require("./routes/Users");
const BlogRoute = require("./routes/Blogs");
const PORT = process.env.PORT || 5000;
app.use("/", UsersRoute);
app.use("/", BlogRoute);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(`mongodb connection error ${error}`));

// Export the app for Vercel
module.exports = app;
