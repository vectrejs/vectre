import { Btn } from './Btn';
import { BtnGroup } from './BtnGroup';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Btn, BtnGroup });
export { Btn, BtnGroup };
export * from './Size';
export * from './State';
export * from './Type';
