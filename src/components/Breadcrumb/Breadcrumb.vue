<template>
  <ul class="breadcrumb">
    <li v-for="(crumb, key) in crumbs" :key="key" class="breadcrumb-item">
      <slot :crumb="crumb" />
      <a v-if="!$scopedSlots['default']" :href="crumb.path">
        {{ crumb.title }}
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Crumb } from './Crumb';

@Component({
  name: 'Breadcrumb',
})
export default class Breadcrumb extends Vue {
  @Prop({ type: Array, required: true })
  public crumbs: Crumb[] | [];
}
</script>
