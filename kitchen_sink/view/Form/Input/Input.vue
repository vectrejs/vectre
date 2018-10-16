<template>
  <component-view>
    <h2 class="title">Input</h2>
    <p>
      The component includes standard implementation <code>&lt;input&gt;</code>
      element plus custom features to bind value, indicating the validation state, size, etc.
    </p>
    
    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input placeholder="Your Name" v-model="name" />
      </column>
    </columns>
    Your name: {{ name }}
    <prism language="html" :code="basicHtml" />
    <prism language="javascript" :code="basicJs" />


    <h3 class="subtitle">Size</h3>
    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input placeholder="Small" size="sm" />
      </column>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input placeholder="Default" />
      </column>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input placeholder="Large" size="lg" />
      </column>
    </columns>
    <prism language="html" :code="sizeHtml" />


    <h3 class="subtitle">Icon</h3>

    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input 
          icon="people" 
          placeholder="First Name" 
        />
      </column>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input 
          icon="mail" 
          icon-side="left"
          placeholder="Email" 
        />
      </column>
    </columns>
    <prism language="html" :code="iconHtml" />


    <h3 class="subtitle">Loading</h3>
    <p>
      You can indicate that something is being loaded, such as a 
      remote API call to validate the field.
    </p>

    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input loading />
      </column>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input loading icon-side="left" />
      </column>
    </columns>
    <prism language="html" :code="loadingHtml" />


    <h3 class="subtitle">Validation state</h3>
    <p>
      The component has <code>success</code> and <code>error</code> properties 
      to indicate the state of validatiion
    </p>
    
    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input success />
      </column>
    </columns>
    <columns>
      <column col=7 xl=8 lg=9 xs=11>
        <form-input error />
      </column>
    </columns>
    <prism language="html" :code="validationHtml" />

    


    <!-- <form-group>
      <form-textarea v-model="val" placeholder="Textarea" />
      {{ val }}
    </form-group> -->
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';
import { events } from './events';
import { setInterval } from 'timers';

export default Vue.extend({
  data: () => ({
    events,
    props,
    name: '',

    basicHtml: `<form-input placeholder="Your Name" v-model="name" />
Your name: {{ name }}`,
    basicJs: `export default {
  data: () => ({
    name: '',
  }),
}`,

    sizeHtml: `<form-input placeholder="Small" size="sm" />
<form-input placeholder="Default" />
<form-input placeholder="Large" size="lg" />`,

    iconHtml: `<form-input
  icon="people"
  placeholder="First Name"
/>

<form-input
  icon="mail"
  icon-side="left"
  placeholder="Email"
/>`,

    loadingHtml: `<form-input loading />
<form-input loading icon-side="left" />`,

    validationHtml: `<form-input success />
<form-input error />`,
  }),
});
</script>
