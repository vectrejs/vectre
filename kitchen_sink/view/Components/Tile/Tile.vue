<template>
  <component-view>
    <h2 class="title">Tiles</h2>
    <p>Tiles are repeatable or embeddable information blocks.</p>

    <h3 class="subtitle">Basic usage</h3>
    <columns>
      <column col=7 xl=9 sm=12>
        <tile 
          icon="people" 
          title="Academy Awards"
          subtitle="A set of 25 awards for artistic and technical merit in the American film industry, given annually by the Academy of Motion Picture Arts and Sciences (AMPAS)..."
        />
      </column>
      <column col=7 xl=9 sm=12>
        <tile 
          avatar="https://picturepan2.github.io/spectre/img/avatar-1.png" 
          title="Avengers: Infinity War"
          subtitle="The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos ..."
        >
          <template slot="actions">
            <btn type="primary">Watch</btn> 
            <btn>Skip</btn>
          </template>
        </tile>
      </column>
      <column col=7 xl=9 sm=12>
        <tile 
          initials="X" 
          title="X-Men"
          subtitle="Two mutants come to a private academy for their kind whose resident superhero team must oppose a terrorist organization with similar powers."
        >
          <btn type="primary">Watch</btn> 
          <btn>Skip</btn>
        </tile>
      </column>
    </columns>
    <prism language="html" :code="baseHtml" />

    <h3 class="subtitle">Compact</h3>
    <p>Compact version of Tiles component</p>
    <columns>
      <column col=5 md=8 sm=12>
        <tile compact 
          initials="L" 
          title="Logan"
          subtitle="Offline · Last seen: 3 March 2017"
        >
          <dropdown-menu right
            slot="actions" 
            btn-icon="icon-more-vert" 
            btn-type="link"
            :items="[{text: 'Call'}]" />
        </tile>
      </column>
    </columns>
    <prism language="html" :code="compactHtml" />
  </component-view>
</template>

<script lang="ts">
import { slots } from './slots';
import { props } from './props';

export default {
  data: () => ({
    props,
    slots,
    baseHtml: `<tile
  icon="people"
  title="Academy Awards"
  subtitle="A set of 25 awards for artistic..."
/>

<tile
  avatar="img/avatar-1.png"
  title="Avengers: Infinity War"
  subtitle="The Avengers and their allies must be willing..."
>
  <template slot="actions">
    <btn type="primary">Watch</btn>
    <btn>Skip</btn>
  </template>
</tile>

<tile
  initials="X"
  title="X-Men"
  subtitle="Two mutants come to a private academy for their kind..."
>
  <btn type="primary">Watch</btn>
  <btn>Skip</btn>
</tile>`,
    compactHtml: `<tile compact
  initials="L"
  title="Logan"
  subtitle="Offline · Last seen: 3 March 2017"
>
  <dropdown-menu right
    slot="actions"
    btn-icon="icon-more-vert"
    btn-type="link"
    :items="[{text: 'Call'}]" />
</tile>`,
  }),
};
</script>
