'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));
var vuePropertyDecorator = require('vue-property-decorator');
var vueTsxHelper = require('vue-tsx-helper');
var _mergeJSXProps = _interopDefault(require('@vue/babel-helper-vue-jsx-merge-props'));

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$1 = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document$1) && _isObject(document$1.createElement);
var _domCreate = function (it) {
  return is ? document$1.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f
};

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode:  'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperty: _objectDp.f });

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/**
  * vue-class-component v7.2.3
  * (c) 2015-present Evan You
  * @license MIT
  */

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
function reflectionIsSupported() {
  return typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
}
function copyReflectionMetadata(to, from) {
  forwardMetadata(to, from);
  Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
    forwardMetadata(to.prototype, from.prototype, key);
  });
  Object.getOwnPropertyNames(from).forEach(function (key) {
    forwardMetadata(to, from, key);
  });
}

function forwardMetadata(to, from, propertyKey) {
  var metaKeys = propertyKey ? Reflect.getOwnMetadataKeys(from, propertyKey) : Reflect.getOwnMetadataKeys(from);
  metaKeys.forEach(function (metaKey) {
    var metadata = propertyKey ? Reflect.getOwnMetadata(metaKey, from, propertyKey) : Reflect.getOwnMetadata(metaKey, from);

    if (propertyKey) {
      Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
    } else {
      Reflect.defineMetadata(metaKey, metadata, to);
    }
  });
}

var fakeArray = {
  __proto__: []
};
var hasProto = fakeArray instanceof Array;
function isPrimitive(value) {
  var type = _typeof(value);

  return value == null || type !== 'object' && type !== 'function';
}
function warn(message) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-class-component] ' + message);
  }
}

function collectDataFromConstructor(vm, Component) {
  // override _init to prevent to init as Vue instance
  var originalInit = Component.prototype._init;

  Component.prototype._init = function () {
    var _this = this;

    // proxy to actual vm
    var keys = Object.getOwnPropertyNames(vm); // 2.2.0 compat (props are no longer exposed as self properties)

    if (vm.$options.props) {
      for (var key in vm.$options.props) {
        if (!vm.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
    }

    keys.forEach(function (key) {
      if (key.charAt(0) !== '_') {
        Object.defineProperty(_this, key, {
          get: function get() {
            return vm[key];
          },
          set: function set(value) {
            vm[key] = value;
          },
          configurable: true
        });
      }
    });
  }; // should be acquired class property values


  var data = new Component(); // restore original _init to avoid memory leak (#209)

  Component.prototype._init = originalInit; // create plain data object

  var plainData = {};
  Object.keys(data).forEach(function (key) {
    if (data[key] !== undefined) {
      plainData[key] = data[key];
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
      warn('Component class must inherit Vue or its descendant class ' + 'when class property is used.');
    }
  }

  return plainData;
}

var $internalHooks = ['data', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'render', 'errorCaptured', 'serverPrefetch' // 2.6
];
function componentFactory(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.name = options.name || Component._componentTag || Component.name; // prototype props.

  var proto = Component.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (key) {
    if (key === 'constructor') {
      return;
    } // hooks


    if ($internalHooks.indexOf(key) > -1) {
      options[key] = proto[key];
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(proto, key);

    if (descriptor.value !== void 0) {
      // methods
      if (typeof descriptor.value === 'function') {
        (options.methods || (options.methods = {}))[key] = descriptor.value;
      } else {
        // typescript decorated data
        (options.mixins || (options.mixins = [])).push({
          data: function data() {
            return _defineProperty({}, key, descriptor.value);
          }
        });
      }
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      (options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      };
    }
  });
  (options.mixins || (options.mixins = [])).push({
    data: function data() {
      return collectDataFromConstructor(this, Component);
    }
  }); // decorate options

  var decorators = Component.__decorators__;

  if (decorators) {
    decorators.forEach(function (fn) {
      return fn(options);
    });
    delete Component.__decorators__;
  } // find super


  var superProto = Object.getPrototypeOf(Component.prototype);
  var Super = superProto instanceof Vue ? superProto.constructor : Vue;
  var Extended = Super.extend(options);
  forwardStaticMembers(Extended, Component, Super);

  if (reflectionIsSupported()) {
    copyReflectionMetadata(Extended, Component);
  }

  return Extended;
}
var reservedPropertyNames = [// Unique id
'cid', // Super Vue constructor
'super', // Component options that will be used by the component
'options', 'superOptions', 'extendOptions', 'sealedOptions', // Private assets
'component', 'directive', 'filter'];
var shouldIgnore = {
  prototype: true,
  arguments: true,
  callee: true,
  caller: true
};

function forwardStaticMembers(Extended, Original, Super) {
  // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
  Object.getOwnPropertyNames(Original).forEach(function (key) {
    // Skip the properties that should not be overwritten
    if (shouldIgnore[key]) {
      return;
    } // Some browsers does not allow reconfigure built-in properties


    var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);

    if (extendedDescriptor && !extendedDescriptor.configurable) {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(Original, key); // If the user agent does not support `__proto__` or its family (IE <= 10),
    // the sub class properties may be inherited properties from the super class in TypeScript.
    // We need to exclude such properties to prevent to overwrite
    // the component options object which stored on the extended constructor (See #192).
    // If the value is a referenced value (object or function),
    // we can check equality of them and exclude it if they have the same reference.
    // If it is a primitive value, it will be forwarded for safety.

    if (!hasProto) {
      // Only `cid` is explicitly exluded from property forwarding
      // because we cannot detect whether it is a inherited property or not
      // on the no `__proto__` environment even though the property is reserved.
      if (key === 'cid') {
        return;
      }

      var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);

      if (!isPrimitive(descriptor.value) && superDescriptor && superDescriptor.value === descriptor.value) {
        return;
      }
    } // Warn if the users manually declare reserved properties


    if (process.env.NODE_ENV !== 'production' && reservedPropertyNames.indexOf(key) >= 0) {
      warn("Static property name '".concat(key, "' declared on class '").concat(Original.name, "' ") + 'conflicts with reserved property name of Vue internal. ' + 'It may cause unexpected behavior of the component. Consider renaming the property.');
    }

    Object.defineProperty(Extended, key, descriptor);
  });
}

function Component(options) {
  if (typeof options === 'function') {
    return componentFactory(options);
  }

  return function (Component) {
    return componentFactory(Component, options);
  };
}

Component.registerHooks = function registerHooks(keys) {
  $internalHooks.push.apply($internalHooks, _toConsumableArray(keys));
};

(function (Sizes) {
  Sizes["xl"] = "avatar-xl";
  Sizes["lg"] = "avatar-lg";
  Sizes["sm"] = "avatar-sm";
  Sizes["xs"] = "avatar-xs";
})(exports.AvatarSizes || (exports.AvatarSizes = {}));

var Avatar =
/** @class */
function (_super) {
  __extends(Avatar, _super);

  function Avatar() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Avatar.prototype, "cssStyle", {
    get: function get() {
      return {
        color: this.color,
        background: this.background
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Avatar.prototype, "cssClass", {
    get: function get() {
      return [exports.AvatarSizes[this.size] || this.size];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Avatar.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Avatar.prototype, "src", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Avatar.prototype, "initials", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Avatar.prototype, "background", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Avatar.prototype, "color", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Avatar.prototype, "alt", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Avatar.prototype, "presence", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Avatar.prototype, "icon", void 0);

  Avatar = __decorate([Component], Avatar);
  return Avatar;
}(Vue);

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = Avatar;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('figure',{staticClass:"avatar",class:_vm.cssClass,style:(_vm.cssStyle),attrs:{"data-initial":_vm.initials && _vm.initials.trim().substring(0, 2)}},[(_vm.src)?_c('img',{attrs:{"src":_vm.src,"alt":_vm.alt}}):_vm._e(),_vm._v(" "),(_vm.icon)?_c('img',{staticClass:"avatar-icon",attrs:{"src":_vm.icon}}):_vm._e(),_vm._v(" "),(_vm.presence && !_vm.icon)?_c('i',{staticClass:"avatar-presence",class:_vm.presence}):_vm._e()])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-2c68082c_0", { source: "figure.avatar+figure.avatar{margin-left:.4rem}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var Avatar$1 = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

(function (Presences) {
  Presences["online"] = "online";
  Presences["busy"] = "busy";
  Presences["away"] = "away";
  Presences["offline"] = "offline";
})(exports.AvatarPresences || (exports.AvatarPresences = {}));

var toString = {}.toString;

var _cof = function (it) {
  return toString.call(it).slice(8, -1);
};

var f$1 = {}.propertyIsEnumerable;

var _objectPie = {
	f: f$1
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof(it) == 'String' ? it.split('') : Object(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject = function (it) {
  return _iobject(_defined(it));
};

var gOPD = Object.getOwnPropertyDescriptor;

var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject(O);
  P = _toPrimitive(P, true);
  if (_ie8DomDefine) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
};

var _objectGopd = {
	f: f$2
};

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */


var check = function (O, proto) {
  _anObject(O);
  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
var _setProto = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

var setPrototypeOf = _setProto.set;
var _inheritIfRequired = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

// 7.1.15 ToLength

var min = Math.min;
var _toLength = function (it) {
  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;
var _toAbsoluteIndex = function (index, length) {
  index = _toInteger(index);
  return index < 0 ? max(index + length, 0) : min$1(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject($this);
    var length = _toLength(O.length);
    var index = _toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal(O, hiddenKeys);
};

var _objectGopn = {
	f: f$3
};

var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var space = '[' + _stringWs + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = _fails(function () {
    return !!_stringWs[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  _export(_export.P + _export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(_defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

var _stringTrim = exporter;

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys = Object.keys || function keys(O) {
  return _objectKeysInternal(O, _enumBugKeys);
};

var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject(O);
  var keys = _objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$2 = _global.document;
var _html = document$2 && document$2.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$1 = _sharedKey('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE$1 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate('iframe');
  var i = _enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
  return createDict();
};

var _objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE$1] = _anObject(O);
    result = new Empty();
    Empty[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = createDict();
  return Properties === undefined ? result : _objectDps(result, Properties);
};

var gOPN = _objectGopn.f;
var gOPD$1 = _objectGopd.f;
var dP$1 = _objectDp.f;
var $trim = _stringTrim.trim;
var NUMBER = 'Number';
var $Number = _global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = _toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = _descriptors ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (_has(Base, key = keys[j]) && !_has($Number, key)) {
      dP$1($Number, key, gOPD$1(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  _redefine(_global, NUMBER, $Number);
}

var dP$2 = _objectDp.f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || _descriptors && dP$2(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

// 7.2.2 IsArray(argument)

var _isArray = Array.isArray || function isArray(arg) {
  return _cof(arg) == 'Array';
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var SPECIES = _wks('species');

var _arraySpeciesConstructor = function (original) {
  var C;
  if (_isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
    if (_isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)


var _arraySpeciesCreate = function (original, length) {
  return new (_arraySpeciesConstructor(original))(length);
};

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex





var _arrayMethods = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || _arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = _toObject($this);
    var self = _iobject(O);
    var f = _ctx(callbackfn, that, 3);
    var length = _toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

var _strictMethod = function (method, arg) {
  return !!method && _fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

var $filter = _arrayMethods(2);

_export(_export.P + _export.F * !_strictMethod([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

var $indexOf = _arrayIncludes(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

_export(_export.P + _export.F * (NEGATIVE_ZERO || !_strictMethod($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

// 21.2.5.3 get RegExp.prototype.flags

var _flags = function () {
  var that = _anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

// 21.2.5.3 get RegExp.prototype.flags()
if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
  configurable: true,
  get: _flags
});

var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  _redefine(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = _anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING$1 = 'toString';
var $toString$1 = DateProto[TO_STRING$1];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  _redefine(DateProto, TO_STRING$1, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString$1.call(this) : INVALID_DATE;
  });
}

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)


_export(_export.S, 'Array', { isArray: _isArray });

var Sizes;

(function (Sizes) {
  Sizes["x2"] = "icon-2x";
  Sizes["x3"] = "icon-3x";
  Sizes["x4"] = "icon-4x";
})(Sizes || (Sizes = {}));

(function (Navigation) {
  Navigation["up"] = "icon-arrow-up";
  Navigation["down"] = "icon-arrow-down";
  Navigation["right"] = "icon-arrow-right";
  Navigation["left"] = "icon-arrow-left";
  Navigation["upward"] = "icon-upward";
  Navigation["forward"] = "icon-forward";
  Navigation["downward"] = "icon-downward";
  Navigation["back"] = "icon-back";
  Navigation["caret"] = "icon-caret";
  Navigation["menu"] = "icon-menu";
  Navigation["apps"] = "icon-apps";
  Navigation["hMore"] = "icon-more-horiz";
  Navigation["vMore"] = "icon-more-vert";
})(exports.IconNavigation || (exports.IconNavigation = {}));



(function (Action) {
  Action["hResize"] = "icon-resize-horiz";
  Action["vResize"] = "icon-resize-vert";
  Action["plus"] = "icon-plus";
  Action["minus"] = "icon-minus";
  Action["cross"] = "icon-cross";
  Action["check"] = "icon-check";
  Action["stop"] = "icon-stop";
  Action["shutdown"] = "icon-shutdown";
  Action["refresh"] = "icon-refresh";
  Action["search"] = "icon-search";
  Action["flag"] = "icon-flag";
  Action["bookmark"] = "icon-bookmark";
  Action["edit"] = "icon-edit";
  Action["delete"] = "icon-delete";
  Action["share"] = "icon-share";
  Action["download"] = "icon-download";
  Action["upload"] = "icon-upload";
})(exports.IconAction || (exports.IconAction = {}));



(function (Objects) {
  Objects["mail"] = "icon-mail";
  Objects["people"] = "icon-people";
  Objects["message"] = "icon-message";
  Objects["photo"] = "icon-photo";
  Objects["time"] = "icon-time";
  Objects["location"] = "icon-location";
  Objects["link"] = "icon-link";
  Objects["emoji"] = "icon-emoji";
})(exports.IconObject || (exports.IconObject = {}));

var Icons = __assign(__assign(__assign({}, exports.IconNavigation), exports.IconObject), exports.IconAction);

var Icon =
/** @class */
function (_super) {
  __extends(Icon, _super);

  function Icon() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Icon.prototype, "cssStyle", {
    get: function get() {
      return {
        'font-size': Sizes[this.size] || this.size
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Icon.prototype, "cssClass", {
    get: function get() {
      return [Sizes[this.size] || this.size, Icons[this.type] || this.type];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    required: true
  }), __metadata("design:type", String)], Icon.prototype, "type", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Icon.prototype, "size", void 0);

  Icon = __decorate([vuePropertyDecorator.Component], Icon);
  return Icon;
}(Vue);

/* script */
const __vue_script__$1 = Icon;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',{staticClass:"icon",class:_vm.cssClass,style:(_vm.cssStyle)})};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Icon$1 = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var Accordion =
/** @class */
function (_super) {
  __extends(Accordion, _super);

  function Accordion() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Accordion.prototype, "type", {
    get: function get() {
      return this.multiple ? 'checkbox' : 'radio';
    },
    enumerable: true,
    configurable: true
  });

  Accordion.prototype.uid = function (index) {
    return this.id + '-' + index;
  };

  Accordion.prototype.isSelected = function (key, index) {
    if (!Array.isArray(this.checked)) {
      return !!this.checked && (this.checked === key || this.checked.toString() === index.toString());
    }

    if (this.checked.indexOf(index) !== -1) {
      return true;
    }

    if (this.checked.indexOf(key) !== -1) {
      return true;
    }

    return false;
  };

  Accordion.prototype.check = function (event, key, index) {
    if (!this.$listeners.check) return;
    event.preventDefault();

    if (!this.multiple) {
      return this.$emit('check', key || index || 0);
    }

    var checked = Array.isArray(this.checked) ? __spread(this.checked) : this.checked !== undefined ? [this.checked] : [];

    if (event.target.checked) {
      checked.push(key || index || 0);
    } else {
      checked = checked.filter(function (item) {
        return item !== index && item !== key;
      });
    }

    this.$emit('check', checked);
  };

  Object.defineProperty(Accordion.prototype, "id", {
    get: function get() {
      return this.name ? this.name : 'accordion-' + Math.round(Math.random() * 1000);
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop({
    required: true,
    type: [Object, Array]
  }), __metadata("design:type", Object)], Accordion.prototype, "items", void 0);

  __decorate([vuePropertyDecorator.Prop([String, Number, Array]), __metadata("design:type", Object)], Accordion.prototype, "checked", void 0);

  __decorate([vuePropertyDecorator.Prop([String]), __metadata("design:type", String)], Accordion.prototype, "name", void 0);

  __decorate([vuePropertyDecorator.Prop([Boolean]), __metadata("design:type", Boolean)], Accordion.prototype, "multiple", void 0);

  __decorate([vuePropertyDecorator.Prop([String]), __metadata("design:type", String)], Accordion.prototype, "icon", void 0);

  Accordion = __decorate([vuePropertyDecorator.Component({
    components: {
      Icon: Icon$1
    }
  })], Accordion);
  return Accordion;
}(Vue);

/* script */
const __vue_script__$2 = Accordion;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"accordion-container"},_vm._l((_vm.items),function(value,key,index){return _c('div',{key:index || key || 0,staticClass:"accordion"},[_c('input',{attrs:{"id":_vm.uid(index || key || 0),"name":_vm.id,"type":_vm.type,"hidden":""},domProps:{"checked":_vm.isSelected(key, index)},on:{"click":function($event){return _vm.check($event, key, index)}}}),_vm._v(" "),_c('label',{staticClass:"accordion-header c-hand",attrs:{"for":_vm.uid(index || key || 0)}},[(_vm.icon)?_c('icon',{attrs:{"type":_vm.icon}}):_vm._e(),_vm._v(" "),(_vm.$scopedSlots['header'])?_vm._t("header",null,{"item":value,"index":key || index || 0}):[_vm._v(_vm._s(key))]],2),_vm._v(" "),_c('div',{staticClass:"accordion-body"},[(_vm.$scopedSlots['body'])?_vm._t("body",null,{"item":value,"index":key || index || 0}):_vm._e(),_vm._v(" "),(!_vm.$scopedSlots['body'])?_vm._t("default",null,{"item":value,"index":key || index || 0}):_vm._e(),_vm._v(" "),(!_vm.$scopedSlots['body'] && !_vm.$slots.default)?_c('span',{domProps:{"innerHTML":_vm._s(value)}}):_vm._e()],2)])}),0)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Accordion$1 = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

var Positions;

(function (Positions) {
  Positions["before"] = "before";
  Positions["after"] = "after";
})(Positions || (Positions = {}));

(function (Slots) {
  Slots["header"] = "header";
  Slots["body"] = "body";
  Slots["footer"] = "footer";
})(exports.CardImageSlots || (exports.CardImageSlots = {}));

var Card =
/** @class */
function (_super) {
  __extends(Card, _super);

  function Card() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.positions = Positions;
    _this.slots = exports.CardImageSlots;
    return _this;
  }

  Card.prototype.showImg = function (pos, slot) {
    return this.$props[pos] && this.$props[pos] === exports.CardImageSlots[slot];
  };

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Card.prototype, "img", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Card.prototype, "before", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Card.prototype, "after", void 0);

  Card = __decorate([Component], Card);
  return Card;
}(Vue);

/* script */
const __vue_script__$3 = Card;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card"},[(_vm.showImg(_vm.positions.before, _vm.slots.header))?_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img-responsive",attrs:{"src":_vm.img}})]):_vm._e(),_vm._v(" "),(_vm.$slots.header)?_c('div',{staticClass:"card-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),(_vm.showImg(_vm.positions.after, _vm.slots.header) || _vm.showImg(_vm.positions.before, _vm.slots.body))?_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img-responsive",attrs:{"src":_vm.img}})]):_vm._e(),_vm._v(" "),(_vm.$slots.body || _vm.$slots.default)?_c('div',{staticClass:"card-body"},[_vm._t("body"),_vm._v(" "),(!_vm.$scopedSlots.body)?_vm._t("default"):_vm._e()],2):_vm._e(),_vm._v(" "),(_vm.showImg(_vm.positions.after, _vm.slots.body) || _vm.showImg(_vm.positions.before, _vm.slots.footer))?_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img-responsive",attrs:{"src":_vm.img}})]):_vm._e(),_vm._v(" "),(_vm.$slots.footer)?_c('div',{staticClass:"card-footer"},[_vm._t("footer")],2):_vm._e(),_vm._v(" "),(_vm.showImg(_vm.positions.after, _vm.slots.footer))?_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img-responsive",attrs:{"src":_vm.img}})]):_vm._e()])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Card$1 = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

var Bar =
/** @class */
function (_super) {
  __extends(Bar, _super);

  function Bar() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Bar.prototype, "dataTooltip", {
    get: function get() {
      if (typeof this.tooltip === 'undefined') {
        return;
      }

      if (typeof this.tooltip === 'function') {
        return this.tooltip(this.value);
      }

      return this.value.toString() + this.tooltip;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Bar.prototype, "barCssClass", {
    get: function get() {
      return [this.sm ? 'bar-sm' : ''];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Bar.prototype, "barItemCssClass", {
    get: function get() {
      return [this.tooltip ? 'tooltip' : ''];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Bar.prototype, "cssStyle", {
    get: function get() {
      return {
        width: this.value / this.max * 100 + '%'
      };
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Bar.prototype, "sm", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Number,
    default: 0
  }), __metadata("design:type", Number)], Bar.prototype, "min", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Number,
    default: 100
  }), __metadata("design:type", Number)], Bar.prototype, "max", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Number,
    default: 0
  }), __metadata("design:type", Number)], Bar.prototype, "value", void 0);

  __decorate([vuePropertyDecorator.Prop([Function, String]), __metadata("design:type", Object)], Bar.prototype, "tooltip", void 0);

  Bar = __decorate([Component], Bar);
  return Bar;
}(Vue);

/* script */
const __vue_script__$4 = Bar;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"bar",class:_vm.barCssClass},[_c('div',{staticClass:"bar-item",class:_vm.barItemCssClass,style:(_vm.cssStyle),attrs:{"data-tooltip":_vm.dataTooltip,"aria-valuenow":_vm.value,"aria-valuemin":_vm.min,"aria-valuemax":_vm.max,"role":"progressbar"}})])};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Bar$1 = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

var Breadcrumb =
/** @class */
function (_super) {
  __extends(Breadcrumb, _super);

  function Breadcrumb() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  __decorate([vuePropertyDecorator.Prop({
    type: Array,
    required: true
  }), __metadata("design:type", Array)], Breadcrumb.prototype, "crumbs", void 0);

  Breadcrumb = __decorate([Component], Breadcrumb);
  return Breadcrumb;
}(Vue);

/* script */
const __vue_script__$5 = Breadcrumb;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"breadcrumb"},_vm._l((_vm.crumbs),function(crumb,key){return _c('li',{key:key,staticClass:"breadcrumb-item"},[_vm._t("default",null,{"crumb":crumb}),_vm._v(" "),(!_vm.$scopedSlots['default'])?_c('a',{attrs:{"href":crumb.path}},[_vm._v(_vm._s(crumb.title))]):_vm._e()],2)}),0)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Breadcrumb$1 = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

(function (Types) {
  Types["primary"] = "btn-primary";
  Types["link"] = "btn-link";
  Types["success"] = "btn-success";
  Types["error"] = "btn-error";
  Types["clear"] = "btn-clear";
})(exports.BtnTypes || (exports.BtnTypes = {}));

(function (Sizes) {
  Sizes["sm"] = "btn-sm";
  Sizes["lg"] = "btn-lg";
  Sizes["block"] = "btn-block";
})(exports.BtnSizes || (exports.BtnSizes = {}));

(function (States) {
  States["active"] = "active";
  States["disabled"] = "disabled";
  States["loading"] = "loading";
})(exports.BtnStates || (exports.BtnStates = {}));

var Button =
/** @class */
function (_super) {
  __extends(Button, _super);

  function Button() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Button.prototype, "cssClass", {
    get: function get() {
      return [exports.BtnTypes[this.type] || this.type, exports.BtnSizes[this.size] || this.size, exports.BtnStates[this.state] || this.state, this.action && this.circle ? 's-circle' : '', this.action ? 'btn-action' : ''];
    },
    enumerable: true,
    configurable: true
  });

  Button.prototype.created = function () {
    if (this.action && !this.icon) {
      throw new Error('Action button should have icon');
    }
  };

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Button.prototype, "type", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Button.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Button.prototype, "icon", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Button.prototype, "state", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "left", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "circle", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "action", void 0);

  Button = __decorate([vuePropertyDecorator.Component({
    components: {
      Icon: Icon$1
    }
  })], Button);
  return Button;
}(Vue);

/* script */
const __vue_script__$6 = Button;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',_vm._g({staticClass:"btn",class:_vm.cssClass},_vm.$listeners),[(_vm.icon && _vm.left)?_c('icon',{staticClass:"left",attrs:{"type":_vm.icon}}):_vm._e(),_vm._v(" "),(!_vm.action)?_vm._t("default"):_vm._e(),_vm._v(" "),(_vm.icon && !_vm.left)?_c('icon',{attrs:{"type":_vm.icon}}):_vm._e()],2)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-57a62aae_0", { source: ".btn+.btn{margin-left:.4rem}.btn:not(.btn-action) .icon{margin:0 0 0 .2rem}.btn:not(.btn-action) .icon.left{margin:0 .2rem 0 0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  

  
  var Btn = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    browser,
    undefined
  );

