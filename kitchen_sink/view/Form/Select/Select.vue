<template>
  <component-view>
    <h2 class="title">Select</h2>
    <p>Compoent represents a control that provides a menu of options</p>
    <columns>
      <column col=5 xl=5 lg=6 xs=8>
        <form-select v-model="basic" placeholder="Choose your option" :options="['Slack', 'Skype', 'Hipchat']" />
      </column>
    </columns>
    Selected: {{ basic }}
    <prism language="html" :code="basicHtml" />
    <prism language="javascript" :code="basicJs" />


    <h5 class="subtitle">Multiple</h5>
    <p>
      The component has <code>multiple</code> property to specify 
      whether multiple options can be selected and <code>size</code> 
      to specify how many options should be shown at one.
    </p>

    <columns>
      <column col=5 xl=5 lg=6 xs=8>
        <form-select 
          :options="['Slack', 'Skype', 'Hipchat', 'Snapchat', 'Telegram']" 
          v-model="multiple" 
          multiple 
          size=3 
        />
      </column>
    </columns>
    Selected: {{ multiple }}

    <prism language="html" :code="multipleHtml" />
    <prism language="javascript" :code="multipleJs" />


    <h5 class="subtitle">Options as Object</h5>
    <p>Use an object when you need to separate values from labels</p>
    <columns>
      <column col=5 xl=5 lg=6 xs=8>
        <form-select 
          :options="{ one: 1, two: 2, three: 3, four: 4, five: 5 }" 
          v-model="obj"
          scale="lg"
        />
      </column>
    </columns> 
    Selected: {{ obj }}
    <prism language="html" :code="objHtml" />
    <prism language="javascript" :code="objJs" />


    <h5 class="subtitle">Nested options</h5>
    <p>
      It's a good way to customize or attach an event listener for any 
      option of the select.
    </p>

    <columns>
      <column col=5 xl=5 lg=6 xs=8>
        <form-select multiple v-model="nested">
          <form-option disabled value="1">One</form-option>
          <form-option value="2" label="Two" />
          <form-option @click.native="alert('You click Three')">Three</form-option>
          <form-option :value=4>Four</form-option>
        </form-select>
      </column>
    </columns>
    Selected value: {{ nested }}
    
    <prism language="html" :code="nestedHtml" />
    <prism language="javascript" :code="nestedJs" />


    <h3 class="subtitle">Validation state</h3>
    <p>The component has <code>success</code> and <code>error</code> properties to indicate the state of validatiion</p>
    
    <columns>
      <column col=5 xl=5 lg=6 xs=8>
        <form-select :options="['Slack', 'Skype', 'Hipchat']" success />
      </column>
    </columns>
    <columns>
      <column col=5 xl=5 lg=6 xs=8>
        <form-select :options="['Slack', 'Skype', 'Hipchat']" error />
      </column>
    </columns>
    <prism language="html" :code="validationHtml" />


  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { events } from './events';
import { props } from './props';
import { slots } from './slots';

export default Vue.extend({
  methods: {
    // tslint:disable-next-line:no-console
    alert: (msg: any) => alert(msg),
  },
  data: () => ({
    events,
    props,
    slots,
    basic: undefined,
    obj: 1,
    multiple: [],
    nested: [],
    // selectedRadio: 'Male',
    basicHtml: `<form-select
  placeholder="Choose your option"
  :options="['Slack', 'Skype', 'Hipchat']"
  v-model="selected"
/>`,
    basicJs: `export default {
  data: () => ({
    selected: undefined,
  }),
}`,
    multipleHtml: `<form-select
  :options="['Slack', 'Skype', 'Hipchat', 'Snapchat', 'Telegram']"
  v-model="basic"
  multiple
  size=3
/>`,
    multipleJs: `export default {
  data: () => ({
    selected: [],
  }),
}`,
    objHtml: `<form-select
  :options="{ one: 1, two: 2, three: 3, four: 4, five: 5 }"
  v-model="obj"
  scale="lg"
/>`,
    objJs: `export default {
  data: () => ({
    selected: 1,
  }),
}`,
    nestedHtml: `<form-select multiple v-model="selected">
  <form-option disabled value="1">One</form-option>
  <form-option value="2" label="Two" />
  <form-option @click.native="alert('You click Three')">Three</form-option>
  <form-option :value=4>Four</form-option>
</form-select>`,
    nestedJs: `export default {
  methods: {
    alert: (msg) => alert(msg),
  },
  data: () => ({
    selected: [],
  }),
}`,
    validationHtml: `<form-select :options="['Slack', 'Skype', 'Hipchat']" success />
<form-select :options="['Slack', 'Skype', 'Hipchat']" error />`,
  }),
});
</script>
