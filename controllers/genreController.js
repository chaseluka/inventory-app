const Genre = require("../models/genre");
const Game = require("../models/game");

const { body, validationResult } = require("express-validator");
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
  res.render("genre_form", {
    title: "Add New Genre",
  });
};

// Handle genre create on POST.
exports.genre_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a Genre object with escaped and trimmed data.
    const genre = new Genre({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      (err, results) => {
        if (err) {
          return next(err);
        }
        res.render("genre_form", {
          title: "Add New Genre",
        });
      };
      return;
    }

    // Data from form is valid. Save genre.
    genre.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new genre record.
      res.redirect(genre.url);
    });
  },
];

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
