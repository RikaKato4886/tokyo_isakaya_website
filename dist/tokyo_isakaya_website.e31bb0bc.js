// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/is-callable/index.js":[function(require,module,exports) {
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;

if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
  try {
    badArrayLike = Object.defineProperty({}, 'length', {
      get: function () {
        throw isCallableMarker;
      }
    });
    isCallableMarker = {}; // eslint-disable-next-line no-throw-literal

    reflectApply(function () {
      throw 42;
    }, null, badArrayLike);
  } catch (_) {
    if (_ !== isCallableMarker) {
      reflectApply = null;
    }
  }
} else {
  reflectApply = null;
}

var constructorRegex = /^\s*class\b/;

var isES6ClassFn = function isES6ClassFunction(value) {
  try {
    var fnStr = fnToStr.call(value);
    return constructorRegex.test(fnStr);
  } catch (e) {
    return false; // not a function
  }
};

var tryFunctionObject = function tryFunctionToStr(value) {
  try {
    if (isES6ClassFn(value)) {
      return false;
    }

    fnToStr.call(value);
    return true;
  } catch (e) {
    return false;
  }
};

var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
module.exports = reflectApply ? function isCallable(value) {
  if (!value) {
    return false;
  }

  if (typeof value !== 'function' && typeof value !== 'object') {
    return false;
  }

  if (typeof value === 'function' && !value.prototype) {
    return true;
  }

  try {
    reflectApply(value, null, badArrayLike);
  } catch (e) {
    if (e !== isCallableMarker) {
      return false;
    }
  }

  return !isES6ClassFn(value);
} : function isCallable(value) {
  if (!value) {
    return false;
  }

  if (typeof value !== 'function' && typeof value !== 'object') {
    return false;
  }

  if (typeof value === 'function' && !value.prototype) {
    return true;
  }

  if (hasToStringTag) {
    return tryFunctionObject(value);
  }

  if (isES6ClassFn(value)) {
    return false;
  }

  var strClass = toStr.call(value);
  return strClass === fnClass || strClass === genClass;
};
},{}],"node_modules/for-each/index.js":[function(require,module,exports) {
'use strict';

var isCallable = require('is-callable');

var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

module.exports = forEach;

},{"is-callable":"node_modules/is-callable/index.js"}],"node_modules/warning/warning.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var __DEV__ = "development" !== 'production';

var warning = function () {};

if (__DEV__) {
  var printWarning = function printWarning(format, args) {
    var len = arguments.length;
    args = new Array(len > 1 ? len - 1 : 0);

    for (var key = 1; key < len; key++) {
      args[key - 1] = arguments[key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);

    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }

    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (!condition) {
      printWarning.apply(null, [format].concat(args));
    }
  };
}

module.exports = warning;
},{}],"node_modules/function-bind/implementation.js":[function(require,module,exports) {
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],"node_modules/function-bind/index.js":[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":"node_modules/function-bind/implementation.js"}],"node_modules/has/src/index.js":[function(require,module,exports) {
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
},{"function-bind":"node_modules/function-bind/index.js"}],"node_modules/has-symbols/shams.js":[function(require,module,exports) {
'use strict';
/* eslint complexity: [2, 18], max-statements: [2, 33] */

module.exports = function hasSymbols() {
  if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
    return false;
  }

  if (typeof Symbol.iterator === 'symbol') {
    return true;
  }

  var obj = {};
  var sym = Symbol('test');
  var symObj = Object(sym);

  if (typeof sym === 'string') {
    return false;
  }

  if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
    return false;
  }

  if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
    return false;
  } // temp disabled per https://github.com/ljharb/object.assign/issues/17
  // if (sym instanceof Symbol) { return false; }
  // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
  // if (!(symObj instanceof Symbol)) { return false; }
  // if (typeof Symbol.prototype.toString !== 'function') { return false; }
  // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }


  var symVal = 42;
  obj[sym] = symVal;

  for (sym in obj) {
    return false;
  } // eslint-disable-line no-restricted-syntax


  if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
    return false;
  }

  if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }

  var syms = Object.getOwnPropertySymbols(obj);

  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }

  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }

  if (typeof Object.getOwnPropertyDescriptor === 'function') {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);

    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }

  return true;
};
},{}],"node_modules/has-symbols/index.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var origSymbol = global.Symbol;

