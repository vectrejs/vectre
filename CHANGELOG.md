# Vectre Changelog

## 1.1.0

### Breaking changes

* Rename "size" → "rows" and "scale" → "size" properties of `FormSelect` to keep API uniformity [[commit](https://github.com/vectrejs/vectre/commit/43218e6a9e7c9fbe3fb7f32349274625c5ad0bbb)]

### Features

* Add `Overlay` component [[docs](https://vectrejs.github.io/docs/#/pages/components/overlay)]
* Add `FormSlider` component [[docs](https://vectrejs.github.io/docs/#/pages/form/slider)]
* Add `FormSwitch` and `FormSwitchGroup` as separate components. No more need to use `FormCheckbox` with "switch" type [[updated docs](http://localhost:8080/docs/#/pages/form/switch)]
* Add `ClickOutside` directive [[docs](https://vectrejs.github.io/docs/#/pages/utils/click-outside)]
* Add `Overlay` directive [[docs](https://vectrejs.github.io/docs/#/pages/utils/overlay)]
* Add `noScroll` prop to `Modal` to disable background scrolling
* `overlay` prop of `Modal` can take from 0 to 99 as the opacity level
* Add `htmlTag` prop to `Btn` component to render button as an ordinary link

### Fixes

* Fix dropdown menu opening in Safari [[commit](https://github.com/vectrejs/vectre/commit/4ef59efc61724cbf66cc9170831eebe7bd5e906c)]
* Make Card components susceptible to external attributes (e.g. style/class)[[commit](https://github.com/vectrejs/vectre/commit/4621a4ff8f7dee9cc53e5e9eef0f1830479c28c8)]
* Now `Tooltip` is shown for null values except for undefined [[commit](https://github.com/vectrejs/vectre/commit/e268e89ede5b71f9063e9a7b43a8edb04d257008)]

## 1.0.2 

### Fixes

* Fix tree shaking