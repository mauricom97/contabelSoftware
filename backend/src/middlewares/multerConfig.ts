import multer from "multer";
import path from "path";

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "/home/mauricio/Projetos/pessoais/contabelSoftware/backend/src/files/sheets"
    );
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
