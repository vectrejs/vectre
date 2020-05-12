import Vue from 'vue';
import { Prop, Component as Component$1, Emit } from 'vue-property-decorator';
import { VueComponent } from 'vue-tsx-helper';
import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var descriptors = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$2
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode:  'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
  defineProperty: objectDefineProperty.f
});

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

var Sizes;

(function (Sizes) {
  Sizes["xl"] = "avatar-xl";
  Sizes["lg"] = "avatar-lg";
  Sizes["sm"] = "avatar-sm";
  Sizes["xs"] = "avatar-xs";
})(Sizes || (Sizes = {}));

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
      return [Sizes[this.size] || this.size];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "size", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "src", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "initials", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "background", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "color", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "alt", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "presence", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "icon", void 0);

  Avatar = __decorate([Component$1], Avatar);
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
    inject("data-v-05d8bc2e_0", { source: "figure.avatar+figure.avatar{margin-left:.4rem}", map: undefined, media: undefined });

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

var Presences;

(function (Presences) {
  Presences["online"] = "online";
  Presences["busy"] = "busy";
  Presences["away"] = "away";
  Presences["offline"] = "offline";
})(Presences || (Presences = {}));

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
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

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

var useSymbolAsUid = nativeSymbol
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

var SPECIES$1 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$1] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

var arrayMethodUsesToLength = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !descriptors) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};

var $filter = arrayIteration.filter;



var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $indexOf = arrayIncludes.indexOf;



var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH$1 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray
_export({ target: 'Array', stat: true }, {
  isArray: isArray
});

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime;

// `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring
if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

var defineProperty$1 = objectDefineProperty.f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty$1(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

// makes subclassing work correct for wrapped built-ins
var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    objectSetPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$2 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$2(3)
};

var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var defineProperty$2 = objectDefineProperty.f;
var trim = stringTrim.trim;

var NUMBER = 'Number';
var NativeNumber = global_1[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys$1.length > j; j++) {
    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
      defineProperty$2(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global_1, NUMBER, NumberWrapper);
}

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!toStringTagSupport) {
  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
}

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var TO_STRING$1 = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING$1];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING$1;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING$1, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}

var Sizes$1;

(function (Sizes) {
  Sizes["x2"] = "icon-2x";
  Sizes["x3"] = "icon-3x";
  Sizes["x4"] = "icon-4x";
})(Sizes$1 || (Sizes$1 = {}));

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

var UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

var BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
	UNSUPPORTED_Y: UNSUPPORTED_Y,
	BROKEN_CARET: BROKEN_CARET
};

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
  exec: regexpExec
});

// TODO: Remove from `core-js@4` since it's moved to entry points







var SPECIES$2 = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES$2] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};

// `SameValue` abstract operation
// https://tc39.github.io/ecma262/#sec-samevalue
var sameValue = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

