<p align="center">
  <a href="https://vectrejs.github.io/docs/">
    <img width="240" src="https://vectrejs.github.io/docs/img/logo.3b9b2fe3.svg" />
  </a>
</p>
<p align="center">
 A <u>Lightweight</u>, <u>Simple</u> and <u>Responsive</u> Component Framework
</p>

<p align="center">
  <a href="https://github.com/vectrejs/vectre/issues">
    <img src="https://img.shields.io/github/issues/vectrejs/vectre">
  </a>
  <a href="https://www.npmjs.org/package/@vectrejs/vectre">
    <img src="https://img.shields.io/npm/v/@vectrejs/vectre.svg">
  </a>
  <a href="https://www.npmjs.org/package/@vectrejs/vectre">
    <img src="https://img.shields.io/david/vectrejs/vectre">
  </a>
  
  <a href="https://npmcharts.com/compare/@vectrejs/vectre?minimal=true">
    <img src="https://img.shields.io/npm/dm/@vectrejs/vectre.svg">
  </a>
  <br>
  <a href="https://unpkg.com/@vectrejs/vectre/dist/">
    <img src="https://img.badgesize.io/https:/unpkg.com/@vectrejs/vectre/dist/vectre.min.js?label=gzip%20size%3A%20JS&compression=gzip">
  </a>
  <a href="https://unpkg.com/spectre.css/dist/spectre.min.css">
    <img src="https://img.badgesize.io/https:/unpkg.com/spectre.css/dist/spectre.min.css?label=gzip%20size%3A%20CSS&compression=gzip">
  </a>

  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
</p>

Vectre is a set of lightweight, simple and responsive [Vue](https://vuejs.org/) components based on [Spectre CSS](https://picturepan2.github.io/spectre/index.html)



## Features

* Clean, responsive and consistent design system
* Only about 14kb min+gzip (plus ~9kb Spectre CSS)
* Supports Typescript and TSX
* Improved performance of most components thanks to [functional components]("https://vuejs.org/v2/guide/render-function.html#Functional-Components")
* Optimized for legacy browsers
* Focus on usability and rapid development
* Tree shaking

## Documentation

The documentation is in a separate [repository](https://github.com/vectrejs/docs) and the source code is an excellent example of using the framework.

Browse [online documentation here](https://vectrejs.github.io/docs/#/pages/getting-started)




## Quick Start

You need [Vue](https://vuejs.org/) version 2.5+.


### Install via npm or yarn
```bash
npm install --save spectre.css @vectrejs/vectre
#OR
yarn add spectre.css @vectrejs/vectre
```


### Import and use Vectre

All components

```javascript
import Vue from 'vue';
import 'spectre.css/dist/spectre-exp.css';
import 'spectre.css/dist/spectre-icons.css';
import 'spectre.css/dist/spectre.css';
import { VectrePlugin } from '@vectrejs/vectre';

Vue.use(VectrePlugin);
```

or specific components  <img src="https://img.shields.io/badge/-tree%20shaking-green" />
```javascript
import Vue from 'vue';
import 'spectre.css/dist/spectre.css';
import { Tag, Modal } from '@vectrejs/vectre';

Vue.component('Tag', Tag);
Vue.component('Modal', Modal);
```


### CDN

Alternatively, you can download or reference the script and the stylesheet in your HTML:

```html
<!-- jsDelivr --->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spectre.css/dist/spectre.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spectre.css/dist/spectre-icons.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/spectre.css/dist/spectre-exp.min.css">
<script src="https://cdn.jsdelivr.net/npm/@vectrejs/vectre/dist/vectre.min.js"></script>

<!-- unpkg --->
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css">
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css">
<link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css">
<script src="https://unpkg.com/@vectrejs/vectre/dist/vectre.min.js"></script>
```



## Browser support

At present, Vectre supports all modern browsers and additionally has a build to support older browsers like IE 10 or Safari 9

```html
<!-- jsDelivr --->
<script src="https://cdn.jsdelivr.net/npm/@vectrejs/vectre/dist/vectre.legacy.min.js"></script>

<!-- unpkg --->
<script src="https://unpkg.com/@vectrejs/vectre/dist/vectre.legacy.min.js"></script>
```



## Links

* [Spectre CSS](https://picturepan2.github.io/spectre/index.html)
* [Typescript](https://www.typescriptlang.org/)
* [TSX](https://github.com/wonderful-panda/vue-tsx-support/blob/v2/README.md)
* Tree Shaking [Webpack](https://webpack.js.org/guides/tree-shaking/) and [Rollup](https://rollupjs.org/guide/en/#tree-shaking)



## Social

* [Discord Chat](https://discord.gg/5a6Y8X2)
* [Twitter](https://twitter.com/vectrejs)
* [Issues](https://github.com/vectrejs/vectre/issues)



## License <img src="https://img.shields.io/github/license/vectrejs/vectre?color=red&label=%20" />

Code released under [MIT](https://github.com/vectrejs/vectre/blob/master/LICENSE) license.