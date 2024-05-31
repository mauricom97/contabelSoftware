const gdrive = require("./gdrive");
gdrive.imageUpload(
  "template_importacao.xlsx",
  "./template_importacao.xlsx",
  (id) => {
    console.log(id);
  }
);
