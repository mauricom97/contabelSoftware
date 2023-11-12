import { Request, Response } from "express";
import becrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

async function login(req: Request, res: Response) {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const user = await findUser(requestData);
    const isPasswordValid = await comparePassword(requestData, user);
    if (!isPasswordValid) {
      throw new Error("Password is not valid");
    }
    const token = generateToken(user);
    return res.send({token: token});
    
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
  });
  if (!user) {
    throw new Error("User not found");
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
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);
  return token;
}

export default login;