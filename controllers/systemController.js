const System = require("../models/system");

// Display list of all systems.
exports.system_list = (req, res) => {
  res.send("NOT IMPLEMENTED: system list");
};

// Display detail page for a specific system.
exports.system_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: system detail: ${req.params.id}`);
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