var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
  if (typeof origSymbol !== 'function') {
    return false;
  }

  if (typeof Symbol !== 'function') {
    return false;
  }

  if (typeof origSymbol('foo') !== 'symbol') {
    return false;
  }

  if (typeof Symbol('bar') !== 'symbol') {
    return false;
  }

  return hasSymbolSham();
};
},{"./shams":"node_modules/has-symbols/shams.js"}],"node_modules/get-intrinsic/index.js":[function(require,module,exports) {
'use strict';

/* globals
	AggregateError,
	Atomics,
	FinalizationRegistry,
	SharedArrayBuffer,
	WeakRef,
*/

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		// eslint-disable-next-line no-new-func
		return Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var asyncGenFunction = getEvalledConstructor('async function* () {}');
var asyncGenFunctionPrototype = asyncGenFunction ? asyncGenFunction.prototype : undefined;
var asyncGenPrototype = asyncGenFunctionPrototype ? asyncGenFunctionPrototype.prototype : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': getEvalledConstructor('async function () {}'),
	'%AsyncGenerator%': asyncGenFunctionPrototype,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncIteratorPrototype%': asyncGenPrototype ? getProto(asyncGenPrototype) : undefined,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': getEvalledConstructor('function* () {}'),
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"has-symbols":"node_modules/has-symbols/index.js","function-bind":"node_modules/function-bind/index.js","has":"node_modules/has/src/index.js"}],"node_modules/call-bind/index.js":[function(require,module,exports) {
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":"node_modules/function-bind/index.js","get-intrinsic":"node_modules/get-intrinsic/index.js"}],"node_modules/object-keys/isArguments.js":[function(require,module,exports) {
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
  var str = toStr.call(value);
  var isArgs = str === '[object Arguments]';

  if (!isArgs) {
    isArgs = str !== '[object Array]' && value !== null && typeof value === 'object' && typeof value.length === 'number' && value.length >= 0 && toStr.call(value.callee) === '[object Function]';
  }

  return isArgs;
};
},{}],"node_modules/object-keys/implementation.js":[function(require,module,exports) {
'use strict';

var keysShim;

if (!Object.keys) {
  // modified from https://github.com/es-shims/es5-shim
  var has = Object.prototype.hasOwnProperty;
  var toStr = Object.prototype.toString;

  var isArgs = require('./isArguments'); // eslint-disable-line global-require


  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var hasDontEnumBug = !isEnumerable.call({
    toString: null
  }, 'toString');
  var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
  var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];

  var equalsConstructorPrototype = function (o) {
    var ctor = o.constructor;
    return ctor && ctor.prototype === o;
  };

  var excludedKeys = {
    $applicationCache: true,
    $console: true,
    $external: true,
    $frame: true,
    $frameElement: true,
    $frames: true,
    $innerHeight: true,
    $innerWidth: true,
    $onmozfullscreenchange: true,
    $onmozfullscreenerror: true,
    $outerHeight: true,
    $outerWidth: true,
    $pageXOffset: true,
    $pageYOffset: true,
    $parent: true,
    $scrollLeft: true,
    $scrollTop: true,
    $scrollX: true,
    $scrollY: true,
    $self: true,
    $webkitIndexedDB: true,
    $webkitStorageInfo: true,
    $window: true
  };

  var hasAutomationEqualityBug = function () {
    /* global window */
    if (typeof window === 'undefined') {
      return false;
    }

    for (var k in window) {
      try {
        if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
          try {
            equalsConstructorPrototype(window[k]);
          } catch (e) {
            return true;
          }
        }
      } catch (e) {
        return true;
      }
    }

    return false;
  }();

  var equalsConstructorPrototypeIfNotBuggy = function (o) {
    /* global window */
    if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
      return equalsConstructorPrototype(o);
    }

    try {
      return equalsConstructorPrototype(o);
    } catch (e) {
      return false;
    }
  };

  keysShim = function keys(object) {
    var isObject = object !== null && typeof object === 'object';
    var isFunction = toStr.call(object) === '[object Function]';
    var isArguments = isArgs(object);
    var isString = isObject && toStr.call(object) === '[object String]';
    var theKeys = [];

    if (!isObject && !isFunction && !isArguments) {
      throw new TypeError('Object.keys called on a non-object');
    }

    var skipProto = hasProtoEnumBug && isFunction;

    if (isString && object.length > 0 && !has.call(object, 0)) {
      for (var i = 0; i < object.length; ++i) {
        theKeys.push(String(i));
      }
    }

    if (isArguments && object.length > 0) {
      for (var j = 0; j < object.length; ++j) {
        theKeys.push(String(j));
      }
    } else {
      for (var name in object) {
        if (!(skipProto && name === 'prototype') && has.call(object, name)) {
          theKeys.push(String(name));
        }
      }
    }

    if (hasDontEnumBug) {
      var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

      for (var k = 0; k < dontEnums.length; ++k) {
        if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
          theKeys.push(dontEnums[k]);
        }
      }
    }

    return theKeys;
  };
}

module.exports = keysShim;
},{"./isArguments":"node_modules/object-keys/isArguments.js"}],"node_modules/object-keys/index.js":[function(require,module,exports) {
'use strict';

var slice = Array.prototype.slice;

var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) {
  return origKeys(o);
} : require('./implementation');
var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
  if (Object.keys) {
    var keysWorksWithArguments = function () {
      // Safari 5.0 bug
      var args = Object.keys(arguments);
      return args && args.length === arguments.length;
    }(1, 2);

    if (!keysWorksWithArguments) {
      Object.keys = function keys(object) {
        // eslint-disable-line func-name-matching
        if (isArgs(object)) {
          return originalKeys(slice.call(object));
        }

        return originalKeys(object);
      };
    }
  } else {
    Object.keys = keysShim;
  }

  return Object.keys || keysShim;
};

module.exports = keysShim;
},{"./isArguments":"node_modules/object-keys/isArguments.js","./implementation":"node_modules/object-keys/implementation.js"}],"node_modules/define-properties/index.js":[function(require,module,exports) {
'use strict';

var keys = require('object-keys');

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';
var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
  return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
  var obj = {};

  try {
    origDefineProperty(obj, 'x', {
      enumerable: false,
      value: obj
    }); // eslint-disable-next-line no-unused-vars, no-restricted-syntax

    for (var _ in obj) {
      // jscs:ignore disallowUnusedVariables
      return false;
    }

    return obj.x === obj;
  } catch (e) {
    /* this is IE 8. */
    return false;
  }
};

var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
  if (name in object && (!isFunction(predicate) || !predicate())) {
    return;
  }

  if (supportsDescriptors) {
    origDefineProperty(object, name, {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    });
  } else {
    object[name] = value;
  }
};

var defineProperties = function (object, map) {
  var predicates = arguments.length > 2 ? arguments[2] : {};
  var props = keys(map);

  if (hasSymbols) {
    props = concat.call(props, Object.getOwnPropertySymbols(map));
  }

  for (var i = 0; i < props.length; i += 1) {
    defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
  }
};

