import anaylzer from 'rollup-plugin-analyzer';
import config from './rollup.config';

export default () => config().map(c => (c.plugins.push(anaylzer()), c));
