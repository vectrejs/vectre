import Card from './Card.vue';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ Card });
export { Card };
export { CardImageSlot, CardImageSlots } from './Image';
