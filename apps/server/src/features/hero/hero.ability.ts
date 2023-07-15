import { PureAbility, AbilityBuilder, ForcedSubject } from '@casl/ability';
import { Arena } from '../arena/arena.entity';
import { Hero } from './hero.entity';

type Abilities = ['join' | 'leave', 'Arena' | (Arena & ForcedSubject<'Arena'>)];

export type HeroAbilityBuilder = {
  buildFor(hero: Hero): PureAbility<Abilities>;
};

export const heroAbilityBuilder = (): HeroAbilityBuilder => {
  return {
    buildFor(hero: Hero) {
      const { can, build } = new AbilityBuilder<PureAbility<Abilities>>(PureAbility);

      can('join', 'Arena', (subject: Arena) => {
        return subject.minLevel <= hero.level && subject.maxLevel >= hero.level;
      });

      can('join', 'Arena', (subject: Arena) => {
        return hero.arenaId !== subject.id;
      });

      can('join', 'Arena', (subject: Arena) => {
        return subject.heroes.length < subject.maxslots;
      });

      can('leave', 'Arena', (subject: Arena) => {
        return hero.arenaId === subject.id;
      });

      return build();
    }
  };
};
