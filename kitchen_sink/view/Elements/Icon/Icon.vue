<template>
  <component-view>
    <h2 class="title">Icons</h2>
    <p>Icons are single-element, responsive and pure CSS icons</p>
    <prism language="html" code='<icon type="up">' />

    <h5 class="subtitle">Navigation icons</h5>

    <columns class="gal text-center">
      <column col=3 md=6>
        <icon type="up" />
        <p>up</p>
      </column>
      <column col=3 md=6>
        <icon type="right" />
        <p>right</p>
      </column>
      <column col=3 md=6>
        <icon type="down" />
        <p>down</p>
      </column>
      <column col=3 md=6>
        <icon type="left" />
        <p>left</p>
      </column>
      <column col=3 md=6>
        <icon type="upward" />
        <p>upward</p>
      </column>
      <column col=3 md=6>
        <icon type="forward" />
        <p>forward</p>
      </column>
      <column col=3 md=6>
        <icon type="downward" />
        <p>downward</p>
      </column>
      <column col=3 md=6>
        <icon type="back" />
        <p>back</p>
      </column>
      <column col=3 md=6>
        <icon type="back" />
        <p>back</p>
      </column>
      <column col=3 md=6>
        <icon type="caret" />
        <p>caret</p>
      </column>
      <column col=3 md=6>
        <icon type="menu" />
        <p>menu</p>
      </column>
      <column col=3 md=6>
        <icon type="apps" />
        <p>apps</p>
      </column>
      <column col=3 md=6>
        <icon type="hMore" />
        <p>hMore</p>
      </column>
      <column col=3 md=6>
        <icon type="vMore" />
        <p>vMore</p>
      </column>
    </columns>

    <h5 class="subtitle">Action icons</h5>
    <columns class="gal text-center">
      <column col=3 md=6>
        <icon type="hResize" />
        <p>hResize</p>
      </column>
      <column col=3 md=6>
        <icon type="vResize" />
        <p>vResize</p>
      </column>
      <column col=3 md=6>
        <icon type="plus" />
        <p>plus</p>
      </column>
      <column col=3 md=6>
        <icon type="minus" />
        <p>minus</p>
      </column>
      <column col=3 md=6>
        <icon type="cross" />
        <p>cross</p>
      </column>
      <column col=3 md=6>
        <icon type="check" />
        <p>check</p>
      </column>
      <column col=3 md=6>
        <icon type="stop" />
        <p>stop</p>
      </column>
      <column col=3 md=6>
        <icon type="shutdown" />
        <p>shutdown</p>
      </column>
      <column col=3 md=6>
        <icon type="refresh" />
        <p>refresh</p>
      </column>
      <column col=3 md=6>
        <icon type="search" />
        <p>search</p>
      </column>
      <column col=3 md=6>
        <icon type="flag" />
        <p>flag</p>
      </column>
      <column col=3 md=6>
        <icon type="bookmark" />
        <p>bookmark</p>
      </column>
      <column col=3 md=6>
        <icon type="edit" />
        <p>edit</p>
      </column>
      <column col=3 md=6>
        <icon type="delete" />
        <p>delete</p>
      </column>
      <column col=3 md=6>
        <icon type="share" />
        <p>share</p>
      </column>
      <column col=3 md=6>
        <icon type="download" />
        <p>download</p>
      </column>
      <column col=3 md=6>
        <icon type="upload" />
        <p>upload</p>
      </column>
    </columns>

    <h5 class="subtitle">Object icons</h5>
    <columns class="gal text-center">
      <column col=3 md=6>
        <icon type="mail" />
        <p>mail</p>
      </column>
      <column col=3 md=6>
        <icon type="people" />
        <p>people</p>
      </column>
      <column col=3 md=6>
        <icon type="message" />
        <p>message</p>
      </column>
      <column col=3 md=6>
        <icon type="photo" />
        <p>photo</p>
      </column>
      <column col=3 md=6>
        <icon type="time" />
        <p>time</p>
      </column>
      <column col=3 md=6>
        <icon type="location" />
        <p>location</p>
      </column>
      <column col=3 md=6>
        <icon type="link" />
        <p>link</p>
      </column>
      <column col=3 md=6>
        <icon type="emoji" />
        <p>emoji</p>
      </column>
    </columns>
    
    <h5 class="subtitle">Sizes</h5>
    <p>
      Use <kbd>size</kbd> prop to increase icon sizes. You can use predefined 
      sizes (x2, x3, x4) or font-size to have different icon sizes.
    </p>

    <columns class="text-center">
      <column col=2 md=6>
        <icon type="mail" />
        <p>default</p>
      </column>
      <column col=2 md=6>
        <icon type="mail" size="x2" />
        <p>x2 (32px)</p>
      </column>
       <column col=2 md=6>
        <icon type="mail" size="x3" />
        <p>x3 (48px)</p>
      </column>
      <column col=2 md=6>
        <icon type="mail" size="x4" />
        <p>x4 (64px)</p>
      </column>
      <column col=2 md=6>
        <icon type="mail" size="4rem" />
        <p>custom</p>
      </column>
    </columns>
    <prism language="html" :code="sizesHtml" />

  </component-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { props } from './props';

export default Vue.extend({
  data: () => ({
    props,

    sizesHtml: `<icon type="mail" />
<icon type="mail" size="x2" />
<icon type="mail" size="x3" />
<icon type="mail" size="x4" />
<icon type="mail" size="4rem" />`,
  }),
});
</script>

<style lang="scss" scoped>
.gal .icon {
  margin: 1.5rem;
}
</style>
