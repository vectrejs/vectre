import { Steps } from './Steps';
import Step from './Step.vue';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ Steps, Step });
export { Steps, Step };