var script = Vue.extend({
  name: 'ButtonGroup',
  props: {
    block: Boolean
  },
  computed: {
    cssClass: function cssClass() {
      return [this.block ? 'btn-group-block' : ''];
    }
  }
});

/* script */
const __vue_script__$7 = script;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"btn-group",class:_vm.cssClass},[_vm._t("default")],2)};
var __vue_staticRenderFns__$7 = [];

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var BtnGroup = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

var Chip =
/** @class */
function (_super) {
  __extends(Chip, _super);

  function Chip() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.avatarSizes = exports.AvatarSizes;
    return _this;
  }

  Object.defineProperty(Chip.prototype, "cssClass", {
    get: function get() {
      return [this.active ? 'active' : ''];
    },
    enumerable: true,
    configurable: true
  });

  Chip.prototype.close = function () {
    this.$emit('close');
  };

  Chip.prototype.showClose = function () {
    return !!this.$listeners.close;
  };

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    required: true
  }), __metadata("design:type", String)], Chip.prototype, "text", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Chip.prototype, "avatar", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Chip.prototype, "initials", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Chip.prototype, "active", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Boolean,
    default: true
  }), __metadata("design:type", Boolean)], Chip.prototype, "small", void 0);

  Chip = __decorate([Component({
    components: {
      Avatar: Avatar$1
    }
  })], Chip);
  return Chip;
}(Vue);

/* script */
const __vue_script__$8 = Chip;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"chip",class:_vm.cssClass},[(_vm.avatar || _vm.initials)?_c('avatar',{attrs:{"src":_vm.avatar,"size":_vm.small ? _vm.avatarSizes.sm : undefined,"initials":_vm.initials}}):_vm._e(),_vm._v("\n  "+_vm._s(_vm.text)+"\n  "),(_vm.showClose())?_c('a',{staticClass:"btn btn-clear",attrs:{"aria-label":"Close","role":"button"},on:{"click":_vm.close}}):_vm._e()],1)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Chip$1 = normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

var Divider =
/** @class */
function (_super) {
  __extends(Divider, _super);

  function Divider() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Divider.prototype, "dataContent", {
    get: function get() {
      return this.content || this.$slots.default && this.$slots.default[0].text;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Divider.prototype, "vert", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Divider.prototype, "content", void 0);

  Divider = __decorate([vuePropertyDecorator.Component], Divider);
  return Divider;
}(Vue);

/* script */
const __vue_script__$9 = Divider;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"text-center",class:{'divider': !_vm.vert, 'divider-vert': _vm.vert},attrs:{"data-content":_vm.dataContent}})};
var __vue_staticRenderFns__$9 = [];

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Divider$1 = normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

var MenuBadge =
/** @class */
function (_super) {
  __extends(MenuBadge, _super);

  function MenuBadge() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  __decorate([vuePropertyDecorator.Prop([String, Number]), __metadata("design:type", Object)], MenuBadge.prototype, "value", void 0);

  MenuBadge = __decorate([vuePropertyDecorator.Component], MenuBadge);
  return MenuBadge;
}(Vue);