defineProperties.supportsDescriptors = !!supportsDescriptors;
module.exports = defineProperties;
},{"object-keys":"node_modules/object-keys/index.js"}],"node_modules/es-abstract/GetIntrinsic.js":[function(require,module,exports) {
'use strict';
/* globals
	AggregateError,
	Atomics,
	FinalizationRegistry,
	SharedArrayBuffer,
	WeakRef,
*/

var undefined;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError; // eslint-disable-next-line consistent-return

var getEvalledConstructor = function (expressionSyntax) {
  try {
    // eslint-disable-next-line no-new-func
    return Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
  } catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;

if ($gOPD) {
  try {
    $gOPD({}, '');
  } catch (e) {
    $gOPD = null; // this is IE 8, which has a broken gOPD
  }
}

var throwTypeError = function () {
  throw new $TypeError();
};

var ThrowTypeError = $gOPD ? function () {
  try {
    // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
    arguments.callee; // IE 8 does not throw here

    return throwTypeError;
  } catch (calleeThrows) {
    try {
      // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
      return $gOPD(arguments, 'callee').get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) {
  return x.__proto__;
}; // eslint-disable-line no-proto


var asyncGenFunction = getEvalledConstructor('async function* () {}');
var asyncGenFunctionPrototype = asyncGenFunction ? asyncGenFunction.prototype : undefined;
var asyncGenPrototype = asyncGenFunctionPrototype ? asyncGenFunctionPrototype.prototype : undefined;
var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);
var INTRINSICS = {
  '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
  '%Array%': Array,
  '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
  '%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
  '%AsyncFromSyncIteratorPrototype%': undefined,
  '%AsyncFunction%': getEvalledConstructor('async function () {}'),
  '%AsyncGenerator%': asyncGenFunctionPrototype,
  '%AsyncGeneratorFunction%': asyncGenFunction,
  '%AsyncIteratorPrototype%': asyncGenPrototype ? getProto(asyncGenPrototype) : undefined,
  '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
  '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
  '%Boolean%': Boolean,
  '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
  '%Date%': Date,
  '%decodeURI%': decodeURI,
  '%decodeURIComponent%': decodeURIComponent,
  '%encodeURI%': encodeURI,
  '%encodeURIComponent%': encodeURIComponent,
  '%Error%': Error,
  '%eval%': eval,
  // eslint-disable-line no-eval
  '%EvalError%': EvalError,
  '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
  '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
  '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
  '%Function%': $Function,
  '%GeneratorFunction%': getEvalledConstructor('function* () {}'),
  '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
  '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
  '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
  '%isFinite%': isFinite,
  '%isNaN%': isNaN,
  '%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
  '%JSON%': typeof JSON === 'object' ? JSON : undefined,
  '%Map%': typeof Map === 'undefined' ? undefined : Map,
  '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
  '%Math%': Math,
  '%Number%': Number,
  '%Object%': Object,
  '%parseFloat%': parseFloat,
  '%parseInt%': parseInt,
  '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
  '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
  '%RangeError%': RangeError,
  '%ReferenceError%': ReferenceError,
  '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
  '%RegExp%': RegExp,
  '%Set%': typeof Set === 'undefined' ? undefined : Set,
  '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
  '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
  '%String%': String,
  '%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
  '%Symbol%': hasSymbols ? Symbol : undefined,
  '%SyntaxError%': $SyntaxError,
  '%ThrowTypeError%': ThrowTypeError,
  '%TypedArray%': TypedArray,
  '%TypeError%': $TypeError,
  '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
  '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
  '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
  '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
  '%URIError%': URIError,
  '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
  '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
  '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};
var LEGACY_ALIASES = {
  '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
  '%ArrayPrototype%': ['Array', 'prototype'],
  '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
  '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
  '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
  '%ArrayProto_values%': ['Array', 'prototype', 'values'],
  '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
  '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
  '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
  '%BooleanPrototype%': ['Boolean', 'prototype'],
  '%DataViewPrototype%': ['DataView', 'prototype'],
  '%DatePrototype%': ['Date', 'prototype'],
  '%ErrorPrototype%': ['Error', 'prototype'],
  '%EvalErrorPrototype%': ['EvalError', 'prototype'],
  '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
  '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
  '%FunctionPrototype%': ['Function', 'prototype'],
  '%Generator%': ['GeneratorFunction', 'prototype'],
  '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
  '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
  '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
  '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
  '%JSONParse%': ['JSON', 'parse'],
  '%JSONStringify%': ['JSON', 'stringify'],
  '%MapPrototype%': ['Map', 'prototype'],
  '%NumberPrototype%': ['Number', 'prototype'],
  '%ObjectPrototype%': ['Object', 'prototype'],
  '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
  '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
  '%PromisePrototype%': ['Promise', 'prototype'],
  '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
  '%Promise_all%': ['Promise', 'all'],
  '%Promise_reject%': ['Promise', 'reject'],
  '%Promise_resolve%': ['Promise', 'resolve'],
  '%RangeErrorPrototype%': ['RangeError', 'prototype'],
  '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
  '%RegExpPrototype%': ['RegExp', 'prototype'],
  '%SetPrototype%': ['Set', 'prototype'],
  '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
  '%StringPrototype%': ['String', 'prototype'],
  '%SymbolPrototype%': ['Symbol', 'prototype'],
  '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
  '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
  '%TypeErrorPrototype%': ['TypeError', 'prototype'],
  '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
  '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
  '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
  '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
  '%URIErrorPrototype%': ['URIError', 'prototype'],
  '%WeakMapPrototype%': ['WeakMap', 'prototype'],
  '%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');

var hasOwn = require('has');

var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */

var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
/** Used to match backslashes in property paths. */

var stringToPath = function stringToPath(string) {
  var result = [];
  $replace(string, rePropName, function (match, number, quote, subString) {
    result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
  });
  return result;
};
/* end adaptation */


var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
  var intrinsicName = name;
  var alias;

  if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = '%' + alias[0] + '%';
  }

  if (hasOwn(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];

    if (typeof value === 'undefined' && !allowMissing) {
      throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
    }

    return {
      alias: alias,
      name: intrinsicName,
      value: value
    };
  }

  throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new $TypeError('intrinsic name must be a non-empty string');
  }

  if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
    throw new $TypeError('"allowMissing" argument must be a boolean');
  }

  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
  var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;

  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat([0, 1], alias));
  }

  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];

    if (part === 'constructor' || !isOwn) {
      skipFurtherCaching = true;
    }

    intrinsicBaseName += '.' + part;
    intrinsicRealName = '%' + intrinsicBaseName + '%';

    if (hasOwn(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;

        if (!allowMissing && !(part in value)) {
          throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
        } // By convention, when a data property is converted to an accessor
        // property to emulate a data property that does not suffer from
        // the override mistake, that accessor's getter is marked with
        // an `originalValue` property. Here, when we detect this, we
        // uphold the illusion by pretending to see that original data
        // property, i.e., returning the value rather than the getter
        // itself.


        if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn(value, part);
        value = value[part];
      }

      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }

  return value;
};
},{"has-symbols":"node_modules/has-symbols/index.js","function-bind":"node_modules/function-bind/index.js","has":"node_modules/has/src/index.js"}],"node_modules/es-abstract/5/CheckObjectCoercible.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $TypeError = GetIntrinsic('%TypeError%'); // http://www.ecma-international.org/ecma-262/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
  if (value == null) {
    throw new $TypeError(optMessage || 'Cannot call method on ' + value);
  }

  return value;
};
},{"../GetIntrinsic":"node_modules/es-abstract/GetIntrinsic.js"}],"node_modules/es-abstract/2020/RequireObjectCoercible.js":[function(require,module,exports) {
'use strict';

module.exports = require('../5/CheckObjectCoercible');
},{"../5/CheckObjectCoercible":"node_modules/es-abstract/5/CheckObjectCoercible.js"}],"node_modules/es-abstract/2020/ToString.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('../GetIntrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%'); // https://www.ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function ToString(argument) {
  if (typeof argument === 'symbol') {
    throw new $TypeError('Cannot convert a Symbol value to a string');
  }

  return $String(argument);
};
},{"../GetIntrinsic":"node_modules/es-abstract/GetIntrinsic.js"}],"node_modules/call-bind/callBound.js":[function(require,module,exports) {
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"get-intrinsic":"node_modules/get-intrinsic/index.js","./":"node_modules/call-bind/index.js"}],"node_modules/string.prototype.trim/implementation.js":[function(require,module,exports) {
'use strict';

var RequireObjectCoercible = require('es-abstract/2020/RequireObjectCoercible');

var ToString = require('es-abstract/2020/ToString');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');
/* eslint-disable no-control-regex */

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
/* eslint-enable no-control-regex */

module.exports = function trim() {
  var S = ToString(RequireObjectCoercible(this));
  return $replace($replace(S, leftWhitespace, ''), rightWhitespace, '');
};
},{"es-abstract/2020/RequireObjectCoercible":"node_modules/es-abstract/2020/RequireObjectCoercible.js","es-abstract/2020/ToString":"node_modules/es-abstract/2020/ToString.js","call-bind/callBound":"node_modules/call-bind/callBound.js"}],"node_modules/string.prototype.trim/polyfill.js":[function(require,module,exports) {
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
  if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
    return String.prototype.trim;
  }

  return implementation;
};
},{"./implementation":"node_modules/string.prototype.trim/implementation.js"}],"node_modules/string.prototype.trim/shim.js":[function(require,module,exports) {

'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
  var polyfill = getPolyfill();
  define(String.prototype, {
    trim: polyfill
  }, {
    trim: function testTrim() {
      return String.prototype.trim !== polyfill;
    }
  });
  return polyfill;
};
},{"define-properties":"node_modules/define-properties/index.js","./polyfill":"node_modules/string.prototype.trim/polyfill.js"}],"node_modules/string.prototype.trim/index.js":[function(require,module,exports) {

'use strict';

var callBind = require('call-bind');

var define = require('define-properties');

var implementation = require('./implementation');

var getPolyfill = require('./polyfill');

var shim = require('./shim');

var boundTrim = callBind(getPolyfill());
define(boundTrim, {
  getPolyfill: getPolyfill,
  implementation: implementation,
  shim: shim
});
module.exports = boundTrim;
},{"call-bind":"node_modules/call-bind/index.js","define-properties":"node_modules/define-properties/index.js","./implementation":"node_modules/string.prototype.trim/implementation.js","./polyfill":"node_modules/string.prototype.trim/polyfill.js","./shim":"node_modules/string.prototype.trim/shim.js"}],"node_modules/node-polyglot/index.js":[function(require,module,exports) {
//     (c) 2012-2018 Airbnb, Inc.
//
//     polyglot.js may be freely distributed under the terms of the BSD
//     license. For all licensing information, details, and documention:
//     http://airbnb.github.com/polyglot.js
//
//
// Polyglot.js is an I18n helper library written in JavaScript, made to
// work both in the browser and in Node. It provides a simple solution for
// interpolation and pluralization, based off of Airbnb's
// experience adding I18n functionality to its Backbone.js and Node apps.
//
// Polylglot is agnostic to your translation backend. It doesn't perform any
// translation; it simply gives you a way to manage translated phrases from
// your client- or server-side JavaScript application.
//

'use strict';

var forEach = require('for-each');
var warning = require('warning');
var has = require('has');
var trim = require('string.prototype.trim');

var warn = function warn(message) {
  warning(false, message);
};

var replace = String.prototype.replace;
var split = String.prototype.split;

// #### Pluralization methods
// The string that separates the different phrase possibilities.
var delimiter = '||||';

var russianPluralGroups = function (n) {
  var lastTwo = n % 100;
  var end = lastTwo % 10;
  if (lastTwo !== 11 && end === 1) {
    return 0;
  }
  if (2 <= end && end <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
    return 1;
  }
  return 2;
};

var defaultPluralRules = {
  // Mapping from pluralization group plural logic.
  pluralTypes: {
    arabic: function (n) {
      // http://www.arabeyes.org/Plural_Forms
      if (n < 3) { return n; }
      var lastTwo = n % 100;
      if (lastTwo >= 3 && lastTwo <= 10) return 3;
      return lastTwo >= 11 ? 4 : 5;
    },
    bosnian_serbian: russianPluralGroups,
    chinese: function () { return 0; },
    croatian: russianPluralGroups,
    french: function (n) { return n > 1 ? 1 : 0; },
    german: function (n) { return n !== 1 ? 1 : 0; },
    russian: russianPluralGroups,
    lithuanian: function (n) {
      if (n % 10 === 1 && n % 100 !== 11) { return 0; }
      return n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19) ? 1 : 2;
    },
    czech: function (n) {
      if (n === 1) { return 0; }
      return (n >= 2 && n <= 4) ? 1 : 2;
    },
    polish: function (n) {
      if (n === 1) { return 0; }
      var end = n % 10;
      return 2 <= end && end <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
    },
    icelandic: function (n) { return (n % 10 !== 1 || n % 100 === 11) ? 1 : 0; },
    slovenian: function (n) {
      var lastTwo = n % 100;
      if (lastTwo === 1) {
        return 0;
      }
      if (lastTwo === 2) {
        return 1;
      }
      if (lastTwo === 3 || lastTwo === 4) {
        return 2;
      }
      return 3;
    }
  },

  // Mapping from pluralization group to individual language codes/locales.
  // Will look up based on exact match, if not found and it's a locale will parse the locale
  // for language code, and if that does not exist will default to 'en'
  pluralTypeToLanguages: {
    arabic: ['ar'],
    bosnian_serbian: ['bs-Latn-BA', 'bs-Cyrl-BA', 'srl-RS', 'sr-RS'],
    chinese: ['id', 'id-ID', 'ja', 'ko', 'ko-KR', 'lo', 'ms', 'th', 'th-TH', 'zh'],
    croatian: ['hr', 'hr-HR'],
    german: ['fa', 'da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hi-IN', 'hu', 'hu-HU', 'it', 'nl', 'no', 'pt', 'sv', 'tr'],
    french: ['fr', 'tl', 'pt-br'],
    russian: ['ru', 'ru-RU'],
    lithuanian: ['lt'],
    czech: ['cs', 'cs-CZ', 'sk'],
    polish: ['pl'],
    icelandic: ['is'],
    slovenian: ['sl-SL']
  }
};

function langToTypeMap(mapping) {
  var ret = {};
  forEach(mapping, function (langs, type) {
    forEach(langs, function (lang) {
      ret[lang] = type;
    });
  });
  return ret;
}

function pluralTypeName(pluralRules, locale) {
  var langToPluralType = langToTypeMap(pluralRules.pluralTypeToLanguages);
  return langToPluralType[locale]
    || langToPluralType[split.call(locale, /-/, 1)[0]]
    || langToPluralType.en;
}

function pluralTypeIndex(pluralRules, locale, count) {
  return pluralRules.pluralTypes[pluralTypeName(pluralRules, locale)](count);
}

function escape(token) {
  return token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function constructTokenRegex(opts) {
  var prefix = (opts && opts.prefix) || '%{';
  var suffix = (opts && opts.suffix) || '}';

  if (prefix === delimiter || suffix === delimiter) {
    throw new RangeError('"' + delimiter + '" token is reserved for pluralization');
  }

  return new RegExp(escape(prefix) + '(.*?)' + escape(suffix), 'g');
}

var defaultTokenRegex = /%\{(.*?)\}/g;

// ### transformPhrase(phrase, substitutions, locale)
//
// Takes a phrase string and transforms it by choosing the correct
// plural form and interpolating it.
//
//     transformPhrase('Hello, %{name}!', {name: 'Spike'});
//     // "Hello, Spike!"
//
// The correct plural form is selected if substitutions.smart_count
// is set. You can pass in a number instead of an Object as `substitutions`
// as a shortcut for `smart_count`.
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 1}, 'en');
//     // "1 new message"
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', {smart_count: 2}, 'en');
//     // "2 new messages"
//
//     transformPhrase('%{smart_count} new messages |||| 1 new message', 5, 'en');
//     // "5 new messages"
//
// You should pass in a third argument, the locale, to specify the correct plural type.
// It defaults to `'en'` with 2 plural forms.
function transformPhrase(phrase, substitutions, locale, tokenRegex, pluralRules) {
  if (typeof phrase !== 'string') {
    throw new TypeError('Polyglot.transformPhrase expects argument #1 to be string');
  }

  if (substitutions == null) {
    return phrase;
  }

  var result = phrase;
  var interpolationRegex = tokenRegex || defaultTokenRegex;
  var pluralRulesOrDefault = pluralRules || defaultPluralRules;

  // allow number as a pluralization shortcut
  var options = typeof substitutions === 'number' ? { smart_count: substitutions } : substitutions;

  // Select plural form: based on a phrase text that contains `n`
  // plural forms separated by `delimiter`, a `locale`, and a `substitutions.smart_count`,
  // choose the correct plural form. This is only done if `count` is set.
  if (options.smart_count != null && result) {
    var texts = split.call(result, delimiter);
    result = trim(texts[pluralTypeIndex(pluralRulesOrDefault, locale || 'en', options.smart_count)] || texts[0]);
  }

  // Interpolate: Creates a `RegExp` object for each interpolation placeholder.
  result = replace.call(result, interpolationRegex, function (expression, argument) {
    if (!has(options, argument) || options[argument] == null) { return expression; }
    return options[argument];
  });

  return result;
}

