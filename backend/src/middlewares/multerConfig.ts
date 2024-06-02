import multer from "multer";
import path from "path";
import fs from "fs";

// Verifique se o diretório existe e, se não existir, crie-o
// const sheetsDir = path.resolve(__dirname, "../files/sheets");
// if (!fs.existsSync(sheetsDir)) {
//   fs.mkdirSync(sheetsDir, { recursive: true });
// }

const pathToFiles =
  process.env.NODE_ENV === "prod"
    ? path.resolve(__dirname, "../src/files/sheets")
    : path.resolve(__dirname, "../files/sheets");
console.log("=====================CAMINHO DA PASTA=======================");
console.log(pathToFiles);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathToFiles);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;