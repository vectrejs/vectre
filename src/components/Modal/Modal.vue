<template>
  <div class="modal" :class="cssClass">
    <a @click="close" class="modal-overlay" aria-label="Close" />
    <div class="modal-container">
      <div class="modal-header">
        <btn @click="close" :type="btnType" class="float-right" aria-label="Close" />
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
import { Btn, BtnType } from '@components/Button';
import { Size } from './Size';

@Component({
  components: { Btn },
})
export default class extends vue {
  @Prop(Boolean)
  private active: boolean;

  @Prop(String)
  private size: Size;

  private btnType = BtnType.clear;

  private get cssClass(): string[] {
    return [
      this.active ? 'active' : '',
      Size[this.size as any] || this.size,
    ];
  }

  @Emit('close')
  // tslint:disable-next-line:no-empty
  public close() {}
}
</script>
