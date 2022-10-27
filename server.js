// Import express package
const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// uuidv4();

// Require the JSON file and assign it to a variable called `termData`
const db = require("./db/db.json");
const PORT = 3002;

// Initialize our app variable by setting it to the value of express()
const app = express();

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get("/api/notes", (req, res) => res.json(db));

// Add a static middleware for serving assets in the public folder
app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
