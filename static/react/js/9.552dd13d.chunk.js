(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{73:function(e,r,t){"use strict";t.r(r);var n=t(2),c=t.n(n),a=t(6),s=t(11),o=t(0),i=t(3),l=t(1);r.default=function(e){var r=e.setSignUpForm,t=e.setSigningIn,n=Object(i.f)((function(e){return e.accountModel.login})),u=Object(i.f)((function(e){return e.loaderModel})).toggleLoader,d=Object(o.useRef)(),f=Object(o.useRef)(),b=Object(o.useState)(2),m=Object(s.a)(b,2),j=m[0],p=m[1],h=function(){var e=Object(a.a)(c.a.mark((function e(r){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.preventDefault(),n({email:d.current.value,password:f.current.value,setError:p,toggleLoader:u,goBack:function(){return t(!1)}});case 2:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return Object(l.jsxs)("div",{className:"front",children:[Object(l.jsxs)("form",{onSubmit:h,className:"form signIn d-flex-column",children:[Object(l.jsxs)("div",{className:"form-field w-100",children:[Object(l.jsx)("label",{htmlFor:"login-email",children:Object(l.jsx)("i",{className:"far fa-envelope foreground-accent"})}),Object(l.jsx)("input",{onChange:function(){return p(2)},ref:d,name:"email",type:"email",className:"form-input w-100 ".concat(0===j?"error":""),placeholder:"Email",required:!0})]}),Object(l.jsxs)("div",{className:"form-field w-100",children:[Object(l.jsx)("label",{htmlFor:"login-password",children:Object(l.jsx)("i",{className:"fas fa-key foreground-accent"})}),Object(l.jsx)("input",{onChange:function(){return p(2)},ref:f,type:"password",name:"password",className:"form-input w-100 ".concat(1===j?"error":""),placeholder:"Password",required:!0})]}),Object(l.jsx)("button",{className:"submit-button background-accent uppercase-text border-radius-5 w-100",type:"submit",children:"Sign In"})]}),Object(l.jsx)("button",{className:"submit-border border-radius-10 w-75 flip-btn",onClick:function(){return r(!0)},children:"SIGN UP"})]})}}}]);
//# sourceMappingURL=9.552dd13d.chunk.js.map