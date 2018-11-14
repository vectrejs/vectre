<template>
  <ul class="breadcrumb">
    <li class="breadcrumb-item" v-for="(crumb, key) in crumbs" :key="key">
      <slot :crumb="crumb" />
      <a v-if="!$scopedSlots['default']" :href="crumb.path">{{ crumb.title }}</a>
    </li>
</ul>
</template>


<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { ICrumb } from './Crumb';

@Component
export default class extends Vue {
  @Prop({ type: Array, required: true })
  public crumbs: ICrumb[] | any[];
}
</script>
