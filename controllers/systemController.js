const System = require("../models/system");
const Game = require("../models/game");

const { body, validationResult } = require("express-validator");
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
  res.render("system_form", {
    title: "Add New System",
  });
};

// Handle system create on POST.
exports.system_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    // Create a System object with escaped and trimmed data.
    const system = new System({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      (err, results) => {
        if (err) {
          return next(err);
        }
        res.render("system_form", {
          title: "Add New System",
          errors,
        });
      };
      return;
    }

    // Data from form is valid. Save system.
    system.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new system record.
      res.redirect(system.url);
    });
  },
];

// Display system delete form on GET.
exports.system_delete_get = (req, res) => {
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
      res.render("system_delete", {
        title: "Delete System",
        system: results.system,
        system_games: results.system_games,
      });
    }
  );
};

// Handle system delete on POST.
exports.system_delete_post = (req, res) => {
  async.parallel(
    {
      system(callback) {
        System.findById(req.params.id).exec(callback);
      },
    },
    (err) => {
      if (err) {
        return next(err);
      }

      //Remove all instances if this system from game documents
      Game.updateMany(
        { system: req.params.id },
        { $pull: { system: req.params.id } },
        (err) => {
          if (err) {
            return next(err);
          }
        }
      );

      // Success
      System.findByIdAndRemove(req.body.systemid, (err) => {
        if (err) {
          return next(err);
        }
        // Success - go to game list
        res.redirect("/catalog/systems");
      });
    }
  );
};

// Display system update form on GET.
exports.system_update_get = (req, res) => {
  // Get systems for form.
  async.parallel(
    {
      system(callback) {
        System.findById(req.params.id).exec(callback);
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
      // Success.
      res.render("System_form", {
        title: "Update system",
        system: results.system,
      });
    }
  );
};

// Handle system update on POST.
exports.system_update_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a System object with escaped/trimmed data and old id.
    const system = new System({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      async.parallel(
        {
          system(callback) {
            System.findById(req.params.id).exec(callback);
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
          // Success.
          res.render("system_form", {
            title: "Update System",
            system: results.system,
            errors: errors.array(),
          });
        }
      );
    }

    // Data from form is valid. Update the record.
    System.findByIdAndUpdate(req.params.id, system, {}, (err, thissystem) => {
      if (err) {
        return next(err);
      }

      // Successful: redirect to system detail page.
      res.redirect(thissystem.url);
    });
  },
];