/* script */
const __vue_script__$a = MenuBadge;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menu-badge"},[_c('label',{staticClass:"label label-primary"},[_vm._v(_vm._s(_vm.value))])])};
var __vue_staticRenderFns__$a = [];

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Badge = normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    undefined
  );

var VerticalMenu =
/** @class */
function (_super) {
  __extends(VerticalMenu, _super);

  function VerticalMenu() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  VerticalMenu.prototype.normalizeDivider = function (divider) {
    return typeof divider === 'string' ? divider : '';
  };

  VerticalMenu.prototype.cssClassLinkItem = function (current) {
    return [this.active.toString() === current.toString() ? 'active' : ''];
  };

  __decorate([vuePropertyDecorator.Prop({
    type: [Array, Object],
    required: true
  }), __metadata("design:type", Array)], VerticalMenu.prototype, "items", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [String, Number],
    default: ''
  }), __metadata("design:type", Object)], VerticalMenu.prototype, "active", void 0);

  VerticalMenu = __decorate([vuePropertyDecorator.Component({
    components: {
      Badge: Badge
    }
  })], VerticalMenu);
  return VerticalMenu;
}(Vue);

/* script */
const __vue_script__$b = VerticalMenu;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"menu"},[_vm._l((_vm.items),function(value,key){return [(value.divider)?_c('li',{key:key,staticClass:"divider",attrs:{"data-content":_vm.normalizeDivider(value.divider)}}):_c('li',{key:key,staticClass:"menu-item"},[(value.badge)?_c('badge',{attrs:{"value":value.badge}}):_vm._e(),_vm._v(" "),(_vm.$scopedSlots.default)?_vm._t("default",null,{"item":value,"index":key}):_c('a',{class:_vm.cssClassLinkItem(key),attrs:{"href":value.path}},[_vm._v(_vm._s(value.text))])],2)]})],2)};
var __vue_staticRenderFns__$b = [];

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var VerticalMenu$1 = normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    undefined
  );

var DropdownMenu =
/** @class */
function (_super) {
  __extends(DropdownMenu, _super);

  function DropdownMenu() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(DropdownMenu.prototype, "cssClass", {
    get: function get() {
      return [this.right ? 'dropdown-right' : ''];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(DropdownMenu.prototype, "btnCssClass", {
    get: function get() {
      return [exports.BtnTypes[this.btnType]];
    },
    enumerable: true,
    configurable: true
  });

  DropdownMenu.prototype.open = function () {
    this.$emit('opened');
  };

  DropdownMenu.prototype.close = function () {
    this.$emit('closed');
  };

  __decorate([vuePropertyDecorator.Prop({
    type: [Object, Array],
    required: true
  }), __metadata("design:type", Object)], DropdownMenu.prototype, "items", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], DropdownMenu.prototype, "right", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], DropdownMenu.prototype, "btnType", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], DropdownMenu.prototype, "btnText", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    default: exports.IconNavigation.caret
  }), __metadata("design:type", String)], DropdownMenu.prototype, "btnIcon", void 0);

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", String)], DropdownMenu.prototype, "state", void 0);

  DropdownMenu = __decorate([vuePropertyDecorator.Component({
    components: {
      VerticalMenu: VerticalMenu$1
    }
  })], DropdownMenu);
  return DropdownMenu;
}(Vue);

/* script */
const __vue_script__$c = DropdownMenu;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown",class:_vm.cssClass},[_c('btn',{staticClass:"dropdown-toggle",class:_vm.btnCssClass,attrs:{"tabindex":"0","icon":_vm.btnIcon,"state":_vm.state},on:{"focus":_vm.open,"blur":_vm.close}},[_vm._v(_vm._s(_vm.btnText))]),_vm._v(" "),(_vm.$scopedSlots.default)?_c('vertical-menu',{attrs:{"items":_vm.items},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var item = ref.item;
var index = ref.index;
return [_vm._t("default",null,{"item":item,"index":index})]}}],null,true)}):_c('vertical-menu',{attrs:{"items":_vm.items}})],1)};
var __vue_staticRenderFns__$c = [];

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var DropdownMenu$1 = normalizeComponent_1(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

var Empty$1 =
/** @class */
function (_super) {
  __extends(Empty, _super);

  function Empty() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.iconSizes = Sizes;
    return _this;
  }

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Empty.prototype, "title", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Empty.prototype, "sub", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Empty.prototype, "icon", void 0);

  Empty = __decorate([Component({
    components: {
      Icon: Icon$1
    }
  })], Empty);
  return Empty;
}(Vue);

/* script */
const __vue_script__$d = Empty$1;

/* template */
var __vue_render__$d = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"empty"},[(_vm.icon)?_c('div',{staticClass:"empty-icon"},[_c('icon',{attrs:{"type":_vm.icon,"size":_vm.iconSizes.x3}})],1):_vm._e(),_vm._v(" "),(_vm.title)?_c('p',{staticClass:"empty-title h5"},[_vm._v(_vm._s(_vm.title))]):_vm._e(),_vm._v(" "),(_vm.sub)?_c('p',{staticClass:"empty-subtitle"},[_vm._v(_vm._s(_vm.sub))]):_vm._e(),_vm._v(" "),(_vm.$slots.default)?_c('div',{staticClass:"empty-content"},[_vm._t("default")],2):_vm._e(),_vm._v(" "),(_vm.$slots.action)?_c('div',{staticClass:"empty-action"},[_vm._t("action")],2):_vm._e()])};
var __vue_staticRenderFns__$d = [];

  /* style */
  const __vue_inject_styles__$d = undefined;
  /* scoped */
  const __vue_scope_id__$d = undefined;
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Empty$2 = normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );

(function (Types) {
  Types["primary"] = "label-primary";
  Types["secondary"] = "label-secondary";
  Types["success"] = "label-success";
  Types["warning"] = "label-warning";
  Types["error"] = "label-error";
})(exports.TagTypes || (exports.TagTypes = {}));

var Label =
/** @class */
function (_super) {
  __extends(Label, _super);

  function Label() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Label.prototype, "cssClass", {
    get: function get() {
      return [exports.TagTypes[this.type], this.rounded ? 'label-rounded' : ''];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Label.prototype, "type", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Label.prototype, "rounded", void 0);

  Label = __decorate([vuePropertyDecorator.Component({
    name: 'tag'
  })], Label);
  return Label;
}(Vue);

/* script */
const __vue_script__$e = Label;

/* template */
var __vue_render__$e = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"label",class:_vm.cssClass},[_vm._t("default")],2)};
var __vue_staticRenderFns__$e = [];

  /* style */
  const __vue_inject_styles__$e = function (inject) {
    if (!inject) return
    inject("data-v-5877c339_0", { source: ".label+.label{margin-left:.3rem}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$e = undefined;
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject SSR */
  

  
  var Tag = normalizeComponent_1(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    browser,
    undefined
  );

var Sizes$1;

(function (Sizes) {
  Sizes["sm"] = "modal-sm";
  Sizes["lg"] = "modal-lg";
})(Sizes$1 || (Sizes$1 = {}));

var Modal =
/** @class */
function (_super) {
  __extends(Modal, _super);

  function Modal() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.btnType = exports.BtnTypes.clear;
    return _this;
  }

  Object.defineProperty(Modal.prototype, "cssClass", {
    get: function get() {
      return [this.show ? 'active' : '', Sizes$1[this.size] || this.size];
    },
    enumerable: true,
    configurable: true
  });

  Modal.prototype.close = function () {};

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Modal.prototype, "show", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Modal.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Boolean,
    default: true
  }), __metadata("design:type", Boolean)], Modal.prototype, "closeBtn", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Boolean,
    default: true
  }), __metadata("design:type", Boolean)], Modal.prototype, "overlay", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Boolean,
    default: true
  }), __metadata("design:type", Boolean)], Modal.prototype, "closeOverlay", void 0);

  __decorate([vuePropertyDecorator.Emit('close'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Modal.prototype, "close", null);

  Modal = __decorate([vuePropertyDecorator.Component({
    components: {
      Btn: Btn
    }
  })], Modal);
  return Modal;
}(Vue);

/* script */
const __vue_script__$f = Modal;

/* template */
var __vue_render__$f = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal",class:_vm.cssClass},[(_vm.overlay)?_c('a',{staticClass:"modal-overlay",attrs:{"aria-label":"Close"},on:{"click":function($event){_vm.closeOverlay && _vm.close();}}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"modal-container"},[_c('div',{staticClass:"modal-header"},[(_vm.closeBtn)?_c('btn',{staticClass:"float-right",attrs:{"type":_vm.btnType,"aria-label":"Close"},on:{"click":_vm.close}}):_vm._e(),_vm._v(" "),_vm._t("header")],2),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('div',{staticClass:"content"},[_vm._t("content")],2)]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_vm._t("footer")],2)])])};
var __vue_staticRenderFns__$f = [];

  /* style */
  const __vue_inject_styles__$f = undefined;
  /* scoped */
  const __vue_scope_id__$f = undefined;
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Modal$1 = normalizeComponent_1(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    undefined,
    undefined
  );

var OffCanvas =
/** @class */
function (_super) {
  __extends(OffCanvas, _super);

  function OffCanvas() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.active = false;
    return _this;
  }

  OffCanvas.prototype.showSidebar = function () {
    this.active = true;
  };

  OffCanvas.prototype.hideSidebar = function () {
    this.active = false;
  };

  __decorate([vuePropertyDecorator.Prop({
    default: exports.IconNavigation.menu
  }), __metadata("design:type", String)], OffCanvas.prototype, "icon", void 0);

  __decorate([vuePropertyDecorator.Prop({
    default: true,
    type: Boolean
  }), __metadata("design:type", Boolean)], OffCanvas.prototype, "sidebarShow", void 0);

  OffCanvas = __decorate([vuePropertyDecorator.Component({
    components: {
      icon: Icon$1
    }
  })], OffCanvas);
  return OffCanvas;
}(Vue);

/* script */
const __vue_script__$g = OffCanvas;

/* template */
var __vue_render__$g = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"off-canvas",class:{ 'off-canvas-sidebar-show': _vm.sidebarShow }},[_c('div',{staticClass:"off-canvas-toggle"},[_c('a',{staticClass:"btn btn-primary btn-action",on:{"click":function($event){return _vm.showSidebar()}}},[(_vm.$slots.icon)?_vm._t("icon"):_c('icon',{attrs:{"type":_vm.icon}})],2)]),_vm._v(" "),_c('div',{staticClass:"off-canvas-sidebar",class:{ 'active': _vm.active }},[_vm._t("sidebar")],2),_vm._v(" "),_c('a',{staticClass:"off-canvas-overlay",on:{"click":function($event){return _vm.hideSidebar()}}}),_vm._v(" "),_c('div',{staticClass:"off-canvas-content"},[_vm._t("content"),_vm._v(" "),_vm._t("default")],2)])};
var __vue_staticRenderFns__$g = [];

  /* style */
  const __vue_inject_styles__$g = undefined;
  /* scoped */
  const __vue_scope_id__$g = undefined;
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var OffCanvas$1 = normalizeComponent_1(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    undefined,
    undefined
  );

var SimplePager =
/** @class */
function (_super) {
  __extends(SimplePager, _super);

  function SimplePager() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(SimplePager.prototype, "previous", {
    get: function get() {
      return this.pages[this.curIndex - 1];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SimplePager.prototype, "next", {
    get: function get() {
      return this.pages[this.curIndex + 1];
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SimplePager.prototype, "curIndex", {
    get: function get() {
      return this.pages.indexOf(this.current);
    },
    enumerable: true,
    configurable: true
  });

  SimplePager.prototype.change = function (page) {
    this.$emit('change', page);
  };

  __decorate([vuePropertyDecorator.Prop({
    type: Array,
    required: true
  }), __metadata("design:type", Array)], SimplePager.prototype, "pages", void 0);

  __decorate([vuePropertyDecorator.Prop({
    default: 0
  }), __metadata("design:type", String)], SimplePager.prototype, "current", void 0);

  SimplePager = __decorate([vuePropertyDecorator.Component], SimplePager);
  return SimplePager;
}(Vue);

/* script */
const __vue_script__$h = SimplePager;

/* template */
var __vue_render__$h = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"pagination"},[(_vm.previous)?_c('li',{staticClass:"page-item page-prev"},[_c('a',{on:{"click":function($event){return _vm.change(_vm.previous)}}},[_c('div',{staticClass:"page-item-subtitle"},[_vm._v("Previous")]),_vm._v(" "),_c('div',{staticClass:"page-item-title h5"},[_vm._v(_vm._s(_vm.previous))])])]):_vm._e(),_vm._v(" "),(_vm.next)?_c('li',{staticClass:"page-item page-next"},[_c('a',{on:{"click":function($event){return _vm.change(_vm.next)}}},[_c('div',{staticClass:"page-item-subtitle"},[_vm._v("Next")]),_vm._v(" "),_c('div',{staticClass:"page-item-title h5"},[_vm._v(_vm._s(_vm.next))])])]):_vm._e()])};
var __vue_staticRenderFns__$h = [];

  /* style */
  const __vue_inject_styles__$h = undefined;
  /* scoped */
  const __vue_scope_id__$h = undefined;
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var SimplePager$1 = normalizeComponent_1(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    undefined,
    undefined
  );

// true  -> String#at
// false -> String#codePointAt
var _stringAt = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined(that));
    var i = _toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _iterators = {};

var def = _objectDp.f;

var TAG = _wks('toStringTag');

var _setToStringTag = function (it, tag, stat) {
  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

var _iterCreate = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
  _setToStringTag(Constructor, NAME + ' Iterator');
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$2 = _sharedKey('IE_PROTO');
var ObjectProto = Object.prototype;

var _objectGpo = Object.getPrototypeOf || function (O) {
  O = _toObject(O);
  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

var ITERATOR = _wks('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if ( typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ( (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    _hide(proto, ITERATOR, $default);
  }
  // Plug for library
  _iterators[NAME] = $default;
  _iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine(proto, key, methods[key]);
    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at = _stringAt(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

// call something on iterator step with safe closing on error

var _iterCall = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) _anObject(ret.call(iterator));
    throw e;
  }
};

