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

const upload = multer({ storage: storage }).array("images", 20);
// Note: inside the storage obj above you can add optional parameters:
//  limits: {fileSize: "1000000"},
//  fileFilter: (req, file, cb) => {
//    const fileTypes = /jpeg|jpg|png|gif/
//    const mimType = fileTypes.test(file.mimetype)
//    const extname = fileTypes.test(path.extname(file.orginalname))
//  if(mimeType && extname){
//  return cb(null, true)
//  }
//   cb("give proper file format to upload")
//  }).single('image') <<< name this the same name as in Model
//  or   .array("images",5) <<< optional for array of images

module.exports = upload;
