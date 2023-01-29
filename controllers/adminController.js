const Game = require("../models/game");
const System = require("../models/system");
const Genre = require("../models/genre");
const Admin = require("../models/admin");

const { body, validationResult } = require("express-validator");
const async = require("async");

//Get admin page for deleting or updating a game
exports.admin_get = (req, res, next) => {
  res.render("admin", { title: "Enter Admin Information" });
};

//Get admin page for deleting or updating a game
exports.admin_post = [
  // Validate and sanitize fields.
  body("code", "Code must not be empty.").trim().isLength({ min: 1 }).escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    //return results with trimmed data in case of an incorrect code.
    const admin = new Admin({
      code: req.body.code,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("admin", {
        title: "Enter Admin Information",
        admin,
        errors: errors.array(),
      });
      return;
    }
    const admin_id = "63d704602ecbc400c2a055ca";
    Admin.findById(admin_id, (err, results) => {
      if (err) {
        return next(err);
      }
      //if code is incorrect rerender with message informing user
      if (results.code !== admin.code) {
        res.render("admin", {
          title: "Enter Admin Information",
          admin,
          errors: "Passcode was inccorect, please try again.",
        });
        return;
      }
      if (results == null) {
        // No results.
        const err = new Error("Couldn't find admin information");
        err.status = 404;
        return next(err);
      }
      const [controller, id, view] = [
        req.params.controller,
        req.params.id,
        req.params.view,
      ];
      // Successful code, so redirect to the appropriate page.
      if (results.code === admin.code) {
        res.redirect(`/catalog/${controller}/${id}/${view}`);
      }
    });
  },
];