// @@search logic
fixRegexpWellKnownSymbolLogic('search', 1, function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible(this);
      var searcher = regexp == undefined ? undefined : regexp[SEARCH];
      return searcher !== undefined ? searcher.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative(nativeSearch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regexpExecAbstract(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var quot = /"/g;

// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
// https://tc39.github.io/ecma262/#sec-createhtml
var createHtml = function (string, tag, attribute, value) {
  var S = String(requireObjectCoercible(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};

// check the existence of a method, lowercase
// of a tag and escaping quotes in arguments
var stringHtmlForced = function (METHOD_NAME) {
  return fails(function () {
    var test = ''[METHOD_NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  });
};

// `String.prototype.link` method
// https://tc39.github.io/ecma262/#sec-string.prototype.link
_export({ target: 'String', proto: true, forced: stringHtmlForced('link') }, {
  link: function link(url) {
    return createHtml(this, 'a', 'href', url);
  }
});

var Navigation;

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
})(Navigation || (Navigation = {}));

var Action;

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
})(Action || (Action = {}));

var Objects;

(function (Objects) {
  Objects["mail"] = "icon-mail";
  Objects["people"] = "icon-people";
  Objects["message"] = "icon-message";
  Objects["photo"] = "icon-photo";
  Objects["time"] = "icon-time";
  Objects["location"] = "icon-location";
  Objects["link"] = "icon-link";
  Objects["emoji"] = "icon-emoji";
})(Objects || (Objects = {}));

var Icons = __assign(__assign(__assign({}, Navigation), Objects), Action);

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
        'font-size': Sizes$1[this.size] || this.size
      };
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Icon.prototype, "cssClass", {
    get: function get() {
      return [Sizes$1[this.size] || this.size, Icons[this.type] || this.type];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop({
    type: String,
    required: true
  }), __metadata("design:type", String)], Icon.prototype, "type", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Icon.prototype, "size", void 0);

  Icon = __decorate([Component$1], Icon);
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

  __decorate([Prop({
    required: true,
    type: [Object, Array]
  }), __metadata("design:type", Object)], Accordion.prototype, "items", void 0);

  __decorate([Prop([String, Number, Array]), __metadata("design:type", Object)], Accordion.prototype, "checked", void 0);

  __decorate([Prop([String]), __metadata("design:type", String)], Accordion.prototype, "name", void 0);

  __decorate([Prop([Boolean]), __metadata("design:type", Boolean)], Accordion.prototype, "multiple", void 0);

  __decorate([Prop([String]), __metadata("design:type", String)], Accordion.prototype, "icon", void 0);

  Accordion = __decorate([Component$1({
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

var Slots;

(function (Slots) {
  Slots["header"] = "header";
  Slots["body"] = "body";
  Slots["footer"] = "footer";
})(Slots || (Slots = {}));

var Card =
/** @class */
function (_super) {
  __extends(Card, _super);

  function Card() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.positions = Positions;
    _this.slots = Slots;
    return _this;
  }

  Card.prototype.showImg = function (pos, slot) {
    return this.$props[pos] && this.$props[pos] === Slots[slot];
  };

  __decorate([Prop(String), __metadata("design:type", String)], Card.prototype, "img", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Card.prototype, "before", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Card.prototype, "after", void 0);

  Card = __decorate([Component$1], Card);
  return Card;
}(Vue);

/* script */
const __vue_script__$3 = Card;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"card"},[(_vm.showImg(_vm.positions.before, _vm.slots.header))?_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img-responsive",attrs:{"src":_vm.img}})]):_vm._e(),_vm._v(" "),(_vm.$slots.header)?_c('div',{staticClass:"card-header"},[_vm._t("header")],2):_vm._e(),_vm._v(" "),(
      _vm.showImg(_vm.positions.after, _vm.slots.header) ||
        _vm.showImg(_vm.positions.before, _vm.slots.body)
    )?_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img-responsive",attrs:{"src":_vm.img}})]):_vm._e(),_vm._v(" "),(_vm.$slots.body || _vm.$slots.default)?_c('div',{staticClass:"card-body"},[_vm._t("body"),_vm._v(" "),(!_vm.$scopedSlots.body)?_vm._t("default"):_vm._e()],2):_vm._e(),_vm._v(" "),(
      _vm.showImg(_vm.positions.after, _vm.slots.body) ||
        _vm.showImg(_vm.positions.before, _vm.slots.footer)
    )?_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img-responsive",attrs:{"src":_vm.img}})]):_vm._e(),_vm._v(" "),(_vm.$slots.footer)?_c('div',{staticClass:"card-footer"},[_vm._t("footer")],2):_vm._e(),_vm._v(" "),(_vm.showImg(_vm.positions.after, _vm.slots.footer))?_c('div',{staticClass:"card-image"},[_c('img',{staticClass:"img-responsive",attrs:{"src":_vm.img}})]):_vm._e()])};
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

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Bar.prototype, "sm", void 0);

  __decorate([Prop({
    type: Number,
    "default": 0
  }), __metadata("design:type", Number)], Bar.prototype, "min", void 0);

  __decorate([Prop({
    type: Number,
    "default": 100
  }), __metadata("design:type", Number)], Bar.prototype, "max", void 0);

  __decorate([Prop({
    type: Number,
    "default": 0
  }), __metadata("design:type", Number)], Bar.prototype, "value", void 0);

  __decorate([Prop([Function, String]), __metadata("design:type", Object)], Bar.prototype, "tooltip", void 0);

  Bar = __decorate([Component$1], Bar);
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

  __decorate([Prop({
    type: Array,
    required: true
  }), __metadata("design:type", Array)], Breadcrumb.prototype, "crumbs", void 0);

  Breadcrumb = __decorate([Component$1], Breadcrumb);
  return Breadcrumb;
}(Vue);

