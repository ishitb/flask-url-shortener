(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[4],{46:function(t,e,n){"use strict";n.r(e);var r=n(3),o=n.n(r),a=n(11),c=n(43),u=n(0),s=n(14),i=n.n(s),p=n(10),l=(n(47),n(4));e.default=function(){var t=Object(u.useState)(""),e=Object(c.a)(t,2),n=e[0],r=e[1],s=Object(u.useRef)(),b=function(){var t=Object(a.a)(o.a.mark((function t(e){var n,c;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.preventDefault(),n=i.a.load("Token"),c=s.current.value){t.next=6;break}return p.b.error("URL not provided"),t.abrupt("return");case 6:fetch("/api/urls",{method:"POST",headers:new Headers({"Content-Type":"application/json",Accept:"application/json",Authorization:n}),body:JSON.stringify({url:c})}).then(function(){var t=Object(a.a)(o.a.mark((function t(e){var n,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:n=t.sent,201!==e.status?(console.log(n),p.b.error(n.message)):(a="".concat(window.location).concat(n.short),r(a),s.current.value=a,p.b.dark("Link shortened! Press COPY to copy it to your clipboard"));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),console.log("DONE");case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(l.jsxs)("form",{onSubmit:function(t){return n?t.preventDefault():b(t)},className:"add-link d-flex-column",children:[Object(l.jsx)("input",{type:"url",className:"input-box",placeholder:"Enter full link to shorten",onChange:function(){return r("")},ref:s}),n?Object(l.jsx)("button",{onClick:function(){navigator.clipboard.writeText(n),p.b.dark("Shortened URL copied to your clipboard")},className:"subheading-text submit-button uppercase-text",children:"COPY"}):Object(l.jsx)("button",{type:"submit",className:"subheading-text submit-button uppercase-text",children:"Shorten"})]})}},47:function(t,e,n){}}]);
//# sourceMappingURL=4.e9a35258.chunk.js.map