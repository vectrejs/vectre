<template>
  <component-view>
    <h2 class="title">Dropdown menu</h2>
    <p>The dropdown is a combination of button and menu.</p>

    <h3 class="subtitle">Base use</h3>
    <dropdown-menu 
      btn-text="Click"

      :items="[
        { path: '#', text: 'Slack' },
        { path: '#hipchat', text: 'Hipchat' },
        { path: '#skype', text: 'Skype' },
      ]"
    />
    <prism language="html" :code="base" />

    <h3 class="subtitle">Advanced use</h3>
    <p>As in the case of the menu, you can specify how to display the menu items</p>
    <dropdown-menu 
      btn-text="Menu"
      btn-type="primary"
      btn-icon="menu"

      :items="{
        people: { icon: 'people', path: '#people', text: 'Contacts', badge: 2 },
        mail: { icon: 'mail', path: '#hipchat', text: 'Mails' },
        message: { icon: 'message', path: '#message', text: 'Messages' },
      }"
    >
      <router-link slot-scope="{ item, index }" :to="item.path">
        <icon :type="item.icon" />
        {{item.text}}
      </router-link>
    </dropdown-menu>
    <prism language="html" :code="advanced" />
  </component-view>
</template>

<script lang="js">
import Vue from 'vue';
import { events } from './events';
import { props } from './props';

export default Vue.extend({
  data: () => ({
    events,
    props,
    base: `<dropdown-menu
  btn-text="Click"

  :items="[
    { path: '#', text: 'Slack' },
    { path: '#hipchat', text: 'Hipchat' },
    { path: '#skype', text: 'Skype' },
  ]"
/>`,
    // tslint:disable:max-line-length
    advanced: `<dropdown-menu
  btn-text="Menu"
  btn-type="primary"
  btn-icon="menu"

  :items="{
    people: { icon: 'people', path: '#people', text: 'Contacts', badge: 2 },
    mail: { icon: 'mail', path: '#hipchat', text: 'Mails' },
    message: { icon: 'message', path: '#message', text: 'Messages' },
  }"
>
  <router-link slot-scope="{ item, index }" :to="item.path">
    <icon :type="item.icon" />
    {{ item.text }}
  </router-link>
</dropdown-menu>`,
    // tslint:enable:max-line-length
  }),
});
</script>
