<template>
  <component-view>
    <h2 class="title">Divider</h2>
    <p>A Divider is used for separating elements.</p>
    
    <divider />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent risus leo, dictum in vehicula sit amet, feugiat 
      tempus tellus.
    </p>
    <divider>OR</divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Praesent risus leo, dictum in vehicula sit amet, feugiat 
      tempus tellus.
    </p>

    <columns>
      <column>
        <form-group>
          <form-label>Email</form-label>
          <form-input placeholder="Email"/>
        </form-group>
        <form-group>
          <form-label>Password</form-label>
          <form-input type="password" placeholder="Email"/>
        </form-group>
        <form-checkbox label="Remember me" />
        <btn type="primary">Sign in</btn>
      </column>

      <divider vert>OR</divider>
      
      <column>
        <form-group>
          <form-label>Email</form-label>
          <form-input placeholder="Email"/>
        </form-group>
        <btn type="primary" size="block">Sign up</btn>
      </column>
    </columns>
    
    <prism language="html" :code="html" />
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

    html: `<!-- divider element -->
<divider />
<!-- divider element with text -->
<divider data-content="OR" />
<!-- divider element with text via default slot -->
<divider>OR</divider>

<!-- vertical divider element with text -->
<columns>
  <column>
    <!-- column content -->
  </column>

  <divider vert>OR</divider>

  <column>
    <!-- column content -->
  </column>
</columns>`,
  }),
});
</script>
