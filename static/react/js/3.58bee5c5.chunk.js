(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[3,5],{125:function(e,t,n){"use strict";n.r(t);var r=n(43),o=(n(126),n(1));t.default=function(e){var t=e.goBack,n=e.pageRef,a=function e(t){for(var n=Object(r.a)(new Set(null===t||void 0===t?void 0:t.children)),o=0;o<n.length;o++)n=n.concat(e(n[o]));return n=Object(r.a)(new Set(n))};return Object(o.jsx)("div",{className:"go-back",onClick:function(){n&&function(e){var t=[];e.forEach((function(e){"input"===e.localName&&(t=[].concat(Object(r.a)(t),[e]))})),t=Object(r.a)(new Set(t));for(var n=0;n<t.length;n++)t[n].value=""}(a(null===n||void 0===n?void 0:n.current)),t()}})}},126:function(e,t,n){},139:function(e,t,n){},140:function(e,t,n){"use strict";n.r(t);var r,o=n(2),a=n.n(o),i=n(5),c=n(44),u=n(19),s=n(0),d=n(3),l=new Uint8Array(16);function f(){if(!r&&!(r="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!==typeof msCrypto&&"function"===typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(l)}var b=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;for(var g=function(e){return"string"===typeof e&&b.test(e)},p=[],h=0;h<256;++h)p.push((h+256).toString(16).substr(1));var m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(p[e[t+0]]+p[e[t+1]]+p[e[t+2]]+p[e[t+3]]+"-"+p[e[t+4]]+p[e[t+5]]+"-"+p[e[t+6]]+p[e[t+7]]+"-"+p[e[t+8]]+p[e[t+9]]+"-"+p[e[t+10]]+p[e[t+11]]+p[e[t+12]]+p[e[t+13]]+p[e[t+14]]+p[e[t+15]]).toLowerCase();if(!g(n))throw TypeError("Stringified UUID is invalid");return n};var j=function(e,t,n){var r=(e=e||{}).random||(e.rng||f)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,t){n=n||0;for(var o=0;o<16;++o)t[n+o]=r[o];return t}return m(r)},v=n(125),O=(n(139),n(1));t.default=function(e){var t=e.toEdit,n=e.show,r=e.setShow,o=e.setToEdit,l=j().toString().substr(0,8),f=Object(d.f)((function(e){return e.linkModel.editLink})),b=Object(d.f)((function(e){return e.loaderModel})).toggleLoader,g=Object(s.useRef)(),p=Object(s.useRef)(),h=Object(s.useRef)(),m=Object(s.useState)(!1),w=Object(c.a)(m,2),x=w[0],y=w[1],k=function(){var e=Object(i.a)(a.a.mark((function e(n){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),f({id:t._id.$oid,updates:{short:p.current.value,original:h.current.value},original:t,toggleLoader:b,setError:y,back:function(){y(!1),o({}),r(!1)},shortRef:p,ogRef:h});case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(u.createPortal)(Object(O.jsxs)("div",{ref:g,className:"edit-link ".concat(n?"shown":""),children:[Object(O.jsx)(v.default,{goBack:function(){o({}),r(!1),y(!1),p.current.value=t.short,h.current.value=t.original}}),Object(O.jsxs)("form",{onSubmit:k,className:"glass-effect edit-form background-main-translucent border-radius-10",children:[Object(O.jsxs)("div",{className:"edit-group w-75",children:[Object(O.jsx)("label",{htmlFor:"".concat(l,"-edit-short"),className:"edit-label normal-text foreground-accent w-100",children:"Shortened URL"}),Object(O.jsx)("input",{ref:p,id:"".concat(l,"-edit-short"),type:"text",className:"edit-input w-100 input-box background-dark-translucent foreground-light ".concat(x?"error":""),placeholder:"Enter Shortened URL",minLength:"4",maxLength:"12",defaultValue:t.short,onChange:function(){return y(!1)},required:!0})]}),Object(O.jsxs)("div",{className:"edit-group w-75",children:[Object(O.jsx)("label",{htmlFor:"".concat(l,"-edit-original"),className:"edit-label normal-text foreground-accent w-100",children:"Original URL"}),Object(O.jsx)("input",{ref:h,id:"".concat(l,"-edit-original"),type:"text",className:"edit-input w-100 input-box background-dark-translucent foreground-light",placeholder:"Enter Original URL",minLength:"4",defaultValue:t.original,required:!0})]}),Object(O.jsx)("button",{className:"submit-border w-75 border-radius-10",children:"Update"})]})]}),document.getElementById("edit-link"))}}}]);
//# sourceMappingURL=3.58bee5c5.chunk.js.map