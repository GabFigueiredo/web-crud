const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path');
const nanoid = require('nanoid')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve('uploads'));
    },
    filename: (req, file, callback) => {
        const GenerateID = nanoid.nanoid()
        console.log(`Conteúdo do nanoid: ${GenerateID}`)
        callback(null, `${GenerateID}.jpg`);
    }
});

const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({
            message: 'Upload bem-sucedido',
            file: req.file,
        });
    } else {
        res.status(400).json({ error: 'Erro ao fazer upload do arquivo' });
    }
});

module.exports = router
