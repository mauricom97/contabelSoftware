import { GaxiosResponse } from "gaxios";
import { google, drive_v3 } from "googleapis";
import * as fs from "fs";
import { authorize } from "./gdrive-auth";

async function uploadFilesDrive(
  fileName: string,
  filePath: string,
  callback: (fileId: string) => void
): Promise<void> {
  authorize((auth: any) => {
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
        requestBody: fileMetadata,
        media: media,
        fields: "id",
      },
      (
        err: Error | null,
        res: GaxiosResponse<drive_v3.Schema$File> | null | undefined
      ) => {
        if (err) {
          // Handle error
          console.error(err);
        } else if (res && res.data) {
          callback(res.data.id!);
        }
      }
    );
  });
}

export { uploadFilesDrive };
