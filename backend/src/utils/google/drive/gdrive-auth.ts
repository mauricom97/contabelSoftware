// gdrive-auth.ts
import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const TOKEN_PATH = path.join(__dirname, "token.json");
const CREDENTIALS_PATH = path.join(__dirname, "./credentials.json");
console.log("===================TO AQUI=========================");
console.log(CREDENTIALS_PATH);

export function authorize(callback: (auth: any) => void): void {
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.error("Error loading client secret file:", err);
    const { client_secret, client_id, redirect_uris } = JSON.parse(
      content.toString()
    ).web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token.toString()));
      callback(oAuth2Client);
    });
  });
}

function getAccessToken(
  oAuth2Client: any,
  callback: (auth: any) => void
): void {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code: string) => {
    rl.close();
    oAuth2Client.getToken(code, (err: Error, token: any) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
