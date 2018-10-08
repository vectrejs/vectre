<template>
  <component-view>
    <h2 class="title">Popovers</h2>
    <p>
      Popovers are small overlay content containers. 
      Wrap elements by <code>popover</code> component. 
      The first element will be shown the rest will be placed in the overlay
    </p>
    <popover side="right">
      <btn>Right</btn>
      <card>
        <h4 slot="header">Microsoft</h4>
        <span>Empower every person and every organization on the planet to achieve more.</span>
        <a slot="footer" class="btn btn-primary" href="#cards">Do</a>
      </card>
    </popover>
    <popover>
      <btn>Top</btn>
      <card>Top Popover</card>
    </popover>
    <popover side="bottom">
      <btn>Bottom</btn>
      <card>
        <h4 slot="header">Microsoft</h4>
        <span>Empower every person and every organization on the planet to achieve more.</span>
        <a slot="footer" class="btn btn-primary" href="#cards">Do</a>
      </card>
    </popover>
    <popover side="left">
      <btn>Left</btn>
      <card>
        <h4 slot="header">Microsoft</h4>
        <span>Empower every person and every organization on the planet to achieve more.</span>
        <a slot="footer" class="btn btn-primary" href="#cards">Do</a>
      </card>
    </popover>
    <prism language="html" :code="code" />
  </component-view>
</template>
<script lang="ts">
import { props } from './props';

export default {
  data: () => ({
    props,
    code: `<popover>
  <btn>Top</btn>
  <card>Top Popover</card>
</popover>

<popover side="bottom">
  <btn>Bottom</btn>
  <card>...</card>
</popover>

<popover side="left">
  <btn>Left</btn>
  <card>...</card>
</popover>

<popover side="right">
  <btn>Right</btn>
  <card>...r</card>
</popover>`,
  }),
};
</script>

<style lang="scss" scoped>
/deep/ .popover + .popover { 
  margin-left: 0.4rem;
}
</style>