// check on default Array iterator

var ITERATOR$1 = _wks('iterator');
var ArrayProto = Array.prototype;

var _isArrayIter = function (it) {
  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
};

var _createProperty = function (object, index, value) {
  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
  else object[index] = value;
};

// getting tag from 19.1.3.6 Object.prototype.toString()

var TAG$1 = _wks('toStringTag');
// ES3 wrong here
var ARG = _cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

var _classof = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
    // builtinTag case
    : ARG ? _cof(O)
    // ES3 arguments fallback
    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

var ITERATOR$2 = _wks('iterator');

var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$2]
    || it['@@iterator']
    || _iterators[_classof(it)];
};

var ITERATOR$3 = _wks('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR$3]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

var _iterDetect = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR$3]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR$3] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

_export(_export.S + _export.F * !_iterDetect(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = _toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = core_getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = _toLength(O.length);
      for (result = new C(length); length > index; index++) {
        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

var SEPARATOR = '...';

var Pager =
/** @class */
function (_super) {
  __extends(Pager, _super);

  function Pager() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Pager.prototype, "items", {
    get: function get() {
      var _this = this;

      var half = Math.round((this.show + 1) / 2);

      if (this.current <= half) {
        return __spread(Array.from({
          length: this.show - 1
        }, function (v, i) {
          return i + 1;
        }), [SEPARATOR, this.pages]);
      }

      if (this.current + half > this.pages) {
        return __spread([1, SEPARATOR], Array.from({
          length: this.show - 1
        }, function (v, i) {
          return _this.pages - _this.show + 2 + i;
        }));
      }

      var mediana = Math.floor((this.show - 4) / 2);
      return __spread([1, SEPARATOR], Array.from({
        length: this.show - 3
      }, function (v, i) {
        return _this.current - mediana + i;
      }), [SEPARATOR, this.pages]);
    },
    enumerable: true,
    configurable: true
  });

  Pager.prototype.change = function (current) {
    this.$emit('change', current);
  };

  Pager.prototype.next = function () {
    this.$emit('change', this.current + 1);
  };

  Pager.prototype.previous = function () {
    this.$emit('change', this.current - 1);
  };

  __decorate([vuePropertyDecorator.Prop({
    type: [Number],
    required: true
  }), __metadata("design:type", Number)], Pager.prototype, "pages", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number],
    default: 1
  }), __metadata("design:type", Number)], Pager.prototype, "current", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Number,
    default: 6
  }), __metadata("design:type", Number)], Pager.prototype, "show", void 0);

  Pager = __decorate([vuePropertyDecorator.Component], Pager);
  return Pager;
}(Vue);

/* script */
const __vue_script__$i = Pager;

/* template */
var __vue_render__$i = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"pagination"},[_c('li',{staticClass:"page-item",class:{ disabled: _vm.current == 1 }},[_c('a',{attrs:{"tabindex":"-1"},on:{"click":_vm.previous}},[_vm._v("Previous")])]),_vm._v(" "),_vm._l((_vm.items),function(n,i){return _c('li',{key:i,staticClass:"page-item page-item-num",class:{active: _vm.current == n}},[_c('a',{on:{"click":function($event){return _vm.change(n)}}},[_vm._v(_vm._s(n))])])}),_vm._v(" "),_c('li',{staticClass:"page-item",class:{ disabled: _vm.current == _vm.pages }},[_c('a',{on:{"click":_vm.next}},[_vm._v("Next")])])],2)};
var __vue_staticRenderFns__$i = [];

  /* style */
  const __vue_inject_styles__$i = undefined;
  /* scoped */
  const __vue_scope_id__$i = undefined;
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Pager$1 = normalizeComponent_1(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    undefined,
    undefined
  );

var Pagination =
/** @class */
function (_super) {
  __extends(Pagination, _super);

  function Pagination() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Pagination.prototype.change = function (current) {
    this.$emit('update:current', current);
  };

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, Array],
    required: true
  }), __metadata("design:type", Object)], Pagination.prototype, "pages", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String]
  }), __metadata("design:type", Object)], Pagination.prototype, "current", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Number
  }), __metadata("design:type", Number)], Pagination.prototype, "show", void 0);

  Pagination = __decorate([vuePropertyDecorator.Component({
    components: {
      SimplePager: SimplePager$1,
      Pager: Pager$1
    }
  })], Pagination);
  return Pagination;
}(Vue);

/* script */
const __vue_script__$j = Pagination;

/* template */
var __vue_render__$j = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!Array.isArray(_vm.pages))?_c('pager',{attrs:{"pages":_vm.pages,"current":_vm.current,"show":_vm.show},on:{"change":_vm.change}}):_c('simple-pager',{attrs:{"pages":_vm.pages,"current":_vm.current},on:{"change":_vm.change}})};
var __vue_staticRenderFns__$j = [];

  /* style */
  const __vue_inject_styles__$j = function (inject) {
    if (!inject) return
    inject("data-v-2798e5fd_0", { source: ".page-item-num{min-width:1.4rem}@media (min-width:640px){.page-item-num{min-width:1.7rem}}.page-item a{cursor:pointer;user-select:none}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$j = undefined;
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = false;
  /* style inject SSR */
  

  
  var Pagination$1 = normalizeComponent_1(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    browser,
    undefined
  );

var script$1 = Vue.extend({
  name: 'Panel'
});

/* script */
const __vue_script__$k = script$1;

/* template */
var __vue_render__$k = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"panel"},[(_vm.$slots.header)?_c('div',{staticClass:"panel-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),(_vm.$slots.nav)?_c('div',{staticClass:"panel-nav"},[_vm._t("nav")],2):_vm._e(),_vm._v(" "),(_vm.$slots.body)?_c('div',{staticClass:"panel-body"},[_vm._t("body")],2):_vm._e(),_vm._v(" "),(_vm.$slots.footer)?_c('div',{staticClass:"panel-footer"},[_vm._t("footer")],2):_vm._e()])};
var __vue_staticRenderFns__$k = [];

  /* style */
  const __vue_inject_styles__$k = undefined;
  /* scoped */
  const __vue_scope_id__$k = undefined;
  /* module identifier */
  const __vue_module_identifier__$k = undefined;
  /* functional template */
  const __vue_is_functional_template__$k = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Panel = normalizeComponent_1(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    undefined,
    undefined
  );

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = _wks('unscopables');
var ArrayProto$1 = Array.prototype;
if (ArrayProto$1[UNSCOPABLES] == undefined) _hide(ArrayProto$1, UNSCOPABLES, {});
var _addToUnscopables = function (key) {
  ArrayProto$1[UNSCOPABLES][key] = true;
};

var _iterStep = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep(1);
  }
  if (kind == 'keys') return _iterStep(0, index);
  if (kind == 'values') return _iterStep(0, O[index]);
  return _iterStep(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
_iterators.Arguments = _iterators.Array;

_addToUnscopables('keys');
_addToUnscopables('values');
_addToUnscopables('entries');

var ITERATOR$4 = _wks('iterator');
var TO_STRING_TAG = _wks('toStringTag');
var ArrayValues = _iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME$1 = collections[i];
  var explicit = DOMIterables[NAME$1];
  var Collection = _global[NAME$1];
  var proto$1 = Collection && Collection.prototype;
  var key$1;
  if (proto$1) {
    if (!proto$1[ITERATOR$4]) _hide(proto$1, ITERATOR$4, ArrayValues);
    if (!proto$1[TO_STRING_TAG]) _hide(proto$1, TO_STRING_TAG, NAME$1);
    _iterators[NAME$1] = ArrayValues;
    if (explicit) for (key$1 in es6_array_iterator) if (!proto$1[key$1]) _redefine(proto$1, key$1, es6_array_iterator[key$1], true);
  }
}

// most Object methods by ES6 should accept primitives



var _objectSap = function (KEY, exec) {
  var fn = (_core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
};

// 19.1.2.14 Object.keys(O)



_objectSap('keys', function () {
  return function keys(it) {
    return _objectKeys(_toObject(it));
  };
});

// https://github.com/tc39/Array.prototype.includes

var $includes = _arrayIncludes(true);

_export(_export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

_addToUnscopables('includes');

// 7.2.8 IsRegExp(argument)


var MATCH = _wks('match');
var _isRegexp = function (it) {
  var isRegExp;
  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
};

// helper for String#{startsWith, endsWith, includes}



var _stringContext = function (that, searchString, NAME) {
  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(_defined(that));
};

var MATCH$1 = _wks('match');
var _failsIsRegexp = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH$1] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

var INCLUDES = 'includes';

_export(_export.P + _export.F * _failsIsRegexp(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~_stringContext(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

(function (Sides) {
  Sides["right"] = "popover-right";
  Sides["left"] = "popover-left";
  Sides["bottom"] = "popover-bottom";
  Sides["top"] = "";
})(exports.PopoverSides || (exports.PopoverSides = {}));

var createPopoverContainer = function createPopoverContainer(h, nodes) {
  return h('div', {
    class: 'popover-container'
  }, nodes);
};

var Popover = Vue.extend({
  name: 'Popover',
  props: {
    side: {
      type: String,
      validator: function validator(side) {
        return Object.keys(exports.PopoverSides).includes(side);
      }
    }
  },
  render: function render(h) {
    var elements = this.$slots.default || [];
    return h('div', {
      class: ['popover', exports.PopoverSides[this.side]]
    }, [elements.slice(0, 1), createPopoverContainer(h, elements.slice(1))]);
  }
});

var $map = _arrayMethods(1);

_export(_export.P + _export.F * !_strictMethod([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

var script$2 = Vue.extend({
  name: 'Step'
});

/* script */
const __vue_script__$l = script$2;

/* template */
var __vue_render__$l = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"step-item"},[_c('a',[_vm._t("default")],2)])};
var __vue_staticRenderFns__$l = [];

  /* style */
  const __vue_inject_styles__$l = function (inject) {
    if (!inject) return
    inject("data-v-476ba0f5_0", { source: ".step .step-item a{user-select:none}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$l = undefined;
  /* module identifier */
  const __vue_module_identifier__$l = undefined;
  /* functional template */
  const __vue_is_functional_template__$l = false;
  /* style inject SSR */
  

  
  var Step = normalizeComponent_1(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    browser,
    undefined
  );

var Steps = Vue.extend({
  name: 'Steps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  render: function render(h) {
    var _this = this;

    var steps = (this.$slots.default || []).filter(function (n) {
      return n.componentOptions !== undefined && n.componentOptions.tag.includes('step');
    }).map(function (n, i) {
      return h(Step, {
        directives: n.data.directives,
        class: [i + 1 === _this.$props.active ? 'active' : '']
      }, n.componentOptions.children);
    });
    return h('div', {
      class: 'step'
    }, steps);
  }
});

// fast apply, http://jsperf.lnkit.com/fast-apply/5
var _invoke = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

var _bind = Function.bind || function bind(that /* , ...args */) {
  var fn = _aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : _invoke(fn, args, that);
  };
  if (_isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)


_export(_export.P, 'Function', { bind: _bind });

var script$3 = Vue.extend({
  name: 'Tab',
  props: {
    badge: {
      type: [String, Number]
    }
  }
});

/* script */
const __vue_script__$m = script$3;

/* template */
var __vue_render__$m = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"tab-item"},[_c('a',{directives:[{name:"badge",rawName:"v-badge",value:(_vm.badge),expression:"badge"}]},[_vm._t("default")],2)])};
var __vue_staticRenderFns__$m = [];

  /* style */
  const __vue_inject_styles__$m = function (inject) {
    if (!inject) return
    inject("data-v-3d85d89c_0", { source: ".tab .tab-item{cursor:pointer;user-select:none}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$m = undefined;
  /* module identifier */
  const __vue_module_identifier__$m = undefined;
  /* functional template */
  const __vue_is_functional_template__$m = false;
  /* style inject SSR */
  

  
  var Tab = normalizeComponent_1(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    browser,
    undefined
  );

var createTab = function createTab(v, origin, key, isActive) {
  if (isActive === void 0) {
    isActive = false;
  }

  return v.$createElement(Tab, {
    props: origin.componentOptions.propsData,
    class: {
      active: isActive
    },
    nativeOn: {
      click: function click() {
        return !isActive && updateCurrent(key, v.$emit.bind(v));
      }
    }
  }, origin.componentOptions.children);
};

var createSimpleTab = function createSimpleTab(v, item, isActive) {
  return v.$createElement(Tab, {
    class: {
      active: isActive
    },
    nativeOn: {
      click: function click() {
        return !isActive && updateCurrent(item, v.$emit.bind(v));
      }
    }
  }, [item]);
};

var updateCurrent = function updateCurrent(current, emit) {
  emit('update:current', current);
};

var Tabs = Vue.extend({
  name: 'tabs',
  props: {
    current: {
      type: [String, Number]
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h) {
    var _this = this;

    var _a = this.$props,
        items = _a.items,
        current = _a.current,
        block = _a.block;
    var cssClass = {
      tab: true,
      'tab-block': block
    };
    var tabs = [];

    if (items.length) {
      tabs = items.map(function (item) {
        var isActive = current === item;
        return createSimpleTab(_this, item, isActive);
      });
      return h('div', {
        class: cssClass
      }, tabs);
    }

    var _b = this.$slots.default,
        children = _b === void 0 ? [] : _b;
    tabs = children.filter(function (child) {
      return child.componentOptions !== undefined && child.componentOptions.tag.includes('tab');
    }).map(function (tab, i) {
      var key = tab.key || i + 1;
      var isActive = current === key;
      return createTab(_this, tab, key, isActive);
    });
    var tabsActions = children.filter(function (child) {
      return child.tag !== undefined && child.tag.includes('tab-actions');
    }).map(function (n, i) {
      return h('span', {
        class: ['tab-item', 'tab-action']
      }, n.children);
    });
    return h('div', {
      class: cssClass
    }, [tabs, tabsActions]);
  }
});

var Tile =
/** @class */
function (_super) {
  __extends(Tile, _super);

  function Tile() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.iconSize = Sizes.x2;
    _this.avatarSize = exports.AvatarSizes.lg;
    return _this;
  }

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Tile.prototype, "title", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Tile.prototype, "subtitle", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Tile.prototype, "avatar", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Tile.prototype, "initials", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Tile.prototype, "icon", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Boolean,
    default: false
  }), __metadata("design:type", Boolean)], Tile.prototype, "compact", void 0);

  Tile = __decorate([vuePropertyDecorator.Component({
    components: {
      Icon: Icon$1,
      Avatar: Avatar$1
    }
  })], Tile);
  return Tile;
}(Vue);

/* script */
const __vue_script__$n = Tile;

/* template */
var __vue_render__$n = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tile",class:{'tile-centered': _vm.compact}},[_c('div',{staticClass:"tile-icon"},[(_vm.$slots.icon)?_vm._t("default"):(_vm.avatar || _vm.initials)?_c('avatar',{attrs:{"src":_vm.avatar,"initials":_vm.initials,"size":_vm.avatarSize}}):(_vm.icon)?_c('icon',{attrs:{"size":_vm.iconSize,"type":_vm.icon}}):_vm._e()],2),_vm._v(" "),_c('div',{staticClass:"tile-content"},[(_vm.title)?_c('p',{staticClass:"tile-title",domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_vm._v(" "),(_vm.subtitle)?_c('p',{staticClass:"tile-subtitle text-gray",domProps:{"innerHTML":_vm._s(_vm.subtitle)}}):_vm._e(),_vm._v(" "),(_vm.$slots.default)?_c('p',[_vm._t("default")],2):_vm._e()]),_vm._v(" "),(_vm.$slots.actions)?_c('div',{staticClass:"tile-action"},[_vm._t("actions")],2):_vm._e()])};
var __vue_staticRenderFns__$n = [];

  /* style */
  const __vue_inject_styles__$n = function (inject) {
    if (!inject) return
    inject("data-v-103a03d4_0", { source: ".tile .tile-icon .icon{display:flex;height:2rem;width:2rem}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$n = undefined;
  /* module identifier */
  const __vue_module_identifier__$n = undefined;
  /* functional template */
  const __vue_is_functional_template__$n = false;
  /* style inject SSR */
  

  
  var Tile$1 = normalizeComponent_1(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    browser,
    undefined
  );

var Toast =
/** @class */
function (_super) {
  __extends(Toast, _super);

  function Toast() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.shown = true;
    return _this;
  }

  Object.defineProperty(Toast.prototype, "typeClass", {
    get: function get() {
      return 'toast-' + this.type;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Toast.prototype, "iconClass", {
    get: function get() {
      return 'icon-' + this.icon;
    },
    enumerable: true,
    configurable: true
  });

  Toast.prototype.mounted = function () {
    var _this = this;

    if (this.autoclose) {
      setTimeout(function () {
        return _this.shown = false;
      }, this.autoclose);
    }
  };

  Toast.prototype.close = function () {
    this.shown = false;
  };

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Toast.prototype, "type", void 0);

  __decorate([vuePropertyDecorator.Prop(Number), __metadata("design:type", Number)], Toast.prototype, "autoclose", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Toast.prototype, "closeable", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Toast.prototype, "icon", void 0);

  __decorate([vuePropertyDecorator.Emit('closed'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Toast.prototype, "close", null);

  Toast = __decorate([vuePropertyDecorator.Component], Toast);
  return Toast;
}(Vue);

/* script */
const __vue_script__$o = Toast;

/* template */
var __vue_render__$o = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"fade"}},[(_vm.shown)?_c('div',{staticClass:"toast",class:_vm.typeClass},[(_vm.icon)?_c('icon',{attrs:{"type":_vm.icon}}):_vm._e(),_vm._v(" "),(_vm.closeable)?_c('button',{staticClass:"btn btn-clear float-right",on:{"click":function($event){return _vm.close()}}}):_vm._e(),_vm._v(" "),_vm._t("default")],2):_vm._e()])};
var __vue_staticRenderFns__$o = [];

  /* style */
  const __vue_inject_styles__$o = function (inject) {
    if (!inject) return
    inject("data-v-72565cea_0", { source: ".fade-enter-active[data-v-72565cea],.fade-leave-active[data-v-72565cea]{transition:opacity .5s}.fade-enter[data-v-72565cea],.fade-leave-to[data-v-72565cea]{opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$o = "data-v-72565cea";
  /* module identifier */
  const __vue_module_identifier__$o = undefined;
  /* functional template */
  const __vue_is_functional_template__$o = false;
  /* style inject SSR */
  

  
  var Toast$1 = normalizeComponent_1(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    browser,
    undefined
  );

var Navigation =
/** @class */
function (_super) {
  __extends(Navigation, _super);

  function Navigation() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Navigation.prototype.itemCssClass = function (_a) {
    var _b = _a.active,
        active = _b === void 0 ? false : _b;
    return [active ? 'active' : ''];
  };

  __decorate([vuePropertyDecorator.Prop({
    type: Array,
    required: true
  }), __metadata("design:type", Array)], Navigation.prototype, "items", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    default: -1
  }), __metadata("design:type", Object)], Navigation.prototype, "level", void 0);

  Navigation = __decorate([vuePropertyDecorator.Component({
    name: 'navigation'
  })], Navigation);
  return Navigation;
}(Vue);

/* script */
const __vue_script__$p = Navigation;

/* template */
var __vue_render__$p = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"nav"},_vm._l((_vm.items),function(item,index){return _c('li',{key:index,staticClass:"nav-item",class:_vm.itemCssClass(item)},[(_vm.$scopedSlots.default)?_vm._t("default",null,{"item":item,"index":index}):_c('a',{attrs:{"href":item.path}},[_vm._v(_vm._s(item.text))]),_vm._v(" "),(Array.isArray(item.items) && _vm.level != 0)?[(_vm.$scopedSlots.default)?_c('vs-nav',{attrs:{"items":item.items,"level":_vm.level - 1},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var item = ref.item;
var index = ref.index;
return [_vm._t("default",null,{"item":item,"index":index})]}}],null,true)}):_c('vs-nav',{attrs:{"items":item.items,"level":_vm.level - 1}})]:_vm._e()],2)}),0)};
var __vue_staticRenderFns__$p = [];

  /* style */
  const __vue_inject_styles__$p = undefined;
  /* scoped */
  const __vue_scope_id__$p = undefined;
  /* module identifier */
  const __vue_module_identifier__$p = undefined;
  /* functional template */
  const __vue_is_functional_template__$p = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Navigation$1 = normalizeComponent_1(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    undefined,
    undefined
  );

