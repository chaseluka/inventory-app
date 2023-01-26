const Game = require("../models/game");
const System = require("../models/system");
const Genre = require("../models/genre");

const { body, validationResult } = require("express-validator");
const async = require("async");

exports.index = (req, res) => {
  // Get list of all games by passing empty object as match condition
  Game.countDocuments({}, function (err, results) {
    res.render("index", {
      error: err,
      data: results,
    });
  });
};

// Display list of all games.
exports.game_list = (req, res, next) => {
  Game.find({}, "title developer price").exec(function (err, list_games) {
    if (err) {
      return next(err);
    }
    res.render("game_list", { title: "Games:", game_list: list_games });
  });
};

// Display detail page for a specific game.
exports.game_detail = (req, res, next) => {
  async.parallel(
    {
      game(callback) {
        Game.findById(req.params.id)
          .populate("genre")
          .populate("system")
          .exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.game == null) {
        // No results.
        const err = new Error("Game not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("game_detail", {
        title: results.game.title,
        game: results.game,
        game_instances: results.game_instance,
      });
    }
  );
};

// Display game create form on GET.
exports.game_create_get = (req, res, next) => {
  // Get all systems and genres for letting a user add it to a new game.
  async.parallel(
    {
      systems(callback) {
        System.find(callback);
      },
      genres(callback) {
        Genre.find(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("game_form", {
        title: "Add New Games",
        systems: results.systems,
        genres: results.genres,
      });
    }
  );
};

// Handle game create on POST.
exports.game_create_post = [
  // Convert the genre and system to an array.
  (req, res, next) => {
    console.log("1");
    if (!Array.isArray(req.body.genre)) {
      req.body.genre =
        typeof req.body.genre === "undefined" ? [] : [req.body.genre];
    }
    next();
  },

  (req, res, next) => {
    console.log("1b");
    if (!Array.isArray(req.body.system)) {
      req.body.system =
        typeof req.body.system === "undefined" ? [] : [req.body.system];
    }
    next();
  },

  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("developer", "Developer must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Price must not be empty. If game is free input 0.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("publication_year", "Release date must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Description must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("genre.*").escape(),
  body("system.*").escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    console.log("do I make it here?");
    // Create a Game object with escaped and trimmed data.
    const game = new Game({
      title: req.body.title,
      developer: req.body.developer,
      price: req.body.price,
      description: req.body.description,
      publication_year: req.body.publication_year,
      genre: req.body.genre,
      system: req.body.system,
      image: "false",
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all systems and genres for form.
      async.parallel(
        {
          systems(callback) {
            System.find(callback);
          },
          genres(callback) {
            Genre.find(callback);
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          // Mark selected genres and systems as checked.
          for (const genre of results.genres) {
            if (game.genre.includes(genre._id)) {
              genre.checked = "true";
            }
          }
          for (const system of results.systems) {
            if (game.system.includes(system._id)) {
              system.checked = "true";
            }
          }
          res.render("game_form", {
            title: "Add New Game",
            systems: results.systems,
            genres: results.genres,
            game,
            errors: errors.array(),
          });
        }
      );
      return;
    }

    // Data from form is valid. Save game.
    game.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new game record.
      res.redirect(game.url);
    });
  },
];

// Display game delete form on GET.
exports.game_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: game delete GET");
};

// Handle game delete on POST.
exports.game_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: game delete POST");
};

// Display game update form on GET.
exports.game_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: game update GET");
};

// Handle game update on POST.
exports.game_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: game update POST");
};
