<template>
  <component-view>
    <h2 class="title">Cards</h2>
    <p>Cards are flexible content containers.</p>
    <columns>
      <column col="4" xs="12" xl=6 lg=6>
        <card img="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" before="header">
          <div slot="header">
            <h4>Microsoft</h4>
            <div class="text-gray">Hardware and software</div>
          </div>
          <span>Empower every person and every organization on the planet to achieve more.</span>
          <a  slot="footer" class="btn btn-primary" href="#cards">Do</a>
        </card>
      </column>

      <column col="4" xs="12" xl=6 lg=6>
        <card img="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" before="body">
          <div slot="header">
            <h4>Microsoft</h4>
            <div class="text-gray">Hardware and software</div>
          </div>
          <span>Empower every person and every organization on the planet to achieve more.</span>
          <a  slot="footer" class="btn btn-primary" href="#cards">Do</a>
        </card>
      </column>

      <column col="4" xs="12" xl=6 lg=6>
        <card img="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" after="footer">
          <div slot="header">
            <h4>Microsoft</h4>
            <div class="text-gray">Hardware and software</div>
          </div>
          <span>Empower every person and every organization on the planet to achieve more.</span>
          <a slot="footer" class="btn btn-primary" href="#cards">Do</a>
        </card>
      </column>
    </columns>

    <prism language="html" :code="code" />
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { slots } from './slots';
import { props } from './props';

export default Vue.extend({
  data: () => ({
    props,
    slots,
    code: `<card img="img/osx-el-capitan.jpg" before="header">
  <div slot="header">
    <h4>Microsoft</h4>
    <div class="text-gray">Hardware and software</div>
  </div>
  <span>Empower every person and every organization on the planet to achieve more.</span>
  <a slot="footer" class="btn btn-primary" href="#cards">Do</a>
</card>

<card img="img/osx-el-capitan.jpg" before="body">
  <!-- ... -->
</card>

<card img="img/osx-el-capitan.jpg" after="footer">
  <!-- ... -->
</card>`,
  }),
});
</script>
