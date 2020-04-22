import vue from 'vue';
import { IconType } from '../Icon';
export default class Toast extends vue {
    type: string;
    autoclose: number;
    closeable: boolean;
    icon: IconType;
    private shown;
    get typeClass(): string;
    get iconClass(): string;
    mounted(): void;
    close(): void;
}
