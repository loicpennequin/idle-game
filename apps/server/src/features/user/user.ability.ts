import { PureAbility, AbilityBuilder, ForcedSubject } from '@casl/ability';
import { Hero } from '../hero/hero.entity';
import { User } from '@prisma/client';
import { Nullable } from '@daria/shared';

type Abilities =
  | ['edit', 'Hero' | (Hero & ForcedSubject<'Hero'>)]
  | ['read', 'User' | (User & ForcedSubject<'User'>)];

export type UserAbility = PureAbility<Abilities>;
export type UserAbilityBuilder = {
  buildFor(user: Nullable<User>): UserAbility;
};

export const userAbilityBuilder = (): UserAbilityBuilder => {
  return {
    buildFor(user) {
      const { can, build } = new AbilityBuilder<UserAbility>(PureAbility);

      can('edit', 'Hero', (subject: Hero) => {
        return subject.owner.id === user?.id;
      });

      can('read', 'User', 'email', (subject: User) => {
        return subject.id === user?.id;
      });

      return build();
    }
  };
};
