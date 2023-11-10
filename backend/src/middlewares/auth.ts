import { Request, Response, NextFunction } from "express";

export const auth = async (req: any, res: any, next: any) => {
  try {
    next();
  } catch (error) {}
};
