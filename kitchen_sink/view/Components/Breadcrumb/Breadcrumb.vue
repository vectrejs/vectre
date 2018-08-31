<template>
  <container>
    <h2>Breadcrumbs</h2>
    <p>Breadcrumbs can greatly enhance the way users find their way around</p>

    <h3>Basic use</h3>
    <p>
      There is a required prop <code>crumbs</code>. It's any iterable structure.
      If you want to use a simplified version, you have to use an array of objects with the following
      structure <code>{ path: String, title: String }</code>
    </p>
    <breadcrumb
      :crumbs="[
        { path: '/', title: 'Home' },
        { path: '/settings', title: 'Settings' },
        { path: '/settings/avatar', title: 'Change avatar' }
      ]"
    />
    <prism language="html" :code="basic" />

    <h3>Advanced</h3>
    <p>
      It is possible to display any object using an unnamed slot. For example, let's take a case where
      we want to display <code>router-link</code> instead of &lt;a&gt;
    </p>

    <breadcrumb
      :crumbs="[
        { to: '', customTitle: 'Home' },
        { to: 'settings', customTitle: 'Settings' },
        { to: 'settings/avatar', customTitle: 'Change avatar' }
      ]">
      <router-link slot-scope="{ crumb }" :to="crumb.to">
          {{ crumb.customTitle }}
      </router-link>
    </breadcrumb>
    <prism language="html" :code="advanced" />

    <props />
    <slots />
  </container>
</template>

<script lang="ts">
import Vue from 'vue';
import Props from './Props.vue';
import Slots from './Slots.vue';

export default Vue.extend({
  components: { Props, Slots },
  data: () => ({
    basic: `<breadcrumb
  :crumbs="[
    { path: '/', title: 'Home' },
    { path: '/settings', title: 'Settings' },
    { path: '/settings/avatar', title: 'Change avatar' }
  ]"
/>
    `,
    advanced: `<breadcrumb
  :crumbs="[
    { to: '', customTitle: 'Home' },
    { to: 'settings', customTitle: 'Settings' },
    { to: 'settings/avatar', customTitle: 'Change avatar' }
  ]">
  <router-link slot-scope="{ crumb }" :to="crumb.to">
    {{ crumb.customTitle }}
  </router-link>
</breadcrumb>`,
  }),
});
</script>
