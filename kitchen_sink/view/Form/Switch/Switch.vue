<template>
  <component-view>
    <h2 class="title">Switch</h2>
    <p>
      Essentially, you use the same <code>&lt;form-checkbox&gt;</code> 
      component but with <kbd>switch</kbd> type. The rest of the behavior and 
      properties are the same. You can find information about props and slots 
      at the following <router-link to="/form/checkbox">link</router-link>.
    </p>
    
    <form-checkbox type="switch" v-model="light">
      Light
    </form-checkbox>
    Ligth: {{ light ? 'ON' : 'OFF' }}

    <prism language="html" :code="basicHtml" />
    <prism language="javascript" :code="basicJs" />


    <h3 class="subtitle">Group</h3>
    <p>
      Switch components can be grouped like the checkboxes with <code>&lt;form-checkbox-group&gt;</code> 
      and <kbd>options</kbd> property.
    </p>

    <form-checkbox-group
      type="switch" 
      :options="['Temperature', 'Humidity', 'Ventilation', 'Lighting']"
      v-model="conditions"
    />
    Environment conditions: {{ conditions }}
    <prism language="html" :code="groupHtml" />
    <prism language="javascript" :code="groupJs" />

    <p>The same with nested elements:</p> 
    <prism language="html" :code="nestedHtml" />

  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    light: false,
    conditions: [],

    basicHtml: `<form-checkbox type="switch" v-model="light">
  Light
</form-checkbox>
Ligth: {{ light ? 'ON' : 'OFF' }}`,
    basicJs: `export default {
  data: () => ({
    light: false,
  }),
}`,
    groupHtml: `<form-checkbox-group
  type="switch"
  :options="['Temperature', 'Humidity', 'Ventilation', 'Lighting']"
  v-model="conditions"
/>
Environment conditions: {{ conditions }}`,
    groupJs: `export default {
  data: () => ({
    conditions: [], // Should be an array
  }),
}`,
    nestedHtml: `<form-checkbox-group type="switch" v-model="conditions">
  <form-checkbox value="Temperature"/>
  <form-checkbox value="Humidity"/>
  <form-checkbox value="Ventilation"/>
  <form-checkbox value="Lighting"/>
</form-checkbox-group>`,
  }),
});
</script>
