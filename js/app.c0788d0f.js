(function(t){function e(e){for(var n,s,i=e[0],l=e[1],c=e[2],f=0,v=[];f<i.length;f++)s=i[f],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&v.push(r[s][0]),r[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(v.length)v.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,i=1;i<a.length;i++){var l=a[i];0!==r[l]&&(n=!1)}n&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},o=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"inspire"}},[a("v-navigation-drawer",{attrs:{app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",{staticClass:"title"},[t._v(" Application ")]),a("v-list-item-subtitle",[t._v(" subtext ")])],1)],1),a("v-divider"),a("v-list",{attrs:{dense:""}},[a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-home")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Home")])],1)],1),a("v-list-item",{attrs:{link:""}},[a("v-list-item-action",[a("v-icon",[t._v("mdi-email")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v("Contact")])],1)],1)],1)],1),a("v-app-bar",{attrs:{app:"",color:"indigo",dark:""}},[a("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("v-toolbar-title",[t._v("Application")])],1),a("v-main",[a("router-view")],1),a("v-footer",{attrs:{color:"indigo",app:""}},[a("span",{staticClass:"white--text"},[t._v("© "+t._s((new Date).getFullYear()))])])],1)},o=[],s=a("bc3a"),i=a.n(s),l=a("a7fe"),c=a.n(l);n["a"].use(c.a,i.a);var u=n["a"].extend({name:"App",props:{source:String},components:{},data:function(){return{drawer:null}}}),f=u,v=a("2877"),d=a("6544"),p=a.n(d),m=a("7496"),g=a("40dc"),h=a("5bc1"),b=a("ce7e"),_=a("553a"),y=a("132d"),S=a("8860"),x=a("da13"),B=a("1800"),w=a("5d23"),D=a("f6c4"),V=a("f774"),j=a("2a7f"),O=Object(v["a"])(f,r,o,!1,null,null,null),k=O.exports;p()(O,{VApp:m["a"],VAppBar:g["a"],VAppBarNavIcon:h["a"],VDivider:b["a"],VFooter:_["a"],VIcon:y["a"],VList:S["a"],VListItem:x["a"],VListItemAction:B["a"],VListItemContent:w["a"],VListItemSubtitle:w["b"],VListItemTitle:w["c"],VMain:D["a"],VNavigationDrawer:V["a"],VToolbarTitle:j["a"]});var C=a("9483");Object(C["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(t){console.error("Error during service worker registration:",t)}});var M=a("8c4f"),T=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"8"}},[[a("v-text-field",{attrs:{hint:"API地址","append-icon":"mdi-cloud-download","prepend-icon":"mdi-link","persistent-hint":""},on:{"click:append":t.getDataFromAPI},model:{value:t.apiURL,callback:function(e){t.apiURL=e},expression:"apiURL"}})]],2)],1),a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{staticClass:"text-center"},[a("v-simple-table",{scopedSlots:t._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",[t._v("公会名")]),a("th",[t._v("一王平均伤害")]),a("th",[t._v("标准差")]),a("th",[t._v("二王平均伤害")]),a("th",[t._v("标准差")]),a("th",[t._v("三王平均伤害")]),a("th",[t._v("标准差")]),a("th",[t._v("四王平均伤害")]),a("th",[t._v("标准差")]),a("th",[t._v("五王平均伤害")]),a("th",[t._v("标准差")])])]),a("tbody",[a("tr",[a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupInfo[0].group_name)+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsMeanDamageByBoss[0])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsDamageSTDVByBoss[0])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsMeanDamageByBoss[1])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsDamageSTDVByBoss[1])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsMeanDamageByBoss[2])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsDamageSTDVByBoss[2])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsMeanDamageByBoss[3])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsDamageSTDVByBoss[3])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsMeanDamageByBoss[4])+" ")]),a("td",{staticClass:"text-left"},[t._v(" "+t._s(t.groupStatsDamageSTDVByBoss[4])+" ")])])])]},proxy:!0}])}),a("v-spacer"),a("v-card-title",[a("v-text-field",{attrs:{label:"Search","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.challenges,search:t.search,"multi-sort":"","disable-pagination":"",dense:"","hide-default-footer":""},scopedSlots:t._u([{key:"item.zScore",fn:function(e){var n=e.item;return[a("v-chip",{attrs:{color:t.getColorByzScore(n.zScore),dark:""}},[t._v(t._s(n.zScore))])]}}],null,!0)})],1)],1)],1)},I=[],A=(a("4de4"),a("4160"),a("a9e3"),a("b680"),a("ac1f"),a("841c"),a("159b"),a("d4ec")),L=a("bee2"),P=a("262e"),z=a("2caf"),E=a("9ab4"),F=a("60a3"),N=a("5a0c"),q=a.n(N),Q=a("d09f"),R=function(t){Object(P["a"])(a,t);var e=Object(z["a"])(a);function a(){var t;return Object(A["a"])(this,a),t=e.apply(this,arguments),t.apiURL="",t.search="",t.groupStatsMeanDamageByBoss=[0,0,0,0,0],t.groupStatsDamageSTDVByBoss=[0,0,0,0,0],t.headers=[{text:"出刀时间",value:"challenge_time"},{text:"QQ号",align:"start",sortable:!1,value:"qqid"},{text:"昵称",align:"start",sortable:!1,value:"nickname"},{text:"周目",value:"cycle",filterable:!1},{text:"BOSS序号",value:"boss_num",filterable:!1},{text:"伤害",value:"damage",filterable:!1},{text:"剩余HP",value:"health_ramain",filterable:!1},{text:"偏差值(z-score)",value:"zScore",filterable:!1}],t.challenges=[],t.memberList=[],t.groupInfo=[],t}return Object(L["a"])(a,[{key:"getColorByzScore",value:function(t){return t>0?"green":t<0?"red":void 0}},{key:"getNicknameByQQID",value:function(t){var e="";return this.memberList.forEach((function(a){if(a.qqid==t)return e=a.nickname,e})),e}},{key:"getDataFromAPI",value:function(){var t=this;this.axios.get(this.apiURL).then((function(e){var a=e.data,n=a.members,r=a.groupinfo,o=e.data.challenges,s=[[],[],[],[],[]];t.memberList=n,o.forEach((function(t,e,a){1!=t.is_continue&&0!=t.health_ramain&&1!=t.cycle||(console.log("to del",e,t),delete a[e])})),o=o.filter(Object).reverse(),o.forEach((function(e){e.challenge_time=q.a.unix(e.challenge_time).format("YYYY-MM-DD HH:mm"),e.nickname=t.getNicknameByQQID(e.qqid),s[e.boss_num-1].push(e.damage)}));for(var i=function(t){s[t].forEach((function(e,a,n){var r=Object(Q["zScore"])(e,Object(Q["mean"])(s[t]),Object(Q["standardDeviation"])(s[t]));Math.abs(r)>6&&delete n[a]})),s[t]=s[t].filter(Number)},l=0;l<5;l++)i(l);for(var c=0;c<5;c++)t.groupStatsMeanDamageByBoss[c]=Math.round(Object(Q["mean"])(s[c])),t.groupStatsDamageSTDVByBoss[c]=Math.round(Object(Q["standardDeviation"])(s[c]));o.forEach((function(e){var a=Object(Q["zScore"])(e.damage,t.groupStatsMeanDamageByBoss[e.boss_num-1],t.groupStatsDamageSTDVByBoss[e.boss_num-1]);e.zScore=a.toFixed(5),Math.abs(a)>6&&(e.zScore+="(无效数据)")})),t.challenges=o,t.groupInfo=r}))}}]),a}(F["b"]);R=Object(E["a"])([Object(F["a"])({components:{}})],R);var H=R,U=H,Y=a("99d9"),$=a("cc20"),J=a("62ad"),G=a("a523"),K=a("8fea"),W=a("0fd9"),X=a("1f4f"),Z=a("2fa4"),tt=a("8654"),et=Object(v["a"])(U,T,I,!1,null,null,null),at=et.exports;p()(et,{VCardTitle:Y["a"],VChip:$["a"],VCol:J["a"],VContainer:G["a"],VDataTable:K["a"],VRow:W["a"],VSimpleTable:X["a"],VSpacer:Z["a"],VTextField:tt["a"]});var nt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},rt=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"about"},[a("h1",[t._v("This is an about page")])])}],ot={},st=Object(v["a"])(ot,nt,rt,!1,null,null,null),it=st.exports;n["a"].use(M["a"]);var lt=[{path:"/",name:"Home",component:at,children:[{path:"about",name:"About",component:it}]}],ct=new M["a"]({mode:"history",base:"/",routes:lt}),ut=ct,ft=a("2f62");n["a"].use(ft["a"]);var vt=new ft["a"].Store({state:{},mutations:{},actions:{},modules:{}}),dt=a("f309");n["a"].use(dt["a"]);var pt=new dt["a"]({});n["a"].config.productionTip=!1,new n["a"]({router:ut,store:vt,vuetify:pt,render:function(t){return t(k)}}).$mount("#app")}});
//# sourceMappingURL=app.c0788d0f.js.map