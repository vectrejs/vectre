<template>
  <component-view :slots="slots" :props="props">
    <h2>Nav <code>&lt;vs-nav&gt;</code></h2>
    <p>Simple way to show navigation as a vertical hierarchical list</p>
    
    <h3>Base use</h3>
    <p>
      <code>items</code> prop should have a certain structure to be used in a simplified way:
      <pre>Array of { path: string, text: string, active?: boolean }</pre>
    </p>
    
    <vs-nav :items="items" />
    <prism language="html" :code="baseHtml" />
    <prism language="js" :code="baseJs" />

    <h3>Advanced</h3>
    <p>
      <code>items</code> could be any iterable structure. In this case, 
      you have to define how to display each item using default scoped slot. 
      <br />
      E.g. let's take the same data as for the basic usage and make a nav with
      non clickable items and a max level of 1
    </p>

    <vs-nav :items="items" level="1">
      <span slot-scope="{item, index}"> {{ item.text }} </span>
    </vs-nav>
    
    <prism language="html" :code="advancedHtml" />
  </component-view>
</template>

<script>
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
          { path: '#menu', text: 'Menu' }
        ]},
      ]},
      { path: '#components', text: 'Components' }
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
  <span slot-scope="{item, index}"> {{ item.text }} </span>
</vs-nav>`,
  })
}
</script>
