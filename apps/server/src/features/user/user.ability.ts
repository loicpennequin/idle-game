import { PureAbility, ForcedSubject, FieldMatcher } from '@casl/ability';
import { Hero } from '../hero/hero.entity';
import { Nullable } from '@daria/shared';
import { createAbility } from '../../utils/casl';
import { User } from './user.entity';

type Abilities =
  | ['edit', 'Hero' | (Hero & ForcedSubject<'Hero'>)]
  | ['read' | 'edit', 'User' | (User & ForcedSubject<'User'>)];

export type UserAbility = PureAbility<Abilities>;
export type UserAbilityBuilder = {
  buildFor(user: Nullable<User>): UserAbility;
};

export const fieldMatcher: FieldMatcher = fields => field => fields.includes(field);

export const userAbilityBuilder = (): UserAbilityBuilder => {
  return {
    buildFor(user) {
      return createAbility<UserAbility>(({ can }) => {
        can('edit', 'Hero', (subject: Hero) => {
          return subject.owner.id === user?.id;
        });

        can('read', 'User', 'email', (subject: User) => {
          return subject.id === user?.id;
        });

        can('edit', 'User', (subject: User) => {
          return subject.id === user?.id;
        });
      });
    }
  };
};
