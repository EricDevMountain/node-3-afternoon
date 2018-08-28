const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");

const { check } = require("./middlewares/checkForSession");
const { read } = require("./controllers/swag_controller");
const {
  login,
  register,
  signOut,
  getUser
} = require("./controllers/auth_controller");
const {
  addSwag,
  deleteSwag,
  checkout
} = require("./controllers/cart_controller");
const { searchSwag } = require("./controllers/search_controller");

const port = process.env.SERVER_PORT || 3000;

require("dotenv").config();

const app = express();
app.use(json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(check);

//GET SWAG
app.get("/api/swag", read);

//SESSION
app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/signout", signOut);
app.get("/api/user", getUser);

//CART
app.post("/api/cart", addSwag);
app.post("/api/checkout", checkout);
app.delete("/api/cart", deleteSwag);

//SEARCH
app.get("/api/search", searchSwag);

app.listen(port, () => {
  console.log(`Whistle Tippin on ${port}`);
});
