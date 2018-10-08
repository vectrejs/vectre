<template>
  <component-view>
    <h3 class="subtitle">Modals</h3>
    <p>Modals are flexible dialog prompts.</p>
    
    <btn @click="modal = true">Default</btn>
    <btn @click="small = true" type="error">Small</btn>
    <btn @click="large = true" type="primary">Large</btn>
    
    <modal :show="modal" @close="modal = false" >
      <h5 slot="header">Default modal</h5>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus. Etiam euismod ornare consequat.</p>
      <btn slot="footer" type="primary" @click="modal = false" >Ok</btn>
    </modal>
    
    <modal :show="small" size="sm" @close="small = false" :closeOverlay="false">
      <h5 slot="header">Small without overlay close</h5>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus. Etiam euismod ornare consequat.</p>
    </modal>
    
    <modal :show="large" size="lg" @close="large = false" :closeBtn="false">
      <h2 class="title" slot="header">Big without close button</h2>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus. Etiam euismod ornare consequat.</p>
    </modal>

    <prism language="html" :code="html" />
    <prism language="javascript" :code="js" />
  </component-view>
</template>

<script lang="ts">
import { props } from './props';
import { slots } from './slots';

export default {
  data: () => ({
    props,
    slots,
    modal: false,
    small: false,
    large: false,
    // tslint:disable:max-line-length
    html: `<btn @click="modal = true">Default</btn>
<btn @click="small = true">Small</btn>
<btn @click="large = true">Large</btn>

<modal :show="modal" @close="modal = false">
  <h5 slot="header">Default modal</h5>
  <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
  <btn type="primary" @click="modal = false" slot="footer">Ok</btn>
</modal>

<modal :show="small" size="sm" @close="modal = false" :closeOverlay="false">
  <!-- Modal without overlay closet  -->
</modal>

<modal :show="large" size="lg" @close="large = false" :closeBtn="false">
  <!-- Big without close button  -->
</modal>
`,
    // tslint:enable:max-line-length
    js: `export default {
  data: () => ({
    modal: false,
    small: false,
    large: false,
  }),
}`,
  }),
};
</script>
