import { AnyFunction, IoEvents, Nullable } from '@daria/shared';
import { Config } from '../../config';
import { Server } from './server';
import { Server as IoServer } from 'socket.io';

export const createIo = ({ config, server }: { server: Server; config: Config }) => {
  const handleCORS = (origin: Nullable<string>, callback: AnyFunction) => {
    if (!origin || config.CORS.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS'));
    }
  };

  const io = new IoServer<{}, IoEvents>(server, {
    cors: {
      origin: handleCORS,
      methods: ['GET', 'POST']
    },
    pingInterval: 10_000
  });

  io.on('connection', socket => {
    console.log('socket connected', socket.id);
    socket.on('disconnect', () => {
      console.log('socket disconnected', socket.id);
    });
  });
  return io;
};

export type Io = IoServer<{}, IoEvents>;
