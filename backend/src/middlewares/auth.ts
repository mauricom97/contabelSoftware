import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "./connPrisma"

async function auth(req: any, res: Response, next: NextFunction) {
  try {
    const token: string = extractToken(req);
    const decodedToken = await verifyToken(token);
    const user = await findUser(decodedToken);
    req.user = user;
    req.company = req.query.company;
    next();
  } catch (error: any) {
    console.log(error);
    return res.status(401).send({ error: error.message });
  }
}

function extractToken(req: Request) {
  const { token } = req.headers;
  if (!token) {
    throw new Error("Missing token");
  }
  return token as string;
}

async function verifyToken(token: string) {
  const decodedToken: { id: number; email: string; iat: number } = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as { id: number; email: string; iat: number };
  if (!decodedToken) {
    throw new Error("Invalid token");
  }
  return decodedToken;
}
async function findUser(decodedToken: {
  id: number;
  email: string;
  iat: number;
}) {
  console.log(decodedToken.id)
  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  });
  if (!user) {
    throw new Error("This token does not match any user");
  }
  return user;
}

export default auth;
