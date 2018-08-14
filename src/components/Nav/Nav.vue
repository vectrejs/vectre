<template>
  <ul class="nav">
    <li class="nav-item" v-for="(item, index) in items" :key="index">
      <a :href="item.path">{{item.text}}</a>
    </li>

    <li class="nav-item">
      <a href="#">Elements</a>
    </li>
    <li class="nav-item active">
      <a href="#">Layout</a>
      <ul class="nav">
        <li class="nav-item">
          <a href="#">Flexbox grid</a>
        </li>
        <li class="nav-item">
          <a href="#">Responsive</a>
        </li>
        <li class="nav-item">
          <a href="#">Navbar</a>
        </li>
        <li class="nav-item">
          <a href="#">Empty states</a>
        </li>
      </ul>
    </li>
    <li class="nav-item">
      <a href="#">Components</a>
    </li>
    <li class="nav-item">
      <a href="#">Utilities</a>
    </li>
  </ul>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class extends vue {
  @Prop({ type: Array, required: true })
  private items: object[];
}
</script>

