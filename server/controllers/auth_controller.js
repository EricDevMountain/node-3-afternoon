// import { builtinModules } from "module";
// import registerServiceWorker from "../../src/registerServiceWorker";
// import { signout, getUser } from "../../src/ducks/reducer";

const users = require("../models/users");

let id = 1;

let login = (req, res, next) => {
  const { username, password } = req.body;
  const { session } = req;

  const user = users.find(
    user => user.username === username && user.password === password
  );

  if (user) {
    session.user.username = user.username;
    res.status(200).send(session.user);
  } else {
    res.status(500).send("Unauthorized.");
  }
};

let register = (req, res, next) => {
  const { session } = req;
  const { username, password } = req.body;

  users.push({ id, username, password });
  id++;

  session.user.username = username;

  res.status(200).send(session.user);
};

let signOut = (req, res, next) => {
  const { session } = req;
  session.destroy();
  res.status(200).send(req.session);
};

let getUser = (req, res, next) => {
  const { session } = req;
  res.status(200).send(session.user);
};

module.exports = {
  login,
  register,
  signOut,
  getUser
};
