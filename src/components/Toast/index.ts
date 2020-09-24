import { Toast } from './Toast';
import { ToastAction } from './ToastAction';
import { ToastBody } from './ToastBody';
import { ToastContent } from './ToastContent';
import { ToastIcon } from './ToastIcon';
import { ToastTitle } from './ToastTitle';
import { makePluggableComponents } from '../../utils/plugin';

export default makePluggableComponents({ Toast, ToastAction, ToastBody, ToastContent, ToastIcon, ToastTitle });
export { Toast, ToastAction, ToastBody, ToastContent, ToastIcon, ToastTitle };
