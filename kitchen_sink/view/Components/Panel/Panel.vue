<template>
  <component-view>
    <h2 class="title">Panels</h2>
    <p>Panels are flexible view container with auto-expand content section.</p>
    <columns>
      <column col=5 xl=6 sm=12>
        <panel>
          <h5 slot="header">Recently Watched</h5>
          <tile slot="body"
            v-for="(tile, i) in tiles"
            :key="i"
            :avatar="tile.avatar"
            :title="tile.title"
            :subtitle="tile.subtitle"
          />
          <btn slot="footer" size="block" type="primary">Hide</btn>
        </panel>
      </column>
    </columns>
    <prism language="html" :code="html" />
    <prism language="javascript" :code="js" />
  </component-view>
</template>

<script lang="ts">
import { slots } from './slots';

export default {
  data: () => ({
    slots,
    tiles: [
      // tslint:disable:max-line-length
      { avatar: 'https://picturepan2.github.io/spectre/img/avatar-1.png', title: 'Academy Awards', subtitle: 'A set of 25 awards for artistic and technical merit in the American film industry, given annually by the Academy of Motion Picture Arts and Sciences (AMPAS)...' },
      { avatar: 'https://picturepan2.github.io/spectre/img/avatar-2.png', title: 'Avengers: Infinity War', subtitle: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos ...' },
      { avatar: 'https://picturepan2.github.io/spectre/img/avatar-3.png', title: 'X-Men', subtitle: 'Two mutants come to a private academy for their kind whose resident superhero team must oppose a terrorist organization with similar powers.' },
      // tslint:enable:max-line-length
    ],
    html: `<panel>
  <h5 slot="header">Recently Watched</h5>
  <tile slot="body"
    v-for="(tile, i) in tiles"
    :key="i"
    :avatar="tile.avatar"
    :title="tile.title"
    :subtitle="tile.subtitle"
  />
  <btn slot="footer" size="block" type="primary">Hide</btn>
</panel>`,
    js: `export default {
  data: () => ({
    tiles: [
      {
        avatar: 'img/avatar-1.png',
        title: 'Academy Awards',
        subtitle: 'A set of 25 awards for ...'
      },
      {
        avatar: 'img/avatar-2.png',
        title: 'Avengers',
        subtitle: 'The Avengers and their allies must ...'
      },
      {
        avatar: 'img/avatar-3.png',
        title: 'X-Men',
        subtitle: 'Two mutants come ...' },
    ]
  }),
}`,
  }),
};
</script>

<style scoped>
@media (min-height: 560px) {
  .panel {
    height: 55vh;
  }
}
</style>
