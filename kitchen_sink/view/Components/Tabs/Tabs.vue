<template>
  <component-view>
    <h2>Tabs</h2>
    <tabs :current.sync="current" :items="['Music', 'Radio', 'Podcasts']" />
  </component-view>
</template>
<script>
export default {
  data: () => ({
    current: 'Radio'
  })
}
</script>
