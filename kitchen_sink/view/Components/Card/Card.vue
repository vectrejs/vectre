<template>
  <container>
    <h2>Cards</h2>
    <p>Cards are flexible content containers.</p>
    <columns>
      <column col="4" xs="12">
        <card img="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" before="header">
          <div slot="header">
            <h4>Microsoft</h4>
            <div class="text-gray">Hardware and software</div>
          </div>
          <span>Empower every person and every organization on the planet to achieve more.</span>
          <a  slot="footer" class="btn btn-primary" href="#cards">Do</a>
        </card>
      </column>

      <column col="4" xs="12">
        <card img="https://picturepan2.github.io/spectre/img/osx-el-capitan.jpg" before="body">
          <div slot="header">
            <h4>Microsoft</h4>
            <div class="text-gray">Hardware and software</div>
          </div>
          <span>Empower every person and every organization on the planet to achieve more.</span>
          <a  slot="footer" class="btn btn-primary" href="#cards">Do</a>
        </card>
      </column>

      <column col="4" xs="12">
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
    
    <props />
    <slots />
  </container>
</template>

<script lang="ts">
import Vue from 'vue'
import Slots from "./Slots.vue";
import Props from "./Props.vue";

export default Vue.extend({
  components: { Slots, Props },
  data: () => ({
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
</card>

`,
  })
})
</script>
