const express = require("express");
const router = express.Router();

// Require controller modules.
const item_controller = require("../controllers/bookController");
const system_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");

/// Item ROUTES ///

// GET catalog home page.
router.get("/", item_controller.index);

// GET request for creating a item. NOTE This must come before routes that display item (uses id).
router.get("/item/create", item_controller.item_create_get);

// POST request for creating item.
router.post("/item/create", item_controller.item_create_post);

// GET request to delete item.
router.get("/item/:id/delete", item_controller.item_delete_get);

// POST request to delete item.
router.post("/item/:id/delete", item_controller.item_delete_post);

// GET request to update item.
router.get("/item/:id/update", item_controller.item_update_get);

// POST request to update item.
router.post("/item/:id/update", item_controller.item_update_post);

// GET request for one item.
router.get("/item/:id", item_controller.item_detail);

// GET request for list of all item.
router.get("/items", item_controller.item_list);

/// SYSTEM ROUTES ///

// GET request for creating system.
router.get("/system/create", system_controller.system_create_get);

// POST request for creating system.
router.post("/system/create", system_controller.system_create_post);

// GET request to delete system.
router.get("/system/:id/delete", system_controller.system_delete_get);

// POST request to delete system.
router.post("/system/:id/delete", system_controller.system_delete_post);

// GET request to update system.
router.get("/system/:id/update", system_controller.system_update_get);

// POST request to update system.
router.post("/system/:id/update", system_controller.system_update_post);

// GET request for one system.
router.get("/system/:id", system_controller.system_detail);

// GET request for list of all systems.
router.get("/systems", system_controller.system_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get("/genre/create", genre_controller.genre_create_get);

//POST request for creating Genre.
router.post("/genre/create", genre_controller.genre_create_post);

// GET request to delete Genre.
router.get("/genre/:id/delete", genre_controller.genre_delete_get);

// POST request to delete Genre.
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

// GET request to update Genre.
router.get("/genre/:id/update", genre_controller.genre_update_get);

// POST request to update Genre.
router.post("/genre/:id/update", genre_controller.genre_update_post);

// GET request for one Genre.
router.get("/genre/:id", genre_controller.genre_detail);

// GET request for list of all Genre.
router.get("/genres", genre_controller.genre_list);

module.exports = router;
