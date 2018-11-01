<template>
  <component-view>
    <h2 class="title">Loading</h2>
    <p>
      Loading indicator is used for loading or updating. You can 
      add <kbd>v-loading</kbd> directive to an element for loading 
      status.
    </p>
    <div v-loading />
    <prism language="html" code="<div v-loading></div>" />

    <h5 class="subtitle">Size</h5>
    <p>Add <code>lg</code> modifier for large size.
    <div v-loading.lg></div>
    <prism language="html" code="<div v-loading.lg></div>" />
    
    <h5 class="subtitle">Loading control</h5>
    <p>The directive takes <b>truthy/falsy</b> value to show/hide loading </p>
    
    <form-checkbox type="switch" v-model="loading">
      <span v-loading="loading">Loading</span>
    </form-checkbox>
    <prism language="html" :code="truthyHtml" />
    <prism language="javascript" :code="truthyJs" />
    
    <h5 class="subtitle">Async loading</h5>
    <p>You can pass <b>Promises</b> as value to handle async actions</p>
    <btn @click="remoteRequest">Find out</btn>
    &nbsp; your lucky number is <span class="h2" v-loading="request">{{ result || 'XXX' }}</span>
    <prism language="html" :code="promiseHtml" />
    <prism language="javascript" :code="promiseJs" />

  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { setTimeout } from 'timers';

export default Vue.extend({
  data: () => ({
    loading: null,
    request: null,
    result: '',

    truthyHtml: `<form-checkbox type="switch" v-model="loading">
  <span v-loading="loading">Loading</span>
</form-checkbox>`,
    truthyJs: `export default {
  data: () => ({
    loading: false,
  }),
}`,
    promiseHtml: `<btn @click="remoteRequest">Find out</btn>
your lucky number is
<span v-loading="request">{{ response }}</span>
`,
    promiseJs: `export default {
  data: () => ({
    request: null,
    response: null,
  }),
  methods: {
    remoteRequest() {
      // request emulation
      this.$data.request = new Promise(
        resolve =>
          setTimeout(() => {
            resolve(Math.round(Math.random() * 1000));
          }, 1000),
      );

      this.$data.request
        .then(response => this.$data.result = response);
    },
  },
}`,
  }),
  methods: {
    remoteRequest() {
      this.$data.request = new Promise(
        resolve =>
          setTimeout(() => { resolve(Math.round(Math.random() * 1000)); }, 1000),
      );
      this.$data.request.then((data: any) => this.$data.result = data);
    },
  },
});
</script>
