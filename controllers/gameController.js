const Game = require("../models/game");
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
exports.game_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: game create GET");
};

// Handle game create on POST.
exports.game_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: game create POST");
};

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
