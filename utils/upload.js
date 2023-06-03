const multer = require("multer");

let counter = 1;

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Specify the directory where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const newFileName = `${counter}` + '-' + file.originalname;
    counter++;
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
