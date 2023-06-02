const multer = require("multer");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); // Specify the directory where uploaded images will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
