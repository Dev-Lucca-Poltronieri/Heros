const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // pasta onde as imagens ficam salvas
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}${ext}`; // ex: 1718123456789.png
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

module.exports = upload;