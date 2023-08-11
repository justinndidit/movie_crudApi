const { updateMovies } = require("../controller/controller.js");

module.exports = function getReq(req, res) {
  updateMovies(req, res);
};
