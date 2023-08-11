const { deleteMovie } = require("../controller/controller.js");

module.exports = function deleteReq(req, res) {
  deleteMovie(req, res);
};
