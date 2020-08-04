(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global = global || self, global.Vectre = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

	Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

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

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var nativeAssign = Object.assign;
	var defineProperty = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
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

	var SPECIES = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return engineV8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var defineProperty$1 = Object.defineProperty;
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

	    if (ACCESSORS) defineProperty$1(O, 1, { enumerable: true, get: thrower });
	    else O[1] = 1;

	    method.call(O, argument0, argument1);
	  });
	};

	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
	var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

	var SPECIES$1 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
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
	        Constructor = Constructor[SPECIES$1];
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

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _createSuper(Derived) {
	  return function () {
	    var Super = _getPrototypeOf(Derived),
	        result;

	    if (_isNativeReflectConstruct()) {
	      var NewTarget = _getPrototypeOf(this).constructor;
	      result = Reflect.construct(Super, arguments, NewTarget);
	    } else {
	      result = Super.apply(this, arguments);
	    }

	    return _possibleConstructorReturn(this, result);
	  };
	}

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

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	function __metadata(metadataKey, metadataValue) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
	}

	/**
	  * vue-class-component v7.2.3
	  * (c) 2015-present Evan You
	  * @license MIT
	  */

	function _typeof$1(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof$1 = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof$1 = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof$1(obj);
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
	function createDecorator(factory) {
	  return function (target, key, index) {
	    var Ctor = typeof target === 'function' ? target : target.constructor;

	    if (!Ctor.__decorators__) {
	      Ctor.__decorators__ = [];
	    }

	    if (typeof index !== 'number') {
	      index = undefined;
	    }

	    Ctor.__decorators__.push(function (options) {
	      return factory(options, key, index);
	    });
	  };
	}
	function isPrimitive(value) {
	  var type = _typeof$1(value);

	  return value == null || type !== 'object' && type !== 'function';
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

	/** vue-property-decorator verson 8.4.0 MIT LICENSE copyright 2019 kaorun343 */
	/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
	var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
	function applyMetadata(options, target, key) {
	    if (reflectMetadataIsSupported) {
	        if (!Array.isArray(options) &&
	            typeof options !== 'function' &&
	            typeof options.type === 'undefined') {
	            options.type = Reflect.getMetadata('design:type', target, key);
	        }
	    }
	}
	/**
	 * decorator of a prop
	 * @param  options the options for the prop
	 * @return PropertyDecorator | void
	 */
	function Prop(options) {
	    if (options === void 0) { options = {}; }
	    return function (target, key) {
	        applyMetadata(options, target, key);
	        createDecorator(function (componentOptions, k) {
	            (componentOptions.props || (componentOptions.props = {}))[k] = options;
	        })(target, key);
	    };
	}
	// Code copied from Vue/src/shared/util.js
	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
	/**
	 * decorator of an event-emitter function
	 * @param  event The name of the event
	 * @return MethodDecorator
	 */
	function Emit(event) {
	    return function (_target, key, descriptor) {
	        key = hyphenate(key);
	        var original = descriptor.value;
	        descriptor.value = function emitter() {
	            var _this = this;
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var emit = function (returnValue) {
	                if (returnValue !== undefined)
	                    args.unshift(returnValue);
	                _this.$emit.apply(_this, [event || key].concat(args));
	            };
	            var returnValue = original.apply(this, args);
	            if (isPromise(returnValue)) {
	                returnValue.then(function (returnValue) {
	                    emit(returnValue);
	                });
	            }
	            else {
	                emit(returnValue);
	            }
	            return returnValue;
	        };
	    };
	}
	function isPromise(obj) {
	    return obj instanceof Promise || (obj && typeof obj.then === 'function');
	}

	var Sizes;

	(function (Sizes) {
	  Sizes["xl"] = "avatar-xl";
	  Sizes["lg"] = "avatar-lg";
	  Sizes["sm"] = "avatar-sm";
	  Sizes["xs"] = "avatar-xs";
	})(Sizes || (Sizes = {}));

	var Avatar = /*#__PURE__*/function (_Vue) {
	  _inherits(Avatar, _Vue);

	  var _super = _createSuper(Avatar);

	  function Avatar() {
	    _classCallCheck(this, Avatar);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Avatar, [{
	    key: "cssStyle",
	    get: function get() {
	      return {
	        color: this.color,
	        background: this.background
	      };
	    }
	  }, {
	    key: "cssClass",
	    get: function get() {
	      return [Sizes[this.size] || this.size];
	    }
	  }]);

	  return Avatar;
	}(Vue);

	__decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "size", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "src", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "initials", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "background", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "color", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "alt", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "presence", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Avatar.prototype, "icon", void 0);

	Avatar = __decorate([Component], Avatar);
	var script = Avatar;

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

	var __vue_script__ = script;
	/* template */

	var __vue_render__ = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('figure', {
	    staticClass: "avatar",
	    class: _vm.cssClass,
	    style: _vm.cssStyle,
	    attrs: {
	      "data-initial": _vm.initials && _vm.initials.trim().substring(0, 2)
	    }
	  }, [_vm.src ? _c('img', {
	    attrs: {
	      "src": _vm.src,
	      "alt": _vm.alt
	    }
	  }) : _vm._e(), _vm._v(" "), _vm.icon ? _c('img', {
	    staticClass: "avatar-icon",
	    attrs: {
	      "src": _vm.icon
	    }
	  }) : _vm._e(), _vm._v(" "), _vm.presence && !_vm.icon ? _c('i', {
	    staticClass: "avatar-presence",
	    class: _vm.presence
	  }) : _vm._e()]);
	};

	var __vue_staticRenderFns__ = [];
	/* style */

	var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
	  if (!inject) return;
	  inject("data-v-7b0fef51_0", {
	    source: "figure.avatar+figure.avatar{margin-left:.4rem}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__ = undefined;
	/* module identifier */

	var __vue_module_identifier__ = undefined;
	/* functional template */

	var __vue_is_functional_template__ = false;
	/* style inject SSR */

	var Avatar$1 = normalizeComponent_1({
	  render: __vue_render__,
	  staticRenderFns: __vue_staticRenderFns__
	}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

	var Presences;

	(function (Presences) {
	  Presences["online"] = "online";
	  Presences["busy"] = "busy";
	  Presences["away"] = "away";
	  Presences["offline"] = "offline";
	})(Presences || (Presences = {}));

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

	var TO_STRING = 'toString';
	var RegExpPrototype = RegExp.prototype;
	var nativeToString = RegExpPrototype[TO_STRING];

	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
	// FF44- RegExp#toString has a wrong name
	var INCORRECT_NAME = nativeToString.name != TO_STRING;

	// `RegExp.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
	if (NOT_GENERIC || INCORRECT_NAME) {
	  redefine(RegExp.prototype, TO_STRING, function toString() {
	    var R = anObject(this);
	    var p = String(R.source);
	    var rf = R.flags;
	    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
	    return '/' + p + '/' + f;
	  }, { unsafe: true });
	}

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

	var SPECIES$2 = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES$2];
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

	var defineProperty$2 = objectDefineProperty.f;

	var FunctionPrototype = Function.prototype;
	var FunctionPrototypeToString = FunctionPrototype.toString;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME = 'name';

	// Function instances `.name` property
	// https://tc39.github.io/ecma262/#sec-function-instances-name
	if (descriptors && !(NAME in FunctionPrototype)) {
	  defineProperty$2(FunctionPrototype, NAME, {
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
	var defineProperty$3 = objectDefineProperty.f;
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
	      defineProperty$3(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
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

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _arrayWithoutHoles$1(arr) {
	  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
	}

	function _iterableToArray$1(iter) {
	  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _nonIterableSpread$1() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _toConsumableArray$1(arr) {
	  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread$1();
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

	var Icons = Object.assign(Object.assign(Object.assign({}, Navigation), Objects), Action);

	var Icon = /*#__PURE__*/function (_vue) {
	  _inherits(Icon, _vue);

	  var _super = _createSuper(Icon);

	  function Icon() {
	    _classCallCheck(this, Icon);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Icon, [{
	    key: "cssStyle",
	    get: function get() {
	      return {
	        'font-size': Sizes$1[this.size] || this.size
	      };
	    }
	  }, {
	    key: "cssClass",
	    get: function get() {
	      return [Sizes$1[this.size] || this.size, Icons[this.type] || this.type];
	    }
	  }]);

	  return Icon;
	}(Vue);

	__decorate([Prop({
	  type: String,
	  required: true
	}), __metadata("design:type", String)], Icon.prototype, "type", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Icon.prototype, "size", void 0);

	Icon = __decorate([Component], Icon);
	var script$1 = Icon;

	/* script */
	var __vue_script__$1 = script$1;
	/* template */

	var __vue_render__$1 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('i', {
	    staticClass: "icon",
	    class: _vm.cssClass,
	    style: _vm.cssStyle
	  });
	};

	var __vue_staticRenderFns__$1 = [];
	/* style */

	var __vue_inject_styles__$1 = undefined;
	/* scoped */

	var __vue_scope_id__$1 = undefined;
	/* module identifier */

	var __vue_module_identifier__$1 = undefined;
	/* functional template */

	var __vue_is_functional_template__$1 = false;
	/* style inject */

	/* style inject SSR */

	var Icon$1 = normalizeComponent_1({
	  render: __vue_render__$1,
	  staticRenderFns: __vue_staticRenderFns__$1
	}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, undefined, undefined);

	var Accordion = /*#__PURE__*/function (_Vue) {
	  _inherits(Accordion, _Vue);

	  var _super = _createSuper(Accordion);

	  function Accordion() {
	    _classCallCheck(this, Accordion);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Accordion, [{
	    key: "uid",
	    value: function uid(index) {
	      return this.id + '-' + index;
	    }
	  }, {
	    key: "isSelected",
	    value: function isSelected(key, index) {
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
	    }
	  }, {
	    key: "check",
	    value: function check(event, key, index) {
	      if (!this.$listeners.check) return;
	      event.preventDefault();

	      if (!this.multiple) {
	        this.$emit('check', key || index || 0);
	        return;
	      }

	      var checked = Array.isArray(this.checked) ? _toConsumableArray$1(this.checked) : this.checked !== undefined ? [this.checked] : [];

	      if (event.target.checked) {
	        checked.push(key || index || 0);
	      } else {
	        checked = checked.filter(function (item) {
	          return item !== index && item !== key;
	        });
	      }

	      this.$emit('check', checked);
	    }
	  }, {
	    key: "type",
	    get: function get() {
	      return this.multiple ? 'checkbox' : 'radio';
	    }
	  }, {
	    key: "id",
	    get: function get() {
	      return this.name ? this.name : 'accordion-' + Math.round(Math.random() * 1000);
	    }
	  }]);

	  return Accordion;
	}(Vue);

	__decorate([Prop({
	  required: true,
	  type: [Object, Array]
	}), __metadata("design:type", Object)], Accordion.prototype, "items", void 0);

	__decorate([Prop([String, Number, Array]), __metadata("design:type", Object)], Accordion.prototype, "checked", void 0);

	__decorate([Prop([String]), __metadata("design:type", String)], Accordion.prototype, "name", void 0);

	__decorate([Prop([Boolean]), __metadata("design:type", Boolean)], Accordion.prototype, "multiple", void 0);

	__decorate([Prop([String]), __metadata("design:type", String)], Accordion.prototype, "icon", void 0);

	Accordion = __decorate([Component({
	  components: {
	    Icon: Icon$1
	  }
	})], Accordion);
	var script$2 = Accordion;

	/* script */
	var __vue_script__$2 = script$2;
	/* template */

	var __vue_render__$2 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "accordion-container"
	  }, _vm._l(_vm.items, function (value, key, index) {
	    return _c('div', {
	      key: index || key || 0,
	      staticClass: "accordion"
	    }, [_c('input', {
	      attrs: {
	        "id": _vm.uid(index || key || 0),
	        "name": _vm.id,
	        "type": _vm.type,
	        "hidden": ""
	      },
	      domProps: {
	        "checked": _vm.isSelected(key, index)
	      },
	      on: {
	        "input": function input($event) {
	          _vm.check($event, key, index);
	        }
	      }
	    }), _vm._v(" "), _c('label', {
	      staticClass: "accordion-header c-hand",
	      attrs: {
	        "for": _vm.uid(index || key || 0)
	      }
	    }, [_vm.icon ? _c('icon', {
	      attrs: {
	        "type": _vm.icon
	      }
	    }) : _vm._e(), _vm._v(" "), _vm.$scopedSlots['header'] ? _vm._t("header", null, {
	      item: value,
	      index: key || index || 0
	    }) : [_vm._v(_vm._s(key))]], 2), _vm._v(" "), _c('div', {
	      staticClass: "accordion-body"
	    }, [_vm.$scopedSlots['body'] ? _vm._t("body", null, {
	      item: value,
	      index: key || index || 0
	    }) : _vm._e(), _vm._v(" "), !_vm.$scopedSlots['body'] ? _vm._t("default", null, {
	      item: value,
	      index: key || index || 0
	    }) : _vm._e(), _vm._v(" "), !_vm.$scopedSlots['body'] && !_vm.$slots.default ? _c('span', {
	      domProps: {
	        "innerHTML": _vm._s(value)
	      }
	    }) : _vm._e()], 2)]);
	  }), 0);
	};

	var __vue_staticRenderFns__$2 = [];
	/* style */

	var __vue_inject_styles__$2 = undefined;
	/* scoped */

	var __vue_scope_id__$2 = undefined;
	/* module identifier */

	var __vue_module_identifier__$2 = undefined;
	/* functional template */

	var __vue_is_functional_template__$2 = false;
	/* style inject */

	/* style inject SSR */

	var Accordion$1 = normalizeComponent_1({
	  render: __vue_render__$2,
	  staticRenderFns: __vue_staticRenderFns__$2
	}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, undefined, undefined);

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

	var Card = /*#__PURE__*/function (_Vue) {
	  _inherits(Card, _Vue);

	  var _super = _createSuper(Card);

	  function Card() {
	    var _this;

	    _classCallCheck(this, Card);

	    _this = _super.apply(this, arguments);
	    _this.positions = Positions;
	    _this.slots = Slots;
	    return _this;
	  }

	  _createClass(Card, [{
	    key: "showImg",
	    value: function showImg(pos, slot) {
	      return this.$props[pos] && this.$props[pos] === Slots[slot];
	    }
	  }]);

	  return Card;
	}(Vue);

	__decorate([Prop(String), __metadata("design:type", String)], Card.prototype, "img", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Card.prototype, "before", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Card.prototype, "after", void 0);

	Card = __decorate([Component], Card);
	var script$3 = Card;

	/* script */
	var __vue_script__$3 = script$3;
	/* template */

	var __vue_render__$3 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "card"
	  }, [_vm.showImg(_vm.positions.before, _vm.slots.header) ? _c('div', {
	    staticClass: "card-image"
	  }, [_c('img', {
	    staticClass: "img-responsive",
	    attrs: {
	      "src": _vm.img
	    }
	  })]) : _vm._e(), _vm._v(" "), _vm.$slots.header ? _c('div', {
	    staticClass: "card-header"
	  }, [_vm._t("header")], 2) : _vm._e(), _vm._v(" "), _vm.showImg(_vm.positions.after, _vm.slots.header) || _vm.showImg(_vm.positions.before, _vm.slots.body) ? _c('div', {
	    staticClass: "card-image"
	  }, [_c('img', {
	    staticClass: "img-responsive",
	    attrs: {
	      "src": _vm.img
	    }
	  })]) : _vm._e(), _vm._v(" "), _vm.$slots.body || _vm.$slots.default ? _c('div', {
	    staticClass: "card-body"
	  }, [_vm._t("body"), _vm._v(" "), !_vm.$scopedSlots.body ? _vm._t("default") : _vm._e()], 2) : _vm._e(), _vm._v(" "), _vm.showImg(_vm.positions.after, _vm.slots.body) || _vm.showImg(_vm.positions.before, _vm.slots.footer) ? _c('div', {
	    staticClass: "card-image"
	  }, [_c('img', {
	    staticClass: "img-responsive",
	    attrs: {
	      "src": _vm.img
	    }
	  })]) : _vm._e(), _vm._v(" "), _vm.$slots.footer ? _c('div', {
	    staticClass: "card-footer"
	  }, [_vm._t("footer")], 2) : _vm._e(), _vm._v(" "), _vm.showImg(_vm.positions.after, _vm.slots.footer) ? _c('div', {
	    staticClass: "card-image"
	  }, [_c('img', {
	    staticClass: "img-responsive",
	    attrs: {
	      "src": _vm.img
	    }
	  })]) : _vm._e()]);
	};

	var __vue_staticRenderFns__$3 = [];
	/* style */

	var __vue_inject_styles__$3 = undefined;
	/* scoped */

	var __vue_scope_id__$3 = undefined;
	/* module identifier */

	var __vue_module_identifier__$3 = undefined;
	/* functional template */

	var __vue_is_functional_template__$3 = false;
	/* style inject */

	/* style inject SSR */

	var Card$1 = normalizeComponent_1({
	  render: __vue_render__$3,
	  staticRenderFns: __vue_staticRenderFns__$3
	}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, undefined, undefined);

	var Bar = /*#__PURE__*/function (_Vue) {
	  _inherits(Bar, _Vue);

	  var _super = _createSuper(Bar);

	  function Bar() {
	    _classCallCheck(this, Bar);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Bar, [{
	    key: "dataTooltip",
	    get: function get() {
	      if (typeof this.tooltip === 'undefined') {
	        return;
	      }

	      if (typeof this.tooltip === 'function') {
	        return this.tooltip(this.value);
	      }

	      return this.value.toString() + this.tooltip;
	    }
	  }, {
	    key: "barCssClass",
	    get: function get() {
	      return [this.sm ? 'bar-sm' : ''];
	    }
	  }, {
	    key: "barItemCssClass",
	    get: function get() {
	      return [this.tooltip ? 'tooltip' : ''];
	    }
	  }, {
	    key: "cssStyle",
	    get: function get() {
	      return {
	        width: this.value / this.max * 100 + '%'
	      };
	    }
	  }]);

	  return Bar;
	}(Vue);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Bar.prototype, "sm", void 0);

	__decorate([Prop({
	  type: Number,
	  default: 0
	}), __metadata("design:type", Number)], Bar.prototype, "min", void 0);

	__decorate([Prop({
	  type: Number,
	  default: 100
	}), __metadata("design:type", Number)], Bar.prototype, "max", void 0);

	__decorate([Prop({
	  type: Number,
	  default: 0
	}), __metadata("design:type", Number)], Bar.prototype, "value", void 0);

	__decorate([Prop([Function, String]), __metadata("design:type", Object)], Bar.prototype, "tooltip", void 0);

	Bar = __decorate([Component], Bar);
	var script$4 = Bar;

	/* script */
	var __vue_script__$4 = script$4;
	/* template */

	var __vue_render__$4 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "bar",
	    class: _vm.barCssClass
	  }, [_c('div', {
	    staticClass: "bar-item",
	    class: _vm.barItemCssClass,
	    style: _vm.cssStyle,
	    attrs: {
	      "data-tooltip": _vm.dataTooltip,
	      "aria-valuenow": _vm.value,
	      "aria-valuemin": _vm.min,
	      "aria-valuemax": _vm.max,
	      "role": "progressbar"
	    }
	  })]);
	};

	var __vue_staticRenderFns__$4 = [];
	/* style */

	var __vue_inject_styles__$4 = undefined;
	/* scoped */

	var __vue_scope_id__$4 = undefined;
	/* module identifier */

	var __vue_module_identifier__$4 = undefined;
	/* functional template */

	var __vue_is_functional_template__$4 = false;
	/* style inject */

	/* style inject SSR */

	var Bar$1 = normalizeComponent_1({
	  render: __vue_render__$4,
	  staticRenderFns: __vue_staticRenderFns__$4
	}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, undefined, undefined);

	var Breadcrumb = /*#__PURE__*/function (_Vue) {
	  _inherits(Breadcrumb, _Vue);

	  var _super = _createSuper(Breadcrumb);

	  function Breadcrumb() {
	    _classCallCheck(this, Breadcrumb);

	    return _super.apply(this, arguments);
	  }

	  return Breadcrumb;
	}(Vue);

	__decorate([Prop({
	  type: Array,
	  required: true
	}), __metadata("design:type", Array)], Breadcrumb.prototype, "crumbs", void 0);

	Breadcrumb = __decorate([Component], Breadcrumb);
	var script$5 = Breadcrumb;

	/* script */
	var __vue_script__$5 = script$5;
	/* template */

	var __vue_render__$5 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('ul', {
	    staticClass: "breadcrumb"
	  }, _vm._l(_vm.crumbs, function (crumb, key) {
	    return _c('li', {
	      key: key,
	      staticClass: "breadcrumb-item"
	    }, [_vm._t("default", null, {
	      crumb: crumb
	    }), _vm._v(" "), !_vm.$scopedSlots['default'] ? _c('a', {
	      attrs: {
	        "href": crumb.path
	      }
	    }, [_vm._v("\n      " + _vm._s(crumb.title) + "\n    ")]) : _vm._e()], 2);
	  }), 0);
	};

	var __vue_staticRenderFns__$5 = [];
	/* style */

	var __vue_inject_styles__$5 = undefined;
	/* scoped */

	var __vue_scope_id__$5 = undefined;
	/* module identifier */

	var __vue_module_identifier__$5 = undefined;
	/* functional template */

	var __vue_is_functional_template__$5 = false;
	/* style inject */

	/* style inject SSR */

	var Breadcrumb$1 = normalizeComponent_1({
	  render: __vue_render__$5,
	  staticRenderFns: __vue_staticRenderFns__$5
	}, __vue_inject_styles__$5, __vue_script__$5, __vue_scope_id__$5, __vue_is_functional_template__$5, __vue_module_identifier__$5, undefined, undefined);

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

	var Button = /*#__PURE__*/function (_vue) {
	  _inherits(Button, _vue);

	  var _super = _createSuper(Button);

	  function Button() {
	    _classCallCheck(this, Button);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Button, [{
	    key: "created",
	    value: function created() {
	      if (this.action && !this.icon) {
	        throw new Error('Action button should have icon');
	      }
	    }
	  }, {
	    key: "cssClass",
	    get: function get() {
	      return [Types[this.type] || this.type, Sizes$2[this.size] || this.size, States[this.state] || this.state, this.action && this.circle ? 's-circle' : '', this.action ? 'btn-action' : ''];
	    }
	  }]);

	  return Button;
	}(Vue);

	__decorate([Prop(String), __metadata("design:type", String)], Button.prototype, "type", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Button.prototype, "size", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Button.prototype, "icon", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Button.prototype, "state", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "left", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "circle", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Button.prototype, "action", void 0);

	Button = __decorate([Component({
	  components: {
	    Icon: Icon$1
	  }
	})], Button);
	var script$6 = Button;

	/* script */
	var __vue_script__$6 = script$6;
	/* template */

	var __vue_render__$6 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('button', _vm._g({
	    staticClass: "btn",
	    class: _vm.cssClass
	  }, _vm.$listeners), [_vm.icon && _vm.left ? _c('icon', {
	    staticClass: "left",
	    attrs: {
	      "type": _vm.icon
	    }
	  }) : _vm._e(), _vm._v(" "), !_vm.action ? _vm._t("default") : _vm._e(), _vm._v(" "), _vm.icon && !_vm.left ? _c('icon', {
	    attrs: {
	      "type": _vm.icon
	    }
	  }) : _vm._e()], 2);
	};

	var __vue_staticRenderFns__$6 = [];
	/* style */

	var __vue_inject_styles__$6 = function __vue_inject_styles__(inject) {
	  if (!inject) return;
	  inject("data-v-17febcca_0", {
	    source: ".btn+.btn{margin-left:.4rem}.btn:not(.btn-action) .icon{margin:0 0 0 .2rem}.btn:not(.btn-action) .icon.left{margin:0 .2rem 0 0}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$6 = undefined;
	/* module identifier */

	var __vue_module_identifier__$6 = undefined;
	/* functional template */

	var __vue_is_functional_template__$6 = false;
	/* style inject SSR */

	var Btn = normalizeComponent_1({
	  render: __vue_render__$6,
	  staticRenderFns: __vue_staticRenderFns__$6
	}, __vue_inject_styles__$6, __vue_script__$6, __vue_scope_id__$6, __vue_is_functional_template__$6, __vue_module_identifier__$6, browser, undefined);

	var script$7 = Vue.extend({
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
	var __vue_script__$7 = script$7;
	/* template */

	var __vue_render__$7 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "btn-group",
	    class: _vm.cssClass
	  }, [_vm._t("default")], 2);
	};

	var __vue_staticRenderFns__$7 = [];
	/* style */

	var __vue_inject_styles__$7 = undefined;
	/* scoped */

	var __vue_scope_id__$7 = undefined;
	/* module identifier */

	var __vue_module_identifier__$7 = undefined;
	/* functional template */

	var __vue_is_functional_template__$7 = false;
	/* style inject */

	/* style inject SSR */

	var BtnGroup = normalizeComponent_1({
	  render: __vue_render__$7,
	  staticRenderFns: __vue_staticRenderFns__$7
	}, __vue_inject_styles__$7, __vue_script__$7, __vue_scope_id__$7, __vue_is_functional_template__$7, __vue_module_identifier__$7, undefined, undefined);

	// `String.prototype.small` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.small
	_export({ target: 'String', proto: true, forced: stringHtmlForced('small') }, {
	  small: function small() {
	    return createHtml(this, 'small', '', '');
	  }
	});

	var Chip = /*#__PURE__*/function (_Vue) {
	  _inherits(Chip, _Vue);

	  var _super = _createSuper(Chip);

	  function Chip() {
	    var _this;

	    _classCallCheck(this, Chip);

	    _this = _super.apply(this, arguments);
	    _this.avatarSizes = Sizes;
	    return _this;
	  }

	  _createClass(Chip, [{
	    key: "close",
	    value: function close() {
	      this.$emit('close');
	    }
	  }, {
	    key: "showClose",
	    value: function showClose() {
	      return !!this.$listeners.close;
	    }
	  }, {
	    key: "cssClass",
	    get: function get() {
	      return [this.active ? 'active' : ''];
	    }
	  }]);

	  return Chip;
	}(Vue);

	__decorate([Prop({
	  type: String,
	  required: true
	}), __metadata("design:type", String)], Chip.prototype, "text", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Chip.prototype, "avatar", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Chip.prototype, "initials", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Chip.prototype, "active", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: true
	}), __metadata("design:type", Boolean)], Chip.prototype, "small", void 0);

	Chip = __decorate([Component({
	  components: {
	    Avatar: Avatar$1
	  }
	})], Chip);
	var script$8 = Chip;

	var __vue_script__$8 = script$8;
	/* template */

	var __vue_render__$8 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('span', {
	    staticClass: "chip",
	    class: _vm.cssClass
	  }, [_vm.avatar || _vm.initials ? _c('avatar', {
	    attrs: {
	      "src": _vm.avatar,
	      "size": _vm.small ? _vm.avatarSizes.sm : undefined,
	      "initials": _vm.initials
	    }
	  }) : _vm._e(), _vm._v("\n  " + _vm._s(_vm.text) + "\n  "), _vm.showClose() ? _c('a', {
	    staticClass: "btn btn-clear",
	    attrs: {
	      "aria-label": "Close",
	      "role": "button"
	    },
	    on: {
	      "click": _vm.close
	    }
	  }) : _vm._e()], 1);
	};

	var __vue_staticRenderFns__$8 = [];
	/* style */

	var __vue_inject_styles__$8 = undefined;
	/* scoped */

	var __vue_scope_id__$8 = undefined;
	/* module identifier */

	var __vue_module_identifier__$8 = undefined;
	/* functional template */

	var __vue_is_functional_template__$8 = false;
	/* style inject */

	/* style inject SSR */

	var Chip$1 = normalizeComponent_1({
	  render: __vue_render__$8,
	  staticRenderFns: __vue_staticRenderFns__$8
	}, __vue_inject_styles__$8, __vue_script__$8, __vue_scope_id__$8, __vue_is_functional_template__$8, __vue_module_identifier__$8, undefined, undefined);

	var Divider = /*#__PURE__*/function (_Vue) {
	  _inherits(Divider, _Vue);

	  var _super = _createSuper(Divider);

	  function Divider() {
	    _classCallCheck(this, Divider);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Divider, [{
	    key: "dataContent",
	    get: function get() {
	      return this.content || this.$slots.default && this.$slots.default[0].text;
	    }
	  }]);

	  return Divider;
	}(Vue);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Divider.prototype, "vert", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Divider.prototype, "content", void 0);

	Divider = __decorate([Component], Divider);
	var script$9 = Divider;

	/* script */
	var __vue_script__$9 = script$9;
	/* template */

	var __vue_render__$9 = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "text-center",
	    class: {
	      divider: !_vm.vert,
	      'divider-vert': _vm.vert
	    },
	    attrs: {
	      "data-content": _vm.dataContent
	    }
	  });
	};

	var __vue_staticRenderFns__$9 = [];
	/* style */

	var __vue_inject_styles__$9 = undefined;
	/* scoped */

	var __vue_scope_id__$9 = undefined;
	/* module identifier */

	var __vue_module_identifier__$9 = undefined;
	/* functional template */

	var __vue_is_functional_template__$9 = false;
	/* style inject */

	/* style inject SSR */

	var Divider$1 = normalizeComponent_1({
	  render: __vue_render__$9,
	  staticRenderFns: __vue_staticRenderFns__$9
	}, __vue_inject_styles__$9, __vue_script__$9, __vue_scope_id__$9, __vue_is_functional_template__$9, __vue_module_identifier__$9, undefined, undefined);

	var MenuBadge = /*#__PURE__*/function (_Vue) {
	  _inherits(MenuBadge, _Vue);

	  var _super = _createSuper(MenuBadge);

	  function MenuBadge() {
	    _classCallCheck(this, MenuBadge);

	    return _super.apply(this, arguments);
	  }

	  return MenuBadge;
	}(Vue);

	__decorate([Prop([String, Number]), __metadata("design:type", Object)], MenuBadge.prototype, "value", void 0);

	MenuBadge = __decorate([Component], MenuBadge);
	var script$a = MenuBadge;

	/* script */
	var __vue_script__$a = script$a;
	/* template */

	var __vue_render__$a = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "menu-badge"
	  }, [_c('label', {
	    staticClass: "label label-primary"
	  }, [_vm._v(_vm._s(_vm.value))])]);
	};

	var __vue_staticRenderFns__$a = [];
	/* style */

	var __vue_inject_styles__$a = undefined;
	/* scoped */

	var __vue_scope_id__$a = undefined;
	/* module identifier */

	var __vue_module_identifier__$a = undefined;
	/* functional template */

	var __vue_is_functional_template__$a = false;
	/* style inject */

	/* style inject SSR */

	var Badge = normalizeComponent_1({
	  render: __vue_render__$a,
	  staticRenderFns: __vue_staticRenderFns__$a
	}, __vue_inject_styles__$a, __vue_script__$a, __vue_scope_id__$a, __vue_is_functional_template__$a, __vue_module_identifier__$a, undefined, undefined);

	var VerticalMenu = /*#__PURE__*/function (_vue) {
	  _inherits(VerticalMenu, _vue);

	  var _super = _createSuper(VerticalMenu);

	  function VerticalMenu() {
	    _classCallCheck(this, VerticalMenu);

	    return _super.apply(this, arguments);
	  }

	  _createClass(VerticalMenu, [{
	    key: "normalizeDivider",
	    value: function normalizeDivider(divider) {
	      return typeof divider === 'string' ? divider : '';
	    }
	  }, {
	    key: "cssClassLinkItem",
	    value: function cssClassLinkItem(current) {
	      return [this.active.toString() === current.toString() ? 'active' : ''];
	    }
	  }]);

	  return VerticalMenu;
	}(Vue);

	__decorate([Prop({
	  type: [Array, Object],
	  required: true
	}), __metadata("design:type", Array)], VerticalMenu.prototype, "items", void 0);

	__decorate([Prop({
	  type: [String, Number],
	  default: ''
	}), __metadata("design:type", Object)], VerticalMenu.prototype, "active", void 0);

	VerticalMenu = __decorate([Component({
	  components: {
	    Badge: Badge
	  }
	})], VerticalMenu);
	var script$b = VerticalMenu;

	/* script */
	var __vue_script__$b = script$b;
	/* template */

	var __vue_render__$b = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('ul', {
	    staticClass: "menu"
	  }, [_vm._l(_vm.items, function (value, key) {
	    return [value.divider ? _c('li', {
	      key: key,
	      staticClass: "divider",
	      attrs: {
	        "data-content": _vm.normalizeDivider(value.divider)
	      }
	    }) : _c('li', {
	      key: key,
	      staticClass: "menu-item"
	    }, [value.badge ? _c('badge', {
	      attrs: {
	        "value": value.badge
	      }
	    }) : _vm._e(), _vm._v(" "), _vm.$scopedSlots.default ? _vm._t("default", null, {
	      item: value,
	      index: key
	    }) : _c('a', {
	      class: _vm.cssClassLinkItem(key),
	      attrs: {
	        "href": value.path
	      }
	    }, [_vm._v(_vm._s(value.text))])], 2)];
	  })], 2);
	};

	var __vue_staticRenderFns__$b = [];
	/* style */

	var __vue_inject_styles__$b = undefined;
	/* scoped */

	var __vue_scope_id__$b = undefined;
	/* module identifier */

	var __vue_module_identifier__$b = undefined;
	/* functional template */

	var __vue_is_functional_template__$b = false;
	/* style inject */

	/* style inject SSR */

	var VerticalMenu$1 = normalizeComponent_1({
	  render: __vue_render__$b,
	  staticRenderFns: __vue_staticRenderFns__$b
	}, __vue_inject_styles__$b, __vue_script__$b, __vue_scope_id__$b, __vue_is_functional_template__$b, __vue_module_identifier__$b, undefined, undefined);

	var DropdownMenu = /*#__PURE__*/function (_vue) {
	  _inherits(DropdownMenu, _vue);

	  var _super = _createSuper(DropdownMenu);

	  function DropdownMenu() {
	    _classCallCheck(this, DropdownMenu);

	    return _super.apply(this, arguments);
	  }

	  _createClass(DropdownMenu, [{
	    key: "open",
	    value: function open() {
	      this.$emit('opened');
	    }
	  }, {
	    key: "close",
	    value: function close() {
	      this.$emit('closed');
	    }
	  }, {
	    key: "cssClass",
	    get: function get() {
	      return [this.right ? 'dropdown-right' : ''];
	    }
	  }, {
	    key: "btnCssClass",
	    get: function get() {
	      return [Types[this.btnType]];
	    }
	  }]);

	  return DropdownMenu;
	}(Vue);

	__decorate([Prop({
	  type: [Object, Array],
	  required: true
	}), __metadata("design:type", Array)], DropdownMenu.prototype, "items", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], DropdownMenu.prototype, "right", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], DropdownMenu.prototype, "btnType", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], DropdownMenu.prototype, "btnText", void 0);

	__decorate([Prop({
	  type: String,
	  default: Navigation.caret
	}), __metadata("design:type", String)], DropdownMenu.prototype, "btnIcon", void 0);

	__decorate([Prop(), __metadata("design:type", String)], DropdownMenu.prototype, "state", void 0);

	DropdownMenu = __decorate([Component({
	  components: {
	    VerticalMenu: VerticalMenu$1
	  }
	})], DropdownMenu);
	var script$c = DropdownMenu;

	/* script */
	var __vue_script__$c = script$c;
	/* template */

	var __vue_render__$c = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "dropdown",
	    class: _vm.cssClass
	  }, [_c('btn', {
	    staticClass: "dropdown-toggle",
	    class: _vm.btnCssClass,
	    attrs: {
	      "tabindex": "0",
	      "icon": _vm.btnIcon,
	      "state": _vm.state
	    },
	    on: {
	      "focus": _vm.open,
	      "blur": _vm.close
	    }
	  }, [_vm._v("\n    " + _vm._s(_vm.btnText) + "\n  ")]), _vm._v(" "), _vm.$scopedSlots.default ? _c('vertical-menu', {
	    attrs: {
	      "items": _vm.items
	    },
	    scopedSlots: _vm._u([{
	      key: "default",
	      fn: function fn(ref) {
	        var item = ref.item;
	        var index = ref.index;
	        return [_vm._t("default", null, {
	          item: item,
	          index: index
	        })];
	      }
	    }])
	  }) : _c('vertical-menu', {
	    attrs: {
	      "items": _vm.items
	    }
	  })], 1);
	};

	var __vue_staticRenderFns__$c = [];
	/* style */

	var __vue_inject_styles__$c = undefined;
	/* scoped */

	var __vue_scope_id__$c = undefined;
	/* module identifier */

	var __vue_module_identifier__$c = undefined;
	/* functional template */

	var __vue_is_functional_template__$c = false;
	/* style inject */

	/* style inject SSR */

	var DropdownMenu$1 = normalizeComponent_1({
	  render: __vue_render__$c,
	  staticRenderFns: __vue_staticRenderFns__$c
	}, __vue_inject_styles__$c, __vue_script__$c, __vue_scope_id__$c, __vue_is_functional_template__$c, __vue_module_identifier__$c, undefined, undefined);

	// `String.prototype.sub` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.sub
	_export({ target: 'String', proto: true, forced: stringHtmlForced('sub') }, {
	  sub: function sub() {
	    return createHtml(this, 'sub', '', '');
	  }
	});

	var Empty = /*#__PURE__*/function (_Vue) {
	  _inherits(Empty, _Vue);

	  var _super = _createSuper(Empty);

	  function Empty() {
	    var _this;

	    _classCallCheck(this, Empty);

	    _this = _super.apply(this, arguments);
	    _this.iconSizes = Sizes$1;
	    return _this;
	  }

	  return Empty;
	}(Vue);

	__decorate([Prop(String), __metadata("design:type", String)], Empty.prototype, "title", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Empty.prototype, "sub", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Empty.prototype, "icon", void 0);

	Empty = __decorate([Component({
	  components: {
	    Icon: Icon$1
	  }
	})], Empty);
	var script$d = Empty;

	var __vue_script__$d = script$d;
	/* template */

	var __vue_render__$d = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "empty"
	  }, [_vm.icon ? _c('div', {
	    staticClass: "empty-icon"
	  }, [_c('icon', {
	    attrs: {
	      "type": _vm.icon,
	      "size": _vm.iconSizes.x3
	    }
	  })], 1) : _vm._e(), _vm._v(" "), _vm.title ? _c('p', {
	    staticClass: "empty-title h5"
	  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), _vm.sub ? _c('p', {
	    staticClass: "empty-subtitle"
	  }, [_vm._v(_vm._s(_vm.sub))]) : _vm._e(), _vm._v(" "), _vm.$slots.default ? _c('div', {
	    staticClass: "empty-content"
	  }, [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), _vm.$slots.action ? _c('div', {
	    staticClass: "empty-action"
	  }, [_vm._t("action")], 2) : _vm._e()]);
	};

	var __vue_staticRenderFns__$d = [];
	/* style */

	var __vue_inject_styles__$d = undefined;
	/* scoped */

	var __vue_scope_id__$d = undefined;
	/* module identifier */

	var __vue_module_identifier__$d = undefined;
	/* functional template */

	var __vue_is_functional_template__$d = false;
	/* style inject */

	/* style inject SSR */

	var Empty$1 = normalizeComponent_1({
	  render: __vue_render__$d,
	  staticRenderFns: __vue_staticRenderFns__$d
	}, __vue_inject_styles__$d, __vue_script__$d, __vue_scope_id__$d, __vue_is_functional_template__$d, __vue_module_identifier__$d, undefined, undefined);

	var Types$1;

	(function (Types) {
	  Types["primary"] = "label-primary";
	  Types["secondary"] = "label-secondary";
	  Types["success"] = "label-success";
	  Types["warning"] = "label-warning";
	  Types["error"] = "label-error";
	})(Types$1 || (Types$1 = {}));

	var Label = /*#__PURE__*/function (_Vue) {
	  _inherits(Label, _Vue);

	  var _super = _createSuper(Label);

	  function Label() {
	    _classCallCheck(this, Label);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Label, [{
	    key: "cssClass",
	    get: function get() {
	      return [Types$1[this.type], this.rounded ? 'label-rounded' : ''];
	    }
	  }]);

	  return Label;
	}(Vue);

	__decorate([Prop(String), __metadata("design:type", String)], Label.prototype, "type", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Label.prototype, "rounded", void 0);

	Label = __decorate([Component({
	  name: 'tag'
	})], Label);
	var script$e = Label;

	/* script */
	var __vue_script__$e = script$e;
	/* template */

	var __vue_render__$e = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('span', {
	    staticClass: "label",
	    class: _vm.cssClass
	  }, [_vm._t("default")], 2);
	};

	var __vue_staticRenderFns__$e = [];
	/* style */

	var __vue_inject_styles__$e = function __vue_inject_styles__(inject) {
	  if (!inject) return;
	  inject("data-v-5877c339_0", {
	    source: ".label+.label{margin-left:.3rem}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$e = undefined;
	/* module identifier */

	var __vue_module_identifier__$e = undefined;
	/* functional template */

	var __vue_is_functional_template__$e = false;
	/* style inject SSR */

	var Tag = normalizeComponent_1({
	  render: __vue_render__$e,
	  staticRenderFns: __vue_staticRenderFns__$e
	}, __vue_inject_styles__$e, __vue_script__$e, __vue_scope_id__$e, __vue_is_functional_template__$e, __vue_module_identifier__$e, browser, undefined);

	var Sizes$3;

	(function (Sizes) {
	  Sizes["sm"] = "modal-sm";
	  Sizes["lg"] = "modal-lg";
	})(Sizes$3 || (Sizes$3 = {}));

	var Modal = /*#__PURE__*/function (_vue) {
	  _inherits(Modal, _vue);

	  var _super = _createSuper(Modal);

	  function Modal() {
	    var _this;

	    _classCallCheck(this, Modal);

	    _this = _super.apply(this, arguments);
	    _this.btnType = Types.clear;
	    return _this;
	  }

	  _createClass(Modal, [{
	    key: "close",
	    value: function close() {}
	  }, {
	    key: "cssClass",
	    get: function get() {
	      return [this.show ? 'active' : '', Sizes$3[this.size] || this.size];
	    }
	  }]);

	  return Modal;
	}(Vue);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Modal.prototype, "show", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Modal.prototype, "size", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: true
	}), __metadata("design:type", Boolean)], Modal.prototype, "closeBtn", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: true
	}), __metadata("design:type", Boolean)], Modal.prototype, "overlay", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: true
	}), __metadata("design:type", Boolean)], Modal.prototype, "closeOverlay", void 0);

	__decorate([Emit('close'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Modal.prototype, "close", null);

	Modal = __decorate([Component({
	  components: {
	    Btn: Btn
	  }
	})], Modal);
	var script$f = Modal;

	/* script */
	var __vue_script__$f = script$f;
	/* template */

	var __vue_render__$f = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "modal",
	    class: _vm.cssClass
	  }, [_vm.overlay ? _c('a', {
	    staticClass: "modal-overlay",
	    attrs: {
	      "aria-label": "Close"
	    },
	    on: {
	      "click": function click($event) {
	        _vm.closeOverlay && _vm.close();
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "modal-container"
	  }, [_c('div', {
	    staticClass: "modal-header"
	  }, [_vm.closeBtn ? _c('btn', {
	    staticClass: "float-right",
	    attrs: {
	      "type": _vm.btnType,
	      "aria-label": "Close"
	    },
	    on: {
	      "click": _vm.close
	    }
	  }) : _vm._e(), _vm._v(" "), _vm._t("header")], 2), _vm._v(" "), _c('div', {
	    staticClass: "modal-body"
	  }, [_c('div', {
	    staticClass: "content"
	  }, [_vm._t("content")], 2)]), _vm._v(" "), _c('div', {
	    staticClass: "modal-footer"
	  }, [_vm._t("footer")], 2)])]);
	};

	var __vue_staticRenderFns__$f = [];
	/* style */

	var __vue_inject_styles__$f = undefined;
	/* scoped */

	var __vue_scope_id__$f = undefined;
	/* module identifier */

	var __vue_module_identifier__$f = undefined;
	/* functional template */

	var __vue_is_functional_template__$f = false;
	/* style inject */

	/* style inject SSR */

	var Modal$1 = normalizeComponent_1({
	  render: __vue_render__$f,
	  staticRenderFns: __vue_staticRenderFns__$f
	}, __vue_inject_styles__$f, __vue_script__$f, __vue_scope_id__$f, __vue_is_functional_template__$f, __vue_module_identifier__$f, undefined, undefined);

	var OffCanvas = /*#__PURE__*/function (_vue) {
	  _inherits(OffCanvas, _vue);

	  var _super = _createSuper(OffCanvas);

	  function OffCanvas() {
	    var _this;

	    _classCallCheck(this, OffCanvas);

	    _this = _super.apply(this, arguments);
	    _this.active = false;
	    return _this;
	  }

	  _createClass(OffCanvas, [{
	    key: "showSidebar",
	    value: function showSidebar() {
	      this.active = true;
	    }
	  }, {
	    key: "hideSidebar",
	    value: function hideSidebar() {
	      this.active = false;
	    }
	  }]);

	  return OffCanvas;
	}(Vue);

	__decorate([Prop({
	  default: Navigation.menu
	}), __metadata("design:type", String)], OffCanvas.prototype, "icon", void 0);

	__decorate([Prop({
	  default: true,
	  type: Boolean
	}), __metadata("design:type", Boolean)], OffCanvas.prototype, "sidebarShow", void 0);

	OffCanvas = __decorate([Component({
	  components: {
	    icon: Icon$1
	  }
	})], OffCanvas);
	var script$g = OffCanvas;

	/* script */
	var __vue_script__$g = script$g;
	/* template */

	var __vue_render__$g = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "off-canvas",
	    class: {
	      'off-canvas-sidebar-show': _vm.sidebarShow
	    }
	  }, [_c('div', {
	    staticClass: "off-canvas-toggle"
	  }, [_c('a', {
	    staticClass: "btn btn-primary btn-action",
	    on: {
	      "click": function click($event) {
	        _vm.showSidebar();
	      }
	    }
	  }, [_vm.$slots.icon ? _vm._t("icon") : _c('icon', {
	    attrs: {
	      "type": _vm.icon
	    }
	  })], 2)]), _vm._v(" "), _c('div', {
	    staticClass: "off-canvas-sidebar",
	    class: {
	      active: _vm.active
	    }
	  }, [_vm._t("sidebar")], 2), _vm._v(" "), _c('a', {
	    staticClass: "off-canvas-overlay",
	    on: {
	      "click": function click($event) {
	        _vm.hideSidebar();
	      }
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "off-canvas-content"
	  }, [_vm._t("content"), _vm._v(" "), _vm._t("default")], 2)]);
	};

	var __vue_staticRenderFns__$g = [];
	/* style */

	var __vue_inject_styles__$g = undefined;
	/* scoped */

	var __vue_scope_id__$g = undefined;
	/* module identifier */

	var __vue_module_identifier__$g = undefined;
	/* functional template */

	var __vue_is_functional_template__$g = false;
	/* style inject */

	/* style inject SSR */

	var OffCanvas$1 = normalizeComponent_1({
	  render: __vue_render__$g,
	  staticRenderFns: __vue_staticRenderFns__$g
	}, __vue_inject_styles__$g, __vue_script__$g, __vue_scope_id__$g, __vue_is_functional_template__$g, __vue_module_identifier__$g, undefined, undefined);

	var SimplePager = /*#__PURE__*/function (_vue) {
	  _inherits(SimplePager, _vue);

	  var _super = _createSuper(SimplePager);

	  function SimplePager() {
	    _classCallCheck(this, SimplePager);

	    return _super.apply(this, arguments);
	  }

	  _createClass(SimplePager, [{
	    key: "change",
	    value: function change(page) {
	      this.$emit('change', page);
	    }
	  }, {
	    key: "previous",
	    get: function get() {
	      return this.pages[this.curIndex - 1];
	    }
	  }, {
	    key: "next",
	    get: function get() {
	      return this.pages[this.curIndex + 1];
	    }
	  }, {
	    key: "curIndex",
	    get: function get() {
	      return this.pages.indexOf(this.current);
	    }
	  }]);

	  return SimplePager;
	}(Vue);

	__decorate([Prop({
	  type: Array,
	  required: true
	}), __metadata("design:type", Array)], SimplePager.prototype, "pages", void 0);

	__decorate([Prop({
	  default: 0
	}), __metadata("design:type", String)], SimplePager.prototype, "current", void 0);

	SimplePager = __decorate([Component], SimplePager);
	var script$h = SimplePager;

	/* script */
	var __vue_script__$h = script$h;
	/* template */

	var __vue_render__$h = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('ul', {
	    staticClass: "pagination"
	  }, [_vm.previous ? _c('li', {
	    staticClass: "page-item page-prev"
	  }, [_c('a', {
	    on: {
	      "click": function click($event) {
	        _vm.change(_vm.previous);
	      }
	    }
	  }, [_c('div', {
	    staticClass: "page-item-subtitle"
	  }, [_vm._v("Previous")]), _vm._v(" "), _c('div', {
	    staticClass: "page-item-title h5"
	  }, [_vm._v(_vm._s(_vm.previous))])])]) : _vm._e(), _vm._v(" "), _vm.next ? _c('li', {
	    staticClass: "page-item page-next"
	  }, [_c('a', {
	    on: {
	      "click": function click($event) {
	        _vm.change(_vm.next);
	      }
	    }
	  }, [_c('div', {
	    staticClass: "page-item-subtitle"
	  }, [_vm._v("Next")]), _vm._v(" "), _c('div', {
	    staticClass: "page-item-title h5"
	  }, [_vm._v(_vm._s(_vm.next))])])]) : _vm._e()]);
	};

	var __vue_staticRenderFns__$h = [];
	/* style */

	var __vue_inject_styles__$h = undefined;
	/* scoped */

	var __vue_scope_id__$h = undefined;
	/* module identifier */

	var __vue_module_identifier__$h = undefined;
	/* functional template */

	var __vue_is_functional_template__$h = false;
	/* style inject */

	/* style inject SSR */

	var SimplePager$1 = normalizeComponent_1({
	  render: __vue_render__$h,
	  staticRenderFns: __vue_staticRenderFns__$h
	}, __vue_inject_styles__$h, __vue_script__$h, __vue_scope_id__$h, __vue_is_functional_template__$h, __vue_module_identifier__$h, undefined, undefined);

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

	var defineProperty$4 = objectDefineProperty.f;



	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG$2)) {
	    defineProperty$4(it, TO_STRING_TAG$2, { configurable: true, value: TAG });
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

	var Pager = /*#__PURE__*/function (_vue) {
	  _inherits(Pager, _vue);

	  var _super = _createSuper(Pager);

	  function Pager() {
	    _classCallCheck(this, Pager);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Pager, [{
	    key: "change",
	    value: function change(current) {
	      this.$emit('change', current);
	    }
	  }, {
	    key: "next",
	    value: function next() {
	      this.$emit('change', this.current + 1);
	    }
	  }, {
	    key: "previous",
	    value: function previous() {
	      this.$emit('change', this.current - 1);
	    }
	  }, {
	    key: "items",
	    get: function get() {
	      var _this = this;

	      var half = Math.round((this.show + 1) / 2);

	      if (this.current <= half) {
	        return [].concat(_toConsumableArray$1(Array.from({
	          length: this.show - 1
	        }, function (v, i) {
	          return i + 1;
	        })), [SEPARATOR, this.pages]);
	      }

	      if (this.current + half > this.pages) {
	        return [1, SEPARATOR].concat(_toConsumableArray$1(Array.from({
	          length: this.show - 1
	        }, function (v, i) {
	          return _this.pages - _this.show + 2 + i;
	        })));
	      }

	      var mediana = Math.floor((this.show - 4) / 2);
	      return [1, SEPARATOR].concat(_toConsumableArray$1(Array.from({
	        length: this.show - 3
	      }, function (v, i) {
	        return _this.current - mediana + i;
	      })), [SEPARATOR, this.pages]);
	    }
	  }]);

	  return Pager;
	}(Vue);

	__decorate([Prop({
	  type: [Number],
	  required: true
	}), __metadata("design:type", Number)], Pager.prototype, "pages", void 0);

	__decorate([Prop({
	  type: [Number],
	  default: 1
	}), __metadata("design:type", Number)], Pager.prototype, "current", void 0);

	__decorate([Prop({
	  type: Number,
	  default: 6
	}), __metadata("design:type", Number)], Pager.prototype, "show", void 0);

	Pager = __decorate([Component], Pager);
	var script$i = Pager;

	/* script */
	var __vue_script__$i = script$i;
	/* template */

	var __vue_render__$i = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('ul', {
	    staticClass: "pagination"
	  }, [_c('li', {
	    staticClass: "page-item",
	    class: {
	      disabled: _vm.current == 1
	    }
	  }, [_c('a', {
	    attrs: {
	      "tabindex": "-1"
	    },
	    on: {
	      "click": _vm.previous
	    }
	  }, [_vm._v("Previous")])]), _vm._v(" "), _vm._l(_vm.items, function (n, i) {
	    return _c('li', {
	      key: i,
	      staticClass: "page-item page-item-num",
	      class: {
	        active: _vm.current == n
	      }
	    }, [_c('a', {
	      on: {
	        "click": function click($event) {
	          _vm.change(n);
	        }
	      }
	    }, [_vm._v(_vm._s(n))])]);
	  }), _vm._v(" "), _c('li', {
	    staticClass: "page-item",
	    class: {
	      disabled: _vm.current == _vm.pages
	    }
	  }, [_c('a', {
	    on: {
	      "click": _vm.next
	    }
	  }, [_vm._v("Next")])])], 2);
	};

	var __vue_staticRenderFns__$i = [];
	/* style */

	var __vue_inject_styles__$i = undefined;
	/* scoped */

	var __vue_scope_id__$i = undefined;
	/* module identifier */

	var __vue_module_identifier__$i = undefined;
	/* functional template */

	var __vue_is_functional_template__$i = false;
	/* style inject */

	/* style inject SSR */

	var Pager$1 = normalizeComponent_1({
	  render: __vue_render__$i,
	  staticRenderFns: __vue_staticRenderFns__$i
	}, __vue_inject_styles__$i, __vue_script__$i, __vue_scope_id__$i, __vue_is_functional_template__$i, __vue_module_identifier__$i, undefined, undefined);

	var Pagination = /*#__PURE__*/function (_vue) {
	  _inherits(Pagination, _vue);

	  var _super = _createSuper(Pagination);

	  function Pagination() {
	    _classCallCheck(this, Pagination);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Pagination, [{
	    key: "change",
	    value: function change(current) {
	      this.$emit('update:current', current);
	    }
	  }]);

	  return Pagination;
	}(Vue);

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

	Pagination = __decorate([Component({
	  components: {
	    SimplePager: SimplePager$1,
	    Pager: Pager$1
	  }
	})], Pagination);
	var script$j = Pagination;

	/* script */
	var __vue_script__$j = script$j;
	/* template */

	var __vue_render__$j = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return !Array.isArray(_vm.pages) ? _c('pager', {
	    attrs: {
	      "pages": _vm.pages,
	      "current": _vm.current,
	      "show": _vm.show
	    },
	    on: {
	      "change": _vm.change
	    }
	  }) : _c('simple-pager', {
	    attrs: {
	      "pages": _vm.pages,
	      "current": _vm.current
	    },
	    on: {
	      "change": _vm.change
	    }
	  });
	};

	var __vue_staticRenderFns__$j = [];
	/* style */

	var __vue_inject_styles__$j = function __vue_inject_styles__(inject) {
	  if (!inject) return;
	  inject("data-v-0733e93d_0", {
	    source: ".page-item-num{min-width:1.4rem}@media (min-width:640px){.page-item-num{min-width:1.7rem}}.page-item a{cursor:pointer;user-select:none}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$j = undefined;
	/* module identifier */

	var __vue_module_identifier__$j = undefined;
	/* functional template */

	var __vue_is_functional_template__$j = false;
	/* style inject SSR */

	var Pagination$1 = normalizeComponent_1({
	  render: __vue_render__$j,
	  staticRenderFns: __vue_staticRenderFns__$j
	}, __vue_inject_styles__$j, __vue_script__$j, __vue_scope_id__$j, __vue_is_functional_template__$j, __vue_module_identifier__$j, browser, undefined);

	var script$k = Vue.extend({
	  name: 'Panel'
	});

	/* script */
	var __vue_script__$k = script$k;
	/* template */

	var __vue_render__$k = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "panel"
	  }, [_vm.$slots.header ? _c('div', {
	    staticClass: "panel-header"
	  }, [_vm._t("header")], 2) : _vm._e(), _vm._v(" "), _vm.$slots.nav ? _c('div', {
	    staticClass: "panel-nav"
	  }, [_vm._t("nav")], 2) : _vm._e(), _vm._v(" "), _vm.$slots.body ? _c('div', {
	    staticClass: "panel-body"
	  }, [_vm._t("body")], 2) : _vm._e(), _vm._v(" "), _vm.$slots.footer ? _c('div', {
	    staticClass: "panel-footer"
	  }, [_vm._t("footer")], 2) : _vm._e()]);
	};

	var __vue_staticRenderFns__$k = [];
	/* style */

	var __vue_inject_styles__$k = undefined;
	/* scoped */

	var __vue_scope_id__$k = undefined;
	/* module identifier */

	var __vue_module_identifier__$k = undefined;
	/* functional template */

	var __vue_is_functional_template__$k = false;
	/* style inject */

	/* style inject SSR */

	var Panel = normalizeComponent_1({
	  render: __vue_render__$k,
	  staticRenderFns: __vue_staticRenderFns__$k
	}, __vue_inject_styles__$k, __vue_script__$k, __vue_scope_id__$k, __vue_is_functional_template__$k, __vue_module_identifier__$k, undefined, undefined);

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



	var USES_TO_LENGTH$3 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$3 }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var Sides;

	(function (Sides) {
	  Sides["right"] = "popover-right";
	  Sides["left"] = "popover-left";
	  Sides["bottom"] = "popover-bottom";
	  Sides["top"] = "";
	})(Sides || (Sides = {}));

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
	      default: undefined,
	      validator: function validator(side) {
	        return Object.keys(Sides).includes(side);
	      }
	    }
	  },
	  render: function render(h) {
	    var elements = this.$slots.default || [];
	    return h('div', {
	      class: ['popover', Sides[this.side]]
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

	var script$l = Vue.extend({
	  name: 'Step'
	});

	/* script */
	var __vue_script__$l = script$l;
	/* template */

	var __vue_render__$l = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('span', {
	    staticClass: "step-item"
	  }, [_c('a', [_vm._t("default")], 2)]);
	};

	var __vue_staticRenderFns__$l = [];
	/* style */

	var __vue_inject_styles__$l = function __vue_inject_styles__(inject) {
	  if (!inject) return;
	  inject("data-v-476ba0f5_0", {
	    source: ".step .step-item a{user-select:none}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$l = undefined;
	/* module identifier */

	var __vue_module_identifier__$l = undefined;
	/* functional template */

	var __vue_is_functional_template__$l = false;
	/* style inject SSR */

	var Step = normalizeComponent_1({
	  render: __vue_render__$l,
	  staticRenderFns: __vue_staticRenderFns__$l
	}, __vue_inject_styles__$l, __vue_script__$l, __vue_scope_id__$l, __vue_is_functional_template__$l, __vue_module_identifier__$l, browser, undefined);

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
	      return n.componentOptions && n.componentOptions.tag && n.componentOptions.tag.includes('step');
	    }).map(function (n, i) {
	      return h(Step, {
	        directives: n.data && n.data.directives,
	        class: [i + 1 === _this.$props.active ? 'active' : '']
	      }, n.componentOptions && n.componentOptions.children);
	    });
	    return h('div', {
	      class: 'step'
	    }, steps);
	  }
	});

	var script$m = Vue.extend({
	  name: 'Tab',
	  props: {
	    badge: {
	      type: [String, Number],
	      default: undefined
	    }
	  }
	});

	/* script */
	var __vue_script__$m = script$m;
	/* template */

	var __vue_render__$m = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('span', {
	    staticClass: "tab-item"
	  }, [_c('a', {
	    directives: [{
	      name: "badge",
	      rawName: "v-badge",
	      value: _vm.badge,
	      expression: "badge"
	    }]
	  }, [_vm._t("default")], 2)]);
	};

	var __vue_staticRenderFns__$m = [];
	/* style */

	var __vue_inject_styles__$m = function __vue_inject_styles__(inject) {
	  if (!inject) return;
	  inject("data-v-0ab344d1_0", {
	    source: ".tab .tab-item{cursor:pointer;user-select:none}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$m = undefined;
	/* module identifier */

	var __vue_module_identifier__$m = undefined;
	/* functional template */

	var __vue_is_functional_template__$m = false;
	/* style inject SSR */

	var Tab = normalizeComponent_1({
	  render: __vue_render__$m,
	  staticRenderFns: __vue_staticRenderFns__$m
	}, __vue_inject_styles__$m, __vue_script__$m, __vue_scope_id__$m, __vue_is_functional_template__$m, __vue_module_identifier__$m, browser, undefined);

	var updateCurrent = function updateCurrent(current, emit) {
	  emit('update:current', current);
	};

	var createTab = function createTab(v, origin, key) {
	  var isActive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
	  return v.$createElement(Tab, {
	    props: origin.componentOptions && origin.componentOptions.propsData,
	    class: {
	      active: isActive
	    },
	    nativeOn: {
	      click: function click() {
	        !isActive && updateCurrent(key, v.$emit.bind(v));
	      }
	    }
	  }, origin.componentOptions && origin.componentOptions.children);
	};

	var createSimpleTab = function createSimpleTab(v, item, isActive) {
	  return v.$createElement(Tab, {
	    class: {
	      active: isActive
	    },
	    nativeOn: {
	      click: function click() {
	        if (!isActive) {
	          updateCurrent(item, v.$emit.bind(v));
	        }
	      }
	    }
	  }, [item]);
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

	    var _this$$props = this.$props,
	        items = _this$$props.items,
	        current = _this$$props.current,
	        block = _this$$props.block;
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

	    var _this$$slots$default = this.$slots.default,
	        children = _this$$slots$default === void 0 ? [] : _this$$slots$default;
	    tabs = children.filter(function (child) {
	      return child.componentOptions && child.componentOptions.tag && child.componentOptions.tag.includes('tab');
	    }).map(function (tab, i) {
	      var key = tab.key || i + 1;
	      var isActive = current === key;
	      return createTab(_this, tab, key, isActive);
	    });
	    var tabsActions = children.filter(function (child) {
	      return child.tag !== undefined && child.tag.includes('tab-actions');
	    }).map(function (n) {
	      return h('span', {
	        class: ['tab-item', 'tab-action']
	      }, n.children);
	    });
	    return h('div', {
	      class: cssClass
	    }, [tabs, tabsActions]);
	  }
	});

	var Tile = /*#__PURE__*/function (_vue) {
	  _inherits(Tile, _vue);

	  var _super = _createSuper(Tile);

	  function Tile() {
	    var _this;

	    _classCallCheck(this, Tile);

	    _this = _super.apply(this, arguments);
	    _this.iconSize = Sizes$1.x2;
	    _this.avatarSize = Sizes.lg;
	    return _this;
	  }

	  return Tile;
	}(Vue);

	__decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "title", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "subtitle", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "avatar", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "initials", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Tile.prototype, "icon", void 0);

	__decorate([Prop({
	  type: Boolean,
	  default: false
	}), __metadata("design:type", Boolean)], Tile.prototype, "compact", void 0);

	Tile = __decorate([Component({
	  components: {
	    Icon: Icon$1,
	    Avatar: Avatar$1
	  }
	})], Tile);
	var script$n = Tile;

	/* script */
	var __vue_script__$n = script$n;
	/* template */

	var __vue_render__$n = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('div', {
	    staticClass: "tile",
	    class: {
	      'tile-centered': _vm.compact
	    }
	  }, [_c('div', {
	    staticClass: "tile-icon"
	  }, [_vm.$slots.icon ? _vm._t("default") : _vm.avatar || _vm.initials ? _c('avatar', {
	    attrs: {
	      "src": _vm.avatar,
	      "initials": _vm.initials,
	      "size": _vm.avatarSize
	    }
	  }) : _vm.icon ? _c('icon', {
	    attrs: {
	      "size": _vm.iconSize,
	      "type": _vm.icon
	    }
	  }) : _vm._e()], 2), _vm._v(" "), _c('div', {
	    staticClass: "tile-content"
	  }, [_vm.title ? _c('p', {
	    staticClass: "tile-title",
	    domProps: {
	      "innerHTML": _vm._s(_vm.title)
	    }
	  }) : _vm._e(), _vm._v(" "), _vm.subtitle ? _c('p', {
	    staticClass: "tile-subtitle text-gray",
	    domProps: {
	      "innerHTML": _vm._s(_vm.subtitle)
	    }
	  }) : _vm._e(), _vm._v(" "), _vm.$slots.default ? _c('p', [_vm._t("default")], 2) : _vm._e()]), _vm._v(" "), _vm.$slots.actions ? _c('div', {
	    staticClass: "tile-action"
	  }, [_vm._t("actions")], 2) : _vm._e()]);
	};

	var __vue_staticRenderFns__$n = [];
	/* style */

	var __vue_inject_styles__$n = function __vue_inject_styles__(inject) {
	  if (!inject) return;
	  inject("data-v-edcad7d0_0", {
	    source: ".tile .tile-icon .icon{display:flex;height:2rem;width:2rem}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$n = undefined;
	/* module identifier */

	var __vue_module_identifier__$n = undefined;
	/* functional template */

	var __vue_is_functional_template__$n = false;
	/* style inject SSR */

	var Tile$1 = normalizeComponent_1({
	  render: __vue_render__$n,
	  staticRenderFns: __vue_staticRenderFns__$n
	}, __vue_inject_styles__$n, __vue_script__$n, __vue_scope_id__$n, __vue_is_functional_template__$n, __vue_module_identifier__$n, browser, undefined);

	var Toast = /*#__PURE__*/function (_vue) {
	  _inherits(Toast, _vue);

	  var _super = _createSuper(Toast);

	  function Toast() {
	    var _this;

	    _classCallCheck(this, Toast);

	    _this = _super.apply(this, arguments);
	    _this.shown = true;
	    return _this;
	  }

	  _createClass(Toast, [{
	    key: "mounted",
	    value: function mounted() {
	      var _this2 = this;

	      if (this.autoclose) {
	        setTimeout(function () {
	          return _this2.shown = false;
	        }, this.autoclose);
	      }
	    }
	  }, {
	    key: "close",
	    value: function close() {
	      this.shown = false;
	    }
	  }, {
	    key: "typeClass",
	    get: function get() {
	      return 'toast-' + this.type;
	    }
	  }, {
	    key: "iconClass",
	    get: function get() {
	      return 'icon-' + this.icon;
	    }
	  }]);

	  return Toast;
	}(Vue);

	__decorate([Prop(String), __metadata("design:type", String)], Toast.prototype, "type", void 0);

	__decorate([Prop(Number), __metadata("design:type", Number)], Toast.prototype, "autoclose", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Toast.prototype, "closeable", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Toast.prototype, "icon", void 0);

	__decorate([Emit('closed'), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", void 0)], Toast.prototype, "close", null);

	Toast = __decorate([Component], Toast);
	var script$o = Toast;

	/* script */
	var __vue_script__$o = script$o;
	/* template */

	var __vue_render__$o = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('transition', {
	    attrs: {
	      "name": "fade"
	    }
	  }, [_vm.shown ? _c('div', {
	    staticClass: "toast",
	    class: _vm.typeClass
	  }, [_vm.icon ? _c('icon', {
	    attrs: {
	      "type": _vm.icon
	    }
	  }) : _vm._e(), _vm._v(" "), _vm.closeable ? _c('button', {
	    staticClass: "btn btn-clear float-right",
	    on: {
	      "click": function click($event) {
	        _vm.close();
	      }
	    }
	  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2) : _vm._e()]);
	};

	var __vue_staticRenderFns__$o = [];
	/* style */

	var __vue_inject_styles__$o = function __vue_inject_styles__(inject) {
	  if (!inject) return;
	  inject("data-v-eb7518dc_0", {
	    source: ".fade-enter-active[data-v-eb7518dc],.fade-leave-active[data-v-eb7518dc]{transition:opacity .5s}.fade-enter[data-v-eb7518dc],.fade-leave-to[data-v-eb7518dc]{opacity:0}",
	    map: undefined,
	    media: undefined
	  });
	};
	/* scoped */


	var __vue_scope_id__$o = "data-v-eb7518dc";
	/* module identifier */

	var __vue_module_identifier__$o = undefined;
	/* functional template */

	var __vue_is_functional_template__$o = false;
	/* style inject SSR */

	var Toast$1 = normalizeComponent_1({
	  render: __vue_render__$o,
	  staticRenderFns: __vue_staticRenderFns__$o
	}, __vue_inject_styles__$o, __vue_script__$o, __vue_scope_id__$o, __vue_is_functional_template__$o, __vue_module_identifier__$o, browser, undefined);

	var Navigation$1 = /*#__PURE__*/function (_vue) {
	  _inherits(Navigation, _vue);

	  var _super = _createSuper(Navigation);

	  function Navigation() {
	    _classCallCheck(this, Navigation);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Navigation, [{
	    key: "itemCssClass",
	    value: function itemCssClass(_ref) {
	      var _ref$active = _ref.active,
	          active = _ref$active === void 0 ? false : _ref$active;
	      return [active ? 'active' : ''];
	    }
	  }]);

	  return Navigation;
	}(Vue);

	__decorate([Prop({
	  type: Array,
	  required: true
	}), __metadata("design:type", Array)], Navigation$1.prototype, "items", void 0);

	__decorate([Prop({
	  type: [Number, String],
	  default: -1
	}), __metadata("design:type", Object)], Navigation$1.prototype, "level", void 0);

	Navigation$1 = __decorate([Component({
	  name: 'navigation'
	})], Navigation$1);
	var script$p = Navigation$1;

	/* script */
	var __vue_script__$p = script$p;
	/* template */

	var __vue_render__$p = function __vue_render__() {
	  var _vm = this;

	  var _h = _vm.$createElement;

	  var _c = _vm._self._c || _h;

	  return _c('ul', {
	    staticClass: "nav"
	  }, _vm._l(_vm.items, function (item, index) {
	    return _c('li', {
	      key: index,
	      staticClass: "nav-item",
	      class: _vm.itemCssClass(item)
	    }, [_vm.$scopedSlots.default ? _vm._t("default", null, {
	      item: item,
	      index: index
	    }) : _c('a', {
	      attrs: {
	        "href": item.path
	      }
	    }, [_vm._v(_vm._s(item.text))]), _vm._v(" "), Array.isArray(item.items) && _vm.level != 0 ? [_vm.$scopedSlots.default ? _c('navigation', {
	      attrs: {
	        "items": item.items,
	        "level": _vm.level - 1
	      },
	      scopedSlots: _vm._u([{
	        key: "default",
	        fn: function fn(ref) {
	          var subitem = ref.item;
	          var subindex = ref.index;
	          return [_vm._t("default", null, {
	            item: subitem,
	            index: subindex
	          })];
	        }
	      }])
	    }) : _c('navigation', {
	      attrs: {
	        "items": item.items,
	        "level": _vm.level - 1
	      }
	    })] : _vm._e()], 2);
	  }), 0);
	};

	var __vue_staticRenderFns__$p = [];
	/* style */

	var __vue_inject_styles__$p = undefined;
	/* scoped */

	var __vue_scope_id__$p = undefined;
	/* module identifier */

	var __vue_module_identifier__$p = undefined;
	/* functional template */

	var __vue_is_functional_template__$p = false;
	/* style inject */

	/* style inject SSR */

	var Navigation$2 = normalizeComponent_1({
	  render: __vue_render__$p,
	  staticRenderFns: __vue_staticRenderFns__$p
	}, __vue_inject_styles__$p, __vue_script__$p, __vue_scope_id__$p, __vue_is_functional_template__$p, __vue_module_identifier__$p, undefined, undefined);

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

	var Group = index.createComponent({
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
	        data = _ref.data;

	    if (props.size) {
	      (slots().default || []).map(function (v) {
	        if (v.componentOptions && /^.*form-(label|input|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions.tag || '')) {
	          if (!v.componentOptions.propsData) {
	            v.componentOptions.propsData = {};
	          }

	          v.componentOptions.propsData.size = v.componentOptions.propsData.size || props.size;
	        }
	      });
	    }

	    if (props.disabled !== undefined) {
	      (slots().default || []).map(function (v) {
	        if (v.componentOptions && /^.*form-(input|textarea|select|checkbox-group|checkbox|radio-group|radio)$/.test(v.componentOptions.tag || '')) {
	          if (!v.componentOptions.propsData) {
	            v.componentOptions.propsData = {};
	          }

	          v.componentOptions.propsData.disabled = props.disabled;
	        }
	      });
	    }

	    var cssClass = ['form-group', props.error && 'has-error', props.success && 'has-success', data.class, data.staticClass];
	    return h("div", helper([{
	      "class": cssClass
	    }, data]), [slots().default]);
	  }
	});

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

	var css_248z = ".form-input-hint.error {\n  display: none; }\n\n.form-group.has-error .form-input-hint {\n  display: none; }\n\n.form-group.has-error .form-input-hint.error {\n  display: initial; }\n\n.form-group.has-success .form-input-hint.success {\n  display: initial; }\n";
	styleInject(css_248z);

	var Hint = index.createComponent({
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

	var Horizontal = index.createComponent({
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

	function _defineProperty$1(obj, key, value) {
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
	        _defineProperty$1(target, key, source[key]);
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

	function cachedProp(origin, cached) {
	  return Vue.extend({
	    data: function data() {
	      return _defineProperty$1({}, cached, {});
	    },
	    watch: _defineProperty$1({}, origin, {
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
	var cachedListeners = cachedProp('$listeners', '__listeners');
	var cachedAttrs = cachedProp('$attrs', '__attrs');

	var Textarea = index.componentFactoryOf().mixin(cachedListeners).mixin(cachedAttrs).create({
	  name: 'FormTextarea',
	  props: {
	    value: {
	      type: String,
	      default: undefined
	    },
	    disabled: {
	      type: Boolean,
	      default: false
	    }
	  },
	  data: function data() {
	    return {
	      listeners: {}
	    };
	  },
	  computed: {
	    placeholder: function placeholder() {
	      return this.$attrs.placeholder || this.$slots.default && this.$slots.default[0].text;
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

	var Checkbox = index.componentFactoryOf().mixin(cachedListeners).create({
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
	        return Object.keys(Sizes$4).includes(v);
	      }
	    },
	    type: {
	      type: String,
	      validator: function validator(v) {
	        return Object.keys(Types$2).includes(v);
	      }
	    },
	    error: {
	      type: Boolean
	    }
	  },
	  model: {
	    event: 'change',
	    prop: 'model'
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
	        this.$emit('change', [].concat(_toConsumableArray$1(this.model), [this.value]));
	      } else {
	        this.$emit('change', this.model.filter(function (option) {
	          return option !== _this.value;
	        }));
	      }
	    }
	  },
	  render: function render(h) {
	    var cssClass = [Types$2[this.type] || 'form-checkbox', this.inline ? 'form-inline' : '', this.error ? 'is-error' : false, Sizes$4[this.size]];
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
	    }), this.$slots.default || this.label || this.value]);
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



	var STRICT_METHOD$1 = arrayMethodIsStrict('reduce');
	var USES_TO_LENGTH$5 = arrayMethodUsesToLength('reduce', { 1: 0 });

	// `Array.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	_export({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || !USES_TO_LENGTH$5 }, {
	  reduce: function reduce(callbackfn /* , initialValue */) {
	    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var Group$1 = /*#__PURE__*/function (_tsx$Component) {
	  _inherits(Group, _tsx$Component);

	  var _super = _createSuper(Group);

	  function Group() {
	    _classCallCheck(this, Group);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Group, [{
	    key: "render",
	    value: function render(h) {
	      var _this = this;

	      var group;

	      if (this.options) {
	        group = this.normalizeOptions(this.options).map(function (_ref) {
	          var label = _ref.label,
	              value = _ref.value;
	          return h(Checkbox, {
	            "attrs": {
	              "value": value,
	              "label": label,
	              "inline": _this.inline,
	              "type": _this.type,
	              "size": _this.size,
	              "disabled": _this.disabled,
	              "error": _this.error
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
	        group = (this.$slots.default || []).filter(function (_ref2) {
	          var componentOptions = _ref2.componentOptions;
	          return componentOptions && componentOptions.tag && componentOptions.tag.includes('form-checkbox');
	        }).map(function (option) {
	          if (!option.componentOptions) {
	            option.componentOptions = {};
	          }

	          if (!option.componentOptions.propsData) {
	            option.componentOptions.propsData = {};
	          }

	          var props = option.componentOptions.propsData;
	          props.model = _this.value;
	          props.inline = _this.inline || props.inline;
	          props.type = _this.type || props.type;
	          props.size = props.size !== undefined ? props.size : _this.size;
	          props.disabled = props.disabled !== undefined ? props.disabled : _this.disabled;
	          props.error = props.error !== undefined ? props.error : _this.error;
	          option.componentOptions.listeners = Object.assign(Object.assign({}, option.componentOptions.listeners), {
	            change: _this.update
	          });
	          return option;
	        });
	      }

	      return h("div", [group]);
	    }
	  }, {
	    key: "update",
	    value: function update(value) {
	      this.$emit('input', value);
	    }
	  }, {
	    key: "normalizeOptions",
	    value: function normalizeOptions(options) {
	      if (Array.isArray(options)) {
	        return options.reduce(function (normal, value) {
	          return [].concat(_toConsumableArray$1(normal), [{
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
	  }]);

	  return Group;
	}(index.Component);

	__decorate([Prop([Array, Object]), __metadata("design:type", Object)], Group$1.prototype, "options", void 0);

	__decorate([Prop({
	  type: Array,
	  default: function _default() {
	    return [];
	  }
	}), __metadata("design:type", Array)], Group$1.prototype, "value", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group$1.prototype, "inline", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Group$1.prototype, "type", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Group$1.prototype, "size", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group$1.prototype, "disabled", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group$1.prototype, "error", void 0);

	Group$1 = __decorate([Component({
	  name: 'FormCheckboxGroup'
	})], Group$1);

	var Sizes$5;

	(function (Sizes) {
	  Sizes["sm"] = "input-sm";
	  Sizes["lg"] = "input-lg";
	})(Sizes$5 || (Sizes$5 = {}));

	var Input = index.componentFactoryOf().mixin(cachedListeners).mixin(cachedAttrs).create({
	  name: 'Input',
	  props: {
	    size: {
	      type: String,
	      validator: function validator(size) {
	        return Object.keys(Sizes$5).includes(size);
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
	    }
	  },
	  render: function render(h) {
	    var cssClass = ['form-input', this.error ? 'is-error' : false, this.success ? 'is-success' : false, Sizes$5[this.size]];
	    return h("input", {
	      "class": cssClass,
	      "domProps": _objectSpread2({}, {
	        value: this.value
	      }),
	      "on": _objectSpread2({}, this.__listeners),
	      "attrs": _objectSpread2({}, this.__attrs)
	    });
	  }
	});

	var Icon$2 = /*#__PURE__*/function (_TsxComponent) {
	  _inherits(Icon, _TsxComponent);

	  var _super = _createSuper(Icon);

	  function Icon() {
	    _classCallCheck(this, Icon);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Icon, [{
	    key: "render",
	    value: function render(h) {
	      return h("i", {
	        "class": ['form-icon', 'icon', Icons[this.icon]]
	      });
	    }
	  }]);

	  return Icon;
	}(index.Component);

	__decorate([Prop(), __metadata("design:type", String)], Icon$2.prototype, "icon", void 0);

	Icon$2 = __decorate([Component], Icon$2);

	var IconSide;

	(function (IconSide) {
	  IconSide["left"] = "has-icon-left";
	  IconSide["right"] = "has-icon-right";
	})(IconSide || (IconSide = {}));

	var IconContainer = /*#__PURE__*/function (_tsx$Component) {
	  _inherits(IconContainer, _tsx$Component);

	  var _super = _createSuper(IconContainer);

	  function IconContainer() {
	    _classCallCheck(this, IconContainer);

	    return _super.apply(this, arguments);
	  }

	  _createClass(IconContainer, [{
	    key: "render",
	    value: function render(h) {
	      return h("div", {
	        "class": IconSide[this.side]
	      }, [this.$slots.default]);
	    }
	  }]);

	  return IconContainer;
	}(index.Component);

	__decorate([Prop({
	  type: String,
	  validator: function validator(side) {
	    return Object.keys(IconSide).includes(side);
	  }
	}), __metadata("design:type", String)], IconContainer.prototype, "side", void 0);

	IconContainer = __decorate([Component], IconContainer);

	var Loading = Vue.extend({
	  render: function render(h) {
	    return h("i", {
	      "class": "form-icon loading"
	    });
	  }
	});

	var Component$1 = index.componentFactoryOf().mixin(cachedListeners).mixin(cachedAttrs).create({
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
	    onInput: function onInput(_ref) {
	      var value = _ref.target.value;
	      this.$emit('input', value);
	    }
	  },
	  render: function render(h) {
	    var _this$$props = this.$props,
	        icon = _this$$props.icon,
	        iconSide = _this$$props.iconSide,
	        loading = _this$$props.loading,
	        size = _this$$props.size,
	        disabled = _this$$props.disabled;
	    var input = h(Input, {
	      "attrs": _objectSpread2({
	        "size": size,
	        "value": this.value,
	        "error": this.error,
	        "success": this.success
	      }, Object.assign(Object.assign({}, this.__attrs), {
	        disabled: disabled
	      })),
	      "on": _objectSpread2({}, Object.assign(Object.assign({}, this.__listeners), {
	        input: this.onInput
	      }))
	    });

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

	var Label$1 = index.createComponent({
	  name: 'FormLabel',
	  functional: true,
	  props: {
	    size: {
	      type: String,
	      default: undefined,
	      validator: function validator(v) {
	        return !v || Object.keys(LabelSizes).includes(v);
	      }
	    }
	  },
	  render: function render(h, _ref) {
	    var props = _ref.props,
	        children = _ref.children,
	        data = _ref.data;
	    var cssClasses = ['form-label', LabelSizes[props.size]];
	    return h("label", helper([{
	      "class": cssClasses
	    }, data]), [children]);
	  }
	});

	var Sizes$6;

	(function (Sizes) {
	  Sizes["sm"] = "input-sm";
	  Sizes["lg"] = "input-lg";
	})(Sizes$6 || (Sizes$6 = {}));

	var Radio = index.componentFactoryOf().mixin(cachedListeners).create({
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
	        return Object.keys(Sizes$6).includes(size);
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
	      return this.$slots.default || this.label || this._value;
	    },
	    _value: function _value() {
	      return this.value || this.$slots.default && this.$slots.default[0].text || this.label;
	    }
	  },
	  methods: {
	    onChecked: function onChecked() {
	      this.$emit('change', this._value);
	    }
	  },
	  render: function render(h) {
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
	      "on": _objectSpread2({}, Object.assign(Object.assign({}, this.__listeners), {
	        change: this.onChecked
	      }))
	    }), h("i", {
	      "class": "form-icon"
	    }), " ", this._label]);
	  }
	});

	var Group$2 = /*#__PURE__*/function (_tsx$Component) {
	  _inherits(Group, _tsx$Component);

	  var _super = _createSuper(Group);

	  function Group() {
	    _classCallCheck(this, Group);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Group, [{
	    key: "render",
	    value: function render(h) {
	      var _this = this;

	      var name = this.name || this.uid;
	      var group;

	      if (this.options) {
	        group = this.normalizeOptions(this.options).map(function (_ref) {
	          var label = _ref.label,
	              value = _ref.value;
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
	            "props": _objectSpread2({}, {
	              model: _this.value
	            })
	          });
	        });
	      } else {
	        group = (this.$slots.default || []).filter(function (_ref2) {
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
	  }, {
	    key: "update",
	    value: function update(value) {
	      this.$emit('input', value);
	    }
	  }, {
	    key: "normalizeOptions",
	    value: function normalizeOptions(options) {
	      if (Array.isArray(options)) {
	        return options.reduce(function (normal, value) {
	          return [].concat(_toConsumableArray$1(normal), [{
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
	  }, {
	    key: "uid",
	    get: function get() {
	      return 'radio-group-' + Math.round(Math.random() * 1000);
	    }
	  }]);

	  return Group;
	}(index.Component);

	__decorate([Prop(), __metadata("design:type", Object)], Group$2.prototype, "options", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Group$2.prototype, "name", void 0);

	__decorate([Prop(), __metadata("design:type", Object)], Group$2.prototype, "value", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group$2.prototype, "inline", void 0);

	__decorate([Prop(String), __metadata("design:type", String)], Group$2.prototype, "size", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group$2.prototype, "error", void 0);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Group$2.prototype, "disabled", void 0);

	Group$2 = __decorate([Component({
	  name: 'FormRadioGroup'
	})], Group$2);

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

	var Option = /*#__PURE__*/function (_tsx$Component) {
	  _inherits(Option, _tsx$Component);

	  var _super = _createSuper(Option);

	  function Option() {
	    _classCallCheck(this, Option);

	    return _super.apply(this, arguments);
	  }

	  _createClass(Option, [{
	    key: "render",
	    value: function render(h) {
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
	      }, [this.$slots.default || label || value]);
	    }
	  }]);

	  return Option;
	}(index.Component);

	__decorate([Prop(Boolean), __metadata("design:type", Boolean)], Option.prototype, "disabled", void 0);

	__decorate([Prop(), __metadata("design:type", Object)], Option.prototype, "value", void 0);

	__decorate([Prop(), __metadata("design:type", Object)], Option.prototype, "label", void 0);

	__decorate([Prop(), __metadata("design:type", Boolean)], Option.prototype, "selected", void 0);

	Option = __decorate([Component], Option);

	var Sizes$7;

	(function (Sizes) {
	  Sizes["sm"] = "select-sm";
	  Sizes["lg"] = "select-lg";
	})(Sizes$7 || (Sizes$7 = {}));

	var Select = index.componentFactoryOf().mixin(cachedListeners).mixin(cachedAttrs).create({
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
	      default: ''
	    },
	    size: {
	      type: [String, Number]
	    },
	    scale: {
	      type: String,
	      validator: function validator(size) {
	        return Object.keys(Sizes$7).includes(size);
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
	    if (!this.options && !this.$slots.default) {
	      throw new TypeError('Component could not be created without options');
	    }
	  },
	  methods: {
	    onInput: function onInput(_ref) {
	      var selectedOptions = _ref.target.selectedOptions;

	      if (this.multiple) {
	        var selected = _toConsumableArray$1(selectedOptions).map(function (option) {
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
	          return [].concat(_toConsumableArray$1(normal), [{
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
	        return h(Option, {
	          "attrs": {
	            "selected": _this2.isSelected(label, value),
	            "label": label,
	            "value": value
	          }
	        });
	      });
	    } else {
	      options = (this.$slots.default || []).filter(function (_ref3) {
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
	  FormInput: Component$1,
	  FormLabel: Label$1,
	  FormHint: Hint,
	  FormHorizontal: Horizontal,
	  FormOption: Option,
	  FormSelect: Select,
	  FormTextarea: Textarea,
	  FormRadioGroup: Group$2,
	  FormRadio: Radio
	};

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

	var layout = {
	  Container: Container,
	  Columns: Columns,
	  Column: Column
	};

	var Badge$1 = function Badge(el, _ref) {
	  var value = _ref.value;
	  if (value === undefined) return;
	  el.classList.add('badge');
	  el.setAttribute('data-badge', value);
	};

	var nativePromiseConstructor = global_1.Promise;

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$4 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$4]) {
	    defineProperty(Constructor, SPECIES$4, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
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

	var SPECIES$5 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var engineIsIos = /(iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

	var location = global_1.location;
	var set$1 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$1 = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location.protocol + '//' + location.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$1 || !clear) {
	  set$1 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (classofRaw(process$1) == 'process') {
	    defer = function (id) {
	      process$1.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !engineIsIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = functionBindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (
	    global_1.addEventListener &&
	    typeof postMessage == 'function' &&
	    !global_1.importScripts &&
	    !fails(post) &&
	    location.protocol !== 'file:'
	  ) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$1,
	  clear: clear
	};

	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;

	var macrotask = task.set;


	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$2 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$2) == 'process';
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$2.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (IS_NODE) {
	    notify = function () {
	      process$2.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  } else if (MutationObserver && !engineIsIos) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f$5 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$5
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task$1 = task.set;










	var SPECIES$6 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$1 = internalState.get;
	var setInternalState$1 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$3 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$3) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED$1 = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (engineV8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
	  }
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$6] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION$1 = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (promise, state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$3.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$3.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$1) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$1(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState$1(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$1(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED$1 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED$1 }, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	var add = function add(el, cssClasses) {
	  var _el$classList;

	  (_el$classList = el.classList).add.apply(_el$classList, _toConsumableArray$1(cssClasses));
	};

	var remove = function remove(el, cssClasses) {
	  var _el$classList2;

	  (_el$classList2 = el.classList).remove.apply(_el$classList2, _toConsumableArray$1(cssClasses));
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

	var Sides$1;

	(function (Sides) {
	  Sides["top"] = "";
	  Sides["bottom"] = "tooltip-bottom";
	  Sides["right"] = "tooltip-right";
	  Sides["left"] = "tooltip-left";
	})(Sides$1 || (Sides$1 = {}));

	var Tooltip = function Tooltip(el, _ref) {
	  var value = _ref.value,
	      modifiers = _ref.modifiers;

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

	var allComponents = Object.assign(Object.assign({}, components), layout);

	var VectrePlugin = function VectrePlugin(vue) {
	  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
	    prefix: ''
	  };

	  for (var _i = 0, _Object$keys = Object.keys(allComponents); _i < _Object$keys.length; _i++) {
	    var component = _Object$keys[_i];
	    vue.component(addPrefix(component, options.prefix), allComponents[component]);
	  }

	  for (var _i2 = 0, _Object$keys2 = Object.keys(directives); _i2 < _Object$keys2.length; _i2++) {
	    var directive = _Object$keys2[_i2];
	    vue.directive(addPrefix(directive, options.prefix, '-'), directives[directive]);
	  }
	};

	var plugin = Object.assign(VectrePlugin, {
	  components: components,
	  layout: layout,
	  directives: directives
	});

	return plugin;

})));