var Group =
/** @class */
function (_super) {
  __extends(Group, _super);

  function Group() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Group.prototype.render = function (h) {
    var _this = this;

    if (this.size) {
      (this.$slots.default || []).map(function (v) {
        // tslint:disable-next-line:max-line-length
        if (v.componentOptions && /^.*form-(label|input|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions.tag)) {
          v.componentOptions.propsData.size = v.componentOptions.propsData.size || _this.size;
        }
      });
    }

    if (this.disabled !== undefined) {
      (this.$slots.default || []).map(function (v) {
        // tslint:disable-next-line:max-line-length
        if (v.componentOptions && /^.*form-(input|textarea|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions.tag)) {
          v.componentOptions.propsData.disabled = _this.disabled;
        }
      });
    }

    var cssClass = ['form-group', this.error ? 'has-error' : '', this.success ? 'has-success' : ''];
    return h("div", {
      "class": cssClass
    }, [this.$slots.default]);
  };

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    validator: function validator(v) {
      return !v || ['lg', 'sm'].includes(v);
    }
  }), __metadata("design:type", String)], Group.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "disabled", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "error", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "success", void 0);

  Group = __decorate([vuePropertyDecorator.Component], Group);
  return Group;
}(vueTsxHelper.VueComponent);

var script$4 = Vue.extend({
  name: 'Hint',
  props: {
    error: Boolean,
    success: Boolean
  }
});

/* script */
const __vue_script__$q = script$4;

/* template */
var __vue_render__$q = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-input-hint",class:{error: _vm.error, success: _vm.success}},[_vm._t("default")],2)};
var __vue_staticRenderFns__$q = [];

  /* style */
  const __vue_inject_styles__$q = function (inject) {
    if (!inject) return
    inject("data-v-0355522b_0", { source: ".form-input-hint.error{display:none}.form-group.has-error .form-input-hint{display:none}.form-group.has-error .form-input-hint.error{display:initial}.form-group.has-success .form-input-hint.success{display:initial}", map: undefined, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$q = undefined;
  /* module identifier */
  const __vue_module_identifier__$q = undefined;
  /* functional template */
  const __vue_is_functional_template__$q = false;
  /* style inject SSR */
  

  
  var FormHint = normalizeComponent_1(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    browser,
    undefined
  );

var script$5 = Vue.extend({
  name: 'FormHorizontal'
});

/* script */
const __vue_script__$r = script$5;

/* template */
var __vue_render__$r = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-horizontal"},[_vm._t("default")],2)};
var __vue_staticRenderFns__$r = [];

  /* style */
  const __vue_inject_styles__$r = undefined;
  /* scoped */
  const __vue_scope_id__$r = undefined;
  /* module identifier */
  const __vue_module_identifier__$r = undefined;
  /* functional template */
  const __vue_is_functional_template__$r = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormHorizontal = normalizeComponent_1(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    undefined,
    undefined
  );

var script$6 = Vue.extend({
  name: 'Textarea',
  props: {
    value: String,
    disabled: Boolean
  },
  data: function data() {
    return {
      listeners: {}
    };
  },
  methods: {
    onInput: function onInput(_a) {
      var value = _a.target.value;
      this.$emit('input', value);
    }
  },
  computed: {
    placeholder: function placeholder() {
      return this.$attrs.placeholder || this.$slots.default && this.$slots.default[0].text;
    }
  },
  created: function created() {
    this.listeners = __assign(__assign({}, this.$listeners), {
      input: this.onInput
    });
  }
});

/* script */
const __vue_script__$s = script$6;

/* template */
var __vue_render__$s = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('textarea',_vm._g({staticClass:"form-input",attrs:{"placeholder":_vm.placeholder,"disabled":_vm.disabled},domProps:{"value":_vm.value},on:{"input":_vm.onInput}},_vm.listeners))};
var __vue_staticRenderFns__$s = [];

  /* style */
  const __vue_inject_styles__$s = undefined;
  /* scoped */
  const __vue_scope_id__$s = undefined;
  /* module identifier */
  const __vue_module_identifier__$s = undefined;
  /* functional template */
  const __vue_is_functional_template__$s = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormTextarea = normalizeComponent_1(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    undefined,
    undefined
  );

// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
_export(_export.S + _export.F * !_descriptors, 'Object', { defineProperties: _objectDps });

var f$4 = Object.getOwnPropertySymbols;

var _objectGops = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols



var Reflect$1 = _global.Reflect;
var _ownKeys = Reflect$1 && Reflect$1.ownKeys || function ownKeys(it) {
  var keys = _objectGopn.f(_anObject(it));
  var getSymbols = _objectGops.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

// https://github.com/tc39/proposal-object-getownpropertydescriptors






_export(_export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = _toIobject(object);
    var getDesc = _objectGopd.f;
    var keys = _ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) _createProperty(result, key, desc);
    }
    return result;
  }
});

var $forEach = _arrayMethods(0);
var STRICT = _strictMethod([].forEach, true);

