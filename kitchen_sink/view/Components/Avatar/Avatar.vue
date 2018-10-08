<template>
  <component-view>
    <h2 class="title">Avatars</h2>
    <p>Avatars are user profile pictures. </p>
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" size="xl" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" size="lg" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" size="sm" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" size="xs" />
    <prism language="html" :code="baseHtml" />

    <h2 class="title">Initials</h2>
    <p>Users who don't have pictures, can use their initials for avatars. Automatically truncated to 2 characters</p>
    <avatar initials="MY" size="xl" />
    <avatar initials="MY" background="#000" size="lg" />
    <avatar initials="MY" color="yellow" />
    <avatar initials="MY" size="sm" />
    <avatar initials="MY" size="xs" />
    <prism language="html" :code="initialsHtml" />

    <h3 class="subtitle">Icon</h3>
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" icon="https://picturepan2.github.io/spectre/img/avatar-2.png" size="xl" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" icon="https://picturepan2.github.io/spectre/img/avatar-3.png" size="lg" />
    <avatar icon="https://picturepan2.github.io/spectre/img/avatar-1.png" initials="XZ" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" size="sm" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" size="xs" />
    <prism language="html" :code="iconHtml" />

    <h3 class="subtitle">Presence</h3>
    <p>Avatars support presence indicators</p>
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" presence="online" size="xl" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" presence="offline" size="lg" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" presence="busy" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" presence="away" size="sm" />
    <avatar src="https://picturepan2.github.io/spectre/img/avatar-1.png" size="xs" />
    <prism language="html" :code="presenceHtml" />
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';

export default Vue.extend({
  components: { props },
  data: () => ({
    props,
    baseHtml: `<avatar src="img/avatar-1.png" size="xl" />
<avatar src="img/avatar-1.png" size="lg" />
<avatar src="img/avatar-1.png" />
<avatar src="img/avatar-1.png" size="sm" />
<avatar src="img/avatar-1.png" size="xs" />`,
    initialsHtml: `<avatar initials="MY" size="xl" />
<avatar initials="MY" background="#000" size="lg" />
<avatar initials="MY" color="yellow" />
<avatar initials="MY" size="sm" />
<avatar initials="MY" size="xs" />`,
    presenceHtml: `<avatar src="img/avatar-1.png" presence="online" size="xl" />
<avatar src="img/avatar-1.png" presence="offline" size="lg" />
<avatar src="img/avatar-1.png" presence="busy" />
<avatar src="img/avatar-1.png" presence="away" size="sm" />
<avatar src="img/avatar-1.png" size="xs" />`,
    iconHtml: `<avatar src="img/avatar-1.png" icon="img/avatar-2.png" size="xl" />
<avatar src="img/avatar-1.png" icon="img/avatar-3.png" size="lg" />
<avatar initials="XZ" icon="img/avatar-1.png" />
<avatar src="img/avatar-1.png" size="sm" />
<avatar src="img/avatar-1.png" size="xs" />`,
  }),
});
</script>
