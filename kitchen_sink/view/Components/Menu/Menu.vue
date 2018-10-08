<template>
  <component-view>

    <h2 class="title">Menu <code>&lt;vs-menu&gt;</code></h2>
    <p>Menus are vertical list of links for navigation.</p>

    <h3 class="subtitle">Base use</h3>
    <columns>
      <column col=4 md=12>
          <vs-menu :items="[
              { divider: 'LINKS' },
              { path: '#', text: 'Slack' },
              { divider: true },
              { path: '#hipchat', text: 'Hipchat' },
              { path: '#skype', text: 'Skype' },
            ]"
            active="3"
          />
      </column>
    </columns>
    <prism language="html" :code="basic" />
    <p>
      <code>items</code> prop should have a certain structure to be used in a simplified way: 
      <pre>  Array of { 
        path: string, 
        text: string, 
        badge?: string | number, 
        divider?: string|boolean 
    }</pre>
      <i>Note: dividers can not be active but they are used in index count</i>
    </p>

    <h3 class="subtitle">Advanced</h3>
    <p>
      <code>items</code> could be any iterable structure. In this case, you must define how to display each item using default scoped slot.
    </p>

    <columns>
      <column col=4 sm=12>
        <vs-menu :items="{
            people: { icon: 'people', path: '#people', text: 'Contacts', badge: 2 },
            mail: { icon: 'mail', path: '#hipchat', text: 'Mails' },
            message: { icon: 'message', path: '#message', text: 'Messages' },
          }"
        >
          <router-link slot-scope="{ item, index }" :to="item.path" :class="index == 'message' ? 'active' : null">
            <icon :type="item.icon" />
            {{item.text}}
          </router-link>
        </vs-menu>
      </column>
    </columns>
    <prism language="html" :code="advanced" />
     <p>
      <i>Note: active is ignored. You have to define it by yourself. Badges still work.</i>
    </p>
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';
import { slots } from './slots';

export default Vue.extend({
  data: () => ({
    props,
    slots,
    basic: `<vs-menu :items="[
    { divider: 'LINKS' },
    { path: '#', text: 'Slack' },
    { divider: true },
    { path: '#hipchat', text: 'Hipchat' },
    { path: '#skype', text: 'Skype' },
  ]"
  active="3"
/>`,
    // tslint:disable:max-line-length
    advanced: `<vs-menu :items="{
    people: { icon: 'people', to: '#people', text: 'Contacts', badge: 2 },
    mail: { icon: 'mail', to: '#hipchat', text: 'Mails' },
    message: { icon: 'message', to: '#message', text: 'Messages' },
  }"
>
  <router-link slot-scope="{ item, index }" :to="item.to" :class="index == 'message' ? 'active' : null">
    <icon :type="item.icon" />
    {{item.text}}
  </router-link>
</vs-menu>`,
    // tslint:enable:max-line-length
  }),
});
</script>