_export(_export.P + _export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

var _global$1 = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core$1 = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1$1 = _core$1.version;

var _aFunction$1 = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx$1 = function (fn, that, length) {
  _aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var _isObject$1 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject$1 = function (it) {
  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails$1 = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors$1 = !_fails$1(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document$3 = _global$1.document;
// typeof document.createElement is 'object' in old IE
var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
var _domCreate$1 = function (it) {
  return is$1 ? document$3.createElement(it) : {};
};

var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive$1 = function (it, S) {
  if (!_isObject$1(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP$3 = Object.defineProperty;

var f$5 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject$1(O);
  P = _toPrimitive$1(P, true);
  _anObject$1(Attributes);
  if (_ie8DomDefine$1) try {
    return dP$3(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp$1 = {
	f: f$5
};

var _propertyDesc$1 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide$1 = _descriptors$1 ? function (object, key, value) {
  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty$1 = {}.hasOwnProperty;
var _has$1 = function (it, key) {
  return hasOwnProperty$1.call(it, key);
};

var PROTOTYPE$2 = 'prototype';

var $export$1 = function (type, name, source) {
  var IS_FORCED = type & $export$1.F;
  var IS_GLOBAL = type & $export$1.G;
  var IS_STATIC = type & $export$1.S;
  var IS_PROTO = type & $export$1.P;
  var IS_BIND = type & $export$1.B;
  var IS_WRAP = type & $export$1.W;
  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
  var expProto = exports[PROTOTYPE$2];
  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$2];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && _has$1(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? _ctx$1(out, _global$1)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE$2] = C[PROTOTYPE$2];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export$1.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
    }
  }
};
// type bitmap
$export$1.F = 1;   // forced
$export$1.G = 2;   // global
$export$1.S = 4;   // static
$export$1.P = 8;   // proto
$export$1.B = 16;  // bind
$export$1.W = 32;  // wrap
$export$1.U = 64;  // safe
$export$1.R = 128; // real proto method for `library`
var _export$1 = $export$1;

// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
_export$1(_export$1.S + _export$1.F * !_descriptors$1, 'Object', { defineProperty: _objectDp$1.f });

var $Object = _core$1.Object;
var defineProperty = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

var defineProperty$1 = defineProperty;

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    defineProperty$1(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

(function (Types) {
  Types["switch"] = "form-switch";
  Types["checkbox"] = "form-checkbox";
})(exports.FormCheckboxTypes || (exports.FormCheckboxTypes = {}));

(function (Sizes) {
  Sizes["sm"] = "input-sm";
  Sizes["lg"] = "input-lg";
})(exports.FormCheckboxSizes || (exports.FormCheckboxSizes = {}));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Checkbox =
/** @class */
function (_super) {
  __extends(Checkbox, _super);

  function Checkbox() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Checkbox.prototype.render = function (h) {
    var cssClass = [exports.FormCheckboxTypes[this.type] || 'form-checkbox', this.inline ? 'form-inline' : '', this.error ? 'is-error' : false, exports.FormCheckboxSizes[this.size]];
    return h("label", {
      "class": cssClass
    }, [h("input", {
      "attrs": {
        "type": "checkbox",
        "disabled": this.disabled
      },
      "on": _objectSpread({
        "change": this.update
      }, __assign(__assign({}, this.$listeners), {
        change: this.onChange
      })),
      "domProps": {
        "checked": this._checked
      }
    }), h("i", {
      "class": "form-icon"
    }), this.$slots.default || this.label || this.value]);
  };

  Checkbox.prototype.onChange = function (_a) {
    var _this = this;

    var checked = _a.target.checked;

    if (this.model === undefined || !Array.isArray(this.model)) {
      return this.$emit('input', checked ? this.value : false);
    }

    if (checked) {
      this.$emit('input', __spread(this.model, [this.value]));
    } else {
      this.$emit('input', this.model.filter(function (option) {
        return option !== _this.value;
      }));
    }
  };

  Object.defineProperty(Checkbox.prototype, "_checked", {
    get: function get() {
      if (!Array.isArray(this.model)) {
        return this.checked || this.model && this.model === this.value;
      }

      return this.model.includes(this.value);
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop([String, Number]), __metadata("design:type", Object)], Checkbox.prototype, "label", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Checkbox.prototype, "checked", void 0);

  __decorate([vuePropertyDecorator.Prop({
    default: true
  }), __metadata("design:type", Object)], Checkbox.prototype, "value", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Checkbox.prototype, "disabled", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    validator: function validator(v) {
      return Object.keys(exports.FormCheckboxTypes).includes(v);
    }
  }), __metadata("design:type", String)], Checkbox.prototype, "type", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Checkbox.prototype, "inline", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Checkbox.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Checkbox.prototype, "error", void 0);

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Object)], Checkbox.prototype, "model", void 0);

  Checkbox = __decorate([vuePropertyDecorator.Component({
    model: {
      event: 'input',
      prop: 'model'
    }
  })], Checkbox);
  return Checkbox;
}(vueTsxHelper.VueComponent);

var _arrayReduce = function (that, callbackfn, aLen, memo, isRight) {
  _aFunction(callbackfn);
  var O = _toObject(that);
  var self = _iobject(O);
  var length = _toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

_export(_export.P + _export.F * !_strictMethod([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return _arrayReduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

var Group$1 =
/** @class */
function (_super) {
  __extends(Group, _super);

  function Group() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Group.prototype.render = function (h) {
    var _this = this;

    var group;

    if (this.options) {
      group = this.normalizeOptions(this.options).map(function (_a) {
        var label = _a.label,
            value = _a.value;
        return h(Checkbox, {
          "attrs": {
            "label": label,
            "value": value,
            "inline": _this.inline,
            "type": _this.type,
            "size": _this.size,
            "disabled": _this.disabled,
            "error": _this.error
          },
          "model": _this.value,
          "on": {
            "input": _this.update
          }
        });
      });
    } else {
      group = (this.$slots.default || []).filter(function (_a) {
        var componentOptions = _a.componentOptions;
        return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-checkbox');
      }).map(function (option) {
        var props = option.componentOptions.propsData || {};
        props.model = _this.value;
        props.inline = _this.inline || props.inline;
        props.type = _this.type || props.type;
        props.size = props.size !== undefined ? props.size : _this.size;
        props.disabled = props.disabled !== undefined ? props.disabled : _this.disabled;
        props.error = props.error !== undefined ? props.error : _this.error;
        option.componentOptions.listeners = __assign(__assign({}, option.componentOptions.listeners), {
          input: _this.update
        });
        return option;
      });
    }

    return h("div", [group]);
  };

  Group.prototype.update = function (value) {
    this.$emit('input', value);
  };

  Group.prototype.normalizeOptions = function (options) {
    var e_1, _a;

    if (Array.isArray(options)) {
      return options.reduce(function (normal, value) {
        return __spread(normal, [{
          value: value,
          label: value
        }]);
      }, []);
    }

    var normalized = [];

    try {
      for (var _b = __values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var label = _c.value;
        normalized.push({
          label: label,
          value: options[label]
        });
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return normalized;
  };

  __decorate([vuePropertyDecorator.Prop([Array, Object]), __metadata("design:type", Object)], Group.prototype, "options", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: Array,
    default: function _default() {
      return [];
    }
  }), __metadata("design:type", Array)], Group.prototype, "value", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "inline", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Group.prototype, "type", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Group.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "disabled", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "error", void 0);

  Group = __decorate([vuePropertyDecorator.Component], Group);
  return Group;
}(vueTsxHelper.VueComponent);

(function (Sizes) {
  Sizes["sm"] = "input-sm";
  Sizes["lg"] = "input-lg";
})(exports.FormInputSizes || (exports.FormInputSizes = {}));

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Input =
/** @class */
function (_super) {
  __extends(Input, _super);

  function Input() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Input.prototype.render = function (h) {
    var cssClass = ['form-input', this.error ? 'is-error' : false, this.success ? 'is-success' : false, exports.FormInputSizes[this.size]];
    return h("input", {
      "class": cssClass,
      "domProps": _objectSpread$1({}, {
        value: this.value
      }),
      "on": _objectSpread$1({}, this.on),
      "attrs": _objectSpread$1({}, this.attrs)
    });
  };

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    validator: function validator(size) {
      return Object.keys(exports.FormInputSizes).includes(size);
    }
  }), __metadata("design:type", String)], Input.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Object)], Input.prototype, "attrs", void 0);

  __decorate([vuePropertyDecorator.Prop([String, Number]), __metadata("design:type", Object)], Input.prototype, "value", void 0);

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Object)], Input.prototype, "on", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Input.prototype, "error", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Input.prototype, "success", void 0);

  Input = __decorate([vuePropertyDecorator.Component], Input);
  return Input;
}(vueTsxHelper.VueComponent);

var Icon$2 =
/** @class */
function (_super) {
  __extends(Icon, _super);

  function Icon() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Icon.prototype.render = function (h) {
    return h("i", {
      "class": ['form-icon', 'icon', Icons[this.icon]]
    });
  };

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", String)], Icon.prototype, "icon", void 0);

  Icon = __decorate([vuePropertyDecorator.Component], Icon);
  return Icon;
}(vueTsxHelper.VueComponent);

var IconSide;

(function (IconSide) {
  IconSide["left"] = "has-icon-left";
  IconSide["right"] = "has-icon-right";
})(IconSide || (IconSide = {}));

var IconContainer =
/** @class */
function (_super) {
  __extends(IconContainer, _super);

  function IconContainer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  IconContainer.prototype.render = function (h) {
    return h("div", {
      "class": IconSide[this.side]
    }, [this.$slots.default]);
  };

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    validator: function validator(side) {
      return Object.keys(IconSide).includes(side);
    }
  }), __metadata("design:type", String)], IconContainer.prototype, "side", void 0);

  IconContainer = __decorate([vuePropertyDecorator.Component], IconContainer);
  return IconContainer;
}(vueTsxHelper.VueComponent);

var Loading = Vue.extend({
  render: function render(h) {
    return h("i", {
      "class": "form-icon loading"
    });
  }
});

var Component$1 = Vue.extend({
  name: 'FormInput',
  props: {
    value: [String, Number],
    error: Boolean,
    loading: Boolean,
    success: Boolean,
    icon: String,
    disabled: Boolean,
    iconSide: {
      type: String,
      validator: function validator(side) {
        return Object.keys(IconSide).includes(side);
      }
    },
    size: {
      type: String,
      validator: function validator(size) {
        return Object.keys(exports.FormInputSizes).includes(size);
      }
    }
  },
  inheritAttrs: false,
  methods: {
    onInput: function onInput(_a) {
      var value = _a.target.value;
      this.$emit('input', value);
    }
  },
  render: function render(h) {
    var _a = this.$props,
        icon = _a.icon,
        iconSide = _a.iconSide,
        loading = _a.loading,
        size = _a.size,
        disabled = _a.disabled;
    var input = h(Input, _mergeJSXProps([{
      "attrs": {
        "size": size
      }
    }, {
      "attrs": __assign(__assign({}, this.$attrs), {
        disabled: disabled
      })
    }, {
      "attrs": {
        "value": this.value,
        "error": this.error,
        "success": this.success
      }
    }, {
      "on": __assign(__assign({}, this.$listeners), {
        input: this.onInput
      })
    }]));

    if (icon || loading) {
      return h(IconContainer, {
        "attrs": {
          "side": iconSide || 'right'
        }
      }, [input, loading && h(Loading), !loading && h(Icon$2, {
        "attrs": {
          "icon": icon
        }
      })]);
    }

    return input;
  }
});

(function (LabelSizes) {
  LabelSizes["sm"] = "label-sm";
  LabelSizes["lg"] = "label-lg";
})(exports.FormLabelSizes || (exports.FormLabelSizes = {}));

var script$7 = Vue.extend({
  name: 'FormLabel',
  props: {
    size: {
      type: String,
      validator: function validator(v) {
        return !v || Object.keys(exports.FormLabelSizes).includes(v);
      }
    }
  },
  computed: {
    cssClass: function cssClass() {
      return ['form-label', exports.FormLabelSizes[this.size] || ''];
    }
  }
});

/* script */
const __vue_script__$t = script$7;

/* template */
var __vue_render__$t = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.cssClass},[_vm._t("default")],2)};
var __vue_staticRenderFns__$t = [];

  /* style */
  const __vue_inject_styles__$t = undefined;
  /* scoped */
  const __vue_scope_id__$t = undefined;
  /* module identifier */
  const __vue_module_identifier__$t = undefined;
  /* functional template */
  const __vue_is_functional_template__$t = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormLabel = normalizeComponent_1(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    undefined,
    undefined
  );

var Sizes$2;

(function (Sizes) {
  Sizes["sm"] = "input-sm";
  Sizes["lg"] = "input-lg";
})(Sizes$2 || (Sizes$2 = {}));

var Radio =
/** @class */
function (_super) {
  __extends(Radio, _super);

  function Radio() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Radio.prototype.onChecked = function (e) {
    this.$emit('change', this._value);
  };

  Radio.prototype.render = function (h) {
    var cssClass = ['form-radio', this.inline ? 'form-inline' : false, this.error ? 'is-error' : false, Sizes$2[this.size]];
    return h("label", {
      "class": cssClass
    }, [h("input", {
      "attrs": {
        "type": "radio",
        "disabled": this.disabled,
        "name": this.name
      },
      "domProps": {
        "checked": this.checked || this.model === this._value
      },
      "on": {
        "change": this.onChecked
      }
    }), h("i", {
      "class": "form-icon"
    }), " ", this._label]);
  };

  Object.defineProperty(Radio.prototype, "_label", {
    get: function get() {
      return this.$slots.default || this.label || this._value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Radio.prototype, "_value", {
    get: function get() {
      return this.value || this.$slots.default && this.$slots.default[0].text || this.label;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Object)], Radio.prototype, "value", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Radio.prototype, "label", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Radio.prototype, "name", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Radio.prototype, "checked", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Radio.prototype, "inline", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Radio.prototype, "error", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    validator: function validator(size) {
      return Object.keys(Sizes$2).includes(size);
    }
  }), __metadata("design:type", String)], Radio.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Radio.prototype, "disabled", void 0);

  __decorate([vuePropertyDecorator.Prop([String, Boolean, Object, Number, Array]), __metadata("design:type", Object)], Radio.prototype, "model", void 0);

  Radio = __decorate([vuePropertyDecorator.Component({
    model: {
      prop: 'model',
      event: 'change'
    }
  })], Radio);
  return Radio;
}(vueTsxHelper.VueComponent);

var Group$2 =
/** @class */
function (_super) {
  __extends(Group, _super);

  function Group() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Group.prototype.render = function (h) {
    var _this = this;

    var name = this.name || this.uid;
    var group;

    if (this.options) {
      group = this.normalizeOptions(this.options).map(function (_a) {
        var label = _a.label,
            value = _a.value;
        return h(Radio, {
          "attrs": {
            "name": name,
            "label": label,
            "value": value,
            "error": _this.error,
            "inline": _this.inline,
            "size": _this.size,
            "disabled": _this.disabled
          },
          "on": {
            "change": _this.update
          },
          "model": _this.value
        });
      });
    } else {
      group = (this.$slots.default || []).filter(function (_a) {
        var componentOptions = _a.componentOptions;
        return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-radio');
      }).map(function (option) {
        var props = option.componentOptions.propsData || {};
        props.name = name;
        props.size = props.size !== undefined ? props.size : _this.size;
        props.disabled = props.disabled !== undefined ? props.disabled : _this.disabled;
        props.error = props.error !== undefined ? props.error : _this.error;
        props.inline = _this.inline || props.inline;
        props.model = _this.value;
        option.componentOptions.listeners = __assign(__assign({}, option.componentOptions.listeners), {
          change: _this.update
        });
        return option;
      });
    }

    return h("div", [group]);
  };

  Group.prototype.update = function (value) {
    this.$emit('input', value);
  };

  Object.defineProperty(Group.prototype, "uid", {
    get: function get() {
      return 'radio-group-' + Math.round(Math.random() * 1000);
    },
    enumerable: true,
    configurable: true
  });

  Group.prototype.normalizeOptions = function (options) {
    var e_1, _a;

    if (Array.isArray(options)) {
      return options.reduce(function (normal, value) {
        return __spread(normal, [{
          value: value,
          label: value
        }]);
      }, []);
    }

    var normalized = [];

    try {
      for (var _b = __values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var label = _c.value;
        normalized.push({
          label: label,
          value: options[label]
        });
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return normalized;
  };

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Object)], Group.prototype, "options", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Group.prototype, "name", void 0);

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Object)], Group.prototype, "value", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "inline", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Group.prototype, "size", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "error", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "disabled", void 0);

  Group = __decorate([vuePropertyDecorator.Component], Group);
  return Group;
}(vueTsxHelper.VueComponent);

var $some = _arrayMethods(3);

_export(_export.P + _export.F * !_strictMethod([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

var Option =
/** @class */
function (_super) {
  __extends(Option, _super);

  function Option() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Option.prototype.render = function (h) {
    var _a = this.$props,
        selected = _a.selected,
        disabled = _a.disabled,
        value = _a.value,
        label = _a.label;
    return h("option", {
      "domProps": {
        "selected": selected,
        "value": value
      },
      "attrs": {
        "disabled": disabled
      }
    }, [this.$slots.default || label || value]);
  };

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Option.prototype, "disabled", void 0);

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Object)], Option.prototype, "value", void 0);

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Object)], Option.prototype, "label", void 0);

  __decorate([vuePropertyDecorator.Prop(), __metadata("design:type", Boolean)], Option.prototype, "selected", void 0);

  Option = __decorate([vuePropertyDecorator.Component], Option);
  return Option;
}(vueTsxHelper.VueComponent);

