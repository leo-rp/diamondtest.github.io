import{$ as Fe,a0 as xt,j as P,c as m,h as L,m as A,r as x,G as nt,o as j,C as Y,k as F,a1 as Te,g as D,a2 as O,w as k,a3 as it,i as $e,a4 as ue,a5 as Tt,a6 as $t,a7 as Et,B as Ee,a8 as Ae,a9 as Bt,K as V,aa as zt,ab as Pt,ac as Vt,ad as Ot,ae as oe,af as pe,H as Ne,L as ge,ag as Se,ah as be,ai as at,aj as Ie,O as lt,ak as Mt,al as ne,a as Dt,M as Ht,am as rt,_ as Be,n as X,S as Z,U as T,d as S,I as ut,an as Qt,ao as ze,V as Rt,s as ye,X as Ue,p as Wt,ap as Ft,F as At,q as st,aq as Nt,ar as It}from"./index.384f0cb8.js";import{u as Pe,a as Ve,b as ie,c as Xe,s as Ut}from"./notification.7da49d14.js";import{_ as Xt}from"./logo.73be8f37.js";import"./axios.f4a588ad.js";const jt=[null,document,document.body,document.scrollingElement,document.documentElement];function Yt(e,o){let i=xt(o);if(i===void 0){if(e==null)return window;i=e.closest(".scroll,.scroll-y,.overflow-auto")}return jt.includes(i)?window:i}function ct(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function dt(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let ae;function we(){if(ae!==void 0)return ae;const e=document.createElement("p"),o=document.createElement("div");Fe(e,{width:"100%",height:"200px"}),Fe(o,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),o.appendChild(e),document.body.appendChild(o);const i=e.offsetWidth;o.style.overflow="scroll";let l=e.offsetWidth;return i===l&&(l=o.clientWidth),o.remove(),ae=i-l,ae}function Kt(e,o=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:o?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}var Gt=P({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:o}){const i=m(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>L("div",{class:i.value},A(o.default))}}),Jt=P({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:o}){const i=m(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>L("div",{class:i.value},A(o.default))}});function Zt(){const e=x(!nt.value);return e.value===!1&&j(()=>{e.value=!0}),e}const ft=typeof ResizeObserver!="undefined",je=ft===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var xe=P({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:o}){let i=null,l,t={width:-1,height:-1};function a(c){c===!0||e.debounce===0||e.debounce==="0"?s():i===null&&(i=setTimeout(s,e.debounce))}function s(){if(clearTimeout(i),i=null,l){const{offsetWidth:c,offsetHeight:n}=l;(c!==t.width||n!==t.height)&&(t={width:c,height:n},o("resize",t))}}const v=D();if(Object.assign(v.proxy,{trigger:a}),ft===!0){let c;return j(()=>{Y(()=>{l=v.proxy.$el.parentNode,l&&(c=new ResizeObserver(a),c.observe(l),s())})}),F(()=>{clearTimeout(i),c!==void 0&&(c.disconnect!==void 0?c.disconnect():l&&c.unobserve(l))}),Te}else{let w=function(){clearTimeout(i),n!==void 0&&(n.removeEventListener!==void 0&&n.removeEventListener("resize",a,O.passive),n=void 0)},g=function(){w(),l&&l.contentDocument&&(n=l.contentDocument.defaultView,n.addEventListener("resize",a,O.passive),s())};const c=Zt();let n;return j(()=>{Y(()=>{l=v.proxy.$el,l&&g()})}),F(w),()=>{if(c.value===!0)return L("object",{style:je.style,tabindex:-1,type:"text/html",data:je.url,"aria-hidden":"true",onLoad:g})}}}}),eo=P({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:o,emit:i}){const{proxy:{$q:l}}=D(),t=$e(ue,()=>{console.error("QHeader needs to be child of QLayout")}),a=x(parseInt(e.heightHint,10)),s=x(!0),v=m(()=>e.reveal===!0||t.view.value.indexOf("H")>-1||l.platform.is.ios&&t.isContainer.value===!0),c=m(()=>{if(e.modelValue!==!0)return 0;if(v.value===!0)return s.value===!0?a.value:0;const u=a.value-t.scroll.value.position;return u>0?u:0}),n=m(()=>e.modelValue!==!0||v.value===!0&&s.value!==!0),w=m(()=>e.modelValue===!0&&n.value===!0&&e.reveal===!0),g=m(()=>"q-header q-layout__section--marginal "+(v.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(n.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),b=m(()=>{const u=t.rows.value.top,C={};return u[0]==="l"&&t.left.space===!0&&(C[l.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),u[2]==="r"&&t.right.space===!0&&(C[l.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),C});function d(u,C){t.update("header",u,C)}function p(u,C){u.value!==C&&(u.value=C)}function _({height:u}){p(a,u),d("size",u)}function y(u){w.value===!0&&p(s,!0),i("focusin",u)}k(()=>e.modelValue,u=>{d("space",u),p(s,!0),t.animate()}),k(c,u=>{d("offset",u)}),k(()=>e.reveal,u=>{u===!1&&p(s,e.modelValue)}),k(s,u=>{t.animate(),i("reveal",u)}),k(t.scroll,u=>{e.reveal===!0&&p(s,u.direction==="up"||u.position<=e.revealOffset||u.position-u.inflectionPoint<100)});const E={};return t.instances.header=E,e.modelValue===!0&&d("size",a.value),d("space",e.modelValue),d("offset",c.value),F(()=>{t.instances.header===E&&(t.instances.header=void 0,d("size",0),d("offset",0),d("space",!1))}),()=>{const u=it(o.default,[]);return e.elevated===!0&&u.push(L("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),u.push(L(xe,{debounce:0,onResize:_})),L("header",{class:g.value,style:b.value,onFocusin:y},u)}}}),Oe=P({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:o}){const i=m(()=>parseInt(e.lines,10)),l=m(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(i.value===1?" ellipsis":"")),t=m(()=>e.lines!==void 0&&i.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":i.value}:null);return()=>L("div",{style:t.value,class:l.value},A(o.default))}}),Me=P({name:"QItem",props:{...Pe,...Tt,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:o,emit:i}){const{proxy:{$q:l}}=D(),t=Ve(e,l),{hasRouterLink:a,hasLink:s,linkProps:v,linkClass:c,linkTag:n,navigateToRouterLink:w}=$t(),g=x(null),b=x(null),d=m(()=>e.clickable===!0||s.value===!0||e.tag==="label"),p=m(()=>e.disable!==!0&&d.value===!0),_=m(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(t.value===!0?" q-item--dark":"")+(s.value===!0&&e.active===null?c.value:e.active===!0?`${e.activeClass!==void 0?` ${e.activeClass}`:""} q-item--active`:"")+(e.disable===!0?" disabled":"")+(p.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),y=m(()=>{if(e.insetLevel===void 0)return null;const f=l.lang.rtl===!0?"Right":"Left";return{["padding"+f]:16+e.insetLevel*56+"px"}});function E(f){p.value===!0&&(b.value!==null&&(f.qKeyEvent!==!0&&document.activeElement===g.value?b.value.focus():document.activeElement===b.value&&g.value.focus()),a.value===!0&&w(f),i("click",f))}function u(f){if(p.value===!0&&Et(f,13)===!0){Ee(f),f.qKeyEvent=!0;const q=new MouseEvent("click",f);q.qKeyEvent=!0,g.value.dispatchEvent(q)}i("keyup",f)}function C(){const f=it(o.default,[]);return p.value===!0&&f.unshift(L("div",{class:"q-focus-helper",tabindex:-1,ref:b})),f}return()=>{const f={ref:g,class:_.value,style:y.value,onClick:E,onKeyup:u};return p.value===!0?(f.tabindex=e.tabindex||"0",Object.assign(f,v.value)):d.value===!0&&(f["aria-disabled"]="true"),L(n.value,f,C())}}}),to=P({name:"QList",props:{...Pe,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean},setup(e,{slots:o}){const i=D(),l=Ve(e,i.proxy.$q),t=m(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(l.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>L("div",{class:t.value},A(o.default))}});function oo(e,o,i){let l;function t(){l!==void 0&&(Ae.remove(l),l=void 0)}return F(()=>{e.value===!0&&t()}),{removeFromHistory:t,addToHistory(){l={condition:()=>i.value===!0,handler:o},Ae.add(l)}}}const no={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},io=["before-show","show","before-hide","hide"];function ao({showing:e,canShow:o,hideOnRouteChange:i,handleShow:l,handleHide:t,processOnMount:a}){const s=D(),{props:v,emit:c,proxy:n}=s;let w;function g(u){e.value===!0?p(u):b(u)}function b(u){if(v.disable===!0||u!==void 0&&u.qAnchorHandled===!0||o!==void 0&&o(u)!==!0)return;const C=v["onUpdate:modelValue"]!==void 0;C===!0&&(c("update:modelValue",!0),w=u,Y(()=>{w===u&&(w=void 0)})),(v.modelValue===null||C===!1)&&d(u)}function d(u){e.value!==!0&&(e.value=!0,c("before-show",u),l!==void 0?l(u):c("show",u))}function p(u){if(v.disable===!0)return;const C=v["onUpdate:modelValue"]!==void 0;C===!0&&(c("update:modelValue",!1),w=u,Y(()=>{w===u&&(w=void 0)})),(v.modelValue===null||C===!1)&&_(u)}function _(u){e.value!==!1&&(e.value=!1,c("before-hide",u),t!==void 0?t(u):c("hide",u))}function y(u){v.disable===!0&&u===!0?v["onUpdate:modelValue"]!==void 0&&c("update:modelValue",!1):u===!0!==e.value&&(u===!0?d:_)(w)}k(()=>v.modelValue,y),i!==void 0&&Bt(s)===!0&&k(()=>n.$route.fullPath,()=>{i.value===!0&&e.value===!0&&p()}),a===!0&&j(()=>{y(v.modelValue)});const E={show:b,hide:p,toggle:g};return Object.assign(n,E),E}let G=0,qe,ke,J,Ce=!1,Ye,Ke,U;function lo(e){ro(e)&&Ee(e)}function ro(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const o=zt(e),i=e.shiftKey&&!e.deltaX,l=!i&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),t=i||l?e.deltaY:e.deltaX;for(let a=0;a<o.length;a++){const s=o[a];if(Kt(s,l))return l?t<0&&s.scrollTop===0?!0:t>0&&s.scrollTop+s.clientHeight===s.scrollHeight:t<0&&s.scrollLeft===0?!0:t>0&&s.scrollLeft+s.clientWidth===s.scrollWidth}return!0}function Ge(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function le(e){Ce!==!0&&(Ce=!0,requestAnimationFrame(()=>{Ce=!1;const{height:o}=e.target,{clientHeight:i,scrollTop:l}=document.scrollingElement;(J===void 0||o!==window.innerHeight)&&(J=i-o,document.scrollingElement.scrollTop=l),l>J&&(document.scrollingElement.scrollTop-=Math.ceil((l-J)/8))}))}function Je(e){const o=document.body,i=window.visualViewport!==void 0;if(e==="add"){const{overflowY:l,overflowX:t}=window.getComputedStyle(o);qe=dt(window),ke=ct(window),Ye=o.style.left,Ke=o.style.top,o.style.left=`-${qe}px`,o.style.top=`-${ke}px`,t!=="hidden"&&(t==="scroll"||o.scrollWidth>window.innerWidth)&&o.classList.add("q-body--force-scrollbar-x"),l!=="hidden"&&(l==="scroll"||o.scrollHeight>window.innerHeight)&&o.classList.add("q-body--force-scrollbar-y"),o.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,V.is.ios===!0&&(i===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",le,O.passiveCapture),window.visualViewport.addEventListener("scroll",le,O.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",Ge,O.passiveCapture))}V.is.desktop===!0&&V.is.mac===!0&&window[`${e}EventListener`]("wheel",lo,O.notPassive),e==="remove"&&(V.is.ios===!0&&(i===!0?(window.visualViewport.removeEventListener("resize",le,O.passiveCapture),window.visualViewport.removeEventListener("scroll",le,O.passiveCapture)):window.removeEventListener("scroll",Ge,O.passiveCapture)),o.classList.remove("q-body--prevent-scroll"),o.classList.remove("q-body--force-scrollbar-x"),o.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,o.style.left=Ye,o.style.top=Ke,window.scrollTo(qe,ke),J=void 0)}function uo(e){let o="add";if(e===!0){if(G++,U!==void 0){clearTimeout(U),U=void 0;return}if(G>1)return}else{if(G===0||(G--,G>0))return;if(o="remove",V.is.ios===!0&&V.is.nativeMobile===!0){clearTimeout(U),U=setTimeout(()=>{Je(o),U=void 0},100);return}}Je(o)}function so(){let e;return{preventBodyScroll(o){o!==e&&(e!==void 0||o===!0)&&(e=o,uo(o))}}}function co(){let e;return F(()=>{clearTimeout(e)}),{registerTimeout(o,i){clearTimeout(e),e=setTimeout(o,i)},removeTimeout(){clearTimeout(e)}}}const De={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},fo=Object.keys(De);De.all=!0;function Ze(e){const o={};for(const i of fo)e[i]===!0&&(o[i]=!0);return Object.keys(o).length===0?De:(o.horizontal===!0?o.left=o.right=!0:o.left===!0&&o.right===!0&&(o.horizontal=!0),o.vertical===!0?o.up=o.down=!0:o.up===!0&&o.down===!0&&(o.vertical=!0),o.horizontal===!0&&o.vertical===!0&&(o.all=!0),o)}function et(e,o){return o.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof o.handler=="function"&&e.target.nodeName.toUpperCase()!=="INPUT"&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(o.uid)===-1)}function vo(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),Pt.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Le(e,o,i){const l=Se(e);let t,a=l.left-o.event.x,s=l.top-o.event.y,v=Math.abs(a),c=Math.abs(s);const n=o.direction;n.horizontal===!0&&n.vertical!==!0?t=a<0?"left":"right":n.horizontal!==!0&&n.vertical===!0?t=s<0?"up":"down":n.up===!0&&s<0?(t="up",v>c&&(n.left===!0&&a<0?t="left":n.right===!0&&a>0&&(t="right"))):n.down===!0&&s>0?(t="down",v>c&&(n.left===!0&&a<0?t="left":n.right===!0&&a>0&&(t="right"))):n.left===!0&&a<0?(t="left",v<c&&(n.up===!0&&s<0?t="up":n.down===!0&&s>0&&(t="down"))):n.right===!0&&a>0&&(t="right",v<c&&(n.up===!0&&s<0?t="up":n.down===!0&&s>0&&(t="down")));let w=!1;if(t===void 0&&i===!1){if(o.event.isFirst===!0||o.event.lastDir===void 0)return{};t=o.event.lastDir,w=!0,t==="left"||t==="right"?(l.left-=a,v=0,a=0):(l.top-=s,c=0,s=0)}return{synthetic:w,payload:{evt:e,touch:o.event.mouse!==!0,mouse:o.event.mouse===!0,position:l,direction:t,isFirst:o.event.isFirst,isFinal:i===!0,duration:Date.now()-o.event.time,distance:{x:v,y:c},offset:{x:a,y:s},delta:{x:l.left-o.event.lastX,y:l.top-o.event.lastY}}}}let mo=0;var _e=Vt({name:"touch-pan",beforeMount(e,{value:o,modifiers:i}){if(i.mouse!==!0&&V.has.touch!==!0)return;function l(a,s){i.mouse===!0&&s===!0?Ee(a):(i.stop===!0&&ge(a),i.prevent===!0&&Ne(a))}const t={uid:"qvtp_"+mo++,handler:o,modifiers:i,direction:Ze(i),noop:Te,mouseStart(a){et(a,t)&&Ot(a)&&(oe(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(a,!0))},touchStart(a){if(et(a,t)){const s=a.target;oe(t,"temp",[[s,"touchmove","move","notPassiveCapture"],[s,"touchcancel","end","passiveCapture"],[s,"touchend","end","passiveCapture"]]),t.start(a)}},start(a,s){if(V.is.firefox===!0&&pe(e,!0),t.lastEvt=a,s===!0||i.stop===!0){if(t.direction.all!==!0&&(s!==!0||t.modifiers.mouseAllDir!==!0)){const n=a.type.indexOf("mouse")>-1?new MouseEvent(a.type,a):new TouchEvent(a.type,a);a.defaultPrevented===!0&&Ne(n),a.cancelBubble===!0&&ge(n),Object.assign(n,{qKeyEvent:a.qKeyEvent,qClickOutside:a.qClickOutside,qAnchorHandled:a.qAnchorHandled,qClonedBy:a.qClonedBy===void 0?[t.uid]:a.qClonedBy.concat(t.uid)}),t.initialEvent={target:a.target,event:n}}ge(a)}const{left:v,top:c}=Se(a);t.event={x:v,y:c,time:Date.now(),mouse:s===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:v,lastY:c}},move(a){if(t.event===void 0)return;const s=Se(a),v=s.left-t.event.x,c=s.top-t.event.y;if(v===0&&c===0)return;t.lastEvt=a;const n=t.event.mouse===!0,w=()=>{l(a,n),i.preserveCursor!==!0&&(document.documentElement.style.cursor="grabbing"),n===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),vo(),t.styleCleanup=d=>{if(t.styleCleanup=void 0,i.preserveCursor!==!0&&(document.documentElement.style.cursor=""),document.body.classList.remove("non-selectable"),n===!0){const p=()=>{document.body.classList.remove("no-pointer-events--children")};d!==void 0?setTimeout(()=>{p(),d()},50):p()}else d!==void 0&&d()}};if(t.event.detected===!0){t.event.isFirst!==!0&&l(a,t.event.mouse);const{payload:d,synthetic:p}=Le(a,t,!1);d!==void 0&&(t.handler(d)===!1?t.end(a):(t.styleCleanup===void 0&&t.event.isFirst===!0&&w(),t.event.lastX=d.position.left,t.event.lastY=d.position.top,t.event.lastDir=p===!0?void 0:d.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||n===!0&&t.modifiers.mouseAllDir===!0){w(),t.event.detected=!0,t.move(a);return}const g=Math.abs(v),b=Math.abs(c);g!==b&&(t.direction.horizontal===!0&&g>b||t.direction.vertical===!0&&g<b||t.direction.up===!0&&g<b&&c<0||t.direction.down===!0&&g<b&&c>0||t.direction.left===!0&&g>b&&v<0||t.direction.right===!0&&g>b&&v>0?(t.event.detected=!0,t.move(a)):t.end(a,!0))},end(a,s){if(t.event!==void 0){if(be(t,"temp"),V.is.firefox===!0&&pe(e,!1),s===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(Le(a===void 0?t.lastEvt:a,t).payload);const{payload:v}=Le(a===void 0?t.lastEvt:a,t,!0),c=()=>{t.handler(v)};t.styleCleanup!==void 0?t.styleCleanup(c):c()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};e.__qtouchpan=t,i.mouse===!0&&oe(t,"main",[[e,"mousedown","mouseStart",`passive${i.mouseCapture===!0?"Capture":""}`]]),V.has.touch===!0&&oe(t,"main",[[e,"touchstart","touchStart",`passive${i.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,o){const i=e.__qtouchpan;i!==void 0&&(o.oldValue!==o.value&&(typeof value!="function"&&i.end(),i.handler=o.value),i.direction=Ze(o.modifiers))},beforeUnmount(e){const o=e.__qtouchpan;o!==void 0&&(o.event!==void 0&&o.end(),be(o,"main"),be(o,"temp"),V.is.firefox===!0&&pe(e,!1),o.styleCleanup!==void 0&&o.styleCleanup(),delete e.__qtouchpan)}});const tt=150;var ho=P({name:"QDrawer",inheritAttrs:!1,props:{...no,...Pe,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...io,"on-layout","mini-state"],setup(e,{slots:o,emit:i,attrs:l}){const t=D(),{proxy:{$q:a}}=t,s=Ve(e,a),{preventBodyScroll:v}=so(),{registerTimeout:c}=co(),n=$e(ue,()=>{console.error("QDrawer needs to be child of QLayout")});let w,g,b;const d=x(e.behavior==="mobile"||e.behavior!=="desktop"&&n.totalWidth.value<=e.breakpoint),p=m(()=>e.mini===!0&&d.value!==!0),_=m(()=>p.value===!0?e.miniWidth:e.width),y=x(e.showIfAbove===!0&&d.value===!1?!0:e.modelValue===!0),E=m(()=>e.persistent!==!0&&(d.value===!0||vt.value===!0));function u(r,h){if(M(),r!==!1&&n.animate(),z(0),d.value===!0){const $=n.instances[ee.value];$!==void 0&&$.belowBreakpoint===!0&&$.hide(!1),Q(1),n.isContainer.value!==!0&&v(!0)}else Q(0),r!==!1&&ve(!1);c(()=>{r!==!1&&ve(!0),h!==!0&&i("show",r)},tt)}function C(r,h){W(),r!==!1&&n.animate(),Q(0),z(N.value*_.value),me(),h!==!0&&c(()=>{i("hide",r)},tt)}const{show:f,hide:q}=ao({showing:y,hideOnRouteChange:E,handleShow:u,handleHide:C}),{addToHistory:M,removeFromHistory:W}=oo(y,q,E),H={belowBreakpoint:d,hide:q},B=m(()=>e.side==="right"),N=m(()=>(a.lang.rtl===!0?-1:1)*(B.value===!0?1:-1)),He=x(0),I=x(!1),se=x(!1),Qe=x(_.value*N.value),ee=m(()=>B.value===!0?"left":"right"),ce=m(()=>y.value===!0&&d.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:_.value:0),de=m(()=>e.overlay===!0||e.miniToOverlay===!0||n.view.value.indexOf(B.value?"R":"L")>-1||a.platform.is.ios===!0&&n.isContainer.value===!0),K=m(()=>e.overlay===!1&&y.value===!0&&d.value===!1),vt=m(()=>e.overlay===!0&&y.value===!0&&d.value===!1),mt=m(()=>"fullscreen q-drawer__backdrop"+(y.value===!1&&I.value===!1?" hidden":"")),ht=m(()=>({backgroundColor:`rgba(0,0,0,${He.value*.4})`})),Re=m(()=>B.value===!0?n.rows.value.top[2]==="r":n.rows.value.top[0]==="l"),pt=m(()=>B.value===!0?n.rows.value.bottom[2]==="r":n.rows.value.bottom[0]==="l"),gt=m(()=>{const r={};return n.header.space===!0&&Re.value===!1&&(de.value===!0?r.top=`${n.header.offset}px`:n.header.space===!0&&(r.top=`${n.header.size}px`)),n.footer.space===!0&&pt.value===!1&&(de.value===!0?r.bottom=`${n.footer.offset}px`:n.footer.space===!0&&(r.bottom=`${n.footer.size}px`)),r}),bt=m(()=>{const r={width:`${_.value}px`,transform:`translateX(${Qe.value}px)`};return d.value===!0?r:Object.assign(r,gt.value)}),yt=m(()=>"q-drawer__content fit "+(n.isContainer.value!==!0?"scroll":"overflow-auto")),wt=m(()=>`q-drawer q-drawer--${e.side}`+(se.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(s.value===!0?" q-drawer--dark q-dark":"")+(I.value===!0?" no-transition":y.value===!0?"":" q-layout--prevent-focus")+(d.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${p.value===!0?"mini":"standard"}`+(de.value===!0||K.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(Re.value===!0?" q-drawer--top-padding":""))),qt=m(()=>{const r=a.lang.rtl===!0?e.side:ee.value;return[[_e,_t,void 0,{[r]:!0,mouse:!0}]]}),kt=m(()=>{const r=a.lang.rtl===!0?ee.value:e.side;return[[_e,We,void 0,{[r]:!0,mouse:!0}]]}),Ct=m(()=>{const r=a.lang.rtl===!0?ee.value:e.side;return[[_e,We,void 0,{[r]:!0,mouse:!0,mouseAllDir:!0}]]});function fe(){St(d,e.behavior==="mobile"||e.behavior!=="desktop"&&n.totalWidth.value<=e.breakpoint)}k(d,r=>{r===!0?(w=y.value,y.value===!0&&q(!1)):e.overlay===!1&&e.behavior!=="mobile"&&w!==!1&&(y.value===!0?(z(0),Q(0),me()):f(!1))}),k(()=>e.side,(r,h)=>{n.instances[h]===H&&(n.instances[h]=void 0,n[h].space=!1,n[h].offset=0),n.instances[r]=H,n[r].size=_.value,n[r].space=K.value,n[r].offset=ce.value}),k(n.totalWidth,()=>{(n.isContainer.value===!0||document.qScrollPrevented!==!0)&&fe()}),k(()=>e.behavior+e.breakpoint,fe),k(n.isContainer,r=>{y.value===!0&&v(r!==!0),r===!0&&fe()}),k(n.scrollbarWidth,()=>{z(y.value===!0?0:void 0)}),k(ce,r=>{R("offset",r)}),k(K,r=>{i("on-layout",r),R("space",r)}),k(B,()=>{z()}),k(_,r=>{z(),he(e.miniToOverlay,r)}),k(()=>e.miniToOverlay,r=>{he(r,_.value)}),k(()=>a.lang.rtl,()=>{z()}),k(()=>e.mini,()=>{e.modelValue===!0&&(Lt(),n.animate())}),k(p,r=>{i("mini-state",r)});function z(r){r===void 0?Y(()=>{r=y.value===!0?0:_.value,z(N.value*r)}):(n.isContainer.value===!0&&B.value===!0&&(d.value===!0||Math.abs(r)===_.value)&&(r+=N.value*n.scrollbarWidth.value),Qe.value=r)}function Q(r){He.value=r}function ve(r){const h=r===!0?"remove":n.isContainer.value!==!0?"add":"";h!==""&&document.body.classList[h]("q-body--drawer-toggle")}function Lt(){clearTimeout(g),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),se.value=!0,g=setTimeout(()=>{se.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function _t(r){if(y.value!==!1)return;const h=_.value,$=ie(r.distance.x,0,h);if(r.isFinal===!0){$>=Math.min(75,h)===!0?f():(n.animate(),Q(0),z(N.value*h)),I.value=!1;return}z((a.lang.rtl===!0?B.value!==!0:B.value)?Math.max(h-$,0):Math.min(0,$-h)),Q(ie($/h,0,1)),r.isFirst===!0&&(I.value=!0)}function We(r){if(y.value!==!0)return;const h=_.value,$=r.direction===e.side,te=(a.lang.rtl===!0?$!==!0:$)?ie(r.distance.x,0,h):0;if(r.isFinal===!0){Math.abs(te)<Math.min(75,h)===!0?(n.animate(),Q(1),z(0)):q(),I.value=!1;return}z(N.value*te),Q(ie(1-te/h,0,1)),r.isFirst===!0&&(I.value=!0)}function me(){v(!1),ve(!0)}function R(r,h){n.update(e.side,r,h)}function St(r,h){r.value!==h&&(r.value=h)}function he(r,h){R("size",r===!0?e.miniWidth:h)}return n.instances[e.side]=H,he(e.miniToOverlay,_.value),R("space",K.value),R("offset",ce.value),e.showIfAbove===!0&&e.modelValue!==!0&&y.value===!0&&e["onUpdate:modelValue"]!==void 0&&i("update:modelValue",!0),j(()=>{i("on-layout",K.value),i("mini-state",p.value),w=e.showIfAbove===!0;const r=()=>{(y.value===!0?u:C)(!1,!0)};if(n.totalWidth.value!==0){Y(r);return}b=k(n.totalWidth,()=>{b(),b=void 0,y.value===!1&&e.showIfAbove===!0&&d.value===!1?f(!1):r()})}),F(()=>{b!==void 0&&b(),clearTimeout(g),y.value===!0&&me(),n.instances[e.side]===H&&(n.instances[e.side]=void 0,R("size",0),R("offset",0),R("space",!1))}),()=>{const r=[];d.value===!0&&(e.noSwipeOpen===!1&&r.push(at(L("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),qt.value)),r.push(Ie("div",{ref:"backdrop",class:mt.value,style:ht.value,"aria-hidden":"true",onClick:q},void 0,"backdrop",e.noSwipeBackdrop!==!0&&y.value===!0,()=>Ct.value)));const h=p.value===!0&&o.mini!==void 0,$=[L("div",{...l,key:""+h,class:[yt.value,l.class]},h===!0?o.mini():A(o.default))];return e.elevated===!0&&y.value===!0&&$.push(L("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),r.push(Ie("aside",{ref:"content",class:wt.value,style:bt.value},$,"contentclose",e.noSwipeClose!==!0&&d.value===!0,()=>kt.value)),L("div",{class:"q-drawer-container"},r)}}}),po=P({name:"QPageContainer",setup(e,{slots:o}){const{proxy:{$q:i}}=D(),l=$e(ue,()=>{console.error("QPageContainer needs to be child of QLayout")});lt(Mt,!0);const t=m(()=>{const a={};return l.header.space===!0&&(a.paddingTop=`${l.header.size}px`),l.right.space===!0&&(a[`padding${i.lang.rtl===!0?"Left":"Right"}`]=`${l.right.size}px`),l.footer.space===!0&&(a.paddingBottom=`${l.footer.size}px`),l.left.space===!0&&(a[`padding${i.lang.rtl===!0?"Right":"Left"}`]=`${l.left.size}px`),a});return()=>L("div",{class:"q-page-container",style:t.value},A(o.default))}});const{passive:ot}=O,go=["both","horizontal","vertical"];var bo=P({name:"QScrollObserver",props:{axis:{type:String,validator:e=>go.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:o}){const i={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let l=null,t,a;k(()=>e.scrollTarget,()=>{c(),v()});function s(){l!==null&&l();const g=Math.max(0,ct(t)),b=dt(t),d={top:g-i.position.top,left:b-i.position.left};if(e.axis==="vertical"&&d.top===0||e.axis==="horizontal"&&d.left===0)return;const p=Math.abs(d.top)>=Math.abs(d.left)?d.top<0?"up":"down":d.left<0?"left":"right";i.position={top:g,left:b},i.directionChanged=i.direction!==p,i.delta=d,i.directionChanged===!0&&(i.direction=p,i.inflectionPoint=i.position),o("scroll",{...i})}function v(){t=Yt(a,e.scrollTarget),t.addEventListener("scroll",n,ot),n(!0)}function c(){t!==void 0&&(t.removeEventListener("scroll",n,ot),t=void 0)}function n(g){if(g===!0||e.debounce===0||e.debounce==="0")s();else if(l===null){const[b,d]=e.debounce?[setTimeout(s,e.debounce),clearTimeout]:[requestAnimationFrame(s),cancelAnimationFrame];l=()=>{d(b),l=null}}}const w=D();return j(()=>{a=w.proxy.$el.parentNode,v()}),F(()=>{l!==null&&l(),c()}),Object.assign(w.proxy,{trigger:n,getPosition:()=>i}),Te}}),yo=P({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:o,emit:i}){const{proxy:{$q:l}}=D(),t=x(null),a=x(l.screen.height),s=x(e.container===!0?0:l.screen.width),v=x({position:0,direction:"down",inflectionPoint:0}),c=x(0),n=x(nt.value===!0?0:we()),w=m(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),g=m(()=>e.container===!1?{minHeight:l.screen.height+"px"}:null),b=m(()=>n.value!==0?{[l.lang.rtl===!0?"left":"right"]:`${n.value}px`}:null),d=m(()=>n.value!==0?{[l.lang.rtl===!0?"right":"left"]:0,[l.lang.rtl===!0?"left":"right"]:`-${n.value}px`,width:`calc(100% + ${n.value}px)`}:null);function p(f){if(e.container===!0||document.qScrollPrevented!==!0){const q={position:f.position.top,direction:f.direction,directionChanged:f.directionChanged,inflectionPoint:f.inflectionPoint.top,delta:f.delta.top};v.value=q,e.onScroll!==void 0&&i("scroll",q)}}function _(f){const{height:q,width:M}=f;let W=!1;a.value!==q&&(W=!0,a.value=q,e.onScrollHeight!==void 0&&i("scroll-height",q),E()),s.value!==M&&(W=!0,s.value=M),W===!0&&e.onResize!==void 0&&i("resize",f)}function y({height:f}){c.value!==f&&(c.value=f,E())}function E(){if(e.container===!0){const f=a.value>c.value?we():0;n.value!==f&&(n.value=f)}}let u;const C={instances:{},view:m(()=>e.view),isContainer:m(()=>e.container),rootRef:t,height:a,containerHeight:c,scrollbarWidth:n,totalWidth:m(()=>s.value+n.value),rows:m(()=>{const f=e.view.toLowerCase().split(" ");return{top:f[0].split(""),middle:f[1].split(""),bottom:f[2].split("")}}),header:ne({size:0,offset:0,space:!1}),right:ne({size:300,offset:0,space:!1}),footer:ne({size:0,offset:0,space:!1}),left:ne({size:300,offset:0,space:!1}),scroll:v,animate(){u!==void 0?clearTimeout(u):document.body.classList.add("q-body--layout-animate"),u=setTimeout(()=>{document.body.classList.remove("q-body--layout-animate"),u=void 0},155)},update(f,q,M){C[f][q]=M}};if(lt(ue,C),we()>0){let M=function(){f=null,q.classList.remove("hide-scrollbar")},W=function(){if(f===null){if(q.scrollHeight>l.screen.height)return;q.classList.add("hide-scrollbar")}else clearTimeout(f);f=setTimeout(M,300)},H=function(B){f!==null&&B==="remove"&&(clearTimeout(f),M()),window[`${B}EventListener`]("resize",W)},f=null;const q=document.body;k(()=>e.container!==!0?"add":"remove",H),e.container!==!0&&H("add"),Dt(()=>{H("remove")})}return()=>{const f=Ht(o.default,[L(bo,{onScroll:p}),L(xe,{onResize:_})]),q=L("div",{class:w.value,style:g.value,ref:e.container===!0?void 0:t,tabindex:-1},f);return e.container===!0?L("div",{class:"q-layout-container overflow-hidden",ref:t},[L(xe,{onResize:y}),L("div",{class:"absolute-full",style:b.value},[L("div",{class:"scroll",style:d.value},[q])])]):q}}}),re=P({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:o}){const i=m(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>L("div",{class:i.value},A(o.default))}});const wo=rt({name:"EssentialLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}}});function qo(e,o,i,l,t,a){return X(),Z(Me,{class:"text-white",clickable:"",tag:"a",target:"_blank",href:e.link},{default:T(()=>[e.icon?(X(),Z(re,{key:0,avatar:""},{default:T(()=>[S(ut,{name:e.icon},null,8,["name"])]),_:1})):Qt("",!0),S(re,null,{default:T(()=>[S(Oe,{class:"text-white"},{default:T(()=>[ze(Rt(e.title),1)]),_:1})]),_:1})]),_:1},8,["href"])}var ko=Be(wo,[["render",qo]]);const Co={setup(){},methods:{async onLogout(){await Xe.logout().then(()=>{Xe.isAuthenticated||(Ut("positive","Bye!"),this.$router.push({path:"/login"}))})}}},Lo=ze("Log out");function _o(e,o,i,l,t,a){return X(),Z(Me,{class:"text-white",clickable:"",onClick:a.onLogout},{default:T(()=>[S(re,{avatar:""},{default:T(()=>[S(ut,{name:"logout"})]),_:1}),S(re,null,{default:T(()=>[S(Oe,{class:"text-white"},{default:T(()=>[Lo]),_:1})]),_:1})]),_:1},8,["onClick"])}var So=Be(Co,[["render",_o]]);const xo=[{title:"Users",caption:"quasar.dev",icon:"people",link:"https://quasar.dev"},{title:"Insurances",caption:"github.com/quasarframework",icon:"shield",link:"https://github.com/quasarframework"},{title:"Vehicles",caption:"chat.quasar.dev",icon:"local_shipping",link:"https://chat.quasar.dev"},{title:"Pipeline",caption:"forum.quasar.dev",icon:"grid_view",link:"https://forum.quasar.dev"},{title:"Vehicle status",caption:"@quasarframework",icon:"info",link:"https://twitter.quasar.dev"}],To=rt({name:"MainLayout",components:{EssentialLink:ko,LogoutButton:So},setup(){const e=x(!1),o=x(!1);return{essentialLinks:xo,leftDrawerOpen:e,miniState:o,toggleLeftDrawer(){o.value=!o.value}}}}),$o=ze(" Dashobard "),Eo=st("div",null,"User",-1),Bo=st("img",{alt:"Quasar logo",src:Xt,width:"120"},null,-1);function zo(e,o,i,l,t,a){const s=ye("EssentialLink"),v=ye("LogoutButton"),c=ye("router-view");return X(),Z(yo,{view:"lHh Lpr lFf"},{default:T(()=>[S(eo,{elevated:""},{default:T(()=>[S(Jt,{class:"text-black bg-white"},{default:T(()=>[S(Ue,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer,align:"right"},null,8,["onClick"]),S(Gt,null,{default:T(()=>[$o]),_:1}),Eo]),_:1})]),_:1}),S(ho,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":o[0]||(o[0]=n=>e.leftDrawerOpen=n),"show-if-above":"",bordered:"",width:200,mini:e.miniState,class:"bg-primary"},{default:T(()=>[S(to,null,{default:T(()=>[S(Oe,{header:""},{default:T(()=>[Bo]),_:1}),at(S(Me,null,{default:T(()=>[S(Ue,{class:"q-mini-drawer-only",flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:e.toggleLeftDrawer,align:"right"},null,8,["onClick"])]),_:1},512),[[Nt,!1]]),(X(!0),Wt(At,null,Ft(e.essentialLinks,n=>(X(),Z(s,It({key:n.title},n),null,16))),128)),S(v)]),_:1})]),_:1},8,["modelValue","mini"]),S(po,null,{default:T(()=>[S(c)]),_:1})]),_:1})}var Ho=Be(To,[["render",zo]]);export{Ho as default};
