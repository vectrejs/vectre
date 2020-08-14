import Bar from './Bar.vue';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ Bar });
export { default as Bar } from './Bar.vue';
