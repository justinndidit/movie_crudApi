let Movies = require("../data/movies.json");

function findAll() {
  return new Promise((resolve) => {
    resolve(Movies);
  });
}

function findById(id) {
  return new Promise((resolve) => {
    const movie = Movies.find((m) => m.id === id);
    resolve(movie);
  });
}

async function findIndex(id) {
  return new Promise(async (resolve) => {
    resolve(Movies.indexOf(await findById(id)));
  });
}

module.exports = {
  findAll,
  findById,
  findIndex,
};
