function check(req, res, next) {
  const { session } = req;
  if (!session.user) {
    session.user = { username: "", cart: [], total: 0.0 };
  }
  next();
}

module.exports = {
  check
};
