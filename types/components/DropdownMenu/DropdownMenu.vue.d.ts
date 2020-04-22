import vue from 'vue';
import { BtnType, BtnState } from '../Button';
import { IconType } from '../Icon';
export default class DropdownMenu extends vue {
    items: IterableIterator<any>;
    right: boolean;
    btnType: BtnType;
    btnText: string;
    btnIcon: IconType;
    state: BtnState;
    get cssClass(): string[];
    get btnCssClass(): string[];
    private open;
    private close;
}
