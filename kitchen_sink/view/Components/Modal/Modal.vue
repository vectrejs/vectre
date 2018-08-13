<template>
  <container>
    <h3>Modals</h3>
    <p></p>
    
    <btn @click="modal = true">Open modal</btn>
    <btn @click="small = true">Open small</btn>
    <btn @click="large = true">Open large</btn>
    
    <modal :active="modal" @close="modal = false">
      <h5 slot="header">Modal title</h5>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus. Etiam euismod ornare consequat.</p>
      <btn type="primary" @click="modal = false" slot="footer">Ok</btn>
    </modal>
    
    <modal :active="small" size="sm" @close="small = false" >
      <h5 slot="header">Modal title</h5>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus. Etiam euismod ornare consequat.</p>
      <btn type="error" @click="small = false" slot="footer">Close</btn>
    </modal>
    
    <modal :active="large" size="lg" @close="large = false">
      <h5 slot="header">Modal title</h5>
      <p slot="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in vehicula sit amet, feugiat tempus tellus. Duis quis sodales risus. Etiam euismod ornare consequat.</p>
      <btn type="error" @click="large = false" slot="footer">Close</btn>
    </modal>
  </container>
</template>

<script lang="js">
export default {
  data: () => ({
    modal: false,
    small: false,
    large: false,
  }),
};
</script>
