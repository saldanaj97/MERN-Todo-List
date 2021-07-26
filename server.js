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

const todoSchema = new mongoose.Schema({
  userID: String,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});
const Todos = mongoose.model("Todos", todoSchema);

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

app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();

  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: "Invalid Access." });
    return;
  }

  const todoList = await Todos.findOne({ userID: user._id }).exec();
  res.json(todoList);
});

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username }).exec();

  if (!user || user.password !== password) {
    res.status(403);
    res.json({ message: "Invalid Access." });
    return;
  }

  const todos = await Todos.findOne({ userID: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userID: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(port, () => {
    console.log(`Todo list listening at http://localhost:${port}`);
  });
});
