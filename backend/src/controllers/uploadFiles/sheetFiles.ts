import { uploadFilesDrive } from "../../utils/google/drive/gdrive";
import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import XLSX from "xlsx";

export const sheetFiles = async (req: any, res: Response) => {
  if (!req.file) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }

  const filePath = path.resolve(
    __dirname,
    "../../files/sheets",
    req.file.filename
  );

  try {
    await uploadFilesDrive(req.file.filename, filePath, (fileId: string) => {
      console.log("Arquivo enviado para o Google Drive com sucesso.");
    });
    res.send("Arquivo enviado e processado com sucesso.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao processar o arquivo.");
  }
};

export default sheetFiles;
