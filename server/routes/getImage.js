const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/files/:filename', (req, res) => {
    console.log("Chamou o get")
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename)
    console.log(filepath)

    res.sendFile(filepath, (err) => {
        if (err) {
            res.status(404).send('File not found')
        } 
    })
})

module.exports = router