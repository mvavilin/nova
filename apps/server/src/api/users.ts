import { Router, type NextFunction, type Request, type Response } from 'express';
import { v4 as uuid } from 'uuid';
import { parserUserDto } from '../models/parsers.js';
import { prisma } from '../prisma/prisma.js';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDto = parserUserDto(req.body);
    if (userDto) {
      const id = uuid();
      const user = await prisma.user.create({
        data: {
          id,
          login: userDto.login,
          password: userDto.password,
        },
      });
      res.status(201).json({ id: user.id, login: user.login });
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();
    const userList = users.map((item) => ({
      id: item.id,
      login: item.login,
    }));
    res.json(userList);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (typeof id === 'string') {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (user) {
        res.json({ id: user.id, login: user.login });
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (typeof id === 'string') {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (user) {
        await prisma.user.delete({
          where: { id },
        });
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }
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
