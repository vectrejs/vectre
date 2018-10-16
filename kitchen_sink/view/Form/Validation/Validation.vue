<template>
  <container>
    <h2 class="title">Validation</h2>
    
    <form-group :error="!!errorPassword || !!errorPassword2">
      <form-label>Password</form-label>
      <form-input type="password" placeholder="Password" v-model="password" />
      <form-hint v-if="errorPassword">{{ errorPassword }}</form-hint>
    </form-group>

    <form-group :error="!!errorPassword2">
      <form-input type="password" placeholder="Repeat" v-model="password2" />
      <form-hint v-if="errorPassword2">{{ errorPassword2 }}</form-hint>
    </form-group>
  </container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    password: undefined,
    password2: undefined,
  }),
  computed: {
    errorPassword(): string | void {
      if (this.password === undefined) {
        return;
      }

      if ((this.password! as string).length < 4) {
        return 'At least 4 chars';
      }
    },

    errorPassword2(): string | void {
      if (this.password && this.password2 && this.password !== this.password2) {
        return 'Passwords not matched';
      }
    },
  },
});
</script>
