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

router.post('/notes', (request, response) => {
    console.log(request.body)
    const { title, text, id } = request.body;
const readAndAppend = (content, file) => {
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            console.error(err);
          }
          else {
            const activeNote = {
               title,
               text,
               id: uuid(),
              };  
          
              const newresponse = {
                status: 'success',
                body: activeNote,
              };
          
              console.log(newresponse);
              response.json(activeNote)
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
          }
        });
      };
      readAndAppend(request.body, 'db/db.json') 

//read the database fi
//json.parse on the data
//json push new note into the array
//stringify the array
//write the stringify notes into db.json
});




module.exports = router