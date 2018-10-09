<template>
  <component-view>
    <h2 class="title">Tabs</h2>
    <p>Tabs allow you to quickly switch between different views.</p>

    <h3 class="subtitle">Basic use</h3>
    <columns>
      <column col=5 sm=8 xs=12>
        <tabs :current.sync="current" :items="['Music', 'Radio', 'Podcasts']" />
        Current Tab: {{ current }}
      </column>
    </columns>
    <prism language="html" :code="basic" />


    <h5 class="subtitle">Block</h5>
    <p>You can add the <code>block</code> property for a full-width tab.</p>
    <columns>
      <column col=5 sm=8 xs=12>
        <tabs block :current.sync="blockCurrent" :items="['Music', 'Radio', 'Podcasts']" />
        Current Tab: {{ blockCurrent }}
      </column>
    </columns>
    <prism language="html" :code="block" />

    <h3 class="subtitle">Advanced</h3>
    <columns>
      <column col=6 xl=8 xs=12>
        <tabs :current.sync="advancedCurrent">
          <tab key="music" :badge="badge">Music</tab>
          <tab>Radio</tab>
          <tab>Podcasts</tab>
          <tab-actions v-if="advancedCurrent != 'music'">
            <btn @click="badge--, advancedCurrent = 'music'" size="sm">To music</btn>
          </tab-actions>
        </tabs>
        Current Tab: {{ advancedCurrent }}
      </column>
    </columns>
    <prism language="html" :code="advanced" />
  
  </component-view>
</template>

<script lang="ts">
export default {
  data: () => ({
    badge: 999,
    current: 'Radio',
    blockCurrent: 'Music',
    advancedCurrent: 'music',
    basic: `<tabs :current.sync="current" :items="['Music', 'Radio', 'Podcasts']" />
Current Tab: {{ current }}

<script>
export default {
  data: () => ({
    current: 'Radio',
  }),
};
<\/script>
`,
    block: `<tabs block :current.sync="current" :items="['Music', 'Radio', 'Podcasts']" />
 Current Tab: {{ current }}`,
    advanced: `<tabs :current.sync="current">
  <tab key="music" :badge="badge">Music</tab>
  <tab>Radio</tab>
  <tab>Podcasts</tab>
  <tab-actions v-if="current != 'music'">
    <btn @click="badge--, current = 'music'" size="sm">
        To music
    </btn>
  </tab-actions>
</tabs>

<script>
export default {
  data: () => ({
    current: 'music',
    badge: 999,
  }),
};
<\/script>`,
  }),
};
</script>
