// Import express package
const express = require("express");
const path = require("path");
//const { clog } = require("./middleware/clog");
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");
// uuidv4();

// Require the JSON file and assign it to a variable called `termData`
const db = require("./db/db.json");
const PORT = 3002;

// Initialize our app variable by setting it to the value of express()
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use("/api", api);

// res.json() allows us to return JSON instead of a buffer, string, or static file
app.get("/api/notes", (req, res) => res.json(db));

// Add a static middleware for serving assets in the public folder
app.use(express.static("public"));
// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
// GET Route for notes page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// POST Route for a new note
app.post("/api/notes", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding a note");
  }
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
