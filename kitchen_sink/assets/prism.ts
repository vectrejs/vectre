import vue from 'vue';
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/toolbar/prism-toolbar.css';
import 'prismjs/plugins/toolbar/prism-toolbar.min.js';
import 'prismjs/plugins/show-language/prism-show-language.min.js';

import Prism from 'vue-prism-component';
vue.component('prism', Prism);
