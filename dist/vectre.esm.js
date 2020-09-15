import Vue from 'vue';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
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

var WeakMap$1 = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

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

var WeakMap$2 = global_1.WeakMap;
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
  var store$1 = new WeakMap$2();
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

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod$1 = function (TYPE) {
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
  start: createMethod$1(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$1(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$1(3)
};

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
var stringTrimForced = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = stringTrim.trim;


// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
_export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});

function _extends(){return _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a},_extends.apply(this,arguments)}var normalMerge=["attrs","props","domProps"],toArrayMerge=["class","style","directives"],functionalMerge=["on","nativeOn"],mergeJsxProps=function(a){return a.reduce(function(c,a){for(var b in a)if(!c[b])c[b]=a[b];else if(-1!==normalMerge.indexOf(b))c[b]=_extends({},c[b],a[b]);else if(-1!==toArrayMerge.indexOf(b)){var d=c[b]instanceof Array?c[b]:[c[b]],e=a[b]instanceof Array?a[b]:[a[b]];c[b]=d.concat(e);}else if(-1!==functionalMerge.indexOf(b)){for(var f in a[b])if(c[b][f]){var g=c[b][f]instanceof Array?c[b][f]:[c[b][f]],h=a[b][f]instanceof Array?a[b][f]:[a[b][f]];c[b][f]=g.concat(h);}else c[b][f]=a[b][f];}else if("hook"==b)for(var i in a[b])c[b][i]=c[b][i]?mergeFn(c[b][i],a[b][i]):a[b][i];else c[b]=a[b];return c},{})},mergeFn=function(a,b){return function(){a&&a.apply(this,arguments),b&&b.apply(this,arguments);}};var helper=mergeJsxProps;

var api = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(Vue);
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Component;
}(vue_1.default));
exports.Component = Component;
/**
 * Create component from component options (Compatible with Vue.extend)
 */
function createComponent(opts) {
    return vue_1.default.extend(opts);
}
exports.createComponent = createComponent;
var factoryImpl = {
    convert: function (c) { return c; },
    extendFrom: function (c) { return c; }
};
/**
 * Specify Props and Event types of component
 *
 * Usage:
 *  // Get TSX-supported component with props(`name`, `value`) and event(`onInput`)
 *  const NewComponent = tsx.ofType<{ name: string, value: string }, { onInput: string }>.convert(Component);
 */
function ofType() {
    return factoryImpl;
}
exports.ofType = ofType;
function withNativeOn(componentType) {
    return componentType;
}
exports.withNativeOn = withNativeOn;
function withHtmlAttrs(componentType) {
    return componentType;
}
exports.withHtmlAttrs = withHtmlAttrs;
function withUnknownProps(componentType) {
    return componentType;
}
exports.withUnknownProps = withUnknownProps;
function createComponentFactory(base, mixins) {
    return {
        create: function (options) {
            var mergedMixins = options.mixins
                ? options.mixins.concat(mixins) : mixins;
            return base.extend(__assign({}, options, { mixins: mergedMixins }));
        },
        mixin: function (mixinObject) {
            return createComponentFactory(base, mixins.concat([mixinObject]));
        }
    };
}
function createExtendableComponentFactory() {
    return {
        create: function (options) {
            return vue_1.default.extend(options);
        },
        extendFrom: function (base) {
            return createComponentFactory(base, []);
        },
        mixin: function (mixinObject) {
            return createComponentFactory(vue_1.default, [mixinObject]);
        }
    };
}
exports.componentFactory = createExtendableComponentFactory();
function componentFactoryOf() {
    return exports.componentFactory;
}
exports.componentFactoryOf = componentFactoryOf;
/**
 * Shorthand of `componentFactory.create`
 */
exports.component = exports.componentFactory.create;
exports.extendFrom = exports.componentFactory.extendFrom;

});

var modifiers = createCommonjsModule(function (module, exports) {
var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function handleEvent(event, filters, handler) {
    for (var _i = 0, filters_1 = filters; _i < filters_1.length; _i++) {
        var filter = filters_1[_i];
        if (!filter(event)) {
            return;
        }
    }
    if (handler) {
        handler(event);
    }
}
var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    down: 40,
    del: [8, 46],
    left: 37,
    right: 39
};
function createKeyFilter(keys) {
    var codes = [];
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        if (typeof key === "number") {
            codes.push(key);
        }
        else {
            var code = keyCodes[key];
            if (typeof code === "number") {
                codes.push(code);
            }
            else {
                codes.push.apply(codes, code);
            }
        }
    }
    switch (codes.length) {
        case 0:
            return function (_) { return false; };
        case 1:
            var code_1 = codes[0];
            return function (e) { return e.keyCode === code_1; };
        default:
            return function (e) { return codes.indexOf(e.keyCode) >= 0; };
    }
}
function defineChildModifier(target, currentFilters, name, filter, children) {
    Object.defineProperty(target, name, {
        get: function () {
            // call this getter at most once.
            // reuse created instance after next time.
            var ret = createModifier(currentFilters.concat([filter]), children);
            Object.defineProperty(target, name, {
                value: ret,
                enumerable: true
            });
            return ret;
        },
        enumerable: true,
        configurable: true
    });
}
function defineKeyCodeModifiers(target, filters, children) {
    var _loop_1 = function (name_1) {
        var keyName = name_1;
        if (keyName === "left" || keyName === "right") {
            return "continue";
        }
        var code = keyCodes[keyName];
        if (typeof code === "number") {
            defineChildModifier(target, filters, keyName, function (e) { return e.keyCode === code; }, children);
        }
        else {
            var c1_1 = code[0], c2_1 = code[1];
            defineChildModifier(target, filters, keyName, function (e) { return e.keyCode === c1_1 || e.keyCode === c2_1; }, children);
        }
    };
    for (var name_1 in keyCodes) {
        _loop_1(name_1);
    }
}
function defineKeys(target, filters, children) {
    Object.defineProperty(target, "keys", {
        get: function () {
            var _this = this;
            var keysFunction = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var propName = "keys:" + args.toString();
                var modifier = _this[propName];
                if (modifier !== undefined) {
                    return modifier;
                }
                var filter = createKeyFilter(args);
                defineChildModifier(_this, filters, propName, filter, children);
                return _this[propName];
            };
            Object.defineProperty(this, "keys", {
                value: keysFunction,
                enumerable: true
            });
            return keysFunction;
        },
        enumerable: true,
        configurable: true
    });
}
function defineExact(target, filters, children) {
    Object.defineProperty(target, "exact", {
        get: function () {
            var _this = this;
            var exactFunction = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var propName = "exact:" + args.toString();
                var modifier = _this[propName];
                if (modifier !== undefined) {
                    return modifier;
                }
                var expected = {
                    ctrl: false,
                    shift: false,
                    alt: false,
                    meta: false
                };
                args.forEach(function (arg) { return (expected[arg] = true); });
                var filter = function (e) {
                    return !!e.ctrlKey === expected.ctrl &&
                        !!e.shiftKey === expected.shift &&
                        !!e.altKey === expected.alt &&
                        !!e.metaKey === expected.meta;
                };
                defineChildModifier(_this, filters, propName, filter, children);
                return _this[propName];
            };
            Object.defineProperty(this, "exact", {
                value: exactFunction,
                enumerable: true
            });
            return exactFunction;
        },
        enumerable: true,
        configurable: true
    });
}
function createModifier(filters, children) {
    function m(arg) {
        if (arg instanceof Function) {
            // EventHandler => EventHandler
            return function (event) { return handleEvent(event, filters, arg); };
        }
        else {
            // Event => void
            handleEvent(arg, filters);
            return;
        }
    }
    if (children.keyboard || children.mouse) {
        var nextChildren = __assign({}, children, { keyboard: false, mouse: false });
        if (children.keyboard) {
            defineKeyCodeModifiers(m, filters, nextChildren);
            defineKeys(m, filters, nextChildren);
        }
        if (children.mouse) {
            defineChildModifier(m, filters, "middle", function (e) { return e.button === 1; }, nextChildren);
        }
        defineChildModifier(m, filters, "left", function (e) { return e.keyCode === 37 || e.button === 0; }, nextChildren);
        defineChildModifier(m, filters, "right", function (e) { return e.keyCode === 39 || e.button === 2; }, nextChildren);
    }
    if (children.exact) {
        var nextChildren = __assign({}, children, { exact: false, modkey: false });
        defineExact(m, filters, nextChildren);
    }
    if (children.modkey) {
        var nextChildren = __assign({}, children, { exact: false });
        defineChildModifier(m, filters, "ctrl", function (e) { return e.ctrlKey; }, nextChildren);
        defineChildModifier(m, filters, "shift", function (e) { return e.shiftKey; }, nextChildren);
        defineChildModifier(m, filters, "alt", function (e) { return e.altKey; }, nextChildren);
        defineChildModifier(m, filters, "meta", function (e) { return e.metaKey; }, nextChildren);
        defineChildModifier(m, filters, "noctrl", function (e) { return !e.ctrlKey; }, nextChildren);
        defineChildModifier(m, filters, "noshift", function (e) { return !e.shiftKey; }, nextChildren);
        defineChildModifier(m, filters, "noalt", function (e) { return !e.altKey; }, nextChildren);
        defineChildModifier(m, filters, "nometa", function (e) { return !e.metaKey; }, nextChildren);
    }
    defineChildModifier(m, filters, "stop", function (e) {
        e.stopPropagation();
        return true;
    }, children);
    defineChildModifier(m, filters, "prevent", function (e) {
        e.preventDefault();
        return true;
    }, children);
    defineChildModifier(m, filters, "self", function (e) { return e.target === e.currentTarget; }, children);
    return m;
}
exports.modifiers = createModifier([], {
    keyboard: true,
    mouse: true,
    modkey: true,
    exact: true
});

});

var lib = createCommonjsModule(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(api);

exports.modifiers = modifiers.modifiers;

});

var index = /*@__PURE__*/unwrapExports(lib);

var AvatarSizes;

(function (AvatarSizes) {
  AvatarSizes["xl"] = "avatar-xl";
  AvatarSizes["lg"] = "avatar-lg";
  AvatarSizes["sm"] = "avatar-sm";
  AvatarSizes["xs"] = "avatar-xs";
})(AvatarSizes || (AvatarSizes = {}));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "figure.avatar + figure.avatar {\n  margin-left: 0.4rem; }\n";
styleInject(css_248z);

var Avatar = index.component({
  name: 'Avatar',
  functional: true,
  props: {
    size: {
      type: String,
      "default": undefined
    },
    src: {
      type: String,
      "default": undefined
    },
    initials: {
      type: String,
      "default": undefined
    },
    background: {
      type: String,
      "default": undefined
    },
    color: {
      type: String,
      "default": undefined
    },
    alt: {
      type: String,
      "default": undefined
    },
    presence: {
      type: String,
      "default": undefined
    },
    icon: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;
    var cssClass = ['avatar', AvatarSizes[props.size] || props.size];
    var cssStyles = {
      color: props.color,
      background: props.background
    };
    var initials = props.initials && props.initials.trim().substring(0, 2);
    return h("figure", helper([{}, data, {
      "class": cssClass,
      "style": cssStyles,
      "attrs": {
        "data-initial": initials
      }
    }]), [props.src && h("img", {
      "attrs": {
        "src": props.src,
        "alt": props.alt
      }
    }), props.icon && h("img", {
      "attrs": {
        "src": props.icon
      },
      "staticClass": "avatar-icon"
    }), props.presence && !props.icon && h("i", {
      "class": props.presence,
      "staticClass": "avatar-presence"
    })]);
  }
});

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
var createMethod$2 = function (TYPE) {
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
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6)
};

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
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

var $forEach = arrayIteration.forEach;



var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
var arrayForEach = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype.forEach = arrayForEach;
  }
}

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
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

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH$1 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES$2 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
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
        Constructor = Constructor[SPECIES$2];
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
    throw new TypeError("Argument should be a string. Given: ".concat(_typeof(s)));
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};

