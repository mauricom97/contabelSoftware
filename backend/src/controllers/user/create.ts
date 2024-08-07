import prisma from "../../middlewares/connPrisma"
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import becrypt from "bcrypt";
import sendMessage from "../../utils/slack/services/sendMessage"

async function create(req: Request, res: Response) {
  try {
    console.log(process.env.DATABASE_URL)
    console.log(`===================${process.env.NODE_ENV}======================`)
    const requestData = extractData(req);
    await analyseData(requestData);
    const newUser = await createNewUser(requestData);
    const token = generateToken(newUser);
    const { id } = newUser;
    return res.send({ token: token, id });
  } catch (error: any) {
    console.log(error)
    await sendMessage({ text: `Erro ao criar usuario: ${JSON.stringify(error)}` }, "bugs");
    return res.status(400).send({ error: error.message });
  }
}

function extractData(req: Request) {
  const { body } = req;
  const { firstname, lastname, birthdate, phone, email, password } = body;
  return { firstname, lastname, birthdate, phone, email, password };
}

async function analyseData(requestData: {
  firstname: string;
  lastname: string;
  birthdate: string;
  phone: string;
  email: string;
  password: string;
}) {
  const { firstname, lastname, birthdate, phone, email, password } =
    requestData;
  if (!firstname || !lastname || !birthdate || !phone || !email || !password) {
    throw new Error("Missing data");
  }
}

async function createNewUser(requestData: {
  firstname: string;
  lastname: string;
  birthdate: string;
  phone: string;
  email: string;
  password: string;
}) {
  const { firstname, lastname, phone, email } = requestData;

  let { birthdate } = requestData;
  birthdate = new Date(birthdate).toISOString();
  let { password } = requestData;
  password = await hashPassword(password);
  const newUser = await prisma.user.create({
    data: {
      firstname,
      lastname,
      birthdate,
      phone,
      email,
      password,
    },
  });
  return newUser;
}

async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
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

export default create;
