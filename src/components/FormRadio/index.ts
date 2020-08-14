import { FormRadioGroup } from './Group';
import { FormRadio } from './Radio';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ FormRadioGroup, FormRadio });
export { FormRadioGroup, FormRadio };
export { FormRadioSize, FormRadioSizes } from './Size';
