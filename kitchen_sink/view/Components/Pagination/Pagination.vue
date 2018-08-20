<template>
  <component-view :props="props" :events="events">
    <h2>Pagination</h2>
    <h3>Classic</h3>
    <pagination :pages="20" :current.sync="current"/>
    <prism language="html" :code="basicHtml" />
    <prism language="javascript" :code="basicJs" />

    <h3>Simple</h3>
    <p>You could use previous and next pagination to navigate.</p>
    <pagination :pages="pages" :current.sync="page" />
    <prism language="html" :code="simpleHtml" />
    <prism language="javascript" :code="simpleJs" />

  </component-view>
</template>

<script>
import { props } from './props';
import { events } from "./events";

export default {
  data: () => ({
    props,
    events,
    current: 1,
    pages: ['Accordion', 'Avatar', 'Bar', 'Breadcrumb', 'Cards', 'Chips'],
    page: 'Accordion',
    basicHtml: `<pagination :show="6" :pages="20" :current.sync="current" />`,
    basicJs: `export default {
  data: () => ({
    current: 1,
  })
}`,
    simpleHtml: `<pagination :pages="pages" :current.sync="current" />`,
    simpleJs: `export default {
  data: () => ({
    pages: ['Accordion', 'Avatar', 'Bar', 'Breadcrumb', 'Cards', 'Chips'],
    current: 'Accordion',
  })
}`,
  })
}
</script>



