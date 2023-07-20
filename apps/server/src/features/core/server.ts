import http from 'http';
import { App } from './app';

export type Server = http.Server;

export const server = ({ app }: { app: App }): Server => {
  const server = http.createServer(app);

  return server;
};
