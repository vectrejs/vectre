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
      <form-label>Gender</form-label>
      <form-radio-group :options="['Male', 'Female']" name="gender-1" v-model="selectedRadio" />
    </form-group>

    <form-group>
      <form-label>Gender</form-label>
      <form-radio-group name="gender-2" v-model="selectedRadio">
        <form-radio>Male</form-radio>
        <form-radio>Female</form-radio>
      </form-radio-group>
    </form-group>
    
    <form-group>
      <form-label for="gender">Gender</form-label>
      <form-radio v-for="(gender, i) in ['Male', 'Female']" :key="i" name="gender" :value="gender" v-model="selectedRadio">
        {{gender}}
      </form-radio>
    </form-group>

    Selected radio: {{ selectedRadio }}


    <h3>Checkboxes</h3>
    <form-group>
      <form-checkbox label="Check" />
      <form-checkbox label="Tres" v-model="checked" />
      <form-checkbox label="Check"/>
    </form-group>
    

    <form-group>
      <form-checkbox value="1" v-model="checkedArray" />
      <form-checkbox value="2" v-model="checkedArray" />
      <form-checkbox value="3" v-model="checkedArray" />
    </form-group>

    Checked array: {{ checkedArray }}


    <form-group>
      <form-checkbox-group :options="['1', '2', '3']" v-model="checkedArray" />
    </form-group>

    <form-group>
      <form-checkbox-group :options="{un: '1', dos: '2', tres: '3'}" v-model="checkedArray" />
    </form-group>

    <form-group disabled>
      <form-checkbox-group v-model="checkedArray" type="">
        <form-checkbox label="Un" value="1" />
        <form-checkbox label="Dos" value="2" />
        <form-checkbox label="Tres" value="3" />
      </form-checkbox-group>
    </form-group>

    Checked: {{ checked }}


    <h3>Switch</h3>
    <form-group>
      <form-checkbox type="switch" v-model="light">Light</form-checkbox>
      <form-checkbox type="switch" v-model="light">Light</form-checkbox>
      <form-checkbox type="switch" v-model="light">Light</form-checkbox>
    </form-group>
    Ligth: {{ light ? 'ON' : 'OFF' }}

    <h3>Validation</h3>
    
    <form-group :error="!!errorPassword || !!errorPassword2">
      <form-label>Password</form-label>
      <form-input type="password" placeholder="Password" v-model="password" />
      <form-hint v-if="errorPassword">{{ errorPassword }}</form-hint>
    </form-group>

    <form-group :error="!!errorPassword2">
      <form-input type="password" placeholder="Repeat" v-model="password2" />
      <form-hint v-if="errorPassword2">{{ errorPassword2 }}</form-hint>
    </form-group>
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
    selectedRadio: 'Male',
    checked: '',
    checkedArray: [],
    light: false,
    password: undefined,
    password2: undefined,
  }),
  computed: {
    errorPassword(): string | void {
      if (this.password === undefined) {
        return;
      }

      if ((this.password! as string).length < 4) {
        return 'At least 4 chars';
      }
    },

    errorPassword2(): string | void {
      if (this.password && this.password2 && this.password !== this.password2) {
        return 'Passwords not matched';
      }
    },
  },
  created() {
    // setInterval(() => this.loading = !this.loading, 1000);
  },
});
</script>
