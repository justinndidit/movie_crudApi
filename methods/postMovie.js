const { postMovies } = require("../controller/controller.js");

module.exports = function postReq(req, res) {
  postMovies(req, res);
};
