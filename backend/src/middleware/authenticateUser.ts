/// <reference path="../../types.d.ts" />
//TODO fix tsconfig.json to properly include types

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const secretKey: string = process.env.SECRET_KEY!;

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = verify(token, secretKey) as { userId: string, username: string, email: string };
    req.user = { userId: decoded.userId, username: decoded.username, email: decoded.email };
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};