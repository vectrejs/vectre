import { Tabs } from './Tabs';
import { Tab } from './Tab';
import { TabAction } from './TabAction';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Tabs, Tab, TabAction });
export { Tabs, Tab, TabAction };
