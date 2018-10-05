<template>
  <component-view>
    <h2>Nav <code>&lt;vs-nav&gt;</code></h2>
    <p>Simple way to show navigation as a vertical hierarchical list</p>

    <h3>Base use</h3>
    <vs-nav :items="items" />
    <prism language="html" :code="baseHtml" />
    <prism language="js" :code="baseJs" />
    <p>
      <code>items</code> prop should have a certain structure to be used in a simplified way:
      <pre>  Array of { 
        path: string,
        text: string,
        active?: boolean
    }</pre>
    </p>

    <h3>Advanced</h3>
    <vs-nav :items="items" level="1">
      <span slot-scope="{item, index}"> <icon type="right"/> {{ item.text }} </span>
    </vs-nav>
    <prism language="html" :code="advancedHtml" />  
    <p>
      <code>items</code> could be any iterable structure. In this case,
      you have to define how to display each item using default scoped slot.
    </p>

  </component-view>
</template>

<script lang="ts">
import { slots } from './slots';
import { props } from './props';

export default {
  data: () => ({
    slots,
    props,
    items: [
      { path: '#elements', text: 'Elements' },
      { path: '#layout', text: 'Layout', items: [
        { path: '#flex', text: 'Flexbox grid' },
        { path: '#responsive', active: true, text: 'Responsive' },
        { path: '#navbar', text: 'Navbar', items: [
          { path: '#menu', text: 'Menu' },
        ]},
      ]},
      { path: '#components', text: 'Components' },
    ],
    baseHtml: `<vs-nav :items="items" />`,
    baseJs: `export default {
  data: () => ({
    items: [
      { path: '#elements', text: 'Elements' },
      { path: '#layout', text: 'Layout', items: [
        { path: '#flex', text: 'Flexbox grid' },
        { path: '#responsive', active: true, text: 'Responsive' },
        { path: '#navbar', text: 'Navbar', items: [
          { path: '#menu', text: 'Menu' }
        ]},
      ]},
      { path: '#components', text: 'Components' }
    ],
  })
}`,
    advancedHtml: `<vs-nav :items="items" level="1">
  <span slot-scope="{item, index}">
    <icon type="right"/>
    {{ item.text }}
  </span>
</vs-nav>`,
  }),
};
</script>
