<template>
  <div>
    
    <h3 class="subtitle">
      Vuelidate 
      <a href="https://monterail.github.io/vuelidate/" title="Go to documentation" target="_blank">
        <sup><icon type="link"/></sup>
      </a>
    </h3>
    <p>
      Another approach to data validation in Vue.js.
    </p>
    <p>
      The most significant difference is the validations are completely decoupled 
      from the template. It means that instead of providing rules for 
      different inputs inside a template, you declare those rules for your 
      data model.
    </p>

    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-group :error="$v.password.$error">
          <form-label>Password</form-label>

          <form-input 
            type="password" 
            placeholder="Password" 
            v-model.trim="$v.password.$model" 
          />

          <form-hint v-if="!$v.password.required" error>
            Required!
          </form-hint>
        
          <form-hint v-if="!$v.password.minLength" error>
            Password must have at least {{$v.password.$params.minLength.min}} letters
          </form-hint>
        </form-group>

        <form-group :error="$v.repeatPassword.$error">
          <form-input 
            type="password" 
            placeholder="Repeat" 
            v-model.trim="$v.repeatPassword.$model" 
          />
        
          <form-hint v-if="!$v.repeatPassword.sameAsPassword" error>
            Passwords must be identical
          </form-hint>
        </form-group>
      </column>
    </columns>

    <prism language="html" :code="html" />

    <prism language="javascript" :code="js" />
  </div>
</template>

<script lang="js">
import { validationMixin } from 'vuelidate';
import { required, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  data: () => ({
    password: '',
    repeatPassword: '',
    html: `<form-group :error="$v.password.$error">
  <form-label>Password</form-label>

  <form-input
    type="password"
    placeholder="Password"
    v-model.trim="$v.password.$model"
  />

  <form-hint v-if="!$v.password.required" error>
    Required!
  </form-hint>

  <form-hint v-if="!$v.password.minLength" error>
    Password must have at least {{$v.password.$params.minLength.min}} letters
  </form-hint>
</form-group>

<form-group :error="$v.repeatPassword.$error">
  <form-input
    type="password"
    placeholder="Repeat"
    v-model.trim="$v.repeatPassword.$model"
  />

  <form-hint v-if="!$v.repeatPassword.sameAsPassword" error>
    Passwords must be identical
  </form-hint>
</form-group>`,
    js: `import { required, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  data: () => ({
    password: '',
    repeatPassword: '',
  }),
  validations: {
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
}`,
  }),
};
</script>