/* script */
const __vue_script__$5 = Breadcrumb;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',{staticClass:"breadcrumb"},_vm._l((_vm.crumbs),function(crumb,key){return _c('li',{key:key,staticClass:"breadcrumb-item"},[_vm._t("default",null,{"crumb":crumb}),_vm._v(" "),(!_vm.$scopedSlots['default'])?_c('a',{attrs:{"href":crumb.path}},[_vm._v("\n      "+_vm._s(crumb.title)+"\n    ")]):_vm._e()],2)}),0)};
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

var Types;

(function (Types) {
  Types["primary"] = "btn-primary";
  Types["link"] = "btn-link";
  Types["success"] = "btn-success";
  Types["error"] = "btn-error";
  Types["clear"] = "btn-clear";
})(Types || (Types = {}));

var Sizes$2;

(function (Sizes) {
  Sizes["sm"] = "btn-sm";
  Sizes["lg"] = "btn-lg";
  Sizes["block"] = "btn-block";
})(Sizes$2 || (Sizes$2 = {}));

var States;

(function (States) {
  States["active"] = "active";
  States["disabled"] = "disabled";
  States["loading"] = "loading";
})(States || (States = {}));

var Button =
/** @class */
function (_super) {
  __extends(Button, _super);

  function Button() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Button.prototype, "cssClass", {
    get: function get() {
      return [Types[this.type] || this.type, Sizes$2[this.size] || this.size, States[this.state] || this.state, this.action && this.circle ? 's-circle' : '', this.action ? 'btn-action' : ''];
    },
    enumerable: true,
    configurable: true
  });

  Button.prototype.created = function () {
    if (this.action && !this.icon) {
      throw new Error('Action button should have icon');
    }
  };

  __decorate([Prop(String), __metadata("design:type", String)], Button.prototype, "type", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Button.prototype, "size", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Button.prototype, "icon", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Button.prototype, "state", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "left", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "circle", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "action", void 0);

  Button = __decorate([Component$1({
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

    _this.avatarSizes = Sizes;
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

  __decorate([Prop({
    type: String,
    required: true
  }), __metadata("design:type", String)], Chip.prototype, "text", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Chip.prototype, "avatar", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Chip.prototype, "initials", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Chip.prototype, "active", void 0);

  __decorate([Prop({
    type: Boolean,
    "default": true
  }), __metadata("design:type", Boolean)], Chip.prototype, "small", void 0);

  Chip = __decorate([Component$1({
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
      return this.content || this.$slots["default"] && this.$slots["default"][0].text;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Divider.prototype, "vert", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Divider.prototype, "content", void 0);

  Divider = __decorate([Component$1], Divider);
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

  __decorate([Prop([String, Number]), __metadata("design:type", Object)], MenuBadge.prototype, "value", void 0);

  MenuBadge = __decorate([Component$1], MenuBadge);
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

  __decorate([Prop({
    type: [Array, Object],
    required: true
  }), __metadata("design:type", Array)], VerticalMenu.prototype, "items", void 0);

  __decorate([Prop({
    type: [String, Number],
    "default": ''
  }), __metadata("design:type", Object)], VerticalMenu.prototype, "active", void 0);

  VerticalMenu = __decorate([Component$1({
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
      return [Types[this.btnType]];
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

  __decorate([Prop({
    type: [Object, Array],
    required: true
  }), __metadata("design:type", Object)], DropdownMenu.prototype, "items", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], DropdownMenu.prototype, "right", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], DropdownMenu.prototype, "btnType", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], DropdownMenu.prototype, "btnText", void 0);

  __decorate([Prop({
    type: String,
    "default": Navigation.caret
  }), __metadata("design:type", String)], DropdownMenu.prototype, "btnIcon", void 0);

  __decorate([Prop(), __metadata("design:type", String)], DropdownMenu.prototype, "state", void 0);

  DropdownMenu = __decorate([Component$1({
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

var Empty =
/** @class */
function (_super) {
  __extends(Empty, _super);

  function Empty() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.iconSizes = Sizes$1;
    return _this;
  }

  __decorate([Prop(String), __metadata("design:type", String)], Empty.prototype, "title", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Empty.prototype, "sub", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Empty.prototype, "icon", void 0);

  Empty = __decorate([Component$1({
    components: {
      Icon: Icon$1
    }
  })], Empty);
  return Empty;
}(Vue);

/* script */
const __vue_script__$d = Empty;

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
  

  
  var Empty$1 = normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    undefined,
    undefined
  );

var Types$1;

(function (Types) {
  Types["primary"] = "label-primary";
  Types["secondary"] = "label-secondary";
  Types["success"] = "label-success";
  Types["warning"] = "label-warning";
  Types["error"] = "label-error";
})(Types$1 || (Types$1 = {}));

var Label =
/** @class */
function (_super) {
  __extends(Label, _super);

  function Label() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(Label.prototype, "cssClass", {
    get: function get() {
      return [Types$1[this.type], this.rounded ? 'label-rounded' : ''];
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop(String), __metadata("design:type", String)], Label.prototype, "type", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Label.prototype, "rounded", void 0);

  Label = __decorate([Component$1({
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

var Sizes$3;

(function (Sizes) {
  Sizes["sm"] = "modal-sm";
  Sizes["lg"] = "modal-lg";
})(Sizes$3 || (Sizes$3 = {}));

var Modal =
/** @class */
function (_super) {
  __extends(Modal, _super);

  function Modal() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.btnType = Types.clear;
    return _this;
  }

  Object.defineProperty(Modal.prototype, "cssClass", {
    get: function get() {
      return [this.show ? 'active' : '', Sizes$3[this.size] || this.size];
    },
    enumerable: true,
    configurable: true
  });

  Modal.prototype.close = function () {};

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Modal.prototype, "show", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Modal.prototype, "size", void 0);

  __decorate([Prop({
    type: Boolean,
    "default": true
  }), __metadata("design:type", Boolean)], Modal.prototype, "closeBtn", void 0);

  __decorate([Prop({
    type: Boolean,
    "default": true
  }), __metadata("design:type", Boolean)], Modal.prototype, "overlay", void 0);

  __decorate([Prop({
    type: Boolean,
    "default": true
  }), __metadata("design:type", Boolean)], Modal.prototype, "closeOverlay", void 0);

  __decorate([Emit('close'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Modal.prototype, "close", null);

  Modal = __decorate([Component$1({
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

  __decorate([Prop({
    "default": Navigation.menu
  }), __metadata("design:type", String)], OffCanvas.prototype, "icon", void 0);

  __decorate([Prop({
    "default": true,
    type: Boolean
  }), __metadata("design:type", Boolean)], OffCanvas.prototype, "sidebarShow", void 0);

  OffCanvas = __decorate([Component$1({
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

  __decorate([Prop({
    type: Array,
    required: true
  }), __metadata("design:type", Array)], SimplePager.prototype, "pages", void 0);

  __decorate([Prop({
    "default": 0
  }), __metadata("design:type", String)], SimplePager.prototype, "current", void 0);

  SimplePager = __decorate([Component$1], SimplePager);
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

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterators = {};

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var ITERATOR$1 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || iterators[classof(it)];
};

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var ITERATOR$2 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: arrayFrom
});

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$3 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$3(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$3(true)
};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};

var ITERATOR$3 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ( !has(IteratorPrototype, ITERATOR$3)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR$3, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

var defineProperty$3 = objectDefineProperty.f;



var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
    defineProperty$3(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis$1 = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$4] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$4, returnThis$2);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ( IterablePrototype[ITERATOR$4] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$4, defaultIterator);
  }
  iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
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

  __decorate([Prop({
    type: [Number],
    required: true
  }), __metadata("design:type", Number)], Pager.prototype, "pages", void 0);

  __decorate([Prop({
    type: [Number],
    "default": 1
  }), __metadata("design:type", Number)], Pager.prototype, "current", void 0);

  __decorate([Prop({
    type: Number,
    "default": 6
  }), __metadata("design:type", Number)], Pager.prototype, "show", void 0);

  Pager = __decorate([Component$1], Pager);
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

  __decorate([Prop({
    type: [Number, Array],
    required: true
  }), __metadata("design:type", Object)], Pagination.prototype, "pages", void 0);

  __decorate([Prop({
    type: [Number, String]
  }), __metadata("design:type", Object)], Pagination.prototype, "current", void 0);

  __decorate([Prop({
    type: Number
  }), __metadata("design:type", Number)], Pagination.prototype, "show", void 0);

  Pagination = __decorate([Component$1({
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

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var $includes = arrayIncludes.includes;



var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$2 }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES$3 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$3];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

var MATCH$1 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var Sides;

(function (Sides) {
  Sides["right"] = "popover-right";
  Sides["left"] = "popover-left";
  Sides["bottom"] = "popover-bottom";
  Sides["top"] = "";
})(Sides || (Sides = {}));

var createPopoverContainer = function createPopoverContainer(h, nodes) {
  return h('div', {
    "class": 'popover-container'
  }, nodes);
};

var Popover = Vue.extend({
  name: 'Popover',
  props: {
    side: {
      type: String,
      validator: function validator(side) {
        return Object.keys(Sides).includes(side);
      }
    }
  },
  render: function render(h) {
    var elements = this.$slots["default"] || [];
    return h('div', {
      "class": ['popover', Sides[this.side]]
    }, [elements.slice(0, 1), createPopoverContainer(h, elements.slice(1))]);
  }
});

var $map = arrayIteration.map;



var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH$4 = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$4 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
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
      "default": 1
    }
  },
  render: function render(h) {
    var _this = this;

    var steps = (this.$slots["default"] || []).filter(function (n) {
      return n.componentOptions !== undefined && n.componentOptions.tag.includes('step');
    }).map(function (n, i) {
      return h(Step, {
        directives: n.data.directives,
        "class": [i + 1 === _this.$props.active ? 'active' : '']
      }, n.componentOptions.children);
    });
    return h('div', {
      "class": 'step'
    }, steps);
  }
});

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
var functionBind = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction$1(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

// `Function.prototype.bind` method
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
_export({ target: 'Function', proto: true }, {
  bind: functionBind
});

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
    "class": {
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
    "class": {
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
      "default": function _default() {
        return [];
      }
    },
    block: {
      type: Boolean,
      "default": false
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
        "class": cssClass
      }, tabs);
    }

    var _b = this.$slots["default"],
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
        "class": ['tab-item', 'tab-action']
      }, n.children);
    });
    return h('div', {
      "class": cssClass
    }, [tabs, tabsActions]);
  }
});

var Tile =
/** @class */
function (_super) {
  __extends(Tile, _super);

  function Tile() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.iconSize = Sizes$1.x2;
    _this.avatarSize = Sizes.lg;
    return _this;
  }

  __decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "title", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "subtitle", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "avatar", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "initials", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "icon", void 0);

  __decorate([Prop({
    type: Boolean,
    "default": false
  }), __metadata("design:type", Boolean)], Tile.prototype, "compact", void 0);

  Tile = __decorate([Component$1({
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

var slice$1 = [].slice;
var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice$1.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
_export({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global_1.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global_1.setInterval)
});

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

  __decorate([Prop(String), __metadata("design:type", String)], Toast.prototype, "type", void 0);

  __decorate([Prop(Number), __metadata("design:type", Number)], Toast.prototype, "autoclose", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Toast.prototype, "closeable", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Toast.prototype, "icon", void 0);

  __decorate([Emit('closed'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Toast.prototype, "close", null);

  Toast = __decorate([Component$1], Toast);
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

var Navigation$1 =
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

  __decorate([Prop({
    type: Array,
    required: true
  }), __metadata("design:type", Array)], Navigation.prototype, "items", void 0);

  __decorate([Prop({
    type: [Number, String],
    "default": -1
  }), __metadata("design:type", Object)], Navigation.prototype, "level", void 0);

  Navigation = __decorate([Component$1({
    name: 'navigation'
  })], Navigation);
  return Navigation;
}(Vue);

/* script */
const __vue_script__$p = Navigation$1;

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
  

  
  var Navigation$2 = normalizeComponent_1(
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
      (this.$slots["default"] || []).map(function (v) {
        // tslint:disable-next-line:max-line-length
        if (v.componentOptions && /^.*form-(label|input|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions.tag)) {
          v.componentOptions.propsData.size = v.componentOptions.propsData.size || _this.size;
        }
      });
    }

    if (this.disabled !== undefined) {
      (this.$slots["default"] || []).map(function (v) {
        // tslint:disable-next-line:max-line-length
        if (v.componentOptions && /^.*form-(input|textarea|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions.tag)) {
          v.componentOptions.propsData.disabled = _this.disabled;
        }
      });
    }

    var cssClass = ['form-group', this.error ? 'has-error' : '', this.success ? 'has-success' : ''];
    return h("div", {
      "class": cssClass
    }, [this.$slots["default"]]);
  };

  __decorate([Prop({
    type: String,
    validator: function validator(v) {
      return !v || ['lg', 'sm'].includes(v);
    }
  }), __metadata("design:type", String)], Group.prototype, "size", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "disabled", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "error", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "success", void 0);

  Group = __decorate([Component$1], Group);
  return Group;
}(VueComponent);

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
      return this.$attrs.placeholder || this.$slots["default"] && this.$slots["default"][0].text;
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

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var Types$2;

(function (Types) {
  Types["switch"] = "form-switch";
  Types["checkbox"] = "form-checkbox";
})(Types$2 || (Types$2 = {}));

var Sizes$4;

(function (Sizes) {
  Sizes["sm"] = "input-sm";
  Sizes["lg"] = "input-lg";
})(Sizes$4 || (Sizes$4 = {}));

var Checkbox =
/** @class */
function (_super) {
  __extends(Checkbox, _super);

  function Checkbox() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Checkbox.prototype.render = function (h) {
    var cssClass = [Types$2[this.type] || 'form-checkbox', this.inline ? 'form-inline' : '', this.error ? 'is-error' : false, Sizes$4[this.size]];
    return h("label", {
      "class": cssClass
    }, [h("input", {
      "attrs": {
        "type": "checkbox",
        "disabled": this.disabled
      },
      "on": _objectSpread2({
        "change": this.update
      }, __assign(__assign({}, this.$listeners), {
        change: this.onChange
      })),
      "domProps": {
        "checked": this._checked
      }
    }), h("i", {
      "class": "form-icon"
    }), this.$slots["default"] || this.label || this.value]);
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

  __decorate([Prop([String, Number]), __metadata("design:type", Object)], Checkbox.prototype, "label", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Checkbox.prototype, "checked", void 0);

  __decorate([Prop({
    "default": true
  }), __metadata("design:type", Object)], Checkbox.prototype, "value", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Checkbox.prototype, "disabled", void 0);

  __decorate([Prop({
    type: String,
    validator: function validator(v) {
      return Object.keys(Types$2).includes(v);
    }
  }), __metadata("design:type", String)], Checkbox.prototype, "type", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Checkbox.prototype, "inline", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Checkbox.prototype, "size", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Checkbox.prototype, "error", void 0);

  __decorate([Prop(), __metadata("design:type", Object)], Checkbox.prototype, "model", void 0);

  Checkbox = __decorate([Component$1({
    model: {
      event: 'input',
      prop: 'model'
    }
  })], Checkbox);
  return Checkbox;
}(VueComponent);

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod$4 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};

var $reduce = arrayReduce.left;



var STRICT_METHOD$1 = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$5 = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$5 }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
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
      group = (this.$slots["default"] || []).filter(function (_a) {
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
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return normalized;
  };

  __decorate([Prop([Array, Object]), __metadata("design:type", Object)], Group.prototype, "options", void 0);

  __decorate([Prop({
    type: Array,
    "default": function _default() {
      return [];
    }
  }), __metadata("design:type", Array)], Group.prototype, "value", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "inline", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Group.prototype, "type", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Group.prototype, "size", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "disabled", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "error", void 0);

  Group = __decorate([Component$1], Group);
  return Group;
}(VueComponent);

var Sizes$5;

(function (Sizes) {
  Sizes["sm"] = "input-sm";
  Sizes["lg"] = "input-lg";
})(Sizes$5 || (Sizes$5 = {}));

var Input =
/** @class */
function (_super) {
  __extends(Input, _super);

  function Input() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Input.prototype.render = function (h) {
    var cssClass = ['form-input', this.error ? 'is-error' : false, this.success ? 'is-success' : false, Sizes$5[this.size]];
    return h("input", {
      "class": cssClass,
      "domProps": _objectSpread2({}, {
        value: this.value
      }),
      "on": _objectSpread2({}, this.on),
      "attrs": _objectSpread2({}, this.attrs)
    });
  };

  __decorate([Prop({
    type: String,
    validator: function validator(size) {
      return Object.keys(Sizes$5).includes(size);
    }
  }), __metadata("design:type", String)], Input.prototype, "size", void 0);

  __decorate([Prop(), __metadata("design:type", Object)], Input.prototype, "attrs", void 0);

  __decorate([Prop([String, Number]), __metadata("design:type", Object)], Input.prototype, "value", void 0);

  __decorate([Prop(), __metadata("design:type", Object)], Input.prototype, "on", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Input.prototype, "error", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Input.prototype, "success", void 0);

  Input = __decorate([Component$1], Input);
  return Input;
}(VueComponent);

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

  __decorate([Prop(), __metadata("design:type", String)], Icon.prototype, "icon", void 0);

  Icon = __decorate([Component$1], Icon);
  return Icon;
}(VueComponent);

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
    }, [this.$slots["default"]]);
  };

  __decorate([Prop({
    type: String,
    validator: function validator(side) {
      return Object.keys(IconSide).includes(side);
    }
  }), __metadata("design:type", String)], IconContainer.prototype, "side", void 0);

  IconContainer = __decorate([Component$1], IconContainer);
  return IconContainer;
}(VueComponent);

var Loading = Vue.extend({
  render: function render(h) {
    return h("i", {
      "class": "form-icon loading"
    });
  }
});

var Component = Vue.extend({
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
        return Object.keys(Sizes$5).includes(size);
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

var LabelSizes;

(function (LabelSizes) {
  LabelSizes["sm"] = "label-sm";
  LabelSizes["lg"] = "label-lg";
})(LabelSizes || (LabelSizes = {}));

var script$7 = Vue.extend({
  name: 'FormLabel',
  props: {
    size: {
      type: String,
      validator: function validator(v) {
        return !v || Object.keys(LabelSizes).includes(v);
      }
    }
  },
  computed: {
    cssClass: function cssClass() {
      return ['form-label', LabelSizes[this.size] || ''];
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

var Sizes$6;

(function (Sizes) {
  Sizes["sm"] = "input-sm";
  Sizes["lg"] = "input-lg";
})(Sizes$6 || (Sizes$6 = {}));

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
    var cssClass = ['form-radio', this.inline ? 'form-inline' : false, this.error ? 'is-error' : false, Sizes$6[this.size]];
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
      return this.$slots["default"] || this.label || this._value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Radio.prototype, "_value", {
    get: function get() {
      return this.value || this.$slots["default"] && this.$slots["default"][0].text || this.label;
    },
    enumerable: true,
    configurable: true
  });

  __decorate([Prop(), __metadata("design:type", Object)], Radio.prototype, "value", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Radio.prototype, "label", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Radio.prototype, "name", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Radio.prototype, "checked", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Radio.prototype, "inline", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Radio.prototype, "error", void 0);

  __decorate([Prop({
    type: String,
    validator: function validator(size) {
      return Object.keys(Sizes$6).includes(size);
    }
  }), __metadata("design:type", String)], Radio.prototype, "size", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Radio.prototype, "disabled", void 0);

  __decorate([Prop([String, Boolean, Object, Number, Array]), __metadata("design:type", Object)], Radio.prototype, "model", void 0);

  Radio = __decorate([Component$1({
    model: {
      prop: 'model',
      event: 'change'
    }
  })], Radio);
  return Radio;
}(VueComponent);

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
      group = (this.$slots["default"] || []).filter(function (_a) {
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
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return normalized;
  };

  __decorate([Prop(), __metadata("design:type", Object)], Group.prototype, "options", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Group.prototype, "name", void 0);

  __decorate([Prop(), __metadata("design:type", Object)], Group.prototype, "value", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "inline", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Group.prototype, "size", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "error", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group.prototype, "disabled", void 0);

  Group = __decorate([Component$1], Group);
  return Group;
}(VueComponent);

var $some = arrayIteration.some;



var STRICT_METHOD$2 = arrayMethodIsStrict('some');
var USES_TO_LENGTH$6 = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$6 }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
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
    }, [this.$slots["default"] || label || value]);
  };

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Option.prototype, "disabled", void 0);

  __decorate([Prop(), __metadata("design:type", Object)], Option.prototype, "value", void 0);

  __decorate([Prop(), __metadata("design:type", Object)], Option.prototype, "label", void 0);

  __decorate([Prop(), __metadata("design:type", Boolean)], Option.prototype, "selected", void 0);

  Option = __decorate([Component$1], Option);
  return Option;
}(VueComponent);

var Sizes$7;

(function (Sizes) {
  Sizes["sm"] = "select-sm";
  Sizes["lg"] = "select-lg";
})(Sizes$7 || (Sizes$7 = {}));

var Select =
/** @class */
function (_super) {
  __extends(Select, _super);

  function Select() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Select.prototype.mounted = function () {
    if (!this.options && !this.$slots["default"]) {
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
      options = (this.$slots["default"] || []).filter(function (_a) {
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

    var cssClass = ['form-select', Sizes$7[this.scale], this.error ? 'is-error' : '', this.success ? 'is-success' : ''];
    return h("select", {
      "class": cssClass,
      "attrs": {
        "multiple": this.multiple,
        "disabled": this.disabled
      },
      "on": _objectSpread2({}, this.listeners)
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
        if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    return normalized;
  };

  __decorate([Prop([Array, Object]), __metadata("design:type", Object)], Select.prototype, "options", void 0);

  __decorate([Prop({
    "default": ''
  }), __metadata("design:type", Object)], Select.prototype, "value", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Select.prototype, "multiple", void 0);

  __decorate([Prop(String), __metadata("design:type", String)], Select.prototype, "placeholder", void 0);

  __decorate([Prop({
    type: String,
    validator: function validator(size) {
      return Object.keys(Sizes$7).includes(size);
    }
  }), __metadata("design:type", String)], Select.prototype, "scale", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Select.prototype, "error", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Select.prototype, "success", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], Select.prototype, "disabled", void 0);

  Select = __decorate([Component$1], Select);
  return Select;
}(VueComponent);

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
  Empty: Empty$1,
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
  Navigation: Navigation$2,
  VerticalMenu: VerticalMenu$1,
  FormCheckbox: Checkbox,
  FormCheckboxGroup: Group$1,
  FormGroup: Group,
  FormInput: Component,
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

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "ml", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "mx", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "mr", void 0);

  __decorate([Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "xs", void 0);

  __decorate([Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "sm", void 0);

  __decorate([Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "md", void 0);

  __decorate([Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "lg", void 0);

  __decorate([Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "xl", void 0);

  __decorate([Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "col", void 0);

  __decorate([Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "hide", void 0);

  __decorate([Prop({
    type: [Number, String],
    validator: sizeValidator
  }), __metadata("design:type", Number)], default_1.prototype, "show", void 0);

  default_1 = __decorate([Component$1], default_1);
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

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "gapless", void 0);

  __decorate([Prop(Boolean), __metadata("design:type", Boolean)], default_1.prototype, "oneline", void 0);

  default_1 = __decorate([Component$1], default_1);
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

  __decorate([Prop(String), __metadata("design:type", String)], default_1.prototype, "grid", void 0);

  default_1 = __decorate([Component$1], default_1);
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

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var capitalize = function capitalize(s) {
  if (typeof s !== 'string') {
    throw new TypeError("Argument should be a string. Given: " + _typeof(s));
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

var Sides$1;

(function (Sides) {
  Sides["top"] = "";
  Sides["bottom"] = "tooltip-bottom";
  Sides["right"] = "tooltip-right";
  Sides["left"] = "tooltip-left";
})(Sides$1 || (Sides$1 = {}));

var Tooltip = function Tooltip(el, _a) {
  var value = _a.value,
      modifiers = _a.modifiers;

  if (value) {
    el.classList.add('tooltip');
    el.setAttribute('data-tooltip', value);
    Object.keys(Sides$1).map(function (side) {
      if (modifiers[side]) el.classList.add(Sides$1[side]);
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
      if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
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
      if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
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

export { Accordion$1 as Accordion, Avatar$1 as Avatar, Presences as AvatarPresences, Sizes as AvatarSizes, Bar$1 as Bar, Breadcrumb$1 as Breadcrumb, Btn, BtnGroup, Sizes$2 as BtnSizes, States as BtnStates, Types as BtnTypes, Card$1 as Card, Slots as CardImageSlots, Chip$1 as Chip, Column, Columns, Container, Grids as ContainerGrids, Divider$1 as Divider, DropdownMenu$1 as DropdownMenu, Empty$1 as Empty, Checkbox as FormCheckbox, Group$1 as FormCheckboxGroup, Sizes$4 as FormCheckboxSizes, Types$2 as FormCheckboxTypes, Group as FormGroup, FormHint, FormHorizontal, Component as FormInput, Sizes$5 as FormInputSizes, FormLabel, LabelSizes as FormLabelSizes, Option as FormOption, Radio as FormRadio, Group$2 as FormRadioGroup, Select as FormSelect, FormTextarea, Icon$1 as Icon, Action as IconAction, Navigation as IconNavigation, Objects as IconObject, Icons, Modal$1 as Modal, Navigation$2 as Navigation, OffCanvas$1 as OffCanvas, Pagination$1 as Pagination, Panel, Popover, Sides as PopoverSides, Step, Steps, Tab, Tabs, Tag, Types$1 as TagTypes, Tile$1 as Tile, Toast$1 as Toast, plugin as VectrePlugin, VerticalMenu$1 as VerticalMenu };
