const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

mongoose.connect("mongodb://localhost/todo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(401);
    res.json({ message: "Invalid Login." });
    return;
  }
  await User.create({ username, password });
  res.json({ message: "Successfully logged in. " });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (user) {
    res.status(500);
    res.send({ message: "User already exists. " });
    return;
  }
  await User.create({ username, password });
  res.json({ message: "Success. " });
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Todo list listening at http://localhost:${port}`);
  });
});
