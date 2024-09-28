require("dotenv").config();
const upload = require("./routes/upload");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const connection = require("./db");
const express = require("express");
const app = express();
const path = require("path");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const logger = require("./middleware/logger");
const morgan = require("morgan");

// wallet_system

const morganFormat =
  ":method :url :status :res[content-length] #--in_time--# :response-time ms";

let gfs;
connection();

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.DOMAIN,
  })
);

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

app.use("/file", upload);
app.use(express.json());

// media routes
app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

// requiring routes
const { router } = require("./routes/extraRoutes");
const user = require("./routes/users");
const multitude = require("./routes/multitude");
const post = require("./routes/post");
const follow = require("./routes/follows");
const save = require("./routes/saves");
const comment = require("./routes/comments");

// admin part
const admin_main = require("./routes/admin");

// store part
const store = require("./store/store");
const invertory = require("./store/inventory");

// recommendations
const recommendations = require("./recommendations");
const { stream } = require("winston");

// using routes
app.use("/", router);
app.use("/api/users", user);
app.use("/api/multitude", multitude);
app.use("/api/posts", post);
app.use("/system/follows", follow);
app.use("/system/saves", save);
app.use("/api/comments", comment);

// admin use
app.use("/admin/panel", admin_main);

// store part use
app.use("/store", store);
app.use("/invertory", invertory);

// recommendations
app.use("/recommendations", recommendations);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Specify the directory for view files
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    title: "dast server",
    message: "server side for web site dast!",
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
