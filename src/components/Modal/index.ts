import Modal from './Modal.vue';
import { makePluggableComponents } from 'src/utils/plugin';

export default makePluggableComponents({ Modal });
export { Modal };
export { ModalSize, ModalSizes } from './Size';
