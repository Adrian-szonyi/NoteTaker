const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const uuid = require("./helpers/uuid");

router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err
      ? console.error(err)
      : console.info(`\nData written to ${"/db/db.json"}`)
  );

router.post("/notes", (request, response) => {
  console.log(request.body);
  const { title, text, id } = request.body;
  const readAndAppend = (activeNote, file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const activeNote = {
          title,
          text,
          id: uuid(),
        };

        const newresponse = {
          status: "success",
          body: activeNote,
        };

        console.log(newresponse);
        response.json(activeNote);
        const parsedData = JSON.parse(data);
        parsedData.push(activeNote);
        writeToFile(file, parsedData);
      }
    });
  };
  readAndAppend(request.body, "db/db.json");
});
router.get("/:id", (req, res) => {
  let SelectedNote = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === SelectedNote);
      return result.length > 0
        ? res.json(result)
        : res.json(`Nothing selected`);
    });
});

router.delete("/:id", (req, res) => {
  let noteSelected = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== noteSelected);

      writeToFile("./db/db.json", result);

      res.json(`Item ${noteSelected} has been deleted`);
    });
});

module.exports = router;
