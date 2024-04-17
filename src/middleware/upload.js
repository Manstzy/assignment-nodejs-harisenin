const multer = require('multer');
const uploadDirectory = process.cwd() + '/upload';
const uploadDocumentDirectory = process.cwd() + '/doc';

const uploadProfilePic = multer({ dest: uploadDirectory });
const uploadDocument = multer({ dest: uploadDocumentDirectory });

module.exports = { uploadDirectory, uploadDocument, uploadProfilePic  };
