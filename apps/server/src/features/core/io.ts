import { AnyFunction, IoEvents, Nullable, isString } from '@daria/shared';
import { Config } from '../../config';
import { Server } from './server';
import { Server as IoServer, Socket } from 'socket.io';
import { AuthenticateUseCase } from '../auth/usecases/authenticate.usecase';
import { errorFactory } from '../../utils/errorFactory';
import { UserId } from '../user/user.entity';
import { isLeft } from 'fp-ts/lib/Either';
import * as O from 'fp-ts/Option';

export type Io = IoServer<{}, IoEvents, {}, { userId: UserId }> & {
  getSocketFromUserId: (
    userId: UserId
  ) => O.Option<Socket<{}, IoEvents, {}, { userId: UserId }>>;
};

export const createIo = ({
  config,
  server,
  authenticateUseCase
}: {
  server: Server;
  config: Config;
  authenticateUseCase: AuthenticateUseCase;
}) => {
  const socketsByUserId = new Map<
    string,
    Socket<Socket<{}, IoEvents, {}, { userId: UserId }>>
  >();

  const handleCORS = (origin: Nullable<string>, callback: AnyFunction) => {
    if (!origin || config.CORS.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS'));
    }
  };

  const io: Io = new IoServer<{}, IoEvents, {}, { userId: UserId }>(server, {
    cors: {
      origin: handleCORS,
      methods: ['GET', 'POST']
    },
    pingInterval: 10_000
  }) as Io;

  io.getSocketFromUserId = (userId: UserId) =>
    O.fromNullable(socketsByUserId.get(userId));

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token as unknown;
      if (!token || !isString(token)) {
        throw errorFactory.unauthorized();
      }

      const user = await authenticateUseCase(token);
      if (isLeft(user)) {
        throw user.left;
      }
      socket.data.userId = user.right.id;
      socketsByUserId.set(user.right.id, socket);

      next();
    } catch (err) {
      next(err as Error);
    }
  });

  io.on('connection', socket => {
    socket.on('disconnect', () => {
      socketsByUserId.delete(socket.data.userId);
    });
  });

  return io;
};
