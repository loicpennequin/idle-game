<script setup lang="ts">
import type { HeroResponse } from '@daria/shared';
import { definePage } from 'vue-router/auto';

definePage({
  name: 'Arena'
});

const route = useRoute('Arena');
const { data: session } = useSession();
const { data: arena, suspense: arenaSuspense } = useArenaDetails(
  computed(() => route.params.id)
);
const { data: heroes, suspense: heroesSuspense } = useUserHeroes(
  computed(() => session.value?.id)
);

const { mutate: joinArena } = useJoinArena();
const { mutate: leaveArena } = useLeaveArena();

const canJoin = (hero: HeroResponse) => {
  if (!arena.value) return false;
  return (
    arena.value.minLevel <= hero.level &&
    arena.value.maxLevel >= hero.level &&
    !arena.value.heroes.some(arenaHero => arenaHero.hero.id === hero.id)
  );
};

await Promise.all([arenaSuspense(), heroesSuspense()]);
</script>

<template>
  <Suspense>
    <main
      class="container"
      style="--container-size: var(--size-xl)"
      v-if="arena && heroes"
    >
      <h2>Arena</h2>
      <dl>
        <dt>Name</dt>
        <dd>{{ arena.name }}</dd>
        <dt>Slots</dt>
        <dd>{{ arena.availableSlots }}/{{ arena.maxSlots }}</dd>
        <dt>Min level</dt>
        <dd>{{ arena.minLevel }}</dd>
        <dt>Max level</dt>
        <dd>{{ arena.maxLevel }}</dd>
        <dt>Heroes</dt>
        <dd>
          <ul class="flex gap-3">
            <li
              v-for="arenaHero in arena.heroes"
              :key="arenaHero.hero.id"
              class="surface"
            >
              {{ arenaHero.hero.name }} (Lvl{{ arenaHero.hero.level }})
              <UiButton
                v-if="arenaHero.hero.owner.id === session?.id"
                @click="leaveArena({ heroId: arenaHero.hero.id, arenaId: arena.id })"
              >
                Leave
              </UiButton>
            </li>
          </ul>
        </dd>
      </dl>

      <h2>Your heroes</h2>
      <ul class="flex gap-3">
        <li v-for="hero in heroes" :key="hero.id" class="surface">
          {{ hero.name }} (Lvl{{ hero.level }})
          <UiButton
            v-if="canJoin(hero)"
            @click="joinArena({ heroId: hero.id, arenaId: arena.id })"
          >
            Join
          </UiButton>
        </li>
      </ul>
    </main>
  </Suspense>
</template>

<style scoped lang="postcss">
li {
  padding: var(--size-4);
  border: solid var(--border-size-1) var(--border-dimmed);
}
</style>
