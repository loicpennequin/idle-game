import { config } from './config';
import { container } from './container';
import express from 'express';

const main = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { server, app, io } = container.cradle;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('public'));
  }

  server.listen(config.PORT, () => {
    console.log(`Server ready on port ${config.PORT}`);
  });
};

main();
