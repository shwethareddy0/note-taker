// Import required packages
const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");

// Require the JSON file and assign it to a variable called `termData`
const Notes = require("./db/db.json");

const PORT = process.env.PORT || 3001;

// Initialize our app variable by setting it to the value of express()
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET Route for retrieving all the notes
app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

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
    res.json(`Note is added successfully 🚀`);
  } else {
    res.error("Error in adding a note");
  }
});

// Removing the note from the notes
app.delete("/api/notes/:id", function (req, res) {
  var id = req.params.id;
  var selectedNote;
  for (var i = 0; i < Notes.length; i++) {
    selectedNote = Notes[i];
    if (selectedNote) {
      if (selectedNote.id === id) {
        Notes.splice(i, 1);
        break;
      }
    }
  }

  writeToFile("./db/db.json", Notes);
  return res.json(selectedNote);
});

//Start the server listening on the designated port
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
