// import dotenv from 'dotenv';
// dotenv.config();
import { config } from './config';
import { container } from './container';

const main = () => {
  const server = container.cradle.server;
  //@FIXME fpr the dependency instanciation to attach the io server
  container.cradle.io;

  server.listen(config.PORT, () => {
    console.log(`Server ready on port ${config.PORT}`);
  });
};

main();
