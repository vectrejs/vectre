<template>
  <container>
    <h2>Dropdown menu</h2>
    <dropdown-menu :items="[
        { divider: 'LINKS' },
        { path: '#', text: 'Slack' },
        { divider: true },
        { path: '#hipchat', text: 'Hipchat' },
        { path: '#skype', text: 'Skype' },
      ]"
    />
  </container>
</template>
