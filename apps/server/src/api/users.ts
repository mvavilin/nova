import { Router, type NextFunction, type Request, type Response } from 'express';
import { v4 as uuid } from 'uuid';
import { prisma } from '../prisma/prisma.js';
import { HttpStatus } from '../models/api.types.ts';
import * as argon from 'argon2';
import { getUserWithoutPassword } from '../utils/getUserWithoutPassword.ts';
import { RegisterDtoSchema } from '../models/auth.ts';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userDto = RegisterDtoSchema.safeParse(req.body);

    if (!userDto.success) {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const { email, username, password } = userDto.data;

    let user = await prisma.user.findFirst({
      where: { email },
    });
    if (user) {
      res.sendStatus(HttpStatus.CONFLICT);
      return;
    }

    const id = uuid();
    const hash = await argon.hash(password);
    user = await prisma.user.create({
      data: {
        id,
        email,
        username,
        password: hash,
      },
    });
    const output = getUserWithoutPassword(user);
    res.status(HttpStatus.CREATED).json(output);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    const userList = users.map((item) => {
      const output = getUserWithoutPassword(item);
      return output;
    });
    res.json(userList);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;

    if (typeof id !== 'string') {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      const output = getUserWithoutPassword(user);
      res.json(output);
    } else {
      res.sendStatus(HttpStatus.NOT_FOUND);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = req.params.id;
    if (typeof id !== 'string') {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.sendStatus(HttpStatus.NOT_FOUND);
      return;
    }

    await prisma.user.delete({
      where: { id },
    });
    res.sendStatus(HttpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.delete('/:id', deleteUserById);

export { userRouter };
