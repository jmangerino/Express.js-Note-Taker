const fs = require('fs');
const db = require('../../db/db.json');
const uniqid = require('uniqid');
const router = require('express').Router();


router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json')
    .then((data) => {
        let notes = JSON.parse(data)
        res.send(data)
    })
})


router.post('./api/notes', (req, res) => {
    let newNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile('./db/db.json', (err, data) => {
        let newData = JSON.parse(data);

        newData.push(newNote);
        
        fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
            if (err) throw err;
            res.send('note added');
        })
    })
})

module.exports = router;