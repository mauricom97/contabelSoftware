import { Request, Response } from "express";
import becrypt from "bcrypt";
import prisma from "../../middlewares/connPrisma";
import jwt from "jsonwebtoken";
// import { CompanyInterface } from "interfaces/CompanyInterface";

async function login(req: Request, res: Response) {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const user = await findUser(requestData);
    let company = user.UserCompany.find(
      (company: any) => company.defaultCompany
    );
    const companyId = company?.idCompany;
    const isPasswordValid = await comparePassword(requestData, user);
    if (!isPasswordValid) {
      throw new Error("Password is not valid");
    }
    console.log(user);
    const token = generateToken(user);
    const { id } = user;
    return res.send({ token: token, id, companyId });
  } catch (error: any) {
    console.log(error);
    return res.status(400).send({ error: error.message });
  }
}

function extractData(req: Request) {
  const { body } = req;
  const { email, password } = body;
  return { email, password };
}

async function analyseData(requestData: { email: string; password: string }) {
  const { email, password } = requestData;
  if (!email || !password) {
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
      UserCompany: true,
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
