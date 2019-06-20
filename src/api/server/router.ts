import {
  Application,
  Request,
  Response,
} from 'express';

import { GetUserByIdMethod } from '../getUserById';
import { GetAvatarByUserIdMethod } from '../getAvatarByUserId';
import { RemoveAvatarByUserIdMethod } from '../removeAvatarByUserId';

export type SetupRoutes = (app: Application) => void;

interface Dependencies {
  getUserById: GetUserByIdMethod;
  getAvatarByUserId: GetAvatarByUserIdMethod;
  removeAvatarByUserId: RemoveAvatarByUserIdMethod;
}

export default (dependencies: Dependencies): SetupRoutes => (app) => {
  app.get('/api/user/:userId', dependencies.getUserById);

  app.get('/api/user/:userId/avatar', dependencies.getAvatarByUserId);

  app.delete('/api/user/:userId/avatar', dependencies.removeAvatarByUserId);
};
