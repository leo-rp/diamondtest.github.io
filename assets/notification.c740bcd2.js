import { c as computed, Z as defineStore, $ as Notify } from "./index.e6710fc9.js";
import { api } from "./axios.307908e9.js";
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props, $q) {
  return computed(() => props.dark === null ? $q.dark.isActive : props.dark);
}
function between(v, min, max) {
  return max <= min ? min : Math.min(max, Math.max(min, v));
}
function getAugmentedNamespace(n) {
  if (n.__esModule)
    return n;
  var a = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
const useAuthStore = defineStore("auth", {
  state: () => ({
    token: "",
    refreshToken: "",
    authenticated: false
  }),
  getters: {
    getUserToken: (state) => state.token,
    isAuthenticated: (state) => state.authenticated
  },
  actions: {
    setToken(token) {
      this.token = token;
      this.authenticated = true;
      this.setLocalToken();
    },
    deleteToken() {
      this.token = "";
      this.authenticated = false;
      this.deleteLocalToken();
    },
    setLocalToken() {
      localStorage.setItem("token", this.token);
    },
    getLocalToken() {
      const token = localStorage.getItem("token");
      return token === void 0 ? "" : token;
    },
    deleteLocalToken() {
      localStorage.removeItem("token");
    },
    checkToken() {
      if (this.token)
        return this.token;
      const token = this.getLocalToken();
      if (!token)
        return new Error("invalid token");
      this.setToken(token);
      this.loadSession();
    },
    loadSession() {
    }
  }
});
var shams = function hasSymbols() {
  if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
    return false;
  }
  if (typeof Symbol.iterator === "symbol") {
    return true;
  }
  var obj = {};
  var sym = Symbol("test");
  var symObj = Object(sym);
  if (typeof sym === "string") {
    return false;
  }
  if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
    return false;
  }
  if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
    return false;
  }
  var symVal = 42;
  obj[sym] = symVal;
  for (sym in obj) {
    return false;
  }
  if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
    return false;
  }
  if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
    return false;
  }
  var syms = Object.getOwnPropertySymbols(obj);
  if (syms.length !== 1 || syms[0] !== sym) {
    return false;
  }
  if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
    return false;
  }
  if (typeof Object.getOwnPropertyDescriptor === "function") {
    var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
    if (descriptor.value !== symVal || descriptor.enumerable !== true) {
      return false;
    }
  }
  return true;
};
var origSymbol = typeof Symbol !== "undefined" && Symbol;
var hasSymbolSham = shams;
var hasSymbols$1 = function hasNativeSymbols() {
  if (typeof origSymbol !== "function") {
    return false;
  }
  if (typeof Symbol !== "function") {
    return false;
  }
  if (typeof origSymbol("foo") !== "symbol") {
    return false;
  }
  if (typeof Symbol("bar") !== "symbol") {
    return false;
  }
  return hasSymbolSham();
};
var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
var slice = Array.prototype.slice;
var toStr$1 = Object.prototype.toString;
var funcType = "[object Function]";
var implementation$1 = function bind(that) {
  var target = this;
  if (typeof target !== "function" || toStr$1.call(target) !== funcType) {
    throw new TypeError(ERROR_MESSAGE + target);
  }
  var args = slice.call(arguments, 1);
  var bound;
  var binder = function() {
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
    boundArgs.push("$" + i);
  }
  bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder);
  if (target.prototype) {
    var Empty = function Empty2() {
    };
    Empty.prototype = target.prototype;
    bound.prototype = new Empty();
    Empty.prototype = null;
  }
  return bound;
};
var implementation = implementation$1;
var functionBind = Function.prototype.bind || implementation;
var bind$1 = functionBind;
var src = bind$1.call(Function.call, Object.prototype.hasOwnProperty);
var undefined$1;
var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$1 = TypeError;
var getEvalledConstructor = function(expressionSyntax) {
  try {
    return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
  } catch (e) {
  }
};
var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
  try {
    $gOPD({}, "");
  } catch (e) {
    $gOPD = null;
  }
}
var throwTypeError = function() {
  throw new $TypeError$1();
};
var ThrowTypeError = $gOPD ? function() {
  try {
    arguments.callee;
    return throwTypeError;
  } catch (calleeThrows) {
    try {
      return $gOPD(arguments, "callee").get;
    } catch (gOPDthrows) {
      return throwTypeError;
    }
  }
}() : throwTypeError;
var hasSymbols2 = hasSymbols$1();
var getProto = Object.getPrototypeOf || function(x) {
  return x.__proto__;
};
var needsEval = {};
var TypedArray = typeof Uint8Array === "undefined" ? undefined$1 : getProto(Uint8Array);
var INTRINSICS = {
  "%AggregateError%": typeof AggregateError === "undefined" ? undefined$1 : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined$1 : ArrayBuffer,
  "%ArrayIteratorPrototype%": hasSymbols2 ? getProto([][Symbol.iterator]()) : undefined$1,
  "%AsyncFromSyncIteratorPrototype%": undefined$1,
  "%AsyncFunction%": needsEval,
  "%AsyncGenerator%": needsEval,
  "%AsyncGeneratorFunction%": needsEval,
  "%AsyncIteratorPrototype%": needsEval,
  "%Atomics%": typeof Atomics === "undefined" ? undefined$1 : Atomics,
  "%BigInt%": typeof BigInt === "undefined" ? undefined$1 : BigInt,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView === "undefined" ? undefined$1 : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": Error,
  "%eval%": eval,
  "%EvalError%": EvalError,
  "%Float32Array%": typeof Float32Array === "undefined" ? undefined$1 : Float32Array,
  "%Float64Array%": typeof Float64Array === "undefined" ? undefined$1 : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined$1 : FinalizationRegistry,
  "%Function%": $Function,
  "%GeneratorFunction%": needsEval,
  "%Int8Array%": typeof Int8Array === "undefined" ? undefined$1 : Int8Array,
  "%Int16Array%": typeof Int16Array === "undefined" ? undefined$1 : Int16Array,
  "%Int32Array%": typeof Int32Array === "undefined" ? undefined$1 : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": hasSymbols2 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
  "%JSON%": typeof JSON === "object" ? JSON : undefined$1,
  "%Map%": typeof Map === "undefined" ? undefined$1 : Map,
  "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols2 ? undefined$1 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Object,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise === "undefined" ? undefined$1 : Promise,
  "%Proxy%": typeof Proxy === "undefined" ? undefined$1 : Proxy,
  "%RangeError%": RangeError,
  "%ReferenceError%": ReferenceError,
  "%Reflect%": typeof Reflect === "undefined" ? undefined$1 : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set === "undefined" ? undefined$1 : Set,
  "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols2 ? undefined$1 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined$1 : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": hasSymbols2 ? getProto(""[Symbol.iterator]()) : undefined$1,
  "%Symbol%": hasSymbols2 ? Symbol : undefined$1,
  "%SyntaxError%": $SyntaxError,
  "%ThrowTypeError%": ThrowTypeError,
  "%TypedArray%": TypedArray,
  "%TypeError%": $TypeError$1,
  "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined$1 : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined$1 : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined$1 : Uint16Array,
  "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined$1 : Uint32Array,
  "%URIError%": URIError,
  "%WeakMap%": typeof WeakMap === "undefined" ? undefined$1 : WeakMap,
  "%WeakRef%": typeof WeakRef === "undefined" ? undefined$1 : WeakRef,
  "%WeakSet%": typeof WeakSet === "undefined" ? undefined$1 : WeakSet
};
var doEval = function doEval2(name) {
  var value;
  if (name === "%AsyncFunction%") {
    value = getEvalledConstructor("async function () {}");
  } else if (name === "%GeneratorFunction%") {
    value = getEvalledConstructor("function* () {}");
  } else if (name === "%AsyncGeneratorFunction%") {
    value = getEvalledConstructor("async function* () {}");
  } else if (name === "%AsyncGenerator%") {
    var fn = doEval2("%AsyncGeneratorFunction%");
    if (fn) {
      value = fn.prototype;
    }
  } else if (name === "%AsyncIteratorPrototype%") {
    var gen = doEval2("%AsyncGenerator%");
    if (gen) {
      value = getProto(gen.prototype);
    }
  }
  INTRINSICS[name] = value;
  return value;
};
var LEGACY_ALIASES = {
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
};
var bind2 = functionBind;
var hasOwn$1 = src;
var $concat$1 = bind2.call(Function.call, Array.prototype.concat);
var $spliceApply = bind2.call(Function.apply, Array.prototype.splice);
var $replace$1 = bind2.call(Function.call, String.prototype.replace);
var $strSlice = bind2.call(Function.call, String.prototype.slice);
var $exec = bind2.call(Function.call, RegExp.prototype.exec);
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = function stringToPath2(string) {
  var first = $strSlice(string, 0, 1);
  var last = $strSlice(string, -1);
  if (first === "%" && last !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
  } else if (last === "%" && first !== "%") {
    throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
  }
  var result = [];
  $replace$1(string, rePropName, function(match, number, quote2, subString) {
    result[result.length] = quote2 ? $replace$1(subString, reEscapeChar, "$1") : number || match;
  });
  return result;
};
var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
  var intrinsicName = name;
  var alias;
  if (hasOwn$1(LEGACY_ALIASES, intrinsicName)) {
    alias = LEGACY_ALIASES[intrinsicName];
    intrinsicName = "%" + alias[0] + "%";
  }
  if (hasOwn$1(INTRINSICS, intrinsicName)) {
    var value = INTRINSICS[intrinsicName];
    if (value === needsEval) {
      value = doEval(intrinsicName);
    }
    if (typeof value === "undefined" && !allowMissing) {
      throw new $TypeError$1("intrinsic " + name + " exists, but is not available. Please file an issue!");
    }
    return {
      alias,
      name: intrinsicName,
      value
    };
  }
  throw new $SyntaxError("intrinsic " + name + " does not exist!");
};
var getIntrinsic = function GetIntrinsic(name, allowMissing) {
  if (typeof name !== "string" || name.length === 0) {
    throw new $TypeError$1("intrinsic name must be a non-empty string");
  }
  if (arguments.length > 1 && typeof allowMissing !== "boolean") {
    throw new $TypeError$1('"allowMissing" argument must be a boolean');
  }
  if ($exec(/^%?[^%]*%?$/g, name) === null) {
    throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  }
  var parts = stringToPath(name);
  var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
  var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
  var intrinsicRealName = intrinsic.name;
  var value = intrinsic.value;
  var skipFurtherCaching = false;
  var alias = intrinsic.alias;
  if (alias) {
    intrinsicBaseName = alias[0];
    $spliceApply(parts, $concat$1([0, 1], alias));
  }
  for (var i = 1, isOwn = true; i < parts.length; i += 1) {
    var part = parts[i];
    var first = $strSlice(part, 0, 1);
    var last = $strSlice(part, -1);
    if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
      throw new $SyntaxError("property names with quotes must have matching quotes");
    }
    if (part === "constructor" || !isOwn) {
      skipFurtherCaching = true;
    }
    intrinsicBaseName += "." + part;
    intrinsicRealName = "%" + intrinsicBaseName + "%";
    if (hasOwn$1(INTRINSICS, intrinsicRealName)) {
      value = INTRINSICS[intrinsicRealName];
    } else if (value != null) {
      if (!(part in value)) {
        if (!allowMissing) {
          throw new $TypeError$1("base intrinsic for " + name + " exists, but the property is not available.");
        }
        return void 0;
      }
      if ($gOPD && i + 1 >= parts.length) {
        var desc = $gOPD(value, part);
        isOwn = !!desc;
        if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
          value = desc.get;
        } else {
          value = value[part];
        }
      } else {
        isOwn = hasOwn$1(value, part);
        value = value[part];
      }
      if (isOwn && !skipFurtherCaching) {
        INTRINSICS[intrinsicRealName] = value;
      }
    }
  }
  return value;
};
var callBind$1 = { exports: {} };
(function(module) {
  var bind3 = functionBind;
  var GetIntrinsic3 = getIntrinsic;
  var $apply = GetIntrinsic3("%Function.prototype.apply%");
  var $call = GetIntrinsic3("%Function.prototype.call%");
  var $reflectApply = GetIntrinsic3("%Reflect.apply%", true) || bind3.call($call, $apply);
  var $gOPD2 = GetIntrinsic3("%Object.getOwnPropertyDescriptor%", true);
  var $defineProperty = GetIntrinsic3("%Object.defineProperty%", true);
  var $max = GetIntrinsic3("%Math.max%");
  if ($defineProperty) {
    try {
      $defineProperty({}, "a", { value: 1 });
    } catch (e) {
      $defineProperty = null;
    }
  }
  module.exports = function callBind2(originalFunction) {
    var func = $reflectApply(bind3, $call, arguments);
    if ($gOPD2 && $defineProperty) {
      var desc = $gOPD2(func, "length");
      if (desc.configurable) {
        $defineProperty(
          func,
          "length",
          { value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
        );
      }
    }
    return func;
  };
  var applyBind = function applyBind2() {
    return $reflectApply(bind3, $apply, arguments);
  };
  if ($defineProperty) {
    $defineProperty(module.exports, "apply", { value: applyBind });
  } else {
    module.exports.apply = applyBind;
  }
})(callBind$1);
var GetIntrinsic$1 = getIntrinsic;
var callBind = callBind$1.exports;
var $indexOf = callBind(GetIntrinsic$1("String.prototype.indexOf"));
var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
  var intrinsic = GetIntrinsic$1(name, !!allowMissing);
  if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
    return callBind(intrinsic);
  }
  return intrinsic;
};
var __viteBrowserExternal = {};
var __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
var require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var hasMap = typeof Map === "function" && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === "function" && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var $match = String.prototype.match;
var $slice = String.prototype.slice;
var $replace = String.prototype.replace;
var $toUpperCase = String.prototype.toUpperCase;
var $toLowerCase = String.prototype.toLowerCase;
var $test = RegExp.prototype.test;
var $concat = Array.prototype.concat;
var $join = Array.prototype.join;
var $arrSlice = Array.prototype.slice;
var $floor = Math.floor;
var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
var gOPS = Object.getOwnPropertySymbols;
var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
var isEnumerable = Object.prototype.propertyIsEnumerable;
var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
  return O.__proto__;
} : null);
function addNumericSeparator(num, str) {
  if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
    return str;
  }
  var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
  if (typeof num === "number") {
    var int = num < 0 ? -$floor(-num) : $floor(num);
    if (int !== num) {
      var intStr = String(int);
      var dec = $slice.call(str, intStr.length + 1);
      return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
    }
  }
  return $replace.call(str, sepRegex, "$&_");
}
var utilInspect = require$$0;
var inspectCustom = utilInspect.custom;
var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
var objectInspect = function inspect_(obj, options, depth, seen) {
  var opts = options || {};
  if (has$3(opts, "quoteStyle") && (opts.quoteStyle !== "single" && opts.quoteStyle !== "double")) {
    throw new TypeError('option "quoteStyle" must be "single" or "double"');
  }
  if (has$3(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
    throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
  }
  var customInspect = has$3(opts, "customInspect") ? opts.customInspect : true;
  if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
    throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
  }
  if (has$3(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
    throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
  }
  if (has$3(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
    throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
  }
  var numericSeparator = opts.numericSeparator;
  if (typeof obj === "undefined") {
    return "undefined";
  }
  if (obj === null) {
    return "null";
  }
  if (typeof obj === "boolean") {
    return obj ? "true" : "false";
  }
  if (typeof obj === "string") {
    return inspectString(obj, opts);
  }
  if (typeof obj === "number") {
    if (obj === 0) {
      return Infinity / obj > 0 ? "0" : "-0";
    }
    var str = String(obj);
    return numericSeparator ? addNumericSeparator(obj, str) : str;
  }
  if (typeof obj === "bigint") {
    var bigIntStr = String(obj) + "n";
    return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
  }
  var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
  if (typeof depth === "undefined") {
    depth = 0;
  }
  if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
    return isArray$3(obj) ? "[Array]" : "[Object]";
  }
  var indent = getIndent(opts, depth);
  if (typeof seen === "undefined") {
    seen = [];
  } else if (indexOf(seen, obj) >= 0) {
    return "[Circular]";
  }
  function inspect2(value, from, noIndent) {
    if (from) {
      seen = $arrSlice.call(seen);
      seen.push(from);
    }
    if (noIndent) {
      var newOpts = {
        depth: opts.depth
      };
      if (has$3(opts, "quoteStyle")) {
        newOpts.quoteStyle = opts.quoteStyle;
      }
      return inspect_(value, newOpts, depth + 1, seen);
    }
    return inspect_(value, opts, depth + 1, seen);
  }
  if (typeof obj === "function" && !isRegExp$1(obj)) {
    var name = nameOf(obj);
    var keys = arrObjKeys(obj, inspect2);
    return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
  }
  if (isSymbol(obj)) {
    var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
    return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
  }
  if (isElement(obj)) {
    var s = "<" + $toLowerCase.call(String(obj.nodeName));
    var attrs = obj.attributes || [];
    for (var i = 0; i < attrs.length; i++) {
      s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
    }
    s += ">";
    if (obj.childNodes && obj.childNodes.length) {
      s += "...";
    }
    s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
    return s;
  }
  if (isArray$3(obj)) {
    if (obj.length === 0) {
      return "[]";
    }
    var xs = arrObjKeys(obj, inspect2);
    if (indent && !singleLineValues(xs)) {
      return "[" + indentedJoin(xs, indent) + "]";
    }
    return "[ " + $join.call(xs, ", ") + " ]";
  }
  if (isError(obj)) {
    var parts = arrObjKeys(obj, inspect2);
    if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
      return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect2(obj.cause), parts), ", ") + " }";
    }
    if (parts.length === 0) {
      return "[" + String(obj) + "]";
    }
    return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
  }
  if (typeof obj === "object" && customInspect) {
    if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
      return utilInspect(obj, { depth: maxDepth - depth });
    } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
      return obj.inspect();
    }
  }
  if (isMap(obj)) {
    var mapParts = [];
    mapForEach.call(obj, function(value, key) {
      mapParts.push(inspect2(key, obj, true) + " => " + inspect2(value, obj));
    });
    return collectionOf("Map", mapSize.call(obj), mapParts, indent);
  }
  if (isSet(obj)) {
    var setParts = [];
    setForEach.call(obj, function(value) {
      setParts.push(inspect2(value, obj));
    });
    return collectionOf("Set", setSize.call(obj), setParts, indent);
  }
  if (isWeakMap(obj)) {
    return weakCollectionOf("WeakMap");
  }
  if (isWeakSet(obj)) {
    return weakCollectionOf("WeakSet");
  }
  if (isWeakRef(obj)) {
    return weakCollectionOf("WeakRef");
  }
  if (isNumber(obj)) {
    return markBoxed(inspect2(Number(obj)));
  }
  if (isBigInt(obj)) {
    return markBoxed(inspect2(bigIntValueOf.call(obj)));
  }
  if (isBoolean(obj)) {
    return markBoxed(booleanValueOf.call(obj));
  }
  if (isString(obj)) {
    return markBoxed(inspect2(String(obj)));
  }
  if (!isDate(obj) && !isRegExp$1(obj)) {
    var ys = arrObjKeys(obj, inspect2);
    var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
    var protoTag = obj instanceof Object ? "" : "null prototype";
    var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
    var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
    var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
    if (ys.length === 0) {
      return tag + "{}";
    }
    if (indent) {
      return tag + "{" + indentedJoin(ys, indent) + "}";
    }
    return tag + "{ " + $join.call(ys, ", ") + " }";
  }
  return String(obj);
};
function wrapQuotes(s, defaultStyle, opts) {
  var quoteChar = (opts.quoteStyle || defaultStyle) === "double" ? '"' : "'";
  return quoteChar + s + quoteChar;
}
function quote(s) {
  return $replace.call(String(s), /"/g, "&quot;");
}
function isArray$3(obj) {
  return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isDate(obj) {
  return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isRegExp$1(obj) {
  return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isError(obj) {
  return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isString(obj) {
  return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isNumber(obj) {
  return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isBoolean(obj) {
  return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
}
function isSymbol(obj) {
  if (hasShammedSymbols) {
    return obj && typeof obj === "object" && obj instanceof Symbol;
  }
  if (typeof obj === "symbol") {
    return true;
  }
  if (!obj || typeof obj !== "object" || !symToString) {
    return false;
  }
  try {
    symToString.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
function isBigInt(obj) {
  if (!obj || typeof obj !== "object" || !bigIntValueOf) {
    return false;
  }
  try {
    bigIntValueOf.call(obj);
    return true;
  } catch (e) {
  }
  return false;
}
var hasOwn = Object.prototype.hasOwnProperty || function(key) {
  return key in this;
};
function has$3(obj, key) {
  return hasOwn.call(obj, key);
}
function toStr(obj) {
  return objectToString.call(obj);
}
function nameOf(f) {
  if (f.name) {
    return f.name;
  }
  var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
  if (m) {
    return m[1];
  }
  return null;
}
function indexOf(xs, x) {
  if (xs.indexOf) {
    return xs.indexOf(x);
  }
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) {
      return i;
    }
  }
  return -1;
}
function isMap(x) {
  if (!mapSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    mapSize.call(x);
    try {
      setSize.call(x);
    } catch (s) {
      return true;
    }
    return x instanceof Map;
  } catch (e) {
  }
  return false;
}
function isWeakMap(x) {
  if (!weakMapHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakMapHas.call(x, weakMapHas);
    try {
      weakSetHas.call(x, weakSetHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakMap;
  } catch (e) {
  }
  return false;
}
function isWeakRef(x) {
  if (!weakRefDeref || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakRefDeref.call(x);
    return true;
  } catch (e) {
  }
  return false;
}
function isSet(x) {
  if (!setSize || !x || typeof x !== "object") {
    return false;
  }
  try {
    setSize.call(x);
    try {
      mapSize.call(x);
    } catch (m) {
      return true;
    }
    return x instanceof Set;
  } catch (e) {
  }
  return false;
}
function isWeakSet(x) {
  if (!weakSetHas || !x || typeof x !== "object") {
    return false;
  }
  try {
    weakSetHas.call(x, weakSetHas);
    try {
      weakMapHas.call(x, weakMapHas);
    } catch (s) {
      return true;
    }
    return x instanceof WeakSet;
  } catch (e) {
  }
  return false;
}
function isElement(x) {
  if (!x || typeof x !== "object") {
    return false;
  }
  if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
    return true;
  }
  return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
}
function inspectString(str, opts) {
  if (str.length > opts.maxStringLength) {
    var remaining = str.length - opts.maxStringLength;
    var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
    return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
  }
  var s = $replace.call($replace.call(str, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, lowbyte);
  return wrapQuotes(s, "single", opts);
}
function lowbyte(c) {
  var n = c.charCodeAt(0);
  var x = {
    8: "b",
    9: "t",
    10: "n",
    12: "f",
    13: "r"
  }[n];
  if (x) {
    return "\\" + x;
  }
  return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
}
function markBoxed(str) {
  return "Object(" + str + ")";
}
function weakCollectionOf(type) {
  return type + " { ? }";
}
function collectionOf(type, size, entries, indent) {
  var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
  return type + " (" + size + ") {" + joinedEntries + "}";
}
function singleLineValues(xs) {
  for (var i = 0; i < xs.length; i++) {
    if (indexOf(xs[i], "\n") >= 0) {
      return false;
    }
  }
  return true;
}
function getIndent(opts, depth) {
  var baseIndent;
  if (opts.indent === "	") {
    baseIndent = "	";
  } else if (typeof opts.indent === "number" && opts.indent > 0) {
    baseIndent = $join.call(Array(opts.indent + 1), " ");
  } else {
    return null;
  }
  return {
    base: baseIndent,
    prev: $join.call(Array(depth + 1), baseIndent)
  };
}
function indentedJoin(xs, indent) {
  if (xs.length === 0) {
    return "";
  }
  var lineJoiner = "\n" + indent.prev + indent.base;
  return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
}
function arrObjKeys(obj, inspect2) {
  var isArr = isArray$3(obj);
  var xs = [];
  if (isArr) {
    xs.length = obj.length;
    for (var i = 0; i < obj.length; i++) {
      xs[i] = has$3(obj, i) ? inspect2(obj[i], obj) : "";
    }
  }
  var syms = typeof gOPS === "function" ? gOPS(obj) : [];
  var symMap;
  if (hasShammedSymbols) {
    symMap = {};
    for (var k = 0; k < syms.length; k++) {
      symMap["$" + syms[k]] = syms[k];
    }
  }
  for (var key in obj) {
    if (!has$3(obj, key)) {
      continue;
    }
    if (isArr && String(Number(key)) === key && key < obj.length) {
      continue;
    }
    if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
      continue;
    } else if ($test.call(/[^\w$]/, key)) {
      xs.push(inspect2(key, obj) + ": " + inspect2(obj[key], obj));
    } else {
      xs.push(key + ": " + inspect2(obj[key], obj));
    }
  }
  if (typeof gOPS === "function") {
    for (var j = 0; j < syms.length; j++) {
      if (isEnumerable.call(obj, syms[j])) {
        xs.push("[" + inspect2(syms[j]) + "]: " + inspect2(obj[syms[j]], obj));
      }
    }
  }
  return xs;
}
var GetIntrinsic2 = getIntrinsic;
var callBound = callBound$1;
var inspect = objectInspect;
var $TypeError = GetIntrinsic2("%TypeError%");
var $WeakMap = GetIntrinsic2("%WeakMap%", true);
var $Map = GetIntrinsic2("%Map%", true);
var $weakMapGet = callBound("WeakMap.prototype.get", true);
var $weakMapSet = callBound("WeakMap.prototype.set", true);
var $weakMapHas = callBound("WeakMap.prototype.has", true);
var $mapGet = callBound("Map.prototype.get", true);
var $mapSet = callBound("Map.prototype.set", true);
var $mapHas = callBound("Map.prototype.has", true);
var listGetNode = function(list, key) {
  for (var prev = list, curr; (curr = prev.next) !== null; prev = curr) {
    if (curr.key === key) {
      prev.next = curr.next;
      curr.next = list.next;
      list.next = curr;
      return curr;
    }
  }
};
var listGet = function(objects, key) {
  var node = listGetNode(objects, key);
  return node && node.value;
};
var listSet = function(objects, key, value) {
  var node = listGetNode(objects, key);
  if (node) {
    node.value = value;
  } else {
    objects.next = {
      key,
      next: objects.next,
      value
    };
  }
};
var listHas = function(objects, key) {
  return !!listGetNode(objects, key);
};
var sideChannel = function getSideChannel() {
  var $wm;
  var $m;
  var $o;
  var channel = {
    assert: function(key) {
      if (!channel.has(key)) {
        throw new $TypeError("Side channel does not contain " + inspect(key));
      }
    },
    get: function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapGet($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapGet($m, key);
        }
      } else {
        if ($o) {
          return listGet($o, key);
        }
      }
    },
    has: function(key) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if ($wm) {
          return $weakMapHas($wm, key);
        }
      } else if ($Map) {
        if ($m) {
          return $mapHas($m, key);
        }
      } else {
        if ($o) {
          return listHas($o, key);
        }
      }
      return false;
    },
    set: function(key, value) {
      if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
        if (!$wm) {
          $wm = new $WeakMap();
        }
        $weakMapSet($wm, key, value);
      } else if ($Map) {
        if (!$m) {
          $m = new $Map();
        }
        $mapSet($m, key, value);
      } else {
        if (!$o) {
          $o = { key: {}, next: null };
        }
        listSet($o, key, value);
      }
    }
  };
  return channel;
};
var replace = String.prototype.replace;
var percentTwenties = /%20/g;
var Format = {
  RFC1738: "RFC1738",
  RFC3986: "RFC3986"
};
var formats$3 = {
  "default": Format.RFC3986,
  formatters: {
    RFC1738: function(value) {
      return replace.call(value, percentTwenties, "+");
    },
    RFC3986: function(value) {
      return String(value);
    }
  },
  RFC1738: Format.RFC1738,
  RFC3986: Format.RFC3986
};
var formats$2 = formats$3;
var has$2 = Object.prototype.hasOwnProperty;
var isArray$2 = Array.isArray;
var hexTable = function() {
  var array = [];
  for (var i = 0; i < 256; ++i) {
    array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  }
  return array;
}();
var compactQueue = function compactQueue2(queue) {
  while (queue.length > 1) {
    var item = queue.pop();
    var obj = item.obj[item.prop];
    if (isArray$2(obj)) {
      var compacted = [];
      for (var j = 0; j < obj.length; ++j) {
        if (typeof obj[j] !== "undefined") {
          compacted.push(obj[j]);
        }
      }
      item.obj[item.prop] = compacted;
    }
  }
};
var arrayToObject = function arrayToObject2(source, options) {
  var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  for (var i = 0; i < source.length; ++i) {
    if (typeof source[i] !== "undefined") {
      obj[i] = source[i];
    }
  }
  return obj;
};
var merge = function merge2(target, source, options) {
  if (!source) {
    return target;
  }
  if (typeof source !== "object") {
    if (isArray$2(target)) {
      target.push(source);
    } else if (target && typeof target === "object") {
      if (options && (options.plainObjects || options.allowPrototypes) || !has$2.call(Object.prototype, source)) {
        target[source] = true;
      }
    } else {
      return [target, source];
    }
    return target;
  }
  if (!target || typeof target !== "object") {
    return [target].concat(source);
  }
  var mergeTarget = target;
  if (isArray$2(target) && !isArray$2(source)) {
    mergeTarget = arrayToObject(target, options);
  }
  if (isArray$2(target) && isArray$2(source)) {
    source.forEach(function(item, i) {
      if (has$2.call(target, i)) {
        var targetItem = target[i];
        if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
          target[i] = merge2(targetItem, item, options);
        } else {
          target.push(item);
        }
      } else {
        target[i] = item;
      }
    });
    return target;
  }
  return Object.keys(source).reduce(function(acc, key) {
    var value = source[key];
    if (has$2.call(acc, key)) {
      acc[key] = merge2(acc[key], value, options);
    } else {
      acc[key] = value;
    }
    return acc;
  }, mergeTarget);
};
var assign = function assignSingleSource(target, source) {
  return Object.keys(source).reduce(function(acc, key) {
    acc[key] = source[key];
    return acc;
  }, target);
};
var decode = function(str, decoder, charset) {
  var strWithoutPlus = str.replace(/\+/g, " ");
  if (charset === "iso-8859-1") {
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }
  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    return strWithoutPlus;
  }
};
var encode = function encode2(str, defaultEncoder, charset, kind, format) {
  if (str.length === 0) {
    return str;
  }
  var string = str;
  if (typeof str === "symbol") {
    string = Symbol.prototype.toString.call(str);
  } else if (typeof str !== "string") {
    string = String(str);
  }
  if (charset === "iso-8859-1") {
    return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
      return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
    });
  }
  var out = "";
  for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(i);
    if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats$2.RFC1738 && (c === 40 || c === 41)) {
      out += string.charAt(i);
      continue;
    }
    if (c < 128) {
      out = out + hexTable[c];
      continue;
    }
    if (c < 2048) {
      out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
      continue;
    }
    if (c < 55296 || c >= 57344) {
      out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
      continue;
    }
    i += 1;
    c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
    out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
  }
  return out;
};
var compact = function compact2(value) {
  var queue = [{ obj: { o: value }, prop: "o" }];
  var refs = [];
  for (var i = 0; i < queue.length; ++i) {
    var item = queue[i];
    var obj = item.obj[item.prop];
    var keys = Object.keys(obj);
    for (var j = 0; j < keys.length; ++j) {
      var key = keys[j];
      var val = obj[key];
      if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
        queue.push({ obj, prop: key });
        refs.push(val);
      }
    }
  }
  compactQueue(queue);
  return value;
};
var isRegExp = function isRegExp2(obj) {
  return Object.prototype.toString.call(obj) === "[object RegExp]";
};
var isBuffer = function isBuffer2(obj) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};
var combine = function combine2(a, b) {
  return [].concat(a, b);
};
var maybeMap = function maybeMap2(val, fn) {
  if (isArray$2(val)) {
    var mapped = [];
    for (var i = 0; i < val.length; i += 1) {
      mapped.push(fn(val[i]));
    }
    return mapped;
  }
  return fn(val);
};
var utils$2 = {
  arrayToObject,
  assign,
  combine,
  compact,
  decode,
  encode,
  isBuffer,
  isRegExp,
  maybeMap,
  merge
};
var getSideChannel2 = sideChannel;
var utils$1 = utils$2;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;
var arrayPrefixGenerators = {
  brackets: function brackets(prefix) {
    return prefix + "[]";
  },
  comma: "comma",
  indices: function indices(prefix, key) {
    return prefix + "[" + key + "]";
  },
  repeat: function repeat(prefix) {
    return prefix;
  }
};
var isArray$1 = Array.isArray;
var split = String.prototype.split;
var push = Array.prototype.push;
var pushToArray = function(arr, valueOrArray) {
  push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
};
var toISO = Date.prototype.toISOString;
var defaultFormat = formats$1["default"];
var defaults$1 = {
  addQueryPrefix: false,
  allowDots: false,
  charset: "utf-8",
  charsetSentinel: false,
  delimiter: "&",
  encode: true,
  encoder: utils$1.encode,
  encodeValuesOnly: false,
  format: defaultFormat,
  formatter: formats$1.formatters[defaultFormat],
  indices: false,
  serializeDate: function serializeDate(date) {
    return toISO.call(date);
  },
  skipNulls: false,
  strictNullHandling: false
};
var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
  return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
};
var sentinel = {};
var stringify$1 = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate2, format, formatter, encodeValuesOnly, charset, sideChannel2) {
  var obj = object;
  var tmpSc = sideChannel2;
  var step = 0;
  var findFlag = false;
  while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
    var pos = tmpSc.get(object);
    step += 1;
    if (typeof pos !== "undefined") {
      if (pos === step) {
        throw new RangeError("Cyclic object value");
      } else {
        findFlag = true;
      }
    }
    if (typeof tmpSc.get(sentinel) === "undefined") {
      step = 0;
    }
  }
  if (typeof filter === "function") {
    obj = filter(prefix, obj);
  } else if (obj instanceof Date) {
    obj = serializeDate2(obj);
  } else if (generateArrayPrefix === "comma" && isArray$1(obj)) {
    obj = utils$1.maybeMap(obj, function(value2) {
      if (value2 instanceof Date) {
        return serializeDate2(value2);
      }
      return value2;
    });
  }
  if (obj === null) {
    if (strictNullHandling) {
      return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, "key", format) : prefix;
    }
    obj = "";
  }
  if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
    if (encoder) {
      var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, "key", format);
      if (generateArrayPrefix === "comma" && encodeValuesOnly) {
        var valuesArray = split.call(String(obj), ",");
        var valuesJoined = "";
        for (var i = 0; i < valuesArray.length; ++i) {
          valuesJoined += (i === 0 ? "" : ",") + formatter(encoder(valuesArray[i], defaults$1.encoder, charset, "value", format));
        }
        return [formatter(keyValue) + "=" + valuesJoined];
      }
      return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults$1.encoder, charset, "value", format))];
    }
    return [formatter(prefix) + "=" + formatter(String(obj))];
  }
  var values = [];
  if (typeof obj === "undefined") {
    return values;
  }
  var objKeys;
  if (generateArrayPrefix === "comma" && isArray$1(obj)) {
    objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
  } else if (isArray$1(filter)) {
    objKeys = filter;
  } else {
    var keys = Object.keys(obj);
    objKeys = sort ? keys.sort(sort) : keys;
  }
  for (var j = 0; j < objKeys.length; ++j) {
    var key = objKeys[j];
    var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
    if (skipNulls && value === null) {
      continue;
    }
    var keyPrefix = isArray$1(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(prefix, key) : prefix : prefix + (allowDots ? "." + key : "[" + key + "]");
    sideChannel2.set(object, step);
    var valueSideChannel = getSideChannel2();
    valueSideChannel.set(sentinel, sideChannel2);
    pushToArray(values, stringify(
      value,
      keyPrefix,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate2,
      format,
      formatter,
      encodeValuesOnly,
      charset,
      valueSideChannel
    ));
  }
  return values;
};
var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
  if (!opts) {
    return defaults$1;
  }
  if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
    throw new TypeError("Encoder has to be a function.");
  }
  var charset = opts.charset || defaults$1.charset;
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var format = formats$1["default"];
  if (typeof opts.format !== "undefined") {
    if (!has$1.call(formats$1.formatters, opts.format)) {
      throw new TypeError("Unknown format option provided.");
    }
    format = opts.format;
  }
  var formatter = formats$1.formatters[format];
  var filter = defaults$1.filter;
  if (typeof opts.filter === "function" || isArray$1(opts.filter)) {
    filter = opts.filter;
  }
  return {
    addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
    allowDots: typeof opts.allowDots === "undefined" ? defaults$1.allowDots : !!opts.allowDots,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults$1.charsetSentinel,
    delimiter: typeof opts.delimiter === "undefined" ? defaults$1.delimiter : opts.delimiter,
    encode: typeof opts.encode === "boolean" ? opts.encode : defaults$1.encode,
    encoder: typeof opts.encoder === "function" ? opts.encoder : defaults$1.encoder,
    encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
    filter,
    format,
    formatter,
    serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults$1.serializeDate,
    skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults$1.skipNulls,
    sort: typeof opts.sort === "function" ? opts.sort : null,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults$1.strictNullHandling
  };
};
var stringify_1 = function(object, opts) {
  var obj = object;
  var options = normalizeStringifyOptions(opts);
  var objKeys;
  var filter;
  if (typeof options.filter === "function") {
    filter = options.filter;
    obj = filter("", obj);
  } else if (isArray$1(options.filter)) {
    filter = options.filter;
    objKeys = filter;
  }
  var keys = [];
  if (typeof obj !== "object" || obj === null) {
    return "";
  }
  var arrayFormat;
  if (opts && opts.arrayFormat in arrayPrefixGenerators) {
    arrayFormat = opts.arrayFormat;
  } else if (opts && "indices" in opts) {
    arrayFormat = opts.indices ? "indices" : "repeat";
  } else {
    arrayFormat = "indices";
  }
  var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
  if (!objKeys) {
    objKeys = Object.keys(obj);
  }
  if (options.sort) {
    objKeys.sort(options.sort);
  }
  var sideChannel2 = getSideChannel2();
  for (var i = 0; i < objKeys.length; ++i) {
    var key = objKeys[i];
    if (options.skipNulls && obj[key] === null) {
      continue;
    }
    pushToArray(keys, stringify$1(
      obj[key],
      key,
      generateArrayPrefix,
      options.strictNullHandling,
      options.skipNulls,
      options.encode ? options.encoder : null,
      options.filter,
      options.sort,
      options.allowDots,
      options.serializeDate,
      options.format,
      options.formatter,
      options.encodeValuesOnly,
      options.charset,
      sideChannel2
    ));
  }
  var joined = keys.join(options.delimiter);
  var prefix = options.addQueryPrefix === true ? "?" : "";
  if (options.charsetSentinel) {
    if (options.charset === "iso-8859-1") {
      prefix += "utf8=%26%2310003%3B&";
    } else {
      prefix += "utf8=%E2%9C%93&";
    }
  }
  return joined.length > 0 ? prefix + joined : "";
};
var utils = utils$2;
var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;
var defaults = {
  allowDots: false,
  allowPrototypes: false,
  allowSparse: false,
  arrayLimit: 20,
  charset: "utf-8",
  charsetSentinel: false,
  comma: false,
  decoder: utils.decode,
  delimiter: "&",
  depth: 5,
  ignoreQueryPrefix: false,
  interpretNumericEntities: false,
  parameterLimit: 1e3,
  parseArrays: true,
  plainObjects: false,
  strictNullHandling: false
};
var interpretNumericEntities = function(str) {
  return str.replace(/&#(\d+);/g, function($0, numberStr) {
    return String.fromCharCode(parseInt(numberStr, 10));
  });
};
var parseArrayValue = function(val, options) {
  if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
    return val.split(",");
  }
  return val;
};
var isoSentinel = "utf8=%26%2310003%3B";
var charsetSentinel = "utf8=%E2%9C%93";
var parseValues = function parseQueryStringValues(str, options) {
  var obj = {};
  var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
  var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
  var parts = cleanStr.split(options.delimiter, limit);
  var skipIndex = -1;
  var i;
  var charset = options.charset;
  if (options.charsetSentinel) {
    for (i = 0; i < parts.length; ++i) {
      if (parts[i].indexOf("utf8=") === 0) {
        if (parts[i] === charsetSentinel) {
          charset = "utf-8";
        } else if (parts[i] === isoSentinel) {
          charset = "iso-8859-1";
        }
        skipIndex = i;
        i = parts.length;
      }
    }
  }
  for (i = 0; i < parts.length; ++i) {
    if (i === skipIndex) {
      continue;
    }
    var part = parts[i];
    var bracketEqualsPos = part.indexOf("]=");
    var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
    var key, val;
    if (pos === -1) {
      key = options.decoder(part, defaults.decoder, charset, "key");
      val = options.strictNullHandling ? null : "";
    } else {
      key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
      val = utils.maybeMap(
        parseArrayValue(part.slice(pos + 1), options),
        function(encodedVal) {
          return options.decoder(encodedVal, defaults.decoder, charset, "value");
        }
      );
    }
    if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
      val = interpretNumericEntities(val);
    }
    if (part.indexOf("[]=") > -1) {
      val = isArray(val) ? [val] : val;
    }
    if (has.call(obj, key)) {
      obj[key] = utils.combine(obj[key], val);
    } else {
      obj[key] = val;
    }
  }
  return obj;
};
var parseObject = function(chain, val, options, valuesParsed) {
  var leaf = valuesParsed ? val : parseArrayValue(val, options);
  for (var i = chain.length - 1; i >= 0; --i) {
    var obj;
    var root = chain[i];
    if (root === "[]" && options.parseArrays) {
      obj = [].concat(leaf);
    } else {
      obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
      var index = parseInt(cleanRoot, 10);
      if (!options.parseArrays && cleanRoot === "") {
        obj = { 0: leaf };
      } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
        obj = [];
        obj[index] = leaf;
      } else if (cleanRoot !== "__proto__") {
        obj[cleanRoot] = leaf;
      }
    }
    leaf = obj;
  }
  return leaf;
};
var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
  if (!givenKey) {
    return;
  }
  var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
  var brackets2 = /(\[[^[\]]*])/;
  var child = /(\[[^[\]]*])/g;
  var segment = options.depth > 0 && brackets2.exec(key);
  var parent = segment ? key.slice(0, segment.index) : key;
  var keys = [];
  if (parent) {
    if (!options.plainObjects && has.call(Object.prototype, parent)) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(parent);
  }
  var i = 0;
  while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
    i += 1;
    if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
      if (!options.allowPrototypes) {
        return;
      }
    }
    keys.push(segment[1]);
  }
  if (segment) {
    keys.push("[" + key.slice(segment.index) + "]");
  }
  return parseObject(keys, val, options, valuesParsed);
};
var normalizeParseOptions = function normalizeParseOptions2(opts) {
  if (!opts) {
    return defaults;
  }
  if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
    throw new TypeError("Decoder has to be a function.");
  }
  if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
    throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
  }
  var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
  return {
    allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
    allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
    allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
    arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
    charset,
    charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
    comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
    decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
    delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
    depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
    ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
    interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
    parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
    parseArrays: opts.parseArrays !== false,
    plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
    strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
  };
};
var parse$1 = function(str, opts) {
  var options = normalizeParseOptions(opts);
  if (str === "" || str === null || typeof str === "undefined") {
    return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  }
  var tempObj = typeof str === "string" ? parseValues(str, options) : str;
  var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
  var keys = Object.keys(tempObj);
  for (var i = 0; i < keys.length; ++i) {
    var key = keys[i];
    var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
    obj = utils.merge(obj, newObj, options);
  }
  if (options.allowSparse === true) {
    return obj;
  }
  return utils.compact(obj);
};
var stringify2 = stringify_1;
var parse = parse$1;
var formats = formats$3;
var lib = {
  formats,
  parse,
  stringify: stringify2
};
const setHeaderToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const deleteHeaderToken = () => {
  delete api.defaults.headers.common.Authorization;
};
const setFormHeaders = () => {
  return { "content-type": "application/x-www-form-urlencoded" };
};
const storeAuth = useAuthStore();
const auth = {
  async login(credentials) {
    const data = {
      username: credentials.email,
      password: credentials.password
    };
    const options = {
      method: "POST",
      data: lib.stringify(data),
      url: "/login"
    };
    return api(options, { headers: setFormHeaders() }).then((response) => {
      storeAuth.setToken(response.data.token);
      setHeaderToken(storeAuth.getUserToken);
    }).catch((response) => {
      storeAuth.deleteToken();
      deleteHeaderToken();
    });
  },
  async logout() {
    const options = {
      method: "POST",
      data: lib.stringify(""),
      url: "/logout"
    };
    setHeaderToken(storeAuth.getUserToken);
    return api(options, { headers: setFormHeaders() }).then((response) => {
      storeAuth.deleteToken(response.data.token);
      deleteHeaderToken(storeAuth.getUserToken);
    }).catch((response) => {
      console.log("logout error " + response);
    });
  }
};
const showNotification = (type, message) => {
  Notify.create({
    type,
    message,
    position: "top"
  });
};
export { useDark as a, between as b, useAuthStore as c, auth as d, showNotification as s, useDarkProps as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmM3NDBiY2QyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZm9ybWF0LmpzIiwiLi4vLi4vLi4vc3JjL3N0b3Jlcy9hdXRoLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Z1bmN0aW9uLWJpbmQvaW1wbGVtZW50YXRpb24uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvZnVuY3Rpb24tYmluZC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9oYXMvc3JjL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2luZGV4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NhbGwtYmluZC9jYWxsQm91bmQuanMiLCIuLi8uLi8uLi9fX3ZpdGUtYnJvd3Nlci1leHRlcm5hbCIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdC9pbmRleC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zaWRlLWNoYW5uZWwvaW5kZXguanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXMvbGliL2Zvcm1hdHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXMvbGliL3BhcnNlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9hdXRoU2VydmljZS5qcyIsIi4uLy4uLy4uL3NyYy91dGlscy9ub3RpZmljYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VEYXJrUHJvcHMgPSB7XG4gIGRhcms6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsICRxKSB7XG4gIC8vIHJldHVybiBpc0RhcmtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kYXJrID09PSBudWxsXG4gICAgICA/ICRxLmRhcmsuaXNBY3RpdmVcbiAgICAgIDogcHJvcHMuZGFya1xuICApKVxufVxuIiwiY29uc3QgdW5pdHMgPSBbICdCJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiBodW1hblN0b3JhZ2VTaXplIChieXRlcykge1xuICBsZXQgdSA9IDBcblxuICB3aGlsZSAocGFyc2VJbnQoYnl0ZXMsIDEwKSA+PSAxMDI0ICYmIHUgPCB1bml0cy5sZW5ndGggLSAxKSB7XG4gICAgYnl0ZXMgLz0gMTAyNFxuICAgICsrdVxuICB9XG5cbiAgcmV0dXJuIGAkeyBieXRlcy50b0ZpeGVkKDEpIH0keyB1bml0c1sgdSBdIH1gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYXBpdGFsaXplIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYmV0d2VlbiAodiwgbWluLCBtYXgpIHtcbiAgcmV0dXJuIG1heCA8PSBtaW5cbiAgICA/IG1pblxuICAgIDogTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHYpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVG9JbnRlcnZhbCAodiwgbWluLCBtYXgpIHtcbiAgaWYgKG1heCA8PSBtaW4pIHtcbiAgICByZXR1cm4gbWluXG4gIH1cblxuICBjb25zdCBzaXplID0gKG1heCAtIG1pbiArIDEpXG5cbiAgbGV0IGluZGV4ID0gbWluICsgKHYgLSBtaW4pICUgc2l6ZVxuICBpZiAoaW5kZXggPCBtaW4pIHtcbiAgICBpbmRleCA9IHNpemUgKyBpbmRleFxuICB9XG5cbiAgcmV0dXJuIGluZGV4ID09PSAwID8gMCA6IGluZGV4IC8vIGZpeCBmb3IgKC1hICUgYSkgPT4gLTBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhZCAodiwgbGVuZ3RoID0gMiwgY2hhciA9ICcwJykge1xuICBpZiAodiA9PT0gdm9pZCAwIHx8IHYgPT09IG51bGwpIHtcbiAgICByZXR1cm4gdlxuICB9XG5cbiAgY29uc3QgdmFsID0gJycgKyB2XG4gIHJldHVybiB2YWwubGVuZ3RoID49IGxlbmd0aFxuICAgID8gdmFsXG4gICAgOiBuZXcgQXJyYXkobGVuZ3RoIC0gdmFsLmxlbmd0aCArIDEpLmpvaW4oY2hhcikgKyB2YWxcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBodW1hblN0b3JhZ2VTaXplLFxuICBjYXBpdGFsaXplLFxuICBiZXR3ZWVuLFxuICBub3JtYWxpemVUb0ludGVydmFsLFxuICBwYWRcbn1cbiIsImltcG9ydCB7IGRlZmluZVN0b3JlIH0gZnJvbSAncGluaWEnXHJcblxyXG5leHBvcnQgY29uc3QgdXNlQXV0aFN0b3JlID0gZGVmaW5lU3RvcmUoJ2F1dGgnLCB7XHJcbiAgc3RhdGU6ICgpID0+ICh7XHJcbiAgICB0b2tlbjogJycsXHJcbiAgICByZWZyZXNoVG9rZW46ICcnLFxyXG4gICAgYXV0aGVudGljYXRlZDogZmFsc2VcclxuICB9KSxcclxuICBnZXR0ZXJzOiB7XHJcbiAgICBnZXRVc2VyVG9rZW46IHN0YXRlID0+IHN0YXRlLnRva2VuLFxyXG4gICAgaXNBdXRoZW50aWNhdGVkOiBzdGF0ZSA9PiBzdGF0ZS5hdXRoZW50aWNhdGVkXHJcbiAgfSxcclxuICBhY3Rpb25zOiB7XHJcbiAgICBzZXRUb2tlbiAodG9rZW4pIHtcclxuICAgICAgdGhpcy50b2tlbiA9IHRva2VuXHJcbiAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHRydWVcclxuICAgICAgdGhpcy5zZXRMb2NhbFRva2VuKClcclxuICAgIH0sXHJcbiAgICBkZWxldGVUb2tlbiAoKSB7XHJcbiAgICAgIHRoaXMudG9rZW4gPSAnJ1xyXG4gICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSBmYWxzZVxyXG4gICAgICB0aGlzLmRlbGV0ZUxvY2FsVG9rZW4oKVxyXG4gICAgfSxcclxuICAgIHNldExvY2FsVG9rZW4gKCkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndG9rZW4nLCB0aGlzLnRva2VuKVxyXG4gICAgfSxcclxuICAgIGdldExvY2FsVG9rZW4gKCkge1xyXG4gICAgICBjb25zdCB0b2tlbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b2tlbicpXHJcbiAgICAgIHJldHVybiB0b2tlbiA9PT0gdW5kZWZpbmVkID8gJycgOiB0b2tlblxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUxvY2FsVG9rZW4gKCkge1xyXG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndG9rZW4nKVxyXG4gICAgfSxcclxuICAgIGNoZWNrVG9rZW4gKCkge1xyXG4gICAgICBpZiAodGhpcy50b2tlbikgcmV0dXJuIHRoaXMudG9rZW5cclxuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLmdldExvY2FsVG9rZW4oKVxyXG4gICAgICBpZiAoIXRva2VuKSByZXR1cm4gbmV3IEVycm9yKCdpbnZhbGlkIHRva2VuJylcclxuICAgICAgdGhpcy5zZXRUb2tlbih0b2tlbilcclxuICAgICAgdGhpcy5sb2FkU2Vzc2lvbigpXHJcbiAgICB9LFxyXG4gICAgbG9hZFNlc3Npb24gKCkge1xyXG4gICAgICAvLyB0byB2YWxpZGF0ZSB0b2tlbiBhbmQgcmVmcmVzaCB0b2tlblxyXG4gICAgfVxyXG5cclxuICB9XHJcbn0pXHJcbiIsIid1c2Ugc3RyaWN0JztcblxuLyogZXNsaW50IGNvbXBsZXhpdHk6IFsyLCAxOF0sIG1heC1zdGF0ZW1lbnRzOiBbMiwgMzNdICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc1N5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2YgU3ltYm9sICE9PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gJ3N5bWJvbCcpIHsgcmV0dXJuIHRydWU7IH1cblxuXHR2YXIgb2JqID0ge307XG5cdHZhciBzeW0gPSBTeW1ib2woJ3Rlc3QnKTtcblx0dmFyIHN5bU9iaiA9IE9iamVjdChzeW0pO1xuXHRpZiAodHlwZW9mIHN5bSA9PT0gJ3N0cmluZycpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW0pICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzeW1PYmopICE9PSAnW29iamVjdCBTeW1ib2xdJykgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vbGpoYXJiL29iamVjdC5hc3NpZ24vaXNzdWVzLzE3XG5cdC8vIGlmIChzeW0gaW5zdGFuY2VvZiBTeW1ib2wpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIHRlbXAgZGlzYWJsZWQgcGVyIGh0dHBzOi8vZ2l0aHViLmNvbS9XZWJSZWZsZWN0aW9uL2dldC1vd24tcHJvcGVydHktc3ltYm9scy9pc3N1ZXMvNFxuXHQvLyBpZiAoIShzeW1PYmogaW5zdGFuY2VvZiBTeW1ib2wpKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdC8vIGlmICh0eXBlb2YgU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0Ly8gaWYgKFN0cmluZyhzeW0pICE9PSBTeW1ib2wucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltVmFsID0gNDI7XG5cdG9ialtzeW1dID0gc3ltVmFsO1xuXHRmb3IgKHN5bSBpbiBvYmopIHsgcmV0dXJuIGZhbHNlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLXVucmVhY2hhYmxlLWxvb3Bcblx0aWYgKHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3Qua2V5cyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzID09PSAnZnVuY3Rpb24nICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubGVuZ3RoICE9PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHZhciBzeW1zID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopO1xuXHRpZiAoc3ltcy5sZW5ndGggIT09IDEgfHwgc3ltc1swXSAhPT0gc3ltKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBzeW0pO1xuXHRcdGlmIChkZXNjcmlwdG9yLnZhbHVlICE9PSBzeW1WYWwgfHwgZGVzY3JpcHRvci5lbnVtZXJhYmxlICE9PSB0cnVlKSB7IHJldHVybiBmYWxzZTsgfVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb3JpZ1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbDtcbnZhciBoYXNTeW1ib2xTaGFtID0gcmVxdWlyZSgnLi9zaGFtcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc05hdGl2ZVN5bWJvbHMoKSB7XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2Ygb3JpZ1N5bWJvbCgnZm9vJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCgnYmFyJykgIT09ICdzeW1ib2wnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdHJldHVybiBoYXNTeW1ib2xTaGFtKCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgbm8taW52YWxpZC10aGlzOiAxICovXG5cbnZhciBFUlJPUl9NRVNTQUdFID0gJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgJztcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY1R5cGUgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQodGhhdCkge1xuICAgIHZhciB0YXJnZXQgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnZnVuY3Rpb24nIHx8IHRvU3RyLmNhbGwodGFyZ2V0KSAhPT0gZnVuY1R5cGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihFUlJPUl9NRVNTQUdFICsgdGFyZ2V0KTtcbiAgICB9XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICB2YXIgYm91bmQ7XG4gICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhhdCxcbiAgICAgICAgICAgICAgICBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBib3VuZExlbmd0aCA9IE1hdGgubWF4KDAsIHRhcmdldC5sZW5ndGggLSBhcmdzLmxlbmd0aCk7XG4gICAgdmFyIGJvdW5kQXJncyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm91bmRMZW5ndGg7IGkrKykge1xuICAgICAgICBib3VuZEFyZ3MucHVzaCgnJCcgKyBpKTtcbiAgICB9XG5cbiAgICBib3VuZCA9IEZ1bmN0aW9uKCdiaW5kZXInLCAncmV0dXJuIGZ1bmN0aW9uICgnICsgYm91bmRBcmdzLmpvaW4oJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKTsgfScpKGJpbmRlcik7XG5cbiAgICBpZiAodGFyZ2V0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgRW1wdHkgPSBmdW5jdGlvbiBFbXB0eSgpIHt9O1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICBib3VuZC5wcm90b3R5cGUgPSBuZXcgRW1wdHkoKTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW1wbGVtZW50YXRpb24gPSByZXF1aXJlKCcuL2ltcGxlbWVudGF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgfHwgaW1wbGVtZW50YXRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHVuZGVmaW5lZDtcblxudmFyICRTeW50YXhFcnJvciA9IFN5bnRheEVycm9yO1xudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxudmFyIGdldEV2YWxsZWRDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIChleHByZXNzaW9uU3ludGF4KSB7XG5cdHRyeSB7XG5cdFx0cmV0dXJuICRGdW5jdGlvbignXCJ1c2Ugc3RyaWN0XCI7IHJldHVybiAoJyArIGV4cHJlc3Npb25TeW50YXggKyAnKS5jb25zdHJ1Y3RvcjsnKSgpO1xuXHR9IGNhdGNoIChlKSB7fVxufTtcblxudmFyICRnT1BEID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbmlmICgkZ09QRCkge1xuXHR0cnkge1xuXHRcdCRnT1BEKHt9LCAnJyk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQkZ09QRCA9IG51bGw7IC8vIHRoaXMgaXMgSUUgOCwgd2hpY2ggaGFzIGEgYnJva2VuIGdPUERcblx0fVxufVxuXG52YXIgdGhyb3dUeXBlRXJyb3IgPSBmdW5jdGlvbiAoKSB7XG5cdHRocm93IG5ldyAkVHlwZUVycm9yKCk7XG59O1xudmFyIFRocm93VHlwZUVycm9yID0gJGdPUERcblx0PyAoZnVuY3Rpb24gKCkge1xuXHRcdHRyeSB7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zLCBuby1jYWxsZXIsIG5vLXJlc3RyaWN0ZWQtcHJvcGVydGllc1xuXHRcdFx0YXJndW1lbnRzLmNhbGxlZTsgLy8gSUUgOCBkb2VzIG5vdCB0aHJvdyBoZXJlXG5cdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0fSBjYXRjaCAoY2FsbGVlVGhyb3dzKSB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJRSA4IHRocm93cyBvbiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGFyZ3VtZW50cywgJycpXG5cdFx0XHRcdHJldHVybiAkZ09QRChhcmd1bWVudHMsICdjYWxsZWUnKS5nZXQ7XG5cdFx0XHR9IGNhdGNoIChnT1BEdGhyb3dzKSB7XG5cdFx0XHRcdHJldHVybiB0aHJvd1R5cGVFcnJvcjtcblx0XHRcdH1cblx0XHR9XG5cdH0oKSlcblx0OiB0aHJvd1R5cGVFcnJvcjtcblxudmFyIGhhc1N5bWJvbHMgPSByZXF1aXJlKCdoYXMtc3ltYm9scycpKCk7XG5cbnZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5fX3Byb3RvX187IH07IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cblxudmFyIG5lZWRzRXZhbCA9IHt9O1xuXG52YXIgVHlwZWRBcnJheSA9IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGdldFByb3RvKFVpbnQ4QXJyYXkpO1xuXG52YXIgSU5UUklOU0lDUyA9IHtcblx0JyVBZ2dyZWdhdGVFcnJvciUnOiB0eXBlb2YgQWdncmVnYXRlRXJyb3IgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQWdncmVnYXRlRXJyb3IsXG5cdCclQXJyYXklJzogQXJyYXksXG5cdCclQXJyYXlCdWZmZXIlJzogdHlwZW9mIEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEFycmF5QnVmZmVyLFxuXHQnJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKFtdW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclQXN5bmNGcm9tU3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Z1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvciUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnOiBuZWVkc0V2YWwsXG5cdCclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnOiBuZWVkc0V2YWwsXG5cdCclQXRvbWljcyUnOiB0eXBlb2YgQXRvbWljcyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBdG9taWNzLFxuXHQnJUJpZ0ludCUnOiB0eXBlb2YgQmlnSW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEJpZ0ludCxcblx0JyVCb29sZWFuJSc6IEJvb2xlYW4sXG5cdCclRGF0YVZpZXclJzogdHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IERhdGFWaWV3LFxuXHQnJURhdGUlJzogRGF0ZSxcblx0JyVkZWNvZGVVUkklJzogZGVjb2RlVVJJLFxuXHQnJWRlY29kZVVSSUNvbXBvbmVudCUnOiBkZWNvZGVVUklDb21wb25lbnQsXG5cdCclZW5jb2RlVVJJJSc6IGVuY29kZVVSSSxcblx0JyVlbmNvZGVVUklDb21wb25lbnQlJzogZW5jb2RlVVJJQ29tcG9uZW50LFxuXHQnJUVycm9yJSc6IEVycm9yLFxuXHQnJWV2YWwlJzogZXZhbCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG5cdCclRXZhbEVycm9yJSc6IEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IE1hcCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclTWF0aCUnOiBNYXRoLFxuXHQnJU51bWJlciUnOiBOdW1iZXIsXG5cdCclT2JqZWN0JSc6IE9iamVjdCxcblx0JyVwYXJzZUZsb2F0JSc6IHBhcnNlRmxvYXQsXG5cdCclcGFyc2VJbnQlJzogcGFyc2VJbnQsXG5cdCclUHJvbWlzZSUnOiB0eXBlb2YgUHJvbWlzZSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm9taXNlLFxuXHQnJVByb3h5JSc6IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBQcm94eSxcblx0JyVSYW5nZUVycm9yJSc6IFJhbmdlRXJyb3IsXG5cdCclUmVmZXJlbmNlRXJyb3IlJzogUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzID8gdW5kZWZpbmVkIDogZ2V0UHJvdG8obmV3IFNldCgpW1N5bWJvbC5pdGVyYXRvcl0oKSksXG5cdCclU2hhcmVkQXJyYXlCdWZmZXIlJzogdHlwZW9mIFNoYXJlZEFycmF5QnVmZmVyID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFNoYXJlZEFycmF5QnVmZmVyLFxuXHQnJVN0cmluZyUnOiBTdHJpbmcsXG5cdCclU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlJzogaGFzU3ltYm9scyA/IGdldFByb3RvKCcnW1N5bWJvbC5pdGVyYXRvcl0oKSkgOiB1bmRlZmluZWQsXG5cdCclU3ltYm9sJSc6IGhhc1N5bWJvbHMgPyBTeW1ib2wgOiB1bmRlZmluZWQsXG5cdCclU3ludGF4RXJyb3IlJzogJFN5bnRheEVycm9yLFxuXHQnJVRocm93VHlwZUVycm9yJSc6IFRocm93VHlwZUVycm9yLFxuXHQnJVR5cGVkQXJyYXklJzogVHlwZWRBcnJheSxcblx0JyVUeXBlRXJyb3IlJzogJFR5cGVFcnJvcixcblx0JyVVaW50OEFycmF5JSc6IHR5cGVvZiBVaW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4QXJyYXksXG5cdCclVWludDhDbGFtcGVkQXJyYXklJzogdHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQ4Q2xhbXBlZEFycmF5LFxuXHQnJVVpbnQxNkFycmF5JSc6IHR5cGVvZiBVaW50MTZBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50MTZBcnJheSxcblx0JyVVaW50MzJBcnJheSUnOiB0eXBlb2YgVWludDMyQXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDMyQXJyYXksXG5cdCclVVJJRXJyb3IlJzogVVJJRXJyb3IsXG5cdCclV2Vha01hcCUnOiB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrTWFwLFxuXHQnJVdlYWtSZWYlJzogdHlwZW9mIFdlYWtSZWYgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1JlZixcblx0JyVXZWFrU2V0JSc6IHR5cGVvZiBXZWFrU2V0ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtTZXRcbn07XG5cbnZhciBkb0V2YWwgPSBmdW5jdGlvbiBkb0V2YWwobmFtZSkge1xuXHR2YXIgdmFsdWU7XG5cdGlmIChuYW1lID09PSAnJUFzeW5jRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJykge1xuXHRcdHZhbHVlID0gZ2V0RXZhbGxlZENvbnN0cnVjdG9yKCdhc3luYyBmdW5jdGlvbiogKCkge30nKTtcblx0fSBlbHNlIGlmIChuYW1lID09PSAnJUFzeW5jR2VuZXJhdG9yJScpIHtcblx0XHR2YXIgZm4gPSBkb0V2YWwoJyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJScpO1xuXHRcdGlmIChmbikge1xuXHRcdFx0dmFsdWUgPSBmbi5wcm90b3R5cGU7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNJdGVyYXRvclByb3RvdHlwZSUnKSB7XG5cdFx0dmFyIGdlbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yJScpO1xuXHRcdGlmIChnZW4pIHtcblx0XHRcdHZhbHVlID0gZ2V0UHJvdG8oZ2VuLnByb3RvdHlwZSk7XG5cdFx0fVxuXHR9XG5cblx0SU5UUklOU0lDU1tuYW1lXSA9IHZhbHVlO1xuXG5cdHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBMRUdBQ1lfQUxJQVNFUyA9IHtcblx0JyVBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ0FycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG90eXBlJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclQXJyYXlQcm90b19lbnRyaWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2VudHJpZXMnXSxcblx0JyVBcnJheVByb3RvX2ZvckVhY2glJzogWydBcnJheScsICdwcm90b3R5cGUnLCAnZm9yRWFjaCddLFxuXHQnJUFycmF5UHJvdG9fa2V5cyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdrZXlzJ10sXG5cdCclQXJyYXlQcm90b192YWx1ZXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAndmFsdWVzJ10sXG5cdCclQXN5bmNGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0FzeW5jRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclQXN5bmNHZW5lcmF0b3IlJzogWydBc3luY0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnLCAncHJvdG90eXBlJ10sXG5cdCclQm9vbGVhblByb3RvdHlwZSUnOiBbJ0Jvb2xlYW4nLCAncHJvdG90eXBlJ10sXG5cdCclRGF0YVZpZXdQcm90b3R5cGUlJzogWydEYXRhVmlldycsICdwcm90b3R5cGUnXSxcblx0JyVEYXRlUHJvdG90eXBlJSc6IFsnRGF0ZScsICdwcm90b3R5cGUnXSxcblx0JyVFcnJvclByb3RvdHlwZSUnOiBbJ0Vycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJUV2YWxFcnJvclByb3RvdHlwZSUnOiBbJ0V2YWxFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVGbG9hdDMyQXJyYXlQcm90b3R5cGUlJzogWydGbG9hdDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQ2NEFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQ2NEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZ1bmN0aW9uUHJvdG90eXBlJSc6IFsnRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJ10sXG5cdCclR2VuZXJhdG9yUHJvdG90eXBlJSc6IFsnR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUludDhBcnJheVByb3RvdHlwZSUnOiBbJ0ludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnSW50MTZBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnSW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVKU09OUGFyc2UlJzogWydKU09OJywgJ3BhcnNlJ10sXG5cdCclSlNPTlN0cmluZ2lmeSUnOiBbJ0pTT04nLCAnc3RyaW5naWZ5J10sXG5cdCclTWFwUHJvdG90eXBlJSc6IFsnTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJU51bWJlclByb3RvdHlwZSUnOiBbJ051bWJlcicsICdwcm90b3R5cGUnXSxcblx0JyVPYmplY3RQcm90b3R5cGUlJzogWydPYmplY3QnLCAncHJvdG90eXBlJ10sXG5cdCclT2JqUHJvdG9fdG9TdHJpbmclJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3RvU3RyaW5nJ10sXG5cdCclT2JqUHJvdG9fdmFsdWVPZiUnOiBbJ09iamVjdCcsICdwcm90b3R5cGUnLCAndmFsdWVPZiddLFxuXHQnJVByb21pc2VQcm90b3R5cGUlJzogWydQcm9taXNlJywgJ3Byb3RvdHlwZSddLFxuXHQnJVByb21pc2VQcm90b190aGVuJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnLCAndGhlbiddLFxuXHQnJVByb21pc2VfYWxsJSc6IFsnUHJvbWlzZScsICdhbGwnXSxcblx0JyVQcm9taXNlX3JlamVjdCUnOiBbJ1Byb21pc2UnLCAncmVqZWN0J10sXG5cdCclUHJvbWlzZV9yZXNvbHZlJSc6IFsnUHJvbWlzZScsICdyZXNvbHZlJ10sXG5cdCclUmFuZ2VFcnJvclByb3RvdHlwZSUnOiBbJ1JhbmdlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVmZXJlbmNlRXJyb3JQcm90b3R5cGUlJzogWydSZWZlcmVuY2VFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVSZWdFeHBQcm90b3R5cGUlJzogWydSZWdFeHAnLCAncHJvdG90eXBlJ10sXG5cdCclU2V0UHJvdG90eXBlJSc6IFsnU2V0JywgJ3Byb3RvdHlwZSddLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyUHJvdG90eXBlJSc6IFsnU2hhcmVkQXJyYXlCdWZmZXInLCAncHJvdG90eXBlJ10sXG5cdCclU3RyaW5nUHJvdG90eXBlJSc6IFsnU3RyaW5nJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN5bWJvbFByb3RvdHlwZSUnOiBbJ1N5bWJvbCcsICdwcm90b3R5cGUnXSxcblx0JyVTeW50YXhFcnJvclByb3RvdHlwZSUnOiBbJ1N5bnRheEVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVkQXJyYXlQcm90b3R5cGUlJzogWydUeXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVR5cGVFcnJvclByb3RvdHlwZSUnOiBbJ1R5cGVFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OEFycmF5UHJvdG90eXBlJSc6IFsnVWludDhBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50OENsYW1wZWRBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4Q2xhbXBlZEFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQxNkFycmF5UHJvdG90eXBlJSc6IFsnVWludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDMyQXJyYXlQcm90b3R5cGUlJzogWydVaW50MzJBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVUklFcnJvclByb3RvdHlwZSUnOiBbJ1VSSUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtNYXBQcm90b3R5cGUlJzogWydXZWFrTWFwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVdlYWtTZXRQcm90b3R5cGUlJzogWydXZWFrU2V0JywgJ3Byb3RvdHlwZSddXG59O1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXMnKTtcbnZhciAkY29uY2F0ID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIEFycmF5LnByb3RvdHlwZS5jb25jYXQpO1xudmFyICRzcGxpY2VBcHBseSA9IGJpbmQuY2FsbChGdW5jdGlvbi5hcHBseSwgQXJyYXkucHJvdG90eXBlLnNwbGljZSk7XG52YXIgJHJlcGxhY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlKTtcbnZhciAkc3RyU2xpY2UgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgU3RyaW5nLnByb3RvdHlwZS5zbGljZSk7XG52YXIgJGV4ZWMgPSBiaW5kLmNhbGwoRnVuY3Rpb24uY2FsbCwgUmVnRXhwLnByb3RvdHlwZS5leGVjKTtcblxuLyogYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9sb2Rhc2gvbG9kYXNoL2Jsb2IvNC4xNy4xNS9kaXN0L2xvZGFzaC5qcyNMNjczNS1MNjc0NCAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14lLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KD86XFwufFxcW1xcXSkoPzpcXC58XFxbXFxdfCUkKSkvZztcbnZhciByZUVzY2FwZUNoYXIgPSAvXFxcXChcXFxcKT8vZzsgLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgc3RyaW5nVG9QYXRoID0gZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuXHR2YXIgZmlyc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAwLCAxKTtcblx0dmFyIGxhc3QgPSAkc3RyU2xpY2Uoc3RyaW5nLCAtMSk7XG5cdGlmIChmaXJzdCA9PT0gJyUnICYmIGxhc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgY2xvc2luZyBgJWAnKTtcblx0fSBlbHNlIGlmIChsYXN0ID09PSAnJScgJiYgZmlyc3QgIT09ICclJykge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludmFsaWQgaW50cmluc2ljIHN5bnRheCwgZXhwZWN0ZWQgb3BlbmluZyBgJWAnKTtcblx0fVxuXHR2YXIgcmVzdWx0ID0gW107XG5cdCRyZXBsYWNlKHN0cmluZywgcmVQcm9wTmFtZSwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcblx0XHRyZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBxdW90ZSA/ICRyZXBsYWNlKHN1YlN0cmluZywgcmVFc2NhcGVDaGFyLCAnJDEnKSA6IG51bWJlciB8fCBtYXRjaDtcblx0fSk7XG5cdHJldHVybiByZXN1bHQ7XG59O1xuLyogZW5kIGFkYXB0YXRpb24gKi9cblxudmFyIGdldEJhc2VJbnRyaW5zaWMgPSBmdW5jdGlvbiBnZXRCYXNlSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljTmFtZSA9IG5hbWU7XG5cdHZhciBhbGlhcztcblx0aWYgKGhhc093bihMRUdBQ1lfQUxJQVNFUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHRhbGlhcyA9IExFR0FDWV9BTElBU0VTW2ludHJpbnNpY05hbWVdO1xuXHRcdGludHJpbnNpY05hbWUgPSAnJScgKyBhbGlhc1swXSArICclJztcblx0fVxuXG5cdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljTmFtZSkpIHtcblx0XHR2YXIgdmFsdWUgPSBJTlRSSU5TSUNTW2ludHJpbnNpY05hbWVdO1xuXHRcdGlmICh2YWx1ZSA9PT0gbmVlZHNFdmFsKSB7XG5cdFx0XHR2YWx1ZSA9IGRvRXZhbChpbnRyaW5zaWNOYW1lKTtcblx0XHR9XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcgJiYgIWFsbG93TWlzc2luZykge1xuXHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZXhpc3RzLCBidXQgaXMgbm90IGF2YWlsYWJsZS4gUGxlYXNlIGZpbGUgYW4gaXNzdWUhJyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdGFsaWFzOiBhbGlhcyxcblx0XHRcdG5hbWU6IGludHJpbnNpY05hbWUsXG5cdFx0XHR2YWx1ZTogdmFsdWVcblx0XHR9O1xuXHR9XG5cblx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignaW50cmluc2ljICcgKyBuYW1lICsgJyBkb2VzIG5vdCBleGlzdCEnKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gR2V0SW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnIHx8IG5hbWUubGVuZ3RoID09PSAwKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2ludHJpbnNpYyBuYW1lIG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIHR5cGVvZiBhbGxvd01pc3NpbmcgIT09ICdib29sZWFuJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdcImFsbG93TWlzc2luZ1wiIGFyZ3VtZW50IG11c3QgYmUgYSBib29sZWFuJyk7XG5cdH1cblxuXHRpZiAoJGV4ZWMoL14lP1teJV0qJT8kL2csIG5hbWUpID09PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignYCVgIG1heSBub3QgYmUgcHJlc2VudCBhbnl3aGVyZSBidXQgYXQgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIHRoZSBpbnRyaW5zaWMgbmFtZScpO1xuXHR9XG5cdHZhciBwYXJ0cyA9IHN0cmluZ1RvUGF0aChuYW1lKTtcblx0dmFyIGludHJpbnNpY0Jhc2VOYW1lID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzWzBdIDogJyc7XG5cblx0dmFyIGludHJpbnNpYyA9IGdldEJhc2VJbnRyaW5zaWMoJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJScsIGFsbG93TWlzc2luZyk7XG5cdHZhciBpbnRyaW5zaWNSZWFsTmFtZSA9IGludHJpbnNpYy5uYW1lO1xuXHR2YXIgdmFsdWUgPSBpbnRyaW5zaWMudmFsdWU7XG5cdHZhciBza2lwRnVydGhlckNhY2hpbmcgPSBmYWxzZTtcblxuXHR2YXIgYWxpYXMgPSBpbnRyaW5zaWMuYWxpYXM7XG5cdGlmIChhbGlhcykge1xuXHRcdGludHJpbnNpY0Jhc2VOYW1lID0gYWxpYXNbMF07XG5cdFx0JHNwbGljZUFwcGx5KHBhcnRzLCAkY29uY2F0KFswLCAxXSwgYWxpYXMpKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAxLCBpc093biA9IHRydWU7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBwYXJ0ID0gcGFydHNbaV07XG5cdFx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHBhcnQsIDAsIDEpO1xuXHRcdHZhciBsYXN0ID0gJHN0clNsaWNlKHBhcnQsIC0xKTtcblx0XHRpZiAoXG5cdFx0XHQoXG5cdFx0XHRcdChmaXJzdCA9PT0gJ1wiJyB8fCBmaXJzdCA9PT0gXCInXCIgfHwgZmlyc3QgPT09ICdgJylcblx0XHRcdFx0fHwgKGxhc3QgPT09ICdcIicgfHwgbGFzdCA9PT0gXCInXCIgfHwgbGFzdCA9PT0gJ2AnKVxuXHRcdFx0KVxuXHRcdFx0JiYgZmlyc3QgIT09IGxhc3Rcblx0XHQpIHtcblx0XHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ3Byb3BlcnR5IG5hbWVzIHdpdGggcXVvdGVzIG11c3QgaGF2ZSBtYXRjaGluZyBxdW90ZXMnKTtcblx0XHR9XG5cdFx0aWYgKHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHwgIWlzT3duKSB7XG5cdFx0XHRza2lwRnVydGhlckNhY2hpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGludHJpbnNpY0Jhc2VOYW1lICs9ICcuJyArIHBhcnQ7XG5cdFx0aW50cmluc2ljUmVhbE5hbWUgPSAnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJztcblxuXHRcdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljUmVhbE5hbWUpKSB7XG5cdFx0XHR2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0aWYgKCEocGFydCBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKCFhbGxvd01pc3NpbmcpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdm9pZCB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJGdPUEQgJiYgKGkgKyAxKSA+PSBwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGRlc2MgPSAkZ09QRCh2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdGlzT3duID0gISFkZXNjO1xuXG5cdFx0XHRcdC8vIEJ5IGNvbnZlbnRpb24sIHdoZW4gYSBkYXRhIHByb3BlcnR5IGlzIGNvbnZlcnRlZCB0byBhbiBhY2Nlc3NvclxuXHRcdFx0XHQvLyBwcm9wZXJ0eSB0byBlbXVsYXRlIGEgZGF0YSBwcm9wZXJ0eSB0aGF0IGRvZXMgbm90IHN1ZmZlciBmcm9tXG5cdFx0XHRcdC8vIHRoZSBvdmVycmlkZSBtaXN0YWtlLCB0aGF0IGFjY2Vzc29yJ3MgZ2V0dGVyIGlzIG1hcmtlZCB3aXRoXG5cdFx0XHRcdC8vIGFuIGBvcmlnaW5hbFZhbHVlYCBwcm9wZXJ0eS4gSGVyZSwgd2hlbiB3ZSBkZXRlY3QgdGhpcywgd2Vcblx0XHRcdFx0Ly8gdXBob2xkIHRoZSBpbGx1c2lvbiBieSBwcmV0ZW5kaW5nIHRvIHNlZSB0aGF0IG9yaWdpbmFsIGRhdGFcblx0XHRcdFx0Ly8gcHJvcGVydHksIGkuZS4sIHJldHVybmluZyB0aGUgdmFsdWUgcmF0aGVyIHRoYW4gdGhlIGdldHRlclxuXHRcdFx0XHQvLyBpdHNlbGYuXG5cdFx0XHRcdGlmIChpc093biAmJiAnZ2V0JyBpbiBkZXNjICYmICEoJ29yaWdpbmFsVmFsdWUnIGluIGRlc2MuZ2V0KSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGVzYy5nZXQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXNPd24gPSBoYXNPd24odmFsdWUsIHBhcnQpO1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNPd24gJiYgIXNraXBGdXJ0aGVyQ2FjaGluZykge1xuXHRcdFx0XHRJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG5cbnZhciAkYXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHklJyk7XG52YXIgJGNhbGwgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCUnKTtcbnZhciAkcmVmbGVjdEFwcGx5ID0gR2V0SW50cmluc2ljKCclUmVmbGVjdC5hcHBseSUnLCB0cnVlKSB8fCBiaW5kLmNhbGwoJGNhbGwsICRhcHBseSk7XG5cbnZhciAkZ09QRCA9IEdldEludHJpbnNpYygnJU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IlJywgdHJ1ZSk7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmRlZmluZVByb3BlcnR5JScsIHRydWUpO1xudmFyICRtYXggPSBHZXRJbnRyaW5zaWMoJyVNYXRoLm1heCUnKTtcblxuaWYgKCRkZWZpbmVQcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdCRkZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IHZhbHVlOiAxIH0pO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0Ly8gSUUgOCBoYXMgYSBicm9rZW4gZGVmaW5lUHJvcGVydHlcblx0XHQkZGVmaW5lUHJvcGVydHkgPSBudWxsO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQob3JpZ2luYWxGdW5jdGlvbikge1xuXHR2YXIgZnVuYyA9ICRyZWZsZWN0QXBwbHkoYmluZCwgJGNhbGwsIGFyZ3VtZW50cyk7XG5cdGlmICgkZ09QRCAmJiAkZGVmaW5lUHJvcGVydHkpIHtcblx0XHR2YXIgZGVzYyA9ICRnT1BEKGZ1bmMsICdsZW5ndGgnKTtcblx0XHRpZiAoZGVzYy5jb25maWd1cmFibGUpIHtcblx0XHRcdC8vIG9yaWdpbmFsIGxlbmd0aCwgcGx1cyB0aGUgcmVjZWl2ZXIsIG1pbnVzIGFueSBhZGRpdGlvbmFsIGFyZ3VtZW50cyAoYWZ0ZXIgdGhlIHJlY2VpdmVyKVxuXHRcdFx0JGRlZmluZVByb3BlcnR5KFxuXHRcdFx0XHRmdW5jLFxuXHRcdFx0XHQnbGVuZ3RoJyxcblx0XHRcdFx0eyB2YWx1ZTogMSArICRtYXgoMCwgb3JpZ2luYWxGdW5jdGlvbi5sZW5ndGggLSAoYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB9XG5cdFx0XHQpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gZnVuYztcbn07XG5cbnZhciBhcHBseUJpbmQgPSBmdW5jdGlvbiBhcHBseUJpbmQoKSB7XG5cdHJldHVybiAkcmVmbGVjdEFwcGx5KGJpbmQsICRhcHBseSwgYXJndW1lbnRzKTtcbn07XG5cbmlmICgkZGVmaW5lUHJvcGVydHkpIHtcblx0JGRlZmluZVByb3BlcnR5KG1vZHVsZS5leHBvcnRzLCAnYXBwbHknLCB7IHZhbHVlOiBhcHBseUJpbmQgfSk7XG59IGVsc2Uge1xuXHRtb2R1bGUuZXhwb3J0cy5hcHBseSA9IGFwcGx5QmluZDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyIGNhbGxCaW5kID0gcmVxdWlyZSgnLi8nKTtcblxudmFyICRpbmRleE9mID0gY2FsbEJpbmQoR2V0SW50cmluc2ljKCdTdHJpbmcucHJvdG90eXBlLmluZGV4T2YnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJvdW5kSW50cmluc2ljKG5hbWUsIGFsbG93TWlzc2luZykge1xuXHR2YXIgaW50cmluc2ljID0gR2V0SW50cmluc2ljKG5hbWUsICEhYWxsb3dNaXNzaW5nKTtcblx0aWYgKHR5cGVvZiBpbnRyaW5zaWMgPT09ICdmdW5jdGlvbicgJiYgJGluZGV4T2YobmFtZSwgJy5wcm90b3R5cGUuJykgPiAtMSkge1xuXHRcdHJldHVybiBjYWxsQmluZChpbnRyaW5zaWMpO1xuXHR9XG5cdHJldHVybiBpbnRyaW5zaWM7XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQge30iLCJ2YXIgaGFzTWFwID0gdHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBNYXAucHJvdG90eXBlO1xudmFyIG1hcFNpemVEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBoYXNNYXAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE1hcC5wcm90b3R5cGUsICdzaXplJykgOiBudWxsO1xudmFyIG1hcFNpemUgPSBoYXNNYXAgJiYgbWFwU2l6ZURlc2NyaXB0b3IgJiYgdHlwZW9mIG1hcFNpemVEZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJyA/IG1hcFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XG52YXIgbWFwRm9yRWFjaCA9IGhhc01hcCAmJiBNYXAucHJvdG90eXBlLmZvckVhY2g7XG52YXIgaGFzU2V0ID0gdHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBTZXQucHJvdG90eXBlO1xudmFyIHNldFNpemVEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBoYXNTZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFNldC5wcm90b3R5cGUsICdzaXplJykgOiBudWxsO1xudmFyIHNldFNpemUgPSBoYXNTZXQgJiYgc2V0U2l6ZURlc2NyaXB0b3IgJiYgdHlwZW9mIHNldFNpemVEZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJyA/IHNldFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XG52YXIgc2V0Rm9yRWFjaCA9IGhhc1NldCAmJiBTZXQucHJvdG90eXBlLmZvckVhY2g7XG52YXIgaGFzV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIFdlYWtNYXAucHJvdG90eXBlO1xudmFyIHdlYWtNYXBIYXMgPSBoYXNXZWFrTWFwID8gV2Vha01hcC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbnZhciBoYXNXZWFrU2V0ID0gdHlwZW9mIFdlYWtTZXQgPT09ICdmdW5jdGlvbicgJiYgV2Vha1NldC5wcm90b3R5cGU7XG52YXIgd2Vha1NldEhhcyA9IGhhc1dlYWtTZXQgPyBXZWFrU2V0LnByb3RvdHlwZS5oYXMgOiBudWxsO1xudmFyIGhhc1dlYWtSZWYgPSB0eXBlb2YgV2Vha1JlZiA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrUmVmLnByb3RvdHlwZTtcbnZhciB3ZWFrUmVmRGVyZWYgPSBoYXNXZWFrUmVmID8gV2Vha1JlZi5wcm90b3R5cGUuZGVyZWYgOiBudWxsO1xudmFyIGJvb2xlYW5WYWx1ZU9mID0gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZjtcbnZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciAkbWF0Y2ggPSBTdHJpbmcucHJvdG90eXBlLm1hdGNoO1xudmFyICRzbGljZSA9IFN0cmluZy5wcm90b3R5cGUuc2xpY2U7XG52YXIgJHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgJHRvVXBwZXJDYXNlID0gU3RyaW5nLnByb3RvdHlwZS50b1VwcGVyQ2FzZTtcbnZhciAkdG9Mb3dlckNhc2UgPSBTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlO1xudmFyICR0ZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xudmFyICRjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xudmFyICRqb2luID0gQXJyYXkucHJvdG90eXBlLmpvaW47XG52YXIgJGFyclNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyICRmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgYmlnSW50VmFsdWVPZiA9IHR5cGVvZiBCaWdJbnQgPT09ICdmdW5jdGlvbicgPyBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YgOiBudWxsO1xudmFyIGdPUFMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIHN5bVRvU3RyaW5nID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJyA/IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgOiBudWxsO1xudmFyIGhhc1NoYW1tZWRTeW1ib2xzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnb2JqZWN0Jztcbi8vIGllLCBgaGFzLXRvc3RyaW5ndGFnL3NoYW1zXG52YXIgdG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC50b1N0cmluZ1RhZyAmJiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gaGFzU2hhbW1lZFN5bWJvbHMgPyAnb2JqZWN0JyA6ICdzeW1ib2wnKVxuICAgID8gU3ltYm9sLnRvU3RyaW5nVGFnXG4gICAgOiBudWxsO1xudmFyIGlzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbnZhciBnUE8gPSAodHlwZW9mIFJlZmxlY3QgPT09ICdmdW5jdGlvbicgPyBSZWZsZWN0LmdldFByb3RvdHlwZU9mIDogT2JqZWN0LmdldFByb3RvdHlwZU9mKSB8fCAoXG4gICAgW10uX19wcm90b19fID09PSBBcnJheS5wcm90b3R5cGUgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuICAgICAgICA/IGZ1bmN0aW9uIChPKSB7XG4gICAgICAgICAgICByZXR1cm4gTy5fX3Byb3RvX187IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cbiAgICAgICAgfVxuICAgICAgICA6IG51bGxcbik7XG5cbmZ1bmN0aW9uIGFkZE51bWVyaWNTZXBhcmF0b3IobnVtLCBzdHIpIHtcbiAgICBpZiAoXG4gICAgICAgIG51bSA9PT0gSW5maW5pdHlcbiAgICAgICAgfHwgbnVtID09PSAtSW5maW5pdHlcbiAgICAgICAgfHwgbnVtICE9PSBudW1cbiAgICAgICAgfHwgKG51bSAmJiBudW0gPiAtMTAwMCAmJiBudW0gPCAxMDAwKVxuICAgICAgICB8fCAkdGVzdC5jYWxsKC9lLywgc3RyKVxuICAgICkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICB2YXIgc2VwUmVnZXggPSAvWzAtOV0oPz0oPzpbMC05XXszfSkrKD8hWzAtOV0pKS9nO1xuICAgIGlmICh0eXBlb2YgbnVtID09PSAnbnVtYmVyJykge1xuICAgICAgICB2YXIgaW50ID0gbnVtIDwgMCA/IC0kZmxvb3IoLW51bSkgOiAkZmxvb3IobnVtKTsgLy8gdHJ1bmMobnVtKVxuICAgICAgICBpZiAoaW50ICE9PSBudW0pIHtcbiAgICAgICAgICAgIHZhciBpbnRTdHIgPSBTdHJpbmcoaW50KTtcbiAgICAgICAgICAgIHZhciBkZWMgPSAkc2xpY2UuY2FsbChzdHIsIGludFN0ci5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKGludFN0ciwgc2VwUmVnZXgsICckJl8nKSArICcuJyArICRyZXBsYWNlLmNhbGwoJHJlcGxhY2UuY2FsbChkZWMsIC8oWzAtOV17M30pL2csICckJl8nKSwgL18kLywgJycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKHN0ciwgc2VwUmVnZXgsICckJl8nKTtcbn1cblxudmFyIHV0aWxJbnNwZWN0ID0gcmVxdWlyZSgnLi91dGlsLmluc3BlY3QnKTtcbnZhciBpbnNwZWN0Q3VzdG9tID0gdXRpbEluc3BlY3QuY3VzdG9tO1xudmFyIGluc3BlY3RTeW1ib2wgPSBpc1N5bWJvbChpbnNwZWN0Q3VzdG9tKSA/IGluc3BlY3RDdXN0b20gOiBudWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluc3BlY3RfKG9iaiwgb3B0aW9ucywgZGVwdGgsIHNlZW4pIHtcbiAgICB2YXIgb3B0cyA9IG9wdGlvbnMgfHwge307XG5cbiAgICBpZiAoaGFzKG9wdHMsICdxdW90ZVN0eWxlJykgJiYgKG9wdHMucXVvdGVTdHlsZSAhPT0gJ3NpbmdsZScgJiYgb3B0cy5xdW90ZVN0eWxlICE9PSAnZG91YmxlJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwicXVvdGVTdHlsZVwiIG11c3QgYmUgXCJzaW5nbGVcIiBvciBcImRvdWJsZVwiJyk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICAgaGFzKG9wdHMsICdtYXhTdHJpbmdMZW5ndGgnKSAmJiAodHlwZW9mIG9wdHMubWF4U3RyaW5nTGVuZ3RoID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgPyBvcHRzLm1heFN0cmluZ0xlbmd0aCA8IDAgJiYgb3B0cy5tYXhTdHJpbmdMZW5ndGggIT09IEluZmluaXR5XG4gICAgICAgICAgICA6IG9wdHMubWF4U3RyaW5nTGVuZ3RoICE9PSBudWxsXG4gICAgICAgIClcbiAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwibWF4U3RyaW5nTGVuZ3RoXCIsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgcG9zaXRpdmUgaW50ZWdlciwgSW5maW5pdHksIG9yIGBudWxsYCcpO1xuICAgIH1cbiAgICB2YXIgY3VzdG9tSW5zcGVjdCA9IGhhcyhvcHRzLCAnY3VzdG9tSW5zcGVjdCcpID8gb3B0cy5jdXN0b21JbnNwZWN0IDogdHJ1ZTtcbiAgICBpZiAodHlwZW9mIGN1c3RvbUluc3BlY3QgIT09ICdib29sZWFuJyAmJiBjdXN0b21JbnNwZWN0ICE9PSAnc3ltYm9sJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJjdXN0b21JbnNwZWN0XCIsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGB0cnVlYCwgYGZhbHNlYCwgb3IgYFxcJ3N5bWJvbFxcJ2AnKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAgIGhhcyhvcHRzLCAnaW5kZW50JylcbiAgICAgICAgJiYgb3B0cy5pbmRlbnQgIT09IG51bGxcbiAgICAgICAgJiYgb3B0cy5pbmRlbnQgIT09ICdcXHQnXG4gICAgICAgICYmICEocGFyc2VJbnQob3B0cy5pbmRlbnQsIDEwKSA9PT0gb3B0cy5pbmRlbnQgJiYgb3B0cy5pbmRlbnQgPiAwKVxuICAgICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJpbmRlbnRcIiBtdXN0IGJlIFwiXFxcXHRcIiwgYW4gaW50ZWdlciA+IDAsIG9yIGBudWxsYCcpO1xuICAgIH1cbiAgICBpZiAoaGFzKG9wdHMsICdudW1lcmljU2VwYXJhdG9yJykgJiYgdHlwZW9mIG9wdHMubnVtZXJpY1NlcGFyYXRvciAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcIm51bWVyaWNTZXBhcmF0b3JcIiwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYHRydWVgIG9yIGBmYWxzZWAnKTtcbiAgICB9XG4gICAgdmFyIG51bWVyaWNTZXBhcmF0b3IgPSBvcHRzLm51bWVyaWNTZXBhcmF0b3I7XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIH1cbiAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIG9iaiA/ICd0cnVlJyA6ICdmYWxzZSc7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBpbnNwZWN0U3RyaW5nKG9iaiwgb3B0cyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnbnVtYmVyJykge1xuICAgICAgICBpZiAob2JqID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gSW5maW5pdHkgLyBvYmogPiAwID8gJzAnIDogJy0wJztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RyID0gU3RyaW5nKG9iaik7XG4gICAgICAgIHJldHVybiBudW1lcmljU2VwYXJhdG9yID8gYWRkTnVtZXJpY1NlcGFyYXRvcihvYmosIHN0cikgOiBzdHI7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnYmlnaW50Jykge1xuICAgICAgICB2YXIgYmlnSW50U3RyID0gU3RyaW5nKG9iaikgKyAnbic7XG4gICAgICAgIHJldHVybiBudW1lcmljU2VwYXJhdG9yID8gYWRkTnVtZXJpY1NlcGFyYXRvcihvYmosIGJpZ0ludFN0cikgOiBiaWdJbnRTdHI7XG4gICAgfVxuXG4gICAgdmFyIG1heERlcHRoID0gdHlwZW9mIG9wdHMuZGVwdGggPT09ICd1bmRlZmluZWQnID8gNSA6IG9wdHMuZGVwdGg7XG4gICAgaWYgKHR5cGVvZiBkZXB0aCA9PT0gJ3VuZGVmaW5lZCcpIHsgZGVwdGggPSAwOyB9XG4gICAgaWYgKGRlcHRoID49IG1heERlcHRoICYmIG1heERlcHRoID4gMCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gaXNBcnJheShvYmopID8gJ1tBcnJheV0nIDogJ1tPYmplY3RdJztcbiAgICB9XG5cbiAgICB2YXIgaW5kZW50ID0gZ2V0SW5kZW50KG9wdHMsIGRlcHRoKTtcblxuICAgIGlmICh0eXBlb2Ygc2VlbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2VlbiA9IFtdO1xuICAgIH0gZWxzZSBpZiAoaW5kZXhPZihzZWVuLCBvYmopID49IDApIHtcbiAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnNwZWN0KHZhbHVlLCBmcm9tLCBub0luZGVudCkge1xuICAgICAgICBpZiAoZnJvbSkge1xuICAgICAgICAgICAgc2VlbiA9ICRhcnJTbGljZS5jYWxsKHNlZW4pO1xuICAgICAgICAgICAgc2Vlbi5wdXNoKGZyb20pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub0luZGVudCkge1xuICAgICAgICAgICAgdmFyIG5ld09wdHMgPSB7XG4gICAgICAgICAgICAgICAgZGVwdGg6IG9wdHMuZGVwdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaGFzKG9wdHMsICdxdW90ZVN0eWxlJykpIHtcbiAgICAgICAgICAgICAgICBuZXdPcHRzLnF1b3RlU3R5bGUgPSBvcHRzLnF1b3RlU3R5bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5zcGVjdF8odmFsdWUsIG5ld09wdHMsIGRlcHRoICsgMSwgc2Vlbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluc3BlY3RfKHZhbHVlLCBvcHRzLCBkZXB0aCArIDEsIHNlZW4pO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nICYmICFpc1JlZ0V4cChvYmopKSB7IC8vIGluIG9sZGVyIGVuZ2luZXMsIHJlZ2V4ZXMgYXJlIGNhbGxhYmxlXG4gICAgICAgIHZhciBuYW1lID0gbmFtZU9mKG9iaik7XG4gICAgICAgIHZhciBrZXlzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICByZXR1cm4gJ1tGdW5jdGlvbicgKyAobmFtZSA/ICc6ICcgKyBuYW1lIDogJyAoYW5vbnltb3VzKScpICsgJ10nICsgKGtleXMubGVuZ3RoID4gMCA/ICcgeyAnICsgJGpvaW4uY2FsbChrZXlzLCAnLCAnKSArICcgfScgOiAnJyk7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChvYmopKSB7XG4gICAgICAgIHZhciBzeW1TdHJpbmcgPSBoYXNTaGFtbWVkU3ltYm9scyA/ICRyZXBsYWNlLmNhbGwoU3RyaW5nKG9iaiksIC9eKFN5bWJvbFxcKC4qXFwpKV9bXildKiQvLCAnJDEnKSA6IHN5bVRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICFoYXNTaGFtbWVkU3ltYm9scyA/IG1hcmtCb3hlZChzeW1TdHJpbmcpIDogc3ltU3RyaW5nO1xuICAgIH1cbiAgICBpZiAoaXNFbGVtZW50KG9iaikpIHtcbiAgICAgICAgdmFyIHMgPSAnPCcgKyAkdG9Mb3dlckNhc2UuY2FsbChTdHJpbmcob2JqLm5vZGVOYW1lKSk7XG4gICAgICAgIHZhciBhdHRycyA9IG9iai5hdHRyaWJ1dGVzIHx8IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGF0dHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzICs9ICcgJyArIGF0dHJzW2ldLm5hbWUgKyAnPScgKyB3cmFwUXVvdGVzKHF1b3RlKGF0dHJzW2ldLnZhbHVlKSwgJ2RvdWJsZScsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIHMgKz0gJz4nO1xuICAgICAgICBpZiAob2JqLmNoaWxkTm9kZXMgJiYgb2JqLmNoaWxkTm9kZXMubGVuZ3RoKSB7IHMgKz0gJy4uLic7IH1cbiAgICAgICAgcyArPSAnPC8nICsgJHRvTG93ZXJDYXNlLmNhbGwoU3RyaW5nKG9iai5ub2RlTmFtZSkpICsgJz4nO1xuICAgICAgICByZXR1cm4gcztcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICBpZiAob2JqLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJ1tdJzsgfVxuICAgICAgICB2YXIgeHMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIGlmIChpbmRlbnQgJiYgIXNpbmdsZUxpbmVWYWx1ZXMoeHMpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1snICsgaW5kZW50ZWRKb2luKHhzLCBpbmRlbnQpICsgJ10nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnWyAnICsgJGpvaW4uY2FsbCh4cywgJywgJykgKyAnIF0nO1xuICAgIH1cbiAgICBpZiAoaXNFcnJvcihvYmopKSB7XG4gICAgICAgIHZhciBwYXJ0cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0KTtcbiAgICAgICAgaWYgKCEoJ2NhdXNlJyBpbiBFcnJvci5wcm90b3R5cGUpICYmICdjYXVzZScgaW4gb2JqICYmICFpc0VudW1lcmFibGUuY2FsbChvYmosICdjYXVzZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3sgWycgKyBTdHJpbmcob2JqKSArICddICcgKyAkam9pbi5jYWxsKCRjb25jYXQuY2FsbCgnW2NhdXNlXTogJyArIGluc3BlY3Qob2JqLmNhdXNlKSwgcGFydHMpLCAnLCAnKSArICcgfSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJ1snICsgU3RyaW5nKG9iaikgKyAnXSc7IH1cbiAgICAgICAgcmV0dXJuICd7IFsnICsgU3RyaW5nKG9iaikgKyAnXSAnICsgJGpvaW4uY2FsbChwYXJ0cywgJywgJykgKyAnIH0nO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgY3VzdG9tSW5zcGVjdCkge1xuICAgICAgICBpZiAoaW5zcGVjdFN5bWJvbCAmJiB0eXBlb2Ygb2JqW2luc3BlY3RTeW1ib2xdID09PSAnZnVuY3Rpb24nICYmIHV0aWxJbnNwZWN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdXRpbEluc3BlY3Qob2JqLCB7IGRlcHRoOiBtYXhEZXB0aCAtIGRlcHRoIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbUluc3BlY3QgIT09ICdzeW1ib2wnICYmIHR5cGVvZiBvYmouaW5zcGVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIG9iai5pbnNwZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzTWFwKG9iaikpIHtcbiAgICAgICAgdmFyIG1hcFBhcnRzID0gW107XG4gICAgICAgIG1hcEZvckVhY2guY2FsbChvYmosIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBtYXBQYXJ0cy5wdXNoKGluc3BlY3Qoa2V5LCBvYmosIHRydWUpICsgJyA9PiAnICsgaW5zcGVjdCh2YWx1ZSwgb2JqKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbk9mKCdNYXAnLCBtYXBTaXplLmNhbGwob2JqKSwgbWFwUGFydHMsIGluZGVudCk7XG4gICAgfVxuICAgIGlmIChpc1NldChvYmopKSB7XG4gICAgICAgIHZhciBzZXRQYXJ0cyA9IFtdO1xuICAgICAgICBzZXRGb3JFYWNoLmNhbGwob2JqLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHNldFBhcnRzLnB1c2goaW5zcGVjdCh2YWx1ZSwgb2JqKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29sbGVjdGlvbk9mKCdTZXQnLCBzZXRTaXplLmNhbGwob2JqKSwgc2V0UGFydHMsIGluZGVudCk7XG4gICAgfVxuICAgIGlmIChpc1dlYWtNYXAob2JqKSkge1xuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZignV2Vha01hcCcpO1xuICAgIH1cbiAgICBpZiAoaXNXZWFrU2V0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoJ1dlYWtTZXQnKTtcbiAgICB9XG4gICAgaWYgKGlzV2Vha1JlZihvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKCdXZWFrUmVmJyk7XG4gICAgfVxuICAgIGlmIChpc051bWJlcihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoaW5zcGVjdChOdW1iZXIob2JqKSkpO1xuICAgIH1cbiAgICBpZiAoaXNCaWdJbnQob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QoYmlnSW50VmFsdWVPZi5jYWxsKG9iaikpKTtcbiAgICB9XG4gICAgaWYgKGlzQm9vbGVhbihvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoYm9vbGVhblZhbHVlT2YuY2FsbChvYmopKTtcbiAgICB9XG4gICAgaWYgKGlzU3RyaW5nKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0KFN0cmluZyhvYmopKSk7XG4gICAgfVxuICAgIGlmICghaXNEYXRlKG9iaikgJiYgIWlzUmVnRXhwKG9iaikpIHtcbiAgICAgICAgdmFyIHlzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICB2YXIgaXNQbGFpbk9iamVjdCA9IGdQTyA/IGdQTyhvYmopID09PSBPYmplY3QucHJvdG90eXBlIDogb2JqIGluc3RhbmNlb2YgT2JqZWN0IHx8IG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgICAgICB2YXIgcHJvdG9UYWcgPSBvYmogaW5zdGFuY2VvZiBPYmplY3QgPyAnJyA6ICdudWxsIHByb3RvdHlwZSc7XG4gICAgICAgIHZhciBzdHJpbmdUYWcgPSAhaXNQbGFpbk9iamVjdCAmJiB0b1N0cmluZ1RhZyAmJiBPYmplY3Qob2JqKSA9PT0gb2JqICYmIHRvU3RyaW5nVGFnIGluIG9iaiA/ICRzbGljZS5jYWxsKHRvU3RyKG9iaiksIDgsIC0xKSA6IHByb3RvVGFnID8gJ09iamVjdCcgOiAnJztcbiAgICAgICAgdmFyIGNvbnN0cnVjdG9yVGFnID0gaXNQbGFpbk9iamVjdCB8fCB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yICE9PSAnZnVuY3Rpb24nID8gJycgOiBvYmouY29uc3RydWN0b3IubmFtZSA/IG9iai5jb25zdHJ1Y3Rvci5uYW1lICsgJyAnIDogJyc7XG4gICAgICAgIHZhciB0YWcgPSBjb25zdHJ1Y3RvclRhZyArIChzdHJpbmdUYWcgfHwgcHJvdG9UYWcgPyAnWycgKyAkam9pbi5jYWxsKCRjb25jYXQuY2FsbChbXSwgc3RyaW5nVGFnIHx8IFtdLCBwcm90b1RhZyB8fCBbXSksICc6ICcpICsgJ10gJyA6ICcnKTtcbiAgICAgICAgaWYgKHlzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gdGFnICsgJ3t9JzsgfVxuICAgICAgICBpZiAoaW5kZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGFnICsgJ3snICsgaW5kZW50ZWRKb2luKHlzLCBpbmRlbnQpICsgJ30nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YWcgKyAneyAnICsgJGpvaW4uY2FsbCh5cywgJywgJykgKyAnIH0nO1xuICAgIH1cbiAgICByZXR1cm4gU3RyaW5nKG9iaik7XG59O1xuXG5mdW5jdGlvbiB3cmFwUXVvdGVzKHMsIGRlZmF1bHRTdHlsZSwgb3B0cykge1xuICAgIHZhciBxdW90ZUNoYXIgPSAob3B0cy5xdW90ZVN0eWxlIHx8IGRlZmF1bHRTdHlsZSkgPT09ICdkb3VibGUnID8gJ1wiJyA6IFwiJ1wiO1xuICAgIHJldHVybiBxdW90ZUNoYXIgKyBzICsgcXVvdGVDaGFyO1xufVxuXG5mdW5jdGlvbiBxdW90ZShzKSB7XG4gICAgcmV0dXJuICRyZXBsYWNlLmNhbGwoU3RyaW5nKHMpLCAvXCIvZywgJyZxdW90OycpO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzRGF0ZShvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IERhdGVdJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzUmVnRXhwKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc0Vycm9yKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgRXJyb3JdJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgU3RyaW5nXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc051bWJlcihvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IE51bWJlcl0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNCb29sZWFuKG9iaikgeyByZXR1cm4gdG9TdHIob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuXG4vLyBTeW1ib2wgYW5kIEJpZ0ludCBkbyBoYXZlIFN5bWJvbC50b1N0cmluZ1RhZyBieSBzcGVjLCBzbyB0aGF0IGNhbid0IGJlIHVzZWQgdG8gZWxpbWluYXRlIGZhbHNlIHBvc2l0aXZlc1xuZnVuY3Rpb24gaXNTeW1ib2wob2JqKSB7XG4gICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgb2JqIGluc3RhbmNlb2YgU3ltYm9sO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8ICFzeW1Ub1N0cmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHN5bVRvU3RyaW5nLmNhbGwob2JqKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzQmlnSW50KG9iaikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8ICFiaWdJbnRWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgYmlnSW50VmFsdWVPZi5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSB8fCBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBrZXkgaW4gdGhpczsgfTtcbmZ1bmN0aW9uIGhhcyhvYmosIGtleSkge1xuICAgIHJldHVybiBoYXNPd24uY2FsbChvYmosIGtleSk7XG59XG5cbmZ1bmN0aW9uIHRvU3RyKG9iaikge1xuICAgIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKG9iaik7XG59XG5cbmZ1bmN0aW9uIG5hbWVPZihmKSB7XG4gICAgaWYgKGYubmFtZSkgeyByZXR1cm4gZi5uYW1lOyB9XG4gICAgdmFyIG0gPSAkbWF0Y2guY2FsbChmdW5jdGlvblRvU3RyaW5nLmNhbGwoZiksIC9eZnVuY3Rpb25cXHMqKFtcXHckXSspLyk7XG4gICAgaWYgKG0pIHsgcmV0dXJuIG1bMV07IH1cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gaW5kZXhPZih4cywgeCkge1xuICAgIGlmICh4cy5pbmRleE9mKSB7IHJldHVybiB4cy5pbmRleE9mKHgpOyB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB4cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgaWYgKHhzW2ldID09PSB4KSB7IHJldHVybiBpOyB9XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gaXNNYXAoeCkge1xuICAgIGlmICghbWFwU2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzZXRTaXplLmNhbGwoeCk7XG4gICAgICAgIH0gY2F0Y2ggKHMpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgTWFwOyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNXZWFrTWFwKHgpIHtcbiAgICBpZiAoIXdlYWtNYXBIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdlYWtNYXA7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc1dlYWtSZWYoeCkge1xuICAgIGlmICghd2Vha1JlZkRlcmVmIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHdlYWtSZWZEZXJlZi5jYWxsKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNTZXQoeCkge1xuICAgIGlmICghc2V0U2l6ZSB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBzZXRTaXplLmNhbGwoeCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtYXBTaXplLmNhbGwoeCk7XG4gICAgICAgIH0gY2F0Y2ggKG0pIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB4IGluc3RhbmNlb2YgU2V0OyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcbiAgICBpZiAoIXdlYWtTZXRIYXMgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgd2Vha1NldEhhcy5jYWxsKHgsIHdlYWtTZXRIYXMpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgd2Vha01hcEhhcy5jYWxsKHgsIHdlYWtNYXBIYXMpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFdlYWtTZXQ7IC8vIGNvcmUtanMgd29ya2Fyb3VuZCwgcHJlLXYyLjUuMFxuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0VsZW1lbnQoeCkge1xuICAgIGlmICgheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHgubm9kZU5hbWUgPT09ICdzdHJpbmcnICYmIHR5cGVvZiB4LmdldEF0dHJpYnV0ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuZnVuY3Rpb24gaW5zcGVjdFN0cmluZyhzdHIsIG9wdHMpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA+IG9wdHMubWF4U3RyaW5nTGVuZ3RoKSB7XG4gICAgICAgIHZhciByZW1haW5pbmcgPSBzdHIubGVuZ3RoIC0gb3B0cy5tYXhTdHJpbmdMZW5ndGg7XG4gICAgICAgIHZhciB0cmFpbGVyID0gJy4uLiAnICsgcmVtYWluaW5nICsgJyBtb3JlIGNoYXJhY3RlcicgKyAocmVtYWluaW5nID4gMSA/ICdzJyA6ICcnKTtcbiAgICAgICAgcmV0dXJuIGluc3BlY3RTdHJpbmcoJHNsaWNlLmNhbGwoc3RyLCAwLCBvcHRzLm1heFN0cmluZ0xlbmd0aCksIG9wdHMpICsgdHJhaWxlcjtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbiAgICB2YXIgcyA9ICRyZXBsYWNlLmNhbGwoJHJlcGxhY2UuY2FsbChzdHIsIC8oWydcXFxcXSkvZywgJ1xcXFwkMScpLCAvW1xceDAwLVxceDFmXS9nLCBsb3dieXRlKTtcbiAgICByZXR1cm4gd3JhcFF1b3RlcyhzLCAnc2luZ2xlJywgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIGxvd2J5dGUoYykge1xuICAgIHZhciBuID0gYy5jaGFyQ29kZUF0KDApO1xuICAgIHZhciB4ID0ge1xuICAgICAgICA4OiAnYicsXG4gICAgICAgIDk6ICd0JyxcbiAgICAgICAgMTA6ICduJyxcbiAgICAgICAgMTI6ICdmJyxcbiAgICAgICAgMTM6ICdyJ1xuICAgIH1bbl07XG4gICAgaWYgKHgpIHsgcmV0dXJuICdcXFxcJyArIHg7IH1cbiAgICByZXR1cm4gJ1xcXFx4JyArIChuIDwgMHgxMCA/ICcwJyA6ICcnKSArICR0b1VwcGVyQ2FzZS5jYWxsKG4udG9TdHJpbmcoMTYpKTtcbn1cblxuZnVuY3Rpb24gbWFya0JveGVkKHN0cikge1xuICAgIHJldHVybiAnT2JqZWN0KCcgKyBzdHIgKyAnKSc7XG59XG5cbmZ1bmN0aW9uIHdlYWtDb2xsZWN0aW9uT2YodHlwZSkge1xuICAgIHJldHVybiB0eXBlICsgJyB7ID8gfSc7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3Rpb25PZih0eXBlLCBzaXplLCBlbnRyaWVzLCBpbmRlbnQpIHtcbiAgICB2YXIgam9pbmVkRW50cmllcyA9IGluZGVudCA/IGluZGVudGVkSm9pbihlbnRyaWVzLCBpbmRlbnQpIDogJGpvaW4uY2FsbChlbnRyaWVzLCAnLCAnKTtcbiAgICByZXR1cm4gdHlwZSArICcgKCcgKyBzaXplICsgJykgeycgKyBqb2luZWRFbnRyaWVzICsgJ30nO1xufVxuXG5mdW5jdGlvbiBzaW5nbGVMaW5lVmFsdWVzKHhzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaW5kZXhPZih4c1tpXSwgJ1xcbicpID49IDApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gZ2V0SW5kZW50KG9wdHMsIGRlcHRoKSB7XG4gICAgdmFyIGJhc2VJbmRlbnQ7XG4gICAgaWYgKG9wdHMuaW5kZW50ID09PSAnXFx0Jykge1xuICAgICAgICBiYXNlSW5kZW50ID0gJ1xcdCc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb3B0cy5pbmRlbnQgPT09ICdudW1iZXInICYmIG9wdHMuaW5kZW50ID4gMCkge1xuICAgICAgICBiYXNlSW5kZW50ID0gJGpvaW4uY2FsbChBcnJheShvcHRzLmluZGVudCArIDEpLCAnICcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBiYXNlOiBiYXNlSW5kZW50LFxuICAgICAgICBwcmV2OiAkam9pbi5jYWxsKEFycmF5KGRlcHRoICsgMSksIGJhc2VJbmRlbnQpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaW5kZW50ZWRKb2luKHhzLCBpbmRlbnQpIHtcbiAgICBpZiAoeHMubGVuZ3RoID09PSAwKSB7IHJldHVybiAnJzsgfVxuICAgIHZhciBsaW5lSm9pbmVyID0gJ1xcbicgKyBpbmRlbnQucHJldiArIGluZGVudC5iYXNlO1xuICAgIHJldHVybiBsaW5lSm9pbmVyICsgJGpvaW4uY2FsbCh4cywgJywnICsgbGluZUpvaW5lcikgKyAnXFxuJyArIGluZGVudC5wcmV2O1xufVxuXG5mdW5jdGlvbiBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCkge1xuICAgIHZhciBpc0FyciA9IGlzQXJyYXkob2JqKTtcbiAgICB2YXIgeHMgPSBbXTtcbiAgICBpZiAoaXNBcnIpIHtcbiAgICAgICAgeHMubGVuZ3RoID0gb2JqLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHhzW2ldID0gaGFzKG9iaiwgaSkgPyBpbnNwZWN0KG9ialtpXSwgb2JqKSA6ICcnO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBzeW1zID0gdHlwZW9mIGdPUFMgPT09ICdmdW5jdGlvbicgPyBnT1BTKG9iaikgOiBbXTtcbiAgICB2YXIgc3ltTWFwO1xuICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scykge1xuICAgICAgICBzeW1NYXAgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBzeW1zLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBzeW1NYXBbJyQnICsgc3ltc1trXV0gPSBzeW1zW2tdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICAgIGlmICghaGFzKG9iaiwga2V5KSkgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby1jb250aW51ZVxuICAgICAgICBpZiAoaXNBcnIgJiYgU3RyaW5nKE51bWJlcihrZXkpKSA9PT0ga2V5ICYmIGtleSA8IG9iai5sZW5ndGgpIHsgY29udGludWU7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tY29udGludWVcbiAgICAgICAgaWYgKGhhc1NoYW1tZWRTeW1ib2xzICYmIHN5bU1hcFsnJCcgKyBrZXldIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICAgICAgICAvLyB0aGlzIGlzIHRvIHByZXZlbnQgc2hhbW1lZCBTeW1ib2xzLCB3aGljaCBhcmUgc3RvcmVkIGFzIHN0cmluZ3MsIGZyb20gYmVpbmcgaW5jbHVkZWQgaW4gdGhlIHN0cmluZyBrZXkgc2VjdGlvblxuICAgICAgICAgICAgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLWNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoJHRlc3QuY2FsbCgvW15cXHckXS8sIGtleSkpIHtcbiAgICAgICAgICAgIHhzLnB1c2goaW5zcGVjdChrZXksIG9iaikgKyAnOiAnICsgaW5zcGVjdChvYmpba2V5XSwgb2JqKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB4cy5wdXNoKGtleSArICc6ICcgKyBpbnNwZWN0KG9ialtrZXldLCBvYmopKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGdPUFMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzeW1zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoaXNFbnVtZXJhYmxlLmNhbGwob2JqLCBzeW1zW2pdKSkge1xuICAgICAgICAgICAgICAgIHhzLnB1c2goJ1snICsgaW5zcGVjdChzeW1zW2pdKSArICddOiAnICsgaW5zcGVjdChvYmpbc3ltc1tqXV0sIG9iaikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB4cztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG52YXIgaW5zcGVjdCA9IHJlcXVpcmUoJ29iamVjdC1pbnNwZWN0Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gR2V0SW50cmluc2ljKCclVHlwZUVycm9yJScpO1xudmFyICRXZWFrTWFwID0gR2V0SW50cmluc2ljKCclV2Vha01hcCUnLCB0cnVlKTtcbnZhciAkTWFwID0gR2V0SW50cmluc2ljKCclTWFwJScsIHRydWUpO1xuXG52YXIgJHdlYWtNYXBHZXQgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLmdldCcsIHRydWUpO1xudmFyICR3ZWFrTWFwU2V0ID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5zZXQnLCB0cnVlKTtcbnZhciAkd2Vha01hcEhhcyA9IGNhbGxCb3VuZCgnV2Vha01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG52YXIgJG1hcEdldCA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5nZXQnLCB0cnVlKTtcbnZhciAkbWFwU2V0ID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLnNldCcsIHRydWUpO1xudmFyICRtYXBIYXMgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG5cbi8qXG4gKiBUaGlzIGZ1bmN0aW9uIHRyYXZlcnNlcyB0aGUgbGlzdCByZXR1cm5pbmcgdGhlIG5vZGUgY29ycmVzcG9uZGluZyB0byB0aGVcbiAqIGdpdmVuIGtleS5cbiAqXG4gKiBUaGF0IG5vZGUgaXMgYWxzbyBtb3ZlZCB0byB0aGUgaGVhZCBvZiB0aGUgbGlzdCwgc28gdGhhdCBpZiBpdCdzIGFjY2Vzc2VkXG4gKiBhZ2FpbiB3ZSBkb24ndCBuZWVkIHRvIHRyYXZlcnNlIHRoZSB3aG9sZSBsaXN0LiBCeSBkb2luZyBzbywgYWxsIHRoZSByZWNlbnRseVxuICogdXNlZCBub2RlcyBjYW4gYmUgYWNjZXNzZWQgcmVsYXRpdmVseSBxdWlja2x5LlxuICovXG52YXIgbGlzdEdldE5vZGUgPSBmdW5jdGlvbiAobGlzdCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0Zm9yICh2YXIgcHJldiA9IGxpc3QsIGN1cnI7IChjdXJyID0gcHJldi5uZXh0KSAhPT0gbnVsbDsgcHJldiA9IGN1cnIpIHtcblx0XHRpZiAoY3Vyci5rZXkgPT09IGtleSkge1xuXHRcdFx0cHJldi5uZXh0ID0gY3Vyci5uZXh0O1xuXHRcdFx0Y3Vyci5uZXh0ID0gbGlzdC5uZXh0O1xuXHRcdFx0bGlzdC5uZXh0ID0gY3VycjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHRcdFx0cmV0dXJuIGN1cnI7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgbGlzdEdldCA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXkpIHtcblx0dmFyIG5vZGUgPSBsaXN0R2V0Tm9kZShvYmplY3RzLCBrZXkpO1xuXHRyZXR1cm4gbm9kZSAmJiBub2RlLnZhbHVlO1xufTtcbnZhciBsaXN0U2V0ID0gZnVuY3Rpb24gKG9iamVjdHMsIGtleSwgdmFsdWUpIHtcblx0dmFyIG5vZGUgPSBsaXN0R2V0Tm9kZShvYmplY3RzLCBrZXkpO1xuXHRpZiAobm9kZSkge1xuXHRcdG5vZGUudmFsdWUgPSB2YWx1ZTtcblx0fSBlbHNlIHtcblx0XHQvLyBQcmVwZW5kIHRoZSBuZXcgbm9kZSB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0XG5cdFx0b2JqZWN0cy5uZXh0ID0geyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cdFx0XHRrZXk6IGtleSxcblx0XHRcdG5leHQ6IG9iamVjdHMubmV4dCxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH07XG5cdH1cbn07XG52YXIgbGlzdEhhcyA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXkpIHtcblx0cmV0dXJuICEhbGlzdEdldE5vZGUob2JqZWN0cywga2V5KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0U2lkZUNoYW5uZWwoKSB7XG5cdHZhciAkd207XG5cdHZhciAkbTtcblx0dmFyICRvO1xuXHR2YXIgY2hhbm5lbCA9IHtcblx0XHRhc3NlcnQ6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmICghY2hhbm5lbC5oYXMoa2V5KSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignU2lkZSBjaGFubmVsIGRvZXMgbm90IGNvbnRhaW4gJyArIGluc3BlY3Qoa2V5KSk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uIChrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjb25zaXN0ZW50LXJldHVyblxuXHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEdldCgkd20sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0XHRyZXR1cm4gJG1hcEdldCgkbSwga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCRvKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZWx5LWlmXG5cdFx0XHRcdFx0cmV0dXJuIGxpc3RHZXQoJG8sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGhhczogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0aWYgKCRXZWFrTWFwICYmIGtleSAmJiAodHlwZW9mIGtleSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIGtleSA9PT0gJ2Z1bmN0aW9uJykpIHtcblx0XHRcdFx0aWYgKCR3bSkge1xuXHRcdFx0XHRcdHJldHVybiAkd2Vha01hcEhhcygkd20sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoJG0pIHtcblx0XHRcdFx0XHRyZXR1cm4gJG1hcEhhcygkbSwga2V5KTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCRvKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZWx5LWlmXG5cdFx0XHRcdFx0cmV0dXJuIGxpc3RIYXMoJG8sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcblx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdGlmICghJHdtKSB7XG5cdFx0XHRcdFx0JHdtID0gbmV3ICRXZWFrTWFwKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0JHdlYWtNYXBTZXQoJHdtLCBrZXksIHZhbHVlKTtcblx0XHRcdH0gZWxzZSBpZiAoJE1hcCkge1xuXHRcdFx0XHRpZiAoISRtKSB7XG5cdFx0XHRcdFx0JG0gPSBuZXcgJE1hcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCRtYXBTZXQoJG0sIGtleSwgdmFsdWUpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCEkbykge1xuXHRcdFx0XHRcdC8qXG5cdFx0XHRcdFx0ICogSW5pdGlhbGl6ZSB0aGUgbGlua2VkIGxpc3QgYXMgYW4gZW1wdHkgbm9kZSwgc28gdGhhdCB3ZSBkb24ndCBoYXZlXG5cdFx0XHRcdFx0ICogdG8gc3BlY2lhbC1jYXNlIGhhbmRsaW5nIG9mIHRoZSBmaXJzdCBub2RlOiB3ZSBjYW4gYWx3YXlzIHJlZmVyIHRvXG5cdFx0XHRcdFx0ICogaXQgYXMgKHByZXZpb3VzIG5vZGUpLm5leHQsIGluc3RlYWQgb2Ygc29tZXRoaW5nIGxpa2UgKGxpc3QpLmhlYWRcblx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHQkbyA9IHsga2V5OiB7fSwgbmV4dDogbnVsbCB9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3RTZXQoJG8sIGtleSwgdmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGNoYW5uZWw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbnZhciBGb3JtYXQgPSB7XG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiBGb3JtYXQuUkZDMzk4NixcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBSRkMxNzM4OiBGb3JtYXQuUkZDMTczOCxcbiAgICBSRkMzOTg2OiBGb3JtYXQuUkZDMzk4NlxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiAwICovXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyAmJiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpKSB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgIWlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmIGlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SXRlbSA9IHRhcmdldFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SXRlbSAmJiB0eXBlb2YgdGFyZ2V0SXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0SXRlbSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0ciwgZGVjb2RlciwgY2hhcnNldCkge1xuICAgIHZhciBzdHJXaXRob3V0UGx1cyA9IHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIC8vIHVuZXNjYXBlIG5ldmVyIHRocm93cywgbm8gdHJ5Li4uY2F0Y2ggbmVlZGVkOlxuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXMucmVwbGFjZSgvJVswLTlhLWZdezJ9L2dpLCB1bmVzY2FwZSk7XG4gICAgfVxuICAgIC8vIHV0Zi04XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJXaXRob3V0UGx1cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXM7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIsIGRlZmF1bHRFbmNvZGVyLCBjaGFyc2V0LCBraW5kLCBmb3JtYXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHN0cjtcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgc3RyaW5nID0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN0cik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICAgICB8fCAoZm9ybWF0ID09PSBmb3JtYXRzLlJGQzE3MzggJiYgKGMgPT09IDB4MjggfHwgYyA9PT0gMHgyOSkpIC8vICggKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgLyogZXNsaW50IG9wZXJhdG9yLWxpbmVicmVhazogWzIsIFwiYmVmb3JlXCJdICovXG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxudmFyIGNvbWJpbmUgPSBmdW5jdGlvbiBjb21iaW5lKGEsIGIpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxudmFyIG1heWJlTWFwID0gZnVuY3Rpb24gbWF5YmVNYXAodmFsLCBmbikge1xuICAgIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgICAgdmFyIG1hcHBlZCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgbWFwcGVkLnB1c2goZm4odmFsW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcHBlZDtcbiAgICB9XG4gICAgcmV0dXJuIGZuKHZhbCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhcnJheVRvT2JqZWN0OiBhcnJheVRvT2JqZWN0LFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGNvbWJpbmU6IGNvbWJpbmUsXG4gICAgY29tcGFjdDogY29tcGFjdCxcbiAgICBkZWNvZGU6IGRlY29kZSxcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gICAgaXNSZWdFeHA6IGlzUmVnRXhwLFxuICAgIG1heWJlTWFwOiBtYXliZU1hcCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTaWRlQ2hhbm5lbCA9IHJlcXVpcmUoJ3NpZGUtY2hhbm5lbCcpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgc3BsaXQgPSBTdHJpbmcucHJvdG90eXBlLnNwbGl0O1xudmFyIHB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbnZhciBwdXNoVG9BcnJheSA9IGZ1bmN0aW9uIChhcnIsIHZhbHVlT3JBcnJheSkge1xuICAgIHB1c2guYXBwbHkoYXJyLCBpc0FycmF5KHZhbHVlT3JBcnJheSkgPyB2YWx1ZU9yQXJyYXkgOiBbdmFsdWVPckFycmF5XSk7XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRGb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWRkUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGZvcm1hdHRlcjogZm9ybWF0cy5mb3JtYXR0ZXJzW2RlZmF1bHRGb3JtYXRdLFxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBpbmRpY2VzOiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpc05vbk51bGxpc2hQcmltaXRpdmUgPSBmdW5jdGlvbiBpc05vbk51bGxpc2hQcmltaXRpdmUodikge1xuICAgIHJldHVybiB0eXBlb2YgdiA9PT0gJ3N0cmluZydcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdudW1iZXInXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnYm9vbGVhbidcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdzeW1ib2wnXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnYmlnaW50Jztcbn07XG5cbnZhciBzZW50aW5lbCA9IHt9O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KFxuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0LFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGNoYXJzZXQsXG4gICAgc2lkZUNoYW5uZWxcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG5cbiAgICB2YXIgdG1wU2MgPSBzaWRlQ2hhbm5lbDtcbiAgICB2YXIgc3RlcCA9IDA7XG4gICAgdmFyIGZpbmRGbGFnID0gZmFsc2U7XG4gICAgd2hpbGUgKCh0bXBTYyA9IHRtcFNjLmdldChzZW50aW5lbCkpICE9PSB2b2lkIHVuZGVmaW5lZCAmJiAhZmluZEZsYWcpIHtcbiAgICAgICAgLy8gV2hlcmUgb2JqZWN0IGxhc3QgYXBwZWFyZWQgaW4gdGhlIHJlZiB0cmVlXG4gICAgICAgIHZhciBwb3MgPSB0bXBTYy5nZXQob2JqZWN0KTtcbiAgICAgICAgc3RlcCArPSAxO1xuICAgICAgICBpZiAodHlwZW9mIHBvcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChwb3MgPT09IHN0ZXApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQ3ljbGljIG9iamVjdCB2YWx1ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaW5kRmxhZyA9IHRydWU7IC8vIEJyZWFrIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0bXBTYy5nZXQoc2VudGluZWwpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc3RlcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSB1dGlscy5tYXliZU1hcChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemVEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5JywgZm9ybWF0KSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmIChpc05vbk51bGxpc2hQcmltaXRpdmUob2JqKSB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknLCBmb3JtYXQpO1xuICAgICAgICAgICAgaWYgKGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgZW5jb2RlVmFsdWVzT25seSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZXNBcnJheSA9IHNwbGl0LmNhbGwoU3RyaW5nKG9iaiksICcsJyk7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlc0pvaW5lZCA9ICcnO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzQXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzSm9pbmVkICs9IChpID09PSAwID8gJycgOiAnLCcpICsgZm9ybWF0dGVyKGVuY29kZXIodmFsdWVzQXJyYXlbaV0sIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICd2YWx1ZScsIGZvcm1hdCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyB2YWx1ZXNKb2luZWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAndmFsdWUnLCBmb3JtYXQpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIGpvaW4gZWxlbWVudHMgaW5cbiAgICAgICAgb2JqS2V5cyA9IFt7IHZhbHVlOiBvYmoubGVuZ3RoID4gMCA/IG9iai5qb2luKCcsJykgfHwgbnVsbCA6IHZvaWQgdW5kZWZpbmVkIH1dO1xuICAgIH0gZWxzZSBpZiAoaXNBcnJheShmaWx0ZXIpKSB7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBvYmpLZXlzID0gc29ydCA/IGtleXMuc29ydChzb3J0KSA6IGtleXM7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmpLZXlzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgIHZhciBrZXkgPSBvYmpLZXlzW2pdO1xuICAgICAgICB2YXIgdmFsdWUgPSB0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyAmJiB0eXBlb2Yga2V5LnZhbHVlICE9PSAndW5kZWZpbmVkJyA/IGtleS52YWx1ZSA6IG9ialtrZXldO1xuXG4gICAgICAgIGlmIChza2lwTnVsbHMgJiYgdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGtleVByZWZpeCA9IGlzQXJyYXkob2JqKVxuICAgICAgICAgICAgPyB0eXBlb2YgZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2Z1bmN0aW9uJyA/IGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpIDogcHJlZml4XG4gICAgICAgICAgICA6IHByZWZpeCArIChhbGxvd0RvdHMgPyAnLicgKyBrZXkgOiAnWycgKyBrZXkgKyAnXScpO1xuXG4gICAgICAgIHNpZGVDaGFubmVsLnNldChvYmplY3QsIHN0ZXApO1xuICAgICAgICB2YXIgdmFsdWVTaWRlQ2hhbm5lbCA9IGdldFNpZGVDaGFubmVsKCk7XG4gICAgICAgIHZhbHVlU2lkZUNoYW5uZWwuc2V0KHNlbnRpbmVsLCBzaWRlQ2hhbm5lbCk7XG4gICAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBrZXlQcmVmaXgsXG4gICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgZm9ybWF0LFxuICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIGNoYXJzZXQsXG4gICAgICAgICAgICB2YWx1ZVNpZGVDaGFubmVsXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG52YXIgbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZW5jb2RlciAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRzLmNoYXJzZXQgfHwgZGVmYXVsdHMuY2hhcnNldDtcbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICBpZiAodHlwZW9mIG9wdHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIWhhcy5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0cy5mb3JtYXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0ID0gb3B0cy5mb3JtYXQ7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcblxuICAgIHZhciBmaWx0ZXIgPSBkZWZhdWx0cy5maWx0ZXI7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBpc0FycmF5KG9wdHMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRzLmZpbHRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVyeVByZWZpeDogdHlwZW9mIG9wdHMuYWRkUXVlcnlQcmVmaXggPT09ICdib29sZWFuJyA/IG9wdHMuYWRkUXVlcnlQcmVmaXggOiBkZWZhdWx0cy5hZGRRdWVyeVByZWZpeCxcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRzLmRlbGltaXRlcixcbiAgICAgICAgZW5jb2RlOiB0eXBlb2Ygb3B0cy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlLFxuICAgICAgICBlbmNvZGVyOiB0eXBlb2Ygb3B0cy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcixcbiAgICAgICAgZW5jb2RlVmFsdWVzT25seTogdHlwZW9mIG9wdHMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICB9XG5cbiAgICB2YXIgc2lkZUNoYW5uZWwgPSBnZXRTaWRlQ2hhbm5lbCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAob3B0aW9ucy5za2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hUb0FycmF5KGtleXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgb3B0aW9ucy5za2lwTnVsbHMsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZSA/IG9wdGlvbnMuZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBvcHRpb25zLmZpbHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuc29ydCxcbiAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dEb3RzLFxuICAgICAgICAgICAgb3B0aW9ucy5zZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtYXQsXG4gICAgICAgICAgICBvcHRpb25zLmZvcm1hdHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIG9wdGlvbnMuY2hhcnNldCxcbiAgICAgICAgICAgIHNpZGVDaGFubmVsXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBhbGxvd1Byb3RvdHlwZXM6IGZhbHNlLFxuICAgIGFsbG93U3BhcnNlOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgY29tbWE6IGZhbHNlLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBpZ25vcmVRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiBmYWxzZSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwYXJzZUFycmF5czogdHJ1ZSxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpbnRlcnByZXROdW1lcmljRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mIyhcXGQrKTsvZywgZnVuY3Rpb24gKCQwLCBudW1iZXJTdHIpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobnVtYmVyU3RyLCAxMCkpO1xuICAgIH0pO1xufTtcblxudmFyIHBhcnNlQXJyYXlWYWx1ZSA9IGZ1bmN0aW9uICh2YWwsIG9wdGlvbnMpIHtcbiAgICBpZiAodmFsICYmIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnICYmIG9wdGlvbnMuY29tbWEgJiYgdmFsLmluZGV4T2YoJywnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB2YWwuc3BsaXQoJywnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsO1xufTtcblxuLy8gVGhpcyBpcyB3aGF0IGJyb3dzZXJzIHdpbGwgc3VibWl0IHdoZW4gdGhlIOKckyBjaGFyYWN0ZXIgb2NjdXJzIGluIGFuXG4vLyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQgYm9keSBhbmQgdGhlIGVuY29kaW5nIG9mIHRoZSBwYWdlIGNvbnRhaW5pbmdcbi8vIHRoZSBmb3JtIGlzIGlzby04ODU5LTEsIG9yIHdoZW4gdGhlIHN1Ym1pdHRlZCBmb3JtIGhhcyBhbiBhY2NlcHQtY2hhcnNldFxuLy8gYXR0cmlidXRlIG9mIGlzby04ODU5LTEuIFByZXN1bWFibHkgYWxzbyB3aXRoIG90aGVyIGNoYXJzZXRzIHRoYXQgZG8gbm90IGNvbnRhaW5cbi8vIHRoZSDinJMgY2hhcmFjdGVyLCBzdWNoIGFzIHVzLWFzY2lpLlxudmFyIGlzb1NlbnRpbmVsID0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0InOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JylcblxuLy8gVGhlc2UgYXJlIHRoZSBwZXJjZW50LWVuY29kZWQgdXRmLTggb2N0ZXRzIHJlcHJlc2VudGluZyBhIGNoZWNrbWFyaywgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IGFjdHVhbGx5IGlzIHV0Zi04IGVuY29kZWQuXG52YXIgY2hhcnNldFNlbnRpbmVsID0gJ3V0Zjg9JUUyJTlDJTkzJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG4gICAgdmFyIHNraXBJbmRleCA9IC0xOyAvLyBLZWVwIHRyYWNrIG9mIHdoZXJlIHRoZSB1dGY4IHNlbnRpbmVsIHdhcyBmb3VuZFxuICAgIHZhciBpO1xuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRpb25zLmNoYXJzZXQ7XG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcnRzW2ldLmluZGV4T2YoJ3V0Zjg9JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV0gPT09IGNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSBpc29TZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ2lzby04ODU5LTEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBza2lwSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGkgPSBwYXJ0cy5sZW5ndGg7IC8vIFRoZSBlc2xpbnQgc2V0dGluZ3MgZG8gbm90IGFsbG93IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChpID09PSBza2lwSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gdXRpbHMubWF5YmVNYXAoXG4gICAgICAgICAgICAgICAgcGFyc2VBcnJheVZhbHVlKHBhcnQuc2xpY2UocG9zICsgMSksIG9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlbmNvZGVkVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25zLmRlY29kZXIoZW5jb2RlZFZhbCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgJiYgb3B0aW9ucy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgJiYgY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICB2YWwgPSBpbnRlcnByZXROdW1lcmljRW50aXRpZXModmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0LmluZGV4T2YoJ1tdPScpID4gLTEpIHtcbiAgICAgICAgICAgIHZhbCA9IGlzQXJyYXkodmFsKSA/IFt2YWxdIDogdmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB1dGlscy5jb21iaW5lKG9ialtrZXldLCB2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMsIHZhbHVlc1BhcnNlZCkge1xuICAgIHZhciBsZWFmID0gdmFsdWVzUGFyc2VkID8gdmFsIDogcGFyc2VBcnJheVZhbHVlKHZhbCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIG9iajtcbiAgICAgICAgdmFyIHJvb3QgPSBjaGFpbltpXTtcblxuICAgICAgICBpZiAocm9vdCA9PT0gJ1tdJyAmJiBvcHRpb25zLnBhcnNlQXJyYXlzKSB7XG4gICAgICAgICAgICBvYmogPSBbXS5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnBhcnNlQXJyYXlzICYmIGNsZWFuUm9vdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBvYmogPSB7IDA6IGxlYWYgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xlYW5Sb290ICE9PSAnX19wcm90b19fJykge1xuICAgICAgICAgICAgICAgIG9ialtjbGVhblJvb3RdID0gbGVhZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxlYWYgPSBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IG9wdGlvbnMuZGVwdGggPiAwICYmIGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXMgdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChvcHRpb25zLmRlcHRoID4gMCAmJiAoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKTtcbn07XG5cbnZhciBub3JtYWxpemVQYXJzZU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRzLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB2YXIgY2hhcnNldCA9IHR5cGVvZiBvcHRzLmNoYXJzZXQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuY2hhcnNldCA6IG9wdHMuY2hhcnNldDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGFsbG93UHJvdG90eXBlczogdHlwZW9mIG9wdHMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcyxcbiAgICAgICAgYWxsb3dTcGFyc2U6IHR5cGVvZiBvcHRzLmFsbG93U3BhcnNlID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93U3BhcnNlIDogZGVmYXVsdHMuYWxsb3dTcGFyc2UsXG4gICAgICAgIGFycmF5TGltaXQ6IHR5cGVvZiBvcHRzLmFycmF5TGltaXQgPT09ICdudW1iZXInID8gb3B0cy5hcnJheUxpbWl0IDogZGVmYXVsdHMuYXJyYXlMaW1pdCxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBjb21tYTogdHlwZW9mIG9wdHMuY29tbWEgPT09ICdib29sZWFuJyA/IG9wdHMuY29tbWEgOiBkZWZhdWx0cy5jb21tYSxcbiAgICAgICAgZGVjb2RlcjogdHlwZW9mIG9wdHMuZGVjb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZGVjb2RlciA6IGRlZmF1bHRzLmRlY29kZXIsXG4gICAgICAgIGRlbGltaXRlcjogdHlwZW9mIG9wdHMuZGVsaW1pdGVyID09PSAnc3RyaW5nJyB8fCB1dGlscy5pc1JlZ0V4cChvcHRzLmRlbGltaXRlcikgPyBvcHRzLmRlbGltaXRlciA6IGRlZmF1bHRzLmRlbGltaXRlcixcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWltcGxpY2l0LWNvZXJjaW9uLCBuby1leHRyYS1wYXJlbnNcbiAgICAgICAgZGVwdGg6ICh0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ251bWJlcicgfHwgb3B0cy5kZXB0aCA9PT0gZmFsc2UpID8gK29wdHMuZGVwdGggOiBkZWZhdWx0cy5kZXB0aCxcbiAgICAgICAgaWdub3JlUXVlcnlQcmVmaXg6IG9wdHMuaWdub3JlUXVlcnlQcmVmaXggPT09IHRydWUsXG4gICAgICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogdHlwZW9mIG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID09PSAnYm9vbGVhbicgPyBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA6IGRlZmF1bHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyxcbiAgICAgICAgcGFyYW1ldGVyTGltaXQ6IHR5cGVvZiBvcHRzLnBhcmFtZXRlckxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdHMucGFyYW1ldGVyTGltaXQgOiBkZWZhdWx0cy5wYXJhbWV0ZXJMaW1pdCxcbiAgICAgICAgcGFyc2VBcnJheXM6IG9wdHMucGFyc2VBcnJheXMgIT09IGZhbHNlLFxuICAgICAgICBwbGFpbk9iamVjdHM6IHR5cGVvZiBvcHRzLnBsYWluT2JqZWN0cyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5wbGFpbk9iamVjdHMgOiBkZWZhdWx0cy5wbGFpbk9iamVjdHMsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyhvcHRzKTtcblxuICAgIGlmIChzdHIgPT09ICcnIHx8IHN0ciA9PT0gbnVsbCB8fCB0eXBlb2Ygc3RyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgfVxuXG4gICAgdmFyIHRlbXBPYmogPSB0eXBlb2Ygc3RyID09PSAnc3RyaW5nJyA/IHBhcnNlVmFsdWVzKHN0ciwgb3B0aW9ucykgOiBzdHI7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuXG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBrZXlzIGFuZCBzZXR1cCB0aGUgbmV3IG9iamVjdFxuXG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh0ZW1wT2JqKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhciBuZXdPYmogPSBwYXJzZUtleXMoa2V5LCB0ZW1wT2JqW2tleV0sIG9wdGlvbnMsIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmFsbG93U3BhcnNlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCJpbXBvcnQgeyBhcGkgfSBmcm9tICdib290L2F4aW9zJ1xyXG5pbXBvcnQgeyB1c2VBdXRoU3RvcmUgfSBmcm9tICdzdG9yZXMvYXV0aCdcclxuaW1wb3J0IHFzIGZyb20gJ3FzJ1xyXG5cclxuY29uc3Qgc2V0SGVhZGVyVG9rZW4gPSAodG9rZW4pID0+IHsgYXBpLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YCB9XHJcbmNvbnN0IGRlbGV0ZUhlYWRlclRva2VuID0gKCkgPT4geyBkZWxldGUgYXBpLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uLkF1dGhvcml6YXRpb24gfVxyXG5jb25zdCBzZXRGb3JtSGVhZGVycyA9ICgpID0+IHsgcmV0dXJuIHsgJ2NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIH0gfVxyXG5cclxuY29uc3Qgc3RvcmVBdXRoID0gdXNlQXV0aFN0b3JlKClcclxuXHJcbmNvbnN0IGF1dGggPSB7XHJcbiAgYXN5bmMgbG9naW4gKGNyZWRlbnRpYWxzKSB7XHJcbiAgICBjb25zdCBkYXRhID0ge1xyXG4gICAgICB1c2VybmFtZTogY3JlZGVudGlhbHMuZW1haWwsXHJcbiAgICAgIHBhc3N3b3JkOiBjcmVkZW50aWFscy5wYXNzd29yZFxyXG4gICAgfVxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGRhdGE6IHFzLnN0cmluZ2lmeShkYXRhKSxcclxuICAgICAgdXJsOiAnL2xvZ2luJ1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFwaShvcHRpb25zLCB7IGhlYWRlcnM6IHNldEZvcm1IZWFkZXJzKCkgfSlcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHN0b3JlQXV0aC5zZXRUb2tlbihyZXNwb25zZS5kYXRhLnRva2VuKVxyXG4gICAgICAgIHNldEhlYWRlclRva2VuKHN0b3JlQXV0aC5nZXRVc2VyVG9rZW4pXHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgc3RvcmVBdXRoLmRlbGV0ZVRva2VuKClcclxuICAgICAgICBkZWxldGVIZWFkZXJUb2tlbigpXHJcbiAgICAgIH0pXHJcbiAgfSxcclxuICBhc3luYyBsb2dvdXQgKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGRhdGE6IHFzLnN0cmluZ2lmeSgnJyksXHJcbiAgICAgIHVybDogJy9sb2dvdXQnXHJcbiAgICB9XHJcbiAgICBzZXRIZWFkZXJUb2tlbihzdG9yZUF1dGguZ2V0VXNlclRva2VuKVxyXG4gICAgcmV0dXJuIGFwaShvcHRpb25zLCB7IGhlYWRlcnM6IHNldEZvcm1IZWFkZXJzKCkgfSlcclxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgIHN0b3JlQXV0aC5kZWxldGVUb2tlbihyZXNwb25zZS5kYXRhLnRva2VuKVxyXG4gICAgICAgIGRlbGV0ZUhlYWRlclRva2VuKHN0b3JlQXV0aC5nZXRVc2VyVG9rZW4pXHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaChyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2xvZ291dCBlcnJvciAnICsgcmVzcG9uc2UpXHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IHsgYXV0aCB9XHJcbiIsImltcG9ydCB7IE5vdGlmeSB9IGZyb20gJ3F1YXNhcidcclxuXHJcbmV4cG9ydCBjb25zdCBzaG93Tm90aWZpY2F0aW9uID0gKHR5cGUsIG1lc3NhZ2UpID0+IHtcclxuICBOb3RpZnkuY3JlYXRlKHtcclxuICAgIHR5cGUsXHJcbiAgICBtZXNzYWdlLFxyXG4gICAgcG9zaXRpb246ICd0b3AnXHJcbiAgfSlcclxufVxyXG4iXSwibmFtZXMiOlsicmVxdWlyZSQkMCIsImhhc1N5bWJvbHMiLCJ0b1N0ciIsImltcGxlbWVudGF0aW9uIiwiRW1wdHkiLCJiaW5kIiwidW5kZWZpbmVkIiwiJFR5cGVFcnJvciIsImRvRXZhbCIsInJlcXVpcmUkJDEiLCJoYXNPd24iLCJyZXF1aXJlJCQyIiwiJGNvbmNhdCIsIiRyZXBsYWNlIiwic3RyaW5nVG9QYXRoIiwicXVvdGUiLCJnZXRCYXNlSW50cmluc2ljIiwiR2V0SW50cmluc2ljIiwiJGdPUEQiLCJjYWxsQmluZCIsImFwcGx5QmluZCIsImNhbGxCb3VuZCIsImhhcyIsImlzQXJyYXkiLCJpbnNwZWN0IiwiaXNSZWdFeHAiLCJmb3JtYXRzIiwiY29tcGFjdFF1ZXVlIiwiYXJyYXlUb09iamVjdCIsIm1lcmdlIiwiZW5jb2RlIiwiY29tcGFjdCIsImlzQnVmZmVyIiwiY29tYmluZSIsIm1heWJlTWFwIiwidXRpbHMiLCJnZXRTaWRlQ2hhbm5lbCIsImRlZmF1bHRzIiwiaXNOb25OdWxsaXNoUHJpbWl0aXZlIiwic3RyaW5naWZ5Iiwic2VyaWFsaXplRGF0ZSIsInNpZGVDaGFubmVsIiwidmFsdWUiLCJub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zIiwiYnJhY2tldHMiLCJub3JtYWxpemVQYXJzZU9wdGlvbnMiLCJwYXJzZSIsInFzIl0sIm1hcHBpbmdzIjoiOztBQUVZLE1BQUMsZUFBZTtBQUFBLEVBQzFCLE1BQU07QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNWO0FBQ0g7QUFFZSxTQUFBLFFBQVUsT0FBTyxJQUFJO0FBRWxDLFNBQU8sU0FBUyxNQUNkLE1BQU0sU0FBUyxPQUNYLEdBQUcsS0FBSyxXQUNSLE1BQU0sSUFDWDtBQUNIO0FDQ08sU0FBUyxRQUFTLEdBQUcsS0FBSyxLQUFLO0FBQ3BDLFNBQU8sT0FBTyxNQUNWLE1BQ0EsS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDO0FBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkJZLE1BQUMsZUFBZSxZQUFZLFFBQVE7QUFBQSxFQUM5QyxPQUFPLE9BQU87QUFBQSxJQUNaLE9BQU87QUFBQSxJQUNQLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxFQUNuQjtBQUFBLEVBQ0UsU0FBUztBQUFBLElBQ1AsY0FBYyxXQUFTLE1BQU07QUFBQSxJQUM3QixpQkFBaUIsV0FBUyxNQUFNO0FBQUEsRUFDakM7QUFBQSxFQUNELFNBQVM7QUFBQSxJQUNQLFNBQVUsT0FBTztBQUNmLFdBQUssUUFBUTtBQUNiLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssY0FBZTtBQUFBLElBQ3JCO0FBQUEsSUFDRCxjQUFlO0FBQ2IsV0FBSyxRQUFRO0FBQ2IsV0FBSyxnQkFBZ0I7QUFDckIsV0FBSyxpQkFBa0I7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
