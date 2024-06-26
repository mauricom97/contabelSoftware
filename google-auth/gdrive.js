const fs = require("fs");
const { google } = require("googleapis");

function imageUpload(fileName, filePath, callback) {
  require("./gdrive-auth")((auth) => {
    const fileMetadata = {
      name: fileName,
      parents: ["1j_tiW3Iy2pw9Uiv5apEn_ac2pk3GacCx"],
    };

    const media = {
      mimeType: "image/jpeg",
      body: fs.createReadStream(filePath),
    };

    const drive = google.drive({ version: "v3", auth });
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id",
      },
      function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          callback(file.data.id);
        }
      }
    );
  });
}

module.exports = { imageUpload };