// ### Polyglot class constructor
function Polyglot(options) {
  var opts = options || {};
  this.phrases = {};
  this.extend(opts.phrases || {});
  this.currentLocale = opts.locale || 'en';
  var allowMissing = opts.allowMissing ? transformPhrase : null;
  this.onMissingKey = typeof opts.onMissingKey === 'function' ? opts.onMissingKey : allowMissing;
  this.warn = opts.warn || warn;
  this.tokenRegex = constructTokenRegex(opts.interpolation);
  this.pluralRules = opts.pluralRules || defaultPluralRules;
}

// ### polyglot.locale([locale])
//
// Get or set locale. Internally, Polyglot only uses locale for pluralization.
Polyglot.prototype.locale = function (newLocale) {
  if (newLocale) this.currentLocale = newLocale;
  return this.currentLocale;
};

// ### polyglot.extend(phrases)
//
// Use `extend` to tell Polyglot how to translate a given key.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The key can be any string.  Feel free to call `extend` multiple times;
// it will override any phrases with the same key, but leave existing phrases
// untouched.
//
// It is also possible to pass nested phrase objects, which get flattened
// into an object with the nested keys concatenated using dot notation.
//
//     polyglot.extend({
//       "nav": {
//         "hello": "Hello",
//         "hello_name": "Hello, %{name}",
//         "sidebar": {
//           "welcome": "Welcome"
//         }
//       }
//     });
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}',
//     //   'nav.sidebar.welcome': 'Welcome'
//     // }
//
// `extend` accepts an optional second argument, `prefix`, which can be used
// to prefix every key in the phrases object with some string, using dot
// notation.
//
//     polyglot.extend({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     }, "nav");
//
//     console.log(polyglot.phrases);
//     // {
//     //   'nav.hello': 'Hello',
//     //   'nav.hello_name': 'Hello, %{name}'
//     // }
//
// This feature is used internally to support nested phrase objects.
Polyglot.prototype.extend = function (morePhrases, prefix) {
  forEach(morePhrases, function (phrase, key) {
    var prefixedKey = prefix ? prefix + '.' + key : key;
    if (typeof phrase === 'object') {
      this.extend(phrase, prefixedKey);
    } else {
      this.phrases[prefixedKey] = phrase;
    }
  }, this);
};

