import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';
import createHttpError from 'http-errors';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  // можна написати destination:TEMP_UPLOAD_DIR;
  filename: function (req, file, cb) {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

// необов'язкові налаштування
// обмеження на розмір файлів
const limits = {
  fileSize: 1024 * 1024 * 5,
};
// перевірка чи має файл розширення .exe і не зберігати його
const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split('.').pop();
  if (extension === 'exe') {
    // можна повернути просто колбек що забороняє збереження файлу
    // return callback(null,false);
    // але якщо треба викинути помилку:
    return callback(createHttpError(400, '.exe not valid extension'));
  }
  callback(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
