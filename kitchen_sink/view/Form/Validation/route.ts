import { RouteConfig } from 'vue-router';
import Validation from './Validation.vue';

export const FormValidationRoute = {
  path: 'validations',
  component: Validation,
  title: 'Validation',
} as RouteConfig;
