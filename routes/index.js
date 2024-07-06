const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express.Router();
let db = require("../db/db.json");

// Setting up all routes (GET, POST, DELETE)

// READ - Get all notes
app.get("/api/notes", (req, res) => {
  console.log("GET request received");
  console.log("Current notes:", db);
  res.json(db);
});

// CREATE - Add a new note
app.post("/api/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: Math.floor(Math.random() * 999),
  };

  db.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(db),
    (err) => {
      if (err) throw err;
      console.log("New note added:", newNote);
    }
  );

  res.json(db);
});

// DELETE - Remove a note by id
app.delete("/api/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  db = db.filter((note) => note.id !== noteId);

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(db),
    (err) => {
      if (err) throw err;
      console.log(`Note with id ${noteId} deleted`);
    }
  );

  res.json(db);
});

module.exports = app;
