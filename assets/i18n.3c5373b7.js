import { h, e as effectScope, r as ref, c as computed, w as watch, F as Fragment, i as inject, o as onMounted, a as onUnmounted, b as isRef, g as getCurrentInstance, s as setupDevtoolsPlugin, d as createVNode, T as Text, f as boot } from "./index.e6710fc9.js";
/*!
  * shared v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const assign = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
/*!
  * message-compiler v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const CompileErrorCodes = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  __EXTEND_POINT__: 15
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages: messages2, args } = options;
  const msg = code2;
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
/*!
  * devtools-if v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const IntlifyDevToolsHooks = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate"
};
/*!
  * core-base v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const pathStateMachine = [];
pathStateMachine[0] = {
  ["w"]: [0],
  ["i"]: [3, 0],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[1] = {
  ["w"]: [1],
  ["."]: [2],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[2] = {
  ["w"]: [2],
  ["i"]: [3, 0],
  ["0"]: [3, 0]
};
pathStateMachine[3] = {
  ["i"]: [3, 0],
  ["0"]: [3, 0],
  ["w"]: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  ["o"]: [7, 1]
};
pathStateMachine[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [
    4,
    2
  ],
  ["]"]: [1, 3],
  ["o"]: 8,
  ["l"]: [4, 0]
};
pathStateMachine[5] = {
  ["'"]: [4, 0],
  ["o"]: 8,
  ["l"]: [5, 0]
};
pathStateMachine[6] = {
  ['"']: [4, 0],
  ["o"]: 8,
  ["l"]: [6, 0]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[0] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[1] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[2] = () => {
    actions[0]();
    subPathDepth++;
  };
  actions[3] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[0]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[1]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[0]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap["l"] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages2) => {
    return messages2[pluralRule(pluralIndex, messages2.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    let msg = message(key)(ctx);
    if (type2 === "vnode" && isArray(msg) && modifier) {
      msg = msg[0];
    }
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    ["list"]: list,
    ["named"]: named,
    ["plural"]: plural,
    ["linked"]: linked,
    ["message"]: message,
    ["type"]: type,
    ["interpolate"]: interpolate,
    ["normalize"]: normalize
  };
  return ctx;
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n2, version, meta) {
  devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
    timestamp: Date.now(),
    i18n: i18n2,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const CoreWarnCodes = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  __EXTEND_POINT__: 7
};
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.2.2";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const version = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages2 = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages: messages2,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
let code$1 = CompileErrorCodes.__EXTEND_POINT__;
const inc$1 = () => ++code$1;
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$1,
  INVALID_DATE_ARGUMENT: inc$1(),
  INVALID_ISO_DATE_ARGUMENT: inc$1(),
  __EXTEND_POINT__: inc$1()
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages: messages2 } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages2[locale] || {}
  ];
  let format = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format) || isMessageFunction(format))) {
    if (enableDefaultMsg) {
      format = defaultMsgOrKey;
      cacheBaseKey = format;
    }
  }
  if (!resolvedMessage && (!(isString(format) || isMessageFunction(format)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const errorDetector = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format) ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) : format;
  if (occurred) {
    return format;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString(key) ? key : isMessageFunction(format) ? format.key : "",
      locale: targetLocale || (isMessageFunction(format) ? format.locale : ""),
      format: isString(format) ? format : isMessageFunction(format) ? format.source : "",
      message: ret
    };
    payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages: messages2, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages2[targetLocale] || {};
    if ((format = resolveValue2(message, key)) === null) {
      format = message[key];
    }
    if (isString(format) || isFunction(format))
      break;
    const missingRet = handleMissing(
      context,
      key,
      targetLocale,
      missingWarn,
      type
    );
    if (missingRet !== key) {
      format = missingRet;
    }
  }
  return [format, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format)) {
    const msg2 = format;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format, getCompileOptions(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
  return {
    warnHtmlMessage,
    onError: (err) => {
      errorDetector && errorDetector(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message, key);
    if (val == null && fallbackContext) {
      const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message2, key);
    }
    if (isString(val)) {
      let occurred = false;
      const errorDetector = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format = datetimeFormat[key];
    if (isPlainObject(format))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format) {
  const context = ctx;
  for (const key in format) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format = numberFormat[key];
    if (isPlainObject(format))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format) {
  const context = ctx;
  for (const key in format) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
/*!
  * vue-devtools v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VueDevToolsLabels = {
  ["vue-devtools-plugin-vue-i18n"]: "Vue I18n devtools",
  ["vue-i18n-resource-inspector"]: "I18n Resources",
  ["vue-i18n-timeline"]: "Vue I18n"
};
const VueDevToolsPlaceholders = {
  ["vue-i18n-resource-inspector"]: "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  ["vue-i18n-timeline"]: 16764185
};
/*!
  * vue-i18n v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.2.2";
CoreWarnCodes.__EXTEND_POINT__;
let code = CompileErrorCodes.__EXTEND_POINT__;
const inc = () => ++code;
const I18nErrorCodes = {
  UNEXPECTED_RETURN_TYPE: code,
  INVALID_ARGUMENT: inc(),
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSLALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSLALLED_WITH_PROVIDE: inc(),
  UNEXPECTED_ERROR: inc(),
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  __EXTEND_POINT__: inc()
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TransrateVNodeSymbol = /* @__PURE__ */ makeSymbol("__transrateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOption = /* @__PURE__ */ makeSymbol("__injectWithOption");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages: messages2, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages2) ? messages2 : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(global2, options, componentOptions) {
  let messages2 = isObject(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages2 = getLocaleMessages(global2.locale.value, {
      messages: messages2,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages2);
  if (locales.length) {
    locales.forEach((locale) => {
      global2.mergeLocaleMessage(locale, messages2[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = ref(
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages2 = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    {
      try {
        setAdditionalMeta(getMetaInfo());
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      (root) => root[TransrateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages3 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages3 = messageValue;
        break;
      }
    }
    return messages3;
  }
  function tm(key) {
    const messages3 = resolveMessages(key);
    return messages3 != null ? messages3 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = format;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function mergeDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = format;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  function mergeNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages: messages2,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOption] = options.__injectWithOption;
    composer[TransrateVNodeSymbol] = transrateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return slot = [
        ...slot,
        ...isArray(current.children) ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const Translation = {
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n2[TransrateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign({}, attrs);
      const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
};
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormat = {
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n2[NumberPartsSymbol](...args));
  }
};
const DatetimeFormat = {
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n2[DatetimePartsSymbol](...args));
  }
};
function getComposer$2(i18n2, instance) {
  const i18nInternal = i18n2;
  if (i18n2.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n2.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
  }
}
function vTDirective(i18n2) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n2, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n2.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n2, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app.component(NumberFormat.name, NumberFormat);
    app.component(DatetimeFormat.name, DatetimeFormat);
  }
  {
    app.directive("t", vTDirective(i18n2));
  }
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
async function enableDevTools(app, i18n2) {
  return new Promise((resolve, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n2);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el && componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n2.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels["vue-i18n-resource-inspector"],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n2);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n2);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n2);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n2);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels["vue-i18n-timeline"],
          color: VueDevToolsTimelineColors["vue-i18n-timeline"]
        });
        resolve(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n2) {
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages2) {
  const value = {};
  Object.keys(messages2).forEach((key) => {
    const v = messages2[key];
    if (isFunction(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isObject(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>\u0192</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n2) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  for (const [keyInstance, instance] of i18n2.__instances) {
    const composer = i18n2.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n2) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n2.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$1(nodeId, i18n2) {
  if (nodeId === "global") {
    return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  } else {
    const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n2.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n2 = {
      get mode() {
        return "composition";
      },
      get allowComposition() {
        return __allowComposition;
      },
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (__globalInjection) {
          injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          i18n2.dispose();
          unmountApp();
        };
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          }
          const emitter = createEmitter();
          {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      __instances,
      __getInstance,
      __setInstance,
      __deleteInstance
    };
    return i18n2;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSLALLED);
  }
  const i18n2 = getI18nInstance(instance);
  const global2 = getGlobalComposer(i18n2);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(global2, options, componentOptions);
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n2, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = global2;
    }
    return composer2;
  }
  const i18nInternal = i18n2;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n2 = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSLALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n2) {
  return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
}
function getComposer(i18n2, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n2, target, composer) {
  let emitter = null;
  {
    onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm"];
function injectGlobalFields(app, composer) {
  const i18n2 = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n2, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n2;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
var enUS = {
  login: {
    title: "Log in",
    email: "Email",
    password: "Password",
    remember_me: "Remember me?",
    action_login: "Log in",
    enter_valid_email: "Please enter a valid email address.",
    welcome: "Welcome back!",
    error: "The email address or password is incorrect."
  }
};
var esSP = {
  login: {
    title: "Iniciar sesi\xF3n",
    email: "Correo electr\xF3nico",
    password: "Contrase\xF1a",
    remember_me: "Mantener sesi\xF3n activa?",
    action_login: "Ingresar",
    enter_valid_email: "Por favor ingrese un correo electr\xF3nico v\xE1lido.",
    welcome: "\xA1Bienvenido!",
    error: "El correo electr\xF3nico o contrase\xF1a es incorrecto."
  }
};
var messages = {
  "en-US": enUS,
  "es-SP": esSP
};
var i18n = boot(({ app }) => {
  const i18n2 = createI18n({
    locale: "en-US",
    globalInjection: true,
    messages
  });
  app.use(i18n2);
});
export { i18n as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi4zYzUzNzNiNy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BpbnRsaWZ5L3NoYXJlZC9kaXN0L3NoYXJlZC5lc20tYnVuZGxlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AaW50bGlmeS9tZXNzYWdlLWNvbXBpbGVyL2Rpc3QvbWVzc2FnZS1jb21waWxlci5lc20tYnVuZGxlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AaW50bGlmeS9kZXZ0b29scy1pZi9kaXN0L2RldnRvb2xzLWlmLmVzbS1idW5kbGVyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BpbnRsaWZ5L2NvcmUtYmFzZS9kaXN0L2NvcmUtYmFzZS5lc20tYnVuZGxlci5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AaW50bGlmeS92dWUtZGV2dG9vbHMvZGlzdC92dWUtZGV2dG9vbHMuZXNtLWJ1bmRsZXIuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWkxOG4vZGlzdC92dWUtaTE4bi5ydW50aW1lLmVzbS1idW5kbGVyLmpzIiwiLi4vLi4vLi4vc3JjL2kxOG4vZW4tVVMvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvaTE4bi9lcy1TUC9pbmRleC5qcyIsIi4uLy4uLy4uL3NyYy9pMThuL2luZGV4LmpzIiwiLi4vLi4vLi4vc3JjL2Jvb3QvaTE4bi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAgKiBzaGFyZWQgdjkuMi4yXG4gICogKGMpIDIwMjIga2F6dXlhIGthd2FndWNoaVxuICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAgKi9cbi8qKlxyXG4gKiBPcmlnaW5hbCBVdGlsaXRpZXNcclxuICogd3JpdHRlbiBieSBrYXp1eWEga2F3YWd1Y2hpXHJcbiAqL1xyXG5jb25zdCBpbkJyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcclxubGV0IG1hcms7XHJcbmxldCBtZWFzdXJlO1xyXG5pZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XHJcbiAgICBjb25zdCBwZXJmID0gaW5Ccm93c2VyICYmIHdpbmRvdy5wZXJmb3JtYW5jZTtcclxuICAgIGlmIChwZXJmICYmXHJcbiAgICAgICAgcGVyZi5tYXJrICYmXHJcbiAgICAgICAgcGVyZi5tZWFzdXJlICYmXHJcbiAgICAgICAgcGVyZi5jbGVhck1hcmtzICYmXHJcbiAgICAgICAgcGVyZi5jbGVhck1lYXN1cmVzKSB7XHJcbiAgICAgICAgbWFyayA9ICh0YWcpID0+IHBlcmYubWFyayh0YWcpO1xyXG4gICAgICAgIG1lYXN1cmUgPSAobmFtZSwgc3RhcnRUYWcsIGVuZFRhZykgPT4ge1xyXG4gICAgICAgICAgICBwZXJmLm1lYXN1cmUobmFtZSwgc3RhcnRUYWcsIGVuZFRhZyk7XHJcbiAgICAgICAgICAgIHBlcmYuY2xlYXJNYXJrcyhzdGFydFRhZyk7XHJcbiAgICAgICAgICAgIHBlcmYuY2xlYXJNYXJrcyhlbmRUYWcpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuY29uc3QgUkVfQVJHUyA9IC9cXHsoWzAtOWEtekEtWl0rKVxcfS9nO1xyXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG5mdW5jdGlvbiBmb3JtYXQobWVzc2FnZSwgLi4uYXJncykge1xyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGlzT2JqZWN0KGFyZ3NbMF0pKSB7XHJcbiAgICAgICAgYXJncyA9IGFyZ3NbMF07XHJcbiAgICB9XHJcbiAgICBpZiAoIWFyZ3MgfHwgIWFyZ3MuaGFzT3duUHJvcGVydHkpIHtcclxuICAgICAgICBhcmdzID0ge307XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVzc2FnZS5yZXBsYWNlKFJFX0FSR1MsIChtYXRjaCwgaWRlbnRpZmllcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBhcmdzLmhhc093blByb3BlcnR5KGlkZW50aWZpZXIpID8gYXJnc1tpZGVudGlmaWVyXSA6ICcnO1xyXG4gICAgfSk7XHJcbn1cclxuY29uc3QgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnRvU3RyaW5nVGFnID09PSAnc3ltYm9sJztcclxuY29uc3QgbWFrZVN5bWJvbCA9IChuYW1lKSA9PiBoYXNTeW1ib2wgPyBTeW1ib2wobmFtZSkgOiBuYW1lO1xyXG5jb25zdCBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5ID0gKGxvY2FsZSwga2V5LCBzb3VyY2UpID0+IGZyaWVuZGx5SlNPTnN0cmluZ2lmeSh7IGw6IGxvY2FsZSwgazoga2V5LCBzOiBzb3VyY2UgfSk7XHJcbmNvbnN0IGZyaWVuZGx5SlNPTnN0cmluZ2lmeSA9IChqc29uKSA9PiBKU09OLnN0cmluZ2lmeShqc29uKVxyXG4gICAgLnJlcGxhY2UoL1xcdTIwMjgvZywgJ1xcXFx1MjAyOCcpXHJcbiAgICAucmVwbGFjZSgvXFx1MjAyOS9nLCAnXFxcXHUyMDI5JylcclxuICAgIC5yZXBsYWNlKC9cXHUwMDI3L2csICdcXFxcdTAwMjcnKTtcclxuY29uc3QgaXNOdW1iZXIgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpO1xyXG5jb25zdCBpc0RhdGUgPSAodmFsKSA9PiB0b1R5cGVTdHJpbmcodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xyXG5jb25zdCBpc1JlZ0V4cCA9ICh2YWwpID0+IHRvVHlwZVN0cmluZyh2YWwpID09PSAnW29iamVjdCBSZWdFeHBdJztcclxuY29uc3QgaXNFbXB0eU9iamVjdCA9ICh2YWwpID0+IGlzUGxhaW5PYmplY3QodmFsKSAmJiBPYmplY3Qua2V5cyh2YWwpLmxlbmd0aCA9PT0gMDtcclxuZnVuY3Rpb24gd2Fybihtc2csIGVycikge1xyXG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgW2ludGxpZnldIGAgKyBtc2cpO1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKGVyci5zdGFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmNvbnN0IGFzc2lnbiA9IE9iamVjdC5hc3NpZ247XHJcbmxldCBfZ2xvYmFsVGhpcztcclxuY29uc3QgZ2V0R2xvYmFsVGhpcyA9ICgpID0+IHtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgcmV0dXJuIChfZ2xvYmFsVGhpcyB8fFxyXG4gICAgICAgIChfZ2xvYmFsVGhpcyA9XHJcbiAgICAgICAgICAgIHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgPyBnbG9iYWxUaGlzXHJcbiAgICAgICAgICAgICAgICA6IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZlxyXG4gICAgICAgICAgICAgICAgICAgIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyB3aW5kb3dcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBnbG9iYWxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDoge30pKTtcclxufTtcclxuZnVuY3Rpb24gZXNjYXBlSHRtbChyYXdUZXh0KSB7XHJcbiAgICByZXR1cm4gcmF3VGV4dFxyXG4gICAgICAgIC5yZXBsYWNlKC88L2csICcmbHQ7JylcclxuICAgICAgICAucmVwbGFjZSgvPi9nLCAnJmd0OycpXHJcbiAgICAgICAgLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKVxyXG4gICAgICAgIC5yZXBsYWNlKC8nL2csICcmYXBvczsnKTtcclxufVxyXG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcbmZ1bmN0aW9uIGhhc093bihvYmosIGtleSkge1xyXG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpO1xyXG59XHJcbi8qIGVzbGludC1lbmFibGUgKi9cclxuLyoqXHJcbiAqIFVzZWZ1bCBVdGlsaXRpZXMgQnkgRXZhbiB5b3VcclxuICogTW9kaWZpZWQgYnkga2F6dXlhIGthd2FndWNoaVxyXG4gKiBNSVQgTGljZW5zZVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVlLW5leHQvYmxvYi9tYXN0ZXIvcGFja2FnZXMvc2hhcmVkL3NyYy9pbmRleC50c1xyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdnVlanMvdnVlLW5leHQvYmxvYi9tYXN0ZXIvcGFja2FnZXMvc2hhcmVkL3NyYy9jb2RlZnJhbWUudHNcclxuICovXHJcbmNvbnN0IGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xyXG5jb25zdCBpc0Z1bmN0aW9uID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcclxuY29uc3QgaXNTdHJpbmcgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcclxuY29uc3QgaXNCb29sZWFuID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nO1xyXG5jb25zdCBpc1N5bWJvbCA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdzeW1ib2wnO1xyXG5jb25zdCBpc09iamVjdCA9ICh2YWwpID0+IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JztcclxuY29uc3QgaXNQcm9taXNlID0gKHZhbCkgPT4ge1xyXG4gICAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwudGhlbikgJiYgaXNGdW5jdGlvbih2YWwuY2F0Y2gpO1xyXG59O1xyXG5jb25zdCBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XHJcbmNvbnN0IHRvVHlwZVN0cmluZyA9ICh2YWx1ZSkgPT4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XHJcbmNvbnN0IGlzUGxhaW5PYmplY3QgPSAodmFsKSA9PiB0b1R5cGVTdHJpbmcodmFsKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XHJcbi8vIGZvciBjb252ZXJ0aW5nIGxpc3QgYW5kIG5hbWVkIHZhbHVlcyB0byBkaXNwbGF5ZWQgc3RyaW5ncy5cclxuY29uc3QgdG9EaXNwbGF5U3RyaW5nID0gKHZhbCkgPT4ge1xyXG4gICAgcmV0dXJuIHZhbCA9PSBudWxsXHJcbiAgICAgICAgPyAnJ1xyXG4gICAgICAgIDogaXNBcnJheSh2YWwpIHx8IChpc1BsYWluT2JqZWN0KHZhbCkgJiYgdmFsLnRvU3RyaW5nID09PSBvYmplY3RUb1N0cmluZylcclxuICAgICAgICAgICAgPyBKU09OLnN0cmluZ2lmeSh2YWwsIG51bGwsIDIpXHJcbiAgICAgICAgICAgIDogU3RyaW5nKHZhbCk7XHJcbn07XHJcbmNvbnN0IFJBTkdFID0gMjtcclxuZnVuY3Rpb24gZ2VuZXJhdGVDb2RlRnJhbWUoc291cmNlLCBzdGFydCA9IDAsIGVuZCA9IHNvdXJjZS5sZW5ndGgpIHtcclxuICAgIGNvbnN0IGxpbmVzID0gc291cmNlLnNwbGl0KC9cXHI/XFxuLyk7XHJcbiAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgY29uc3QgcmVzID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY291bnQgKz0gbGluZXNbaV0ubGVuZ3RoICsgMTtcclxuICAgICAgICBpZiAoY291bnQgPj0gc3RhcnQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IGkgLSBSQU5HRTsgaiA8PSBpICsgUkFOR0UgfHwgZW5kID4gY291bnQ7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGogPCAwIHx8IGogPj0gbGluZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IGogKyAxO1xyXG4gICAgICAgICAgICAgICAgcmVzLnB1c2goYCR7bGluZX0keycgJy5yZXBlYXQoMyAtIFN0cmluZyhsaW5lKS5sZW5ndGgpfXwgICR7bGluZXNbal19YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lTGVuZ3RoID0gbGluZXNbal0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGogPT09IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwdXNoIHVuZGVybGluZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZCA9IHN0YXJ0IC0gKGNvdW50IC0gbGluZUxlbmd0aCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlbmd0aCA9IE1hdGgubWF4KDEsIGVuZCA+IGNvdW50ID8gbGluZUxlbmd0aCAtIHBhZCA6IGVuZCAtIHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChgICAgfCAgYCArICcgJy5yZXBlYXQocGFkKSArICdeJy5yZXBlYXQobGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChqID4gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbmQgPiBjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBNYXRoLm1heChNYXRoLm1pbihlbmQgLSBjb3VudCwgbGluZUxlbmd0aCksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucHVzaChgICAgfCAgYCArICdeJy5yZXBlYXQobGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ICs9IGxpbmVMZW5ndGggKyAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXMuam9pbignXFxuJyk7XHJcbn1cblxuLyoqXHJcbiAqIEV2ZW50IGVtaXR0ZXIsIGZvcmtlZCBmcm9tIHRoZSBiZWxvdzpcclxuICogLSBvcmlnaW5hbCByZXBvc2l0b3J5IHVybDogaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BpdC9taXR0XHJcbiAqIC0gY29kZSB1cmw6IGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvbWl0dC9ibG9iL21hc3Rlci9zcmMvaW5kZXgudHNcclxuICogLSBhdXRob3I6IEphc29uIE1pbGxlciAoaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BpdClcclxuICogLSBsaWNlbnNlOiBNSVRcclxuICovXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBldmVudCBlbWl0dGVyXHJcbiAqXHJcbiAqIEByZXR1cm5zIEFuIGV2ZW50IGVtaXR0ZXJcclxuICovXHJcbmZ1bmN0aW9uIGNyZWF0ZUVtaXR0ZXIoKSB7XHJcbiAgICBjb25zdCBldmVudHMgPSBuZXcgTWFwKCk7XHJcbiAgICBjb25zdCBlbWl0dGVyID0ge1xyXG4gICAgICAgIGV2ZW50cyxcclxuICAgICAgICBvbihldmVudCwgaGFuZGxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVycyA9IGV2ZW50cy5nZXQoZXZlbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBhZGRlZCA9IGhhbmRsZXJzICYmIGhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcbiAgICAgICAgICAgIGlmICghYWRkZWQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50cy5zZXQoZXZlbnQsIFtoYW5kbGVyXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG9mZihldmVudCwgaGFuZGxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBoYW5kbGVycyA9IGV2ZW50cy5nZXQoZXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlcnMpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpID4+PiAwLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZW1pdChldmVudCwgcGF5bG9hZCkge1xyXG4gICAgICAgICAgICAoZXZlbnRzLmdldChldmVudCkgfHwgW10pXHJcbiAgICAgICAgICAgICAgICAuc2xpY2UoKVxyXG4gICAgICAgICAgICAgICAgLm1hcChoYW5kbGVyID0+IGhhbmRsZXIocGF5bG9hZCkpO1xyXG4gICAgICAgICAgICAoZXZlbnRzLmdldCgnKicpIHx8IFtdKVxyXG4gICAgICAgICAgICAgICAgLnNsaWNlKClcclxuICAgICAgICAgICAgICAgIC5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKGV2ZW50LCBwYXlsb2FkKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiBlbWl0dGVyO1xyXG59XG5cbmV4cG9ydCB7IGFzc2lnbiwgY3JlYXRlRW1pdHRlciwgZXNjYXBlSHRtbCwgZm9ybWF0LCBmcmllbmRseUpTT05zdHJpbmdpZnksIGdlbmVyYXRlQ29kZUZyYW1lLCBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5LCBnZXRHbG9iYWxUaGlzLCBoYXNPd24sIGluQnJvd3NlciwgaXNBcnJheSwgaXNCb29sZWFuLCBpc0RhdGUsIGlzRW1wdHlPYmplY3QsIGlzRnVuY3Rpb24sIGlzTnVtYmVyLCBpc09iamVjdCwgaXNQbGFpbk9iamVjdCwgaXNQcm9taXNlLCBpc1JlZ0V4cCwgaXNTdHJpbmcsIGlzU3ltYm9sLCBtYWtlU3ltYm9sLCBtYXJrLCBtZWFzdXJlLCBvYmplY3RUb1N0cmluZywgdG9EaXNwbGF5U3RyaW5nLCB0b1R5cGVTdHJpbmcsIHdhcm4gfTtcbiIsIi8qIVxuICAqIG1lc3NhZ2UtY29tcGlsZXIgdjkuMi4yXG4gICogKGMpIDIwMjIga2F6dXlhIGthd2FndWNoaVxuICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAgKi9cbmltcG9ydCB7IGZvcm1hdCwgYXNzaWduLCBpc1N0cmluZyB9IGZyb20gJ0BpbnRsaWZ5L3NoYXJlZCc7XG5cbmNvbnN0IENvbXBpbGVFcnJvckNvZGVzID0ge1xyXG4gICAgLy8gdG9rZW5pemVyIGVycm9yIGNvZGVzXHJcbiAgICBFWFBFQ1RFRF9UT0tFTjogMSxcclxuICAgIElOVkFMSURfVE9LRU5fSU5fUExBQ0VIT0xERVI6IDIsXHJcbiAgICBVTlRFUk1JTkFURURfU0lOR0xFX1FVT1RFX0lOX1BMQUNFSE9MREVSOiAzLFxyXG4gICAgVU5LTk9XTl9FU0NBUEVfU0VRVUVOQ0U6IDQsXHJcbiAgICBJTlZBTElEX1VOSUNPREVfRVNDQVBFX1NFUVVFTkNFOiA1LFxyXG4gICAgVU5CQUxBTkNFRF9DTE9TSU5HX0JSQUNFOiA2LFxyXG4gICAgVU5URVJNSU5BVEVEX0NMT1NJTkdfQlJBQ0U6IDcsXHJcbiAgICBFTVBUWV9QTEFDRUhPTERFUjogOCxcclxuICAgIE5PVF9BTExPV19ORVNUX1BMQUNFSE9MREVSOiA5LFxyXG4gICAgSU5WQUxJRF9MSU5LRURfRk9STUFUOiAxMCxcclxuICAgIC8vIHBhcnNlciBlcnJvciBjb2Rlc1xyXG4gICAgTVVTVF9IQVZFX01FU1NBR0VTX0lOX1BMVVJBTDogMTEsXHJcbiAgICBVTkVYUEVDVEVEX0VNUFRZX0xJTktFRF9NT0RJRklFUjogMTIsXHJcbiAgICBVTkVYUEVDVEVEX0VNUFRZX0xJTktFRF9LRVk6IDEzLFxyXG4gICAgVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTOiAxNCxcclxuICAgIC8vIFNwZWNpYWwgdmFsdWUgZm9yIGhpZ2hlci1vcmRlciBjb21waWxlcnMgdG8gcGljayB1cCB0aGUgbGFzdCBjb2RlXHJcbiAgICAvLyB0byBhdm9pZCBjb2xsaXNpb24gb2YgZXJyb3IgY29kZXMuIFRoaXMgc2hvdWxkIGFsd2F5cyBiZSBrZXB0IGFzIHRoZSBsYXN0XHJcbiAgICAvLyBpdGVtLlxyXG4gICAgX19FWFRFTkRfUE9JTlRfXzogMTVcclxufTtcclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5jb25zdCBlcnJvck1lc3NhZ2VzID0ge1xyXG4gICAgLy8gdG9rZW5pemVyIGVycm9yIG1lc3NhZ2VzXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuRVhQRUNURURfVE9LRU5dOiBgRXhwZWN0ZWQgdG9rZW46ICd7MH0nYCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX1RPS0VOX0lOX1BMQUNFSE9MREVSXTogYEludmFsaWQgdG9rZW4gaW4gcGxhY2Vob2xkZXI6ICd7MH0nYCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfU0lOR0xFX1FVT1RFX0lOX1BMQUNFSE9MREVSXTogYFVudGVybWluYXRlZCBzaW5nbGUgcXVvdGUgaW4gcGxhY2Vob2xkZXJgLFxyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVOS05PV05fRVNDQVBFX1NFUVVFTkNFXTogYFVua25vd24gZXNjYXBlIHNlcXVlbmNlOiBcXFxcezB9YCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX1VOSUNPREVfRVNDQVBFX1NFUVVFTkNFXTogYEludmFsaWQgdW5pY29kZSBlc2NhcGUgc2VxdWVuY2U6IHswfWAsXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5CQUxBTkNFRF9DTE9TSU5HX0JSQUNFXTogYFVuYmFsYW5jZWQgY2xvc2luZyBicmFjZWAsXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX0NMT1NJTkdfQlJBQ0VdOiBgVW50ZXJtaW5hdGVkIGNsb3NpbmcgYnJhY2VgLFxyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLkVNUFRZX1BMQUNFSE9MREVSXTogYEVtcHR5IHBsYWNlaG9sZGVyYCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5OT1RfQUxMT1dfTkVTVF9QTEFDRUhPTERFUl06IGBOb3QgYWxsb3dlZCBuZXN0IHBsYWNlaG9sZGVyYCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX0xJTktFRF9GT1JNQVRdOiBgSW52YWxpZCBsaW5rZWQgZm9ybWF0YCxcclxuICAgIC8vIHBhcnNlciBlcnJvciBtZXNzYWdlc1xyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLk1VU1RfSEFWRV9NRVNTQUdFU19JTl9QTFVSQUxdOiBgUGx1cmFsIG11c3QgaGF2ZSBtZXNzYWdlc2AsXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfTU9ESUZJRVJdOiBgVW5leHBlY3RlZCBlbXB0eSBsaW5rZWQgbW9kaWZpZXJgLFxyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfRU1QVFlfTElOS0VEX0tFWV06IGBVbmV4cGVjdGVkIGVtcHR5IGxpbmtlZCBrZXlgLFxyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJU106IGBVbmV4cGVjdGVkIGxleGljYWwgYW5hbHlzaXMgaW4gdG9rZW46ICd7MH0nYFxyXG59O1xyXG5mdW5jdGlvbiBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbG9jLCBvcHRpb25zID0ge30pIHtcclxuICAgIGNvbnN0IHsgZG9tYWluLCBtZXNzYWdlcywgYXJncyB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IG1zZyA9IChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKVxyXG4gICAgICAgID8gZm9ybWF0KChtZXNzYWdlcyB8fCBlcnJvck1lc3NhZ2VzKVtjb2RlXSB8fCAnJywgLi4uKGFyZ3MgfHwgW10pKVxyXG4gICAgICAgIDogY29kZTtcclxuICAgIGNvbnN0IGVycm9yID0gbmV3IFN5bnRheEVycm9yKFN0cmluZyhtc2cpKTtcclxuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xyXG4gICAgaWYgKGxvYykge1xyXG4gICAgICAgIGVycm9yLmxvY2F0aW9uID0gbG9jO1xyXG4gICAgfVxyXG4gICAgZXJyb3IuZG9tYWluID0gZG9tYWluO1xyXG4gICAgcmV0dXJuIGVycm9yO1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gZGVmYXVsdE9uRXJyb3IoZXJyb3IpIHtcclxuICAgIHRocm93IGVycm9yO1xyXG59XG5cbmNvbnN0IExvY2F0aW9uU3R1YiA9IHtcclxuICAgIHN0YXJ0OiB7IGxpbmU6IDEsIGNvbHVtbjogMSwgb2Zmc2V0OiAwIH0sXHJcbiAgICBlbmQ6IHsgbGluZTogMSwgY29sdW1uOiAxLCBvZmZzZXQ6IDAgfVxyXG59O1xyXG5mdW5jdGlvbiBjcmVhdGVQb3NpdGlvbihsaW5lLCBjb2x1bW4sIG9mZnNldCkge1xyXG4gICAgcmV0dXJuIHsgbGluZSwgY29sdW1uLCBvZmZzZXQgfTtcclxufVxyXG5mdW5jdGlvbiBjcmVhdGVMb2NhdGlvbihzdGFydCwgZW5kLCBzb3VyY2UpIHtcclxuICAgIGNvbnN0IGxvYyA9IHsgc3RhcnQsIGVuZCB9O1xyXG4gICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XHJcbiAgICAgICAgbG9jLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgIH1cclxuICAgIHJldHVybiBsb2M7XHJcbn1cblxuY29uc3QgQ0hBUl9TUCA9ICcgJztcclxuY29uc3QgQ0hBUl9DUiA9ICdcXHInO1xyXG5jb25zdCBDSEFSX0xGID0gJ1xcbic7XHJcbmNvbnN0IENIQVJfTFMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4MjAyOCk7XHJcbmNvbnN0IENIQVJfUFMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4MjAyOSk7XHJcbmZ1bmN0aW9uIGNyZWF0ZVNjYW5uZXIoc3RyKSB7XHJcbiAgICBjb25zdCBfYnVmID0gc3RyO1xyXG4gICAgbGV0IF9pbmRleCA9IDA7XHJcbiAgICBsZXQgX2xpbmUgPSAxO1xyXG4gICAgbGV0IF9jb2x1bW4gPSAxO1xyXG4gICAgbGV0IF9wZWVrT2Zmc2V0ID0gMDtcclxuICAgIGNvbnN0IGlzQ1JMRiA9IChpbmRleCkgPT4gX2J1ZltpbmRleF0gPT09IENIQVJfQ1IgJiYgX2J1ZltpbmRleCArIDFdID09PSBDSEFSX0xGO1xyXG4gICAgY29uc3QgaXNMRiA9IChpbmRleCkgPT4gX2J1ZltpbmRleF0gPT09IENIQVJfTEY7XHJcbiAgICBjb25zdCBpc1BTID0gKGluZGV4KSA9PiBfYnVmW2luZGV4XSA9PT0gQ0hBUl9QUztcclxuICAgIGNvbnN0IGlzTFMgPSAoaW5kZXgpID0+IF9idWZbaW5kZXhdID09PSBDSEFSX0xTO1xyXG4gICAgY29uc3QgaXNMaW5lRW5kID0gKGluZGV4KSA9PiBpc0NSTEYoaW5kZXgpIHx8IGlzTEYoaW5kZXgpIHx8IGlzUFMoaW5kZXgpIHx8IGlzTFMoaW5kZXgpO1xyXG4gICAgY29uc3QgaW5kZXggPSAoKSA9PiBfaW5kZXg7XHJcbiAgICBjb25zdCBsaW5lID0gKCkgPT4gX2xpbmU7XHJcbiAgICBjb25zdCBjb2x1bW4gPSAoKSA9PiBfY29sdW1uO1xyXG4gICAgY29uc3QgcGVla09mZnNldCA9ICgpID0+IF9wZWVrT2Zmc2V0O1xyXG4gICAgY29uc3QgY2hhckF0ID0gKG9mZnNldCkgPT4gaXNDUkxGKG9mZnNldCkgfHwgaXNQUyhvZmZzZXQpIHx8IGlzTFMob2Zmc2V0KSA/IENIQVJfTEYgOiBfYnVmW29mZnNldF07XHJcbiAgICBjb25zdCBjdXJyZW50Q2hhciA9ICgpID0+IGNoYXJBdChfaW5kZXgpO1xyXG4gICAgY29uc3QgY3VycmVudFBlZWsgPSAoKSA9PiBjaGFyQXQoX2luZGV4ICsgX3BlZWtPZmZzZXQpO1xyXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgICAgICBfcGVla09mZnNldCA9IDA7XHJcbiAgICAgICAgaWYgKGlzTGluZUVuZChfaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIF9saW5lKys7XHJcbiAgICAgICAgICAgIF9jb2x1bW4gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNDUkxGKF9pbmRleCkpIHtcclxuICAgICAgICAgICAgX2luZGV4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9pbmRleCsrO1xyXG4gICAgICAgIF9jb2x1bW4rKztcclxuICAgICAgICByZXR1cm4gX2J1ZltfaW5kZXhdO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGVlaygpIHtcclxuICAgICAgICBpZiAoaXNDUkxGKF9pbmRleCArIF9wZWVrT2Zmc2V0KSkge1xyXG4gICAgICAgICAgICBfcGVla09mZnNldCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfcGVla09mZnNldCsrO1xyXG4gICAgICAgIHJldHVybiBfYnVmW19pbmRleCArIF9wZWVrT2Zmc2V0XTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xyXG4gICAgICAgIF9pbmRleCA9IDA7XHJcbiAgICAgICAgX2xpbmUgPSAxO1xyXG4gICAgICAgIF9jb2x1bW4gPSAxO1xyXG4gICAgICAgIF9wZWVrT2Zmc2V0ID0gMDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlc2V0UGVlayhvZmZzZXQgPSAwKSB7XHJcbiAgICAgICAgX3BlZWtPZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBza2lwVG9QZWVrKCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IF9pbmRleCArIF9wZWVrT2Zmc2V0O1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bm1vZGlmaWVkLWxvb3AtY29uZGl0aW9uXHJcbiAgICAgICAgd2hpbGUgKHRhcmdldCAhPT0gX2luZGV4KSB7XHJcbiAgICAgICAgICAgIG5leHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX3BlZWtPZmZzZXQgPSAwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbmRleCxcclxuICAgICAgICBsaW5lLFxyXG4gICAgICAgIGNvbHVtbixcclxuICAgICAgICBwZWVrT2Zmc2V0LFxyXG4gICAgICAgIGNoYXJBdCxcclxuICAgICAgICBjdXJyZW50Q2hhcixcclxuICAgICAgICBjdXJyZW50UGVlayxcclxuICAgICAgICBuZXh0LFxyXG4gICAgICAgIHBlZWssXHJcbiAgICAgICAgcmVzZXQsXHJcbiAgICAgICAgcmVzZXRQZWVrLFxyXG4gICAgICAgIHNraXBUb1BlZWtcclxuICAgIH07XHJcbn1cblxuY29uc3QgRU9GID0gdW5kZWZpbmVkO1xyXG5jb25zdCBMSVRFUkFMX0RFTElNSVRFUiA9IFwiJ1wiO1xyXG5jb25zdCBFUlJPUl9ET01BSU4kMSA9ICd0b2tlbml6ZXInO1xyXG5mdW5jdGlvbiBjcmVhdGVUb2tlbml6ZXIoc291cmNlLCBvcHRpb25zID0ge30pIHtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiAhPT0gZmFsc2U7XHJcbiAgICBjb25zdCBfc2NuciA9IGNyZWF0ZVNjYW5uZXIoc291cmNlKTtcclxuICAgIGNvbnN0IGN1cnJlbnRPZmZzZXQgPSAoKSA9PiBfc2Nuci5pbmRleCgpO1xyXG4gICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gKCkgPT4gY3JlYXRlUG9zaXRpb24oX3NjbnIubGluZSgpLCBfc2Nuci5jb2x1bW4oKSwgX3NjbnIuaW5kZXgoKSk7XHJcbiAgICBjb25zdCBfaW5pdExvYyA9IGN1cnJlbnRQb3NpdGlvbigpO1xyXG4gICAgY29uc3QgX2luaXRPZmZzZXQgPSBjdXJyZW50T2Zmc2V0KCk7XHJcbiAgICBjb25zdCBfY29udGV4dCA9IHtcclxuICAgICAgICBjdXJyZW50VHlwZTogMTQgLyogRU9GICovLFxyXG4gICAgICAgIG9mZnNldDogX2luaXRPZmZzZXQsXHJcbiAgICAgICAgc3RhcnRMb2M6IF9pbml0TG9jLFxyXG4gICAgICAgIGVuZExvYzogX2luaXRMb2MsXHJcbiAgICAgICAgbGFzdFR5cGU6IDE0IC8qIEVPRiAqLyxcclxuICAgICAgICBsYXN0T2Zmc2V0OiBfaW5pdE9mZnNldCxcclxuICAgICAgICBsYXN0U3RhcnRMb2M6IF9pbml0TG9jLFxyXG4gICAgICAgIGxhc3RFbmRMb2M6IF9pbml0TG9jLFxyXG4gICAgICAgIGJyYWNlTmVzdDogMCxcclxuICAgICAgICBpbkxpbmtlZDogZmFsc2UsXHJcbiAgICAgICAgdGV4dDogJydcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250ZXh0ID0gKCkgPT4gX2NvbnRleHQ7XHJcbiAgICBjb25zdCB7IG9uRXJyb3IgfSA9IG9wdGlvbnM7XHJcbiAgICBmdW5jdGlvbiBlbWl0RXJyb3IoY29kZSwgcG9zLCBvZmZzZXQsIC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCBjdHggPSBjb250ZXh0KCk7XHJcbiAgICAgICAgcG9zLmNvbHVtbiArPSBvZmZzZXQ7XHJcbiAgICAgICAgcG9zLm9mZnNldCArPSBvZmZzZXQ7XHJcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9jID0gY3JlYXRlTG9jYXRpb24oY3R4LnN0YXJ0TG9jLCBwb3MpO1xyXG4gICAgICAgICAgICBjb25zdCBlcnIgPSBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbG9jLCB7XHJcbiAgICAgICAgICAgICAgICBkb21haW46IEVSUk9SX0RPTUFJTiQxLFxyXG4gICAgICAgICAgICAgICAgYXJnc1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgb25FcnJvcihlcnIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldFRva2VuKGNvbnRleHQsIHR5cGUsIHZhbHVlKSB7XHJcbiAgICAgICAgY29udGV4dC5lbmRMb2MgPSBjdXJyZW50UG9zaXRpb24oKTtcclxuICAgICAgICBjb250ZXh0LmN1cnJlbnRUeXBlID0gdHlwZTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHsgdHlwZSB9O1xyXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgICB0b2tlbi5sb2MgPSBjcmVhdGVMb2NhdGlvbihjb250ZXh0LnN0YXJ0TG9jLCBjb250ZXh0LmVuZExvYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRva2VuLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH1cclxuICAgIGNvbnN0IGdldEVuZFRva2VuID0gKGNvbnRleHQpID0+IGdldFRva2VuKGNvbnRleHQsIDE0IC8qIEVPRiAqLyk7XHJcbiAgICBmdW5jdGlvbiBlYXQoc2NuciwgY2gpIHtcclxuICAgICAgICBpZiAoc2Nuci5jdXJyZW50Q2hhcigpID09PSBjaCkge1xyXG4gICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLkVYUEVDVEVEX1RPS0VOLCBjdXJyZW50UG9zaXRpb24oKSwgMCwgY2gpO1xyXG4gICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGVla1NwYWNlcyhzY25yKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9ICcnO1xyXG4gICAgICAgIHdoaWxlIChzY25yLmN1cnJlbnRQZWVrKCkgPT09IENIQVJfU1AgfHwgc2Nuci5jdXJyZW50UGVlaygpID09PSBDSEFSX0xGKSB7XHJcbiAgICAgICAgICAgIGJ1ZiArPSBzY25yLmN1cnJlbnRQZWVrKCk7XHJcbiAgICAgICAgICAgIHNjbnIucGVlaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2tpcFNwYWNlcyhzY25yKSB7XHJcbiAgICAgICAgY29uc3QgYnVmID0gcGVla1NwYWNlcyhzY25yKTtcclxuICAgICAgICBzY25yLnNraXBUb1BlZWsoKTtcclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNJZGVudGlmaWVyU3RhcnQoY2gpIHtcclxuICAgICAgICBpZiAoY2ggPT09IEVPRikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcclxuICAgICAgICByZXR1cm4gKChjYyA+PSA5NyAmJiBjYyA8PSAxMjIpIHx8IC8vIGEtelxyXG4gICAgICAgICAgICAoY2MgPj0gNjUgJiYgY2MgPD0gOTApIHx8IC8vIEEtWlxyXG4gICAgICAgICAgICBjYyA9PT0gOTUgLy8gX1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc051bWJlclN0YXJ0KGNoKSB7XHJcbiAgICAgICAgaWYgKGNoID09PSBFT0YpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjYyA9IGNoLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgcmV0dXJuIGNjID49IDQ4ICYmIGNjIDw9IDU3OyAvLyAwLTlcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzTmFtZWRJZGVudGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSAyIC8qIEJyYWNlTGVmdCAqLykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gaXNJZGVudGlmaWVyU3RhcnQoc2Nuci5jdXJyZW50UGVlaygpKTtcclxuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0xpc3RJZGVudGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSAyIC8qIEJyYWNlTGVmdCAqLykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRQZWVrKCkgPT09ICctJyA/IHNjbnIucGVlaygpIDogc2Nuci5jdXJyZW50UGVlaygpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGlzTnVtYmVyU3RhcnQoY2gpO1xyXG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzTGl0ZXJhbFN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlIH0gPSBjb250ZXh0O1xyXG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMiAvKiBCcmFjZUxlZnQgKi8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gTElURVJBTF9ERUxJTUlURVI7XHJcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNMaW5rZWREb3RTdGFydChzY25yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcclxuICAgICAgICBpZiAoY3VycmVudFR5cGUgIT09IDggLyogTGlua2VkQWxpYXMgKi8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCIuXCIgLyogTGlua2VkRG90ICovO1xyXG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzTGlua2VkTW9kaWZpZXJTdGFydChzY25yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcclxuICAgICAgICBpZiAoY3VycmVudFR5cGUgIT09IDkgLyogTGlua2VkRG90ICovKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcclxuICAgICAgICBjb25zdCByZXQgPSBpc0lkZW50aWZpZXJTdGFydChzY25yLmN1cnJlbnRQZWVrKCkpO1xyXG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzTGlua2VkRGVsaW1pdGVyU3RhcnQoc2NuciwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XHJcbiAgICAgICAgaWYgKCEoY3VycmVudFR5cGUgPT09IDggLyogTGlua2VkQWxpYXMgKi8gfHxcclxuICAgICAgICAgICAgY3VycmVudFR5cGUgPT09IDEyIC8qIExpbmtlZE1vZGlmaWVyICovKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBcIjpcIiAvKiBMaW5rZWREZWxpbWl0ZXIgKi87XHJcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNMaW5rZWRSZWZlclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlIH0gPSBjb250ZXh0O1xyXG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMTAgLyogTGlua2VkRGVsaW1pdGVyICovKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgZm4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50UGVlaygpO1xyXG4gICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIEJyYWNlTGVmdCAqLykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSWRlbnRpZmllclN0YXJ0KHNjbnIucGVlaygpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCJAXCIgLyogTGlua2VkQWxpYXMgKi8gfHxcclxuICAgICAgICAgICAgICAgIGNoID09PSBcIiVcIiAvKiBNb2R1bG8gKi8gfHxcclxuICAgICAgICAgICAgICAgIGNoID09PSBcInxcIiAvKiBQaXBlICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCI6XCIgLyogTGlua2VkRGVsaW1pdGVyICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIuXCIgLyogTGlua2VkRG90ICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gQ0hBUl9TUCB8fFxyXG4gICAgICAgICAgICAgICAgIWNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfTEYpIHtcclxuICAgICAgICAgICAgICAgIHNjbnIucGVlaygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBvdGhlciBjaGFyYWN0ZXJzXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNJZGVudGlmaWVyU3RhcnQoY2gpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCByZXQgPSBmbigpO1xyXG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzUGx1cmFsU3RhcnQoc2Nucikge1xyXG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gc2Nuci5jdXJyZW50UGVlaygpID09PSBcInxcIiAvKiBQaXBlICovO1xyXG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRldGVjdE1vZHVsb1N0YXJ0KHNjbnIpIHtcclxuICAgICAgICBjb25zdCBzcGFjZXMgPSBwZWVrU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCIlXCIgLyogTW9kdWxvICovICYmXHJcbiAgICAgICAgICAgIHNjbnIucGVlaygpID09PSBcIntcIiAvKiBCcmFjZUxlZnQgKi87XHJcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpc01vZHVsbzogcmV0LFxyXG4gICAgICAgICAgICBoYXNTcGFjZTogc3BhY2VzLmxlbmd0aCA+IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNUZXh0U3RhcnQoc2NuciwgcmVzZXQgPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgZm4gPSAoaGFzU3BhY2UgPSBmYWxzZSwgcHJldiA9ICcnLCBkZXRlY3RNb2R1bG8gPSBmYWxzZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudFBlZWsoKTtcclxuICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBCcmFjZUxlZnQgKi8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09PSBcIiVcIiAvKiBNb2R1bG8gKi8gPyBmYWxzZSA6IGhhc1NwYWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcIkBcIiAvKiBMaW5rZWRBbGlhcyAqLyB8fCAhY2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09PSBcIiVcIiAvKiBNb2R1bG8gKi8gPyB0cnVlIDogaGFzU3BhY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwiJVwiIC8qIE1vZHVsbyAqLykge1xyXG4gICAgICAgICAgICAgICAgc2Nuci5wZWVrKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oaGFzU3BhY2UsIFwiJVwiIC8qIE1vZHVsbyAqLywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwifFwiIC8qIFBpcGUgKi8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09PSBcIiVcIiAvKiBNb2R1bG8gKi8gfHwgZGV0ZWN0TW9kdWxvXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgOiAhKHByZXYgPT09IENIQVJfU1AgfHwgcHJldiA9PT0gQ0hBUl9MRik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfU1ApIHtcclxuICAgICAgICAgICAgICAgIHNjbnIucGVlaygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHRydWUsIENIQVJfU1AsIGRldGVjdE1vZHVsbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfTEYpIHtcclxuICAgICAgICAgICAgICAgIHNjbnIucGVlaygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHRydWUsIENIQVJfTEYsIGRldGVjdE1vZHVsbyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZm4oKTtcclxuICAgICAgICByZXNldCAmJiBzY25yLnJlc2V0UGVlaygpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0YWtlQ2hhcihzY25yLCBmbikge1xyXG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xyXG4gICAgICAgIGlmIChjaCA9PT0gRU9GKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBFT0Y7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmbihjaCkpIHtcclxuICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0YWtlSWRlbnRpZmllckNoYXIoc2Nucikge1xyXG4gICAgICAgIGNvbnN0IGNsb3N1cmUgPSAoY2gpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2MgPSBjaC5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgICAgICByZXR1cm4gKChjYyA+PSA5NyAmJiBjYyA8PSAxMjIpIHx8IC8vIGEtelxyXG4gICAgICAgICAgICAgICAgKGNjID49IDY1ICYmIGNjIDw9IDkwKSB8fCAvLyBBLVpcclxuICAgICAgICAgICAgICAgIChjYyA+PSA0OCAmJiBjYyA8PSA1NykgfHwgLy8gMC05XHJcbiAgICAgICAgICAgICAgICBjYyA9PT0gOTUgfHwgLy8gX1xyXG4gICAgICAgICAgICAgICAgY2MgPT09IDM2IC8vICRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0YWtlQ2hhcihzY25yLCBjbG9zdXJlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHRha2VEaWdpdChzY25yKSB7XHJcbiAgICAgICAgY29uc3QgY2xvc3VyZSA9IChjaCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjYyA9IGNoLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYyA+PSA0OCAmJiBjYyA8PSA1NzsgLy8gMC05XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGFrZUNoYXIoc2NuciwgY2xvc3VyZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0YWtlSGV4RGlnaXQoc2Nucikge1xyXG4gICAgICAgIGNvbnN0IGNsb3N1cmUgPSAoY2gpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2MgPSBjaC5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgICAgICByZXR1cm4gKChjYyA+PSA0OCAmJiBjYyA8PSA1NykgfHwgLy8gMC05XHJcbiAgICAgICAgICAgICAgICAoY2MgPj0gNjUgJiYgY2MgPD0gNzApIHx8IC8vIEEtRlxyXG4gICAgICAgICAgICAgICAgKGNjID49IDk3ICYmIGNjIDw9IDEwMikpOyAvLyBhLWZcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiB0YWtlQ2hhcihzY25yLCBjbG9zdXJlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldERpZ2l0cyhzY25yKSB7XHJcbiAgICAgICAgbGV0IGNoID0gJyc7XHJcbiAgICAgICAgbGV0IG51bSA9ICcnO1xyXG4gICAgICAgIHdoaWxlICgoY2ggPSB0YWtlRGlnaXQoc2NucikpKSB7XHJcbiAgICAgICAgICAgIG51bSArPSBjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlYWRNb2R1bG8oc2Nucikge1xyXG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XHJcbiAgICAgICAgaWYgKGNoICE9PSBcIiVcIiAvKiBNb2R1bG8gKi8pIHtcclxuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLkVYUEVDVEVEX1RPS0VOLCBjdXJyZW50UG9zaXRpb24oKSwgMCwgY2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICByZXR1cm4gXCIlXCIgLyogTW9kdWxvICovO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZFRleHQoc2Nucikge1xyXG4gICAgICAgIGxldCBidWYgPSAnJztcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcclxuICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBCcmFjZUxlZnQgKi8gfHxcclxuICAgICAgICAgICAgICAgIGNoID09PSBcIn1cIiAvKiBCcmFjZVJpZ2h0ICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJAXCIgLyogTGlua2VkQWxpYXMgKi8gfHxcclxuICAgICAgICAgICAgICAgIGNoID09PSBcInxcIiAvKiBQaXBlICovIHx8XHJcbiAgICAgICAgICAgICAgICAhY2gpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcIiVcIiAvKiBNb2R1bG8gKi8pIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1RleHRTdGFydChzY25yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZiArPSBjaDtcclxuICAgICAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX1NQIHx8IGNoID09PSBDSEFSX0xGKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNUZXh0U3RhcnQoc2NucikpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWYgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidWYgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZE5hbWVkSWRlbnRpZmllcihzY25yKSB7XHJcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICBsZXQgY2ggPSAnJztcclxuICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgIHdoaWxlICgoY2ggPSB0YWtlSWRlbnRpZmllckNoYXIoc2NucikpKSB7XHJcbiAgICAgICAgICAgIG5hbWUgKz0gY2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09IEVPRikge1xyXG4gICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX0NMT1NJTkdfQlJBQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWFkTGlzdElkZW50aWZpZXIoc2Nucikge1xyXG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gJyc7XHJcbiAgICAgICAgaWYgKHNjbnIuY3VycmVudENoYXIoKSA9PT0gJy0nKSB7XHJcbiAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICB2YWx1ZSArPSBgLSR7Z2V0RGlnaXRzKHNjbnIpfWA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZSArPSBnZXREaWdpdHMoc2Nucik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09IEVPRikge1xyXG4gICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX0NMT1NJTkdfQlJBQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZExpdGVyYWwoc2Nucikge1xyXG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgZWF0KHNjbnIsIGBcXCdgKTtcclxuICAgICAgICBsZXQgY2ggPSAnJztcclxuICAgICAgICBsZXQgbGl0ZXJhbCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IGZuID0gKHgpID0+IHggIT09IExJVEVSQUxfREVMSU1JVEVSICYmIHggIT09IENIQVJfTEY7XHJcbiAgICAgICAgd2hpbGUgKChjaCA9IHRha2VDaGFyKHNjbnIsIGZuKSkpIHtcclxuICAgICAgICAgICAgaWYgKGNoID09PSAnXFxcXCcpIHtcclxuICAgICAgICAgICAgICAgIGxpdGVyYWwgKz0gcmVhZEVzY2FwZVNlcXVlbmNlKHNjbnIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGl0ZXJhbCArPSBjaDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjdXJyZW50ID0gc2Nuci5jdXJyZW50Q2hhcigpO1xyXG4gICAgICAgIGlmIChjdXJyZW50ID09PSBDSEFSX0xGIHx8IGN1cnJlbnQgPT09IEVPRikge1xyXG4gICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX1NJTkdMRV9RVU9URV9JTl9QTEFDRUhPTERFUiwgY3VycmVudFBvc2l0aW9uKCksIDApO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBJcyBpdCBjb3JyZWN0IHJlYWxseT9cclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT09IENIQVJfTEYpIHtcclxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgZWF0KHNjbnIsIGBcXCdgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGl0ZXJhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWF0KHNjbnIsIGBcXCdgKTtcclxuICAgICAgICByZXR1cm4gbGl0ZXJhbDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlYWRFc2NhcGVTZXF1ZW5jZShzY25yKSB7XHJcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XHJcbiAgICAgICAgc3dpdGNoIChjaCkge1xyXG4gICAgICAgICAgICBjYXNlICdcXFxcJzpcclxuICAgICAgICAgICAgY2FzZSBgXFwnYDpcclxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGBcXFxcJHtjaH1gO1xyXG4gICAgICAgICAgICBjYXNlICd1JzpcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkVW5pY29kZUVzY2FwZVNlcXVlbmNlKHNjbnIsIGNoLCA0KTtcclxuICAgICAgICAgICAgY2FzZSAnVSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCBjaCwgNik7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5LTk9XTl9FU0NBUEVfU0VRVUVOQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwLCBjaCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCB1bmljb2RlLCBkaWdpdHMpIHtcclxuICAgICAgICBlYXQoc2NuciwgdW5pY29kZSk7XHJcbiAgICAgICAgbGV0IHNlcXVlbmNlID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWdpdHM7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBjaCA9IHRha2VIZXhEaWdpdChzY25yKTtcclxuICAgICAgICAgICAgaWYgKCFjaCkge1xyXG4gICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVU5JQ09ERV9FU0NBUEVfU0VRVUVOQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwLCBgXFxcXCR7dW5pY29kZX0ke3NlcXVlbmNlfSR7c2Nuci5jdXJyZW50Q2hhcigpfWApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2VxdWVuY2UgKz0gY2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBgXFxcXCR7dW5pY29kZX0ke3NlcXVlbmNlfWA7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWFkSW52YWxpZElkZW50aWZpZXIoc2Nucikge1xyXG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgbGV0IGNoID0gJyc7XHJcbiAgICAgICAgbGV0IGlkZW50aWZpZXJzID0gJyc7XHJcbiAgICAgICAgY29uc3QgY2xvc3VyZSA9IChjaCkgPT4gY2ggIT09IFwie1wiIC8qIEJyYWNlTGVmdCAqLyAmJlxyXG4gICAgICAgICAgICBjaCAhPT0gXCJ9XCIgLyogQnJhY2VSaWdodCAqLyAmJlxyXG4gICAgICAgICAgICBjaCAhPT0gQ0hBUl9TUCAmJlxyXG4gICAgICAgICAgICBjaCAhPT0gQ0hBUl9MRjtcclxuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZUNoYXIoc2NuciwgY2xvc3VyZSkpKSB7XHJcbiAgICAgICAgICAgIGlkZW50aWZpZXJzICs9IGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaWRlbnRpZmllcnM7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWFkTGlua2VkTW9kaWZpZXIoc2Nucikge1xyXG4gICAgICAgIGxldCBjaCA9ICcnO1xyXG4gICAgICAgIGxldCBuYW1lID0gJyc7XHJcbiAgICAgICAgd2hpbGUgKChjaCA9IHRha2VJZGVudGlmaWVyQ2hhcihzY25yKSkpIHtcclxuICAgICAgICAgICAgbmFtZSArPSBjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWFkTGlua2VkUmVmZXIoc2Nucikge1xyXG4gICAgICAgIGNvbnN0IGZuID0gKGRldGVjdCA9IGZhbHNlLCBidWYpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XHJcbiAgICAgICAgICAgIGlmIChjaCA9PT0gXCJ7XCIgLyogQnJhY2VMZWZ0ICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIlXCIgLyogTW9kdWxvICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJAXCIgLyogTGlua2VkQWxpYXMgKi8gfHxcclxuICAgICAgICAgICAgICAgIGNoID09PSBcInxcIiAvKiBQaXBlICovIHx8XHJcbiAgICAgICAgICAgICAgICAhY2gpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBidWY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfU1ApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBidWY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IENIQVJfTEYpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZiArPSBjaDtcclxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKGRldGVjdCwgYnVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1ZiArPSBjaDtcclxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKHRydWUsIGJ1Zik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBmbihmYWxzZSwgJycpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZFBsdXJhbChzY25yKSB7XHJcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICBjb25zdCBwbHVyYWwgPSBlYXQoc2NuciwgXCJ8XCIgLyogUGlwZSAqLyk7XHJcbiAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICByZXR1cm4gcGx1cmFsO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETzogV2UgbmVlZCByZWZhY3RvcmluZyBvZiB0b2tlbiBwYXJzaW5nIC4uLlxyXG4gICAgZnVuY3Rpb24gcmVhZFRva2VuSW5QbGFjZWhvbGRlcihzY25yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgbGV0IHRva2VuID0gbnVsbDtcclxuICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcclxuICAgICAgICBzd2l0Y2ggKGNoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ7XCIgLyogQnJhY2VMZWZ0ICovOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuTk9UX0FMTE9XX05FU1RfUExBQ0VIT0xERVIsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAyIC8qIEJyYWNlTGVmdCAqLywgXCJ7XCIgLyogQnJhY2VMZWZ0ICovKTtcclxuICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCsrO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICBjYXNlIFwifVwiIC8qIEJyYWNlUmlnaHQgKi86XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXJyZW50VHlwZSA9PT0gMiAvKiBCcmFjZUxlZnQgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuRU1QVFlfUExBQ0VIT0xERVIsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAzIC8qIEJyYWNlUmlnaHQgKi8sIFwifVwiIC8qIEJyYWNlUmlnaHQgKi8pO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QtLTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID4gMCAmJiBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuaW5MaW5rZWQgJiYgY29udGV4dC5icmFjZU5lc3QgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgIGNhc2UgXCJAXCIgLyogTGlua2VkQWxpYXMgKi86XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbGV0IHZhbGlkTmFtZWRJZGVudGlmaWVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB2YWxpZExpc3RJZGVudGlmaWVyID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGxldCB2YWxpZExpdGVyYWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzUGx1cmFsU3RhcnQoc2NucikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDEgLyogUGlwZSAqLywgcmVhZFBsdXJhbChzY25yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXRcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5pbkxpbmtlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmJyYWNlTmVzdCA+IDAgJiZcclxuICAgICAgICAgICAgICAgICAgICAoY29udGV4dC5jdXJyZW50VHlwZSA9PT0gNSAvKiBOYW1lZCAqLyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmN1cnJlbnRUeXBlID09PSA2IC8qIExpc3QgKi8gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXJyZW50VHlwZSA9PT0gNyAvKiBMaXRlcmFsICovKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuKHNjbnIsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCh2YWxpZE5hbWVkSWRlbnRpZmllciA9IGlzTmFtZWRJZGVudGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCA1IC8qIE5hbWVkICovLCByZWFkTmFtZWRJZGVudGlmaWVyKHNjbnIpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgodmFsaWRMaXN0SWRlbnRpZmllciA9IGlzTGlzdElkZW50aWZpZXJTdGFydChzY25yLCBjb250ZXh0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDYgLyogTGlzdCAqLywgcmVhZExpc3RJZGVudGlmaWVyKHNjbnIpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgodmFsaWRMaXRlcmFsID0gaXNMaXRlcmFsU3RhcnQoc2NuciwgY29udGV4dCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCA3IC8qIExpdGVyYWwgKi8sIHJlYWRMaXRlcmFsKHNjbnIpKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghdmFsaWROYW1lZElkZW50aWZpZXIgJiYgIXZhbGlkTGlzdElkZW50aWZpZXIgJiYgIXZhbGlkTGl0ZXJhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IHdlIHNob3VsZCBiZSByZS1kZXNpZ25lZCBpbnZhbGlkIGNhc2VzLCB3aGVuIHdlIHdpbGwgZXh0ZW5kIG1lc3NhZ2Ugc3ludGF4IG5lYXIgdGhlIGZ1dHVyZSAuLi5cclxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDEzIC8qIEludmFsaWRQbGFjZSAqLywgcmVhZEludmFsaWRJZGVudGlmaWVyKHNjbnIpKTtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9UT0tFTl9JTl9QTEFDRUhPTERFUiwgY3VycmVudFBvc2l0aW9uKCksIDAsIHRva2VuLnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9XHJcbiAgICAvLyBUT0RPOiBXZSBuZWVkIHJlZmFjdG9yaW5nIG9mIHRva2VuIHBhcnNpbmcgLi4uXHJcbiAgICBmdW5jdGlvbiByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcclxuICAgICAgICBsZXQgdG9rZW4gPSBudWxsO1xyXG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xyXG4gICAgICAgIGlmICgoY3VycmVudFR5cGUgPT09IDggLyogTGlua2VkQWxpYXMgKi8gfHxcclxuICAgICAgICAgICAgY3VycmVudFR5cGUgPT09IDkgLyogTGlua2VkRG90ICovIHx8XHJcbiAgICAgICAgICAgIGN1cnJlbnRUeXBlID09PSAxMiAvKiBMaW5rZWRNb2RpZmllciAqLyB8fFxyXG4gICAgICAgICAgICBjdXJyZW50VHlwZSA9PT0gMTAgLyogTGlua2VkRGVsaW1pdGVyICovKSAmJlxyXG4gICAgICAgICAgICAoY2ggPT09IENIQVJfTEYgfHwgY2ggPT09IENIQVJfU1ApKSB7XHJcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX0xJTktFRF9GT1JNQVQsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoIChjaCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQFwiIC8qIExpbmtlZEFsaWFzICovOlxyXG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDggLyogTGlua2VkQWxpYXMgKi8sIFwiQFwiIC8qIExpbmtlZEFsaWFzICovKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICBjYXNlIFwiLlwiIC8qIExpbmtlZERvdCAqLzpcclxuICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCA5IC8qIExpbmtlZERvdCAqLywgXCIuXCIgLyogTGlua2VkRG90ICovKTtcclxuICAgICAgICAgICAgY2FzZSBcIjpcIiAvKiBMaW5rZWREZWxpbWl0ZXIgKi86XHJcbiAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgMTAgLyogTGlua2VkRGVsaW1pdGVyICovLCBcIjpcIiAvKiBMaW5rZWREZWxpbWl0ZXIgKi8pO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUGx1cmFsU3RhcnQoc2NucikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDEgLyogUGlwZSAqLywgcmVhZFBsdXJhbChzY25yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXRcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5pbkxpbmtlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0xpbmtlZERvdFN0YXJ0KHNjbnIsIGNvbnRleHQpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgaXNMaW5rZWREZWxpbWl0ZXJTdGFydChzY25yLCBjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGlua2VkTW9kaWZpZXJTdGFydChzY25yLCBjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDEyIC8qIExpbmtlZE1vZGlmaWVyICovLCByZWFkTGlua2VkTW9kaWZpZXIoc2NucikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGlua2VkUmVmZXJTdGFydChzY25yLCBjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBCcmFjZUxlZnQgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2NhbiB0aGUgcGxhY2Vob2xkZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluUGxhY2Vob2xkZXIoc2NuciwgY29udGV4dCkgfHwgdG9rZW47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgMTEgLyogTGlua2VkS2V5ICovLCByZWFkTGlua2VkUmVmZXIoc2NucikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHlwZSA9PT0gOCAvKiBMaW5rZWRBbGlhcyAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX0xJTktFRF9GT1JNQVQsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW4oc2NuciwgY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gVE9ETzogV2UgbmVlZCByZWZhY3RvcmluZyBvZiB0b2tlbiBwYXJzaW5nIC4uLlxyXG4gICAgZnVuY3Rpb24gcmVhZFRva2VuKHNjbnIsIGNvbnRleHQpIHtcclxuICAgICAgICBsZXQgdG9rZW4gPSB7IHR5cGU6IDE0IC8qIEVPRiAqLyB9O1xyXG4gICAgICAgIGlmIChjb250ZXh0LmJyYWNlTmVzdCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluUGxhY2Vob2xkZXIoc2NuciwgY29udGV4dCkgfHwgZ2V0RW5kVG9rZW4oY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb250ZXh0LmluTGlua2VkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KSB8fCBnZXRFbmRUb2tlbihjb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XHJcbiAgICAgICAgc3dpdGNoIChjaCkge1xyXG4gICAgICAgICAgICBjYXNlIFwie1wiIC8qIEJyYWNlTGVmdCAqLzpcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JblBsYWNlaG9sZGVyKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xyXG4gICAgICAgICAgICBjYXNlIFwifVwiIC8qIEJyYWNlUmlnaHQgKi86XHJcbiAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5CQUxBTkNFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCAzIC8qIEJyYWNlUmlnaHQgKi8sIFwifVwiIC8qIEJyYWNlUmlnaHQgKi8pO1xyXG4gICAgICAgICAgICBjYXNlIFwiQFwiIC8qIExpbmtlZEFsaWFzICovOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbkluTGlua2VkKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUGx1cmFsU3RhcnQoc2NucikpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGdldFRva2VuKGNvbnRleHQsIDEgLyogUGlwZSAqLywgcmVhZFBsdXJhbChzY25yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXRcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5pbkxpbmtlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgaXNNb2R1bG8sIGhhc1NwYWNlIH0gPSBkZXRlY3RNb2R1bG9TdGFydChzY25yKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc01vZHVsbykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoYXNTcGFjZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGdldFRva2VuKGNvbnRleHQsIDAgLyogVGV4dCAqLywgcmVhZFRleHQoc2NucikpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogZ2V0VG9rZW4oY29udGV4dCwgNCAvKiBNb2R1bG8gKi8sIHJlYWRNb2R1bG8oc2NucikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzVGV4dFN0YXJ0KHNjbnIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDAgLyogVGV4dCAqLywgcmVhZFRleHQoc2NucikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG5leHRUb2tlbigpIHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlLCBvZmZzZXQsIHN0YXJ0TG9jLCBlbmRMb2MgfSA9IF9jb250ZXh0O1xyXG4gICAgICAgIF9jb250ZXh0Lmxhc3RUeXBlID0gY3VycmVudFR5cGU7XHJcbiAgICAgICAgX2NvbnRleHQubGFzdE9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICBfY29udGV4dC5sYXN0U3RhcnRMb2MgPSBzdGFydExvYztcclxuICAgICAgICBfY29udGV4dC5sYXN0RW5kTG9jID0gZW5kTG9jO1xyXG4gICAgICAgIF9jb250ZXh0Lm9mZnNldCA9IGN1cnJlbnRPZmZzZXQoKTtcclxuICAgICAgICBfY29udGV4dC5zdGFydExvYyA9IGN1cnJlbnRQb3NpdGlvbigpO1xyXG4gICAgICAgIGlmIChfc2Nuci5jdXJyZW50Q2hhcigpID09PSBFT0YpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKF9jb250ZXh0LCAxNCAvKiBFT0YgKi8pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVhZFRva2VuKF9zY25yLCBfY29udGV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHRUb2tlbixcclxuICAgICAgICBjdXJyZW50T2Zmc2V0LFxyXG4gICAgICAgIGN1cnJlbnRQb3NpdGlvbixcclxuICAgICAgICBjb250ZXh0XHJcbiAgICB9O1xyXG59XG5cbmNvbnN0IEVSUk9SX0RPTUFJTiA9ICdwYXJzZXInO1xyXG4vLyBCYWNrc2xhc2ggYmFja3NsYXNoLCBiYWNrc2xhc2ggcXVvdGUsIHVISEhILCBVSEhISEhILlxyXG5jb25zdCBLTk9XTl9FU0NBUEVTID0gLyg/OlxcXFxcXFxcfFxcXFwnfFxcXFx1KFswLTlhLWZBLUZdezR9KXxcXFxcVShbMC05YS1mQS1GXXs2fSkpL2c7XHJcbmZ1bmN0aW9uIGZyb21Fc2NhcGVTZXF1ZW5jZShtYXRjaCwgY29kZVBvaW50NCwgY29kZVBvaW50Nikge1xyXG4gICAgc3dpdGNoIChtYXRjaCkge1xyXG4gICAgICAgIGNhc2UgYFxcXFxcXFxcYDpcclxuICAgICAgICAgICAgcmV0dXJuIGBcXFxcYDtcclxuICAgICAgICBjYXNlIGBcXFxcXFwnYDpcclxuICAgICAgICAgICAgcmV0dXJuIGBcXCdgO1xyXG4gICAgICAgIGRlZmF1bHQ6IHtcclxuICAgICAgICAgICAgY29uc3QgY29kZVBvaW50ID0gcGFyc2VJbnQoY29kZVBvaW50NCB8fCBjb2RlUG9pbnQ2LCAxNik7XHJcbiAgICAgICAgICAgIGlmIChjb2RlUG9pbnQgPD0gMHhkN2ZmIHx8IGNvZGVQb2ludCA+PSAweGUwMDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNvZGVQb2ludChjb2RlUG9pbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGludmFsaWQgLi4uXHJcbiAgICAgICAgICAgIC8vIFJlcGxhY2UgdGhlbSB3aXRoIFUrRkZGRCBSRVBMQUNFTUVOVCBDSEFSQUNURVIuXHJcbiAgICAgICAgICAgIHJldHVybiAn77+9JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlUGFyc2VyKG9wdGlvbnMgPSB7fSkge1xyXG4gICAgY29uc3QgbG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uICE9PSBmYWxzZTtcclxuICAgIGNvbnN0IHsgb25FcnJvciB9ID0gb3B0aW9ucztcclxuICAgIGZ1bmN0aW9uIGVtaXRFcnJvcih0b2tlbnplciwgY29kZSwgc3RhcnQsIG9mZnNldCwgLi4uYXJncykge1xyXG4gICAgICAgIGNvbnN0IGVuZCA9IHRva2VuemVyLmN1cnJlbnRQb3NpdGlvbigpO1xyXG4gICAgICAgIGVuZC5vZmZzZXQgKz0gb2Zmc2V0O1xyXG4gICAgICAgIGVuZC5jb2x1bW4gKz0gb2Zmc2V0O1xyXG4gICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvYyA9IGNyZWF0ZUxvY2F0aW9uKHN0YXJ0LCBlbmQpO1xyXG4gICAgICAgICAgICBjb25zdCBlcnIgPSBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbG9jLCB7XHJcbiAgICAgICAgICAgICAgICBkb21haW46IEVSUk9SX0RPTUFJTixcclxuICAgICAgICAgICAgICAgIGFyZ3NcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdGFydE5vZGUodHlwZSwgb2Zmc2V0LCBsb2MpIHtcclxuICAgICAgICBjb25zdCBub2RlID0ge1xyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBzdGFydDogb2Zmc2V0LFxyXG4gICAgICAgICAgICBlbmQ6IG9mZnNldFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIG5vZGUubG9jID0geyBzdGFydDogbG9jLCBlbmQ6IGxvYyB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGVuZE5vZGUobm9kZSwgb2Zmc2V0LCBwb3MsIHR5cGUpIHtcclxuICAgICAgICBub2RlLmVuZCA9IG9mZnNldDtcclxuICAgICAgICBpZiAodHlwZSkge1xyXG4gICAgICAgICAgICBub2RlLnR5cGUgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobG9jYXRpb24gJiYgbm9kZS5sb2MpIHtcclxuICAgICAgICAgICAgbm9kZS5sb2MuZW5kID0gcG9zO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlVGV4dCh0b2tlbml6ZXIsIHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSgzIC8qIFRleHQgKi8sIGNvbnRleHQub2Zmc2V0LCBjb250ZXh0LnN0YXJ0TG9jKTtcclxuICAgICAgICBub2RlLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2VMaXN0KHRva2VuaXplciwgaW5kZXgpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBicmFjZSBsZWZ0IGxvY1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoNSAvKiBMaXN0ICovLCBvZmZzZXQsIGxvYyk7XHJcbiAgICAgICAgbm9kZS5pbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCk7XHJcbiAgICAgICAgdG9rZW5pemVyLm5leHRUb2tlbigpOyAvLyBza2lwIGJyYWNoIHJpZ2h0XHJcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2VOYW1lZCh0b2tlbml6ZXIsIGtleSkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHsgbGFzdE9mZnNldDogb2Zmc2V0LCBsYXN0U3RhcnRMb2M6IGxvYyB9ID0gY29udGV4dDsgLy8gZ2V0IGJyYWNlIGxlZnQgbG9jXHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSg0IC8qIE5hbWVkICovLCBvZmZzZXQsIGxvYyk7XHJcbiAgICAgICAgbm9kZS5rZXkgPSBrZXk7XHJcbiAgICAgICAgdG9rZW5pemVyLm5leHRUb2tlbigpOyAvLyBza2lwIGJyYWNoIHJpZ2h0XHJcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2VMaXRlcmFsKHRva2VuaXplciwgdmFsdWUpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBicmFjZSBsZWZ0IGxvY1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoOSAvKiBMaXRlcmFsICovLCBvZmZzZXQsIGxvYyk7XHJcbiAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlLnJlcGxhY2UoS05PV05fRVNDQVBFUywgZnJvbUVzY2FwZVNlcXVlbmNlKTtcclxuICAgICAgICB0b2tlbml6ZXIubmV4dFRva2VuKCk7IC8vIHNraXAgYnJhY2ggcmlnaHRcclxuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZUxpbmtlZE1vZGlmaWVyKHRva2VuaXplcikge1xyXG4gICAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5pemVyLm5leHRUb2tlbigpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHsgbGFzdE9mZnNldDogb2Zmc2V0LCBsYXN0U3RhcnRMb2M6IGxvYyB9ID0gY29udGV4dDsgLy8gZ2V0IGxpbmtlZCBkb3QgbG9jXHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSg4IC8qIExpbmtlZE1vZGlmaWVyICovLCBvZmZzZXQsIGxvYyk7XHJcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IDEyIC8qIExpbmtlZE1vZGlmaWVyICovKSB7XHJcbiAgICAgICAgICAgIC8vIGVtcHR5IG1vZGlmaWVyXHJcbiAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfRU1QVFlfTElOS0VEX01PRElGSUVSLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCk7XHJcbiAgICAgICAgICAgIG5vZGUudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgZW5kTm9kZShub2RlLCBvZmZzZXQsIGxvYyk7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0Q29uc3VtZVRva2VuOiB0b2tlbixcclxuICAgICAgICAgICAgICAgIG5vZGVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgdG9rZW5cclxuICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS52YWx1ZSA9IHRva2VuLnZhbHVlIHx8ICcnO1xyXG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBub2RlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlTGlua2VkS2V5KHRva2VuaXplciwgdmFsdWUpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDcgLyogTGlua2VkS2V5ICovLCBjb250ZXh0Lm9mZnNldCwgY29udGV4dC5zdGFydExvYyk7XHJcbiAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlTGlua2VkKHRva2VuaXplcikge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZE5vZGUgPSBzdGFydE5vZGUoNiAvKiBMaW5rZWQgKi8sIGNvbnRleHQub2Zmc2V0LCBjb250ZXh0LnN0YXJ0TG9jKTtcclxuICAgICAgICBsZXQgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XHJcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDkgLyogTGlua2VkRG90ICovKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlTGlua2VkTW9kaWZpZXIodG9rZW5pemVyKTtcclxuICAgICAgICAgICAgbGlua2VkTm9kZS5tb2RpZmllciA9IHBhcnNlZC5ub2RlO1xyXG4gICAgICAgICAgICB0b2tlbiA9IHBhcnNlZC5uZXh0Q29uc3VtZVRva2VuIHx8IHRva2VuaXplci5uZXh0VG9rZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gYXNzZXQgY2hlY2sgdG9rZW5cclxuICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gMTAgLyogTGlua2VkRGVsaW1pdGVyICovKSB7XHJcbiAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0b2tlbiA9IHRva2VuaXplci5uZXh0VG9rZW4oKTtcclxuICAgICAgICAvLyBza2lwIGJyYWNlIGxlZnRcclxuICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gMiAvKiBCcmFjZUxlZnQgKi8pIHtcclxuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDExIC8qIExpbmtlZEtleSAqLzpcclxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlLmtleSA9IHBhcnNlTGlua2VkS2V5KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNSAvKiBOYW1lZCAqLzpcclxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlLmtleSA9IHBhcnNlTmFtZWQodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA2IC8qIExpc3QgKi86XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBwYXJzZUxpc3QodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSA3IC8qIExpdGVyYWwgKi86XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBwYXJzZUxpdGVyYWwodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vIGVtcHR5IGtleVxyXG4gICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfS0VZLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbXB0eUxpbmtlZEtleU5vZGUgPSBzdGFydE5vZGUoNyAvKiBMaW5rZWRLZXkgKi8sIG5leHRDb250ZXh0Lm9mZnNldCwgbmV4dENvbnRleHQuc3RhcnRMb2MpO1xyXG4gICAgICAgICAgICAgICAgZW1wdHlMaW5rZWRLZXlOb2RlLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBlbmROb2RlKGVtcHR5TGlua2VkS2V5Tm9kZSwgbmV4dENvbnRleHQub2Zmc2V0LCBuZXh0Q29udGV4dC5zdGFydExvYyk7XHJcbiAgICAgICAgICAgICAgICBsaW5rZWROb2RlLmtleSA9IGVtcHR5TGlua2VkS2V5Tm9kZTtcclxuICAgICAgICAgICAgICAgIGVuZE5vZGUobGlua2VkTm9kZSwgbmV4dENvbnRleHQub2Zmc2V0LCBuZXh0Q29udGV4dC5zdGFydExvYyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRDb25zdW1lVG9rZW46IHRva2VuLFxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGxpbmtlZE5vZGVcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZE5vZGUobGlua2VkTm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBub2RlOiBsaW5rZWROb2RlXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlTWVzc2FnZSh0b2tlbml6ZXIpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCBzdGFydE9mZnNldCA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogUGlwZSAqL1xyXG4gICAgICAgICAgICA/IHRva2VuaXplci5jdXJyZW50T2Zmc2V0KClcclxuICAgICAgICAgICAgOiBjb250ZXh0Lm9mZnNldDtcclxuICAgICAgICBjb25zdCBzdGFydExvYyA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogUGlwZSAqL1xyXG4gICAgICAgICAgICA/IGNvbnRleHQuZW5kTG9jXHJcbiAgICAgICAgICAgIDogY29udGV4dC5zdGFydExvYztcclxuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDIgLyogTWVzc2FnZSAqLywgc3RhcnRPZmZzZXQsIHN0YXJ0TG9jKTtcclxuICAgICAgICBub2RlLml0ZW1zID0gW107XHJcbiAgICAgICAgbGV0IG5leHRUb2tlbiA9IG51bGw7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBjb25zdCB0b2tlbiA9IG5leHRUb2tlbiB8fCB0b2tlbml6ZXIubmV4dFRva2VuKCk7XHJcbiAgICAgICAgICAgIG5leHRUb2tlbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodG9rZW4udHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwIC8qIFRleHQgKi86XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMucHVzaChwYXJzZVRleHQodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA2IC8qIExpc3QgKi86XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMucHVzaChwYXJzZUxpc3QodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1IC8qIE5hbWVkICovOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBub2RlLml0ZW1zLnB1c2gocGFyc2VOYW1lZCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDcgLyogTGl0ZXJhbCAqLzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlTGl0ZXJhbCh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDggLyogTGlua2VkQWxpYXMgKi86XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VMaW5rZWQodG9rZW5pemVyKTtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLml0ZW1zLnB1c2gocGFyc2VkLm5vZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUb2tlbiA9IHBhcnNlZC5uZXh0Q29uc3VtZVRva2VuIHx8IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IHdoaWxlIChjb250ZXh0LmN1cnJlbnRUeXBlICE9PSAxNCAvKiBFT0YgKi8gJiZcclxuICAgICAgICAgICAgY29udGV4dC5jdXJyZW50VHlwZSAhPT0gMSAvKiBQaXBlICovKTtcclxuICAgICAgICAvLyBhZGp1c3QgbWVzc2FnZSBub2RlIGxvY1xyXG4gICAgICAgIGNvbnN0IGVuZE9mZnNldCA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogUGlwZSAqL1xyXG4gICAgICAgICAgICA/IGNvbnRleHQubGFzdE9mZnNldFxyXG4gICAgICAgICAgICA6IHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCk7XHJcbiAgICAgICAgY29uc3QgZW5kTG9jID0gY29udGV4dC5jdXJyZW50VHlwZSA9PT0gMSAvKiBQaXBlICovXHJcbiAgICAgICAgICAgID8gY29udGV4dC5sYXN0RW5kTG9jXHJcbiAgICAgICAgICAgIDogdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpO1xyXG4gICAgICAgIGVuZE5vZGUobm9kZSwgZW5kT2Zmc2V0LCBlbmRMb2MpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2VQbHVyYWwodG9rZW5pemVyLCBvZmZzZXQsIGxvYywgbXNnTm9kZSkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xyXG4gICAgICAgIGxldCBoYXNFbXB0eU1lc3NhZ2UgPSBtc2dOb2RlLml0ZW1zLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDEgLyogUGx1cmFsICovLCBvZmZzZXQsIGxvYyk7XHJcbiAgICAgICAgbm9kZS5jYXNlcyA9IFtdO1xyXG4gICAgICAgIG5vZGUuY2FzZXMucHVzaChtc2dOb2RlKTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IHBhcnNlTWVzc2FnZSh0b2tlbml6ZXIpO1xyXG4gICAgICAgICAgICBpZiAoIWhhc0VtcHR5TWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgaGFzRW1wdHlNZXNzYWdlID0gbXNnLml0ZW1zLmxlbmd0aCA9PT0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlLmNhc2VzLnB1c2gobXNnKTtcclxuICAgICAgICB9IHdoaWxlIChjb250ZXh0LmN1cnJlbnRUeXBlICE9PSAxNCAvKiBFT0YgKi8pO1xyXG4gICAgICAgIGlmIChoYXNFbXB0eU1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuTVVTVF9IQVZFX01FU1NBR0VTX0lOX1BMVVJBTCwgbG9jLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2VSZXNvdXJjZSh0b2tlbml6ZXIpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCB7IG9mZnNldCwgc3RhcnRMb2MgfSA9IGNvbnRleHQ7XHJcbiAgICAgICAgY29uc3QgbXNnTm9kZSA9IHBhcnNlTWVzc2FnZSh0b2tlbml6ZXIpO1xyXG4gICAgICAgIGlmIChjb250ZXh0LmN1cnJlbnRUeXBlID09PSAxNCAvKiBFT0YgKi8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1zZ05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VQbHVyYWwodG9rZW5pemVyLCBvZmZzZXQsIHN0YXJ0TG9jLCBtc2dOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZShzb3VyY2UpIHtcclxuICAgICAgICBjb25zdCB0b2tlbml6ZXIgPSBjcmVhdGVUb2tlbml6ZXIoc291cmNlLCBhc3NpZ24oe30sIG9wdGlvbnMpKTtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDAgLyogUmVzb3VyY2UgKi8sIGNvbnRleHQub2Zmc2V0LCBjb250ZXh0LnN0YXJ0TG9jKTtcclxuICAgICAgICBpZiAobG9jYXRpb24gJiYgbm9kZS5sb2MpIHtcclxuICAgICAgICAgICAgbm9kZS5sb2Muc291cmNlID0gc291cmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLmJvZHkgPSBwYXJzZVJlc291cmNlKHRva2VuaXplcik7XHJcbiAgICAgICAgLy8gYXNzZXJ0IHdoZXRoZXIgYWNoaWV2ZWQgdG8gRU9GXHJcbiAgICAgICAgaWYgKGNvbnRleHQuY3VycmVudFR5cGUgIT09IDE0IC8qIEVPRiAqLykge1xyXG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBzb3VyY2VbY29udGV4dC5vZmZzZXRdIHx8ICcnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHsgcGFyc2UgfTtcclxufVxyXG5mdW5jdGlvbiBnZXRUb2tlbkNhcHRpb24odG9rZW4pIHtcclxuICAgIGlmICh0b2tlbi50eXBlID09PSAxNCAvKiBFT0YgKi8pIHtcclxuICAgICAgICByZXR1cm4gJ0VPRic7XHJcbiAgICB9XHJcbiAgICBjb25zdCBuYW1lID0gKHRva2VuLnZhbHVlIHx8ICcnKS5yZXBsYWNlKC9cXHI/XFxuL2d1LCAnXFxcXG4nKTtcclxuICAgIHJldHVybiBuYW1lLmxlbmd0aCA+IDEwID8gbmFtZS5zbGljZSgwLCA5KSArICfigKYnIDogbmFtZTtcclxufVxuXG5mdW5jdGlvbiBjcmVhdGVUcmFuc2Zvcm1lcihhc3QsIG9wdGlvbnMgPSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbikge1xyXG4gICAgY29uc3QgX2NvbnRleHQgPSB7XHJcbiAgICAgICAgYXN0LFxyXG4gICAgICAgIGhlbHBlcnM6IG5ldyBTZXQoKVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSAoKSA9PiBfY29udGV4dDtcclxuICAgIGNvbnN0IGhlbHBlciA9IChuYW1lKSA9PiB7XHJcbiAgICAgICAgX2NvbnRleHQuaGVscGVycy5hZGQobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHsgY29udGV4dCwgaGVscGVyIH07XHJcbn1cclxuZnVuY3Rpb24gdHJhdmVyc2VOb2Rlcyhub2RlcywgdHJhbnNmb3JtZXIpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0cmF2ZXJzZU5vZGUobm9kZXNbaV0sIHRyYW5zZm9ybWVyKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB0cmF2ZXJzZU5vZGUobm9kZSwgdHJhbnNmb3JtZXIpIHtcclxuICAgIC8vIFRPRE86IGlmIHdlIG5lZWQgcHJlLWhvb2sgb2YgdHJhbnNmb3JtLCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgdG8gaGVyZVxyXG4gICAgc3dpdGNoIChub2RlLnR5cGUpIHtcclxuICAgICAgICBjYXNlIDEgLyogUGx1cmFsICovOlxyXG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKG5vZGUuY2FzZXMsIHRyYW5zZm9ybWVyKTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwicGx1cmFsXCIgLyogUExVUkFMICovKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyIC8qIE1lc3NhZ2UgKi86XHJcbiAgICAgICAgICAgIHRyYXZlcnNlTm9kZXMobm9kZS5pdGVtcywgdHJhbnNmb3JtZXIpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDYgLyogTGlua2VkICovOlxyXG4gICAgICAgICAgICBjb25zdCBsaW5rZWQgPSBub2RlO1xyXG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGUobGlua2VkLmtleSwgdHJhbnNmb3JtZXIpO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJsaW5rZWRcIiAvKiBMSU5LRUQgKi8pO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJ0eXBlXCIgLyogVFlQRSAqLyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNSAvKiBMaXN0ICovOlxyXG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJpbnRlcnBvbGF0ZVwiIC8qIElOVEVSUE9MQVRFICovKTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwibGlzdFwiIC8qIExJU1QgKi8pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQgLyogTmFtZWQgKi86XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcImludGVycG9sYXRlXCIgLyogSU5URVJQT0xBVEUgKi8pO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJuYW1lZFwiIC8qIE5BTUVEICovKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICAvLyBUT0RPOiBpZiB3ZSBuZWVkIHBvc3QtaG9vayBvZiB0cmFuc2Zvcm0sIHNob3VsZCBiZSBpbXBsZW1lbnRlZCB0byBoZXJlXHJcbn1cclxuLy8gdHJhbnNmb3JtIEFTVFxyXG5mdW5jdGlvbiB0cmFuc2Zvcm0oYXN0LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4pIHtcclxuICAgIGNvbnN0IHRyYW5zZm9ybWVyID0gY3JlYXRlVHJhbnNmb3JtZXIoYXN0KTtcclxuICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcIm5vcm1hbGl6ZVwiIC8qIE5PUk1BTElaRSAqLyk7XHJcbiAgICAvLyB0cmF2ZXJzZVxyXG4gICAgYXN0LmJvZHkgJiYgdHJhdmVyc2VOb2RlKGFzdC5ib2R5LCB0cmFuc2Zvcm1lcik7XHJcbiAgICAvLyBzZXQgbWV0YSBpbmZvcm1hdGlvblxyXG4gICAgY29uc3QgY29udGV4dCA9IHRyYW5zZm9ybWVyLmNvbnRleHQoKTtcclxuICAgIGFzdC5oZWxwZXJzID0gQXJyYXkuZnJvbShjb250ZXh0LmhlbHBlcnMpO1xyXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvZGVHZW5lcmF0b3IoYXN0LCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IHNvdXJjZU1hcCwgZmlsZW5hbWUsIGJyZWFrTGluZUNvZGUsIG5lZWRJbmRlbnQ6IF9uZWVkSW5kZW50IH0gPSBvcHRpb25zO1xyXG4gICAgY29uc3QgX2NvbnRleHQgPSB7XHJcbiAgICAgICAgc291cmNlOiBhc3QubG9jLnNvdXJjZSxcclxuICAgICAgICBmaWxlbmFtZSxcclxuICAgICAgICBjb2RlOiAnJyxcclxuICAgICAgICBjb2x1bW46IDEsXHJcbiAgICAgICAgbGluZTogMSxcclxuICAgICAgICBvZmZzZXQ6IDAsXHJcbiAgICAgICAgbWFwOiB1bmRlZmluZWQsXHJcbiAgICAgICAgYnJlYWtMaW5lQ29kZSxcclxuICAgICAgICBuZWVkSW5kZW50OiBfbmVlZEluZGVudCxcclxuICAgICAgICBpbmRlbnRMZXZlbDogMFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSAoKSA9PiBfY29udGV4dDtcclxuICAgIGZ1bmN0aW9uIHB1c2goY29kZSwgbm9kZSkge1xyXG4gICAgICAgIF9jb250ZXh0LmNvZGUgKz0gY29kZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIF9uZXdsaW5lKG4sIHdpdGhCcmVha0xpbmUgPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgX2JyZWFrTGluZUNvZGUgPSB3aXRoQnJlYWtMaW5lID8gYnJlYWtMaW5lQ29kZSA6ICcnO1xyXG4gICAgICAgIHB1c2goX25lZWRJbmRlbnQgPyBfYnJlYWtMaW5lQ29kZSArIGAgIGAucmVwZWF0KG4pIDogX2JyZWFrTGluZUNvZGUpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW5kZW50KHdpdGhOZXdMaW5lID0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IGxldmVsID0gKytfY29udGV4dC5pbmRlbnRMZXZlbDtcclxuICAgICAgICB3aXRoTmV3TGluZSAmJiBfbmV3bGluZShsZXZlbCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZWluZGVudCh3aXRoTmV3TGluZSA9IHRydWUpIHtcclxuICAgICAgICBjb25zdCBsZXZlbCA9IC0tX2NvbnRleHQuaW5kZW50TGV2ZWw7XHJcbiAgICAgICAgd2l0aE5ld0xpbmUgJiYgX25ld2xpbmUobGV2ZWwpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbmV3bGluZSgpIHtcclxuICAgICAgICBfbmV3bGluZShfY29udGV4dC5pbmRlbnRMZXZlbCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBoZWxwZXIgPSAoa2V5KSA9PiBgXyR7a2V5fWA7XHJcbiAgICBjb25zdCBuZWVkSW5kZW50ID0gKCkgPT4gX2NvbnRleHQubmVlZEluZGVudDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY29udGV4dCxcclxuICAgICAgICBwdXNoLFxyXG4gICAgICAgIGluZGVudCxcclxuICAgICAgICBkZWluZGVudCxcclxuICAgICAgICBuZXdsaW5lLFxyXG4gICAgICAgIGhlbHBlcixcclxuICAgICAgICBuZWVkSW5kZW50XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlTGlua2VkTm9kZShnZW5lcmF0b3IsIG5vZGUpIHtcclxuICAgIGNvbnN0IHsgaGVscGVyIH0gPSBnZW5lcmF0b3I7XHJcbiAgICBnZW5lcmF0b3IucHVzaChgJHtoZWxwZXIoXCJsaW5rZWRcIiAvKiBMSU5LRUQgKi8pfShgKTtcclxuICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUua2V5KTtcclxuICAgIGlmIChub2RlLm1vZGlmaWVyKSB7XHJcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYCwgYCk7XHJcbiAgICAgICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5tb2RpZmllcik7XHJcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYCwgX3R5cGVgKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAsIHVuZGVmaW5lZCwgX3R5cGVgKTtcclxuICAgIH1cclxuICAgIGdlbmVyYXRvci5wdXNoKGApYCk7XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVNZXNzYWdlTm9kZShnZW5lcmF0b3IsIG5vZGUpIHtcclxuICAgIGNvbnN0IHsgaGVscGVyLCBuZWVkSW5kZW50IH0gPSBnZW5lcmF0b3I7XHJcbiAgICBnZW5lcmF0b3IucHVzaChgJHtoZWxwZXIoXCJub3JtYWxpemVcIiAvKiBOT1JNQUxJWkUgKi8pfShbYCk7XHJcbiAgICBnZW5lcmF0b3IuaW5kZW50KG5lZWRJbmRlbnQoKSk7XHJcbiAgICBjb25zdCBsZW5ndGggPSBub2RlLml0ZW1zLmxlbmd0aDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBnZW5lcmF0ZU5vZGUoZ2VuZXJhdG9yLCBub2RlLml0ZW1zW2ldKTtcclxuICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goJywgJyk7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0b3IuZGVpbmRlbnQobmVlZEluZGVudCgpKTtcclxuICAgIGdlbmVyYXRvci5wdXNoKCddKScpO1xyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlUGx1cmFsTm9kZShnZW5lcmF0b3IsIG5vZGUpIHtcclxuICAgIGNvbnN0IHsgaGVscGVyLCBuZWVkSW5kZW50IH0gPSBnZW5lcmF0b3I7XHJcbiAgICBpZiAobm9kZS5jYXNlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYCR7aGVscGVyKFwicGx1cmFsXCIgLyogUExVUkFMICovKX0oW2ApO1xyXG4gICAgICAgIGdlbmVyYXRvci5pbmRlbnQobmVlZEluZGVudCgpKTtcclxuICAgICAgICBjb25zdCBsZW5ndGggPSBub2RlLmNhc2VzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUuY2FzZXNbaV0pO1xyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goJywgJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdlbmVyYXRvci5kZWluZGVudChuZWVkSW5kZW50KCkpO1xyXG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGBdKWApO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlUmVzb3VyY2UoZ2VuZXJhdG9yLCBub2RlKSB7XHJcbiAgICBpZiAobm9kZS5ib2R5KSB7XHJcbiAgICAgICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5ib2R5KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGdlbmVyYXRvci5wdXNoKCdudWxsJyk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZSkge1xyXG4gICAgY29uc3QgeyBoZWxwZXIgfSA9IGdlbmVyYXRvcjtcclxuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAwIC8qIFJlc291cmNlICovOlxyXG4gICAgICAgICAgICBnZW5lcmF0ZVJlc291cmNlKGdlbmVyYXRvciwgbm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMSAvKiBQbHVyYWwgKi86XHJcbiAgICAgICAgICAgIGdlbmVyYXRlUGx1cmFsTm9kZShnZW5lcmF0b3IsIG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDIgLyogTWVzc2FnZSAqLzpcclxuICAgICAgICAgICAgZ2VuZXJhdGVNZXNzYWdlTm9kZShnZW5lcmF0b3IsIG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDYgLyogTGlua2VkICovOlxyXG4gICAgICAgICAgICBnZW5lcmF0ZUxpbmtlZE5vZGUoZ2VuZXJhdG9yLCBub2RlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA4IC8qIExpbmtlZE1vZGlmaWVyICovOlxyXG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChKU09OLnN0cmluZ2lmeShub2RlLnZhbHVlKSwgbm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNyAvKiBMaW5rZWRLZXkgKi86XHJcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKEpTT04uc3RyaW5naWZ5KG5vZGUudmFsdWUpLCBub2RlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA1IC8qIExpc3QgKi86XHJcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcImludGVycG9sYXRlXCIgLyogSU5URVJQT0xBVEUgKi8pfSgke2hlbHBlcihcImxpc3RcIiAvKiBMSVNUICovKX0oJHtub2RlLmluZGV4fSkpYCwgbm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNCAvKiBOYW1lZCAqLzpcclxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goYCR7aGVscGVyKFwiaW50ZXJwb2xhdGVcIiAvKiBJTlRFUlBPTEFURSAqLyl9KCR7aGVscGVyKFwibmFtZWRcIiAvKiBOQU1FRCAqLyl9KCR7SlNPTi5zdHJpbmdpZnkobm9kZS5rZXkpfSkpYCwgbm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOSAvKiBMaXRlcmFsICovOlxyXG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChKU09OLnN0cmluZ2lmeShub2RlLnZhbHVlKSwgbm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMyAvKiBUZXh0ICovOlxyXG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChKU09OLnN0cmluZ2lmeShub2RlLnZhbHVlKSwgbm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgdW5oYW5kbGVkIGNvZGVnZW4gbm9kZSB0eXBlOiAke25vZGUudHlwZX1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vIGdlbmVyYXRlIGNvZGUgZnJvbSBBU1RcclxuY29uc3QgZ2VuZXJhdGUgPSAoYXN0LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4pID0+IHtcclxuICAgIGNvbnN0IG1vZGUgPSBpc1N0cmluZyhvcHRpb25zLm1vZGUpID8gb3B0aW9ucy5tb2RlIDogJ25vcm1hbCc7XHJcbiAgICBjb25zdCBmaWxlbmFtZSA9IGlzU3RyaW5nKG9wdGlvbnMuZmlsZW5hbWUpXHJcbiAgICAgICAgPyBvcHRpb25zLmZpbGVuYW1lXHJcbiAgICAgICAgOiAnbWVzc2FnZS5pbnRsJztcclxuICAgIGNvbnN0IHNvdXJjZU1hcCA9ICEhb3B0aW9ucy5zb3VyY2VNYXA7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IGJyZWFrTGluZUNvZGUgPSBvcHRpb25zLmJyZWFrTGluZUNvZGUgIT0gbnVsbFxyXG4gICAgICAgID8gb3B0aW9ucy5icmVha0xpbmVDb2RlXHJcbiAgICAgICAgOiBtb2RlID09PSAnYXJyb3cnXHJcbiAgICAgICAgICAgID8gJzsnXHJcbiAgICAgICAgICAgIDogJ1xcbic7XHJcbiAgICBjb25zdCBuZWVkSW5kZW50ID0gb3B0aW9ucy5uZWVkSW5kZW50ID8gb3B0aW9ucy5uZWVkSW5kZW50IDogbW9kZSAhPT0gJ2Fycm93JztcclxuICAgIGNvbnN0IGhlbHBlcnMgPSBhc3QuaGVscGVycyB8fCBbXTtcclxuICAgIGNvbnN0IGdlbmVyYXRvciA9IGNyZWF0ZUNvZGVHZW5lcmF0b3IoYXN0LCB7XHJcbiAgICAgICAgbW9kZSxcclxuICAgICAgICBmaWxlbmFtZSxcclxuICAgICAgICBzb3VyY2VNYXAsXHJcbiAgICAgICAgYnJlYWtMaW5lQ29kZSxcclxuICAgICAgICBuZWVkSW5kZW50XHJcbiAgICB9KTtcclxuICAgIGdlbmVyYXRvci5wdXNoKG1vZGUgPT09ICdub3JtYWwnID8gYGZ1bmN0aW9uIF9fbXNnX18gKGN0eCkge2AgOiBgKGN0eCkgPT4ge2ApO1xyXG4gICAgZ2VuZXJhdG9yLmluZGVudChuZWVkSW5kZW50KTtcclxuICAgIGlmIChoZWxwZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICBnZW5lcmF0b3IucHVzaChgY29uc3QgeyAke2hlbHBlcnMubWFwKHMgPT4gYCR7c306IF8ke3N9YCkuam9pbignLCAnKX0gfSA9IGN0eGApO1xyXG4gICAgICAgIGdlbmVyYXRvci5uZXdsaW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0b3IucHVzaChgcmV0dXJuIGApO1xyXG4gICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgYXN0KTtcclxuICAgIGdlbmVyYXRvci5kZWluZGVudChuZWVkSW5kZW50KTtcclxuICAgIGdlbmVyYXRvci5wdXNoKGB9YCk7XHJcbiAgICBjb25zdCB7IGNvZGUsIG1hcCB9ID0gZ2VuZXJhdG9yLmNvbnRleHQoKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYXN0LFxyXG4gICAgICAgIGNvZGUsXHJcbiAgICAgICAgbWFwOiBtYXAgPyBtYXAudG9KU09OKCkgOiB1bmRlZmluZWQgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICB9O1xyXG59O1xuXG5mdW5jdGlvbiBiYXNlQ29tcGlsZShzb3VyY2UsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgY29uc3QgYXNzaWduZWRPcHRpb25zID0gYXNzaWduKHt9LCBvcHRpb25zKTtcclxuICAgIC8vIHBhcnNlIHNvdXJjZSBjb2Rlc1xyXG4gICAgY29uc3QgcGFyc2VyID0gY3JlYXRlUGFyc2VyKGFzc2lnbmVkT3B0aW9ucyk7XHJcbiAgICBjb25zdCBhc3QgPSBwYXJzZXIucGFyc2Uoc291cmNlKTtcclxuICAgIC8vIHRyYW5zZm9ybSBBU1RzXHJcbiAgICB0cmFuc2Zvcm0oYXN0LCBhc3NpZ25lZE9wdGlvbnMpO1xyXG4gICAgLy8gZ2VuZXJhdGUgamF2YXNjcmlwdCBjb2Rlc1xyXG4gICAgcmV0dXJuIGdlbmVyYXRlKGFzdCwgYXNzaWduZWRPcHRpb25zKTtcclxufVxuXG5leHBvcnQgeyBDb21waWxlRXJyb3JDb2RlcywgRVJST1JfRE9NQUlOLCBMb2NhdGlvblN0dWIsIGJhc2VDb21waWxlLCBjcmVhdGVDb21waWxlRXJyb3IsIGNyZWF0ZUxvY2F0aW9uLCBjcmVhdGVQYXJzZXIsIGNyZWF0ZVBvc2l0aW9uLCBkZWZhdWx0T25FcnJvciwgZXJyb3JNZXNzYWdlcyB9O1xuIiwiLyohXG4gICogZGV2dG9vbHMtaWYgdjkuMi4yXG4gICogKGMpIDIwMjIga2F6dXlhIGthd2FndWNoaVxuICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAgKi9cbmNvbnN0IEludGxpZnlEZXZUb29sc0hvb2tzID0gIHtcclxuICAgIEkxOG5Jbml0OiAnaTE4bjppbml0JyxcclxuICAgIEZ1bmN0aW9uVHJhbnNsYXRlOiAnZnVuY3Rpb246dHJhbnNsYXRlJ1xyXG59O1xuXG5leHBvcnQgeyBJbnRsaWZ5RGV2VG9vbHNIb29rcyB9O1xuIiwiLyohXG4gICogY29yZS1iYXNlIHY5LjIuMlxuICAqIChjKSAyMDIyIGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5pbXBvcnQgeyBpc09iamVjdCwgaXNTdHJpbmcsIGlzRnVuY3Rpb24sIGlzTnVtYmVyLCBpc1BsYWluT2JqZWN0LCB0b0Rpc3BsYXlTdHJpbmcsIGlzQXJyYXksIGZvcm1hdCwgaXNCb29sZWFuLCBhc3NpZ24sIGlzUmVnRXhwLCB3YXJuLCBlc2NhcGVIdG1sLCBpbkJyb3dzZXIsIG1hcmssIG1lYXN1cmUsIGlzRW1wdHlPYmplY3QsIGdlbmVyYXRlQ29kZUZyYW1lLCBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5LCBpc0RhdGUsIGdldEdsb2JhbFRoaXMgfSBmcm9tICdAaW50bGlmeS9zaGFyZWQnO1xuaW1wb3J0IHsgZGVmYXVsdE9uRXJyb3IsIGJhc2VDb21waWxlLCBDb21waWxlRXJyb3JDb2RlcywgY3JlYXRlQ29tcGlsZUVycm9yIH0gZnJvbSAnQGludGxpZnkvbWVzc2FnZS1jb21waWxlcic7XG5leHBvcnQgeyBDb21waWxlRXJyb3JDb2RlcywgY3JlYXRlQ29tcGlsZUVycm9yIH0gZnJvbSAnQGludGxpZnkvbWVzc2FnZS1jb21waWxlcic7XG5pbXBvcnQgeyBJbnRsaWZ5RGV2VG9vbHNIb29rcyB9IGZyb20gJ0BpbnRsaWZ5L2RldnRvb2xzLWlmJztcblxuY29uc3QgcGF0aFN0YXRlTWFjaGluZSA9ICBbXTtcclxucGF0aFN0YXRlTWFjaGluZVswIC8qIEJFRk9SRV9QQVRIICovXSA9IHtcclxuICAgIFtcIndcIiAvKiBXT1JLU1BBQ0UgKi9dOiBbMCAvKiBCRUZPUkVfUEFUSCAqL10sXHJcbiAgICBbXCJpXCIgLyogSURFTlQgKi9dOiBbMyAvKiBJTl9JREVOVCAqLywgMCAvKiBBUFBFTkQgKi9dLFxyXG4gICAgW1wiW1wiIC8qIExFRlRfQlJBQ0tFVCAqL106IFs0IC8qIElOX1NVQl9QQVRIICovXSxcclxuICAgIFtcIm9cIiAvKiBFTkRfT0ZfRkFJTCAqL106IFs3IC8qIEFGVEVSX1BBVEggKi9dXHJcbn07XHJcbnBhdGhTdGF0ZU1hY2hpbmVbMSAvKiBJTl9QQVRIICovXSA9IHtcclxuICAgIFtcIndcIiAvKiBXT1JLU1BBQ0UgKi9dOiBbMSAvKiBJTl9QQVRIICovXSxcclxuICAgIFtcIi5cIiAvKiBET1QgKi9dOiBbMiAvKiBCRUZPUkVfSURFTlQgKi9dLFxyXG4gICAgW1wiW1wiIC8qIExFRlRfQlJBQ0tFVCAqL106IFs0IC8qIElOX1NVQl9QQVRIICovXSxcclxuICAgIFtcIm9cIiAvKiBFTkRfT0ZfRkFJTCAqL106IFs3IC8qIEFGVEVSX1BBVEggKi9dXHJcbn07XHJcbnBhdGhTdGF0ZU1hY2hpbmVbMiAvKiBCRUZPUkVfSURFTlQgKi9dID0ge1xyXG4gICAgW1wid1wiIC8qIFdPUktTUEFDRSAqL106IFsyIC8qIEJFRk9SRV9JREVOVCAqL10sXHJcbiAgICBbXCJpXCIgLyogSURFTlQgKi9dOiBbMyAvKiBJTl9JREVOVCAqLywgMCAvKiBBUFBFTkQgKi9dLFxyXG4gICAgW1wiMFwiIC8qIFpFUk8gKi9dOiBbMyAvKiBJTl9JREVOVCAqLywgMCAvKiBBUFBFTkQgKi9dXHJcbn07XHJcbnBhdGhTdGF0ZU1hY2hpbmVbMyAvKiBJTl9JREVOVCAqL10gPSB7XHJcbiAgICBbXCJpXCIgLyogSURFTlQgKi9dOiBbMyAvKiBJTl9JREVOVCAqLywgMCAvKiBBUFBFTkQgKi9dLFxyXG4gICAgW1wiMFwiIC8qIFpFUk8gKi9dOiBbMyAvKiBJTl9JREVOVCAqLywgMCAvKiBBUFBFTkQgKi9dLFxyXG4gICAgW1wid1wiIC8qIFdPUktTUEFDRSAqL106IFsxIC8qIElOX1BBVEggKi8sIDEgLyogUFVTSCAqL10sXHJcbiAgICBbXCIuXCIgLyogRE9UICovXTogWzIgLyogQkVGT1JFX0lERU5UICovLCAxIC8qIFBVU0ggKi9dLFxyXG4gICAgW1wiW1wiIC8qIExFRlRfQlJBQ0tFVCAqL106IFs0IC8qIElOX1NVQl9QQVRIICovLCAxIC8qIFBVU0ggKi9dLFxyXG4gICAgW1wib1wiIC8qIEVORF9PRl9GQUlMICovXTogWzcgLyogQUZURVJfUEFUSCAqLywgMSAvKiBQVVNIICovXVxyXG59O1xyXG5wYXRoU3RhdGVNYWNoaW5lWzQgLyogSU5fU1VCX1BBVEggKi9dID0ge1xyXG4gICAgW1wiJ1wiIC8qIFNJTkdMRV9RVU9URSAqL106IFs1IC8qIElOX1NJTkdMRV9RVU9URSAqLywgMCAvKiBBUFBFTkQgKi9dLFxyXG4gICAgW1wiXFxcIlwiIC8qIERPVUJMRV9RVU9URSAqL106IFs2IC8qIElOX0RPVUJMRV9RVU9URSAqLywgMCAvKiBBUFBFTkQgKi9dLFxyXG4gICAgW1wiW1wiIC8qIExFRlRfQlJBQ0tFVCAqL106IFtcclxuICAgICAgICA0IC8qIElOX1NVQl9QQVRIICovLFxyXG4gICAgICAgIDIgLyogSU5DX1NVQl9QQVRIX0RFUFRIICovXHJcbiAgICBdLFxyXG4gICAgW1wiXVwiIC8qIFJJR0hUX0JSQUNLRVQgKi9dOiBbMSAvKiBJTl9QQVRIICovLCAzIC8qIFBVU0hfU1VCX1BBVEggKi9dLFxyXG4gICAgW1wib1wiIC8qIEVORF9PRl9GQUlMICovXTogOCAvKiBFUlJPUiAqLyxcclxuICAgIFtcImxcIiAvKiBFTFNFICovXTogWzQgLyogSU5fU1VCX1BBVEggKi8sIDAgLyogQVBQRU5EICovXVxyXG59O1xyXG5wYXRoU3RhdGVNYWNoaW5lWzUgLyogSU5fU0lOR0xFX1FVT1RFICovXSA9IHtcclxuICAgIFtcIidcIiAvKiBTSU5HTEVfUVVPVEUgKi9dOiBbNCAvKiBJTl9TVUJfUEFUSCAqLywgMCAvKiBBUFBFTkQgKi9dLFxyXG4gICAgW1wib1wiIC8qIEVORF9PRl9GQUlMICovXTogOCAvKiBFUlJPUiAqLyxcclxuICAgIFtcImxcIiAvKiBFTFNFICovXTogWzUgLyogSU5fU0lOR0xFX1FVT1RFICovLCAwIC8qIEFQUEVORCAqL11cclxufTtcclxucGF0aFN0YXRlTWFjaGluZVs2IC8qIElOX0RPVUJMRV9RVU9URSAqL10gPSB7XHJcbiAgICBbXCJcXFwiXCIgLyogRE9VQkxFX1FVT1RFICovXTogWzQgLyogSU5fU1VCX1BBVEggKi8sIDAgLyogQVBQRU5EICovXSxcclxuICAgIFtcIm9cIiAvKiBFTkRfT0ZfRkFJTCAqL106IDggLyogRVJST1IgKi8sXHJcbiAgICBbXCJsXCIgLyogRUxTRSAqL106IFs2IC8qIElOX0RPVUJMRV9RVU9URSAqLywgMCAvKiBBUFBFTkQgKi9dXHJcbn07XHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhbiBleHByZXNzaW9uIGlzIGEgbGl0ZXJhbCB2YWx1ZS5cclxuICovXHJcbmNvbnN0IGxpdGVyYWxWYWx1ZVJFID0gL15cXHM/KD86dHJ1ZXxmYWxzZXwtP1tcXGQuXSt8J1teJ10qJ3xcIlteXCJdKlwiKVxccz8kLztcclxuZnVuY3Rpb24gaXNMaXRlcmFsKGV4cCkge1xyXG4gICAgcmV0dXJuIGxpdGVyYWxWYWx1ZVJFLnRlc3QoZXhwKTtcclxufVxyXG4vKipcclxuICogU3RyaXAgcXVvdGVzIGZyb20gYSBzdHJpbmdcclxuICovXHJcbmZ1bmN0aW9uIHN0cmlwUXVvdGVzKHN0cikge1xyXG4gICAgY29uc3QgYSA9IHN0ci5jaGFyQ29kZUF0KDApO1xyXG4gICAgY29uc3QgYiA9IHN0ci5jaGFyQ29kZUF0KHN0ci5sZW5ndGggLSAxKTtcclxuICAgIHJldHVybiBhID09PSBiICYmIChhID09PSAweDIyIHx8IGEgPT09IDB4MjcpID8gc3RyLnNsaWNlKDEsIC0xKSA6IHN0cjtcclxufVxyXG4vKipcclxuICogRGV0ZXJtaW5lIHRoZSB0eXBlIG9mIGEgY2hhcmFjdGVyIGluIGEga2V5cGF0aC5cclxuICovXHJcbmZ1bmN0aW9uIGdldFBhdGhDaGFyVHlwZShjaCkge1xyXG4gICAgaWYgKGNoID09PSB1bmRlZmluZWQgfHwgY2ggPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gXCJvXCIgLyogRU5EX09GX0ZBSUwgKi87XHJcbiAgICB9XHJcbiAgICBjb25zdCBjb2RlID0gY2guY2hhckNvZGVBdCgwKTtcclxuICAgIHN3aXRjaCAoY29kZSkge1xyXG4gICAgICAgIGNhc2UgMHg1YjogLy8gW1xyXG4gICAgICAgIGNhc2UgMHg1ZDogLy8gXVxyXG4gICAgICAgIGNhc2UgMHgyZTogLy8gLlxyXG4gICAgICAgIGNhc2UgMHgyMjogLy8gXCJcclxuICAgICAgICBjYXNlIDB4Mjc6IC8vICdcclxuICAgICAgICAgICAgcmV0dXJuIGNoO1xyXG4gICAgICAgIGNhc2UgMHg1ZjogLy8gX1xyXG4gICAgICAgIGNhc2UgMHgyNDogLy8gJFxyXG4gICAgICAgIGNhc2UgMHgyZDogLy8gLVxyXG4gICAgICAgICAgICByZXR1cm4gXCJpXCIgLyogSURFTlQgKi87XHJcbiAgICAgICAgY2FzZSAweDA5OiAvLyBUYWIgKEhUKVxyXG4gICAgICAgIGNhc2UgMHgwYTogLy8gTmV3bGluZSAoTEYpXHJcbiAgICAgICAgY2FzZSAweDBkOiAvLyBSZXR1cm4gKENSKVxyXG4gICAgICAgIGNhc2UgMHhhMDogLy8gTm8tYnJlYWsgc3BhY2UgKE5CU1ApXHJcbiAgICAgICAgY2FzZSAweGZlZmY6IC8vIEJ5dGUgT3JkZXIgTWFyayAoQk9NKVxyXG4gICAgICAgIGNhc2UgMHgyMDI4OiAvLyBMaW5lIFNlcGFyYXRvciAoTFMpXHJcbiAgICAgICAgY2FzZSAweDIwMjk6IC8vIFBhcmFncmFwaCBTZXBhcmF0b3IgKFBTKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJ3XCIgLyogV09SS1NQQUNFICovO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiaVwiIC8qIElERU5UICovO1xyXG59XHJcbi8qKlxyXG4gKiBGb3JtYXQgYSBzdWJQYXRoLCByZXR1cm4gaXRzIHBsYWluIGZvcm0gaWYgaXQgaXNcclxuICogYSBsaXRlcmFsIHN0cmluZyBvciBudW1iZXIuIE90aGVyd2lzZSBwcmVwZW5kIHRoZVxyXG4gKiBkeW5hbWljIGluZGljYXRvciAoKikuXHJcbiAqL1xyXG5mdW5jdGlvbiBmb3JtYXRTdWJQYXRoKHBhdGgpIHtcclxuICAgIGNvbnN0IHRyaW1tZWQgPSBwYXRoLnRyaW0oKTtcclxuICAgIC8vIGludmFsaWQgbGVhZGluZyAwXHJcbiAgICBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcwJyAmJiBpc05hTihwYXJzZUludChwYXRoKSkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNMaXRlcmFsKHRyaW1tZWQpXHJcbiAgICAgICAgPyBzdHJpcFF1b3Rlcyh0cmltbWVkKVxyXG4gICAgICAgIDogXCIqXCIgLyogQVNUQVJJU0sgKi8gKyB0cmltbWVkO1xyXG59XHJcbi8qKlxyXG4gKiBQYXJzZSBhIHN0cmluZyBwYXRoIGludG8gYW4gYXJyYXkgb2Ygc2VnbWVudHNcclxuICovXHJcbmZ1bmN0aW9uIHBhcnNlKHBhdGgpIHtcclxuICAgIGNvbnN0IGtleXMgPSBbXTtcclxuICAgIGxldCBpbmRleCA9IC0xO1xyXG4gICAgbGV0IG1vZGUgPSAwIC8qIEJFRk9SRV9QQVRIICovO1xyXG4gICAgbGV0IHN1YlBhdGhEZXB0aCA9IDA7XHJcbiAgICBsZXQgYztcclxuICAgIGxldCBrZXk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIGxldCBuZXdDaGFyO1xyXG4gICAgbGV0IHR5cGU7XHJcbiAgICBsZXQgdHJhbnNpdGlvbjtcclxuICAgIGxldCBhY3Rpb247XHJcbiAgICBsZXQgdHlwZU1hcDtcclxuICAgIGNvbnN0IGFjdGlvbnMgPSBbXTtcclxuICAgIGFjdGlvbnNbMCAvKiBBUFBFTkQgKi9dID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBrZXkgPSBuZXdDaGFyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAga2V5ICs9IG5ld0NoYXI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGFjdGlvbnNbMSAvKiBQVVNIICovXSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoa2V5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAga2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIGtleSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgYWN0aW9uc1syIC8qIElOQ19TVUJfUEFUSF9ERVBUSCAqL10gPSAoKSA9PiB7XHJcbiAgICAgICAgYWN0aW9uc1swIC8qIEFQUEVORCAqL10oKTtcclxuICAgICAgICBzdWJQYXRoRGVwdGgrKztcclxuICAgIH07XHJcbiAgICBhY3Rpb25zWzMgLyogUFVTSF9TVUJfUEFUSCAqL10gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHN1YlBhdGhEZXB0aCA+IDApIHtcclxuICAgICAgICAgICAgc3ViUGF0aERlcHRoLS07XHJcbiAgICAgICAgICAgIG1vZGUgPSA0IC8qIElOX1NVQl9QQVRIICovO1xyXG4gICAgICAgICAgICBhY3Rpb25zWzAgLyogQVBQRU5EICovXSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc3ViUGF0aERlcHRoID0gMDtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAga2V5ID0gZm9ybWF0U3ViUGF0aChrZXkpO1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9uc1sxIC8qIFBVU0ggKi9dKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gbWF5YmVVbmVzY2FwZVF1b3RlKCkge1xyXG4gICAgICAgIGNvbnN0IG5leHRDaGFyID0gcGF0aFtpbmRleCArIDFdO1xyXG4gICAgICAgIGlmICgobW9kZSA9PT0gNSAvKiBJTl9TSU5HTEVfUVVPVEUgKi8gJiZcclxuICAgICAgICAgICAgbmV4dENoYXIgPT09IFwiJ1wiIC8qIFNJTkdMRV9RVU9URSAqLykgfHxcclxuICAgICAgICAgICAgKG1vZGUgPT09IDYgLyogSU5fRE9VQkxFX1FVT1RFICovICYmXHJcbiAgICAgICAgICAgICAgICBuZXh0Q2hhciA9PT0gXCJcXFwiXCIgLyogRE9VQkxFX1FVT1RFICovKSkge1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBuZXdDaGFyID0gJ1xcXFwnICsgbmV4dENoYXI7XHJcbiAgICAgICAgICAgIGFjdGlvbnNbMCAvKiBBUFBFTkQgKi9dKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHdoaWxlIChtb2RlICE9PSBudWxsKSB7XHJcbiAgICAgICAgaW5kZXgrKztcclxuICAgICAgICBjID0gcGF0aFtpbmRleF07XHJcbiAgICAgICAgaWYgKGMgPT09ICdcXFxcJyAmJiBtYXliZVVuZXNjYXBlUXVvdGUoKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHlwZSA9IGdldFBhdGhDaGFyVHlwZShjKTtcclxuICAgICAgICB0eXBlTWFwID0gcGF0aFN0YXRlTWFjaGluZVttb2RlXTtcclxuICAgICAgICB0cmFuc2l0aW9uID0gdHlwZU1hcFt0eXBlXSB8fCB0eXBlTWFwW1wibFwiIC8qIEVMU0UgKi9dIHx8IDggLyogRVJST1IgKi87XHJcbiAgICAgICAgLy8gY2hlY2sgcGFyc2UgZXJyb3JcclxuICAgICAgICBpZiAodHJhbnNpdGlvbiA9PT0gOCAvKiBFUlJPUiAqLykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vZGUgPSB0cmFuc2l0aW9uWzBdO1xyXG4gICAgICAgIGlmICh0cmFuc2l0aW9uWzFdICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgYWN0aW9uID0gYWN0aW9uc1t0cmFuc2l0aW9uWzFdXTtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbmV3Q2hhciA9IGM7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uKCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoZWNrIHBhcnNlIGZpbmlzaFxyXG4gICAgICAgIGlmIChtb2RlID09PSA3IC8qIEFGVEVSX1BBVEggKi8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vIHBhdGggdG9rZW4gY2FjaGVcclxuY29uc3QgY2FjaGUgPSBuZXcgTWFwKCk7XHJcbi8qKlxyXG4gKiBrZXktdmFsdWUgbWVzc2FnZSByZXNvbHZlclxyXG4gKlxyXG4gKiBAcmVtYXJrc1xyXG4gKiBSZXNvbHZlcyBtZXNzYWdlcyB3aXRoIHRoZSBrZXktdmFsdWUgc3RydWN0dXJlLiBOb3RlIHRoYXQgbWVzc2FnZXMgd2l0aCBhIGhpZXJhcmNoaWNhbCBzdHJ1Y3R1cmUgc3VjaCBhcyBvYmplY3RzIGNhbm5vdCBiZSByZXNvbHZlZFxyXG4gKlxyXG4gKiBAcGFyYW0gb2JqIC0gQSB0YXJnZXQgb2JqZWN0IHRvIGJlIHJlc29sdmVkIHdpdGggcGF0aFxyXG4gKiBAcGFyYW0gcGF0aCAtIEEge0BsaW5rIFBhdGggfCBwYXRofSB0byByZXNvbHZlIHRoZSB2YWx1ZSBvZiBtZXNzYWdlXHJcbiAqXHJcbiAqIEByZXR1cm5zIEEgcmVzb2x2ZWQge0BsaW5rIFBhdGhWYWx1ZSB8IHBhdGggdmFsdWV9XHJcbiAqXHJcbiAqIEBWdWVJMThuR2VuZXJhbFxyXG4gKi9cclxuZnVuY3Rpb24gcmVzb2x2ZVdpdGhLZXlWYWx1ZShvYmosIHBhdGgpIHtcclxuICAgIHJldHVybiBpc09iamVjdChvYmopID8gb2JqW3BhdGhdIDogbnVsbDtcclxufVxyXG4vKipcclxuICogbWVzc2FnZSByZXNvbHZlclxyXG4gKlxyXG4gKiBAcmVtYXJrc1xyXG4gKiBSZXNvbHZlcyBtZXNzYWdlcy4gbWVzc2FnZXMgd2l0aCBhIGhpZXJhcmNoaWNhbCBzdHJ1Y3R1cmUgc3VjaCBhcyBvYmplY3RzIGNhbiBiZSByZXNvbHZlZC4gVGhpcyByZXNvbHZlciBpcyB1c2VkIGluIFZ1ZUkxOG4gYXMgZGVmYXVsdC5cclxuICpcclxuICogQHBhcmFtIG9iaiAtIEEgdGFyZ2V0IG9iamVjdCB0byBiZSByZXNvbHZlZCB3aXRoIHBhdGhcclxuICogQHBhcmFtIHBhdGggLSBBIHtAbGluayBQYXRoIHwgcGF0aH0gdG8gcmVzb2x2ZSB0aGUgdmFsdWUgb2YgbWVzc2FnZVxyXG4gKlxyXG4gKiBAcmV0dXJucyBBIHJlc29sdmVkIHtAbGluayBQYXRoVmFsdWUgfCBwYXRoIHZhbHVlfVxyXG4gKlxyXG4gKiBAVnVlSTE4bkdlbmVyYWxcclxuICovXHJcbmZ1bmN0aW9uIHJlc29sdmVWYWx1ZShvYmosIHBhdGgpIHtcclxuICAgIC8vIGNoZWNrIG9iamVjdFxyXG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvLyBwYXJzZSBwYXRoXHJcbiAgICBsZXQgaGl0ID0gY2FjaGUuZ2V0KHBhdGgpO1xyXG4gICAgaWYgKCFoaXQpIHtcclxuICAgICAgICBoaXQgPSBwYXJzZShwYXRoKTtcclxuICAgICAgICBpZiAoaGl0KSB7XHJcbiAgICAgICAgICAgIGNhY2hlLnNldChwYXRoLCBoaXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNoZWNrIGhpdFxyXG4gICAgaWYgKCFoaXQpIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIC8vIHJlc29sdmUgcGF0aCB2YWx1ZVxyXG4gICAgY29uc3QgbGVuID0gaGl0Lmxlbmd0aDtcclxuICAgIGxldCBsYXN0ID0gb2JqO1xyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgd2hpbGUgKGkgPCBsZW4pIHtcclxuICAgICAgICBjb25zdCB2YWwgPSBsYXN0W2hpdFtpXV07XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsYXN0ID0gdmFsO1xyXG4gICAgICAgIGkrKztcclxuICAgIH1cclxuICAgIHJldHVybiBsYXN0O1xyXG59XG5cbmNvbnN0IERFRkFVTFRfTU9ESUZJRVIgPSAoc3RyKSA9PiBzdHI7XHJcbmNvbnN0IERFRkFVTFRfTUVTU0FHRSA9IChjdHgpID0+ICcnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbmNvbnN0IERFRkFVTFRfTUVTU0FHRV9EQVRBX1RZUEUgPSAndGV4dCc7XHJcbmNvbnN0IERFRkFVTFRfTk9STUFMSVpFID0gKHZhbHVlcykgPT4gdmFsdWVzLmxlbmd0aCA9PT0gMCA/ICcnIDogdmFsdWVzLmpvaW4oJycpO1xyXG5jb25zdCBERUZBVUxUX0lOVEVSUE9MQVRFID0gdG9EaXNwbGF5U3RyaW5nO1xyXG5mdW5jdGlvbiBwbHVyYWxEZWZhdWx0KGNob2ljZSwgY2hvaWNlc0xlbmd0aCkge1xyXG4gICAgY2hvaWNlID0gTWF0aC5hYnMoY2hvaWNlKTtcclxuICAgIGlmIChjaG9pY2VzTGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIGNob2ljZVxyXG4gICAgICAgICAgICA/IGNob2ljZSA+IDFcclxuICAgICAgICAgICAgICAgID8gMVxyXG4gICAgICAgICAgICAgICAgOiAwXHJcbiAgICAgICAgICAgIDogMTtcclxuICAgIH1cclxuICAgIHJldHVybiBjaG9pY2UgPyBNYXRoLm1pbihjaG9pY2UsIDIpIDogMDtcclxufVxyXG5mdW5jdGlvbiBnZXRQbHVyYWxJbmRleChvcHRpb25zKSB7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IGluZGV4ID0gaXNOdW1iZXIob3B0aW9ucy5wbHVyYWxJbmRleClcclxuICAgICAgICA/IG9wdGlvbnMucGx1cmFsSW5kZXhcclxuICAgICAgICA6IC0xO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICByZXR1cm4gb3B0aW9ucy5uYW1lZCAmJiAoaXNOdW1iZXIob3B0aW9ucy5uYW1lZC5jb3VudCkgfHwgaXNOdW1iZXIob3B0aW9ucy5uYW1lZC5uKSlcclxuICAgICAgICA/IGlzTnVtYmVyKG9wdGlvbnMubmFtZWQuY291bnQpXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5uYW1lZC5jb3VudFxyXG4gICAgICAgICAgICA6IGlzTnVtYmVyKG9wdGlvbnMubmFtZWQubilcclxuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5uYW1lZC5uXHJcbiAgICAgICAgICAgICAgICA6IGluZGV4XHJcbiAgICAgICAgOiBpbmRleDtcclxufVxyXG5mdW5jdGlvbiBub3JtYWxpemVOYW1lZChwbHVyYWxJbmRleCwgcHJvcHMpIHtcclxuICAgIGlmICghcHJvcHMuY291bnQpIHtcclxuICAgICAgICBwcm9wcy5jb3VudCA9IHBsdXJhbEluZGV4O1xyXG4gICAgfVxyXG4gICAgaWYgKCFwcm9wcy5uKSB7XHJcbiAgICAgICAgcHJvcHMubiA9IHBsdXJhbEluZGV4O1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZU1lc3NhZ2VDb250ZXh0KG9wdGlvbnMgPSB7fSkge1xyXG4gICAgY29uc3QgbG9jYWxlID0gb3B0aW9ucy5sb2NhbGU7XHJcbiAgICBjb25zdCBwbHVyYWxJbmRleCA9IGdldFBsdXJhbEluZGV4KG9wdGlvbnMpO1xyXG4gICAgY29uc3QgcGx1cmFsUnVsZSA9IGlzT2JqZWN0KG9wdGlvbnMucGx1cmFsUnVsZXMpICYmXHJcbiAgICAgICAgaXNTdHJpbmcobG9jYWxlKSAmJlxyXG4gICAgICAgIGlzRnVuY3Rpb24ob3B0aW9ucy5wbHVyYWxSdWxlc1tsb2NhbGVdKVxyXG4gICAgICAgID8gb3B0aW9ucy5wbHVyYWxSdWxlc1tsb2NhbGVdXHJcbiAgICAgICAgOiBwbHVyYWxEZWZhdWx0O1xyXG4gICAgY29uc3Qgb3JnUGx1cmFsUnVsZSA9IGlzT2JqZWN0KG9wdGlvbnMucGx1cmFsUnVsZXMpICYmXHJcbiAgICAgICAgaXNTdHJpbmcobG9jYWxlKSAmJlxyXG4gICAgICAgIGlzRnVuY3Rpb24ob3B0aW9ucy5wbHVyYWxSdWxlc1tsb2NhbGVdKVxyXG4gICAgICAgID8gcGx1cmFsRGVmYXVsdFxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgcGx1cmFsID0gKG1lc3NhZ2VzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzW3BsdXJhbFJ1bGUocGx1cmFsSW5kZXgsIG1lc3NhZ2VzLmxlbmd0aCwgb3JnUGx1cmFsUnVsZSldO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IF9saXN0ID0gb3B0aW9ucy5saXN0IHx8IFtdO1xyXG4gICAgY29uc3QgbGlzdCA9IChpbmRleCkgPT4gX2xpc3RbaW5kZXhdO1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGNvbnN0IF9uYW1lZCA9IG9wdGlvbnMubmFtZWQgfHwge307XHJcbiAgICBpc051bWJlcihvcHRpb25zLnBsdXJhbEluZGV4KSAmJiBub3JtYWxpemVOYW1lZChwbHVyYWxJbmRleCwgX25hbWVkKTtcclxuICAgIGNvbnN0IG5hbWVkID0gKGtleSkgPT4gX25hbWVkW2tleV07XHJcbiAgICBmdW5jdGlvbiBtZXNzYWdlKGtleSkge1xyXG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IG1zZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5tZXNzYWdlcylcclxuICAgICAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VzKGtleSlcclxuICAgICAgICAgICAgOiBpc09iamVjdChvcHRpb25zLm1lc3NhZ2VzKVxyXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VzW2tleV1cclxuICAgICAgICAgICAgICAgIDogZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuICFtc2dcclxuICAgICAgICAgICAgPyBvcHRpb25zLnBhcmVudFxyXG4gICAgICAgICAgICAgICAgPyBvcHRpb25zLnBhcmVudC5tZXNzYWdlKGtleSkgLy8gcmVzb2x2ZSBmcm9tIHBhcmVudCBtZXNzYWdlc1xyXG4gICAgICAgICAgICAgICAgOiBERUZBVUxUX01FU1NBR0VcclxuICAgICAgICAgICAgOiBtc2c7XHJcbiAgICB9XHJcbiAgICBjb25zdCBfbW9kaWZpZXIgPSAobmFtZSkgPT4gb3B0aW9ucy5tb2RpZmllcnNcclxuICAgICAgICA/IG9wdGlvbnMubW9kaWZpZXJzW25hbWVdXHJcbiAgICAgICAgOiBERUZBVUxUX01PRElGSUVSO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplID0gaXNQbGFpbk9iamVjdChvcHRpb25zLnByb2Nlc3NvcikgJiYgaXNGdW5jdGlvbihvcHRpb25zLnByb2Nlc3Nvci5ub3JtYWxpemUpXHJcbiAgICAgICAgPyBvcHRpb25zLnByb2Nlc3Nvci5ub3JtYWxpemVcclxuICAgICAgICA6IERFRkFVTFRfTk9STUFMSVpFO1xyXG4gICAgY29uc3QgaW50ZXJwb2xhdGUgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMucHJvY2Vzc29yKSAmJlxyXG4gICAgICAgIGlzRnVuY3Rpb24ob3B0aW9ucy5wcm9jZXNzb3IuaW50ZXJwb2xhdGUpXHJcbiAgICAgICAgPyBvcHRpb25zLnByb2Nlc3Nvci5pbnRlcnBvbGF0ZVxyXG4gICAgICAgIDogREVGQVVMVF9JTlRFUlBPTEFURTtcclxuICAgIGNvbnN0IHR5cGUgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMucHJvY2Vzc29yKSAmJiBpc1N0cmluZyhvcHRpb25zLnByb2Nlc3Nvci50eXBlKVxyXG4gICAgICAgID8gb3B0aW9ucy5wcm9jZXNzb3IudHlwZVxyXG4gICAgICAgIDogREVGQVVMVF9NRVNTQUdFX0RBVEFfVFlQRTtcclxuICAgIGNvbnN0IGxpbmtlZCA9IChrZXksIC4uLmFyZ3MpID0+IHtcclxuICAgICAgICBjb25zdCBbYXJnMSwgYXJnMl0gPSBhcmdzO1xyXG4gICAgICAgIGxldCB0eXBlID0gJ3RleHQnO1xyXG4gICAgICAgIGxldCBtb2RpZmllciA9ICcnO1xyXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoYXJnMSkpIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gYXJnMS5tb2RpZmllciB8fCBtb2RpZmllcjtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBhcmcxLnR5cGUgfHwgdHlwZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChpc1N0cmluZyhhcmcxKSkge1xyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBhcmcxIHx8IG1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcxKSkge1xyXG4gICAgICAgICAgICAgICAgbW9kaWZpZXIgPSBhcmcxIHx8IG1vZGlmaWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IGFyZzIgfHwgdHlwZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbXNnID0gbWVzc2FnZShrZXkpKGN0eCk7XHJcbiAgICAgICAgLy8gVGhlIG1lc3NhZ2UgaW4gdm5vZGUgcmVzb2x2ZWQgd2l0aCBsaW5rZWQgYXJlIHJldHVybmVkIGFzIGFuIGFycmF5IGJ5IHByb2Nlc3Nvci5ub21hbGl6ZVxyXG4gICAgICAgIGlmICh0eXBlID09PSAndm5vZGUnICYmIGlzQXJyYXkobXNnKSAmJiBtb2RpZmllcikge1xyXG4gICAgICAgICAgICBtc2cgPSBtc2dbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb2RpZmllciA/IF9tb2RpZmllcihtb2RpZmllcikobXNnLCB0eXBlKSA6IG1zZztcclxuICAgIH07XHJcbiAgICBjb25zdCBjdHggPSB7XHJcbiAgICAgICAgW1wibGlzdFwiIC8qIExJU1QgKi9dOiBsaXN0LFxyXG4gICAgICAgIFtcIm5hbWVkXCIgLyogTkFNRUQgKi9dOiBuYW1lZCxcclxuICAgICAgICBbXCJwbHVyYWxcIiAvKiBQTFVSQUwgKi9dOiBwbHVyYWwsXHJcbiAgICAgICAgW1wibGlua2VkXCIgLyogTElOS0VEICovXTogbGlua2VkLFxyXG4gICAgICAgIFtcIm1lc3NhZ2VcIiAvKiBNRVNTQUdFICovXTogbWVzc2FnZSxcclxuICAgICAgICBbXCJ0eXBlXCIgLyogVFlQRSAqL106IHR5cGUsXHJcbiAgICAgICAgW1wiaW50ZXJwb2xhdGVcIiAvKiBJTlRFUlBPTEFURSAqL106IGludGVycG9sYXRlLFxyXG4gICAgICAgIFtcIm5vcm1hbGl6ZVwiIC8qIE5PUk1BTElaRSAqL106IG5vcm1hbGl6ZVxyXG4gICAgfTtcclxuICAgIHJldHVybiBjdHg7XHJcbn1cblxubGV0IGRldnRvb2xzID0gbnVsbDtcclxuZnVuY3Rpb24gc2V0RGV2VG9vbHNIb29rKGhvb2spIHtcclxuICAgIGRldnRvb2xzID0gaG9vaztcclxufVxyXG5mdW5jdGlvbiBnZXREZXZUb29sc0hvb2soKSB7XHJcbiAgICByZXR1cm4gZGV2dG9vbHM7XHJcbn1cclxuZnVuY3Rpb24gaW5pdEkxOG5EZXZUb29scyhpMThuLCB2ZXJzaW9uLCBtZXRhKSB7XHJcbiAgICAvLyBUT0RPOiBxdWV1ZSBpZiBkZXZ0b29scyBpcyB1bmRlZmluZWRcclxuICAgIGRldnRvb2xzICYmXHJcbiAgICAgICAgZGV2dG9vbHMuZW1pdChJbnRsaWZ5RGV2VG9vbHNIb29rcy5JMThuSW5pdCwge1xyXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGkxOG4sXHJcbiAgICAgICAgICAgIHZlcnNpb24sXHJcbiAgICAgICAgICAgIG1ldGFcclxuICAgICAgICB9KTtcclxufVxyXG5jb25zdCB0cmFuc2xhdGVEZXZUb29scyA9IC8qICNfX1BVUkVfXyovIGNyZWF0ZURldlRvb2xzSG9vayhJbnRsaWZ5RGV2VG9vbHNIb29rcy5GdW5jdGlvblRyYW5zbGF0ZSk7XHJcbmZ1bmN0aW9uIGNyZWF0ZURldlRvb2xzSG9vayhob29rKSB7XHJcbiAgICByZXR1cm4gKHBheWxvYWRzKSA9PiBkZXZ0b29scyAmJiBkZXZ0b29scy5lbWl0KGhvb2ssIHBheWxvYWRzKTtcclxufVxuXG5jb25zdCBDb3JlV2FybkNvZGVzID0ge1xyXG4gICAgTk9UX0ZPVU5EX0tFWTogMSxcclxuICAgIEZBTExCQUNLX1RPX1RSQU5TTEFURTogMixcclxuICAgIENBTk5PVF9GT1JNQVRfTlVNQkVSOiAzLFxyXG4gICAgRkFMTEJBQ0tfVE9fTlVNQkVSX0ZPUk1BVDogNCxcclxuICAgIENBTk5PVF9GT1JNQVRfREFURTogNSxcclxuICAgIEZBTExCQUNLX1RPX0RBVEVfRk9STUFUOiA2LFxyXG4gICAgX19FWFRFTkRfUE9JTlRfXzogN1xyXG59O1xyXG4vKiogQGludGVybmFsICovXHJcbmNvbnN0IHdhcm5NZXNzYWdlcyA9IHtcclxuICAgIFtDb3JlV2FybkNvZGVzLk5PVF9GT1VORF9LRVldOiBgTm90IGZvdW5kICd7a2V5fScga2V5IGluICd7bG9jYWxlfScgbG9jYWxlIG1lc3NhZ2VzLmAsXHJcbiAgICBbQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19UUkFOU0xBVEVdOiBgRmFsbCBiYWNrIHRvIHRyYW5zbGF0ZSAne2tleX0nIGtleSB3aXRoICd7dGFyZ2V0fScgbG9jYWxlLmAsXHJcbiAgICBbQ29yZVdhcm5Db2Rlcy5DQU5OT1RfRk9STUFUX05VTUJFUl06IGBDYW5ub3QgZm9ybWF0IGEgbnVtYmVyIHZhbHVlIGR1ZSB0byBub3Qgc3VwcG9ydGVkIEludGwuTnVtYmVyRm9ybWF0LmAsXHJcbiAgICBbQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19OVU1CRVJfRk9STUFUXTogYEZhbGwgYmFjayB0byBudW1iZXIgZm9ybWF0ICd7a2V5fScga2V5IHdpdGggJ3t0YXJnZXR9JyBsb2NhbGUuYCxcclxuICAgIFtDb3JlV2FybkNvZGVzLkNBTk5PVF9GT1JNQVRfREFURV06IGBDYW5ub3QgZm9ybWF0IGEgZGF0ZSB2YWx1ZSBkdWUgdG8gbm90IHN1cHBvcnRlZCBJbnRsLkRhdGVUaW1lRm9ybWF0LmAsXHJcbiAgICBbQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19EQVRFX0ZPUk1BVF06IGBGYWxsIGJhY2sgdG8gZGF0ZXRpbWUgZm9ybWF0ICd7a2V5fScga2V5IHdpdGggJ3t0YXJnZXR9JyBsb2NhbGUuYFxyXG59O1xyXG5mdW5jdGlvbiBnZXRXYXJuTWVzc2FnZShjb2RlLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gZm9ybWF0KHdhcm5NZXNzYWdlc1tjb2RlXSwgLi4uYXJncyk7XHJcbn1cblxuLyoqXHJcbiAqIEZhbGxiYWNrIHdpdGggc2ltcGxlIGltcGxlbWVuYXRpb25cclxuICpcclxuICogQHJlbWFya3NcclxuICogQSBmYWxsYmFjayBsb2NhbGUgZnVuY3Rpb24gaW1wbGVtZW50ZWQgd2l0aCBhIHNpbXBsZSBmYWxsYmFjayBhbGdvcml0aG0uXHJcbiAqXHJcbiAqIEJhc2ljYWxseSwgaXQgcmV0dXJucyB0aGUgdmFsdWUgYXMgc3BlY2lmaWVkIGluIHRoZSBgZmFsbGJhY2tMb2NhbGVgIHByb3BzLCBhbmQgaXMgcHJvY2Vzc2VkIHdpdGggdGhlIGZhbGxiYWNrIGluc2lkZSBpbnRsaWZ5LlxyXG4gKlxyXG4gKiBAcGFyYW0gY3R4IC0gQSB7QGxpbmsgQ29yZUNvbnRleHQgfCBjb250ZXh0fVxyXG4gKiBAcGFyYW0gZmFsbGJhY2sgLSBBIHtAbGluayBGYWxsYmFja0xvY2FsZSB8IGZhbGxiYWNrIGxvY2FsZX1cclxuICogQHBhcmFtIHN0YXJ0IC0gQSBzdGFydGluZyB7QGxpbmsgTG9jYWxlIHwgbG9jYWxlfVxyXG4gKlxyXG4gKiBAcmV0dXJucyBGYWxsYmFjayBsb2NhbGVzXHJcbiAqXHJcbiAqIEBWdWVJMThuR2VuZXJhbFxyXG4gKi9cclxuZnVuY3Rpb24gZmFsbGJhY2tXaXRoU2ltcGxlKGN0eCwgZmFsbGJhY2ssIHN0YXJ0IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbikge1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICByZXR1cm4gWy4uLm5ldyBTZXQoW1xyXG4gICAgICAgICAgICBzdGFydCxcclxuICAgICAgICAgICAgLi4uKGlzQXJyYXkoZmFsbGJhY2spXHJcbiAgICAgICAgICAgICAgICA/IGZhbGxiYWNrXHJcbiAgICAgICAgICAgICAgICA6IGlzT2JqZWN0KGZhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgID8gT2JqZWN0LmtleXMoZmFsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgOiBpc1N0cmluZyhmYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBbZmFsbGJhY2tdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogW3N0YXJ0XSlcclxuICAgICAgICBdKV07XHJcbn1cclxuLyoqXHJcbiAqIEZhbGxiYWNrIHdpdGggbG9jYWxlIGNoYWluXHJcbiAqXHJcbiAqIEByZW1hcmtzXHJcbiAqIEEgZmFsbGJhY2sgbG9jYWxlIGZ1bmN0aW9uIGltcGxlbWVudGVkIHdpdGggYSBmYWxsYmFjayBjaGFpbiBhbGdvcml0aG0uIEl0J3MgdXNlZCBpbiBWdWVJMThuIGFzIGRlZmF1bHQuXHJcbiAqXHJcbiAqIEBwYXJhbSBjdHggLSBBIHtAbGluayBDb3JlQ29udGV4dCB8IGNvbnRleHR9XHJcbiAqIEBwYXJhbSBmYWxsYmFjayAtIEEge0BsaW5rIEZhbGxiYWNrTG9jYWxlIHwgZmFsbGJhY2sgbG9jYWxlfVxyXG4gKiBAcGFyYW0gc3RhcnQgLSBBIHN0YXJ0aW5nIHtAbGluayBMb2NhbGUgfCBsb2NhbGV9XHJcbiAqXHJcbiAqIEByZXR1cm5zIEZhbGxiYWNrIGxvY2FsZXNcclxuICpcclxuICogQFZ1ZUkxOG5TZWUgW0ZhbGxiYWNraW5nXSguLi9ndWlkZS9lc3NlbnRpYWxzL2ZhbGxiYWNrKVxyXG4gKlxyXG4gKiBAVnVlSTE4bkdlbmVyYWxcclxuICovXHJcbmZ1bmN0aW9uIGZhbGxiYWNrV2l0aExvY2FsZUNoYWluKGN0eCwgZmFsbGJhY2ssIHN0YXJ0KSB7XHJcbiAgICBjb25zdCBzdGFydExvY2FsZSA9IGlzU3RyaW5nKHN0YXJ0KSA/IHN0YXJ0IDogREVGQVVMVF9MT0NBTEU7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY3R4O1xyXG4gICAgaWYgKCFjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZSkge1xyXG4gICAgICAgIGNvbnRleHQuX19sb2NhbGVDaGFpbkNhY2hlID0gbmV3IE1hcCgpO1xyXG4gICAgfVxyXG4gICAgbGV0IGNoYWluID0gY29udGV4dC5fX2xvY2FsZUNoYWluQ2FjaGUuZ2V0KHN0YXJ0TG9jYWxlKTtcclxuICAgIGlmICghY2hhaW4pIHtcclxuICAgICAgICBjaGFpbiA9IFtdO1xyXG4gICAgICAgIC8vIGZpcnN0IGJsb2NrIGRlZmluZWQgYnkgc3RhcnRcclxuICAgICAgICBsZXQgYmxvY2sgPSBbc3RhcnRdO1xyXG4gICAgICAgIC8vIHdoaWxlIGFueSBpbnRlcnZlbmluZyBibG9jayBmb3VuZFxyXG4gICAgICAgIHdoaWxlIChpc0FycmF5KGJsb2NrKSkge1xyXG4gICAgICAgICAgICBibG9jayA9IGFwcGVuZEJsb2NrVG9DaGFpbihjaGFpbiwgYmxvY2ssIGZhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICAgICAgLy8gbGFzdCBibG9jayBkZWZpbmVkIGJ5IGRlZmF1bHRcclxuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IGlzQXJyYXkoZmFsbGJhY2spIHx8ICFpc1BsYWluT2JqZWN0KGZhbGxiYWNrKVxyXG4gICAgICAgICAgICA/IGZhbGxiYWNrXHJcbiAgICAgICAgICAgIDogZmFsbGJhY2tbJ2RlZmF1bHQnXVxyXG4gICAgICAgICAgICAgICAgPyBmYWxsYmFja1snZGVmYXVsdCddXHJcbiAgICAgICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgLy8gY29udmVydCBkZWZhdWx0cyB0byBhcnJheVxyXG4gICAgICAgIGJsb2NrID0gaXNTdHJpbmcoZGVmYXVsdHMpID8gW2RlZmF1bHRzXSA6IGRlZmF1bHRzO1xyXG4gICAgICAgIGlmIChpc0FycmF5KGJsb2NrKSkge1xyXG4gICAgICAgICAgICBhcHBlbmRCbG9ja1RvQ2hhaW4oY2hhaW4sIGJsb2NrLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHQuX19sb2NhbGVDaGFpbkNhY2hlLnNldChzdGFydExvY2FsZSwgY2hhaW4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoYWluO1xyXG59XHJcbmZ1bmN0aW9uIGFwcGVuZEJsb2NrVG9DaGFpbihjaGFpbiwgYmxvY2ssIGJsb2Nrcykge1xyXG4gICAgbGV0IGZvbGxvdyA9IHRydWU7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJsb2NrLmxlbmd0aCAmJiBpc0Jvb2xlYW4oZm9sbG93KTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgbG9jYWxlID0gYmxvY2tbaV07XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKGxvY2FsZSkpIHtcclxuICAgICAgICAgICAgZm9sbG93ID0gYXBwZW5kTG9jYWxlVG9DaGFpbihjaGFpbiwgYmxvY2tbaV0sIGJsb2Nrcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvbGxvdztcclxufVxyXG5mdW5jdGlvbiBhcHBlbmRMb2NhbGVUb0NoYWluKGNoYWluLCBsb2NhbGUsIGJsb2Nrcykge1xyXG4gICAgbGV0IGZvbGxvdztcclxuICAgIGNvbnN0IHRva2VucyA9IGxvY2FsZS5zcGxpdCgnLScpO1xyXG4gICAgZG8ge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRva2Vucy5qb2luKCctJyk7XHJcbiAgICAgICAgZm9sbG93ID0gYXBwZW5kSXRlbVRvQ2hhaW4oY2hhaW4sIHRhcmdldCwgYmxvY2tzKTtcclxuICAgICAgICB0b2tlbnMuc3BsaWNlKC0xLCAxKTtcclxuICAgIH0gd2hpbGUgKHRva2Vucy5sZW5ndGggJiYgZm9sbG93ID09PSB0cnVlKTtcclxuICAgIHJldHVybiBmb2xsb3c7XHJcbn1cclxuZnVuY3Rpb24gYXBwZW5kSXRlbVRvQ2hhaW4oY2hhaW4sIHRhcmdldCwgYmxvY2tzKSB7XHJcbiAgICBsZXQgZm9sbG93ID0gZmFsc2U7XHJcbiAgICBpZiAoIWNoYWluLmluY2x1ZGVzKHRhcmdldCkpIHtcclxuICAgICAgICBmb2xsb3cgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgZm9sbG93ID0gdGFyZ2V0W3RhcmdldC5sZW5ndGggLSAxXSAhPT0gJyEnO1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhbGUgPSB0YXJnZXQucmVwbGFjZSgvIS9nLCAnJyk7XHJcbiAgICAgICAgICAgIGNoYWluLnB1c2gobG9jYWxlKTtcclxuICAgICAgICAgICAgaWYgKChpc0FycmF5KGJsb2NrcykgfHwgaXNQbGFpbk9iamVjdChibG9ja3MpKSAmJlxyXG4gICAgICAgICAgICAgICAgYmxvY2tzW2xvY2FsZV0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgICAgIGZvbGxvdyA9IGJsb2Nrc1tsb2NhbGVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvbGxvdztcclxufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXHJcbi8qKlxyXG4gKiBJbnRsaWZ5IGNvcmUtYmFzZSB2ZXJzaW9uXHJcbiAqIEBpbnRlcm5hbFxyXG4gKi9cclxuY29uc3QgVkVSU0lPTiA9ICc5LjIuMic7XHJcbmNvbnN0IE5PVF9SRU9TTFZFRCA9IC0xO1xyXG5jb25zdCBERUZBVUxUX0xPQ0FMRSA9ICdlbi1VUyc7XHJcbmNvbnN0IE1JU1NJTkdfUkVTT0xWRV9WQUxVRSA9ICcnO1xyXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cikgPT4gYCR7c3RyLmNoYXJBdCgwKS50b0xvY2FsZVVwcGVyQ2FzZSgpfSR7c3RyLnN1YnN0cigxKX1gO1xyXG5mdW5jdGlvbiBnZXREZWZhdWx0TGlua2VkTW9kaWZpZXJzKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB1cHBlcjogKHZhbCwgdHlwZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09ICd0ZXh0JyAmJiBpc1N0cmluZyh2YWwpXHJcbiAgICAgICAgICAgICAgICA/IHZhbC50b1VwcGVyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICA6IHR5cGUgPT09ICd2bm9kZScgJiYgaXNPYmplY3QodmFsKSAmJiAnX192X2lzVk5vZGUnIGluIHZhbFxyXG4gICAgICAgICAgICAgICAgICAgID8gdmFsLmNoaWxkcmVuLnRvVXBwZXJDYXNlKClcclxuICAgICAgICAgICAgICAgICAgICA6IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvd2VyOiAodmFsLCB0eXBlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ3RleHQnICYmIGlzU3RyaW5nKHZhbClcclxuICAgICAgICAgICAgICAgID8gdmFsLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIDogdHlwZSA9PT0gJ3Zub2RlJyAmJiBpc09iamVjdCh2YWwpICYmICdfX3ZfaXNWTm9kZScgaW4gdmFsXHJcbiAgICAgICAgICAgICAgICAgICAgPyB2YWwuY2hpbGRyZW4udG9Mb3dlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgICAgIDogdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2FwaXRhbGl6ZTogKHZhbCwgdHlwZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuICh0eXBlID09PSAndGV4dCcgJiYgaXNTdHJpbmcodmFsKVxyXG4gICAgICAgICAgICAgICAgPyBjYXBpdGFsaXplKHZhbClcclxuICAgICAgICAgICAgICAgIDogdHlwZSA9PT0gJ3Zub2RlJyAmJiBpc09iamVjdCh2YWwpICYmICdfX3ZfaXNWTm9kZScgaW4gdmFsXHJcbiAgICAgICAgICAgICAgICAgICAgPyBjYXBpdGFsaXplKHZhbC5jaGlsZHJlbilcclxuICAgICAgICAgICAgICAgICAgICA6IHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5sZXQgX2NvbXBpbGVyO1xyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VDb21waWxlcihjb21waWxlcikge1xyXG4gICAgX2NvbXBpbGVyID0gY29tcGlsZXI7XHJcbn1cclxubGV0IF9yZXNvbHZlcjtcclxuLyoqXHJcbiAqIFJlZ2lzdGVyIHRoZSBtZXNzYWdlIHJlc29sdmVyXHJcbiAqXHJcbiAqIEBwYXJhbSByZXNvbHZlciAtIEEge0BsaW5rIE1lc3NhZ2VSZXNvbHZlcn0gZnVuY3Rpb25cclxuICpcclxuICogQFZ1ZUkxOG5HZW5lcmFsXHJcbiAqL1xyXG5mdW5jdGlvbiByZWdpc3Rlck1lc3NhZ2VSZXNvbHZlcihyZXNvbHZlcikge1xyXG4gICAgX3Jlc29sdmVyID0gcmVzb2x2ZXI7XHJcbn1cclxubGV0IF9mYWxsYmFja2VyO1xyXG4vKipcclxuICogUmVnaXN0ZXIgdGhlIGxvY2FsZSBmYWxsYmFja2VyXHJcbiAqXHJcbiAqIEBwYXJhbSBmYWxsYmFja2VyIC0gQSB7QGxpbmsgTG9jYWxlRmFsbGJhY2tlcn0gZnVuY3Rpb25cclxuICpcclxuICogQFZ1ZUkxOG5HZW5lcmFsXHJcbiAqL1xyXG5mdW5jdGlvbiByZWdpc3RlckxvY2FsZUZhbGxiYWNrZXIoZmFsbGJhY2tlcikge1xyXG4gICAgX2ZhbGxiYWNrZXIgPSBmYWxsYmFja2VyO1xyXG59XHJcbi8vIEFkZGl0aW9uYWwgTWV0YSBmb3IgSW50bGlmeSBEZXZUb29sc1xyXG5sZXQgX2FkZGl0aW9uYWxNZXRhID0gbnVsbDtcclxuY29uc3Qgc2V0QWRkaXRpb25hbE1ldGEgPSAgKG1ldGEpID0+IHtcclxuICAgIF9hZGRpdGlvbmFsTWV0YSA9IG1ldGE7XHJcbn07XHJcbmNvbnN0IGdldEFkZGl0aW9uYWxNZXRhID0gICgpID0+IF9hZGRpdGlvbmFsTWV0YTtcclxubGV0IF9mYWxsYmFja0NvbnRleHQgPSBudWxsO1xyXG5jb25zdCBzZXRGYWxsYmFja0NvbnRleHQgPSAoY29udGV4dCkgPT4ge1xyXG4gICAgX2ZhbGxiYWNrQ29udGV4dCA9IGNvbnRleHQ7XHJcbn07XHJcbmNvbnN0IGdldEZhbGxiYWNrQ29udGV4dCA9ICgpID0+IF9mYWxsYmFja0NvbnRleHQ7XHJcbi8vIElEIGZvciBDb3JlQ29udGV4dFxyXG5sZXQgX2NpZCA9IDA7XHJcbmZ1bmN0aW9uIGNyZWF0ZUNvcmVDb250ZXh0KG9wdGlvbnMgPSB7fSkge1xyXG4gICAgLy8gc2V0dXAgb3B0aW9uc1xyXG4gICAgY29uc3QgdmVyc2lvbiA9IGlzU3RyaW5nKG9wdGlvbnMudmVyc2lvbikgPyBvcHRpb25zLnZlcnNpb24gOiBWRVJTSU9OO1xyXG4gICAgY29uc3QgbG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpID8gb3B0aW9ucy5sb2NhbGUgOiBERUZBVUxUX0xPQ0FMRTtcclxuICAgIGNvbnN0IGZhbGxiYWNrTG9jYWxlID0gaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxyXG4gICAgICAgIGlzUGxhaW5PYmplY3Qob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICBpc1N0cmluZyhvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxyXG4gICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXHJcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrTG9jYWxlXHJcbiAgICAgICAgOiBsb2NhbGU7XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5tZXNzYWdlcylcclxuICAgICAgICA/IG9wdGlvbnMubWVzc2FnZXNcclxuICAgICAgICA6IHsgW2xvY2FsZV06IHt9IH07XHJcbiAgICBjb25zdCBkYXRldGltZUZvcm1hdHMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzXHJcbiAgICAgICAgICAgIDogeyBbbG9jYWxlXToge30gfVxyXG4gICAgICAgIDtcclxuICAgIGNvbnN0IG51bWJlckZvcm1hdHMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMubnVtYmVyRm9ybWF0cylcclxuICAgICAgICAgICAgPyBvcHRpb25zLm51bWJlckZvcm1hdHNcclxuICAgICAgICAgICAgOiB7IFtsb2NhbGVdOiB7fSB9XHJcbiAgICAgICAgO1xyXG4gICAgY29uc3QgbW9kaWZpZXJzID0gYXNzaWduKHt9LCBvcHRpb25zLm1vZGlmaWVycyB8fCB7fSwgZ2V0RGVmYXVsdExpbmtlZE1vZGlmaWVycygpKTtcclxuICAgIGNvbnN0IHBsdXJhbFJ1bGVzID0gb3B0aW9ucy5wbHVyYWxSdWxlcyB8fCB7fTtcclxuICAgIGNvbnN0IG1pc3NpbmcgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWlzc2luZykgPyBvcHRpb25zLm1pc3NpbmcgOiBudWxsO1xyXG4gICAgY29uc3QgbWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5taXNzaW5nV2FybilcclxuICAgICAgICA/IG9wdGlvbnMubWlzc2luZ1dhcm5cclxuICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pIHx8IGlzUmVnRXhwKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxyXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cclxuICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBmYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mYWxsYmFja0Zvcm1hdDtcclxuICAgIGNvbnN0IHVucmVzb2x2aW5nID0gISFvcHRpb25zLnVucmVzb2x2aW5nO1xyXG4gICAgY29uc3QgcG9zdFRyYW5zbGF0aW9uID0gaXNGdW5jdGlvbihvcHRpb25zLnBvc3RUcmFuc2xhdGlvbilcclxuICAgICAgICA/IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uXHJcbiAgICAgICAgOiBudWxsO1xyXG4gICAgY29uc3QgcHJvY2Vzc29yID0gaXNQbGFpbk9iamVjdChvcHRpb25zLnByb2Nlc3NvcikgPyBvcHRpb25zLnByb2Nlc3NvciA6IG51bGw7XHJcbiAgICBjb25zdCB3YXJuSHRtbE1lc3NhZ2UgPSBpc0Jvb2xlYW4ob3B0aW9ucy53YXJuSHRtbE1lc3NhZ2UpXHJcbiAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sTWVzc2FnZVxyXG4gICAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IGVzY2FwZVBhcmFtZXRlciA9ICEhb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXI7XHJcbiAgICBjb25zdCBtZXNzYWdlQ29tcGlsZXIgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZUNvbXBpbGVyKVxyXG4gICAgICAgID8gb3B0aW9ucy5tZXNzYWdlQ29tcGlsZXJcclxuICAgICAgICA6IF9jb21waWxlcjtcclxuICAgIGNvbnN0IG1lc3NhZ2VSZXNvbHZlciA9IGlzRnVuY3Rpb24ob3B0aW9ucy5tZXNzYWdlUmVzb2x2ZXIpXHJcbiAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VSZXNvbHZlclxyXG4gICAgICAgIDogX3Jlc29sdmVyIHx8IHJlc29sdmVXaXRoS2V5VmFsdWU7XHJcbiAgICBjb25zdCBsb2NhbGVGYWxsYmFja2VyID0gaXNGdW5jdGlvbihvcHRpb25zLmxvY2FsZUZhbGxiYWNrZXIpXHJcbiAgICAgICAgPyBvcHRpb25zLmxvY2FsZUZhbGxiYWNrZXJcclxuICAgICAgICA6IF9mYWxsYmFja2VyIHx8IGZhbGxiYWNrV2l0aFNpbXBsZTtcclxuICAgIGNvbnN0IGZhbGxiYWNrQ29udGV4dCA9IGlzT2JqZWN0KG9wdGlvbnMuZmFsbGJhY2tDb250ZXh0KVxyXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0NvbnRleHRcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG9uV2FybiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5vbldhcm4pID8gb3B0aW9ucy5vbldhcm4gOiB3YXJuO1xyXG4gICAgLy8gc2V0dXAgaW50ZXJuYWwgb3B0aW9uc1xyXG4gICAgY29uc3QgaW50ZXJuYWxPcHRpb25zID0gb3B0aW9ucztcclxuICAgIGNvbnN0IF9fZGF0ZXRpbWVGb3JtYXR0ZXJzID0gaXNPYmplY3QoaW50ZXJuYWxPcHRpb25zLl9fZGF0ZXRpbWVGb3JtYXR0ZXJzKVxyXG4gICAgICAgICAgICA/IGludGVybmFsT3B0aW9ucy5fX2RhdGV0aW1lRm9ybWF0dGVyc1xyXG4gICAgICAgICAgICA6IG5ldyBNYXAoKVxyXG4gICAgICAgIDtcclxuICAgIGNvbnN0IF9fbnVtYmVyRm9ybWF0dGVycyA9IGlzT2JqZWN0KGludGVybmFsT3B0aW9ucy5fX251bWJlckZvcm1hdHRlcnMpXHJcbiAgICAgICAgICAgID8gaW50ZXJuYWxPcHRpb25zLl9fbnVtYmVyRm9ybWF0dGVyc1xyXG4gICAgICAgICAgICA6IG5ldyBNYXAoKVxyXG4gICAgICAgIDtcclxuICAgIGNvbnN0IF9fbWV0YSA9IGlzT2JqZWN0KGludGVybmFsT3B0aW9ucy5fX21ldGEpID8gaW50ZXJuYWxPcHRpb25zLl9fbWV0YSA6IHt9O1xyXG4gICAgX2NpZCsrO1xyXG4gICAgY29uc3QgY29udGV4dCA9IHtcclxuICAgICAgICB2ZXJzaW9uLFxyXG4gICAgICAgIGNpZDogX2NpZCxcclxuICAgICAgICBsb2NhbGUsXHJcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXHJcbiAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgbW9kaWZpZXJzLFxyXG4gICAgICAgIHBsdXJhbFJ1bGVzLFxyXG4gICAgICAgIG1pc3NpbmcsXHJcbiAgICAgICAgbWlzc2luZ1dhcm4sXHJcbiAgICAgICAgZmFsbGJhY2tXYXJuLFxyXG4gICAgICAgIGZhbGxiYWNrRm9ybWF0LFxyXG4gICAgICAgIHVucmVzb2x2aW5nLFxyXG4gICAgICAgIHBvc3RUcmFuc2xhdGlvbixcclxuICAgICAgICBwcm9jZXNzb3IsXHJcbiAgICAgICAgd2Fybkh0bWxNZXNzYWdlLFxyXG4gICAgICAgIGVzY2FwZVBhcmFtZXRlcixcclxuICAgICAgICBtZXNzYWdlQ29tcGlsZXIsXHJcbiAgICAgICAgbWVzc2FnZVJlc29sdmVyLFxyXG4gICAgICAgIGxvY2FsZUZhbGxiYWNrZXIsXHJcbiAgICAgICAgZmFsbGJhY2tDb250ZXh0LFxyXG4gICAgICAgIG9uV2FybixcclxuICAgICAgICBfX21ldGFcclxuICAgIH07XHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5kYXRldGltZUZvcm1hdHMgPSBkYXRldGltZUZvcm1hdHM7XHJcbiAgICAgICAgY29udGV4dC5udW1iZXJGb3JtYXRzID0gbnVtYmVyRm9ybWF0cztcclxuICAgICAgICBjb250ZXh0Ll9fZGF0ZXRpbWVGb3JtYXR0ZXJzID0gX19kYXRldGltZUZvcm1hdHRlcnM7XHJcbiAgICAgICAgY29udGV4dC5fX251bWJlckZvcm1hdHRlcnMgPSBfX251bWJlckZvcm1hdHRlcnM7XHJcbiAgICB9XHJcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XHJcbiAgICAgICAgY29udGV4dC5fX3ZfZW1pdHRlciA9XHJcbiAgICAgICAgICAgIGludGVybmFsT3B0aW9ucy5fX3ZfZW1pdHRlciAhPSBudWxsXHJcbiAgICAgICAgICAgICAgICA/IGludGVybmFsT3B0aW9ucy5fX3ZfZW1pdHRlclxyXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xyXG4gICAgICAgIGluaXRJMThuRGV2VG9vbHMoY29udGV4dCwgdmVyc2lvbiwgX19tZXRhKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb250ZXh0O1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4oZmFsbGJhY2ssIGtleSkge1xyXG4gICAgcmV0dXJuIGZhbGxiYWNrIGluc3RhbmNlb2YgUmVnRXhwID8gZmFsbGJhY2sudGVzdChrZXkpIDogZmFsbGJhY2s7XHJcbn1cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5mdW5jdGlvbiBpc1RyYW5zbGF0ZU1pc3NpbmdXYXJuKG1pc3NpbmcsIGtleSkge1xyXG4gICAgcmV0dXJuIG1pc3NpbmcgaW5zdGFuY2VvZiBSZWdFeHAgPyBtaXNzaW5nLnRlc3Qoa2V5KSA6IG1pc3Npbmc7XHJcbn1cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5mdW5jdGlvbiBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIGtleSwgbG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSkge1xyXG4gICAgY29uc3QgeyBtaXNzaW5nLCBvbldhcm4gfSA9IGNvbnRleHQ7XHJcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XHJcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgaWYgKGVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWlzc2luZ1wiIC8qIE1JU1NJTkcgKi8sIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsZSxcclxuICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmIChtaXNzaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gbWlzc2luZyhjb250ZXh0LCBsb2NhbGUsIGtleSwgdHlwZSk7XHJcbiAgICAgICAgcmV0dXJuIGlzU3RyaW5nKHJldCkgPyByZXQgOiBrZXk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4obWlzc2luZ1dhcm4sIGtleSkpIHtcclxuICAgICAgICAgICAgb25XYXJuKGdldFdhcm5NZXNzYWdlKENvcmVXYXJuQ29kZXMuTk9UX0ZPVU5EX0tFWSwgeyBrZXksIGxvY2FsZSB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrZXk7XHJcbiAgICB9XHJcbn1cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5mdW5jdGlvbiB1cGRhdGVGYWxsYmFja0xvY2FsZShjdHgsIGxvY2FsZSwgZmFsbGJhY2spIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBjdHg7XHJcbiAgICBjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZSA9IG5ldyBNYXAoKTtcclxuICAgIGN0eC5sb2NhbGVGYWxsYmFja2VyKGN0eCwgZmFsbGJhY2ssIGxvY2FsZSk7XHJcbn1cclxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbmNvbnN0IFJFX0hUTUxfVEFHID0gLzxcXC8/W1xcd1xccz1cIi8uJzo7Iy1cXC9dKz4vO1xyXG5jb25zdCBXQVJOX01FU1NBR0UgPSBgRGV0ZWN0ZWQgSFRNTCBpbiAne3NvdXJjZX0nIG1lc3NhZ2UuIFJlY29tbWVuZCBub3QgdXNpbmcgSFRNTCBtZXNzYWdlcyB0byBhdm9pZCBYU1MuYDtcclxuZnVuY3Rpb24gY2hlY2tIdG1sTWVzc2FnZShzb3VyY2UsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHdhcm5IdG1sTWVzc2FnZSA9IGlzQm9vbGVhbihvcHRpb25zLndhcm5IdG1sTWVzc2FnZSlcclxuICAgICAgICA/IG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgaWYgKHdhcm5IdG1sTWVzc2FnZSAmJiBSRV9IVE1MX1RBRy50ZXN0KHNvdXJjZSkpIHtcclxuICAgICAgICB3YXJuKGZvcm1hdChXQVJOX01FU1NBR0UsIHsgc291cmNlIH0pKTtcclxuICAgIH1cclxufVxyXG5jb25zdCBkZWZhdWx0T25DYWNoZUtleSA9IChzb3VyY2UpID0+IHNvdXJjZTtcclxubGV0IGNvbXBpbGVDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbmZ1bmN0aW9uIGNsZWFyQ29tcGlsZUNhY2hlKCkge1xyXG4gICAgY29tcGlsZUNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxufVxyXG5mdW5jdGlvbiBjb21waWxlVG9GdW5jdGlvbihzb3VyY2UsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAge1xyXG4gICAgICAgIC8vIGNoZWNrIEhUTUwgbWVzc2FnZVxyXG4gICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBjaGVja0h0bWxNZXNzYWdlKHNvdXJjZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgLy8gY2hlY2sgY2FjaGVzXHJcbiAgICAgICAgY29uc3Qgb25DYWNoZUtleSA9IG9wdGlvbnMub25DYWNoZUtleSB8fCBkZWZhdWx0T25DYWNoZUtleTtcclxuICAgICAgICBjb25zdCBrZXkgPSBvbkNhY2hlS2V5KHNvdXJjZSk7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkID0gY29tcGlsZUNhY2hlW2tleV07XHJcbiAgICAgICAgaWYgKGNhY2hlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjb21waWxlIGVycm9yIGRldGVjdGluZ1xyXG4gICAgICAgIGxldCBvY2N1cnJlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IG9uRXJyb3IgPSBvcHRpb25zLm9uRXJyb3IgfHwgZGVmYXVsdE9uRXJyb3I7XHJcbiAgICAgICAgb3B0aW9ucy5vbkVycm9yID0gKGVycikgPT4ge1xyXG4gICAgICAgICAgICBvY2N1cnJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8vIGNvbXBpbGVcclxuICAgICAgICBjb25zdCB7IGNvZGUgfSA9IGJhc2VDb21waWxlKHNvdXJjZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgLy8gZXZhbHVhdGUgZnVuY3Rpb25cclxuICAgICAgICBjb25zdCBtc2cgPSBuZXcgRnVuY3Rpb24oYHJldHVybiAke2NvZGV9YCkoKTtcclxuICAgICAgICAvLyBpZiBvY2N1cnJlZCBjb21waWxlIGVycm9yLCBkb24ndCBjYWNoZVxyXG4gICAgICAgIHJldHVybiAhb2NjdXJyZWQgPyAoY29tcGlsZUNhY2hlW2tleV0gPSBtc2cpIDogbXNnO1xyXG4gICAgfVxyXG59XG5cbmxldCBjb2RlID0gQ29tcGlsZUVycm9yQ29kZXMuX19FWFRFTkRfUE9JTlRfXztcclxuY29uc3QgaW5jID0gKCkgPT4gKytjb2RlO1xyXG5jb25zdCBDb3JlRXJyb3JDb2RlcyA9IHtcclxuICAgIElOVkFMSURfQVJHVU1FTlQ6IGNvZGUsXHJcbiAgICBJTlZBTElEX0RBVEVfQVJHVU1FTlQ6IGluYygpLFxyXG4gICAgSU5WQUxJRF9JU09fREFURV9BUkdVTUVOVDogaW5jKCksXHJcbiAgICBfX0VYVEVORF9QT0lOVF9fOiBpbmMoKSAvLyAxOFxyXG59O1xyXG5mdW5jdGlvbiBjcmVhdGVDb3JlRXJyb3IoY29kZSkge1xyXG4gICAgcmV0dXJuIGNyZWF0ZUNvbXBpbGVFcnJvcihjb2RlLCBudWxsLCAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgPyB7IG1lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzIH0gOiB1bmRlZmluZWQpO1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuY29uc3QgZXJyb3JNZXNzYWdlcyA9IHtcclxuICAgIFtDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UXTogJ0ludmFsaWQgYXJndW1lbnRzJyxcclxuICAgIFtDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0RBVEVfQVJHVU1FTlRdOiAnVGhlIGRhdGUgcHJvdmlkZWQgaXMgYW4gaW52YWxpZCBEYXRlIG9iamVjdC4nICtcclxuICAgICAgICAnTWFrZSBzdXJlIHlvdXIgRGF0ZSByZXByZXNlbnRzIGEgdmFsaWQgZGF0ZS4nLFxyXG4gICAgW0NvcmVFcnJvckNvZGVzLklOVkFMSURfSVNPX0RBVEVfQVJHVU1FTlRdOiAnVGhlIGFyZ3VtZW50IHByb3ZpZGVkIGlzIG5vdCBhIHZhbGlkIElTTyBkYXRlIHN0cmluZydcclxufTtcblxuY29uc3QgTk9PUF9NRVNTQUdFX0ZVTkNUSU9OID0gKCkgPT4gJyc7XHJcbmNvbnN0IGlzTWVzc2FnZUZ1bmN0aW9uID0gKHZhbCkgPT4gaXNGdW5jdGlvbih2YWwpO1xyXG4vLyBpbXBsZW1lbnRhdGlvbiBvZiBgdHJhbnNsYXRlYCBmdW5jdGlvblxyXG5mdW5jdGlvbiB0cmFuc2xhdGUoY29udGV4dCwgLi4uYXJncykge1xyXG4gICAgY29uc3QgeyBmYWxsYmFja0Zvcm1hdCwgcG9zdFRyYW5zbGF0aW9uLCB1bnJlc29sdmluZywgbWVzc2FnZUNvbXBpbGVyLCBmYWxsYmFja0xvY2FsZSwgbWVzc2FnZXMgfSA9IGNvbnRleHQ7XHJcbiAgICBjb25zdCBba2V5LCBvcHRpb25zXSA9IHBhcnNlVHJhbnNsYXRlQXJncyguLi5hcmdzKTtcclxuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pXHJcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXHJcbiAgICAgICAgOiBjb250ZXh0Lm1pc3NpbmdXYXJuO1xyXG4gICAgY29uc3QgZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxyXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cclxuICAgICAgICA6IGNvbnRleHQuZmFsbGJhY2tXYXJuO1xyXG4gICAgY29uc3QgZXNjYXBlUGFyYW1ldGVyID0gaXNCb29sZWFuKG9wdGlvbnMuZXNjYXBlUGFyYW1ldGVyKVxyXG4gICAgICAgID8gb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXJcclxuICAgICAgICA6IGNvbnRleHQuZXNjYXBlUGFyYW1ldGVyO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRNZXNzYWdlID0gISFvcHRpb25zLnJlc29sdmVkTWVzc2FnZTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgZGVmYXVsdE1zZ09yS2V5ID0gaXNTdHJpbmcob3B0aW9ucy5kZWZhdWx0KSB8fCBpc0Jvb2xlYW4ob3B0aW9ucy5kZWZhdWx0KSAvLyBkZWZhdWx0IGJ5IGZ1bmN0aW9uIG9wdGlvblxyXG4gICAgICAgID8gIWlzQm9vbGVhbihvcHRpb25zLmRlZmF1bHQpXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5kZWZhdWx0XHJcbiAgICAgICAgICAgIDogKCFtZXNzYWdlQ29tcGlsZXIgPyAoKSA9PiBrZXkgOiBrZXkpXHJcbiAgICAgICAgOiBmYWxsYmFja0Zvcm1hdCAvLyBkZWZhdWx0IGJ5IGBmYWxsYmFja0Zvcm1hdGAgb3B0aW9uXHJcbiAgICAgICAgICAgID8gKCFtZXNzYWdlQ29tcGlsZXIgPyAoKSA9PiBrZXkgOiBrZXkpXHJcbiAgICAgICAgICAgIDogJyc7XHJcbiAgICBjb25zdCBlbmFibGVEZWZhdWx0TXNnID0gZmFsbGJhY2tGb3JtYXQgfHwgZGVmYXVsdE1zZ09yS2V5ICE9PSAnJztcclxuICAgIGNvbnN0IGxvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKSA/IG9wdGlvbnMubG9jYWxlIDogY29udGV4dC5sb2NhbGU7XHJcbiAgICAvLyBlc2NhcGUgcGFyYW1zXHJcbiAgICBlc2NhcGVQYXJhbWV0ZXIgJiYgZXNjYXBlUGFyYW1zKG9wdGlvbnMpO1xyXG4gICAgLy8gcmVzb2x2ZSBtZXNzYWdlIGZvcm1hdFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1jb25zdFxyXG4gICAgbGV0IFtmb3JtYXRTY29wZSwgdGFyZ2V0TG9jYWxlLCBtZXNzYWdlXSA9ICFyZXNvbHZlZE1lc3NhZ2VcclxuICAgICAgICA/IHJlc29sdmVNZXNzYWdlRm9ybWF0KGNvbnRleHQsIGtleSwgbG9jYWxlLCBmYWxsYmFja0xvY2FsZSwgZmFsbGJhY2tXYXJuLCBtaXNzaW5nV2FybilcclxuICAgICAgICA6IFtcclxuICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICBsb2NhbGUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzW2xvY2FsZV0gfHwge31cclxuICAgICAgICBdO1xyXG4gICAgLy8gTk9URTpcclxuICAgIC8vICBGaXggdG8gd29yayBhcm91bmQgYHNzclRyYW5zZnJvbWAgYnVnIGluIFZpdGUuXHJcbiAgICAvLyAgaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2lzc3Vlcy80MzA2XHJcbiAgICAvLyAgVG8gZ2V0IGFyb3VuZCB0aGlzLCB1c2UgdGVtcG9yYXJ5IHZhcmlhYmxlcy5cclxuICAgIC8vICBodHRwczovL2dpdGh1Yi5jb20vbnV4dC9mcmFtZXdvcmsvaXNzdWVzLzE0NjEjaXNzdWVjb21tZW50LTk1NDYwNjI0M1xyXG4gICAgbGV0IGZvcm1hdCA9IGZvcm1hdFNjb3BlO1xyXG4gICAgLy8gaWYgeW91IHVzZSBkZWZhdWx0IG1lc3NhZ2UsIHNldCBpdCBhcyBtZXNzYWdlIGZvcm1hdCFcclxuICAgIGxldCBjYWNoZUJhc2VLZXkgPSBrZXk7XHJcbiAgICBpZiAoIXJlc29sdmVkTWVzc2FnZSAmJlxyXG4gICAgICAgICEoaXNTdHJpbmcoZm9ybWF0KSB8fCBpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpKSkge1xyXG4gICAgICAgIGlmIChlbmFibGVEZWZhdWx0TXNnKSB7XHJcbiAgICAgICAgICAgIGZvcm1hdCA9IGRlZmF1bHRNc2dPcktleTtcclxuICAgICAgICAgICAgY2FjaGVCYXNlS2V5ID0gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGNoZWNraW5nIG1lc3NhZ2UgZm9ybWF0IGFuZCB0YXJnZXQgbG9jYWxlXHJcbiAgICBpZiAoIXJlc29sdmVkTWVzc2FnZSAmJlxyXG4gICAgICAgICghKGlzU3RyaW5nKGZvcm1hdCkgfHwgaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KSkgfHxcclxuICAgICAgICAgICAgIWlzU3RyaW5nKHRhcmdldExvY2FsZSkpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVucmVzb2x2aW5nID8gTk9UX1JFT1NMVkVEIDoga2V5O1xyXG4gICAgfVxyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpc1N0cmluZyhmb3JtYXQpICYmIGNvbnRleHQubWVzc2FnZUNvbXBpbGVyID09IG51bGwpIHtcclxuICAgICAgICB3YXJuKGBUaGUgbWVzc2FnZSBmb3JtYXQgY29tcGlsYXRpb24gaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJ1aWxkLiBgICtcclxuICAgICAgICAgICAgYEJlY2F1c2UgbWVzc2FnZSBjb21waWxlciBpc24ndCBpbmNsdWRlZC4gYCArXHJcbiAgICAgICAgICAgIGBZb3UgbmVlZCB0byBwcmUtY29tcGlsYXRpb24gYWxsIG1lc3NhZ2UgZm9ybWF0LiBgICtcclxuICAgICAgICAgICAgYFNvIHRyYW5zbGF0ZSBmdW5jdGlvbiByZXR1cm4gJyR7a2V5fScuYCk7XHJcbiAgICAgICAgcmV0dXJuIGtleTtcclxuICAgIH1cclxuICAgIC8vIHNldHVwIGNvbXBpbGUgZXJyb3IgZGV0ZWN0aW5nXHJcbiAgICBsZXQgb2NjdXJyZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGVycm9yRGV0ZWN0b3IgPSAoKSA9PiB7XHJcbiAgICAgICAgb2NjdXJyZWQgPSB0cnVlO1xyXG4gICAgfTtcclxuICAgIC8vIGNvbXBpbGUgbWVzc2FnZSBmb3JtYXRcclxuICAgIGNvbnN0IG1zZyA9ICFpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpXHJcbiAgICAgICAgPyBjb21waWxlTWVzc2FnZUZvcm1hdChjb250ZXh0LCBrZXksIHRhcmdldExvY2FsZSwgZm9ybWF0LCBjYWNoZUJhc2VLZXksIGVycm9yRGV0ZWN0b3IpXHJcbiAgICAgICAgOiBmb3JtYXQ7XHJcbiAgICAvLyBpZiBvY2N1cnJlZCBjb21waWxlIGVycm9yLCByZXR1cm4gdGhlIG1lc3NhZ2UgZm9ybWF0XHJcbiAgICBpZiAob2NjdXJyZWQpIHtcclxuICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgfVxyXG4gICAgLy8gZXZhbHVhdGUgbWVzc2FnZSB3aXRoIGNvbnRleHRcclxuICAgIGNvbnN0IGN0eE9wdGlvbnMgPSBnZXRNZXNzYWdlQ29udGV4dE9wdGlvbnMoY29udGV4dCwgdGFyZ2V0TG9jYWxlLCBtZXNzYWdlLCBvcHRpb25zKTtcclxuICAgIGNvbnN0IG1zZ0NvbnRleHQgPSBjcmVhdGVNZXNzYWdlQ29udGV4dChjdHhPcHRpb25zKTtcclxuICAgIGNvbnN0IG1lc3NhZ2VkID0gZXZhbHVhdGVNZXNzYWdlKGNvbnRleHQsIG1zZywgbXNnQ29udGV4dCk7XHJcbiAgICAvLyBpZiB1c2UgcG9zdCB0cmFuc2xhdGlvbiBvcHRpb24sIHByb2NlZWQgaXQgd2l0aCBoYW5kbGVyXHJcbiAgICBjb25zdCByZXQgPSBwb3N0VHJhbnNsYXRpb25cclxuICAgICAgICA/IHBvc3RUcmFuc2xhdGlvbihtZXNzYWdlZCwga2V5KVxyXG4gICAgICAgIDogbWVzc2FnZWQ7XHJcbiAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xyXG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IHBheWxvYWRzID0ge1xyXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXHJcbiAgICAgICAgICAgIGtleTogaXNTdHJpbmcoa2V5KVxyXG4gICAgICAgICAgICAgICAgPyBrZXlcclxuICAgICAgICAgICAgICAgIDogaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KVxyXG4gICAgICAgICAgICAgICAgICAgID8gZm9ybWF0LmtleVxyXG4gICAgICAgICAgICAgICAgICAgIDogJycsXHJcbiAgICAgICAgICAgIGxvY2FsZTogdGFyZ2V0TG9jYWxlIHx8IChpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpXHJcbiAgICAgICAgICAgICAgICA/IGZvcm1hdC5sb2NhbGVcclxuICAgICAgICAgICAgICAgIDogJycpLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IGlzU3RyaW5nKGZvcm1hdClcclxuICAgICAgICAgICAgICAgID8gZm9ybWF0XHJcbiAgICAgICAgICAgICAgICA6IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdClcclxuICAgICAgICAgICAgICAgICAgICA/IGZvcm1hdC5zb3VyY2VcclxuICAgICAgICAgICAgICAgICAgICA6ICcnLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiByZXRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHBheWxvYWRzLm1ldGEgPSBhc3NpZ24oe30sIGNvbnRleHQuX19tZXRhLCBnZXRBZGRpdGlvbmFsTWV0YSgpIHx8IHt9KTtcclxuICAgICAgICB0cmFuc2xhdGVEZXZUb29scyhwYXlsb2Fkcyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcbmZ1bmN0aW9uIGVzY2FwZVBhcmFtcyhvcHRpb25zKSB7XHJcbiAgICBpZiAoaXNBcnJheShvcHRpb25zLmxpc3QpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5saXN0ID0gb3B0aW9ucy5saXN0Lm1hcChpdGVtID0+IGlzU3RyaW5nKGl0ZW0pID8gZXNjYXBlSHRtbChpdGVtKSA6IGl0ZW0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNPYmplY3Qob3B0aW9ucy5uYW1lZCkpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLm5hbWVkKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpc1N0cmluZyhvcHRpb25zLm5hbWVkW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLm5hbWVkW2tleV0gPSBlc2NhcGVIdG1sKG9wdGlvbnMubmFtZWRba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZXNvbHZlTWVzc2FnZUZvcm1hdChjb250ZXh0LCBrZXksIGxvY2FsZSwgZmFsbGJhY2tMb2NhbGUsIGZhbGxiYWNrV2FybiwgbWlzc2luZ1dhcm4pIHtcclxuICAgIGNvbnN0IHsgbWVzc2FnZXMsIG9uV2FybiwgbWVzc2FnZVJlc29sdmVyOiByZXNvbHZlVmFsdWUsIGxvY2FsZUZhbGxiYWNrZXIgfSA9IGNvbnRleHQ7XHJcbiAgICBjb25zdCBsb2NhbGVzID0gbG9jYWxlRmFsbGJhY2tlcihjb250ZXh0LCBmYWxsYmFja0xvY2FsZSwgbG9jYWxlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBsZXQgbWVzc2FnZSA9IHt9O1xyXG4gICAgbGV0IHRhcmdldExvY2FsZTtcclxuICAgIGxldCBmb3JtYXQgPSBudWxsO1xyXG4gICAgbGV0IGZyb20gPSBsb2NhbGU7XHJcbiAgICBsZXQgdG8gPSBudWxsO1xyXG4gICAgY29uc3QgdHlwZSA9ICd0cmFuc2xhdGUnO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGFyZ2V0TG9jYWxlID0gdG8gPSBsb2NhbGVzW2ldO1xyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcclxuICAgICAgICAgICAgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUgJiZcclxuICAgICAgICAgICAgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4oZmFsbGJhY2tXYXJuLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkZBTExCQUNLX1RPX1RSQU5TTEFURSwge1xyXG4gICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRMb2NhbGVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBsb2NhbGUgIT09IHRhcmdldExvY2FsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcclxuICAgICAgICAgICAgaWYgKGVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImZhbGxiYWNrXCIgLyogRkFMQkFDSyAqLywge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIGZyb20sXHJcbiAgICAgICAgICAgICAgICAgICAgdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7dHlwZX06JHtrZXl9YFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWVzc2FnZSA9XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzW3RhcmdldExvY2FsZV0gfHwge307XHJcbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgICAgIGxldCBzdGFydCA9IG51bGw7XHJcbiAgICAgICAgbGV0IHN0YXJ0VGFnO1xyXG4gICAgICAgIGxldCBlbmRUYWc7XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcclxuICAgICAgICAgICAgc3RhcnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgIHN0YXJ0VGFnID0gJ2ludGxpZnktbWVzc2FnZS1yZXNvbHZlLXN0YXJ0JztcclxuICAgICAgICAgICAgZW5kVGFnID0gJ2ludGxpZnktbWVzc2FnZS1yZXNvbHZlLWVuZCc7XHJcbiAgICAgICAgICAgIG1hcmsgJiYgbWFyayhzdGFydFRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoZm9ybWF0ID0gcmVzb2x2ZVZhbHVlKG1lc3NhZ2UsIGtleSkpID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIC8vIGlmIG51bGwsIHJlc29sdmUgd2l0aCBvYmplY3Qga2V5IHBhdGhcclxuICAgICAgICAgICAgZm9ybWF0ID0gbWVzc2FnZVtrZXldOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgaW5Ccm93c2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyICYmIHN0YXJ0ICYmIGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWVzc2FnZS1yZXNvbHZlXCIgLyogTUVTU0FHRV9SRVNPTFZFICovLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlLXJlc29sdmVcIiAvKiBNRVNTQUdFX1JFU09MVkUgKi8sXHJcbiAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGZvcm1hdCxcclxuICAgICAgICAgICAgICAgICAgICB0aW1lOiBlbmQgLSBzdGFydCxcclxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhcnRUYWcgJiYgZW5kVGFnICYmIG1hcmsgJiYgbWVhc3VyZSkge1xyXG4gICAgICAgICAgICAgICAgbWFyayhlbmRUYWcpO1xyXG4gICAgICAgICAgICAgICAgbWVhc3VyZSgnaW50bGlmeSBtZXNzYWdlIHJlc29sdmUnLCBzdGFydFRhZywgZW5kVGFnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNTdHJpbmcoZm9ybWF0KSB8fCBpc0Z1bmN0aW9uKGZvcm1hdCkpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNvbnN0IG1pc3NpbmdSZXQgPSBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIGtleSwgdGFyZ2V0TG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSk7XHJcbiAgICAgICAgaWYgKG1pc3NpbmdSZXQgIT09IGtleSkge1xyXG4gICAgICAgICAgICBmb3JtYXQgPSBtaXNzaW5nUmV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmcm9tID0gdG87XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2Zvcm1hdCwgdGFyZ2V0TG9jYWxlLCBtZXNzYWdlXTtcclxufVxyXG5mdW5jdGlvbiBjb21waWxlTWVzc2FnZUZvcm1hdChjb250ZXh0LCBrZXksIHRhcmdldExvY2FsZSwgZm9ybWF0LCBjYWNoZUJhc2VLZXksIGVycm9yRGV0ZWN0b3IpIHtcclxuICAgIGNvbnN0IHsgbWVzc2FnZUNvbXBpbGVyLCB3YXJuSHRtbE1lc3NhZ2UgfSA9IGNvbnRleHQ7XHJcbiAgICBpZiAoaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KSkge1xyXG4gICAgICAgIGNvbnN0IG1zZyA9IGZvcm1hdDtcclxuICAgICAgICBtc2cubG9jYWxlID0gbXNnLmxvY2FsZSB8fCB0YXJnZXRMb2NhbGU7XHJcbiAgICAgICAgbXNnLmtleSA9IG1zZy5rZXkgfHwga2V5O1xyXG4gICAgICAgIHJldHVybiBtc2c7XHJcbiAgICB9XHJcbiAgICBpZiAobWVzc2FnZUNvbXBpbGVyID09IG51bGwpIHtcclxuICAgICAgICBjb25zdCBtc2cgPSAoKCkgPT4gZm9ybWF0KTtcclxuICAgICAgICBtc2cubG9jYWxlID0gdGFyZ2V0TG9jYWxlO1xyXG4gICAgICAgIG1zZy5rZXkgPSBrZXk7XHJcbiAgICAgICAgcmV0dXJuIG1zZztcclxuICAgIH1cclxuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcclxuICAgIGxldCBzdGFydCA9IG51bGw7XHJcbiAgICBsZXQgc3RhcnRUYWc7XHJcbiAgICBsZXQgZW5kVGFnO1xyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcclxuICAgICAgICBzdGFydCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBzdGFydFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtY29tcGlsYXRpb24tc3RhcnQnO1xyXG4gICAgICAgIGVuZFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtY29tcGlsYXRpb24tZW5kJztcclxuICAgICAgICBtYXJrICYmIG1hcmsoc3RhcnRUYWcpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbXNnID0gbWVzc2FnZUNvbXBpbGVyKGZvcm1hdCwgZ2V0Q29tcGlsZU9wdGlvbnMoY29udGV4dCwgdGFyZ2V0TG9jYWxlLCBjYWNoZUJhc2VLZXksIGZvcm1hdCwgd2Fybkh0bWxNZXNzYWdlLCBlcnJvckRldGVjdG9yKSk7XHJcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xyXG4gICAgICAgIGNvbnN0IGVuZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcclxuICAgICAgICBpZiAoZW1pdHRlciAmJiBzdGFydCkge1xyXG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJtZXNzYWdlLWNvbXBpbGF0aW9uXCIgLyogTUVTU0FHRV9DT01QSUxBVElPTiAqLywge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlLWNvbXBpbGF0aW9uXCIgLyogTUVTU0FHRV9DT01QSUxBVElPTiAqLyxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGZvcm1hdCxcclxuICAgICAgICAgICAgICAgIHRpbWU6IGVuZCAtIHN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7J3RyYW5zbGF0ZSd9OiR7a2V5fWBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGFydFRhZyAmJiBlbmRUYWcgJiYgbWFyayAmJiBtZWFzdXJlKSB7XHJcbiAgICAgICAgICAgIG1hcmsoZW5kVGFnKTtcclxuICAgICAgICAgICAgbWVhc3VyZSgnaW50bGlmeSBtZXNzYWdlIGNvbXBpbGF0aW9uJywgc3RhcnRUYWcsIGVuZFRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbXNnLmxvY2FsZSA9IHRhcmdldExvY2FsZTtcclxuICAgIG1zZy5rZXkgPSBrZXk7XHJcbiAgICBtc2cuc291cmNlID0gZm9ybWF0O1xyXG4gICAgcmV0dXJuIG1zZztcclxufVxyXG5mdW5jdGlvbiBldmFsdWF0ZU1lc3NhZ2UoY29udGV4dCwgbXNnLCBtc2dDdHgpIHtcclxuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcclxuICAgIGxldCBzdGFydCA9IG51bGw7XHJcbiAgICBsZXQgc3RhcnRUYWc7XHJcbiAgICBsZXQgZW5kVGFnO1xyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcclxuICAgICAgICBzdGFydCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBzdGFydFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtZXZhbHVhdGlvbi1zdGFydCc7XHJcbiAgICAgICAgZW5kVGFnID0gJ2ludGxpZnktbWVzc2FnZS1ldmFsdWF0aW9uLWVuZCc7XHJcbiAgICAgICAgbWFyayAmJiBtYXJrKHN0YXJ0VGFnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1lc3NhZ2VkID0gbXNnKG1zZ0N0eCk7XHJcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xyXG4gICAgICAgIGNvbnN0IGVuZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcclxuICAgICAgICBpZiAoZW1pdHRlciAmJiBzdGFydCkge1xyXG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJtZXNzYWdlLWV2YWx1YXRpb25cIiAvKiBNRVNTQUdFX0VWQUxVQVRJT04gKi8sIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwibWVzc2FnZS1ldmFsdWF0aW9uXCIgLyogTUVTU0FHRV9FVkFMVUFUSU9OICovLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IG1lc3NhZ2VkLFxyXG4gICAgICAgICAgICAgICAgdGltZTogZW5kIC0gc3RhcnQsXHJcbiAgICAgICAgICAgICAgICBncm91cElkOiBgJHsndHJhbnNsYXRlJ306JHttc2cua2V5fWBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGFydFRhZyAmJiBlbmRUYWcgJiYgbWFyayAmJiBtZWFzdXJlKSB7XHJcbiAgICAgICAgICAgIG1hcmsoZW5kVGFnKTtcclxuICAgICAgICAgICAgbWVhc3VyZSgnaW50bGlmeSBtZXNzYWdlIGV2YWx1YXRpb24nLCBzdGFydFRhZywgZW5kVGFnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWVzc2FnZWQ7XHJcbn1cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5mdW5jdGlvbiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncykge1xyXG4gICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzNdID0gYXJncztcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcclxuICAgIGlmICghaXNTdHJpbmcoYXJnMSkgJiYgIWlzTnVtYmVyKGFyZzEpICYmICFpc01lc3NhZ2VGdW5jdGlvbihhcmcxKSkge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcclxuICAgIH1cclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3Qga2V5ID0gaXNOdW1iZXIoYXJnMSlcclxuICAgICAgICA/IFN0cmluZyhhcmcxKVxyXG4gICAgICAgIDogaXNNZXNzYWdlRnVuY3Rpb24oYXJnMSlcclxuICAgICAgICAgICAgPyBhcmcxXHJcbiAgICAgICAgICAgIDogYXJnMTtcclxuICAgIGlmIChpc051bWJlcihhcmcyKSkge1xyXG4gICAgICAgIG9wdGlvbnMucGx1cmFsID0gYXJnMjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGFyZzIpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0ID0gYXJnMjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikgJiYgIWlzRW1wdHlPYmplY3QoYXJnMikpIHtcclxuICAgICAgICBvcHRpb25zLm5hbWVkID0gYXJnMjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzQXJyYXkoYXJnMikpIHtcclxuICAgICAgICBvcHRpb25zLmxpc3QgPSBhcmcyO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzTnVtYmVyKGFyZzMpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBhcmczO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNTdHJpbmcoYXJnMykpIHtcclxuICAgICAgICBvcHRpb25zLmRlZmF1bHQgPSBhcmczO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xyXG4gICAgICAgIGFzc2lnbihvcHRpb25zLCBhcmczKTtcclxuICAgIH1cclxuICAgIHJldHVybiBba2V5LCBvcHRpb25zXTtcclxufVxyXG5mdW5jdGlvbiBnZXRDb21waWxlT3B0aW9ucyhjb250ZXh0LCBsb2NhbGUsIGtleSwgc291cmNlLCB3YXJuSHRtbE1lc3NhZ2UsIGVycm9yRGV0ZWN0b3IpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgd2Fybkh0bWxNZXNzYWdlLFxyXG4gICAgICAgIG9uRXJyb3I6IChlcnIpID0+IHtcclxuICAgICAgICAgICAgZXJyb3JEZXRlY3RvciAmJiBlcnJvckRldGVjdG9yKGVycik7XHJcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgTWVzc2FnZSBjb21waWxhdGlvbiBlcnJvcjogJHtlcnIubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29kZUZyYW1lID0gZXJyLmxvY2F0aW9uICYmXHJcbiAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVDb2RlRnJhbWUoc291cmNlLCBlcnIubG9jYXRpb24uc3RhcnQub2Zmc2V0LCBlcnIubG9jYXRpb24uZW5kLm9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcclxuICAgICAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwiY29tcGlsZS1lcnJvclwiIC8qIENPTVBJTEVfRVJST1IgKi8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogc291cmNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBlcnIubG9jYXRpb24gJiYgZXJyLmxvY2F0aW9uLnN0YXJ0Lm9mZnNldCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBlcnIubG9jYXRpb24gJiYgZXJyLmxvY2F0aW9uLmVuZC5vZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAkeyd0cmFuc2xhdGUnfToke2tleX1gXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGNvZGVGcmFtZSA/IGAke21lc3NhZ2V9XFxuJHtjb2RlRnJhbWV9YCA6IG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvbkNhY2hlS2V5OiAoc291cmNlKSA9PiBnZW5lcmF0ZUZvcm1hdENhY2hlS2V5KGxvY2FsZSwga2V5LCBzb3VyY2UpXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIGdldE1lc3NhZ2VDb250ZXh0T3B0aW9ucyhjb250ZXh0LCBsb2NhbGUsIG1lc3NhZ2UsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHsgbW9kaWZpZXJzLCBwbHVyYWxSdWxlcywgbWVzc2FnZVJlc29sdmVyOiByZXNvbHZlVmFsdWUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuLCBmYWxsYmFja0NvbnRleHQgfSA9IGNvbnRleHQ7XHJcbiAgICBjb25zdCByZXNvbHZlTWVzc2FnZSA9IChrZXkpID0+IHtcclxuICAgICAgICBsZXQgdmFsID0gcmVzb2x2ZVZhbHVlKG1lc3NhZ2UsIGtleSk7XHJcbiAgICAgICAgLy8gZmFsbGJhY2sgdG8gcm9vdCBjb250ZXh0XHJcbiAgICAgICAgaWYgKHZhbCA9PSBudWxsICYmIGZhbGxiYWNrQ29udGV4dCkge1xyXG4gICAgICAgICAgICBjb25zdCBbLCAsIG1lc3NhZ2VdID0gcmVzb2x2ZU1lc3NhZ2VGb3JtYXQoZmFsbGJhY2tDb250ZXh0LCBrZXksIGxvY2FsZSwgZmFsbGJhY2tMb2NhbGUsIGZhbGxiYWNrV2FybiwgbWlzc2luZ1dhcm4pO1xyXG4gICAgICAgICAgICB2YWwgPSByZXNvbHZlVmFsdWUobWVzc2FnZSwga2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKHZhbCkpIHtcclxuICAgICAgICAgICAgbGV0IG9jY3VycmVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNvbnN0IGVycm9yRGV0ZWN0b3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBvY2N1cnJlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IG1zZyA9IGNvbXBpbGVNZXNzYWdlRm9ybWF0KGNvbnRleHQsIGtleSwgbG9jYWxlLCB2YWwsIGtleSwgZXJyb3JEZXRlY3Rvcik7XHJcbiAgICAgICAgICAgIHJldHVybiAhb2NjdXJyZWRcclxuICAgICAgICAgICAgICAgID8gbXNnXHJcbiAgICAgICAgICAgICAgICA6IE5PT1BfTUVTU0FHRV9GVU5DVElPTjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNNZXNzYWdlRnVuY3Rpb24odmFsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogc2hvdWxkIGJlIGltcGxlbWVudGVkIHdhcm5pbmcgbWVzc2FnZVxyXG4gICAgICAgICAgICByZXR1cm4gTk9PUF9NRVNTQUdFX0ZVTkNUSU9OO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBjdHhPcHRpb25zID0ge1xyXG4gICAgICAgIGxvY2FsZSxcclxuICAgICAgICBtb2RpZmllcnMsXHJcbiAgICAgICAgcGx1cmFsUnVsZXMsXHJcbiAgICAgICAgbWVzc2FnZXM6IHJlc29sdmVNZXNzYWdlXHJcbiAgICB9O1xyXG4gICAgaWYgKGNvbnRleHQucHJvY2Vzc29yKSB7XHJcbiAgICAgICAgY3R4T3B0aW9ucy5wcm9jZXNzb3IgPSBjb250ZXh0LnByb2Nlc3NvcjtcclxuICAgIH1cclxuICAgIGlmIChvcHRpb25zLmxpc3QpIHtcclxuICAgICAgICBjdHhPcHRpb25zLmxpc3QgPSBvcHRpb25zLmxpc3Q7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5uYW1lZCkge1xyXG4gICAgICAgIGN0eE9wdGlvbnMubmFtZWQgPSBvcHRpb25zLm5hbWVkO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzTnVtYmVyKG9wdGlvbnMucGx1cmFsKSkge1xyXG4gICAgICAgIGN0eE9wdGlvbnMucGx1cmFsSW5kZXggPSBvcHRpb25zLnBsdXJhbDtcclxuICAgIH1cclxuICAgIHJldHVybiBjdHhPcHRpb25zO1xyXG59XG5cbmNvbnN0IGludGxEZWZpbmVkID0gdHlwZW9mIEludGwgIT09ICd1bmRlZmluZWQnO1xyXG5jb25zdCBBdmFpbGFiaWxpdGllcyA9IHtcclxuICAgIGRhdGVUaW1lRm9ybWF0OiBpbnRsRGVmaW5lZCAmJiB0eXBlb2YgSW50bC5EYXRlVGltZUZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcsXHJcbiAgICBudW1iZXJGb3JtYXQ6IGludGxEZWZpbmVkICYmIHR5cGVvZiBJbnRsLk51bWJlckZvcm1hdCAhPT0gJ3VuZGVmaW5lZCdcclxufTtcblxuLy8gaW1wbGVtZW50YXRpb24gb2YgYGRhdGV0aW1lYCBmdW5jdGlvblxyXG5mdW5jdGlvbiBkYXRldGltZShjb250ZXh0LCAuLi5hcmdzKSB7XHJcbiAgICBjb25zdCB7IGRhdGV0aW1lRm9ybWF0cywgdW5yZXNvbHZpbmcsIGZhbGxiYWNrTG9jYWxlLCBvbldhcm4sIGxvY2FsZUZhbGxiYWNrZXIgfSA9IGNvbnRleHQ7XHJcbiAgICBjb25zdCB7IF9fZGF0ZXRpbWVGb3JtYXR0ZXJzIH0gPSBjb250ZXh0O1xyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiAhQXZhaWxhYmlsaXRpZXMuZGF0ZVRpbWVGb3JtYXQpIHtcclxuICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5DQU5OT1RfRk9STUFUX0RBVEUpKTtcclxuICAgICAgICByZXR1cm4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFO1xyXG4gICAgfVxyXG4gICAgY29uc3QgW2tleSwgdmFsdWUsIG9wdGlvbnMsIG92ZXJyaWRlc10gPSBwYXJzZURhdGVUaW1lQXJncyguLi5hcmdzKTtcclxuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pXHJcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXHJcbiAgICAgICAgOiBjb250ZXh0Lm1pc3NpbmdXYXJuO1xyXG4gICAgY29uc3QgZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxyXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cclxuICAgICAgICA6IGNvbnRleHQuZmFsbGJhY2tXYXJuO1xyXG4gICAgY29uc3QgcGFydCA9ICEhb3B0aW9ucy5wYXJ0O1xyXG4gICAgY29uc3QgbG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpID8gb3B0aW9ucy5sb2NhbGUgOiBjb250ZXh0LmxvY2FsZTtcclxuICAgIGNvbnN0IGxvY2FsZXMgPSBsb2NhbGVGYWxsYmFja2VyKGNvbnRleHQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgZmFsbGJhY2tMb2NhbGUsIGxvY2FsZSk7XHJcbiAgICBpZiAoIWlzU3RyaW5nKGtleSkgfHwga2V5ID09PSAnJykge1xyXG4gICAgICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIG92ZXJyaWRlcykuZm9ybWF0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIHJlc29sdmUgZm9ybWF0XHJcbiAgICBsZXQgZGF0ZXRpbWVGb3JtYXQgPSB7fTtcclxuICAgIGxldCB0YXJnZXRMb2NhbGU7XHJcbiAgICBsZXQgZm9ybWF0ID0gbnVsbDtcclxuICAgIGxldCBmcm9tID0gbG9jYWxlO1xyXG4gICAgbGV0IHRvID0gbnVsbDtcclxuICAgIGNvbnN0IHR5cGUgPSAnZGF0ZXRpbWUgZm9ybWF0JztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRhcmdldExvY2FsZSA9IHRvID0gbG9jYWxlc1tpXTtcclxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXHJcbiAgICAgICAgICAgIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlICYmXHJcbiAgICAgICAgICAgIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrV2Fybiwga2V5KSkge1xyXG4gICAgICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19EQVRFX0ZPUk1BVCwge1xyXG4gICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRMb2NhbGVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBsb2NhbGUgIT09IHRhcmdldExvY2FsZSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY29udGV4dC5fX3ZfZW1pdHRlcjtcclxuICAgICAgICAgICAgaWYgKGVtaXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImZhbGxiYWNrXCIgLyogRkFMQkFDSyAqLywge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIGZyb20sXHJcbiAgICAgICAgICAgICAgICAgICAgdG8sXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7dHlwZX06JHtrZXl9YFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGF0ZXRpbWVGb3JtYXQgPVxyXG4gICAgICAgICAgICBkYXRldGltZUZvcm1hdHNbdGFyZ2V0TG9jYWxlXSB8fCB7fTtcclxuICAgICAgICBmb3JtYXQgPSBkYXRldGltZUZvcm1hdFtrZXldO1xyXG4gICAgICAgIGlmIChpc1BsYWluT2JqZWN0KGZvcm1hdCkpXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGhhbmRsZU1pc3NpbmcoY29udGV4dCwga2V5LCB0YXJnZXRMb2NhbGUsIG1pc3NpbmdXYXJuLCB0eXBlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgZnJvbSA9IHRvO1xyXG4gICAgfVxyXG4gICAgLy8gY2hlY2tpbmcgZm9ybWF0IGFuZCB0YXJnZXQgbG9jYWxlXHJcbiAgICBpZiAoIWlzUGxhaW5PYmplY3QoZm9ybWF0KSB8fCAhaXNTdHJpbmcodGFyZ2V0TG9jYWxlKSkge1xyXG4gICAgICAgIHJldHVybiB1bnJlc29sdmluZyA/IE5PVF9SRU9TTFZFRCA6IGtleTtcclxuICAgIH1cclxuICAgIGxldCBpZCA9IGAke3RhcmdldExvY2FsZX1fXyR7a2V5fWA7XHJcbiAgICBpZiAoIWlzRW1wdHlPYmplY3Qob3ZlcnJpZGVzKSkge1xyXG4gICAgICAgIGlkID0gYCR7aWR9X18ke0pTT04uc3RyaW5naWZ5KG92ZXJyaWRlcyl9YDtcclxuICAgIH1cclxuICAgIGxldCBmb3JtYXR0ZXIgPSBfX2RhdGV0aW1lRm9ybWF0dGVycy5nZXQoaWQpO1xyXG4gICAgaWYgKCFmb3JtYXR0ZXIpIHtcclxuICAgICAgICBmb3JtYXR0ZXIgPSBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCh0YXJnZXRMb2NhbGUsIGFzc2lnbih7fSwgZm9ybWF0LCBvdmVycmlkZXMpKTtcclxuICAgICAgICBfX2RhdGV0aW1lRm9ybWF0dGVycy5zZXQoaWQsIGZvcm1hdHRlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gIXBhcnQgPyBmb3JtYXR0ZXIuZm9ybWF0KHZhbHVlKSA6IGZvcm1hdHRlci5mb3JtYXRUb1BhcnRzKHZhbHVlKTtcclxufVxyXG4vKiogQGludGVybmFsICovXHJcbmNvbnN0IERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMgPSBbXHJcbiAgICAnbG9jYWxlTWF0Y2hlcicsXHJcbiAgICAnd2Vla2RheScsXHJcbiAgICAnZXJhJyxcclxuICAgICd5ZWFyJyxcclxuICAgICdtb250aCcsXHJcbiAgICAnZGF5JyxcclxuICAgICdob3VyJyxcclxuICAgICdtaW51dGUnLFxyXG4gICAgJ3NlY29uZCcsXHJcbiAgICAndGltZVpvbmVOYW1lJyxcclxuICAgICdmb3JtYXRNYXRjaGVyJyxcclxuICAgICdob3VyMTInLFxyXG4gICAgJ3RpbWVab25lJyxcclxuICAgICdkYXRlU3R5bGUnLFxyXG4gICAgJ3RpbWVTdHlsZScsXHJcbiAgICAnY2FsZW5kYXInLFxyXG4gICAgJ2RheVBlcmlvZCcsXHJcbiAgICAnbnVtYmVyaW5nU3lzdGVtJyxcclxuICAgICdob3VyQ3ljbGUnLFxyXG4gICAgJ2ZyYWN0aW9uYWxTZWNvbmREaWdpdHMnXHJcbl07XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gcGFyc2VEYXRlVGltZUFyZ3MoLi4uYXJncykge1xyXG4gICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzMsIGFyZzRdID0gYXJncztcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcclxuICAgIGxldCBvdmVycmlkZXMgPSB7fTtcclxuICAgIGxldCB2YWx1ZTtcclxuICAgIGlmIChpc1N0cmluZyhhcmcxKSkge1xyXG4gICAgICAgIC8vIE9ubHkgYWxsb3cgSVNPIHN0cmluZ3MgLSBvdGhlciBkYXRlIGZvcm1hdHMgYXJlIG9mdGVuIHN1cHBvcnRlZCxcclxuICAgICAgICAvLyBidXQgbWF5IGNhdXNlIGRpZmZlcmVudCByZXN1bHRzIGluIGRpZmZlcmVudCBicm93c2Vycy5cclxuICAgICAgICBjb25zdCBtYXRjaGVzID0gYXJnMS5tYXRjaCgvKFxcZHs0fS1cXGR7Mn0tXFxkezJ9KShUfFxccyk/KC4qKS8pO1xyXG4gICAgICAgIGlmICghbWF0Y2hlcykge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9JU09fREFURV9BUkdVTUVOVCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNvbWUgYnJvd3NlcnMgY2FuIG5vdCBwYXJzZSB0aGUgaXNvIGRhdGV0aW1lIHNlcGFyYXRlZCBieSBzcGFjZSxcclxuICAgICAgICAvLyB0aGlzIGlzIGEgY29tcHJvbWlzZSBzb2x1dGlvbiBieSByZXBsYWNlIHRoZSAnVCcvJyAnIHdpdGggJ1QnXHJcbiAgICAgICAgY29uc3QgZGF0ZVRpbWUgPSBtYXRjaGVzWzNdXHJcbiAgICAgICAgICAgID8gbWF0Y2hlc1szXS50cmltKCkuc3RhcnRzV2l0aCgnVCcpXHJcbiAgICAgICAgICAgICAgICA/IGAke21hdGNoZXNbMV0udHJpbSgpfSR7bWF0Y2hlc1szXS50cmltKCl9YFxyXG4gICAgICAgICAgICAgICAgOiBgJHttYXRjaGVzWzFdLnRyaW0oKX1UJHttYXRjaGVzWzNdLnRyaW0oKX1gXHJcbiAgICAgICAgICAgIDogbWF0Y2hlc1sxXS50cmltKCk7XHJcbiAgICAgICAgdmFsdWUgPSBuZXcgRGF0ZShkYXRlVGltZSk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gVGhpcyB3aWxsIGZhaWwgaWYgdGhlIGRhdGUgaXMgbm90IHZhbGlkXHJcbiAgICAgICAgICAgIHZhbHVlLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0lTT19EQVRFX0FSR1VNRU5UKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc0RhdGUoYXJnMSkpIHtcclxuICAgICAgICBpZiAoaXNOYU4oYXJnMS5nZXRUaW1lKCkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0RBVEVfQVJHVU1FTlQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YWx1ZSA9IGFyZzE7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc051bWJlcihhcmcxKSkge1xyXG4gICAgICAgIHZhbHVlID0gYXJnMTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcclxuICAgIH1cclxuICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xyXG4gICAgICAgIG9wdGlvbnMua2V5ID0gYXJnMjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhhcmcyKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTLmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJyaWRlc1trZXldID0gYXJnMltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gYXJnMltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTdHJpbmcoYXJnMykpIHtcclxuICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzM7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzMpKSB7XHJcbiAgICAgICAgb3ZlcnJpZGVzID0gYXJnMztcclxuICAgIH1cclxuICAgIGlmIChpc1BsYWluT2JqZWN0KGFyZzQpKSB7XHJcbiAgICAgICAgb3ZlcnJpZGVzID0gYXJnNDtcclxuICAgIH1cclxuICAgIHJldHVybiBbb3B0aW9ucy5rZXkgfHwgJycsIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdO1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gY2xlYXJEYXRlVGltZUZvcm1hdChjdHgsIGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY3R4O1xyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gZm9ybWF0KSB7XHJcbiAgICAgICAgY29uc3QgaWQgPSBgJHtsb2NhbGV9X18ke2tleX1gO1xyXG4gICAgICAgIGlmICghY29udGV4dC5fX2RhdGV0aW1lRm9ybWF0dGVycy5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0Ll9fZGF0ZXRpbWVGb3JtYXR0ZXJzLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbn1cblxuLy8gaW1wbGVtZW50YXRpb24gb2YgYG51bWJlcmAgZnVuY3Rpb25cclxuZnVuY3Rpb24gbnVtYmVyKGNvbnRleHQsIC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IHsgbnVtYmVyRm9ybWF0cywgdW5yZXNvbHZpbmcsIGZhbGxiYWNrTG9jYWxlLCBvbldhcm4sIGxvY2FsZUZhbGxiYWNrZXIgfSA9IGNvbnRleHQ7XHJcbiAgICBjb25zdCB7IF9fbnVtYmVyRm9ybWF0dGVycyB9ID0gY29udGV4dDtcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgIUF2YWlsYWJpbGl0aWVzLm51bWJlckZvcm1hdCkge1xyXG4gICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkNBTk5PVF9GT1JNQVRfTlVNQkVSKSk7XHJcbiAgICAgICAgcmV0dXJuIE1JU1NJTkdfUkVTT0xWRV9WQUxVRTtcclxuICAgIH1cclxuICAgIGNvbnN0IFtrZXksIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdID0gcGFyc2VOdW1iZXJBcmdzKC4uLmFyZ3MpO1xyXG4gICAgY29uc3QgbWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybilcclxuICAgICAgICA/IG9wdGlvbnMubWlzc2luZ1dhcm5cclxuICAgICAgICA6IGNvbnRleHQubWlzc2luZ1dhcm47XHJcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pXHJcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrV2FyblxyXG4gICAgICAgIDogY29udGV4dC5mYWxsYmFja1dhcm47XHJcbiAgICBjb25zdCBwYXJ0ID0gISFvcHRpb25zLnBhcnQ7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBpc1N0cmluZyhvcHRpb25zLmxvY2FsZSkgPyBvcHRpb25zLmxvY2FsZSA6IGNvbnRleHQubG9jYWxlO1xyXG4gICAgY29uc3QgbG9jYWxlcyA9IGxvY2FsZUZhbGxiYWNrZXIoY29udGV4dCwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBmYWxsYmFja0xvY2FsZSwgbG9jYWxlKTtcclxuICAgIGlmICghaXNTdHJpbmcoa2V5KSB8fCBrZXkgPT09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChsb2NhbGUsIG92ZXJyaWRlcykuZm9ybWF0KHZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIHJlc29sdmUgZm9ybWF0XHJcbiAgICBsZXQgbnVtYmVyRm9ybWF0ID0ge307XHJcbiAgICBsZXQgdGFyZ2V0TG9jYWxlO1xyXG4gICAgbGV0IGZvcm1hdCA9IG51bGw7XHJcbiAgICBsZXQgZnJvbSA9IGxvY2FsZTtcclxuICAgIGxldCB0byA9IG51bGw7XHJcbiAgICBjb25zdCB0eXBlID0gJ251bWJlciBmb3JtYXQnO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGFyZ2V0TG9jYWxlID0gdG8gPSBsb2NhbGVzW2ldO1xyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcclxuICAgICAgICAgICAgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUgJiZcclxuICAgICAgICAgICAgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4oZmFsbGJhY2tXYXJuLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLkZBTExCQUNLX1RPX05VTUJFUl9GT1JNQVQsIHtcclxuICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0TG9jYWxlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJmYWxsYmFja1wiIC8qIEZBTEJBQ0sgKi8sIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgICAgICBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3R5cGV9OiR7a2V5fWBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG51bWJlckZvcm1hdCA9XHJcbiAgICAgICAgICAgIG51bWJlckZvcm1hdHNbdGFyZ2V0TG9jYWxlXSB8fCB7fTtcclxuICAgICAgICBmb3JtYXQgPSBudW1iZXJGb3JtYXRba2V5XTtcclxuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChmb3JtYXQpKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIGtleSwgdGFyZ2V0TG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIGZyb20gPSB0bztcclxuICAgIH1cclxuICAgIC8vIGNoZWNraW5nIGZvcm1hdCBhbmQgdGFyZ2V0IGxvY2FsZVxyXG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGZvcm1hdCkgfHwgIWlzU3RyaW5nKHRhcmdldExvY2FsZSkpIHtcclxuICAgICAgICByZXR1cm4gdW5yZXNvbHZpbmcgPyBOT1RfUkVPU0xWRUQgOiBrZXk7XHJcbiAgICB9XHJcbiAgICBsZXQgaWQgPSBgJHt0YXJnZXRMb2NhbGV9X18ke2tleX1gO1xyXG4gICAgaWYgKCFpc0VtcHR5T2JqZWN0KG92ZXJyaWRlcykpIHtcclxuICAgICAgICBpZCA9IGAke2lkfV9fJHtKU09OLnN0cmluZ2lmeShvdmVycmlkZXMpfWA7XHJcbiAgICB9XHJcbiAgICBsZXQgZm9ybWF0dGVyID0gX19udW1iZXJGb3JtYXR0ZXJzLmdldChpZCk7XHJcbiAgICBpZiAoIWZvcm1hdHRlcikge1xyXG4gICAgICAgIGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCh0YXJnZXRMb2NhbGUsIGFzc2lnbih7fSwgZm9ybWF0LCBvdmVycmlkZXMpKTtcclxuICAgICAgICBfX251bWJlckZvcm1hdHRlcnMuc2V0KGlkLCBmb3JtYXR0ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICFwYXJ0ID8gZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSkgOiBmb3JtYXR0ZXIuZm9ybWF0VG9QYXJ0cyh2YWx1ZSk7XHJcbn1cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5jb25zdCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUyA9IFtcclxuICAgICdsb2NhbGVNYXRjaGVyJyxcclxuICAgICdzdHlsZScsXHJcbiAgICAnY3VycmVuY3knLFxyXG4gICAgJ2N1cnJlbmN5RGlzcGxheScsXHJcbiAgICAnY3VycmVuY3lTaWduJyxcclxuICAgICd1c2VHcm91cGluZycsXHJcbiAgICAnbWluaW11bUludGVnZXJEaWdpdHMnLFxyXG4gICAgJ21pbmltdW1GcmFjdGlvbkRpZ2l0cycsXHJcbiAgICAnbWF4aW11bUZyYWN0aW9uRGlnaXRzJyxcclxuICAgICdtaW5pbXVtU2lnbmlmaWNhbnREaWdpdHMnLFxyXG4gICAgJ21heGltdW1TaWduaWZpY2FudERpZ2l0cycsXHJcbiAgICAnY29tcGFjdERpc3BsYXknLFxyXG4gICAgJ25vdGF0aW9uJyxcclxuICAgICdzaWduRGlzcGxheScsXHJcbiAgICAndW5pdCcsXHJcbiAgICAndW5pdERpc3BsYXknLFxyXG4gICAgJ3JvdW5kaW5nTW9kZScsXHJcbiAgICAncm91bmRpbmdQcmlvcml0eScsXHJcbiAgICAncm91bmRpbmdJbmNyZW1lbnQnLFxyXG4gICAgJ3RyYWlsaW5nWmVyb0Rpc3BsYXknXHJcbl07XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gcGFyc2VOdW1iZXJBcmdzKC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczLCBhcmc0XSA9IGFyZ3M7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgICBsZXQgb3ZlcnJpZGVzID0ge307XHJcbiAgICBpZiAoIWlzTnVtYmVyKGFyZzEpKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlQpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdmFsdWUgPSBhcmcxO1xyXG4gICAgaWYgKGlzU3RyaW5nKGFyZzIpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5rZXkgPSBhcmcyO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmcyKSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGFyZzIpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKE5VTUJFUl9GT1JNQVRfT1BUSU9OU19LRVlTLmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgICAgICAgICAgIG92ZXJyaWRlc1trZXldID0gYXJnMltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gYXJnMltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTdHJpbmcoYXJnMykpIHtcclxuICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzM7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzMpKSB7XHJcbiAgICAgICAgb3ZlcnJpZGVzID0gYXJnMztcclxuICAgIH1cclxuICAgIGlmIChpc1BsYWluT2JqZWN0KGFyZzQpKSB7XHJcbiAgICAgICAgb3ZlcnJpZGVzID0gYXJnNDtcclxuICAgIH1cclxuICAgIHJldHVybiBbb3B0aW9ucy5rZXkgfHwgJycsIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdO1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gY2xlYXJOdW1iZXJGb3JtYXQoY3R4LCBsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IGN0eDtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm1hdCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gYCR7bG9jYWxlfV9fJHtrZXl9YDtcclxuICAgICAgICBpZiAoIWNvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzLmhhcyhpZCkpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzLmRlbGV0ZShpZCk7XHJcbiAgICB9XHJcbn1cblxuLy8gVE9ETzogd2UgY291bGQgbm90IGV4cG9ydHMgZm9yIE5vZGUgbmF0aXZlIEVTIE1vdWRsZXMgeWV0Li4uXHJcbntcclxuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXyAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gPSBmYWxzZTtcclxuICAgIH1cclxufVxuXG5leHBvcnQgeyBDb3JlRXJyb3JDb2RlcywgQ29yZVdhcm5Db2RlcywgREFURVRJTUVfRk9STUFUX09QVElPTlNfS0VZUywgREVGQVVMVF9MT0NBTEUsIERFRkFVTFRfTUVTU0FHRV9EQVRBX1RZUEUsIE1JU1NJTkdfUkVTT0xWRV9WQUxVRSwgTk9UX1JFT1NMVkVELCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUywgVkVSU0lPTiwgY2xlYXJDb21waWxlQ2FjaGUsIGNsZWFyRGF0ZVRpbWVGb3JtYXQsIGNsZWFyTnVtYmVyRm9ybWF0LCBjb21waWxlVG9GdW5jdGlvbiwgY3JlYXRlQ29yZUNvbnRleHQsIGNyZWF0ZUNvcmVFcnJvciwgY3JlYXRlTWVzc2FnZUNvbnRleHQsIGRhdGV0aW1lLCBmYWxsYmFja1dpdGhMb2NhbGVDaGFpbiwgZmFsbGJhY2tXaXRoU2ltcGxlLCBnZXRBZGRpdGlvbmFsTWV0YSwgZ2V0RGV2VG9vbHNIb29rLCBnZXRGYWxsYmFja0NvbnRleHQsIGdldFdhcm5NZXNzYWdlLCBoYW5kbGVNaXNzaW5nLCBpbml0STE4bkRldlRvb2xzLCBpc01lc3NhZ2VGdW5jdGlvbiwgaXNUcmFuc2xhdGVGYWxsYmFja1dhcm4sIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4sIG51bWJlciwgcGFyc2UsIHBhcnNlRGF0ZVRpbWVBcmdzLCBwYXJzZU51bWJlckFyZ3MsIHBhcnNlVHJhbnNsYXRlQXJncywgcmVnaXN0ZXJMb2NhbGVGYWxsYmFja2VyLCByZWdpc3Rlck1lc3NhZ2VDb21waWxlciwgcmVnaXN0ZXJNZXNzYWdlUmVzb2x2ZXIsIHJlc29sdmVWYWx1ZSwgcmVzb2x2ZVdpdGhLZXlWYWx1ZSwgc2V0QWRkaXRpb25hbE1ldGEsIHNldERldlRvb2xzSG9vaywgc2V0RmFsbGJhY2tDb250ZXh0LCB0cmFuc2xhdGUsIHRyYW5zbGF0ZURldlRvb2xzLCB1cGRhdGVGYWxsYmFja0xvY2FsZSB9O1xuIiwiLyohXG4gICogdnVlLWRldnRvb2xzIHY5LjIuMlxuICAqIChjKSAyMDIyIGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5jb25zdCBWdWVEZXZUb29sc0xhYmVscyA9IHtcclxuICAgIFtcInZ1ZS1kZXZ0b29scy1wbHVnaW4tdnVlLWkxOG5cIiAvKiBQTFVHSU4gKi9dOiAnVnVlIEkxOG4gZGV2dG9vbHMnLFxyXG4gICAgW1widnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogQ1VTVE9NX0lOU1BFQ1RPUiAqL106ICdJMThuIFJlc291cmNlcycsXHJcbiAgICBbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFRJTUVMSU5FICovXTogJ1Z1ZSBJMThuJ1xyXG59O1xyXG5jb25zdCBWdWVEZXZUb29sc1BsYWNlaG9sZGVycyA9IHtcclxuICAgIFtcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIENVU1RPTV9JTlNQRUNUT1IgKi9dOiAnU2VhcmNoIGZvciBzY29wZXMgLi4uJ1xyXG59O1xyXG5jb25zdCBWdWVEZXZUb29sc1RpbWVsaW5lQ29sb3JzID0ge1xyXG4gICAgW1widnVlLWkxOG4tdGltZWxpbmVcIiAvKiBUSU1FTElORSAqL106IDB4ZmZjZDE5XHJcbn07XG5cbmV4cG9ydCB7IFZ1ZURldlRvb2xzTGFiZWxzLCBWdWVEZXZUb29sc1BsYWNlaG9sZGVycywgVnVlRGV2VG9vbHNUaW1lbGluZUNvbG9ycyB9O1xuIiwiLyohXG4gICogdnVlLWkxOG4gdjkuMi4yXG4gICogKGMpIDIwMjIga2F6dXlhIGthd2FndWNoaVxuICAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAgKi9cbmltcG9ydCB7IGdldEdsb2JhbFRoaXMsIGZvcm1hdCwgbWFrZVN5bWJvbCwgaXNQbGFpbk9iamVjdCwgaXNBcnJheSwgaXNTdHJpbmcsIGhhc093biwgaXNPYmplY3QsIGlzQm9vbGVhbiwgaXNSZWdFeHAsIGlzRnVuY3Rpb24sIGluQnJvd3NlciwgYXNzaWduLCBpc051bWJlciwgd2FybiwgY3JlYXRlRW1pdHRlciwgaXNFbXB0eU9iamVjdCB9IGZyb20gJ0BpbnRsaWZ5L3NoYXJlZCc7XG5pbXBvcnQgeyBDb3JlV2FybkNvZGVzLCBDb21waWxlRXJyb3JDb2RlcywgY3JlYXRlQ29tcGlsZUVycm9yLCBERUZBVUxUX0xPQ0FMRSwgdXBkYXRlRmFsbGJhY2tMb2NhbGUsIHNldEZhbGxiYWNrQ29udGV4dCwgY3JlYXRlQ29yZUNvbnRleHQsIGNsZWFyRGF0ZVRpbWVGb3JtYXQsIGNsZWFyTnVtYmVyRm9ybWF0LCBzZXRBZGRpdGlvbmFsTWV0YSwgZ2V0RmFsbGJhY2tDb250ZXh0LCBOT1RfUkVPU0xWRUQsIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuLCBpc1RyYW5zbGF0ZU1pc3NpbmdXYXJuLCBwYXJzZVRyYW5zbGF0ZUFyZ3MsIHRyYW5zbGF0ZSwgTUlTU0lOR19SRVNPTFZFX1ZBTFVFLCBwYXJzZURhdGVUaW1lQXJncywgZGF0ZXRpbWUsIHBhcnNlTnVtYmVyQXJncywgbnVtYmVyLCBmYWxsYmFja1dpdGhMb2NhbGVDaGFpbiwgTlVNQkVSX0ZPUk1BVF9PUFRJT05TX0tFWVMsIERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMsIHJlZ2lzdGVyTWVzc2FnZVJlc29sdmVyLCByZXNvbHZlVmFsdWUsIHJlZ2lzdGVyTG9jYWxlRmFsbGJhY2tlciwgc2V0RGV2VG9vbHNIb29rIH0gZnJvbSAnQGludGxpZnkvY29yZS1iYXNlJztcbmltcG9ydCB7IGNyZWF0ZVZOb2RlLCBUZXh0LCByZWYsIGNvbXB1dGVkLCB3YXRjaCwgZ2V0Q3VycmVudEluc3RhbmNlLCBGcmFnbWVudCwgaCwgZWZmZWN0U2NvcGUsIGluamVjdCwgb25Nb3VudGVkLCBvblVubW91bnRlZCwgc2hhbGxvd1JlZiwgb25CZWZvcmVNb3VudCwgaXNSZWYgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgc2V0dXBEZXZ0b29sc1BsdWdpbiB9IGZyb20gJ0B2dWUvZGV2dG9vbHMtYXBpJztcbmltcG9ydCB7IFZ1ZURldlRvb2xzTGFiZWxzLCBWdWVEZXZUb29sc1BsYWNlaG9sZGVycywgVnVlRGV2VG9vbHNUaW1lbGluZUNvbG9ycyB9IGZyb20gJ0BpbnRsaWZ5L3Z1ZS1kZXZ0b29scyc7XG5cbi8qKlxyXG4gKiBWdWUgSTE4biBWZXJzaW9uXHJcbiAqXHJcbiAqIEByZW1hcmtzXHJcbiAqIFNlbXZlciBmb3JtYXQuIFNhbWUgZm9ybWF0IGFzIHRoZSBwYWNrYWdlLmpzb24gYHZlcnNpb25gIGZpZWxkLlxyXG4gKlxyXG4gKiBAVnVlSTE4bkdlbmVyYWxcclxuICovXHJcbmNvbnN0IFZFUlNJT04gPSAnOS4yLjInO1xyXG4vKipcclxuICogVGhpcyBpcyBvbmx5IGNhbGxlZCBpbiBlc20tYnVuZGxlciBidWlsZHMuXHJcbiAqIGlzdGFuYnVsLWlnbm9yZS1uZXh0XHJcbiAqL1xyXG5mdW5jdGlvbiBpbml0RmVhdHVyZUZsYWdzKCkge1xyXG4gICAgbGV0IG5lZWRXYXJuID0gZmFsc2U7XHJcbiAgICBpZiAodHlwZW9mIF9fVlVFX0kxOE5fRlVMTF9JTlNUQUxMX18gIT09ICdib29sZWFuJykge1xyXG4gICAgICAgIG5lZWRXYXJuID0gdHJ1ZTtcclxuICAgICAgICBnZXRHbG9iYWxUaGlzKCkuX19WVUVfSTE4Tl9GVUxMX0lOU1RBTExfXyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBuZWVkV2FybiA9IHRydWU7XHJcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXyAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbmVlZFdhcm4pIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYFlvdSBhcmUgcnVubmluZyB0aGUgZXNtLWJ1bmRsZXIgYnVpbGQgb2YgdnVlLWkxOG4uIEl0IGlzIHJlY29tbWVuZGVkIHRvIGAgK1xyXG4gICAgICAgICAgICBgY29uZmlndXJlIHlvdXIgYnVuZGxlciB0byBleHBsaWNpdGx5IHJlcGxhY2UgZmVhdHVyZSBmbGFnIGdsb2JhbHMgYCArXHJcbiAgICAgICAgICAgIGB3aXRoIGJvb2xlYW4gbGl0ZXJhbHMgdG8gZ2V0IHByb3BlciB0cmVlLXNoYWtpbmcgaW4gdGhlIGZpbmFsIGJ1bmRsZS5gKTtcclxuICAgIH1cclxufVxuXG5sZXQgY29kZSQxID0gQ29yZVdhcm5Db2Rlcy5fX0VYVEVORF9QT0lOVF9fO1xyXG5jb25zdCBpbmMkMSA9ICgpID0+ICsrY29kZSQxO1xyXG5jb25zdCBJMThuV2FybkNvZGVzID0ge1xyXG4gICAgRkFMTEJBQ0tfVE9fUk9PVDogY29kZSQxLFxyXG4gICAgTk9UX1NVUFBPUlRFRF9QUkVTRVJWRTogaW5jJDEoKSxcclxuICAgIE5PVF9TVVBQT1JURURfRk9STUFUVEVSOiBpbmMkMSgpLFxyXG4gICAgTk9UX1NVUFBPUlRFRF9QUkVTRVJWRV9ESVJFQ1RJVkU6IGluYyQxKCksXHJcbiAgICBOT1RfU1VQUE9SVEVEX0dFVF9DSE9JQ0VfSU5ERVg6IGluYyQxKCksXHJcbiAgICBDT01QT05FTlRfTkFNRV9MRUdBQ1lfQ09NUEFUSUJMRTogaW5jJDEoKSxcclxuICAgIE5PVF9GT1VORF9QQVJFTlRfU0NPUEU6IGluYyQxKCkgLy8gMTNcclxufTtcclxuY29uc3Qgd2Fybk1lc3NhZ2VzID0ge1xyXG4gICAgW0kxOG5XYXJuQ29kZXMuRkFMTEJBQ0tfVE9fUk9PVF06IGBGYWxsIGJhY2sgdG8ge3R5cGV9ICd7a2V5fScgd2l0aCByb290IGxvY2FsZS5gLFxyXG4gICAgW0kxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRV06IGBOb3Qgc3VwcG9ydGVkICdwcmVzZXJ2ZScuYCxcclxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfRk9STUFUVEVSXTogYE5vdCBzdXBwb3J0ZWQgJ2Zvcm1hdHRlcicuYCxcclxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfUFJFU0VSVkVfRElSRUNUSVZFXTogYE5vdCBzdXBwb3J0ZWQgJ3ByZXNlcnZlRGlyZWN0aXZlQ29udGVudCcuYCxcclxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfR0VUX0NIT0lDRV9JTkRFWF06IGBOb3Qgc3VwcG9ydGVkICdnZXRDaG9pY2VJbmRleCcuYCxcclxuICAgIFtJMThuV2FybkNvZGVzLkNPTVBPTkVOVF9OQU1FX0xFR0FDWV9DT01QQVRJQkxFXTogYENvbXBvbmVudCBuYW1lIGxlZ2FjeSBjb21wYXRpYmxlOiAne25hbWV9JyAtPiAnaTE4bidgLFxyXG4gICAgW0kxOG5XYXJuQ29kZXMuTk9UX0ZPVU5EX1BBUkVOVF9TQ09QRV06IGBOb3QgZm91bmQgcGFyZW50IHNjb3BlLiB1c2UgdGhlIGdsb2JhbCBzY29wZS5gXHJcbn07XHJcbmZ1bmN0aW9uIGdldFdhcm5NZXNzYWdlKGNvZGUsIC4uLmFyZ3MpIHtcclxuICAgIHJldHVybiBmb3JtYXQod2Fybk1lc3NhZ2VzW2NvZGVdLCAuLi5hcmdzKTtcclxufVxuXG5sZXQgY29kZSA9IENvbXBpbGVFcnJvckNvZGVzLl9fRVhURU5EX1BPSU5UX187XHJcbmNvbnN0IGluYyA9ICgpID0+ICsrY29kZTtcclxuY29uc3QgSTE4bkVycm9yQ29kZXMgPSB7XHJcbiAgICAvLyBjb21wb3NlciBtb2R1bGUgZXJyb3JzXHJcbiAgICBVTkVYUEVDVEVEX1JFVFVSTl9UWVBFOiBjb2RlLFxyXG4gICAgLy8gbGVnYWN5IG1vZHVsZSBlcnJvcnNcclxuICAgIElOVkFMSURfQVJHVU1FTlQ6IGluYygpLFxyXG4gICAgLy8gaTE4biBtb2R1bGUgZXJyb3JzXHJcbiAgICBNVVNUX0JFX0NBTExfU0VUVVBfVE9QOiBpbmMoKSxcclxuICAgIE5PVF9JTlNMQUxMRUQ6IGluYygpLFxyXG4gICAgTk9UX0FWQUlMQUJMRV9JTl9MRUdBQ1lfTU9ERTogaW5jKCksXHJcbiAgICAvLyBkaXJlY3RpdmUgbW9kdWxlIGVycm9yc1xyXG4gICAgUkVRVUlSRURfVkFMVUU6IGluYygpLFxyXG4gICAgSU5WQUxJRF9WQUxVRTogaW5jKCksXHJcbiAgICAvLyB2dWUtZGV2dG9vbHMgZXJyb3JzXHJcbiAgICBDQU5OT1RfU0VUVVBfVlVFX0RFVlRPT0xTX1BMVUdJTjogaW5jKCksXHJcbiAgICBOT1RfSU5TTEFMTEVEX1dJVEhfUFJPVklERTogaW5jKCksXHJcbiAgICAvLyB1bmV4cGVjdGVkIGVycm9yXHJcbiAgICBVTkVYUEVDVEVEX0VSUk9SOiBpbmMoKSxcclxuICAgIC8vIG5vdCBjb21wYXRpYmxlIGxlZ2FjeSB2dWUtaTE4biBjb25zdHJ1Y3RvclxyXG4gICAgTk9UX0NPTVBBVElCTEVfTEVHQUNZX1ZVRV9JMThOOiBpbmMoKSxcclxuICAgIC8vIGJyaWRnZSBzdXBwb3J0IHZ1ZSAyLnggb25seVxyXG4gICAgQlJJREdFX1NVUFBPUlRfVlVFXzJfT05MWTogaW5jKCksXHJcbiAgICAvLyBuZWVkIHRvIGRlZmluZSBgaTE4bmAgb3B0aW9uIGluIGBhbGxvd0NvbXBvc2l0aW9uOiB0cnVlYCBhbmQgYHVzZVNjb3BlOiAnbG9jYWwnIGF0IGB1c2VJMThuYGBcclxuICAgIE1VU1RfREVGSU5FX0kxOE5fT1BUSU9OX0lOX0FMTE9XX0NPTVBPU0lUSU9OOiBpbmMoKSxcclxuICAgIC8vIE5vdCBhdmFpbGFibGUgQ29tcG9zdGlvbiBBUEkgaW4gTGVnYWN5IEFQSSBtb2RlLiBQbGVhc2UgbWFrZSBzdXJlIHRoYXQgdGhlIGxlZ2FjeSBBUEkgbW9kZSBpcyB3b3JraW5nIHByb3Blcmx5XHJcbiAgICBOT1RfQVZBSUxBQkxFX0NPTVBPU0lUSU9OX0lOX0xFR0FDWTogaW5jKCksXHJcbiAgICAvLyBmb3IgZW5oYW5jZW1lbnRcclxuICAgIF9fRVhURU5EX1BPSU5UX186IGluYygpIC8vIDI5XHJcbn07XHJcbmZ1bmN0aW9uIGNyZWF0ZUkxOG5FcnJvcihjb2RlLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gY3JlYXRlQ29tcGlsZUVycm9yKGNvZGUsIG51bGwsIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSA/IHsgbWVzc2FnZXM6IGVycm9yTWVzc2FnZXMsIGFyZ3MgfSA6IHVuZGVmaW5lZCk7XHJcbn1cclxuY29uc3QgZXJyb3JNZXNzYWdlcyA9IHtcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX1JFVFVSTl9UWVBFXTogJ1VuZXhwZWN0ZWQgcmV0dXJuIHR5cGUgaW4gY29tcG9zZXInLFxyXG4gICAgW0kxOG5FcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlRdOiAnSW52YWxpZCBhcmd1bWVudCcsXHJcbiAgICBbSTE4bkVycm9yQ29kZXMuTVVTVF9CRV9DQUxMX1NFVFVQX1RPUF06ICdNdXN0IGJlIGNhbGxlZCBhdCB0aGUgdG9wIG9mIGEgYHNldHVwYCBmdW5jdGlvbicsXHJcbiAgICBbSTE4bkVycm9yQ29kZXMuTk9UX0lOU0xBTExFRF06ICdOZWVkIHRvIGluc3RhbGwgd2l0aCBgYXBwLnVzZWAgZnVuY3Rpb24nLFxyXG4gICAgW0kxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1JdOiAnVW5leHBlY3RlZCBlcnJvcicsXHJcbiAgICBbSTE4bkVycm9yQ29kZXMuTk9UX0FWQUlMQUJMRV9JTl9MRUdBQ1lfTU9ERV06ICdOb3QgYXZhaWxhYmxlIGluIGxlZ2FjeSBtb2RlJyxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5SRVFVSVJFRF9WQUxVRV06IGBSZXF1aXJlZCBpbiB2YWx1ZTogezB9YCxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5JTlZBTElEX1ZBTFVFXTogYEludmFsaWQgdmFsdWVgLFxyXG4gICAgW0kxOG5FcnJvckNvZGVzLkNBTk5PVF9TRVRVUF9WVUVfREVWVE9PTFNfUExVR0lOXTogYENhbm5vdCBzZXR1cCB2dWUtZGV2dG9vbHMgcGx1Z2luYCxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfSU5TTEFMTEVEX1dJVEhfUFJPVklERV06ICdOZWVkIHRvIGluc3RhbGwgd2l0aCBgcHJvdmlkZWAgZnVuY3Rpb24nLFxyXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9DT01QQVRJQkxFX0xFR0FDWV9WVUVfSTE4Tl06ICdOb3QgY29tcGF0aWJsZSBsZWdhY3kgVnVlSTE4bi4nLFxyXG4gICAgW0kxOG5FcnJvckNvZGVzLkJSSURHRV9TVVBQT1JUX1ZVRV8yX09OTFldOiAndnVlLWkxOG4tYnJpZGdlIHN1cHBvcnQgVnVlIDIueCBvbmx5JyxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5NVVNUX0RFRklORV9JMThOX09QVElPTl9JTl9BTExPV19DT01QT1NJVElPTl06ICdNdXN0IGRlZmluZSDigJhpMThu4oCZIG9wdGlvbiBvciBjdXN0b20gYmxvY2sgaW4gQ29tcG9zaXRpb24gQVBJIHdpdGggdXNpbmcgbG9jYWwgc2NvcGUgaW4gTGVnYWN5IEFQSSBtb2RlJyxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0NPTVBPU0lUSU9OX0lOX0xFR0FDWV06ICdOb3QgYXZhaWxhYmxlIENvbXBvc3Rpb24gQVBJIGluIExlZ2FjeSBBUEkgbW9kZS4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHRoZSBsZWdhY3kgQVBJIG1vZGUgaXMgd29ya2luZyBwcm9wZXJseSdcclxufTtcblxuY29uc3QgVHJhbnNyYXRlVk5vZGVTeW1ib2wgPSBcclxuLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX190cmFuc3JhdGVWTm9kZScpO1xyXG5jb25zdCBEYXRldGltZVBhcnRzU3ltYm9sID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19kYXRldGltZVBhcnRzJyk7XHJcbmNvbnN0IE51bWJlclBhcnRzU3ltYm9sID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19udW1iZXJQYXJ0cycpO1xyXG5jb25zdCBFbmFibGVFbWl0dGVyID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19lbmFibGVFbWl0dGVyJyk7XHJcbmNvbnN0IERpc2FibGVFbWl0dGVyID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19kaXNhYmxlRW1pdHRlcicpO1xyXG5jb25zdCBTZXRQbHVyYWxSdWxlc1N5bWJvbCA9IG1ha2VTeW1ib2woJ19fc2V0UGx1cmFsUnVsZXMnKTtcclxubWFrZVN5bWJvbCgnX19pbnRsaWZ5TWV0YScpO1xyXG5jb25zdCBJbmVqY3RXaXRoT3B0aW9uID0gLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnX19pbmplY3RXaXRoT3B0aW9uJyk7XHJcbmNvbnN0IF9fVlVFX0kxOE5fQlJJREdFX18gPSAgJ19fVlVFX0kxOE5fQlJJREdFX18nO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXHJcbi8qKlxyXG4gKiBUcmFuc2Zvcm0gZmxhdCBqc29uIGluIG9iaiB0byBub3JtYWwganNvbiBpbiBvYmpcclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZUZsYXRKc29uKG9iaikge1xyXG4gICAgLy8gY2hlY2sgb2JqXHJcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgLy8gY2hlY2sga2V5XHJcbiAgICAgICAgaWYgKCFoYXNPd24ob2JqLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBoYW5kbGUgZm9yIG5vcm1hbCBqc29uXHJcbiAgICAgICAgaWYgKCFrZXkuaW5jbHVkZXMoJy4nKSkge1xyXG4gICAgICAgICAgICAvLyByZWN1cnNpdmUgcHJvY2VzcyB2YWx1ZSBpZiB2YWx1ZSBpcyBhbHNvIGEgb2JqZWN0XHJcbiAgICAgICAgICAgIGlmIChpc09iamVjdChvYmpba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUZsYXRKc29uKG9ialtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBoYW5kbGUgZm9yIGZsYXQganNvbiwgdHJhbnNmb3JtIHRvIG5vcm1hbCBqc29uXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGdvIHRvIHRoZSBsYXN0IG9iamVjdFxyXG4gICAgICAgICAgICBjb25zdCBzdWJLZXlzID0ga2V5LnNwbGl0KCcuJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHN1YktleXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRPYmogPSBvYmo7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGFzdEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghKHN1YktleXNbaV0gaW4gY3VycmVudE9iaikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50T2JqW3N1YktleXNbaV1dID0ge307XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50T2JqID0gY3VycmVudE9ialtzdWJLZXlzW2ldXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB1cGRhdGUgbGFzdCBvYmplY3QgdmFsdWUsIGRlbGV0ZSBvbGQgcHJvcGVydHlcclxuICAgICAgICAgICAgY3VycmVudE9ialtzdWJLZXlzW2xhc3RJbmRleF1dID0gb2JqW2tleV07XHJcbiAgICAgICAgICAgIGRlbGV0ZSBvYmpba2V5XTtcclxuICAgICAgICAgICAgLy8gcmVjdXJzaXZlIHByb2Nlc3MgdmFsdWUgaWYgdmFsdWUgaXMgYWxzbyBhIG9iamVjdFxyXG4gICAgICAgICAgICBpZiAoaXNPYmplY3QoY3VycmVudE9ialtzdWJLZXlzW2xhc3RJbmRleF1dKSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRmxhdEpzb24oY3VycmVudE9ialtzdWJLZXlzW2xhc3RJbmRleF1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbn1cclxuZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZXMobG9jYWxlLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IG1lc3NhZ2VzLCBfX2kxOG4sIG1lc3NhZ2VSZXNvbHZlciwgZmxhdEpzb24gfSA9IG9wdGlvbnM7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IHJldCA9IGlzUGxhaW5PYmplY3QobWVzc2FnZXMpXHJcbiAgICAgICAgPyBtZXNzYWdlc1xyXG4gICAgICAgIDogaXNBcnJheShfX2kxOG4pXHJcbiAgICAgICAgICAgID8ge31cclxuICAgICAgICAgICAgOiB7IFtsb2NhbGVdOiB7fSB9O1xyXG4gICAgLy8gbWVyZ2UgbG9jYWxlIG1lc3NhZ2VzIG9mIGkxOG4gY3VzdG9tIGJsb2NrXHJcbiAgICBpZiAoaXNBcnJheShfX2kxOG4pKSB7XHJcbiAgICAgICAgX19pMThuLmZvckVhY2goY3VzdG9tID0+IHtcclxuICAgICAgICAgICAgaWYgKCdsb2NhbGUnIGluIGN1c3RvbSAmJiAncmVzb3VyY2UnIGluIGN1c3RvbSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBsb2NhbGUsIHJlc291cmNlIH0gPSBjdXN0b207XHJcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0W2xvY2FsZV0gPSByZXRbbG9jYWxlXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICBkZWVwQ29weShyZXNvdXJjZSwgcmV0W2xvY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVlcENvcHkocmVzb3VyY2UsIHJldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpc1N0cmluZyhjdXN0b20pICYmIGRlZXBDb3B5KEpTT04ucGFyc2UoY3VzdG9tKSwgcmV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gaGFuZGxlIG1lc3NhZ2VzIGZvciBmbGF0IGpzb25cclxuICAgIGlmIChtZXNzYWdlUmVzb2x2ZXIgPT0gbnVsbCAmJiBmbGF0SnNvbikge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHJldCkge1xyXG4gICAgICAgICAgICBpZiAoaGFzT3duKHJldCwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRmxhdEpzb24ocmV0W2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5jb25zdCBpc05vdE9iamVjdE9ySXNBcnJheSA9ICh2YWwpID0+ICFpc09iamVjdCh2YWwpIHx8IGlzQXJyYXkodmFsKTtcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuZnVuY3Rpb24gZGVlcENvcHkoc3JjLCBkZXMpIHtcclxuICAgIC8vIHNyYyBhbmQgZGVzIHNob3VsZCBib3RoIGJlIG9iamVjdHMsIGFuZCBub24gb2YgdGhlbiBjYW4gYmUgYSBhcnJheVxyXG4gICAgaWYgKGlzTm90T2JqZWN0T3JJc0FycmF5KHNyYykgfHwgaXNOb3RPYmplY3RPcklzQXJyYXkoZGVzKSkge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5JTlZBTElEX1ZBTFVFKTtcclxuICAgIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIHNyYykge1xyXG4gICAgICAgIGlmIChoYXNPd24oc3JjLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIGlmIChpc05vdE9iamVjdE9ySXNBcnJheShzcmNba2V5XSkgfHwgaXNOb3RPYmplY3RPcklzQXJyYXkoZGVzW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXBsYWNlIHdpdGggc3JjW2tleV0gd2hlbjpcclxuICAgICAgICAgICAgICAgIC8vIHNyY1trZXldIG9yIGRlc1trZXldIGlzIG5vdCBhIG9iamVjdCwgb3JcclxuICAgICAgICAgICAgICAgIC8vIHNyY1trZXldIG9yIGRlc1trZXldIGlzIGEgYXJyYXlcclxuICAgICAgICAgICAgICAgIGRlc1trZXldID0gc3JjW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzcmNba2V5XSBhbmQgZGVzW2tleV0gYXJlIGJvdGggb2JqZWN0LCBtZXJnZSB0aGVtXHJcbiAgICAgICAgICAgICAgICBkZWVwQ29weShzcmNba2V5XSwgZGVzW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmZ1bmN0aW9uIGdldENvbXBvbmVudE9wdGlvbnMoaW5zdGFuY2UpIHtcclxuICAgIHJldHVybiBpbnN0YW5jZS50eXBlIDtcclxufVxyXG5mdW5jdGlvbiBhZGp1c3RJMThuUmVzb3VyY2VzKGdsb2JhbCwgb3B0aW9ucywgY29tcG9uZW50T3B0aW9ucyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuKSB7XHJcbiAgICBsZXQgbWVzc2FnZXMgPSBpc09iamVjdChvcHRpb25zLm1lc3NhZ2VzKSA/IG9wdGlvbnMubWVzc2FnZXMgOiB7fTtcclxuICAgIGlmICgnX19pMThuR2xvYmFsJyBpbiBjb21wb25lbnRPcHRpb25zKSB7XHJcbiAgICAgICAgbWVzc2FnZXMgPSBnZXRMb2NhbGVNZXNzYWdlcyhnbG9iYWwubG9jYWxlLnZhbHVlLCB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VzLFxyXG4gICAgICAgICAgICBfX2kxOG46IGNvbXBvbmVudE9wdGlvbnMuX19pMThuR2xvYmFsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBtZXJnZSBsb2NhbGUgbWVzc2FnZXNcclxuICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhtZXNzYWdlcyk7XHJcbiAgICBpZiAobG9jYWxlcy5sZW5ndGgpIHtcclxuICAgICAgICBsb2NhbGVzLmZvckVhY2gobG9jYWxlID0+IHtcclxuICAgICAgICAgICAgZ2xvYmFsLm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2VzW2xvY2FsZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAge1xyXG4gICAgICAgIC8vIG1lcmdlIGRhdGV0aW1lIGZvcm1hdHNcclxuICAgICAgICBpZiAoaXNPYmplY3Qob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGV0aW1lRm9ybWF0cyk7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxlcy5mb3JFYWNoKGxvY2FsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLm1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvcHRpb25zLmRhdGV0aW1lRm9ybWF0c1tsb2NhbGVdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIG1lcmdlIG51bWJlciBmb3JtYXRzXHJcbiAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMubnVtYmVyRm9ybWF0cykpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9jYWxlcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMubnVtYmVyRm9ybWF0cyk7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxlcy5mb3JFYWNoKGxvY2FsZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLm1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5udW1iZXJGb3JtYXRzW2xvY2FsZV0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUoa2V5KSB7XHJcbiAgICByZXR1cm4gY3JlYXRlVk5vZGUoVGV4dCwgbnVsbCwga2V5LCAwKVxyXG4gICAgICAgIDtcclxufVxyXG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xyXG4vLyBleHRlbmQgVk5vZGUgaW50ZXJmYWNlXHJcbmNvbnN0IERFVlRPT0xTX01FVEEgPSAnX19JTlRMSUZZX01FVEFfXyc7XHJcbmxldCBjb21wb3NlcklEID0gMDtcclxuZnVuY3Rpb24gZGVmaW5lQ29yZU1pc3NpbmdIYW5kbGVyKG1pc3NpbmcpIHtcclxuICAgIHJldHVybiAoKGN0eCwgbG9jYWxlLCBrZXksIHR5cGUpID0+IHtcclxuICAgICAgICByZXR1cm4gbWlzc2luZyhsb2NhbGUsIGtleSwgZ2V0Q3VycmVudEluc3RhbmNlKCkgfHwgdW5kZWZpbmVkLCB0eXBlKTtcclxuICAgIH0pO1xyXG59XHJcbi8vIGZvciBJbnRsaWZ5IERldlRvb2xzXHJcbmNvbnN0IGdldE1ldGFJbmZvID0gICgpID0+IHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XHJcbiAgICBsZXQgbWV0YSA9IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgcmV0dXJuIGluc3RhbmNlICYmIChtZXRhID0gZ2V0Q29tcG9uZW50T3B0aW9ucyhpbnN0YW5jZSlbREVWVE9PTFNfTUVUQV0pXHJcbiAgICAgICAgPyB7IFtERVZUT09MU19NRVRBXTogbWV0YSB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIDogbnVsbDtcclxufTtcclxuLyoqXHJcbiAqIENyZWF0ZSBjb21wb3NlciBpbnRlcmZhY2UgZmFjdG9yeVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvc2VyKG9wdGlvbnMgPSB7fSwgVnVlSTE4bkxlZ2FjeSkge1xyXG4gICAgY29uc3QgeyBfX3Jvb3QgfSA9IG9wdGlvbnM7XHJcbiAgICBjb25zdCBfaXNHbG9iYWwgPSBfX3Jvb3QgPT09IHVuZGVmaW5lZDtcclxuICAgIGxldCBfaW5oZXJpdExvY2FsZSA9IGlzQm9vbGVhbihvcHRpb25zLmluaGVyaXRMb2NhbGUpXHJcbiAgICAgICAgPyBvcHRpb25zLmluaGVyaXRMb2NhbGVcclxuICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBfbG9jYWxlID0gcmVmKFxyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBfX3Jvb3QgJiYgX2luaGVyaXRMb2NhbGVcclxuICAgICAgICA/IF9fcm9vdC5sb2NhbGUudmFsdWVcclxuICAgICAgICA6IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMubG9jYWxlXHJcbiAgICAgICAgICAgIDogREVGQVVMVF9MT0NBTEUpO1xyXG4gICAgY29uc3QgX2ZhbGxiYWNrTG9jYWxlID0gcmVmKFxyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBfX3Jvb3QgJiYgX2luaGVyaXRMb2NhbGVcclxuICAgICAgICA/IF9fcm9vdC5mYWxsYmFja0xvY2FsZS52YWx1ZVxyXG4gICAgICAgIDogaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICAgICAgaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxyXG4gICAgICAgICAgICBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxyXG4gICAgICAgICAgICA6IF9sb2NhbGUudmFsdWUpO1xyXG4gICAgY29uc3QgX21lc3NhZ2VzID0gcmVmKGdldExvY2FsZU1lc3NhZ2VzKF9sb2NhbGUudmFsdWUsIG9wdGlvbnMpKTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX2RhdGV0aW1lRm9ybWF0cyA9IHJlZihpc1BsYWluT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzXHJcbiAgICAgICAgICAgIDogeyBbX2xvY2FsZS52YWx1ZV06IHt9IH0pXHJcbiAgICAgICAgO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBfbnVtYmVyRm9ybWF0cyA9IHJlZihpc1BsYWluT2JqZWN0KG9wdGlvbnMubnVtYmVyRm9ybWF0cylcclxuICAgICAgICAgICAgPyBvcHRpb25zLm51bWJlckZvcm1hdHNcclxuICAgICAgICAgICAgOiB7IFtfbG9jYWxlLnZhbHVlXToge30gfSlcclxuICAgICAgICA7XHJcbiAgICAvLyB3YXJuaW5nIHN1cHByZXNzIG9wdGlvbnNcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgbGV0IF9taXNzaW5nV2FybiA9IF9fcm9vdFxyXG4gICAgICAgID8gX19yb290Lm1pc3NpbmdXYXJuXHJcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5taXNzaW5nV2FybilcclxuICAgICAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgbGV0IF9mYWxsYmFja1dhcm4gPSBfX3Jvb3RcclxuICAgICAgICA/IF9fcm9vdC5mYWxsYmFja1dhcm5cclxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5mYWxsYmFja1dhcm4pXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cclxuICAgICAgICAgICAgOiB0cnVlO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBsZXQgX2ZhbGxiYWNrUm9vdCA9IF9fcm9vdFxyXG4gICAgICAgID8gX19yb290LmZhbGxiYWNrUm9vdFxyXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tSb290KVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tSb290XHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIC8vIGNvbmZpZ3VyZSBmYWxsIGJhY2sgdG8gcm9vdFxyXG4gICAgbGV0IF9mYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mYWxsYmFja0Zvcm1hdDtcclxuICAgIC8vIHJ1bnRpbWUgbWlzc2luZ1xyXG4gICAgbGV0IF9taXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogbnVsbDtcclxuICAgIGxldCBfcnVudGltZU1pc3NpbmcgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWlzc2luZylcclxuICAgICAgICA/IGRlZmluZUNvcmVNaXNzaW5nSGFuZGxlcihvcHRpb25zLm1pc3NpbmcpXHJcbiAgICAgICAgOiBudWxsO1xyXG4gICAgLy8gcG9zdFRyYW5zbGF0aW9uIGhhbmRsZXJcclxuICAgIGxldCBfcG9zdFRyYW5zbGF0aW9uID0gaXNGdW5jdGlvbihvcHRpb25zLnBvc3RUcmFuc2xhdGlvbilcclxuICAgICAgICA/IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uXHJcbiAgICAgICAgOiBudWxsO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBsZXQgX3dhcm5IdG1sTWVzc2FnZSA9IF9fcm9vdFxyXG4gICAgICAgID8gX19yb290Lndhcm5IdG1sTWVzc2FnZVxyXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlXHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIGxldCBfZXNjYXBlUGFyYW1ldGVyID0gISFvcHRpb25zLmVzY2FwZVBhcmFtZXRlcjtcclxuICAgIC8vIGN1c3RvbSBsaW5rZWQgbW9kaWZpZXJzXHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9tb2RpZmllcnMgPSBfX3Jvb3RcclxuICAgICAgICA/IF9fcm9vdC5tb2RpZmllcnNcclxuICAgICAgICA6IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5tb2RpZmllcnMpXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5tb2RpZmllcnNcclxuICAgICAgICAgICAgOiB7fTtcclxuICAgIC8vIHBsdXJhbFJ1bGVzXHJcbiAgICBsZXQgX3BsdXJhbFJ1bGVzID0gb3B0aW9ucy5wbHVyYWxSdWxlcyB8fCAoX19yb290ICYmIF9fcm9vdC5wbHVyYWxSdWxlcyk7XHJcbiAgICAvLyBydW50aW1lIGNvbnRleHRcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcclxuICAgIGxldCBfY29udGV4dDtcclxuICAgIGNvbnN0IGdldENvcmVDb250ZXh0ID0gKCkgPT4ge1xyXG4gICAgICAgIF9pc0dsb2JhbCAmJiBzZXRGYWxsYmFja0NvbnRleHQobnVsbCk7XHJcbiAgICAgICAgY29uc3QgY3R4T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgdmVyc2lvbjogVkVSU0lPTixcclxuICAgICAgICAgICAgbG9jYWxlOiBfbG9jYWxlLnZhbHVlLFxyXG4gICAgICAgICAgICBmYWxsYmFja0xvY2FsZTogX2ZhbGxiYWNrTG9jYWxlLnZhbHVlLFxyXG4gICAgICAgICAgICBtZXNzYWdlczogX21lc3NhZ2VzLnZhbHVlLFxyXG4gICAgICAgICAgICBtb2RpZmllcnM6IF9tb2RpZmllcnMsXHJcbiAgICAgICAgICAgIHBsdXJhbFJ1bGVzOiBfcGx1cmFsUnVsZXMsXHJcbiAgICAgICAgICAgIG1pc3Npbmc6IF9ydW50aW1lTWlzc2luZyA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IF9ydW50aW1lTWlzc2luZyxcclxuICAgICAgICAgICAgbWlzc2luZ1dhcm46IF9taXNzaW5nV2FybixcclxuICAgICAgICAgICAgZmFsbGJhY2tXYXJuOiBfZmFsbGJhY2tXYXJuLFxyXG4gICAgICAgICAgICBmYWxsYmFja0Zvcm1hdDogX2ZhbGxiYWNrRm9ybWF0LFxyXG4gICAgICAgICAgICB1bnJlc29sdmluZzogdHJ1ZSxcclxuICAgICAgICAgICAgcG9zdFRyYW5zbGF0aW9uOiBfcG9zdFRyYW5zbGF0aW9uID09PSBudWxsID8gdW5kZWZpbmVkIDogX3Bvc3RUcmFuc2xhdGlvbixcclxuICAgICAgICAgICAgd2Fybkh0bWxNZXNzYWdlOiBfd2Fybkh0bWxNZXNzYWdlLFxyXG4gICAgICAgICAgICBlc2NhcGVQYXJhbWV0ZXI6IF9lc2NhcGVQYXJhbWV0ZXIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VSZXNvbHZlcjogb3B0aW9ucy5tZXNzYWdlUmVzb2x2ZXIsXHJcbiAgICAgICAgICAgIF9fbWV0YTogeyBmcmFtZXdvcms6ICd2dWUnIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3R4T3B0aW9ucy5kYXRldGltZUZvcm1hdHMgPSBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xyXG4gICAgICAgICAgICBjdHhPcHRpb25zLm51bWJlckZvcm1hdHMgPSBfbnVtYmVyRm9ybWF0cy52YWx1ZTtcclxuICAgICAgICAgICAgY3R4T3B0aW9ucy5fX2RhdGV0aW1lRm9ybWF0dGVycyA9IGlzUGxhaW5PYmplY3QoX2NvbnRleHQpXHJcbiAgICAgICAgICAgICAgICA/IF9jb250ZXh0Ll9fZGF0ZXRpbWVGb3JtYXR0ZXJzXHJcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgY3R4T3B0aW9ucy5fX251bWJlckZvcm1hdHRlcnMgPSBpc1BsYWluT2JqZWN0KF9jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgPyBfY29udGV4dC5fX251bWJlckZvcm1hdHRlcnNcclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgIGN0eE9wdGlvbnMuX192X2VtaXR0ZXIgPSBpc1BsYWluT2JqZWN0KF9jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgPyBfY29udGV4dC5fX3ZfZW1pdHRlclxyXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGN0eCA9IGNyZWF0ZUNvcmVDb250ZXh0KGN0eE9wdGlvbnMpO1xyXG4gICAgICAgIF9pc0dsb2JhbCAmJiBzZXRGYWxsYmFja0NvbnRleHQoY3R4KTtcclxuICAgICAgICByZXR1cm4gY3R4O1xyXG4gICAgfTtcclxuICAgIF9jb250ZXh0ID0gZ2V0Q29yZUNvbnRleHQoKTtcclxuICAgIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKF9jb250ZXh0LCBfbG9jYWxlLnZhbHVlLCBfZmFsbGJhY2tMb2NhbGUudmFsdWUpO1xyXG4gICAgLy8gdHJhY2sgcmVhY3Rpdml0eVxyXG4gICAgZnVuY3Rpb24gdHJhY2tSZWFjdGl2aXR5VmFsdWVzKCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgX21lc3NhZ2VzLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSxcclxuICAgICAgICAgICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgO1xyXG4gICAgfVxyXG4gICAgLy8gbG9jYWxlXHJcbiAgICBjb25zdCBsb2NhbGUgPSBjb21wdXRlZCh7XHJcbiAgICAgICAgZ2V0OiAoKSA9PiBfbG9jYWxlLnZhbHVlLFxyXG4gICAgICAgIHNldDogdmFsID0+IHtcclxuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgX2NvbnRleHQubG9jYWxlID0gX2xvY2FsZS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGZhbGxiYWNrTG9jYWxlXHJcbiAgICBjb25zdCBmYWxsYmFja0xvY2FsZSA9IGNvbXB1dGVkKHtcclxuICAgICAgICBnZXQ6ICgpID0+IF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcclxuICAgICAgICBzZXQ6IHZhbCA9PiB7XHJcbiAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tMb2NhbGUgPSBfZmFsbGJhY2tMb2NhbGUudmFsdWU7XHJcbiAgICAgICAgICAgIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKF9jb250ZXh0LCBfbG9jYWxlLnZhbHVlLCB2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gbWVzc2FnZXNcclxuICAgIGNvbnN0IG1lc3NhZ2VzID0gY29tcHV0ZWQoKCkgPT4gX21lc3NhZ2VzLnZhbHVlKTtcclxuICAgIC8vIGRhdGV0aW1lRm9ybWF0c1xyXG4gICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzID0gLyogI19fUFVSRV9fKi8gY29tcHV0ZWQoKCkgPT4gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSk7XHJcbiAgICAvLyBudW1iZXJGb3JtYXRzXHJcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gLyogI19fUFVSRV9fKi8gY29tcHV0ZWQoKCkgPT4gX251bWJlckZvcm1hdHMudmFsdWUpO1xyXG4gICAgLy8gZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlclxyXG4gICAgZnVuY3Rpb24gZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcigpIHtcclxuICAgICAgICByZXR1cm4gaXNGdW5jdGlvbihfcG9zdFRyYW5zbGF0aW9uKSA/IF9wb3N0VHJhbnNsYXRpb24gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgLy8gc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlclxyXG4gICAgZnVuY3Rpb24gc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcihoYW5kbGVyKSB7XHJcbiAgICAgICAgX3Bvc3RUcmFuc2xhdGlvbiA9IGhhbmRsZXI7XHJcbiAgICAgICAgX2NvbnRleHQucG9zdFRyYW5zbGF0aW9uID0gaGFuZGxlcjtcclxuICAgIH1cclxuICAgIC8vIGdldE1pc3NpbmdIYW5kbGVyXHJcbiAgICBmdW5jdGlvbiBnZXRNaXNzaW5nSGFuZGxlcigpIHtcclxuICAgICAgICByZXR1cm4gX21pc3Npbmc7XHJcbiAgICB9XHJcbiAgICAvLyBzZXRNaXNzaW5nSGFuZGxlclxyXG4gICAgZnVuY3Rpb24gc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcikge1xyXG4gICAgICAgIGlmIChoYW5kbGVyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIF9ydW50aW1lTWlzc2luZyA9IGRlZmluZUNvcmVNaXNzaW5nSGFuZGxlcihoYW5kbGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX21pc3NpbmcgPSBoYW5kbGVyO1xyXG4gICAgICAgIF9jb250ZXh0Lm1pc3NpbmcgPSBfcnVudGltZU1pc3Npbmc7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc1Jlc29sdmVkVHJhbnNsYXRlTWVzc2FnZSh0eXBlLCBhcmcgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICApIHtcclxuICAgICAgICByZXR1cm4gdHlwZSAhPT0gJ3RyYW5zbGF0ZScgfHwgIWFyZy5yZXNvbHZlZE1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCB3cmFwV2l0aERlcHMgPSAoZm4sIGFyZ3VtZW50UGFyc2VyLCB3YXJuVHlwZSwgZmFsbGJhY2tTdWNjZXNzLCBmYWxsYmFja0ZhaWwsIHN1Y2Nlc3NDb25kaXRpb24pID0+IHtcclxuICAgICAgICB0cmFja1JlYWN0aXZpdHlWYWx1ZXMoKTsgLy8gdHJhY2sgcmVhY3RpdmUgZGVwZW5kZW5jeVxyXG4gICAgICAgIC8vIE5PVEU6IGV4cGVyaW1lbnRhbCAhIVxyXG4gICAgICAgIGxldCByZXQ7XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzZXRBZGRpdGlvbmFsTWV0YShnZXRNZXRhSW5mbygpKTtcclxuICAgICAgICAgICAgICAgIGlmICghX2lzR2xvYmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tDb250ZXh0ID0gX19yb290XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZ2V0RmFsbGJhY2tDb250ZXh0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXQgPSBmbihfY29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICBzZXRBZGRpdGlvbmFsTWV0YShudWxsKTtcclxuICAgICAgICAgICAgICAgIGlmICghX2lzR2xvYmFsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tDb250ZXh0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXQgPSBmbihfY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc051bWJlcihyZXQpICYmIHJldCA9PT0gTk9UX1JFT1NMVkVEKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFtrZXksIGFyZzJdID0gYXJndW1lbnRQYXJzZXIoKTtcclxuICAgICAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxyXG4gICAgICAgICAgICAgICAgX19yb290ICYmXHJcbiAgICAgICAgICAgICAgICBpc1N0cmluZyhrZXkpICYmXHJcbiAgICAgICAgICAgICAgICBpc1Jlc29sdmVkVHJhbnNsYXRlTWVzc2FnZSh3YXJuVHlwZSwgYXJnMikpIHtcclxuICAgICAgICAgICAgICAgIGlmIChfZmFsbGJhY2tSb290ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKF9mYWxsYmFja1dhcm4sIGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUcmFuc2xhdGVNaXNzaW5nV2FybihfbWlzc2luZ1dhcm4sIGtleSkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLkZBTExCQUNLX1RPX1JPT1QsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB3YXJuVHlwZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcclxuICAgICAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IF9fdl9lbWl0dGVyOiBlbWl0dGVyIH0gPSBfY29udGV4dDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW1pdHRlciAmJiBfZmFsbGJhY2tSb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImZhbGxiYWNrXCIgLyogRkFMQkFDSyAqLywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogd2FyblR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogJ2dsb2JhbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt3YXJuVHlwZX06JHtrZXl9YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIF9fcm9vdCAmJiBfZmFsbGJhY2tSb290XHJcbiAgICAgICAgICAgICAgICA/IGZhbGxiYWNrU3VjY2VzcyhfX3Jvb3QpXHJcbiAgICAgICAgICAgICAgICA6IGZhbGxiYWNrRmFpbChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzdWNjZXNzQ29uZGl0aW9uKHJldCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX1JFVFVSTl9UWVBFKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy8gdFxyXG4gICAgZnVuY3Rpb24gdCguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkodHJhbnNsYXRlLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyksICd0cmFuc2xhdGUnLCByb290ID0+IFJlZmxlY3QuYXBwbHkocm9vdC50LCByb290LCBbLi4uYXJnc10pLCBrZXkgPT4ga2V5LCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XHJcbiAgICB9XHJcbiAgICAvLyBydFxyXG4gICAgZnVuY3Rpb24gcnQoLi4uYXJncykge1xyXG4gICAgICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczXSA9IGFyZ3M7XHJcbiAgICAgICAgaWYgKGFyZzMgJiYgIWlzT2JqZWN0KGFyZzMpKSB7XHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQoLi4uW2FyZzEsIGFyZzIsIGFzc2lnbih7IHJlc29sdmVkTWVzc2FnZTogdHJ1ZSB9LCBhcmczIHx8IHt9KV0pO1xyXG4gICAgfVxyXG4gICAgLy8gZFxyXG4gICAgZnVuY3Rpb24gZCguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkoZGF0ZXRpbWUsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlRGF0ZVRpbWVBcmdzKC4uLmFyZ3MpLCAnZGF0ZXRpbWUgZm9ybWF0Jywgcm9vdCA9PiBSZWZsZWN0LmFwcGx5KHJvb3QuZCwgcm9vdCwgWy4uLmFyZ3NdKSwgKCkgPT4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFLCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XHJcbiAgICB9XHJcbiAgICAvLyBuXHJcbiAgICBmdW5jdGlvbiBuKC4uLmFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gd3JhcFdpdGhEZXBzKGNvbnRleHQgPT4gUmVmbGVjdC5hcHBseShudW1iZXIsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlTnVtYmVyQXJncyguLi5hcmdzKSwgJ251bWJlciBmb3JtYXQnLCByb290ID0+IFJlZmxlY3QuYXBwbHkocm9vdC5uLCByb290LCBbLi4uYXJnc10pLCAoKSA9PiBNSVNTSU5HX1JFU09MVkVfVkFMVUUsIHZhbCA9PiBpc1N0cmluZyh2YWwpKTtcclxuICAgIH1cclxuICAgIC8vIGZvciBjdXN0b20gcHJvY2Vzc29yXHJcbiAgICBmdW5jdGlvbiBub3JtYWxpemUodmFsdWVzKSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAodmFsID0+IGlzU3RyaW5nKHZhbCkgfHwgaXNOdW1iZXIodmFsKSB8fCBpc0Jvb2xlYW4odmFsKVxyXG4gICAgICAgICAgICA/IGNyZWF0ZVRleHROb2RlKFN0cmluZyh2YWwpKVxyXG4gICAgICAgICAgICA6IHZhbCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpbnRlcnBvbGF0ZSA9ICh2YWwpID0+IHZhbDtcclxuICAgIGNvbnN0IHByb2Nlc3NvciA9IHtcclxuICAgICAgICBub3JtYWxpemUsXHJcbiAgICAgICAgaW50ZXJwb2xhdGUsXHJcbiAgICAgICAgdHlwZTogJ3Zub2RlJ1xyXG4gICAgfTtcclxuICAgIC8vIHRyYW5zcmF0ZVZOb2RlLCB1c2luZyBmb3IgYGkxOG4tdGAgY29tcG9uZW50XHJcbiAgICBmdW5jdGlvbiB0cmFuc3JhdGVWTm9kZSguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IHtcclxuICAgICAgICAgICAgbGV0IHJldDtcclxuICAgICAgICAgICAgY29uc3QgX2NvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgX2NvbnRleHQucHJvY2Vzc29yID0gcHJvY2Vzc29yO1xyXG4gICAgICAgICAgICAgICAgcmV0ID0gUmVmbGVjdC5hcHBseSh0cmFuc2xhdGUsIG51bGwsIFtfY29udGV4dCwgLi4uYXJnc10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgX2NvbnRleHQucHJvY2Vzc29yID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH0sICgpID0+IHBhcnNlVHJhbnNsYXRlQXJncyguLi5hcmdzKSwgJ3RyYW5zbGF0ZScsIFxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgcm9vdCA9PiByb290W1RyYW5zcmF0ZVZOb2RlU3ltYm9sXSguLi5hcmdzKSwga2V5ID0+IFtjcmVhdGVUZXh0Tm9kZShrZXkpXSwgdmFsID0+IGlzQXJyYXkodmFsKSk7XHJcbiAgICB9XHJcbiAgICAvLyBudW1iZXJQYXJ0cywgdXNpbmcgZm9yIGBpMThuLW5gIGNvbXBvbmVudFxyXG4gICAgZnVuY3Rpb24gbnVtYmVyUGFydHMoLi4uYXJncykge1xyXG4gICAgICAgIHJldHVybiB3cmFwV2l0aERlcHMoY29udGV4dCA9PiBSZWZsZWN0LmFwcGx5KG51bWJlciwgbnVsbCwgW2NvbnRleHQsIC4uLmFyZ3NdKSwgKCkgPT4gcGFyc2VOdW1iZXJBcmdzKC4uLmFyZ3MpLCAnbnVtYmVyIGZvcm1hdCcsIFxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgcm9vdCA9PiByb290W051bWJlclBhcnRzU3ltYm9sXSguLi5hcmdzKSwgKCkgPT4gW10sIHZhbCA9PiBpc1N0cmluZyh2YWwpIHx8IGlzQXJyYXkodmFsKSk7XHJcbiAgICB9XHJcbiAgICAvLyBkYXRldGltZVBhcnRzLCB1c2luZyBmb3IgYGkxOG4tZGAgY29tcG9uZW50XHJcbiAgICBmdW5jdGlvbiBkYXRldGltZVBhcnRzKC4uLmFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gd3JhcFdpdGhEZXBzKGNvbnRleHQgPT4gUmVmbGVjdC5hcHBseShkYXRldGltZSwgbnVsbCwgW2NvbnRleHQsIC4uLmFyZ3NdKSwgKCkgPT4gcGFyc2VEYXRlVGltZUFyZ3MoLi4uYXJncyksICdkYXRldGltZSBmb3JtYXQnLCBcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHJvb3QgPT4gcm9vdFtEYXRldGltZVBhcnRzU3ltYm9sXSguLi5hcmdzKSwgKCkgPT4gW10sIHZhbCA9PiBpc1N0cmluZyh2YWwpIHx8IGlzQXJyYXkodmFsKSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRQbHVyYWxSdWxlcyhydWxlcykge1xyXG4gICAgICAgIF9wbHVyYWxSdWxlcyA9IHJ1bGVzO1xyXG4gICAgICAgIF9jb250ZXh0LnBsdXJhbFJ1bGVzID0gX3BsdXJhbFJ1bGVzO1xyXG4gICAgfVxyXG4gICAgLy8gdGVcclxuICAgIGZ1bmN0aW9uIHRlKGtleSwgbG9jYWxlKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0TG9jYWxlID0gaXNTdHJpbmcobG9jYWxlKSA/IGxvY2FsZSA6IF9sb2NhbGUudmFsdWU7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGdldExvY2FsZU1lc3NhZ2UodGFyZ2V0TG9jYWxlKTtcclxuICAgICAgICByZXR1cm4gX2NvbnRleHQubWVzc2FnZVJlc29sdmVyKG1lc3NhZ2UsIGtleSkgIT09IG51bGw7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXNvbHZlTWVzc2FnZXMoa2V5KSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gbnVsbDtcclxuICAgICAgICBjb25zdCBsb2NhbGVzID0gZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4oX2NvbnRleHQsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSwgX2xvY2FsZS52YWx1ZSk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb2NhbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldExvY2FsZU1lc3NhZ2VzID0gX21lc3NhZ2VzLnZhbHVlW2xvY2FsZXNbaV1dIHx8IHt9O1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlVmFsdWUgPSBfY29udGV4dC5tZXNzYWdlUmVzb2x2ZXIodGFyZ2V0TG9jYWxlTWVzc2FnZXMsIGtleSk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlVmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWVzc2FnZXM7XHJcbiAgICB9XHJcbiAgICAvLyB0bVxyXG4gICAgZnVuY3Rpb24gdG0oa2V5KSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXMgPSByZXNvbHZlTWVzc2FnZXMoa2V5KTtcclxuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgICAgICByZXR1cm4gbWVzc2FnZXMgIT0gbnVsbFxyXG4gICAgICAgICAgICA/IG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIDogX19yb290XHJcbiAgICAgICAgICAgICAgICA/IF9fcm9vdC50bShrZXkpIHx8IHt9XHJcbiAgICAgICAgICAgICAgICA6IHt9O1xyXG4gICAgfVxyXG4gICAgLy8gZ2V0TG9jYWxlTWVzc2FnZVxyXG4gICAgZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZShsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gKF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdIHx8IHt9KTtcclxuICAgIH1cclxuICAgIC8vIHNldExvY2FsZU1lc3NhZ2VcclxuICAgIGZ1bmN0aW9uIHNldExvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gPSBtZXNzYWdlO1xyXG4gICAgICAgIF9jb250ZXh0Lm1lc3NhZ2VzID0gX21lc3NhZ2VzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gbWVyZ2VMb2NhbGVNZXNzYWdlXHJcbiAgICBmdW5jdGlvbiBtZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gPSBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSB8fCB7fTtcclxuICAgICAgICBkZWVwQ29weShtZXNzYWdlLCBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSk7XHJcbiAgICAgICAgX2NvbnRleHQubWVzc2FnZXMgPSBfbWVzc2FnZXMudmFsdWU7XHJcbiAgICB9XHJcbiAgICAvLyBnZXREYXRlVGltZUZvcm1hdFxyXG4gICAgZnVuY3Rpb24gZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSB8fCB7fTtcclxuICAgIH1cclxuICAgIC8vIHNldERhdGVUaW1lRm9ybWF0XHJcbiAgICBmdW5jdGlvbiBzZXREYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSA9IGZvcm1hdDtcclxuICAgICAgICBfY29udGV4dC5kYXRldGltZUZvcm1hdHMgPSBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xyXG4gICAgICAgIGNsZWFyRGF0ZVRpbWVGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcclxuICAgIH1cclxuICAgIC8vIG1lcmdlRGF0ZVRpbWVGb3JtYXRcclxuICAgIGZ1bmN0aW9uIG1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBhc3NpZ24oX2RhdGV0aW1lRm9ybWF0cy52YWx1ZVtsb2NhbGVdIHx8IHt9LCBmb3JtYXQpO1xyXG4gICAgICAgIF9jb250ZXh0LmRhdGV0aW1lRm9ybWF0cyA9IF9kYXRldGltZUZvcm1hdHMudmFsdWU7XHJcbiAgICAgICAgY2xlYXJEYXRlVGltZUZvcm1hdChfY29udGV4dCwgbG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgfVxyXG4gICAgLy8gZ2V0TnVtYmVyRm9ybWF0XHJcbiAgICBmdW5jdGlvbiBnZXROdW1iZXJGb3JtYXQobG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge307XHJcbiAgICB9XHJcbiAgICAvLyBzZXROdW1iZXJGb3JtYXRcclxuICAgIGZ1bmN0aW9uIHNldE51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XHJcbiAgICAgICAgX2NvbnRleHQubnVtYmVyRm9ybWF0cyA9IF9udW1iZXJGb3JtYXRzLnZhbHVlO1xyXG4gICAgICAgIGNsZWFyTnVtYmVyRm9ybWF0KF9jb250ZXh0LCBsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICB9XHJcbiAgICAvLyBtZXJnZU51bWJlckZvcm1hdFxyXG4gICAgZnVuY3Rpb24gbWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gYXNzaWduKF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge30sIGZvcm1hdCk7XHJcbiAgICAgICAgX2NvbnRleHQubnVtYmVyRm9ybWF0cyA9IF9udW1iZXJGb3JtYXRzLnZhbHVlO1xyXG4gICAgICAgIGNsZWFyTnVtYmVyRm9ybWF0KF9jb250ZXh0LCBsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICB9XHJcbiAgICAvLyBmb3IgZGVidWdcclxuICAgIGNvbXBvc2VySUQrKztcclxuICAgIC8vIHdhdGNoIHJvb3QgbG9jYWxlICYgZmFsbGJhY2tMb2NhbGVcclxuICAgIGlmIChfX3Jvb3QgJiYgaW5Ccm93c2VyKSB7XHJcbiAgICAgICAgd2F0Y2goX19yb290LmxvY2FsZSwgKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoX2luaGVyaXRMb2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICBfY29udGV4dC5sb2NhbGUgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdhdGNoKF9fcm9vdC5mYWxsYmFja0xvY2FsZSwgKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoX2luaGVyaXRMb2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrTG9jYWxlID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlRmFsbGJhY2tMb2NhbGUoX2NvbnRleHQsIF9sb2NhbGUudmFsdWUsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGRlZmluZSBiYXNpYyBjb21wb3NpdGlvbiBBUEkhXHJcbiAgICBjb25zdCBjb21wb3NlciA9IHtcclxuICAgICAgICBpZDogY29tcG9zZXJJRCxcclxuICAgICAgICBsb2NhbGUsXHJcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXHJcbiAgICAgICAgZ2V0IGluaGVyaXRMb2NhbGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfaW5oZXJpdExvY2FsZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCBpbmhlcml0TG9jYWxlKHZhbCkge1xyXG4gICAgICAgICAgICBfaW5oZXJpdExvY2FsZSA9IHZhbDtcclxuICAgICAgICAgICAgaWYgKHZhbCAmJiBfX3Jvb3QpIHtcclxuICAgICAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSBfX3Jvb3QubG9jYWxlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gX19yb290LmZhbGxiYWNrTG9jYWxlLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlRmFsbGJhY2tMb2NhbGUoX2NvbnRleHQsIF9sb2NhbGUudmFsdWUsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBhdmFpbGFibGVMb2NhbGVzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoX21lc3NhZ2VzLnZhbHVlKS5zb3J0KCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtZXNzYWdlcyxcclxuICAgICAgICBnZXQgbW9kaWZpZXJzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX21vZGlmaWVycztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBwbHVyYWxSdWxlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9wbHVyYWxSdWxlcyB8fCB7fTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBpc0dsb2JhbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9pc0dsb2JhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBtaXNzaW5nV2FybigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9taXNzaW5nV2FybjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCBtaXNzaW5nV2Fybih2YWwpIHtcclxuICAgICAgICAgICAgX21pc3NpbmdXYXJuID0gdmFsO1xyXG4gICAgICAgICAgICBfY29udGV4dC5taXNzaW5nV2FybiA9IF9taXNzaW5nV2FybjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBmYWxsYmFja1dhcm4oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfZmFsbGJhY2tXYXJuO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGZhbGxiYWNrV2Fybih2YWwpIHtcclxuICAgICAgICAgICAgX2ZhbGxiYWNrV2FybiA9IHZhbDtcclxuICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tXYXJuID0gX2ZhbGxiYWNrV2FybjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBmYWxsYmFja1Jvb3QoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfZmFsbGJhY2tSb290O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGZhbGxiYWNrUm9vdCh2YWwpIHtcclxuICAgICAgICAgICAgX2ZhbGxiYWNrUm9vdCA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBmYWxsYmFja0Zvcm1hdCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9mYWxsYmFja0Zvcm1hdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCBmYWxsYmFja0Zvcm1hdCh2YWwpIHtcclxuICAgICAgICAgICAgX2ZhbGxiYWNrRm9ybWF0ID0gdmFsO1xyXG4gICAgICAgICAgICBfY29udGV4dC5mYWxsYmFja0Zvcm1hdCA9IF9mYWxsYmFja0Zvcm1hdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCB3YXJuSHRtbE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfd2Fybkh0bWxNZXNzYWdlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IHdhcm5IdG1sTWVzc2FnZSh2YWwpIHtcclxuICAgICAgICAgICAgX3dhcm5IdG1sTWVzc2FnZSA9IHZhbDtcclxuICAgICAgICAgICAgX2NvbnRleHQud2Fybkh0bWxNZXNzYWdlID0gdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IGVzY2FwZVBhcmFtZXRlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9lc2NhcGVQYXJhbWV0ZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgZXNjYXBlUGFyYW1ldGVyKHZhbCkge1xyXG4gICAgICAgICAgICBfZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xyXG4gICAgICAgICAgICBfY29udGV4dC5lc2NhcGVQYXJhbWV0ZXIgPSB2YWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0LFxyXG4gICAgICAgIGdldExvY2FsZU1lc3NhZ2UsXHJcbiAgICAgICAgc2V0TG9jYWxlTWVzc2FnZSxcclxuICAgICAgICBtZXJnZUxvY2FsZU1lc3NhZ2UsXHJcbiAgICAgICAgZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcixcclxuICAgICAgICBzZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyLFxyXG4gICAgICAgIGdldE1pc3NpbmdIYW5kbGVyLFxyXG4gICAgICAgIHNldE1pc3NpbmdIYW5kbGVyLFxyXG4gICAgICAgIFtTZXRQbHVyYWxSdWxlc1N5bWJvbF06IHNldFBsdXJhbFJ1bGVzXHJcbiAgICB9O1xyXG4gICAge1xyXG4gICAgICAgIGNvbXBvc2VyLmRhdGV0aW1lRm9ybWF0cyA9IGRhdGV0aW1lRm9ybWF0cztcclxuICAgICAgICBjb21wb3Nlci5udW1iZXJGb3JtYXRzID0gbnVtYmVyRm9ybWF0cztcclxuICAgICAgICBjb21wb3Nlci5ydCA9IHJ0O1xyXG4gICAgICAgIGNvbXBvc2VyLnRlID0gdGU7XHJcbiAgICAgICAgY29tcG9zZXIudG0gPSB0bTtcclxuICAgICAgICBjb21wb3Nlci5kID0gZDtcclxuICAgICAgICBjb21wb3Nlci5uID0gbjtcclxuICAgICAgICBjb21wb3Nlci5nZXREYXRlVGltZUZvcm1hdCA9IGdldERhdGVUaW1lRm9ybWF0O1xyXG4gICAgICAgIGNvbXBvc2VyLnNldERhdGVUaW1lRm9ybWF0ID0gc2V0RGF0ZVRpbWVGb3JtYXQ7XHJcbiAgICAgICAgY29tcG9zZXIubWVyZ2VEYXRlVGltZUZvcm1hdCA9IG1lcmdlRGF0ZVRpbWVGb3JtYXQ7XHJcbiAgICAgICAgY29tcG9zZXIuZ2V0TnVtYmVyRm9ybWF0ID0gZ2V0TnVtYmVyRm9ybWF0O1xyXG4gICAgICAgIGNvbXBvc2VyLnNldE51bWJlckZvcm1hdCA9IHNldE51bWJlckZvcm1hdDtcclxuICAgICAgICBjb21wb3Nlci5tZXJnZU51bWJlckZvcm1hdCA9IG1lcmdlTnVtYmVyRm9ybWF0O1xyXG4gICAgICAgIGNvbXBvc2VyW0luZWpjdFdpdGhPcHRpb25dID0gb3B0aW9ucy5fX2luamVjdFdpdGhPcHRpb247XHJcbiAgICAgICAgY29tcG9zZXJbVHJhbnNyYXRlVk5vZGVTeW1ib2xdID0gdHJhbnNyYXRlVk5vZGU7XHJcbiAgICAgICAgY29tcG9zZXJbRGF0ZXRpbWVQYXJ0c1N5bWJvbF0gPSBkYXRldGltZVBhcnRzO1xyXG4gICAgICAgIGNvbXBvc2VyW051bWJlclBhcnRzU3ltYm9sXSA9IG51bWJlclBhcnRzO1xyXG4gICAgfVxyXG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xyXG4gICAgICAgIGNvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdID0gKGVtaXR0ZXIpID0+IHtcclxuICAgICAgICAgICAgX2NvbnRleHQuX192X2VtaXR0ZXIgPSBlbWl0dGVyO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29tcG9zZXJbRGlzYWJsZUVtaXR0ZXJdID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBfY29udGV4dC5fX3ZfZW1pdHRlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvc2VyO1xyXG59XHJcbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXHJcbi8qKlxyXG4gKiBDb252ZXJ0IHRvIEkxOG4gQ29tcG9zZXIgT3B0aW9ucyBmcm9tIFZ1ZUkxOG4gT3B0aW9uc1xyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmZ1bmN0aW9uIGNvbnZlcnRDb21wb3Nlck9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgY29uc3QgbG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpID8gb3B0aW9ucy5sb2NhbGUgOiBERUZBVUxUX0xPQ0FMRTtcclxuICAgIGNvbnN0IGZhbGxiYWNrTG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICBpc0FycmF5KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XHJcbiAgICAgICAgaXNQbGFpbk9iamVjdChvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxyXG4gICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXHJcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrTG9jYWxlXHJcbiAgICAgICAgOiBsb2NhbGU7XHJcbiAgICBjb25zdCBtaXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3QgbWlzc2luZ1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm4pIHx8XHJcbiAgICAgICAgaXNSZWdFeHAob3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm4pXHJcbiAgICAgICAgPyAhb3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm5cclxuICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBmYWxsYmFja1dhcm4gPSBpc0Jvb2xlYW4ob3B0aW9ucy5zaWxlbnRGYWxsYmFja1dhcm4pIHx8XHJcbiAgICAgICAgaXNSZWdFeHAob3B0aW9ucy5zaWxlbnRGYWxsYmFja1dhcm4pXHJcbiAgICAgICAgPyAhb3B0aW9ucy5zaWxlbnRGYWxsYmFja1dhcm5cclxuICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBmYWxsYmFja1Jvb3QgPSBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1Jvb3QpXHJcbiAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrUm9vdFxyXG4gICAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IGZhbGxiYWNrRm9ybWF0ID0gISFvcHRpb25zLmZvcm1hdEZhbGxiYWNrTWVzc2FnZXM7XHJcbiAgICBjb25zdCBtb2RpZmllcnMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMubW9kaWZpZXJzKSA/IG9wdGlvbnMubW9kaWZpZXJzIDoge307XHJcbiAgICBjb25zdCBwbHVyYWxpemF0aW9uUnVsZXMgPSBvcHRpb25zLnBsdXJhbGl6YXRpb25SdWxlcztcclxuICAgIGNvbnN0IHBvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXHJcbiAgICAgICAgPyBvcHRpb25zLnBvc3RUcmFuc2xhdGlvblxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgY29uc3Qgd2Fybkh0bWxNZXNzYWdlID0gaXNTdHJpbmcob3B0aW9ucy53YXJuSHRtbEluTWVzc2FnZSlcclxuICAgICAgICA/IG9wdGlvbnMud2Fybkh0bWxJbk1lc3NhZ2UgIT09ICdvZmYnXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3QgZXNjYXBlUGFyYW1ldGVyID0gISFvcHRpb25zLmVzY2FwZVBhcmFtZXRlckh0bWw7XHJcbiAgICBjb25zdCBpbmhlcml0TG9jYWxlID0gaXNCb29sZWFuKG9wdGlvbnMuc3luYykgPyBvcHRpb25zLnN5bmMgOiB0cnVlO1xyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBvcHRpb25zLmZvcm1hdHRlcikge1xyXG4gICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX0ZPUk1BVFRFUikpO1xyXG4gICAgfVxyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBvcHRpb25zLnByZXNlcnZlRGlyZWN0aXZlQ29udGVudCkge1xyXG4gICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRSkpO1xyXG4gICAgfVxyXG4gICAgbGV0IG1lc3NhZ2VzID0gb3B0aW9ucy5tZXNzYWdlcztcclxuICAgIGlmIChpc1BsYWluT2JqZWN0KG9wdGlvbnMuc2hhcmVkTWVzc2FnZXMpKSB7XHJcbiAgICAgICAgY29uc3Qgc2hhcmVkTWVzc2FnZXMgPSBvcHRpb25zLnNoYXJlZE1lc3NhZ2VzO1xyXG4gICAgICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhzaGFyZWRNZXNzYWdlcyk7XHJcbiAgICAgICAgbWVzc2FnZXMgPSBsb2NhbGVzLnJlZHVjZSgobWVzc2FnZXMsIGxvY2FsZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXNbbG9jYWxlXSB8fCAobWVzc2FnZXNbbG9jYWxlXSA9IHt9KTtcclxuICAgICAgICAgICAgYXNzaWduKG1lc3NhZ2UsIHNoYXJlZE1lc3NhZ2VzW2xvY2FsZV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZXM7XHJcbiAgICAgICAgfSwgKG1lc3NhZ2VzIHx8IHt9KSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCB7IF9faTE4biwgX19yb290LCBfX2luamVjdFdpdGhPcHRpb24gfSA9IG9wdGlvbnM7XHJcbiAgICBjb25zdCBkYXRldGltZUZvcm1hdHMgPSBvcHRpb25zLmRhdGV0aW1lRm9ybWF0cztcclxuICAgIGNvbnN0IG51bWJlckZvcm1hdHMgPSBvcHRpb25zLm51bWJlckZvcm1hdHM7XHJcbiAgICBjb25zdCBmbGF0SnNvbiA9IG9wdGlvbnMuZmxhdEpzb247XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvY2FsZSxcclxuICAgICAgICBmYWxsYmFja0xvY2FsZSxcclxuICAgICAgICBtZXNzYWdlcyxcclxuICAgICAgICBmbGF0SnNvbixcclxuICAgICAgICBkYXRldGltZUZvcm1hdHMsXHJcbiAgICAgICAgbnVtYmVyRm9ybWF0cyxcclxuICAgICAgICBtaXNzaW5nLFxyXG4gICAgICAgIG1pc3NpbmdXYXJuLFxyXG4gICAgICAgIGZhbGxiYWNrV2FybixcclxuICAgICAgICBmYWxsYmFja1Jvb3QsXHJcbiAgICAgICAgZmFsbGJhY2tGb3JtYXQsXHJcbiAgICAgICAgbW9kaWZpZXJzLFxyXG4gICAgICAgIHBsdXJhbFJ1bGVzOiBwbHVyYWxpemF0aW9uUnVsZXMsXHJcbiAgICAgICAgcG9zdFRyYW5zbGF0aW9uLFxyXG4gICAgICAgIHdhcm5IdG1sTWVzc2FnZSxcclxuICAgICAgICBlc2NhcGVQYXJhbWV0ZXIsXHJcbiAgICAgICAgbWVzc2FnZVJlc29sdmVyOiBvcHRpb25zLm1lc3NhZ2VSZXNvbHZlcixcclxuICAgICAgICBpbmhlcml0TG9jYWxlLFxyXG4gICAgICAgIF9faTE4bixcclxuICAgICAgICBfX3Jvb3QsXHJcbiAgICAgICAgX19pbmplY3RXaXRoT3B0aW9uXHJcbiAgICB9O1xyXG59XHJcbi8qKlxyXG4gKiBjcmVhdGUgVnVlSTE4biBpbnRlcmZhY2UgZmFjdG9yeVxyXG4gKlxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbmZ1bmN0aW9uIGNyZWF0ZVZ1ZUkxOG4ob3B0aW9ucyA9IHt9LCBWdWVJMThuTGVnYWN5KSB7XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY29tcG9zZXIgPSBjcmVhdGVDb21wb3Nlcihjb252ZXJ0Q29tcG9zZXJPcHRpb25zKG9wdGlvbnMpKTtcclxuICAgICAgICAvLyBkZWZpbmVzIFZ1ZUkxOG5cclxuICAgICAgICBjb25zdCB2dWVJMThuID0ge1xyXG4gICAgICAgICAgICAvLyBpZFxyXG4gICAgICAgICAgICBpZDogY29tcG9zZXIuaWQsXHJcbiAgICAgICAgICAgIC8vIGxvY2FsZVxyXG4gICAgICAgICAgICBnZXQgbG9jYWxlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmxvY2FsZS52YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IGxvY2FsZSh2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmxvY2FsZS52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZmFsbGJhY2tMb2NhbGVcclxuICAgICAgICAgICAgZ2V0IGZhbGxiYWNrTG9jYWxlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgZmFsbGJhY2tMb2NhbGUodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gbWVzc2FnZXNcclxuICAgICAgICAgICAgZ2V0IG1lc3NhZ2VzKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBkYXRldGltZUZvcm1hdHNcclxuICAgICAgICAgICAgZ2V0IGRhdGV0aW1lRm9ybWF0cygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5kYXRldGltZUZvcm1hdHMudmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIG51bWJlckZvcm1hdHNcclxuICAgICAgICAgICAgZ2V0IG51bWJlckZvcm1hdHMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIubnVtYmVyRm9ybWF0cy52YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gYXZhaWxhYmxlTG9jYWxlc1xyXG4gICAgICAgICAgICBnZXQgYXZhaWxhYmxlTG9jYWxlcygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5hdmFpbGFibGVMb2NhbGVzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBmb3JtYXR0ZXJcclxuICAgICAgICAgICAgZ2V0IGZvcm1hdHRlcigpIHtcclxuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9GT1JNQVRURVIpKTtcclxuICAgICAgICAgICAgICAgIC8vIGR1bW15XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGludGVycG9sYXRlKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IGZvcm1hdHRlcih2YWwpIHtcclxuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9GT1JNQVRURVIpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gbWlzc2luZ1xyXG4gICAgICAgICAgICBnZXQgbWlzc2luZygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXRNaXNzaW5nSGFuZGxlcigpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgbWlzc2luZyhoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5zZXRNaXNzaW5nSGFuZGxlcihoYW5kbGVyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gc2lsZW50VHJhbnNsYXRpb25XYXJuXHJcbiAgICAgICAgICAgIGdldCBzaWxlbnRUcmFuc2xhdGlvbldhcm4oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNCb29sZWFuKGNvbXBvc2VyLm1pc3NpbmdXYXJuKVxyXG4gICAgICAgICAgICAgICAgICAgID8gIWNvbXBvc2VyLm1pc3NpbmdXYXJuXHJcbiAgICAgICAgICAgICAgICAgICAgOiBjb21wb3Nlci5taXNzaW5nV2FybjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IHNpbGVudFRyYW5zbGF0aW9uV2Fybih2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLm1pc3NpbmdXYXJuID0gaXNCb29sZWFuKHZhbCkgPyAhdmFsIDogdmFsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBzaWxlbnRGYWxsYmFja1dhcm5cclxuICAgICAgICAgICAgZ2V0IHNpbGVudEZhbGxiYWNrV2FybigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0Jvb2xlYW4oY29tcG9zZXIuZmFsbGJhY2tXYXJuKVxyXG4gICAgICAgICAgICAgICAgICAgID8gIWNvbXBvc2VyLmZhbGxiYWNrV2FyblxyXG4gICAgICAgICAgICAgICAgICAgIDogY29tcG9zZXIuZmFsbGJhY2tXYXJuO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgc2lsZW50RmFsbGJhY2tXYXJuKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKHZhbCkgPyAhdmFsIDogdmFsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBtb2RpZmllcnNcclxuICAgICAgICAgICAgZ2V0IG1vZGlmaWVycygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5tb2RpZmllcnM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGZvcm1hdEZhbGxiYWNrTWVzc2FnZXNcclxuICAgICAgICAgICAgZ2V0IGZvcm1hdEZhbGxiYWNrTWVzc2FnZXMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZmFsbGJhY2tGb3JtYXQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBmb3JtYXRGYWxsYmFja01lc3NhZ2VzKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tGb3JtYXQgPSB2YWw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHBvc3RUcmFuc2xhdGlvblxyXG4gICAgICAgICAgICBnZXQgcG9zdFRyYW5zbGF0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IHBvc3RUcmFuc2xhdGlvbihoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5zZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBzeW5jXHJcbiAgICAgICAgICAgIGdldCBzeW5jKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmluaGVyaXRMb2NhbGU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBzeW5jKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuaW5oZXJpdExvY2FsZSA9IHZhbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gd2FybkluSHRtbE1lc3NhZ2VcclxuICAgICAgICAgICAgZ2V0IHdhcm5IdG1sSW5NZXNzYWdlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLndhcm5IdG1sTWVzc2FnZSA/ICd3YXJuJyA6ICdvZmYnO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgd2Fybkh0bWxJbk1lc3NhZ2UodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci53YXJuSHRtbE1lc3NhZ2UgPSB2YWwgIT09ICdvZmYnO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBlc2NhcGVQYXJhbWV0ZXJIdG1sXHJcbiAgICAgICAgICAgIGdldCBlc2NhcGVQYXJhbWV0ZXJIdG1sKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmVzY2FwZVBhcmFtZXRlcjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IGVzY2FwZVBhcmFtZXRlckh0bWwodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5lc2NhcGVQYXJhbWV0ZXIgPSB2YWw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHByZXNlcnZlRGlyZWN0aXZlQ29udGVudFxyXG4gICAgICAgICAgICBnZXQgcHJlc2VydmVEaXJlY3RpdmVDb250ZW50KCkge1xyXG4gICAgICAgICAgICAgICAgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfUFJFU0VSVkVfRElSRUNUSVZFKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IHByZXNlcnZlRGlyZWN0aXZlQ29udGVudCh2YWwpIHtcclxuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBwbHVyYWxpemF0aW9uUnVsZXNcclxuICAgICAgICAgICAgZ2V0IHBsdXJhbGl6YXRpb25SdWxlcygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5wbHVyYWxSdWxlcyB8fCB7fTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZm9yIGludGVybmFsXHJcbiAgICAgICAgICAgIF9fY29tcG9zZXI6IGNvbXBvc2VyLFxyXG4gICAgICAgICAgICAvLyB0XHJcbiAgICAgICAgICAgIHQoLi4uYXJncykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzNdID0gYXJncztcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIGxldCBsaXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzU3RyaW5nKGFyZzEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLklOVkFMSURfQVJHVU1FTlQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYXJnMTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gYXJnMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoYXJnMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShhcmczKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBhcmczO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVkID0gYXJnMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBjb21wb3Nlci50KGtleSwgKGxpc3QgfHwgbmFtZWQgfHwge30pIGFzIGFueSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbXHJcbiAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIChsaXN0IHx8IG5hbWVkIHx8IHt9KSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcnQoLi4uYXJncykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIucnQsIGNvbXBvc2VyLCBbLi4uYXJnc10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyB0Y1xyXG4gICAgICAgICAgICB0YyguLi5hcmdzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnM10gPSBhcmdzO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgcGx1cmFsOiAxIH07XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1N0cmluZyhhcmcxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGFyZzE7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcoYXJnMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc051bWJlcihhcmcyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucGx1cmFsID0gYXJnMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzQXJyYXkoYXJnMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcoYXJnMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0FycmF5KGFyZzMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGFyZzM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZWQgPSBhcmczO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIGNvbXBvc2VyLnQoa2V5LCAobGlzdCB8fCBuYW1lZCB8fCB7fSkgYXMgYW55LCBvcHRpb25zKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIudCwgY29tcG9zZXIsIFtcclxuICAgICAgICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgKGxpc3QgfHwgbmFtZWQgfHwge30pLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNcclxuICAgICAgICAgICAgICAgIF0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyB0ZVxyXG4gICAgICAgICAgICB0ZShrZXksIGxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLnRlKGtleSwgbG9jYWxlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gdG1cclxuICAgICAgICAgICAgdG0oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIudG0oa2V5KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZ2V0TG9jYWxlTWVzc2FnZVxyXG4gICAgICAgICAgICBnZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldExvY2FsZU1lc3NhZ2UobG9jYWxlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gc2V0TG9jYWxlTWVzc2FnZVxyXG4gICAgICAgICAgICBzZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0TG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBtZXJnZUxvY2FsZU1lc3NhZ2VcclxuICAgICAgICAgICAgbWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGRcclxuICAgICAgICAgICAgZCguLi5hcmdzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci5kLCBjb21wb3NlciwgWy4uLmFyZ3NdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZ2V0RGF0ZVRpbWVGb3JtYXRcclxuICAgICAgICAgICAgZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gc2V0RGF0ZVRpbWVGb3JtYXRcclxuICAgICAgICAgICAgc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldERhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gbWVyZ2VEYXRlVGltZUZvcm1hdFxyXG4gICAgICAgICAgICBtZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gblxyXG4gICAgICAgICAgICBuKC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLm4sIGNvbXBvc2VyLCBbLi4uYXJnc10pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBnZXROdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldE51bWJlckZvcm1hdChsb2NhbGUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBzZXROdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5zZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBtZXJnZU51bWJlckZvcm1hdFxyXG4gICAgICAgICAgICBtZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBnZXRDaG9pY2VJbmRleFxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICAgICAgICAgIGdldENob2ljZUluZGV4KGNob2ljZSwgY2hvaWNlc0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfR0VUX0NIT0lDRV9JTkRFWCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBmb3IgaW50ZXJuYWxcclxuICAgICAgICAgICAgX19vbkNvbXBvbmVudEluc3RhbmNlQ3JlYXRlZCh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgY29tcG9uZW50SW5zdGFuY2VDcmVhdGVkTGlzdGVuZXIgfSA9IG9wdGlvbnM7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50SW5zdGFuY2VDcmVhdGVkTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZUNyZWF0ZWRMaXN0ZW5lcih0YXJnZXQsIHZ1ZUkxOG4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xyXG4gICAgICAgICAgICB2dWVJMThuLl9fZW5hYmxlRW1pdHRlciA9IChlbWl0dGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfX2NvbXBvc2VyID0gY29tcG9zZXI7XHJcbiAgICAgICAgICAgICAgICBfX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdICYmIF9fY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0oZW1pdHRlcik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZ1ZUkxOG4uX19kaXNhYmxlRW1pdHRlciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9fY29tcG9zZXIgPSBjb21wb3NlcjtcclxuICAgICAgICAgICAgICAgIF9fY29tcG9zZXJbRGlzYWJsZUVtaXR0ZXJdICYmIF9fY29tcG9zZXJbRGlzYWJsZUVtaXR0ZXJdKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2dWVJMThuO1xyXG4gICAgfVxyXG59XHJcbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5jb25zdCBiYXNlRm9ybWF0UHJvcHMgPSB7XHJcbiAgICB0YWc6IHtcclxuICAgICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdXHJcbiAgICB9LFxyXG4gICAgbG9jYWxlOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nXHJcbiAgICB9LFxyXG4gICAgc2NvcGU6IHtcclxuICAgICAgICB0eXBlOiBTdHJpbmcsXHJcbiAgICAgICAgLy8gTk9URTogYXZvaWQgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9ydXNoc3RhY2svaXNzdWVzLzEwNTBcclxuICAgICAgICB2YWxpZGF0b3I6ICh2YWwgLyogQ29tcG9uZXRJMThuU2NvcGUgKi8pID0+IHZhbCA9PT0gJ3BhcmVudCcgfHwgdmFsID09PSAnZ2xvYmFsJyxcclxuICAgICAgICBkZWZhdWx0OiAncGFyZW50JyAvKiBDb21wb25ldEkxOG5TY29wZSAqL1xyXG4gICAgfSxcclxuICAgIGkxOG46IHtcclxuICAgICAgICB0eXBlOiBPYmplY3RcclxuICAgIH1cclxufTtcblxuZnVuY3Rpb24gZ2V0SW50ZXJwb2xhdGVBcmcoXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbnsgc2xvdHMgfSwgLy8gU2V0dXBDb250ZXh0LFxyXG5rZXlzKSB7XHJcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDEgJiYga2V5c1swXSA9PT0gJ2RlZmF1bHQnKSB7XHJcbiAgICAgICAgLy8gZGVmYXVsdCBzbG90IHdpdGggbGlzdFxyXG4gICAgICAgIGNvbnN0IHJldCA9IHNsb3RzLmRlZmF1bHQgPyBzbG90cy5kZWZhdWx0KCkgOiBbXTtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHJldHVybiByZXQucmVkdWNlKChzbG90LCBjdXJyZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiAoc2xvdCA9IFtcclxuICAgICAgICAgICAgICAgIC4uLnNsb3QsXHJcbiAgICAgICAgICAgICAgICAuLi4oaXNBcnJheShjdXJyZW50LmNoaWxkcmVuKSA/IGN1cnJlbnQuY2hpbGRyZW4gOiBbY3VycmVudF0pXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH0sIFtdKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIC8vIG5hbWVkIHNsb3RzXHJcbiAgICAgICAgcmV0dXJuIGtleXMucmVkdWNlKChhcmcsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzbG90ID0gc2xvdHNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHNsb3QpIHtcclxuICAgICAgICAgICAgICAgIGFyZ1trZXldID0gc2xvdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhcmc7XHJcbiAgICAgICAgfSwge30pO1xyXG4gICAgfVxyXG59XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmZ1bmN0aW9uIGdldEZyYWdtZW50YWJsZVRhZyh0YWcpIHtcclxuICAgIHJldHVybiBGcmFnbWVudCA7XHJcbn1cblxuLyoqXHJcbiAqIFRyYW5zbGF0aW9uIENvbXBvbmVudFxyXG4gKlxyXG4gKiBAcmVtYXJrc1xyXG4gKiBTZWUgdGhlIGZvbGxvd2luZyBpdGVtcyBmb3IgcHJvcGVydHkgYWJvdXQgZGV0YWlsc1xyXG4gKlxyXG4gKiBAVnVlSTE4blNlZSBbVHJhbnNsYXRpb25Qcm9wc10oY29tcG9uZW50I3RyYW5zbGF0aW9ucHJvcHMpXHJcbiAqIEBWdWVJMThuU2VlIFtCYXNlRm9ybWF0UHJvcHNdKGNvbXBvbmVudCNiYXNlZm9ybWF0cHJvcHMpXHJcbiAqIEBWdWVJMThuU2VlIFtDb21wb25lbnQgSW50ZXJwb2xhdGlvbl0oLi4vZ3VpZGUvYWR2YW5jZWQvY29tcG9uZW50KVxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiBgYGBodG1sXHJcbiAqIDxkaXYgaWQ9XCJhcHBcIj5cclxuICogICA8IS0tIC4uLiAtLT5cclxuICogICA8aTE4biBwYXRoPVwidGVybVwiIHRhZz1cImxhYmVsXCIgZm9yPVwidG9zXCI+XHJcbiAqICAgICA8YSA6aHJlZj1cInVybFwiIHRhcmdldD1cIl9ibGFua1wiPnt7ICR0KCd0b3MnKSB9fTwvYT5cclxuICogICA8L2kxOG4+XHJcbiAqICAgPCEtLSAuLi4gLS0+XHJcbiAqIDwvZGl2PlxyXG4gKiBgYGBcclxuICogYGBganNcclxuICogaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSAndnVlJ1xyXG4gKiBpbXBvcnQgeyBjcmVhdGVJMThuIH0gZnJvbSAndnVlLWkxOG4nXHJcbiAqXHJcbiAqIGNvbnN0IG1lc3NhZ2VzID0ge1xyXG4gKiAgIGVuOiB7XHJcbiAqICAgICB0b3M6ICdUZXJtIG9mIFNlcnZpY2UnLFxyXG4gKiAgICAgdGVybTogJ0kgYWNjZXB0IHh4eCB7MH0uJ1xyXG4gKiAgIH0sXHJcbiAqICAgamE6IHtcclxuICogICAgIHRvczogJ+WIqeeUqOimj+e0hCcsXHJcbiAqICAgICB0ZXJtOiAn56eB44GvIHh4eCDjga57MH3jgavlkIzmhI/jgZfjgb7jgZnjgIInXHJcbiAqICAgfVxyXG4gKiB9XHJcbiAqXHJcbiAqIGNvbnN0IGkxOG4gPSBjcmVhdGVJMThuKHtcclxuICogICBsb2NhbGU6ICdlbicsXHJcbiAqICAgbWVzc2FnZXNcclxuICogfSlcclxuICpcclxuICogY29uc3QgYXBwID0gY3JlYXRlQXBwKHtcclxuICogICBkYXRhOiB7XHJcbiAqICAgICB1cmw6ICcvdGVybSdcclxuICogICB9XHJcbiAqIH0pLnVzZShpMThuKS5tb3VudCgnI2FwcCcpXHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBAVnVlSTE4bkNvbXBvbmVudFxyXG4gKi9cclxuY29uc3QgVHJhbnNsYXRpb24gPSAgLyogZGVmaW5lQ29tcG9uZW50ICovIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlICovXHJcbiAgICBuYW1lOiAnaTE4bi10JyxcclxuICAgIHByb3BzOiBhc3NpZ24oe1xyXG4gICAgICAgIGtleXBhdGg6IHtcclxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGx1cmFsOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFtOdW1iZXIsIFN0cmluZ10sXHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgIHZhbGlkYXRvcjogKHZhbCkgPT4gaXNOdW1iZXIodmFsKSB8fCAhaXNOYU4odmFsKVxyXG4gICAgICAgIH1cclxuICAgIH0sIGJhc2VGb3JtYXRQcm9wcyksXHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgc2V0dXAocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBjb25zdCB7IHNsb3RzLCBhdHRycyB9ID0gY29udGV4dDtcclxuICAgICAgICAvLyBOT1RFOiBhdm9pZCBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L3J1c2hzdGFjay9pc3N1ZXMvMTA1MFxyXG4gICAgICAgIGNvbnN0IGkxOG4gPSBwcm9wcy5pMThuIHx8XHJcbiAgICAgICAgICAgIHVzZUkxOG4oe1xyXG4gICAgICAgICAgICAgICAgdXNlU2NvcGU6IHByb3BzLnNjb3BlLFxyXG4gICAgICAgICAgICAgICAgX191c2VDb21wb25lbnQ6IHRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHNsb3RzKS5maWx0ZXIoa2V5ID0+IGtleSAhPT0gJ18nKTtcclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgICAgICBpZiAocHJvcHMubG9jYWxlKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IHByb3BzLmxvY2FsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcHMucGx1cmFsICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMucGx1cmFsID0gaXNTdHJpbmcocHJvcHMucGx1cmFsKSA/ICtwcm9wcy5wbHVyYWwgOiBwcm9wcy5wbHVyYWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgYXJnID0gZ2V0SW50ZXJwb2xhdGVBcmcoY29udGV4dCwga2V5cyk7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gaTE4bltUcmFuc3JhdGVWTm9kZVN5bWJvbF0ocHJvcHMua2V5cGF0aCwgYXJnLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgY29uc3QgYXNzaWduZWRBdHRycyA9IGFzc2lnbih7fSwgYXR0cnMpO1xyXG4gICAgICAgICAgICBjb25zdCB0YWcgPSBpc1N0cmluZyhwcm9wcy50YWcpIHx8IGlzT2JqZWN0KHByb3BzLnRhZylcclxuICAgICAgICAgICAgICAgID8gcHJvcHMudGFnXHJcbiAgICAgICAgICAgICAgICA6IGdldEZyYWdtZW50YWJsZVRhZygpO1xyXG4gICAgICAgICAgICByZXR1cm4gaCh0YWcsIGFzc2lnbmVkQXR0cnMsIGNoaWxkcmVuKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xuXG5mdW5jdGlvbiBpc1ZOb2RlKHRhcmdldCkge1xyXG4gICAgcmV0dXJuIGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNTdHJpbmcodGFyZ2V0WzBdKTtcclxufVxyXG5mdW5jdGlvbiByZW5kZXJGb3JtYXR0ZXIocHJvcHMsIGNvbnRleHQsIHNsb3RLZXlzLCBwYXJ0Rm9ybWF0dGVyKSB7XHJcbiAgICBjb25zdCB7IHNsb3RzLCBhdHRycyB9ID0gY29udGV4dDtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgcGFydDogdHJ1ZSB9O1xyXG4gICAgICAgIGxldCBvdmVycmlkZXMgPSB7fTtcclxuICAgICAgICBpZiAocHJvcHMubG9jYWxlKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gcHJvcHMubG9jYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNTdHJpbmcocHJvcHMuZm9ybWF0KSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmtleSA9IHByb3BzLmZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNPYmplY3QocHJvcHMuZm9ybWF0KSkge1xyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcocHJvcHMuZm9ybWF0LmtleSkpIHtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmtleSA9IHByb3BzLmZvcm1hdC5rZXk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRmlsdGVyIG91dCBudW1iZXIgZm9ybWF0IG9wdGlvbnMgb25seVxyXG4gICAgICAgICAgICBvdmVycmlkZXMgPSBPYmplY3Qua2V5cyhwcm9wcy5mb3JtYXQpLnJlZHVjZSgob3B0aW9ucywgcHJvcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNsb3RLZXlzLmluY2x1ZGVzKHByb3ApXHJcbiAgICAgICAgICAgICAgICAgICAgPyBhc3NpZ24oe30sIG9wdGlvbnMsIHsgW3Byb3BdOiBwcm9wcy5mb3JtYXRbcHJvcF0gfSkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25zO1xyXG4gICAgICAgICAgICB9LCB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHBhcnRzID0gcGFydEZvcm1hdHRlciguLi5bcHJvcHMudmFsdWUsIG9wdGlvbnMsIG92ZXJyaWRlc10pO1xyXG4gICAgICAgIGxldCBjaGlsZHJlbiA9IFtvcHRpb25zLmtleV07XHJcbiAgICAgICAgaWYgKGlzQXJyYXkocGFydHMpKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gcGFydHMubWFwKChwYXJ0LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2xvdCA9IHNsb3RzW3BhcnQudHlwZV07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlID0gc2xvdFxyXG4gICAgICAgICAgICAgICAgICAgID8gc2xvdCh7IFtwYXJ0LnR5cGVdOiBwYXJ0LnZhbHVlLCBpbmRleCwgcGFydHMgfSlcclxuICAgICAgICAgICAgICAgICAgICA6IFtwYXJ0LnZhbHVlXTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1ZOb2RlKG5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZVswXS5rZXkgPSBgJHtwYXJ0LnR5cGV9LSR7aW5kZXh9YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoaXNTdHJpbmcocGFydHMpKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcmVuID0gW3BhcnRzXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgYXNzaWduZWRBdHRycyA9IGFzc2lnbih7fSwgYXR0cnMpO1xyXG4gICAgICAgIGNvbnN0IHRhZyA9IGlzU3RyaW5nKHByb3BzLnRhZykgfHwgaXNPYmplY3QocHJvcHMudGFnKVxyXG4gICAgICAgICAgICA/IHByb3BzLnRhZ1xyXG4gICAgICAgICAgICA6IGdldEZyYWdtZW50YWJsZVRhZygpO1xyXG4gICAgICAgIHJldHVybiBoKHRhZywgYXNzaWduZWRBdHRycywgY2hpbGRyZW4pO1xyXG4gICAgfTtcclxufVxuXG4vKipcclxuICogTnVtYmVyIEZvcm1hdCBDb21wb25lbnRcclxuICpcclxuICogQHJlbWFya3NcclxuICogU2VlIHRoZSBmb2xsb3dpbmcgaXRlbXMgZm9yIHByb3BlcnR5IGFib3V0IGRldGFpbHNcclxuICpcclxuICogQFZ1ZUkxOG5TZWUgW0Zvcm1hdHRhYmxlUHJvcHNdKGNvbXBvbmVudCNmb3JtYXR0YWJsZXByb3BzKVxyXG4gKiBAVnVlSTE4blNlZSBbQmFzZUZvcm1hdFByb3BzXShjb21wb25lbnQjYmFzZWZvcm1hdHByb3BzKVxyXG4gKiBAVnVlSTE4blNlZSBbQ3VzdG9tIEZvcm1hdHRpbmddKC4uL2d1aWRlL2Vzc2VudGlhbHMvbnVtYmVyI2N1c3RvbS1mb3JtYXR0aW5nKVxyXG4gKlxyXG4gKiBAVnVlSTE4bkRhbmdlclxyXG4gKiBOb3Qgc3VwcG9ydGVkIElFLCBkdWUgdG8gbm8gc3VwcG9ydCBgSW50bC5OdW1iZXJGb3JtYXQjZm9ybWF0VG9QYXJ0c2AgaW4gW0lFXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsL051bWJlckZvcm1hdC9mb3JtYXRUb1BhcnRzKVxyXG4gKlxyXG4gKiBJZiB5b3Ugd2FudCB0byB1c2UgaXQsIHlvdSBuZWVkIHRvIHVzZSBbcG9seWZpbGxdKGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtYXRqcy9mb3JtYXRqcy90cmVlL21haW4vcGFja2FnZXMvaW50bC1udW1iZXJmb3JtYXQpXHJcbiAqXHJcbiAqIEBWdWVJMThuQ29tcG9uZW50XHJcbiAqL1xyXG5jb25zdCBOdW1iZXJGb3JtYXQgPSAgLyogZGVmaW5lQ29tcG9uZW50ICovIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlICovXHJcbiAgICBuYW1lOiAnaTE4bi1uJyxcclxuICAgIHByb3BzOiBhc3NpZ24oe1xyXG4gICAgICAgIHZhbHVlOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcixcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1hdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdXHJcbiAgICAgICAgfVxyXG4gICAgfSwgYmFzZUZvcm1hdFByb3BzKSxcclxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBzZXR1cChwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IGkxOG4gPSBwcm9wcy5pMThuIHx8XHJcbiAgICAgICAgICAgIHVzZUkxOG4oeyB1c2VTY29wZTogJ3BhcmVudCcsIF9fdXNlQ29tcG9uZW50OiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybiByZW5kZXJGb3JtYXR0ZXIocHJvcHMsIGNvbnRleHQsIE5VTUJFUl9GT1JNQVRfT1BUSU9OU19LRVlTLCAoLi4uYXJncykgPT4gXHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICBpMThuW051bWJlclBhcnRzU3ltYm9sXSguLi5hcmdzKSk7XHJcbiAgICB9XHJcbn07XG5cbi8qKlxyXG4gKiBEYXRldGltZSBGb3JtYXQgQ29tcG9uZW50XHJcbiAqXHJcbiAqIEByZW1hcmtzXHJcbiAqIFNlZSB0aGUgZm9sbG93aW5nIGl0ZW1zIGZvciBwcm9wZXJ0eSBhYm91dCBkZXRhaWxzXHJcbiAqXHJcbiAqIEBWdWVJMThuU2VlIFtGb3JtYXR0YWJsZVByb3BzXShjb21wb25lbnQjZm9ybWF0dGFibGVwcm9wcylcclxuICogQFZ1ZUkxOG5TZWUgW0Jhc2VGb3JtYXRQcm9wc10oY29tcG9uZW50I2Jhc2Vmb3JtYXRwcm9wcylcclxuICogQFZ1ZUkxOG5TZWUgW0N1c3RvbSBGb3JtYXR0aW5nXSguLi9ndWlkZS9lc3NlbnRpYWxzL2RhdGV0aW1lI2N1c3RvbS1mb3JtYXR0aW5nKVxyXG4gKlxyXG4gKiBAVnVlSTE4bkRhbmdlclxyXG4gKiBOb3Qgc3VwcG9ydGVkIElFLCBkdWUgdG8gbm8gc3VwcG9ydCBgSW50bC5EYXRlVGltZUZvcm1hdCNmb3JtYXRUb1BhcnRzYCBpbiBbSUVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0ludGwvRGF0ZVRpbWVGb3JtYXQvZm9ybWF0VG9QYXJ0cylcclxuICpcclxuICogSWYgeW91IHdhbnQgdG8gdXNlIGl0LCB5b3UgbmVlZCB0byB1c2UgW3BvbHlmaWxsXShodHRwczovL2dpdGh1Yi5jb20vZm9ybWF0anMvZm9ybWF0anMvdHJlZS9tYWluL3BhY2thZ2VzL2ludGwtZGF0ZXRpbWVmb3JtYXQpXHJcbiAqXHJcbiAqIEBWdWVJMThuQ29tcG9uZW50XHJcbiAqL1xyXG5jb25zdCBEYXRldGltZUZvcm1hdCA9ICAvKmRlZmluZUNvbXBvbmVudCAqLyB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4gICAgbmFtZTogJ2kxOG4tZCcsXHJcbiAgICBwcm9wczogYXNzaWduKHtcclxuICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBbTnVtYmVyLCBEYXRlXSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZvcm1hdDoge1xyXG4gICAgICAgICAgICB0eXBlOiBbU3RyaW5nLCBPYmplY3RdXHJcbiAgICAgICAgfVxyXG4gICAgfSwgYmFzZUZvcm1hdFByb3BzKSxcclxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBzZXR1cChwcm9wcywgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IGkxOG4gPSBwcm9wcy5pMThuIHx8XHJcbiAgICAgICAgICAgIHVzZUkxOG4oeyB1c2VTY29wZTogJ3BhcmVudCcsIF9fdXNlQ29tcG9uZW50OiB0cnVlIH0pO1xyXG4gICAgICAgIHJldHVybiByZW5kZXJGb3JtYXR0ZXIocHJvcHMsIGNvbnRleHQsIERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMsICguLi5hcmdzKSA9PiBcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIGkxOG5bRGF0ZXRpbWVQYXJ0c1N5bWJvbF0oLi4uYXJncykpO1xyXG4gICAgfVxyXG59O1xuXG5mdW5jdGlvbiBnZXRDb21wb3NlciQyKGkxOG4sIGluc3RhbmNlKSB7XHJcbiAgICBjb25zdCBpMThuSW50ZXJuYWwgPSBpMThuO1xyXG4gICAgaWYgKGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJykge1xyXG4gICAgICAgIHJldHVybiAoaTE4bkludGVybmFsLl9fZ2V0SW5zdGFuY2UoaW5zdGFuY2UpIHx8IGkxOG4uZ2xvYmFsKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IHZ1ZUkxOG4gPSBpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShpbnN0YW5jZSk7XHJcbiAgICAgICAgcmV0dXJuIHZ1ZUkxOG4gIT0gbnVsbFxyXG4gICAgICAgICAgICA/IHZ1ZUkxOG4uX19jb21wb3NlclxyXG4gICAgICAgICAgICA6IGkxOG4uZ2xvYmFsLl9fY29tcG9zZXI7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdlREaXJlY3RpdmUoaTE4bikge1xyXG4gICAgY29uc3QgX3Byb2Nlc3MgPSAoYmluZGluZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHsgaW5zdGFuY2UsIG1vZGlmaWVycywgdmFsdWUgfSA9IGJpbmRpbmc7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFpbnN0YW5jZSB8fCAhaW5zdGFuY2UuJCkge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gZ2V0Q29tcG9zZXIkMihpMThuLCBpbnN0YW5jZS4kKTtcclxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIG1vZGlmaWVycy5wcmVzZXJ2ZSkge1xyXG4gICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHBhcnNlVmFsdWUodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIudCwgY29tcG9zZXIsIFsuLi5tYWtlUGFyYW1zKHBhcnNlZFZhbHVlKV0pLFxyXG4gICAgICAgICAgICBjb21wb3NlclxyXG4gICAgICAgIF07XHJcbiAgICB9O1xyXG4gICAgY29uc3QgcmVnaXN0ZXIgPSAoZWwsIGJpbmRpbmcpID0+IHtcclxuICAgICAgICBjb25zdCBbdGV4dENvbnRlbnQsIGNvbXBvc2VyXSA9IF9wcm9jZXNzKGJpbmRpbmcpO1xyXG4gICAgICAgIGlmIChpbkJyb3dzZXIgJiYgaTE4bi5nbG9iYWwgPT09IGNvbXBvc2VyKSB7XHJcbiAgICAgICAgICAgIC8vIGdsb2JhbCBzY29wZSBvbmx5XHJcbiAgICAgICAgICAgIGVsLl9faTE4bldhdGNoZXIgPSB3YXRjaChjb21wb3Nlci5sb2NhbGUsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJpbmRpbmcuaW5zdGFuY2UgJiYgYmluZGluZy5pbnN0YW5jZS4kZm9yY2VVcGRhdGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsLl9fY29tcG9zZXIgPSBjb21wb3NlcjtcclxuICAgICAgICBlbC50ZXh0Q29udGVudCA9IHRleHRDb250ZW50O1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHVucmVnaXN0ZXIgPSAoZWwpID0+IHtcclxuICAgICAgICBpZiAoaW5Ccm93c2VyICYmIGVsLl9faTE4bldhdGNoZXIpIHtcclxuICAgICAgICAgICAgZWwuX19pMThuV2F0Y2hlcigpO1xyXG4gICAgICAgICAgICBlbC5fX2kxOG5XYXRjaGVyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBkZWxldGUgZWwuX19pMThuV2F0Y2hlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVsLl9fY29tcG9zZXIpIHtcclxuICAgICAgICAgICAgZWwuX19jb21wb3NlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGVsZXRlIGVsLl9fY29tcG9zZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IHVwZGF0ZSA9IChlbCwgeyB2YWx1ZSB9KSA9PiB7XHJcbiAgICAgICAgaWYgKGVsLl9fY29tcG9zZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9zZXIgPSBlbC5fX2NvbXBvc2VyO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IHBhcnNlVmFsdWUodmFsdWUpO1xyXG4gICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IFJlZmxlY3QuYXBwbHkoY29tcG9zZXIudCwgY29tcG9zZXIsIFtcclxuICAgICAgICAgICAgICAgIC4uLm1ha2VQYXJhbXMocGFyc2VkVmFsdWUpXHJcbiAgICAgICAgICAgIF0pO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCBnZXRTU1JQcm9wcyA9IChiaW5kaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3QgW3RleHRDb250ZW50XSA9IF9wcm9jZXNzKGJpbmRpbmcpO1xyXG4gICAgICAgIHJldHVybiB7IHRleHRDb250ZW50IH07XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGVkOiByZWdpc3RlcixcclxuICAgICAgICB1bm1vdW50ZWQ6IHVucmVnaXN0ZXIsXHJcbiAgICAgICAgYmVmb3JlVXBkYXRlOiB1cGRhdGUsXHJcbiAgICAgICAgZ2V0U1NSUHJvcHNcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gcGFyc2VWYWx1ZSh2YWx1ZSkge1xyXG4gICAgaWYgKGlzU3RyaW5nKHZhbHVlKSkge1xyXG4gICAgICAgIHJldHVybiB7IHBhdGg6IHZhbHVlIH07XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xyXG4gICAgICAgIGlmICghKCdwYXRoJyBpbiB2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlJFUVVJUkVEX1ZBTFVFLCAncGF0aCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9WQUxVRSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gbWFrZVBhcmFtcyh2YWx1ZSkge1xyXG4gICAgY29uc3QgeyBwYXRoLCBsb2NhbGUsIGFyZ3MsIGNob2ljZSwgcGx1cmFsIH0gPSB2YWx1ZTtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcclxuICAgIGNvbnN0IG5hbWVkID0gYXJncyB8fCB7fTtcclxuICAgIGlmIChpc1N0cmluZyhsb2NhbGUpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBsb2NhbGU7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNOdW1iZXIoY2hvaWNlKSkge1xyXG4gICAgICAgIG9wdGlvbnMucGx1cmFsID0gY2hvaWNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzTnVtYmVyKHBsdXJhbCkpIHtcclxuICAgICAgICBvcHRpb25zLnBsdXJhbCA9IHBsdXJhbDtcclxuICAgIH1cclxuICAgIHJldHVybiBbcGF0aCwgbmFtZWQsIG9wdGlvbnNdO1xyXG59XG5cbmZ1bmN0aW9uIGFwcGx5KGFwcCwgaTE4biwgLi4ub3B0aW9ucykge1xyXG4gICAgY29uc3QgcGx1Z2luT3B0aW9ucyA9IGlzUGxhaW5PYmplY3Qob3B0aW9uc1swXSlcclxuICAgICAgICA/IG9wdGlvbnNbMF1cclxuICAgICAgICA6IHt9O1xyXG4gICAgY29uc3QgdXNlSTE4bkNvbXBvbmVudE5hbWUgPSAhIXBsdWdpbk9wdGlvbnMudXNlSTE4bkNvbXBvbmVudE5hbWU7XHJcbiAgICBjb25zdCBnbG9iYWxJbnN0YWxsID0gaXNCb29sZWFuKHBsdWdpbk9wdGlvbnMuZ2xvYmFsSW5zdGFsbClcclxuICAgICAgICA/IHBsdWdpbk9wdGlvbnMuZ2xvYmFsSW5zdGFsbFxyXG4gICAgICAgIDogdHJ1ZTtcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgZ2xvYmFsSW5zdGFsbCAmJiB1c2VJMThuQ29tcG9uZW50TmFtZSkge1xyXG4gICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5DT01QT05FTlRfTkFNRV9MRUdBQ1lfQ09NUEFUSUJMRSwge1xyXG4gICAgICAgICAgICBuYW1lOiBUcmFuc2xhdGlvbi5uYW1lXHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgaWYgKGdsb2JhbEluc3RhbGwpIHtcclxuICAgICAgICAvLyBpbnN0YWxsIGNvbXBvbmVudHNcclxuICAgICAgICBhcHAuY29tcG9uZW50KCF1c2VJMThuQ29tcG9uZW50TmFtZSA/IFRyYW5zbGF0aW9uLm5hbWUgOiAnaTE4bicsIFRyYW5zbGF0aW9uKTtcclxuICAgICAgICBhcHAuY29tcG9uZW50KE51bWJlckZvcm1hdC5uYW1lLCBOdW1iZXJGb3JtYXQpO1xyXG4gICAgICAgIGFwcC5jb21wb25lbnQoRGF0ZXRpbWVGb3JtYXQubmFtZSwgRGF0ZXRpbWVGb3JtYXQpO1xyXG4gICAgfVxyXG4gICAgLy8gaW5zdGFsbCBkaXJlY3RpdmVcclxuICAgIHtcclxuICAgICAgICBhcHAuZGlyZWN0aXZlKCd0JywgdlREaXJlY3RpdmUoaTE4bikpO1xyXG4gICAgfVxyXG59XG5cbmNvbnN0IFZVRV9JMThOX0NPTVBPTkVOVF9UWVBFUyA9ICd2dWUtaTE4bjogY29tcG9zZXIgcHJvcGVydGllcyc7XHJcbmxldCBkZXZ0b29sc0FwaTtcclxuYXN5bmMgZnVuY3Rpb24gZW5hYmxlRGV2VG9vbHMoYXBwLCBpMThuKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHNldHVwRGV2dG9vbHNQbHVnaW4oe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwidnVlLWRldnRvb2xzLXBsdWdpbi12dWUtaTE4blwiIC8qIFBMVUdJTiAqLyxcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBWdWVEZXZUb29sc0xhYmVsc1tcInZ1ZS1kZXZ0b29scy1wbHVnaW4tdnVlLWkxOG5cIiAvKiBQTFVHSU4gKi9dLFxyXG4gICAgICAgICAgICAgICAgcGFja2FnZU5hbWU6ICd2dWUtaTE4bicsXHJcbiAgICAgICAgICAgICAgICBob21lcGFnZTogJ2h0dHBzOi8vdnVlLWkxOG4uaW50bGlmeS5kZXYnLFxyXG4gICAgICAgICAgICAgICAgbG9nbzogJ2h0dHBzOi8vdnVlLWkxOG4uaW50bGlmeS5kZXYvdnVlLWkxOG4tZGV2dG9vbHMtbG9nby5wbmcnLFxyXG4gICAgICAgICAgICAgICAgY29tcG9uZW50U3RhdGVUeXBlczogW1ZVRV9JMThOX0NPTVBPTkVOVF9UWVBFU10sXHJcbiAgICAgICAgICAgICAgICBhcHA6IGFwcCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgfSwgYXBpID0+IHtcclxuICAgICAgICAgICAgICAgIGRldnRvb2xzQXBpID0gYXBpO1xyXG4gICAgICAgICAgICAgICAgYXBpLm9uLnZpc2l0Q29tcG9uZW50VHJlZSgoeyBjb21wb25lbnRJbnN0YW5jZSwgdHJlZU5vZGUgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNvbXBvbmVudFRyZWVUYWdzKGNvbXBvbmVudEluc3RhbmNlLCB0cmVlTm9kZSwgaTE4bik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFwaS5vbi5pbnNwZWN0Q29tcG9uZW50KCh7IGNvbXBvbmVudEluc3RhbmNlLCBpbnN0YW5jZURhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnRJbnN0YW5jZS52bm9kZS5lbCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2VEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpMThuLm1vZGUgPT09ICdsZWdhY3knKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZ25vcmUgZ2xvYmFsIHNjb3BlIG9uIGxlZ2FjeSBtb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50SW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fICE9PVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkxOG4uZ2xvYmFsLl9fY29tcG9zZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNwZWN0Q29tcG9zZXIoaW5zdGFuY2VEYXRhLCBjb21wb25lbnRJbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zcGVjdENvbXBvc2VyKGluc3RhbmNlRGF0YSwgY29tcG9uZW50SW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYXBpLmFkZEluc3BlY3Rvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwidnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogQ1VTVE9NX0lOU1BFQ1RPUiAqLyxcclxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogVnVlRGV2VG9vbHNMYWJlbHNbXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBDVVNUT01fSU5TUEVDVE9SICovXSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uOiAnbGFuZ3VhZ2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyZWVGaWx0ZXJQbGFjZWhvbGRlcjogVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnNbXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBDVVNUT01fSU5TUEVDVE9SICovXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhcGkub24uZ2V0SW5zcGVjdG9yVHJlZShwYXlsb2FkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hcHAgPT09IGFwcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLmluc3BlY3RvcklkID09PSBcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIENVU1RPTV9JTlNQRUNUT1IgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnaXN0ZXJTY29wZShwYXlsb2FkLCBpMThuKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvb3RzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgYXBpLm9uLmdldEluc3BlY3RvclN0YXRlKGFzeW5jIChwYXlsb2FkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXBwID09PSBhcHAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5pbnNwZWN0b3JJZCA9PT0gXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBDVVNUT01fSU5TUEVDVE9SICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwaS51bmhpZ2hsaWdodEVsZW1lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5zcGVjdFNjb3BlKHBheWxvYWQsIGkxOG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5ub2RlSWQgPT09ICdnbG9iYWwnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJvb3RzLmhhcyhwYXlsb2FkLmFwcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbcm9vdF0gPSBhd2FpdCBhcGkuZ2V0Q29tcG9uZW50SW5zdGFuY2VzKHBheWxvYWQuYXBwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb290cy5zZXQocGF5bG9hZC5hcHAsIHJvb3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpLmhpZ2hsaWdodEVsZW1lbnQocm9vdHMuZ2V0KHBheWxvYWQuYXBwKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGdldENvbXBvbmVudEluc3RhbmNlKHBheWxvYWQubm9kZUlkLCBpMThuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlICYmIGFwaS5oaWdobGlnaHRFbGVtZW50KGluc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYXBpLm9uLmVkaXRJbnNwZWN0b3JTdGF0ZShwYXlsb2FkID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGF5bG9hZC5hcHAgPT09IGFwcCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXlsb2FkLmluc3BlY3RvcklkID09PSBcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIENVU1RPTV9JTlNQRUNUT1IgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdFNjb3BlKHBheWxvYWQsIGkxOG4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYXBpLmFkZFRpbWVsaW5lTGF5ZXIoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVElNRUxJTkUgKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFZ1ZURldlRvb2xzTGFiZWxzW1widnVlLWkxOG4tdGltZWxpbmVcIiAvKiBUSU1FTElORSAqL10sXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnNbXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFRJTUVMSU5FICovXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG5mdW5jdGlvbiBnZXRJMThuU2NvcGVMYWJsZShpbnN0YW5jZSkge1xyXG4gICAgcmV0dXJuIChpbnN0YW5jZS50eXBlLm5hbWUgfHxcclxuICAgICAgICBpbnN0YW5jZS50eXBlLmRpc3BsYXlOYW1lIHx8XHJcbiAgICAgICAgaW5zdGFuY2UudHlwZS5fX2ZpbGUgfHxcclxuICAgICAgICAnQW5vbnltb3VzJyk7XHJcbn1cclxuZnVuY3Rpb24gdXBkYXRlQ29tcG9uZW50VHJlZVRhZ3MoaW5zdGFuY2UsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG50cmVlTm9kZSwgaTE4bikge1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBnbG9iYWwgPSBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcclxuICAgICAgICA/IGkxOG4uZ2xvYmFsXHJcbiAgICAgICAgOiBpMThuLmdsb2JhbC5fX2NvbXBvc2VyO1xyXG4gICAgaWYgKGluc3RhbmNlICYmIGluc3RhbmNlLnZub2RlLmVsICYmIGluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXykge1xyXG4gICAgICAgIC8vIGFkZCBjdXN0b20gdGFncyBsb2NhbCBzY29wZSBvbmx5XHJcbiAgICAgICAgaWYgKGluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyAhPT0gZ2xvYmFsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IHtcclxuICAgICAgICAgICAgICAgIGxhYmVsOiBgaTE4biAoJHtnZXRJMThuU2NvcGVMYWJsZShpbnN0YW5jZSl9IFNjb3BlKWAsXHJcbiAgICAgICAgICAgICAgICB0ZXh0Q29sb3I6IDB4MDAwMDAwLFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAweGZmY2QxOVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0cmVlTm9kZS50YWdzLnB1c2godGFnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5zcGVjdENvbXBvc2VyKGluc3RhbmNlRGF0YSwgY29tcG9zZXIpIHtcclxuICAgIGNvbnN0IHR5cGUgPSBWVUVfSTE4Tl9DT01QT05FTlRfVFlQRVM7XHJcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XHJcbiAgICAgICAgdHlwZSxcclxuICAgICAgICBrZXk6ICdsb2NhbGUnLFxyXG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlOiBjb21wb3Nlci5sb2NhbGUudmFsdWVcclxuICAgIH0pO1xyXG4gICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAga2V5OiAnYXZhaWxhYmxlTG9jYWxlcycsXHJcbiAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIHZhbHVlOiBjb21wb3Nlci5hdmFpbGFibGVMb2NhbGVzXHJcbiAgICB9KTtcclxuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIGtleTogJ2ZhbGxiYWNrTG9jYWxlJyxcclxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICB2YWx1ZTogY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWVcclxuICAgIH0pO1xyXG4gICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAga2V5OiAnaW5oZXJpdExvY2FsZScsXHJcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmluaGVyaXRMb2NhbGVcclxuICAgIH0pO1xyXG4gICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAga2V5OiAnbWVzc2FnZXMnLFxyXG4gICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICB2YWx1ZTogZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlKVxyXG4gICAgfSk7XHJcbiAgICB7XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBrZXk6ICdkYXRldGltZUZvcm1hdHMnLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5kYXRldGltZUZvcm1hdHMudmFsdWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgICAgIGtleTogJ251bWJlckZvcm1hdHMnLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5udW1iZXJGb3JtYXRzLnZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuZnVuY3Rpb24gZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKG1lc3NhZ2VzKSB7XHJcbiAgICBjb25zdCB2YWx1ZSA9IHt9O1xyXG4gICAgT2JqZWN0LmtleXMobWVzc2FnZXMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHYgPSBtZXNzYWdlc1trZXldO1xyXG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKHYpICYmICdzb3VyY2UnIGluIHYpIHtcclxuICAgICAgICAgICAgdmFsdWVba2V5XSA9IGdldE1lc3NhZ2VGdW5jdGlvbkRldGFpbHModik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHYpKSB7XHJcbiAgICAgICAgICAgIHZhbHVlW2tleV0gPSBnZXRMb2NhbGVNZXNzYWdlVmFsdWUodik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gdjtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG5jb25zdCBFU0MgPSB7XHJcbiAgICAnPCc6ICcmbHQ7JyxcclxuICAgICc+JzogJyZndDsnLFxyXG4gICAgJ1wiJzogJyZxdW90OycsXHJcbiAgICAnJic6ICcmYW1wOydcclxufTtcclxuZnVuY3Rpb24gZXNjYXBlKHMpIHtcclxuICAgIHJldHVybiBzLnJlcGxhY2UoL1s8PlwiJl0vZywgZXNjYXBlQ2hhcik7XHJcbn1cclxuZnVuY3Rpb24gZXNjYXBlQ2hhcihhKSB7XHJcbiAgICByZXR1cm4gRVNDW2FdIHx8IGE7XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuZnVuY3Rpb24gZ2V0TWVzc2FnZUZ1bmN0aW9uRGV0YWlscyhmdW5jKSB7XHJcbiAgICBjb25zdCBhcmdTdHJpbmcgPSBmdW5jLnNvdXJjZSA/IGAoXCIke2VzY2FwZShmdW5jLnNvdXJjZSl9XCIpYCA6IGAoPylgO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBfY3VzdG9tOiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmdW5jdGlvbicsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6IGA8c3Bhbj7Gkjwvc3Bhbj4gJHthcmdTdHJpbmd9YFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gcmVnaXN0ZXJTY29wZShwYXlsb2FkLCBpMThuKSB7XHJcbiAgICBwYXlsb2FkLnJvb3ROb2Rlcy5wdXNoKHtcclxuICAgICAgICBpZDogJ2dsb2JhbCcsXHJcbiAgICAgICAgbGFiZWw6ICdHbG9iYWwgU2NvcGUnXHJcbiAgICB9KTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgZ2xvYmFsID0gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXHJcbiAgICAgICAgPyBpMThuLmdsb2JhbFxyXG4gICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcclxuICAgIGZvciAoY29uc3QgW2tleUluc3RhbmNlLCBpbnN0YW5jZV0gb2YgaTE4bi5fX2luc3RhbmNlcykge1xyXG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXHJcbiAgICAgICAgICAgID8gaW5zdGFuY2VcclxuICAgICAgICAgICAgOiBpbnN0YW5jZS5fX2NvbXBvc2VyO1xyXG4gICAgICAgIGlmIChnbG9iYWwgPT09IGNvbXBvc2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwYXlsb2FkLnJvb3ROb2Rlcy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IGNvbXBvc2VyLmlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIGxhYmVsOiBgJHtnZXRJMThuU2NvcGVMYWJsZShrZXlJbnN0YW5jZSl9IFNjb3BlYFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldENvbXBvbmVudEluc3RhbmNlKG5vZGVJZCwgaTE4bikge1xyXG4gICAgbGV0IGluc3RhbmNlID0gbnVsbDtcclxuICAgIGlmIChub2RlSWQgIT09ICdnbG9iYWwnKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBbY29tcG9uZW50LCBjb21wb3Nlcl0gb2YgaTE4bi5fX2luc3RhbmNlcy5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgaWYgKGNvbXBvc2VyLmlkLnRvU3RyaW5nKCkgPT09IG5vZGVJZCkge1xyXG4gICAgICAgICAgICAgICAgaW5zdGFuY2UgPSBjb21wb25lbnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBpbnN0YW5jZTtcclxufVxyXG5mdW5jdGlvbiBnZXRDb21wb3NlciQxKG5vZGVJZCwgaTE4bikge1xyXG4gICAgaWYgKG5vZGVJZCA9PT0gJ2dsb2JhbCcpIHtcclxuICAgICAgICByZXR1cm4gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXHJcbiAgICAgICAgICAgID8gaTE4bi5nbG9iYWxcclxuICAgICAgICAgICAgOiBpMThuLmdsb2JhbC5fX2NvbXBvc2VyO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBBcnJheS5mcm9tKGkxOG4uX19pbnN0YW5jZXMudmFsdWVzKCkpLmZpbmQoaXRlbSA9PiBpdGVtLmlkLnRvU3RyaW5nKCkgPT09IG5vZGVJZCk7XHJcbiAgICAgICAgaWYgKGluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcclxuICAgICAgICAgICAgICAgID8gaW5zdGFuY2VcclxuICAgICAgICAgICAgICAgIDogaW5zdGFuY2UuX19jb21wb3NlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpbnNwZWN0U2NvcGUocGF5bG9hZCwgaTE4blxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4pIHtcclxuICAgIGNvbnN0IGNvbXBvc2VyID0gZ2V0Q29tcG9zZXIkMShwYXlsb2FkLm5vZGVJZCwgaTE4bik7XHJcbiAgICBpZiAoY29tcG9zZXIpIHtcclxuICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgcGF5bG9hZC5zdGF0ZSA9IG1ha2VTY29wZUluc3BlY3RTdGF0ZShjb21wb3Nlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5mdW5jdGlvbiBtYWtlU2NvcGVJbnNwZWN0U3RhdGUoY29tcG9zZXIpIHtcclxuICAgIGNvbnN0IHN0YXRlID0ge307XHJcbiAgICBjb25zdCBsb2NhbGVUeXBlID0gJ0xvY2FsZSByZWxhdGVkIGluZm8nO1xyXG4gICAgY29uc3QgbG9jYWxlU3RhdGVzID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogbG9jYWxlVHlwZSxcclxuICAgICAgICAgICAga2V5OiAnbG9jYWxlJyxcclxuICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5sb2NhbGUudmFsdWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogbG9jYWxlVHlwZSxcclxuICAgICAgICAgICAga2V5OiAnZmFsbGJhY2tMb2NhbGUnLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXHJcbiAgICAgICAgICAgIGtleTogJ2F2YWlsYWJsZUxvY2FsZXMnLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5hdmFpbGFibGVMb2NhbGVzXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXHJcbiAgICAgICAgICAgIGtleTogJ2luaGVyaXRMb2NhbGUnLFxyXG4gICAgICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmluaGVyaXRMb2NhbGVcclxuICAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgc3RhdGVbbG9jYWxlVHlwZV0gPSBsb2NhbGVTdGF0ZXM7XHJcbiAgICBjb25zdCBsb2NhbGVNZXNzYWdlc1R5cGUgPSAnTG9jYWxlIG1lc3NhZ2VzIGluZm8nO1xyXG4gICAgY29uc3QgbG9jYWxlTWVzc2FnZXNTdGF0ZXMgPSBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBsb2NhbGVNZXNzYWdlc1R5cGUsXHJcbiAgICAgICAgICAgIGtleTogJ21lc3NhZ2VzJyxcclxuICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlKVxyXG4gICAgICAgIH1cclxuICAgIF07XHJcbiAgICBzdGF0ZVtsb2NhbGVNZXNzYWdlc1R5cGVdID0gbG9jYWxlTWVzc2FnZXNTdGF0ZXM7XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzVHlwZSA9ICdEYXRldGltZSBmb3JtYXRzIGluZm8nO1xyXG4gICAgICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0c1N0YXRlcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZGF0ZXRpbWVGb3JtYXRzVHlwZSxcclxuICAgICAgICAgICAgICAgIGtleTogJ2RhdGV0aW1lRm9ybWF0cycsXHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHN0YXRlW2RhdGV0aW1lRm9ybWF0c1R5cGVdID0gZGF0ZXRpbWVGb3JtYXRzU3RhdGVzO1xyXG4gICAgICAgIGNvbnN0IG51bWJlckZvcm1hdHNUeXBlID0gJ0RhdGV0aW1lIGZvcm1hdHMgaW5mbyc7XHJcbiAgICAgICAgY29uc3QgbnVtYmVyRm9ybWF0c1N0YXRlcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogbnVtYmVyRm9ybWF0c1R5cGUsXHJcbiAgICAgICAgICAgICAgICBrZXk6ICdudW1iZXJGb3JtYXRzJyxcclxuICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5udW1iZXJGb3JtYXRzLnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIHN0YXRlW251bWJlckZvcm1hdHNUeXBlXSA9IG51bWJlckZvcm1hdHNTdGF0ZXM7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhdGU7XHJcbn1cclxuZnVuY3Rpb24gYWRkVGltZWxpbmVFdmVudChldmVudCwgcGF5bG9hZCkge1xyXG4gICAgaWYgKGRldnRvb2xzQXBpKSB7XHJcbiAgICAgICAgbGV0IGdyb3VwSWQ7XHJcbiAgICAgICAgaWYgKHBheWxvYWQgJiYgJ2dyb3VwSWQnIGluIHBheWxvYWQpIHtcclxuICAgICAgICAgICAgZ3JvdXBJZCA9IHBheWxvYWQuZ3JvdXBJZDtcclxuICAgICAgICAgICAgZGVsZXRlIHBheWxvYWQuZ3JvdXBJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGV2dG9vbHNBcGkuYWRkVGltZWxpbmVFdmVudCh7XHJcbiAgICAgICAgICAgIGxheWVySWQ6IFwidnVlLWkxOG4tdGltZWxpbmVcIiAvKiBUSU1FTElORSAqLyxcclxuICAgICAgICAgICAgZXZlbnQ6IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBldmVudCxcclxuICAgICAgICAgICAgICAgIGdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICAgICAgbWV0YToge30sXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBwYXlsb2FkIHx8IHt9LFxyXG4gICAgICAgICAgICAgICAgbG9nVHlwZTogZXZlbnQgPT09IFwiY29tcGlsZS1lcnJvclwiIC8qIENPTVBJTEVfRVJST1IgKi9cclxuICAgICAgICAgICAgICAgICAgICA/ICdlcnJvcidcclxuICAgICAgICAgICAgICAgICAgICA6IGV2ZW50ID09PSBcImZhbGxiYWNrXCIgLyogRkFMQkFDSyAqLyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCA9PT0gXCJtaXNzaW5nXCIgLyogTUlTU0lORyAqL1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICd3YXJuaW5nJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdkZWZhdWx0J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZWRpdFNjb3BlKHBheWxvYWQsIGkxOG4pIHtcclxuICAgIGNvbnN0IGNvbXBvc2VyID0gZ2V0Q29tcG9zZXIkMShwYXlsb2FkLm5vZGVJZCwgaTE4bik7XHJcbiAgICBpZiAoY29tcG9zZXIpIHtcclxuICAgICAgICBjb25zdCBbZmllbGRdID0gcGF5bG9hZC5wYXRoO1xyXG4gICAgICAgIGlmIChmaWVsZCA9PT0gJ2xvY2FsZScgJiYgaXNTdHJpbmcocGF5bG9hZC5zdGF0ZS52YWx1ZSkpIHtcclxuICAgICAgICAgICAgY29tcG9zZXIubG9jYWxlLnZhbHVlID0gcGF5bG9hZC5zdGF0ZS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT09ICdmYWxsYmFja0xvY2FsZScgJiZcclxuICAgICAgICAgICAgKGlzU3RyaW5nKHBheWxvYWQuc3RhdGUudmFsdWUpIHx8XHJcbiAgICAgICAgICAgICAgICBpc0FycmF5KHBheWxvYWQuc3RhdGUudmFsdWUpIHx8XHJcbiAgICAgICAgICAgICAgICBpc09iamVjdChwYXlsb2FkLnN0YXRlLnZhbHVlKSkpIHtcclxuICAgICAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWUgPSBwYXlsb2FkLnN0YXRlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmaWVsZCA9PT0gJ2luaGVyaXRMb2NhbGUnICYmIGlzQm9vbGVhbihwYXlsb2FkLnN0YXRlLnZhbHVlKSkge1xyXG4gICAgICAgICAgICBjb21wb3Nlci5pbmhlcml0TG9jYWxlID0gcGF5bG9hZC5zdGF0ZS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuLyoqXHJcbiAqIFN1cHBvcnRzIGNvbXBhdGliaWxpdHkgZm9yIGxlZ2FjeSB2dWUtaTE4biBBUElzXHJcbiAqIFRoaXMgbWl4aW4gaXMgdXNlZCB3aGVuIHdlIHVzZSB2dWUtaTE4bkB2OS54IG9yIGxhdGVyXHJcbiAqL1xyXG5mdW5jdGlvbiBkZWZpbmVNaXhpbih2dWVpMThuLCBjb21wb3NlciwgaTE4bikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBiZWZvcmVDcmVhdGUoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmkxOG4pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnNJMThuID0gb3B0aW9ucy5pMThuO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuX19pMThuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc0kxOG4uX19pMThuID0gb3B0aW9ucy5fX2kxOG47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zSTE4bi5fX3Jvb3QgPSBjb21wb3NlcjtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSB0aGlzLiRyb290KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IG1lcmdlVG9Sb290KHZ1ZWkxOG4sIG9wdGlvbnNJMThuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNJMThuLl9faW5qZWN0V2l0aE9wdGlvbiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IGNyZWF0ZVZ1ZUkxOG4ob3B0aW9uc0kxOG4pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMuX19pMThuKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcyA9PT0gdGhpcy4kcm9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4gPSBtZXJnZVRvUm9vdCh2dWVpMThuLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4gPSBjcmVhdGVWdWVJMThuKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX19pMThuOiBvcHRpb25zLl9faTE4bixcclxuICAgICAgICAgICAgICAgICAgICAgICAgX19pbmplY3RXaXRoT3B0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBfX3Jvb3Q6IGNvbXBvc2VyXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXQgZ2xvYmFsXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpMThuID0gdnVlaTE4bjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5fX2kxOG5HbG9iYWwpIHtcclxuICAgICAgICAgICAgICAgIGFkanVzdEkxOG5SZXNvdXJjZXMoY29tcG9zZXIsIG9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZ1ZWkxOG4uX19vbkNvbXBvbmVudEluc3RhbmNlQ3JlYXRlZCh0aGlzLiRpMThuKTtcclxuICAgICAgICAgICAgaTE4bi5fX3NldEluc3RhbmNlKGluc3RhbmNlLCB0aGlzLiRpMThuKTtcclxuICAgICAgICAgICAgLy8gZGVmaW5lcyB2dWUtaTE4biBsZWdhY3kgQVBJc1xyXG4gICAgICAgICAgICB0aGlzLiR0ID0gKC4uLmFyZ3MpID0+IHRoaXMuJGkxOG4udCguLi5hcmdzKTtcclxuICAgICAgICAgICAgdGhpcy4kcnQgPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi5ydCguLi5hcmdzKTtcclxuICAgICAgICAgICAgdGhpcy4kdGMgPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi50YyguLi5hcmdzKTtcclxuICAgICAgICAgICAgdGhpcy4kdGUgPSAoa2V5LCBsb2NhbGUpID0+IHRoaXMuJGkxOG4udGUoa2V5LCBsb2NhbGUpO1xyXG4gICAgICAgICAgICB0aGlzLiRkID0gKC4uLmFyZ3MpID0+IHRoaXMuJGkxOG4uZCguLi5hcmdzKTtcclxuICAgICAgICAgICAgdGhpcy4kbiA9ICguLi5hcmdzKSA9PiB0aGlzLiRpMThuLm4oLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHRtID0gKGtleSkgPT4gdGhpcy4kaTE4bi50bShrZXkpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW91bnRlZCgpIHtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcclxuICAgICAgICAgICAgICAgICFmYWxzZSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVsLl9fVlVFX0kxOE5fXyA9IHRoaXMuJGkxOG4uX19jb21wb3NlcjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSAodGhpcy5fX3ZfZW1pdHRlciA9XHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRW1pdHRlcigpKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IF92dWVJMThuID0gdGhpcy4kaTE4bjtcclxuICAgICAgICAgICAgICAgIF92dWVJMThuLl9fZW5hYmxlRW1pdHRlciAmJiBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIoZW1pdHRlcik7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLm9uKCcqJywgYWRkVGltZWxpbmVFdmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHVubW91bnRlZCgpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDdXJyZW50SW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJlxyXG4gICAgICAgICAgICAgICAgIWZhbHNlICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbCAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwuX19WVUVfSTE4Tl9fKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fX3ZfZW1pdHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX192X2VtaXR0ZXIub2ZmKCcqJywgYWRkVGltZWxpbmVFdmVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4kaTE4bikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF92dWVJMThuID0gdGhpcy4kaTE4bjtcclxuICAgICAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2Rpc2FibGVFbWl0dGVyICYmIF92dWVJMThuLl9fZGlzYWJsZUVtaXR0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy4kZWwuX19WVUVfSTE4Tl9fO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiR0O1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kcnQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiR0YztcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHRlO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kZDtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJG47XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiR0bTtcclxuICAgICAgICAgICAgaTE4bi5fX2RlbGV0ZUluc3RhbmNlKGluc3RhbmNlKTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJGkxOG47XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBtZXJnZVRvUm9vdChyb290LCBvcHRpb25zKSB7XHJcbiAgICByb290LmxvY2FsZSA9IG9wdGlvbnMubG9jYWxlIHx8IHJvb3QubG9jYWxlO1xyXG4gICAgcm9vdC5mYWxsYmFja0xvY2FsZSA9IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgfHwgcm9vdC5mYWxsYmFja0xvY2FsZTtcclxuICAgIHJvb3QubWlzc2luZyA9IG9wdGlvbnMubWlzc2luZyB8fCByb290Lm1pc3Npbmc7XHJcbiAgICByb290LnNpbGVudFRyYW5zbGF0aW9uV2FybiA9XHJcbiAgICAgICAgb3B0aW9ucy5zaWxlbnRUcmFuc2xhdGlvbldhcm4gfHwgcm9vdC5zaWxlbnRGYWxsYmFja1dhcm47XHJcbiAgICByb290LnNpbGVudEZhbGxiYWNrV2FybiA9XHJcbiAgICAgICAgb3B0aW9ucy5zaWxlbnRGYWxsYmFja1dhcm4gfHwgcm9vdC5zaWxlbnRGYWxsYmFja1dhcm47XHJcbiAgICByb290LmZvcm1hdEZhbGxiYWNrTWVzc2FnZXMgPVxyXG4gICAgICAgIG9wdGlvbnMuZm9ybWF0RmFsbGJhY2tNZXNzYWdlcyB8fCByb290LmZvcm1hdEZhbGxiYWNrTWVzc2FnZXM7XHJcbiAgICByb290LnBvc3RUcmFuc2xhdGlvbiA9IG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uIHx8IHJvb3QucG9zdFRyYW5zbGF0aW9uO1xyXG4gICAgcm9vdC53YXJuSHRtbEluTWVzc2FnZSA9IG9wdGlvbnMud2Fybkh0bWxJbk1lc3NhZ2UgfHwgcm9vdC53YXJuSHRtbEluTWVzc2FnZTtcclxuICAgIHJvb3QuZXNjYXBlUGFyYW1ldGVySHRtbCA9XHJcbiAgICAgICAgb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXJIdG1sIHx8IHJvb3QuZXNjYXBlUGFyYW1ldGVySHRtbDtcclxuICAgIHJvb3Quc3luYyA9IG9wdGlvbnMuc3luYyB8fCByb290LnN5bmM7XHJcbiAgICByb290Ll9fY29tcG9zZXJbU2V0UGx1cmFsUnVsZXNTeW1ib2xdKG9wdGlvbnMucGx1cmFsaXphdGlvblJ1bGVzIHx8IHJvb3QucGx1cmFsaXphdGlvblJ1bGVzKTtcclxuICAgIGNvbnN0IG1lc3NhZ2VzID0gZ2V0TG9jYWxlTWVzc2FnZXMocm9vdC5sb2NhbGUsIHtcclxuICAgICAgICBtZXNzYWdlczogb3B0aW9ucy5tZXNzYWdlcyxcclxuICAgICAgICBfX2kxOG46IG9wdGlvbnMuX19pMThuXHJcbiAgICB9KTtcclxuICAgIE9iamVjdC5rZXlzKG1lc3NhZ2VzKS5mb3JFYWNoKGxvY2FsZSA9PiByb290Lm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2VzW2xvY2FsZV0pKTtcclxuICAgIGlmIChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cykge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKS5mb3JFYWNoKGxvY2FsZSA9PiByb290Lm1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvcHRpb25zLmRhdGV0aW1lRm9ybWF0c1tsb2NhbGVdKSk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5udW1iZXJGb3JtYXRzKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5udW1iZXJGb3JtYXRzKS5mb3JFYWNoKGxvY2FsZSA9PiByb290Lm1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5udW1iZXJGb3JtYXRzW2xvY2FsZV0pKTtcclxuICAgIH1cclxuICAgIHJldHVybiByb290O1xyXG59XG5cbi8qKlxyXG4gKiBJbmplY3Rpb24ga2V5IGZvciB7QGxpbmsgdXNlSTE4bn1cclxuICpcclxuICogQHJlbWFya3NcclxuICogVGhlIGdsb2JhbCBpbmplY3Rpb24ga2V5IGZvciBJMThuIGluc3RhbmNlcyB3aXRoIGB1c2VJMThuYC4gdGhpcyBpbmplY3Rpb24ga2V5IGlzIHVzZWQgaW4gV2ViIENvbXBvbmVudHMuXHJcbiAqIFNwZWNpZnkgdGhlIGkxOG4gaW5zdGFuY2UgY3JlYXRlZCBieSB7QGxpbmsgY3JlYXRlSTE4bn0gdG9nZXRoZXIgd2l0aCBgcHJvdmlkZWAgZnVuY3Rpb24uXHJcbiAqXHJcbiAqIEBWdWVJMThuR2VuZXJhbFxyXG4gKi9cclxuY29uc3QgSTE4bkluamVjdGlvbktleSA9IFxyXG4vKiAjX19QVVJFX18qLyBtYWtlU3ltYm9sKCdnbG9iYWwtdnVlLWkxOG4nKTtcclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuZnVuY3Rpb24gY3JlYXRlSTE4bihvcHRpb25zID0ge30sIFZ1ZUkxOG5MZWdhY3kpIHtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX19sZWdhY3lNb2RlID0gX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX18gJiYgaXNCb29sZWFuKG9wdGlvbnMubGVnYWN5KVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMubGVnYWN5XHJcbiAgICAgICAgICAgIDogX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX187XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9fZ2xvYmFsSW5qZWN0aW9uID0gaXNCb29sZWFuKG9wdGlvbnMuZ2xvYmFsSW5qZWN0aW9uKVxyXG4gICAgICAgID8gb3B0aW9ucy5nbG9iYWxJbmplY3Rpb25cclxuICAgICAgICA6IHRydWU7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9fYWxsb3dDb21wb3NpdGlvbiA9IF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIF9fbGVnYWN5TW9kZVxyXG4gICAgICAgICAgICA/ICEhb3B0aW9ucy5hbGxvd0NvbXBvc2l0aW9uXHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IF9faW5zdGFuY2VzID0gbmV3IE1hcCgpO1xyXG4gICAgY29uc3QgW2dsb2JhbFNjb3BlLCBfX2dsb2JhbF0gPSBjcmVhdGVHbG9iYWwob3B0aW9ucywgX19sZWdhY3lNb2RlKTtcclxuICAgIGNvbnN0IHN5bWJvbCA9IG1ha2VTeW1ib2woKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpID8gJ3Z1ZS1pMThuJyA6ICcnKTtcclxuICAgIGZ1bmN0aW9uIF9fZ2V0SW5zdGFuY2UoY29tcG9uZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIF9faW5zdGFuY2VzLmdldChjb21wb25lbnQpIHx8IG51bGw7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBfX3NldEluc3RhbmNlKGNvbXBvbmVudCwgaW5zdGFuY2UpIHtcclxuICAgICAgICBfX2luc3RhbmNlcy5zZXQoY29tcG9uZW50LCBpbnN0YW5jZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBfX2RlbGV0ZUluc3RhbmNlKGNvbXBvbmVudCkge1xyXG4gICAgICAgIF9faW5zdGFuY2VzLmRlbGV0ZShjb21wb25lbnQpO1xyXG4gICAgfVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGkxOG4gPSB7XHJcbiAgICAgICAgICAgIC8vIG1vZGVcclxuICAgICAgICAgICAgZ2V0IG1vZGUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX18gJiYgX19sZWdhY3lNb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgPyAnbGVnYWN5J1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ2NvbXBvc2l0aW9uJztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gYWxsb3dDb21wb3NpdGlvblxyXG4gICAgICAgICAgICBnZXQgYWxsb3dDb21wb3NpdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfX2FsbG93Q29tcG9zaXRpb247XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGluc3RhbGwgcGx1Z2luXHJcbiAgICAgICAgICAgIGFzeW5jIGluc3RhbGwoYXBwLCAuLi5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXHJcbiAgICAgICAgICAgICAgICAgICAgIWZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLl9fVlVFX0kxOE5fXyA9IGkxOG47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBzZXR1cCBnbG9iYWwgcHJvdmlkZXJcclxuICAgICAgICAgICAgICAgIGFwcC5fX1ZVRV9JMThOX1NZTUJPTF9fID0gc3ltYm9sO1xyXG4gICAgICAgICAgICAgICAgYXBwLnByb3ZpZGUoYXBwLl9fVlVFX0kxOE5fU1lNQk9MX18sIGkxOG4pO1xyXG4gICAgICAgICAgICAgICAgLy8gZ2xvYmFsIG1ldGhvZCBhbmQgcHJvcGVydGllcyBpbmplY3Rpb24gZm9yIENvbXBvc2l0aW9uIEFQSVxyXG4gICAgICAgICAgICAgICAgaWYgKCFfX2xlZ2FjeU1vZGUgJiYgX19nbG9iYWxJbmplY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmplY3RHbG9iYWxGaWVsZHMoYXBwLCBpMThuLmdsb2JhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpbnN0YWxsIGJ1aWx0LWluIGNvbXBvbmVudHMgYW5kIGRpcmVjdGl2ZVxyXG4gICAgICAgICAgICAgICAgaWYgKF9fVlVFX0kxOE5fRlVMTF9JTlNUQUxMX18pIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHBseShhcHAsIGkxOG4sIC4uLm9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gc2V0dXAgbWl4aW4gZm9yIExlZ2FjeSBBUElcclxuICAgICAgICAgICAgICAgIGlmIChfX1ZVRV9JMThOX0xFR0FDWV9BUElfXyAmJiBfX2xlZ2FjeU1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBhcHAubWl4aW4oZGVmaW5lTWl4aW4oX19nbG9iYWwsIF9fZ2xvYmFsLl9fY29tcG9zZXIsIGkxOG4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHJlbGVhc2UgZ2xvYmFsIHNjb3BlXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1bm1vdW50QXBwID0gYXBwLnVubW91bnQ7XHJcbiAgICAgICAgICAgICAgICBhcHAudW5tb3VudCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpMThuLmRpc3Bvc2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB1bm1vdW50QXBwKCk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0dXAgdnVlLWRldnRvb2xzIHBsdWdpblxyXG4gICAgICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJiAhZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXQgPSBhd2FpdCBlbmFibGVEZXZUb29scyhhcHAsIGkxOG4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmV0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5DQU5OT1RfU0VUVVBfVlVFX0RFVlRPT0xTX1BMVUdJTik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjcmVhdGVFbWl0dGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9fbGVnYWN5TW9kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBfdnVlSTE4biA9IF9fZ2xvYmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIgJiYgX3Z1ZUkxOG4uX19lbmFibGVFbWl0dGVyKGVtaXR0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX2NvbXBvc2VyID0gX19nbG9iYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9jb21wb3NlcltFbmFibGVFbWl0dGVyXSAmJiBfY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0oZW1pdHRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZ2xvYmFsIGFjY2Vzc29yXHJcbiAgICAgICAgICAgIGdldCBnbG9iYWwoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX19nbG9iYWw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRpc3Bvc2UoKSB7XHJcbiAgICAgICAgICAgICAgICBnbG9iYWxTY29wZS5zdG9wKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIEBpbnRlcm5hbFxyXG4gICAgICAgICAgICBfX2luc3RhbmNlcyxcclxuICAgICAgICAgICAgLy8gQGludGVybmFsXHJcbiAgICAgICAgICAgIF9fZ2V0SW5zdGFuY2UsXHJcbiAgICAgICAgICAgIC8vIEBpbnRlcm5hbFxyXG4gICAgICAgICAgICBfX3NldEluc3RhbmNlLFxyXG4gICAgICAgICAgICAvLyBAaW50ZXJuYWxcclxuICAgICAgICAgICAgX19kZWxldGVJbnN0YW5jZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIGkxOG47XHJcbiAgICB9XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuZnVuY3Rpb24gdXNlSTE4bihvcHRpb25zID0ge30pIHtcclxuICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XHJcbiAgICBpZiAoaW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5NVVNUX0JFX0NBTExfU0VUVVBfVE9QKTtcclxuICAgIH1cclxuICAgIGlmICghaW5zdGFuY2UuaXNDRSAmJlxyXG4gICAgICAgIGluc3RhbmNlLmFwcENvbnRleHQuYXBwICE9IG51bGwgJiZcclxuICAgICAgICAhaW5zdGFuY2UuYXBwQ29udGV4dC5hcHAuX19WVUVfSTE4Tl9TWU1CT0xfXykge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5OT1RfSU5TTEFMTEVEKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGkxOG4gPSBnZXRJMThuSW5zdGFuY2UoaW5zdGFuY2UpO1xyXG4gICAgY29uc3QgZ2xvYmFsID0gZ2V0R2xvYmFsQ29tcG9zZXIoaTE4bik7XHJcbiAgICBjb25zdCBjb21wb25lbnRPcHRpb25zID0gZ2V0Q29tcG9uZW50T3B0aW9ucyhpbnN0YW5jZSk7XHJcbiAgICBjb25zdCBzY29wZSA9IGdldFNjb3BlKG9wdGlvbnMsIGNvbXBvbmVudE9wdGlvbnMpO1xyXG4gICAgaWYgKF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICBpZiAoaTE4bi5tb2RlID09PSAnbGVnYWN5JyAmJiAhb3B0aW9ucy5fX3VzZUNvbXBvbmVudCkge1xyXG4gICAgICAgICAgICBpZiAoIWkxOG4uYWxsb3dDb21wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLk5PVF9BVkFJTEFCTEVfSU5fTEVHQUNZX01PREUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB1c2VJMThuRm9yTGVnYWN5KGluc3RhbmNlLCBzY29wZSwgZ2xvYmFsLCBvcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2NvcGUgPT09ICdnbG9iYWwnKSB7XHJcbiAgICAgICAgYWRqdXN0STE4blJlc291cmNlcyhnbG9iYWwsIG9wdGlvbnMsIGNvbXBvbmVudE9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBnbG9iYWw7XHJcbiAgICB9XHJcbiAgICBpZiAoc2NvcGUgPT09ICdwYXJlbnQnKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICBsZXQgY29tcG9zZXIgPSBnZXRDb21wb3NlcihpMThuLCBpbnN0YW5jZSwgb3B0aW9ucy5fX3VzZUNvbXBvbmVudCk7XHJcbiAgICAgICAgaWYgKGNvbXBvc2VyID09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xyXG4gICAgICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9GT1VORF9QQVJFTlRfU0NPUEUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb21wb3NlciA9IGdsb2JhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbXBvc2VyO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaTE4bkludGVybmFsID0gaTE4bjtcclxuICAgIGxldCBjb21wb3NlciA9IGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGluc3RhbmNlKTtcclxuICAgIGlmIChjb21wb3NlciA9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgY29tcG9zZXJPcHRpb25zID0gYXNzaWduKHt9LCBvcHRpb25zKTtcclxuICAgICAgICBpZiAoJ19faTE4bicgaW4gY29tcG9uZW50T3B0aW9ucykge1xyXG4gICAgICAgICAgICBjb21wb3Nlck9wdGlvbnMuX19pMThuID0gY29tcG9uZW50T3B0aW9ucy5fX2kxOG47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnbG9iYWwpIHtcclxuICAgICAgICAgICAgY29tcG9zZXJPcHRpb25zLl9fcm9vdCA9IGdsb2JhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29tcG9zZXIgPSBjcmVhdGVDb21wb3Nlcihjb21wb3Nlck9wdGlvbnMpO1xyXG4gICAgICAgIHNldHVwTGlmZUN5Y2xlKGkxOG5JbnRlcm5hbCwgaW5zdGFuY2UsIGNvbXBvc2VyKTtcclxuICAgICAgICBpMThuSW50ZXJuYWwuX19zZXRJbnN0YW5jZShpbnN0YW5jZSwgY29tcG9zZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvc2VyO1xyXG59XHJcbi8qKlxyXG4gKiBDYXN0IHRvIFZ1ZUkxOG4gbGVnYWN5IGNvbXBhdGlibGUgdHlwZVxyXG4gKlxyXG4gKiBAcmVtYXJrc1xyXG4gKiBUaGlzIEFQSSBpcyBwcm92aWRlZCBvbmx5IHdpdGggW3Z1ZS1pMThuLWJyaWRnZV0oaHR0cHM6Ly92dWUtaTE4bi5pbnRsaWZ5LmRldi9ndWlkZS9taWdyYXRpb24vd2F5cy5odG1sI3doYXQtaXMtdnVlLWkxOG4tYnJpZGdlKS5cclxuICpcclxuICogVGhlIHB1cnBvc2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBjb252ZXJ0IGFuIHtAbGluayBJMThufSBpbnN0YW5jZSBjcmVhdGVkIHdpdGgge0BsaW5rIGNyZWF0ZUkxOG4gfCBjcmVhdGVJMThuKGxlZ2FjeTogdHJ1ZSl9IGludG8gYSBgdnVlLWkxOG5AdjgueGAgY29tcGF0aWJsZSBpbnN0YW5jZSBvZiBgbmV3IFZ1ZUkxOG5gIGluIGEgVHlwZVNjcmlwdCBlbnZpcm9ubWVudC5cclxuICpcclxuICogQHBhcmFtIGkxOG4gLSBBbiBpbnN0YW5jZSBvZiB7QGxpbmsgSTE4bn1cclxuICogQHJldHVybnMgQSBpMThuIGluc3RhbmNlIHdoaWNoIGlzIGNhc3RlZCB0byB7QGxpbmsgVnVlSTE4bn0gdHlwZVxyXG4gKlxyXG4gKiBAVnVlSTE4blRpcFxyXG4gKiA6bmV3OiBwcm92aWRlZCBieSAqKnZ1ZS1pMThuLWJyaWRnZSBvbmx5KipcclxuICpcclxuICogQFZ1ZUkxOG5HZW5lcmFsXHJcbiAqL1xyXG5jb25zdCBjYXN0VG9WdWVJMThuID0gIChpMThuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbikgPT4ge1xyXG4gICAgaWYgKCEoX19WVUVfSTE4Tl9CUklER0VfXyBpbiBpMThuKSkge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5OT1RfQ09NUEFUSUJMRV9MRUdBQ1lfVlVFX0kxOE4pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGkxOG47XHJcbn07XHJcbmZ1bmN0aW9uIGNyZWF0ZUdsb2JhbChvcHRpb25zLCBsZWdhY3lNb2RlLCBWdWVJMThuTGVnYWN5IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4pIHtcclxuICAgIGNvbnN0IHNjb3BlID0gZWZmZWN0U2NvcGUoKTtcclxuICAgIHtcclxuICAgICAgICBjb25zdCBvYmogPSBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXyAmJiBsZWdhY3lNb2RlXHJcbiAgICAgICAgICAgID8gc2NvcGUucnVuKCgpID0+IGNyZWF0ZVZ1ZUkxOG4ob3B0aW9ucykpXHJcbiAgICAgICAgICAgIDogc2NvcGUucnVuKCgpID0+IGNyZWF0ZUNvbXBvc2VyKG9wdGlvbnMpKTtcclxuICAgICAgICBpZiAob2JqID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gW3Njb3BlLCBvYmpdO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdldEkxOG5JbnN0YW5jZShpbnN0YW5jZSkge1xyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGkxOG4gPSBpbmplY3QoIWluc3RhbmNlLmlzQ0VcclxuICAgICAgICAgICAgPyBpbnN0YW5jZS5hcHBDb250ZXh0LmFwcC5fX1ZVRV9JMThOX1NZTUJPTF9fXHJcbiAgICAgICAgICAgIDogSTE4bkluamVjdGlvbktleSk7XHJcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgaWYgKCFpMThuKSB7XHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcighaW5zdGFuY2UuaXNDRVxyXG4gICAgICAgICAgICAgICAgPyBJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SXHJcbiAgICAgICAgICAgICAgICA6IEkxOG5FcnJvckNvZGVzLk5PVF9JTlNMQUxMRURfV0lUSF9QUk9WSURFKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGkxOG47XHJcbiAgICB9XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuZnVuY3Rpb24gZ2V0U2NvcGUob3B0aW9ucywgY29tcG9uZW50T3B0aW9ucykge1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICByZXR1cm4gaXNFbXB0eU9iamVjdChvcHRpb25zKVxyXG4gICAgICAgID8gKCdfX2kxOG4nIGluIGNvbXBvbmVudE9wdGlvbnMpXHJcbiAgICAgICAgICAgID8gJ2xvY2FsJ1xyXG4gICAgICAgICAgICA6ICdnbG9iYWwnXHJcbiAgICAgICAgOiAhb3B0aW9ucy51c2VTY29wZVxyXG4gICAgICAgICAgICA/ICdsb2NhbCdcclxuICAgICAgICAgICAgOiBvcHRpb25zLnVzZVNjb3BlO1xyXG59XHJcbmZ1bmN0aW9uIGdldEdsb2JhbENvbXBvc2VyKGkxOG4pIHtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgcmV0dXJuIGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xyXG4gICAgICAgICAgICA/IGkxOG4uZ2xvYmFsXHJcbiAgICAgICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlclxyXG4gICAgICAgIDtcclxufVxyXG5mdW5jdGlvbiBnZXRDb21wb3NlcihpMThuLCB0YXJnZXQsIHVzZUNvbXBvbmVudCA9IGZhbHNlKSB7XHJcbiAgICBsZXQgY29tcG9zZXIgPSBudWxsO1xyXG4gICAgY29uc3Qgcm9vdCA9IHRhcmdldC5yb290O1xyXG4gICAgbGV0IGN1cnJlbnQgPSB0YXJnZXQucGFyZW50O1xyXG4gICAgd2hpbGUgKGN1cnJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGkxOG5JbnRlcm5hbCA9IGkxOG47XHJcbiAgICAgICAgaWYgKGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJykge1xyXG4gICAgICAgICAgICBjb21wb3NlciA9IGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGN1cnJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2dWVJMThuID0gaTE4bkludGVybmFsLl9fZ2V0SW5zdGFuY2UoY3VycmVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAodnVlSTE4biAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9zZXIgPSB2dWVJMThuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5fX2NvbXBvc2VyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VDb21wb25lbnQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zZXIgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgIWNvbXBvc2VyW0luZWpjdFdpdGhPcHRpb25dIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb3NlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjb21wb3NlciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm9vdCA9PT0gY3VycmVudCkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbXBvc2VyO1xyXG59XHJcbmZ1bmN0aW9uIHNldHVwTGlmZUN5Y2xlKGkxOG4sIHRhcmdldCwgY29tcG9zZXIpIHtcclxuICAgIGxldCBlbWl0dGVyID0gbnVsbDtcclxuICAgIHtcclxuICAgICAgICBvbk1vdW50ZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBpbmplY3QgY29tcG9zZXIgaW5zdGFuY2UgdG8gRE9NIGZvciBpbnRsaWZ5LWRldnRvb2xzXHJcbiAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcclxuICAgICAgICAgICAgICAgICFmYWxzZSAmJlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZub2RlLmVsKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQudm5vZGUuZWwuX19WVUVfSTE4Tl9fID0gY29tcG9zZXI7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyID0gY3JlYXRlRW1pdHRlcigpO1xyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgICAgIGNvbnN0IF9jb21wb3NlciA9IGNvbXBvc2VyO1xyXG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdICYmIF9jb21wb3NlcltFbmFibGVFbWl0dGVyXShlbWl0dGVyKTtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIub24oJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRhcmdldCk7XHJcbiAgICAgICAgb25Vbm1vdW50ZWQoKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyByZW1vdmUgY29tcG9zZXIgaW5zdGFuY2UgZnJvbSBET00gZm9yIGludGxpZnktZGV2dG9vbHNcclxuICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJlxyXG4gICAgICAgICAgICAgICAgIWZhbHNlICYmXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQudm5vZGUuZWwgJiZcclxuICAgICAgICAgICAgICAgIHRhcmdldC52bm9kZS5lbC5fX1ZVRV9JMThOX18pIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIgJiYgZW1pdHRlci5vZmYoJyonLCBhZGRUaW1lbGluZUV2ZW50KTtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfY29tcG9zZXIgPSBjb21wb3NlcjtcclxuICAgICAgICAgICAgICAgIF9jb21wb3NlcltEaXNhYmxlRW1pdHRlcl0gJiYgX2NvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSgpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRhcmdldC52bm9kZS5lbC5fX1ZVRV9JMThOX187XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaTE4bi5fX2RlbGV0ZUluc3RhbmNlKHRhcmdldCk7XHJcbiAgICAgICAgfSwgdGFyZ2V0KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiB1c2VJMThuRm9yTGVnYWN5KGluc3RhbmNlLCBzY29wZSwgcm9vdCwgb3B0aW9ucyA9IHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4pIHtcclxuICAgIGNvbnN0IGlzTG9jYWxlID0gc2NvcGUgPT09ICdsb2NhbCc7XHJcbiAgICBjb25zdCBfY29tcG9zZXIgPSBzaGFsbG93UmVmKG51bGwpO1xyXG4gICAgaWYgKGlzTG9jYWxlICYmXHJcbiAgICAgICAgaW5zdGFuY2UucHJveHkgJiZcclxuICAgICAgICAhKGluc3RhbmNlLnByb3h5LiRvcHRpb25zLmkxOG4gfHwgaW5zdGFuY2UucHJveHkuJG9wdGlvbnMuX19pMThuKSkge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5NVVNUX0RFRklORV9JMThOX09QVElPTl9JTl9BTExPV19DT01QT1NJVElPTik7XHJcbiAgICB9XHJcbiAgICBjb25zdCBfaW5oZXJpdExvY2FsZSA9IGlzQm9vbGVhbihvcHRpb25zLmluaGVyaXRMb2NhbGUpXHJcbiAgICAgICAgPyBvcHRpb25zLmluaGVyaXRMb2NhbGVcclxuICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBfbG9jYWxlID0gcmVmKFxyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBpc0xvY2FsZSAmJiBfaW5oZXJpdExvY2FsZVxyXG4gICAgICAgID8gcm9vdC5sb2NhbGUudmFsdWVcclxuICAgICAgICA6IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMubG9jYWxlXHJcbiAgICAgICAgICAgIDogREVGQVVMVF9MT0NBTEUpO1xyXG4gICAgY29uc3QgX2ZhbGxiYWNrTG9jYWxlID0gcmVmKFxyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBpc0xvY2FsZSAmJiBfaW5oZXJpdExvY2FsZVxyXG4gICAgICAgID8gcm9vdC5mYWxsYmFja0xvY2FsZS52YWx1ZVxyXG4gICAgICAgIDogaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICAgICAgaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxyXG4gICAgICAgICAgICBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XHJcbiAgICAgICAgICAgIG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUgPT09IGZhbHNlXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxyXG4gICAgICAgICAgICA6IF9sb2NhbGUudmFsdWUpO1xyXG4gICAgY29uc3QgX21lc3NhZ2VzID0gcmVmKGdldExvY2FsZU1lc3NhZ2VzKF9sb2NhbGUudmFsdWUsIG9wdGlvbnMpKTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX2RhdGV0aW1lRm9ybWF0cyA9IHJlZihpc1BsYWluT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKVxyXG4gICAgICAgID8gb3B0aW9ucy5kYXRldGltZUZvcm1hdHNcclxuICAgICAgICA6IHsgW19sb2NhbGUudmFsdWVdOiB7fSB9KTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX251bWJlckZvcm1hdHMgPSByZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpXHJcbiAgICAgICAgPyBvcHRpb25zLm51bWJlckZvcm1hdHNcclxuICAgICAgICA6IHsgW19sb2NhbGUudmFsdWVdOiB7fSB9KTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX21pc3NpbmdXYXJuID0gaXNMb2NhbGVcclxuICAgICAgICA/IHJvb3QubWlzc2luZ1dhcm5cclxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLm1pc3NpbmdXYXJuKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMubWlzc2luZ1dhcm5cclxuICAgICAgICAgICAgOiB0cnVlO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBfZmFsbGJhY2tXYXJuID0gaXNMb2NhbGVcclxuICAgICAgICA/IHJvb3QuZmFsbGJhY2tXYXJuXHJcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pIHx8IGlzUmVnRXhwKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX2ZhbGxiYWNrUm9vdCA9IGlzTG9jYWxlXHJcbiAgICAgICAgPyByb290LmZhbGxiYWNrUm9vdFxyXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tSb290KVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tSb290XHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIC8vIGNvbmZpZ3VyZSBmYWxsIGJhY2sgdG8gcm9vdFxyXG4gICAgY29uc3QgX2ZhbGxiYWNrRm9ybWF0ID0gISFvcHRpb25zLmZhbGxiYWNrRm9ybWF0O1xyXG4gICAgLy8gcnVudGltZSBtaXNzaW5nXHJcbiAgICBjb25zdCBfbWlzc2luZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5taXNzaW5nKSA/IG9wdGlvbnMubWlzc2luZyA6IG51bGw7XHJcbiAgICAvLyBwb3N0VHJhbnNsYXRpb24gaGFuZGxlclxyXG4gICAgY29uc3QgX3Bvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXHJcbiAgICAgICAgPyBvcHRpb25zLnBvc3RUcmFuc2xhdGlvblxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX3dhcm5IdG1sTWVzc2FnZSA9IGlzTG9jYWxlXHJcbiAgICAgICAgPyByb290Lndhcm5IdG1sTWVzc2FnZVxyXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlXHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IF9lc2NhcGVQYXJhbWV0ZXIgPSAhIW9wdGlvbnMuZXNjYXBlUGFyYW1ldGVyO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBfbW9kaWZpZXJzID0gaXNMb2NhbGVcclxuICAgICAgICA/IHJvb3QubW9kaWZpZXJzXHJcbiAgICAgICAgOiBpc1BsYWluT2JqZWN0KG9wdGlvbnMubW9kaWZpZXJzKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMubW9kaWZpZXJzXHJcbiAgICAgICAgICAgIDoge307XHJcbiAgICAvLyBwbHVyYWxSdWxlc1xyXG4gICAgY29uc3QgX3BsdXJhbFJ1bGVzID0gb3B0aW9ucy5wbHVyYWxSdWxlcyB8fCAoaXNMb2NhbGUgJiYgcm9vdC5wbHVyYWxSdWxlcyk7XHJcbiAgICAvLyB0cmFjayByZWFjdGl2aXR5XHJcbiAgICBmdW5jdGlvbiB0cmFja1JlYWN0aXZpdHlWYWx1ZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSxcclxuICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlLFxyXG4gICAgICAgICAgICBfbWVzc2FnZXMudmFsdWUsXHJcbiAgICAgICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWUsXHJcbiAgICAgICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuICAgIC8vIGxvY2FsZVxyXG4gICAgY29uc3QgbG9jYWxlID0gY29tcHV0ZWQoe1xyXG4gICAgICAgIGdldDogKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmxvY2FsZS52YWx1ZSA6IF9sb2NhbGUudmFsdWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQ6IHZhbCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5sb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIGZhbGxiYWNrTG9jYWxlXHJcbiAgICBjb25zdCBmYWxsYmFja0xvY2FsZSA9IGNvbXB1dGVkKHtcclxuICAgICAgICBnZXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxyXG4gICAgICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tMb2NhbGUudmFsdWVcclxuICAgICAgICAgICAgICAgIDogX2ZhbGxiYWNrTG9jYWxlLnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xyXG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gbWVzc2FnZXNcclxuICAgIGNvbnN0IG1lc3NhZ2VzID0gY29tcHV0ZWQoKCkgPT4ge1xyXG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZS5tZXNzYWdlcy52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgIHJldHVybiBfbWVzc2FnZXMudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRldGltZUZvcm1hdHMgPSBjb21wdXRlZCgoKSA9PiBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlKTtcclxuICAgIGNvbnN0IG51bWJlckZvcm1hdHMgPSBjb21wdXRlZCgoKSA9PiBfbnVtYmVyRm9ybWF0cy52YWx1ZSk7XHJcbiAgICBmdW5jdGlvbiBnZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKCkge1xyXG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcclxuICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUuZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcigpXHJcbiAgICAgICAgICAgIDogX3Bvc3RUcmFuc2xhdGlvbjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoaGFuZGxlcikge1xyXG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoaGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0TWlzc2luZ0hhbmRsZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5nZXRNaXNzaW5nSGFuZGxlcigpIDogX21pc3Npbmc7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRNaXNzaW5nSGFuZGxlcihoYW5kbGVyKSB7XHJcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gd2FycFdpdGhEZXBzKGZuKSB7XHJcbiAgICAgICAgdHJhY2tSZWFjdGl2aXR5VmFsdWVzKCk7XHJcbiAgICAgICAgcmV0dXJuIGZuKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0KC4uLmFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXHJcbiAgICAgICAgICAgID8gd2FycFdpdGhEZXBzKCgpID0+IFJlZmxlY3QuYXBwbHkoX2NvbXBvc2VyLnZhbHVlLnQsIG51bGwsIFsuLi5hcmdzXSkpXHJcbiAgICAgICAgICAgIDogd2FycFdpdGhEZXBzKCgpID0+ICcnKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJ0KC4uLmFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXHJcbiAgICAgICAgICAgID8gUmVmbGVjdC5hcHBseShfY29tcG9zZXIudmFsdWUucnQsIG51bGwsIFsuLi5hcmdzXSlcclxuICAgICAgICAgICAgOiAnJztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGQoLi4uYXJncykge1xyXG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcclxuICAgICAgICAgICAgPyB3YXJwV2l0aERlcHMoKCkgPT4gUmVmbGVjdC5hcHBseShfY29tcG9zZXIudmFsdWUuZCwgbnVsbCwgWy4uLmFyZ3NdKSlcclxuICAgICAgICAgICAgOiB3YXJwV2l0aERlcHMoKCkgPT4gJycpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbiguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxyXG4gICAgICAgICAgICA/IHdhcnBXaXRoRGVwcygoKSA9PiBSZWZsZWN0LmFwcGx5KF9jb21wb3Nlci52YWx1ZS5uLCBudWxsLCBbLi4uYXJnc10pKVxyXG4gICAgICAgICAgICA6IHdhcnBXaXRoRGVwcygoKSA9PiAnJyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0bShrZXkpIHtcclxuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLnRtKGtleSkgOiB7fTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHRlKGtleSwgbG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS50ZShrZXksIGxvY2FsZSkgOiBmYWxzZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldExvY2FsZU1lc3NhZ2UobG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5nZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSkgOiB7fTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldExvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuc2V0TG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSA9IG1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZ2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlKSA6IHt9O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5zZXREYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSA9IGZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBtZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSkgOiB7fTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldE51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldE51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3Qgd3JhcHBlciA9IHtcclxuICAgICAgICBnZXQgaWQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuaWQgOiAtMTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvY2FsZSxcclxuICAgICAgICBmYWxsYmFja0xvY2FsZSxcclxuICAgICAgICBtZXNzYWdlcyxcclxuICAgICAgICBkYXRldGltZUZvcm1hdHMsXHJcbiAgICAgICAgbnVtYmVyRm9ybWF0cyxcclxuICAgICAgICBnZXQgaW5oZXJpdExvY2FsZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5pbmhlcml0TG9jYWxlIDogX2luaGVyaXRMb2NhbGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgaW5oZXJpdExvY2FsZSh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmluaGVyaXRMb2NhbGUgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBhdmFpbGFibGVMb2NhbGVzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXHJcbiAgICAgICAgICAgICAgICA/IF9jb21wb3Nlci52YWx1ZS5hdmFpbGFibGVMb2NhbGVzXHJcbiAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKF9tZXNzYWdlcy52YWx1ZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgbW9kaWZpZXJzKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5tb2RpZmllcnMgOiBfbW9kaWZpZXJzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBwbHVyYWxSdWxlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUucGx1cmFsUnVsZXMgOiBfcGx1cmFsUnVsZXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IGlzR2xvYmFsKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmlzR2xvYmFsIDogZmFsc2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgbWlzc2luZ1dhcm4oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUubWlzc2luZ1dhcm4gOiBfbWlzc2luZ1dhcm47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgbWlzc2luZ1dhcm4odmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5taXNzaW5nV2FybiA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IGZhbGxiYWNrV2FybigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja1dhcm4gOiBfZmFsbGJhY2tXYXJuO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGZhbGxiYWNrV2Fybih2YWwpIHtcclxuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLm1pc3NpbmdXYXJuID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgZmFsbGJhY2tSb290KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrUm9vdCA6IF9mYWxsYmFja1Jvb3Q7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgZmFsbGJhY2tSb290KHZhbCkge1xyXG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tSb290ID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgZmFsbGJhY2tGb3JtYXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tGb3JtYXQgOiBfZmFsbGJhY2tGb3JtYXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgZmFsbGJhY2tGb3JtYXQodmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja0Zvcm1hdCA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IHdhcm5IdG1sTWVzc2FnZSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxyXG4gICAgICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUud2Fybkh0bWxNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICA6IF93YXJuSHRtbE1lc3NhZ2U7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgd2Fybkh0bWxNZXNzYWdlKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUud2Fybkh0bWxNZXNzYWdlID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgZXNjYXBlUGFyYW1ldGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXHJcbiAgICAgICAgICAgICAgICA/IF9jb21wb3Nlci52YWx1ZS5lc2NhcGVQYXJhbWV0ZXJcclxuICAgICAgICAgICAgICAgIDogX2VzY2FwZVBhcmFtZXRlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCBlc2NhcGVQYXJhbWV0ZXIodmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5lc2NhcGVQYXJhbWV0ZXIgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHQsXHJcbiAgICAgICAgZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcixcclxuICAgICAgICBzZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyLFxyXG4gICAgICAgIGdldE1pc3NpbmdIYW5kbGVyLFxyXG4gICAgICAgIHNldE1pc3NpbmdIYW5kbGVyLFxyXG4gICAgICAgIHJ0LFxyXG4gICAgICAgIGQsXHJcbiAgICAgICAgbixcclxuICAgICAgICB0bSxcclxuICAgICAgICB0ZSxcclxuICAgICAgICBnZXRMb2NhbGVNZXNzYWdlLFxyXG4gICAgICAgIHNldExvY2FsZU1lc3NhZ2UsXHJcbiAgICAgICAgbWVyZ2VMb2NhbGVNZXNzYWdlLFxyXG4gICAgICAgIGdldERhdGVUaW1lRm9ybWF0LFxyXG4gICAgICAgIHNldERhdGVUaW1lRm9ybWF0LFxyXG4gICAgICAgIG1lcmdlRGF0ZVRpbWVGb3JtYXQsXHJcbiAgICAgICAgZ2V0TnVtYmVyRm9ybWF0LFxyXG4gICAgICAgIHNldE51bWJlckZvcm1hdCxcclxuICAgICAgICBtZXJnZU51bWJlckZvcm1hdFxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIHN5bmMoY29tcG9zZXIpIHtcclxuICAgICAgICBjb21wb3Nlci5sb2NhbGUudmFsdWUgPSBfbG9jYWxlLnZhbHVlO1xyXG4gICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlID0gX2ZhbGxiYWNrTG9jYWxlLnZhbHVlO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKF9tZXNzYWdlcy52YWx1ZSkuZm9yRWFjaChsb2NhbGUgPT4ge1xyXG4gICAgICAgICAgICBjb21wb3Nlci5tZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSkuZm9yRWFjaChsb2NhbGUgPT4ge1xyXG4gICAgICAgICAgICBjb21wb3Nlci5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZVtsb2NhbGVdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3Qua2V5cyhfbnVtYmVyRm9ybWF0cy52YWx1ZSkuZm9yRWFjaChsb2NhbGUgPT4ge1xyXG4gICAgICAgICAgICBjb21wb3Nlci5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIF9udW1iZXJGb3JtYXRzLnZhbHVlW2xvY2FsZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbXBvc2VyLmVzY2FwZVBhcmFtZXRlciA9IF9lc2NhcGVQYXJhbWV0ZXI7XHJcbiAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tGb3JtYXQgPSBfZmFsbGJhY2tGb3JtYXQ7XHJcbiAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tSb290ID0gX2ZhbGxiYWNrUm9vdDtcclxuICAgICAgICBjb21wb3Nlci5mYWxsYmFja1dhcm4gPSBfZmFsbGJhY2tXYXJuO1xyXG4gICAgICAgIGNvbXBvc2VyLm1pc3NpbmdXYXJuID0gX21pc3NpbmdXYXJuO1xyXG4gICAgICAgIGNvbXBvc2VyLndhcm5IdG1sTWVzc2FnZSA9IF93YXJuSHRtbE1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBvbkJlZm9yZU1vdW50KCgpID0+IHtcclxuICAgICAgICBpZiAoaW5zdGFuY2UucHJveHkgPT0gbnVsbCB8fCBpbnN0YW5jZS5wcm94eS4kaTE4biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0NPTVBPU0lUSU9OX0lOX0xFR0FDWSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgY29uc3QgY29tcG9zZXIgPSAoX2NvbXBvc2VyLnZhbHVlID0gaW5zdGFuY2UucHJveHkuJGkxOG5cclxuICAgICAgICAgICAgLl9fY29tcG9zZXIpO1xyXG4gICAgICAgIGlmIChzY29wZSA9PT0gJ2dsb2JhbCcpIHtcclxuICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSA9IGNvbXBvc2VyLmxvY2FsZS52YWx1ZTtcclxuICAgICAgICAgICAgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlID0gY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWU7XHJcbiAgICAgICAgICAgIF9tZXNzYWdlcy52YWx1ZSA9IGNvbXBvc2VyLm1lc3NhZ2VzLnZhbHVlO1xyXG4gICAgICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlID0gY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xyXG4gICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZSA9IGNvbXBvc2VyLm51bWJlckZvcm1hdHMudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzTG9jYWxlKSB7XHJcbiAgICAgICAgICAgIHN5bmMoY29tcG9zZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHdyYXBwZXI7XHJcbn1cclxuY29uc3QgZ2xvYmFsRXhwb3J0UHJvcHMgPSBbXHJcbiAgICAnbG9jYWxlJyxcclxuICAgICdmYWxsYmFja0xvY2FsZScsXHJcbiAgICAnYXZhaWxhYmxlTG9jYWxlcydcclxuXTtcclxuY29uc3QgZ2xvYmFsRXhwb3J0TWV0aG9kcyA9IFsndCcsICdydCcsICdkJywgJ24nLCAndG0nXSA7XHJcbmZ1bmN0aW9uIGluamVjdEdsb2JhbEZpZWxkcyhhcHAsIGNvbXBvc2VyKSB7XHJcbiAgICBjb25zdCBpMThuID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIGdsb2JhbEV4cG9ydFByb3BzLmZvckVhY2gocHJvcCA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29tcG9zZXIsIHByb3ApO1xyXG4gICAgICAgIGlmICghZGVzYykge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHdyYXAgPSBpc1JlZihkZXNjLnZhbHVlKSAvLyBjaGVjayBjb21wdXRlZCBwcm9wc1xyXG4gICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVzYy52YWx1ZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgICAgc2V0KHZhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlc2MudmFsdWUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlc2MuZ2V0ICYmIGRlc2MuZ2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGkxOG4sIHByb3AsIHdyYXApO1xyXG4gICAgfSk7XHJcbiAgICBhcHAuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJGkxOG4gPSBpMThuO1xyXG4gICAgZ2xvYmFsRXhwb3J0TWV0aG9kcy5mb3JFYWNoKG1ldGhvZCA9PiB7XHJcbiAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29tcG9zZXIsIG1ldGhvZCk7XHJcbiAgICAgICAgaWYgKCFkZXNjIHx8ICFkZXNjLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGFwcC5jb25maWcuZ2xvYmFsUHJvcGVydGllcywgYCQke21ldGhvZH1gLCBkZXNjKTtcclxuICAgIH0pO1xyXG59XG5cbi8vIHJlZ2lzdGVyIG1lc3NhZ2UgcmVzb2x2ZXIgYXQgdnVlLWkxOG5cclxucmVnaXN0ZXJNZXNzYWdlUmVzb2x2ZXIocmVzb2x2ZVZhbHVlKTtcclxuLy8gcmVnaXN0ZXIgZmFsbGJhY2sgbG9jYWxlIGF0IHZ1ZS1pMThuXHJcbnJlZ2lzdGVyTG9jYWxlRmFsbGJhY2tlcihmYWxsYmFja1dpdGhMb2NhbGVDaGFpbik7XHJcbntcclxuICAgIGluaXRGZWF0dXJlRmxhZ3MoKTtcclxufVxyXG4vLyBOT1RFOiBleHBlcmltZW50YWwgISFcclxuaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX0lOVExJRllfUFJPRF9ERVZUT09MU19fKSB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBnZXRHbG9iYWxUaGlzKCk7XHJcbiAgICB0YXJnZXQuX19JTlRMSUZZX18gPSB0cnVlO1xyXG4gICAgc2V0RGV2VG9vbHNIb29rKHRhcmdldC5fX0lOVExJRllfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyk7XHJcbn1cclxuaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkgO1xuXG5leHBvcnQgeyBEYXRldGltZUZvcm1hdCwgSTE4bkluamVjdGlvbktleSwgTnVtYmVyRm9ybWF0LCBUcmFuc2xhdGlvbiwgVkVSU0lPTiwgY2FzdFRvVnVlSTE4biwgY3JlYXRlSTE4biwgdXNlSTE4biwgdlREaXJlY3RpdmUgfTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcclxuICBsb2dpbjoge1xyXG4gICAgdGl0bGU6ICdMb2cgaW4nLFxyXG4gICAgZW1haWw6ICdFbWFpbCcsXHJcbiAgICBwYXNzd29yZDogJ1Bhc3N3b3JkJyxcclxuICAgIHJlbWVtYmVyX21lOiAnUmVtZW1iZXIgbWU/JyxcclxuICAgIGFjdGlvbl9sb2dpbjogJ0xvZyBpbicsXHJcbiAgICBlbnRlcl92YWxpZF9lbWFpbDogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MuJyxcclxuICAgIHdlbGNvbWU6ICdXZWxjb21lIGJhY2shJyxcclxuICAgIGVycm9yOiAnVGhlIGVtYWlsIGFkZHJlc3Mgb3IgcGFzc3dvcmQgaXMgaW5jb3JyZWN0LidcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQge1xyXG4gIGxvZ2luOiB7XHJcbiAgICB0aXRsZTogJ0luaWNpYXIgc2VzacOzbicsXHJcbiAgICBlbWFpbDogJ0NvcnJlbyBlbGVjdHLDs25pY28nLFxyXG4gICAgcGFzc3dvcmQ6ICdDb250cmFzZcOxYScsXHJcbiAgICByZW1lbWJlcl9tZTogJ01hbnRlbmVyIHNlc2nDs24gYWN0aXZhPycsXHJcbiAgICBhY3Rpb25fbG9naW46ICdJbmdyZXNhcicsXHJcbiAgICBlbnRlcl92YWxpZF9lbWFpbDogJ1BvciBmYXZvciBpbmdyZXNlIHVuIGNvcnJlbyBlbGVjdHLDs25pY28gdsOhbGlkby4nLFxyXG4gICAgd2VsY29tZTogJ8KhQmllbnZlbmlkbyEnLFxyXG4gICAgZXJyb3I6ICdFbCBjb3JyZW8gZWxlY3Ryw7NuaWNvIG8gY29udHJhc2XDsWEgZXMgaW5jb3JyZWN0by4nXHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBlblVTIGZyb20gJy4vZW4tVVMnXHJcbmltcG9ydCBlc1NQIGZyb20gJy4vZXMtU1AnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgJ2VuLVVTJzogZW5VUyxcclxuICAnZXMtU1AnOiBlc1NQXHJcbn1cclxuIiwiaW1wb3J0IHsgYm9vdCB9IGZyb20gJ3F1YXNhci93cmFwcGVycydcclxuaW1wb3J0IHsgY3JlYXRlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJ1xyXG5pbXBvcnQgbWVzc2FnZXMgZnJvbSAnc3JjL2kxOG4nXHJcblxyXG5leHBvcnQgZGVmYXVsdCBib290KCh7IGFwcCB9KSA9PiB7XHJcbiAgY29uc3QgaTE4biA9IGNyZWF0ZUkxOG4oe1xyXG4gICAgbG9jYWxlOiAnZW4tVVMnLFxyXG4gICAgZ2xvYmFsSW5qZWN0aW9uOiB0cnVlLFxyXG4gICAgbWVzc2FnZXNcclxuICB9KVxyXG5cclxuICAvLyBTZXQgaTE4biBpbnN0YW5jZSBvbiBhcHBcclxuICBhcHAudXNlKGkxOG4pXHJcbn0pXHJcbiJdLCJuYW1lcyI6WyJjb2RlIiwibWVzc2FnZXMiLCJ0eXBlIiwiaTE4biIsIlZFUlNJT04iLCJpbmMiLCJyZXNvbHZlVmFsdWUiLCJtc2ciLCJzb3VyY2UiLCJtZXNzYWdlIiwibG9jYWxlIiwiZ2xvYmFsIiwibG9jYWxlcyIsIl9jb250ZXh0Iiwib3B0aW9ucyIsImNvbXBvc2VyIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLE1BQU0sWUFBWSxPQUFPLFdBQVc7QUErQnBDLE1BQU0sWUFBWSxPQUFPLFdBQVcsY0FBYyxPQUFPLE9BQU8sZ0JBQWdCO0FBQ2hGLE1BQU0sYUFBYSxDQUFDLFNBQVMsWUFBWSxPQUFPLElBQUksSUFBSTtBQUN4RCxNQUFNLHlCQUF5QixDQUFDLFFBQVEsS0FBSyxXQUFXLHNCQUFzQixFQUFFLEdBQUcsUUFBUSxHQUFHLEtBQUssR0FBRyxPQUFRLENBQUE7QUFDOUcsTUFBTSx3QkFBd0IsQ0FBQyxTQUFTLEtBQUssVUFBVSxJQUFJLEVBQ3RELFFBQVEsV0FBVyxTQUFTLEVBQzVCLFFBQVEsV0FBVyxTQUFTLEVBQzVCLFFBQVEsV0FBVyxTQUFTO0FBQ2pDLE1BQU0sV0FBVyxDQUFDLFFBQVEsT0FBTyxRQUFRLFlBQVksU0FBUyxHQUFHO0FBQ2pFLE1BQU0sU0FBUyxDQUFDLFFBQVEsYUFBYSxHQUFHLE1BQU07QUFDOUMsTUFBTSxXQUFXLENBQUMsUUFBUSxhQUFhLEdBQUcsTUFBTTtBQUNoRCxNQUFNLGdCQUFnQixDQUFDLFFBQVEsY0FBYyxHQUFHLEtBQUssT0FBTyxLQUFLLEdBQUcsRUFBRSxXQUFXO0FBQ2pGLFNBQVMsS0FBSyxLQUFLLEtBQUs7QUFDcEIsTUFBSSxPQUFPLFlBQVksYUFBYTtBQUNoQyxZQUFRLEtBQUssZUFBZSxHQUFHO0FBRS9CLFFBQUksS0FBSztBQUNMLGNBQVEsS0FBSyxJQUFJLEtBQUs7QUFBQSxJQUN6QjtBQUFBLEVBQ0o7QUFDTDtBQUNBLE1BQU0sU0FBUyxPQUFPO0FBQ3RCLElBQUk7QUFDSixNQUFNLGdCQUFnQixNQUFNO0FBRXhCLFNBQVEsZ0JBQ0gsY0FDRyxPQUFPLGVBQWUsY0FDaEIsYUFDQSxPQUFPLFNBQVMsY0FDWixPQUNBLE9BQU8sV0FBVyxjQUNkLFNBQ0EsT0FBTyxXQUFXLGNBQ2QsU0FDQSxDQUFBO0FBQzlCO0FBQ0EsU0FBUyxXQUFXLFNBQVM7QUFDekIsU0FBTyxRQUNGLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxNQUFNLEVBQ3BCLFFBQVEsTUFBTSxRQUFRLEVBQ3RCLFFBQVEsTUFBTSxRQUFRO0FBQy9CO0FBQ0EsTUFBTSxpQkFBaUIsT0FBTyxVQUFVO0FBQ3hDLFNBQVMsT0FBTyxLQUFLLEtBQUs7QUFDdEIsU0FBTyxlQUFlLEtBQUssS0FBSyxHQUFHO0FBQ3ZDO0FBU0EsTUFBTSxVQUFVLE1BQU07QUFDdEIsTUFBTSxhQUFhLENBQUMsUUFBUSxPQUFPLFFBQVE7QUFDM0MsTUFBTSxXQUFXLENBQUMsUUFBUSxPQUFPLFFBQVE7QUFDekMsTUFBTSxZQUFZLENBQUMsUUFBUSxPQUFPLFFBQVE7QUFFMUMsTUFBTSxXQUFXLENBQUMsUUFDakIsUUFBUSxRQUFRLE9BQU8sUUFBUTtBQUloQyxNQUFNLGlCQUFpQixPQUFPLFVBQVU7QUFDeEMsTUFBTSxlQUFlLENBQUMsVUFBVSxlQUFlLEtBQUssS0FBSztBQUN6RCxNQUFNLGdCQUFnQixDQUFDLFFBQVEsYUFBYSxHQUFHLE1BQU07QUFFckQsTUFBTSxrQkFBa0IsQ0FBQyxRQUFRO0FBQzdCLFNBQU8sT0FBTyxPQUNSLEtBQ0EsUUFBUSxHQUFHLEtBQU0sY0FBYyxHQUFHLEtBQUssSUFBSSxhQUFhLGlCQUNwRCxLQUFLLFVBQVUsS0FBSyxNQUFNLENBQUMsSUFDM0IsT0FBTyxHQUFHO0FBQ3hCO0FBK0NBLFNBQVMsZ0JBQWdCO0FBQ3JCLFFBQU0sU0FBUyxvQkFBSTtBQUNuQixRQUFNLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxHQUFHLE9BQU8sU0FBUztBQUNmLFlBQU0sV0FBVyxPQUFPLElBQUksS0FBSztBQUNqQyxZQUFNLFFBQVEsWUFBWSxTQUFTLEtBQUssT0FBTztBQUMvQyxVQUFJLENBQUMsT0FBTztBQUNSLGVBQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQUEsTUFDOUI7QUFBQSxJQUNKO0FBQUEsSUFDRCxJQUFJLE9BQU8sU0FBUztBQUNoQixZQUFNLFdBQVcsT0FBTyxJQUFJLEtBQUs7QUFDakMsVUFBSSxVQUFVO0FBQ1YsaUJBQVMsT0FBTyxTQUFTLFFBQVEsT0FBTyxNQUFNLEdBQUcsQ0FBQztBQUFBLE1BQ3JEO0FBQUEsSUFDSjtBQUFBLElBQ0QsS0FBSyxPQUFPLFNBQVM7QUFDakIsT0FBQyxPQUFPLElBQUksS0FBSyxLQUFLLENBQUUsR0FDbkIsTUFBTyxFQUNQLElBQUksYUFBVyxRQUFRLE9BQU8sQ0FBQztBQUNwQyxPQUFDLE9BQU8sSUFBSSxHQUFHLEtBQUssQ0FBRSxHQUNqQixNQUFPLEVBQ1AsSUFBSSxhQUFXLFFBQVEsT0FBTyxPQUFPLENBQUM7QUFBQSxJQUM5QztBQUFBLEVBQ1Q7QUFDSSxTQUFPO0FBQ1g7QUM3TEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BLE1BQU0sb0JBQW9CO0FBQUEsRUFFdEIsZ0JBQWdCO0FBQUEsRUFDaEIsOEJBQThCO0FBQUEsRUFDOUIsMENBQTBDO0FBQUEsRUFDMUMseUJBQXlCO0FBQUEsRUFDekIsaUNBQWlDO0FBQUEsRUFDakMsMEJBQTBCO0FBQUEsRUFDMUIsNEJBQTRCO0FBQUEsRUFDNUIsbUJBQW1CO0FBQUEsRUFDbkIsNEJBQTRCO0FBQUEsRUFDNUIsdUJBQXVCO0FBQUEsRUFFdkIsOEJBQThCO0FBQUEsRUFDOUIsa0NBQWtDO0FBQUEsRUFDbEMsNkJBQTZCO0FBQUEsRUFDN0IsNkJBQTZCO0FBQUEsRUFJN0Isa0JBQWtCO0FBQ3RCO0FBb0JBLFNBQVMsbUJBQW1CQSxPQUFNLEtBQUssVUFBVSxDQUFBLEdBQUk7QUFDakQsUUFBTSxFQUFFLFFBQVEsVUFBQUMsV0FBVSxLQUFJLElBQUs7QUFDbkMsUUFBTSxNQUVBRDtBQUNOLFFBQU0sUUFBUSxJQUFJLFlBQVksT0FBTyxHQUFHLENBQUM7QUFDekMsUUFBTSxPQUFPQTtBQUNiLE1BQUksS0FBSztBQUNMLFVBQU0sV0FBVztBQUFBLEVBQ3BCO0FBQ0QsUUFBTSxTQUFTO0FBQ2YsU0FBTztBQUNYO0FDNURBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxNQUFNLHVCQUF3QjtBQUFBLEVBQzFCLFVBQVU7QUFBQSxFQUNWLG1CQUFtQjtBQUN2QjtBQ1JBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVQSxNQUFNLG1CQUFvQixDQUFBO0FBQzFCLGlCQUFpQixLQUF1QjtBQUFBLEVBQ3BDLENBQUMsTUFBc0IsQ0FBQyxDQUFvQjtBQUFBLEVBQzVDLENBQUMsTUFBa0IsQ0FBQyxHQUFrQixDQUFlO0FBQUEsRUFDckQsQ0FBQyxNQUF5QixDQUFDLENBQW9CO0FBQUEsRUFDL0MsQ0FBQyxNQUF3QixDQUFDLENBQW1CO0FBQ2pEO0FBQ0EsaUJBQWlCLEtBQW1CO0FBQUEsRUFDaEMsQ0FBQyxNQUFzQixDQUFDLENBQWdCO0FBQUEsRUFDeEMsQ0FBQyxNQUFnQixDQUFDLENBQXFCO0FBQUEsRUFDdkMsQ0FBQyxNQUF5QixDQUFDLENBQW9CO0FBQUEsRUFDL0MsQ0FBQyxNQUF3QixDQUFDLENBQW1CO0FBQ2pEO0FBQ0EsaUJBQWlCLEtBQXdCO0FBQUEsRUFDckMsQ0FBQyxNQUFzQixDQUFDLENBQXFCO0FBQUEsRUFDN0MsQ0FBQyxNQUFrQixDQUFDLEdBQWtCLENBQWU7QUFBQSxFQUNyRCxDQUFDLE1BQWlCLENBQUMsR0FBa0IsQ0FBZTtBQUN4RDtBQUNBLGlCQUFpQixLQUFvQjtBQUFBLEVBQ2pDLENBQUMsTUFBa0IsQ0FBQyxHQUFrQixDQUFlO0FBQUEsRUFDckQsQ0FBQyxNQUFpQixDQUFDLEdBQWtCLENBQWU7QUFBQSxFQUNwRCxDQUFDLE1BQXNCLENBQUMsR0FBaUIsQ0FBYTtBQUFBLEVBQ3RELENBQUMsTUFBZ0IsQ0FBQyxHQUFzQixDQUFhO0FBQUEsRUFDckQsQ0FBQyxNQUF5QixDQUFDLEdBQXFCLENBQWE7QUFBQSxFQUM3RCxDQUFDLE1BQXdCLENBQUMsR0FBb0IsQ0FBYTtBQUMvRDtBQUNBLGlCQUFpQixLQUF1QjtBQUFBLEVBQ3BDLENBQUMsTUFBeUIsQ0FBQyxHQUF5QixDQUFlO0FBQUEsRUFDbkUsQ0FBQyxNQUEwQixDQUFDLEdBQXlCLENBQWU7QUFBQSxFQUNwRSxDQUFDLE1BQXlCO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsRUFDSDtBQUFBLEVBQ0QsQ0FBQyxNQUEwQixDQUFDLEdBQWlCLENBQXNCO0FBQUEsRUFDbkUsQ0FBQyxNQUF3QjtBQUFBLEVBQ3pCLENBQUMsTUFBaUIsQ0FBQyxHQUFxQixDQUFlO0FBQzNEO0FBQ0EsaUJBQWlCLEtBQTJCO0FBQUEsRUFDeEMsQ0FBQyxNQUF5QixDQUFDLEdBQXFCLENBQWU7QUFBQSxFQUMvRCxDQUFDLE1BQXdCO0FBQUEsRUFDekIsQ0FBQyxNQUFpQixDQUFDLEdBQXlCLENBQWU7QUFDL0Q7QUFDQSxpQkFBaUIsS0FBMkI7QUFBQSxFQUN4QyxDQUFDLE1BQTBCLENBQUMsR0FBcUIsQ0FBZTtBQUFBLEVBQ2hFLENBQUMsTUFBd0I7QUFBQSxFQUN6QixDQUFDLE1BQWlCLENBQUMsR0FBeUIsQ0FBZTtBQUMvRDtBQUlBLE1BQU0saUJBQWlCO0FBQ3ZCLFNBQVMsVUFBVSxLQUFLO0FBQ3BCLFNBQU8sZUFBZSxLQUFLLEdBQUc7QUFDbEM7QUFJQSxTQUFTLFlBQVksS0FBSztBQUN0QixRQUFNLElBQUksSUFBSSxXQUFXLENBQUM7QUFDMUIsUUFBTSxJQUFJLElBQUksV0FBVyxJQUFJLFNBQVMsQ0FBQztBQUN2QyxTQUFPLE1BQU0sTUFBTSxNQUFNLE1BQVEsTUFBTSxNQUFRLElBQUksTUFBTSxHQUFHLEVBQUUsSUFBSTtBQUN0RTtBQUlBLFNBQVMsZ0JBQWdCLElBQUk7QUFDekIsTUFBSSxPQUFPLFVBQWEsT0FBTyxNQUFNO0FBQ2pDLFdBQU87QUFBQSxFQUNWO0FBQ0QsUUFBTUEsUUFBTyxHQUFHLFdBQVcsQ0FBQztBQUM1QixVQUFRQTtBQUFBLFNBQ0M7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQ0QsYUFBTztBQUFBLFNBQ047QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUNELGFBQU87QUFBQSxTQUNOO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQUEsU0FDQTtBQUFBLFNBQ0E7QUFBQSxTQUNBO0FBQ0QsYUFBTztBQUFBO0FBRWYsU0FBTztBQUNYO0FBTUEsU0FBUyxjQUFjLE1BQU07QUFDekIsUUFBTSxVQUFVLEtBQUs7QUFFckIsTUFBSSxLQUFLLE9BQU8sQ0FBQyxNQUFNLE9BQU8sTUFBTSxTQUFTLElBQUksQ0FBQyxHQUFHO0FBQ2pELFdBQU87QUFBQSxFQUNWO0FBQ0QsU0FBTyxVQUFVLE9BQU8sSUFDbEIsWUFBWSxPQUFPLElBQ25CLE1BQXFCO0FBQy9CO0FBSUEsU0FBUyxNQUFNLE1BQU07QUFDakIsUUFBTSxPQUFPLENBQUE7QUFDYixNQUFJLFFBQVE7QUFDWixNQUFJLE9BQU87QUFDWCxNQUFJLGVBQWU7QUFDbkIsTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUNKLFFBQU0sVUFBVSxDQUFBO0FBQ2hCLFVBQVEsS0FBa0IsTUFBTTtBQUM1QixRQUFJLFFBQVEsUUFBVztBQUNuQixZQUFNO0FBQUEsSUFDVCxPQUNJO0FBQ0QsYUFBTztBQUFBLElBQ1Y7QUFBQSxFQUNUO0FBQ0ksVUFBUSxLQUFnQixNQUFNO0FBQzFCLFFBQUksUUFBUSxRQUFXO0FBQ25CLFdBQUssS0FBSyxHQUFHO0FBQ2IsWUFBTTtBQUFBLElBQ1Q7QUFBQSxFQUNUO0FBQ0ksVUFBUSxLQUE4QixNQUFNO0FBQ3hDLFlBQVE7QUFDUjtBQUFBLEVBQ1I7QUFDSSxVQUFRLEtBQXlCLE1BQU07QUFDbkMsUUFBSSxlQUFlLEdBQUc7QUFDbEI7QUFDQSxhQUFPO0FBQ1AsY0FBUTtJQUNYLE9BQ0k7QUFDRCxxQkFBZTtBQUNmLFVBQUksUUFBUSxRQUFXO0FBQ25CLGVBQU87QUFBQSxNQUNWO0FBQ0QsWUFBTSxjQUFjLEdBQUc7QUFDdkIsVUFBSSxRQUFRLE9BQU87QUFDZixlQUFPO0FBQUEsTUFDVixPQUNJO0FBQ0QsZ0JBQVE7TUFDWDtBQUFBLElBQ0o7QUFBQSxFQUNUO0FBQ0ksV0FBUyxxQkFBcUI7QUFDMUIsVUFBTSxXQUFXLEtBQUssUUFBUTtBQUM5QixRQUFLLFNBQVMsS0FDVixhQUFhLE9BQ1osU0FBUyxLQUNOLGFBQWEsS0FBMEI7QUFDM0M7QUFDQSxnQkFBVSxPQUFPO0FBQ2pCLGNBQVE7QUFDUixhQUFPO0FBQUEsSUFDVjtBQUFBLEVBQ0o7QUFDRCxTQUFPLFNBQVMsTUFBTTtBQUNsQjtBQUNBLFFBQUksS0FBSztBQUNULFFBQUksTUFBTSxRQUFRLHNCQUFzQjtBQUNwQztBQUFBLElBQ0g7QUFDRCxXQUFPLGdCQUFnQixDQUFDO0FBQ3hCLGNBQVUsaUJBQWlCO0FBQzNCLGlCQUFhLFFBQVEsU0FBUyxRQUFRLFFBQW1CO0FBRXpELFFBQUksZUFBZSxHQUFlO0FBQzlCO0FBQUEsSUFDSDtBQUNELFdBQU8sV0FBVztBQUNsQixRQUFJLFdBQVcsT0FBTyxRQUFXO0FBQzdCLGVBQVMsUUFBUSxXQUFXO0FBQzVCLFVBQUksUUFBUTtBQUNSLGtCQUFVO0FBQ1YsWUFBSSxPQUFRLE1BQUssT0FBTztBQUNwQjtBQUFBLFFBQ0g7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUVELFFBQUksU0FBUyxHQUFvQjtBQUM3QixhQUFPO0FBQUEsSUFDVjtBQUFBLEVBQ0o7QUFDTDtBQUVBLE1BQU0sUUFBUSxvQkFBSTtBQWNsQixTQUFTLG9CQUFvQixLQUFLLE1BQU07QUFDcEMsU0FBTyxTQUFTLEdBQUcsSUFBSSxJQUFJLFFBQVE7QUFDdkM7QUFjQSxTQUFTLGFBQWEsS0FBSyxNQUFNO0FBRTdCLE1BQUksQ0FBQyxTQUFTLEdBQUcsR0FBRztBQUNoQixXQUFPO0FBQUEsRUFDVjtBQUVELE1BQUksTUFBTSxNQUFNLElBQUksSUFBSTtBQUN4QixNQUFJLENBQUMsS0FBSztBQUNOLFVBQU0sTUFBTSxJQUFJO0FBQ2hCLFFBQUksS0FBSztBQUNMLFlBQU0sSUFBSSxNQUFNLEdBQUc7QUFBQSxJQUN0QjtBQUFBLEVBQ0o7QUFFRCxNQUFJLENBQUMsS0FBSztBQUNOLFdBQU87QUFBQSxFQUNWO0FBRUQsUUFBTSxNQUFNLElBQUk7QUFDaEIsTUFBSSxPQUFPO0FBQ1gsTUFBSSxJQUFJO0FBQ1IsU0FBTyxJQUFJLEtBQUs7QUFDWixVQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFFBQUksUUFBUSxRQUFXO0FBQ25CLGFBQU87QUFBQSxJQUNWO0FBQ0QsV0FBTztBQUNQO0FBQUEsRUFDSDtBQUNELFNBQU87QUFDWDtBQUVBLE1BQU0sbUJBQW1CLENBQUMsUUFBUTtBQUNsQyxNQUFNLGtCQUFrQixDQUFDLFFBQVE7QUFDakMsTUFBTSw0QkFBNEI7QUFDbEMsTUFBTSxvQkFBb0IsQ0FBQyxXQUFXLE9BQU8sV0FBVyxJQUFJLEtBQUssT0FBTyxLQUFLLEVBQUU7QUFDL0UsTUFBTSxzQkFBc0I7QUFDNUIsU0FBUyxjQUFjLFFBQVEsZUFBZTtBQUMxQyxXQUFTLEtBQUssSUFBSSxNQUFNO0FBQ3hCLE1BQUksa0JBQWtCLEdBQUc7QUFFckIsV0FBTyxTQUNELFNBQVMsSUFDTCxJQUNBLElBQ0o7QUFBQSxFQUNUO0FBQ0QsU0FBTyxTQUFTLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSTtBQUMxQztBQUNBLFNBQVMsZUFBZSxTQUFTO0FBRTdCLFFBQU0sUUFBUSxTQUFTLFFBQVEsV0FBVyxJQUNwQyxRQUFRLGNBQ1I7QUFFTixTQUFPLFFBQVEsVUFBVSxTQUFTLFFBQVEsTUFBTSxLQUFLLEtBQUssU0FBUyxRQUFRLE1BQU0sQ0FBQyxLQUM1RSxTQUFTLFFBQVEsTUFBTSxLQUFLLElBQ3hCLFFBQVEsTUFBTSxRQUNkLFNBQVMsUUFBUSxNQUFNLENBQUMsSUFDcEIsUUFBUSxNQUFNLElBQ2QsUUFDUjtBQUNWO0FBQ0EsU0FBUyxlQUFlLGFBQWEsT0FBTztBQUN4QyxNQUFJLENBQUMsTUFBTSxPQUFPO0FBQ2QsVUFBTSxRQUFRO0FBQUEsRUFDakI7QUFDRCxNQUFJLENBQUMsTUFBTSxHQUFHO0FBQ1YsVUFBTSxJQUFJO0FBQUEsRUFDYjtBQUNMO0FBQ0EsU0FBUyxxQkFBcUIsVUFBVSxJQUFJO0FBQ3hDLFFBQU0sU0FBUyxRQUFRO0FBQ3ZCLFFBQU0sY0FBYyxlQUFlLE9BQU87QUFDMUMsUUFBTSxhQUFhLFNBQVMsUUFBUSxXQUFXLEtBQzNDLFNBQVMsTUFBTSxLQUNmLFdBQVcsUUFBUSxZQUFZLE9BQU8sSUFDcEMsUUFBUSxZQUFZLFVBQ3BCO0FBQ04sUUFBTSxnQkFBZ0IsU0FBUyxRQUFRLFdBQVcsS0FDOUMsU0FBUyxNQUFNLEtBQ2YsV0FBVyxRQUFRLFlBQVksT0FBTyxJQUNwQyxnQkFDQTtBQUNOLFFBQU0sU0FBUyxDQUFDQyxjQUFhO0FBQ3pCLFdBQU9BLFVBQVMsV0FBVyxhQUFhQSxVQUFTLFFBQVEsYUFBYTtBQUFBLEVBQzlFO0FBQ0ksUUFBTSxRQUFRLFFBQVEsUUFBUTtBQUM5QixRQUFNLE9BQU8sQ0FBQyxVQUFVLE1BQU07QUFFOUIsUUFBTSxTQUFTLFFBQVEsU0FBUztBQUNoQyxXQUFTLFFBQVEsV0FBVyxLQUFLLGVBQWUsYUFBYSxNQUFNO0FBQ25FLFFBQU0sUUFBUSxDQUFDLFFBQVEsT0FBTztBQUM5QixXQUFTLFFBQVEsS0FBSztBQUVsQixVQUFNLE1BQU0sV0FBVyxRQUFRLFFBQVEsSUFDakMsUUFBUSxTQUFTLEdBQUcsSUFDcEIsU0FBUyxRQUFRLFFBQVEsSUFDckIsUUFBUSxTQUFTLE9BQ2pCO0FBQ1YsV0FBTyxDQUFDLE1BQ0YsUUFBUSxTQUNKLFFBQVEsT0FBTyxRQUFRLEdBQUcsSUFDMUIsa0JBQ0o7QUFBQSxFQUNUO0FBQ0QsUUFBTSxZQUFZLENBQUMsU0FBUyxRQUFRLFlBQzlCLFFBQVEsVUFBVSxRQUNsQjtBQUNOLFFBQU0sWUFBWSxjQUFjLFFBQVEsU0FBUyxLQUFLLFdBQVcsUUFBUSxVQUFVLFNBQVMsSUFDdEYsUUFBUSxVQUFVLFlBQ2xCO0FBQ04sUUFBTSxjQUFjLGNBQWMsUUFBUSxTQUFTLEtBQy9DLFdBQVcsUUFBUSxVQUFVLFdBQVcsSUFDdEMsUUFBUSxVQUFVLGNBQ2xCO0FBQ04sUUFBTSxPQUFPLGNBQWMsUUFBUSxTQUFTLEtBQUssU0FBUyxRQUFRLFVBQVUsSUFBSSxJQUMxRSxRQUFRLFVBQVUsT0FDbEI7QUFDTixRQUFNLFNBQVMsQ0FBQyxRQUFRLFNBQVM7QUFDN0IsVUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJO0FBQ3JCLFFBQUlDLFFBQU87QUFDWCxRQUFJLFdBQVc7QUFDZixRQUFJLEtBQUssV0FBVyxHQUFHO0FBQ25CLFVBQUksU0FBUyxJQUFJLEdBQUc7QUFDaEIsbUJBQVcsS0FBSyxZQUFZO0FBQzVCLFFBQUFBLFFBQU8sS0FBSyxRQUFRQTtBQUFBLE1BQ3ZCLFdBQ1EsU0FBUyxJQUFJLEdBQUc7QUFDckIsbUJBQVcsUUFBUTtBQUFBLE1BQ3RCO0FBQUEsSUFDSixXQUNRLEtBQUssV0FBVyxHQUFHO0FBQ3hCLFVBQUksU0FBUyxJQUFJLEdBQUc7QUFDaEIsbUJBQVcsUUFBUTtBQUFBLE1BQ3RCO0FBQ0QsVUFBSSxTQUFTLElBQUksR0FBRztBQUNoQixRQUFBQSxRQUFPLFFBQVFBO0FBQUEsTUFDbEI7QUFBQSxJQUNKO0FBQ0QsUUFBSSxNQUFNLFFBQVEsR0FBRyxFQUFFLEdBQUc7QUFFMUIsUUFBSUEsVUFBUyxXQUFXLFFBQVEsR0FBRyxLQUFLLFVBQVU7QUFDOUMsWUFBTSxJQUFJO0FBQUEsSUFDYjtBQUNELFdBQU8sV0FBVyxVQUFVLFFBQVEsRUFBRSxLQUFLQSxLQUFJLElBQUk7QUFBQSxFQUMzRDtBQUNJLFFBQU0sTUFBTTtBQUFBLElBQ1IsQ0FBQyxTQUFvQjtBQUFBLElBQ3JCLENBQUMsVUFBc0I7QUFBQSxJQUN2QixDQUFDLFdBQXdCO0FBQUEsSUFDekIsQ0FBQyxXQUF3QjtBQUFBLElBQ3pCLENBQUMsWUFBMEI7QUFBQSxJQUMzQixDQUFDLFNBQW9CO0FBQUEsSUFDckIsQ0FBQyxnQkFBa0M7QUFBQSxJQUNuQyxDQUFDLGNBQThCO0FBQUEsRUFDdkM7QUFDSSxTQUFPO0FBQ1g7QUFFQSxJQUFJLFdBQVc7QUFDZixTQUFTLGdCQUFnQixNQUFNO0FBQzNCLGFBQVc7QUFDZjtBQUlBLFNBQVMsaUJBQWlCQyxPQUFNLFNBQVMsTUFBTTtBQUUzQyxjQUNJLFNBQVMsS0FBSyxxQkFBcUIsVUFBVTtBQUFBLElBQ3pDLFdBQVcsS0FBSyxJQUFLO0FBQUEsSUFDckIsTUFBQUE7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ1osQ0FBUztBQUNUO0FBQ0EsTUFBTSxvQkFBbUMsbUNBQW1CLHFCQUFxQixpQkFBaUI7QUFDbEcsU0FBUyxtQkFBbUIsTUFBTTtBQUM5QixTQUFPLENBQUMsYUFBYSxZQUFZLFNBQVMsS0FBSyxNQUFNLFFBQVE7QUFDakU7QUFFQSxNQUFNLGdCQUFnQjtBQUFBLEVBQ2xCLGVBQWU7QUFBQSxFQUNmLHVCQUF1QjtBQUFBLEVBQ3ZCLHNCQUFzQjtBQUFBLEVBQ3RCLDJCQUEyQjtBQUFBLEVBQzNCLG9CQUFvQjtBQUFBLEVBQ3BCLHlCQUF5QjtBQUFBLEVBQ3pCLGtCQUFrQjtBQUN0QjtBQThCQSxTQUFTLG1CQUFtQixLQUFLLFVBQVUsT0FDekM7QUFFRSxTQUFPLENBQUMsR0FBRyxvQkFBSSxJQUFJO0FBQUEsSUFDWDtBQUFBLElBQ0EsR0FBSSxRQUFRLFFBQVEsSUFDZCxXQUNBLFNBQVMsUUFBUSxJQUNiLE9BQU8sS0FBSyxRQUFRLElBQ3BCLFNBQVMsUUFBUSxJQUNiLENBQUMsUUFBUSxJQUNULENBQUMsS0FBSztBQUFBLEVBQ3ZCLENBQUEsQ0FBQztBQUNWO0FBaUJBLFNBQVMsd0JBQXdCLEtBQUssVUFBVSxPQUFPO0FBQ25ELFFBQU0sY0FBYyxTQUFTLEtBQUssSUFBSSxRQUFRO0FBQzlDLFFBQU0sVUFBVTtBQUNoQixNQUFJLENBQUMsUUFBUSxvQkFBb0I7QUFDN0IsWUFBUSxxQkFBcUIsb0JBQUk7RUFDcEM7QUFDRCxNQUFJLFFBQVEsUUFBUSxtQkFBbUIsSUFBSSxXQUFXO0FBQ3RELE1BQUksQ0FBQyxPQUFPO0FBQ1IsWUFBUSxDQUFBO0FBRVIsUUFBSSxRQUFRLENBQUMsS0FBSztBQUVsQixXQUFPLFFBQVEsS0FBSyxHQUFHO0FBQ25CLGNBQVEsbUJBQW1CLE9BQU8sT0FBTyxRQUFRO0FBQUEsSUFDcEQ7QUFHRCxVQUFNLFdBQVcsUUFBUSxRQUFRLEtBQUssQ0FBQyxjQUFjLFFBQVEsSUFDdkQsV0FDQSxTQUFTLGFBQ0wsU0FBUyxhQUNUO0FBRVYsWUFBUSxTQUFTLFFBQVEsSUFBSSxDQUFDLFFBQVEsSUFBSTtBQUMxQyxRQUFJLFFBQVEsS0FBSyxHQUFHO0FBQ2hCLHlCQUFtQixPQUFPLE9BQU8sS0FBSztBQUFBLElBQ3pDO0FBQ0QsWUFBUSxtQkFBbUIsSUFBSSxhQUFhLEtBQUs7QUFBQSxFQUNwRDtBQUNELFNBQU87QUFDWDtBQUNBLFNBQVMsbUJBQW1CLE9BQU8sT0FBTyxRQUFRO0FBQzlDLE1BQUksU0FBUztBQUNiLFdBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxVQUFVLFVBQVUsTUFBTSxHQUFHLEtBQUs7QUFDeEQsVUFBTSxTQUFTLE1BQU07QUFDckIsUUFBSSxTQUFTLE1BQU0sR0FBRztBQUNsQixlQUFTLG9CQUFvQixPQUFPLE1BQU0sSUFBSSxNQUFNO0FBQUEsSUFDdkQ7QUFBQSxFQUNKO0FBQ0QsU0FBTztBQUNYO0FBQ0EsU0FBUyxvQkFBb0IsT0FBTyxRQUFRLFFBQVE7QUFDaEQsTUFBSTtBQUNKLFFBQU0sU0FBUyxPQUFPLE1BQU0sR0FBRztBQUMvQixLQUFHO0FBQ0MsVUFBTSxTQUFTLE9BQU8sS0FBSyxHQUFHO0FBQzlCLGFBQVMsa0JBQWtCLE9BQU8sUUFBUSxNQUFNO0FBQ2hELFdBQU8sT0FBTyxJQUFJLENBQUM7QUFBQSxFQUN0QixTQUFRLE9BQU8sVUFBVSxXQUFXO0FBQ3JDLFNBQU87QUFDWDtBQUNBLFNBQVMsa0JBQWtCLE9BQU8sUUFBUSxRQUFRO0FBQzlDLE1BQUksU0FBUztBQUNiLE1BQUksQ0FBQyxNQUFNLFNBQVMsTUFBTSxHQUFHO0FBQ3pCLGFBQVM7QUFDVCxRQUFJLFFBQVE7QUFDUixlQUFTLE9BQU8sT0FBTyxTQUFTLE9BQU87QUFDdkMsWUFBTSxTQUFTLE9BQU8sUUFBUSxNQUFNLEVBQUU7QUFDdEMsWUFBTSxLQUFLLE1BQU07QUFDakIsV0FBSyxRQUFRLE1BQU0sS0FBSyxjQUFjLE1BQU0sTUFDeEMsT0FBTyxTQUNUO0FBRUUsaUJBQVMsT0FBTztBQUFBLE1BQ25CO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDRCxTQUFPO0FBQ1g7QUFPQSxNQUFNQyxZQUFVO0FBQ2hCLE1BQU0sZUFBZTtBQUNyQixNQUFNLGlCQUFpQjtBQUN2QixNQUFNLHdCQUF3QjtBQUM5QixNQUFNLGFBQWEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsRUFBRSxrQkFBaUIsSUFBSyxJQUFJLE9BQU8sQ0FBQztBQUMvRSxTQUFTLDRCQUE0QjtBQUNqQyxTQUFPO0FBQUEsSUFDSCxPQUFPLENBQUMsS0FBSyxTQUFTO0FBRWxCLGFBQU8sU0FBUyxVQUFVLFNBQVMsR0FBRyxJQUNoQyxJQUFJLFlBQWEsSUFDakIsU0FBUyxXQUFXLFNBQVMsR0FBRyxLQUFLLGlCQUFpQixNQUNsRCxJQUFJLFNBQVMsWUFBYSxJQUMxQjtBQUFBLElBQ2I7QUFBQSxJQUNELE9BQU8sQ0FBQyxLQUFLLFNBQVM7QUFFbEIsYUFBTyxTQUFTLFVBQVUsU0FBUyxHQUFHLElBQ2hDLElBQUksWUFBYSxJQUNqQixTQUFTLFdBQVcsU0FBUyxHQUFHLEtBQUssaUJBQWlCLE1BQ2xELElBQUksU0FBUyxZQUFhLElBQzFCO0FBQUEsSUFDYjtBQUFBLElBQ0QsWUFBWSxDQUFDLEtBQUssU0FBUztBQUV2QixhQUFRLFNBQVMsVUFBVSxTQUFTLEdBQUcsSUFDakMsV0FBVyxHQUFHLElBQ2QsU0FBUyxXQUFXLFNBQVMsR0FBRyxLQUFLLGlCQUFpQixNQUNsRCxXQUFXLElBQUksUUFBUSxJQUN2QjtBQUFBLElBQ2I7QUFBQSxFQUNUO0FBQ0E7QUFDQSxJQUFJO0FBSUosSUFBSTtBQVFKLFNBQVMsd0JBQXdCLFVBQVU7QUFDdkMsY0FBWTtBQUNoQjtBQUNBLElBQUk7QUFRSixTQUFTLHlCQUF5QixZQUFZO0FBQzFDLGdCQUFjO0FBQ2xCO0FBRUEsSUFBSSxrQkFBa0I7QUFDdEIsTUFBTSxvQkFBcUIsQ0FBQyxTQUFTO0FBQ2pDLG9CQUFrQjtBQUN0QjtBQUNBLE1BQU0sb0JBQXFCLE1BQU07QUFDakMsSUFBSSxtQkFBbUI7QUFDdkIsTUFBTSxxQkFBcUIsQ0FBQyxZQUFZO0FBQ3BDLHFCQUFtQjtBQUN2QjtBQUNBLE1BQU0scUJBQXFCLE1BQU07QUFFakMsSUFBSSxPQUFPO0FBQ1gsU0FBUyxrQkFBa0IsVUFBVSxJQUFJO0FBRXJDLFFBQU0sVUFBVSxTQUFTLFFBQVEsT0FBTyxJQUFJLFFBQVEsVUFBVUE7QUFDOUQsUUFBTSxTQUFTLFNBQVMsUUFBUSxNQUFNLElBQUksUUFBUSxTQUFTO0FBQzNELFFBQU0saUJBQWlCLFFBQVEsUUFBUSxjQUFjLEtBQ2pELGNBQWMsUUFBUSxjQUFjLEtBQ3BDLFNBQVMsUUFBUSxjQUFjLEtBQy9CLFFBQVEsbUJBQW1CLFFBQ3pCLFFBQVEsaUJBQ1I7QUFDTixRQUFNSCxZQUFXLGNBQWMsUUFBUSxRQUFRLElBQ3pDLFFBQVEsV0FDUixFQUFFLENBQUMsU0FBUyxDQUFBO0FBQ2xCLFFBQU0sa0JBQWtCLGNBQWMsUUFBUSxlQUFlLElBQ25ELFFBQVEsa0JBQ1IsRUFBRSxDQUFDLFNBQVMsR0FBSTtBQUUxQixRQUFNLGdCQUFnQixjQUFjLFFBQVEsYUFBYSxJQUMvQyxRQUFRLGdCQUNSLEVBQUUsQ0FBQyxTQUFTLEdBQUk7QUFFMUIsUUFBTSxZQUFZLE9BQU8sSUFBSSxRQUFRLGFBQWEsQ0FBRSxHQUFFLDBCQUF5QixDQUFFO0FBQ2pGLFFBQU0sY0FBYyxRQUFRLGVBQWU7QUFDM0MsUUFBTSxVQUFVLFdBQVcsUUFBUSxPQUFPLElBQUksUUFBUSxVQUFVO0FBQ2hFLFFBQU0sY0FBYyxVQUFVLFFBQVEsV0FBVyxLQUFLLFNBQVMsUUFBUSxXQUFXLElBQzVFLFFBQVEsY0FDUjtBQUNOLFFBQU0sZUFBZSxVQUFVLFFBQVEsWUFBWSxLQUFLLFNBQVMsUUFBUSxZQUFZLElBQy9FLFFBQVEsZUFDUjtBQUNOLFFBQU0saUJBQWlCLENBQUMsQ0FBQyxRQUFRO0FBQ2pDLFFBQU0sY0FBYyxDQUFDLENBQUMsUUFBUTtBQUM5QixRQUFNLGtCQUFrQixXQUFXLFFBQVEsZUFBZSxJQUNwRCxRQUFRLGtCQUNSO0FBQ04sUUFBTSxZQUFZLGNBQWMsUUFBUSxTQUFTLElBQUksUUFBUSxZQUFZO0FBQ3pFLFFBQU0sa0JBQWtCLFVBQVUsUUFBUSxlQUFlLElBQ25ELFFBQVEsa0JBQ1I7QUFDTixRQUFNLGtCQUFrQixDQUFDLENBQUMsUUFBUTtBQUNsQyxRQUFNLGtCQUFrQixXQUFXLFFBQVEsZUFBZSxJQUNwRCxRQUFRLGtCQUNSO0FBQ04sUUFBTSxrQkFBa0IsV0FBVyxRQUFRLGVBQWUsSUFDcEQsUUFBUSxrQkFDUixhQUFhO0FBQ25CLFFBQU0sbUJBQW1CLFdBQVcsUUFBUSxnQkFBZ0IsSUFDdEQsUUFBUSxtQkFDUixlQUFlO0FBQ3JCLFFBQU0sa0JBQWtCLFNBQVMsUUFBUSxlQUFlLElBQ2xELFFBQVEsa0JBQ1I7QUFDTixRQUFNLFNBQVMsV0FBVyxRQUFRLE1BQU0sSUFBSSxRQUFRLFNBQVM7QUFFN0QsUUFBTSxrQkFBa0I7QUFDeEIsUUFBTSx1QkFBdUIsU0FBUyxnQkFBZ0Isb0JBQW9CLElBQ2hFLGdCQUFnQix1QkFDaEIsb0JBQUksSUFBSztBQUVuQixRQUFNLHFCQUFxQixTQUFTLGdCQUFnQixrQkFBa0IsSUFDNUQsZ0JBQWdCLHFCQUNoQixvQkFBSSxJQUFLO0FBRW5CLFFBQU0sU0FBUyxTQUFTLGdCQUFnQixNQUFNLElBQUksZ0JBQWdCLFNBQVM7QUFDM0U7QUFDQSxRQUFNLFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxLQUFLO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQUFBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNSO0FBQ0k7QUFDSSxZQUFRLGtCQUFrQjtBQUMxQixZQUFRLGdCQUFnQjtBQUN4QixZQUFRLHVCQUF1QjtBQUMvQixZQUFRLHFCQUFxQjtBQUFBLEVBQ2hDO0FBU3lFO0FBQ3RFLHFCQUFpQixTQUFTLFNBQVMsTUFBTTtBQUFBLEVBQzVDO0FBQ0QsU0FBTztBQUNYO0FBVUEsU0FBUyxjQUFjLFNBQVMsS0FBSyxRQUFRLGFBQWEsTUFBTTtBQUM1RCxRQUFNLEVBQUUsU0FBUyxPQUFRLElBQUc7QUFhNUIsTUFBSSxZQUFZLE1BQU07QUFDbEIsVUFBTSxNQUFNLFFBQVEsU0FBUyxRQUFRLEtBQUssSUFBSTtBQUM5QyxXQUFPLFNBQVMsR0FBRyxJQUFJLE1BQU07QUFBQSxFQUNoQyxPQUNJO0FBSUQsV0FBTztBQUFBLEVBQ1Y7QUFDTDtBQUVBLFNBQVMscUJBQXFCLEtBQUssUUFBUSxVQUFVO0FBQ2pELFFBQU0sVUFBVTtBQUNoQixVQUFRLHFCQUFxQixvQkFBSTtBQUNqQyxNQUFJLGlCQUFpQixLQUFLLFVBQVUsTUFBTTtBQUM5QztBQTZDQSxJQUFJRCxTQUFPLGtCQUFrQjtBQUM3QixNQUFNSyxRQUFNLE1BQU0sRUFBRUw7QUFDcEIsTUFBTSxpQkFBaUI7QUFBQSxFQUNuQixrQkFBa0JBO0FBQUFBLEVBQ2xCLHVCQUF1QkssTUFBSztBQUFBLEVBQzVCLDJCQUEyQkEsTUFBSztBQUFBLEVBQ2hDLGtCQUFrQkEsTUFBSztBQUMzQjtBQUNBLFNBQVMsZ0JBQWdCTCxPQUFNO0FBQzNCLFNBQU8sbUJBQW1CQSxPQUFNLE1BQThFLE1BQVM7QUFDM0g7QUFTQSxNQUFNLHdCQUF3QixNQUFNO0FBQ3BDLE1BQU0sb0JBQW9CLENBQUMsUUFBUSxXQUFXLEdBQUc7QUFFakQsU0FBUyxVQUFVLFlBQVksTUFBTTtBQUNqQyxRQUFNLEVBQUUsZ0JBQWdCLGlCQUFpQixhQUFhLGlCQUFpQixnQkFBZ0IsVUFBQUMsVUFBVSxJQUFHO0FBQ3BHLFFBQU0sQ0FBQyxLQUFLLE9BQU8sSUFBSSxtQkFBbUIsR0FBRyxJQUFJO0FBQ2pELFFBQU0sY0FBYyxVQUFVLFFBQVEsV0FBVyxJQUMzQyxRQUFRLGNBQ1IsUUFBUTtBQUNkLFFBQU0sZUFBZSxVQUFVLFFBQVEsWUFBWSxJQUM3QyxRQUFRLGVBQ1IsUUFBUTtBQUNkLFFBQU0sa0JBQWtCLFVBQVUsUUFBUSxlQUFlLElBQ25ELFFBQVEsa0JBQ1IsUUFBUTtBQUNkLFFBQU0sa0JBQWtCLENBQUMsQ0FBQyxRQUFRO0FBRWxDLFFBQU0sa0JBQWtCLFNBQVMsUUFBUSxPQUFPLEtBQUssVUFBVSxRQUFRLE9BQU8sSUFDeEUsQ0FBQyxVQUFVLFFBQVEsT0FBTyxJQUN0QixRQUFRLFVBQ1AsQ0FBQyxrQkFBa0IsTUFBTSxNQUFNLE1BQ3BDLGlCQUNLLENBQUMsa0JBQWtCLE1BQU0sTUFBTSxNQUNoQztBQUNWLFFBQU0sbUJBQW1CLGtCQUFrQixvQkFBb0I7QUFDL0QsUUFBTSxTQUFTLFNBQVMsUUFBUSxNQUFNLElBQUksUUFBUSxTQUFTLFFBQVE7QUFFbkUscUJBQW1CLGFBQWEsT0FBTztBQUd2QyxNQUFJLENBQUMsYUFBYSxjQUFjLE9BQU8sSUFBSSxDQUFDLGtCQUN0QyxxQkFBcUIsU0FBUyxLQUFLLFFBQVEsZ0JBQWdCLGNBQWMsV0FBVyxJQUNwRjtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQUEsVUFBUyxXQUFXLENBQUU7QUFBQSxFQUNsQztBQU1JLE1BQUksU0FBUztBQUViLE1BQUksZUFBZTtBQUNuQixNQUFJLENBQUMsbUJBQ0QsRUFBRSxTQUFTLE1BQU0sS0FBSyxrQkFBa0IsTUFBTSxJQUFJO0FBQ2xELFFBQUksa0JBQWtCO0FBQ2xCLGVBQVM7QUFDVCxxQkFBZTtBQUFBLElBQ2xCO0FBQUEsRUFDSjtBQUVELE1BQUksQ0FBQyxvQkFDQSxFQUFFLFNBQVMsTUFBTSxLQUFLLGtCQUFrQixNQUFNLE1BQzNDLENBQUMsU0FBUyxZQUFZLElBQUk7QUFDOUIsV0FBTyxjQUFjLGVBQWU7QUFBQSxFQUN2QztBQVNELE1BQUksV0FBVztBQUNmLFFBQU0sZ0JBQWdCLE1BQU07QUFDeEIsZUFBVztBQUFBLEVBQ25CO0FBRUksUUFBTSxNQUFNLENBQUMsa0JBQWtCLE1BQU0sSUFDL0IscUJBQXFCLFNBQVMsS0FBSyxjQUFjLFFBQVEsY0FBYyxhQUFhLElBQ3BGO0FBRU4sTUFBSSxVQUFVO0FBQ1YsV0FBTztBQUFBLEVBQ1Y7QUFFRCxRQUFNLGFBQWEseUJBQXlCLFNBQVMsY0FBYyxTQUFTLE9BQU87QUFDbkYsUUFBTSxhQUFhLHFCQUFxQixVQUFVO0FBQ2xELFFBQU0sV0FBVyxnQkFBZ0IsU0FBUyxLQUFLLFVBQVU7QUFFekQsUUFBTSxNQUFNLGtCQUNOLGdCQUFnQixVQUFVLEdBQUcsSUFDN0I7QUFFb0U7QUFFdEUsVUFBTSxXQUFXO0FBQUEsTUFDYixXQUFXLEtBQUssSUFBSztBQUFBLE1BQ3JCLEtBQUssU0FBUyxHQUFHLElBQ1gsTUFDQSxrQkFBa0IsTUFBTSxJQUNwQixPQUFPLE1BQ1A7QUFBQSxNQUNWLFFBQVEsaUJBQWlCLGtCQUFrQixNQUFNLElBQzNDLE9BQU8sU0FDUDtBQUFBLE1BQ04sUUFBUSxTQUFTLE1BQU0sSUFDakIsU0FDQSxrQkFBa0IsTUFBTSxJQUNwQixPQUFPLFNBQ1A7QUFBQSxNQUNWLFNBQVM7QUFBQSxJQUNyQjtBQUNRLGFBQVMsT0FBTyxPQUFPLENBQUUsR0FBRSxRQUFRLFFBQVEsdUJBQXVCLENBQUEsQ0FBRTtBQUNwRSxzQkFBa0IsUUFBUTtBQUFBLEVBQzdCO0FBQ0QsU0FBTztBQUNYO0FBQ0EsU0FBUyxhQUFhLFNBQVM7QUFDM0IsTUFBSSxRQUFRLFFBQVEsSUFBSSxHQUFHO0FBQ3ZCLFlBQVEsT0FBTyxRQUFRLEtBQUssSUFBSSxVQUFRLFNBQVMsSUFBSSxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUk7QUFBQSxFQUNuRixXQUNRLFNBQVMsUUFBUSxLQUFLLEdBQUc7QUFDOUIsV0FBTyxLQUFLLFFBQVEsS0FBSyxFQUFFLFFBQVEsU0FBTztBQUN0QyxVQUFJLFNBQVMsUUFBUSxNQUFNLElBQUksR0FBRztBQUM5QixnQkFBUSxNQUFNLE9BQU8sV0FBVyxRQUFRLE1BQU0sSUFBSTtBQUFBLE1BQ3JEO0FBQUEsSUFDYixDQUFTO0FBQUEsRUFDSjtBQUNMO0FBQ0EsU0FBUyxxQkFBcUIsU0FBUyxLQUFLLFFBQVEsZ0JBQWdCLGNBQWMsYUFBYTtBQUMzRixRQUFNLEVBQUUsVUFBQUEsV0FBVSxRQUFRLGlCQUFpQkssZUFBYyxpQkFBa0IsSUFBRztBQUM5RSxRQUFNLFVBQVUsaUJBQWlCLFNBQVMsZ0JBQWdCLE1BQU07QUFDaEUsTUFBSSxVQUFVLENBQUE7QUFDZCxNQUFJO0FBQ0osTUFBSSxTQUFTO0FBR2IsUUFBTSxPQUFPO0FBQ2IsV0FBUyxJQUFJLEdBQUcsSUFBSSxRQUFRLFFBQVEsS0FBSztBQUNyQyxtQkFBb0IsUUFBUTtBQXNCNUIsY0FDSUwsVUFBUyxpQkFBaUI7QUFXOUIsU0FBSyxTQUFTSyxjQUFhLFNBQVMsR0FBRyxPQUFPLE1BQU07QUFFaEQsZUFBUyxRQUFRO0FBQUEsSUFDcEI7QUFtQkQsUUFBSSxTQUFTLE1BQU0sS0FBSyxXQUFXLE1BQU07QUFDckM7QUFDSixVQUFNLGFBQWE7QUFBQSxNQUFjO0FBQUEsTUFDakM7QUFBQSxNQUFLO0FBQUEsTUFBYztBQUFBLE1BQWE7QUFBQSxJQUFJO0FBQ3BDLFFBQUksZUFBZSxLQUFLO0FBQ3BCLGVBQVM7QUFBQSxJQUNaO0FBQUEsRUFFSjtBQUNELFNBQU8sQ0FBQyxRQUFRLGNBQWMsT0FBTztBQUN6QztBQUNBLFNBQVMscUJBQXFCLFNBQVMsS0FBSyxjQUFjLFFBQVEsY0FBYyxlQUFlO0FBQzNGLFFBQU0sRUFBRSxpQkFBaUIsZ0JBQWlCLElBQUc7QUFDN0MsTUFBSSxrQkFBa0IsTUFBTSxHQUFHO0FBQzNCLFVBQU1DLE9BQU07QUFDWixJQUFBQSxLQUFJLFNBQVNBLEtBQUksVUFBVTtBQUMzQixJQUFBQSxLQUFJLE1BQU1BLEtBQUksT0FBTztBQUNyQixXQUFPQTtBQUFBLEVBQ1Y7QUFDRCxNQUFJLG1CQUFtQixNQUFNO0FBQ3pCLFVBQU1BLE9BQU8sTUFBTTtBQUNuQixJQUFBQSxLQUFJLFNBQVM7QUFDYixJQUFBQSxLQUFJLE1BQU07QUFDVixXQUFPQTtBQUFBLEVBQ1Y7QUFXRCxRQUFNLE1BQU0sZ0JBQWdCLFFBQVEsa0JBQWtCLFNBQVMsY0FBYyxjQUFjLFFBQVEsaUJBQWlCLGFBQWEsQ0FBQztBQWtCbEksTUFBSSxTQUFTO0FBQ2IsTUFBSSxNQUFNO0FBQ1YsTUFBSSxTQUFTO0FBQ2IsU0FBTztBQUNYO0FBQ0EsU0FBUyxnQkFBZ0IsU0FBUyxLQUFLLFFBQVE7QUFXM0MsUUFBTSxXQUFXLElBQUksTUFBTTtBQWtCM0IsU0FBTztBQUNYO0FBRUEsU0FBUyxzQkFBc0IsTUFBTTtBQUNqQyxRQUFNLENBQUMsTUFBTSxNQUFNLElBQUksSUFBSTtBQUMzQixRQUFNLFVBQVUsQ0FBQTtBQUNoQixNQUFJLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLGtCQUFrQixJQUFJLEdBQUc7QUFDaEUsVUFBTSxnQkFBZ0IsZUFBZSxnQkFBZ0I7QUFBQSxFQUN4RDtBQUVELFFBQU0sTUFBTSxTQUFTLElBQUksSUFDbkIsT0FBTyxJQUFJLElBQ1gsa0JBQWtCLElBQUksSUFDbEIsT0FDQTtBQUNWLE1BQUksU0FBUyxJQUFJLEdBQUc7QUFDaEIsWUFBUSxTQUFTO0FBQUEsRUFDcEIsV0FDUSxTQUFTLElBQUksR0FBRztBQUNyQixZQUFRLFVBQVU7QUFBQSxFQUNyQixXQUNRLGNBQWMsSUFBSSxLQUFLLENBQUMsY0FBYyxJQUFJLEdBQUc7QUFDbEQsWUFBUSxRQUFRO0FBQUEsRUFDbkIsV0FDUSxRQUFRLElBQUksR0FBRztBQUNwQixZQUFRLE9BQU87QUFBQSxFQUNsQjtBQUNELE1BQUksU0FBUyxJQUFJLEdBQUc7QUFDaEIsWUFBUSxTQUFTO0FBQUEsRUFDcEIsV0FDUSxTQUFTLElBQUksR0FBRztBQUNyQixZQUFRLFVBQVU7QUFBQSxFQUNyQixXQUNRLGNBQWMsSUFBSSxHQUFHO0FBQzFCLFdBQU8sU0FBUyxJQUFJO0FBQUEsRUFDdkI7QUFDRCxTQUFPLENBQUMsS0FBSyxPQUFPO0FBQ3hCO0FBQ0EsU0FBUyxrQkFBa0IsU0FBUyxRQUFRLEtBQUssUUFBUSxpQkFBaUIsZUFBZTtBQUNyRixTQUFPO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxDQUFDLFFBQVE7QUFDZCx1QkFBaUIsY0FBYyxHQUFHO0FBaUI3QjtBQUNELGNBQU07QUFBQSxNQUNUO0FBQUEsSUFDSjtBQUFBLElBQ0QsWUFBWSxDQUFDQyxZQUFXLHVCQUF1QixRQUFRLEtBQUtBLE9BQU07QUFBQSxFQUMxRTtBQUNBO0FBQ0EsU0FBUyx5QkFBeUIsU0FBUyxRQUFRLFNBQVMsU0FBUztBQUNqRSxRQUFNLEVBQUUsV0FBVyxhQUFhLGlCQUFpQkYsZUFBYyxnQkFBZ0IsY0FBYyxhQUFhLGdCQUFpQixJQUFHO0FBQzlILFFBQU0saUJBQWlCLENBQUMsUUFBUTtBQUM1QixRQUFJLE1BQU1BLGNBQWEsU0FBUyxHQUFHO0FBRW5DLFFBQUksT0FBTyxRQUFRLGlCQUFpQjtBQUNoQyxZQUFNLENBQUssRUFBQSxFQUFBRyxRQUFPLElBQUkscUJBQXFCLGlCQUFpQixLQUFLLFFBQVEsZ0JBQWdCLGNBQWMsV0FBVztBQUNsSCxZQUFNSCxjQUFhRyxVQUFTLEdBQUc7QUFBQSxJQUNsQztBQUNELFFBQUksU0FBUyxHQUFHLEdBQUc7QUFDZixVQUFJLFdBQVc7QUFDZixZQUFNLGdCQUFnQixNQUFNO0FBQ3hCLG1CQUFXO0FBQUEsTUFDM0I7QUFDWSxZQUFNLE1BQU0scUJBQXFCLFNBQVMsS0FBSyxRQUFRLEtBQUssS0FBSyxhQUFhO0FBQzlFLGFBQU8sQ0FBQyxXQUNGLE1BQ0E7QUFBQSxJQUNULFdBQ1Esa0JBQWtCLEdBQUcsR0FBRztBQUM3QixhQUFPO0FBQUEsSUFDVixPQUNJO0FBRUQsYUFBTztBQUFBLElBQ1Y7QUFBQSxFQUNUO0FBQ0ksUUFBTSxhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVO0FBQUEsRUFDbEI7QUFDSSxNQUFJLFFBQVEsV0FBVztBQUNuQixlQUFXLFlBQVksUUFBUTtBQUFBLEVBQ2xDO0FBQ0QsTUFBSSxRQUFRLE1BQU07QUFDZCxlQUFXLE9BQU8sUUFBUTtBQUFBLEVBQzdCO0FBQ0QsTUFBSSxRQUFRLE9BQU87QUFDZixlQUFXLFFBQVEsUUFBUTtBQUFBLEVBQzlCO0FBQ0QsTUFBSSxTQUFTLFFBQVEsTUFBTSxHQUFHO0FBQzFCLGVBQVcsY0FBYyxRQUFRO0FBQUEsRUFDcEM7QUFDRCxTQUFPO0FBQ1g7QUFTQSxTQUFTLFNBQVMsWUFBWSxNQUFNO0FBQ2hDLFFBQU0sRUFBRSxpQkFBaUIsYUFBYSxnQkFBZ0IsUUFBUSxpQkFBa0IsSUFBRztBQUNuRixRQUFNLEVBQUUscUJBQXNCLElBQUc7QUFLakMsUUFBTSxDQUFDLEtBQUssT0FBTyxTQUFTLFNBQVMsSUFBSSxrQkFBa0IsR0FBRyxJQUFJO0FBQ2xFLFFBQU0sY0FBYyxVQUFVLFFBQVEsV0FBVyxJQUMzQyxRQUFRLGNBQ1IsUUFBUTtBQUNPLFlBQVUsUUFBUSxZQUFZLElBQzdDLFFBQVEsZUFDUixRQUFRO0FBQ2QsUUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRO0FBQ3ZCLFFBQU0sU0FBUyxTQUFTLFFBQVEsTUFBTSxJQUFJLFFBQVEsU0FBUyxRQUFRO0FBQ25FLFFBQU0sVUFBVTtBQUFBLElBQWlCO0FBQUEsSUFDakM7QUFBQSxJQUFnQjtBQUFBLEVBQU07QUFDdEIsTUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLFFBQVEsSUFBSTtBQUM5QixXQUFPLElBQUksS0FBSyxlQUFlLFFBQVEsU0FBUyxFQUFFLE9BQU8sS0FBSztBQUFBLEVBQ2pFO0FBRUQsTUFBSSxpQkFBaUIsQ0FBQTtBQUNyQixNQUFJO0FBQ0osTUFBSSxTQUFTO0FBR2IsUUFBTSxPQUFPO0FBQ2IsV0FBUyxJQUFJLEdBQUcsSUFBSSxRQUFRLFFBQVEsS0FBSztBQUNyQyxtQkFBb0IsUUFBUTtBQXNCNUIscUJBQ0ksZ0JBQWdCLGlCQUFpQjtBQUNyQyxhQUFTLGVBQWU7QUFDeEIsUUFBSSxjQUFjLE1BQU07QUFDcEI7QUFDSixrQkFBYyxTQUFTLEtBQUssY0FBYyxhQUFhLElBQUk7QUFBQSxFQUU5RDtBQUVELE1BQUksQ0FBQyxjQUFjLE1BQU0sS0FBSyxDQUFDLFNBQVMsWUFBWSxHQUFHO0FBQ25ELFdBQU8sY0FBYyxlQUFlO0FBQUEsRUFDdkM7QUFDRCxNQUFJLEtBQUssR0FBRyxpQkFBaUI7QUFDN0IsTUFBSSxDQUFDLGNBQWMsU0FBUyxHQUFHO0FBQzNCLFNBQUssR0FBRyxPQUFPLEtBQUssVUFBVSxTQUFTO0FBQUEsRUFDMUM7QUFDRCxNQUFJLFlBQVkscUJBQXFCLElBQUksRUFBRTtBQUMzQyxNQUFJLENBQUMsV0FBVztBQUNaLGdCQUFZLElBQUksS0FBSyxlQUFlLGNBQWMsT0FBTyxJQUFJLFFBQVEsU0FBUyxDQUFDO0FBQy9FLHlCQUFxQixJQUFJLElBQUksU0FBUztBQUFBLEVBQ3pDO0FBQ0QsU0FBTyxDQUFDLE9BQU8sVUFBVSxPQUFPLEtBQUssSUFBSSxVQUFVLGNBQWMsS0FBSztBQUMxRTtBQUVBLE1BQU0sK0JBQStCO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0o7QUFFQSxTQUFTLHFCQUFxQixNQUFNO0FBQ2hDLFFBQU0sQ0FBQyxNQUFNLE1BQU0sTUFBTSxJQUFJLElBQUk7QUFDakMsUUFBTSxVQUFVLENBQUE7QUFDaEIsTUFBSSxZQUFZLENBQUE7QUFDaEIsTUFBSTtBQUNKLE1BQUksU0FBUyxJQUFJLEdBQUc7QUFHaEIsVUFBTSxVQUFVLEtBQUssTUFBTSxnQ0FBZ0M7QUFDM0QsUUFBSSxDQUFDLFNBQVM7QUFDVixZQUFNLGdCQUFnQixlQUFlLHlCQUF5QjtBQUFBLElBQ2pFO0FBR0QsVUFBTSxXQUFXLFFBQVEsS0FDbkIsUUFBUSxHQUFHLEtBQUksRUFBRyxXQUFXLEdBQUcsSUFDNUIsR0FBRyxRQUFRLEdBQUcsS0FBSSxJQUFLLFFBQVEsR0FBRyxLQUFJLE1BQ3RDLEdBQUcsUUFBUSxHQUFHLEtBQU0sS0FBSSxRQUFRLEdBQUcsS0FBSSxNQUMzQyxRQUFRLEdBQUc7QUFDakIsWUFBUSxJQUFJLEtBQUssUUFBUTtBQUN6QixRQUFJO0FBRUEsWUFBTSxZQUFXO0FBQUEsSUFDcEIsU0FDTSxHQUFQO0FBQ0ksWUFBTSxnQkFBZ0IsZUFBZSx5QkFBeUI7QUFBQSxJQUNqRTtBQUFBLEVBQ0osV0FDUSxPQUFPLElBQUksR0FBRztBQUNuQixRQUFJLE1BQU0sS0FBSyxRQUFPLENBQUUsR0FBRztBQUN2QixZQUFNLGdCQUFnQixlQUFlLHFCQUFxQjtBQUFBLElBQzdEO0FBQ0QsWUFBUTtBQUFBLEVBQ1gsV0FDUSxTQUFTLElBQUksR0FBRztBQUNyQixZQUFRO0FBQUEsRUFDWCxPQUNJO0FBQ0QsVUFBTSxnQkFBZ0IsZUFBZSxnQkFBZ0I7QUFBQSxFQUN4RDtBQUNELE1BQUksU0FBUyxJQUFJLEdBQUc7QUFDaEIsWUFBUSxNQUFNO0FBQUEsRUFDakIsV0FDUSxjQUFjLElBQUksR0FBRztBQUMxQixXQUFPLEtBQUssSUFBSSxFQUFFLFFBQVEsU0FBTztBQUM3QixVQUFJLDZCQUE2QixTQUFTLEdBQUcsR0FBRztBQUM1QyxrQkFBVSxPQUFPLEtBQUs7QUFBQSxNQUN6QixPQUNJO0FBQ0QsZ0JBQVEsT0FBTyxLQUFLO0FBQUEsTUFDdkI7QUFBQSxJQUNiLENBQVM7QUFBQSxFQUNKO0FBQ0QsTUFBSSxTQUFTLElBQUksR0FBRztBQUNoQixZQUFRLFNBQVM7QUFBQSxFQUNwQixXQUNRLGNBQWMsSUFBSSxHQUFHO0FBQzFCLGdCQUFZO0FBQUEsRUFDZjtBQUNELE1BQUksY0FBYyxJQUFJLEdBQUc7QUFDckIsZ0JBQVk7QUFBQSxFQUNmO0FBQ0QsU0FBTyxDQUFDLFFBQVEsT0FBTyxJQUFJLE9BQU8sU0FBUyxTQUFTO0FBQ3hEO0FBRUEsU0FBUyxvQkFBb0IsS0FBSyxRQUFRLFFBQVE7QUFDOUMsUUFBTSxVQUFVO0FBQ2hCLGFBQVcsT0FBTyxRQUFRO0FBQ3RCLFVBQU0sS0FBSyxHQUFHLFdBQVc7QUFDekIsUUFBSSxDQUFDLFFBQVEscUJBQXFCLElBQUksRUFBRSxHQUFHO0FBQ3ZDO0FBQUEsSUFDSDtBQUNELFlBQVEscUJBQXFCLE9BQU8sRUFBRTtBQUFBLEVBQ3pDO0FBQ0w7QUFHQSxTQUFTLE9BQU8sWUFBWSxNQUFNO0FBQzlCLFFBQU0sRUFBRSxlQUFlLGFBQWEsZ0JBQWdCLFFBQVEsaUJBQWtCLElBQUc7QUFDakYsUUFBTSxFQUFFLG1CQUFvQixJQUFHO0FBSy9CLFFBQU0sQ0FBQyxLQUFLLE9BQU8sU0FBUyxTQUFTLElBQUksZ0JBQWdCLEdBQUcsSUFBSTtBQUNoRSxRQUFNLGNBQWMsVUFBVSxRQUFRLFdBQVcsSUFDM0MsUUFBUSxjQUNSLFFBQVE7QUFDTyxZQUFVLFFBQVEsWUFBWSxJQUM3QyxRQUFRLGVBQ1IsUUFBUTtBQUNkLFFBQU0sT0FBTyxDQUFDLENBQUMsUUFBUTtBQUN2QixRQUFNLFNBQVMsU0FBUyxRQUFRLE1BQU0sSUFBSSxRQUFRLFNBQVMsUUFBUTtBQUNuRSxRQUFNLFVBQVU7QUFBQSxJQUFpQjtBQUFBLElBQ2pDO0FBQUEsSUFBZ0I7QUFBQSxFQUFNO0FBQ3RCLE1BQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxRQUFRLElBQUk7QUFDOUIsV0FBTyxJQUFJLEtBQUssYUFBYSxRQUFRLFNBQVMsRUFBRSxPQUFPLEtBQUs7QUFBQSxFQUMvRDtBQUVELE1BQUksZUFBZSxDQUFBO0FBQ25CLE1BQUk7QUFDSixNQUFJLFNBQVM7QUFHYixRQUFNLE9BQU87QUFDYixXQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFLO0FBQ3JDLG1CQUFvQixRQUFRO0FBc0I1QixtQkFDSSxjQUFjLGlCQUFpQjtBQUNuQyxhQUFTLGFBQWE7QUFDdEIsUUFBSSxjQUFjLE1BQU07QUFDcEI7QUFDSixrQkFBYyxTQUFTLEtBQUssY0FBYyxhQUFhLElBQUk7QUFBQSxFQUU5RDtBQUVELE1BQUksQ0FBQyxjQUFjLE1BQU0sS0FBSyxDQUFDLFNBQVMsWUFBWSxHQUFHO0FBQ25ELFdBQU8sY0FBYyxlQUFlO0FBQUEsRUFDdkM7QUFDRCxNQUFJLEtBQUssR0FBRyxpQkFBaUI7QUFDN0IsTUFBSSxDQUFDLGNBQWMsU0FBUyxHQUFHO0FBQzNCLFNBQUssR0FBRyxPQUFPLEtBQUssVUFBVSxTQUFTO0FBQUEsRUFDMUM7QUFDRCxNQUFJLFlBQVksbUJBQW1CLElBQUksRUFBRTtBQUN6QyxNQUFJLENBQUMsV0FBVztBQUNaLGdCQUFZLElBQUksS0FBSyxhQUFhLGNBQWMsT0FBTyxJQUFJLFFBQVEsU0FBUyxDQUFDO0FBQzdFLHVCQUFtQixJQUFJLElBQUksU0FBUztBQUFBLEVBQ3ZDO0FBQ0QsU0FBTyxDQUFDLE9BQU8sVUFBVSxPQUFPLEtBQUssSUFBSSxVQUFVLGNBQWMsS0FBSztBQUMxRTtBQUVBLE1BQU0sNkJBQTZCO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0o7QUFFQSxTQUFTLG1CQUFtQixNQUFNO0FBQzlCLFFBQU0sQ0FBQyxNQUFNLE1BQU0sTUFBTSxJQUFJLElBQUk7QUFDakMsUUFBTSxVQUFVLENBQUE7QUFDaEIsTUFBSSxZQUFZLENBQUE7QUFDaEIsTUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHO0FBQ2pCLFVBQU0sZ0JBQWdCLGVBQWUsZ0JBQWdCO0FBQUEsRUFDeEQ7QUFDRCxRQUFNLFFBQVE7QUFDZCxNQUFJLFNBQVMsSUFBSSxHQUFHO0FBQ2hCLFlBQVEsTUFBTTtBQUFBLEVBQ2pCLFdBQ1EsY0FBYyxJQUFJLEdBQUc7QUFDMUIsV0FBTyxLQUFLLElBQUksRUFBRSxRQUFRLFNBQU87QUFDN0IsVUFBSSwyQkFBMkIsU0FBUyxHQUFHLEdBQUc7QUFDMUMsa0JBQVUsT0FBTyxLQUFLO0FBQUEsTUFDekIsT0FDSTtBQUNELGdCQUFRLE9BQU8sS0FBSztBQUFBLE1BQ3ZCO0FBQUEsSUFDYixDQUFTO0FBQUEsRUFDSjtBQUNELE1BQUksU0FBUyxJQUFJLEdBQUc7QUFDaEIsWUFBUSxTQUFTO0FBQUEsRUFDcEIsV0FDUSxjQUFjLElBQUksR0FBRztBQUMxQixnQkFBWTtBQUFBLEVBQ2Y7QUFDRCxNQUFJLGNBQWMsSUFBSSxHQUFHO0FBQ3JCLGdCQUFZO0FBQUEsRUFDZjtBQUNELFNBQU8sQ0FBQyxRQUFRLE9BQU8sSUFBSSxPQUFPLFNBQVMsU0FBUztBQUN4RDtBQUVBLFNBQVMsa0JBQWtCLEtBQUssUUFBUSxRQUFRO0FBQzVDLFFBQU0sVUFBVTtBQUNoQixhQUFXLE9BQU8sUUFBUTtBQUN0QixVQUFNLEtBQUssR0FBRyxXQUFXO0FBQ3pCLFFBQUksQ0FBQyxRQUFRLG1CQUFtQixJQUFJLEVBQUUsR0FBRztBQUNyQztBQUFBLElBQ0g7QUFDRCxZQUFRLG1CQUFtQixPQUFPLEVBQUU7QUFBQSxFQUN2QztBQUNMO0FDM2hEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsTUFBTSxvQkFBb0I7QUFBQSxFQUN0QixDQUFDLGlDQUE4QztBQUFBLEVBQy9DLENBQUMsZ0NBQXVEO0FBQUEsRUFDeEQsQ0FBQyxzQkFBcUM7QUFDMUM7QUFDQSxNQUFNLDBCQUEwQjtBQUFBLEVBQzVCLENBQUMsZ0NBQXVEO0FBQzVEO0FBQ0EsTUFBTSw0QkFBNEI7QUFBQSxFQUM5QixDQUFDLHNCQUFxQztBQUMxQztBQ2ZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtQkEsTUFBTSxVQUFVO0FBeUJILGNBQWM7QUF3QjNCLElBQUksT0FBTyxrQkFBa0I7QUFDN0IsTUFBTSxNQUFNLE1BQU0sRUFBRTtBQUNwQixNQUFNLGlCQUFpQjtBQUFBLEVBRW5CLHdCQUF3QjtBQUFBLEVBRXhCLGtCQUFrQixJQUFLO0FBQUEsRUFFdkIsd0JBQXdCLElBQUs7QUFBQSxFQUM3QixlQUFlLElBQUs7QUFBQSxFQUNwQiw4QkFBOEIsSUFBSztBQUFBLEVBRW5DLGdCQUFnQixJQUFLO0FBQUEsRUFDckIsZUFBZSxJQUFLO0FBQUEsRUFFcEIsa0NBQWtDLElBQUs7QUFBQSxFQUN2Qyw0QkFBNEIsSUFBSztBQUFBLEVBRWpDLGtCQUFrQixJQUFLO0FBQUEsRUFFdkIsZ0NBQWdDLElBQUs7QUFBQSxFQUVyQywyQkFBMkIsSUFBSztBQUFBLEVBRWhDLDhDQUE4QyxJQUFLO0FBQUEsRUFFbkQscUNBQXFDLElBQUs7QUFBQSxFQUUxQyxrQkFBa0IsSUFBSztBQUMzQjtBQUNBLFNBQVMsZ0JBQWdCVCxVQUFTLE1BQU07QUFDcEMsU0FBTyxtQkFBbUJBLE9BQU0sTUFBb0YsTUFBUztBQUNqSTtBQWtCQSxNQUFNLHVCQUNTLDJCQUFXLGtCQUFrQjtBQUM1QyxNQUFNLHNCQUFxQywyQkFBVyxpQkFBaUI7QUFDdkUsTUFBTSxvQkFBbUMsMkJBQVcsZUFBZTtBQUNuRSxNQUFNLGdCQUErQiwyQkFBVyxpQkFBaUI7QUFDakUsTUFBTSxpQkFBZ0MsMkJBQVcsa0JBQWtCO0FBQ25FLE1BQU0sdUJBQXVCLFdBQVcsa0JBQWtCO0FBQzFELFdBQVcsZUFBZTtBQUMxQixNQUFNLG1CQUFrQywyQkFBVyxvQkFBb0I7QUFPdkUsU0FBUyxlQUFlLEtBQUs7QUFFekIsTUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHO0FBQ2hCLFdBQU87QUFBQSxFQUNWO0FBQ0QsYUFBVyxPQUFPLEtBQUs7QUFFbkIsUUFBSSxDQUFDLE9BQU8sS0FBSyxHQUFHLEdBQUc7QUFDbkI7QUFBQSxJQUNIO0FBRUQsUUFBSSxDQUFDLElBQUksU0FBUyxHQUFHLEdBQUc7QUFFcEIsVUFBSSxTQUFTLElBQUksSUFBSSxHQUFHO0FBQ3BCLHVCQUFlLElBQUksSUFBSTtBQUFBLE1BQzFCO0FBQUEsSUFDSixPQUVJO0FBRUQsWUFBTSxVQUFVLElBQUksTUFBTSxHQUFHO0FBQzdCLFlBQU0sWUFBWSxRQUFRLFNBQVM7QUFDbkMsVUFBSSxhQUFhO0FBQ2pCLGVBQVMsSUFBSSxHQUFHLElBQUksV0FBVyxLQUFLO0FBQ2hDLFlBQUksRUFBRSxRQUFRLE1BQU0sYUFBYTtBQUM3QixxQkFBVyxRQUFRLE1BQU0sQ0FBQTtBQUFBLFFBQzVCO0FBQ0QscUJBQWEsV0FBVyxRQUFRO0FBQUEsTUFDbkM7QUFFRCxpQkFBVyxRQUFRLGNBQWMsSUFBSTtBQUNyQyxhQUFPLElBQUk7QUFFWCxVQUFJLFNBQVMsV0FBVyxRQUFRLFdBQVcsR0FBRztBQUMxQyx1QkFBZSxXQUFXLFFBQVEsV0FBVztBQUFBLE1BQ2hEO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDRCxTQUFPO0FBQ1g7QUFDQSxTQUFTLGtCQUFrQixRQUFRLFNBQVM7QUFDeEMsUUFBTSxFQUFFLFVBQUFDLFdBQVUsUUFBUSxpQkFBaUIsU0FBUSxJQUFLO0FBRXhELFFBQU0sTUFBTSxjQUFjQSxTQUFRLElBQzVCQSxZQUNBLFFBQVEsTUFBTSxJQUNWLENBQUUsSUFDRixFQUFFLENBQUMsU0FBUyxDQUFBO0FBRXRCLE1BQUksUUFBUSxNQUFNLEdBQUc7QUFDakIsV0FBTyxRQUFRLFlBQVU7QUFDckIsVUFBSSxZQUFZLFVBQVUsY0FBYyxRQUFRO0FBQzVDLGNBQU0sRUFBRSxRQUFBUyxTQUFRLFNBQVUsSUFBRztBQUM3QixZQUFJQSxTQUFRO0FBQ1IsY0FBSUEsV0FBVSxJQUFJQSxZQUFXLENBQUE7QUFDN0IsbUJBQVMsVUFBVSxJQUFJQSxRQUFPO0FBQUEsUUFDakMsT0FDSTtBQUNELG1CQUFTLFVBQVUsR0FBRztBQUFBLFFBQ3pCO0FBQUEsTUFDSixPQUNJO0FBQ0QsaUJBQVMsTUFBTSxLQUFLLFNBQVMsS0FBSyxNQUFNLE1BQU0sR0FBRyxHQUFHO0FBQUEsTUFDdkQ7QUFBQSxJQUNiLENBQVM7QUFBQSxFQUNKO0FBRUQsTUFBSSxtQkFBbUIsUUFBUSxVQUFVO0FBQ3JDLGVBQVcsT0FBTyxLQUFLO0FBQ25CLFVBQUksT0FBTyxLQUFLLEdBQUcsR0FBRztBQUNsQix1QkFBZSxJQUFJLElBQUk7QUFBQSxNQUMxQjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0QsU0FBTztBQUNYO0FBQ0EsTUFBTSx1QkFBdUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssUUFBUSxHQUFHO0FBRW5FLFNBQVMsU0FBUyxLQUFLLEtBQUs7QUFFeEIsTUFBSSxxQkFBcUIsR0FBRyxLQUFLLHFCQUFxQixHQUFHLEdBQUc7QUFDeEQsVUFBTSxnQkFBZ0IsZUFBZSxhQUFhO0FBQUEsRUFDckQ7QUFDRCxhQUFXLE9BQU8sS0FBSztBQUNuQixRQUFJLE9BQU8sS0FBSyxHQUFHLEdBQUc7QUFDbEIsVUFBSSxxQkFBcUIsSUFBSSxJQUFJLEtBQUsscUJBQXFCLElBQUksSUFBSSxHQUFHO0FBSWxFLFlBQUksT0FBTyxJQUFJO0FBQUEsTUFDbEIsT0FDSTtBQUVELGlCQUFTLElBQUksTUFBTSxJQUFJLElBQUk7QUFBQSxNQUM5QjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0w7QUFFQSxTQUFTLG9CQUFvQixVQUFVO0FBQ25DLFNBQU8sU0FBUztBQUNwQjtBQUNBLFNBQVMsb0JBQW9CQyxTQUFRLFNBQVMsa0JBQzVDO0FBQ0UsTUFBSVYsWUFBVyxTQUFTLFFBQVEsUUFBUSxJQUFJLFFBQVEsV0FBVztBQUMvRCxNQUFJLGtCQUFrQixrQkFBa0I7QUFDcEMsSUFBQUEsWUFBVyxrQkFBa0JVLFFBQU8sT0FBTyxPQUFPO0FBQUEsTUFDOUMsVUFBQVY7QUFBQSxNQUNBLFFBQVEsaUJBQWlCO0FBQUEsSUFDckMsQ0FBUztBQUFBLEVBQ0o7QUFFRCxRQUFNLFVBQVUsT0FBTyxLQUFLQSxTQUFRO0FBQ3BDLE1BQUksUUFBUSxRQUFRO0FBQ2hCLFlBQVEsUUFBUSxZQUFVO0FBQ3RCLE1BQUFVLFFBQU8sbUJBQW1CLFFBQVFWLFVBQVMsT0FBTztBQUFBLElBQzlELENBQVM7QUFBQSxFQUNKO0FBQ0Q7QUFFSSxRQUFJLFNBQVMsUUFBUSxlQUFlLEdBQUc7QUFDbkMsWUFBTVcsV0FBVSxPQUFPLEtBQUssUUFBUSxlQUFlO0FBQ25ELFVBQUlBLFNBQVEsUUFBUTtBQUNoQixRQUFBQSxTQUFRLFFBQVEsWUFBVTtBQUN0QixVQUFBRCxRQUFPLG9CQUFvQixRQUFRLFFBQVEsZ0JBQWdCLE9BQU87QUFBQSxRQUN0RixDQUFpQjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBRUQsUUFBSSxTQUFTLFFBQVEsYUFBYSxHQUFHO0FBQ2pDLFlBQU1DLFdBQVUsT0FBTyxLQUFLLFFBQVEsYUFBYTtBQUNqRCxVQUFJQSxTQUFRLFFBQVE7QUFDaEIsUUFBQUEsU0FBUSxRQUFRLFlBQVU7QUFDdEIsVUFBQUQsUUFBTyxrQkFBa0IsUUFBUSxRQUFRLGNBQWMsT0FBTztBQUFBLFFBQ2xGLENBQWlCO0FBQUEsTUFDSjtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0w7QUFDQSxTQUFTLGVBQWUsS0FBSztBQUN6QixTQUFPLFlBQVksTUFBTSxNQUFNLEtBQUssQ0FBQztBQUV6QztBQUtBLE1BQU0sZ0JBQWdCO0FBQ3RCLElBQUksYUFBYTtBQUNqQixTQUFTLHlCQUF5QixTQUFTO0FBQ3ZDLFNBQVEsQ0FBQyxLQUFLLFFBQVEsS0FBSyxTQUFTO0FBQ2hDLFdBQU8sUUFBUSxRQUFRLEtBQUssbUJBQWtCLEtBQU0sUUFBVyxJQUFJO0FBQUEsRUFDM0U7QUFDQTtBQUVBLE1BQU0sY0FBZSxNQUFNO0FBQ3ZCLFFBQU0sV0FBVztBQUNqQixNQUFJLE9BQU87QUFDWCxTQUFPLGFBQWEsT0FBTyxvQkFBb0IsUUFBUSxFQUFFLGtCQUNuRCxFQUFFLENBQUMsZ0JBQWdCLEtBQU0sSUFDekI7QUFDVjtBQU9BLFNBQVMsZUFBZSxVQUFVLENBQUUsR0FBRSxlQUFlO0FBQ2pELFFBQU0sRUFBRSxPQUFRLElBQUc7QUFDbkIsUUFBTSxZQUFZLFdBQVc7QUFDN0IsTUFBSSxpQkFBaUIsVUFBVSxRQUFRLGFBQWEsSUFDOUMsUUFBUSxnQkFDUjtBQUNOLFFBQU0sVUFBVTtBQUFBLElBRWhCLFVBQVUsaUJBQ0osT0FBTyxPQUFPLFFBQ2QsU0FBUyxRQUFRLE1BQU0sSUFDbkIsUUFBUSxTQUNSO0FBQUEsRUFBYztBQUN4QixRQUFNLGtCQUFrQjtBQUFBLElBRXhCLFVBQVUsaUJBQ0osT0FBTyxlQUFlLFFBQ3RCLFNBQVMsUUFBUSxjQUFjLEtBQzdCLFFBQVEsUUFBUSxjQUFjLEtBQzlCLGNBQWMsUUFBUSxjQUFjLEtBQ3BDLFFBQVEsbUJBQW1CLFFBQ3pCLFFBQVEsaUJBQ1IsUUFBUTtBQUFBLEVBQUs7QUFDdkIsUUFBTSxZQUFZLElBQUksa0JBQWtCLFFBQVEsT0FBTyxPQUFPLENBQUM7QUFFL0QsUUFBTSxtQkFBbUIsSUFBSSxjQUFjLFFBQVEsZUFBZSxJQUN4RCxRQUFRLGtCQUNSLEVBQUUsQ0FBQyxRQUFRLFFBQVEsQ0FBQSxHQUFJO0FBR2pDLFFBQU0saUJBQWlCLElBQUksY0FBYyxRQUFRLGFBQWEsSUFDcEQsUUFBUSxnQkFDUixFQUFFLENBQUMsUUFBUSxRQUFRLENBQUEsR0FBSTtBQUlqQyxNQUFJLGVBQWUsU0FDYixPQUFPLGNBQ1AsVUFBVSxRQUFRLFdBQVcsS0FBSyxTQUFTLFFBQVEsV0FBVyxJQUMxRCxRQUFRLGNBQ1I7QUFFVixNQUFJLGdCQUFnQixTQUNkLE9BQU8sZUFDUCxVQUFVLFFBQVEsWUFBWSxLQUFLLFNBQVMsUUFBUSxZQUFZLElBQzVELFFBQVEsZUFDUjtBQUVWLE1BQUksZ0JBQWdCLFNBQ2QsT0FBTyxlQUNQLFVBQVUsUUFBUSxZQUFZLElBQzFCLFFBQVEsZUFDUjtBQUVWLE1BQUksa0JBQWtCLENBQUMsQ0FBQyxRQUFRO0FBRWhDLE1BQUksV0FBVyxXQUFXLFFBQVEsT0FBTyxJQUFJLFFBQVEsVUFBVTtBQUMvRCxNQUFJLGtCQUFrQixXQUFXLFFBQVEsT0FBTyxJQUMxQyx5QkFBeUIsUUFBUSxPQUFPLElBQ3hDO0FBRU4sTUFBSSxtQkFBbUIsV0FBVyxRQUFRLGVBQWUsSUFDbkQsUUFBUSxrQkFDUjtBQUVOLE1BQUksbUJBQW1CLFNBQ2pCLE9BQU8sa0JBQ1AsVUFBVSxRQUFRLGVBQWUsSUFDN0IsUUFBUSxrQkFDUjtBQUNWLE1BQUksbUJBQW1CLENBQUMsQ0FBQyxRQUFRO0FBR2pDLFFBQU0sYUFBYSxTQUNiLE9BQU8sWUFDUCxjQUFjLFFBQVEsU0FBUyxJQUMzQixRQUFRLFlBQ1I7QUFFVixNQUFJLGVBQWUsUUFBUSxlQUFnQixVQUFVLE9BQU87QUFHNUQsTUFBSTtBQUNKLFFBQU0saUJBQWlCLE1BQU07QUFDekIsaUJBQWEsbUJBQW1CLElBQUk7QUFDcEMsVUFBTSxhQUFhO0FBQUEsTUFDZixTQUFTO0FBQUEsTUFDVCxRQUFRLFFBQVE7QUFBQSxNQUNoQixnQkFBZ0IsZ0JBQWdCO0FBQUEsTUFDaEMsVUFBVSxVQUFVO0FBQUEsTUFDcEIsV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2IsU0FBUyxvQkFBb0IsT0FBTyxTQUFZO0FBQUEsTUFDaEQsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLE1BQ2QsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsaUJBQWlCLHFCQUFxQixPQUFPLFNBQVk7QUFBQSxNQUN6RCxpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUI7QUFBQSxNQUNqQixpQkFBaUIsUUFBUTtBQUFBLE1BQ3pCLFFBQVEsRUFBRSxXQUFXLE1BQU87QUFBQSxJQUN4QztBQUNRO0FBQ0ksaUJBQVcsa0JBQWtCLGlCQUFpQjtBQUM5QyxpQkFBVyxnQkFBZ0IsZUFBZTtBQUMxQyxpQkFBVyx1QkFBdUIsY0FBYyxRQUFRLElBQ2xELFNBQVMsdUJBQ1Q7QUFDTixpQkFBVyxxQkFBcUIsY0FBYyxRQUFRLElBQ2hELFNBQVMscUJBQ1Q7QUFBQSxJQUNUO0FBTUQsVUFBTSxNQUFNLGtCQUFrQixVQUFVO0FBQ3hDLGlCQUFhLG1CQUFtQixHQUFHO0FBQ25DLFdBQU87QUFBQSxFQUNmO0FBQ0ksYUFBVyxlQUFjO0FBQ3pCLHVCQUFxQixVQUFVLFFBQVEsT0FBTyxnQkFBZ0IsS0FBSztBQUVuRSxXQUFTLHdCQUF3QjtBQUM3QixXQUFPO0FBQUEsTUFDQyxRQUFRO0FBQUEsTUFDUixnQkFBZ0I7QUFBQSxNQUNoQixVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixlQUFlO0FBQUEsSUFDbEI7QUFBQSxFQUVSO0FBRUQsUUFBTSxTQUFTLFNBQVM7QUFBQSxJQUNwQixLQUFLLE1BQU0sUUFBUTtBQUFBLElBQ25CLEtBQUssU0FBTztBQUNSLGNBQVEsUUFBUTtBQUNoQixlQUFTLFNBQVMsUUFBUTtBQUFBLElBQzdCO0FBQUEsRUFDVCxDQUFLO0FBRUQsUUFBTSxpQkFBaUIsU0FBUztBQUFBLElBQzVCLEtBQUssTUFBTSxnQkFBZ0I7QUFBQSxJQUMzQixLQUFLLFNBQU87QUFDUixzQkFBZ0IsUUFBUTtBQUN4QixlQUFTLGlCQUFpQixnQkFBZ0I7QUFDMUMsMkJBQXFCLFVBQVUsUUFBUSxPQUFPLEdBQUc7QUFBQSxJQUNwRDtBQUFBLEVBQ1QsQ0FBSztBQUVELFFBQU1WLFlBQVcsU0FBUyxNQUFNLFVBQVUsS0FBSztBQUUvQyxRQUFNLGtCQUFpQyx5QkFBUyxNQUFNLGlCQUFpQixLQUFLO0FBRTVFLFFBQU0sZ0JBQStCLHlCQUFTLE1BQU0sZUFBZSxLQUFLO0FBRXhFLFdBQVMsNEJBQTRCO0FBQ2pDLFdBQU8sV0FBVyxnQkFBZ0IsSUFBSSxtQkFBbUI7QUFBQSxFQUM1RDtBQUVELFdBQVMsMEJBQTBCLFNBQVM7QUFDeEMsdUJBQW1CO0FBQ25CLGFBQVMsa0JBQWtCO0FBQUEsRUFDOUI7QUFFRCxXQUFTLG9CQUFvQjtBQUN6QixXQUFPO0FBQUEsRUFDVjtBQUVELFdBQVMsa0JBQWtCLFNBQVM7QUFDaEMsUUFBSSxZQUFZLE1BQU07QUFDbEIsd0JBQWtCLHlCQUF5QixPQUFPO0FBQUEsSUFDckQ7QUFDRCxlQUFXO0FBQ1gsYUFBUyxVQUFVO0FBQUEsRUFDdEI7QUFLRCxRQUFNLGVBQWUsQ0FBQyxJQUFJLGdCQUFnQixVQUFVLGlCQUFpQixjQUFjLHFCQUFxQjtBQUNwRztBQUVBLFFBQUk7QUFDc0U7QUFDdEUsVUFBSTtBQUNBLDBCQUFrQixZQUFXLENBQUU7QUFDL0IsWUFBSSxDQUFDLFdBQVc7QUFDWixtQkFBUyxrQkFBa0IsU0FDckIsbUJBQW9CLElBQ3BCO0FBQUEsUUFDVDtBQUNELGNBQU0sR0FBRyxRQUFRO0FBQUEsTUFDcEIsVUFDTztBQUNKLDBCQUFrQixJQUFJO0FBQ3RCLFlBQUksQ0FBQyxXQUFXO0FBQ1osbUJBQVMsa0JBQWtCO0FBQUEsUUFDOUI7QUFBQSxNQUNKO0FBQUEsSUFJSjtBQUNELFFBQUksU0FBUyxHQUFHLEtBQUssUUFBUSxjQUFjO0FBQ3ZDLFlBQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxlQUFjO0FBMEJsQyxhQUFPLFVBQVUsZ0JBQ1gsZ0JBQWdCLE1BQU0sSUFDdEIsYUFBYSxHQUFHO0FBQUEsSUFDekIsV0FDUSxpQkFBaUIsR0FBRyxHQUFHO0FBQzVCLGFBQU87QUFBQSxJQUNWLE9BQ0k7QUFFRCxZQUFNLGdCQUFnQixlQUFlLHNCQUFzQjtBQUFBLElBQzlEO0FBQUEsRUFDVDtBQUVJLFdBQVMsS0FBSyxNQUFNO0FBQ2hCLFdBQU8sYUFBYSxhQUFXLFFBQVEsTUFBTSxXQUFXLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsYUFBYSxVQUFRLFFBQVEsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBTyxLQUFLLFNBQU8sU0FBUyxHQUFHLENBQUM7QUFBQSxFQUN0TjtBQUVELFdBQVMsTUFBTSxNQUFNO0FBQ2pCLFVBQU0sQ0FBQyxNQUFNLE1BQU0sSUFBSSxJQUFJO0FBQzNCLFFBQUksUUFBUSxDQUFDLFNBQVMsSUFBSSxHQUFHO0FBQ3pCLFlBQU0sZ0JBQWdCLGVBQWUsZ0JBQWdCO0FBQUEsSUFDeEQ7QUFDRCxXQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sTUFBTSxPQUFPLEVBQUUsaUJBQWlCLEtBQUksR0FBSSxRQUFRLENBQUUsQ0FBQSxDQUFDLENBQUM7QUFBQSxFQUMxRTtBQUVELFdBQVMsS0FBSyxNQUFNO0FBQ2hCLFdBQU8sYUFBYSxhQUFXLFFBQVEsTUFBTSxVQUFVLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsbUJBQW1CLFVBQVEsUUFBUSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxNQUFNLHVCQUF1QixTQUFPLFNBQVMsR0FBRyxDQUFDO0FBQUEsRUFDM087QUFFRCxXQUFTLEtBQUssTUFBTTtBQUNoQixXQUFPLGFBQWEsYUFBVyxRQUFRLE1BQU0sUUFBUSxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLGlCQUFpQixVQUFRLFFBQVEsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSx1QkFBdUIsU0FBTyxTQUFTLEdBQUcsQ0FBQztBQUFBLEVBQ3JPO0FBRUQsV0FBUyxVQUFVLFFBQVE7QUFDdkIsV0FBTyxPQUFPLElBQUksU0FBTyxTQUFTLEdBQUcsS0FBSyxTQUFTLEdBQUcsS0FBSyxVQUFVLEdBQUcsSUFDbEUsZUFBZSxPQUFPLEdBQUcsQ0FBQyxJQUMxQixHQUFHO0FBQUEsRUFDWjtBQUNELFFBQU0sY0FBYyxDQUFDLFFBQVE7QUFDN0IsUUFBTSxZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU07QUFBQSxFQUNkO0FBRUksV0FBUyxrQkFBa0IsTUFBTTtBQUM3QixXQUFPO0FBQUEsTUFBYSxhQUFXO0FBQzNCLFlBQUk7QUFDSixjQUFNWSxZQUFXO0FBQ2pCLFlBQUk7QUFDQSxVQUFBQSxVQUFTLFlBQVk7QUFDckIsZ0JBQU0sUUFBUSxNQUFNLFdBQVcsTUFBTSxDQUFDQSxXQUFVLEdBQUcsSUFBSSxDQUFDO0FBQUEsUUFDM0QsVUFDTztBQUNKLFVBQUFBLFVBQVMsWUFBWTtBQUFBLFFBQ3hCO0FBQ0QsZUFBTztBQUFBLE1BQ1Y7QUFBQSxNQUFFLE1BQU0sbUJBQW1CLEdBQUcsSUFBSTtBQUFBLE1BQUc7QUFBQSxNQUV0QyxVQUFRLEtBQUssc0JBQXNCLEdBQUcsSUFBSTtBQUFBLE1BQUcsU0FBTyxDQUFDLGVBQWUsR0FBRyxDQUFDO0FBQUEsTUFBRyxTQUFPLFFBQVEsR0FBRztBQUFBLElBQUM7QUFBQSxFQUNqRztBQUVELFdBQVMsZUFBZSxNQUFNO0FBQzFCLFdBQU87QUFBQSxNQUFhLGFBQVcsUUFBUSxNQUFNLFFBQVEsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFBQSxNQUFHLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSTtBQUFBLE1BQUc7QUFBQSxNQUVoSCxVQUFRLEtBQUssbUJBQW1CLEdBQUcsSUFBSTtBQUFBLE1BQUcsTUFBTSxDQUFBO0FBQUEsTUFBSSxTQUFPLFNBQVMsR0FBRyxLQUFLLFFBQVEsR0FBRztBQUFBLElBQUM7QUFBQSxFQUMzRjtBQUVELFdBQVMsaUJBQWlCLE1BQU07QUFDNUIsV0FBTztBQUFBLE1BQWEsYUFBVyxRQUFRLE1BQU0sVUFBVSxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUFBLE1BQUcsTUFBTSxrQkFBa0IsR0FBRyxJQUFJO0FBQUEsTUFBRztBQUFBLE1BRXBILFVBQVEsS0FBSyxxQkFBcUIsR0FBRyxJQUFJO0FBQUEsTUFBRyxNQUFNLENBQUE7QUFBQSxNQUFJLFNBQU8sU0FBUyxHQUFHLEtBQUssUUFBUSxHQUFHO0FBQUEsSUFBQztBQUFBLEVBQzdGO0FBQ0QsV0FBUyxlQUFlLE9BQU87QUFDM0IsbUJBQWU7QUFDZixhQUFTLGNBQWM7QUFBQSxFQUMxQjtBQUVELFdBQVMsR0FBRyxLQUFLSCxTQUFRO0FBQ3JCLFVBQU0sZUFBZSxTQUFTQSxPQUFNLElBQUlBLFVBQVMsUUFBUTtBQUN6RCxVQUFNLFVBQVUsaUJBQWlCLFlBQVk7QUFDN0MsV0FBTyxTQUFTLGdCQUFnQixTQUFTLEdBQUcsTUFBTTtBQUFBLEVBQ3JEO0FBQ0QsV0FBUyxnQkFBZ0IsS0FBSztBQUMxQixRQUFJVCxZQUFXO0FBQ2YsVUFBTSxVQUFVLHdCQUF3QixVQUFVLGdCQUFnQixPQUFPLFFBQVEsS0FBSztBQUN0RixhQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsUUFBUSxLQUFLO0FBQ3JDLFlBQU0sdUJBQXVCLFVBQVUsTUFBTSxRQUFRLE9BQU87QUFDNUQsWUFBTSxlQUFlLFNBQVMsZ0JBQWdCLHNCQUFzQixHQUFHO0FBQ3ZFLFVBQUksZ0JBQWdCLE1BQU07QUFDdEIsUUFBQUEsWUFBVztBQUNYO0FBQUEsTUFDSDtBQUFBLElBQ0o7QUFDRCxXQUFPQTtBQUFBLEVBQ1Y7QUFFRCxXQUFTLEdBQUcsS0FBSztBQUNiLFVBQU1BLFlBQVcsZ0JBQWdCLEdBQUc7QUFFcEMsV0FBT0EsYUFBWSxPQUNiQSxZQUNBLFNBQ0ksT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFFLElBQ3BCO0VBQ2I7QUFFRCxXQUFTLGlCQUFpQlMsU0FBUTtBQUM5QixXQUFRLFVBQVUsTUFBTUEsWUFBVyxDQUFBO0FBQUEsRUFDdEM7QUFFRCxXQUFTLGlCQUFpQkEsU0FBUSxTQUFTO0FBQ3ZDLGNBQVUsTUFBTUEsV0FBVTtBQUMxQixhQUFTLFdBQVcsVUFBVTtBQUFBLEVBQ2pDO0FBRUQsV0FBUyxtQkFBbUJBLFNBQVEsU0FBUztBQUN6QyxjQUFVLE1BQU1BLFdBQVUsVUFBVSxNQUFNQSxZQUFXO0FBQ3JELGFBQVMsU0FBUyxVQUFVLE1BQU1BLFFBQU87QUFDekMsYUFBUyxXQUFXLFVBQVU7QUFBQSxFQUNqQztBQUVELFdBQVMsa0JBQWtCQSxTQUFRO0FBQy9CLFdBQU8saUJBQWlCLE1BQU1BLFlBQVcsQ0FBQTtBQUFBLEVBQzVDO0FBRUQsV0FBUyxrQkFBa0JBLFNBQVEsUUFBUTtBQUN2QyxxQkFBaUIsTUFBTUEsV0FBVTtBQUNqQyxhQUFTLGtCQUFrQixpQkFBaUI7QUFDNUMsd0JBQW9CLFVBQVVBLFNBQVEsTUFBTTtBQUFBLEVBQy9DO0FBRUQsV0FBUyxvQkFBb0JBLFNBQVEsUUFBUTtBQUN6QyxxQkFBaUIsTUFBTUEsV0FBVSxPQUFPLGlCQUFpQixNQUFNQSxZQUFXLElBQUksTUFBTTtBQUNwRixhQUFTLGtCQUFrQixpQkFBaUI7QUFDNUMsd0JBQW9CLFVBQVVBLFNBQVEsTUFBTTtBQUFBLEVBQy9DO0FBRUQsV0FBUyxnQkFBZ0JBLFNBQVE7QUFDN0IsV0FBTyxlQUFlLE1BQU1BLFlBQVcsQ0FBQTtBQUFBLEVBQzFDO0FBRUQsV0FBUyxnQkFBZ0JBLFNBQVEsUUFBUTtBQUNyQyxtQkFBZSxNQUFNQSxXQUFVO0FBQy9CLGFBQVMsZ0JBQWdCLGVBQWU7QUFDeEMsc0JBQWtCLFVBQVVBLFNBQVEsTUFBTTtBQUFBLEVBQzdDO0FBRUQsV0FBUyxrQkFBa0JBLFNBQVEsUUFBUTtBQUN2QyxtQkFBZSxNQUFNQSxXQUFVLE9BQU8sZUFBZSxNQUFNQSxZQUFXLElBQUksTUFBTTtBQUNoRixhQUFTLGdCQUFnQixlQUFlO0FBQ3hDLHNCQUFrQixVQUFVQSxTQUFRLE1BQU07QUFBQSxFQUM3QztBQUVEO0FBRUEsTUFBSSxVQUFVLFdBQVc7QUFDckIsVUFBTSxPQUFPLFFBQVEsQ0FBQyxRQUFRO0FBQzFCLFVBQUksZ0JBQWdCO0FBQ2hCLGdCQUFRLFFBQVE7QUFDaEIsaUJBQVMsU0FBUztBQUNsQiw2QkFBcUIsVUFBVSxRQUFRLE9BQU8sZ0JBQWdCLEtBQUs7QUFBQSxNQUN0RTtBQUFBLElBQ2IsQ0FBUztBQUNELFVBQU0sT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRO0FBQ2xDLFVBQUksZ0JBQWdCO0FBQ2hCLHdCQUFnQixRQUFRO0FBQ3hCLGlCQUFTLGlCQUFpQjtBQUMxQiw2QkFBcUIsVUFBVSxRQUFRLE9BQU8sZ0JBQWdCLEtBQUs7QUFBQSxNQUN0RTtBQUFBLElBQ2IsQ0FBUztBQUFBLEVBQ0o7QUFFRCxRQUFNLFdBQVc7QUFBQSxJQUNiLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0EsSUFBSSxnQkFBZ0I7QUFDaEIsYUFBTztBQUFBLElBQ1Y7QUFBQSxJQUNELElBQUksY0FBYyxLQUFLO0FBQ25CLHVCQUFpQjtBQUNqQixVQUFJLE9BQU8sUUFBUTtBQUNmLGdCQUFRLFFBQVEsT0FBTyxPQUFPO0FBQzlCLHdCQUFnQixRQUFRLE9BQU8sZUFBZTtBQUM5Qyw2QkFBcUIsVUFBVSxRQUFRLE9BQU8sZ0JBQWdCLEtBQUs7QUFBQSxNQUN0RTtBQUFBLElBQ0o7QUFBQSxJQUNELElBQUksbUJBQW1CO0FBQ25CLGFBQU8sT0FBTyxLQUFLLFVBQVUsS0FBSyxFQUFFLEtBQUk7QUFBQSxJQUMzQztBQUFBLElBQ0QsVUFBQVQ7QUFBQSxJQUNBLElBQUksWUFBWTtBQUNaLGFBQU87QUFBQSxJQUNWO0FBQUEsSUFDRCxJQUFJLGNBQWM7QUFDZCxhQUFPLGdCQUFnQixDQUFBO0FBQUEsSUFDMUI7QUFBQSxJQUNELElBQUksV0FBVztBQUNYLGFBQU87QUFBQSxJQUNWO0FBQUEsSUFDRCxJQUFJLGNBQWM7QUFDZCxhQUFPO0FBQUEsSUFDVjtBQUFBLElBQ0QsSUFBSSxZQUFZLEtBQUs7QUFDakIscUJBQWU7QUFDZixlQUFTLGNBQWM7QUFBQSxJQUMxQjtBQUFBLElBQ0QsSUFBSSxlQUFlO0FBQ2YsYUFBTztBQUFBLElBQ1Y7QUFBQSxJQUNELElBQUksYUFBYSxLQUFLO0FBQ2xCLHNCQUFnQjtBQUNoQixlQUFTLGVBQWU7QUFBQSxJQUMzQjtBQUFBLElBQ0QsSUFBSSxlQUFlO0FBQ2YsYUFBTztBQUFBLElBQ1Y7QUFBQSxJQUNELElBQUksYUFBYSxLQUFLO0FBQ2xCLHNCQUFnQjtBQUFBLElBQ25CO0FBQUEsSUFDRCxJQUFJLGlCQUFpQjtBQUNqQixhQUFPO0FBQUEsSUFDVjtBQUFBLElBQ0QsSUFBSSxlQUFlLEtBQUs7QUFDcEIsd0JBQWtCO0FBQ2xCLGVBQVMsaUJBQWlCO0FBQUEsSUFDN0I7QUFBQSxJQUNELElBQUksa0JBQWtCO0FBQ2xCLGFBQU87QUFBQSxJQUNWO0FBQUEsSUFDRCxJQUFJLGdCQUFnQixLQUFLO0FBQ3JCLHlCQUFtQjtBQUNuQixlQUFTLGtCQUFrQjtBQUFBLElBQzlCO0FBQUEsSUFDRCxJQUFJLGtCQUFrQjtBQUNsQixhQUFPO0FBQUEsSUFDVjtBQUFBLElBQ0QsSUFBSSxnQkFBZ0IsS0FBSztBQUNyQix5QkFBbUI7QUFDbkIsZUFBUyxrQkFBa0I7QUFBQSxJQUM5QjtBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxDQUFDLHVCQUF1QjtBQUFBLEVBQ2hDO0FBQ0k7QUFDSSxhQUFTLGtCQUFrQjtBQUMzQixhQUFTLGdCQUFnQjtBQUN6QixhQUFTLEtBQUs7QUFDZCxhQUFTLEtBQUs7QUFDZCxhQUFTLEtBQUs7QUFDZCxhQUFTLElBQUk7QUFDYixhQUFTLElBQUk7QUFDYixhQUFTLG9CQUFvQjtBQUM3QixhQUFTLG9CQUFvQjtBQUM3QixhQUFTLHNCQUFzQjtBQUMvQixhQUFTLGtCQUFrQjtBQUMzQixhQUFTLGtCQUFrQjtBQUMzQixhQUFTLG9CQUFvQjtBQUM3QixhQUFTLG9CQUFvQixRQUFRO0FBQ3JDLGFBQVMsd0JBQXdCO0FBQ2pDLGFBQVMsdUJBQXVCO0FBQ2hDLGFBQVMscUJBQXFCO0FBQUEsRUFDakM7QUFVRCxTQUFPO0FBQ1g7QUF3WEEsTUFBTSxrQkFBa0I7QUFBQSxFQUNwQixLQUFLO0FBQUEsSUFDRCxNQUFNLENBQUMsUUFBUSxNQUFNO0FBQUEsRUFDeEI7QUFBQSxFQUNELFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxFQUNUO0FBQUEsRUFDRCxPQUFPO0FBQUEsSUFDSCxNQUFNO0FBQUEsSUFFTixXQUFXLENBQUMsUUFBZ0MsUUFBUSxZQUFZLFFBQVE7QUFBQSxJQUN4RSxTQUFTO0FBQUEsRUFDWjtBQUFBLEVBQ0QsTUFBTTtBQUFBLElBQ0YsTUFBTTtBQUFBLEVBQ1Q7QUFDTDtBQUVBLFNBQVMsa0JBRVQsRUFBRSxNQUFPLEdBQ1QsTUFBTTtBQUNGLE1BQUksS0FBSyxXQUFXLEtBQUssS0FBSyxPQUFPLFdBQVc7QUFFNUMsVUFBTSxNQUFNLE1BQU0sVUFBVSxNQUFNLFFBQVMsSUFBRztBQUU5QyxXQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sWUFBWTtBQUNqQyxhQUFRLE9BQU87QUFBQSxRQUNYLEdBQUc7QUFBQSxRQUNILEdBQUksUUFBUSxRQUFRLFFBQVEsSUFBSSxRQUFRLFdBQVcsQ0FBQyxPQUFPO0FBQUEsTUFDM0U7QUFBQSxJQUNTLEdBQUUsQ0FBRSxDQUFBO0FBQUEsRUFDUixPQUNJO0FBRUQsV0FBTyxLQUFLLE9BQU8sQ0FBQyxLQUFLLFFBQVE7QUFDN0IsWUFBTSxPQUFPLE1BQU07QUFDbkIsVUFBSSxNQUFNO0FBQ04sWUFBSSxPQUFPO01BQ2Q7QUFDRCxhQUFPO0FBQUEsSUFDVixHQUFFLENBQUUsQ0FBQTtBQUFBLEVBQ1I7QUFDTDtBQUVBLFNBQVMsbUJBQW1CLEtBQUs7QUFDN0IsU0FBTztBQUNYO0FBbURBLE1BQU0sY0FBcUM7QUFBQSxFQUV2QyxNQUFNO0FBQUEsRUFDTixPQUFPLE9BQU87QUFBQSxJQUNWLFNBQVM7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNiO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDSixNQUFNLENBQUMsUUFBUSxNQUFNO0FBQUEsTUFFckIsV0FBVyxDQUFDLFFBQVEsU0FBUyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUc7QUFBQSxJQUNsRDtBQUFBLEVBQ0osR0FBRSxlQUFlO0FBQUEsRUFHbEIsTUFBTSxPQUFPLFNBQVM7QUFDbEIsVUFBTSxFQUFFLE9BQU8sTUFBTyxJQUFHO0FBRXpCLFVBQU1FLFFBQU8sTUFBTSxRQUNmLFFBQVE7QUFBQSxNQUNKLFVBQVUsTUFBTTtBQUFBLE1BQ2hCLGdCQUFnQjtBQUFBLElBQ2hDLENBQWE7QUFDTCxXQUFPLE1BQU07QUFDVCxZQUFNLE9BQU8sT0FBTyxLQUFLLEtBQUssRUFBRSxPQUFPLFNBQU8sUUFBUSxHQUFHO0FBQ3pELFlBQU0sVUFBVSxDQUFBO0FBQ2hCLFVBQUksTUFBTSxRQUFRO0FBQ2QsZ0JBQVEsU0FBUyxNQUFNO0FBQUEsTUFDMUI7QUFDRCxVQUFJLE1BQU0sV0FBVyxRQUFXO0FBQzVCLGdCQUFRLFNBQVMsU0FBUyxNQUFNLE1BQU0sSUFBSSxDQUFDLE1BQU0sU0FBUyxNQUFNO0FBQUEsTUFDbkU7QUFDRCxZQUFNLE1BQU0sa0JBQWtCLFNBQVMsSUFBSTtBQUUzQyxZQUFNLFdBQVdBLE1BQUssc0JBQXNCLE1BQU0sU0FBUyxLQUFLLE9BQU87QUFDdkUsWUFBTSxnQkFBZ0IsT0FBTyxDQUFFLEdBQUUsS0FBSztBQUN0QyxZQUFNLE1BQU0sU0FBUyxNQUFNLEdBQUcsS0FBSyxTQUFTLE1BQU0sR0FBRyxJQUMvQyxNQUFNLE1BQ047QUFDTixhQUFPLEVBQUUsS0FBSyxlQUFlLFFBQVE7QUFBQSxJQUNqRDtBQUFBLEVBQ0s7QUFDTDtBQUVBLFNBQVMsUUFBUSxRQUFRO0FBQ3JCLFNBQU8sUUFBUSxNQUFNLEtBQUssQ0FBQyxTQUFTLE9BQU8sRUFBRTtBQUNqRDtBQUNBLFNBQVMsZ0JBQWdCLE9BQU8sU0FBUyxVQUFVLGVBQWU7QUFDOUQsUUFBTSxFQUFFLE9BQU8sTUFBTyxJQUFHO0FBQ3pCLFNBQU8sTUFBTTtBQUNULFVBQU0sVUFBVSxFQUFFLE1BQU07QUFDeEIsUUFBSSxZQUFZLENBQUE7QUFDaEIsUUFBSSxNQUFNLFFBQVE7QUFDZCxjQUFRLFNBQVMsTUFBTTtBQUFBLElBQzFCO0FBQ0QsUUFBSSxTQUFTLE1BQU0sTUFBTSxHQUFHO0FBQ3hCLGNBQVEsTUFBTSxNQUFNO0FBQUEsSUFDdkIsV0FDUSxTQUFTLE1BQU0sTUFBTSxHQUFHO0FBRTdCLFVBQUksU0FBUyxNQUFNLE9BQU8sR0FBRyxHQUFHO0FBRTVCLGdCQUFRLE1BQU0sTUFBTSxPQUFPO0FBQUEsTUFDOUI7QUFFRCxrQkFBWSxPQUFPLEtBQUssTUFBTSxNQUFNLEVBQUUsT0FBTyxDQUFDVyxVQUFTLFNBQVM7QUFDNUQsZUFBTyxTQUFTLFNBQVMsSUFBSSxJQUN2QixPQUFPLENBQUEsR0FBSUEsVUFBUyxFQUFFLENBQUMsT0FBTyxNQUFNLE9BQU8sT0FBTyxJQUNsREE7QUFBQSxNQUNULEdBQUUsQ0FBRSxDQUFBO0FBQUEsSUFDUjtBQUNELFVBQU0sUUFBUSxjQUFjLEdBQUcsQ0FBQyxNQUFNLE9BQU8sU0FBUyxTQUFTLENBQUM7QUFDaEUsUUFBSSxXQUFXLENBQUMsUUFBUSxHQUFHO0FBQzNCLFFBQUksUUFBUSxLQUFLLEdBQUc7QUFDaEIsaUJBQVcsTUFBTSxJQUFJLENBQUMsTUFBTSxVQUFVO0FBQ2xDLGNBQU0sT0FBTyxNQUFNLEtBQUs7QUFDeEIsY0FBTSxPQUFPLE9BQ1AsS0FBSyxFQUFFLENBQUMsS0FBSyxPQUFPLEtBQUssT0FBTyxPQUFPLE9BQU8sSUFDOUMsQ0FBQyxLQUFLLEtBQUs7QUFDakIsWUFBSSxRQUFRLElBQUksR0FBRztBQUNmLGVBQUssR0FBRyxNQUFNLEdBQUcsS0FBSyxRQUFRO0FBQUEsUUFDakM7QUFDRCxlQUFPO0FBQUEsTUFDdkIsQ0FBYTtBQUFBLElBQ0osV0FDUSxTQUFTLEtBQUssR0FBRztBQUN0QixpQkFBVyxDQUFDLEtBQUs7QUFBQSxJQUNwQjtBQUNELFVBQU0sZ0JBQWdCLE9BQU8sQ0FBRSxHQUFFLEtBQUs7QUFDdEMsVUFBTSxNQUFNLFNBQVMsTUFBTSxHQUFHLEtBQUssU0FBUyxNQUFNLEdBQUcsSUFDL0MsTUFBTSxNQUNOO0FBQ04sV0FBTyxFQUFFLEtBQUssZUFBZSxRQUFRO0FBQUEsRUFDN0M7QUFDQTtBQW1CQSxNQUFNLGVBQXNDO0FBQUEsRUFFeEMsTUFBTTtBQUFBLEVBQ04sT0FBTyxPQUFPO0FBQUEsSUFDVixPQUFPO0FBQUEsTUFDSCxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDYjtBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ0osTUFBTSxDQUFDLFFBQVEsTUFBTTtBQUFBLElBQ3hCO0FBQUEsRUFDSixHQUFFLGVBQWU7QUFBQSxFQUdsQixNQUFNLE9BQU8sU0FBUztBQUNsQixVQUFNWCxRQUFPLE1BQU0sUUFDZixRQUFRLEVBQUUsVUFBVSxVQUFVLGdCQUFnQixLQUFNLENBQUE7QUFDeEQsV0FBTyxnQkFBZ0IsT0FBTyxTQUFTLDRCQUE0QixJQUFJLFNBRXZFQSxNQUFLLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUFBLEVBQ25DO0FBQ0w7QUFtQkEsTUFBTSxpQkFBdUM7QUFBQSxFQUV6QyxNQUFNO0FBQUEsRUFDTixPQUFPLE9BQU87QUFBQSxJQUNWLE9BQU87QUFBQSxNQUNILE1BQU0sQ0FBQyxRQUFRLElBQUk7QUFBQSxNQUNuQixVQUFVO0FBQUEsSUFDYjtBQUFBLElBQ0QsUUFBUTtBQUFBLE1BQ0osTUFBTSxDQUFDLFFBQVEsTUFBTTtBQUFBLElBQ3hCO0FBQUEsRUFDSixHQUFFLGVBQWU7QUFBQSxFQUdsQixNQUFNLE9BQU8sU0FBUztBQUNsQixVQUFNQSxRQUFPLE1BQU0sUUFDZixRQUFRLEVBQUUsVUFBVSxVQUFVLGdCQUFnQixLQUFNLENBQUE7QUFDeEQsV0FBTyxnQkFBZ0IsT0FBTyxTQUFTLDhCQUE4QixJQUFJLFNBRXpFQSxNQUFLLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUFBLEVBQ3JDO0FBQ0w7QUFFQSxTQUFTLGNBQWNBLE9BQU0sVUFBVTtBQUNuQyxRQUFNLGVBQWVBO0FBQ3JCLE1BQUlBLE1BQUssU0FBUyxlQUFlO0FBQzdCLFdBQVEsYUFBYSxjQUFjLFFBQVEsS0FBS0EsTUFBSztBQUFBLEVBQ3hELE9BQ0k7QUFDRCxVQUFNLFVBQVUsYUFBYSxjQUFjLFFBQVE7QUFDbkQsV0FBTyxXQUFXLE9BQ1osUUFBUSxhQUNSQSxNQUFLLE9BQU87QUFBQSxFQUNyQjtBQUNMO0FBQ0EsU0FBUyxZQUFZQSxPQUFNO0FBQ3ZCLFFBQU0sV0FBVyxDQUFDLFlBQVk7QUFDMUIsVUFBTSxFQUFFLFVBQVUsV0FBVyxNQUFLLElBQUs7QUFFdkMsUUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUc7QUFDMUIsWUFBTSxnQkFBZ0IsZUFBZSxnQkFBZ0I7QUFBQSxJQUN4RDtBQUNELFVBQU0sV0FBVyxjQUFjQSxPQUFNLFNBQVMsQ0FBQztBQUkvQyxVQUFNLGNBQWMsV0FBVyxLQUFLO0FBQ3BDLFdBQU87QUFBQSxNQUNILFFBQVEsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsV0FBVyxXQUFXLENBQUMsQ0FBQztBQUFBLE1BQ2hFO0FBQUEsSUFDWjtBQUFBLEVBQ0E7QUFDSSxRQUFNLFdBQVcsQ0FBQyxJQUFJLFlBQVk7QUFDOUIsVUFBTSxDQUFDLGFBQWEsUUFBUSxJQUFJLFNBQVMsT0FBTztBQUNoRCxRQUFJLGFBQWFBLE1BQUssV0FBVyxVQUFVO0FBRXZDLFNBQUcsZ0JBQWdCLE1BQU0sU0FBUyxRQUFRLE1BQU07QUFDNUMsZ0JBQVEsWUFBWSxRQUFRLFNBQVMsYUFBWTtBQUFBLE1BQ2pFLENBQWE7QUFBQSxJQUNKO0FBQ0QsT0FBRyxhQUFhO0FBQ2hCLE9BQUcsY0FBYztBQUFBLEVBQ3pCO0FBQ0ksUUFBTSxhQUFhLENBQUMsT0FBTztBQUN2QixRQUFJLGFBQWEsR0FBRyxlQUFlO0FBQy9CLFNBQUcsY0FBYTtBQUNoQixTQUFHLGdCQUFnQjtBQUNuQixhQUFPLEdBQUc7QUFBQSxJQUNiO0FBQ0QsUUFBSSxHQUFHLFlBQVk7QUFDZixTQUFHLGFBQWE7QUFDaEIsYUFBTyxHQUFHO0FBQUEsSUFDYjtBQUFBLEVBQ1Q7QUFDSSxRQUFNLFNBQVMsQ0FBQyxJQUFJLEVBQUUsTUFBSyxNQUFPO0FBQzlCLFFBQUksR0FBRyxZQUFZO0FBQ2YsWUFBTSxXQUFXLEdBQUc7QUFDcEIsWUFBTSxjQUFjLFdBQVcsS0FBSztBQUNwQyxTQUFHLGNBQWMsUUFBUSxNQUFNLFNBQVMsR0FBRyxVQUFVO0FBQUEsUUFDakQsR0FBRyxXQUFXLFdBQVc7QUFBQSxNQUN6QyxDQUFhO0FBQUEsSUFDSjtBQUFBLEVBQ1Q7QUFDSSxRQUFNLGNBQWMsQ0FBQyxZQUFZO0FBQzdCLFVBQU0sQ0FBQyxXQUFXLElBQUksU0FBUyxPQUFPO0FBQ3RDLFdBQU8sRUFBRSxZQUFXO0FBQUEsRUFDNUI7QUFDSSxTQUFPO0FBQUEsSUFDSCxTQUFTO0FBQUEsSUFDVCxXQUFXO0FBQUEsSUFDWCxjQUFjO0FBQUEsSUFDZDtBQUFBLEVBQ1I7QUFDQTtBQUNBLFNBQVMsV0FBVyxPQUFPO0FBQ3ZCLE1BQUksU0FBUyxLQUFLLEdBQUc7QUFDakIsV0FBTyxFQUFFLE1BQU07RUFDbEIsV0FDUSxjQUFjLEtBQUssR0FBRztBQUMzQixRQUFJLEVBQUUsVUFBVSxRQUFRO0FBQ3BCLFlBQU0sZ0JBQWdCLGVBQWUsZ0JBQWdCLE1BQU07QUFBQSxJQUM5RDtBQUNELFdBQU87QUFBQSxFQUNWLE9BQ0k7QUFDRCxVQUFNLGdCQUFnQixlQUFlLGFBQWE7QUFBQSxFQUNyRDtBQUNMO0FBQ0EsU0FBUyxXQUFXLE9BQU87QUFDdkIsUUFBTSxFQUFFLE1BQU0sUUFBUSxNQUFNLFFBQVEsT0FBUSxJQUFHO0FBQy9DLFFBQU0sVUFBVSxDQUFBO0FBQ2hCLFFBQU0sUUFBUSxRQUFRO0FBQ3RCLE1BQUksU0FBUyxNQUFNLEdBQUc7QUFDbEIsWUFBUSxTQUFTO0FBQUEsRUFDcEI7QUFDRCxNQUFJLFNBQVMsTUFBTSxHQUFHO0FBQ2xCLFlBQVEsU0FBUztBQUFBLEVBQ3BCO0FBQ0QsTUFBSSxTQUFTLE1BQU0sR0FBRztBQUNsQixZQUFRLFNBQVM7QUFBQSxFQUNwQjtBQUNELFNBQU8sQ0FBQyxNQUFNLE9BQU8sT0FBTztBQUNoQztBQUVBLFNBQVMsTUFBTSxLQUFLQSxVQUFTLFNBQVM7QUFDbEMsUUFBTSxnQkFBZ0IsY0FBYyxRQUFRLEVBQUUsSUFDeEMsUUFBUSxLQUNSO0FBQ04sUUFBTSx1QkFBdUIsQ0FBQyxDQUFDLGNBQWM7QUFDN0MsUUFBTSxnQkFBZ0IsVUFBVSxjQUFjLGFBQWEsSUFDckQsY0FBYyxnQkFDZDtBQU1OLE1BQUksZUFBZTtBQUVmLFFBQUksVUFBVSxDQUFDLHVCQUF1QixZQUFZLE9BQU8sUUFBUSxXQUFXO0FBQzVFLFFBQUksVUFBVSxhQUFhLE1BQU0sWUFBWTtBQUM3QyxRQUFJLFVBQVUsZUFBZSxNQUFNLGNBQWM7QUFBQSxFQUNwRDtBQUVEO0FBQ0ksUUFBSSxVQUFVLEtBQUssWUFBWUEsS0FBSSxDQUFDO0FBQUEsRUFDdkM7QUFDTDtBQUVBLE1BQU0sMkJBQTJCO0FBQ2pDLElBQUk7QUFDSixlQUFlLGVBQWUsS0FBS0EsT0FBTTtBQUNyQyxTQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUNwQyxRQUFJO0FBQ0EsMEJBQW9CO0FBQUEsUUFDaEIsSUFBSTtBQUFBLFFBQ0osT0FBTyxrQkFBa0I7QUFBQSxRQUN6QixhQUFhO0FBQUEsUUFDYixVQUFVO0FBQUEsUUFDVixNQUFNO0FBQUEsUUFDTixxQkFBcUIsQ0FBQyx3QkFBd0I7QUFBQSxRQUM5QztBQUFBLE1BQ0gsR0FBRSxTQUFPO0FBQ04sc0JBQWM7QUFDZCxZQUFJLEdBQUcsbUJBQW1CLENBQUMsRUFBRSxtQkFBbUIsU0FBUSxNQUFPO0FBQzNELGtDQUF3QixtQkFBbUIsVUFBVUEsS0FBSTtBQUFBLFFBQzdFLENBQWlCO0FBQ0QsWUFBSSxHQUFHLGlCQUFpQixDQUFDLEVBQUUsbUJBQW1CLGFBQVksTUFBTztBQUM3RCxjQUFJLGtCQUFrQixNQUFNLE1BQ3hCLGtCQUFrQixNQUFNLEdBQUcsZ0JBQzNCLGNBQWM7QUFDZCxnQkFBSUEsTUFBSyxTQUFTLFVBQVU7QUFFeEIsa0JBQUksa0JBQWtCLE1BQU0sR0FBRyxpQkFDM0JBLE1BQUssT0FBTyxZQUFZO0FBQ3hCLGdDQUFnQixjQUFjLGtCQUFrQixNQUFNLEdBQUcsWUFBWTtBQUFBLGNBQ3hFO0FBQUEsWUFDSixPQUNJO0FBQ0QsOEJBQWdCLGNBQWMsa0JBQWtCLE1BQU0sR0FBRyxZQUFZO0FBQUEsWUFDeEU7QUFBQSxVQUNKO0FBQUEsUUFDckIsQ0FBaUI7QUFDRCxZQUFJLGFBQWE7QUFBQSxVQUNiLElBQUk7QUFBQSxVQUNKLE9BQU8sa0JBQWtCO0FBQUEsVUFDekIsTUFBTTtBQUFBLFVBQ04sdUJBQXVCLHdCQUF3QjtBQUFBLFFBQ25FLENBQWlCO0FBQ0QsWUFBSSxHQUFHLGlCQUFpQixhQUFXO0FBQy9CLGNBQUksUUFBUSxRQUFRLE9BQ2hCLFFBQVEsZ0JBQWdCLCtCQUFzRDtBQUM5RSwwQkFBYyxTQUFTQSxLQUFJO0FBQUEsVUFDOUI7QUFBQSxRQUNyQixDQUFpQjtBQUNELGNBQU0sUUFBUSxvQkFBSTtBQUNsQixZQUFJLEdBQUcsa0JBQWtCLE9BQU8sWUFBWTtBQUN4QyxjQUFJLFFBQVEsUUFBUSxPQUNoQixRQUFRLGdCQUFnQiwrQkFBc0Q7QUFDOUUsZ0JBQUksbUJBQWtCO0FBQ3RCLHlCQUFhLFNBQVNBLEtBQUk7QUFDMUIsZ0JBQUksUUFBUSxXQUFXLFVBQVU7QUFDN0Isa0JBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxHQUFHLEdBQUc7QUFDekIsc0JBQU0sQ0FBQyxJQUFJLElBQUksTUFBTSxJQUFJLHNCQUFzQixRQUFRLEdBQUc7QUFDMUQsc0JBQU0sSUFBSSxRQUFRLEtBQUssSUFBSTtBQUFBLGNBQzlCO0FBQ0Qsa0JBQUksaUJBQWlCLE1BQU0sSUFBSSxRQUFRLEdBQUcsQ0FBQztBQUFBLFlBQzlDLE9BQ0k7QUFDRCxvQkFBTSxXQUFXLHFCQUFxQixRQUFRLFFBQVFBLEtBQUk7QUFDMUQsMEJBQVksSUFBSSxpQkFBaUIsUUFBUTtBQUFBLFlBQzVDO0FBQUEsVUFDSjtBQUFBLFFBQ3JCLENBQWlCO0FBQ0QsWUFBSSxHQUFHLG1CQUFtQixhQUFXO0FBQ2pDLGNBQUksUUFBUSxRQUFRLE9BQ2hCLFFBQVEsZ0JBQWdCLCtCQUFzRDtBQUM5RSxzQkFBVSxTQUFTQSxLQUFJO0FBQUEsVUFDMUI7QUFBQSxRQUNyQixDQUFpQjtBQUNELFlBQUksaUJBQWlCO0FBQUEsVUFDakIsSUFBSTtBQUFBLFVBQ0osT0FBTyxrQkFBa0I7QUFBQSxVQUN6QixPQUFPLDBCQUEwQjtBQUFBLFFBQ3JELENBQWlCO0FBQ0QsZ0JBQVEsSUFBSTtBQUFBLE1BQzVCLENBQWE7QUFBQSxJQUNKLFNBQ00sR0FBUDtBQUNJLGNBQVEsTUFBTSxDQUFDO0FBQ2YsYUFBTyxLQUFLO0FBQUEsSUFDZjtBQUFBLEVBQ1QsQ0FBSztBQUNMO0FBRUEsU0FBUyxrQkFBa0IsVUFBVTtBQUNqQyxTQUFRLFNBQVMsS0FBSyxRQUNsQixTQUFTLEtBQUssZUFDZCxTQUFTLEtBQUssVUFDZDtBQUNSO0FBQ0EsU0FBUyx3QkFBd0IsVUFDakMsVUFBVUEsT0FBTTtBQUVaLFFBQU1RLFVBQVNSLE1BQUssU0FBUyxnQkFDdkJBLE1BQUssU0FDTEEsTUFBSyxPQUFPO0FBQ2xCLE1BQUksWUFBWSxTQUFTLE1BQU0sTUFBTSxTQUFTLE1BQU0sR0FBRyxjQUFjO0FBRWpFLFFBQUksU0FBUyxNQUFNLEdBQUcsaUJBQWlCUSxTQUFRO0FBQzNDLFlBQU0sTUFBTTtBQUFBLFFBQ1IsT0FBTyxTQUFTLGtCQUFrQixRQUFRO0FBQUEsUUFDMUMsV0FBVztBQUFBLFFBQ1gsaUJBQWlCO0FBQUEsTUFDakM7QUFDWSxlQUFTLEtBQUssS0FBSyxHQUFHO0FBQUEsSUFDekI7QUFBQSxFQUNKO0FBQ0w7QUFDQSxTQUFTLGdCQUFnQixjQUFjLFVBQVU7QUFDN0MsUUFBTSxPQUFPO0FBQ2IsZUFBYSxNQUFNLEtBQUs7QUFBQSxJQUNwQjtBQUFBLElBQ0EsS0FBSztBQUFBLElBQ0wsVUFBVTtBQUFBLElBQ1YsT0FBTyxTQUFTLE9BQU87QUFBQSxFQUMvQixDQUFLO0FBQ0QsZUFBYSxNQUFNLEtBQUs7QUFBQSxJQUNwQjtBQUFBLElBQ0EsS0FBSztBQUFBLElBQ0wsVUFBVTtBQUFBLElBQ1YsT0FBTyxTQUFTO0FBQUEsRUFDeEIsQ0FBSztBQUNELGVBQWEsTUFBTSxLQUFLO0FBQUEsSUFDcEI7QUFBQSxJQUNBLEtBQUs7QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLE9BQU8sU0FBUyxlQUFlO0FBQUEsRUFDdkMsQ0FBSztBQUNELGVBQWEsTUFBTSxLQUFLO0FBQUEsSUFDcEI7QUFBQSxJQUNBLEtBQUs7QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLE9BQU8sU0FBUztBQUFBLEVBQ3hCLENBQUs7QUFDRCxlQUFhLE1BQU0sS0FBSztBQUFBLElBQ3BCO0FBQUEsSUFDQSxLQUFLO0FBQUEsSUFDTCxVQUFVO0FBQUEsSUFDVixPQUFPLHNCQUFzQixTQUFTLFNBQVMsS0FBSztBQUFBLEVBQzVELENBQUs7QUFDRDtBQUNJLGlCQUFhLE1BQU0sS0FBSztBQUFBLE1BQ3BCO0FBQUEsTUFDQSxLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsTUFDVixPQUFPLFNBQVMsZ0JBQWdCO0FBQUEsSUFDNUMsQ0FBUztBQUNELGlCQUFhLE1BQU0sS0FBSztBQUFBLE1BQ3BCO0FBQUEsTUFDQSxLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsTUFDVixPQUFPLFNBQVMsY0FBYztBQUFBLElBQzFDLENBQVM7QUFBQSxFQUNKO0FBQ0w7QUFFQSxTQUFTLHNCQUFzQlYsV0FBVTtBQUNyQyxRQUFNLFFBQVEsQ0FBQTtBQUNkLFNBQU8sS0FBS0EsU0FBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO0FBQ25DLFVBQU0sSUFBSUEsVUFBUztBQUNuQixRQUFJLFdBQVcsQ0FBQyxLQUFLLFlBQVksR0FBRztBQUNoQyxZQUFNLE9BQU8sMEJBQTBCLENBQUM7QUFBQSxJQUMzQyxXQUNRLFNBQVMsQ0FBQyxHQUFHO0FBQ2xCLFlBQU0sT0FBTyxzQkFBc0IsQ0FBQztBQUFBLElBQ3ZDLE9BQ0k7QUFDRCxZQUFNLE9BQU87QUFBQSxJQUNoQjtBQUFBLEVBQ1QsQ0FBSztBQUNELFNBQU87QUFDWDtBQUNBLE1BQU0sTUFBTTtBQUFBLEVBQ1IsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUNUO0FBQ0EsU0FBUyxPQUFPLEdBQUc7QUFDZixTQUFPLEVBQUUsUUFBUSxXQUFXLFVBQVU7QUFDMUM7QUFDQSxTQUFTLFdBQVcsR0FBRztBQUNuQixTQUFPLElBQUksTUFBTTtBQUNyQjtBQUVBLFNBQVMsMEJBQTBCLE1BQU07QUFDckMsUUFBTSxZQUFZLEtBQUssU0FBUyxLQUFLLE9BQU8sS0FBSyxNQUFNLFFBQVE7QUFDL0QsU0FBTztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sU0FBUyx1QkFBa0I7QUFBQSxJQUM5QjtBQUFBLEVBQ1Q7QUFDQTtBQUNBLFNBQVMsY0FBYyxTQUFTRSxPQUFNO0FBQ2xDLFVBQVEsVUFBVSxLQUFLO0FBQUEsSUFDbkIsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLEVBQ2YsQ0FBSztBQUVELFFBQU1RLFVBQVNSLE1BQUssU0FBUyxnQkFDdkJBLE1BQUssU0FDTEEsTUFBSyxPQUFPO0FBQ2xCLGFBQVcsQ0FBQyxhQUFhLFFBQVEsS0FBS0EsTUFBSyxhQUFhO0FBRXBELFVBQU0sV0FBV0EsTUFBSyxTQUFTLGdCQUN6QixXQUNBLFNBQVM7QUFDZixRQUFJUSxZQUFXLFVBQVU7QUFDckI7QUFBQSxJQUNIO0FBQ0QsWUFBUSxVQUFVLEtBQUs7QUFBQSxNQUNuQixJQUFJLFNBQVMsR0FBRyxTQUFVO0FBQUEsTUFDMUIsT0FBTyxHQUFHLGtCQUFrQixXQUFXO0FBQUEsSUFDbkQsQ0FBUztBQUFBLEVBQ0o7QUFDTDtBQUNBLFNBQVMscUJBQXFCLFFBQVFSLE9BQU07QUFDeEMsTUFBSSxXQUFXO0FBQ2YsTUFBSSxXQUFXLFVBQVU7QUFDckIsZUFBVyxDQUFDLFdBQVcsUUFBUSxLQUFLQSxNQUFLLFlBQVksV0FBVztBQUM1RCxVQUFJLFNBQVMsR0FBRyxTQUFRLE1BQU8sUUFBUTtBQUNuQyxtQkFBVztBQUNYO0FBQUEsTUFDSDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQ0QsU0FBTztBQUNYO0FBQ0EsU0FBUyxjQUFjLFFBQVFBLE9BQU07QUFDakMsTUFBSSxXQUFXLFVBQVU7QUFDckIsV0FBT0EsTUFBSyxTQUFTLGdCQUNmQSxNQUFLLFNBQ0xBLE1BQUssT0FBTztBQUFBLEVBQ3JCLE9BQ0k7QUFDRCxVQUFNLFdBQVcsTUFBTSxLQUFLQSxNQUFLLFlBQVksT0FBUSxDQUFBLEVBQUUsS0FBSyxVQUFRLEtBQUssR0FBRyxTQUFVLE1BQUssTUFBTTtBQUNqRyxRQUFJLFVBQVU7QUFDVixhQUFPQSxNQUFLLFNBQVMsZ0JBQ2YsV0FDQSxTQUFTO0FBQUEsSUFDbEIsT0FDSTtBQUNELGFBQU87QUFBQSxJQUNWO0FBQUEsRUFDSjtBQUNMO0FBQ0EsU0FBUyxhQUFhLFNBQVNBLE9BRTdCO0FBQ0UsUUFBTSxXQUFXLGNBQWMsUUFBUSxRQUFRQSxLQUFJO0FBQ25ELE1BQUksVUFBVTtBQUdWLFlBQVEsUUFBUSxzQkFBc0IsUUFBUTtBQUFBLEVBQ2pEO0FBQ0QsU0FBTztBQUNYO0FBQ0EsU0FBUyxzQkFBc0IsVUFBVTtBQUNyQyxRQUFNLFFBQVEsQ0FBQTtBQUNkLFFBQU0sYUFBYTtBQUNuQixRQUFNLGVBQWU7QUFBQSxJQUNqQjtBQUFBLE1BQ0ksTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsT0FBTyxTQUFTLE9BQU87QUFBQSxJQUMxQjtBQUFBLElBQ0Q7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxNQUNWLE9BQU8sU0FBUyxlQUFlO0FBQUEsSUFDbEM7QUFBQSxJQUNEO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsTUFDVixPQUFPLFNBQVM7QUFBQSxJQUNuQjtBQUFBLElBQ0Q7QUFBQSxNQUNJLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxNQUNWLE9BQU8sU0FBUztBQUFBLElBQ25CO0FBQUEsRUFDVDtBQUNJLFFBQU0sY0FBYztBQUNwQixRQUFNLHFCQUFxQjtBQUMzQixRQUFNLHVCQUF1QjtBQUFBLElBQ3pCO0FBQUEsTUFDSSxNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsTUFDVixPQUFPLHNCQUFzQixTQUFTLFNBQVMsS0FBSztBQUFBLElBQ3ZEO0FBQUEsRUFDVDtBQUNJLFFBQU0sc0JBQXNCO0FBQzVCO0FBQ0ksVUFBTSxzQkFBc0I7QUFDNUIsVUFBTSx3QkFBd0I7QUFBQSxNQUMxQjtBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLFFBQ0wsVUFBVTtBQUFBLFFBQ1YsT0FBTyxTQUFTLGdCQUFnQjtBQUFBLE1BQ25DO0FBQUEsSUFDYjtBQUNRLFVBQU0sdUJBQXVCO0FBQzdCLFVBQU0sb0JBQW9CO0FBQzFCLFVBQU0sc0JBQXNCO0FBQUEsTUFDeEI7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLEtBQUs7QUFBQSxRQUNMLFVBQVU7QUFBQSxRQUNWLE9BQU8sU0FBUyxjQUFjO0FBQUEsTUFDakM7QUFBQSxJQUNiO0FBQ1EsVUFBTSxxQkFBcUI7QUFBQSxFQUM5QjtBQUNELFNBQU87QUFDWDtBQUNBLFNBQVMsaUJBQWlCLE9BQU8sU0FBUztBQUN0QyxNQUFJLGFBQWE7QUFDYixRQUFJO0FBQ0osUUFBSSxXQUFXLGFBQWEsU0FBUztBQUNqQyxnQkFBVSxRQUFRO0FBQ2xCLGFBQU8sUUFBUTtBQUFBLElBQ2xCO0FBQ0QsZ0JBQVksaUJBQWlCO0FBQUEsTUFDekIsU0FBUztBQUFBLE1BQ1QsT0FBTztBQUFBLFFBQ0gsT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBLE1BQU0sS0FBSyxJQUFLO0FBQUEsUUFDaEIsTUFBTSxDQUFFO0FBQUEsUUFDUixNQUFNLFdBQVcsQ0FBRTtBQUFBLFFBQ25CLFNBQVMsVUFBVSxrQkFDYixVQUNBLFVBQVUsY0FDUixVQUFVLFlBQ1IsWUFDQTtBQUFBLE1BQ2I7QUFBQSxJQUNiLENBQVM7QUFBQSxFQUNKO0FBQ0w7QUFDQSxTQUFTLFVBQVUsU0FBU0EsT0FBTTtBQUM5QixRQUFNLFdBQVcsY0FBYyxRQUFRLFFBQVFBLEtBQUk7QUFDbkQsTUFBSSxVQUFVO0FBQ1YsVUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRO0FBQ3hCLFFBQUksVUFBVSxZQUFZLFNBQVMsUUFBUSxNQUFNLEtBQUssR0FBRztBQUNyRCxlQUFTLE9BQU8sUUFBUSxRQUFRLE1BQU07QUFBQSxJQUN6QyxXQUNRLFVBQVUscUJBQ2QsU0FBUyxRQUFRLE1BQU0sS0FBSyxLQUN6QixRQUFRLFFBQVEsTUFBTSxLQUFLLEtBQzNCLFNBQVMsUUFBUSxNQUFNLEtBQUssSUFBSTtBQUNwQyxlQUFTLGVBQWUsUUFBUSxRQUFRLE1BQU07QUFBQSxJQUNqRCxXQUNRLFVBQVUsbUJBQW1CLFVBQVUsUUFBUSxNQUFNLEtBQUssR0FBRztBQUNsRSxlQUFTLGdCQUFnQixRQUFRLE1BQU07QUFBQSxJQUMxQztBQUFBLEVBQ0o7QUFDTDtBQWlKQSxNQUFNLG1CQUNTLDJCQUFXLGlCQUFpQjtBQUUzQyxTQUFTLFdBQVcsVUFBVSxDQUFFLEdBQUUsZUFBZTtBQU03QyxRQUFNLG9CQUFvQixVQUFVLFFBQVEsZUFBZSxJQUNyRCxRQUFRLGtCQUNSO0FBRU4sUUFBTSxxQkFFSTtBQUNWLFFBQU0sY0FBYyxvQkFBSTtBQUN4QixRQUFNLENBQUMsYUFBYSxRQUFRLElBQUksYUFBYSxPQUFxQjtBQUNsRSxRQUFNLFNBQVMsV0FBa0UsRUFBRTtBQUNuRixXQUFTLGNBQWMsV0FBVztBQUM5QixXQUFPLFlBQVksSUFBSSxTQUFTLEtBQUs7QUFBQSxFQUN4QztBQUNELFdBQVMsY0FBYyxXQUFXLFVBQVU7QUFDeEMsZ0JBQVksSUFBSSxXQUFXLFFBQVE7QUFBQSxFQUN0QztBQUNELFdBQVMsaUJBQWlCLFdBQVc7QUFDakMsZ0JBQVksT0FBTyxTQUFTO0FBQUEsRUFDL0I7QUFDRDtBQUNJLFVBQU1BLFFBQU87QUFBQSxNQUVULElBQUksT0FBTztBQUNQLGVBRU07QUFBQSxNQUNUO0FBQUEsTUFFRCxJQUFJLG1CQUFtQjtBQUNuQixlQUFPO0FBQUEsTUFDVjtBQUFBLE1BRUQsTUFBTSxRQUFRLFFBQVFXLFVBQVM7QUFFZjtBQUNSLGNBQUksZUFBZVg7QUFBQSxRQUN0QjtBQUVELFlBQUksc0JBQXNCO0FBQzFCLFlBQUksUUFBUSxJQUFJLHFCQUFxQkEsS0FBSTtBQUV6QyxZQUFxQixtQkFBbUI7QUFDcEMsNkJBQW1CLEtBQUtBLE1BQUssTUFBTTtBQUFBLFFBQ3RDO0FBRThCO0FBQzNCLGdCQUFNLEtBQUtBLE9BQU0sR0FBR1csUUFBTztBQUFBLFFBQzlCO0FBTUQsY0FBTSxhQUFhLElBQUk7QUFDdkIsWUFBSSxVQUFVLE1BQU07QUFDaEIsVUFBQVgsTUFBSyxRQUFPO0FBQ1o7UUFDcEI7QUFFa0c7QUFDOUUsZ0JBQU0sTUFBTSxNQUFNLGVBQWUsS0FBS0EsS0FBSTtBQUMxQyxjQUFJLENBQUMsS0FBSztBQUNOLGtCQUFNLGdCQUFnQixlQUFlLGdDQUFnQztBQUFBLFVBQ3hFO0FBQ0QsZ0JBQU0sVUFBVTtBQUtYO0FBRUQsa0JBQU0sWUFBWTtBQUNsQixzQkFBVSxrQkFBa0IsVUFBVSxlQUFlLE9BQU87QUFBQSxVQUMvRDtBQUNELGtCQUFRLEdBQUcsS0FBSyxnQkFBZ0I7QUFBQSxRQUNuQztBQUFBLE1BQ0o7QUFBQSxNQUVELElBQUksU0FBUztBQUNULGVBQU87QUFBQSxNQUNWO0FBQUEsTUFDRCxVQUFVO0FBQ04sb0JBQVksS0FBSTtBQUFBLE1BQ25CO0FBQUEsTUFFRDtBQUFBLE1BRUE7QUFBQSxNQUVBO0FBQUEsTUFFQTtBQUFBLElBQ1o7QUFDUSxXQUFPQTtBQUFBLEVBQ1Y7QUFDTDtBQUVBLFNBQVMsUUFBUSxVQUFVLElBQUk7QUFDM0IsUUFBTSxXQUFXO0FBQ2pCLE1BQUksWUFBWSxNQUFNO0FBQ2xCLFVBQU0sZ0JBQWdCLGVBQWUsc0JBQXNCO0FBQUEsRUFDOUQ7QUFDRCxNQUFJLENBQUMsU0FBUyxRQUNWLFNBQVMsV0FBVyxPQUFPLFFBQzNCLENBQUMsU0FBUyxXQUFXLElBQUkscUJBQXFCO0FBQzlDLFVBQU0sZ0JBQWdCLGVBQWUsYUFBYTtBQUFBLEVBQ3JEO0FBQ0QsUUFBTUEsUUFBTyxnQkFBZ0IsUUFBUTtBQUNyQyxRQUFNUSxVQUFTLGtCQUFrQlIsS0FBSTtBQUNyQyxRQUFNLG1CQUFtQixvQkFBb0IsUUFBUTtBQUNyRCxRQUFNLFFBQVEsU0FBUyxTQUFTLGdCQUFnQjtBQVVoRCxNQUFJLFVBQVUsVUFBVTtBQUNwQix3QkFBb0JRLFNBQVEsU0FBUyxnQkFBZ0I7QUFDckQsV0FBT0E7QUFBQSxFQUNWO0FBQ0QsTUFBSSxVQUFVLFVBQVU7QUFFcEIsUUFBSUksWUFBVyxZQUFZWixPQUFNLFVBQVUsUUFBUSxjQUFjO0FBQ2pFLFFBQUlZLGFBQVksTUFBTTtBQUlsQixNQUFBQSxZQUFXSjtBQUFBLElBQ2Q7QUFDRCxXQUFPSTtBQUFBLEVBQ1Y7QUFDRCxRQUFNLGVBQWVaO0FBQ3JCLE1BQUksV0FBVyxhQUFhLGNBQWMsUUFBUTtBQUNsRCxNQUFJLFlBQVksTUFBTTtBQUNsQixVQUFNLGtCQUFrQixPQUFPLENBQUUsR0FBRSxPQUFPO0FBQzFDLFFBQUksWUFBWSxrQkFBa0I7QUFDOUIsc0JBQWdCLFNBQVMsaUJBQWlCO0FBQUEsSUFDN0M7QUFDRCxRQUFJUSxTQUFRO0FBQ1Isc0JBQWdCLFNBQVNBO0FBQUEsSUFDNUI7QUFDRCxlQUFXLGVBQWUsZUFBZTtBQUN6QyxtQkFBZSxjQUFjLFVBQVUsUUFBUTtBQUMvQyxpQkFBYSxjQUFjLFVBQVUsUUFBUTtBQUFBLEVBQ2hEO0FBQ0QsU0FBTztBQUNYO0FBeUJBLFNBQVMsYUFBYSxTQUFTLFlBQVksZUFDekM7QUFDRSxRQUFNLFFBQVE7QUFDZDtBQUNJLFVBQU0sTUFFQSxNQUFNLElBQUksTUFBTSxlQUFlLE9BQU8sQ0FBQztBQUM3QyxRQUFJLE9BQU8sTUFBTTtBQUNiLFlBQU0sZ0JBQWdCLGVBQWUsZ0JBQWdCO0FBQUEsSUFDeEQ7QUFDRCxXQUFPLENBQUMsT0FBTyxHQUFHO0FBQUEsRUFDckI7QUFDTDtBQUNBLFNBQVMsZ0JBQWdCLFVBQVU7QUFDL0I7QUFDSSxVQUFNUixRQUFPLE9BQU8sQ0FBQyxTQUFTLE9BQ3hCLFNBQVMsV0FBVyxJQUFJLHNCQUN4QixnQkFBZ0I7QUFFdEIsUUFBSSxDQUFDQSxPQUFNO0FBQ1AsWUFBTSxnQkFBZ0IsQ0FBQyxTQUFTLE9BQzFCLGVBQWUsbUJBQ2YsZUFBZSwwQkFBMEI7QUFBQSxJQUNsRDtBQUNELFdBQU9BO0FBQUEsRUFDVjtBQUNMO0FBRUEsU0FBUyxTQUFTLFNBQVMsa0JBQWtCO0FBRXpDLFNBQU8sY0FBYyxPQUFPLElBQ3JCLFlBQVksbUJBQ1QsVUFDQSxXQUNKLENBQUMsUUFBUSxXQUNMLFVBQ0EsUUFBUTtBQUN0QjtBQUNBLFNBQVMsa0JBQWtCQSxPQUFNO0FBRTdCLFNBQU9BLE1BQUssU0FBUyxnQkFDWEEsTUFBSyxTQUNMQSxNQUFLLE9BQU87QUFFMUI7QUFDQSxTQUFTLFlBQVlBLE9BQU0sUUFBUSxlQUFlLE9BQU87QUFDckQsTUFBSSxXQUFXO0FBQ2YsUUFBTSxPQUFPLE9BQU87QUFDcEIsTUFBSSxVQUFVLE9BQU87QUFDckIsU0FBTyxXQUFXLE1BQU07QUFDcEIsVUFBTSxlQUFlQTtBQUNyQixRQUFJQSxNQUFLLFNBQVMsZUFBZTtBQUM3QixpQkFBVyxhQUFhLGNBQWMsT0FBTztBQUFBLElBZ0JoRDtBQUNELFFBQUksWUFBWSxNQUFNO0FBQ2xCO0FBQUEsSUFDSDtBQUNELFFBQUksU0FBUyxTQUFTO0FBQ2xCO0FBQUEsSUFDSDtBQUNELGNBQVUsUUFBUTtBQUFBLEVBQ3JCO0FBQ0QsU0FBTztBQUNYO0FBQ0EsU0FBUyxlQUFlQSxPQUFNLFFBQVEsVUFBVTtBQUM1QyxNQUFJLFVBQVU7QUFDZDtBQUNJLGNBQVUsTUFBTTtBQUVaLFVBRUksT0FBTyxNQUFNLElBQUk7QUFDakIsZUFBTyxNQUFNLEdBQUcsZUFBZTtBQUMvQixrQkFBVSxjQUFhO0FBRXZCLGNBQU0sWUFBWTtBQUNsQixrQkFBVSxrQkFBa0IsVUFBVSxlQUFlLE9BQU87QUFDNUQsZ0JBQVEsR0FBRyxLQUFLLGdCQUFnQjtBQUFBLE1BQ25DO0FBQUEsSUFDSixHQUFFLE1BQU07QUFDVCxnQkFBWSxNQUFNO0FBRWQsVUFFSSxPQUFPLE1BQU0sTUFDYixPQUFPLE1BQU0sR0FBRyxjQUFjO0FBQzlCLG1CQUFXLFFBQVEsSUFBSSxLQUFLLGdCQUFnQjtBQUU1QyxjQUFNLFlBQVk7QUFDbEIsa0JBQVUsbUJBQW1CLFVBQVUsZ0JBQWU7QUFDdEQsZUFBTyxPQUFPLE1BQU0sR0FBRztBQUFBLE1BQzFCO0FBQ0QsTUFBQUEsTUFBSyxpQkFBaUIsTUFBTTtBQUFBLElBQy9CLEdBQUUsTUFBTTtBQUFBLEVBQ1o7QUFDTDtBQXlXQSxNQUFNLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDSjtBQUNBLE1BQU0sc0JBQXNCLENBQUMsS0FBSyxNQUFNLEtBQUssS0FBSyxJQUFJO0FBQ3RELFNBQVMsbUJBQW1CLEtBQUssVUFBVTtBQUN2QyxRQUFNQSxRQUFPLHVCQUFPLE9BQU8sSUFBSTtBQUMvQixvQkFBa0IsUUFBUSxVQUFRO0FBQzlCLFVBQU0sT0FBTyxPQUFPLHlCQUF5QixVQUFVLElBQUk7QUFDM0QsUUFBSSxDQUFDLE1BQU07QUFDUCxZQUFNLGdCQUFnQixlQUFlLGdCQUFnQjtBQUFBLElBQ3hEO0FBQ0QsVUFBTSxPQUFPLE1BQU0sS0FBSyxLQUFLLElBQ3ZCO0FBQUEsTUFDRSxNQUFNO0FBQ0YsZUFBTyxLQUFLLE1BQU07QUFBQSxNQUNyQjtBQUFBLE1BRUQsSUFBSSxLQUFLO0FBQ0wsYUFBSyxNQUFNLFFBQVE7QUFBQSxNQUN0QjtBQUFBLElBQ0osSUFDQztBQUFBLE1BQ0UsTUFBTTtBQUNGLGVBQU8sS0FBSyxPQUFPLEtBQUssSUFBRztBQUFBLE1BQzlCO0FBQUEsSUFDakI7QUFDUSxXQUFPLGVBQWVBLE9BQU0sTUFBTSxJQUFJO0FBQUEsRUFDOUMsQ0FBSztBQUNELE1BQUksT0FBTyxpQkFBaUIsUUFBUUE7QUFDcEMsc0JBQW9CLFFBQVEsWUFBVTtBQUNsQyxVQUFNLE9BQU8sT0FBTyx5QkFBeUIsVUFBVSxNQUFNO0FBQzdELFFBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxPQUFPO0FBQ3RCLFlBQU0sZ0JBQWdCLGVBQWUsZ0JBQWdCO0FBQUEsSUFDeEQ7QUFDRCxXQUFPLGVBQWUsSUFBSSxPQUFPLGtCQUFrQixJQUFJLFVBQVUsSUFBSTtBQUFBLEVBQzdFLENBQUs7QUFDTDtBQUdBLHdCQUF3QixZQUFZO0FBRXBDLHlCQUF5Qix1QkFBdUI7QUFLMEI7QUFDdEUsUUFBTSxTQUFTO0FBQ2YsU0FBTyxjQUFjO0FBQ3JCLGtCQUFnQixPQUFPLGdDQUFnQztBQUMzRDtBQzN2RkEsSUFBZSxPQUFBO0FBQUEsRUFDYixPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFDYixjQUFjO0FBQUEsSUFDZCxtQkFBbUI7QUFBQSxJQUNuQixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsRUFDUjtBQUNIO0FDWEEsSUFBZSxPQUFBO0FBQUEsRUFDYixPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFDYixjQUFjO0FBQUEsSUFDZCxtQkFBbUI7QUFBQSxJQUNuQixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsRUFDUjtBQUNIO0FDUkEsSUFBZSxXQUFBO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxTQUFTO0FBQ1g7QUNGQSxJQUFBLE9BQWUsS0FBSyxDQUFDLEVBQUUsVUFBVTtBQUMvQixRQUFNQSxRQUFPLFdBQVc7QUFBQSxJQUN0QixRQUFRO0FBQUEsSUFDUixpQkFBaUI7QUFBQSxJQUNqQjtBQUFBLEVBQ0osQ0FBRztBQUdELE1BQUksSUFBSUEsS0FBSTtBQUNkLENBQUM7OyJ9
