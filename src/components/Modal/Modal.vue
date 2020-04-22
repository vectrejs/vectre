<template>
  <div class="modal" :class="cssClass">
    <a v-if="overlay" @click="closeOverlay && close()" class="modal-overlay" aria-label="Close" />
    <div class="modal-container">
      <div class="modal-header">
        <btn v-if="closeBtn" @click="close" :type="btnType" class="float-right" aria-label="Close" />
        <slot name="header" />
      </div>
      <div class="modal-body">
        <div class="content">
          <slot name="content" />
        </div>
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import vue from 'vue';
import { Prop, Component, Emit } from 'vue-property-decorator';
import { Btn, BtnTypes } from '../Button';
import { Size, Sizes } from './Size';

@Component({
  components: { Btn },
})
export default class Modal extends vue {
  @Prop(Boolean)
  public show: boolean;

  @Prop(String)
  public size: Size;

  @Prop({ type: Boolean, default: true })
  private closeBtn: boolean;

  @Prop({ type: Boolean, default: true })
  private overlay: boolean;

  @Prop({ type: Boolean, default: true })
  private closeOverlay: boolean;

  private btnType = BtnTypes.clear;

  private get cssClass(): string[] {
    return [
      this.show ? 'active' : '',
      Sizes[this.size] || this.size,
    ];
  }

  @Emit('close')
  // tslint:disable-next-line:no-empty
  public close() { }
}
</script>
