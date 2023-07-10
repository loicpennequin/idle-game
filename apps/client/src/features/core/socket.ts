import { type IoEvents } from '@daria/shared';
import { io, type Socket } from 'socket.io-client';

export type AppSocket = Socket<IoEvents, {}>;

export const createSocket = () => {
  const socket: AppSocket = io(import.meta.env.VITE_API_URL, {
    transports: ['websocket'],
    autoConnect: false
    // auth: cb => cb({ token: authService.getToken() })
  });

  return socket;
};
