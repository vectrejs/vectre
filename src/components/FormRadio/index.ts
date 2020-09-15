import { FormRadioGroup } from './Group';
import { FormRadio } from './Radio';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ FormRadioGroup, FormRadio });
export { FormRadioGroup, FormRadio };
export * from './Size';
