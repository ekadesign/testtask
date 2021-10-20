(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["users-edit"],{"455e":function(a,t,e){"use strict";e.r(t);var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"flex-grow-1"},[e("div",{staticClass:"d-flex align-center py-3"},[e("div",[e("div",{staticClass:"display-1"},[a._v("Edit User "+a._s(a.user.name&&"- "+a.user.name))]),e("v-breadcrumbs",{staticClass:"pa-0 py-2",attrs:{items:a.breadcrumbs}})],1),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(a){}}},[e("v-icon",[a._v("mdi-refresh")])],1)],1),"ADMIN"===a.user.role?e("div",{staticClass:"d-flex align-center font-weight-bold primary--text my-2"},[e("v-icon",{attrs:{small:"",color:"primary"}},[a._v("mdi-security")]),e("span",{staticClass:"ma-1"},[a._v("Administrator")])],1):a._e(),e("div",{staticClass:"mb-4"},[e("div",{staticClass:"d-flex"},[e("span",{staticClass:"font-weight-bold"},[a._v("Email")]),e("span",{staticClass:"mx-1"},[e("copy-label",{attrs:{text:a.user.email}})],1)]),e("div",{staticClass:"d-flex"},[e("span",{staticClass:"font-weight-bold"},[a._v("ID")]),e("span",{staticClass:"mx-1"},[e("copy-label",{attrs:{text:a.user.id+""}})],1)])]),e("v-tabs",{attrs:{"show-arrows":!1,"background-color":"transparent"},model:{value:a.tab,callback:function(t){a.tab=t},expression:"tab"}},[e("v-tab",{attrs:{to:"#tabs-account"}},[a._v("Account")]),e("v-tab",{attrs:{to:"#tabs-information"}},[a._v("Information")])],1),e("v-tabs-items",{model:{value:a.tab,callback:function(t){a.tab=t},expression:"tab"}},[e("v-tab-item",{attrs:{value:"tabs-account"}},[e("account-tab",{ref:"tabs-account",attrs:{user:a.user}})],1),e("v-tab-item",{attrs:{value:"tabs-information"}},[e("information-tab",{ref:"tabs-information",attrs:{user:a.user}})],1)],1)],1)},l=[],i=e("b9bf"),r=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"my-2"},[e("div",[a.user.disabled?e("v-card",{staticClass:"warning mb-4",attrs:{light:""}},[e("v-card-title",[a._v("User Disabled")]),e("v-card-subtitle",[a._v("This user has been disabled! Login accesss has been revoked.")]),e("v-card-text",[e("v-btn",{attrs:{dark:""},on:{click:function(t){a.user.disabled=!1}}},[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-account-check")]),a._v("Enable User ")],1)],1)],1):a._e(),e("v-card",[e("v-card-title",[a._v("Basic Information")]),e("v-card-text",[e("div",{staticClass:"d-flex flex-column flex-sm-row"},[e("div",[e("v-img",{staticClass:"blue-grey lighten-4 rounded elevation-3",attrs:{src:a.user.avatar,"aspect-ratio":"1","max-width":"90","max-height":"90"}}),e("v-btn",{staticClass:"mt-1",attrs:{small:""}},[a._v("Edit Avatar")])],1),e("div",{staticClass:"flex-grow-1 pt-2 pa-sm-2"},[e("v-text-field",{attrs:{label:"Display name",placeholder:"name"},model:{value:a.user.name,callback:function(t){a.$set(a.user,"name",t)},expression:"user.name"}}),e("v-text-field",{attrs:{label:"Email","hide-details":""},model:{value:a.user.email,callback:function(t){a.$set(a.user,"email",t)},expression:"user.email"}}),e("div",{staticClass:"d-flex flex-column"},[e("v-checkbox",{attrs:{dense:"",label:"Email Verified"},model:{value:a.user.verified,callback:function(t){a.$set(a.user,"verified",t)},expression:"user.verified"}}),e("div",[a.user.verified?a._e():e("v-btn",[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-email")]),a._v("Send Verification Email ")],1)],1)],1),e("div",{staticClass:"mt-2"},[e("v-btn",{attrs:{color:"primary"},on:{click:function(a){}}},[a._v("Save")])],1)],1)])])],1),e("v-expansion-panels",{staticClass:"mt-3",attrs:{multiple:""},model:{value:a.panel,callback:function(t){a.panel=t},expression:"panel"}},[e("v-expansion-panel",[e("v-expansion-panel-header",{staticClass:"title"},[a._v("Actions")]),e("v-expansion-panel-content",[e("div",{staticClass:"mb-2"},[e("div",{staticClass:"title"},[a._v("Reset User Password")]),e("div",{staticClass:"subtitle mb-2"},[a._v("Sends a reset password email to the user.")]),e("v-btn",{staticClass:"mb-2",on:{click:function(a){}}},[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-email")]),a._v("Send Reset Password Email ")],1)],1),e("v-divider"),e("div",{staticClass:"my-2"},[e("div",{staticClass:"title"},[a._v("Export Account Data")]),e("div",{staticClass:"subtitle mb-2"},[a._v("Export all the platform metadata for this user.")]),e("v-btn",{staticClass:"mb-2"},[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-clipboard-account")]),a._v("Export User Data ")],1)],1),e("v-divider"),e("div",{staticClass:"my-2"},[e("div",{staticClass:"error--text title"},[a._v("Danger Zone")]),e("div",{staticClass:"subtitle mb-2"},[a._v("Full administrator with access to this dashboard.")]),e("div",{staticClass:"my-2"},["ADMIN"===a.user.role?e("v-btn",{attrs:{color:"primary"},on:{click:function(t){a.user.role="USER"}}},[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-security")]),a._v("Remove admin access ")],1):e("v-btn",{attrs:{color:"primary"},on:{click:function(t){a.user.role="ADMIN"}}},[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-security")]),a._v("Set User as Admin ")],1)],1),e("v-divider"),e("div",{staticClass:"subtitle mt-3 mb-2"},[a._v("Prevent the user from signing in on the platform.")]),e("div",{staticClass:"my-2"},[a.user.disabled?e("v-btn",{attrs:{color:"warning"},on:{click:function(t){a.user.disabled=!1}}},[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-account-check")]),a._v("Enable User ")],1):e("v-btn",{attrs:{color:"warning"},on:{click:function(t){a.disableDialog=!0}}},[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-cancel")]),a._v("Disable User ")],1)],1),e("v-divider"),e("div",{staticClass:"subtitle mt-3 mb-2"},[a._v("To delete the user please transfer ownership or delete user's subscriptions.")]),e("v-btn",{attrs:{color:"error"},on:{click:function(t){a.deleteDialog=!0}}},[e("v-icon",{attrs:{left:"",small:""}},[a._v("mdi-delete")]),a._v("Delete User ")],1)],1)],1)],1),e("v-expansion-panel",[e("v-expansion-panel-header",{staticClass:"title"},[a._v("Metadata")]),e("v-expansion-panel-content",{staticClass:"body-2"},[e("span",{staticClass:"font-weight-bold"},[a._v("Created")]),a._v(" "+a._s(a._f("formatDate")(a.user.created,"lll"))+" "),e("br"),e("span",{staticClass:"font-weight-bold"},[a._v("Last Sign In")]),a._v(" "+a._s(a._f("formatDate")(a.user.lastSignIn,"lll"))+" ")])],1),e("v-expansion-panel",[e("v-expansion-panel-header",{staticClass:"title"},[a._v("Raw Data")]),e("v-expansion-panel-content",[e("pre",{staticClass:"body-2"},[a._v(a._s(a.user))])])],1)],1)],1),e("v-dialog",{attrs:{"max-width":"290"},model:{value:a.disableDialog,callback:function(t){a.disableDialog=t},expression:"disableDialog"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[a._v("Disable User")]),e("v-card-text",[a._v("Are you sure you want to disable this user?")]),e("v-card-actions",[e("v-spacer"),e("v-btn",{on:{click:function(t){a.disableDialog=!1}}},[a._v("Cancel")]),e("v-btn",{attrs:{color:"warning"},on:{click:function(t){a.user.disabled=!0,a.disableDialog=!1}}},[a._v("Disable")])],1)],1)],1),e("v-dialog",{attrs:{"max-width":"290"},model:{value:a.deleteDialog,callback:function(t){a.deleteDialog=t},expression:"deleteDialog"}},[e("v-card",[e("v-card-title",{staticClass:"headline"},[a._v("Delete User")]),e("v-card-text",[a._v("Are you sure you want to delete this user?")]),e("v-card-actions",[e("v-spacer"),e("v-btn",{on:{click:function(t){a.deleteDialog=!1}}},[a._v("Cancel")]),e("v-btn",{attrs:{color:"error"},on:{click:function(t){a.deleteDialog=!1}}},[a._v("Delete")])],1)],1)],1)],1)},n=[],c={props:{user:{type:Object,default:function(){return{}}}},data:function(){return{panel:[1],deleteDialog:!1,disableDialog:!1}}},o=c,d=e("2877"),v=e("6544"),u=e.n(v),b=e("8336"),m=e("b0afa"),f=e("99d9"),p=e("ac7c"),x=e("169a"),_=e("ce7e"),C=e("cd55"),h=e("49e2"),g=e("c865"),k=e("0393"),V=e("132d"),w=e("adda"),y=e("2fa4"),D=e("8654"),E=Object(d["a"])(o,r,n,!1,null,null,null),S=E.exports;u()(E,{VBtn:b["a"],VCard:m["a"],VCardActions:f["a"],VCardSubtitle:f["b"],VCardText:f["c"],VCardTitle:f["d"],VCheckbox:p["a"],VDialog:x["a"],VDivider:_["a"],VExpansionPanel:C["a"],VExpansionPanelContent:h["a"],VExpansionPanelHeader:g["a"],VExpansionPanels:k["a"],VIcon:V["a"],VImg:w["a"],VSpacer:y["a"],VTextField:D["a"]});var A=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("v-card",{staticClass:"my-2"},[e("v-card-title",[a._v("User Information")]),e("v-card-text",[e("v-form",[e("v-row",[e("v-col",{attrs:{cols:"12",md:"6"}},[e("v-text-field",{attrs:{value:"First and two on el street",label:"Address Line 1"}}),e("v-text-field",{attrs:{value:"",label:"Address Line 2"}}),e("v-text-field",{attrs:{value:"1231",label:"Zip Code"}}),e("v-text-field",{attrs:{value:"Los Angeles",label:"City"}}),e("v-text-field",{attrs:{value:"California",label:"State"}}),e("v-text-field",{attrs:{value:"United States",label:"Country"}})],1),e("v-col",{attrs:{cols:"12",md:"6"}},[e("v-text-field",{attrs:{value:"+8484548112",label:"Phone"}}),e("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":"","min-width":"290px"},scopedSlots:a._u([{key:"activator",fn:function(t){var s=t.on,l=t.attrs;return[e("v-text-field",a._g(a._b({attrs:{label:"Birthday date",readonly:""},model:{value:a.date,callback:function(t){a.date=t},expression:"date"}},"v-text-field",l,!1),s))]}}]),model:{value:a.menu,callback:function(t){a.menu=t},expression:"menu"}},[e("v-date-picker",{ref:"picker",attrs:{max:(new Date).toISOString().substr(0,10),min:"1950-01-01"},on:{change:a.save},model:{value:a.date,callback:function(t){a.date=t},expression:"date"}})],1),e("v-text-field",{attrs:{value:"https://",label:"Website"}}),e("v-radio-group",{attrs:{label:"Gender"},model:{value:a.gender,callback:function(t){a.gender=t},expression:"gender"}},[e("v-radio",{attrs:{label:"Male",value:"male"}}),e("v-radio",{attrs:{label:"Female",value:"female"}}),e("v-radio",{attrs:{label:"Other",value:"other"}})],1)],1)],1),e("div",{staticClass:"d-flex"},[e("v-btn",[a._v("Reset")]),e("v-spacer"),e("v-btn",{attrs:{color:"primary"}},[a._v("Save")])],1)],1)],1)],1)},I=[],T={data:function(){return{date:"1990-10-09",menu:!1,gender:"male"}},watch:{menu:function(a){var t=this;a&&setTimeout((function(){return t.$refs.picker.activePicker="YEAR"}))}},methods:{save:function(a){this.$refs.menu.save(a)}}},U=T,P=e("62ad"),R=e("2e4b"),$=e("4bd4"),B=e("e449"),F=e("67b6"),M=e("43a6"),L=e("0fd9"),O=Object(d["a"])(U,A,I,!1,null,null,null),j=O.exports;u()(O,{VBtn:b["a"],VCard:m["a"],VCardText:f["c"],VCardTitle:f["d"],VCol:P["a"],VDatePicker:R["a"],VForm:$["a"],VMenu:B["a"],VRadio:F["a"],VRadioGroup:M["a"],VRow:L["a"],VSpacer:y["a"],VTextField:D["a"]});var N={components:{CopyLabel:i["a"],AccountTab:S,InformationTab:j},data:function(){return{user:{id:32,email:"bfitchew0@ezinearticles.com",name:"Bartel Fitchew",verified:!1,created:"2019-08-09T03:14:12Z",lastSignIn:"2019-08-14T20:00:53Z",disabled:!0,role:"ADMIN",avatar:"/images/avatars/avatar1.svg"},tab:null,breadcrumbs:[{text:"Users",to:"/users/list",exact:!0},{text:"Edit User"}]}}},Z=N,G=e("2bc5"),J=e("71a3"),z=e("c671"),H=e("fe57"),W=e("aac8"),Y=Object(d["a"])(Z,s,l,!1,null,null,null);t["default"]=Y.exports;u()(Y,{VBreadcrumbs:G["a"],VBtn:b["a"],VIcon:V["a"],VSpacer:y["a"],VTab:J["a"],VTabItem:z["a"],VTabs:H["a"],VTabsItems:W["a"]})}}]);