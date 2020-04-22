import vue from 'vue';
import { Type } from './Type';
import { Size } from './Size';
import { State } from './State';
import { IconType } from '../Icon';
export default class Button extends vue {
    type: Type;
    size: Size;
    icon: IconType;
    state: State;
    left: boolean;
    circle: boolean;
    action: boolean;
    get cssClass(): string[];
    created(): void;
}
