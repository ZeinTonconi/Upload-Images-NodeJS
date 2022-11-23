const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
app.use(cors());
const PORT = 3000;

const helperImg = (filePath, size = 300, filename) => {
    return sharp(filePath)
    .resize(size)
    .toFile(`./optimize/${filename}`);
}



const storage  = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req,file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    }
})

const upload = multer({
    storage
});

app.post('/upload', upload.single('file'), (req, res) => {
    helperImg(req.file.path,100, `resize-${req.file.filename}`)
    res.send({
        data: 'Imagen Creada'
    })
})

app.listen(PORT ,()=> {
    console.log('Listo por el puerto ', PORT)
})