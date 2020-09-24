import { FormCheckbox } from './Checkbox';
import { FormCheckboxGroup } from './Group';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ FormCheckbox, FormCheckboxGroup });
export { FormCheckbox, FormCheckboxGroup };
export * from './Type';
export * from './Size';
