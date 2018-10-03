<template>
  <div>
    <h2 v-if="title">{{title}}</h2>
    <component v-if="content" :is="content" />
    <router-view v-else></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Vue, { VueConstructor } from 'vue';

@Component
export default class extends Vue {
  @Prop(String) private title!: string;

  @Prop() private content: VueConstructor;
}
</script>
