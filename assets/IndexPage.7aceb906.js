import { j as createComponent, c as computed, h, m as hSlot, i as inject, g as getCurrentInstance, a5 as layoutKey, al as pageContainerKey, _ as _export_sfc, an as defineComponent, n as openBlock, S as createBlock, U as withCtx, q as createBaseVNode } from "./index.e6710fc9.js";
import { _ as _imports_0 } from "./logo.73be8f37.js";
var QPage = createComponent({
  name: "QPage",
  props: {
    padding: Boolean,
    styleFn: Function
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey);
    inject(pageContainerKey, () => {
      console.error("QPage needs to be child of QPageContainer");
    });
    const style = computed(() => {
      const offset = ($layout.header.space === true ? $layout.header.size : 0) + ($layout.footer.space === true ? $layout.footer.size : 0);
      if (typeof props.styleFn === "function") {
        const height = $layout.isContainer.value === true ? $layout.containerHeight.value : $q.screen.height;
        return props.styleFn(offset, height);
      }
      return {
        minHeight: $layout.isContainer.value === true ? $layout.containerHeight.value - offset + "px" : $q.screen.height === 0 ? offset !== 0 ? `calc(100vh - ${offset}px)` : "100vh" : $q.screen.height - offset + "px"
      };
    });
    const classes = computed(
      () => `q-page ${props.padding === true ? " q-layout-padding" : ""}`
    );
    return () => h("main", {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
const _sfc_main = defineComponent({
  name: "IndexPage"
});
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("img", {
  alt: "Quasar logo",
  src: _imports_0
}, null, -1);
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "flex flex-center" }, {
    default: withCtx(() => [
      _hoisted_1
    ]),
    _: 1
  });
}
var IndexPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "IndexPage.vue"]]);
export { IndexPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5kZXhQYWdlLjdhY2ViOTA2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3BhZ2UvUVBhZ2UuanMiLCIuLi8uLi8uLi9zcmMvcGFnZXMvSW5kZXhQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IHBhZ2VDb250YWluZXJLZXksIGxheW91dEtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FQYWdlJyxcblxuICBwcm9wczoge1xuICAgIHBhZGRpbmc6IEJvb2xlYW4sXG4gICAgc3R5bGVGbjogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5KVxuICAgIGluamVjdChwYWdlQ29udGFpbmVyS2V5LCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRUGFnZSBuZWVkcyB0byBiZSBjaGlsZCBvZiBRUGFnZUNvbnRhaW5lcicpXG4gICAgfSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0XG4gICAgICAgID0gKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlID8gJGxheW91dC5oZWFkZXIuc2l6ZSA6IDApXG4gICAgICAgICsgKCRsYXlvdXQuZm9vdGVyLnNwYWNlID09PSB0cnVlID8gJGxheW91dC5mb290ZXIuc2l6ZSA6IDApXG5cbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuc3R5bGVGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjb25zdCBoZWlnaHQgPSAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAkbGF5b3V0LmNvbnRhaW5lckhlaWdodC52YWx1ZVxuICAgICAgICAgIDogJHEuc2NyZWVuLmhlaWdodFxuXG4gICAgICAgIHJldHVybiBwcm9wcy5zdHlsZUZuKG9mZnNldCwgaGVpZ2h0KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBtaW5IZWlnaHQ6ICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWVcbiAgICAgICAgICA/ICgkbGF5b3V0LmNvbnRhaW5lckhlaWdodC52YWx1ZSAtIG9mZnNldCkgKyAncHgnXG4gICAgICAgICAgOiAoXG4gICAgICAgICAgICAgICRxLnNjcmVlbi5oZWlnaHQgPT09IDBcbiAgICAgICAgICAgICAgICA/IChvZmZzZXQgIT09IDAgPyBgY2FsYygxMDB2aCAtICR7IG9mZnNldCB9cHgpYCA6ICcxMDB2aCcpXG4gICAgICAgICAgICAgICAgOiAoJHEuc2NyZWVuLmhlaWdodCAtIG9mZnNldCkgKyAncHgnXG4gICAgICAgICAgICApXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtcGFnZSAkeyBwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxheW91dC1wYWRkaW5nJyA6ICcnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ21haW4nLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiPHRlbXBsYXRlPlxyXG4gIDxxLXBhZ2UgY2xhc3M9XCJmbGV4IGZsZXgtY2VudGVyXCI+XHJcbiAgICA8aW1nXHJcbiAgICAgIGFsdD1cIlF1YXNhciBsb2dvXCJcclxuICAgICAgc3JjPVwifmFzc2V0cy9sb2dvLnBuZ1wiXHJcbiAgICA+XHJcbiAgPC9xLXBhZ2U+XHJcbjwvdGVtcGxhdGU+XHJcblxyXG48c2NyaXB0PlxyXG5pbXBvcnQgeyBkZWZpbmVDb21wb25lbnQgfSBmcm9tICd2dWUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xyXG4gIG5hbWU6ICdJbmRleFBhZ2UnXHJcbn0pXHJcbjwvc2NyaXB0PlxyXG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVCbG9jayJdLCJtYXBwaW5ncyI6Ijs7QUFNQSxJQUFBLFFBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsU0FBUztBQUFBLElBQ1QsU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFJLEVBQUEsSUFBSyxtQkFBb0I7QUFFOUMsVUFBTSxVQUFVLE9BQU8sU0FBUztBQUNoQyxXQUFPLGtCQUFrQixNQUFNO0FBQzdCLGNBQVEsTUFBTSwyQ0FBMkM7QUFBQSxJQUMvRCxDQUFLO0FBRUQsVUFBTSxRQUFRLFNBQVMsTUFBTTtBQUMzQixZQUFNLFVBQ0QsUUFBUSxPQUFPLFVBQVUsT0FBTyxRQUFRLE9BQU8sT0FBTyxNQUN0RCxRQUFRLE9BQU8sVUFBVSxPQUFPLFFBQVEsT0FBTyxPQUFPO0FBRTNELFVBQUksT0FBTyxNQUFNLFlBQVksWUFBWTtBQUN2QyxjQUFNLFNBQVMsUUFBUSxZQUFZLFVBQVUsT0FDekMsUUFBUSxnQkFBZ0IsUUFDeEIsR0FBRyxPQUFPO0FBRWQsZUFBTyxNQUFNLFFBQVEsUUFBUSxNQUFNO0FBQUEsTUFDcEM7QUFFRCxhQUFPO0FBQUEsUUFDTCxXQUFXLFFBQVEsWUFBWSxVQUFVLE9BQ3BDLFFBQVEsZ0JBQWdCLFFBQVEsU0FBVSxPQUV6QyxHQUFHLE9BQU8sV0FBVyxJQUNoQixXQUFXLElBQUksZ0JBQWlCLGNBQWUsVUFDL0MsR0FBRyxPQUFPLFNBQVMsU0FBVTtBQUFBLE1BRXpDO0FBQUEsSUFDUCxDQUFLO0FBRUQsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixVQUFXLE1BQU0sWUFBWSxPQUFPLHNCQUFzQjtBQUFBLElBQzNEO0FBRUQsV0FBTyxNQUFNLEVBQUUsUUFBUTtBQUFBLE1BQ3JCLE9BQU8sUUFBUTtBQUFBLE1BQ2YsT0FBTyxNQUFNO0FBQUEsSUFDbkIsR0FBTyxNQUFNLE1BQU0sT0FBTyxDQUFDO0FBQUEsRUFDeEI7QUFDSCxDQUFDO0FDM0NELE1BQUssWUFBYSxnQkFBYTtBQUFBLEVBQzdCLE1BQU07QUFDUixDQUFDO21CQVpHQSxnQ0FHQyxPQUFBO0FBQUEsRUFGQyxLQUFJO0FBQUEsRUFDSixLQUFBOzs7c0JBSEpDLFlBS1MsT0FBQSxFQUFBLE9BQUEsc0JBTHVCO0FBQUEscUJBQzlCLE1BR0M7QUFBQSxNQUhEO0FBQUE7Ozs7OzsifQ==
