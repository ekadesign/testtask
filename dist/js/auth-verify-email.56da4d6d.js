(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auth-verify-email"],{"58a9":function(e,n,s){"use strict";s.r(n);var t=function(){var e=this,n=e.$createElement,s=e._self._c||n;return s("v-card",{staticClass:"pa-2"},[s("h1",[e._v("Please verify the email")]),s("div",{staticClass:"mb-6 overline"},[e._v("Please check your email for the link to verify the email.")]),s("v-btn",{attrs:{loading:e.isLoading,disabled:e.disabled,block:"",depressed:"","x-large":"",color:"primary"},on:{click:e.resend}},[e._v("Re-send email "+e._s(e.seconds))])],1)},a=[],r=s("1da1"),i=(s("96cf"),10),o={data:function(){return{isLoading:!1,disabled:!0,times:0,resendInterval:null,secondsToEnable:i,seconds:""}},mounted:function(){this.setTimer()},beforeDestroy:function(){clearInterval(this.resendInterval)},methods:{resend:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:e.setTimer();case 1:case"end":return n.stop()}}),n)})))()},setTimer:function(){var e=this;this.disabled=!0,this.times++,this.secondsToEnable=i*this.times,this.resendInterval=setInterval((function(){0===e.secondsToEnable?(clearInterval(e.resendInterval),e.seconds="",e.disabled=!1):(e.seconds="( ".concat(e.secondsToEnable," )"),e.secondsToEnable--)}),1e3)}}},l=o,c=s("2877"),d=s("6544"),u=s.n(d),v=s("8336"),h=s("b0afa"),b=Object(c["a"])(l,t,a,!1,null,null,null);n["default"]=b.exports;u()(b,{VBtn:v["a"],VCard:h["a"]})}}]);