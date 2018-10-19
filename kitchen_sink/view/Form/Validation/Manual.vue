<template>
  <div>
    <h3 class="subtitle">Manual</h3>
    <p>
      You might choose this option if you don't require a lot of validation 
      and you care about the final size of bundle.
    </p>
    <p>
      Below is one example implementation that lacks charm but makes everything 
      obvious and simple.
    </p>
    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-group :error="!!errorPassword || !!errorPassword2">
          <form-label>Password</form-label>
          
          <form-input 
            type="password" 
            placeholder="Password" 
            v-model.trim="password" 
          />
          
          <form-hint v-if="errorPassword" error>
            {{ errorPassword }}
          </form-hint>
        </form-group>

        <form-group :error="!!errorPassword2">
          <form-input 
            type="password" 
            placeholder="Repeat" 
            v-model.trim="password2" 
          />
          
          <form-hint v-if="errorPassword2" error>
            {{ errorPassword2 }}
          </form-hint>
        </form-group>
      </column>
    </columns>

    <prism language="html" :code="html" />
    <prism language="javascript" :code="js" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    errorPassword(): string | void {
      if (this.password === undefined) {
        return;
      }

      if (this.password === '') {
        return 'Required!';
      }

      if ((this.password! as string).length < 6) {
        return ' Password must have at least 6 letters';
      }
    },

    errorPassword2(): string | void {
      if (
        this.password
        && this.password2
        && this.password !== this.password2
      ) {
        return 'Passwords must be identical';
      }
    },
  },
  data: () => ({
    password: undefined,
    password2: undefined,
    html: `<form-group :error="!!errorPassword || !!errorPassword2">
  <form-label>Password</form-label>

  <form-input
    type="password"
    placeholder="Password"
    v-model.trim="password"
  />

  <form-hint v-if="errorPassword" error>
    {{ errorPassword }}
  </form-hint>
</form-group>

<form-group :error="!!errorPassword2">
  <form-input
    type="password"
    placeholder="Repeat"
    v-model.trim="password2"
  />

  <form-hint v-if="errorPassword2" error>
    {{ errorPassword2 }}
  </form-hint>
</form-group>`,
    js: `export default {
  data: () => ({
    password: undefined,
    password2: undefined
  }),
  computed: {
    errorPassword() {
      if (this.password === undefined) {
        return;
      }

      if (this.password === '') {
        return 'Required!';
      }

      if ((this.password! as string).length < 6) {
        return ' Password must have at least 6 letters';
      }
    },
    errorPassword2() {
      if (
        this.password
        && this.password2
        && this.password !== this.password2
      ) {
        return 'Passwords must be identical';
      }
    },
  },
}
`,
  }),
});
</script>
