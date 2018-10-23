<template>
  <component-view>
    <h2 class="title">Radio</h2>
    <p>
      Radio button allows the user to choose only one of a predefined 
      set of mutually exclusive options. Radios of one group should 
      have the same <code>name</code> or <code>v-model</code>
    </p>

    <form-radio v-model="gender">Male</form-radio>
    <form-radio v-model="gender">Female</form-radio>
    Selected radio: {{ gender }}

    <prism language="html" :code="genderHtml" />
    <prism language="javascript" :code="genderJs" />


    <h5 class="subtitle">Checked</h5>
    <form-radio label="Option A" checked />
    <prism language="html" code='<form-radio label="Option A" checked />' />


    <h5 class="subtitle">Disabled</h5>
    <form-radio label="Option A" disabled />
    <form-radio label="Option B" disabled checked />
    <prism language="html" code='<form-radio label="Option A" disabled />
<form-radio label="Option B" disabled checked />' />


    <h5 class="subtitle">Size</h5>
    <form-radio label="Text" size="sm" name="size" />
    <form-radio label="Text" name="size" />
    <form-radio label="Text" size="lg" name="size" />
    <prism language="html" :code="sizeHtml" />


    <h5 class="subtitle">Inline</h5>
    <form-radio label="A" inline name="inline" />
    <form-radio label="B" inline name="inline" />
    <prism language="html" code='<form-radio label="A" inline name="example" />
<form-radio label="B" inline name="example" />' />


    <h5 class="subtitle">Invalid</h5>
    <form-radio label="Invalid" error />
    <prism language="html" code='<form-radio label="Invalid" error />' />


    <h2 class="subtitle">Radio Group</h2>
    <h4 class="subtitle">Manual mode</h4>
    <p>You can create a group with the <code>for...in</code> loop</p>

    <form-radio 
      v-for="(gender, i) in options" 
      :key="i" 
      name="gender" 
      :value="gender" 
      v-model="manualGroup"
    >
      {{gender}}
    </form-radio>
    Selected radio: {{ manualGroup }}
    <prism language="html" :code="manualGroupHtml" />
    <prism language="javascript" :code="manualGroupJs" />


    <h3 class="subtitle"><code>&lt;form-radio-group&gt;</code> component</h3>
    <p>
      An easy way to create a group of checkboxes without need to use 
      <code>for...in</code> or manual defining of <code>v-model</code> for 
      each option.
    </p>


    <h5 class="subtitle">Options as Array</h5>
    <p>It's a good option when values match with labels</p>

    <form-radio-group :options="['Male', 'Female']" v-model="arr" />
    Selected radio: {{ arr }}
    <prism language="html" :code="arrHtml" />
    <prism language="js" :code="arrJs" />


    <h5 class="subtitle">Options as Object</h5>
    <p>Use an object when you need to separate values from labels</p>

    <form-radio-group :options="{Male: 'm', Female: 'f'}" v-model="obj" />
    Selected radio: {{ obj }}
    <prism language="html" :code="objHtml" />
    <prism language="js" :code="objJs" />


    <h5 class="subtitle">Nested Options</h5>
    <p>
      It's a good way to customize each option of the group. 
      Nested options have higher priority and can take theirs own
      <code>size</code>,<code>error</code> and <code>disabled</code> props.
      <code>checked</code> prop is ignored when a radio is in a group
    </p>
    
    <form-radio-group v-model="nested">
      <form-radio value="M">Male</form-radio>
      <form-radio label="Female" error></form-radio>
    </form-radio-group>
    Selected radio: {{ nested }}
    <prism language="html" :code="nestedHtml" />

    <h5 class="subtitle">Disabled Group</h5>
    <form-radio-group :options="['Option A', 'Option B', 'Option C']" disabled />
    <prism language="html" :code="disabledGroupHtml" />

    <h5 class="subtitle">Group Size</h5>
    <form-radio-group :options="['Option A', 'Option B', 'Option C']" size="sm" />
    <prism language="html" :code="groupSizeHtml" />

    <h5 class="subtitle">Inline Group</h5>
    <form-radio-group :options="['Option A', 'Option B', 'Option C']" inline />
    <prism language="html" :code="inlineGroupHtml" />

    <h5 class="subtitle">Invalid Group</h5>
    <form-radio-group :options="['Option A', 'Option B', 'Option C']" error />
    <prism language="html" :code="invalidGroupHtml" />

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
    selectedRadio: 'Male',
    gender: undefined,
    options: ['Male', 'Female'],
    manualGroup: 'Male',
    arr: undefined,
    obj: undefined,
    nested: undefined,

    genderHtml: `<form-radio v-model="gender">Male</form-radio>
<form-radio v-model="gender">Female</form-radio>`,
    genderJs: `export default {
  data: () => ({
    gender: undefined,
  }),
}`,
    sizeHtml: `<form-radio label="Text" name="example" size="sm" />
<form-radio label="Text" name="example" />
<form-radio label="Text" name="example" size="lg" />`,
    manualGroupHtml: `<form-radio
  v-for="(gender, i) in options"
  :key="i"
  name="gender"
  :value="gender"
  v-model="selectedGender"
>
  {{ gender }}
</form-radio>
`,
    manualGroupJs: `export default {
  data: () => ({
    options: ['Male', 'Female'],
    selectedGender: 'Male',
  }),
}`,
    arrHtml: `<form-radio-group :options="['Male', 'Female']" v-model="gender" />`,
    arrJs: `export default {
  data: () => ({
    gender: undefined,
  }),
}`,
    objHtml: `<form-radio-group :options="{Male: 'm', Female: 'f'}" v-model="gender" />`,
    objJs: `export default {
  data: () => ({
    gender: undefined,
  }),
}`,
    nestedHtml: `<form-radio-group v-model="nested">
  <form-radio value="M">Male</form-radio>
  <form-radio label="Female" error></form-radio>
</form-radio-group>`,
    disabledGroupHtml: `<form-radio-group
  :options="['Option A', 'Option B', 'Option C']"
  disabled
/>`,
    groupSizeHtml: `<form-radio-group
  :options="['Option A', 'Option B', 'Option C']"
  size="sm"
/>`,
    inlineGroupHtml: `<form-radio-group
  :options="['Option A', 'Option B', 'Option C']"
  inline
/>`,
    invalidGroupHtml: `<form-radio-group
  :options="['Option A', 'Option B', 'Option C']"
  error
/>`,
  }),
});
</script>