const Genre = require("../models/genre");
const Game = require("../models/game");

const async = require("async");

// Display list of all genres.
exports.genre_list = (req, res) => {
  Genre.find({}, "name").exec(function (err, list_genres) {
    if (err) {
      return next(err);
    }
    res.render("genre_list", { title: "Genres:", genre_list: list_genres });
  });
};

// Display detail page for a specific genre.
exports.genre_detail = (req, res) => {
  async.parallel(
    {
      genre(callback) {
        Genre.findById(req.params.id).exec(callback);
      },
      genre_games(callback) {
        Game.find({ genre: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results.
        const err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("genre_detail", {
        title: results.genre.title,
        genre: results.genre,
        genre_games: results.genre_games,
      });
    }
  );
};

// Display genre create form on GET.
exports.genre_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: genre create GET");
};

// Handle genre create on POST.
exports.genre_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: genre create POST");
};

// Display genre delete form on GET.
exports.genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: genre delete GET");
};

// Handle genre delete on POST.
exports.genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: genre delete POST");
};

// Display genre update form on GET.
exports.genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: genre update GET");
};

// Handle genre update on POST.
exports.genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: genre update POST");
};
