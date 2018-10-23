<template>
  <component-view>
    <h2 class="title">Group</h2>
    <p>
      The <code>form-group</code> component is the easiest way to add some structure to forms. 
      It provides the grouping of labels, controls, optional hints, and form validation messaging.
    </p>

    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-group>
          <form-label>Name</form-label>
          <form-input />
          <form-hint>This can be a full name</form-hint>
        </form-group>
      </column>
    </columns>
    <prism language="html" :code="basicHtml" />


    <h3 class="subtitle">Disabled</h3>
    <p>All controls of a group can be disabled at the group level.</p>
    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-group disabled>
          <form-label>Name</form-label>
          <form-input placeholder="Name" />
        </form-group>

        <form-group disabled>
          <form-label>Gender</form-label>
          <form-radio-group :options="['Male', 'Female']" />
        </form-group>

        <form-group disabled>
          <form-select :options="[]" placeholder="Choose an option" />
          <form-checkbox type="switch" label="Send me emails with news and tips" />
        </form-group>

        <form-group disabled>
          <form-label>Message</form-label>
          <form-textarea placeholder="Message" />
          <form-checkbox label="Remember me" />
        </form-group>
      </column>
    </columns>
    <prism language="html" :code="disabledHtml" />

    <h3 class="subtitle">Size</h3>
    <p>The size can be applied to all form component except hints.</p>

    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-group size="sm">
          <form-label>Email</form-label>
          <form-input />
          <form-checkbox type="switch" label="Newsletter"/>
        </form-group>

        <form-group>
          <form-label>Email</form-label>
          <form-input />
          <form-checkbox type="switch" label="Newsletter"/>
        </form-group>

        <form-group size="lg">
          <form-label>Email</form-label>
          <form-input />
          <form-checkbox type="switch" label="Newsletter"/>
        </form-group>
      </column>
    </columns>

    <prism language="html" :code="sizeHtml" />

    <h3 class="subtitle">Validation state</h3>
    <p>
      The groups have <code>success</code> and <code>error</code> 
      properties to indicate the state of validatiion. Error hint appears
      appropriately dependent on the type.
    </p>

    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-group error>
          <form-label>Email</form-label>
          <form-input />
          <form-hint success>Email is correct</form-hint>
          <form-hint error>Email is required</form-hint>
        </form-group>

        <form-group success>
          <form-label>Email</form-label>
          <form-input />
          <form-hint success>Email is correct</form-hint>
          <form-hint error>Email is required</form-hint>
        </form-group>
      </column>
    </columns>

    <prism language="html" :code="validationHtml" />

  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';

export default Vue.extend({
  data: () => ({
    props,

    basicHtml: `<form-group>
  <form-label>Name</form-label>
  <form-input />
  <form-hint>This can be a full name</form-hint>
</form-group>`,

    disabledHtml: `<form-group disabled>
  <form-label>Name</form-label>
  <form-input placeholder="Name" />
</form-group>

<form-group disabled>
  <form-label>Gender</form-label>
  <form-radio-group :options="['Male', 'Female']" />
</form-group>

<form-group disabled>
  <form-select :options="[]" placeholder="Choose an option" />
  <form-checkbox type="switch" label="Send me emails with news and tips" />
</form-group>

<form-group disabled>
  <form-label>Message</form-label>
  <form-textarea placeholder="Message" />
  <form-checkbox label="Remember me" />
</form-group>`,
    sizeHtml: `<form-group size="sm">
  <form-label>Email</form-label>
  <form-input />
  <form-checkbox type="switch" label="Newsletter"/>
</form-group>

<form-group>
  <form-label>Email</form-label>
  <form-input />
  <form-checkbox type="switch" label="Newsletter"/>
</form-group>

<form-group size="lg">
  <form-label>Email</form-label>
  <form-input />
  <form-checkbox type="switch" label="Newsletter"/>
</form-group>`,
    validationHtml: `<form-group error>
  <form-label>Email</form-label>
  <form-input />
  <form-hint success>Email is correct</form-hint>
  <form-hint error>Email is required</form-hint>
</form-group>

<!-- Same group but with success state -->

<form-group success>
  <form-label>Email</form-label>
  <form-input />
  <form-hint success>Email is correct</form-hint>
  <form-hint error>Email is required</form-hint>
</form-group>`,
  }),
});
</script>

