// Middleware que só se aplica pra rota image.js

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

module.exports = upload