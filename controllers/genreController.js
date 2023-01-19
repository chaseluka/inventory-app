const Genre = require("../models/genre");

// Display list of all genres.
exports.genre_list = (req, res) => {
  res.send("NOT IMPLEMENTED: genre list");
};

// Display detail page for a specific genre.
exports.genre_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: genre detail: ${req.params.id}`);
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
