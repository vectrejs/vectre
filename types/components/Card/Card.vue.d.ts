import Vue from 'vue';
import { Position, Slot } from './Image';
export default class Card extends Vue {
    img: string;
    before: Slot;
    after: Slot;
    private positions;
    private slots;
    showImg(pos: Position, slot: Slot): boolean;
}
