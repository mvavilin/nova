import type { User } from '../models/user.js';
import { Router, type NextFunction, type Request, type Response } from 'express';
import { v4 as uuid } from 'uuid';
import { parserUserDto } from '../models/parsers.js';

const users: User[] = [];

const createUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDto = parserUserDto(req.body);
    if (userDto) {
      const id = uuid();
      const user: User = { id, login: userDto.login, password: userDto.password };
      users.push(user);
      res.status(201).json(user);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userList = users.map((item) => ({ id: item.id, login: item.login }));
    res.json(userList);
  } catch (error) {
    next(error);
  }
};

const getUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (typeof id === 'string') {
      const user = users.find((item) => item.id === id);
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

const deleteUserById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (typeof id === 'string') {
      const userIndex = users.findIndex((item) => item.id === id);
      if (userIndex !== -1) {
        users.splice(userIndex, 1);
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