var addPrefix = function addPrefix(source) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var prefixWithSuffix = prefix ? prefix + suffix : prefix;
  return prefixWithSuffix + capitalize(source);
};

var makePluggableComponents = function makePluggableComponents() {
  var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      prefix: ''
    };
    Object.keys(components).forEach(function (name) {
      return vue.component(addPrefix(name, options.prefix), components[name]);
    });
  };
};
var makePluggableDirectives = function makePluggableDirectives() {
  var directives = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      prefix: ''
    };
    Object.keys(directives).forEach(function (name) {
      return vue.directive(addPrefix(name, options.prefix, '-'), directives[name]);
    });
  };
};

var AvatarPresences;

(function (AvatarPresences) {
  AvatarPresences["online"] = "online";
  AvatarPresences["busy"] = "busy";
  AvatarPresences["away"] = "away";
  AvatarPresences["offline"] = "offline";
})(AvatarPresences || (AvatarPresences = {}));

var AvatarComponents = makePluggableComponents({
  Avatar: Avatar
});

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED }, {
  concat: function concat(arg) { // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var $filter = arrayIteration.filter;



var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH$2 = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$2 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var $indexOf = arrayIncludes.indexOf;



var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');
var USES_TO_LENGTH$3 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 || !USES_TO_LENGTH$3 }, {
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

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

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

var ITERATOR = wellKnownSymbol('iterator');
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
if ( !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
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

var iterators = {};

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
var ITERATOR$1 = wellKnownSymbol('iterator');
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
  var nativeIterator = IterablePrototype[ITERATOR$1]
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
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
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
  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
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

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
var defineProperty = objectDefineProperty.f;



var METADATA = uid('meta');
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys[METADATA] = true;
});

var ITERATOR$2 = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
};

var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3]
    || it['@@iterator']
    || iterators[classof(it)];
};

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

