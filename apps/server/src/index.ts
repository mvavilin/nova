import server from './app.js';
import 'dotenv/config';
import { ServerConstants } from '../../../packages/shared/src/api.constants.ts';

const port = process.env.PORT || ServerConstants.DEFAULT_PORT;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
