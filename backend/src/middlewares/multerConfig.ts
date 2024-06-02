import multer from "multer";
import path from "path";
import fs from "fs";

// Verifique se o diretório existe e, se não existir, crie-o
const sheetsDir = path.resolve(__dirname, "../files/sheets");
if (!fs.existsSync(sheetsDir)) {
  fs.mkdirSync(sheetsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, sheetsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
