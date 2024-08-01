const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer')

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
