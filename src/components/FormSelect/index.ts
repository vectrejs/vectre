import { FormSelect } from './Select';
import { FormSelectOption } from './Option';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ FormSelect, FormSelectOption });
export { FormSelect, FormSelectOption };
export { FormSelectSize, FormSelectSizes } from './Size';
