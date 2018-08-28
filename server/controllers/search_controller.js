const swag = require("../models/swag");

const searchSwag = (req, res, next) => {
  const { category } = req.query;
  if (!category) {
    res.status(200).send(swag);
  } else {
    const filteredSwag = swag.filter(swag => swag.category === category);
    res.status(200).send(filteredSwag);
  }
};

module.exports = {
  searchSwag
};
