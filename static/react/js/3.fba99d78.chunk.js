(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[3],{25:function(t,e,n){},26:function(t,e,n){"use strict";n.r(e);var r=n(1),o=n.n(r),a=n(6);function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t)){var n=[],r=!0,o=!1,a=void 0;try{for(var c,u=t[Symbol.iterator]();!(r=(c=u.next()).done)&&(n.push(c.value),!e||n.length!==e);r=!0);}catch(i){o=!0,a=i}finally{try{r||null==u.return||u.return()}finally{if(o)throw a}}return n}}(t,e)||function(t,e){if(t){if("string"===typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var i=n(0),s=n(7),l=n.n(s),p=n(5),f=(n(25),n(2));e.default=function(){var t=u(Object(i.useState)(""),2),e=t[0],n=t[1],r=Object(i.useRef)(),c=function(){var t=Object(a.a)(o.a.mark((function t(e){var c,u;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.preventDefault(),c=l.a.load("Token"),u=r.current.value){t.next=6;break}return p.b.error("URL not provided"),t.abrupt("return");case 6:fetch("/api/urls",{method:"POST",headers:new Headers({"Content-Type":"application/json",Accept:"application/json",Authorization:c}),body:JSON.stringify({url:u})}).then(function(){var t=Object(a.a)(o.a.mark((function t(e){var a,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:a=t.sent,201!==e.status?(console.log(a),p.b.error(a.message)):(c="".concat(window.location).concat(a.short),n(c),r.current.value=c,p.b.dark("Link shortened! Press COPY to copy it to your clipboard"));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),console.log("DONE");case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(f.jsxs)("form",{onSubmit:function(t){return e?t.preventDefault():c(t)},className:"add-link d-flex-column",children:[Object(f.jsx)("input",{type:"url",className:"input-box",placeholder:"Enter full link to shorten",onChange:function(){return n("")},ref:r}),e?Object(f.jsx)("button",{onClick:function(){navigator.clipboard.writeText(e),p.b.dark("Shortened URL copied to your clipboard")},className:"subheading-text submit-button uppercase-text",children:"COPY"}):Object(f.jsx)("button",{type:"submit",className:"subheading-text submit-button uppercase-text",children:"Shorten"})]})}}}]);
//# sourceMappingURL=3.fba99d78.chunk.js.map