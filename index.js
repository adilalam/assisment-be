require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./model/index");

const userControl = require("./controller/userController");
const listControl = require("./controller/listController");
const taskControl = require("./controller/taskController");

const { catchError } = require("./middlewares/globalError");
const authenticateToken = require('./middlewares/authenticateToken');

const app = express();
const corsOptions = {
  origin: "*", // Allow requests only from this origin
  methods: "GET,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// route for user
app.post("/createUser", userControl.createUser);
app.post("/login", userControl.loginUser);

// route for list
app.get("/getLists", authenticateToken, listControl.getLists);
app.post("/createList", authenticateToken, listControl.createList);
app.delete("/deleteList/:id", authenticateToken, listControl.deleteList);

// route for add tasks to a list
app.post("/createTask", authenticateToken, taskControl.createTask);
app.delete("/deleteTask/:id", authenticateToken, taskControl.deleteTask);
app.post("/completeTask/:id", authenticateToken, taskControl.completeTask);


app.use(catchError);

app.listen(4001, () => {
  console.log("Server started on port 4001");
});
