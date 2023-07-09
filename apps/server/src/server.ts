import http from 'http';
import { Express } from 'express';

export type Server = http.Server;

export const server = ({ app }: { app: Express }): Server => http.createServer(app);
