<template>
  <div class="card">
    <div v-if="showImg(positions.before, slots.header)" class="card-image">
      <img :src="img" class="img-responsive" />
    </div>

    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div v-if="showImg(positions.after, slots.header) || showImg(positions.before, slots.body)" class="card-image">
      <img :src="img" class="img-responsive" />
    </div>

    <div v-if="$slots.body || $slots.default" class="card-body">
      <slot name="body" />
      <slot v-if="!$scopedSlots.body" />
    </div>

    <div v-if="showImg(positions.after, slots.body) || showImg(positions.before, slots.footer)" class="card-image">
      <img :src="img" class="img-responsive" />
    </div>

    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>

    <div v-if="showImg(positions.after, slots.footer)" class="card-image">
      <img :src="img" class="img-responsive" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Position, Positions, Slot, Slots } from './Image';

@Component
export default class Card extends Vue {
  @Prop(String)
  public img: string;

  @Prop(String)
  public before: Slot;

  @Prop(String)
  public after: Slot;

  private positions = Positions;
  private slots = Slots;

  public showImg(pos: Position, slot: Slot): boolean {
    return this.$props[pos] && this.$props[pos] === Slots[slot];
  }
}
</script>
