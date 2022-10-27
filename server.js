// Import express package
const express = require("express");

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

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
