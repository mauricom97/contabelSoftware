import transporter from "../config";
import path from "path";
import ejs from 'ejs';

interface TemplatesPath {
  [key: string]: string;
}

export default async function sendMail(mailToConfig: any) {

    const templatesPath: TemplatesPath = {
        "success-import-bills-to-pay": path.resolve(__dirname, "../templates/importBillsToPaySuccess.ejs")
    }
    const mailContent = {
        userName: mailToConfig.userName
    };
    const html = await ejs.renderFile(templatesPath[mailToConfig.template], mailContent);

  return await transporter.sendMail({
    from: mailToConfig.from,
    to: mailToConfig.to,
    subject: mailToConfig.subject,
    html: html,
    });
}
