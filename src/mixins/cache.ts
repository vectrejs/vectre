// import Vue from 'vue';
// import { ExtendedVue } from 'vue/types/vue';

// type cached = { (data: string): void }[];

// export function cachedProp<CachedKey extends string, T = Record<string, unknown>>(
//   origin: string,
//   cached: CachedKey,
// ): ExtendedVue<
//   Vue,
//   { [P in CachedKey]: T },
//   Record<string, unknown>,
//   { [P in CachedKey]: () => any },
//   Record<string, unknown>
// > {
//   return Vue.extend({
//     data() {
//       return { [cached]: {} };
//     },
//     watch: {
//       [origin]: {
//         immediate: true,
//         handler(value: Record<string, unknown>, old: Record<string, unknown>): void {
//           if (old !== void 0) {
//             for (const prop in old) {
//               if (Object.prototype.hasOwnProperty.call(value, prop) !== true) {
//                 this.$delete(this[cached], prop);
//               }
//             }
//           }

//           for (const prop in value) {
//             this.$set(this.$data[cached], prop, value[prop]);
//           }
//         },
//       },
//     },
//     created() {
//       this[cached] = { ...this[origin] };
//     },
//   });
// }

// export const cachedListeners = cachedProp<'__listeners', cached>('$listeners', '__listeners');
// export const cachedAttrs = cachedProp<'__attrs', cached>('$attrs', '__attrs');
