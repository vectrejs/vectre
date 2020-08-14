import { FormCheckbox } from './Checkbox';
import { FormCheckboxGroup } from './Group';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ FormCheckbox, FormCheckboxGroup });
export { FormCheckbox, FormCheckboxGroup };
export { FormCheckboxType, FormCheckboxTypes } from './Type';
export { FormCheckboxSize, FormCheckboxSizes } from './Size';
