import { container } from './container';
import express from 'express';

const main = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const config = container.resolve('config');

  if (process.env.NODE_ENV === 'production') {
    container.resolve('app').use(express.static('public'));
  }

  container.resolve('server').listen(config.PORT, () => {
    console.log(`Server ready on port ${config.PORT}`);
  });

  container.resolve('arenaInitializer')();
};

main();
