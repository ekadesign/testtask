(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["registrations-list"],{1206:function(t,e,i){"use strict";i("becd")},"2bc5":function(t,e,i){"use strict";var s=i("5530"),a=(i("a15b"),i("abd3"),i("ade3")),n=i("1c87"),o=i("58df"),r=Object(o["a"])(n["a"]).extend({name:"v-breadcrumbs-item",props:{activeClass:{type:String,default:"v-breadcrumbs__item--disabled"},ripple:{type:[Boolean,Object],default:!1}},computed:{classes:function(){return Object(a["a"])({"v-breadcrumbs__item":!0},this.activeClass,this.disabled)}},render:function(t){var e=this.generateRouteLink(),i=e.tag,a=e.data;return t("li",[t(i,Object(s["a"])(Object(s["a"])({},a),{},{attrs:Object(s["a"])(Object(s["a"])({},a.attrs),{},{"aria-current":this.isActive&&this.isLink?"page":void 0})}),this.$slots.default)])}}),c=i("80d2"),l=Object(c["i"])("v-breadcrumbs__divider","li"),u=i("7560");e["a"]=Object(o["a"])(u["a"]).extend({name:"v-breadcrumbs",props:{divider:{type:String,default:"/"},items:{type:Array,default:function(){return[]}},large:Boolean},computed:{classes:function(){return Object(s["a"])({"v-breadcrumbs--large":this.large},this.themeClasses)}},methods:{genDivider:function(){return this.$createElement(l,this.$slots.divider?this.$slots.divider:this.divider)},genItems:function(){for(var t=[],e=!!this.$scopedSlots.item,i=[],s=0;s<this.items.length;s++){var a=this.items[s];i.push(a.text),e?t.push(this.$scopedSlots.item({item:a})):t.push(this.$createElement(r,{key:i.join("."),props:a},[a.text])),s<this.items.length-1&&t.push(this.genDivider())}return t}},render:function(t){var e=this.$slots.default||this.genItems();return t("ul",{staticClass:"v-breadcrumbs",class:this.classes},e)}})},"33bd":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"d-flex flex-column flex-grow-1"},[i("div",{staticClass:"d-flex align-center py-3"},[i("div",[i("div",{staticClass:"display-1"},[t._v("Регистрации")]),i("v-breadcrumbs",{staticClass:"pa-0 py-2",attrs:{items:t.breadcrumbs}})],1),i("v-spacer")],1),i("v-card",[i("v-data-table",{staticClass:"flex-grow-1",attrs:{headers:t.headers,items:t.users,loading:t.loading},scopedSlots:t._u([{key:"item.id",fn:function(e){var s=e.item;return[i("div",{staticClass:"font-weight-bold"},[t._v("# "),i("copy-label",{attrs:{text:s.id+""}})],1)]}},{key:"item.email",fn:function(t){var e=t.item;return[i("div",{staticClass:"d-flex align-center py-1"},[i("div",{staticClass:"ml-1 caption font-weight-bold"},[i("copy-label",{attrs:{text:e.email}})],1)])]}},{key:"item.status",fn:function(e){var s=e.item;return[i("v-select",{attrs:{value:s.status,items:t.statuses,dense:"",readonly:!s||s.status!==t.statusesAliases.NEW_STATUS,outlined:"","hide-details":"","hide-selected":""},on:{change:function(e){return t.verifyUser(e,s)}}})]}},{key:"item.status1",fn:function(e){var s=e.item;return[s.status===t.statusesAliases.APPROVE_STATUS?i("v-icon",{attrs:{small:"",color:"success"}},[t._v(" mdi-check-circle ")]):t._e(),s.status===t.statusesAliases.NEW_STATUS?i("v-icon",{attrs:{small:"",color:"primary"}},[t._v(" mdi-circle-outline ")]):t._e(),s.status===t.statusesAliases.REJECT_STATUS?i("v-icon",{attrs:{small:"",color:"error"}},[t._v(" mdi-close-circle ")]):t._e()]}},{key:"item.role",fn:function(e){var s=e.item;return[i("v-chip",{staticClass:"font-weight-bold",attrs:{label:"",small:"",color:"ADMIN"===s.role?"primary":void 0}},[t._v(t._s(t._f("capitalize")(s.role)))])]}},{key:"item.created_at",fn:function(e){var s=e.item;return[i("div",[t._v(t._s(t._f("formatDate")(s.created_at,"lll")))])]}},{key:"item.updated_at",fn:function(e){var s=e.item;return[i("div",[t._v(t._s(t._f("formatDate")(s.updated_at,"lll")))])]}},{key:"item.action",fn:function(e){return[i("div",{staticClass:"actions"},[i("v-btn",{attrs:{icon:"",to:"/users/edit"}},[i("v-icon",[t._v("mdi-open-in-new")])],1)],1)]}}])})],1)],1)},a=[],n=i("1da1"),o=(i("96cf"),i("b9bf")),r=i("922e"),c={components:{CopyLabel:o["a"]},data:function(){return{statusesAliases:{NEW_STATUS:"new",APPROVE_STATUS:"approve",REJECT_STATUS:"reject"},statuses:[{text:"Новый",value:"new"},{text:"Подтвержден",value:"approve"},{text:"Отклонен",value:"reject"}],loading:!1,breadcrumbs:[{text:"Регистрации",disabled:!1,href:"#"},{text:"Список"}],headers:[{text:"Id",align:"left",value:"id"},{text:"Email",value:"email"},{text:"Подтвержден",value:"status"},{text:"Подтвержден",value:"status1"},{text:"Имя",align:"left",value:"name"},{text:"Зарегистрирован",value:"created_at"},{text:"Обновлен",value:"updated_at"},{text:"",sortable:!1,align:"right",value:"action"}],users:[]}},mounted:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.prev=1,e.next=4,Object(r["q"])();case 4:i=e.sent,t.users=i,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](1),console.info(e.t0);case 11:return e.prev=11,t.loading=!1,e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[1,8,11,14]])})))()},methods:{searchUser:function(){},open:function(){},verifyUser:function(t,e){return Object(n["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return console.info({status:t,user:e}),i.prev=1,i.next=4,Object(r["M"])(t,e);case 4:e.status=t,i.next=10;break;case 7:i.prev=7,i.t0=i["catch"](1),console.info(i.t0);case 10:console.info({user:e,us:e.status});case 11:case"end":return i.stop()}}),i,null,[[1,7]])})))()}}},l=c,u=(i("b3c6"),i("2877")),d=i("6544"),h=i.n(d),f=i("2bc5"),p=i("8336"),v=i("b0afa"),m=i("cc20"),b=i("8fea"),g=i("132d"),y=i("b974"),_=i("2fa4"),x=Object(u["a"])(l,s,a,!1,null,"3bd4ee56",null);e["default"]=x.exports;h()(x,{VBreadcrumbs:f["a"],VBtn:p["a"],VCard:v["a"],VChip:m["a"],VDataTable:b["a"],VIcon:g["a"],VSelect:y["a"],VSpacer:_["a"]})},"3a2f":function(t,e,i){"use strict";var s=i("ade3"),a=(i("a9e3"),i("9734"),i("4ad4")),n=i("a9ad"),o=i("16b7"),r=i("b848"),c=i("f573"),l=i("f2e7"),u=i("80d2"),d=i("d9bd"),h=i("58df");e["a"]=Object(h["a"])(n["a"],o["a"],r["a"],c["a"],l["a"]).extend({name:"v-tooltip",props:{closeDelay:{type:[Number,String],default:0},disabled:Boolean,fixed:{type:Boolean,default:!0},openDelay:{type:[Number,String],default:0},openOnHover:{type:Boolean,default:!0},tag:{type:String,default:"span"},transition:String},data:function(){return{calculatedMinWidth:0,closeDependents:!1}},computed:{calculatedLeft:function(){var t=this.dimensions,e=t.activator,i=t.content,s=!this.bottom&&!this.left&&!this.top&&!this.right,a=!1!==this.attach?e.offsetLeft:e.left,n=0;return this.top||this.bottom||s?n=a+e.width/2-i.width/2:(this.left||this.right)&&(n=a+(this.right?e.width:-i.width)+(this.right?10:-10)),this.nudgeLeft&&(n-=parseInt(this.nudgeLeft)),this.nudgeRight&&(n+=parseInt(this.nudgeRight)),"".concat(this.calcXOverflow(n,this.dimensions.content.width),"px")},calculatedTop:function(){var t=this.dimensions,e=t.activator,i=t.content,s=!1!==this.attach?e.offsetTop:e.top,a=0;return this.top||this.bottom?a=s+(this.bottom?e.height:-i.height)+(this.bottom?10:-10):(this.left||this.right)&&(a=s+e.height/2-i.height/2),this.nudgeTop&&(a-=parseInt(this.nudgeTop)),this.nudgeBottom&&(a+=parseInt(this.nudgeBottom)),"".concat(this.calcYOverflow(a+this.pageYOffset),"px")},classes:function(){return{"v-tooltip--top":this.top,"v-tooltip--right":this.right,"v-tooltip--bottom":this.bottom,"v-tooltip--left":this.left,"v-tooltip--attached":""===this.attach||!0===this.attach||"attach"===this.attach}},computedTransition:function(){return this.transition?this.transition:this.isActive?"scale-transition":"fade-transition"},offsetY:function(){return this.top||this.bottom},offsetX:function(){return this.left||this.right},styles:function(){return{left:this.calculatedLeft,maxWidth:Object(u["g"])(this.maxWidth),minWidth:Object(u["g"])(this.minWidth),opacity:this.isActive?.9:0,top:this.calculatedTop,zIndex:this.zIndex||this.activeZIndex}}},beforeMount:function(){var t=this;this.$nextTick((function(){t.value&&t.callActivate()}))},mounted:function(){"v-slot"===Object(u["t"])(this,"activator",!0)&&Object(d["b"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){this.updateDimensions(),requestAnimationFrame(this.startTransition)},deactivate:function(){this.runDelay("close")},genActivatorListeners:function(){var t=this,e=a["a"].options.methods.genActivatorListeners.call(this);return e.focus=function(e){t.getActivator(e),t.runDelay("open")},e.blur=function(e){t.getActivator(e),t.runDelay("close")},e.keydown=function(e){e.keyCode===u["x"].esc&&(t.getActivator(e),t.runDelay("close"))},e},genActivatorAttributes:function(){return{"aria-haspopup":!0,"aria-expanded":String(this.isActive)}},genTransition:function(){var t=this.genContent();return this.computedTransition?this.$createElement("transition",{props:{name:this.computedTransition}},[t]):t},genContent:function(){var t;return this.$createElement("div",this.setBackgroundColor(this.color,{staticClass:"v-tooltip__content",class:(t={},Object(s["a"])(t,this.contentClass,!0),Object(s["a"])(t,"menuable__content__active",this.isActive),Object(s["a"])(t,"v-tooltip__content--fixed",this.activatorFixed),t),style:this.styles,attrs:this.getScopeIdAttrs(),directives:[{name:"show",value:this.isContentActive}],ref:"content"}),this.getContentSlot())}},render:function(t){var e=this;return t(this.tag,{staticClass:"v-tooltip",class:this.classes},[this.showLazyContent((function(){return[e.genTransition()]})),this.genActivator()])}})},9734:function(t,e,i){},abd3:function(t,e,i){},ac5e:function(t,e,i){},b3c6:function(t,e,i){"use strict";i("ac5e")},b9bf:function(t,e,i){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-tooltip",{attrs:{bottom:""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[i("div",t._g({ref:"copylabel",staticClass:"copylabel animate__faster",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.copy.apply(null,arguments)}}},s),[t._v(t._s(t.text))])]}}])},[i("span",[t._v(t._s(t.tooltip))])])},a=[],n={props:{text:{type:String,default:""},toastText:{type:String,default:"Copied to clipboard!"},animation:{type:String,default:"heartBeat"}},data:function(){return{tooltip:"Copy",timeout:null}},beforeDestroy:function(){this.timeout&&clearTimeout(this.timeout)},methods:{copy:function(){var t=this;this.$animate(this.$refs.copylabel,this.animation),this.$clipboard(this.text,this.toastText),this.tooltip="Copied!",this.timeout=setTimeout((function(){t.tooltip="Copy"}),2e3)}}},o=n,r=(i("1206"),i("2877")),c=i("6544"),l=i.n(c),u=i("3a2f"),d=Object(r["a"])(o,s,a,!1,null,"95422c1a",null);e["a"]=d.exports;l()(d,{VTooltip:u["a"]})},becd:function(t,e,i){}}]);