<template>
  <component-view>
    <h2 class="title">Empty states</h2>
    <p>Empty states/blank slates are commonly used as placeholders for first time use, empty data and error screens.</p>

    <columns>
      <column col=7 xs=12 mx>
        <empty
          icon="mail"
          title="You have no new messages"
          sub="Click the button to start a conversation"
        >
          <btn slot="action">Send a message</btn>
        </empty>
      </column>
      <column col=7 xs=12 mx>
        <empty
          icon="people"
          title="You are not following anyone"
        >
          <span>Start to meet new friends</span>
          <btn slot="action">Search</btn>
        </empty>
      </column>
    </columns>

    <prism language="html" :code="code" />
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';
import { slots } from './slots';

export default Vue.extend({
  data: () => ({
    props,
    slots,
    code: `<empty
  icon="mail"
  title="You have no new messages"
  sub="Click the button to start a conversation"
>
  <btn slot="action">Send a message</btn>
</empty>

<empty icon="people" title="You are not following anyone">
  <span>Start to meet new friends</span>
  <btn slot="action">Search</btn>
</empty>
`,
  }),
});
</script>
