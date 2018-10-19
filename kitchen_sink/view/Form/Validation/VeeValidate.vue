<template>
  <div>
    <h3 class="subtitle">
      VeeValidate
      <a href="https://baianat.github.io/vee-validate/" title="Go to documentation" target="_blank">
        <sup><icon type="link"/></sup>
      </a>
    </h3>
    <p>
      A validation library inspired by Laravel's validation framework.
      It is feature-rich and simple to work with, including a multitude of 
      validations out of the box.
    </p>
    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-group :error="errors.has('password')">
          <form-label>Password</form-label>

          <form-input 
            v-validate="'required|min:6'"
            v-model="password"
            name="password"
            ref="password"
            type="password"
            placeholder="Password"
          />

          <form-hint error>
            {{ errors.first('password') }}
          </form-hint>
        </form-group>

        <form-group :error="errors.has('repeat_password')">
          <form-input
            v-validate="'required|confirmed:password'"
            v-model="repeatPassword"
            name="repeat_password"
            type="password"
            placeholder="Repeat"
          />

          <form-hint error>
            {{ errors.first('repeat_password') }}
          </form-hint>
        </form-group>
      </column>
    </columns>

    <prism language="html" :code="html"/>
    <prism language="javascript" :code="js"/>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import v from 'vee-validate';

Vue.use(v);

export default Vue.extend({
  data: () => ({
    password: '',
    repeatPassword: '',
    html: `<form-group :error="errors.has('password')">
  <form-label>Password</form-label>

  <form-input
    v-validate="'required|min:6'"
    v-model="password"
    name="password"
    ref="password"
    type="password"
    placeholder="Password"
  />

  <form-hint error>
    {{ errors.first('password') }}
  </form-hint>
</form-group>

<form-group :error="errors.has('repeat_password')">
  <form-input
    v-validate="'required|confirmed:password'"
    v-model="repeatPassword"
    name="repeat_password"
    type="password"
    placeholder="Repeat"
  />

  <form-hint error>
    {{ errors.first('repeat_password') }}
  </form-hint>
</form-group>`,
    js: `export default {
  data: () => ({
    password: '',
    repeatPassword: '',
  }),
}`,
  }),
});
</script>
