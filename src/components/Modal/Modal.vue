<template>
  <div class="modal" :class="cssClass">
    <a v-if="overlay" class="modal-overlay" aria-label="Close" @click="closeOverlay && close()" />
    <div class="modal-container">
      <div class="modal-header">
        <btn v-if="closeBtn" :type="btnType" class="float-right" aria-label="Close" @click="close" />
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
import { Btn, BtnTypes } from '../Btn';
import { ModalSize, ModalSizes } from './Size';

@Component({
  name: 'Modal',
  components: { Btn },
})
export default class Modal extends vue {
  @Prop(Boolean)
  public show: boolean;

  @Prop(String)
  public size: ModalSize;

  @Prop({ type: Boolean, default: true })
  private closeBtn: boolean;

  @Prop({ type: Boolean, default: true })
  private overlay: boolean;

  @Prop({ type: Boolean, default: true })
  private closeOverlay: boolean;

  private btnType = BtnTypes.clear;

  private get cssClass(): string[] {
    return [this.show ? 'active' : '', ModalSizes[this.size] || this.size];
  }

  @Emit('close')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public close(): void {}
}
</script>
