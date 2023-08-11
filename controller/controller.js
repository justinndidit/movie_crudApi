const Movie = require("../model/model.js");
const writeToFile = require("../util/writeToFile.js");
const bodyParser = require("../util/bodyParser.js");
const crypto = require("crypto");

const regexV4 = new RegExp(
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
);

// C- Create
async function postMovies(req, res) {
  if (req.url === "/api/movies") {
    try {
      const data = await bodyParser(req);
      data.id = crypto.randomUUID();
      const movie = await Movie.findAll();
      movie.push(data);
      writeToFile(movie);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "New Movie Added successfully" }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "Request Body is not Valid",
        })
      );
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Not found",
        message: "Route is Invalid",
      })
    );
  }
}

// R - Request
async function getMovies(req, res) {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];

  try {
    if (req.url === "/api/movies") {
      const allMovies = await Movie.findAll();
      res.writeHead(200, { "Content-Type": "application/JSON" });
      res.end(JSON.stringify(allMovies));
    } else if (!regexV4.test(id) && baseUrl === "/api/movies/") {
      res.writeHead(400, { "Content-Type": "application/JSON" });
      res.end(JSON.stringify({ message: "Invalid UUID" }));
    } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
      const movieById = await Movie.findById(id);

      if (!movieById) {
        res.writeHead(404, { "Content-Type": "application/JSON" });
        res.end(JSON.stringify({ message: "Movie not found" }));
      } else {
        res.writeHead(200, { "Content-Type": "application/JSON" });
        res.end(JSON.stringify(movieById));
      }
    } else {
      res.writeHead(404, { "Content-Type": "application/JSON" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  } catch (error) {
    console.log(error);
  }
}

//U - Update

async function updateMovies(req, res) {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/")[3];

  if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    const movieData = await Movie.findById(id);
    if (!movieData) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Movie not found " }));
    } else {
      const data = await bodyParser(req);
      const { title, genre, year, rating } = data;
      const movieUpdate = {
        title: title || movieData.title,
        genre: genre || movieData.genre,
        year: year || movieData.year,
        rating: rating || movieData.rating,
        id: movieData.id,
      };
      const allMovies = await Movie.findAll();
      const index = await Movie.findIndex(id);

      allMovies[index] = movieUpdate;
      writeToFile(allMovies);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `Movie ${id} updated successfully` }));
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify(
        { title: "Validation Error" },
        { message: "Could not validate Route or UUID" }
      )
    );
  }
}

//D - Delete
async function deleteMovie(req, res) {
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  id = req.url.split("/")[3];
  if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    try {
      const index = await Movie.findIndex(id);

      if (index < 0) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end({ title: "Not found" }, { message: "Movie not found" });
      } else {
        const allMovies = await Movie.findAll();
        allMovies.splice(index, 1);
        writeToFile(allMovies);
        res.writeHead(204, { "content-type": "application/json" });
        res.end(JSON.stringify(`Movie: ${id} has been deleted`));
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify(
        { title: "Validation Failed" },
        { message: "Could not validate Route or UUID" }
      )
    );
  }
}

module.exports = {
  getMovies,
  postMovies,
  deleteMovie,
  updateMovies,
};
