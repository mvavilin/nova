import server from './app.js';
import 'dotenv/config';
import { ServerConstants } from '../../../packages/shared/src/api.constants.ts';
import { logger } from './ws/logger/logger.ts';

const port = process.env.PORT || ServerConstants.DEFAULT_PORT;

server.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