// ### polyglot.unset(phrases)
// Use `unset` to selectively remove keys from a polyglot instance.
//
//     polyglot.unset("some_key");
//     polyglot.unset({
//       "hello": "Hello",
//       "hello_name": "Hello, %{name}"
//     });
//
// The unset method can take either a string (for the key), or an object hash with
// the keys that you would like to unset.
Polyglot.prototype.unset = function (morePhrases, prefix) {
  if (typeof morePhrases === 'string') {
    delete this.phrases[morePhrases];
  } else {
    forEach(morePhrases, function (phrase, key) {
      var prefixedKey = prefix ? prefix + '.' + key : key;
      if (typeof phrase === 'object') {
        this.unset(phrase, prefixedKey);
      } else {
        delete this.phrases[prefixedKey];
      }
    }, this);
  }
};

// ### polyglot.clear()
//
// Clears all phrases. Useful for special cases, such as freeing
// up memory if you have lots of phrases but no longer need to
// perform any translation. Also used internally by `replace`.
Polyglot.prototype.clear = function () {
  this.phrases = {};
};

// ### polyglot.replace(phrases)
//
// Completely replace the existing phrases with a new set of phrases.
// Normally, just use `extend` to add more phrases, but under certain
// circumstances, you may want to make sure no old phrases are lying around.
Polyglot.prototype.replace = function (newPhrases) {
  this.clear();
  this.extend(newPhrases);
};


