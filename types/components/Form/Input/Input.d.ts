import { VueComponent } from 'vue-tsx-helper';
import { CreateElement } from 'vue';
import { Size, Sizes } from './Size';
declare type fn = (...args: any[]) => void;
interface IInptProps {
    value?: string | number;
    attrs: {
        [name: string]: string;
    };
    on: Record<string, fn | fn[]>;
    error?: boolean;
    size?: Sizes;
    success?: boolean;
}
export declare class Input extends VueComponent<IInptProps> {
    size: Size;
    attrs: {
        [name: string]: string;
    };
    value: string | number;
    on: Record<string, fn | fn[]>;
    error: boolean;
    success: boolean;
    render(h: CreateElement): JSX.Element;
}
export {};