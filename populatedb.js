#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require("async");
var Game = require("./models/game");
var System = require("./models/system");
var Genre = require("./models/genre");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var games = [];
var systems = [];
var genres = [];

function systemCreate(name, cb) {
  var system = new System({ name: name });

  system.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New System: " + system);
    systems.push(system);
    cb(null, system);
  });
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });

  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function gameCreate(
  title,
  developer,
  genre,
  price,
  description,
  stock_quantity,
  image,
  publication_year,
  system,
  cb
) {
  gamedetail = {
    title: title,
    developer: developer,
    price: price,
    description: description,
    stock_quantity: stock_quantity,
    publication_year: publication_year,
    system: system,
  };
  if (genre != false) gamedetail.genre = genre;
  if (image != false) gamedetail.image = image;

  var game = new Game(gamedetail);
  game.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New game: " + game);
    games.push(game);
    cb(null, game);
  });
}

//Populate a few genres and systems
function createGenreSystems(cb) {
  async.series(
    [
      function (callback) {
        systemCreate("Windows", callback);
      },
      function (callback) {
        systemCreate("Xbox Series X/S", callback);
      },
      function (callback) {
        systemCreate("PlayStation 5", callback);
      },
      function (callback) {
        systemCreate("MacOS", callback);
      },
      function (callback) {
        genreCreate("Role-Playing", callback);
      },
      function (callback) {
        genreCreate("First Person Shooter", callback);
      },
      function (callback) {
        genreCreate("Open World", callback);
      },
      function (callback) {
        genreCreate("Battle Royale", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createBooks(cb) {
  async.parallel(
    [
      function (callback) {
        gameCreate(
          "The Elder Scrolls V: Skyrim",
          "Bathesda Game Studios",
          [genres[0], genres[2]],
          38.99,
          "Set 200 years after the events of Oblivion, and takes place in Skyrim, the northernmost province of Tamriel. Its main story focuses on the player's character, the Dragonborn, on their quest to defeat Alduin the World-Eater, a dragon who is prophesied to destroy the world.",
          4,
          false,
          2011,
          [systems[0], systems[1], systems[2]],
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Fornite",
          "Epic Games",
          [genres[3]],
          0,
          "A free-to-play Battle Royale game with numerous game modes for every type of game player. Watch a concert, build an island or fight.",
          Infinity,
          false,
          2017,
          [systems[0], systems[1], systems[2]],
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Divinity: Original Sin 2 - Definitive Addition",
          "Larian Studios",
          [genres[0], genres[2]],
          59.99,
          "The eagerly anticipated sequel to the award-winning RPG. Gather your party. Master deep, tactical combat.",
          21,
          false,
          2017,
          [systems[0], systems[1], systems[2], systems[3]],
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Call of Duty: Modern Warfare II (2022)",
          "Infinity Ward",
          [genres[1]],
          59.99,
          "is a 2022 first-person shooter game developed by Infinity Ward and published by Activision. It is a sequel to the 2019 reboot, and serves as the nineteenth installment in the overall Call of Duty series.",
          196,
          false,
          2022,
          [systems[0], systems[1], systems[2]],
          callback
        );
      },
      function (callback) {
        gameCreate(
          "Elden Ring",
          "FromSoftware",
          [genres[0], genres[2]],
          59.99,
          "Set in an open world, players are allowed to freely explore the Lands Between and its six main areas; these locations range from Limgrave, an area featuring grassy plains and ancient ruins, to Caelid, a wasteland home to undead monsters",
          492,
          false,
          2022,
          [systems[0], systems[2]],
          callback
        );
      },
      function (callback) {
        gameCreate(
          "God of War Ragnarök",
          "Santa Monica Studio",
          [genres[1]],
          69.99,
          "Journey through dangerous and stunning landscapes while facing a wide variety of enemy creatures, monsters and Norse gods as Kratos and Atreus search for answers.",
          903,
          false,
          2022,
          [systems[2]],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createGenreSystems, createBooks],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Everything was added");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
