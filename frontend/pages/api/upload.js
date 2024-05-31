// pages/api/upload.js
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

const uploadDir = path.join(process.cwd(), "/uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const handler = (req, res) => {
    const form = new formidable.IncomingForm({
        uploadDir: uploadDir,
        keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ file: files.file });
    });
};

export default handler;
