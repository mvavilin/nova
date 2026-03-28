import server from './app.js';
import 'dotenv/config';
import { ServerConstants } from '../../../packages/shared/src/api.constants.ts';
import { logger } from './ws/logger/logger.ts';
import type { Server } from 'node:http';

export const startServer = (port = process.env.PORT || ServerConstants.DEFAULT_PORT): Server => {
  server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
  return server;
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}
