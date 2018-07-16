import vue from 'vue';
import { Component } from 'vue-property-decorator';
import AccordionView, { anchors as AccordionAnchors } from './Accordion';

@Component({
  components: {
    AccordionView,
  },
  delimiters: ['a', 's'],
})
export default class extends vue {
}
export const anchors = [
  AccordionAnchors,
];
