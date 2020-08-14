(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
	typeof define === 'function' && define.amd ? define(['vue'], factory) :
	(global = global || self, global.Vectre = factory(global.Vue));
}(this, (function (vue) { 'use strict';

	vue = vue && Object.prototype.hasOwnProperty.call(vue, 'default') ? vue['default'] : vue;

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

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var functionBindContext = function (fn, that, length) {
	  aFunction(fn);
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

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
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

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
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

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
	});

	var document = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document) && isObject(document.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
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

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
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

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.5',
	  mode:  'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});
	});

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
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
	var createMethod = function (TYPE) {
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
	  forEach: createMethod(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod(6)
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

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f$1
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$2
	};

	var path = global_1;

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
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
	var createMethod$1 = function (IS_INCLUDES) {
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
	  includes: createMethod$1(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod$1(false)
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
	  if (n === "Map" || n === "Set") return Array.from(n);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
	}

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
	var vue_1 = __importDefault(vue);
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

	function cachedProp(origin, cached) {
	  return vue.extend({
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
	var cachedListeners = cachedProp('$listeners', '__listeners');
	var cachedAttrs = cachedProp('$attrs', '__attrs');

	var FormSelectOption = index.componentFactoryOf().mixin(cachedListeners).mixin(cachedAttrs).create({
	  props: {
	    disabled: {
	      type: Boolean
	    },
	    value: {
	      type: [String, Number],
	      default: ''
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
	    }, [this.$slots.default || label || value]);
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
	      default: ''
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
	    if (!this.options && !this.$slots.default) {
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

	var FormSelectComponents = makePluggableComponents({
	  FormSelect: FormSelect,
	  FormSelectOption: FormSelectOption
	});

	// import * as tsx from 'vue-tsx-support';
	var FormTextarea = //  tsx
	//   .componentFactoryOf<FormTextareaEvents>()
	//   .mixin(cachedListeners)
	//   .mixin(cachedAttrs)
	// .create({
	vue.extend({
	  name: 'FormTextarea',
	  mixins: [cachedAttrs],
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
	    return h('textarea', {
	      class: 'form-input',
	      attrs: Object.assign(Object.assign({}, this.$attrs), {
	        disabled: this.disabled,
	        value: this.value,
	        placeholder: this.placeholder
	      }),
	      on: {
	        // ...this.__listeners,
	        input: this.onInput
	      }
	    }); // return (
	    //   <textarea
	    //     placeholder={this.placeholder}
	    //     value={this.value}
	    //     disabled={this.disabled}
	    //     class="form-input"
	    //     {...{ attrs: { ...this.__attrs } }}
	    //     {...{ on: { ...this.__listeners, input: this.onInput } }}
	    //   />
	    // );
	  }
	});

	var FormTextareaComponents = makePluggableComponents({
	  FormTextarea: FormTextarea
	});

	// import AvatarComponents from './Avatar';
	// export * from './Tag';
	// export * from './Modal';
	// export * from './Popover';
	// // Default is all components

	var components = {
	  // AvatarComponents,
	  // AccordionComponents,
	  // BtnComponents,
	  // BarComponents,
	  // BreadcrumbComponents,
	  // CardComponents,
	  // ChipComponents,
	  // ColumnComponents,
	  // ColumnsComponents,
	  // ContainerComponents,
	  // DividerComponents,
	  // DropdownMenuComponents,
	  // EmptyComponents,
	  // IconComponents,
	  // ModalComponents,
	  // OffCanvasComponents,
	  // PaginationComponents,
	  // PanelComponents,
	  // PopoverComponents,
	  // StepComponents,
	  // TabComponents,
	  // TileComponents,
	  // ToasComponents,
	  // TagComponents,
	  // NavigationComponents,
	  // VerticalMenuComponents,
	  // FormCheckboxComponents,
	  // FormGroupComponents,
	  // FormInputComponents,
	  // FormLabelComponents,
	  // FormHintComponents,
	  // FormHorizontalComponents,
	  // FormRadioComponents,
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

	var Loading = function Loading(el, _ref) {
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
	  Loading: Loading
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

	return VectrePlugin;

})));
