<template>
  <component-view>
    <h2 class="title">Checkbox</h2>
    <p>Checkboxes are used to let a user select one or more options of a limited number of choices.</p>

    <form-checkbox v-model="option1" label="0-6" />
    <form-checkbox v-model="option2">
      <b>6-12</b>
    </form-checkbox>
    <form-checkbox v-model="option3" value="custom value"  />
    0-6: {{ option1 }} 6-12: {{ option2 }} 12-20: {{ option3 }}
    
    <prism language="html" :code="basicHtml" />
    <prism language="javascript" :code="basicJs" />

    <h5 class="subtitle">Checked</h5>
    <form-checkbox label="Option A" checked />
    <prism language="html" code='<form-checkbox label="Option A" checked />' />


    <h5 class="subtitle">Disabled</h5>
    <form-checkbox label="Option A" disabled />
    <prism language="html" code='<form-checkbox label="Option A" disabled />' />

    <h5 class="subtitle">Size</h5>
    <form-checkbox label="Text" size="sm" />
    <form-checkbox label="Text" />
    <form-checkbox label="Text" size="lg" />
    <prism language="html" :code="sizeHtml" />

    <h5 class="subtitle">Inline</h5>
    <form-checkbox label="A" inline />
    <form-checkbox label="B" inline />
    <prism language="html" code='<form-checkbox label="A" inline />
<form-checkbox label="B" inline />' />

    <h5 class="subtitle">Invalid</h5>
    <form-checkbox label="Invalid" error />
    <prism language="html" code='<form-checkbox label="Invalid" error />' />


    <h5 class="subtitle"><code>v-model</code> as Array</h5>
    <p>You can use the same v-model for the different checkboxes if you want to store all checked options in an array</p>
    <form-checkbox v-model="arr" value="A">A</form-checkbox>
    <form-checkbox v-model="arr" value="B">B</form-checkbox>
    <form-checkbox v-model="arr" value="C">C</form-checkbox>
    Your choice: {{ arr }}
    <prism language="html" :code="vmodelHtml" />
    <prism language="javascript" :code="vmodelJs" />

    <h2 class="subtitle">Checkbox Group</h2>
    <p>
      It's an easy way to create a group of checkboxes without need to use 
      <code>for...in</code> to iterate options or manual defining of <code>v-model</code> 
      for each option.
    </p>

    <h5>Options as Array</h5>
    <form-checkbox-group :options="['Option A', 'Option B', 'Option C']" v-model="groupArray" />
    Your choice: {{ groupArray }}
  
    <prism language="html" :code="groupArrayHtml" />
    <prism language="javascript" :code="groupArrayJs" />


    <h5 class="subtitle">Options as Object</h5>
    <p>Each key of object is used as a label and value as a value of checkbox</p>
    <form-checkbox-group :options="{ A: 1, B: 2, C: 3 }" v-model="groupObject" />
    Your choice: {{ groupObject }}

    <prism language="html" :code="groupObjectHtml" />
    <prism language="javascript" :code="groupObjectJs" />


    <h5 class="subtitle">Nested Options</h5>
    <p>
      It's a good way to customize each option of the group. 
      Nested options have higher priority and can take theirs own
      <code>size</code>,<code>error</code> and <code>disabled</code> props.
      <code>checked</code> prop is ignored when a checkbox is in a group
    </p>
    <form-checkbox-group v-model="nested">
      <form-checkbox :value="1" disabled>
        Un <sub><mark>checked and disabled</mark></sub>
      </form-checkbox>
      <form-checkbox label="Dos" :value="2" />
      <form-checkbox label="Tres" :value="3" size="sm" />
    </form-checkbox-group>
    Your choice: {{ nested }}

    <prism language="html" :code="nestedHtml" />
    <prism language="javascript" :code="nestedJs" />


    <h5 class="subtitle">Disabled Group</h5>
    <form-checkbox-group :options="['Option A', 'Option B', 'Option C']" disabled />
    <prism language="html" :code="disabledGroupHtml" />

    <h5 class="subtitle">Group Size</h5>
    <form-checkbox-group :options="['Option A', 'Option B', 'Option C']" size="lg" />
    <prism language="html" :code="groupSizeHtml" />

    <h5 class="subtitle">Inline Group</h5>
    <form-checkbox-group :options="['Option A', 'Option B', 'Option C']" inline />
    <prism language="html" :code="inlineGroupHtml" />

    <h5 class="subtitle">Invalid Group</h5>
    <form-checkbox-group :options="['Option A', 'Option B', 'Option C']" error />
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

    option1: false,
    option2: false,
    option3: false,

    checkedOption: false,

    arr: [],

    groupArray: ['Option A'],
    groupObject: [1],
    nested: [1],

    basicHtml: `<!-- without value -->
<form-checkbox v-model="option1" label="0-6" />

<!-- with default slot as label -->
<form-checkbox v-model="option2">
  <b>6-12</b>
</form-checkbox>

<!-- with value -->
<form-checkbox v-model="option3" value="custom value" />

0-6: {{ option1 }} 6-12: {{ option2 }} 12-20: {{ option3 }}`,
    basicJs: `export default {
  data: () => ({
    option1: false,
    option2: false,
    option3: false,
  }),
}`,

    sizeHtml: `<form-checkbox label="Text" size="sm" />
<form-checkbox label="Text" />
<form-checkbox label="Text" size="lg" />`,

    vmodelHtml: `<form-checkbox v-model="checked" value="A">A</form-checkbox>
<form-checkbox v-model="checked" value="B">B</form-checkbox>
<form-checkbox v-model="checked" value="C">C</form-checkbox>
Your choice: {{ checked }}
    `,
    vmodelJs: `export default {
  data: () => ({
    checked: [], // v-model should be an array
  }),
}`,

    groupArrayHtml: `<form-checkbox-group
  :options="['Option A', 'Option B', 'Option C']"
  v-model="checked"
/>

Your choice: {{ checked }}`,
    groupArrayJs: `export default {
  data: () => ({
    checked: ['Option A'], // Default checked option
  }),
}`,
    groupObjectHtml: `<form-checkbox-group
  :options="{ A: 1, B: 2, C: 3 }"
  v-model="checked"
/>`,
    groupObjectJs: `export default {
  data: () => ({
    checked: [1], // The key can be used as well
  }),
}`,
    nestedHtml: `<form-checkbox-group v-model="checked">
  <form-checkbox :value="1" disabled>
    Un <sub><mark>checked and disabled</mark></sub>
  </form-checkbox>
  <form-checkbox label="Dos" :value="2" />
  <form-checkbox label="Tres" :value="3" size="lg" />
</form-checkbox-group>`,
    nestedJs: `export default {
  data: () => ({
    checked: [1],
  }),
}`,
    disabledGroupHtml: `<form-checkbox-group
  :options="['Option A', 'Option B', 'Option C']"
  disabled
/>`,
    groupSizeHtml: `<form-checkbox-group
  :options="['Option A', 'Option B', 'Option C']"
  size="lg"
/>`,
    inlineGroupHtml: `<form-checkbox-group
  :options="['Option A', 'Option B', 'Option C']"
  inline
/>`,
    invalidGroupHtml: `<form-checkbox-group
  :options="['Option A', 'Option B', 'Option C']"
  error
/>`,
  }),
});
</script>
