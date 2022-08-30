import { w as watch, k as onBeforeUnmount, i as inject, g as getCurrentInstance, u as formKey, v as useSizeProps, j as createComponent, x as useSize, c as computed, h, y as hMergeSlotSafely, r as ref, z as debounce, A as injectProp, B as onBeforeUpdate, C as stopAndPrevent, D as nextTick, E as onDeactivated, G as onActivated, o as onMounted, H as isRuntimeSsrPreHydration, I as prevent, J as QIcon, Q as QSpinner, m as hSlot, l as Transition, K as shouldIgnoreKey, L as client, M as stop, N as hMergeSlot, O as toRaw, P as provide, R as quasarKey, _ as _export_sfc, n as openBlock, S as createBlock, U as withCtx, t as resolveComponent, q as createBaseVNode, d as createVNode, V as toDisplayString, W as withKeys, X as QBtn, Y as normalizeClass } from "./index.e6710fc9.js";
import { b as between, u as useDarkProps, a as useDark, c as useAuthStore, d as auth, s as showNotification } from "./notification.c740bcd2.js";
import { _ as _imports_0 } from "./logo.73be8f37.js";
import "./axios.307908e9.js";
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    props.disable !== true && $form.bindComponent(proxy);
    onBeforeUnmount(() => {
      props.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
"Boolean Number String Function Array Date RegExp Object".split(" ").forEach((name) => {
  name.toLowerCase();
});
const useCircularCommonProps = {
  ...useSizeProps,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  color: String,
  centerColor: String,
  trackColor: String,
  fontSize: String,
  thickness: {
    type: Number,
    default: 0.2,
    validator: (v) => v >= 0 && v <= 1
  },
  angle: {
    type: Number,
    default: 0
  },
  showValue: Boolean,
  reverse: Boolean,
  instantFeedback: Boolean
};
const radius = 50, diameter = 2 * radius, circumference = diameter * Math.PI, strokeDashArray = Math.round(circumference * 1e3) / 1e3;
createComponent({
  name: "QCircularProgress",
  props: {
    ...useCircularCommonProps,
    value: {
      type: Number,
      default: 0
    },
    animationSpeed: {
      type: [String, Number],
      default: 600
    },
    indeterminate: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const svgStyle = computed(() => {
      const angle = ($q.lang.rtl === true ? -1 : 1) * props.angle;
      return {
        transform: props.reverse !== ($q.lang.rtl === true) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - angle}deg)` : `rotate3d(0, 0, 1, ${angle - 90}deg)`
      };
    });
    const circleStyle = computed(() => props.instantFeedback !== true && props.indeterminate !== true ? { transition: `stroke-dashoffset ${props.animationSpeed}ms ease 0s, stroke ${props.animationSpeed}ms ease` } : "");
    const viewBox = computed(() => diameter / (1 - props.thickness / 2));
    const viewBoxAttr = computed(
      () => `${viewBox.value / 2} ${viewBox.value / 2} ${viewBox.value} ${viewBox.value}`
    );
    const normalized = computed(() => between(props.value, props.min, props.max));
    const strokeDashOffset = computed(() => circumference * (1 - (normalized.value - props.min) / (props.max - props.min)));
    const strokeWidth = computed(() => props.thickness / 2 * viewBox.value);
    function getCircle({ thickness, offset, color, cls }) {
      return h("circle", {
        class: "q-circular-progress__" + cls + (color !== void 0 ? ` text-${color}` : ""),
        style: circleStyle.value,
        fill: "transparent",
        stroke: "currentColor",
        "stroke-width": thickness,
        "stroke-dasharray": strokeDashArray,
        "stroke-dashoffset": offset,
        cx: viewBox.value,
        cy: viewBox.value,
        r: radius
      });
    }
    return () => {
      const svgChild = [];
      props.centerColor !== void 0 && props.centerColor !== "transparent" && svgChild.push(
        h("circle", {
          class: `q-circular-progress__center text-${props.centerColor}`,
          fill: "currentColor",
          r: radius - strokeWidth.value / 2,
          cx: viewBox.value,
          cy: viewBox.value
        })
      );
      props.trackColor !== void 0 && props.trackColor !== "transparent" && svgChild.push(
        getCircle({
          cls: "track",
          thickness: strokeWidth.value,
          offset: 0,
          color: props.trackColor
        })
      );
      svgChild.push(
        getCircle({
          cls: "circle",
          thickness: strokeWidth.value,
          offset: strokeDashOffset.value,
          color: props.color
        })
      );
      const child = [
        h("svg", {
          class: "q-circular-progress__svg",
          style: svgStyle.value,
          viewBox: viewBoxAttr.value,
          "aria-hidden": "true"
        }, svgChild)
      ];
      props.showValue === true && child.push(
        h("div", {
          class: "q-circular-progress__text absolute-full row flex-center content-center",
          style: { fontSize: props.fontSize }
        }, slots.default !== void 0 ? slots.default() : [h("div", normalized.value)])
      );
      return h("div", {
        class: `q-circular-progress q-circular-progress--${props.indeterminate === true ? "in" : ""}determinate`,
        style: sizeStyle.value,
        role: "progressbar",
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.indeterminate === true ? void 0 : normalized.value
      }, hMergeSlotSafely(slots.internal, child));
    };
  }
});
const useFileEmits = ["rejected"];
const coreEmits = [
  ...useFileEmits,
  "start",
  "finish",
  "added",
  "removed"
];
const trueFn = () => true;
function getEmitsObject(emitsArray) {
  const emitsObject = {};
  emitsArray.forEach((val) => {
    emitsObject[val] = trueFn;
  });
  return emitsObject;
}
getEmitsObject(coreEmits);
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props.rules !== void 0 && props.rules !== null && props.rules.length > 0
  );
  const hasActiveRules = computed(
    () => props.disable !== true && hasRules.value === true
  );
  const hasError = computed(
    () => props.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props.errorMessage === "string" && props.errorMessage.length > 0 ? props.errorMessage : innerErrorMessage.value);
  watch(() => props.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index = ++validateIndex;
    if (innerLoading.value !== true && props.lazyRules !== true) {
      isDirtyModel.value = true;
    }
    const update = (err, msg) => {
      if (innerError.value !== err) {
        innerError.value = err;
      }
      const m = msg || void 0;
      if (innerErrorMessage.value !== m) {
        innerErrorMessage.value = m;
      }
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }
        return false;
      }
    );
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props.lazyRules !== "ondemand" && (isDirtyModel.value === true || props.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update() {
    const attributes = {};
    const listeners = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }
  onBeforeUpdate(update);
  update();
  return acc;
}
let queue = [];
let waitFlags = [];
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length > 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popup-show", "popup-hide"];
function useFieldState() {
  const { props, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props, proxy.$q);
  return {
    isDark,
    editable: computed(
      () => props.disable !== true && props.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === "string" || typeof props.modelValue === "number" ? ("" + props.modelValue).length : Array.isArray(props.modelValue) === true ? props.modelValue.length : 0;
        const max = props.maxlength !== void 0 ? props.maxlength : props.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props.bottomSlots === true || props.hint !== void 0 || hasRules.value === true || props.counter === true || props.error !== null
  );
  const styleType = computed(() => {
    if (props.filled === true) {
      return "filled";
    }
    if (props.outlined === true) {
      return "outlined";
    }
    if (props.borderless === true) {
      return "borderless";
    }
    if (props.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props.rounded === true ? " q-field--rounded" : "") + (props.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props.dense === true ? " q-field--dense" : "") + (props.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props.disable === true ? " q-field--disabled" : props.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props.bgColor !== void 0 ? ` bg-${props.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props.standout === "string" && props.standout.length > 0 && state.focused.value === true ? ` ${props.standout}` : props.color !== void 0 ? ` text-${props.color}` : "")
  );
  const hasLabel = computed(
    () => props.labelSlot === true || props.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${props.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;
    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute("tabindex") === true || (target = target.querySelector("[tabindex]"));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    clearTimeout(focusoutTimer);
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props.type === "file") {
      state.inputRef.value.value = null;
    }
    emit("update:modelValue", null);
    emit("clear", props.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props.color })]
        )
      );
    } else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props.prefix !== void 0 && props.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );
    props.suffix !== void 0 && props.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [h("div", props.hint)];
        key = `q--slot-hint-${props.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props.counter === true || slots.counter !== void 0;
    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props.hideBottomSpace !== true ? "animated" : "stale")
    }, [
      props.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  Object.assign(proxy, { focus, blur });
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    clearTimeout(focusoutTimer);
  });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props.type);
  }
  watch(() => props.type + props.autogrow, updateMaskInternals);
  watch(() => props.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit("update:modelValue", val);
    }
  });
  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));
      return props.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props.modelValue;
  }
  function getPaddedMaskMarked(size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props.mask !== void 0 && props.mask.length > 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props.mask] === void 0 ? props.mask : NAMED_MASKS[props.mask], fillChar = typeof props.fillMask === "string" && props.fillMask.length > 0 ? props.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(val);
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length > 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props.reverseFillMask !== true) {
        const cursor = end - 1;
        moveCursor.right(inp, cursor, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor, cursor);
        }
      }
    });
    const val = props.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    inp.setSelectionRange(start, end, "forward");
  }
  const moveCursor = {
    left(inp, start, end, selection) {
      const noMarkBefore = maskMarked.slice(start - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          start = i;
          noMarkBefore === true && start++;
          break;
        }
      }
      if (i < 0 && maskMarked[start] !== void 0 && maskMarked[start] !== MARKER) {
        return moveCursor.right(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(
        start,
        selection === true ? end : start,
        "backward"
      );
    },
    right(inp, start, end, selection) {
      const limit = inp.value.length;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          end = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          end = i;
        }
      }
      if (i > limit && maskMarked[end - 1] !== void 0 && maskMarked[end - 1] !== MARKER) {
        return moveCursor.left(inp, limit, limit);
      }
      inp.setSelectionRange(selection ? start : end, end, "forward");
    },
    leftReverse(inp, start, end, selection) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, start - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          start = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          start = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[start] !== void 0 && localMaskMarked[start] !== MARKER) {
        return moveCursor.rightReverse(inp, 0, 0);
      }
      start >= 0 && inp.setSelectionRange(
        start,
        selection === true ? end : start,
        "backward"
      );
    },
    rightReverse(inp, start, end, selection) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, end + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, end + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          end = i;
          end > 0 && noMarkBefore === true && end--;
          break;
        }
      }
      if (i > limit && localMaskMarked[end - 1] !== void 0 && localMaskMarked[end - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit, limit);
      }
      inp.setSelectionRange(selection === true ? start : end, end, "forward");
    }
  };
  function onMaskedKeydown(e) {
    if (shouldIgnoreKey(e) === true) {
      return;
    }
    const inp = inputRef.value, start = inp.selectionStart, end = inp.selectionEnd;
    if (e.keyCode === 37 || e.keyCode === 39) {
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, start, end, e.shiftKey);
    } else if (e.keyCode === 8 && props.reverseFillMask !== true && start === end) {
      moveCursor.left(inp, start, end, true);
    } else if (e.keyCode === 46 && props.reverseFillMask === true && start === end) {
      moveCursor.rightReverse(inp, start, end, true);
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props.reverseFillMask === true && val.length > 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown
  };
}
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
function useFormInputNameAttr(props) {
  return computed(() => props.name || props.for);
}
function useFileFormDomProps(props, typeGuard) {
  function getFormDomProps() {
    const model = props.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change"
  ],
  setup(props, { emit, attrs }) {
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown
    } = useMask(props, emit, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props.type === "textarea" || props.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
      }
      if (props.autogrow === true) {
        evt.onAnimationend = adjustHeight;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props.autofocus === true || void 0,
        rows: props.type === "textarea" ? 6 : void 0,
        "aria-label": props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props.type;
      }
      if (props.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });
    watch(() => props.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props.type === "file") {
        emit("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props.autogrow === true && adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        if (props.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props.debounce !== void 0) {
        clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      const inp = inputRef.value;
      if (inp !== null) {
        const parentStyle = inp.parentNode.style;
        const { overflow } = inp.style;
        parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
        inp.style.height = "1px";
        inp.style.overflow = "hidden";
        inp.style.height = inp.scrollHeight + "px";
        inp.style.overflow = overflow;
        parentStyle.marginBottom = "";
      }
    }
    function onChange(e) {
      onComposition(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      emit("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      clearTimeout(emitTimer);
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props.type !== "file" && typeof props.shadowText === "string" && props.shadowText.length > 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true || fieldValueIsFilled(props.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    const vm = getCurrentInstance();
    Object.assign(vm.proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    return renderFn;
  }
});
function useRefocusTarget(props, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
var optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,
  modelValue: {
    required: true,
    default: null
  },
  val: {},
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (v) => v === "tf" || v === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
};
const useCheckboxEmits = ["update:modelValue"];
function useCheckbox(type, getInner) {
  const { props, slots, emit, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const isDark = useDark(props, $q);
  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props, rootRef);
  const sizeStyle = useSize(props, optionSizes);
  const modelIsArray = computed(
    () => props.val !== void 0 && Array.isArray(props.modelValue)
  );
  const index = computed(() => {
    const val = toRaw(props.val);
    return modelIsArray.value === true ? props.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
  });
  const isTrue = computed(() => modelIsArray.value === true ? index.value > -1 : toRaw(props.modelValue) === toRaw(props.trueValue));
  const isFalse = computed(() => modelIsArray.value === true ? index.value === -1 : toRaw(props.modelValue) === toRaw(props.falseValue));
  const isIndeterminate = computed(
    () => isTrue.value === false && isFalse.value === false
  );
  const tabindex = computed(() => props.disable === true ? -1 : props.tabindex || 0);
  const classes = computed(
    () => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props.disable === true ? " disabled" : "") + (isDark.value === true ? ` q-${type}--dark` : "") + (props.dense === true ? ` q-${type}--dense` : "") + (props.leftLabel === true ? " reverse" : "")
  );
  const innerClass = computed(() => {
    const state = isTrue.value === true ? "truthy" : isFalse.value === true ? "falsy" : "indet";
    const color = props.color !== void 0 && (props.keepColor === true || (type === "toggle" ? isTrue.value === true : isFalse.value !== true)) ? ` text-${props.color}` : "";
    return `q-${type}__inner relative-position non-selectable q-${type}__inner--${state}${color}`;
  });
  const formAttrs = computed(() => {
    const prop = { type: "checkbox" };
    props.name !== void 0 && Object.assign(prop, {
      "^checked": isTrue.value === true ? "checked" : void 0,
      name: props.name,
      value: modelIsArray.value === true ? props.val : props.trueValue
    });
    return prop;
  });
  const injectFormInput = useFormInject(formAttrs);
  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: "checkbox",
      "aria-label": props.label,
      "aria-checked": isIndeterminate.value === true ? "mixed" : isTrue.value === true ? "true" : "false"
    };
    if (props.disable === true) {
      attrs["aria-disabled"] = "true";
    }
    return attrs;
  });
  function onClick(e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }
    if (props.disable !== true) {
      emit("update:modelValue", getNextValue(), e);
    }
  }
  function getNextValue() {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props.modelValue.slice();
        val.splice(index.value, 1);
        return val;
      }
      return props.modelValue.concat([props.val]);
    }
    if (isTrue.value === true) {
      if (props.toggleOrder !== "ft" || props.toggleIndeterminate === false) {
        return props.falseValue;
      }
    } else if (isFalse.value === true) {
      if (props.toggleOrder === "ft" || props.toggleIndeterminate === false) {
        return props.trueValue;
      }
    } else {
      return props.toggleOrder !== "ft" ? props.trueValue : props.falseValue;
    }
    return props.indeterminateValue;
  }
  function onKeydown(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      stopAndPrevent(e);
    }
  }
  function onKeyup(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  }
  const getInnerContent = getInner(isTrue, isIndeterminate);
  Object.assign(proxy, { toggle: onClick });
  return () => {
    const inner = getInnerContent();
    props.disable !== true && injectFormInput(
      inner,
      "unshift",
      ` q-${type}__native absolute q-ma-none q-pa-none`
    );
    const child = [
      h("div", {
        class: innerClass.value,
        style: sizeStyle.value
      }, inner)
    ];
    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }
    const label = props.label !== void 0 ? hMergeSlot(slots.default, [props.label]) : hSlot(slots.default);
    label !== void 0 && child.push(
      h("div", {
        class: `q-${type}__label q-anchor--skip`
      }, label)
    );
    return h("div", {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown,
      onKeyup
    }, child);
  };
}
const bgNode = h("div", {
  key: "svg",
  class: "q-checkbox__bg absolute"
}, [
  h("svg", {
    class: "q-checkbox__svg fit absolute-full",
    viewBox: "0 0 24 24",
    "aria-hidden": "true"
  }, [
    h("path", {
      class: "q-checkbox__truthy",
      fill: "none",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    }),
    h("path", {
      class: "q-checkbox__indet",
      d: "M4,14H20V10H4"
    })
  ])
]);
var QCheckbox = createComponent({
  name: "QCheckbox",
  props: useCheckboxProps,
  emits: useCheckboxEmits,
  setup(props) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props.checkedIcon : isIndeterminate.value === true ? props.indeterminateIcon : props.uncheckedIcon) || null
      );
      return () => icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-checkbox__icon",
            name: icon.value
          })
        ])
      ] : [bgNode];
    }
    return useCheckbox("checkbox", getInner);
  }
});
var QForm = createComponent({
  name: "QForm",
  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,
    onSubmit: Function
  },
  emits: ["reset", "validation-success", "validation-error"],
  setup(props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);
    let validateIndex = 0;
    const registeredComponents = [];
    function validate(shouldFocus) {
      const promises = [];
      const focus2 = typeof shouldFocus === "boolean" ? shouldFocus : props.noErrorFocus !== true;
      const index = ++validateIndex;
      const emitEvent = (res, ref2) => {
        emit("validation-" + (res === true ? "success" : "error"), ref2);
      };
      for (let i = 0; i < registeredComponents.length; i++) {
        const comp = registeredComponents[i];
        const valid = comp.validate();
        if (typeof valid.then === "function") {
          promises.push(
            valid.then(
              (valid2) => ({ valid: valid2, comp }),
              (err) => ({ valid: false, comp, err })
            )
          );
        } else if (valid !== true) {
          if (props.greedy === false) {
            emitEvent(false, comp);
            if (focus2 === true && typeof comp.focus === "function") {
              comp.focus();
            }
            return Promise.resolve(false);
          }
          promises.push({ valid: false, comp });
        }
      }
      if (promises.length === 0) {
        emitEvent(true);
        return Promise.resolve(true);
      }
      return Promise.all(promises).then((res) => {
        const errors = res.filter((r) => r.valid !== true);
        if (errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true;
        }
        const { valid, comp, err } = errors[0];
        if (index === validateIndex) {
          err !== void 0 && console.error(err);
          emitEvent(false, comp);
          if (focus2 === true && valid !== true && typeof comp.focus === "function") {
            comp.focus();
          }
        }
        return false;
      });
    }
    function resetValidation() {
      validateIndex++;
      registeredComponents.forEach((comp) => {
        typeof comp.resetValidation === "function" && comp.resetValidation();
      });
    }
    function submit(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      const index = validateIndex + 1;
      validate().then((val) => {
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit("submit", evt);
          } else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === "function") {
            evt.target.submit();
          }
        }
      });
    }
    function reset(evt) {
      evt !== void 0 && stopAndPrevent(evt);
      emit("reset");
      nextTick(() => {
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }
    function focus() {
      addFocusFn(() => {
        if (rootRef.value === null) {
          return;
        }
        const target = rootRef.value.querySelector("[autofocus], [data-autofocus]") || Array.prototype.find.call(rootRef.value.querySelectorAll("[tabindex]"), (el) => el.tabIndex > -1);
        target !== null && target !== void 0 && target.focus({ preventScroll: true });
      });
    }
    provide(formKey, {
      bindComponent(vmProxy) {
        registeredComponents.push(vmProxy);
      },
      unbindComponent(vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index > -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });
    let shouldActivate = false;
    onDeactivated(() => {
      shouldActivate = true;
    });
    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });
    onMounted(() => {
      props.autofocus === true && focus();
    });
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });
    return () => h("form", {
      class: "q-form",
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default));
  }
});
function useQuasar() {
  return inject(quasarKey);
}
function validateEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
  return reg.test(email);
}
const storeAuth = useAuthStore();
const _sfc_main = {
  setup() {
    const $q = useQuasar();
    return $q;
  },
  computed: {
    buttonClass() {
      return this.$q.screen.lt.md ? "full-width q-pa-md" : "q-px-xl";
    },
    iconVisibility() {
      return this.loginForm.isPwd ? "visibility_off" : "visibility";
    },
    inputType() {
      return this.loginForm.isPwd ? "password" : "text";
    },
    divMargin() {
      return this.$q.screen.lt.md ? "" : "q-py-xl q-my-xl";
    },
    emailValid() {
      return this.isDisabled ? false : validateEmail(this.loginForm.email);
    },
    passwordValid() {
      if (this.isDisabled) {
        return false;
      } else {
        if (this.emailValid && this.loginForm.password !== "") {
          return true;
        }
      }
      return false;
    }
  },
  data() {
    return {
      loginForm: {
        email: "user@user.com",
        isPwd: true,
        password: "*user123",
        remember: false
      },
      loading: false,
      isDisabled: false
    };
  },
  methods: {
    changeInputType() {
      this.loginForm.isPwd = !this.loginForm.isPwd;
    },
    updateEmailVerification() {
      if (validateEmail(this.loginForm.email)) {
        this.showError = false;
      } else {
        this.showError = true;
        this.loginForm.password = "";
      }
    },
    async onSubmit() {
      this.loading = true;
      this.isDisabled = true;
      await auth.login({
        email: this.loginForm.email,
        password: this.loginForm.password
      });
      if (storeAuth.isAuthenticated) {
        showNotification("positive", this.$t("login.welcome"));
        this.$router.push({ path: "/dashboard" });
      } else {
        this.loading = false;
        this.isDisabled = false;
        this.loginForm.password = "";
        showNotification("negative", this.$t("login.error"));
      }
    },
    onReset() {
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("img", {
  src: _imports_0,
  "spinner-color": "white",
  class: "full-width"
}, null, -1);
const _hoisted_2 = { class: "q-pa-md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_p_page = resolveComponent("p-page");
  return openBlock(), createBlock(_component_p_page, {
    flex: "",
    "flex-center": ""
  }, {
    default: withCtx(() => [
      createBaseVNode("div", {
        class: normalizeClass($options.divMargin)
      }, [
        createVNode(QForm, {
          onReset: $options.onReset,
          class: "q-gutter-sm"
        }, {
          default: withCtx(() => [
            _hoisted_1,
            createBaseVNode("h4", null, toDisplayString(_ctx.$t("login.title")), 1),
            createVNode(QInput, {
              ref: "email",
              modelValue: $data.loginForm.email,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.loginForm.email = $event),
              label: _ctx.$t("login.email"),
              disable: $data.isDisabled,
              outlined: "",
              type: "email",
              "bottom-slots": "",
              onBlur: $options.updateEmailVerification,
              autofocus: "",
              error: _ctx.showError,
              "error-message": _ctx.$t("login.enter_valid_email")
            }, null, 8, ["modelValue", "label", "disable", "onBlur", "error", "error-message"]),
            createVNode(QInput, {
              outlined: "",
              disable: !$options.emailValid,
              modelValue: $data.loginForm.password,
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.loginForm.password = $event),
              label: _ctx.$t("login.password"),
              type: $options.inputType,
              onKeyup: _cache[2] || (_cache[2] = withKeys(($event) => {
                _ctx.login();
                $event.target.blur();
              }, ["enter"]))
            }, {
              append: withCtx(() => [
                createVNode(QIcon, {
                  name: $options.iconVisibility,
                  class: "cursor-pointer",
                  onClick: $options.changeInputType
                }, null, 8, ["name", "onClick"])
              ]),
              _: 1
            }, 8, ["disable", "modelValue", "label", "type"]),
            createBaseVNode("div", null, [
              createVNode(QCheckbox, {
                disable: !$options.emailValid,
                modelValue: $data.loginForm.remember,
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.loginForm.remember = $event),
                label: _ctx.$t("login.remember_me")
              }, null, 8, ["disable", "modelValue", "label"])
            ]),
            createBaseVNode("div", _hoisted_2, [
              createVNode(QBtn, {
                unelevated: "",
                rounded: "",
                loading: $data.loading,
                disable: !$options.passwordValid,
                color: "primary",
                label: _ctx.$t("login.action_login"),
                ripple: { center: true },
                class: normalizeClass($options.buttonClass),
                "no-caps": "",
                onClick: $options.onSubmit
              }, null, 8, ["loading", "disable", "label", "class", "onClick"])
            ])
          ]),
          _: 1
        }, 8, ["onReset"])
      ], 2)
    ]),
    _: 1
  });
}
var IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "IndexPage.vue"]]);
export { IndexPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLmI1ZmU0MjkzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy91c2UtZm9ybS1jaGlsZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3BhdHRlcm5zLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZXh0ZW5kLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaXJjdWxhci1wcm9ncmVzcy91c2UtY2lyY3VsYXItcHJvZ3Jlc3MuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL1FDaXJjdWxhclByb2dyZXNzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmlsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdXBsb2FkZXIvdXBsb2FkZXItY29yZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvZ2V0LWVtaXRzLW9iamVjdC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL2NyZWF0ZS11cGxvYWRlci1jb21wb25lbnQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy91aWQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS12YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNwbGl0LWF0dHJzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9mb2N1cy1tYW5hZ2VyLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2lucHV0L3VzZS1tYXNrLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZpbGUtZG9tLXByb3BzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Uta2V5LWNvbXBvc2l0aW9uLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9pbnB1dC9RSW5wdXQuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yZWZvY3VzLXRhcmdldC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvb3B0aW9uLXNpemVzLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGVja2JveC91c2UtY2hlY2tib3guanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NoZWNrYm94L1FDaGVja2JveC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZm9ybS9RRm9ybS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3VzZS1xdWFzYXIuanMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvZW1haWwvaW5kZXguanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvbG9naW4vSW5kZXhQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3QsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgZm9ybUtleSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgdmFsaWRhdGUsIHJlc2V0VmFsaWRhdGlvbiwgcmVxdWlyZXNRRm9ybSB9KSB7XG4gIGNvbnN0ICRmb3JtID0gaW5qZWN0KGZvcm1LZXksIGZhbHNlKVxuXG4gIGlmICgkZm9ybSAhPT0gZmFsc2UpIHtcbiAgICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIC8vIGV4cG9ydCBwdWJsaWMgbWV0aG9kIChzbyBpdCBjYW4gYmUgdXNlZCBpbiBRRm9ybSlcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHZhbGlkYXRlLCByZXNldFZhbGlkYXRpb24gfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLmRpc2FibGUsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICAgIHR5cGVvZiByZXNldFZhbGlkYXRpb24gPT09ICdmdW5jdGlvbicgJiYgcmVzZXRWYWxpZGF0aW9uKClcbiAgICAgICAgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIHJlZ2lzdGVyIGNvbXBvbmVudCB0byBwYXJlbnQgUUZvcm1cbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmICRmb3JtLmJpbmRDb21wb25lbnQocHJveHkpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgLy8gdW5yZWdpc3RlciBjb21wb25lbnRcbiAgICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgJGZvcm0udW5iaW5kQ29tcG9uZW50KHByb3h5KVxuICAgIH0pXG4gIH1cbiAgZWxzZSBpZiAocmVxdWlyZXNRRm9ybSA9PT0gdHJ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1BhcmVudCBRRm9ybSBub3QgZm91bmQgb24gdXNlRm9ybUNoaWxkKCkhJylcbiAgfVxufVxuIiwiLy8gZmlsZSByZWZlcmVuY2VkIGZyb20gZG9jc1xuXG5jb25zdFxuICBoZXggPSAvXiNbMC05YS1mQS1GXXszfShbMC05YS1mQS1GXXszfSk/JC8sXG4gIGhleGEgPSAvXiNbMC05YS1mQS1GXXs0fShbMC05YS1mQS1GXXs0fSk/JC8sXG4gIGhleE9ySGV4YSA9IC9eIyhbMC05YS1mQS1GXXszfXxbMC05YS1mQS1GXXs0fXxbMC05YS1mQS1GXXs2fXxbMC05YS1mQS1GXXs4fSkkLyxcbiAgcmdiID0gL15yZ2JcXCgoKDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKSwpezJ9KDB8WzEtOV1bXFxkXT98MVtcXGRdezAsMn18MltcXGRdP3wyWzAtNF1bXFxkXXwyNVswLTVdKVxcKSQvLFxuICByZ2JhID0gL15yZ2JhXFwoKCgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKXsyfSgwfFsxLTldW1xcZF0/fDFbXFxkXXswLDJ9fDJbXFxkXT98MlswLTRdW1xcZF18MjVbMC01XSksKDB8MFxcLlswLTldK1sxLTldfDBcXC5bMS05XSt8MSlcXCkkL1xuXG4vLyBLZWVwIGluIHN5bmMgd2l0aCB1aS90eXBlcy9hcGkvdmFsaWRhdGlvbi5kLnRzXG5leHBvcnQgY29uc3QgdGVzdFBhdHRlcm4gPSB7XG4gIGRhdGU6IHYgPT4gL14tP1tcXGRdK1xcL1swLTFdXFxkXFwvWzAtM11cXGQkLy50ZXN0KHYpLFxuICB0aW1lOiB2ID0+IC9eKFswLTFdP1xcZHwyWzAtM10pOlswLTVdXFxkJC8udGVzdCh2KSxcbiAgZnVsbHRpbWU6IHYgPT4gL14oWzAtMV0/XFxkfDJbMC0zXSk6WzAtNV1cXGQ6WzAtNV1cXGQkLy50ZXN0KHYpLFxuICB0aW1lT3JGdWxsdGltZTogdiA9PiAvXihbMC0xXT9cXGR8MlswLTNdKTpbMC01XVxcZCg6WzAtNV1cXGQpPyQvLnRlc3QodiksXG5cbiAgLy8gLS0gUkZDIDUzMjIgLS1cbiAgLy8gLS0gQWRkZWQgaW4gdjIuNi42IC0tXG4gIC8vIFRoaXMgaXMgYSBiYXNpYyBoZWxwZXIgdmFsaWRhdGlvbi5cbiAgLy8gRm9yIHNvbWV0aGluZyBtb3JlIGNvbXBsZXggKGxpa2UgUkZDIDgyMikgeW91IHNob3VsZCB3cml0ZSBhbmQgdXNlIHlvdXIgb3duIHJ1bGUuXG4gIC8vIFdlIHdvbid0IGJlIGFjY2VwdGluZyBQUnMgdG8gZW5oYW5jZSB0aGUgb25lIGJlbG93IGJlY2F1c2Ugb2YgdGhlIHJlYXNvbiBhYm92ZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGVtYWlsOiB2ID0+IC9eKChbXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKFxcLltePD4oKVxcW1xcXVxcXFwuLDs6XFxzQFwiXSspKil8KFwiLitcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfV0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QodiksXG5cbiAgaGV4Q29sb3I6IHYgPT4gaGV4LnRlc3QodiksXG4gIGhleGFDb2xvcjogdiA9PiBoZXhhLnRlc3QodiksXG4gIGhleE9ySGV4YUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpLFxuXG4gIHJnYkNvbG9yOiB2ID0+IHJnYi50ZXN0KHYpLFxuICByZ2JhQ29sb3I6IHYgPT4gcmdiYS50ZXN0KHYpLFxuICByZ2JPclJnYmFDb2xvcjogdiA9PiByZ2IudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG5cbiAgaGV4T3JSZ2JDb2xvcjogdiA9PiBoZXgudGVzdCh2KSB8fCByZ2IudGVzdCh2KSxcbiAgaGV4YU9yUmdiYUNvbG9yOiB2ID0+IGhleGEudGVzdCh2KSB8fCByZ2JhLnRlc3QodiksXG4gIGFueUNvbG9yOiB2ID0+IGhleE9ySGV4YS50ZXN0KHYpIHx8IHJnYi50ZXN0KHYpIHx8IHJnYmEudGVzdCh2KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRlc3RQYXR0ZXJuXG59XG4iLCJjb25zdFxuICB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsXG4gIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHksXG4gIGNsYXNzMnR5cGUgPSB7fVxuXG4nQm9vbGVhbiBOdW1iZXIgU3RyaW5nIEZ1bmN0aW9uIEFycmF5IERhdGUgUmVnRXhwIE9iamVjdCcuc3BsaXQoJyAnKS5mb3JFYWNoKG5hbWUgPT4ge1xuICBjbGFzczJ0eXBlWyAnW29iamVjdCAnICsgbmFtZSArICddJyBdID0gbmFtZS50b0xvd2VyQ2FzZSgpXG59KVxuXG5mdW5jdGlvbiB0eXBlIChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gbnVsbCA/IFN0cmluZyhvYmopIDogY2xhc3MydHlwZVsgdG9TdHJpbmcuY2FsbChvYmopIF0gfHwgJ29iamVjdCdcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCAob2JqKSB7XG4gIGlmICghb2JqIHx8IHR5cGUob2JqKSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmIChvYmouY29uc3RydWN0b3JcbiAgICAmJiAhaGFzT3duLmNhbGwob2JqLCAnY29uc3RydWN0b3InKVxuICAgICYmICFoYXNPd24uY2FsbChvYmouY29uc3RydWN0b3IucHJvdG90eXBlLCAnaXNQcm90b3R5cGVPZicpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBsZXQga2V5XG4gIGZvciAoa2V5IGluIG9iaikge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIHJldHVybiBrZXkgPT09IHZvaWQgMCB8fCBoYXNPd24uY2FsbChvYmosIGtleSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5kICgpIHtcbiAgbGV0XG4gICAgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjb3B5SXNBcnJheSwgY2xvbmUsXG4gICAgdGFyZ2V0ID0gYXJndW1lbnRzWyAwIF0gfHwge30sXG4gICAgaSA9IDEsXG4gICAgZGVlcCA9IGZhbHNlXG4gIGNvbnN0IGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGhcblxuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgZGVlcCA9IHRhcmdldFxuICAgIHRhcmdldCA9IGFyZ3VtZW50c1sgMSBdIHx8IHt9XG4gICAgaSA9IDJcbiAgfVxuXG4gIGlmIChPYmplY3QodGFyZ2V0KSAhPT0gdGFyZ2V0ICYmIHR5cGUodGFyZ2V0KSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRhcmdldCA9IHt9XG4gIH1cblxuICBpZiAobGVuZ3RoID09PSBpKSB7XG4gICAgdGFyZ2V0ID0gdGhpc1xuICAgIGktLVxuICB9XG5cbiAgZm9yICg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmICgob3B0aW9ucyA9IGFyZ3VtZW50c1sgaSBdKSAhPT0gbnVsbCkge1xuICAgICAgZm9yIChuYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgICAgc3JjID0gdGFyZ2V0WyBuYW1lIF1cbiAgICAgICAgY29weSA9IG9wdGlvbnNbIG5hbWUgXVxuXG4gICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlZXAgJiYgY29weSAmJiAoaXNQbGFpbk9iamVjdChjb3B5KSB8fCAoY29weUlzQXJyYXkgPSB0eXBlKGNvcHkpID09PSAnYXJyYXknKSkpIHtcbiAgICAgICAgICBpZiAoY29weUlzQXJyYXkpIHtcbiAgICAgICAgICAgIGNvcHlJc0FycmF5ID0gZmFsc2VcbiAgICAgICAgICAgIGNsb25lID0gc3JjICYmIHR5cGUoc3JjKSA9PT0gJ2FycmF5JyA/IHNyYyA6IFtdXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2xvbmUgPSBzcmMgJiYgaXNQbGFpbk9iamVjdChzcmMpID8gc3JjIDoge31cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0YXJnZXRbIG5hbWUgXSA9IGV4dGVuZChkZWVwLCBjbG9uZSwgY29weSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjb3B5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICB0YXJnZXRbIG5hbWUgXSA9IGNvcHlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cbiIsImltcG9ydCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbi8vIGFsc28gdXNlZCBieSBRS25vYlxuZXhwb3J0IGNvbnN0IHVzZUNpcmN1bGFyQ29tbW9uUHJvcHMgPSB7XG4gIC4uLnVzZVNpemVQcm9wcyxcblxuICBtaW46IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMTAwXG4gIH0sXG5cbiAgY29sb3I6IFN0cmluZyxcbiAgY2VudGVyQ29sb3I6IFN0cmluZyxcbiAgdHJhY2tDb2xvcjogU3RyaW5nLFxuXG4gIGZvbnRTaXplOiBTdHJpbmcsXG5cbiAgLy8gcmF0aW9cbiAgdGhpY2tuZXNzOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDAuMixcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA+PSAwICYmIHYgPD0gMVxuICB9LFxuXG4gIGFuZ2xlOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcblxuICBzaG93VmFsdWU6IEJvb2xlYW4sXG4gIHJldmVyc2U6IEJvb2xlYW4sXG5cbiAgaW5zdGFudEZlZWRiYWNrOiBCb29sZWFuXG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU2l6ZSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuaW1wb3J0IHsgdXNlQ2lyY3VsYXJDb21tb25Qcm9wcyB9IGZyb20gJy4vdXNlLWNpcmN1bGFyLXByb2dyZXNzLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5cbmNvbnN0XG4gIHJhZGl1cyA9IDUwLFxuICBkaWFtZXRlciA9IDIgKiByYWRpdXMsXG4gIGNpcmN1bWZlcmVuY2UgPSBkaWFtZXRlciAqIE1hdGguUEksXG4gIHN0cm9rZURhc2hBcnJheSA9IE1hdGgucm91bmQoY2lyY3VtZmVyZW5jZSAqIDEwMDApIC8gMTAwMFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNpcmN1bGFyUHJvZ3Jlc3MnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQ2lyY3VsYXJDb21tb25Qcm9wcyxcblxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiA2MDBcbiAgICB9LFxuXG4gICAgaW5kZXRlcm1pbmF0ZTogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMpXG5cbiAgICBjb25zdCBzdmdTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxKSAqIHByb3BzLmFuZ2xlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogcHJvcHMucmV2ZXJzZSAhPT0gKCRxLmxhbmcucnRsID09PSB0cnVlKVxuICAgICAgICAgID8gYHNjYWxlM2QoLTEsIDEsIDEpIHJvdGF0ZTNkKDAsIDAsIDEsICR7IC05MCAtIGFuZ2xlIH1kZWcpYFxuICAgICAgICAgIDogYHJvdGF0ZTNkKDAsIDAsIDEsICR7IGFuZ2xlIC0gOTAgfWRlZylgXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGNpcmNsZVN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuaW5zdGFudEZlZWRiYWNrICE9PSB0cnVlICYmIHByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRydWVcbiAgICAgICAgPyB7IHRyYW5zaXRpb246IGBzdHJva2UtZGFzaG9mZnNldCAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXMgZWFzZSAwcywgc3Ryb2tlICR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tcyBlYXNlYCB9XG4gICAgICAgIDogJydcbiAgICApKVxuXG4gICAgY29uc3Qgdmlld0JveCA9IGNvbXB1dGVkKCgpID0+IGRpYW1ldGVyIC8gKDEgLSBwcm9wcy50aGlja25lc3MgLyAyKSlcblxuICAgIGNvbnN0IHZpZXdCb3hBdHRyID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGAkeyB2aWV3Qm94LnZhbHVlIC8gMiB9ICR7IHZpZXdCb3gudmFsdWUgLyAyIH0gJHsgdmlld0JveC52YWx1ZSB9ICR7IHZpZXdCb3gudmFsdWUgfWBcbiAgICApXG5cbiAgICBjb25zdCBub3JtYWxpemVkID0gY29tcHV0ZWQoKCkgPT4gYmV0d2Vlbihwcm9wcy52YWx1ZSwgcHJvcHMubWluLCBwcm9wcy5tYXgpKVxuXG4gICAgY29uc3Qgc3Ryb2tlRGFzaE9mZnNldCA9IGNvbXB1dGVkKCgpID0+IGNpcmN1bWZlcmVuY2UgKiAoXG4gICAgICAxIC0gKG5vcm1hbGl6ZWQudmFsdWUgLSBwcm9wcy5taW4pIC8gKHByb3BzLm1heCAtIHByb3BzLm1pbilcbiAgICApKVxuXG4gICAgY29uc3Qgc3Ryb2tlV2lkdGggPSBjb21wdXRlZCgoKSA9PiBwcm9wcy50aGlja25lc3MgLyAyICogdmlld0JveC52YWx1ZSlcblxuICAgIGZ1bmN0aW9uIGdldENpcmNsZSAoeyB0aGlja25lc3MsIG9mZnNldCwgY29sb3IsIGNscyB9KSB7XG4gICAgICByZXR1cm4gaCgnY2lyY2xlJywge1xuICAgICAgICBjbGFzczogJ3EtY2lyY3VsYXItcHJvZ3Jlc3NfXycgKyBjbHMgKyAoY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBjb2xvciB9YCA6ICcnKSxcbiAgICAgICAgc3R5bGU6IGNpcmNsZVN0eWxlLnZhbHVlLFxuICAgICAgICBmaWxsOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAnc3Ryb2tlLXdpZHRoJzogdGhpY2tuZXNzLFxuICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IHN0cm9rZURhc2hBcnJheSxcbiAgICAgICAgJ3N0cm9rZS1kYXNob2Zmc2V0Jzogb2Zmc2V0LFxuICAgICAgICBjeDogdmlld0JveC52YWx1ZSxcbiAgICAgICAgY3k6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgIHI6IHJhZGl1c1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3Qgc3ZnQ2hpbGQgPSBbXVxuXG4gICAgICBwcm9wcy5jZW50ZXJDb2xvciAhPT0gdm9pZCAwICYmIHByb3BzLmNlbnRlckNvbG9yICE9PSAndHJhbnNwYXJlbnQnICYmIHN2Z0NoaWxkLnB1c2goXG4gICAgICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgICBjbGFzczogYHEtY2lyY3VsYXItcHJvZ3Jlc3NfX2NlbnRlciB0ZXh0LSR7IHByb3BzLmNlbnRlckNvbG9yIH1gLFxuICAgICAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAgIHI6IHJhZGl1cyAtIHN0cm9rZVdpZHRoLnZhbHVlIC8gMixcbiAgICAgICAgICBjeDogdmlld0JveC52YWx1ZSxcbiAgICAgICAgICBjeTogdmlld0JveC52YWx1ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy50cmFja0NvbG9yICE9PSB2b2lkIDAgJiYgcHJvcHMudHJhY2tDb2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBnZXRDaXJjbGUoe1xuICAgICAgICAgIGNsczogJ3RyYWNrJyxcbiAgICAgICAgICB0aGlja25lc3M6IHN0cm9rZVdpZHRoLnZhbHVlLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBjb2xvcjogcHJvcHMudHJhY2tDb2xvclxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBnZXRDaXJjbGUoe1xuICAgICAgICAgIGNsczogJ2NpcmNsZScsXG4gICAgICAgICAgdGhpY2tuZXNzOiBzdHJva2VXaWR0aC52YWx1ZSxcbiAgICAgICAgICBvZmZzZXQ6IHN0cm9rZURhc2hPZmZzZXQudmFsdWUsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdzdmcnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX19zdmcnLFxuICAgICAgICAgIHN0eWxlOiBzdmdTdHlsZS52YWx1ZSxcbiAgICAgICAgICB2aWV3Qm94OiB2aWV3Qm94QXR0ci52YWx1ZSxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgfSwgc3ZnQ2hpbGQpXG4gICAgICBdXG5cbiAgICAgIHByb3BzLnNob3dWYWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX190ZXh0IGFic29sdXRlLWZ1bGwgcm93IGZsZXgtY2VudGVyIGNvbnRlbnQtY2VudGVyJyxcbiAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogcHJvcHMuZm9udFNpemUgfVxuICAgICAgICB9LCBzbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBzbG90cy5kZWZhdWx0KCkgOiBbIGgoJ2RpdicsIG5vcm1hbGl6ZWQudmFsdWUpIF0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBgcS1jaXJjdWxhci1wcm9ncmVzcyBxLWNpcmN1bGFyLXByb2dyZXNzLS0keyBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlID8gJ2luJyA6ICcnIH1kZXRlcm1pbmF0ZWAsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdwcm9ncmVzc2JhcicsXG4gICAgICAgICdhcmlhLXZhbHVlbWluJzogcHJvcHMubWluLFxuICAgICAgICAnYXJpYS12YWx1ZW1heCc6IHByb3BzLm1heCxcbiAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlID8gdm9pZCAwIDogbm9ybWFsaXplZC52YWx1ZVxuICAgICAgfSwgaE1lcmdlU2xvdFNhZmVseShzbG90cy5pbnRlcm5hbCwgY2hpbGQpKSAvLyBcImludGVybmFsXCIgaXMgdXNlZCBieSBRS25vYlxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgc3RvcCwgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuZnVuY3Rpb24gZmlsdGVyRmlsZXMgKGZpbGVzLCByZWplY3RlZEZpbGVzLCBmYWlsZWRQcm9wVmFsaWRhdGlvbiwgZmlsdGVyRm4pIHtcbiAgY29uc3QgYWNjZXB0ZWRGaWxlcyA9IFtdXG5cbiAgZmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICBpZiAoZmlsdGVyRm4oZmlsZSkgPT09IHRydWUpIHtcbiAgICAgIGFjY2VwdGVkRmlsZXMucHVzaChmaWxlKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJlamVjdGVkRmlsZXMucHVzaCh7IGZhaWxlZFByb3BWYWxpZGF0aW9uLCBmaWxlIH0pXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBhY2NlcHRlZEZpbGVzXG59XG5cbmZ1bmN0aW9uIHN0b3BBbmRQcmV2ZW50RHJhZyAoZSkge1xuICBlICYmIGUuZGF0YVRyYW5zZmVyICYmIChlLmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknKVxuICBzdG9wQW5kUHJldmVudChlKVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmlsZVByb3BzID0ge1xuICBtdWx0aXBsZTogQm9vbGVhbixcbiAgYWNjZXB0OiBTdHJpbmcsXG4gIGNhcHR1cmU6IFN0cmluZyxcbiAgbWF4RmlsZVNpemU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgbWF4VG90YWxTaXplOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIG1heEZpbGVzOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gIGZpbHRlcjogRnVuY3Rpb25cbn1cblxuZXhwb3J0IGNvbnN0IHVzZUZpbGVFbWl0cyA9IFsgJ3JlamVjdGVkJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh7XG4gIGVkaXRhYmxlLFxuICBkbmQsXG4gIGdldEZpbGVJbnB1dCxcbiAgYWRkRmlsZXNUb1F1ZXVlXG59KSB7XG4gIGNvbnN0IHsgcHJvcHMsIGVtaXQsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGRuZFJlZiA9IHJlZihudWxsKVxuXG4gIGNvbnN0IGV4dGVuc2lvbnMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuYWNjZXB0ICE9PSB2b2lkIDBcbiAgICAgID8gcHJvcHMuYWNjZXB0LnNwbGl0KCcsJykubWFwKGV4dCA9PiB7XG4gICAgICAgIGV4dCA9IGV4dC50cmltKClcbiAgICAgICAgaWYgKGV4dCA9PT0gJyonKSB7IC8vIHN1cHBvcnQgXCIqXCJcbiAgICAgICAgICByZXR1cm4gJyovJ1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV4dC5lbmRzV2l0aCgnLyonKSkgeyAvLyBzdXBwb3J0IFwiaW1hZ2UvKlwiIG9yIFwiKi8qXCJcbiAgICAgICAgICBleHQgPSBleHQuc2xpY2UoMCwgZXh0Lmxlbmd0aCAtIDEpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4dC50b1VwcGVyQ2FzZSgpXG4gICAgICB9KVxuICAgICAgOiBudWxsXG4gICkpXG5cbiAgY29uc3QgbWF4RmlsZXNOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhGaWxlcywgMTApKVxuICBjb25zdCBtYXhUb3RhbFNpemVOdW1iZXIgPSBjb21wdXRlZCgoKSA9PiBwYXJzZUludChwcm9wcy5tYXhUb3RhbFNpemUsIDEwKSlcblxuICBmdW5jdGlvbiBwaWNrRmlsZXMgKGUpIHtcbiAgICBpZiAoZWRpdGFibGUudmFsdWUpIHtcbiAgICAgIGlmIChlICE9PSBPYmplY3QoZSkpIHtcbiAgICAgICAgZSA9IHsgdGFyZ2V0OiBudWxsIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGUudGFyZ2V0ICE9PSBudWxsICYmIGUudGFyZ2V0Lm1hdGNoZXMoJ2lucHV0W3R5cGU9XCJmaWxlXCJdJykgPT09IHRydWUpIHtcbiAgICAgICAgLy8gc3RvcCBwcm9wYWdhdGlvbiBpZiBpdCdzIG5vdCBhIHJlYWwgcG9pbnRlciBldmVudFxuICAgICAgICBlLmNsaWVudFggPT09IDAgJiYgZS5jbGllbnRZID09PSAwICYmIHN0b3AoZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGdldEZpbGVJbnB1dCgpXG4gICAgICAgIGlucHV0ICYmIGlucHV0ICE9PSBlLnRhcmdldCAmJiBpbnB1dC5jbGljayhlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEZpbGVzIChmaWxlcykge1xuICAgIGlmIChlZGl0YWJsZS52YWx1ZSAmJiBmaWxlcykge1xuICAgICAgYWRkRmlsZXNUb1F1ZXVlKG51bGwsIGZpbGVzKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NGaWxlcyAoZSwgZmlsZXNUb1Byb2Nlc3MsIGN1cnJlbnRGaWxlTGlzdCwgYXBwZW5kKSB7XG4gICAgbGV0IGZpbGVzID0gQXJyYXkuZnJvbShmaWxlc1RvUHJvY2VzcyB8fCBlLnRhcmdldC5maWxlcylcbiAgICBjb25zdCByZWplY3RlZEZpbGVzID0gW11cblxuICAgIGNvbnN0IGRvbmUgPSAoKSA9PiB7XG4gICAgICBpZiAocmVqZWN0ZWRGaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGVtaXQoJ3JlamVjdGVkJywgcmVqZWN0ZWRGaWxlcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaWx0ZXIgZmlsZSB0eXBlc1xuICAgIGlmIChwcm9wcy5hY2NlcHQgIT09IHZvaWQgMCAmJiBleHRlbnNpb25zLnZhbHVlLmluZGV4T2YoJyovJykgPT09IC0xKSB7XG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnYWNjZXB0JywgZmlsZSA9PiB7XG4gICAgICAgIHJldHVybiBleHRlbnNpb25zLnZhbHVlLnNvbWUoZXh0ID0+IChcbiAgICAgICAgICBmaWxlLnR5cGUudG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKGV4dClcbiAgICAgICAgICB8fCBmaWxlLm5hbWUudG9VcHBlckNhc2UoKS5lbmRzV2l0aChleHQpXG4gICAgICAgICkpXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIC8vIGZpbHRlciBtYXggZmlsZSBzaXplXG4gICAgaWYgKHByb3BzLm1heEZpbGVTaXplICE9PSB2b2lkIDApIHtcbiAgICAgIGNvbnN0IG1heEZpbGVTaXplID0gcGFyc2VJbnQocHJvcHMubWF4RmlsZVNpemUsIDEwKVxuICAgICAgZmlsZXMgPSBmaWx0ZXJGaWxlcyhmaWxlcywgcmVqZWN0ZWRGaWxlcywgJ21heC1maWxlLXNpemUnLCBmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbGUuc2l6ZSA8PSBtYXhGaWxlU2l6ZVxuICAgICAgfSlcblxuICAgICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cbiAgICB9XG5cbiAgICAvLyBDb3Jkb3ZhL2lPUyBhbGxvd3Mgc2VsZWN0aW5nIG11bHRpcGxlIGZpbGVzIGV2ZW4gd2hlbiB0aGVcbiAgICAvLyBtdWx0aXBsZSBhdHRyaWJ1dGUgaXMgbm90IHNwZWNpZmllZC4gV2UgYWxzbyBub3JtYWxpemUgZHJhZyduJ2Ryb3BwZWRcbiAgICAvLyBmaWxlcyBoZXJlOlxuICAgIGlmIChwcm9wcy5tdWx0aXBsZSAhPT0gdHJ1ZSAmJiBmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBmaWxlcyA9IFsgZmlsZXNbIDAgXSBdXG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZSBrZXkgdG8gdXNlIGZvciBlYWNoIGZpbGVcbiAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgZmlsZS5fX2tleSA9IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoICsgZmlsZS5sYXN0TW9kaWZpZWQgKyBmaWxlLm5hbWUgKyBmaWxlLnNpemVcbiAgICB9KVxuXG4gICAgLy8gQXZvaWQgZHVwbGljYXRlIGZpbGVzXG4gICAgY29uc3QgZmlsZW5hbWVNYXAgPSBjdXJyZW50RmlsZUxpc3QubWFwKGVudHJ5ID0+IGVudHJ5Ll9fa2V5KVxuICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdkdXBsaWNhdGUnLCBmaWxlID0+IHtcbiAgICAgIHJldHVybiBmaWxlbmFtZU1hcC5pbmNsdWRlcyhmaWxlLl9fa2V5KSA9PT0gZmFsc2VcbiAgICB9KVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gZG9uZSgpIH1cblxuICAgIGlmIChwcm9wcy5tYXhUb3RhbFNpemUgIT09IHZvaWQgMCkge1xuICAgICAgbGV0IHNpemUgPSBhcHBlbmQgPT09IHRydWVcbiAgICAgICAgPyBjdXJyZW50RmlsZUxpc3QucmVkdWNlKCh0b3RhbCwgZmlsZSkgPT4gdG90YWwgKyBmaWxlLnNpemUsIDApXG4gICAgICAgIDogMFxuXG4gICAgICBmaWxlcyA9IGZpbHRlckZpbGVzKGZpbGVzLCByZWplY3RlZEZpbGVzLCAnbWF4LXRvdGFsLXNpemUnLCBmaWxlID0+IHtcbiAgICAgICAgc2l6ZSArPSBmaWxlLnNpemVcbiAgICAgICAgcmV0dXJuIHNpemUgPD0gbWF4VG90YWxTaXplTnVtYmVyLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIC8vIGRvIHdlIGhhdmUgY3VzdG9tIGZpbHRlciBmdW5jdGlvbj9cbiAgICBpZiAodHlwZW9mIHByb3BzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgZmlsdGVyZWRGaWxlcyA9IHByb3BzLmZpbHRlcihmaWxlcylcbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdmaWx0ZXInLCBmaWxlID0+IHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkRmlsZXMuaW5jbHVkZXMoZmlsZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1heEZpbGVzICE9PSB2b2lkIDApIHtcbiAgICAgIGxldCBmaWxlc051bWJlciA9IGFwcGVuZCA9PT0gdHJ1ZVxuICAgICAgICA/IGN1cnJlbnRGaWxlTGlzdC5sZW5ndGhcbiAgICAgICAgOiAwXG5cbiAgICAgIGZpbGVzID0gZmlsdGVyRmlsZXMoZmlsZXMsIHJlamVjdGVkRmlsZXMsICdtYXgtZmlsZXMnLCAoKSA9PiB7XG4gICAgICAgIGZpbGVzTnVtYmVyKytcbiAgICAgICAgcmV0dXJuIGZpbGVzTnVtYmVyIDw9IG1heEZpbGVzTnVtYmVyLnZhbHVlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZmlsZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBkb25lKCkgfVxuICAgIH1cblxuICAgIGRvbmUoKVxuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmaWxlc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uRHJhZ292ZXIgKGUpIHtcbiAgICBzdG9wQW5kUHJldmVudERyYWcoZSlcbiAgICBkbmQudmFsdWUgIT09IHRydWUgJiYgKGRuZC52YWx1ZSA9IHRydWUpXG4gIH1cblxuICBmdW5jdGlvbiBvbkRyYWdsZWF2ZSAoZSkge1xuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgZS5yZWxhdGVkVGFyZ2V0ICE9PSBkbmRSZWYudmFsdWUgJiYgKGRuZC52YWx1ZSA9IGZhbHNlKVxuICB9XG5cbiAgZnVuY3Rpb24gb25Ecm9wIChlKSB7XG4gICAgc3RvcEFuZFByZXZlbnREcmFnKGUpXG4gICAgY29uc3QgZmlsZXMgPSBlLmRhdGFUcmFuc2Zlci5maWxlc1xuXG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGFkZEZpbGVzVG9RdWV1ZShudWxsLCBmaWxlcylcbiAgICB9XG5cbiAgICBkbmQudmFsdWUgPSBmYWxzZVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RG5kTm9kZSAodHlwZSkge1xuICAgIGlmIChkbmQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogZG5kUmVmLFxuICAgICAgICBjbGFzczogYHEtJHsgdHlwZSB9X19kbmQgYWJzb2x1dGUtZnVsbGAsXG4gICAgICAgIG9uRHJhZ2VudGVyOiBzdG9wQW5kUHJldmVudERyYWcsXG4gICAgICAgIG9uRHJhZ292ZXI6IHN0b3BBbmRQcmV2ZW50RHJhZyxcbiAgICAgICAgb25EcmFnbGVhdmUsXG4gICAgICAgIG9uRHJvcFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyBwaWNrRmlsZXMsIGFkZEZpbGVzIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBwaWNrRmlsZXMsXG4gICAgYWRkRmlsZXMsXG4gICAgb25EcmFnb3ZlcixcbiAgICBwcm9jZXNzRmlsZXMsXG4gICAgZ2V0RG5kTm9kZSxcbiAgICBtYXhGaWxlc051bWJlcixcbiAgICBtYXhUb3RhbFNpemVOdW1iZXJcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBpc1JlZiwgY29tcHV0ZWQsIHdhdGNoLCBwcm92aWRlLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFCdG4gZnJvbSAnLi4vYnRuL1FCdG4uanMnXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcbmltcG9ydCBRU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyL1FTcGlubmVyLmpzJ1xuaW1wb3J0IFFDaXJjdWxhclByb2dyZXNzIGZyb20gJy4uL2NpcmN1bGFyLXByb2dyZXNzL1FDaXJjdWxhclByb2dyZXNzLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZUZpbGUsIHsgdXNlRmlsZVByb3BzLCB1c2VGaWxlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLmpzJ1xuXG5pbXBvcnQgeyBzdG9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgeyBodW1hblN0b3JhZ2VTaXplIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgdXBsb2FkZXJLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmZ1bmN0aW9uIGdldFByb2dyZXNzTGFiZWwgKHApIHtcbiAgcmV0dXJuIChwICogMTAwKS50b0ZpeGVkKDIpICsgJyUnXG59XG5cbmV4cG9ydCBjb25zdCBjb3JlUHJvcHMgPSB7XG4gIC4uLnVzZURhcmtQcm9wcyxcbiAgLi4udXNlRmlsZVByb3BzLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG5cbiAgY29sb3I6IFN0cmluZyxcbiAgdGV4dENvbG9yOiBTdHJpbmcsXG5cbiAgc3F1YXJlOiBCb29sZWFuLFxuICBmbGF0OiBCb29sZWFuLFxuICBib3JkZXJlZDogQm9vbGVhbixcblxuICBub1RodW1ibmFpbHM6IEJvb2xlYW4sXG4gIGF1dG9VcGxvYWQ6IEJvb2xlYW4sXG4gIGhpZGVVcGxvYWRCdG46IEJvb2xlYW4sXG5cbiAgZGlzYWJsZTogQm9vbGVhbixcbiAgcmVhZG9ubHk6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGNvbnN0IGNvcmVFbWl0cyA9IFtcbiAgLi4udXNlRmlsZUVtaXRzLFxuICAnc3RhcnQnLCAnZmluaXNoJywgJ2FkZGVkJywgJ3JlbW92ZWQnXG5dXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZW5kZXJlciAoZ2V0UGx1Z2luKSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgc2xvdHMsIGVtaXQsIHByb3h5IH0gPSB2bVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUZpbGVTdGF0dXMgKGZpbGUsIHN0YXR1cywgdXBsb2FkZWRTaXplKSB7XG4gICAgZmlsZS5fX3N0YXR1cyA9IHN0YXR1c1xuXG4gICAgaWYgKHN0YXR1cyA9PT0gJ2lkbGUnKSB7XG4gICAgICBmaWxlLl9fdXBsb2FkZWQgPSAwXG4gICAgICBmaWxlLl9fcHJvZ3Jlc3MgPSAwXG4gICAgICBmaWxlLl9fc2l6ZUxhYmVsID0gaHVtYW5TdG9yYWdlU2l6ZShmaWxlLnNpemUpXG4gICAgICBmaWxlLl9fcHJvZ3Jlc3NMYWJlbCA9ICcwLjAwJSdcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoc3RhdHVzID09PSAnZmFpbGVkJykge1xuICAgICAgcHJveHkuJGZvcmNlVXBkYXRlKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZpbGUuX191cGxvYWRlZCA9IHN0YXR1cyA9PT0gJ3VwbG9hZGVkJ1xuICAgICAgPyBmaWxlLnNpemVcbiAgICAgIDogdXBsb2FkZWRTaXplXG5cbiAgICBmaWxlLl9fcHJvZ3Jlc3MgPSBzdGF0dXMgPT09ICd1cGxvYWRlZCdcbiAgICAgID8gMVxuICAgICAgOiBNYXRoLm1pbigwLjk5OTksIGZpbGUuX191cGxvYWRlZCAvIGZpbGUuc2l6ZSlcblxuICAgIGZpbGUuX19wcm9ncmVzc0xhYmVsID0gZ2V0UHJvZ3Jlc3NMYWJlbChmaWxlLl9fcHJvZ3Jlc3MpXG4gICAgcHJveHkuJGZvcmNlVXBkYXRlKClcbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGZpbGVzOiByZWYoW10pLFxuICAgIHF1ZXVlZEZpbGVzOiByZWYoW10pLFxuICAgIHVwbG9hZGVkRmlsZXM6IHJlZihbXSksXG4gICAgdXBsb2FkZWRTaXplOiByZWYoMCksXG5cbiAgICB1cGRhdGVGaWxlU3RhdHVzLFxuICAgIGlzQWxpdmUgKCkge1xuICAgICAgcmV0dXJuIHZtLmlzRGVhY3RpdmF0ZWQgIT09IHRydWUgJiYgdm0uaXNVbm1vdW50ZWQgIT09IHRydWVcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKHN0YXRlLCBnZXRQbHVnaW4oeyBwcm9wcywgc2xvdHMsIGVtaXQsIGhlbHBlcnM6IHN0YXRlIH0pKVxuXG4gIGNvbnN0IHVwbG9hZFNpemUgPSByZWYoMClcbiAgY29uc3QgZWRpdGFibGUgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLnJlYWRvbmx5ICE9PSB0cnVlKVxuXG4gIGlmIChzdGF0ZS5pc0J1c3kgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmlzQnVzeSA9IHJlZihmYWxzZSlcbiAgfVxuXG4gIGNvbnN0IGRuZCA9IHJlZihmYWxzZSlcblxuICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IGlucHV0UmVmID0gcmVmKG51bGwpXG5cbiAgcHJvdmlkZSh1cGxvYWRlcktleSwgcmVuZGVySW5wdXQpXG5cbiAgY29uc3Qge1xuICAgIHBpY2tGaWxlcyxcbiAgICBhZGRGaWxlcyxcbiAgICBvbkRyYWdvdmVyLFxuICAgIG9uRHJhZ2xlYXZlLFxuICAgIHByb2Nlc3NGaWxlcyxcbiAgICBnZXREbmROb2RlLFxuICAgIG1heEZpbGVzTnVtYmVyLFxuICAgIG1heFRvdGFsU2l6ZU51bWJlclxuICB9ID0gdXNlRmlsZSh7IGVkaXRhYmxlLCBkbmQsIGdldEZpbGVJbnB1dCwgYWRkRmlsZXNUb1F1ZXVlIH0pXG5cbiAgY29uc3QgY2FuQWRkRmlsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGVkaXRhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgJiYgc3RhdGUuaXNVcGxvYWRpbmcudmFsdWUgIT09IHRydWVcbiAgICAvLyBpZiBzaW5nbGUgc2VsZWN0aW9uIGFuZCBubyBmaWxlcyBhcmUgcXVldWVkOlxuICAgICYmIChwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSB8fCBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5sZW5ndGggPT09IDApXG4gICAgLy8gaWYgbWF4LWZpbGVzIGlzIHNldCBhbmQgY3VycmVudCBudW1iZXIgb2YgZmlsZXMgZG9lcyBub3QgZXhjZWVkcyBpdDpcbiAgICAmJiAocHJvcHMubWF4RmlsZXMgPT09IHZvaWQgMCB8fCBzdGF0ZS5maWxlcy52YWx1ZS5sZW5ndGggPCBtYXhGaWxlc051bWJlci52YWx1ZSlcbiAgICAvLyBpZiBtYXgtdG90YWwtc2l6ZSBpcyBzZXQgYW5kIGN1cnJlbnQgdXBsb2FkIHNpemUgZG9lcyBub3QgZXhjZWVkcyBpdDpcbiAgICAmJiAocHJvcHMubWF4VG90YWxTaXplID09PSB2b2lkIDAgfHwgdXBsb2FkU2l6ZS52YWx1ZSA8IG1heFRvdGFsU2l6ZU51bWJlci52YWx1ZSlcbiAgKVxuXG4gIGNvbnN0IGNhblVwbG9hZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgZWRpdGFibGUudmFsdWUgPT09IHRydWVcbiAgICAmJiBzdGF0ZS5pc0J1c3kudmFsdWUgIT09IHRydWVcbiAgICAmJiBzdGF0ZS5pc1VwbG9hZGluZy52YWx1ZSAhPT0gdHJ1ZVxuICAgICYmIHN0YXRlLnF1ZXVlZEZpbGVzLnZhbHVlLmxlbmd0aCA+IDBcbiAgKVxuXG4gIGNvbnN0IHVwbG9hZFByb2dyZXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHVwbG9hZFNpemUudmFsdWUgPT09IDBcbiAgICAgID8gMFxuICAgICAgOiBzdGF0ZS51cGxvYWRlZFNpemUudmFsdWUgLyB1cGxvYWRTaXplLnZhbHVlXG4gICkpXG5cbiAgY29uc3QgdXBsb2FkUHJvZ3Jlc3NMYWJlbCA9IGNvbXB1dGVkKCgpID0+IGdldFByb2dyZXNzTGFiZWwodXBsb2FkUHJvZ3Jlc3MudmFsdWUpKVxuICBjb25zdCB1cGxvYWRTaXplTGFiZWwgPSBjb21wdXRlZCgoKSA9PiBodW1hblN0b3JhZ2VTaXplKHVwbG9hZFNpemUudmFsdWUpKVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXVwbG9hZGVyIGNvbHVtbiBuby13cmFwJ1xuICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS11cGxvYWRlci0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgKyAocHJvcHMuYm9yZGVyZWQgPT09IHRydWUgPyAnIHEtdXBsb2FkZXItLWJvcmRlcmVkJyA6ICcnKVxuICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS11cGxvYWRlci0tc3F1YXJlIG5vLWJvcmRlci1yYWRpdXMnIDogJycpXG4gICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS11cGxvYWRlci0tZmxhdCBuby1zaGFkb3cnIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQgcS11cGxvYWRlci0tZGlzYWJsZScgOiAnJylcbiAgICArIChkbmQudmFsdWUgPT09IHRydWUgPyAnIHEtdXBsb2FkZXItLWRuZCcgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGNvbG9yQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLXVwbG9hZGVyX19oZWFkZXInXG4gICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICArIChwcm9wcy50ZXh0Q29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfWAgOiAnJylcbiAgKVxuXG4gIHdhdGNoKHN0YXRlLmlzVXBsb2FkaW5nLCAobmV3VmFsLCBvbGRWYWwpID0+IHtcbiAgICBpZiAob2xkVmFsID09PSBmYWxzZSAmJiBuZXdWYWwgPT09IHRydWUpIHtcbiAgICAgIGVtaXQoJ3N0YXJ0JylcbiAgICB9XG4gICAgZWxzZSBpZiAob2xkVmFsID09PSB0cnVlICYmIG5ld1ZhbCA9PT0gZmFsc2UpIHtcbiAgICAgIGVtaXQoJ2ZpbmlzaCcpXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgIHN0YXRlLmFib3J0KClcbiAgICAgIHN0YXRlLnVwbG9hZGVkU2l6ZS52YWx1ZSA9IDBcbiAgICAgIHVwbG9hZFNpemUudmFsdWUgPSAwXG4gICAgICByZXZva2VJbWdVUkxzKClcbiAgICAgIHN0YXRlLmZpbGVzLnZhbHVlID0gW11cbiAgICAgIHN0YXRlLnF1ZXVlZEZpbGVzLnZhbHVlID0gW11cbiAgICAgIHN0YXRlLnVwbG9hZGVkRmlsZXMudmFsdWUgPSBbXVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVVwbG9hZGVkRmlsZXMgKCkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSBmYWxzZSkge1xuICAgICAgYmF0Y2hSZW1vdmVGaWxlcyhbICd1cGxvYWRlZCcgXSwgKCkgPT4ge1xuICAgICAgICBzdGF0ZS51cGxvYWRlZEZpbGVzLnZhbHVlID0gW11cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUXVldWVkRmlsZXMgKCkge1xuICAgIGJhdGNoUmVtb3ZlRmlsZXMoWyAnaWRsZScsICdmYWlsZWQnIF0sICh7IHNpemUgfSkgPT4ge1xuICAgICAgdXBsb2FkU2l6ZS52YWx1ZSAtPSBzaXplXG4gICAgICBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZSA9IFtdXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhdGNoUmVtb3ZlRmlsZXMgKHN0YXR1c0xpc3QsIGNiKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZWQgPSB7XG4gICAgICBmaWxlczogW10sXG4gICAgICBzaXplOiAwXG4gICAgfVxuXG4gICAgY29uc3QgbG9jYWxGaWxlcyA9IHN0YXRlLmZpbGVzLnZhbHVlLmZpbHRlcihmID0+IHtcbiAgICAgIGlmIChzdGF0dXNMaXN0LmluZGV4T2YoZi5fX3N0YXR1cykgPT09IC0xKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIHJlbW92ZWQuc2l6ZSArPSBmLnNpemVcbiAgICAgIHJlbW92ZWQuZmlsZXMucHVzaChmKVxuXG4gICAgICBmLl9faW1nICE9PSB2b2lkIDAgJiYgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoZi5fX2ltZy5zcmMpXG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG5cbiAgICBpZiAocmVtb3ZlZC5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICBzdGF0ZS5maWxlcy52YWx1ZSA9IGxvY2FsRmlsZXNcbiAgICAgIGNiKHJlbW92ZWQpXG4gICAgICBlbWl0KCdyZW1vdmVkJywgcmVtb3ZlZC5maWxlcylcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVGaWxlIChmaWxlKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUpIHsgcmV0dXJuIH1cblxuICAgIGlmIChmaWxlLl9fc3RhdHVzID09PSAndXBsb2FkZWQnKSB7XG4gICAgICBzdGF0ZS51cGxvYWRlZEZpbGVzLnZhbHVlID0gc3RhdGUudXBsb2FkZWRGaWxlcy52YWx1ZS5maWx0ZXIoZiA9PiBmLl9fa2V5ICE9PSBmaWxlLl9fa2V5KVxuICAgIH1cbiAgICBlbHNlIGlmIChmaWxlLl9fc3RhdHVzID09PSAndXBsb2FkaW5nJykge1xuICAgICAgZmlsZS5fX2Fib3J0KClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB1cGxvYWRTaXplLnZhbHVlIC09IGZpbGUuc2l6ZVxuICAgIH1cblxuICAgIHN0YXRlLmZpbGVzLnZhbHVlID0gc3RhdGUuZmlsZXMudmFsdWUuZmlsdGVyKGYgPT4ge1xuICAgICAgaWYgKGYuX19rZXkgIT09IGZpbGUuX19rZXkpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cblxuICAgICAgZi5fX2ltZyAhPT0gdm9pZCAwICYmIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGYuX19pbWcuc3JjKVxuXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9KVxuXG4gICAgc3RhdGUucXVldWVkRmlsZXMudmFsdWUgPSBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5maWx0ZXIoZiA9PiBmLl9fa2V5ICE9PSBmaWxlLl9fa2V5KVxuICAgIGVtaXQoJ3JlbW92ZWQnLCBbIGZpbGUgXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldm9rZUltZ1VSTHMgKCkge1xuICAgIHN0YXRlLmZpbGVzLnZhbHVlLmZvckVhY2goZiA9PiB7XG4gICAgICBmLl9faW1nICE9PSB2b2lkIDAgJiYgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwoZi5fX2ltZy5zcmMpXG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZpbGVJbnB1dCAoKSB7XG4gICAgcmV0dXJuIGlucHV0UmVmLnZhbHVlXG4gICAgICB8fCByb290UmVmLnZhbHVlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3EtdXBsb2FkZXJfX2lucHV0JylbIDAgXVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkRmlsZXNUb1F1ZXVlIChlLCBmaWxlTGlzdCkge1xuICAgIGNvbnN0IGxvY2FsRmlsZXMgPSBwcm9jZXNzRmlsZXMoZSwgZmlsZUxpc3QsIHN0YXRlLmZpbGVzLnZhbHVlLCB0cnVlKVxuICAgIGNvbnN0IGZpbGVJbnB1dCA9IGdldEZpbGVJbnB1dCgpXG5cbiAgICBpZiAoZmlsZUlucHV0ICE9PSB2b2lkIDAgJiYgZmlsZUlucHV0ICE9PSBudWxsKSB7XG4gICAgICBmaWxlSW5wdXQudmFsdWUgPSAnJ1xuICAgIH1cblxuICAgIGlmIChsb2NhbEZpbGVzID09PSB2b2lkIDApIHsgcmV0dXJuIH1cblxuICAgIGxvY2FsRmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgIHN0YXRlLnVwZGF0ZUZpbGVTdGF0dXMoZmlsZSwgJ2lkbGUnKVxuICAgICAgdXBsb2FkU2l6ZS52YWx1ZSArPSBmaWxlLnNpemVcblxuICAgICAgaWYgKHByb3BzLm5vVGh1bWJuYWlscyAhPT0gdHJ1ZSAmJiBmaWxlLnR5cGUudG9VcHBlckNhc2UoKS5zdGFydHNXaXRoKCdJTUFHRScpKSB7XG4gICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgIGltZy5zcmMgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKVxuICAgICAgICBmaWxlLl9faW1nID0gaW1nXG4gICAgICB9XG4gICAgfSlcblxuICAgIHN0YXRlLmZpbGVzLnZhbHVlID0gc3RhdGUuZmlsZXMudmFsdWUuY29uY2F0KGxvY2FsRmlsZXMpXG4gICAgc3RhdGUucXVldWVkRmlsZXMudmFsdWUgPSBzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5jb25jYXQobG9jYWxGaWxlcylcbiAgICBlbWl0KCdhZGRlZCcsIGxvY2FsRmlsZXMpXG4gICAgcHJvcHMuYXV0b1VwbG9hZCA9PT0gdHJ1ZSAmJiBzdGF0ZS51cGxvYWQoKVxuICB9XG5cbiAgZnVuY3Rpb24gdXBsb2FkICgpIHtcbiAgICBjYW5VcGxvYWQudmFsdWUgPT09IHRydWUgJiYgc3RhdGUudXBsb2FkKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJ0biAoc2hvdywgaWNvbiwgZm4pIHtcbiAgICBpZiAoc2hvdyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgdHlwZTogJ2EnLFxuICAgICAgICBrZXk6IGljb24sXG4gICAgICAgIGljb246ICRxLmljb25TZXQudXBsb2FkZXJbIGljb24gXSxcbiAgICAgICAgZmxhdDogdHJ1ZSxcbiAgICAgICAgZGVuc2U6IHRydWVcbiAgICAgIH1cblxuICAgICAgbGV0IGNoaWxkID0gdm9pZCAwXG5cbiAgICAgIGlmIChpY29uID09PSAnYWRkJykge1xuICAgICAgICBkYXRhLm9uQ2xpY2sgPSBwaWNrRmlsZXNcbiAgICAgICAgY2hpbGQgPSByZW5kZXJJbnB1dFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRhdGEub25DbGljayA9IGZuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoKFFCdG4sIGRhdGEsIGNoaWxkKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlcklucHV0ICgpIHtcbiAgICByZXR1cm4gaCgnaW5wdXQnLCB7XG4gICAgICByZWY6IGlucHV0UmVmLFxuICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19pbnB1dCBvdmVyZmxvdy1oaWRkZW4gYWJzb2x1dGUtZnVsbCcsXG4gICAgICB0YWJpbmRleDogLTEsXG4gICAgICB0eXBlOiAnZmlsZScsXG4gICAgICB0aXRsZTogJycsIC8vIHRyeSB0byByZW1vdmUgZGVmYXVsdCB0b29sdGlwXG4gICAgICBhY2NlcHQ6IHByb3BzLmFjY2VwdCxcbiAgICAgIG11bHRpcGxlOiBwcm9wcy5tdWx0aXBsZSA9PT0gdHJ1ZSA/ICdtdWx0aXBsZScgOiB2b2lkIDAsXG4gICAgICBjYXB0dXJlOiBwcm9wcy5jYXB0dXJlLFxuICAgICAgb25Nb3VzZWRvd246IHN0b3AsIC8vIG5lZWQgdG8gc3RvcCByZWZvY3VzIGZyb20gUUJ0blxuICAgICAgb25DbGljazogcGlja0ZpbGVzLFxuICAgICAgb25DaGFuZ2U6IGFkZEZpbGVzVG9RdWV1ZVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRIZWFkZXIgKCkge1xuICAgIGlmIChzbG90cy5oZWFkZXIgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHNsb3RzLmhlYWRlcihzbG90U2NvcGUudmFsdWUpXG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19oZWFkZXItY29udGVudCBjb2x1bW4nXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ2ZsZXggZmxleC1jZW50ZXIgbm8td3JhcCBxLWd1dHRlci14cydcbiAgICAgICAgfSwgW1xuICAgICAgICAgIGdldEJ0bihzdGF0ZS5xdWV1ZWRGaWxlcy52YWx1ZS5sZW5ndGggPiAwLCAncmVtb3ZlUXVldWUnLCByZW1vdmVRdWV1ZWRGaWxlcyksXG4gICAgICAgICAgZ2V0QnRuKHN0YXRlLnVwbG9hZGVkRmlsZXMudmFsdWUubGVuZ3RoID4gMCwgJ3JlbW92ZVVwbG9hZGVkJywgcmVtb3ZlVXBsb2FkZWRGaWxlcyksXG5cbiAgICAgICAgICBzdGF0ZS5pc1VwbG9hZGluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyBoKFFTcGlubmVyLCB7IGNsYXNzOiAncS11cGxvYWRlcl9fc3Bpbm5lcicgfSlcbiAgICAgICAgICAgIDogbnVsbCxcblxuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdjb2wgY29sdW1uIGp1c3RpZnktY2VudGVyJyB9LCBbXG4gICAgICAgICAgICBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gICAgICAgICAgICAgID8gaCgnZGl2JywgeyBjbGFzczogJ3EtdXBsb2FkZXJfX3RpdGxlJyB9LCBbIHByb3BzLmxhYmVsIF0pXG4gICAgICAgICAgICAgIDogbnVsbCxcblxuICAgICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdXBsb2FkZXJfX3N1YnRpdGxlJyB9LCBbXG4gICAgICAgICAgICAgIHVwbG9hZFNpemVMYWJlbC52YWx1ZSArICcgLyAnICsgdXBsb2FkUHJvZ3Jlc3NMYWJlbC52YWx1ZVxuICAgICAgICAgICAgXSlcbiAgICAgICAgICBdKSxcblxuICAgICAgICAgIGdldEJ0bihjYW5BZGRGaWxlcy52YWx1ZSwgJ2FkZCcpLFxuICAgICAgICAgIGdldEJ0bihwcm9wcy5oaWRlVXBsb2FkQnRuID09PSBmYWxzZSAmJiBjYW5VcGxvYWQudmFsdWUgPT09IHRydWUsICd1cGxvYWQnLCBzdGF0ZS51cGxvYWQpLFxuICAgICAgICAgIGdldEJ0bihzdGF0ZS5pc1VwbG9hZGluZy52YWx1ZSwgJ2NsZWFyJywgc3RhdGUuYWJvcnQpXG4gICAgICAgIF0pXG4gICAgICBdKVxuICAgIF1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExpc3QgKCkge1xuICAgIGlmIChzbG90cy5saXN0ICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBzbG90cy5saXN0KHNsb3RTY29wZS52YWx1ZSlcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhdGUuZmlsZXMudmFsdWUubWFwKGZpbGUgPT4gaCgnZGl2Jywge1xuICAgICAga2V5OiBmaWxlLl9fa2V5LFxuICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19maWxlIHJlbGF0aXZlLXBvc2l0aW9uJ1xuICAgICAgICArIChwcm9wcy5ub1RodW1ibmFpbHMgIT09IHRydWUgJiYgZmlsZS5fX2ltZyAhPT0gdm9pZCAwID8gJyBxLXVwbG9hZGVyX19maWxlLS1pbWcnIDogJycpXG4gICAgICAgICsgKFxuICAgICAgICAgIGZpbGUuX19zdGF0dXMgPT09ICdmYWlsZWQnXG4gICAgICAgICAgICA/ICcgcS11cGxvYWRlcl9fZmlsZS0tZmFpbGVkJ1xuICAgICAgICAgICAgOiAoZmlsZS5fX3N0YXR1cyA9PT0gJ3VwbG9hZGVkJyA/ICcgcS11cGxvYWRlcl9fZmlsZS0tdXBsb2FkZWQnIDogJycpXG4gICAgICAgICksXG4gICAgICBzdHlsZTogcHJvcHMubm9UaHVtYm5haWxzICE9PSB0cnVlICYmIGZpbGUuX19pbWcgIT09IHZvaWQgMFxuICAgICAgICA/IHsgYmFja2dyb3VuZEltYWdlOiAndXJsKFwiJyArIGZpbGUuX19pbWcuc3JjICsgJ1wiKScgfVxuICAgICAgICA6IG51bGxcbiAgICB9LCBbXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS11cGxvYWRlcl9fZmlsZS1oZWFkZXIgcm93IGZsZXgtY2VudGVyIG5vLXdyYXAnXG4gICAgICB9LCBbXG4gICAgICAgIGZpbGUuX19zdGF0dXMgPT09ICdmYWlsZWQnXG4gICAgICAgICAgPyBoKFFJY29uLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtdXBsb2FkZXJfX2ZpbGUtc3RhdHVzJyxcbiAgICAgICAgICAgIG5hbWU6ICRxLmljb25TZXQudHlwZS5uZWdhdGl2ZSxcbiAgICAgICAgICAgIGNvbG9yOiAnbmVnYXRpdmUnXG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IG51bGwsXG5cbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdXBsb2FkZXJfX2ZpbGUtaGVhZGVyLWNvbnRlbnQgY29sJyB9LCBbXG4gICAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdXBsb2FkZXJfX3RpdGxlJyB9LCBbIGZpbGUubmFtZSBdKSxcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtdXBsb2FkZXJfX3N1YnRpdGxlIHJvdyBpdGVtcy1jZW50ZXIgbm8td3JhcCdcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBmaWxlLl9fc2l6ZUxhYmVsICsgJyAvICcgKyBmaWxlLl9fcHJvZ3Jlc3NMYWJlbFxuICAgICAgICAgIF0pXG4gICAgICAgIF0pLFxuXG4gICAgICAgIGZpbGUuX19zdGF0dXMgPT09ICd1cGxvYWRpbmcnXG4gICAgICAgICAgPyBoKFFDaXJjdWxhclByb2dyZXNzLCB7XG4gICAgICAgICAgICB2YWx1ZTogZmlsZS5fX3Byb2dyZXNzLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgaW5kZXRlcm1pbmF0ZTogZmlsZS5fX3Byb2dyZXNzID09PSAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICA6IGgoUUJ0biwge1xuICAgICAgICAgICAgcm91bmQ6IHRydWUsXG4gICAgICAgICAgICBkZW5zZTogdHJ1ZSxcbiAgICAgICAgICAgIGZsYXQ6IHRydWUsXG4gICAgICAgICAgICBpY29uOiAkcS5pY29uU2V0LnVwbG9hZGVyWyBmaWxlLl9fc3RhdHVzID09PSAndXBsb2FkZWQnID8gJ2RvbmUnIDogJ2NsZWFyJyBdLFxuICAgICAgICAgICAgb25DbGljazogKCkgPT4geyByZW1vdmVGaWxlKGZpbGUpIH1cbiAgICAgICAgICB9KVxuICAgICAgXSlcbiAgICBdKSlcbiAgfVxuXG4gIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgc3RhdGUuaXNVcGxvYWRpbmcudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuYWJvcnQoKVxuICAgIHN0YXRlLmZpbGVzLnZhbHVlLmxlbmd0aCA+IDAgJiYgcmV2b2tlSW1nVVJMcygpXG4gIH0pXG5cbiAgY29uc3QgcHVibGljTWV0aG9kcyA9IHtcbiAgICBwaWNrRmlsZXMsXG4gICAgYWRkRmlsZXMsXG4gICAgcmVzZXQsXG4gICAgcmVtb3ZlVXBsb2FkZWRGaWxlcyxcbiAgICByZW1vdmVRdWV1ZWRGaWxlcyxcbiAgICByZW1vdmVGaWxlLFxuICAgIHVwbG9hZCxcbiAgICBhYm9ydDogc3RhdGUuYWJvcnRcbiAgfVxuXG4gIC8vIFRPRE86IHRoZSByZXN1bHQgb2YgdGhpcyBjb21wdXRlZCwgZXNwZWNpYWxseSB0aGUgZHluYW1pYyBwYXJ0LCBpc24ndCBjdXJyZW50bHkgdHlwZWRcbiAgLy8gVGhpcyByZXN1bHQgaW4gYW4gZXJyb3Igd2l0aCBWb2xhciB3aGVuIGFjY2Vzc2luZyB0aGUgc3RhdGUgKGVnLiBmaWxlcyBhcnJheSlcbiAgY29uc3Qgc2xvdFNjb3BlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFjYyA9IHtcbiAgICAgIGNhbkFkZEZpbGVzOiBjYW5BZGRGaWxlcy52YWx1ZSxcbiAgICAgIGNhblVwbG9hZDogY2FuVXBsb2FkLnZhbHVlLFxuICAgICAgdXBsb2FkU2l6ZUxhYmVsOiB1cGxvYWRTaXplTGFiZWwudmFsdWUsXG4gICAgICB1cGxvYWRQcm9ncmVzc0xhYmVsOiB1cGxvYWRQcm9ncmVzc0xhYmVsLnZhbHVlXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gc3RhdGUpIHtcbiAgICAgIGFjY1sga2V5IF0gPSBpc1JlZihzdGF0ZVsga2V5IF0pID09PSB0cnVlXG4gICAgICAgID8gc3RhdGVbIGtleSBdLnZhbHVlXG4gICAgICAgIDogc3RhdGVbIGtleSBdXG4gICAgfVxuXG4gICAgLy8gVE9ETzogKFF2MykgUHV0IHRoZSBRVXBsb2FkZXIgaW5zdGFuY2UgdW5kZXIgYHJlZmBcbiAgICAvLyBwcm9wZXJ0eSBmb3IgY29uc2lzdGVuY3kgYW5kIGZsZXhpYmlsaXR5XG4gICAgLy8gcmV0dXJuIHsgcmVmOiB7IC4uLmFjYywgLi4ucHVibGljTWV0aG9kcyB9IH1cbiAgICByZXR1cm4geyAuLi5hY2MsIC4uLnB1YmxpY01ldGhvZHMgfVxuICB9KVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCBwdWJsaWNNZXRob2RzKVxuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBbXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiBjb2xvckNsYXNzLnZhbHVlIH0sIGdldEhlYWRlcigpKSxcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXVwbG9hZGVyX19saXN0IHNjcm9sbCcgfSwgZ2V0TGlzdCgpKSxcbiAgICAgIGdldERuZE5vZGUoJ3VwbG9hZGVyJylcbiAgICBdXG5cbiAgICBzdGF0ZS5pc0J1c3kudmFsdWUgPT09IHRydWUgJiYgY2hpbGRyZW4ucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLXVwbG9hZGVyX19vdmVybGF5IGFic29sdXRlLWZ1bGwgZmxleCBmbGV4LWNlbnRlcidcbiAgICAgIH0sIFsgaChRU3Bpbm5lcikgXSlcbiAgICApXG5cbiAgICBjb25zdCBkYXRhID0geyByZWY6IHJvb3RSZWYsIGNsYXNzOiBjbGFzc2VzLnZhbHVlIH1cblxuICAgIGlmIChjYW5BZGRGaWxlcy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihkYXRhLCB7IG9uRHJhZ292ZXIsIG9uRHJhZ2xlYXZlIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIGRhdGEsIGNoaWxkcmVuKVxuICB9XG59XG4iLCJjb25zdCB0cnVlRm4gPSAoKSA9PiB0cnVlXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChlbWl0c0FycmF5KSB7XG4gIGNvbnN0IGVtaXRzT2JqZWN0ID0ge31cblxuICBlbWl0c0FycmF5LmZvckVhY2godmFsID0+IHtcbiAgICBlbWl0c09iamVjdFsgdmFsIF0gPSB0cnVlRm5cbiAgfSlcblxuICByZXR1cm4gZW1pdHNPYmplY3Rcbn1cbiIsImltcG9ydCB7IGNvcmVQcm9wcywgY29yZUVtaXRzLCBnZXRSZW5kZXJlciB9IGZyb20gJy4uL2NvbXBvbmVudHMvdXBsb2FkZXIvdXBsb2FkZXItY29yZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCBnZXRFbWl0c09iamVjdCBmcm9tICcuL3ByaXZhdGUvZ2V0LWVtaXRzLW9iamVjdC5qcydcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi9wcml2YXRlL2lzLmpzJ1xuXG5jb25zdCBjb3JlRW1pdHNPYmplY3QgPSBnZXRFbWl0c09iamVjdChjb3JlRW1pdHMpXG5cbmV4cG9ydCBkZWZhdWx0ICh7IG5hbWUsIHByb3BzLCBlbWl0cywgaW5qZWN0UGx1Z2luIH0pID0+IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWUsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi5jb3JlUHJvcHMsXG4gICAgLi4ucHJvcHNcbiAgfSxcblxuICBlbWl0czogaXNPYmplY3QoZW1pdHMpID09PSB0cnVlXG4gICAgPyB7IC4uLmNvcmVFbWl0c09iamVjdCwgLi4uZW1pdHMgfVxuICAgIDogWyAuLi5jb3JlRW1pdHMsIC4uLmVtaXRzIF0sXG5cbiAgc2V0dXAgKCkge1xuICAgIHJldHVybiBnZXRSZW5kZXJlcihpbmplY3RQbHVnaW4pXG4gIH1cbn0pXG4iLCIvKipcbiAqIEJhc2VkIG9uIHRoZSB3b3JrIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9qY2hvb2svdXVpZC1yYW5kb21cbiAqL1xuXG5sZXRcbiAgYnVmLFxuICBidWZJZHggPSAwXG5jb25zdCBoZXhCeXRlcyA9IG5ldyBBcnJheSgyNTYpXG5cbi8vIFByZS1jYWxjdWxhdGUgdG9TdHJpbmcoMTYpIGZvciBzcGVlZFxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7IGkrKykge1xuICBoZXhCeXRlc1sgaSBdID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKVxufVxuXG4vLyBVc2UgYmVzdCBhdmFpbGFibGUgUFJOR1xuY29uc3QgcmFuZG9tQnl0ZXMgPSAoKCkgPT4ge1xuICAvLyBOb2RlICYgQnJvd3NlciBzdXBwb3J0XG4gIGNvbnN0IGxpYiA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnXG4gICAgPyBjcnlwdG9cbiAgICA6IChcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICA/IHdpbmRvdy5jcnlwdG8gfHwgd2luZG93Lm1zQ3J5cHRvXG4gICAgICAgICAgOiB2b2lkIDBcbiAgICAgIClcblxuICBpZiAobGliICE9PSB2b2lkIDApIHtcbiAgICBpZiAobGliLnJhbmRvbUJ5dGVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBsaWIucmFuZG9tQnl0ZXNcbiAgICB9XG4gICAgaWYgKGxpYi5nZXRSYW5kb21WYWx1ZXMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIG4gPT4ge1xuICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KG4pXG4gICAgICAgIGxpYi5nZXRSYW5kb21WYWx1ZXMoYnl0ZXMpXG4gICAgICAgIHJldHVybiBieXRlc1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuID0+IHtcbiAgICBjb25zdCByID0gW11cbiAgICBmb3IgKGxldCBpID0gbjsgaSA+IDA7IGktLSkge1xuICAgICAgci5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpXG4gICAgfVxuICAgIHJldHVybiByXG4gIH1cbn0pKClcblxuLy8gQnVmZmVyIHJhbmRvbSBudW1iZXJzIGZvciBzcGVlZFxuLy8gUmVkdWNlIG1lbW9yeSB1c2FnZSBieSBkZWNyZWFzaW5nIHRoaXMgbnVtYmVyIChtaW4gMTYpXG4vLyBvciBpbXByb3ZlIHNwZWVkIGJ5IGluY3JlYXNpbmcgdGhpcyBudW1iZXIgKHRyeSAxNjM4NClcbmNvbnN0IEJVRkZFUl9TSVpFID0gNDA5NlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIC8vIEJ1ZmZlciBzb21lIHJhbmRvbSBieXRlcyBmb3Igc3BlZWRcbiAgaWYgKGJ1ZiA9PT0gdm9pZCAwIHx8IChidWZJZHggKyAxNiA+IEJVRkZFUl9TSVpFKSkge1xuICAgIGJ1ZklkeCA9IDBcbiAgICBidWYgPSByYW5kb21CeXRlcyhCVUZGRVJfU0laRSlcbiAgfVxuXG4gIGNvbnN0IGIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChidWYsIGJ1ZklkeCwgKGJ1ZklkeCArPSAxNikpXG4gIGJbIDYgXSA9IChiWyA2IF0gJiAweDBmKSB8IDB4NDBcbiAgYlsgOCBdID0gKGJbIDggXSAmIDB4M2YpIHwgMHg4MFxuXG4gIHJldHVybiBoZXhCeXRlc1sgYlsgMCBdIF0gKyBoZXhCeXRlc1sgYlsgMSBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAyIF0gXSArIGhleEJ5dGVzWyBiWyAzIF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDQgXSBdICsgaGV4Qnl0ZXNbIGJbIDUgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgNiBdIF0gKyBoZXhCeXRlc1sgYlsgNyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA4IF0gXSArIGhleEJ5dGVzWyBiWyA5IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDEwIF0gXSArIGhleEJ5dGVzWyBiWyAxMSBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAxMiBdIF0gKyBoZXhCeXRlc1sgYlsgMTMgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTQgXSBdICsgaGV4Qnl0ZXNbIGJbIDE1IF0gXVxufVxuIiwiaW1wb3J0IHsgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRm9ybUNoaWxkIGZyb20gJy4uL3VzZS1mb3JtLWNoaWxkLmpzJ1xuaW1wb3J0IHsgdGVzdFBhdHRlcm4gfSBmcm9tICcuLi8uLi91dGlscy9wYXR0ZXJucy5qcydcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnXG5pbXBvcnQgeyBpbmplY3RQcm9wIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9pbmplY3Qtb2JqLXByb3AuanMnXG5cbmNvbnN0IGxhenlSdWxlc1ZhbHVlcyA9IFsgdHJ1ZSwgZmFsc2UsICdvbmRlbWFuZCcgXVxuXG5leHBvcnQgY29uc3QgdXNlVmFsaWRhdGVQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge30sXG5cbiAgZXJyb3I6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZXJyb3JNZXNzYWdlOiBTdHJpbmcsXG4gIG5vRXJyb3JJY29uOiBCb29sZWFuLFxuXG4gIHJ1bGVzOiBBcnJheSxcbiAgcmVhY3RpdmVSdWxlczogQm9vbGVhbixcbiAgbGF6eVJ1bGVzOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICB2YWxpZGF0b3I6IHYgPT4gbGF6eVJ1bGVzVmFsdWVzLmluY2x1ZGVzKHYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZvY3VzZWQsIGlubmVyTG9hZGluZykge1xuICBjb25zdCB7IHByb3BzLCBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBpbm5lckVycm9yID0gcmVmKGZhbHNlKVxuICBjb25zdCBpbm5lckVycm9yTWVzc2FnZSA9IHJlZihudWxsKVxuICBjb25zdCBpc0RpcnR5TW9kZWwgPSByZWYobnVsbClcblxuICB1c2VGb3JtQ2hpbGQoeyB2YWxpZGF0ZSwgcmVzZXRWYWxpZGF0aW9uIH0pXG5cbiAgbGV0IHZhbGlkYXRlSW5kZXggPSAwLCB1bndhdGNoUnVsZXNcblxuICBjb25zdCBoYXNSdWxlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMucnVsZXMgIT09IHZvaWQgMFxuICAgICYmIHByb3BzLnJ1bGVzICE9PSBudWxsXG4gICAgJiYgcHJvcHMucnVsZXMubGVuZ3RoID4gMFxuICApXG5cbiAgY29uc3QgaGFzQWN0aXZlUnVsZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICAmJiBoYXNSdWxlcy52YWx1ZSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgaGFzRXJyb3IgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmVycm9yID09PSB0cnVlIHx8IGlubmVyRXJyb3IudmFsdWUgPT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IGVycm9yTWVzc2FnZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICB0eXBlb2YgcHJvcHMuZXJyb3JNZXNzYWdlID09PSAnc3RyaW5nJyAmJiBwcm9wcy5lcnJvck1lc3NhZ2UubGVuZ3RoID4gMFxuICAgICAgPyBwcm9wcy5lcnJvck1lc3NhZ2VcbiAgICAgIDogaW5uZXJFcnJvck1lc3NhZ2UudmFsdWVcbiAgKSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCAoKSA9PiB7XG4gICAgdmFsaWRhdGVJZk5lZWRlZCgpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMucmVhY3RpdmVSdWxlcywgdmFsID0+IHtcbiAgICBpZiAodmFsID09PSB0cnVlKSB7XG4gICAgICBpZiAodW53YXRjaFJ1bGVzID09PSB2b2lkIDApIHtcbiAgICAgICAgdW53YXRjaFJ1bGVzID0gd2F0Y2goKCkgPT4gcHJvcHMucnVsZXMsICgpID0+IHtcbiAgICAgICAgICB2YWxpZGF0ZUlmTmVlZGVkKHRydWUpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHVud2F0Y2hSdWxlcyAhPT0gdm9pZCAwKSB7XG4gICAgICB1bndhdGNoUnVsZXMoKVxuICAgICAgdW53YXRjaFJ1bGVzID0gdm9pZCAwXG4gICAgfVxuICB9LCB7IGltbWVkaWF0ZTogdHJ1ZSB9KVxuXG4gIHdhdGNoKGZvY3VzZWQsIHZhbCA9PiB7XG4gICAgaWYgKHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKGlzRGlydHlNb2RlbC52YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc0RpcnR5TW9kZWwudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlXG5cbiAgICAgIGlmIChcbiAgICAgICAgaGFzQWN0aXZlUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICAgICAgJiYgcHJvcHMubGF6eVJ1bGVzICE9PSAnb25kZW1hbmQnXG4gICAgICAgIC8vIERvbid0IHJlLXRyaWdnZXIgaWYgaXQncyBhbHJlYWR5IGluIHByb2dyZXNzO1xuICAgICAgICAvLyBJdCBtaWdodCBtZWFuIHRoYXQgZm9jdXMgc3dpdGNoZWQgdG8gc3VibWl0IGJ0biBhbmRcbiAgICAgICAgLy8gUUZvcm0ncyBzdWJtaXQoKSBoYXMgYmVlbiBjYWxsZWQgYWxyZWFkeSAoRU5URVIga2V5KVxuICAgICAgICAmJiBpbm5lckxvYWRpbmcudmFsdWUgPT09IGZhbHNlXG4gICAgICApIHtcbiAgICAgICAgZGVib3VuY2VkVmFsaWRhdGUoKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICBmdW5jdGlvbiByZXNldFZhbGlkYXRpb24gKCkge1xuICAgIHZhbGlkYXRlSW5kZXgrK1xuICAgIGlubmVyTG9hZGluZy52YWx1ZSA9IGZhbHNlXG4gICAgaXNEaXJ0eU1vZGVsLnZhbHVlID0gbnVsbFxuICAgIGlubmVyRXJyb3IudmFsdWUgPSBmYWxzZVxuICAgIGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlID0gbnVsbFxuICAgIGRlYm91bmNlZFZhbGlkYXRlLmNhbmNlbCgpXG4gIH1cblxuICAvKlxuICAgKiBSZXR1cm4gdmFsdWVcbiAgICogICAtIHRydWUgKHZhbGlkYXRpb24gc3VjY2VlZGVkKVxuICAgKiAgIC0gZmFsc2UgKHZhbGlkYXRpb24gZmFpbGVkKVxuICAgKiAgIC0gUHJvbWlzZSAocGVuZGluZyBhc3luYyB2YWxpZGF0aW9uKVxuICAgKi9cbiAgZnVuY3Rpb24gdmFsaWRhdGUgKHZhbCA9IHByb3BzLm1vZGVsVmFsdWUpIHtcbiAgICBpZiAoaGFzQWN0aXZlUnVsZXMudmFsdWUgIT09IHRydWUpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSArK3ZhbGlkYXRlSW5kZXhcblxuICAgIGlmIChpbm5lckxvYWRpbmcudmFsdWUgIT09IHRydWUgJiYgcHJvcHMubGF6eVJ1bGVzICE9PSB0cnVlKSB7XG4gICAgICBpc0RpcnR5TW9kZWwudmFsdWUgPSB0cnVlXG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKGVyciwgbXNnKSA9PiB7XG4gICAgICBpZiAoaW5uZXJFcnJvci52YWx1ZSAhPT0gZXJyKSB7XG4gICAgICAgIGlubmVyRXJyb3IudmFsdWUgPSBlcnJcbiAgICAgIH1cblxuICAgICAgY29uc3QgbSA9IG1zZyB8fCB2b2lkIDBcblxuICAgICAgaWYgKGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlICE9PSBtKSB7XG4gICAgICAgIGlubmVyRXJyb3JNZXNzYWdlLnZhbHVlID0gbVxuICAgICAgfVxuXG4gICAgICBpbm5lckxvYWRpbmcudmFsdWUgPSBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW11cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMucnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJ1bGUgPSBwcm9wcy5ydWxlc1sgaSBdXG4gICAgICBsZXQgcmVzXG5cbiAgICAgIGlmICh0eXBlb2YgcnVsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXMgPSBydWxlKHZhbClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHR5cGVvZiBydWxlID09PSAnc3RyaW5nJyAmJiB0ZXN0UGF0dGVyblsgcnVsZSBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmVzID0gdGVzdFBhdHRlcm5bIHJ1bGUgXSh2YWwpXG4gICAgICB9XG5cbiAgICAgIGlmIChyZXMgPT09IGZhbHNlIHx8IHR5cGVvZiByZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHVwZGF0ZSh0cnVlLCByZXMpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocmVzICE9PSB0cnVlICYmIHJlcyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHByb21pc2VzLnB1c2gocmVzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm9taXNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHVwZGF0ZShmYWxzZSlcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgaW5uZXJMb2FkaW5nLnZhbHVlID0gdHJ1ZVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcyA9PT0gdm9pZCAwIHx8IEFycmF5LmlzQXJyYXkocmVzKSA9PT0gZmFsc2UgfHwgcmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIHVwZGF0ZShmYWxzZSlcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbXNnID0gcmVzLmZpbmQociA9PiByID09PSBmYWxzZSB8fCB0eXBlb2YgciA9PT0gJ3N0cmluZycpXG4gICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIHVwZGF0ZShtc2cgIT09IHZvaWQgMCwgbXNnKVxuICAgICAgICByZXR1cm4gbXNnID09PSB2b2lkIDBcbiAgICAgIH0sXG4gICAgICBlID0+IHtcbiAgICAgICAgaWYgKGluZGV4ID09PSB2YWxpZGF0ZUluZGV4KSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihlKVxuICAgICAgICAgIHVwZGF0ZSh0cnVlKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGVJZk5lZWRlZCAoY2hhbmdlZFJ1bGVzKSB7XG4gICAgaWYgKFxuICAgICAgaGFzQWN0aXZlUnVsZXMudmFsdWUgPT09IHRydWVcbiAgICAgICYmIHByb3BzLmxhenlSdWxlcyAhPT0gJ29uZGVtYW5kJ1xuICAgICAgJiYgKGlzRGlydHlNb2RlbC52YWx1ZSA9PT0gdHJ1ZSB8fCAocHJvcHMubGF6eVJ1bGVzICE9PSB0cnVlICYmIGNoYW5nZWRSdWxlcyAhPT0gdHJ1ZSkpXG4gICAgKSB7XG4gICAgICBkZWJvdW5jZWRWYWxpZGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVib3VuY2VkVmFsaWRhdGUgPSBkZWJvdW5jZSh2YWxpZGF0ZSwgMClcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHVud2F0Y2hSdWxlcyAhPT0gdm9pZCAwICYmIHVud2F0Y2hSdWxlcygpXG4gICAgZGVib3VuY2VkVmFsaWRhdGUuY2FuY2VsKClcbiAgfSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHMgJiBwcm9wc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IHJlc2V0VmFsaWRhdGlvbiwgdmFsaWRhdGUgfSlcbiAgaW5qZWN0UHJvcChwcm94eSwgJ2hhc0Vycm9yJywgKCkgPT4gaGFzRXJyb3IudmFsdWUpXG5cbiAgcmV0dXJuIHtcbiAgICBpc0RpcnR5TW9kZWwsXG4gICAgaGFzUnVsZXMsXG4gICAgaGFzRXJyb3IsXG4gICAgZXJyb3JNZXNzYWdlLFxuXG4gICAgdmFsaWRhdGUsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgb25CZWZvcmVVcGRhdGUgfSBmcm9tICd2dWUnXG5cbmNvbnN0IGxpc3RlbmVyUkUgPSAvXm9uW0EtWl0vXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChhdHRycywgdm5vZGUpIHtcbiAgY29uc3QgYWNjID0ge1xuICAgIGxpc3RlbmVyczogcmVmKHt9KSxcbiAgICBhdHRyaWJ1dGVzOiByZWYoe30pXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSB7fVxuICAgIGNvbnN0IGxpc3RlbmVycyA9IHt9XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRycykge1xuICAgICAgaWYgKGtleSAhPT0gJ2NsYXNzJyAmJiBrZXkgIT09ICdzdHlsZScgJiYgbGlzdGVuZXJSRS50ZXN0KGtleSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGF0dHJpYnV0ZXNbIGtleSBdID0gYXR0cnNbIGtleSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBrZXkgaW4gdm5vZGUucHJvcHMpIHtcbiAgICAgIGlmIChsaXN0ZW5lclJFLnRlc3Qoa2V5KSA9PT0gdHJ1ZSkge1xuICAgICAgICBsaXN0ZW5lcnNbIGtleSBdID0gdm5vZGUucHJvcHNbIGtleSBdXG4gICAgICB9XG4gICAgfVxuXG4gICAgYWNjLmF0dHJpYnV0ZXMudmFsdWUgPSBhdHRyaWJ1dGVzXG4gICAgYWNjLmxpc3RlbmVycy52YWx1ZSA9IGxpc3RlbmVyc1xuICB9XG5cbiAgb25CZWZvcmVVcGRhdGUodXBkYXRlKVxuXG4gIHVwZGF0ZSgpXG5cbiAgcmV0dXJuIGFjY1xufVxuIiwibGV0IHF1ZXVlID0gW11cbmxldCB3YWl0RmxhZ3MgPSBbXVxuXG5mdW5jdGlvbiBjbGVhckZsYWcgKGZsYWcpIHtcbiAgd2FpdEZsYWdzID0gd2FpdEZsYWdzLmZpbHRlcihlbnRyeSA9PiBlbnRyeSAhPT0gZmxhZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzV2FpdEZsYWcgKGZsYWcpIHtcbiAgY2xlYXJGbGFnKGZsYWcpXG4gIHdhaXRGbGFncy5wdXNoKGZsYWcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGb2N1c1dhaXRGbGFnIChmbGFnKSB7XG4gIGNsZWFyRmxhZyhmbGFnKVxuXG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwICYmIHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAvLyBvbmx5IGNhbGwgbGFzdCBmb2N1cyBoYW5kbGVyIChjYW4ndCBmb2N1cyBtdWx0aXBsZSB0aGluZ3MgYXQgb25jZSlcbiAgICBxdWV1ZVsgcXVldWUubGVuZ3RoIC0gMSBdKClcbiAgICBxdWV1ZSA9IFtdXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEZvY3VzRm4gKGZuKSB7XG4gIGlmICh3YWl0RmxhZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgZm4oKVxuICB9XG4gIGVsc2Uge1xuICAgIHF1ZXVlLnB1c2goZm4pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZvY3VzRm4gKGZuKSB7XG4gIHF1ZXVlID0gcXVldWUuZmlsdGVyKGVudHJ5ID0+IGVudHJ5ICE9PSBmbilcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBUcmFuc2l0aW9uLCBuZXh0VGljaywgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNwaW5uZXIgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zcGlubmVyL1FTcGlubmVyLmpzJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVZhbGlkYXRlLCB7IHVzZVZhbGlkYXRlUHJvcHMgfSBmcm9tICcuL3VzZS12YWxpZGF0ZS5qcydcbmltcG9ydCB1c2VTcGxpdEF0dHJzIGZyb20gJy4vdXNlLXNwbGl0LWF0dHJzLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQuanMnXG5pbXBvcnQgeyBwcmV2ZW50LCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiwgcmVtb3ZlRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcblxuZnVuY3Rpb24gZ2V0VGFyZ2V0VWlkICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PT0gdm9pZCAwID8gYGZfJHsgdWlkKCkgfWAgOiB2YWxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZWxkVmFsdWVJc0ZpbGxlZCAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZvaWQgMFxuICAgICYmIHZhbCAhPT0gbnVsbFxuICAgICYmICgnJyArIHZhbCkubGVuZ3RoID4gMFxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRQcm9wcyA9IHtcbiAgLi4udXNlRGFya1Byb3BzLFxuICAuLi51c2VWYWxpZGF0ZVByb3BzLFxuXG4gIGxhYmVsOiBTdHJpbmcsXG4gIHN0YWNrTGFiZWw6IEJvb2xlYW4sXG4gIGhpbnQ6IFN0cmluZyxcbiAgaGlkZUhpbnQ6IEJvb2xlYW4sXG4gIHByZWZpeDogU3RyaW5nLFxuICBzdWZmaXg6IFN0cmluZyxcblxuICBsYWJlbENvbG9yOiBTdHJpbmcsXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGJnQ29sb3I6IFN0cmluZyxcblxuICBmaWxsZWQ6IEJvb2xlYW4sXG4gIG91dGxpbmVkOiBCb29sZWFuLFxuICBib3JkZXJsZXNzOiBCb29sZWFuLFxuICBzdGFuZG91dDogWyBCb29sZWFuLCBTdHJpbmcgXSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG5cbiAgbG9hZGluZzogQm9vbGVhbixcblxuICBsYWJlbFNsb3Q6IEJvb2xlYW4sXG5cbiAgYm90dG9tU2xvdHM6IEJvb2xlYW4sXG4gIGhpZGVCb3R0b21TcGFjZTogQm9vbGVhbixcblxuICByb3VuZGVkOiBCb29sZWFuLFxuICBkZW5zZTogQm9vbGVhbixcbiAgaXRlbUFsaWduZWQ6IEJvb2xlYW4sXG5cbiAgY291bnRlcjogQm9vbGVhbixcblxuICBjbGVhcmFibGU6IEJvb2xlYW4sXG4gIGNsZWFySWNvbjogU3RyaW5nLFxuXG4gIGRpc2FibGU6IEJvb2xlYW4sXG4gIHJlYWRvbmx5OiBCb29sZWFuLFxuXG4gIGF1dG9mb2N1czogQm9vbGVhbixcblxuICBmb3I6IFN0cmluZyxcblxuICBtYXhsZW5ndGg6IFsgTnVtYmVyLCBTdHJpbmcgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlRmllbGRFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NsZWFyJywgJ2ZvY3VzJywgJ2JsdXInLCAncG9wdXAtc2hvdycsICdwb3B1cC1oaWRlJyBdXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGaWVsZFN0YXRlICgpIHtcbiAgY29uc3QgeyBwcm9wcywgYXR0cnMsIHByb3h5LCB2bm9kZSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCBwcm94eS4kcSlcblxuICByZXR1cm4ge1xuICAgIGlzRGFyayxcblxuICAgIGVkaXRhYmxlOiBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5yZWFkb25seSAhPT0gdHJ1ZVxuICAgICksXG5cbiAgICBpbm5lckxvYWRpbmc6IHJlZihmYWxzZSksXG4gICAgZm9jdXNlZDogcmVmKGZhbHNlKSxcbiAgICBoYXNQb3B1cE9wZW46IGZhbHNlLFxuXG4gICAgc3BsaXRBdHRyczogdXNlU3BsaXRBdHRycyhhdHRycywgdm5vZGUpLFxuICAgIHRhcmdldFVpZDogcmVmKGdldFRhcmdldFVpZChwcm9wcy5mb3IpKSxcblxuICAgIHJvb3RSZWY6IHJlZihudWxsKSxcbiAgICB0YXJnZXRSZWY6IHJlZihudWxsKSxcbiAgICBjb250cm9sUmVmOiByZWYobnVsbClcblxuICAgIC8qKlxuICAgICAqIHVzZXIgc3VwcGxpZWQgYWRkaXRpb25hbHM6XG5cbiAgICAgKiBpbm5lclZhbHVlIC0gY29tcHV0ZWRcbiAgICAgKiBmbG9hdGluZ0xhYmVsIC0gY29tcHV0ZWRcbiAgICAgKiBpbnB1dFJlZiAtIGNvbXB1dGVkXG5cbiAgICAgKiBmaWVsZENsYXNzIC0gY29tcHV0ZWRcbiAgICAgKiBoYXNTaGFkb3cgLSBjb21wdXRlZFxuXG4gICAgICogY29udHJvbEV2ZW50cyAtIE9iamVjdCB3aXRoIGZuKGUpXG5cbiAgICAgKiBnZXRDb250cm9sIC0gZm5cbiAgICAgKiBnZXRJbm5lckFwcGVuZCAtIGZuXG4gICAgICogZ2V0Q29udHJvbENoaWxkIC0gZm5cbiAgICAgKiBnZXRTaGFkb3dDb250cm9sIC0gZm5cbiAgICAgKiBzaG93UG9wdXAgLSBmblxuICAgICAqL1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzdGF0ZSkge1xuICBjb25zdCB7IHByb3BzLCBlbWl0LCBzbG90cywgYXR0cnMsIHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gIGxldCBmb2N1c291dFRpbWVyXG5cbiAgaWYgKHN0YXRlLmhhc1ZhbHVlID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5oYXNWYWx1ZSA9IGNvbXB1dGVkKCgpID0+IGZpZWxkVmFsdWVJc0ZpbGxlZChwcm9wcy5tb2RlbFZhbHVlKSlcbiAgfVxuXG4gIGlmIChzdGF0ZS5lbWl0VmFsdWUgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmVtaXRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUpXG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLmNvbnRyb2xFdmVudHMgPT09IHZvaWQgMCkge1xuICAgIHN0YXRlLmNvbnRyb2xFdmVudHMgPSB7XG4gICAgICBvbkZvY3VzaW46IG9uQ29udHJvbEZvY3VzaW4sXG4gICAgICBvbkZvY3Vzb3V0OiBvbkNvbnRyb2xGb2N1c291dFxuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICBjbGVhclZhbHVlLFxuICAgIG9uQ29udHJvbEZvY3VzaW4sXG4gICAgb25Db250cm9sRm9jdXNvdXQsXG4gICAgZm9jdXNcbiAgfSlcblxuICBpZiAoc3RhdGUuY29tcHV0ZWRDb3VudGVyID09PSB2b2lkIDApIHtcbiAgICBzdGF0ZS5jb21wdXRlZENvdW50ZXIgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMuY291bnRlciAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbGVuID0gdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgICAgID8gKCcnICsgcHJvcHMubW9kZWxWYWx1ZSkubGVuZ3RoXG4gICAgICAgICAgOiAoQXJyYXkuaXNBcnJheShwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdHJ1ZSA/IHByb3BzLm1vZGVsVmFsdWUubGVuZ3RoIDogMClcblxuICAgICAgICBjb25zdCBtYXggPSBwcm9wcy5tYXhsZW5ndGggIT09IHZvaWQgMFxuICAgICAgICAgID8gcHJvcHMubWF4bGVuZ3RoXG4gICAgICAgICAgOiBwcm9wcy5tYXhWYWx1ZXNcblxuICAgICAgICByZXR1cm4gbGVuICsgKG1heCAhPT0gdm9pZCAwID8gJyAvICcgKyBtYXggOiAnJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3Qge1xuICAgIGlzRGlydHlNb2RlbCxcbiAgICBoYXNSdWxlcyxcbiAgICBoYXNFcnJvcixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgcmVzZXRWYWxpZGF0aW9uXG4gIH0gPSB1c2VWYWxpZGF0ZShzdGF0ZS5mb2N1c2VkLCBzdGF0ZS5pbm5lckxvYWRpbmcpXG5cbiAgY29uc3QgZmxvYXRpbmdMYWJlbCA9IHN0YXRlLmZsb2F0aW5nTGFiZWwgIT09IHZvaWQgMFxuICAgID8gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc3RhY2tMYWJlbCA9PT0gdHJ1ZSB8fCBzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlIHx8IHN0YXRlLmZsb2F0aW5nTGFiZWwudmFsdWUgPT09IHRydWUpXG4gICAgOiBjb21wdXRlZCgoKSA9PiBwcm9wcy5zdGFja0xhYmVsID09PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUpXG5cbiAgY29uc3Qgc2hvdWxkUmVuZGVyQm90dG9tID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5ib3R0b21TbG90cyA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmhpbnQgIT09IHZvaWQgMFxuICAgIHx8IGhhc1J1bGVzLnZhbHVlID09PSB0cnVlXG4gICAgfHwgcHJvcHMuY291bnRlciA9PT0gdHJ1ZVxuICAgIHx8IHByb3BzLmVycm9yICE9PSBudWxsXG4gIClcblxuICBjb25zdCBzdHlsZVR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLmZpbGxlZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ2ZpbGxlZCcgfVxuICAgIGlmIChwcm9wcy5vdXRsaW5lZCA9PT0gdHJ1ZSkgeyByZXR1cm4gJ291dGxpbmVkJyB9XG4gICAgaWYgKHByb3BzLmJvcmRlcmxlc3MgPT09IHRydWUpIHsgcmV0dXJuICdib3JkZXJsZXNzJyB9XG4gICAgaWYgKHByb3BzLnN0YW5kb3V0KSB7IHJldHVybiAnc3RhbmRvdXQnIH1cbiAgICByZXR1cm4gJ3N0YW5kYXJkJ1xuICB9KVxuXG4gIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGBxLWZpZWxkIHJvdyBuby13cmFwIGl0ZW1zLXN0YXJ0IHEtZmllbGQtLSR7IHN0eWxlVHlwZS52YWx1ZSB9YFxuICAgICsgKHN0YXRlLmZpZWxkQ2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgc3RhdGUuZmllbGRDbGFzcy52YWx1ZSB9YCA6ICcnKVxuICAgICsgKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHEtZmllbGQtLXJvdW5kZWQnIDogJycpXG4gICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWZpZWxkLS1zcXVhcmUnIDogJycpXG4gICAgKyAoZmxvYXRpbmdMYWJlbC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZmxvYXQnIDogJycpXG4gICAgKyAoaGFzTGFiZWwudmFsdWUgPT09IHRydWUgPyAnIHEtZmllbGQtLWxhYmVsZWQnIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtZmllbGQtLWRlbnNlJyA6ICcnKVxuICAgICsgKHByb3BzLml0ZW1BbGlnbmVkID09PSB0cnVlID8gJyBxLWZpZWxkLS1pdGVtLWFsaWduZWQgcS1pdGVtLXR5cGUnIDogJycpXG4gICAgKyAoc3RhdGUuaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLWZpZWxkLS1kYXJrJyA6ICcnKVxuICAgICsgKHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCA/ICcgcS1maWVsZC0tYXV0by1oZWlnaHQnIDogJycpXG4gICAgKyAoc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZm9jdXNlZCcgOiAnJylcbiAgICArIChoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZXJyb3InIDogJycpXG4gICAgKyAoaGFzRXJyb3IudmFsdWUgPT09IHRydWUgfHwgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0taGlnaGxpZ2h0ZWQnIDogJycpXG4gICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlICYmIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0td2l0aC1ib3R0b20nIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgcS1maWVsZC0tZGlzYWJsZWQnIDogKHByb3BzLnJlYWRvbmx5ID09PSB0cnVlID8gJyBxLWZpZWxkLS1yZWFkb25seScgOiAnJykpXG4gIClcblxuICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICdxLWZpZWxkX19jb250cm9sIHJlbGF0aXZlLXBvc2l0aW9uIHJvdyBuby13cmFwJ1xuICAgICsgKHByb3BzLmJnQ29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuYmdDb2xvciB9YCA6ICcnKVxuICAgICsgKFxuICAgICAgaGFzRXJyb3IudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnIHRleHQtbmVnYXRpdmUnXG4gICAgICAgIDogKFxuICAgICAgICAgICAgdHlwZW9mIHByb3BzLnN0YW5kb3V0ID09PSAnc3RyaW5nJyAmJiBwcm9wcy5zdGFuZG91dC5sZW5ndGggPiAwICYmIHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgICAgPyBgICR7IHByb3BzLnN0YW5kb3V0IH1gXG4gICAgICAgICAgICAgIDogKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICAgICApXG4gICAgKVxuICApXG5cbiAgY29uc3QgaGFzTGFiZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLmxhYmVsU2xvdCA9PT0gdHJ1ZSB8fCBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwXG4gIClcblxuICBjb25zdCBsYWJlbENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS1maWVsZF9fbGFiZWwgbm8tcG9pbnRlci1ldmVudHMgYWJzb2x1dGUgZWxsaXBzaXMnXG4gICAgKyAocHJvcHMubGFiZWxDb2xvciAhPT0gdm9pZCAwICYmIGhhc0Vycm9yLnZhbHVlICE9PSB0cnVlID8gYCB0ZXh0LSR7IHByb3BzLmxhYmVsQ29sb3IgfWAgOiAnJylcbiAgKVxuXG4gIGNvbnN0IGNvbnRyb2xTbG90U2NvcGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgIGlkOiBzdGF0ZS50YXJnZXRVaWQudmFsdWUsXG4gICAgZWRpdGFibGU6IHN0YXRlLmVkaXRhYmxlLnZhbHVlLFxuICAgIGZvY3VzZWQ6IHN0YXRlLmZvY3VzZWQudmFsdWUsXG4gICAgZmxvYXRpbmdMYWJlbDogZmxvYXRpbmdMYWJlbC52YWx1ZSxcbiAgICBtb2RlbFZhbHVlOiBwcm9wcy5tb2RlbFZhbHVlLFxuICAgIGVtaXRWYWx1ZTogc3RhdGUuZW1pdFZhbHVlXG4gIH0pKVxuXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWNjID0ge1xuICAgICAgZm9yOiBzdGF0ZS50YXJnZXRVaWQudmFsdWVcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1kaXNhYmxlZCcgXSA9ICd0cnVlJ1xuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5yZWFkb25seSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjWyAnYXJpYS1yZWFkb25seScgXSA9ICd0cnVlJ1xuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5mb3IsIHZhbCA9PiB7XG4gICAgLy8gZG9uJ3QgdHJhbnNmb3JtIHRhcmdldFVpZCBpbnRvIGEgY29tcHV0ZWRcbiAgICAvLyBwcm9wIGFzIGl0IHdpbGwgYnJlYWsgU1NSXG4gICAgc3RhdGUudGFyZ2V0VWlkLnZhbHVlID0gZ2V0VGFyZ2V0VWlkKHZhbClcbiAgfSlcblxuICBmdW5jdGlvbiBmb2N1c0hhbmRsZXIgKCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgIGxldCB0YXJnZXQgPSBzdGF0ZS50YXJnZXRSZWYgIT09IHZvaWQgMCAmJiBzdGF0ZS50YXJnZXRSZWYudmFsdWVcblxuICAgIGlmICh0YXJnZXQgJiYgKGVsID09PSBudWxsIHx8IGVsLmlkICE9PSBzdGF0ZS50YXJnZXRVaWQudmFsdWUpKSB7XG4gICAgICB0YXJnZXQuaGFzQXR0cmlidXRlKCd0YWJpbmRleCcpID09PSB0cnVlIHx8ICh0YXJnZXQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignW3RhYmluZGV4XScpKVxuICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IGVsKSB7XG4gICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgYWRkRm9jdXNGbihmb2N1c0hhbmRsZXIpXG4gIH1cblxuICBmdW5jdGlvbiBibHVyICgpIHtcbiAgICByZW1vdmVGb2N1c0ZuKGZvY3VzSGFuZGxlcilcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICBpZiAoZWwgIT09IG51bGwgJiYgc3RhdGUucm9vdFJlZi52YWx1ZS5jb250YWlucyhlbCkpIHtcbiAgICAgIGVsLmJsdXIoKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29udHJvbEZvY3VzaW4gKGUpIHtcbiAgICBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgICBpZiAoc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuZm9jdXNlZC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSB0cnVlXG4gICAgICBlbWl0KCdmb2N1cycsIGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Db250cm9sRm9jdXNvdXQgKGUsIHRoZW4pIHtcbiAgICBjbGVhclRpbWVvdXQoZm9jdXNvdXRUaW1lcilcbiAgICBmb2N1c291dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIGRvY3VtZW50Lmhhc0ZvY3VzKCkgPT09IHRydWUgJiYgKFxuICAgICAgICAgIHN0YXRlLmhhc1BvcHVwT3BlbiA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYgPT09IHZvaWQgMFxuICAgICAgICAgIHx8IHN0YXRlLmNvbnRyb2xSZWYudmFsdWUgPT09IG51bGxcbiAgICAgICAgICB8fCBzdGF0ZS5jb250cm9sUmVmLnZhbHVlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpICE9PSBmYWxzZVxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5mb2N1c2VkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHN0YXRlLmZvY3VzZWQudmFsdWUgPSBmYWxzZVxuICAgICAgICBlbWl0KCdibHVyJywgZSlcbiAgICAgIH1cblxuICAgICAgdGhlbiAhPT0gdm9pZCAwICYmIHRoZW4oKVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBjbGVhclZhbHVlIChlKSB7XG4gICAgLy8gcHJldmVudCBhY3RpdmF0aW5nIHRoZSBmaWVsZCBidXQga2VlcCBmb2N1cyBvbiBkZXNrdG9wXG4gICAgc3RvcEFuZFByZXZlbnQoZSlcblxuICAgIGlmICgkcS5wbGF0Zm9ybS5pcy5tb2JpbGUgIT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGVsID0gKHN0YXRlLnRhcmdldFJlZiAhPT0gdm9pZCAwICYmIHN0YXRlLnRhcmdldFJlZi52YWx1ZSkgfHwgc3RhdGUucm9vdFJlZi52YWx1ZVxuICAgICAgZWwuZm9jdXMoKVxuICAgIH1cbiAgICBlbHNlIGlmIChzdGF0ZS5yb290UmVmLnZhbHVlLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpID09PSB0cnVlKSB7XG4gICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKVxuICAgIH1cblxuICAgIGlmIChwcm9wcy50eXBlID09PSAnZmlsZScpIHsgLy8gVE9ETyB2dWUzXG4gICAgICAvLyBkbyBub3QgbGV0IGZvY3VzIGJlIHRyaWdnZXJlZFxuICAgICAgLy8gYXMgaXQgd2lsbCBtYWtlIHRoZSBuYXRpdmUgZmlsZSBkaWFsb2dcbiAgICAgIC8vIGFwcGVhciBmb3IgYW5vdGhlciBzZWxlY3Rpb25cbiAgICAgIHN0YXRlLmlucHV0UmVmLnZhbHVlLnZhbHVlID0gbnVsbFxuICAgIH1cblxuICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbnVsbClcbiAgICBlbWl0KCdjbGVhcicsIHByb3BzLm1vZGVsVmFsdWUpXG5cbiAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICByZXNldFZhbGlkYXRpb24oKVxuXG4gICAgICBpZiAoJHEucGxhdGZvcm0uaXMubW9iaWxlICE9PSB0cnVlKSB7XG4gICAgICAgIGlzRGlydHlNb2RlbC52YWx1ZSA9IGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgIGNvbnN0IG5vZGUgPSBbXVxuXG4gICAgc2xvdHMucHJlcGVuZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19wcmVwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGtleTogJ3ByZXBlbmQnLFxuICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICB9LCBzbG90cy5wcmVwZW5kKCkpXG4gICAgKVxuXG4gICAgbm9kZS5wdXNoKFxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvbnRyb2wtY29udGFpbmVyIGNvbCByZWxhdGl2ZS1wb3NpdGlvbiByb3cgbm8td3JhcCBxLWFuY2hvci0tc2tpcCdcbiAgICAgIH0sIGdldENvbnRyb2xDb250YWluZXIoKSlcbiAgICApXG5cbiAgICBoYXNFcnJvci52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5ub0Vycm9ySWNvbiA9PT0gZmFsc2UgJiYgbm9kZS5wdXNoKFxuICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdlcnJvcicsIFtcbiAgICAgICAgaChRSWNvbiwgeyBuYW1lOiAkcS5pY29uU2V0LmZpZWxkLmVycm9yLCBjb2xvcjogJ25lZ2F0aXZlJyB9KVxuICAgICAgXSlcbiAgICApXG5cbiAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSB8fCBzdGF0ZS5pbm5lckxvYWRpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKFxuICAgICAgICAgICdpbm5lci1sb2FkaW5nLWFwcGVuZCcsXG4gICAgICAgICAgc2xvdHMubG9hZGluZyAhPT0gdm9pZCAwXG4gICAgICAgICAgICA/IHNsb3RzLmxvYWRpbmcoKVxuICAgICAgICAgICAgOiBbIGgoUVNwaW5uZXIsIHsgY29sb3I6IHByb3BzLmNvbG9yIH0pIF1cbiAgICAgICAgKVxuICAgICAgKVxuICAgIH1cbiAgICBlbHNlIGlmIChwcm9wcy5jbGVhcmFibGUgPT09IHRydWUgJiYgc3RhdGUuaGFzVmFsdWUudmFsdWUgPT09IHRydWUgJiYgc3RhdGUuZWRpdGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIG5vZGUucHVzaChcbiAgICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdpbm5lci1jbGVhcmFibGUtYXBwZW5kJywgW1xuICAgICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fZm9jdXNhYmxlLWFjdGlvbicsXG4gICAgICAgICAgICB0YWc6ICdidXR0b24nLFxuICAgICAgICAgICAgbmFtZTogcHJvcHMuY2xlYXJJY29uIHx8ICRxLmljb25TZXQuZmllbGQuY2xlYXIsXG4gICAgICAgICAgICB0YWJpbmRleDogMCxcbiAgICAgICAgICAgIHR5cGU6ICdidXR0b24nLFxuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogbnVsbCxcbiAgICAgICAgICAgIHJvbGU6IG51bGwsXG4gICAgICAgICAgICBvbkNsaWNrOiBjbGVhclZhbHVlXG4gICAgICAgICAgfSlcbiAgICAgICAgXSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBzbG90cy5hcHBlbmQgIT09IHZvaWQgMCAmJiBub2RlLnB1c2goXG4gICAgICBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1maWVsZF9fYXBwZW5kIHEtZmllbGRfX21hcmdpbmFsIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcicsXG4gICAgICAgIGtleTogJ2FwcGVuZCcsXG4gICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgIH0sIHNsb3RzLmFwcGVuZCgpKVxuICAgIClcblxuICAgIHN0YXRlLmdldElubmVyQXBwZW5kICE9PSB2b2lkIDAgJiYgbm9kZS5wdXNoKFxuICAgICAgZ2V0SW5uZXJBcHBlbmROb2RlKCdpbm5lci1hcHBlbmQnLCBzdGF0ZS5nZXRJbm5lckFwcGVuZCgpKVxuICAgIClcblxuICAgIHN0YXRlLmdldENvbnRyb2xDaGlsZCAhPT0gdm9pZCAwICYmIG5vZGUucHVzaChcbiAgICAgIHN0YXRlLmdldENvbnRyb2xDaGlsZCgpXG4gICAgKVxuXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRyb2xDb250YWluZXIgKCkge1xuICAgIGNvbnN0IG5vZGUgPSBbXVxuXG4gICAgcHJvcHMucHJlZml4ICE9PSB2b2lkIDAgJiYgcHJvcHMucHJlZml4ICE9PSBudWxsICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19wcmVmaXggbm8tcG9pbnRlci1ldmVudHMgcm93IGl0ZW1zLWNlbnRlcidcbiAgICAgIH0sIHByb3BzLnByZWZpeClcbiAgICApXG5cbiAgICBpZiAoc3RhdGUuZ2V0U2hhZG93Q29udHJvbCAhPT0gdm9pZCAwICYmIHN0YXRlLmhhc1NoYWRvdy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgbm9kZS5wdXNoKFxuICAgICAgICBzdGF0ZS5nZXRTaGFkb3dDb250cm9sKClcbiAgICAgIClcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuZ2V0Q29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goc3RhdGUuZ2V0Q29udHJvbCgpKVxuICAgIH1cbiAgICAvLyBpbnRlcm5hbCB1c2FnZSBvbmx5OlxuICAgIGVsc2UgaWYgKHNsb3RzLnJhd0NvbnRyb2wgIT09IHZvaWQgMCkge1xuICAgICAgbm9kZS5wdXNoKHNsb3RzLnJhd0NvbnRyb2woKSlcbiAgICB9XG4gICAgZWxzZSBpZiAoc2xvdHMuY29udHJvbCAhPT0gdm9pZCAwKSB7XG4gICAgICBub2RlLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHN0YXRlLnRhcmdldFJlZixcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX25hdGl2ZSByb3cnLFxuICAgICAgICAgIHRhYmluZGV4OiAtMSxcbiAgICAgICAgICAuLi5zdGF0ZS5zcGxpdEF0dHJzLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAgICAgJ2RhdGEtYXV0b2ZvY3VzJzogcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlIHx8IHZvaWQgMFxuICAgICAgICB9LCBzbG90cy5jb250cm9sKGNvbnRyb2xTbG90U2NvcGUudmFsdWUpKVxuICAgICAgKVxuICAgIH1cblxuICAgIGhhc0xhYmVsLnZhbHVlID09PSB0cnVlICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGxhYmVsQ2xhc3MudmFsdWVcbiAgICAgIH0sIGhTbG90KHNsb3RzLmxhYmVsLCBwcm9wcy5sYWJlbCkpXG4gICAgKVxuXG4gICAgcHJvcHMuc3VmZml4ICE9PSB2b2lkIDAgJiYgcHJvcHMuc3VmZml4ICE9PSBudWxsICYmIG5vZGUucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19zdWZmaXggbm8tcG9pbnRlci1ldmVudHMgcm93IGl0ZW1zLWNlbnRlcidcbiAgICAgIH0sIHByb3BzLnN1ZmZpeClcbiAgICApXG5cbiAgICByZXR1cm4gbm9kZS5jb25jYXQoaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3R0b20gKCkge1xuICAgIGxldCBtc2csIGtleVxuXG4gICAgaWYgKGhhc0Vycm9yLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBpZiAoZXJyb3JNZXNzYWdlLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIG1zZyA9IFsgaCgnZGl2JywgeyByb2xlOiAnYWxlcnQnIH0sIGVycm9yTWVzc2FnZS52YWx1ZSkgXVxuICAgICAgICBrZXkgPSBgcS0tc2xvdC1lcnJvci0keyBlcnJvck1lc3NhZ2UudmFsdWUgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBtc2cgPSBoU2xvdChzbG90cy5lcnJvcilcbiAgICAgICAga2V5ID0gJ3EtLXNsb3QtZXJyb3InXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLmhpZGVIaW50ICE9PSB0cnVlIHx8IHN0YXRlLmZvY3VzZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy5oaW50ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbXNnID0gWyBoKCdkaXYnLCBwcm9wcy5oaW50KSBdXG4gICAgICAgIGtleSA9IGBxLS1zbG90LWhpbnQtJHsgcHJvcHMuaGludCB9YFxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG1zZyA9IGhTbG90KHNsb3RzLmhpbnQpXG4gICAgICAgIGtleSA9ICdxLS1zbG90LWhpbnQnXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaGFzQ291bnRlciA9IHByb3BzLmNvdW50ZXIgPT09IHRydWUgfHwgc2xvdHMuY291bnRlciAhPT0gdm9pZCAwXG5cbiAgICBpZiAocHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlICYmIGhhc0NvdW50ZXIgPT09IGZhbHNlICYmIG1zZyA9PT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBtYWluID0gaCgnZGl2Jywge1xuICAgICAga2V5LFxuICAgICAgY2xhc3M6ICdxLWZpZWxkX19tZXNzYWdlcyBjb2wnXG4gICAgfSwgbXNnKVxuXG4gICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1maWVsZF9fYm90dG9tIHJvdyBpdGVtcy1zdGFydCBxLWZpZWxkX19ib3R0b20tLSdcbiAgICAgICAgKyAocHJvcHMuaGlkZUJvdHRvbVNwYWNlICE9PSB0cnVlID8gJ2FuaW1hdGVkJyA6ICdzdGFsZScpXG4gICAgfSwgW1xuICAgICAgcHJvcHMuaGlkZUJvdHRvbVNwYWNlID09PSB0cnVlXG4gICAgICAgID8gbWFpblxuICAgICAgICA6IGgoVHJhbnNpdGlvbiwgeyBuYW1lOiAncS10cmFuc2l0aW9uLS1maWVsZC1tZXNzYWdlJyB9LCAoKSA9PiBtYWluKSxcblxuICAgICAgaGFzQ291bnRlciA9PT0gdHJ1ZVxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2NvdW50ZXInXG4gICAgICAgIH0sIHNsb3RzLmNvdW50ZXIgIT09IHZvaWQgMCA/IHNsb3RzLmNvdW50ZXIoKSA6IHN0YXRlLmNvbXB1dGVkQ291bnRlci52YWx1ZSlcbiAgICAgICAgOiBudWxsXG4gICAgXSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldElubmVyQXBwZW5kTm9kZSAoa2V5LCBjb250ZW50KSB7XG4gICAgcmV0dXJuIGNvbnRlbnQgPT09IG51bGxcbiAgICAgID8gbnVsbFxuICAgICAgOiBoKCdkaXYnLCB7XG4gICAgICAgIGtleSxcbiAgICAgICAgY2xhc3M6ICdxLWZpZWxkX19hcHBlbmQgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHEtYW5jaG9yLS1za2lwJ1xuICAgICAgfSwgY29udGVudClcbiAgfVxuXG4gIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGZvY3VzLCBibHVyIH0pXG5cbiAgbGV0IHNob3VsZEFjdGl2YXRlID0gZmFsc2VcblxuICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICBzaG91bGRBY3RpdmF0ZSA9IHRydWVcbiAgfSlcblxuICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgc2hvdWxkQWN0aXZhdGUgPT09IHRydWUgJiYgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIGlmIChpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgJiYgcHJvcHMuZm9yID09PSB2b2lkIDApIHtcbiAgICAgIHN0YXRlLnRhcmdldFVpZC52YWx1ZSA9IGdldFRhcmdldFVpZCgpXG4gICAgfVxuXG4gICAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3h5LmZvY3VzKClcbiAgfSlcblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIGNsZWFyVGltZW91dChmb2N1c291dFRpbWVyKVxuICB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXJGaWVsZCAoKSB7XG4gICAgY29uc3QgbGFiZWxBdHRycyA9IHN0YXRlLmdldENvbnRyb2wgPT09IHZvaWQgMCAmJiBzbG90cy5jb250cm9sID09PSB2b2lkIDBcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWVcbiAgICAgICAgfVxuICAgICAgOiBhdHRyaWJ1dGVzLnZhbHVlXG5cbiAgICByZXR1cm4gaCgnbGFiZWwnLCB7XG4gICAgICByZWY6IHN0YXRlLnJvb3RSZWYsXG4gICAgICBjbGFzczogW1xuICAgICAgICBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBhdHRycy5jbGFzc1xuICAgICAgXSxcbiAgICAgIHN0eWxlOiBhdHRycy5zdHlsZSxcbiAgICAgIC4uLmxhYmVsQXR0cnNcbiAgICB9LCBbXG4gICAgICBzbG90cy5iZWZvcmUgIT09IHZvaWQgMFxuICAgICAgICA/IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtZmllbGRfX2JlZm9yZSBxLWZpZWxkX19tYXJnaW5hbCByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInLFxuICAgICAgICAgIG9uQ2xpY2s6IHByZXZlbnRcbiAgICAgICAgfSwgc2xvdHMuYmVmb3JlKCkpXG4gICAgICAgIDogbnVsbCxcblxuICAgICAgaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtZmllbGRfX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIGNvbCBzZWxmLXN0cmV0Y2gnXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IHN0YXRlLmNvbnRyb2xSZWYsXG4gICAgICAgICAgY2xhc3M6IGNvbnRlbnRDbGFzcy52YWx1ZSxcbiAgICAgICAgICB0YWJpbmRleDogLTEsXG4gICAgICAgICAgLi4uc3RhdGUuY29udHJvbEV2ZW50c1xuICAgICAgICB9LCBnZXRDb250ZW50KCkpLFxuXG4gICAgICAgIHNob3VsZFJlbmRlckJvdHRvbS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gZ2V0Qm90dG9tKClcbiAgICAgICAgICA6IG51bGxcbiAgICAgIF0pLFxuXG4gICAgICBzbG90cy5hZnRlciAhPT0gdm9pZCAwXG4gICAgICAgID8gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fYWZ0ZXIgcS1maWVsZF9fbWFyZ2luYWwgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyJyxcbiAgICAgICAgICBvbkNsaWNrOiBwcmV2ZW50XG4gICAgICAgIH0sIHNsb3RzLmFmdGVyKCkpXG4gICAgICAgIDogbnVsbFxuICAgIF0pXG4gIH1cbn1cbiIsImltcG9ydCB7IHJlZiwgd2F0Y2gsIG5leHRUaWNrIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBzaG91bGRJZ25vcmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcblxuLy8gbGVhdmUgTkFNRURfTUFTS1MgYXQgdG9wIG9mIGZpbGUgKGNvZGUgcmVmZXJlbmNlZCBmcm9tIGRvY3MpXG5jb25zdCBOQU1FRF9NQVNLUyA9IHtcbiAgZGF0ZTogJyMjIyMvIyMvIyMnLFxuICBkYXRldGltZTogJyMjIyMvIyMvIyMgIyM6IyMnLFxuICB0aW1lOiAnIyM6IyMnLFxuICBmdWxsdGltZTogJyMjOiMjOiMjJyxcbiAgcGhvbmU6ICcoIyMjKSAjIyMgLSAjIyMjJyxcbiAgY2FyZDogJyMjIyMgIyMjIyAjIyMjICMjIyMnXG59XG5cbmNvbnN0IFRPS0VOUyA9IHtcbiAgJyMnOiB7IHBhdHRlcm46ICdbXFxcXGRdJywgbmVnYXRlOiAnW15cXFxcZF0nIH0sXG5cbiAgUzogeyBwYXR0ZXJuOiAnW2EtekEtWl0nLCBuZWdhdGU6ICdbXmEtekEtWl0nIH0sXG4gIE46IHsgcGF0dGVybjogJ1swLTlhLXpBLVpdJywgbmVnYXRlOiAnW14wLTlhLXpBLVpdJyB9LFxuXG4gIEE6IHsgcGF0dGVybjogJ1thLXpBLVpdJywgbmVnYXRlOiAnW15hLXpBLVpdJywgdHJhbnNmb3JtOiB2ID0+IHYudG9Mb2NhbGVVcHBlckNhc2UoKSB9LFxuICBhOiB7IHBhdHRlcm46ICdbYS16QS1aXScsIG5lZ2F0ZTogJ1teYS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlTG93ZXJDYXNlKCkgfSxcblxuICBYOiB7IHBhdHRlcm46ICdbMC05YS16QS1aXScsIG5lZ2F0ZTogJ1teMC05YS16QS1aXScsIHRyYW5zZm9ybTogdiA9PiB2LnRvTG9jYWxlVXBwZXJDYXNlKCkgfSxcbiAgeDogeyBwYXR0ZXJuOiAnWzAtOWEtekEtWl0nLCBuZWdhdGU6ICdbXjAtOWEtekEtWl0nLCB0cmFuc2Zvcm06IHYgPT4gdi50b0xvY2FsZUxvd2VyQ2FzZSgpIH1cbn1cblxuY29uc3QgS0VZUyA9IE9iamVjdC5rZXlzKFRPS0VOUylcbktFWVMuZm9yRWFjaChrZXkgPT4ge1xuICBUT0tFTlNbIGtleSBdLnJlZ2V4ID0gbmV3IFJlZ0V4cChUT0tFTlNbIGtleSBdLnBhdHRlcm4pXG59KVxuXG5jb25zdFxuICB0b2tlblJlZ2V4TWFzayA9IG5ldyBSZWdFeHAoJ1xcXFxcXFxcKFteLiorP14ke30oKXwoW1xcXFxdXSl8KFsuKis/XiR7fSgpfFtcXFxcXV0pfChbJyArIEtFWVMuam9pbignJykgKyAnXSl8KC4pJywgJ2cnKSxcbiAgZXNjUmVnZXggPSAvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2dcblxuY29uc3QgTUFSS0VSID0gU3RyaW5nLmZyb21DaGFyQ29kZSgxKVxuXG5leHBvcnQgY29uc3QgdXNlTWFza1Byb3BzID0ge1xuICBtYXNrOiBTdHJpbmcsXG4gIHJldmVyc2VGaWxsTWFzazogQm9vbGVhbixcbiAgZmlsbE1hc2s6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gIHVubWFza2VkVmFsdWU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBlbWl0LCBlbWl0VmFsdWUsIGlucHV0UmVmKSB7XG4gIGxldCBtYXNrTWFya2VkLCBtYXNrUmVwbGFjZWQsIGNvbXB1dGVkTWFzaywgY29tcHV0ZWRVbm1hc2tcblxuICBjb25zdCBoYXNNYXNrID0gcmVmKG51bGwpXG4gIGNvbnN0IGlubmVyVmFsdWUgPSByZWYoZ2V0SW5pdGlhbE1hc2tlZFZhbHVlKCkpXG5cbiAgZnVuY3Rpb24gZ2V0SXNUeXBlVGV4dCAoKSB7XG4gICAgcmV0dXJuIHByb3BzLmF1dG9ncm93ID09PSB0cnVlXG4gICAgICB8fCBbICd0ZXh0YXJlYScsICd0ZXh0JywgJ3NlYXJjaCcsICd1cmwnLCAndGVsJywgJ3Bhc3N3b3JkJyBdLmluY2x1ZGVzKHByb3BzLnR5cGUpXG4gIH1cblxuICB3YXRjaCgoKSA9PiBwcm9wcy50eXBlICsgcHJvcHMuYXV0b2dyb3csIHVwZGF0ZU1hc2tJbnRlcm5hbHMpXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubWFzaywgdiA9PiB7XG4gICAgaWYgKHYgIT09IHZvaWQgMCkge1xuICAgICAgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUsIHRydWUpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgdmFsID0gdW5tYXNrVmFsdWUoaW5uZXJWYWx1ZS52YWx1ZSlcbiAgICAgIHVwZGF0ZU1hc2tJbnRlcm5hbHMoKVxuICAgICAgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdmFsICYmIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuICAgIH1cbiAgfSlcblxuICB3YXRjaCgoKSA9PiBwcm9wcy5maWxsTWFzayArIHByb3BzLnJldmVyc2VGaWxsTWFzaywgKCkgPT4ge1xuICAgIGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUsIHRydWUpXG4gIH0pXG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMudW5tYXNrZWRWYWx1ZSwgKCkgPT4ge1xuICAgIGhhc01hc2sudmFsdWUgPT09IHRydWUgJiYgdXBkYXRlTWFza1ZhbHVlKGlubmVyVmFsdWUudmFsdWUpXG4gIH0pXG5cbiAgZnVuY3Rpb24gZ2V0SW5pdGlhbE1hc2tlZFZhbHVlICgpIHtcbiAgICB1cGRhdGVNYXNrSW50ZXJuYWxzKClcblxuICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBtYXNrZWQgPSBtYXNrVmFsdWUodW5tYXNrVmFsdWUocHJvcHMubW9kZWxWYWx1ZSkpXG5cbiAgICAgIHJldHVybiBwcm9wcy5maWxsTWFzayAhPT0gZmFsc2VcbiAgICAgICAgPyBmaWxsV2l0aE1hc2sobWFza2VkKVxuICAgICAgICA6IG1hc2tlZFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5tb2RlbFZhbHVlXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYWRkZWRNYXNrTWFya2VkIChzaXplKSB7XG4gICAgaWYgKHNpemUgPCBtYXNrTWFya2VkLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG1hc2tNYXJrZWQuc2xpY2UoLXNpemUpXG4gICAgfVxuXG4gICAgbGV0IHBhZCA9ICcnLCBsb2NhbE1hc2tNYXJrZWQgPSBtYXNrTWFya2VkXG4gICAgY29uc3QgcGFkUG9zID0gbG9jYWxNYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKVxuXG4gICAgaWYgKHBhZFBvcyA+IC0xKSB7XG4gICAgICBmb3IgKGxldCBpID0gc2l6ZSAtIGxvY2FsTWFza01hcmtlZC5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgcGFkICs9IE1BUktFUlxuICAgICAgfVxuXG4gICAgICBsb2NhbE1hc2tNYXJrZWQgPSBsb2NhbE1hc2tNYXJrZWQuc2xpY2UoMCwgcGFkUG9zKSArIHBhZCArIGxvY2FsTWFza01hcmtlZC5zbGljZShwYWRQb3MpXG4gICAgfVxuXG4gICAgcmV0dXJuIGxvY2FsTWFza01hcmtlZFxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFza0ludGVybmFscyAoKSB7XG4gICAgaGFzTWFzay52YWx1ZSA9IHByb3BzLm1hc2sgIT09IHZvaWQgMFxuICAgICAgJiYgcHJvcHMubWFzay5sZW5ndGggPiAwXG4gICAgICAmJiBnZXRJc1R5cGVUZXh0KClcblxuICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgY29tcHV0ZWRVbm1hc2sgPSB2b2lkIDBcbiAgICAgIG1hc2tNYXJrZWQgPSAnJ1xuICAgICAgbWFza1JlcGxhY2VkID0gJydcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICBsb2NhbENvbXB1dGVkTWFzayA9IE5BTUVEX01BU0tTWyBwcm9wcy5tYXNrIF0gPT09IHZvaWQgMFxuICAgICAgICA/IHByb3BzLm1hc2tcbiAgICAgICAgOiBOQU1FRF9NQVNLU1sgcHJvcHMubWFzayBdLFxuICAgICAgZmlsbENoYXIgPSB0eXBlb2YgcHJvcHMuZmlsbE1hc2sgPT09ICdzdHJpbmcnICYmIHByb3BzLmZpbGxNYXNrLmxlbmd0aCA+IDBcbiAgICAgICAgPyBwcm9wcy5maWxsTWFzay5zbGljZSgwLCAxKVxuICAgICAgICA6ICdfJyxcbiAgICAgIGZpbGxDaGFyRXNjYXBlZCA9IGZpbGxDaGFyLnJlcGxhY2UoZXNjUmVnZXgsICdcXFxcJCYnKSxcbiAgICAgIHVubWFzayA9IFtdLFxuICAgICAgZXh0cmFjdCA9IFtdLFxuICAgICAgbWFzayA9IFtdXG5cbiAgICBsZXRcbiAgICAgIGZpcnN0TWF0Y2ggPSBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUsXG4gICAgICB1bm1hc2tDaGFyID0gJycsXG4gICAgICBuZWdhdGVDaGFyID0gJydcblxuICAgIGxvY2FsQ29tcHV0ZWRNYXNrLnJlcGxhY2UodG9rZW5SZWdleE1hc2ssIChfLCBjaGFyMSwgZXNjLCB0b2tlbiwgY2hhcjIpID0+IHtcbiAgICAgIGlmICh0b2tlbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IGMgPSBUT0tFTlNbIHRva2VuIF1cbiAgICAgICAgbWFzay5wdXNoKGMpXG4gICAgICAgIG5lZ2F0ZUNoYXIgPSBjLm5lZ2F0ZVxuICAgICAgICBpZiAoZmlyc3RNYXRjaCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGV4dHJhY3QucHVzaCgnKD86JyArIG5lZ2F0ZUNoYXIgKyAnKyk/KCcgKyBjLnBhdHRlcm4gKyAnKyk/KD86JyArIG5lZ2F0ZUNoYXIgKyAnKyk/KCcgKyBjLnBhdHRlcm4gKyAnKyk/JylcbiAgICAgICAgICBmaXJzdE1hdGNoID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBleHRyYWN0LnB1c2goJyg/OicgKyBuZWdhdGVDaGFyICsgJyspPygnICsgYy5wYXR0ZXJuICsgJyk/JylcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGVzYyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHVubWFza0NoYXIgPSAnXFxcXCcgKyAoZXNjID09PSAnXFxcXCcgPyAnJyA6IGVzYylcbiAgICAgICAgbWFzay5wdXNoKGVzYylcbiAgICAgICAgdW5tYXNrLnB1c2goJyhbXicgKyB1bm1hc2tDaGFyICsgJ10rKT8nICsgdW5tYXNrQ2hhciArICc/JylcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBjID0gY2hhcjEgIT09IHZvaWQgMCA/IGNoYXIxIDogY2hhcjJcbiAgICAgICAgdW5tYXNrQ2hhciA9IGMgPT09ICdcXFxcJyA/ICdcXFxcXFxcXFxcXFxcXFxcJyA6IGMucmVwbGFjZShlc2NSZWdleCwgJ1xcXFxcXFxcJCYnKVxuICAgICAgICBtYXNrLnB1c2goYylcbiAgICAgICAgdW5tYXNrLnB1c2goJyhbXicgKyB1bm1hc2tDaGFyICsgJ10rKT8nICsgdW5tYXNrQ2hhciArICc/JylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3RcbiAgICAgIHVubWFza01hdGNoZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAnXidcbiAgICAgICAgKyB1bm1hc2suam9pbignJylcbiAgICAgICAgKyAnKCcgKyAodW5tYXNrQ2hhciA9PT0gJycgPyAnLicgOiAnW14nICsgdW5tYXNrQ2hhciArICddJykgKyAnKyk/J1xuICAgICAgICArICckJ1xuICAgICAgKSxcbiAgICAgIGV4dHJhY3RMYXN0ID0gZXh0cmFjdC5sZW5ndGggLSAxLFxuICAgICAgZXh0cmFjdE1hdGNoZXIgPSBleHRyYWN0Lm1hcCgocmUsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChpbmRleCA9PT0gMCAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyBmaWxsQ2hhckVzY2FwZWQgKyAnKicgKyByZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gZXh0cmFjdExhc3QpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICdeJyArIHJlXG4gICAgICAgICAgICArICcoJyArIChuZWdhdGVDaGFyID09PSAnJyA/ICcuJyA6IG5lZ2F0ZUNoYXIpICsgJyspPydcbiAgICAgICAgICAgICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICckJyA6IGZpbGxDaGFyRXNjYXBlZCArICcqJylcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyByZSlcbiAgICAgIH0pXG5cbiAgICBjb21wdXRlZE1hc2sgPSBtYXNrXG4gICAgY29tcHV0ZWRVbm1hc2sgPSB2YWwgPT4ge1xuICAgICAgY29uc3QgdW5tYXNrTWF0Y2ggPSB1bm1hc2tNYXRjaGVyLmV4ZWModmFsKVxuICAgICAgaWYgKHVubWFza01hdGNoICE9PSBudWxsKSB7XG4gICAgICAgIHZhbCA9IHVubWFza01hdGNoLnNsaWNlKDEpLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGV4dHJhY3RNYXRjaCA9IFtdLFxuICAgICAgICBleHRyYWN0TWF0Y2hlckxlbmd0aCA9IGV4dHJhY3RNYXRjaGVyLmxlbmd0aFxuXG4gICAgICBmb3IgKGxldCBpID0gMCwgc3RyID0gdmFsOyBpIDwgZXh0cmFjdE1hdGNoZXJMZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtID0gZXh0cmFjdE1hdGNoZXJbIGkgXS5leGVjKHN0cilcblxuICAgICAgICBpZiAobSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBzdHIgPSBzdHIuc2xpY2UobS5zaGlmdCgpLmxlbmd0aClcbiAgICAgICAgZXh0cmFjdE1hdGNoLnB1c2goLi4ubSlcbiAgICAgIH1cbiAgICAgIGlmIChleHRyYWN0TWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gZXh0cmFjdE1hdGNoLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxcbiAgICB9XG4gICAgbWFza01hcmtlZCA9IG1hc2subWFwKHYgPT4gKHR5cGVvZiB2ID09PSAnc3RyaW5nJyA/IHYgOiBNQVJLRVIpKS5qb2luKCcnKVxuICAgIG1hc2tSZXBsYWNlZCA9IG1hc2tNYXJrZWQuc3BsaXQoTUFSS0VSKS5qb2luKGZpbGxDaGFyKVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlTWFza1ZhbHVlIChyYXdWYWwsIHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnLCBpbnB1dFR5cGUpIHtcbiAgICBjb25zdFxuICAgICAgaW5wID0gaW5wdXRSZWYudmFsdWUsXG4gICAgICBlbmQgPSBpbnAuc2VsZWN0aW9uRW5kLFxuICAgICAgZW5kUmV2ZXJzZSA9IGlucC52YWx1ZS5sZW5ndGggLSBlbmQsXG4gICAgICB1bm1hc2tlZCA9IHVubWFza1ZhbHVlKHJhd1ZhbClcblxuICAgIC8vIFVwZGF0ZSBoZXJlIHNvIHVubWFzayB1c2VzIHRoZSBvcmlnaW5hbCBmaWxsQ2hhclxuICAgIHVwZGF0ZU1hc2tJbnRlcm5hbHNGbGFnID09PSB0cnVlICYmIHVwZGF0ZU1hc2tJbnRlcm5hbHMoKVxuXG4gICAgY29uc3RcbiAgICAgIHByZU1hc2tlZCA9IG1hc2tWYWx1ZSh1bm1hc2tlZCksXG4gICAgICBtYXNrZWQgPSBwcm9wcy5maWxsTWFzayAhPT0gZmFsc2VcbiAgICAgICAgPyBmaWxsV2l0aE1hc2socHJlTWFza2VkKVxuICAgICAgICA6IHByZU1hc2tlZCxcbiAgICAgIGNoYW5nZWQgPSBpbm5lclZhbHVlLnZhbHVlICE9PSBtYXNrZWRcblxuICAgIC8vIFdlIHdhbnQgdG8gYXZvaWQgXCJmbGlja2VyaW5nXCIgc28gd2Ugc2V0IHZhbHVlIGltbWVkaWF0ZWx5XG4gICAgaW5wLnZhbHVlICE9PSBtYXNrZWQgJiYgKGlucC52YWx1ZSA9IG1hc2tlZClcblxuICAgIGNoYW5nZWQgPT09IHRydWUgJiYgKGlubmVyVmFsdWUudmFsdWUgPSBtYXNrZWQpXG5cbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnAgJiYgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgaWYgKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkKSB7XG4gICAgICAgIGNvbnN0IGN1cnNvciA9IHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/IG1hc2tSZXBsYWNlZC5sZW5ndGggOiAwXG4gICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaW5wdXRUeXBlID09PSAnaW5zZXJ0RnJvbVBhc3RlJyAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gZW5kIC0gMVxuICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yLCBjdXJzb3IpXG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChbICdkZWxldGVDb250ZW50QmFja3dhcmQnLCAnZGVsZXRlQ29udGVudEZvcndhcmQnIF0uaW5kZXhPZihpbnB1dFR5cGUpID4gLTEpIHtcbiAgICAgICAgY29uc3QgY3Vyc29yID0gcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlXG4gICAgICAgICAgPyAoXG4gICAgICAgICAgICAgIGVuZCA9PT0gMFxuICAgICAgICAgICAgICAgID8gKG1hc2tlZC5sZW5ndGggPiBwcmVNYXNrZWQubGVuZ3RoID8gMSA6IDApXG4gICAgICAgICAgICAgICAgOiBNYXRoLm1heCgwLCBtYXNrZWQubGVuZ3RoIC0gKG1hc2tlZCA9PT0gbWFza1JlcGxhY2VkID8gMCA6IE1hdGgubWluKHByZU1hc2tlZC5sZW5ndGgsIGVuZFJldmVyc2UpICsgMSkpICsgMVxuICAgICAgICAgICAgKVxuICAgICAgICAgIDogZW5kXG5cbiAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnZm9yd2FyZCcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChjaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3QgY3Vyc29yID0gTWF0aC5tYXgoMCwgbWFza2VkLmxlbmd0aCAtIChtYXNrZWQgPT09IG1hc2tSZXBsYWNlZCA/IDAgOiBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBlbmRSZXZlcnNlICsgMSkpKVxuXG4gICAgICAgICAgaWYgKGN1cnNvciA9PT0gMSAmJiBlbmQgPT09IDEpIHtcbiAgICAgICAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShjdXJzb3IsIGN1cnNvciwgJ2ZvcndhcmQnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vdmVDdXJzb3IucmlnaHRSZXZlcnNlKGlucCwgY3Vyc29yLCBjdXJzb3IpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IG1hc2tlZC5sZW5ndGggLSBlbmRSZXZlcnNlXG4gICAgICAgICAgaW5wLnNldFNlbGVjdGlvblJhbmdlKGN1cnNvciwgY3Vyc29yLCAnYmFja3dhcmQnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGNoYW5nZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBjb25zdCBjdXJzb3IgPSBNYXRoLm1heCgwLCBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKSwgTWF0aC5taW4ocHJlTWFza2VkLmxlbmd0aCwgZW5kKSAtIDEpXG4gICAgICAgICAgbW92ZUN1cnNvci5yaWdodChpbnAsIGN1cnNvciwgY3Vyc29yKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGN1cnNvciA9IGVuZCAtIDFcbiAgICAgICAgICBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgY3Vyc29yLCBjdXJzb3IpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgdmFsID0gcHJvcHMudW5tYXNrZWRWYWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyB1bm1hc2tWYWx1ZShtYXNrZWQpXG4gICAgICA6IG1hc2tlZFxuXG4gICAgU3RyaW5nKHByb3BzLm1vZGVsVmFsdWUpICE9PSB2YWwgJiYgZW1pdFZhbHVlKHZhbCwgdHJ1ZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmVDdXJzb3JGb3JQYXN0ZSAoaW5wLCBzdGFydCwgZW5kKSB7XG4gICAgY29uc3QgcHJlTWFza2VkID0gbWFza1ZhbHVlKHVubWFza1ZhbHVlKGlucC52YWx1ZSkpXG5cbiAgICBzdGFydCA9IE1hdGgubWF4KDAsIG1hc2tNYXJrZWQuaW5kZXhPZihNQVJLRVIpLCBNYXRoLm1pbihwcmVNYXNrZWQubGVuZ3RoLCBzdGFydCkpXG5cbiAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc3RhcnQsIGVuZCwgJ2ZvcndhcmQnKVxuICB9XG5cbiAgY29uc3QgbW92ZUN1cnNvciA9IHtcbiAgICBsZWZ0IChpbnAsIHN0YXJ0LCBlbmQsIHNlbGVjdGlvbikge1xuICAgICAgY29uc3Qgbm9NYXJrQmVmb3JlID0gbWFza01hcmtlZC5zbGljZShzdGFydCAtIDEpLmluZGV4T2YoTUFSS0VSKSA9PT0gLTFcbiAgICAgIGxldCBpID0gTWF0aC5tYXgoMCwgc3RhcnQgLSAxKVxuXG4gICAgICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKG1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgc3RhcnQgPSBpXG4gICAgICAgICAgbm9NYXJrQmVmb3JlID09PSB0cnVlICYmIHN0YXJ0KytcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA8IDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgc3RhcnQgXSAhPT0gdm9pZCAwXG4gICAgICAgICYmIG1hc2tNYXJrZWRbIHN0YXJ0IF0gIT09IE1BUktFUlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBtb3ZlQ3Vyc29yLnJpZ2h0KGlucCwgMCwgMClcbiAgICAgIH1cblxuICAgICAgc3RhcnQgPj0gMCAmJiBpbnAuc2V0U2VsZWN0aW9uUmFuZ2UoXG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBzZWxlY3Rpb24gPT09IHRydWUgPyBlbmQgOiBzdGFydCwgJ2JhY2t3YXJkJ1xuICAgICAgKVxuICAgIH0sXG5cbiAgICByaWdodCAoaW5wLCBzdGFydCwgZW5kLCBzZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0IGxpbWl0ID0gaW5wLnZhbHVlLmxlbmd0aFxuICAgICAgbGV0IGkgPSBNYXRoLm1pbihsaW1pdCwgZW5kICsgMSlcblxuICAgICAgZm9yICg7IGkgPD0gbGltaXQ7IGkrKykge1xuICAgICAgICBpZiAobWFza01hcmtlZFsgaSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBlbmQgPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtYXNrTWFya2VkWyBpIC0gMSBdID09PSBNQVJLRVIpIHtcbiAgICAgICAgICBlbmQgPSBpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpID4gbGltaXRcbiAgICAgICAgJiYgbWFza01hcmtlZFsgZW5kIC0gMSBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbWFza01hcmtlZFsgZW5kIC0gMSBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5sZWZ0KGlucCwgbGltaXQsIGxpbWl0KVxuICAgICAgfVxuXG4gICAgICBpbnAuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uID8gc3RhcnQgOiBlbmQsIGVuZCwgJ2ZvcndhcmQnKVxuICAgIH0sXG5cbiAgICBsZWZ0UmV2ZXJzZSAoaW5wLCBzdGFydCwgZW5kLCBzZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGxvY2FsTWFza01hcmtlZCA9IGdldFBhZGRlZE1hc2tNYXJrZWQoaW5wLnZhbHVlLmxlbmd0aClcbiAgICAgIGxldCBpID0gTWF0aC5tYXgoMCwgc3RhcnQgLSAxKVxuXG4gICAgICBmb3IgKDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKGxvY2FsTWFza01hcmtlZFsgaSAtIDEgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgc3RhcnQgPSBpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgXSA9PT0gTUFSS0VSKSB7XG4gICAgICAgICAgc3RhcnQgPSBpXG4gICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgaSA8IDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBzdGFydCBdICE9PSB2b2lkIDBcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBzdGFydCBdICE9PSBNQVJLRVJcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gbW92ZUN1cnNvci5yaWdodFJldmVyc2UoaW5wLCAwLCAwKVxuICAgICAgfVxuXG4gICAgICBzdGFydCA+PSAwICYmIGlucC5zZXRTZWxlY3Rpb25SYW5nZShcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIHNlbGVjdGlvbiA9PT0gdHJ1ZSA/IGVuZCA6IHN0YXJ0LCAnYmFja3dhcmQnXG4gICAgICApXG4gICAgfSxcblxuICAgIHJpZ2h0UmV2ZXJzZSAoaW5wLCBzdGFydCwgZW5kLCBzZWxlY3Rpb24pIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGxpbWl0ID0gaW5wLnZhbHVlLmxlbmd0aCxcbiAgICAgICAgbG9jYWxNYXNrTWFya2VkID0gZ2V0UGFkZGVkTWFza01hcmtlZChsaW1pdCksXG4gICAgICAgIG5vTWFya0JlZm9yZSA9IGxvY2FsTWFza01hcmtlZC5zbGljZSgwLCBlbmQgKyAxKS5pbmRleE9mKE1BUktFUikgPT09IC0xXG4gICAgICBsZXQgaSA9IE1hdGgubWluKGxpbWl0LCBlbmQgKyAxKVxuXG4gICAgICBmb3IgKDsgaSA8PSBsaW1pdDsgaSsrKSB7XG4gICAgICAgIGlmIChsb2NhbE1hc2tNYXJrZWRbIGkgLSAxIF0gPT09IE1BUktFUikge1xuICAgICAgICAgIGVuZCA9IGlcbiAgICAgICAgICBlbmQgPiAwICYmIG5vTWFya0JlZm9yZSA9PT0gdHJ1ZSAmJiBlbmQtLVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBpID4gbGltaXRcbiAgICAgICAgJiYgbG9jYWxNYXNrTWFya2VkWyBlbmQgLSAxIF0gIT09IHZvaWQgMFxuICAgICAgICAmJiBsb2NhbE1hc2tNYXJrZWRbIGVuZCAtIDEgXSAhPT0gTUFSS0VSXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIG1vdmVDdXJzb3IubGVmdFJldmVyc2UoaW5wLCBsaW1pdCwgbGltaXQpXG4gICAgICB9XG5cbiAgICAgIGlucC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb24gPT09IHRydWUgPyBzdGFydCA6IGVuZCwgZW5kLCAnZm9yd2FyZCcpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25NYXNrZWRLZXlkb3duIChlKSB7XG4gICAgaWYgKHNob3VsZElnbm9yZUtleShlKSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIGlucCA9IGlucHV0UmVmLnZhbHVlLFxuICAgICAgc3RhcnQgPSBpbnAuc2VsZWN0aW9uU3RhcnQsXG4gICAgICBlbmQgPSBpbnAuc2VsZWN0aW9uRW5kXG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM5KSB7IC8vIExlZnQgLyBSaWdodFxuICAgICAgY29uc3QgZm4gPSBtb3ZlQ3Vyc29yWyAoZS5rZXlDb2RlID09PSAzOSA/ICdyaWdodCcgOiAnbGVmdCcpICsgKHByb3BzLnJldmVyc2VGaWxsTWFzayA9PT0gdHJ1ZSA/ICdSZXZlcnNlJyA6ICcnKSBdXG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZm4oaW5wLCBzdGFydCwgZW5kLCBlLnNoaWZ0S2V5KVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIGUua2V5Q29kZSA9PT0gOCAvLyBCYWNrc3BhY2VcbiAgICAgICYmIHByb3BzLnJldmVyc2VGaWxsTWFzayAhPT0gdHJ1ZVxuICAgICAgJiYgc3RhcnQgPT09IGVuZFxuICAgICkge1xuICAgICAgbW92ZUN1cnNvci5sZWZ0KGlucCwgc3RhcnQsIGVuZCwgdHJ1ZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLmtleUNvZGUgPT09IDQ2IC8vIERlbGV0ZVxuICAgICAgJiYgcHJvcHMucmV2ZXJzZUZpbGxNYXNrID09PSB0cnVlXG4gICAgICAmJiBzdGFydCA9PT0gZW5kXG4gICAgKSB7XG4gICAgICBtb3ZlQ3Vyc29yLnJpZ2h0UmV2ZXJzZShpbnAsIHN0YXJ0LCBlbmQsIHRydWUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlICh2YWwpIHtcbiAgICBpZiAodmFsID09PSB2b2lkIDAgfHwgdmFsID09PSBudWxsIHx8IHZhbCA9PT0gJycpIHsgcmV0dXJuICcnIH1cblxuICAgIGlmIChwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBtYXNrVmFsdWVSZXZlcnNlKHZhbClcbiAgICB9XG5cbiAgICBjb25zdCBtYXNrID0gY29tcHV0ZWRNYXNrXG5cbiAgICBsZXQgdmFsSW5kZXggPSAwLCBvdXRwdXQgPSAnJ1xuXG4gICAgZm9yIChsZXQgbWFza0luZGV4ID0gMDsgbWFza0luZGV4IDwgbWFzay5sZW5ndGg7IG1hc2tJbmRleCsrKSB7XG4gICAgICBjb25zdFxuICAgICAgICB2YWxDaGFyID0gdmFsWyB2YWxJbmRleCBdLFxuICAgICAgICBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgKz0gbWFza0RlZlxuICAgICAgICB2YWxDaGFyID09PSBtYXNrRGVmICYmIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHZhbENoYXIgIT09IHZvaWQgMCAmJiBtYXNrRGVmLnJlZ2V4LnRlc3QodmFsQ2hhcikpIHtcbiAgICAgICAgb3V0cHV0ICs9IG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDBcbiAgICAgICAgICA/IG1hc2tEZWYudHJhbnNmb3JtKHZhbENoYXIpXG4gICAgICAgICAgOiB2YWxDaGFyXG4gICAgICAgIHZhbEluZGV4KytcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gbWFza1ZhbHVlUmV2ZXJzZSAodmFsKSB7XG4gICAgY29uc3RcbiAgICAgIG1hc2sgPSBjb21wdXRlZE1hc2ssXG4gICAgICBmaXJzdFRva2VuSW5kZXggPSBtYXNrTWFya2VkLmluZGV4T2YoTUFSS0VSKVxuXG4gICAgbGV0IHZhbEluZGV4ID0gdmFsLmxlbmd0aCAtIDEsIG91dHB1dCA9ICcnXG5cbiAgICBmb3IgKGxldCBtYXNrSW5kZXggPSBtYXNrLmxlbmd0aCAtIDE7IG1hc2tJbmRleCA+PSAwICYmIHZhbEluZGV4ID4gLTE7IG1hc2tJbmRleC0tKSB7XG4gICAgICBjb25zdCBtYXNrRGVmID0gbWFza1sgbWFza0luZGV4IF1cblxuICAgICAgbGV0IHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cblxuICAgICAgaWYgKHR5cGVvZiBtYXNrRGVmID09PSAnc3RyaW5nJykge1xuICAgICAgICBvdXRwdXQgPSBtYXNrRGVmICsgb3V0cHV0XG4gICAgICAgIHZhbENoYXIgPT09IG1hc2tEZWYgJiYgdmFsSW5kZXgtLVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSkge1xuICAgICAgICBkbyB7XG4gICAgICAgICAgb3V0cHV0ID0gKG1hc2tEZWYudHJhbnNmb3JtICE9PSB2b2lkIDAgPyBtYXNrRGVmLnRyYW5zZm9ybSh2YWxDaGFyKSA6IHZhbENoYXIpICsgb3V0cHV0XG4gICAgICAgICAgdmFsSW5kZXgtLVxuICAgICAgICAgIHZhbENoYXIgPSB2YWxbIHZhbEluZGV4IF1cbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVubW9kaWZpZWQtbG9vcC1jb25kaXRpb25cbiAgICAgICAgfSB3aGlsZSAoZmlyc3RUb2tlbkluZGV4ID09PSBtYXNrSW5kZXggJiYgdmFsQ2hhciAhPT0gdm9pZCAwICYmIG1hc2tEZWYucmVnZXgudGVzdCh2YWxDaGFyKSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dHB1dFxuICB9XG5cbiAgZnVuY3Rpb24gdW5tYXNrVmFsdWUgKHZhbCkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAnc3RyaW5nJyB8fCBjb21wdXRlZFVubWFzayA9PT0gdm9pZCAwXG4gICAgICA/ICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IGNvbXB1dGVkVW5tYXNrKCcnICsgdmFsKSA6IHZhbClcbiAgICAgIDogY29tcHV0ZWRVbm1hc2sodmFsKVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsbFdpdGhNYXNrICh2YWwpIHtcbiAgICBpZiAobWFza1JlcGxhY2VkLmxlbmd0aCAtIHZhbC5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHZhbFxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgPT09IHRydWUgJiYgdmFsLmxlbmd0aCA+IDBcbiAgICAgID8gbWFza1JlcGxhY2VkLnNsaWNlKDAsIC12YWwubGVuZ3RoKSArIHZhbFxuICAgICAgOiB2YWwgKyBtYXNrUmVwbGFjZWQuc2xpY2UodmFsLmxlbmd0aClcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5uZXJWYWx1ZSxcbiAgICBoYXNNYXNrLFxuICAgIG1vdmVDdXJzb3JGb3JQYXN0ZSxcbiAgICB1cGRhdGVNYXNrVmFsdWUsXG4gICAgb25NYXNrZWRLZXlkb3duXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlRm9ybVByb3BzID0ge1xuICBuYW1lOiBTdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1BdHRycyAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+ICh7XG4gICAgdHlwZTogJ2hpZGRlbicsXG4gICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICB2YWx1ZTogcHJvcHMubW9kZWxWYWx1ZVxuICB9KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1JbmplY3QgKGZvcm1BdHRycyA9IHt9KSB7XG4gIHJldHVybiAoY2hpbGQsIGFjdGlvbiwgY2xhc3NOYW1lKSA9PiB7XG4gICAgY2hpbGRbIGFjdGlvbiBdKFxuICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgIGNsYXNzOiAnaGlkZGVuJyArIChjbGFzc05hbWUgfHwgJycpLFxuICAgICAgICAuLi5mb3JtQXR0cnMudmFsdWVcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5wdXROYW1lQXR0ciAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHByb3BzLm5hbWUgfHwgcHJvcHMuZm9yKVxufVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgdHlwZUd1YXJkKSB7XG4gIGZ1bmN0aW9uIGdldEZvcm1Eb21Qcm9wcyAoKSB7XG4gICAgY29uc3QgbW9kZWwgPSBwcm9wcy5tb2RlbFZhbHVlXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgZHQgPSAnRGF0YVRyYW5zZmVyJyBpbiB3aW5kb3dcbiAgICAgICAgPyBuZXcgRGF0YVRyYW5zZmVyKClcbiAgICAgICAgOiAoJ0NsaXBib2FyZEV2ZW50JyBpbiB3aW5kb3dcbiAgICAgICAgICAgID8gbmV3IENsaXBib2FyZEV2ZW50KCcnKS5jbGlwYm9hcmREYXRhXG4gICAgICAgICAgICA6IHZvaWQgMFxuICAgICAgICAgIClcblxuICAgICAgaWYgKE9iamVjdChtb2RlbCkgPT09IG1vZGVsKSB7XG4gICAgICAgICgnbGVuZ3RoJyBpbiBtb2RlbFxuICAgICAgICAgID8gQXJyYXkuZnJvbShtb2RlbClcbiAgICAgICAgICA6IFsgbW9kZWwgXVxuICAgICAgICApLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICAgICAgZHQuaXRlbXMuYWRkKGZpbGUpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGVzOiBkdC5maWxlc1xuICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZmlsZXM6IHZvaWQgMFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0eXBlR3VhcmQgPT09IHRydWVcbiAgICA/IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGlmIChwcm9wcy50eXBlICE9PSAnZmlsZScpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBnZXRGb3JtRG9tUHJvcHMoKVxuICAgIH0pXG4gICAgOiBjb21wdXRlZChnZXRGb3JtRG9tUHJvcHMpXG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi8uLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5jb25zdCBpc0phcGFuZXNlID0gL1tcXHUzMDAwLVxcdTMwM2ZcXHUzMDQwLVxcdTMwOWZcXHUzMGEwLVxcdTMwZmZcXHVmZjAwLVxcdWZmOWZcXHU0ZTAwLVxcdTlmYWZcXHUzNDAwLVxcdTRkYmZdL1xuY29uc3QgaXNDaGluZXNlID0gL1tcXHU0ZTAwLVxcdTlmZmZcXHUzNDAwLVxcdTRkYmZcXHV7MjAwMDB9LVxcdXsyYTZkZn1cXHV7MmE3MDB9LVxcdXsyYjczZn1cXHV7MmI3NDB9LVxcdXsyYjgxZn1cXHV7MmI4MjB9LVxcdXsyY2VhZn1cXHVmOTAwLVxcdWZhZmZcXHUzMzAwLVxcdTMzZmZcXHVmZTMwLVxcdWZlNGZcXHVmOTAwLVxcdWZhZmZcXHV7MmY4MDB9LVxcdXsyZmExZn1dL3VcbmNvbnN0IGlzS29yZWFuID0gL1tcXHUzMTMxLVxcdTMxNGVcXHUzMTRmLVxcdTMxNjNcXHVhYzAwLVxcdWQ3YTNdL1xuY29uc3QgaXNQbGFpblRleHQgPSAvW2EtejAtOV8gLV0kL2lcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9uSW5wdXQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uQ29tcG9zaXRpb24gKGUpIHtcbiAgICBpZiAoZS50eXBlID09PSAnY29tcG9zaXRpb25lbmQnIHx8IGUudHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgIGlmIChlLnRhcmdldC5xQ29tcG9zaW5nICE9PSB0cnVlKSB7IHJldHVybiB9XG4gICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gZmFsc2VcbiAgICAgIG9uSW5wdXQoZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBlLnR5cGUgPT09ICdjb21wb3NpdGlvbnVwZGF0ZSdcbiAgICAgICYmIGUudGFyZ2V0LnFDb21wb3NpbmcgIT09IHRydWVcbiAgICAgICYmIHR5cGVvZiBlLmRhdGEgPT09ICdzdHJpbmcnXG4gICAgKSB7XG4gICAgICBjb25zdCBpc0NvbXBvc2luZyA9IGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlXG4gICAgICAgID8gaXNQbGFpblRleHQudGVzdChlLmRhdGEpID09PSBmYWxzZVxuICAgICAgICA6IGlzSmFwYW5lc2UudGVzdChlLmRhdGEpID09PSB0cnVlIHx8IGlzQ2hpbmVzZS50ZXN0KGUuZGF0YSkgPT09IHRydWUgfHwgaXNLb3JlYW4udGVzdChlLmRhdGEpID09PSB0cnVlXG5cbiAgICAgIGlmIChpc0NvbXBvc2luZyA9PT0gdHJ1ZSkge1xuICAgICAgICBlLnRhcmdldC5xQ29tcG9zaW5nID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCBuZXh0VGljaywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRmllbGQsIHsgdXNlRmllbGRTdGF0ZSwgdXNlRmllbGRQcm9wcywgdXNlRmllbGRFbWl0cywgZmllbGRWYWx1ZUlzRmlsbGVkIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZmllbGQuanMnXG5pbXBvcnQgdXNlTWFzaywgeyB1c2VNYXNrUHJvcHMgfSBmcm9tICcuL3VzZS1tYXNrLmpzJ1xuaW1wb3J0IHsgdXNlRm9ybVByb3BzLCB1c2VGb3JtSW5wdXROYW1lQXR0ciB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5pbXBvcnQgdXNlRmlsZUZvcm1Eb21Qcm9wcyBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1maWxlLWRvbS1wcm9wcy5qcydcbmltcG9ydCB1c2VLZXlDb21wb3NpdGlvbiBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1rZXktY29tcG9zaXRpb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgc3RvcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJbnB1dCcsXG5cbiAgaW5oZXJpdEF0dHJzOiBmYWxzZSxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUZpZWxkUHJvcHMsXG4gICAgLi4udXNlTWFza1Byb3BzLFxuICAgIC4uLnVzZUZvcm1Qcm9wcyxcblxuICAgIG1vZGVsVmFsdWU6IHsgcmVxdWlyZWQ6IGZhbHNlIH0sXG5cbiAgICBzaGFkb3dUZXh0OiBTdHJpbmcsXG5cbiAgICB0eXBlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAndGV4dCdcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIGF1dG9ncm93OiBCb29sZWFuLCAvLyBtYWtlcyBhIHRleHRhcmVhXG5cbiAgICBpbnB1dENsYXNzOiBbIEFycmF5LCBTdHJpbmcsIE9iamVjdCBdLFxuICAgIGlucHV0U3R5bGU6IFsgQXJyYXksIFN0cmluZywgT2JqZWN0IF1cbiAgfSxcblxuICBlbWl0czogW1xuICAgIC4uLnVzZUZpZWxkRW1pdHMsXG4gICAgJ3Bhc3RlJywgJ2NoYW5nZSdcbiAgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHRlbXAgPSB7fVxuICAgIGxldCBlbWl0Q2FjaGVkVmFsdWUgPSBOYU4sIHR5cGVkTnVtYmVyLCBzdG9wVmFsdWVXYXRjaGVyLCBlbWl0VGltZXIsIGVtaXRWYWx1ZUZuXG5cbiAgICBjb25zdCBpbnB1dFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IG5hbWVQcm9wID0gdXNlRm9ybUlucHV0TmFtZUF0dHIocHJvcHMpXG5cbiAgICBjb25zdCB7XG4gICAgICBpbm5lclZhbHVlLFxuICAgICAgaGFzTWFzayxcbiAgICAgIG1vdmVDdXJzb3JGb3JQYXN0ZSxcbiAgICAgIHVwZGF0ZU1hc2tWYWx1ZSxcbiAgICAgIG9uTWFza2VkS2V5ZG93blxuICAgIH0gPSB1c2VNYXNrKHByb3BzLCBlbWl0LCBlbWl0VmFsdWUsIGlucHV0UmVmKVxuXG4gICAgY29uc3QgZm9ybURvbVByb3BzID0gdXNlRmlsZUZvcm1Eb21Qcm9wcyhwcm9wcywgLyogdHlwZSBndWFyZCAqLyB0cnVlKVxuICAgIGNvbnN0IGhhc1ZhbHVlID0gY29tcHV0ZWQoKCkgPT4gZmllbGRWYWx1ZUlzRmlsbGVkKGlubmVyVmFsdWUudmFsdWUpKVxuXG4gICAgY29uc3Qgb25Db21wb3NpdGlvbiA9IHVzZUtleUNvbXBvc2l0aW9uKG9uSW5wdXQpXG5cbiAgICBjb25zdCBzdGF0ZSA9IHVzZUZpZWxkU3RhdGUoKVxuXG4gICAgY29uc3QgaXNUZXh0YXJlYSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy50eXBlID09PSAndGV4dGFyZWEnIHx8IHByb3BzLmF1dG9ncm93ID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaXNUeXBlVGV4dCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlXG4gICAgICB8fCBbICd0ZXh0JywgJ3NlYXJjaCcsICd1cmwnLCAndGVsJywgJ3Bhc3N3b3JkJyBdLmluY2x1ZGVzKHByb3BzLnR5cGUpXG4gICAgKVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBldnQgPSB7XG4gICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMubGlzdGVuZXJzLnZhbHVlLFxuICAgICAgICBvbklucHV0LFxuICAgICAgICBvblBhc3RlLFxuICAgICAgICAvLyBTYWZhcmkgPCAxMC4yICYgVUlXZWJWaWV3IGRvZXNuJ3QgZmlyZSBjb21wb3NpdGlvbmVuZCB3aGVuXG4gICAgICAgIC8vIHN3aXRjaGluZyBmb2N1cyBiZWZvcmUgY29uZmlybWluZyBjb21wb3NpdGlvbiBjaG9pY2VcbiAgICAgICAgLy8gdGhpcyBhbHNvIGZpeGVzIHRoZSBpc3N1ZSB3aGVyZSBzb21lIGJyb3dzZXJzIGUuZy4gaU9TIENocm9tZVxuICAgICAgICAvLyBmaXJlcyBcImNoYW5nZVwiIGluc3RlYWQgb2YgXCJpbnB1dFwiIG9uIGF1dG9jb21wbGV0ZS5cbiAgICAgICAgb25DaGFuZ2UsXG4gICAgICAgIG9uQmx1cjogb25GaW5pc2hFZGl0aW5nLFxuICAgICAgICBvbkZvY3VzOiBzdG9wXG4gICAgICB9XG5cbiAgICAgIGV2dC5vbkNvbXBvc2l0aW9uc3RhcnQgPSBldnQub25Db21wb3NpdGlvbnVwZGF0ZSA9IGV2dC5vbkNvbXBvc2l0aW9uZW5kID0gb25Db21wb3NpdGlvblxuXG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBldnQub25LZXlkb3duID0gb25NYXNrZWRLZXlkb3duXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBldnQub25BbmltYXRpb25lbmQgPSBhZGp1c3RIZWlnaHRcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV2dFxuICAgIH0pXG5cbiAgICBjb25zdCBpbnB1dEF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYXR0cnMgPSB7XG4gICAgICAgIHRhYmluZGV4OiAwLFxuICAgICAgICAnZGF0YS1hdXRvZm9jdXMnOiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgfHwgdm9pZCAwLFxuICAgICAgICByb3dzOiBwcm9wcy50eXBlID09PSAndGV4dGFyZWEnID8gNiA6IHZvaWQgMCxcbiAgICAgICAgJ2FyaWEtbGFiZWwnOiBwcm9wcy5sYWJlbCxcbiAgICAgICAgbmFtZTogbmFtZVByb3AudmFsdWUsXG4gICAgICAgIC4uLnN0YXRlLnNwbGl0QXR0cnMuYXR0cmlidXRlcy52YWx1ZSxcbiAgICAgICAgaWQ6IHN0YXRlLnRhcmdldFVpZC52YWx1ZSxcbiAgICAgICAgbWF4bGVuZ3RoOiBwcm9wcy5tYXhsZW5ndGgsXG4gICAgICAgIGRpc2FibGVkOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlLFxuICAgICAgICByZWFkb25seTogcHJvcHMucmVhZG9ubHkgPT09IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKGlzVGV4dGFyZWEudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGF0dHJzLnR5cGUgPSBwcm9wcy50eXBlXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSkge1xuICAgICAgICBhdHRycy5yb3dzID0gMVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXR0cnNcbiAgICB9KVxuXG4gICAgLy8gc29tZSBicm93c2VycyBsb3NlIHRoZSBuYXRpdmUgaW5wdXQgdmFsdWVcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHJlYXR0YWNoIGl0IGR5bmFtaWNhbGx5XG4gICAgLy8gKGxpa2UgdHlwZT1cInBhc3N3b3JkXCIgPC0+IHR5cGU9XCJ0ZXh0XCI7IHNlZSAjMTIwNzgpXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMudHlwZSwgKCkgPT4ge1xuICAgICAgaWYgKGlucHV0UmVmLnZhbHVlKSB7XG4gICAgICAgIGlucHV0UmVmLnZhbHVlLnZhbHVlID0gcHJvcHMubW9kZWxWYWx1ZVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCB2ID0+IHtcbiAgICAgIGlmIChoYXNNYXNrLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGlmIChzdG9wVmFsdWVXYXRjaGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgc3RvcFZhbHVlV2F0Y2hlciA9IGZhbHNlXG5cbiAgICAgICAgICBpZiAoU3RyaW5nKHYpID09PSBlbWl0Q2FjaGVkVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU1hc2tWYWx1ZSh2KVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdikge1xuICAgICAgICBpbm5lclZhbHVlLnZhbHVlID0gdlxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwcm9wcy50eXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgICYmIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHR5cGVkTnVtYmVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0eXBlZE51bWJlciA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIHRlbXAudmFsdWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gdGV4dGFyZWEgb25seVxuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5hdXRvZ3JvdywgdmFsID0+IHtcbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIGlmICh2YWwgPT09IHRydWUpIHtcbiAgICAgICAgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgICAgfVxuICAgICAgLy8gaWYgaXQgaGFzIGEgbnVtYmVyIG9mIHJvd3Mgc2V0IHJlc3BlY3QgaXRcbiAgICAgIGVsc2UgaWYgKGlucHV0UmVmLnZhbHVlICE9PSBudWxsICYmIGF0dHJzLnJvd3MgPiAwKSB7XG4gICAgICAgIGlucHV0UmVmLnZhbHVlLnN0eWxlLmhlaWdodCA9ICdhdXRvJ1xuICAgICAgfVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5kZW5zZSwgKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b2dyb3cgPT09IHRydWUgJiYgbmV4dFRpY2soYWRqdXN0SGVpZ2h0KVxuICAgIH0pXG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgIGlmIChcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbFxuICAgICAgICAgICYmIGlucHV0UmVmLnZhbHVlICE9PSBlbFxuICAgICAgICAgICYmIChlbCA9PT0gbnVsbCB8fCBlbC5pZCAhPT0gc3RhdGUudGFyZ2V0VWlkLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBpbnB1dFJlZi52YWx1ZS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZWxlY3QgKCkge1xuICAgICAgaW5wdXRSZWYudmFsdWUgIT09IG51bGwgJiYgaW5wdXRSZWYudmFsdWUuc2VsZWN0KClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblBhc3RlIChlKSB7XG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlcnNlRmlsbE1hc2sgIT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgaW5wID0gZS50YXJnZXRcbiAgICAgICAgbW92ZUN1cnNvckZvclBhc3RlKGlucCwgaW5wLnNlbGVjdGlvblN0YXJ0LCBpbnAuc2VsZWN0aW9uRW5kKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdwYXN0ZScsIGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25JbnB1dCAoZSkge1xuICAgICAgaWYgKCFlIHx8ICFlLnRhcmdldCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdmaWxlJykge1xuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIGUudGFyZ2V0LmZpbGVzKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsID0gZS50YXJnZXQudmFsdWVcblxuICAgICAgaWYgKGUudGFyZ2V0LnFDb21wb3NpbmcgPT09IHRydWUpIHtcbiAgICAgICAgdGVtcC52YWx1ZSA9IHZhbFxuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBpZiAoaGFzTWFzay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICB1cGRhdGVNYXNrVmFsdWUodmFsLCBmYWxzZSwgZS5pbnB1dFR5cGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlKHZhbClcblxuICAgICAgICBpZiAoaXNUeXBlVGV4dC52YWx1ZSA9PT0gdHJ1ZSAmJiBlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgIGNvbnN0IHsgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCB9ID0gZS50YXJnZXRcblxuICAgICAgICAgIGlmIChzZWxlY3Rpb25TdGFydCAhPT0gdm9pZCAwICYmIHNlbGVjdGlvbkVuZCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiB2YWwuaW5kZXhPZihlLnRhcmdldC52YWx1ZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zZXRTZWxlY3Rpb25SYW5nZShzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHRyaWdnZXIgaXQgaW1tZWRpYXRlbHkgdG9vLFxuICAgICAgLy8gdG8gYXZvaWQgXCJmbGlja2VyaW5nXCJcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdFZhbHVlICh2YWwsIHN0b3BXYXRjaGVyKSB7XG4gICAgICBlbWl0VmFsdWVGbiA9ICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3BzLnR5cGUgIT09ICdudW1iZXInXG4gICAgICAgICAgJiYgdGVtcC5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA9PT0gdHJ1ZVxuICAgICAgICApIHtcbiAgICAgICAgICBkZWxldGUgdGVtcC52YWx1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgIT09IHZhbCAmJiBlbWl0Q2FjaGVkVmFsdWUgIT09IHZhbCkge1xuICAgICAgICAgIGVtaXRDYWNoZWRWYWx1ZSA9IHZhbFxuXG4gICAgICAgICAgc3RvcFdhdGNoZXIgPT09IHRydWUgJiYgKHN0b3BWYWx1ZVdhdGNoZXIgPSB0cnVlKVxuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsKVxuXG4gICAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgICAgZW1pdENhY2hlZFZhbHVlID09PSB2YWwgJiYgKGVtaXRDYWNoZWRWYWx1ZSA9IE5hTilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgZW1pdFZhbHVlRm4gPSB2b2lkIDBcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnR5cGUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHR5cGVkTnVtYmVyID0gdHJ1ZVxuICAgICAgICB0ZW1wLnZhbHVlID0gdmFsXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5kZWJvdW5jZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChlbWl0VGltZXIpXG4gICAgICAgIHRlbXAudmFsdWUgPSB2YWxcbiAgICAgICAgZW1pdFRpbWVyID0gc2V0VGltZW91dChlbWl0VmFsdWVGbiwgcHJvcHMuZGVib3VuY2UpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZW1pdFZhbHVlRm4oKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICBmdW5jdGlvbiBhZGp1c3RIZWlnaHQgKCkge1xuICAgICAgY29uc3QgaW5wID0gaW5wdXRSZWYudmFsdWVcbiAgICAgIGlmIChpbnAgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgcGFyZW50U3R5bGUgPSBpbnAucGFyZW50Tm9kZS5zdHlsZVxuICAgICAgICBjb25zdCB7IG92ZXJmbG93IH0gPSBpbnAuc3R5bGVcblxuICAgICAgICAvLyByZXNldCBoZWlnaHQgb2YgdGV4dGFyZWEgdG8gYSBzbWFsbCBzaXplIHRvIGRldGVjdCB0aGUgcmVhbCBoZWlnaHRcbiAgICAgICAgLy8gYnV0IGtlZXAgdGhlIHRvdGFsIGNvbnRyb2wgc2l6ZSB0aGUgc2FtZVxuICAgICAgICBwYXJlbnRTdHlsZS5tYXJnaW5Cb3R0b20gPSAoaW5wLnNjcm9sbEhlaWdodCAtIDEpICsgJ3B4J1xuICAgICAgICBpbnAuc3R5bGUuaGVpZ2h0ID0gJzFweCdcbiAgICAgICAgaW5wLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbidcblxuICAgICAgICBpbnAuc3R5bGUuaGVpZ2h0ID0gaW5wLnNjcm9sbEhlaWdodCArICdweCdcbiAgICAgICAgaW5wLnN0eWxlLm92ZXJmbG93ID0gb3ZlcmZsb3dcbiAgICAgICAgcGFyZW50U3R5bGUubWFyZ2luQm90dG9tID0gJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNoYW5nZSAoZSkge1xuICAgICAgb25Db21wb3NpdGlvbihlKVxuXG4gICAgICBjbGVhclRpbWVvdXQoZW1pdFRpbWVyKVxuICAgICAgZW1pdFZhbHVlRm4gIT09IHZvaWQgMCAmJiBlbWl0VmFsdWVGbigpXG5cbiAgICAgIGVtaXQoJ2NoYW5nZScsIGUudGFyZ2V0LnZhbHVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRmluaXNoRWRpdGluZyAoZSkge1xuICAgICAgZSAhPT0gdm9pZCAwICYmIHN0b3AoZSlcblxuICAgICAgY2xlYXJUaW1lb3V0KGVtaXRUaW1lcilcbiAgICAgIGVtaXRWYWx1ZUZuICE9PSB2b2lkIDAgJiYgZW1pdFZhbHVlRm4oKVxuXG4gICAgICB0eXBlZE51bWJlciA9IGZhbHNlXG4gICAgICBzdG9wVmFsdWVXYXRjaGVyID0gZmFsc2VcbiAgICAgIGRlbGV0ZSB0ZW1wLnZhbHVlXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gdXNlIHNldFRpbWVvdXQgaW5zdGVhZCBvZiB0aGlzLiRuZXh0VGlja1xuICAgICAgLy8gdG8gYXZvaWQgYSBidWcgd2hlcmUgZm9jdXNvdXQgaXMgbm90IGVtaXR0ZWQgZm9yIHR5cGUgZGF0ZS90aW1lL3dlZWsvLi4uXG4gICAgICBwcm9wcy50eXBlICE9PSAnZmlsZScgJiYgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChpbnB1dFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlucHV0UmVmLnZhbHVlLnZhbHVlID0gaW5uZXJWYWx1ZS52YWx1ZSAhPT0gdm9pZCAwID8gaW5uZXJWYWx1ZS52YWx1ZSA6ICcnXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q3VyVmFsdWUgKCkge1xuICAgICAgcmV0dXJuIHRlbXAuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgPT09IHRydWVcbiAgICAgICAgPyB0ZW1wLnZhbHVlXG4gICAgICAgIDogKGlubmVyVmFsdWUudmFsdWUgIT09IHZvaWQgMCA/IGlubmVyVmFsdWUudmFsdWUgOiAnJylcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgb25GaW5pc2hFZGl0aW5nKClcbiAgICB9KVxuXG4gICAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAgIC8vIHRleHRhcmVhIG9ubHlcbiAgICAgIHByb3BzLmF1dG9ncm93ID09PSB0cnVlICYmIGFkanVzdEhlaWdodCgpXG4gICAgfSlcblxuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtcbiAgICAgIGlubmVyVmFsdWUsXG5cbiAgICAgIGZpZWxkQ2xhc3M6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIGBxLSR7IGlzVGV4dGFyZWEudmFsdWUgPT09IHRydWUgPyAndGV4dGFyZWEnIDogJ2lucHV0JyB9YFxuICAgICAgICArIChwcm9wcy5hdXRvZ3JvdyA9PT0gdHJ1ZSA/ICcgcS10ZXh0YXJlYS0tYXV0b2dyb3cnIDogJycpXG4gICAgICApLFxuXG4gICAgICBoYXNTaGFkb3c6IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIHByb3BzLnR5cGUgIT09ICdmaWxlJ1xuICAgICAgICAmJiB0eXBlb2YgcHJvcHMuc2hhZG93VGV4dCA9PT0gJ3N0cmluZydcbiAgICAgICAgJiYgcHJvcHMuc2hhZG93VGV4dC5sZW5ndGggPiAwXG4gICAgICApLFxuXG4gICAgICBpbnB1dFJlZixcblxuICAgICAgZW1pdFZhbHVlLFxuXG4gICAgICBoYXNWYWx1ZSxcblxuICAgICAgZmxvYXRpbmdMYWJlbDogY29tcHV0ZWQoKCkgPT5cbiAgICAgICAgaGFzVmFsdWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgfHwgZmllbGRWYWx1ZUlzRmlsbGVkKHByb3BzLmRpc3BsYXlWYWx1ZSlcbiAgICAgICksXG5cbiAgICAgIGdldENvbnRyb2w6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIGgoaXNUZXh0YXJlYS52YWx1ZSA9PT0gdHJ1ZSA/ICd0ZXh0YXJlYScgOiAnaW5wdXQnLCB7XG4gICAgICAgICAgcmVmOiBpbnB1dFJlZixcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgJ3EtZmllbGRfX25hdGl2ZSBxLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgIHByb3BzLmlucHV0Q2xhc3NcbiAgICAgICAgICBdLFxuICAgICAgICAgIHN0eWxlOiBwcm9wcy5pbnB1dFN0eWxlLFxuICAgICAgICAgIC4uLmlucHV0QXR0cnMudmFsdWUsXG4gICAgICAgICAgLi4ub25FdmVudHMudmFsdWUsXG4gICAgICAgICAgLi4uKFxuICAgICAgICAgICAgcHJvcHMudHlwZSAhPT0gJ2ZpbGUnXG4gICAgICAgICAgICAgID8geyB2YWx1ZTogZ2V0Q3VyVmFsdWUoKSB9XG4gICAgICAgICAgICAgIDogZm9ybURvbVByb3BzLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgZ2V0U2hhZG93Q29udHJvbDogKCkgPT4ge1xuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1maWVsZF9fbmF0aXZlIHEtZmllbGRfX3NoYWRvdyBhYnNvbHV0ZS1ib3R0b20gbm8tcG9pbnRlci1ldmVudHMnXG4gICAgICAgICAgICArIChpc1RleHRhcmVhLnZhbHVlID09PSB0cnVlID8gJycgOiAnIHRleHQtbm8td3JhcCcpXG4gICAgICAgIH0sIFtcbiAgICAgICAgICBoKCdzcGFuJywgeyBjbGFzczogJ2ludmlzaWJsZScgfSwgZ2V0Q3VyVmFsdWUoKSksXG4gICAgICAgICAgaCgnc3BhbicsIHByb3BzLnNoYWRvd1RleHQpXG4gICAgICAgIF0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHJlbmRlckZuID0gdXNlRmllbGQoc3RhdGUpXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgZm9jdXMsXG4gICAgICBzZWxlY3QsXG4gICAgICBnZXROYXRpdmVFbGVtZW50OiAoKSA9PiBpbnB1dFJlZi52YWx1ZVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVuZGVyRm5cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCByZWYgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgcm9vdFJlZikge1xuICBjb25zdCByZWZvY3VzUmVmID0gcmVmKG51bGwpXG5cbiAgY29uc3QgcmVmb2N1c1RhcmdldEVsID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHJldHVybiBoKCdzcGFuJywge1xuICAgICAgcmVmOiByZWZvY3VzUmVmLFxuICAgICAgY2xhc3M6ICduby1vdXRsaW5lJyxcbiAgICAgIHRhYmluZGV4OiAtMVxuICAgIH0pXG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVmb2N1c1RhcmdldCAoZSkge1xuICAgIGNvbnN0IHJvb3QgPSByb290UmVmLnZhbHVlXG5cbiAgICBpZiAoZSAhPT0gdm9pZCAwICYmIGUudHlwZS5pbmRleE9mKCdrZXknKSA9PT0gMCkge1xuICAgICAgaWYgKFxuICAgICAgICByb290ICE9PSBudWxsXG4gICAgICAgICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHJvb3RcbiAgICAgICAgJiYgcm9vdC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIHJvb3QuZm9jdXMoKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHJlZm9jdXNSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICYmIChlID09PSB2b2lkIDAgfHwgKHJvb3QgIT09IG51bGwgJiYgcm9vdC5jb250YWlucyhlLnRhcmdldCkgPT09IHRydWUpKVxuICAgICkge1xuICAgICAgcmVmb2N1c1JlZi52YWx1ZS5mb2N1cygpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZWZvY3VzVGFyZ2V0RWwsXG4gICAgcmVmb2N1c1RhcmdldFxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIHhzOiAzMCxcbiAgc206IDM1LFxuICBtZDogNDAsXG4gIGxnOiA1MCxcbiAgeGw6IDYwXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UsIHRvUmF3IH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB1c2VSZWZvY3VzVGFyZ2V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJlZm9jdXMtdGFyZ2V0LmpzJ1xuaW1wb3J0IHsgdXNlRm9ybUluamVjdCwgdXNlRm9ybVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcydcblxuaW1wb3J0IG9wdGlvblNpemVzIGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvb3B0aW9uLXNpemVzLmpzJ1xuaW1wb3J0IHsgc3RvcEFuZFByZXZlbnQgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGhTbG90LCBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBjb25zdCB1c2VDaGVja2JveFByb3BzID0ge1xuICAuLi51c2VEYXJrUHJvcHMsXG4gIC4uLnVzZVNpemVQcm9wcyxcbiAgLi4udXNlRm9ybVByb3BzLFxuXG4gIG1vZGVsVmFsdWU6IHtcbiAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHZhbDoge30sXG5cbiAgdHJ1ZVZhbHVlOiB7IGRlZmF1bHQ6IHRydWUgfSxcbiAgZmFsc2VWYWx1ZTogeyBkZWZhdWx0OiBmYWxzZSB9LFxuICBpbmRldGVybWluYXRlVmFsdWU6IHsgZGVmYXVsdDogbnVsbCB9LFxuXG4gIGNoZWNrZWRJY29uOiBTdHJpbmcsXG4gIHVuY2hlY2tlZEljb246IFN0cmluZyxcbiAgaW5kZXRlcm1pbmF0ZUljb246IFN0cmluZyxcblxuICB0b2dnbGVPcmRlcjoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA9PT0gJ3RmJyB8fCB2ID09PSAnZnQnXG4gIH0sXG4gIHRvZ2dsZUluZGV0ZXJtaW5hdGU6IEJvb2xlYW4sXG5cbiAgbGFiZWw6IFN0cmluZyxcbiAgbGVmdExhYmVsOiBCb29sZWFuLFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGtlZXBDb2xvcjogQm9vbGVhbixcbiAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgZGlzYWJsZTogQm9vbGVhbixcbiAgdGFiaW5kZXg6IFsgU3RyaW5nLCBOdW1iZXIgXVxufVxuXG5leHBvcnQgY29uc3QgdXNlQ2hlY2tib3hFbWl0cyA9IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICh0eXBlLCBnZXRJbm5lcikge1xuICBjb25zdCB7IHByb3BzLCBzbG90cywgZW1pdCwgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICBjb25zdCB7IHJlZm9jdXNUYXJnZXRFbCwgcmVmb2N1c1RhcmdldCB9ID0gdXNlUmVmb2N1c1RhcmdldChwcm9wcywgcm9vdFJlZilcbiAgY29uc3Qgc2l6ZVN0eWxlID0gdXNlU2l6ZShwcm9wcywgb3B0aW9uU2l6ZXMpXG5cbiAgY29uc3QgbW9kZWxJc0FycmF5ID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy52YWwgIT09IHZvaWQgMCAmJiBBcnJheS5pc0FycmF5KHByb3BzLm1vZGVsVmFsdWUpXG4gIClcblxuICBjb25zdCBpbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCB2YWwgPSB0b1Jhdyhwcm9wcy52YWwpXG4gICAgcmV0dXJuIG1vZGVsSXNBcnJheS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlLmZpbmRJbmRleChvcHQgPT4gdG9SYXcob3B0KSA9PT0gdmFsKVxuICAgICAgOiAtMVxuICB9KVxuXG4gIGNvbnN0IGlzVHJ1ZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgID8gaW5kZXgudmFsdWUgPiAtMVxuICAgICAgOiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMudHJ1ZVZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGlzRmFsc2UgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgbW9kZWxJc0FycmF5LnZhbHVlID09PSB0cnVlXG4gICAgICA/IGluZGV4LnZhbHVlID09PSAtMVxuICAgICAgOiB0b1Jhdyhwcm9wcy5tb2RlbFZhbHVlKSA9PT0gdG9SYXcocHJvcHMuZmFsc2VWYWx1ZSlcbiAgKSlcblxuICBjb25zdCBpc0luZGV0ZXJtaW5hdGUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGlzVHJ1ZS52YWx1ZSA9PT0gZmFsc2UgJiYgaXNGYWxzZS52YWx1ZSA9PT0gZmFsc2VcbiAgKVxuXG4gIGNvbnN0IHRhYmluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAtMSA6IHByb3BzLnRhYmluZGV4IHx8IDBcbiAgKSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICBgcS0keyB0eXBlIH0gY3Vyc29yLXBvaW50ZXIgbm8tb3V0bGluZSByb3cgaW5saW5lIG5vLXdyYXAgaXRlbXMtY2VudGVyYFxuICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcnKVxuICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/IGAgcS0keyB0eXBlIH0tLWRhcmtgIDogJycpXG4gICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyBgIHEtJHsgdHlwZSB9LS1kZW5zZWAgOiAnJylcbiAgICArIChwcm9wcy5sZWZ0TGFiZWwgPT09IHRydWUgPyAnIHJldmVyc2UnIDogJycpXG4gIClcblxuICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ3RydXRoeScgOiAoaXNGYWxzZS52YWx1ZSA9PT0gdHJ1ZSA/ICdmYWxzeScgOiAnaW5kZXQnKVxuICAgIGNvbnN0IGNvbG9yID0gcHJvcHMuY29sb3IgIT09IHZvaWQgMCAmJiAoXG4gICAgICBwcm9wcy5rZWVwQ29sb3IgPT09IHRydWVcbiAgICAgIHx8ICh0eXBlID09PSAndG9nZ2xlJyA/IGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSA6IGlzRmFsc2UudmFsdWUgIT09IHRydWUpXG4gICAgKVxuICAgICAgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWBcbiAgICAgIDogJydcblxuICAgIHJldHVybiBgcS0keyB0eXBlIH1fX2lubmVyIHJlbGF0aXZlLXBvc2l0aW9uIG5vbi1zZWxlY3RhYmxlIHEtJHsgdHlwZSB9X19pbm5lci0tJHsgc3RhdGUgfSR7IGNvbG9yIH1gXG4gIH0pXG5cbiAgY29uc3QgZm9ybUF0dHJzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IHByb3AgPSB7IHR5cGU6ICdjaGVja2JveCcgfVxuXG4gICAgcHJvcHMubmFtZSAhPT0gdm9pZCAwICYmIE9iamVjdC5hc3NpZ24ocHJvcCwge1xuICAgICAgJ15jaGVja2VkJzogaXNUcnVlLnZhbHVlID09PSB0cnVlID8gJ2NoZWNrZWQnIDogdm9pZCAwLFxuICAgICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICAgIHZhbHVlOiBtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy52YWxcbiAgICAgICAgOiBwcm9wcy50cnVlVmFsdWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIHByb3BcbiAgfSlcblxuICBjb25zdCBpbmplY3RGb3JtSW5wdXQgPSB1c2VGb3JtSW5qZWN0KGZvcm1BdHRycylcblxuICBjb25zdCBhdHRyaWJ1dGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGF0dHJzID0ge1xuICAgICAgdGFiaW5kZXg6IHRhYmluZGV4LnZhbHVlLFxuICAgICAgcm9sZTogJ2NoZWNrYm94JyxcbiAgICAgICdhcmlhLWxhYmVsJzogcHJvcHMubGFiZWwsXG4gICAgICAnYXJpYS1jaGVja2VkJzogaXNJbmRldGVybWluYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJ21peGVkJ1xuICAgICAgICA6IChpc1RydWUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnKVxuICAgIH1cblxuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICBhdHRyc1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICByZXR1cm4gYXR0cnNcbiAgfSlcblxuICBmdW5jdGlvbiBvbkNsaWNrIChlKSB7XG4gICAgaWYgKGUgIT09IHZvaWQgMCkge1xuICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgIHJlZm9jdXNUYXJnZXQoZSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBnZXROZXh0VmFsdWUoKSwgZSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXROZXh0VmFsdWUgKCkge1xuICAgIGlmIChtb2RlbElzQXJyYXkudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChpc1RydWUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgdmFsID0gcHJvcHMubW9kZWxWYWx1ZS5zbGljZSgpXG4gICAgICAgIHZhbC5zcGxpY2UoaW5kZXgudmFsdWUsIDEpXG4gICAgICAgIHJldHVybiB2YWxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByb3BzLm1vZGVsVmFsdWUuY29uY2F0KFsgcHJvcHMudmFsIF0pXG4gICAgfVxuXG4gICAgaWYgKGlzVHJ1ZS52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzLnRvZ2dsZU9yZGVyICE9PSAnZnQnIHx8IHByb3BzLnRvZ2dsZUluZGV0ZXJtaW5hdGUgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybiBwcm9wcy5mYWxzZVZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzRmFsc2UudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9wcy50b2dnbGVPcmRlciA9PT0gJ2Z0JyB8fCBwcm9wcy50b2dnbGVJbmRldGVybWluYXRlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gcHJvcHMudHJ1ZVZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuIHByb3BzLnRvZ2dsZU9yZGVyICE9PSAnZnQnXG4gICAgICAgID8gcHJvcHMudHJ1ZVZhbHVlXG4gICAgICAgIDogcHJvcHMuZmFsc2VWYWx1ZVxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5pbmRldGVybWluYXRlVmFsdWVcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93biAoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25LZXl1cCAoZSkge1xuICAgIGlmIChlLmtleUNvZGUgPT09IDEzIHx8IGUua2V5Q29kZSA9PT0gMzIpIHtcbiAgICAgIG9uQ2xpY2soZSlcbiAgICB9XG4gIH1cblxuICBjb25zdCBnZXRJbm5lckNvbnRlbnQgPSBnZXRJbm5lcihpc1RydWUsIGlzSW5kZXRlcm1pbmF0ZSlcblxuICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgT2JqZWN0LmFzc2lnbihwcm94eSwgeyB0b2dnbGU6IG9uQ2xpY2sgfSlcblxuICByZXR1cm4gKCkgPT4ge1xuICAgIGNvbnN0IGlubmVyID0gZ2V0SW5uZXJDb250ZW50KClcblxuICAgIHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgaW5qZWN0Rm9ybUlucHV0KFxuICAgICAgaW5uZXIsXG4gICAgICAndW5zaGlmdCcsXG4gICAgICBgIHEtJHsgdHlwZSB9X19uYXRpdmUgYWJzb2x1dGUgcS1tYS1ub25lIHEtcGEtbm9uZWBcbiAgICApXG5cbiAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGlubmVyQ2xhc3MudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWVcbiAgICAgIH0sIGlubmVyKVxuICAgIF1cblxuICAgIGlmIChyZWZvY3VzVGFyZ2V0RWwudmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGNoaWxkLnB1c2gocmVmb2N1c1RhcmdldEVsLnZhbHVlKVxuICAgIH1cblxuICAgIGNvbnN0IGxhYmVsID0gcHJvcHMubGFiZWwgIT09IHZvaWQgMFxuICAgICAgPyBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFsgcHJvcHMubGFiZWwgXSlcbiAgICAgIDogaFNsb3Qoc2xvdHMuZGVmYXVsdClcblxuICAgIGxhYmVsICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGBxLSR7IHR5cGUgfV9fbGFiZWwgcS1hbmNob3ItLXNraXBgXG4gICAgICB9LCBsYWJlbClcbiAgICApXG5cbiAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAuLi5hdHRyaWJ1dGVzLnZhbHVlLFxuICAgICAgb25DbGljayxcbiAgICAgIG9uS2V5ZG93bixcbiAgICAgIG9uS2V5dXBcbiAgICB9LCBjaGlsZClcbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VDaGVja2JveCwgeyB1c2VDaGVja2JveFByb3BzLCB1c2VDaGVja2JveEVtaXRzIH0gZnJvbSAnLi91c2UtY2hlY2tib3guanMnXG5cbmNvbnN0IGJnTm9kZSA9IGgoJ2RpdicsIHtcbiAga2V5OiAnc3ZnJyxcbiAgY2xhc3M6ICdxLWNoZWNrYm94X19iZyBhYnNvbHV0ZSdcbn0sIFtcbiAgaCgnc3ZnJywge1xuICAgIGNsYXNzOiAncS1jaGVja2JveF9fc3ZnIGZpdCBhYnNvbHV0ZS1mdWxsJyxcbiAgICB2aWV3Qm94OiAnMCAwIDI0IDI0JyxcbiAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgfSwgW1xuICAgIGgoJ3BhdGgnLCB7XG4gICAgICBjbGFzczogJ3EtY2hlY2tib3hfX3RydXRoeScsXG4gICAgICBmaWxsOiAnbm9uZScsXG4gICAgICBkOiAnTTEuNzMsMTIuOTEgOC4xLDE5LjI4IDIyLjc5LDQuNTknXG4gICAgfSksXG5cbiAgICBoKCdwYXRoJywge1xuICAgICAgY2xhc3M6ICdxLWNoZWNrYm94X19pbmRldCcsXG4gICAgICBkOiAnTTQsMTRIMjBWMTBINCdcbiAgICB9KVxuICBdKVxuXSlcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDaGVja2JveCcsXG5cbiAgcHJvcHM6IHVzZUNoZWNrYm94UHJvcHMsXG4gIGVtaXRzOiB1c2VDaGVja2JveEVtaXRzLFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGZ1bmN0aW9uIGdldElubmVyIChpc1RydWUsIGlzSW5kZXRlcm1pbmF0ZSkge1xuICAgICAgY29uc3QgaWNvbiA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAgIChpc1RydWUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/IHByb3BzLmNoZWNrZWRJY29uXG4gICAgICAgICAgOiAoaXNJbmRldGVybWluYXRlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgID8gcHJvcHMuaW5kZXRlcm1pbmF0ZUljb25cbiAgICAgICAgICAgICAgOiBwcm9wcy51bmNoZWNrZWRJY29uXG4gICAgICAgICAgICApXG4gICAgICAgICkgfHwgbnVsbFxuICAgICAgKVxuXG4gICAgICByZXR1cm4gKCkgPT4gKFxuICAgICAgICBpY29uLnZhbHVlICE9PSBudWxsXG4gICAgICAgICAgPyBbXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdpY29uJyxcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtY2hlY2tib3hfX2ljb24tY29udGFpbmVyIGFic29sdXRlLWZ1bGwgZmxleCBmbGV4LWNlbnRlciBuby13cmFwJ1xuICAgICAgICAgICAgICB9LCBbXG4gICAgICAgICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgICAgICAgY2xhc3M6ICdxLWNoZWNrYm94X19pY29uJyxcbiAgICAgICAgICAgICAgICAgIG5hbWU6IGljb24udmFsdWVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIDogWyBiZ05vZGUgXVxuICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiB1c2VDaGVja2JveCgnY2hlY2tib3gnLCBnZXRJbm5lcilcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIHJlZiwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIG9uTW91bnRlZCwgZ2V0Q3VycmVudEluc3RhbmNlLCBuZXh0VGljaywgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgYWRkRm9jdXNGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvZm9jdXMtbWFuYWdlci5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBmb3JtS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUZvcm0nLFxuXG4gIHByb3BzOiB7XG4gICAgYXV0b2ZvY3VzOiBCb29sZWFuLFxuICAgIG5vRXJyb3JGb2N1czogQm9vbGVhbixcbiAgICBub1Jlc2V0Rm9jdXM6IEJvb2xlYW4sXG4gICAgZ3JlZWR5OiBCb29sZWFuLFxuXG4gICAgb25TdWJtaXQ6IEZ1bmN0aW9uXG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3Jlc2V0JywgJ3ZhbGlkYXRpb24tc3VjY2VzcycsICd2YWxpZGF0aW9uLWVycm9yJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIGxldCB2YWxpZGF0ZUluZGV4ID0gMFxuICAgIGNvbnN0IHJlZ2lzdGVyZWRDb21wb25lbnRzID0gW11cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlIChzaG91bGRGb2N1cykge1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSBbXVxuICAgICAgY29uc3QgZm9jdXMgPSB0eXBlb2Ygc2hvdWxkRm9jdXMgPT09ICdib29sZWFuJ1xuICAgICAgICA/IHNob3VsZEZvY3VzXG4gICAgICAgIDogcHJvcHMubm9FcnJvckZvY3VzICE9PSB0cnVlXG5cbiAgICAgIGNvbnN0IGluZGV4ID0gKyt2YWxpZGF0ZUluZGV4XG5cbiAgICAgIGNvbnN0IGVtaXRFdmVudCA9IChyZXMsIHJlZikgPT4ge1xuICAgICAgICBlbWl0KCd2YWxpZGF0aW9uLScgKyAocmVzID09PSB0cnVlID8gJ3N1Y2Nlc3MnIDogJ2Vycm9yJyksIHJlZilcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWdpc3RlcmVkQ29tcG9uZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjb21wID0gcmVnaXN0ZXJlZENvbXBvbmVudHNbIGkgXVxuICAgICAgICBjb25zdCB2YWxpZCA9IGNvbXAudmFsaWRhdGUoKVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWQudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHByb21pc2VzLnB1c2goXG4gICAgICAgICAgICB2YWxpZC50aGVuKFxuICAgICAgICAgICAgICB2YWxpZCA9PiAoeyB2YWxpZCwgY29tcCB9KSxcbiAgICAgICAgICAgICAgZXJyID0+ICh7IHZhbGlkOiBmYWxzZSwgY29tcCwgZXJyIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbGlkICE9PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKHByb3BzLmdyZWVkeSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGVtaXRFdmVudChmYWxzZSwgY29tcClcblxuICAgICAgICAgICAgaWYgKGZvY3VzID09PSB0cnVlICYmIHR5cGVvZiBjb21wLmZvY3VzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNvbXAuZm9jdXMoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHByb21pc2VzLnB1c2goeyB2YWxpZDogZmFsc2UsIGNvbXAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvbWlzZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGVtaXRFdmVudCh0cnVlKVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zdCBlcnJvcnMgPSByZXMuZmlsdGVyKHIgPT4gci52YWxpZCAhPT0gdHJ1ZSlcblxuICAgICAgICBpZiAoZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIGVtaXRFdmVudCh0cnVlKVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB7IHZhbGlkLCBjb21wLCBlcnIgfSA9IGVycm9yc1sgMCBdXG5cbiAgICAgICAgLy8gaWYgbm90IG91dGRhdGVkIGFscmVhZHlcbiAgICAgICAgaWYgKGluZGV4ID09PSB2YWxpZGF0ZUluZGV4KSB7XG4gICAgICAgICAgZXJyICE9PSB2b2lkIDAgJiYgY29uc29sZS5lcnJvcihlcnIpXG5cbiAgICAgICAgICBlbWl0RXZlbnQoZmFsc2UsIGNvbXApXG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBmb2N1cyA9PT0gdHJ1ZVxuICAgICAgICAgICAgJiYgdmFsaWQgIT09IHRydWVcbiAgICAgICAgICAgICYmIHR5cGVvZiBjb21wLmZvY3VzID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjb21wLmZvY3VzKClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uICgpIHtcbiAgICAgIHZhbGlkYXRlSW5kZXgrK1xuXG4gICAgICByZWdpc3RlcmVkQ29tcG9uZW50cy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgICB0eXBlb2YgY29tcC5yZXNldFZhbGlkYXRpb24gPT09ICdmdW5jdGlvbicgJiYgY29tcC5yZXNldFZhbGlkYXRpb24oKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdWJtaXQgKGV2dCkge1xuICAgICAgZXZ0ICE9PSB2b2lkIDAgJiYgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICBjb25zdCBpbmRleCA9IHZhbGlkYXRlSW5kZXggKyAxXG5cbiAgICAgIHZhbGlkYXRlKCkudGhlbih2YWwgPT4ge1xuICAgICAgICAvLyBpZiBub3Qgb3V0ZGF0ZWQgJiYgdmFsaWRhdGlvbiBzdWNjZWVkZWRcbiAgICAgICAgaWYgKGluZGV4ID09PSB2YWxpZGF0ZUluZGV4ICYmIHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChwcm9wcy5vblN1Ym1pdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBlbWl0KCdzdWJtaXQnLCBldnQpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGV2dCAhPT0gdm9pZCAwICYmIGV2dC50YXJnZXQgIT09IHZvaWQgMCAmJiB0eXBlb2YgZXZ0LnRhcmdldC5zdWJtaXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGV2dC50YXJnZXQuc3VibWl0KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXQgKGV2dCkge1xuICAgICAgZXZ0ICE9PSB2b2lkIDAgJiYgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICBlbWl0KCdyZXNldCcpXG5cbiAgICAgIG5leHRUaWNrKCgpID0+IHsgLy8gYWxsb3cgdXNlcmxhbmQgdG8gcmVzZXQgdmFsdWVzIGJlZm9yZVxuICAgICAgICByZXNldFZhbGlkYXRpb24oKVxuICAgICAgICBpZiAocHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIHByb3BzLm5vUmVzZXRGb2N1cyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIGZvY3VzKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmb2N1cyAoKSB7XG4gICAgICBhZGRGb2N1c0ZuKCgpID0+IHtcbiAgICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgICBjb25zdCB0YXJnZXQgPSByb290UmVmLnZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdLCBbZGF0YS1hdXRvZm9jdXNdJylcbiAgICAgICAgICB8fCBBcnJheS5wcm90b3R5cGUuZmluZC5jYWxsKHJvb3RSZWYudmFsdWUucXVlcnlTZWxlY3RvckFsbCgnW3RhYmluZGV4XScpLCBlbCA9PiBlbC50YWJJbmRleCA+IC0xKVxuXG4gICAgICAgIHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQgIT09IHZvaWQgMCAmJiB0YXJnZXQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHByb3ZpZGUoZm9ybUtleSwge1xuICAgICAgYmluZENvbXBvbmVudCAodm1Qcm94eSkge1xuICAgICAgICByZWdpc3RlcmVkQ29tcG9uZW50cy5wdXNoKHZtUHJveHkpXG4gICAgICB9LFxuXG4gICAgICB1bmJpbmRDb21wb25lbnQgKHZtUHJveHkpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSByZWdpc3RlcmVkQ29tcG9uZW50cy5pbmRleE9mKHZtUHJveHkpXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgcmVnaXN0ZXJlZENvbXBvbmVudHMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGxldCBzaG91bGRBY3RpdmF0ZSA9IGZhbHNlXG5cbiAgICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIHNob3VsZEFjdGl2YXRlID0gdHJ1ZVxuICAgIH0pXG5cbiAgICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBzaG91bGRBY3RpdmF0ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5hdXRvZm9jdXMgPT09IHRydWUgJiYgZm9jdXMoKVxuICAgIH0pXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcHJvcHMuYXV0b2ZvY3VzID09PSB0cnVlICYmIGZvY3VzKClcbiAgICB9KVxuXG4gICAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gICAgT2JqZWN0LmFzc2lnbih2bS5wcm94eSwge1xuICAgICAgdmFsaWRhdGUsXG4gICAgICByZXNldFZhbGlkYXRpb24sXG4gICAgICBzdWJtaXQsXG4gICAgICByZXNldCxcbiAgICAgIGZvY3VzLFxuICAgICAgZ2V0VmFsaWRhdGlvbkNvbXBvbmVudHM6ICgpID0+IHJlZ2lzdGVyZWRDb21wb25lbnRzXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdmb3JtJywge1xuICAgICAgY2xhc3M6ICdxLWZvcm0nLFxuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgb25TdWJtaXQ6IHN1Ym1pdCxcbiAgICAgIG9uUmVzZXQ6IHJlc2V0XG4gICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBpbmplY3QgfSBmcm9tICd2dWUnXG5pbXBvcnQgeyBxdWFzYXJLZXkgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbi8qKlxuICogUmV0dXJucyB0aGUgJHEgaW5zdGFuY2UuXG4gKiBFcXVpdmFsZW50IHRvIGB0aGlzLiRxYCBpbnNpZGUgdGVtcGxhdGVzLlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1c2VRdWFzYXIgKCkge1xuICByZXR1cm4gaW5qZWN0KHF1YXNhcktleSlcbn1cbiIsIi8vIHRvIHZhbGlkYXRlIGFuIGVtYWlsXHJcblxyXG5mdW5jdGlvbiB2YWxpZGF0ZUVtYWlsIChlbWFpbCkge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG4gIGNvbnN0IHJlZyA9ICAvXigoW148PigpXFxbXFxdXFxcXC4sOzpcXHNAXCJdKyhcXC5bXjw+KClcXFtcXF1cXFxcLiw7Olxcc0BcIl0rKSopfChcIi4rXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31dKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17MiwyNH0pKSQvXHJcbiAgcmV0dXJuIHJlZy50ZXN0KGVtYWlsKVxyXG59XHJcblxyXG5leHBvcnQgeyB2YWxpZGF0ZUVtYWlsIH1cclxuIiwiPHRlbXBsYXRlPlxyXG4gIDxwLXBhZ2UgZmxleCBmbGV4LWNlbnRlcj5cclxuICAgIDxkaXYgOmNsYXNzPVwiZGl2TWFyZ2luXCI+XHJcbiAgICAgIDxxLWZvcm1cclxuICAgICAgQHJlc2V0PVwib25SZXNldFwiXHJcbiAgICAgIGNsYXNzPVwicS1ndXR0ZXItc21cIj5cclxuICAgICAgPGltZ1xyXG4gICAgICAgIHNyYz1cIn5hc3NldHMvbG9nby5wbmdcIlxyXG4gICAgICAgIHNwaW5uZXItY29sb3I9XCJ3aGl0ZVwiXHJcbiAgICAgICAgY2xhc3M9XCJmdWxsLXdpZHRoXCJcclxuICAgICAgLz5cclxuICAgICAgPGg0Pnt7JHQoJ2xvZ2luLnRpdGxlJyl9fTwvaDQ+XHJcbiAgICAgIDxxLWlucHV0XHJcbiAgICAgICAgcmVmPVwiZW1haWxcIlxyXG4gICAgICAgIHYtbW9kZWw9XCJsb2dpbkZvcm0uZW1haWxcIlxyXG4gICAgICAgIDpsYWJlbD1cIiR0KCdsb2dpbi5lbWFpbCcpXCJcclxuICAgICAgICA6ZGlzYWJsZT0gaXNEaXNhYmxlZFxyXG4gICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgdHlwZT1cImVtYWlsXCJcclxuICAgICAgICBib3R0b20tc2xvdHNcclxuICAgICAgICBAYmx1cj1cInVwZGF0ZUVtYWlsVmVyaWZpY2F0aW9uXCJcclxuICAgICAgICBhdXRvZm9jdXNcclxuICAgICAgICA6ZXJyb3I9XCJzaG93RXJyb3JcIlxyXG4gICAgICAgIDplcnJvci1tZXNzYWdlPVwiJHQoJ2xvZ2luLmVudGVyX3ZhbGlkX2VtYWlsJylcIj5cclxuICAgICAgPC9xLWlucHV0PlxyXG4gICAgICA8cS1pbnB1dFxyXG4gICAgICAgIG91dGxpbmVkXHJcbiAgICAgICAgOmRpc2FibGUgPSAhZW1haWxWYWxpZFxyXG4gICAgICAgIHYtbW9kZWw9XCJsb2dpbkZvcm0ucGFzc3dvcmRcIlxyXG4gICAgICAgIDpsYWJlbD1cIiR0KCdsb2dpbi5wYXNzd29yZCcpXCJcclxuICAgICAgICA6dHlwZT1cImlucHV0VHlwZVwiXHJcbiAgICAgICAgQGtleXVwLmVudGVyPVwibG9naW4oKTsgJGV2ZW50LnRhcmdldC5ibHVyKClcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHRlbXBsYXRlIHYtc2xvdDphcHBlbmQ+XHJcbiAgICAgICAgICA8cS1pY29uXHJcbiAgICAgICAgICAgIDpuYW1lPVwiaWNvblZpc2liaWxpdHlcIlxyXG4gICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcclxuICAgICAgICAgICAgQGNsaWNrPVwiY2hhbmdlSW5wdXRUeXBlXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC90ZW1wbGF0ZT5cclxuICAgICAgPC9xLWlucHV0PlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxxLWNoZWNrYm94XHJcbiAgICAgICAgOmRpc2FibGU9ICFlbWFpbFZhbGlkXHJcbiAgICAgICAgdi1tb2RlbD1cImxvZ2luRm9ybS5yZW1lbWJlclwiXHJcbiAgICAgICAgOmxhYmVsPVwiJHQoJ2xvZ2luLnJlbWVtYmVyX21lJylcIiAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInEtcGEtbWRcIj5cclxuICAgICAgICA8cS1idG5cclxuICAgICAgICAgIHVuZWxldmF0ZWRcclxuICAgICAgICAgIHJvdW5kZWRcclxuICAgICAgICAgIDpsb2FkaW5nID0gbG9hZGluZ1xyXG4gICAgICAgICAgOmRpc2FibGUgPSAhcGFzc3dvcmRWYWxpZFxyXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCJcclxuICAgICAgICAgIDpsYWJlbD0gXCIkdCgnbG9naW4uYWN0aW9uX2xvZ2luJylcIlxyXG4gICAgICAgICAgOnJpcHBsZT1cInsgY2VudGVyOiB0cnVlIH1cIlxyXG4gICAgICAgICAgOmNsYXNzPSBcImJ1dHRvbkNsYXNzXCJcclxuICAgICAgICAgIG5vLWNhcHNcclxuICAgICAgICAgIEBjbGljaz1cIm9uU3VibWl0XCIvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPC9xLWZvcm0+XHJcbiAgICA8L2Rpdj5cclxuICA8L3AtcGFnZT5cclxuXHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyB1c2VRdWFzYXIgfSBmcm9tICdxdWFzYXInXHJcbmltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tICdzcmMvdXRpbHMvZW1haWwnXHJcbmltcG9ydCB7IGF1dGggfSBmcm9tICdzcmMvc2VydmljZXMvYXV0aFNlcnZpY2UnXHJcbmltcG9ydCB7IHNob3dOb3RpZmljYXRpb24gfSBmcm9tICdzcmMvdXRpbHMvbm90aWZpY2F0aW9uJ1xyXG5pbXBvcnQgeyB1c2VBdXRoU3RvcmUgfSBmcm9tICdzdG9yZXMvYXV0aCdcclxuXHJcbmNvbnN0IHN0b3JlQXV0aCA9IHVzZUF1dGhTdG9yZSgpXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgc2V0dXAgKCkge1xyXG4gICAgY29uc3QgJHEgPSB1c2VRdWFzYXIoKVxyXG4gICAgcmV0dXJuICRxXHJcbiAgfSxcclxuICBjb21wdXRlZDoge1xyXG4gICAgYnV0dG9uQ2xhc3MgKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy4kcS5zY3JlZW4ubHQubWQgPyAnZnVsbC13aWR0aCBxLXBhLW1kJyA6ICdxLXB4LXhsJ1xyXG4gICAgfSxcclxuICAgIGljb25WaXNpYmlsaXR5ICgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMubG9naW5Gb3JtLmlzUHdkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5J1xyXG4gICAgfSxcclxuICAgIGlucHV0VHlwZSAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmxvZ2luRm9ybS5pc1B3ZCA/ICdwYXNzd29yZCcgOiAndGV4dCdcclxuICAgIH0sXHJcbiAgICBkaXZNYXJnaW4gKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy4kcS5zY3JlZW4ubHQubWQgPyAnJyA6ICdxLXB5LXhsIHEtbXkteGwnXHJcbiAgICB9LFxyXG4gICAgZW1haWxWYWxpZCAoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmlzRGlzYWJsZWQgPyBmYWxzZSA6IHZhbGlkYXRlRW1haWwodGhpcy5sb2dpbkZvcm0uZW1haWwpXHJcbiAgICB9LFxyXG4gICAgcGFzc3dvcmRWYWxpZCAoKSB7XHJcbiAgICAgIGlmICh0aGlzLmlzRGlzYWJsZWQpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5lbWFpbFZhbGlkICYmIHRoaXMubG9naW5Gb3JtLnBhc3N3b3JkICE9PSAnJykge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgfSxcclxuICBkYXRhICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxvZ2luRm9ybToge1xyXG4gICAgICAgIGVtYWlsOiAndXNlckB1c2VyLmNvbScsXHJcbiAgICAgICAgaXNQd2Q6IHRydWUsXHJcbiAgICAgICAgcGFzc3dvcmQ6ICcqdXNlcjEyMycsXHJcbiAgICAgICAgcmVtZW1iZXI6IGZhbHNlXHJcbiAgICAgIH0sXHJcbiAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICBpc0Rpc2FibGVkOiBmYWxzZVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgbWV0aG9kczoge1xyXG4gICAgY2hhbmdlSW5wdXRUeXBlICgpIHtcclxuICAgICAgdGhpcy5sb2dpbkZvcm0uaXNQd2QgPSAhdGhpcy5sb2dpbkZvcm0uaXNQd2RcclxuICAgIH0sXHJcbiAgICB1cGRhdGVFbWFpbFZlcmlmaWNhdGlvbiAoKSB7XHJcbiAgICAgIGlmICh2YWxpZGF0ZUVtYWlsKHRoaXMubG9naW5Gb3JtLmVtYWlsKSkge1xyXG4gICAgICAgIHRoaXMuc2hvd0Vycm9yID0gZmFsc2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNob3dFcnJvciA9IHRydWVcclxuICAgICAgICB0aGlzLmxvZ2luRm9ybS5wYXNzd29yZCA9ICcnXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBvblN1Ym1pdCAoKSB7XHJcbiAgICAgIHRoaXMubG9hZGluZyA9IHRydWVcclxuICAgICAgdGhpcy5pc0Rpc2FibGVkID0gdHJ1ZVxyXG4gICAgICBhd2FpdCBhdXRoLmxvZ2luKHtcclxuICAgICAgICBlbWFpbDogdGhpcy5sb2dpbkZvcm0uZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHRoaXMubG9naW5Gb3JtLnBhc3N3b3JkXHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBpZiAoc3RvcmVBdXRoLmlzQXV0aGVudGljYXRlZCkge1xyXG4gICAgICAgIHNob3dOb3RpZmljYXRpb24oJ3Bvc2l0aXZlJywgdGhpcy4kdCgnbG9naW4ud2VsY29tZScpKVxyXG4gICAgICAgIHRoaXMuJHJvdXRlci5wdXNoKHsgcGF0aDogJy9kYXNoYm9hcmQnIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcclxuICAgICAgICB0aGlzLmlzRGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMubG9naW5Gb3JtLnBhc3N3b3JkID0gJydcclxuICAgICAgICBzaG93Tm90aWZpY2F0aW9uKCduZWdhdGl2ZScsIHRoaXMuJHQoJ2xvZ2luLmVycm9yJykpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBvblJlc2V0ICgpIHt9XHJcbiAgfVxyXG59XHJcbjwvc2NyaXB0PlxyXG4iXSwibmFtZXMiOlsiYXR0cnMiLCJmb2N1cyIsInJlZiIsInZhbGlkIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7OztBQUllLFNBQVEsYUFBRSxFQUFFLFVBQVUsaUJBQWlCLGlCQUFp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
