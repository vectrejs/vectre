<template>
  <div class="menu-badge">
    <label class="label label-primary">{{ value }}</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @Prop([String, Number])
  public value: string | number;
}
</script>
