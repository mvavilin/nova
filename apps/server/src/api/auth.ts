import { Router, type NextFunction, type Request, type Response } from 'express';
import { LoginDtoSchema } from '../models/auth.ts';
import { HttpStatus, ServerConstants } from '../models/api.types.ts';
import { prisma } from '../prisma/prisma.ts';
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { getUserWithoutPassword } from '../utils/getUserWithoutPassword.ts';

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const loginDto = LoginDtoSchema.safeParse(req.body);

    if (!loginDto.success) {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const { email, password } = loginDto.data;

    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      res.sendStatus(HttpStatus.FORBIDDEN);
      return;
    }

    if (!(await argon.verify(user.password, password))) {
      res.sendStatus(HttpStatus.FORBIDDEN);
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY || ServerConstants.DEFAULT_JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user.id }, secretKey, {});
    res.setHeader('auth_token', token);
    const output = getUserWithoutPassword(user);
    res.status(HttpStatus.OK).send(output);
  } catch (error) {
    next(error);
  }
};

const authRouter = Router();

authRouter.post('/login', login);

export { authRouter };