// ### polyglot.t(key, options)
//
// The most-used method. Provide a key, and `t` will return the
// phrase.
//
//     polyglot.t("hello");
//     => "Hello"
//
// The phrase value is provided first by a call to `polyglot.extend()` or
// `polyglot.replace()`.
//
// Pass in an object as the second argument to perform interpolation.
//
//     polyglot.t("hello_name", {name: "Spike"});
//     => "Hello, Spike"
//
// If you like, you can provide a default value in case the phrase is missing.
// Use the special option key "_" to specify a default.
//
//     polyglot.t("i_like_to_write_in_language", {
//       _: "I like to write in %{language}.",
//       language: "JavaScript"
//     });
//     => "I like to write in JavaScript."
//
Polyglot.prototype.t = function (key, options) {
  var phrase, result;
  var opts = options == null ? {} : options;
  if (typeof this.phrases[key] === 'string') {
    phrase = this.phrases[key];
  } else if (typeof opts._ === 'string') {
    phrase = opts._;
  } else if (this.onMissingKey) {
    var onMissingKey = this.onMissingKey;
    result = onMissingKey(key, opts, this.currentLocale, this.tokenRegex, this.pluralRules);
  } else {
    this.warn('Missing translation for key: "' + key + '"');
    result = key;
  }
  if (typeof phrase === 'string') {
    result = transformPhrase(phrase, opts, this.currentLocale, this.tokenRegex, this.pluralRules);
  }
  return result;
};


