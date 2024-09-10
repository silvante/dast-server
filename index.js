require("dotenv").config();
const upload = require("./routes/upload");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const connection = require("./db");
const express = require("express");
const app = express();

let gfs;
connection();

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

// admin part
const admin_main = require("./routes/admin");

// using routes
app.use("/", router);
app.use("/api/users", user);
app.use("/api/multitude", multitude);
app.use("/api/posts", post);
app.use("/system/follows", follow);
app.use("/system/saves", save);

// admin use
app.use("/admin/panel", admin_main);

app.get("/", (req, res) => {
  res.send("dast the server");
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
