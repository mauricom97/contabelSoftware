import { Request, Response } from "express";
import becrypt from "bcrypt";
import prisma from "../../middlewares/connPrisma"
import jwt from "jsonwebtoken";

async function login(req: Request, res: Response) {
  try {
    const requestData = extractData(req);
    console.log(requestData)
    await analyseData(requestData);
    const user = await findUser(requestData);
    let company = user.UserCompany.find((company: any) => company.defaultCompany)
    const companyId = company?.idCompany
    if(requestData.type === "email") {
      const isPasswordValid = await comparePassword(requestData, user);
      if (!isPasswordValid && requestData.type === "email") {
        throw new Error("Password is not valid");
      }
    }
    const token = generateToken(user);
    const { id } = user;
    return res.send({ token: token, id, companyId });
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
}

function extractData(req: Request) {
  const { type } = req.body;
  const { email, password } = req.body.contentAuth;
  return { type, email, password };
}

async function analyseData(requestData: { type: string, email: string; password: string }) {
  const { type, email } = requestData;
  if (!type || !email) {
    throw new Error("Missing data");
  }
}

async function findUser(requestData: { email: string }) {
  const { email } = requestData;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      UserCompany: true
    },
  });
  if (!user) {
    throw new Error("This user does not exist");
  }
  return user;
}

async function comparePassword(
  requestData: { password: string },
  user: {
    password: string;
  }
) {
  const { password } = requestData;
  const isPasswordValid = await becrypt.compare(password, user.password);
  return isPasswordValid;
}

function generateToken(user: { id: number; email: string }) {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET as string
  );
  return token;
}

export default login;
