import { setupServer } from './server.js';
import { initMongoDB } from './db/initMongoDB.js';

import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import createDirIfNotExists from './utils/createDirIFNotExists.js';

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
};

bootstrap();
