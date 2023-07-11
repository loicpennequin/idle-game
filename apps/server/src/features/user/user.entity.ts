import { UUID } from '@daria/shared';
import { User as PrismaUser } from '@prisma/client';

export type UserId = UUID;

export type User = PrismaUser;
