const router = require('express').Router();
const path = require('path')
const fs = require('fs');
const uuid = require('./helpers/uuid');

router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${'/db/db.json'}`)
  );

router.post('/notes', (req, res) => {
    console.log(req.body)
const readAndAppend = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
          }
          else {
            const newNote = {
               data,
               note_id: uuid(),
              };
          
              const response = {
                status: 'success',
                body: newNote,
              };
          
              console.log(response);
              res.json(response);
            const parsedData = JSON.parse(data, uuid());
            parsedData.push(content);
            writeToFile(file, parsedData);
          }
        });
      };

readAndAppend(req.body, 'db/db.json') 
//read the database fi
//json.parse on the data
//json push new note into the array
//stringify the array
//write the stringify notes into db.json
});




module.exports = router