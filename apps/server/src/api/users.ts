import { Router, type NextFunction, type Request, type Response } from 'express';
import { v4 as uuid } from 'uuid';
import { prisma } from '../prisma/prisma.js';
import { HttpStatus } from '../models/api.types.ts';
import { LoginDtoSchema } from '../models/user.ts';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userDto = LoginDtoSchema.safeParse(req.body);

    if (!userDto.success) {
      res.sendStatus(HttpStatus.BAD_REQUEST);
      return;
    }

    const { email, userName, password } = userDto.data;

    let user = await prisma.user.findFirst({
      where: { email },
    });
    if (user) {
      res.sendStatus(HttpStatus.CONFLICT);
      return;
    }

    const id = uuid();
    user = await prisma.user.create({
      data: {
        id,
        email,
        userName,
        password,
      },
    });
    res
      .status(HttpStatus.CREATED)
      .json({ id: user.id, email: user.email, userName: user.userName });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    const userList = users.map((item) => ({
      id: item.id,
      email: item.email,
      userName: item.userName,
    }));
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
      res.json({ id: user.id, email: user.email, userName: user.userName });
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
