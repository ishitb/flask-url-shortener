(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[7],{137:function(e,t,a){"use strict";a.r(t);var i=a(44),n=a(0),s=a(3),r=(a(138),a(1)),c=Object(n.lazy)((function(){return a.e(3).then(a.bind(null,139))}));t.default=function(e){var t=e.link,a=new Date(t.created.$date),l=Object(s.f)((function(e){return e.linkModel})).deleteLink,d=Object(s.f)((function(e){return e.loaderModel})).toggleLoader,o=Object(n.useState)({}),j=Object(i.a)(o,2),b=j[0],h=j[1],u=Object(n.useState)(!1),x=Object(i.a)(u,2),f=x[0],g=x[1];return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(c,{toEdit:b,show:f,setToEdit:h,setShow:g}),Object(r.jsxs)("div",{className:"link d-flex-column background-dark-translucent border-radius-10",children:[Object(r.jsxs)("div",{className:"buttons",children:[Object(r.jsx)("div",{className:"edit-btn  link-btn",onClick:function(){h(t),g(!0)},children:Object(r.jsx)("i",{className:"far foreground-primary fa-edit"})}),Object(r.jsx)("div",{className:"delete-btn link-btn",onClick:function(){return l({id:t._id.$oid,toggleLoader:d})},children:Object(r.jsx)("i",{className:"far foreground-error fa-trash-alt"})})]}),Object(r.jsxs)("div",{className:"detail",children:[Object(r.jsx)("h5",{className:"normal-text foreground-light",children:"Shortened URL"}),Object(r.jsxs)("a",{className:"subheading-text foreground-accent",href:window.location.toString()+t.short,children:["/",t.short]})]}),Object(r.jsxs)("div",{className:"detail",children:[Object(r.jsx)("h5",{className:"normal-text foreground-light",children:"Original URL"}),Object(r.jsx)("a",{className:"subheading-text foreground-primary",href:t.original,style:{fontSize:"1.5rem"},children:t.original})]}),Object(r.jsxs)("div",{className:"details d-flex",children:[Object(r.jsxs)("div",{className:"detail",children:[Object(r.jsx)("div",{className:"detail-text foreground-accent",children:t.clicks}),Object(r.jsx)("div",{className:"detail-label normal-text foreground-light",children:"Clicks"})]}),Object(r.jsxs)("div",{className:"detail",children:[Object(r.jsx)("div",{className:"detail-text foreground-primary",children:a.toGMTString().substr(5,a.toGMTString().length-12)}),Object(r.jsx)("div",{className:"detail-label normal-text foreground-light",children:"Created at"})]})]})]})]})}},138:function(e,t,a){}}]);
//# sourceMappingURL=7.261a336e.chunk.js.map