import { PureAbility, ForcedSubject } from '@casl/ability';
import { Arena } from '../arena/entities/arena.entity';
import { Hero } from './hero.entity';
import { createAbility } from '../../utils/casl';

type Abilities = ['join' | 'leave', 'Arena' | (Arena & ForcedSubject<'Arena'>)];

export type HeroAbility = PureAbility<Abilities>;
export type HeroAbilityBuilder = {
  buildFor(hero: Hero): HeroAbility;
};

export const heroAbilityBuilder = (): HeroAbilityBuilder => {
  return {
    buildFor(hero: Hero) {
      return createAbility<HeroAbility>(({ can }) => {
        can('join', 'Arena', (subject: Arena) => {
          return subject.minLevel <= hero.level && subject.maxLevel >= hero.level;
        });

        can('join', 'Arena', (subject: Arena) => {
          return hero.arenaId !== subject.id;
        });

        can('join', 'Arena', (subject: Arena) => {
          return subject.heroes.length < subject.maxSlots;
        });

        can('leave', 'Arena', (subject: Arena) => {
          return hero.arenaId === subject.id;
        });
      });
    }
  };
};
