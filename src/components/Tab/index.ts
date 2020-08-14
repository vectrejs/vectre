import { Tabs } from './Tabs';
import Tab from './Tab.vue';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ Tabs, Tab });
export { Tabs, Tab };
