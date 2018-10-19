<template>
  <component-view>
    <h2 class="title">Validation</h2>
    <p>
      Vectre mainly focuses on UI components. Following "Single responsibility principle", 
      implementing of validation is outside the scope. But there is always the possibility 
      to add "by hand" or select one of great Vue libraries that will handle a lot of 
      this for you.
    </p>
    <p>Below you will find examples of using several popular libraries.</p>

    <vee-validate />
    <vuelidate />
    <manual />
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import VeeValidate from './VeeValidate.vue';
import Vuelidate from './Vuelidate.vue';
import Manual from './Manual.vue';

export default Vue.extend({
  components: {
    Manual,
    VeeValidate,
    Vuelidate,
  },
});
</script>