// ### polyglot.has(key)
//
// Check if polyglot has a translation for given key
Polyglot.prototype.has = function (key) {
  return has(this.phrases, key);
};

// export transformPhrase
Polyglot.transformPhrase = function transform(phrase, substitutions, locale) {
  return transformPhrase(phrase, substitutions, locale);
};

module.exports = Polyglot;

},{"for-each":"node_modules/for-each/index.js","warning":"node_modules/warning/warning.js","has":"node_modules/has/src/index.js","string.prototype.trim":"node_modules/string.prototype.trim/index.js"}],"translation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodePolyglot = _interopRequireDefault(require("node-polyglot"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TranslationApp = /*#__PURE__*/function () {
  function TranslationApp() {
    _classCallCheck(this, TranslationApp);

    this.polyglot = new _nodePolyglot.default();
    this.currentLocale = localStorage.getItem("locale" || "ja");
    this.updateLocale = this.updateLocale.bind(this);
  }

  _createClass(TranslationApp, [{
    key: "setup",
    value: function setup() {
      if (this.currentLocale === "ja") {
        this.polyglot.extend({
          "otsukare": "今日もお疲れ様でした",
          "otsukare_p": "\u88CF\u8D64\u7FBD\u3067\u4ECA\u65E5\u306F\u4E00\u676F\u3001\u3044\u304B\u304C\u3067\u3059\u304B\uFF1F",
          "corona1": "新型コロナ[COVID-19]への対策について",
          "corona_mask": "\u30DE\u30B9\u30AF\u30FB\u30D5\u30A7\u30A4\u30B9\u30AC\u30FC\u30C9\u7740\u7528\u306E\u5FB9\u5E95",
          "corona_space": "客席間隔1メートルの確保",
          "corona_air": "店内における定期的な換気",
          "corona_clean": "定期的な店内設備の除菌徹底",
          "youkoso_h2": "裏赤羽の隠れ家へようこそ",
          "youkoso_one": "赤羽にどんなイメージをお持ちでしょうか？",
          "youkoso_two": "赤羽のお店は一人では入りにくい・・そんな経験のある方も多いと思います。",
          "youkoso_three": "当店は赤羽の喧騒から少し離れた場所にある、赤羽らしくも落ち着いたお店です。",
          "youkoso_four": "どこか懐かしく、ここでしか味わえない料理をおもてなし致します。",
          "osusume": "びっきぃのおすすめ",
          "recommend1": "びっきぃ名物 赤手羽揚げ",
          "recommend1_detail": "みりん、砂糖を一切使わず、醤油と厳選した調味料で5時間漬け込んだ絶品手羽揚げです。",
          "recommend2": "自家製ピクルス",
          "recommend2_detail": "お代わり続出！さわやかな自家製のピクルスです。",
          "menu_link": "その他のメニューはこちらから",
          "information": "店舗情報",
          "photo_detail": "内観:カウンター8席 / 掘り炬燵のお座敷7席（4席、3席）",
          "movie": "Youtubeでも紹介されました！",
          "footer_name1": "■店名: ",
          "footer_name2": "食楽びっきぃ",
          "footer_address1": "■住所:",
          "footer_address2": "東京都北区赤羽1-42-15",
          "footer_phone1": "■電話番号:",
          "footer_time1": "■営業時間:",
          "footer_time2": "[月-日] 17時-0時",
          "footer_card1": "■カード利用: ",
          "footer_card2": "可（VISA,Master,AMEX,JCB,Diners）",
          "home": "ホーム",
          "oshinagaki": "お品書き",
          "tempo": "店舗情報"
        });
      } else {
        this.polyglot.extend({
          "otsukare": "Hi, Welcome to Bikki",
          "otsukare_p": "we are a small Isakaya in Akabane, Tokyo",
          "corona1": "Measures against COVID-19",
          "corona_mask": " Wear Mask or Face-guard",
          "corona_space": "Create Social Distance",
          "corona_air": "Exchange Air Frequently",
          "corona_clean": "Clean Equipments Frequently",
          "youkoso_h2": "What is Bikki..?",
          "youkoso_one": "Have you ever been to Akabane?",
          "youkoso_two": "You might think that it is awkward to enter Izakaya in Akabane.",
          "youkoso_three": "We are located a little bit away from Akabane main road",
          "youkoso_four": "We are going to welcome you with warm service and Japanese style food!",
          "osusume": "Bikki's Recommendation",
          "recommend1": "Red Chicken Wings",
          "recommend1_detail": "Marinated with Special Soysource for more than 5 hours without Mirin and Sugar.",
          "recommend2": "Handmade Pickles",
          "recommend2_detail": "Handmade Pickles! one of our popular menus. you can enjoy fresh taste of local vegitable",
          "menu_link": "Other menu",
          "information": "Information",
          "photo_detail": " 8 Counter Seats / 7 Japanese Style Tatami Seats(No chair)",
          "movie": "We are introduced by Japanese Youtbe Channel",
          "footer_name1": "■Name: ",
          "footer_name2": "Bikki (Shokuraku Bikki)",
          "footer_address1": "■Address:",
          "footer_address2": "1-42-15 Akabane, Kita-ku, Tokyo",
          "footer_phone1": "■Phone Number:",
          "footer_time1": "■Open hour:",
          "footer_time2": "[Mon-Sun] 5PM-0AM",
          "footer_card1": "■Credit Card: ",
          "footer_card2": "OK（VISA,Master,AMEX,JCB,Diners）",
          "home": "TOP",
          "oshinagaki": "Menu",
          "tempo": "Information"
        });
      }
    }
  }, {
    key: "updateLocale",
    value: function updateLocale(e) {
      //ボタンにセットされたdata-localeを元に現在のlocaleを変更します。
      var clickedlocale = e.target.dataset.locale;
      localStorage.setItem("locale", clickedlocale);
      this.currentLocale = clickedlocale;
      console.log(this.currentLocale);
      this.showMessage();
    }
  }, {
    key: "showMessage",
    value: function showMessage() {
      this.setup();
      var text1 = document.getElementById('otsukare');
      text1.textContent = this.polyglot.t('otsukare');
      var text2 = document.getElementById('otsukare_p');
      text2.textContent = this.polyglot.t('otsukare_p');
      var text3 = document.getElementById('corona1');
      text3.textContent = this.polyglot.t('corona1');
      var text4 = document.getElementById('corona_mask');
      text4.textContent = this.polyglot.t("corona_mask");
      var text5 = document.getElementById('corona_space');
      text5.textContent = this.polyglot.t("corona_space");
      var text55 = document.getElementById('corona_air');
      text55.textContent = this.polyglot.t("corona_air");
      var text6 = document.getElementById('corona_clean');
      text6.textContent = this.polyglot.t('corona_clean');
      var text7 = document.getElementById('youkoso_h2');
      text7.textContent = this.polyglot.t('youkoso_h2');
      var text8 = document.getElementById('youkoso_one');
      text8.textContent = this.polyglot.t('youkoso_one');
      var text9 = document.getElementById('youkoso_two');
      text9.textContent = this.polyglot.t('youkoso_two');
      var text10 = document.getElementById('youkoso_three');
      text10.textContent = this.polyglot.t('youkoso_three');
      var text11 = document.getElementById('youkoso_four');
      text11.textContent = this.polyglot.t('youkoso_four');
      var text12 = document.getElementById('osusume');
      text12.textContent = this.polyglot.t('osusume');
      var text13 = document.getElementById('recommend1');
      text13.textContent = this.polyglot.t('recommend1');
      var text14 = document.getElementById('recommend1_detail');
      text14.textContent = this.polyglot.t('recommend1_detail');
      var text15 = document.getElementById('recommend2');
      text15.textContent = this.polyglot.t('recommend2');
      var text16 = document.getElementById('recommend2_detail');
      text16.textContent = this.polyglot.t('recommend2_detail');
      var text17 = document.getElementById('menu_link');
      text17.textContent = this.polyglot.t('menu_link');
      var text18 = document.getElementById('information');
      text18.textContent = this.polyglot.t('information');
      var text19 = document.getElementById('photo_detail');
      text19.textContent = this.polyglot.t('photo_detail');
      var text20 = document.getElementById('movie');
      text20.textContent = this.polyglot.t('movie');
      var text21 = document.getElementById('footer_name1');
      text21.textContent = this.polyglot.t('footer_name1');
      var text22 = document.getElementById('footer_name2');
      text22.textContent = this.polyglot.t('footer_name2');
      var text23 = document.getElementById('footer_address1');
      text23.textContent = this.polyglot.t('footer_address1');
      var text24 = document.getElementById('footer_address2');
      text24.textContent = this.polyglot.t('footer_address2');
      var text25 = document.getElementById('footer_phone1');
      text25.textContent = this.polyglot.t('footer_phone1');
      var text26 = document.getElementById('footer_time1');
      text26.textContent = this.polyglot.t('footer_time1');
      var text27 = document.getElementById('footer_time2');
      text27.textContent = this.polyglot.t('footer_time2');
      var text28 = document.getElementById('footer_card1');
      text28.textContent = this.polyglot.t('footer_card1');
      var text29 = document.getElementById('footer_card2');
      text29.textContent = this.polyglot.t('footer_card2');
      var text30 = document.getElementById('home');
      text30.textContent = this.polyglot.t('home');
      var text31 = document.getElementById('oshinagaki');
      text31.textContent = this.polyglot.t('oshinagaki');
      var text32 = document.getElementById('tempo');
      text32.textContent = this.polyglot.t('tempo');
    }
  }]);

  return TranslationApp;
}();

;
var _default = TranslationApp;
exports.default = _default;
},{"node-polyglot":"node_modules/node-polyglot/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _translation = _interopRequireDefault(require("./translation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

///////////////////  LP Animation  //////////////////
ScrollReveal({
  reset: true
}).reveal('.top-text', {
  delay: 200
});
ScrollReveal({
  reset: true
}).reveal('.corona-detail', {
  delay: 400
});
ScrollReveal({
  reset: true
}).reveal('.top-message-box', {
  delay: 200
});
ScrollReveal({
  reset: true
}).reveal('.foodmenu-title', {
  delay: 200
});
ScrollReveal({
  reset: true
}).reveal('.wrap', {
  delay: 200
}); /////////////  Multilingual Setting  //////////

{
  var app = new _translation.default();
  app.showMessage();
  var button1 = document.getElementById('button1');
  button1.addEventListener("click", app.updateLocale);
  var button2 = document.getElementById('button2');
  button2.addEventListener("click", app.updateLocale);
}
},{"./translation.js":"translation.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52410" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/tokyo_isakaya_website.e31bb0bc.js.map