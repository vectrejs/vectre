<template>
  <component-view>
    <h2 class="title">Buttons <code>&lt;btn&gt;</code></h2>
    <p>Buttons include simple button styles for actions in different types and sizes.</p>

    <h5 class="subtitle">Button types</h5>
    <p>There is a set of different types of buttons that helps to separate the functionality.</p>
    <columns>
      <column xs=12>
      <btn>default</btn>
      <btn type="primary">primary</btn>
      <btn type="link">link</btn>
      </column>
      <column xs=12>
      <btn type="success">success</btn>
      <btn type="error">error</btn>
      </column>
    </columns>
    <prism language="html" :code="typesHtml" />

    <h5 class="subtitle">Action button</h5>
    <p>
      You could use the <kbd>action</kbd> prop for a square button, and also 
      set <kbd>circle</kbd> prop for a round button, which is often used as 
      a Float Action Button (FAB).
    </p>

    <columns>
      <column col=6>
        <btn action icon="menu" type="primary" />
        <btn action icon="menu" /> 
        <btn action icon="menu" type="link" />
      </column>
      <column col=6 >
        <btn action circle icon="up" type="primary" />
        <btn action circle icon="up" />
        <btn action circle icon="up" type="link" />
      </column>
    </columns>
    <prism language="html" :code="fabHtml" />

    
    <h5 class="subtitle">Button icons</h5>
    <p>You can set an icon and define the side where it will be displayed.</p>
    <btn icon="menu">Menu</btn>
    <btn icon="menu" left>Menu</btn>
    <prism language="html" :code="iconsHtml" />

    <h5 class="subtitle">Button sizes</h5>
    <p>Set <kbd>size</kbd> prop to change the size of a button</p>
    
    <columns>
      <column col=6 sm=12>
        <btn size="lg">Large</btn>
        <btn>Normal</btn>
        <btn size="sm">Small</btn>
      </column>
      <column col=6 sm=12>
        <btn action icon="menu" size="lg">Large</btn>
        <btn action icon="menu">Normal</btn>
        <btn action icon="menu" size="sm">Small</btn>
      </column>
    </columns>
    <btn size="block">Block</btn>

    <prism language="html" :code="sizeHtml" />

    <h5 class="subtitle">Button states</h5>
    <p>It is possible to set various states depending on conditions</p>
    <btn>Default</btn>
    <btn state="active">Active</btn>
    <btn state="disabled">Disabled</btn>
    <btn state="loading">Loading</btn>
    <prism language="html" :code="statesHtml" />


    <h5 class="subtitle">Button groups</h5>
    <p>
      If you want to use buttons as a group, wrap buttons with <code>&lt;btn-group&gt;</code> 
      component. The component can be full-width with <kbd>block</kbd> prop
    </p>

    <btn-group>
      <btn>first button</btn>
      <btn>second button</btn>
      <btn>third button</btn>
    </btn-group> 
    
    <br />
    <br />

    <btn-group block>
      <btn type="primary">first button</btn>
      <btn type="primary">second button</btn>
      <btn type="primary">third button</btn>
    </btn-group>
    <prism language="html" :code="groupHtml" />
    
  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';

export default Vue.extend({
  data: () => ({
    props,

    typesHtml: `<btn>default</btn>
<btn type="primary">primary</btn>
<btn type="link">link</btn>

<btn type="success">success</btn>
<btn type="error">error</btn>`,

    fabHtml: `<btn action icon="menu" type="primary" />
<btn action icon="menu" />
<btn action icon="menu" type="link" />
<btn action circle icon="up" type="primary" />
<btn action circle icon="up" />
<btn action circle icon="up" type="link" />`,

    iconsHtml: `<btn icon="menu">Menu</btn>
<btn icon="menu" left>Menu</btn>`,

    sizeHtml: `<btn size="lg">Large</btn>
<btn>Normal</btn>
<btn size="sm">Small</btn>

<btn action icon="menu" size="lg">Large</btn>
<btn action icon="menu">Normal</btn>
<btn action icon="menu" size="sm">Small</btn>

<!-- full-width button -->
<btn size="block">Block</btn>`,

    statesHtml: `<btn>Default</btn>
<btn state="active">Active</btn>
<btn state="disabled">Disabled</btn>
<btn state="loading">Loading</btn>`,

    groupHtml: `<btn-group>
  <btn>first button</btn>
  <btn>second button</btn>
  <btn>third button</btn>
</btn-group>

<!-- full-width group -->

<btn-group block>
  <btn type="primary">first button</btn>
  <btn type="primary">second button</btn>
  <btn type="primary">third button</btn>
</btn-group>
    `,
  }),
});
</script>