var Sizes$3;

(function (Sizes) {
  Sizes["sm"] = "select-sm";
  Sizes["lg"] = "select-lg";
})(Sizes$3 || (Sizes$3 = {}));

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Select =
/** @class */
function (_super) {
  __extends(Select, _super);

  function Select() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Select.prototype.mounted = function () {
    if (!this.options && !this.$slots.default) {
      throw new TypeError('Component could not be created without options');
    }
  };

  Select.prototype.render = function (h) {
    var _this = this;

    var options = [];

    if (this.options) {
      options = this.normalizeOptions(this.options).map(function (_a) {
        var label = _a.label,
            value = _a.value;
        return h(Option, {
          "attrs": {
            "selected": _this.isSelected(label, value),
            "label": label,
            "value": value
          }
        });
      });
    } else {
      options = (this.$slots.default || []).filter(function (_a) {
        var componentOptions = _a.componentOptions;
        return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-option');
      }).map(function (option) {
        var props = option.componentOptions.propsData;
        var value = props.value || option.componentOptions.children[0].text;
        props.selected = props.selected !== undefined ? props.selected : _this.isSelected(props.label, value);
        return option;
      });
    }

    if (this.placeholder && !this.multiple) {
      options.unshift(h(Option, {
        "attrs": {
          "value": "",
          "disabled": true,
          "selected": true
        }
      }, [this.placeholder]));
    }

    var cssClass = ['form-select', Sizes$3[this.scale], this.error ? 'is-error' : '', this.success ? 'is-success' : ''];
    return h("select", {
      "class": cssClass,
      "attrs": {
        "multiple": this.multiple,
        "disabled": this.disabled
      },
      "on": _objectSpread$2({}, this.listeners)
    }, [options]);
  };

  Object.defineProperty(Select.prototype, "listeners", {
    get: function get() {
      return __assign(__assign({}, this.$listeners), {
        change: this.onInput
      });
    },
    enumerable: true,
    configurable: true
  });

  Select.prototype.onInput = function (_a) {
    var selectedOptions = _a.target.selectedOptions;

    if (this.multiple) {
      var selected = __spread(selectedOptions).map(function (option) {
        return option.value || option.innerHTML;
      });

      this.$emit('input', selected);
    } else {
      this.$emit('input', selectedOptions[0].value);
    }
  }; // tslint:disable-next-line:max-line-length


  Select.prototype.isSelected = function (label, value, current) {
    var _this = this;

    if (current === void 0) {
      current = this.value;
    }

    if (current instanceof Array) {
      return current.some(function (v) {
        return _this.isSelected(label, value, v);
      });
    }

    return label !== undefined && current.toString() === label.toString() || value !== undefined && current.toString() === value.toString();
  };

  Select.prototype.normalizeOptions = function (options) {
    var e_1, _a;

    if (Array.isArray(options)) {
      return options.reduce(function (normal, value) {
        return __spread(normal, [{
          value: value,
          label: value
        }]);
      }, []);
    }

    var normalized = [];

    try {
      for (var _b = __values(Object.keys(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var label = _c.value;
        normalized.push({
          label: label,
          value: options[label]
        });
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return normalized;
  };

  __decorate([vuePropertyDecorator.Prop([Array, Object]), __metadata("design:type", Object)], Select.prototype, "options", void 0);

  __decorate([vuePropertyDecorator.Prop({
    default: ''
  }), __metadata("design:type", Object)], Select.prototype, "value", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Select.prototype, "multiple", void 0);

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], Select.prototype, "placeholder", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: String,
    validator: function validator(size) {
      return Object.keys(Sizes$3).includes(size);
    }
  }), __metadata("design:type", String)], Select.prototype, "scale", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Select.prototype, "error", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Select.prototype, "success", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], Select.prototype, "disabled", void 0);

  Select = __decorate([vuePropertyDecorator.Component], Select);
  return Select;
}(vueTsxHelper.VueComponent);

var components = {
  Avatar: Avatar$1,
  Accordion: Accordion$1,
  Bar: Bar$1,
  Breadcrumb: Breadcrumb$1,
  Btn: Btn,
  BtnGroup: BtnGroup,
  Card: Card$1,
  Chip: Chip$1,
  Divider: Divider$1,
  DropdownMenu: DropdownMenu$1,
  Empty: Empty$2,
  Icon: Icon$1,
  Modal: Modal$1,
  OffCanvas: OffCanvas$1,
  Pagination: Pagination$1,
  Panel: Panel,
  Popover: Popover,
  Step: Step,
  Steps: Steps,
  Tab: Tab,
  Tabs: Tabs,
  Tile: Tile$1,
  Toast: Toast$1,
  Tag: Tag,
  Navigation: Navigation$1,
  VerticalMenu: VerticalMenu$1,
  FormCheckbox: Checkbox,
  FormCheckboxGroup: Group$1,
  FormGroup: Group,
  FormInput: Component$1,
  FormLabel: FormLabel,
  FormHint: FormHint,
  FormHorizontal: FormHorizontal,
  FormOption: Option,
  FormSelect: Select,
  FormTextarea: FormTextarea,
  FormRadioGroup: Group$2,
  FormRadio: Radio
};

var sizeValidator = function sizeValidator(size) {
  return size % 1 === 0 && size > 0 && size <= 12;
};

var default_1 =
/** @class */
function (_super) {
  __extends(default_1, _super);

  function default_1() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(default_1.prototype, "cssClass", {
    get: function get() {
      return [this.mr ? 'col-mr-auto' : '', this.ml ? 'col-ml-auto' : '', this.mx ? 'col-mx-auto' : '', this.xs ? "col-xs-" + this.xs : '', this.sm ? "col-sm-" + this.sm : '', this.md ? "col-md-" + this.md : '', this.lg ? "col-lg-" + this.lg : '', this.xl ? "col-xl-" + this.xl : '', this.col ? "col-" + this.col : '', this.hide ? "hide-" + this.hide : '', this.show ? "show-" + this.show : ''];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "ml", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "mx", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "mr", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "xs", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "sm", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "md", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "lg", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "xl", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "col", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "hide", void 0);

  __decorate([vuePropertyDecorator.Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "show", void 0);

  default_1 = __decorate([Component], default_1);
  return default_1;
}(Vue);

/* script */
const __vue_script__$u = default_1;

/* template */
var __vue_render__$u = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"column",class:_vm.cssClass},[_vm._t("default")],2)};
var __vue_staticRenderFns__$u = [];

  /* style */
  const __vue_inject_styles__$u = undefined;
  /* scoped */
  const __vue_scope_id__$u = undefined;
  /* module identifier */
  const __vue_module_identifier__$u = undefined;
  /* functional template */
  const __vue_is_functional_template__$u = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Column = normalizeComponent_1(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    undefined,
    undefined
  );

var default_1$1 =
/** @class */
function (_super) {
  __extends(default_1, _super);

  function default_1() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(default_1.prototype, "cssClass", {
    get: function get() {
      return [this.gapless ? 'col-gapless' : '', this.oneline ? 'col-oneline' : ''];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "gapless", void 0);

  __decorate([vuePropertyDecorator.Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "oneline", void 0);

  default_1 = __decorate([Component], default_1);
  return default_1;
}(Vue);

/* script */
const __vue_script__$v = default_1$1;

/* template */
var __vue_render__$v = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"columns",class:_vm.cssClass},[_vm._t("default")],2)};
var __vue_staticRenderFns__$v = [];

  /* style */
  const __vue_inject_styles__$v = undefined;
  /* scoped */
  const __vue_scope_id__$v = undefined;
  /* module identifier */
  const __vue_module_identifier__$v = undefined;
  /* functional template */
  const __vue_is_functional_template__$v = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Columns = normalizeComponent_1(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    undefined,
    undefined
  );

var Grids;

(function (Grids) {
  Grids["xs"] = "grid-xs";
  Grids["sm"] = "grid-sm";
  Grids["md"] = "grid-md";
  Grids["lg"] = "grid-lg";
  Grids["xl"] = "grid-xl";
})(Grids || (Grids = {}));

var default_1$2 =
/** @class */
function (_super) {
  __extends(default_1, _super);

  function default_1() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(default_1.prototype, "cssClass", {
    get: function get() {
      return [Grids[this.grid]];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([vuePropertyDecorator.Prop(String), __metadata("design:type", String)], default_1.prototype, "grid", void 0);

  default_1 = __decorate([Component], default_1);
  return default_1;
}(Vue);

/* script */
const __vue_script__$w = default_1$2;

/* template */
var __vue_render__$w = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container",class:_vm.cssClass},[_vm._t("default")],2)};
var __vue_staticRenderFns__$w = [];

  /* style */
  const __vue_inject_styles__$w = undefined;
  /* scoped */
  const __vue_scope_id__$w = undefined;
  /* module identifier */
  const __vue_module_identifier__$w = undefined;
  /* functional template */
  const __vue_is_functional_template__$w = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Container = normalizeComponent_1(
    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
    __vue_inject_styles__$w,
    __vue_script__$w,
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    undefined,
    undefined
  );

var layout = {
  Container: Container,
  Columns: Columns,
  Column: Column
};

// 7.1.4 ToInteger
var ceil$1 = Math.ceil;
var floor$1 = Math.floor;
var _toInteger$1 = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
};

// 7.2.1 RequireObjectCoercible(argument)
var _defined$1 = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// true  -> String#at
// false -> String#codePointAt
var _stringAt$1 = function (TO_STRING) {
  return function (that, pos) {
    var s = String(_defined$1(that));
    var i = _toInteger$1(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

var _library = true;

var _redefine$1 = _hide$1;

var toString$1 = {}.toString;

var _cof$1 = function (it) {
  return toString$1.call(it).slice(8, -1);
};

// fallback for non-array-like ES3 and non-enumerable old V8 strings

// eslint-disable-next-line no-prototype-builtins
var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return _cof$1(it) == 'String' ? it.split('') : Object(it);
};

// to indexed object, toObject with fallback for non-array-like ES3 strings


var _toIobject$1 = function (it) {
  return _iobject$1(_defined$1(it));
};

// 7.1.15 ToLength

var min$2 = Math.min;
var _toLength$1 = function (it) {
  return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

var max$1 = Math.max;
var min$3 = Math.min;
var _toAbsoluteIndex$1 = function (index, length) {
  index = _toInteger$1(index);
  return index < 0 ? max$1(index + length, 0) : min$3(index, length);
};

// false -> Array#indexOf
// true  -> Array#includes



var _arrayIncludes$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = _toIobject$1($this);
    var length = _toLength$1(O.length);
    var index = _toAbsoluteIndex$1(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var _shared$1 = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global$1[SHARED] || (_global$1[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core$1.version,
  mode:  'pure' ,
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var id$1 = 0;
var px$1 = Math.random();
var _uid$1 = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px$1).toString(36));
};

var shared$1 = _shared$1('keys');

var _sharedKey$1 = function (key) {
  return shared$1[key] || (shared$1[key] = _uid$1(key));
};

var arrayIndexOf$1 = _arrayIncludes$1(false);
var IE_PROTO$3 = _sharedKey$1('IE_PROTO');

var _objectKeysInternal$1 = function (object, names) {
  var O = _toIobject$1(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO$3) _has$1(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has$1(O, key = names[i++])) {
    ~arrayIndexOf$1(result, key) || result.push(key);
  }
  return result;
};

// IE 8- don't enum bug keys
var _enumBugKeys$1 = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

// 19.1.2.14 / 15.2.3.14 Object.keys(O)



var _objectKeys$1 = Object.keys || function keys(O) {
  return _objectKeysInternal$1(O, _enumBugKeys$1);
};

var _objectDps$1 = _descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
  _anObject$1(O);
  var keys = _objectKeys$1(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) _objectDp$1.f(O, P = keys[i++], Properties[P]);
  return O;
};

var document$4 = _global$1.document;
var _html$1 = document$4 && document$4.documentElement;

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



var IE_PROTO$4 = _sharedKey$1('IE_PROTO');
var Empty$3 = function () { /* empty */ };
var PROTOTYPE$3 = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict$1 = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = _domCreate$1('iframe');
  var i = _enumBugKeys$1.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  _html$1.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict$1 = iframeDocument.F;
  while (i--) delete createDict$1[PROTOTYPE$3][_enumBugKeys$1[i]];
  return createDict$1();
};

var _objectCreate$1 = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty$3[PROTOTYPE$3] = _anObject$1(O);
    result = new Empty$3();
    Empty$3[PROTOTYPE$3] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$4] = O;
  } else result = createDict$1();
  return Properties === undefined ? result : _objectDps$1(result, Properties);
};

var _wks$1 = createCommonjsModule(function (module) {
var store = _shared$1('wks');

var Symbol = _global$1.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid$1)('Symbol.' + name));
};

$exports.store = store;
});

var def$1 = _objectDp$1.f;

var TAG$2 = _wks$1('toStringTag');

var _setToStringTag$1 = function (it, tag, stat) {
  if (it && !_has$1(it = stat ? it : it.prototype, TAG$2)) def$1(it, TAG$2, { configurable: true, value: tag });
};

var IteratorPrototype$1 = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
_hide$1(IteratorPrototype$1, _wks$1('iterator'), function () { return this; });

var _iterCreate$1 = function (Constructor, NAME, next) {
  Constructor.prototype = _objectCreate$1(IteratorPrototype$1, { next: _propertyDesc$1(1, next) });
  _setToStringTag$1(Constructor, NAME + ' Iterator');
};

// 7.1.13 ToObject(argument)

var _toObject$1 = function (it) {
  return Object(_defined$1(it));
};

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


var IE_PROTO$5 = _sharedKey$1('IE_PROTO');
var ObjectProto$1 = Object.prototype;

var _objectGpo$1 = Object.getPrototypeOf || function (O) {
  O = _toObject$1(O);
  if (_has$1(O, IE_PROTO$5)) return O[IE_PROTO$5];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto$1 : null;
};

