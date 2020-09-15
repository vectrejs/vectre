import { Modal } from './Modal';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalHeader } from './ModalHeader';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Modal, ModalBody, ModalFooter, ModalHeader });
export { Modal, ModalBody, ModalFooter, ModalHeader };
export * from './Size';
