const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/files/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename)

    res.sendFile(filepath, (err) => {
        if (err) {
            console.log('\x1b[33m Caminho da imagem não foi encontrado.. \x1b[0m')
            console.log(`\x1b[34m Caminho: ${filepath} \x1b[0m`)
            res.status(400).send('File not found')
        } else {
            console.log('\x1b[34m Busca de imagem única foi feita com sucesso! \x1b[0m') 
        }
    })
})

module.exports = router