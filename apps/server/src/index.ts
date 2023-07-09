// import dotenv from 'dotenv';
// dotenv.config();
import { config } from './config';
import { container } from './container';

const main = () => {
  const server = container.resolve('server');

  server.listen(config.PORT, () => {
    console.log(`Server ready on port ${config.PORT}`);
  });
};

main();
