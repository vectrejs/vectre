<template>
  <component-view>
    
    <h2>Input</h2>
    <form-group>
      <form-label for="name-1">Name</form-label>
      <form-input id="name-1" placeholder="Your Name" />
    </form-group>

    <h3>Size</h3>
    <form-group>
      <form-input placeholder="Small" size="sm" />
    </form-group>
    <form-group>
      <form-input placeholder="Default" />
    </form-group>
    <form-group>
      <form-input placeholder="Large" size="lg" />
    </form-group>

    <h3>Icon</h3>
    <form-group>
      <form-input @change="log" placeholder="First Name" :loading="loading" icon="people" icon-side="right"/>
    </form-group>
    <form-group>
      <form-input @blur="log" v-model="val" placeholder="Email" size="lg" :loading="loading" icon="mail" icon-side="left"/>
      {{ val }}
    </form-group>

    <form-group>
      <form-textarea v-model="val" placeholder="Textarea" />
      {{ val }}
    </form-group>
    
    <h3>Select</h3>
    <form-group>
      <form-select v-model="selected" placeholder="Choose your option" :options="['1', '2', '3']" />
    </form-group>
    <form-group>
      <form-select v-model="selected" :options="{one: 1, two: 2, three: 3}" multiple />
    </form-group>
    <form-group>
      <form-select multiple v-model="selected">
        <form-option value="1" >One</form-option>
        <form-option value="2" label="Two" />
        <form-option>three</form-option>
      </form-select>
    </form-group>
    Selected value: {{ selected }}

    <h3>Radio</h3>
    <form-group>
      <form-label for="gender">Gender</form-label>
      <form-radio v-for="(gender, i) in ['Male', 'Female']" :key="i" name="gender" :value="gender" v-model="selectedRadio">
        {{gender}}
      </form-radio>
    </form-group>
    Selected radio: {{ selectedRadio }}

  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { setInterval } from 'timers';

export default Vue.extend({
  methods: {
    // tslint:disable-next-line:no-console
    log(...args: any[]) { console.log(...args); },
  },
  data: () => ({
    loading: false,
    val: '',
    selected: ['1', 'three'],
    selectedRadio: [],
  }),
  created() {
    // setInterval(() => this.loading = !this.loading, 1000);
  },
});
</script>
