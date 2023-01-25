const System = require("../models/system");
const Game = require("../models/game");

const async = require("async");

// Display list of all systems.
exports.system_list = (req, res, next) => {
  System.find({}, "name").exec(function (err, list_systems) {
    if (err) {
      return next(err);
    }
    res.render("system_list", { title: "Systems:", system_list: list_systems });
  });
};

// Display detail page for a specific system.
exports.system_detail = (req, res, next) => {
  async.parallel(
    {
      system(callback) {
        System.findById(req.params.id).exec(callback);
      },
      system_games(callback) {
        Game.find({ system: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.system == null) {
        // No results.
        const err = new Error("System not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("system_detail", {
        title: results.system.title,
        system: results.system,
        system_games: results.system_games,
      });
    }
  );
};

// Display system create form on GET.
exports.system_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: system create GET");
};

// Handle system create on POST.
exports.system_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: system create POST");
};

// Display system delete form on GET.
exports.system_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: system delete GET");
};

// Handle system delete on POST.
exports.system_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: system delete POST");
};

// Display system update form on GET.
exports.system_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: system update GET");
};

// Handle system update on POST.
exports.system_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: system update POST");
};