var iterate_1 = createCommonjsModule(function (module) {
var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES
          ? boundFunction(anObject(step = iterable[index])[0], step[1])
          : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};
});

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var ITERATOR$4 = wellKnownSymbol('iterator');
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
  iteratorWithReturn[ITERATOR$4] = function () {
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
    object[ITERATOR$4] = function () {
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

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(value) {
        nativeMethod.call(this, value === 0 ? 0 : value);
        return this;
      } : KEY == 'delete' ? function (key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'get' ? function get(key) {
        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
      } : KEY == 'has' ? function has(key) {
        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
      } : function set(key, value) {
        nativeMethod.call(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var getWeakData = internalMetadata.getWeakData;








var setInternalState$1 = internalState.set;
var internalStateGetterFor = internalState.getterFor;
var find = arrayIteration.find;
var findIndex = arrayIteration.findIndex;
var id$1 = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

var collectionWeak = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$1(that, {
        type: CONSTRUCTOR_NAME,
        id: id$1++,
        frozen: undefined
      });
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has$1(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

var es_weakMap = createCommonjsModule(function (module) {






var enforceIternalState = internalState.enforce;


var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (nativeWeakMap && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  internalMetadata.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}
});

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

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$2 = internalState.set;
var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$2(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
iterators.Arguments = iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

var ITERATOR$5 = wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME$1 in domIterables) {
  var Collection$1 = global_1[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
  if (CollectionPrototype$1) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype$1[ITERATOR$5] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype$1, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype$1[ITERATOR$5] = ArrayValues;
    }
    if (!CollectionPrototype$1[TO_STRING_TAG$3]) {
      createNonEnumerableProperty(CollectionPrototype$1, TO_STRING_TAG$3, COLLECTION_NAME$1);
    }
    if (domIterables[COLLECTION_NAME$1]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype$1[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype$1, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype$1[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

var uids = new WeakMap();
var uid$1 = function uid(component) {
  if (uids.has(component)) {
    return uids.get(component);
  }

  uids.set(component, String(~~(Math.random() * 1000000000)));
  return uid(component);
};

var IconSizes;

(function (IconSizes) {
  IconSizes["x2"] = "icon-2x";
  IconSizes["x3"] = "icon-3x";
  IconSizes["x4"] = "icon-4x";
})(IconSizes || (IconSizes = {}));

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







var SPECIES$3 = wellKnownSymbol('species');

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
      re.constructor[SPECIES$3] = function () { return re; };
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

var IconNavigation;

(function (IconNavigation) {
  IconNavigation["up"] = "icon-arrow-up";
  IconNavigation["down"] = "icon-arrow-down";
  IconNavigation["right"] = "icon-arrow-right";
  IconNavigation["left"] = "icon-arrow-left";
  IconNavigation["upward"] = "icon-upward";
  IconNavigation["forward"] = "icon-forward";
  IconNavigation["downward"] = "icon-downward";
  IconNavigation["back"] = "icon-back";
  IconNavigation["caret"] = "icon-caret";
  IconNavigation["menu"] = "icon-menu";
  IconNavigation["apps"] = "icon-apps";
  IconNavigation["hMore"] = "icon-more-horiz";
  IconNavigation["vMore"] = "icon-more-vert";
})(IconNavigation || (IconNavigation = {}));

var IconAction;

(function (IconAction) {
  IconAction["hResize"] = "icon-resize-horiz";
  IconAction["vResize"] = "icon-resize-vert";
  IconAction["plus"] = "icon-plus";
  IconAction["minus"] = "icon-minus";
  IconAction["cross"] = "icon-cross";
  IconAction["check"] = "icon-check";
  IconAction["stop"] = "icon-stop";
  IconAction["shutdown"] = "icon-shutdown";
  IconAction["refresh"] = "icon-refresh";
  IconAction["search"] = "icon-search";
  IconAction["flag"] = "icon-flag";
  IconAction["bookmark"] = "icon-bookmark";
  IconAction["edit"] = "icon-edit";
  IconAction["delete"] = "icon-delete";
  IconAction["share"] = "icon-share";
  IconAction["download"] = "icon-download";
  IconAction["upload"] = "icon-upload";
})(IconAction || (IconAction = {}));

var IconObject;

(function (IconObject) {
  IconObject["mail"] = "icon-mail";
  IconObject["people"] = "icon-people";
  IconObject["message"] = "icon-message";
  IconObject["photo"] = "icon-photo";
  IconObject["time"] = "icon-time";
  IconObject["location"] = "icon-location";
  IconObject["link"] = "icon-link";
  IconObject["emoji"] = "icon-emoji";
})(IconObject || (IconObject = {}));

var Icons = Object.assign(Object.assign(Object.assign({}, IconNavigation), IconObject), IconAction);

var Icon = index.component({
  name: 'Icon',
  functional: true,
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;
    var styles = {
      'font-size': IconSizes[props.size] || props.size
    };
    var classes = ['icon', IconSizes[props.size], Icons[props.type] || props.type];
    return h("i", helper([{
      "class": classes,
      "style": styles
    }, data]));
  }
});

var IconComponents = makePluggableComponents({
  Icon: Icon
});

var Accordion = index.componentFactoryOf().create({
  name: 'Accordion',
  props: {
    items: {
      required: true,
      type: [Object, Array]
    },
    checked: {
      type: [String, Number, Array],
      "default": undefined
    },
    name: {
      type: String,
      "default": undefined
    },
    multiple: {
      type: Boolean
    },
    icon: {
      type: String,
      "default": undefined
    }
  },
  computed: {
    $_name: function $_name() {
      return this.name || 'accordion-' + uid$1(this);
    }
  },
  methods: {
    isChecked: function isChecked(key, index) {
      if (!Array.isArray(this.checked)) {
        return !!this.checked && (this.checked === key || this.checked.toString() === index.toString());
      }

      return this.checked.indexOf(index) !== -1 || this.checked.indexOf(key) !== -1;
    },
    toggle: function toggle(event, key, index) {
      if (!this.$listeners.check) return;

      if (!this.multiple) {
        this.$emit('check', key || index || 0);
        return;
      }

      var checked = Array.isArray(this.checked) ? _toConsumableArray(this.checked) : this.checked !== undefined ? [this.checked] : [];

      if (event.target.checked) {
        checked.push(key || index || 0);
      } else {
        checked = checked.filter(function (item) {
          return item !== index && item !== key;
        });
      }

      this.$emit('check', checked);
    }
  },
  render: function render(h) {
    var _this = this;

    var items = Array.isArray(this.items) ? Object.assign({}, this.items) : this.items;
    var accordionItems = Object.keys(items).map(function (key, index) {
      var id = "".concat(_this.$_name, "-").concat(key);
      var type = _this.multiple ? 'checkbox' : 'radio';
      var headerSlot = _this.$scopedSlots['header'];
      var bodySlot = _this.$scopedSlots['body'] || _this.$scopedSlots['default'];
      return h("div", {
        "staticClass": "accordion"
      }, [h("input", {
        "attrs": {
          "id": id,
          "name": _this.$_name,
          "type": type,
          "hidden": true
        },
        "domProps": {
          "checked": _this.isChecked(key, index)
        },
        "on": {
          "input": function input(e) {
            return _this.toggle(e, key, index);
          }
        }
      }), h("label", {
        "staticClass": "accordion-header c-hand",
        "attrs": {
          "for": id
        }
      }, [_this.icon && h(Icon, {
        "attrs": {
          "type": _this.icon
        }
      }), headerSlot && headerSlot({
        header: key,
        item: items[key]
      }), !headerSlot && key]), !bodySlot && h("div", {
        "staticClass": "accordion-body",
        "domProps": {
          "innerHTML": items[key]
        }
      }), bodySlot && h("div", {
        "staticClass": "accordion-body"
      }, [bodySlot({
        header: key,
        item: items[key]
      })])]);
    });
    return h("div", {
      "staticClass": "accordion-container"
    }, [accordionItems]);
  }
});

var AccordionComponents = makePluggableComponents({
  Accordion: Accordion
});

var Card = index.component({
  name: 'Card',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("div", {
      "staticClass": "card"
    }, [children]);
  }
});

var CardBody = index.component({
  name: 'CardBody',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("div", {
      "staticClass": "card-body"
    }, [children]);
  }
});

var CardFooter = index.component({
  name: 'CardFooter',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("div", {
      "staticClass": "card-footer"
    }, [children]);
  }
});

var CardHeader = index.component({
  name: 'CardHeader',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("div", {
      "staticClass": "card-header"
    }, [children]);
  }
});

var CardImage = index.component({
  name: 'CardImage',
  functional: true,
  props: {
    img: {
      type: String,
      required: true
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props;
    return h("div", {
      "staticClass": "card-image"
    }, [h("img", {
      "attrs": {
        "src": props.img
      },
      "staticClass": "img-responsive"
    })]);
  }
});

var CardImagePositions;

(function (CardImagePositions) {
  CardImagePositions["before"] = "before";
  CardImagePositions["after"] = "after";
})(CardImagePositions || (CardImagePositions = {}));

var CardImageSlots;

(function (CardImageSlots) {
  CardImageSlots["header"] = "header";
  CardImageSlots["body"] = "body";
  CardImageSlots["footer"] = "footer";
})(CardImageSlots || (CardImageSlots = {}));

var CardComponents = makePluggableComponents({
  Card: Card,
  CardBody: CardBody,
  CardFooter: CardFooter,
  CardHeader: CardHeader,
  CardImage: CardImage
});

var sizeValidator = function sizeValidator(size) {
  return size % 1 === 0 && size > 0 && size <= 12;
};

var cssClass = function cssClass(props) {
  return ['column', props.mr ? 'col-mr-auto' : '', props.ml ? 'col-ml-auto' : '', props.mx ? 'col-mx-auto' : '', props.xs ? "col-xs-".concat(props.xs) : '', props.sm ? "col-sm-".concat(props.sm) : '', props.md ? "col-md-".concat(props.md) : '', props.lg ? "col-lg-".concat(props.lg) : '', props.xl ? "col-xl-".concat(props.xl) : '', props.col ? "col-".concat(props.col) : '', props.hide ? "hide-".concat(props.hide) : '', props.show ? "show-".concat(props.show) : ''];
};

var Column = index.createComponent({
  name: 'Column',
  functional: true,
  props: {
    ml: {
      type: Boolean
    },
    mx: {
      type: Boolean
    },
    mr: {
      type: Boolean
    },
    xs: {
      type: [Number, String],
      validator: sizeValidator
    },
    sm: {
      type: [Number, String],
      validator: sizeValidator
    },
    md: {
      type: [Number, String],
      validator: sizeValidator
    },
    lg: {
      type: [Number, String],
      validator: sizeValidator
    },
    xl: {
      type: [Number, String],
      validator: sizeValidator
    },
    col: {
      type: [Number, String],
      validator: sizeValidator
    },
    hide: {
      type: [Number, String],
      validator: sizeValidator
    },
    show: {
      type: [Number, String],
      validator: sizeValidator
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        data = _ref.data;
    return h("div", helper([{
      "class": cssClass(props)
    }, data]), [children]);
  }
});

var ColumnComponents = makePluggableComponents({
  Column: Column
});

var Columns = index.createComponent({
  name: 'Columns',
  functional: true,
  props: {
    gapless: Boolean,
    oneline: Boolean
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        data = _ref.data;
    var cssClasses = ['columns', props.gapless && 'col-gapless', props.oneline && 'col-oneline'];
    return h("div", helper([{
      "class": cssClasses
    }, data]), [children]);
  }
});

var ColumnsComponents = makePluggableComponents({
  Columns: Columns
});

var Grids;

(function (Grids) {
  Grids["xs"] = "grid-xs";
  Grids["sm"] = "grid-sm";
  Grids["md"] = "grid-md";
  Grids["lg"] = "grid-lg";
  Grids["xl"] = "grid-xl";
})(Grids || (Grids = {}));

var Container = index.createComponent({
  name: 'Container',
  functional: true,
  props: {
    grid: {
      type: String
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        data = _ref.data;
    var cssClasses = ['container', Grids[props.grid]];
    return h("div", helper([{
      "class": cssClasses
    }, data]), [children]);
  }
});

var ContainerComponents = makePluggableComponents({
  Container: Container
});

var Bar = index.component({
  name: 'Bar',
  functional: true,
  props: {
    sm: {
      type: Boolean
    },
    min: {
      type: Number,
      "default": 0
    },
    max: {
      type: Number,
      "default": 100
    },
    value: {
      type: Number,
      "default": 0
    },
    tooltip: {
      type: [String, Function],
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props;
    var barCssClass = ['bar', props.sm && 'bar-sm'];
    var barItemCssClass = ['bar-item', props.tooltip && 'tooltip'];
    var barItemStyles = {
      width: props.value / props.max * 100 + '%'
    };
    return h("div", {
      "class": barCssClass
    }, [h("div", {
      "class": barItemCssClass,
      "style": barItemStyles,
      "attrs": {
        "data-tooltip": props.tooltip,
        "aria-valuenow": props.value,
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "role": "progressbar"
      }
    })]);
  }
});

var BarComponents = makePluggableComponents({
  Bar: Bar
});

var Breadcrumb = index.component({
  name: 'Breadcrumb',
  functional: true,
  props: {
    crumbs: {
      type: Array,
      required: true
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        scopedSlots = _ref.scopedSlots;
    var crumbs = props.crumbs.map(function (crumb) {
      var slot = scopedSlots["default"] && scopedSlots["default"]({
        crumb: crumb
      });
      var text = h("a", {
        "attrs": {
          "href": crumb.path
        }
      }, [crumb.title]);
      return h("li", {
        "staticClass": "breadcrumb-item"
      }, [slot || text]);
    });
    return h("ul", {
      "staticClass": "breadcrumb"
    }, [crumbs]);
  }
});

var BreadcrumbComponents = makePluggableComponents({
  Breadcrumb: Breadcrumb
});

var css_248z$1 = ".btn + .btn {\n  margin-left: 0.4rem; }\n\n.btn:not(.btn-action) .icon {\n  margin: 0 0 0 0.2rem; }\n  .btn:not(.btn-action) .icon.left {\n    margin: 0 0.2rem 0 0; }\n";
styleInject(css_248z$1);

var BtnTypes;

(function (BtnTypes) {
  BtnTypes["primary"] = "btn-primary";
  BtnTypes["link"] = "btn-link";
  BtnTypes["success"] = "btn-success";
  BtnTypes["error"] = "btn-error";
  BtnTypes["clear"] = "btn-clear";
})(BtnTypes || (BtnTypes = {}));

var BtnSizes;

(function (BtnSizes) {
  BtnSizes["sm"] = "btn-sm";
  BtnSizes["lg"] = "btn-lg";
  BtnSizes["block"] = "btn-block";
})(BtnSizes || (BtnSizes = {}));

var BtnStates;

(function (BtnStates) {
  BtnStates["active"] = "active";
  BtnStates["disabled"] = "disabled";
  BtnStates["loading"] = "loading";
})(BtnStates || (BtnStates = {}));

var Btn = index.componentFactoryOf().create({
  name: 'Btn',
  functional: true,
  props: {
    type: {
      type: String
    },
    size: {
      type: String
    },
    icon: {
      type: String
    },
    state: {
      type: String
    },
    tabindex: {
      type: [Number, String],
      "default": undefined
    },
    left: {
      type: Boolean
    },
    circle: {
      type: Boolean
    },
    action: {
      type: Boolean
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;
    var cssClass = ['btn', BtnTypes[props.type] || props.type, BtnSizes[props.size] || props.size, BtnStates[props.state] || props.state, props.action && props.circle && 's-circle', props.action && 'btn-action'];
    var leftIcon = props.icon && props.left ? h(Icon, {
      "attrs": {
        "type": props.icon
      },
      "class": "left"
    }) : '';
    var rightIcon = props.icon && !props.left ? h(Icon, {
      "attrs": {
        "type": props.icon
      }
    }) : '';
    var content = !props.action && slots()["default"];
    return h("button", helper([{
      "class": cssClass
    }, data]), [leftIcon, content, rightIcon]);
  }
});

var BtnGroup = index.component({
  name: 'BtnGroup',
  functional: true,
  props: {
    block: {
      type: Boolean
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        slots = _ref.slots;
    var cssClass = ['btn-group', props.block && 'btn-group-block'];
    return h("div", helper([{
      "class": cssClass
    }, data]), [slots()["default"]]);
  }
});

var BtnComponents = makePluggableComponents({
  Btn: Btn,
  BtnGroup: BtnGroup
});

// `String.prototype.small` method
// https://tc39.github.io/ecma262/#sec-string.prototype.small
_export({ target: 'String', proto: true, forced: stringHtmlForced('small') }, {
  small: function small() {
    return createHtml(this, 'small', '', '');
  }
});

/* eslint-disable @typescript-eslint/ban-types */
var flattenListener = function flattenListener(listener) {
  var flatten;

  if (listener) {
    flatten = Array.isArray(listener) ? listener : [listener];
  } else {
    flatten = [function () {
      /* noop */
    }];
  }

  return function (event) {
    return flatten.forEach(function (l) {
      return l(event);
    });
  };
};

var Chip = index.componentFactoryOf().create({
  name: 'Chip',
  functional: true,
  props: {
    active: {
      type: Boolean
    },
    text: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      "default": undefined
    },
    initials: {
      type: String,
      "default": undefined
    },
    small: {
      type: Boolean
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        listeners = _ref.listeners;
    var cssClass = ['chip', props.active && 'active'];
    var avatar = (props.avatar || props.initials) && h(Avatar, {
      "attrs": {
        "src": props.avatar,
        "size": props.small ? 'sm' : undefined,
        "initials": props.initials
      }
    });
    var closeBtn = listeners.close && h("a", {
      "staticClass": "btn btn-clear",
      "attrs": {
        "aria-label": "Close",
        "role": "button"
      },
      "on": {
        "click": flattenListener(listeners.close)
      }
    });
    return h("span", {
      "class": cssClass
    }, [avatar, props.text, closeBtn]);
  }
});

var ChipComponents = makePluggableComponents({
  Chip: Chip
});

var Divider = index.component({
  name: 'Divider',
  functional: true,
  props: {
    vert: {
      type: Boolean
    },
    content: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        slots = _ref.slots,
        data = _ref.data;
    var classes = ['text-center', props.vert && 'divider-vert', !props.vert && 'divider'];
    var dataContent = props.content || slots()["default"] && slots()["default"][0].text;
    return h("div", helper([{
      "class": classes,
      "attrs": {
        "data-content": dataContent
      }
    }, data]));
  }
});

var DividerComponents = makePluggableComponents({
  Divider: Divider
});

var TagTypes;

(function (TagTypes) {
  TagTypes["primary"] = "label-primary";
  TagTypes["secondary"] = "label-secondary";
  TagTypes["success"] = "label-success";
  TagTypes["warning"] = "label-warning";
  TagTypes["error"] = "label-error";
})(TagTypes || (TagTypes = {}));

var css_248z$2 = ".label + .label {\n  margin-left: 0.3rem; }\n";
styleInject(css_248z$2);

var Tag = index.component({
  name: 'Tag',
  functional: true,
  props: {
    type: {
      type: String,
      "default": undefined
    },
    rounded: {
      type: Boolean
    }
  },
  render: function render(h, _ref) {
    var slots = _ref.slots,
        props = _ref.props,
        data = _ref.data;
    var classes = ['label', TagTypes[props.type], props.rounded && 'label-rounded'];
    return h("span", helper([{
      "class": classes
    }, data]), [slots()["default"]]);
  }
});

var TagComponents = makePluggableComponents({
  Tag: Tag
});

var VerticalMenuItemBadge = index.component({
  name: 'VerticalMenuItemBadge',
  functional: true,
  props: {
    type: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children;
    return h("div", {
      "class": "menu-badge"
    }, [h(Tag, {
      "attrs": {
        "type": props.type
      }
    }, [children])]);
  }
});

var VerticalMenuItem = index.component({
  name: 'VerticalMenuItem',
  functional: true,
  props: {
    active: {
      type: Boolean
    },
    badge: {
      type: [String, Number],
      "default": undefined
    },
    text: {
      type: String,
      "default": undefined
    },
    path: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children;

    if (children && children.length) {
      return h("li", {
        "staticClass": "menu-item"
      }, [children]);
    }

    var badge = props.badge && h(VerticalMenuItemBadge, {
      "attrs": {
        "type": "primary"
      }
    }, [props.badge]);
    var link = h("a", {
      "attrs": {
        "href": props.path
      },
      "class": props.active && 'active'
    }, [props.text]);
    return h("li", {
      "staticClass": "menu-item"
    }, [badge, " ", link]);
  }
});

var normalizeDivider = function normalizeDivider(divider) {
  return typeof divider === 'string' ? divider : '';
};

var VerticalMenuDivider = index.component({
  name: 'VerticalMenuDivider',
  functional: true,
  props: {
    text: {
      type: [String, Boolean],
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props;
    return h("li", {
      "staticClass": "divider",
      "attrs": {
        "data-content": normalizeDivider(props.text)
      }
    });
  }
});

var VerticalMenu = index.component({
  name: 'VerticalMenu',
  functional: true,
  props: {
    items: {
      type: [Array, Object],
      "default": function _default() {
        return [];
      }
    },
    active: {
      type: [Number, String],
      "default": ''
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots,
        data = _ref.data;

    if (!props.items) {
      throw new TypeError('Items cannot be empty');
    }

    var items = Array.isArray(props.items) ? Object.assign({}, props.items) : props.items;
    var menuItems = Object.keys(items).map(function (key) {
      if (items[key].divider) {
        return h(VerticalMenuDivider, {
          "attrs": {
            "text": items[key].divider
          }
        });
      }

      return h(VerticalMenuItem, {
        "attrs": {
          "active": key.toString() === props.active.toString(),
          "badge": items[key].badge,
          "path": items[key].path,
          "text": items[key].text
        }
      }, [scopedSlots["default"] && scopedSlots["default"]({
        item: items[key],
        index: key
      })]);
    });
    return h("ul", helper([{}, data, {
      "class": ['menu', data["class"]]
    }]), [slots()["default"], menuItems]);
  }
});

var VerticalMenuComponents = makePluggableComponents({
  VerticalMenu: VerticalMenu,
  VerticalMenuDivider: VerticalMenuDivider,
  VerticalMenuItem: VerticalMenuItem,
  VerticalMenuItemBadge: VerticalMenuItemBadge
});

var DropdownMenu = index.component({
  name: 'DropdownMenu',
  functional: true,
  props: {
    items: {
      type: [Object, Array],
      "default": undefined
    },
    right: {
      type: Boolean
    },
    btnType: {
      type: String,
      "default": undefined
    },
    btnText: {
      type: String,
      "default": undefined
    },
    btnIcon: {
      type: String,
      "default": undefined
    },
    state: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        listeners = _ref.listeners,
        scopedSlots = _ref.scopedSlots;

    var onOpen = function onOpen() {
      return flattenListener(listeners.opened);
    };

    var onClose = function onClose() {
      return flattenListener(listeners.closed);
    };

    var btnCssClass = ['dropdown-toggle', BtnTypes[props.btnType]];
    var btn = h(Btn, {
      "class": btnCssClass,
      "attrs": {
        "tabindex": "0",
        "icon": props.btnIcon || 'caret',
        "state": props.state
      },
      "on": {
        "focus": onOpen,
        "blur": onClose
      }
    }, [props.btnText]);
    return h("div", {
      "staticClass": "dropdown",
      "class": props.right && 'dropdown-right'
    }, [btn, h(VerticalMenu, {
      "attrs": {
        "items": props.items
      },
      "scopedSlots": {
        "default": scopedSlots["default"]
      }
    })]);
  }
});

var DropdownMenuComponents = makePluggableComponents({
  DropdownMenu: DropdownMenu
});

// `String.prototype.sub` method
// https://tc39.github.io/ecma262/#sec-string.prototype.sub
_export({ target: 'String', proto: true, forced: stringHtmlForced('sub') }, {
  sub: function sub() {
    return createHtml(this, 'sub', '', '');
  }
});

var EmptyTitle = index.component({
  name: 'EmptyTitle',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("p", {
      "staticClass": "empty-title h5"
    }, [children]);
  }
});

var EmptySubtitle = index.component({
  name: 'EmptySubtitle',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("p", {
      "staticClass": "empty-title"
    }, [children]);
  }
});

var EmptyIcon = index.component({
  name: 'EmptyIcon',
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props;
    return h("div", {
      "staticClass": "empty-icon"
    }, [h(Icon, {
      "attrs": {
        "type": props.icon,
        "size": "x3"
      }
    })]);
  }
});

var EmptyContent = index.component({
  name: 'EmptyContent',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("div", {
      "staticClass": "empty-content"
    }, [children]);
  }
});

var EmptyAction = index.component({
  name: 'EmptyAction',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("p", {
      "staticClass": "empty-action"
    }, [children]);
  }
});

var Empty = index.component({
  name: 'Empty',
  functional: true,
  props: {
    icon: {
      type: String,
      "default": undefined
    },
    title: {
      type: String,
      "default": undefined
    },
    sub: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        slots = _ref.slots;
    var title = props.title && h(EmptyTitle, [props.title]);
    var sub = props.sub && h(EmptySubtitle, [props.sub]);
    var icon = props.icon && h(EmptyIcon, {
      "attrs": {
        "icon": props.icon
      }
    });

    var _slots = slots();

    var content = _slots.content && h(EmptyContent, [_slots.content]);
    var actions = _slots.action && h(EmptyAction, [_slots.action]);
    return h("div", {
      "staticClass": "empty"
    }, [icon, title, sub, content, actions, _slots["default"]]);
  }
});

var EmptyComponents = makePluggableComponents({
  Empty: Empty,
  EmptyAction: EmptyAction,
  EmptyContent: EmptyContent,
  EmptyIcon: EmptyIcon,
  EmptySubtitle: EmptySubtitle,
  EmptyTitle: EmptyTitle
});

var ModalSizes;

(function (ModalSizes) {
  ModalSizes["sm"] = "modal-sm";
  ModalSizes["lg"] = "modal-lg";
})(ModalSizes || (ModalSizes = {}));

var ModalHeader = index.componentFactoryOf().create({
  name: 'ModalHeader',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        listeners = _ref.listeners;
    var close = listeners.close && h(Btn, {
      "staticClass": "float-right",
      "attrs": {
        "aria-label": "Close",
        "type": "clear"
      },
      "on": {
        "click": function click() {
          return flattenListener(listeners.close)(false);
        }
      }
    });
    return h("div", {
      "class": "modal-header"
    }, [close, children]);
  }
});

var ModalBody = index.component({
  name: 'ModalBody',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("div", {
      "class": "modal-body"
    }, [h("div", {
      "class": "content"
    }, [children])]);
  }
});

var ModalFooter = index.component({
  name: 'ModalFooter',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children;
    return h("div", {
      "class": "modal-footer"
    }, [children]);
  }
});

var Modal = index.componentFactoryOf().create({
  name: 'Modal',
  functional: true,
  props: {
    show: {
      type: Boolean
    },
    size: {
      type: String,
      "default": undefined
    },
    overlay: {
      type: Boolean,
      "default": true
    },
    closeBtn: {
      type: Boolean,
      "default": true
    },
    closeOverlay: {
      type: Boolean,
      "default": true
    }
  },
  model: {
    prop: 'show',
    event: 'close'
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        slots = _ref.slots,
        listeners = _ref.listeners;
    var close = flattenListener(listeners.close);
    var closeOverlay = props.closeOverlay ? close : function () {
      /*noop*/
    };
    var cssClass = ['modal', props.show && 'active', ModalSizes[props.size] || props.size];
    var overlay = props.overlay && h("a", {
      "staticClass": "modal-overlay",
      "attrs": {
        "aria-label": "Close"
      },
      "on": {
        "click": function click() {
          return closeOverlay(false);
        }
      }
    });

    var _slots = slots();

    return h("div", {
      "class": cssClass
    }, [overlay, h("div", {
      "staticClass": "modal-container"
    }, [_slots.header && h(ModalHeader, {
      "on": {
        "close": props.closeBtn && close
      }
    }, [_slots.header]), _slots.body && h(ModalBody, [_slots.body]), _slots.footer && h(ModalFooter, [_slots.footer]), _slots["default"]])]);
  }
});

var ModalComponents = makePluggableComponents({
  Modal: Modal,
  ModalBody: ModalBody,
  ModalFooter: ModalFooter,
  ModalHeader: ModalHeader
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var mergeCss = function mergeCss(data, staticClass, cssClass) {
  return [data["class"], data.staticClass, cssClass, staticClass];
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

var OffCanvasToggle = index.componentFactoryOf().create({
  name: 'OffCanvasToggle',
  functional: true,
  props: {
    icon: {
      type: String,
      "default": 'menu'
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children,
        listeners = _ref.listeners;
    var cssClass = mergeCss(data, 'off-canvas-toggle');
    var onClick = flattenListener(listeners.click);
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [h("a", {
      "staticClass": "btn btn-primary btn-action",
      "on": {
        "click": onClick
      }
    }, [children.length && children || h(Icon, {
      "attrs": {
        "type": props.icon
      }
    })])]);
  }
});

var OffCanvasSidebar = index.component({
  name: 'OffCanvasSidebar',
  functional: true,
  props: {
    active: {
      type: Boolean,
      "default": false
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;
    var cssClass = mergeCss(data, 'off-canvas-sidebar', [props.active && 'active']);
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var OffCanvasOverlay = index.componentFactoryOf().create({
  name: 'OffCanvasOverlay',
  functional: true,
  props: {
    opacity: {
      type: [Number, String],
      "default": 0.1
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        listeners = _ref.listeners,
        props = _ref.props;
    var cssClass = mergeCss(data, 'off-canvas-overlay');
    var onClick = flattenListener(listeners.click);
    return h("a", helper([{}, data, {
      "class": cssClass,
      "on": {
        "click": onClick
      },
      "style": "background: rgba(48, 55, 66, ".concat(props.opacity, ")")
    }]));
  }
});

var OffCanvasContent = index.component({
  name: 'OffCanvasContent',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'off-canvas-content');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var OffCanvas = index.component({
  name: 'OffCanvas',
  props: {
    icon: {
      type: String,
      "default": 'menu'
    },
    sidebar: {
      type: Boolean,
      "default": true
    },
    overlay: {
      type: [Number, String],
      "default": 0.1
    },
    closeOnOverlay: {
      type: Boolean,
      "default": true
    }
  },
  data: function data() {
    return {
      active: false
    };
  },
  methods: {
    showSidebar: function showSidebar() {
      this.active = true;
    },
    hideSidebar: function hideSidebar() {
      this.active = false;
    }
  },
  render: function render(h) {
    var _this = this;

    var toggle = h(OffCanvasToggle, {
      "attrs": {
        "icon": this.icon
      },
      "on": {
        "click": this.showSidebar
      }
    }, [this.$slots.icon]);
    var sidebar = this.$slots.sidebar && h(OffCanvasSidebar, {
      "attrs": {
        "active": this.active
      }
    }, [this.$slots.sidebar]);
    var overlay = this.overlay && h(OffCanvasOverlay, {
      "attrs": {
        "opacity": this.overlay
      },
      "on": {
        "click": function click() {
          _this.closeOnOverlay && _this.hideSidebar();
        }
      }
    });
    var content = this.$slots.content && h(OffCanvasContent, [this.$slots.content]);
    var cssClass = ['off-canvas', this.sidebar && 'off-canvas-sidebar-show'];
    var sloted = this.$slots["default"] && h("div", {
      "class": cssClass
    }, [this.$slots["default"]]);
    var offCanvas = h("div", helper([{
      "class": ['off-canvas', this.sidebar && 'off-canvas-sidebar-show']
    }, this.$attrs]), [toggle, sidebar, overlay, content]);
    return sloted || offCanvas;
  }
});

var OffCanvasComponents = makePluggableComponents({
  OffCanvas: OffCanvas,
  OffCanvasContent: OffCanvasContent,
  OffCanvasOverlay: OffCanvasOverlay,
  OffCanvasSidebar: OffCanvasSidebar,
  OffCanvasToggle: OffCanvasToggle
});

var SimplePager = index.componentFactoryOf().create({
  name: 'SimplePager',
  functional: true,
  props: {
    pages: {
      type: Array,
      required: true
    },
    current: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        listeners = _ref.listeners;

    var change = function change(page) {
      return function () {
        return flattenListener(listeners.change)(page);
      };
    };

    var currentIndex = props.pages.indexOf(props.current);
    var previous = props.pages[currentIndex - 1];
    var next = props.pages[currentIndex + 1];
    return h("ul", {
      "class": "pagination"
    }, [previous && h("li", {
      "staticClass": "page-item page-prev"
    }, [h("a", {
      "on": {
        "click": change(previous)
      }
    }, [h("div", {
      "staticClass": "page-item-subtitle"
    }, ["Previous"]), h("div", {
      "staticClass": "page-item-title h5"
    }, [previous])])]), next && h("li", {
      "staticClass": "page-item page-next"
    }, [h("a", {
      "on": {
        "click": change(next)
      }
    }, [h("div", {
      "staticClass": "page-item-subtitle"
    }, ["Next"]), h("div", {
      "staticClass": "page-item-title h5"
    }, [next])])])]);
  }
});

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

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: arrayFrom
});

var SEPARATOR = ' ... ';

var items = function items(pages, current, show) {
  var half = Math.round((show + 1) / 2);

  if (current <= half) {
    return [].concat(_toConsumableArray(Array.from({
      length: show - 1
    }, function (v, i) {
      return i + 1;
    })), [SEPARATOR, pages]);
  }

  if (current + half > pages) {
    return [1, SEPARATOR].concat(_toConsumableArray(Array.from({
      length: show - 1
    }, function (v, i) {
      return pages - show + 2 + i;
    })));
  }

  var mediana = Math.floor((show - 4) / 2);
  return [1, SEPARATOR].concat(_toConsumableArray(Array.from({
    length: show - 3
  }, function (v, i) {
    return current - mediana + i;
  })), [SEPARATOR, pages]);
};

var Pager = index.componentFactoryOf().create({
  name: 'Pager',
  functional: true,
  props: {
    pages: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      "default": 1
    },
    show: {
      type: Number,
      "default": 6
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        listeners = _ref.listeners;

    var change = function change(page) {
      return function () {
        return flattenListener(listeners.change)(page);
      };
    };

    var pages = items(props.pages, props.current, props.show).map(function (page) {
      return h("li", {
        "staticClass": "page-item page-item-num",
        "class": props.current == page && 'active'
      }, [page === SEPARATOR && h("span", [page]), page !== SEPARATOR && h("a", {
        "on": {
          "click": change(page)
        }
      }, [page])]);
    });
    return h("ul", {
      "staticClass": "pagination"
    }, [h("li", {
      "staticClass": "page-item",
      "class": props.current == 1 && 'disabled'
    }, [h("a", {
      "attrs": {
        "tabindex": -1
      },
      "on": {
        "click": change(props.current - 1)
      }
    }, ["Previous"])]), pages, h("li", {
      "staticClass": "page-item",
      "class": props.current == props.pages && 'disabled'
    }, [h("a", {
      "on": {
        "click": change(props.current + 1)
      }
    }, ["Next"])])]);
  }
});

var css_248z$3 = ".page-item-num {\n  min-width: 1.4rem; }\n\n@media (min-width: 640px) {\n  .page-item-num {\n    min-width: 1.7rem; } }\n\n.page-item a {\n  cursor: pointer;\n  user-select: none; }\n";
styleInject(css_248z$3);

var Pagination = index.componentFactoryOf().create({
  name: 'Pagination',
  functional: true,
  model: {
    prop: 'current',
    event: 'change'
  },
  props: {
    pages: {
      type: [Number, Array],
      required: true
    },
    current: {
      type: [Number, String],
      "default": undefined
    },
    show: {
      type: Number,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        listeners = _ref.listeners;
    var change = flattenListener(listeners.change);

    if (Array.isArray(props.pages)) {
      return h(SimplePager, {
        "attrs": {
          "pages": props.pages,
          "current": String(props.current)
        },
        "on": {
          "change": change
        }
      });
    }

    return h(Pager, {
      "attrs": {
        "pages": props.pages,
        "current": Number(props.current)
      },
      "on": {
        "change": change
      }
    });
  }
});

var PaginationComponents = makePluggableComponents({
  Pagination: Pagination
});

var PanelHeader = index.component({
  name: 'PanelHeader',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;
    var cssClass = mergeCss(data, 'panel-header');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var PanelNav = index.component({
  name: 'PanelNav',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;
    var cssClass = mergeCss(data, 'panel-nav');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var PanelBody = index.component({
  name: 'PanelBody',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;
    var cssClass = mergeCss(data, 'panel-body');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var PanelFooter = index.component({
  name: 'PanelFooter',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;
    var cssClass = mergeCss(data, 'panel-footer');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var Panel = index.component({
  name: 'Panel',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        slots = _ref.slots;
    var cssClass = mergeCss(data, 'panel');

    var _slots = slots(),
        header = _slots.header,
        nav = _slots.nav,
        body = _slots.body,
        footer = _slots.footer,
        _default = _slots["default"];

    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [header && h(PanelHeader, [header]), nav && h(PanelNav, [nav]), body && h(PanelBody, [body]), footer && h(PanelFooter, [footer]), _default]);
  }
});

var PanelComponents = makePluggableComponents({
  Panel: Panel,
  PanelBody: PanelBody,
  PanelHeader: PanelHeader,
  PanelFooter: PanelFooter,
  PanelNav: PanelNav
});

var $includes = arrayIncludes.includes;



var USES_TO_LENGTH$5 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$5 }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

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

var PopoverSides;

(function (PopoverSides) {
  PopoverSides["right"] = "popover-right";
  PopoverSides["left"] = "popover-left";
  PopoverSides["bottom"] = "popover-bottom";
  PopoverSides["top"] = "";
})(PopoverSides || (PopoverSides = {}));

var Popover = index.component({
  name: 'Popover',
  functional: true,
  props: {
    side: {
      type: String,
      "default": undefined,
      validator: function validator(side) {
        return Object.keys(PopoverSides).includes(side);
      }
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children;
    var cssClass = mergeCss(data, 'popover', [PopoverSides[props.side]]);
    var activator = children.shift();
    return h("div", {
      "class": cssClass
    }, [activator, h("div", {
      "staticClass": "popover-container"
    }, [children])]);
  }
});

var PopoverComponents = makePluggableComponents({
  Popover: Popover
});

var Step = index.component({
  name: 'Step',
  functional: true,
  props: {
    active: {
      type: Boolean
    },
    tooltip: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;
    var cssClass = mergeCss(data, '', ['step-item', props.active && 'active', props.tooltip && 'tooltip']);
    return h("span", helper([{}, data, {
      "class": cssClass,
      "attrs": {
        "data-tooltip": props.tooltip
      }
    }]), [h("a", [children])]);
  }
});

var Steps = index.component({
  name: 'Steps',
  functional: true,
  props: {
    items: {
      type: [Array, Object],
      "default": function _default() {
        return [];
      }
    },
    active: {
      type: [Number, String],
      "default": 1
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children;
    var cssClass = mergeCss(data, 'step');
    var items = Array.isArray(props.items) ? Object.assign({}, props.items) : props.items;
    var steps = Object.keys(items).map(function (key, index) {
      var active = String(index) === key ? props.active == index + 1 : props.active == key;
      return h(Step, {
        "attrs": {
          "tooltip": items[key].tooltip,
          "active": active
        }
      }, [items[key].name]);
    });
    children.forEach(function (child, i) {
      if (i + 1 == props.active) {
        child.data["class"].push('active');
      }
    });
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [steps.length && steps || children]);
  }
});

var StepComponents = makePluggableComponents({
  Steps: Steps,
  Step: Step
});

var css_248z$4 = ".tab .tab-item {\n  cursor: pointer;\n  user-select: none; }\n";
styleInject(css_248z$4);

var Tab = index.componentFactoryOf().create({
  name: 'Tab',
  functional: true,
  props: {
    active: {
      type: Boolean,
      "default": false
    },
    badge: {
      type: [String, Number],
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;
    var cssClass = mergeCss(data, 'tab-item', [props.active && 'active']);
    return h("span", helper([{}, data, {
      "class": cssClass
    }]), [h("a", {
      "class": [props.badge && 'badge'],
      "attrs": {
        "data-badge": props.badge
      }
    }, [children])]);
  }
});

var TabAction = index.component({
  name: 'TabAction',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'tab-item tab-action');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var Tabs = index.componentFactoryOf().create({
  name: 'Tabs',
  functional: true,
  model: {
    prop: 'current',
    event: 'change'
  },
  props: {
    current: {
      type: [String, Number],
      "default": 0
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
  render: function render(h, _ref) {
    var data = _ref.data,
        slots = _ref.slots,
        scopedSlots = _ref.scopedSlots,
        props = _ref.props,
        listeners = _ref.listeners;
    var items = props.items,
        current = props.current,
        block = props.block;
    var cssClass = mergeCss(data, 'tab', [block && 'tab-block']);

    var onChange = function onChange(tabIndex) {
      return function () {
        return flattenListener(listeners.change)(tabIndex);
      };
    };

    var _slots = slots();

    var children = _slots["default"];
    var tabs = items.map(function (item, index) {
      var key = typeof item === 'string' ? item : item.key || index;
      var isActive = current === key;
      return h(Tab, {
        "attrs": {
          "active": isActive,
          "badge": item.badge
        },
        "on": {
          "click": onChange(key)
        }
      }, [scopedSlots.tab && scopedSlots.tab({
        item: item,
        index: index
      }), !scopedSlots.tab && item]);
    });
    (children || []).filter(function (child) {
      return child.data && child.data["class"] && child.data["class"].includes('tab-item');
    }).forEach(function (tab, i) {
      var isActive = i === current;

      if (tab.data) {
        tab.data["class"] = [].concat(_toConsumableArray(tab.data["class"]), [isActive && 'active']);
        tab.data.on = Object.assign(Object.assign({}, tab.data.on), {
          click: [onChange(i), flattenListener(tab.data.on && tab.data.on.click)]
        });
      } else {
        tab.data.on = {
          click: onChange(tab.key || i)
        };
      }

      return tab;
    });
    var action = _slots.action && h(TabAction, [_slots.action]);
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children || tabs, action]);
  }
});

var TabComponents = makePluggableComponents({
  Tabs: Tabs,
  Tab: Tab,
  TabAction: TabAction
});

var css_248z$5 = ".tile .tile-icon .icon {\n  display: flex;\n  height: 2rem;\n  width: 2.4rem; }\n";
styleInject(css_248z$5);

var TileIcon = index.component({
  name: 'TileIcon',
  functional: true,
  props: {
    icon: {
      type: String,
      "default": undefined
    },
    avatar: {
      type: String,
      "default": undefined
    },
    initials: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        _ref$children = _ref.children,
        children = _ref$children === void 0 ? [] : _ref$children;
    var cssClass = mergeCss(data, 'tile-icon');
    var avatar = (props.avatar || props.initials) && h(Avatar, {
      "attrs": {
        "initials": props.initials,
        "src": props.avatar,
        "size": "lg"
      }
    });
    var icon = props.icon && h(Icon, {
      "attrs": {
        "type": props.icon,
        "size": "x2"
      }
    });
    return h("div", helper([{
      "class": cssClass
    }, data]), [children, !children.length && avatar, !children.length && icon]);
  }
});

var TileTitle = index.component({
  name: 'TileTitle',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'tile-title');
    return h("p", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var TileSubtitle = index.component({
  name: 'TileSubtitle',
  functional: true,
  props: {
    compact: {
      type: Boolean
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children,
        props = _ref.props;
    var cssClass = mergeCss(data, 'tile-subtitle');
    return props.compact ? h("small", helper([{}, data, {
      "class": cssClass
    }]), [children]) : h("p", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var TileContent = index.component({
  name: 'TileContent',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'tile-content');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var TileAction = index.component({
  name: 'TileAction',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'tile-action');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var Tile = index.component({
  name: 'Tile',
  functional: true,
  props: {
    compact: {
      type: Boolean
    },
    title: {
      type: String,
      "default": undefined
    },
    subtitle: {
      type: String,
      "default": undefined
    },
    icon: {
      type: String,
      "default": undefined
    },
    avatar: {
      type: String,
      "default": undefined
    },
    initials: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        slots = _ref.slots,
        props = _ref.props;

    var _slots = slots() || [];

    var cssClass = mergeCss(data, 'tile', {
      'tile-centered': props.compact
    });
    var icon = (props.icon || props.avatar || props.initials || _slots.icon) && h(TileIcon, {
      "attrs": {
        "avatar": props.avatar,
        "icon": props.icon,
        "initials": props.initials
      }
    }, [_slots.icon]);
    var title = props.title && h(TileTitle, {
      "domProps": {
        "innerHTML": props.title
      }
    });
    var subtitle = props.subtitle && h(TileSubtitle, {
      "attrs": {
        "compact": props.compact
      },
      "domProps": {
        "innerHTML": props.subtitle
      }
    });
    var content = (_slots.content || title || subtitle) && h(TileContent, [!_slots.content && title, !_slots.content && subtitle, _slots.content]);
    var actions = _slots.actions && h(TileAction, [_slots.actions]);
    return h("div", {
      "class": cssClass
    }, [icon, content, actions, _slots["default"]]);
  }
});

var TileComponents = makePluggableComponents({
  Tile: Tile,
  TileAction: TileAction,
  TileIcon: TileIcon,
  TileContent: TileContent,
  TileSubtitle: TileSubtitle,
  TileTitle: TileTitle
});

var slice = [].slice;
var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
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

var ToastTypes;

(function (ToastTypes) {
  ToastTypes["primary"] = "toast-primary";
  ToastTypes["success"] = "toast-success";
  ToastTypes["warning"] = "toast-warning";
  ToastTypes["error"] = "toast-error";
})(ToastTypes || (ToastTypes = {}));

var ToastIcon = index.component({
  name: 'ToastIcon',
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    large: {
      type: Boolean,
      "default": false
    }
  },
  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props;
    var cssClass = mergeCss(data, 'toast-icon', [props.large && 'large']);
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [h(Icon, {
      "attrs": {
        "type": props.icon,
        "size": props.large ? 'x2' : undefined
      }
    })]);
  }
});

var ToastAction = index.component({
  name: 'ToastAction',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'toast-action');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var ToastBody = index.component({
  name: 'ToastBody',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'toast-body');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var ToastContent = index.component({
  name: 'ToastContent',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'toast-content');
    return h("div", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var ToastTitle = index.component({
  name: 'ToastTitle',
  functional: true,
  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;
    var cssClass = mergeCss(data, 'toast-title');
    return h("h5", helper([{}, data, {
      "class": cssClass
    }]), [children]);
  }
});

var css_248z$6 = ".toast-fade-enter-active,\n.toast-fade-leave-active {\n  transition: opacity 0.5s; }\n\n.toast-fade-enter,\n.toast-fade-leave-to {\n  opacity: 0; }\n\n.toast {\n  display: flex; }\n  .toast-body {\n    flex-grow: 4; }\n  .toast-icon {\n    align-self: flex-start;\n    margin: 0 0.3rem 0 0.2rem; }\n    .toast-icon.large {\n      align-self: center;\n      margin: 0 0.75rem 0 0.5rem; }\n  .toast-action {\n    display: flex;\n    flex-flow: row-reverse wrap;\n    align-items: center;\n    align-content: flex-start; }\n    .toast-action .btn-clear {\n      margin: 0; }\n    .toast-action .btn.btn-link {\n      color: #fff; }\n    .toast-action .btn.btn-action {\n      width: 1rem;\n      height: 1rem;\n      padding: 0.1rem;\n      line-height: 0.8rem; }\n      .toast-action .btn.btn-action:hover {\n        background: rgba(247, 248, 249, 0.5);\n        opacity: 0.95; }\n    .toast-action .btn.btn-link:hover {\n      color: rgba(255, 255, 255, 0.81); }\n";
styleInject(css_248z$6);

var Toast = index.component({
  name: 'Toast',
  props: {
    title: {
      type: String,
      "default": undefined
    },
    content: {
      type: String,
      "default": undefined
    },
    type: {
      type: String,
      "default": undefined,
      validator: function validator(side) {
        return Object.keys(ToastTypes).includes(side);
      }
    },
    autoclose: {
      type: [Number, String],
      "default": 0
    },
    closeable: {
      type: Boolean,
      "default": false
    },
    icon: {
      type: String,
      "default": undefined
    }
  },
  data: function data() {
    return {
      shown: true
    };
  },
  mounted: function mounted() {
    if (this.autoclose) {
      setTimeout(this.close, +this.autoclose);
    }
  },
  methods: {
    close: function close() {
      this.shown = false;
      this.$emit('closed');
    },
    toggle: function toggle() {
      this.shown = !this.shown;
    }
  },
  render: function render(h) {
    var title = (this.$slots.title || this.title) && h(ToastTitle, {
      "domProps": {
        "innerHTML": this.title
      }
    }, [this.$slots.title]);
    var content = (this.$slots.content || this.content) && h(ToastContent, {
      "domProps": {
        "innerHTML": this.content
      }
    }, [this.$slots.content]);
    var icon = this.icon && h(ToastIcon, {
      "attrs": {
        "icon": this.icon,
        "large": !!(title && content)
      }
    });
    var body = (title || content) && h(ToastBody, [title, content]);
    var closeBtn = this.closeable && h("button", {
      "staticClass": "btn btn-clear float-right",
      "on": {
        "click": this.close
      }
    });
    var action = h(ToastAction, [closeBtn, this.$slots.action]);
    var sloted = this.$slots["default"] && h("div", {
      "staticClass": "toast",
      "class": [ToastTypes[this.type]]
    }, [this.$slots["default"]]);
    var toast = h("div", {
      "staticClass": "toast",
      "class": [ToastTypes[this.type]]
    }, [icon, body, action]);
    return h("transition", {
      "attrs": {
        "name": "toast-fade"
      }
    }, [this.shown && (sloted || toast)]);
  }
});

var ToasComponents = makePluggableComponents({
  Toast: Toast,
  ToastAction: ToastAction,
  ToastBody: ToastBody,
  ToastContent: ToastContent,
  ToastIcon: ToastIcon,
  ToastTitle: ToastTitle
});

var NavigationItem = index.component({
  name: 'NavigationItem',
  functional: true,
  props: {
    active: {
      type: Boolean,
      "default": false
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children;
    return h("li", {
      "staticClass": "nav-item",
      "class": props.active && 'active'
    }, [children]);
  }
});

var Navigation = index.component({
  name: 'Navigation',
  functional: true,
  props: {
    items: {
      type: [Array, Object],
      "default": function _default() {
        return [];
      }
    },
    level: {
      type: [String, Number],
      "default": -1
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        scopedSlots = _ref.scopedSlots,
        slots = _ref.slots;
    var items = Array.isArray(props.items) ? Object.assign({}, props.items) : props.items;
    var navItems = Object.keys(items).map(function (key) {
      var item = items[key];
      var sub = item.items && props.level != 0 && h(Navigation, {
        "attrs": {
          "items": item.items,
          "level": Number(props.level) - 1
        },
        "scopedSlots": {
          "default": scopedSlots["default"]
        }
      });
      var slot = scopedSlots["default"] && scopedSlots["default"]({
        item: item,
        index: key,
        level: props.level
      });
      var link = h("a", {
        "attrs": {
          "href": item.path
        }
      }, [item.text]);
      var navItem = h(NavigationItem, {
        "attrs": {
          "active": item.active
        }
      }, [slot || link]);
      return h(NavigationItem, [navItem, sub]);
    });
    return h("ul", {
      "staticClass": "nav"
    }, [slots()["default"] || navItems]);
  }
});

var NavigationComponents = makePluggableComponents({
  Navigation: Navigation,
  NavigationItem: NavigationItem
});

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

var FormCheckboxTypes;

(function (FormCheckboxTypes) {
  FormCheckboxTypes["switch"] = "form-switch";
  FormCheckboxTypes["checkbox"] = "form-checkbox";
})(FormCheckboxTypes || (FormCheckboxTypes = {}));

var FormCheckboxSizes;

(function (FormCheckboxSizes) {
  FormCheckboxSizes["sm"] = "input-sm";
  FormCheckboxSizes["lg"] = "input-lg";
})(FormCheckboxSizes || (FormCheckboxSizes = {}));

function cachedProp(origin, cached) {
  return Vue.extend({
    data: function data() {
      return _defineProperty({}, cached, {});
    },
    watch: _defineProperty({}, origin, {
      immediate: true,
      handler: function handler(value, old) {
        if (old !== void 0) {
          for (var prop in old) {
            if (Object.prototype.hasOwnProperty.call(value, prop) !== true) {
              this.$delete(this[cached], prop);
            }
          }
        }

        for (var _prop in value) {
          this.$set(this.$data[cached], _prop, value[_prop]);
        }
      }
    }),
    created: function created() {
      this[cached] = Object.assign({}, this[origin]);
    }
  });
}
var cachedListeners = /*#__PURE__*/cachedProp('$listeners', '__listeners');
var cachedAttrs = /*#__PURE__*/cachedProp('$attrs', '__attrs');

var FormCheckbox = index.componentFactoryOf().mixin(cachedListeners).create({
  name: 'FormCheckbox',
  props: {
    checked: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    inline: {
      type: Boolean
    },
    label: {
      type: [String, Number]
    },
    model: {
      type: undefined
    },
    value: {
      type: undefined
    },
    size: {
      type: String,
      validator: function validator(v) {
        return Object.keys(FormCheckboxSizes).includes(v);
      }
    },
    type: {
      type: String,
      validator: function validator(v) {
        return Object.keys(FormCheckboxTypes).includes(v);
      }
    },
    error: {
      type: Boolean
    }
  },
  model: {
    prop: 'model',
    event: 'change'
  },
  computed: {
    _checked: function _checked() {
      if (!Array.isArray(this.model)) {
        return this.checked || this.model && this.model === this.value;
      }

      return this.model.includes(this.value);
    }
  },
  methods: {
    onChange: function onChange(_ref) {
      var _this = this;

      var checked = _ref.target.checked;

      if (this.model === undefined || !Array.isArray(this.model)) {
        this.$emit('change', checked ? this.value || checked : false);
        return;
      }

      if (checked) {
        this.$emit('change', [].concat(_toConsumableArray(this.model), [this.value]));
      } else {
        this.$emit('change', this.model.filter(function (option) {
          return option !== _this.value;
        }));
      }
    }
  },
  render: function render(h) {
    var cssClass = [FormCheckboxTypes[this.type] || 'form-checkbox', this.inline ? 'form-inline' : '', this.error ? 'is-error' : false, FormCheckboxSizes[this.size]];
    return h("label", {
      "class": cssClass
    }, [h("input", {
      "attrs": {
        "type": "checkbox",
        "disabled": this.disabled
      },
      "domProps": {
        "checked": this._checked
      },
      "on": _objectSpread2({}, Object.assign(Object.assign({}, this.__listeners), {
        change: this.onChange
      }))
    }), h("i", {
      "class": "form-icon"
    }), this.$slots["default"] || this.label || this.value]);
  }
});

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



var STRICT_METHOD$2 = arrayMethodIsStrict('reduce');
var USES_TO_LENGTH$6 = arrayMethodUsesToLength('reduce', { 1: 0 });

// `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$2 || !USES_TO_LENGTH$6 }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var normalizeOptions = function normalizeOptions(options) {
  if (Array.isArray(options)) {
    return options.reduce(function (normal, value) {
      return [].concat(_toConsumableArray(normal), [{
        value: value,
        label: value
      }]);
    }, []);
  }

  var normalized = [];

  for (var _i = 0, _Object$keys = Object.keys(options); _i < _Object$keys.length; _i++) {
    var label = _Object$keys[_i];
    normalized.push({
      label: label,
      value: options[label]
    });
  }

  return normalized;
};

var isCheckboxTag = function isCheckboxTag() {
  var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return /^.*form-?checkbox$/i.test(tag);
};

var FormCheckboxGroup = index.componentFactoryOf().mixin(cachedListeners).create({
  name: 'FormCheckboxGroup',
  model: {
    event: 'change'
  },
  props: {
    options: {
      type: [Array, Object]
    },
    value: {
      type: [Array, Object],
      "default": function _default() {
        return [];
      }
    },
    type: {
      type: String,
      "default": undefined
    },
    size: {
      type: String,
      "default": undefined
    },
    inline: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    error: {
      type: Boolean
    }
  },
  methods: {
    onChange: function onChange(value) {
      this.$emit('change', value);
    }
  },
  render: function render(h) {
    var _this = this;

    var group;

    if (this.options) {
      group = normalizeOptions(this.options).map(function (_ref) {
        var label = _ref.label,
            value = _ref.value;
        return h(FormCheckbox, {
          "attrs": {
            "value": value,
            "label": label,
            "inline": _this.inline,
            "type": _this.type,
            "size": _this.size,
            "disabled": _this.disabled,
            "error": _this.error
          },
          "props": _objectSpread2({}, {
            model: _this.value
          }),
          "on": _objectSpread2({}, Object.assign(Object.assign({}, _this.$listeners), {
            change: _this.onChange
          }))
        });
      });
    } else {
      group = (this.$slots["default"] || []).filter(function (_ref2) {
        var tag = _ref2.componentOptions.tag;
        return tag && isCheckboxTag(tag);
      }).map(function (option) {
        if (!option.componentOptions) {
          option.componentOptions = {};
        }

        if (!option.componentOptions.propsData) {
          option.componentOptions.propsData = {};
        }

        var props = option.componentOptions.propsData;
        props.model = _this.value;
        props.inline = _this.inline || _this.inline;
        props.type = _this.type || _this.type;
        props.size = _this.size !== undefined ? _this.size : _this.size;
        props.disabled = _this.disabled !== undefined ? _this.disabled : _this.disabled;
        props.error = _this.error !== undefined ? _this.error : _this.error;
        var listeners = option.componentOptions.listeners;
        var change = [_this.onChange];

        if (listeners && listeners.change) {
          change.push(listeners.change);
        }

        option.componentOptions.listeners = Object.assign(Object.assign({}, listeners), {
          change: change
        });
        return option;
      });
    }

    return h("div", [group]);
  }
});

var FormCheckboxComponents = makePluggableComponents({
  FormCheckbox: FormCheckbox,
  FormCheckboxGroup: FormCheckboxGroup
});

var isFormTag = function isFormTag() {
  var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return /^.*form-?(label|input|select|checkbox-group|checkbox|radio-group|radio)$/i.test(tag);
};

var FormGroup = index.createComponent({
  name: 'FormGroup',
  functional: true,
  props: {
    size: {
      type: String,
      validator: function validator(v) {
        return !v || ['lg', 'sm'].includes(v);
      }
    },
    disabled: {
      type: Boolean
    },
    error: {
      type: Boolean
    },
    success: {
      type: Boolean
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        slots = _ref.slots,
        data = _ref.data,
        children = _ref.children;

    if (props.size) {
      children.map(function (v) {
        if (v.componentOptions && isFormTag(v.componentOptions.tag)) {
          if (!v.componentOptions.propsData) {
            v.componentOptions.propsData = {};
          }

          v.componentOptions.propsData.size = v.componentOptions.propsData.size || props.size;
        }
      });
    }

    if (props.disabled !== undefined) {
      children.map(function (v) {
        if (v.componentOptions && isFormTag(v.componentOptions.tag)) {
          if (!v.componentOptions.propsData) {
            v.componentOptions.propsData = {};
          }

          v.componentOptions.propsData.disabled = props.disabled;
        }
      });
    }

    var cssClass = ['form-group', props.error && 'has-error', props.success && 'has-success'];
    return h("div", helper([{
      "class": cssClass
    }, data]), [slots()["default"]]);
  }
});

var FormGroupComponents = makePluggableComponents({
  FormGroup: FormGroup
});

var css_248z$7 = ".form-input-hint.error {\n  display: none; }\n\n.form-group.has-error .form-input-hint {\n  display: none; }\n\n.form-group.has-error .form-input-hint.error {\n  display: initial; }\n\n.form-group.has-success .form-input-hint.success {\n  display: initial; }\n";
styleInject(css_248z$7);

var FormHint = index.createComponent({
  name: 'FormHint',
  functional: true,
  props: {
    error: {
      type: Boolean
    },
    success: {
      type: Boolean
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        data = _ref.data;
    var cssClasses = ['form-input-hint', props.error && 'error', props.success && 'success'];
    return h("div", helper([{
      "class": cssClasses
    }, data]), [children]);
  }
});

var FormHintComponents = makePluggableComponents({
  FormHint: FormHint
});

var FormHorizontal = index.createComponent({
  name: 'FormHorizontal',
  functional: true,
  render: function render(h, _ref) {
    var children = _ref.children,
        data = _ref.data;
    return h("div", helper([{
      "class": "form-horizontal"
    }, data]), [children]);
  }
});

var FormHorizontalComponents = makePluggableComponents({
  FormHorizontal: FormHorizontal
});

var FormInputSizes;

(function (FormInputSizes) {
  FormInputSizes["sm"] = "input-sm";
  FormInputSizes["lg"] = "input-lg";
})(FormInputSizes || (FormInputSizes = {}));

var Input = index.componentFactoryOf().create({
  name: 'Input',
  functional: true,
  props: {
    size: {
      type: String,
      validator: function validator(size) {
        return Object.keys(FormInputSizes).includes(size);
      }
    },
    error: {
      type: Boolean
    },
    success: {
      type: Boolean
    },
    value: {
      type: [String, Number]
    },
    disabled: {
      type: Boolean
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        listeners = _ref.listeners;
    var cssClass = ['form-input', props.error ? 'is-error' : false, props.success ? 'is-success' : false, FormInputSizes[props.size]];

    var onInput = function onInput(e) {
      var value = e.target.value;

      if (Array.isArray(listeners.input)) {
        return listeners.input.forEach(function (listener) {
          return listener(value);
        });
      }

      if (listeners.input) {
        listeners.input(value);
      }
    };

    return h("input", helper([{
      "class": cssClass,
      "attrs": {
        "disabled": props.disabled
      }
    }, Object.assign(Object.assign({}, data), {
      domProps: {
        value: props.value
      },
      on: Object.assign(Object.assign({}, listeners), {
        input: onInput
      })
    })]));
  }
});

var Icon$1 = index.component({
  name: 'FormInputIcon',
  functional: true,
  props: {
    icon: {
      type: String,
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props;
    return h("i", {
      "class": ['form-icon', 'icon', Icons[props.icon]]
    });
  }
});

var IconSides;

(function (IconSides) {
  IconSides["left"] = "has-icon-left";
  IconSides["right"] = "has-icon-right";
})(IconSides || (IconSides = {}));

var IconContainer = index.component({
  name: 'FormInputIconContainer',
  functional: true,
  props: {
    side: {
      type: String,
      validator: function validator(side) {
        return Object.keys(IconSides).includes(side);
      },
      "default": undefined
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children;
    return h("div", {
      "class": IconSides[props.side]
    }, [children]);
  }
});

var Loading = Vue.extend({
  name: 'FormInputLoading',
  functional: true,
  render: function render(h) {
    return h("i", {
      "class": "form-icon loading"
    });
  }
});

var FormInput = index.componentFactoryOf().create({
  name: 'FormInput',
  props: {
    value: [String, Number],
    disabled: Boolean,
    error: Boolean,
    loading: Boolean,
    success: Boolean,
    icon: String,
    iconSide: {
      type: String,
      validator: function validator(side) {
        return Object.keys(IconSides).includes(side);
      }
    },
    size: {
      type: String,
      validator: function validator(size) {
        return Object.keys(FormInputSizes).includes(size);
      }
    }
  },
  render: function render(h) {
    var input = h(Input, helper([{
      "attrs": {
        "size": this.size,
        "value": this.value,
        "error": this.error,
        "success": this.success,
        "disabled": this.disabled
      }
    }, Object.assign(Object.assign({}, this.$attrs), {
      on: this.$listeners
    })]));

    if (this.icon || this.loading) {
      return h(IconContainer, {
        "attrs": {
          "side": this.iconSide || 'right'
        }
      }, [input, this.loading && h(Loading), !this.loading && h(Icon$1, {
        "attrs": {
          "icon": this.icon
        }
      })]);
    }

    return input;
  }
});

var FormInputComponents = makePluggableComponents({
  FormInput: FormInput
});

var FormLabelSizes;

(function (FormLabelSizes) {
  FormLabelSizes["sm"] = "label-sm";
  FormLabelSizes["lg"] = "label-lg";
})(FormLabelSizes || (FormLabelSizes = {}));

var FormLabel = index.createComponent({
  name: 'FormLabel',
  functional: true,
  props: {
    size: {
      type: String,
      "default": undefined,
      validator: function validator(v) {
        return !v || Object.keys(FormLabelSizes).includes(v);
      }
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        children = _ref.children,
        data = _ref.data;
    var cssClasses = ['form-label', FormLabelSizes[props.size]];
    return h("label", helper([{
      "class": cssClasses
    }, data]), [children]);
  }
});

var FormLabelComponents = makePluggableComponents({
  FormLabel: FormLabel
});

var FormRadioSizes;

(function (FormRadioSizes) {
  FormRadioSizes["sm"] = "input-sm";
  FormRadioSizes["lg"] = "input-lg";
})(FormRadioSizes || (FormRadioSizes = {}));

var FormRadio = index.componentFactoryOf().mixin(cachedListeners).create({
  name: 'FormRadio',
  model: {
    prop: 'model',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    error: {
      type: Boolean
    },
    inline: {
      type: Boolean
    },
    label: {
      type: String
    },
    name: {
      type: String
    },
    size: {
      type: String,
      validator: function validator(size) {
        return Object.keys(FormRadioSizes).includes(size);
      }
    },
    value: {
      type: undefined
    },
    model: {
      type: undefined
    }
  },
  computed: {
    _label: function _label() {
      return this.$slots["default"] || this.label || this._value;
    },
    _value: function _value() {
      return this.value || this.$slots["default"] && this.$slots["default"][0].text || this.label;
    }
  },
  methods: {
    onChecked: function onChecked() {
      this.$emit('change', this._value);
    }
  },
  render: function render(h) {
    var cssClass = ['form-radio', this.inline ? 'form-inline' : false, this.error ? 'is-error' : false, FormRadioSizes[this.size]];
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
      "on": _objectSpread2({}, Object.assign(Object.assign({}, this.__listeners), {
        change: this.onChecked
      }))
    }), h("i", {
      "class": "form-icon"
    }), " ", this._label]);
  }
});

var normalizeOptions$1 = function normalizeOptions(options) {
  if (Array.isArray(options)) {
    return options.reduce(function (normal, value) {
      return [].concat(_toConsumableArray(normal), [{
        value: value,
        label: value
      }]);
    }, []);
  }

  var normalized = [];

  for (var _i = 0, _Object$keys = Object.keys(options); _i < _Object$keys.length; _i++) {
    var label = _Object$keys[_i];
    normalized.push({
      label: label,
      value: options[label]
    });
  }

  return normalized;
};

var FormRadioGroup = index.componentFactoryOf().create({
  name: 'FormRadioGroup',
  props: {
    name: {
      type: String
    },
    options: {
      type: undefined
    },
    value: {
      type: undefined
    },
    size: {
      type: String,
      "default": undefined
    },
    inline: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    },
    error: {
      type: Boolean
    }
  },
  methods: {
    update: function update(value) {
      this.$emit('input', value);
    }
  },
  render: function render(h) {
    var _this = this;

    var name = this.name || uid$1(this);
    var group;

    if (this.options) {
      group = normalizeOptions$1(this.options).map(function (_ref) {
        var label = _ref.label,
            value = _ref.value;
        return h(FormRadio, {
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
          "props": _objectSpread2({}, {
            model: _this.value
          })
        });
      });
    } else {
      group = (this.$slots["default"] || []).filter(function (_ref2) {
        var componentOptions = _ref2.componentOptions;
        return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-radio');
      }).map(function (option) {
        if (!option.componentOptions) {
          option.componentOptions = {};
        }

        var props = option.componentOptions.propsData || {};
        props.name = name;
        props.size = props.size !== undefined ? props.size : _this.size;
        props.disabled = props.disabled !== undefined ? props.disabled : _this.disabled;
        props.error = props.error !== undefined ? props.error : _this.error;
        props.inline = _this.inline || props.inline;
        props.model = _this.value;
        option.componentOptions.listeners = Object.assign(Object.assign({}, option.componentOptions.listeners), {
          change: _this.update
        });
        return option;
      });
    }

    return h("div", [group]);
  }
});

var FormRadioComponents = makePluggableComponents({
  FormRadioGroup: FormRadioGroup,
  FormRadio: FormRadio
});

var $some = arrayIteration.some;



var STRICT_METHOD$3 = arrayMethodIsStrict('some');
var USES_TO_LENGTH$7 = arrayMethodUsesToLength('some');

// `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$3 || !USES_TO_LENGTH$7 }, {
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var FormSelectOption = index.componentFactoryOf().create({
  name: 'FormSelectOption',
  props: {
    disabled: {
      type: Boolean
    },
    value: {
      type: [String, Number],
      "default": ''
    },
    label: {
      type: [String, Number]
    },
    selected: {
      type: Boolean
    }
  },
  render: function render(h) {
    var _this$$props = this.$props,
        selected = _this$$props.selected,
        disabled = _this$$props.disabled,
        value = _this$$props.value,
        label = _this$$props.label;
    return h("option", {
      "domProps": {
        "selected": selected,
        "value": value
      },
      "attrs": {
        "disabled": disabled
      }
    }, [this.$slots["default"] || label || value]);
  }
});

var FormSelectSizes;

(function (FormSelectSizes) {
  FormSelectSizes["sm"] = "select-sm";
  FormSelectSizes["lg"] = "select-lg";
})(FormSelectSizes || (FormSelectSizes = {}));

var FormSelect = index.componentFactoryOf().mixin(cachedListeners).mixin(cachedAttrs).create({
  name: 'FormSelect',
  props: {
    options: {
      type: [Object, Array]
    },
    multiple: {
      type: Boolean
    },
    placeholder: {
      type: String
    },
    value: {
      type: [String, Number, Array],
      "default": ''
    },
    size: {
      type: [String, Number]
    },
    scale: {
      type: String,
      validator: function validator(size) {
        return Object.keys(FormSelectSizes).includes(size);
      }
    },
    error: {
      type: Boolean
    },
    success: {
      type: Boolean
    },
    disabled: {
      type: Boolean
    }
  },
  mounted: function mounted() {
    if (!this.options && !this.$slots["default"]) {
      throw new TypeError('Component could not be created without options');
    }
  },
  methods: {
    onInput: function onInput(_ref) {
      var selectedOptions = _ref.target.selectedOptions;

      if (this.multiple) {
        var selected = _toConsumableArray(selectedOptions).map(function (option) {
          return option.value || option.innerHTML;
        });

        this.$emit('input', selected);
      } else {
        this.$emit('input', selectedOptions[0].value);
      }
    },
    isSelected: function isSelected(label, value, current) {
      var _this = this;

      current = current || this.value;

      if (current instanceof Array) {
        return current.some(function (v) {
          return _this.isSelected(label, value, v);
        });
      }

      return label !== undefined && current.toString() === label.toString() || value !== undefined && current.toString() === value.toString();
    },
    normalizeOptions: function normalizeOptions(options) {
      if (Array.isArray(options)) {
        return options.reduce(function (normal, value) {
          return [].concat(_toConsumableArray(normal), [{
            value: value,
            label: value
          }]);
        }, []);
      }

      var normalized = [];

      for (var _i = 0, _Object$keys = Object.keys(options); _i < _Object$keys.length; _i++) {
        var label = _Object$keys[_i];
        normalized.push({
          label: label,
          value: options[label]
        });
      }

      return normalized;
    }
  },
  render: function render(h) {
    var _this2 = this;

    var options = [];

    if (this.options) {
      options = this.normalizeOptions(this.options).map(function (_ref2) {
        var label = _ref2.label,
            value = _ref2.value;
        return h(FormSelectOption, {
          "attrs": {
            "selected": _this2.isSelected(label, value),
            "label": label,
            "value": value
          }
        });
      });
    } else {
      options = (this.$slots["default"] || []).filter(function (_ref3) {
        var componentOptions = _ref3.componentOptions;
        return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-option');
      }).map(function (option) {
        if (!option.componentOptions) {
          option.componentOptions = {
            children: []
          };
        }

        if (!option.componentOptions.propsData) {
          option.componentOptions.propsData = {};
        }

        var props = option.componentOptions.propsData; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

        var value = props.value || (option.componentOptions.children[0] || {}).text;
        props.selected = props.selected !== undefined ? props.selected : _this2.isSelected(props.label, value);
        return option;
      });
    }

    if (this.placeholder && !this.multiple) {
      options.unshift(h(FormSelectOption, {
        "attrs": {
          "value": "",
          "disabled": true,
          "selected": true
        }
      }, [this.placeholder]));
    }

    var cssClass = ['form-select', FormSelectSizes[this.scale], this.error ? 'is-error' : '', this.success ? 'is-success' : ''];
    return h("select", {
      "class": cssClass,
      "attrs": _objectSpread2({
        "multiple": this.multiple,
        "disabled": this.disabled,
        "size": Number(this.size)
      }, Object.assign({}, this.__attrs)),
      "on": _objectSpread2({}, Object.assign(Object.assign({}, this.__listeners), {
        input: this.onInput
      }))
    }, [options]);
  }
});

var FormSelectComponents = makePluggableComponents({
  FormSelect: FormSelect,
  FormSelectOption: FormSelectOption
});

var FormTextarea = index.componentFactoryOf().mixin(cachedListeners).mixin(cachedAttrs).create({
  name: 'FormTextarea',
  props: {
    value: {
      type: String,
      "default": undefined
    },
    disabled: {
      type: Boolean,
      "default": false
    }
  },
  computed: {
    placeholder: function placeholder() {
      return this.$attrs.placeholder || this.$slots["default"] && this.$slots["default"][0].text;
    }
  },
  methods: {
    onInput: function onInput(_ref) {
      var value = _ref.target.value;
      this.$emit('input', value);
    }
  },
  render: function render(h) {
    return h("textarea", {
      "attrs": _objectSpread2({
        "placeholder": this.placeholder,
        "disabled": this.disabled
      }, Object.assign({}, this.__attrs)),
      "domProps": {
        "value": this.value
      },
      "class": "form-input",
      "on": _objectSpread2({}, Object.assign(Object.assign({}, this.__listeners), {
        input: this.onInput
      }))
    });
  }
});

var FormTextareaComponents = makePluggableComponents({
  FormTextarea: FormTextarea
});

var components = {
  AvatarComponents: AvatarComponents,
  AccordionComponents: AccordionComponents,
  BtnComponents: BtnComponents,
  BarComponents: BarComponents,
  BreadcrumbComponents: BreadcrumbComponents,
  CardComponents: CardComponents,
  ChipComponents: ChipComponents,
  ColumnComponents: ColumnComponents,
  ColumnsComponents: ColumnsComponents,
  ContainerComponents: ContainerComponents,
  DividerComponents: DividerComponents,
  DropdownMenuComponents: DropdownMenuComponents,
  EmptyComponents: EmptyComponents,
  IconComponents: IconComponents,
  ModalComponents: ModalComponents,
  OffCanvasComponents: OffCanvasComponents,
  PaginationComponents: PaginationComponents,
  PanelComponents: PanelComponents,
  PopoverComponents: PopoverComponents,
  StepComponents: StepComponents,
  TabComponents: TabComponents,
  TileComponents: TileComponents,
  ToasComponents: ToasComponents,
  TagComponents: TagComponents,
  NavigationComponents: NavigationComponents,
  VerticalMenuComponents: VerticalMenuComponents,
  FormCheckboxComponents: FormCheckboxComponents,
  FormGroupComponents: FormGroupComponents,
  FormInputComponents: FormInputComponents,
  FormLabelComponents: FormLabelComponents,
  FormHintComponents: FormHintComponents,
  FormHorizontalComponents: FormHorizontalComponents,
  FormRadioComponents: FormRadioComponents,
  FormSelectComponents: FormSelectComponents,
  FormTextareaComponents: FormTextareaComponents
};

var Badge = function Badge(el, _ref) {
  var value = _ref.value;
  if (value === undefined) return;
  el.classList.add('badge');
  el.setAttribute('data-badge', value);
};

var BadgeDirectives = makePluggableDirectives({
  Badge: Badge
});

var add = function add(el, cssClasses) {
  var _el$classList;

  (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray(cssClasses));
};

var remove = function remove(el, cssClasses) {
  var _el$classList2;

  (_el$classList2 = el.classList).remove.apply(_el$classList2, _toConsumableArray(cssClasses));
};

var Loading$1 = function Loading(el, _ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? true : _ref$value,
      modifiers = _ref.modifiers;
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

var LoadingDirectives = makePluggableDirectives({
  Loading: Loading$1
});

var TooltipSides;

(function (TooltipSides) {
  TooltipSides["top"] = "";
  TooltipSides["bottom"] = "tooltip-bottom";
  TooltipSides["right"] = "tooltip-right";
  TooltipSides["left"] = "tooltip-left";
})(TooltipSides || (TooltipSides = {}));

var Tooltip = function Tooltip(el, _ref) {
  var value = _ref.value,
      modifiers = _ref.modifiers;

  if (value) {
    el.classList.add('tooltip');
    el.setAttribute('data-tooltip', value);
    Object.keys(TooltipSides).map(function (side) {
      if (modifiers[side]) el.classList.add(TooltipSides[side]);
    });
  }
};

var TooltipDirectives = makePluggableDirectives({
  Tooltip: Tooltip
});

var directives = {
  BadgeDirectives: BadgeDirectives,
  LoadingDirectives: LoadingDirectives,
  TooltipDirectives: TooltipDirectives
};

var propertyIsEnumerable = objectPropertyIsEnumerable.f;

// `Object.{ entries, values }` methods implementation
var createMethod$5 = function (TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!descriptors || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

var objectToArray = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod$5(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod$5(false)
};

var $values = objectToArray.values;

// `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values
_export({ target: 'Object', stat: true }, {
  values: function values(O) {
    return $values(O);
  }
});

var VectrePlugin = function VectrePlugin(vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    prefix: ''
  };
  Object.values(components).forEach(function (c) {
    return vue.use(c, options);
  });
  Object.values(directives).forEach(function (c) {
    return vue.use(c, options);
  });
};
 // export default Object.assign(VectrePlugin, { components, directives });

export { Accordion, Avatar, AvatarPresences, AvatarSizes, Badge, Bar, Breadcrumb, Btn, BtnGroup, BtnSizes, BtnStates, BtnTypes, Card, CardBody, CardFooter, CardHeader, CardImage, CardImagePositions, CardImageSlots, Chip, Column, Columns, Container, Divider, DropdownMenu, Empty, EmptyAction, EmptyContent, EmptyIcon, EmptySubtitle, EmptyTitle, FormCheckbox, FormCheckboxGroup, FormCheckboxSizes, FormCheckboxTypes, FormGroup, FormHint, FormHorizontal, FormInput, FormInputSizes, FormLabel, FormLabelSizes, FormRadio, FormRadioGroup, FormRadioSizes, FormSelect, FormSelectOption, FormSelectSizes, FormTextarea, Grids, Icon, IconAction, IconNavigation, IconObject, IconSizes, Icons, Loading$1 as Loading, Modal, ModalBody, ModalFooter, ModalHeader, ModalSizes, Navigation, NavigationItem, OffCanvas, OffCanvasContent, OffCanvasOverlay, OffCanvasSidebar, OffCanvasToggle, Pagination, Panel, PanelBody, PanelFooter, PanelHeader, PanelNav, Popover, PopoverSides, Step, Steps, Tab, TabAction, Tabs, Tag, TagTypes, Tile, TileAction, TileContent, TileIcon, TileSubtitle, TileTitle, Toast, ToastAction, ToastBody, ToastContent, ToastIcon, ToastTitle, Tooltip, TooltipSides, VectrePlugin, VerticalMenu, VerticalMenuDivider, VerticalMenuItem, VerticalMenuItemBadge };
