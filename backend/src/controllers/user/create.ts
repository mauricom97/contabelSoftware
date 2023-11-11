import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const requestData = extractData(req);
    await analyseData(requestData);
    const newUser = await createNewUser(requestData);
    return res.send(newUser);
  } catch (error: any) {
    console.log(error);
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
  password = await hashPassword(password)
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
  return 'User created';
}


async function hashPassword(password: string) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}


export default create;
