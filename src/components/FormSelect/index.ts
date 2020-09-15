import { FormSelect } from './Select';
import { FormSelectOption } from './Option';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ FormSelect, FormSelectOption });
export { FormSelect, FormSelectOption };
export * from './Size';
