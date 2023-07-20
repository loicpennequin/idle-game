import { type IoEvents } from '@daria/shared';
import { io, type Socket } from 'socket.io-client';
import type { AuthApi } from '../auth/api/auth.api';

export type AppSocket = Socket<IoEvents, {}>;

export const createSocket = ({ authApi }: { authApi: AuthApi }) => {
  const socket: AppSocket = io(import.meta.env.VITE_API_URL, {
    transports: ['websocket'],
    autoConnect: false,
    auth: cb => cb({ token: authApi.getToken()?.accessToken })
  });

  return socket;
};
