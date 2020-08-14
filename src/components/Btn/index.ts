import Btn from './Btn.vue';
import BtnGroup from './BtnGroup.vue';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ Btn, BtnGroup });
export { Btn, BtnGroup };
export { BtnSize, BtnSizes } from './Size';
export { BtnState, BtnStates } from './State';
export { BtnType, BtnTypes } from './Type';
