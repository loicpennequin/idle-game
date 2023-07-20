import { isLeft } from 'fp-ts/Either';
import { isSome } from 'fp-ts/Option';
import { Emitter } from '../core/event-emitter';
import { Io } from '../core/io';
import { ArenaRepository } from './arena.repository';
import { ArenaHeroMapper } from './mappers/arenaHero.mapper';

type Dependencies = {
  emitter: Emitter;
  arenaRepo: ArenaRepository;
  arenaHeroMapper: ArenaHeroMapper;
  io: Io;
};

export type ArenaInitializer = () => void;
export const arenaInitializer = ({
  emitter,
  io,
  arenaRepo,
  arenaHeroMapper
}: Dependencies): ArenaInitializer => {
  return () => {
    emitter.on('HERO_JOIND_ARENA', async ({ arenaId, heroId }) => {
      const arena = await arenaRepo.findByIdWithDetails(arenaId);

      if (isLeft(arena)) return;

      const newHero = arena.right.heroes.find(h => h.heroId === heroId);
      if (!newHero) return;

      arena.right.heroes.forEach(arenaHero => {
        const socket = io.getSocketFromUserId(arenaHero.hero.owner.id);
        if (isSome(socket)) {
          socket.value.emit('HERO_JOINED_ARENA', arenaHeroMapper.toResponse(newHero));
        }
      });
    });
  };
};
