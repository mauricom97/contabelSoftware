import User from '../../db/models/user';
const { Request, Response } = require('express');
export const create = async (req: any, res: any): Promise<void> => {
  try {
    const user = extractData(req);
    await analyseData(user);
    const newUser = await createUser(user);
    return res.send(newUser);
  } catch (error) {
    console.log(error)
  }
};

function extractData(req: any) {
  const { name, email, password } = req.body;
  return { name, email, password };
}

async function analyseData(user: {name: string, email: string, password: string}) {
  if(user.name.length < 3) throw new Error('Name is too short');
}

async function createUser(user: {name: string, email: string, password: string}) {
  const newUser = await User.create(user);
  return newUser;
}