var ITERATOR$5 = _wks$1('iterator');
var BUGGY$1 = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR$1 = '@@iterator';
var KEYS$1 = 'keys';
var VALUES$1 = 'values';

var _iterDefine$1 = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  _iterCreate$1(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY$1 && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS$1: return function keys() { return new Constructor(this, kind); };
      case VALUES$1: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES$1;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR$5] || proto[FF_ITERATOR$1] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = _objectGpo$1($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      _setToStringTag$1(IteratorPrototype, TAG, true);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES$1) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if (( FORCED) && (BUGGY$1 || VALUES_BUG || !proto[ITERATOR$5])) {
    _hide$1(proto, ITERATOR$5, $default);
  }
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES$1),
      keys: IS_SET ? $default : getMethod(KEYS$1),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) _redefine$1(proto, key, methods[key]);
    } else _export$1(_export$1.P + _export$1.F * (BUGGY$1 || VALUES_BUG), NAME, methods);
  }
  return methods;
};

var $at$1 = _stringAt$1(true);

// 21.1.3.27 String.prototype[@@iterator]()
_iterDefine$1(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at$1(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

var _iterStep$1 = function (done, value) {
  return { value: value, done: !!done };
};

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
var es6_array_iterator$1 = _iterDefine$1(Array, 'Array', function (iterated, kind) {
  this._t = _toIobject$1(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return _iterStep$1(1);
  }
  if (kind == 'keys') return _iterStep$1(0, index);
  if (kind == 'values') return _iterStep$1(0, O[index]);
  return _iterStep$1(0, [index, O[index]]);
}, 'values');

var TO_STRING_TAG$1 = _wks$1('toStringTag');

var DOMIterables$1 = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i$1 = 0; i$1 < DOMIterables$1.length; i$1++) {
  var NAME$2 = DOMIterables$1[i$1];
  var Collection$1 = _global$1[NAME$2];
  var proto$2 = Collection$1 && Collection$1.prototype;
  if (proto$2 && !proto$2[TO_STRING_TAG$1]) _hide$1(proto$2, TO_STRING_TAG$1, NAME$2);
}

var f$6 = _wks$1;

var _wksExt = {
	f: f$6
};

var iterator = _wksExt.f('iterator');

var iterator$1 = iterator;

var _meta = createCommonjsModule(function (module) {
var META = _uid$1('meta');


var setDesc = _objectDp$1.f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !_fails$1(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!_isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!_has$1(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!_has$1(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !_has$1(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});
var _meta_1 = _meta.KEY;
var _meta_2 = _meta.NEED;
var _meta_3 = _meta.fastKey;
var _meta_4 = _meta.getWeak;
var _meta_5 = _meta.onFreeze;

var defineProperty$2 = _objectDp$1.f;
var _wksDefine = function (name) {
  var $Symbol = _core$1.Symbol || (_core$1.Symbol =  {} );
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty$2($Symbol, name, { value: _wksExt.f(name) });
};

var f$7 = Object.getOwnPropertySymbols;

var _objectGops$1 = {
	f: f$7
};

var f$8 = {}.propertyIsEnumerable;

var _objectPie$1 = {
	f: f$8
};

// all enumerable object keys, includes symbols



var _enumKeys = function (it) {
  var result = _objectKeys$1(it);
  var getSymbols = _objectGops$1.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = _objectPie$1.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

// 7.2.2 IsArray(argument)

var _isArray$1 = Array.isArray || function isArray(arg) {
  return _cof$1(arg) == 'Array';
};

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

var hiddenKeys$1 = _enumBugKeys$1.concat('length', 'prototype');

var f$9 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return _objectKeysInternal$1(O, hiddenKeys$1);
};

var _objectGopn$1 = {
	f: f$9
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window

var gOPN$1 = _objectGopn$1.f;
var toString$2 = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN$1(it);
  } catch (e) {
    return windowNames.slice();
  }
};

var f$a = function getOwnPropertyNames(it) {
  return windowNames && toString$2.call(it) == '[object Window]' ? getWindowNames(it) : gOPN$1(_toIobject$1(it));
};

var _objectGopnExt = {
	f: f$a
};

var gOPD$2 = Object.getOwnPropertyDescriptor;

var f$b = _descriptors$1 ? gOPD$2 : function getOwnPropertyDescriptor(O, P) {
  O = _toIobject$1(O);
  P = _toPrimitive$1(P, true);
  if (_ie8DomDefine$1) try {
    return gOPD$2(O, P);
  } catch (e) { /* empty */ }
  if (_has$1(O, P)) return _propertyDesc$1(!_objectPie$1.f.call(O, P), O[P]);
};

var _objectGopd$1 = {
	f: f$b
};

// ECMAScript 6 symbols shim





var META = _meta.KEY;





















var gOPD$3 = _objectGopd$1.f;
var dP$4 = _objectDp$1.f;
var gOPN$2 = _objectGopnExt.f;
var $Symbol = _global$1.Symbol;
var $JSON = _global$1.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE$4 = 'prototype';
var HIDDEN = _wks$1('_hidden');
var TO_PRIMITIVE = _wks$1('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = _shared$1('symbol-registry');
var AllSymbols = _shared$1('symbols');
var OPSymbols = _shared$1('op-symbols');
var ObjectProto$2 = Object[PROTOTYPE$4];
var USE_NATIVE = typeof $Symbol == 'function' && !!_objectGops$1.f;
var QObject = _global$1.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE$4] || !QObject[PROTOTYPE$4].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = _descriptors$1 && _fails$1(function () {
  return _objectCreate$1(dP$4({}, 'a', {
    get: function () { return dP$4(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD$3(ObjectProto$2, key);
  if (protoDesc) delete ObjectProto$2[key];
  dP$4(it, key, D);
  if (protoDesc && it !== ObjectProto$2) dP$4(ObjectProto$2, key, protoDesc);
} : dP$4;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _objectCreate$1($Symbol[PROTOTYPE$4]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto$2) $defineProperty(OPSymbols, key, D);
  _anObject$1(it);
  key = _toPrimitive$1(key, true);
  _anObject$1(D);
  if (_has$1(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!_has$1(it, HIDDEN)) dP$4(it, HIDDEN, _propertyDesc$1(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (_has$1(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _objectCreate$1(D, { enumerable: _propertyDesc$1(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP$4(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  _anObject$1(it);
  var keys = _enumKeys(P = _toIobject$1(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _objectCreate$1(it) : $defineProperties(_objectCreate$1(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = _toPrimitive$1(key, true));
  if (this === ObjectProto$2 && _has$1(AllSymbols, key) && !_has$1(OPSymbols, key)) return false;
  return E || !_has$1(this, key) || !_has$1(AllSymbols, key) || _has$1(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = _toIobject$1(it);
  key = _toPrimitive$1(key, true);
  if (it === ObjectProto$2 && _has$1(AllSymbols, key) && !_has$1(OPSymbols, key)) return;
  var D = gOPD$3(it, key);
  if (D && _has$1(AllSymbols, key) && !(_has$1(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN$2(_toIobject$1(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!_has$1(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto$2;
  var names = gOPN$2(IS_OP ? OPSymbols : _toIobject$1(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (_has$1(AllSymbols, key = names[i++]) && (IS_OP ? _has$1(ObjectProto$2, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = _uid$1(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto$2) $set.call(OPSymbols, value);
      if (_has$1(this, HIDDEN) && _has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, _propertyDesc$1(1, value));
    };
    if (_descriptors$1 && setter) setSymbolDesc(ObjectProto$2, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  _redefine$1($Symbol[PROTOTYPE$4], 'toString', function toString() {
    return this._k;
  });

  _objectGopd$1.f = $getOwnPropertyDescriptor;
  _objectDp$1.f = $defineProperty;
  _objectGopn$1.f = _objectGopnExt.f = $getOwnPropertyNames;
  _objectPie$1.f = $propertyIsEnumerable;
  _objectGops$1.f = $getOwnPropertySymbols;

  if (_descriptors$1 && !_library) {
    _redefine$1(ObjectProto$2, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  _wksExt.f = function (name) {
    return wrap(_wks$1(name));
  };
}

_export$1(_export$1.G + _export$1.W + _export$1.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j$1 = 0; es6Symbols.length > j$1;)_wks$1(es6Symbols[j$1++]);

for (var wellKnownSymbols = _objectKeys$1(_wks$1.store), k = 0; wellKnownSymbols.length > k;) _wksDefine(wellKnownSymbols[k++]);

_export$1(_export$1.S + _export$1.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return _has$1(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

_export$1(_export$1.S + _export$1.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = _fails$1(function () { _objectGops$1.f(1); });

_export$1(_export$1.S + _export$1.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return _objectGops$1.f(_toObject$1(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && _export$1(_export$1.S + _export$1.F * (!USE_NATIVE || _fails$1(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!_isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!_isArray$1(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE$4][TO_PRIMITIVE] || _hide$1($Symbol[PROTOTYPE$4], TO_PRIMITIVE, $Symbol[PROTOTYPE$4].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
_setToStringTag$1($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
_setToStringTag$1(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
_setToStringTag$1(_global$1.JSON, 'JSON', true);

_wksDefine('asyncIterator');

_wksDefine('observable');

var symbol = _core$1.Symbol;

var symbol$1 = symbol;

function _typeof$1(obj) {
  if (typeof symbol$1 === "function" && typeof iterator$1 === "symbol") {
    _typeof$1 = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function _typeof(obj) {
      return obj && typeof symbol$1 === "function" && obj.constructor === symbol$1 && obj !== symbol$1.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

var capitalize = function capitalize(s) {
  if (typeof s !== 'string') {
    throw new TypeError("Argument should be a string. Given: " + _typeof$1(s));
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};

var addPrefix = function addPrefix(source, prefix, suffix) {
  if (prefix === void 0) {
    prefix = '';
  }

  if (suffix === void 0) {
    suffix = '';
  }

  var prefixWithSuffix = prefix ? prefix + suffix : prefix;
  return prefixWithSuffix + capitalize(source);
};

var Badge$1 = function Badge(el, _a) {
  var value = _a.value;
  if (value === undefined) return;
  el.classList.add('badge');
  el.setAttribute('data-badge', value);
};

var add = function add(el, cssClasses) {
  var _a;

  (_a = el.classList).add.apply(_a, __spread(cssClasses));
};

var remove = function remove(el, cssClasses) {
  var _a;

  (_a = el.classList).remove.apply(_a, __spread(cssClasses));
};

var Loading$1 = function Loading(el, _a) {
  var _b = _a.value,
      value = _b === void 0 ? true : _b,
      modifiers = _a.modifiers;
  var cssClasses = ['loading'];

  if (modifiers.lg) {
    cssClasses.push('loading-lg');
  }

  if (value instanceof Promise) {
    add(el, cssClasses);
    value.then(function () {
      return remove(el, cssClasses);
    });
    return;
  }

  if (value === undefined || !!value) {
    add(el, cssClasses);
    return;
  }

  remove(el, cssClasses);
};

var Sides;

(function (Sides) {
  Sides["top"] = "";
  Sides["bottom"] = "tooltip-bottom";
  Sides["right"] = "tooltip-right";
  Sides["left"] = "tooltip-left";
})(Sides || (Sides = {}));

var Tooltip = function Tooltip(el, _a) {
  var value = _a.value,
      modifiers = _a.modifiers;

  if (value) {
    el.classList.add('tooltip');
    el.setAttribute('data-tooltip', value);
    Object.keys(Sides).map(function (side) {
      if (modifiers[side]) el.classList.add(Sides[side]);
    });
  }
};

var directives = {
  Badge: Badge$1,
  Loading: Loading$1,
  Tooltip: Tooltip
};

var allComponents = __assign(__assign({}, components), layout);

var VectrePlugin = function VectrePlugin(vue, options) {
  var e_1, _a, e_2, _b;

  if (options === void 0) {
    options = {
      prefix: ''
    };
  }

  try {
    for (var _c = __values(Object.keys(allComponents)), _d = _c.next(); !_d.done; _d = _c.next()) {
      var component = _d.value;
      vue.component(addPrefix(component, options.prefix), allComponents[component]);
    }
  } catch (e_1_1) {
    e_1 = {
      error: e_1_1
    };
  } finally {
    try {
      if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
    } finally {
      if (e_1) throw e_1.error;
    }
  }

  try {
    for (var _e = __values(Object.keys(directives)), _f = _e.next(); !_f.done; _f = _e.next()) {
      var directive = _f.value;
      vue.directive(addPrefix(directive, options.prefix, '-'), directives[directive]);
    }
  } catch (e_2_1) {
    e_2 = {
      error: e_2_1
    };
  } finally {
    try {
      if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
    } finally {
      if (e_2) throw e_2.error;
    }
  }
};

var plugin = Object.assign(VectrePlugin, {
  components: components,
  layout: layout,
  directives: directives
});

exports.Accordion = Accordion$1;
exports.Avatar = Avatar$1;
exports.Bar = Bar$1;
exports.Breadcrumb = Breadcrumb$1;
exports.Btn = Btn;
exports.BtnGroup = BtnGroup;
exports.Card = Card$1;
exports.Chip = Chip$1;
exports.Column = Column;
exports.Columns = Columns;
exports.Container = Container;
exports.Divider = Divider$1;
exports.DropdownMenu = DropdownMenu$1;
exports.Empty = Empty$2;
exports.FormCheckbox = Checkbox;
exports.FormCheckboxGroup = Group$1;
exports.FormGroup = Group;
exports.FormHint = FormHint;
exports.FormHorizontal = FormHorizontal;
exports.FormInput = Component$1;
exports.FormLabel = FormLabel;
exports.FormOption = Option;
exports.FormRadio = Radio;
exports.FormRadioGroup = Group$2;
exports.FormSelect = Select;
exports.FormTextarea = FormTextarea;
exports.Icon = Icon$1;
exports.Icons = Icons;
exports.Modal = Modal$1;
exports.Navigation = Navigation$1;
exports.OffCanvas = OffCanvas$1;
exports.Pagination = Pagination$1;
exports.Panel = Panel;
exports.Popover = Popover;
exports.Step = Step;
exports.Steps = Steps;
exports.Tab = Tab;
exports.Tabs = Tabs;
exports.Tag = Tag;
exports.Tile = Tile$1;
exports.Toast = Toast$1;
exports.VectrePlugin = plugin;
exports.VerticalMenu = VerticalMenu$1;
