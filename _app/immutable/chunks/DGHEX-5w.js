import{t as e}from"./CRzLMJPS.js";import{Bs as t,Ct as n,Gs as r,Jo as i,Rs as a,Us as o,Xo as s,Xs as c,Yo as l,Zs as u,_o as d,ec as f,ro as p,tc as m}from"./Cyh7skpB.js";import{$ as h,P as g,Q as _,T as v,at as y,ct as b,et as x,g as S,h as C,j as w,ln as T,n as E,o as ee,ot as te,r as ne,rn as re,rt as ie}from"./DckgkPWP.js";import{$ as D,Ct as O,D as k,E as ae,G as oe,L as A,P as se,R as ce,St as le,U as ue,W as j,X as de,at as fe,ct as pe,et as me,f as he,g as ge,h as _e,it as M,k as ve,l as ye,lt as N,mt as be,ot as xe,q as P,r as Se,st as F,u as Ce,ut as I,vt as we,w as Te,yt as Ee,z as L}from"./L4zAr2tv.js";import"./xihTtKlq.js";import{_ as R,a as De,f as Oe,g as ke,h as Ae,m as je,o as Me,p as Ne,r as Pe,v as Fe}from"./x_u6lKAM.js";import{$t as Ie,At as Le,B as z,C as Re,Ct as ze,D as Be,Dt as Ve,Et as He,F as B,Gt as Ue,H as We,Ht as V,It as Ge,J as Ke,K as qe,Lt as Je,Mt as Ye,N as Xe,Nt as Ze,O as Qe,Ot as $e,P as et,Rt as tt,S as nt,Tt as rt,V as it,Vt as at,Y as ot,Zt as st,_ as ct,an as lt,at as ut,b as dt,bt as ft,d as pt,dt as mt,en as ht,et as gt,ft as _t,g as vt,gt as yt,in as bt,it as xt,jt as St,k as Ct,lt as wt,mt as H,nn as U,on as Tt,ot as Et,rn as W,rt as Dt,st as Ot,tn as kt,tt as At,vt as jt,wt as G,x as Mt,y as Nt,yt as Pt,zt as Ft}from"./Badavffd.js";import{t as It}from"./D0HmJyKz.js";var Lt=1.25,Rt=65535,zt=-65536,Bt=2**-24,Vt=Symbol(`SKIP_GENERATION`),Ht={strategy:0,maxDepth:40,targetLeafSize:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null,[Vt]:!1};function K(e,t,n){return n.min.x=t[e],n.min.y=t[e+1],n.min.z=t[e+2],n.max.x=t[e+3],n.max.y=t[e+4],n.max.z=t[e+5],n}function Ut(e){let t=-1,n=-1/0;for(let r=0;r<3;r++){let i=e[r+3]-e[r];i>n&&(n=i,t=r)}return t}function Wt(e,t){t.set(e)}function Gt(e,t,n){let r,i;for(let a=0;a<3;a++){let o=a+3;r=e[a],i=t[a],n[a]=r<i?r:i,r=e[o],i=t[o],n[o]=r>i?r:i}}function Kt(e,t,n){for(let r=0;r<3;r++){let i=t[e+2*r],a=t[e+2*r+1],o=i-a,s=i+a;o<n[r]&&(n[r]=o),s>n[r+3]&&(n[r+3]=s)}}function qt(e){let t=e[3]-e[0],n=e[4]-e[1],r=e[5]-e[2];return 2*(t*n+n*r+r*t)}function q(e,t){return t[e+15]===Rt}function J(e,t){return t[e+6]}function Jt(e,t){return t[e+14]}function Y(e){return e+8}function X(e,t){return e+t[e+6]*8}function Yt(e,t){return t[e+7]}function Z(e){return e}function Xt(e,t,n,r,i){let a=1/0,o=1/0,s=1/0,c=-1/0,l=-1/0,u=-1/0,d=1/0,f=1/0,p=1/0,m=-1/0,h=-1/0,g=-1/0,_=e.offset||0;for(let r=(t-_)*6,i=(t+n-_)*6;r<i;r+=6){let t=e[r+0],n=e[r+1],i=t-n,_=t+n;i<a&&(a=i),_>c&&(c=_),t<d&&(d=t),t>m&&(m=t);let v=e[r+2],y=e[r+3],b=v-y,x=v+y;b<o&&(o=b),x>l&&(l=x),v<f&&(f=v),v>h&&(h=v);let S=e[r+4],C=e[r+5],w=S-C,T=S+C;w<s&&(s=w),T>u&&(u=T),S<p&&(p=S),S>g&&(g=S)}r[0]=a,r[1]=o,r[2]=s,r[3]=c,r[4]=l,r[5]=u,i[0]=d,i[1]=f,i[2]=p,i[3]=m,i[4]=h,i[5]=g}var Zt=32,Qt=(e,t)=>e.candidate-t.candidate,$t=Array(Zt).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),en=new Float32Array(6);function tn(e,t,n,r,i,a){let o=-1,s=0;if(a===0)o=Ut(t),o!==-1&&(s=(t[o]+t[o+3])/2);else if(a===1)o=Ut(e),o!==-1&&(s=nn(n,r,i,o));else if(a===2){let a=qt(e),c=Lt*i,l=n.offset||0,u=(r-l)*6,d=(r+i-l)*6;for(let e=0;e<3;e++){let r=t[e],l=(t[e+3]-r)/Zt;if(i<Zt/4){let t=[...$t];t.length=i;let r=0;for(let i=u;i<d;i+=6,r++){let a=t[r];a.candidate=n[i+2*e],a.count=0;let{bounds:o,leftCacheBounds:s,rightCacheBounds:c}=a;for(let e=0;e<3;e++)c[e]=1/0,c[e+3]=-1/0,s[e]=1/0,s[e+3]=-1/0,o[e]=1/0,o[e+3]=-1/0;Kt(i,n,o)}t.sort(Qt);let l=i;for(let e=0;e<l;e++){let n=t[e];for(;e+1<l&&t[e+1].candidate===n.candidate;)t.splice(e+1,1),l--}for(let r=u;r<d;r+=6){let i=n[r+2*e];for(let e=0;e<l;e++){let a=t[e];i>=a.candidate?Kt(r,n,a.rightCacheBounds):(Kt(r,n,a.leftCacheBounds),a.count++)}}for(let n=0;n<l;n++){let r=t[n],l=r.count,u=i-r.count,d=r.leftCacheBounds,f=r.rightCacheBounds,p=0;l!==0&&(p=qt(d)/a);let m=0;u!==0&&(m=qt(f)/a);let h=1+Lt*(p*l+m*u);h<c&&(o=e,c=h,s=r.candidate)}}else{for(let e=0;e<Zt;e++){let t=$t[e];t.count=0,t.candidate=r+l+e*l;let n=t.bounds;for(let e=0;e<3;e++)n[e]=1/0,n[e+3]=-1/0}for(let t=u;t<d;t+=6){let i=~~((n[t+2*e]-r)/l);i>=Zt&&(i=31);let a=$t[i];a.count++,Kt(t,n,a.bounds)}let t=$t[31];Wt(t.bounds,t.rightCacheBounds);for(let e=30;e>=0;e--){let t=$t[e],n=$t[e+1];Gt(t.bounds,n.rightCacheBounds,t.rightCacheBounds)}let f=0;for(let t=0;t<31;t++){let n=$t[t],r=n.count,l=n.bounds,u=$t[t+1].rightCacheBounds;r!==0&&(f===0?Wt(l,en):Gt(l,en,en)),f+=r;let d=0,p=0;f!==0&&(d=qt(en)/a);let m=i-f;m!==0&&(p=qt(u)/a);let h=1+Lt*(d*f+p*m);h<c&&(o=e,c=h,s=n.candidate)}}}}else console.warn(`BVH: Invalid build strategy value ${a} used.`);return{axis:o,pos:s}}function nn(e,t,n,r){let i=0,a=e.offset;for(let o=t,s=t+n;o<s;o++)i+=e[(o-a)*6+r*2];return i/n}var rn=class{constructor(){this.boundingData=new Float32Array(6)}};function an(e,t,n,r,i,a){let o=r,s=r+i-1,c=a.pos,l=a.axis*2,u=n.offset||0;for(;;){for(;o<=s&&n[(o-u)*6+l]<c;)o++;for(;o<=s&&n[(s-u)*6+l]>=c;)s--;if(o<s){for(let n=0;n<t;n++){let r=e[o*t+n];e[o*t+n]=e[s*t+n],e[s*t+n]=r}for(let e=0;e<6;e++){let t=o-u,r=s-u,i=n[t*6+e];n[t*6+e]=n[r*6+e],n[r*6+e]=i}o++,s--}else return o}}var on,sn,cn,ln,un=2**32;function dn(e){return`count`in e?1:1+dn(e.left)+dn(e.right)}function fn(e,t,n){return on=new Float32Array(n),sn=new Uint32Array(n),cn=new Uint16Array(n),ln=new Uint8Array(n),pn(e,t)}function pn(e,t){let n=e/4,r=e/2,i=`count`in t,a=t.boundingData;for(let e=0;e<6;e++)on[n+e]=a[e];if(i)return t.buffer?(ln.set(new Uint8Array(t.buffer),e),e+t.buffer.byteLength):(sn[n+6]=t.offset,cn[r+14]=t.count,cn[r+15]=Rt,e+32);{let{left:r,right:i,splitAxis:a}=t,o=pn(e+32,r),s=e/32,c=o/32-s;if(c>un)throw Error(`MeshBVH: Cannot store relative child node offset greater than 32 bits.`);return sn[n+6]=c,sn[n+7]=a,pn(o,i)}}function mn(e,t,n,r,i,a){let{maxDepth:o,verbose:s,targetLeafSize:c,_strictLeafSize:l=1/0,strategy:u,onProgress:d}=i,f=e.primitiveBuffer,p=e.primitiveBufferStride,m=new Float32Array(6),h=!1,g=new rn;return Xt(t,n,r,g.boundingData,m),v(g,n,r,m),g;function _(e){d&&d((e-a.offset)/a.count)}function v(e,n,r,i=null,a=0){!h&&a>=o&&(h=!0,s&&console.warn(`BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`));let d=r>l;if(r<=c&&!d||a>=o)return _(n+r),e.offset=n,e.count=r,e;let g=tn(e.boundingData,i,t,n,r,u),y=g.axis===-1?-1:an(f,p,t,n,r,g);if(g.axis===-1||y===n||y===n+r){if(!d)return _(n+r),e.offset=n,e.count=r,e;g.axis=Math.max(0,Ut(e.boundingData)),y=n+Math.max(1,Math.floor(r/2))}e.splitAxis=g.axis;let b=new rn,x=n,S=y-n;e.left=b,Xt(t,x,S,b.boundingData,m),v(b,x,S,m,a+1);let C=new rn,w=y,T=r-S;return e.right=C,Xt(t,w,T,C.boundingData,m),v(C,w,T,m,a+1),e}}function hn(e,t){let n=t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,r=e.getRootRanges(t.range),i=r[0],a=r[r.length-1],o={offset:i.offset,count:a.offset+a.count-i.offset},s=new Float32Array(6*o.count);s.offset=o.offset,e.computePrimitiveBounds(o.offset,o.count,s),e._roots=r.map(r=>{let i=mn(e,s,r.offset,r.count,t,o),a=dn(i),c=new n(32*a);return fn(0,i,c),c})}var gn=class{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return e.length===0?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}},Q=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;let e=[],t=null;this.setBuffer=n=>{t&&e.push(t),t=n,this.float32Array=new Float32Array(n),this.uint16Array=new Uint16Array(n),this.uint32Array=new Uint32Array(n)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,e.length!==0&&this.setBuffer(e.pop())}}},_n,vn,yn=[],bn=new gn(()=>new ct);function xn(e,t,n,r,i,a){_n=bn.getPrimitive(),vn=bn.getPrimitive(),yn.push(_n,vn),Q.setBuffer(e._roots[t]);let o=Sn(0,e.geometry,n,r,i,a);Q.clearBuffer(),bn.releasePrimitive(_n),bn.releasePrimitive(vn),yn.pop(),yn.pop();let s=yn.length;return s>0&&(vn=yn[s-1],_n=yn[s-2]),o}function Sn(e,t,n,r,i=null,a=0,o=0){let{float32Array:s,uint16Array:c,uint32Array:l}=Q,u=e*2;if(q(u,c)){let t=J(e,l),n=Jt(u,c);return K(Z(e),s,_n),r(t,n,!1,o,a+e/8,_n)}{let u=Y(e),d=X(e,l),f=u,p=d,m,h,g,_;if(i&&(g=_n,_=vn,K(Z(f),s,g),K(Z(p),s,_),m=i(g),h=i(_),h<m)){f=d,p=u;let e=m;m=h,h=e,g=_}g||(g=_n,K(Z(f),s,g));let v=q(f*2,c),y=n(g,v,m,o+1,a+f/8),b;if(y===2){let e=w(f);b=r(e,T(f)-e,!0,o+1,a+f/8,g)}else b=y&&Sn(f,t,n,r,i,a,o+1);if(b)return!0;_=vn,K(Z(p),s,_);let x=q(p*2,c),S=n(_,x,h,o+1,a+p/8),C;if(S===2){let e=w(p);C=r(e,T(p)-e,!0,o+1,a+p/8,_)}else C=S&&Sn(p,t,n,r,i,a,o+1);return!!C;function w(e){let{uint16Array:t,uint32Array:n}=Q,r=e*2;for(;!q(r,t);)e=Y(e),r=e*2;return J(e,n)}function T(e){let{uint16Array:t,uint32Array:n}=Q,r=e*2;for(;!q(r,t);)e=X(e,n),r=e*2;return J(e,n)+Jt(r,t)}}}var Cn=new Q.constructor,wn=new Q.constructor,Tn=new gn(()=>new ct),En=new ct,Dn=new ct,On=new ct,kn=new ct,An=!1;function jn(e,t,n,r){if(An)throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);An=!0;let i=e._roots,a=t._roots,o,s=0,c=0,l=new ut().copy(n).invert();for(let e=0,t=i.length;e<t;e++){Cn.setBuffer(i[e]),c=0;let t=Tn.getPrimitive();K(Z(0),Cn.float32Array,t),t.applyMatrix4(l);for(let e=0,i=a.length;e<i&&(wn.setBuffer(a[e]),o=Mn(0,0,n,l,r,s,c,0,0,t),wn.clearBuffer(),c+=a[e].byteLength/32,!o);e++);if(Tn.releasePrimitive(t),Cn.clearBuffer(),s+=i[e].byteLength/32,o)break}return An=!1,o}function Mn(e,t,n,r,i,a=0,o=0,s=0,c=0,l=null,u=!1){let d,f;u?(d=wn,f=Cn):(d=Cn,f=wn);let p=d.float32Array,m=d.uint32Array,h=d.uint16Array,g=f.float32Array,_=f.uint32Array,v=f.uint16Array,y=e*2,b=t*2,x=q(y,h),S=q(b,v),C=!1;if(S&&x)C=u?i(J(t,_),Jt(t*2,v),J(e,m),Jt(e*2,h),c,o+t/8,s,a+e/8):i(J(e,m),Jt(e*2,h),J(t,_),Jt(t*2,v),s,a+e/8,c,o+t/8);else if(S){let l=Tn.getPrimitive();K(Z(t),g,l),l.applyMatrix4(n);let d=Y(e),f=X(e,m);K(Z(d),p,En),K(Z(f),p,Dn);let h=l.intersectsBox(En),_=l.intersectsBox(Dn);C=h&&Mn(t,d,r,n,i,o,a,c,s+1,l,!u)||_&&Mn(t,f,r,n,i,o,a,c,s+1,l,!u),Tn.releasePrimitive(l)}else{let d=Y(t),f=X(t,_);K(Z(d),g,On),K(Z(f),g,kn);let h=l.intersectsBox(On),v=l.intersectsBox(kn);if(h&&v)C=Mn(e,d,n,r,i,a,o,s,c+1,l,u)||Mn(e,f,n,r,i,a,o,s,c+1,l,u);else if(h){if(x)C=Mn(e,d,n,r,i,a,o,s,c+1,l,u);else{let t=Tn.getPrimitive();t.copy(On).applyMatrix4(n);let l=Y(e),f=X(e,m);K(Z(l),p,En),K(Z(f),p,Dn);let h=t.intersectsBox(En),g=t.intersectsBox(Dn);C=h&&Mn(d,l,r,n,i,o,a,c,s+1,t,!u)||g&&Mn(d,f,r,n,i,o,a,c,s+1,t,!u),Tn.releasePrimitive(t)}}else if(v){if(x)C=Mn(e,f,n,r,i,a,o,s,c+1,l,u);else{let t=Tn.getPrimitive();t.copy(kn).applyMatrix4(n);let l=Y(e),d=X(e,m);K(Z(l),p,En),K(Z(d),p,Dn);let h=t.intersectsBox(En),g=t.intersectsBox(Dn);C=h&&Mn(f,l,r,n,i,o,a,c,s+1,t,!u)||g&&Mn(f,d,r,n,i,o,a,c,s+1,t,!u),Tn.releasePrimitive(t)}}}return C}var Nn=new class{constructor(){let e=null,t=null,n=null,r=!1;this.root=null,this.buffer=null,this.uint32Array=null,this.uint16Array=null,this.setBVH=(i,a)=>{if(r)throw Error(`BVHTraversalHelper: cannot call setBVH during an active traversal.`);this.root=a,this.buffer=e=i._roots[a],this.uint16Array=n=new Uint16Array(e),this.uint32Array=t=new Uint32Array(e)},this.reset=()=>{this.root=null,this.buffer=e=null,this.uint16Array=n=null,this.uint32Array=t=null},this.getRangeStart=e=>{let r=e*2;for(;!q(r,n);)e=Y(e),r=e*2;return J(e,t)},this.getRangeEnd=e=>{let r=e*2;for(;!q(r,n);)e=X(e,t),r=e*2;return J(e,t)+Jt(r,n)};let i=(e,r,a)=>{let o=q(r*2,n);if(!e(a,o,r)&&!o){let n=Y(r),o=X(r,t);i(e,n,a+1),i(e,o,a+1)}};this.traverseBuffer=e=>{if(r)throw Error(`BVHTraversalHelper: cannot start a traversal during an active traversal.`);r=!0;try{i(e,0,0)}finally{r=!1}},this.traverse=r=>{this.traverseBuffer((i,a,o)=>{if(a){let s=o*2,c=t[o+6],l=n[s+14];return r(i,a,new Float32Array(e,o*4,6),c,l)}{let n=Yt(o,t);return r(i,a,new Float32Array(e,o*4,6),n)}})}}},Pn=new ct,Fn=new Float32Array(6),In=class{constructor(){this._roots=null,this.primitiveBuffer=null,this.primitiveBufferStride=null}init(e){e={...Ht,...e},`maxLeafSize`in e&&(console.warn(`BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.`),e={...e,targetLeafSize:e.maxLeafSize}),hn(this,e)}getRootRanges(){throw Error(`BVH: getRootRanges() not implemented`)}writePrimitiveBounds(){throw Error(`BVH: writePrimitiveBounds() not implemented`)}writePrimitiveRangeBounds(e,t,n,r){let i=1/0,a=1/0,o=1/0,s=-1/0,c=-1/0,l=-1/0;for(let n=e,r=e+t;n<r;n++){this.writePrimitiveBounds(n,Fn,0);let[e,t,r,u,d,f]=Fn;e<i&&(i=e),u>s&&(s=u),t<a&&(a=t),d>c&&(c=d),r<o&&(o=r),f>l&&(l=f)}return n[r+0]=i,n[r+1]=a,n[r+2]=o,n[r+3]=s,n[r+4]=c,n[r+5]=l,n}computePrimitiveBounds(e,t,n){let r=n.offset||0;for(let i=e,a=e+t;i<a;i++){this.writePrimitiveBounds(i,Fn,0);let[e,t,a,o,s,c]=Fn,l=(e+o)/2,u=(t+s)/2,d=(a+c)/2,f=(o-e)/2,p=(s-t)/2,m=(c-a)/2,h=(i-r)*6;n[h+0]=l,n[h+1]=f+(Math.abs(l)+f)*Bt,n[h+2]=u,n[h+3]=p+(Math.abs(u)+p)*Bt,n[h+4]=d,n[h+5]=m+(Math.abs(d)+m)*Bt}return n}shiftPrimitiveOffsets(e){let t=this._indirectBuffer;if(t)for(let n=0,r=t.length;n<r;n++)t[n]+=e;else{let t=this._roots;for(let n=0;n<t.length;n++){let r=t[n],i=new Uint32Array(r),a=new Uint16Array(r),o=r.byteLength/32;for(let t=0;t<o;t++){let n=8*t;q(2*n,a)&&(i[n+6]+=e)}}}}traverse(e,t=0){Nn.setBVH(this,t),Nn.traverse(e),Nn.reset()}refit(){let e=this._roots;for(let t=0,n=e.length;t<n;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n),a=new Float32Array(n),o=n.byteLength/32;for(let e=o-1;e>=0;e--){let t=e*8,n=t*2;if(q(n,i)){let e=J(t,r),o=Jt(n,i);this.writePrimitiveRangeBounds(e,o,Fn,0),a.set(Fn,t)}else{let e=Y(t),n=X(t,r);for(let r=0;r<3;r++){let i=a[e+r],o=a[e+r+3],s=a[n+r],c=a[n+r+3];a[t+r]=i<s?i:s,a[t+r+3]=o>c?o:c}}}}}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{K(0,new Float32Array(t),Pn),e.union(Pn)}),e}shapecast(e){let{boundsTraverseOrder:t,intersectsBounds:n,intersectsRange:r,intersectsPrimitive:i,scratchPrimitive:a,iterate:o}=e;if(r&&i){let e=r;r=(t,n,r,s,c)=>e(t,n,r,s,c)?!0:o(t,n,this,i,r,s,a)}else r||=i?(e,t,n,r)=>o(e,t,this,i,n,r,a):(e,t,n)=>n;let s=!1,c=0,l=this._roots;for(let e=0,i=l.length;e<i;e++){let i=l[e];if(s=xn(this,e,n,r,t,c),s)break;c+=i.byteLength/32}return s}bvhcast(e,t,n){let{intersectsRanges:r}=n;return jn(this,e,t,r)}};function Ln(){return typeof SharedArrayBuffer<`u`}function Rn(e){return e.index?e.index.count:e.attributes.position.count}function zn(e){return Rn(e)/3}function Bn(e,t=ArrayBuffer){return e>65535?new Uint32Array(new t(4*e)):new Uint16Array(new t(2*e))}function Vn(e,t){if(!e.index){let n=e.attributes.position.count,r=Bn(n,t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);e.setIndex(new Nt(r,1));for(let e=0;e<n;e++)r[e]=e}}function Hn(e,t,n){let r=Rn(e)/n,i=t||e.drawRange,a=i.start/n,o=(i.start+i.count)/n,s=Math.max(0,a),c=Math.min(r,o)-s;return{offset:Math.floor(s),count:Math.floor(c)}}function Un(e,t){return e.groups.map(e=>({offset:e.start/t,count:e.count/t}))}function Wn(e,t,n){let r=Hn(e,t,n),i=Un(e,n);if(!i.length)return[r];let a=[],o=r.offset,s=r.offset+r.count,c=Rn(e)/n,l=[];for(let e of i){let{offset:t,count:n}=e,r=t,i=t+(isFinite(n)?n:c-t);r<s&&i>o&&(l.push({pos:Math.max(o,r),isStart:!0}),l.push({pos:Math.min(s,i),isStart:!1}))}l.sort((e,t)=>e.pos===t.pos?e.type===`end`?-1:1:e.pos-t.pos);let u=0,d=null;for(let e of l){let t=e.pos;u!==0&&t!==d&&a.push({offset:d,count:t-d}),u+=e.isStart?1:-1,d=t}return a}function Gn(e,t){let n=e[e.length-1],r=n.offset+n.count>2**16,i=e.reduce((e,t)=>e+t.count,0),a=r?4:2,o=t?new SharedArrayBuffer(i*a):new ArrayBuffer(i*a),s=r?new Uint32Array(o):new Uint16Array(o),c=0;for(let t=0;t<e.length;t++){let{offset:n,count:r}=e[t];for(let e=0;e<r;e++)s[c+e]=n+e;c+=r}return s}var Kn=class extends In{get indirect(){return!!this._indirectBuffer}get primitiveStride(){return null}get primitiveBufferStride(){return this.indirect?1:this.primitiveStride}set primitiveBufferStride(e){}get primitiveBuffer(){return this.indirect?this._indirectBuffer:this.geometry.index.array}set primitiveBuffer(e){}constructor(e,t={}){if(!e.isBufferGeometry)throw Error(`BVH: Only BufferGeometries are supported.`);if(e.index&&e.index.isInterleavedBufferAttribute)throw Error(`BVH: InterleavedBufferAttribute is not supported for the index attribute.`);if(t.useSharedArrayBuffer&&!Ln())throw Error(`BVH: SharedArrayBuffer is not available.`);super(),this.geometry=e,this.resolvePrimitiveIndex=t.indirect?e=>this._indirectBuffer[e]:e=>e,this.primitiveBuffer=null,this.primitiveBufferStride=null,this._indirectBuffer=null,t={...Ht,...t},t[Vt]||this.init(t)}init(e){let{geometry:t,primitiveStride:n}=this;if(e.indirect){let r=Gn(Wn(t,e.range,n),e.useSharedArrayBuffer);this._indirectBuffer=r}else Vn(t,e);super.init(e),!t.boundingBox&&e.setBoundingBox&&(t.boundingBox=this.getBoundingBox(new ct))}getRootRanges(e){return this.indirect?[{offset:0,count:this._indirectBuffer.length}]:Wn(this.geometry,e,this.primitiveStride)}raycastObject3D(){throw Error(`BVH: raycastObject3D() not implemented`)}},qn=class{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let n=1/0,r=-1/0;for(let i=0,a=e.length;i<a;i++){let a=e[i][t];n=a<n?a:n,r=a>r?a:r}this.min=n,this.max=r}setFromPoints(e,t){let n=1/0,r=-1/0;for(let i=0,a=t.length;i<a;i++){let a=t[i],o=e.dot(a);n=o<n?o:n,r=o>r?o:r}this.min=n,this.max=r}isSeparated(e){return this.min>e.max||e.min>this.max}};qn.prototype.setFromBox=(function(){let e=new W;return function(t,n){let r=n.min,i=n.max,a=1/0,o=-1/0;for(let n=0;n<=1;n++)for(let s=0;s<=1;s++)for(let c=0;c<=1;c++){e.x=r.x*n+i.x*(1-n),e.y=r.y*s+i.y*(1-s),e.z=r.z*c+i.z*(1-c);let l=t.dot(e);a=Math.min(l,a),o=Math.max(l,o)}this.min=a,this.max=o}})();var Jn=(function(){let e=new W,t=new W,n=new W;return function(r,i,a){let o=r.start,s=e,c=i.start,l=t;n.subVectors(o,c),e.subVectors(r.end,r.start),t.subVectors(i.end,i.start);let u=n.dot(l),d=l.dot(s),f=l.dot(l),p=n.dot(s),m=s.dot(s)*f-d*d,h,g;h=m===0?0:(u*d-p*f)/m,g=(u+h*d)/f,a.x=h,a.y=g}})(),Yn=(function(){let e=new U,t=new W,n=new W;return function(r,i,a,o){Jn(r,i,e);let s=e.x,c=e.y;if(s>=0&&s<=1&&c>=0&&c<=1)r.at(s,a),i.at(c,o);else if(s>=0&&s<=1)c<0?i.at(0,o):i.at(1,o),r.closestPointToPoint(o,!0,a);else if(c>=0&&c<=1)s<0?r.at(0,a):r.at(1,a),i.closestPointToPoint(a,!0,o);else{let e;e=s<0?r.start:r.end;let l;l=c<0?i.start:i.end;let u=t,d=n;if(r.closestPointToPoint(l,!0,t),i.closestPointToPoint(e,!0,n),u.distanceToSquared(l)<=d.distanceToSquared(e)){a.copy(u),o.copy(l);return}a.copy(e),o.copy(d);return}}})(),Xn=(function(){let e=new W,t=new W,n=new Pt,r=new ot;return function(i,a){let{radius:o,center:s}=i,{a:c,b:l,c:u}=a;if(r.start=c,r.end=l,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o||(r.start=c,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o)||(r.start=l,r.end=u,r.closestPointToPoint(s,!0,e).distanceTo(s)<=o))return!0;let d=a.getPlane(n);if(Math.abs(d.distanceToPoint(s))<=o){let e=d.projectPoint(s,t);if(a.containsPoint(e))return!0}return!1}})(),Zn=[`x`,`y`,`z`],Qn=1e-15,$n=Qn*Qn;function er(e){return Math.abs(e)<Qn}var tr=class extends st{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new W),this.satBounds=[,,,,].fill().map(()=>new qn),this.points=[this.a,this.b,this.c],this.plane=new Pt,this.isDegenerateIntoSegment=!1,this.isDegenerateIntoPoint=!1,this.degenerateSegment=new ot,this.needsUpdate=!0}intersectsSphere(e){return Xn(e,this)}update(){let e=this.a,t=this.b,n=this.c,r=this.points,i=this.satAxes,a=this.satBounds,o=i[0],s=a[0];this.getNormal(o),s.setFromPoints(o,r);let c=i[1],l=a[1];c.subVectors(e,t),l.setFromPoints(c,r);let u=i[2],d=a[2];u.subVectors(t,n),d.setFromPoints(u,r);let f=i[3],p=a[3];f.subVectors(n,e),p.setFromPoints(f,r);let m=c.length(),h=u.length(),g=f.length();this.isDegenerateIntoPoint=!1,this.isDegenerateIntoSegment=!1,m<Qn?h<Qn||g<Qn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(e),this.degenerateSegment.end.copy(n)):h<Qn?g<Qn?this.isDegenerateIntoPoint=!0:(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(t),this.degenerateSegment.end.copy(e)):g<Qn&&(this.isDegenerateIntoSegment=!0,this.degenerateSegment.start.copy(n),this.degenerateSegment.end.copy(t)),this.plane.setFromNormalAndCoplanarPoint(o,e),this.needsUpdate=!1}};tr.prototype.closestPointToSegment=(function(){let e=new W,t=new W,n=new ot;return function(r,i=null,a=null){let{start:o,end:s}=r,c=this.points,l,u=1/0;for(let o=0;o<3;o++){let s=(o+1)%3;n.start.copy(c[o]),n.end.copy(c[s]),Yn(n,r,e,t),l=e.distanceToSquared(t),l<u&&(u=l,i&&i.copy(e),a&&a.copy(t))}return this.closestPointToPoint(o,e),l=o.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(o)),this.closestPointToPoint(s,e),l=s.distanceToSquared(e),l<u&&(u=l,i&&i.copy(e),a&&a.copy(s)),Math.sqrt(u)}})(),tr.prototype.intersectsTriangle=(function(){let e=new tr,t=new qn,n=new qn,r=new W,i=new W,a=new W,o=new W,s=new ot,c=new ot,l=new W,u=new U,d=new U;function f(e,i,a,s){let c=r;!e.isDegenerateIntoPoint&&!e.isDegenerateIntoSegment?c.copy(e.plane.normal):c.copy(i.plane.normal);let l=e.satBounds,u=e.satAxes;for(let r=1;r<4;r++){let a=l[r],s=u[r];if(t.setFromPoints(s,i.points),a.isSeparated(t)||(o.copy(c).cross(s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}let d=i.satBounds,f=i.satAxes;for(let r=1;r<4;r++){let a=d[r],s=f[r];if(t.setFromPoints(s,e.points),a.isSeparated(t)||(o.crossVectors(c,s),t.setFromPoints(o,e.points),n.setFromPoints(o,i.points),t.isSeparated(n)))return!1}return a&&(s||console.warn(`ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`),a.start.set(0,0,0),a.end.set(0,0,0)),!0}function p(e,t,n,r,i,a,o,s,c,l,u){let d=o/(o-s);l.x=r+(i-r)*d,u.start.subVectors(t,e).multiplyScalar(d).add(e),d=o/(o-c),l.y=r+(a-r)*d,u.end.subVectors(n,e).multiplyScalar(d).add(e)}function m(e,t,n,r,i,a,o,s,c,l,u){if(i>0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else if(a>0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(s*c>0||o!=0)p(e.a,e.b,e.c,t,n,r,o,s,c,l,u);else if(s!=0)p(e.b,e.a,e.c,n,t,r,s,o,c,l,u);else if(c!=0)p(e.c,e.a,e.b,r,t,n,c,o,s,l,u);else return!0;return!1}function h(e,t,n,i){let a=t.degenerateSegment,o=e.plane.distanceToPoint(a.start),s=e.plane.distanceToPoint(a.end);return er(o)?er(s)?f(e,t,n,i):(n&&(n.start.copy(a.start),n.end.copy(a.start)),e.containsPoint(a.start)):er(s)?(n&&(n.start.copy(a.end),n.end.copy(a.end)),e.containsPoint(a.end)):e.plane.intersectLine(a,r)!=null&&(n&&(n.start.copy(r),n.end.copy(r)),e.containsPoint(r))}function g(e,t,n){let r=t.a;return er(e.plane.distanceToPoint(r))&&e.containsPoint(r)?(n&&(n.start.copy(r),n.end.copy(r)),!0):!1}function _(e,t,n){let i=e.degenerateSegment,a=t.a;return i.closestPointToPoint(a,!0,r),a.distanceToSquared(r)<$n&&(n&&(n.start.copy(a),n.end.copy(a)),!0)}function v(e,t,n,o){if(e.isDegenerateIntoSegment){if(t.isDegenerateIntoSegment){let o=e.degenerateSegment,s=t.degenerateSegment,c=i,l=a;o.delta(c),s.delta(l);let u=r.subVectors(s.start,o.start),d=c.x*l.y-c.y*l.x;if(er(d))return!1;let f=(u.x*l.y-u.y*l.x)/d,p=-(c.x*u.y-c.y*u.x)/d;return f<0||f>1||p<0||p>1?!1:er(o.start.z+c.z*f-(s.start.z+l.z*p))?(n&&(n.start.copy(o.start).addScaledVector(c,f),n.end.copy(o.start).addScaledVector(c,f)),!0):!1}return t.isDegenerateIntoPoint?_(e,t,n):h(t,e,n,o)}if(e.isDegenerateIntoPoint)return t.isDegenerateIntoPoint?t.a.distanceToSquared(e.a)<$n&&(n&&(n.start.copy(e.a),n.end.copy(e.a)),!0):t.isDegenerateIntoSegment?_(t,e,n):g(t,e,n);if(t.isDegenerateIntoPoint)return g(e,t,n);if(t.isDegenerateIntoSegment)return h(e,t,n,o)}return function(t,n=null,r=!1){this.needsUpdate&&this.update(),t.isExtendedTriangle?t.needsUpdate&&t.update():(e.copy(t),e.update(),t=e);let o=v(this,t,n,r);if(o!==void 0)return o;let p=this.plane,h=t.plane,g=h.distanceToPoint(this.a),_=h.distanceToPoint(this.b),y=h.distanceToPoint(this.c);er(g)&&(g=0),er(_)&&(_=0),er(y)&&(y=0);let b=g*_,x=g*y;if(b>0&&x>0)return!1;let S=p.distanceToPoint(t.a),C=p.distanceToPoint(t.b),w=p.distanceToPoint(t.c);er(S)&&(S=0),er(C)&&(C=0),er(w)&&(w=0);let T=S*C,E=S*w;if(T>0&&E>0)return!1;i.copy(p.normal),a.copy(h.normal);let ee=i.cross(a),te=0,ne=Math.abs(ee.x),re=Math.abs(ee.y);re>ne&&(ne=re,te=1),Math.abs(ee.z)>ne&&(te=2);let ie=Zn[te],D=this.a[ie],O=this.b[ie],k=this.c[ie],ae=t.a[ie],oe=t.b[ie],A=t.c[ie];if(m(this,D,O,k,b,x,g,_,y,u,s)||m(t,ae,oe,A,T,E,S,C,w,d,c))return f(this,t,n,r);if(u.y<u.x){let e=u.y;u.y=u.x,u.x=e,l.copy(s.start),s.start.copy(s.end),s.end.copy(l)}if(d.y<d.x){let e=d.y;d.y=d.x,d.x=e,l.copy(c.start),c.start.copy(c.end),c.end.copy(l)}return u.y<d.x||d.y<u.x?!1:(n&&(d.x>u.x?n.start.copy(c.start):n.start.copy(s.start),d.y<u.y?n.end.copy(c.end):n.end.copy(s.end)),!0)}})(),tr.prototype.distanceToPoint=(function(){let e=new W;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),tr.prototype.distanceToTriangle=(function(){let e=new W,t=new W,n=[`a`,`b`,`c`],r=new ot,i=new ot;return function(a,o=null,s=null){let c=o||s?r:null;if(this.intersectsTriangle(a,c,!0))return(o||s)&&(o&&c.getCenter(o),s&&c.getCenter(s)),0;let l=1/0;for(let t=0;t<3;t++){let r,i=n[t],c=a[i];this.closestPointToPoint(c,e),r=c.distanceToSquared(e),r<l&&(l=r,o&&o.copy(e),s&&s.copy(c));let u=this[i];a.closestPointToPoint(u,e),r=u.distanceToSquared(e),r<l&&(l=r,o&&o.copy(u),s&&s.copy(e))}for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];r.set(this[u],this[d]);for(let c=0;c<3;c++){let u=n[c],d=n[(c+1)%3];i.set(a[u],a[d]),Yn(r,i,e,t);let f=e.distanceToSquared(t);f<l&&(l=f,o&&o.copy(e),s&&s.copy(t))}}return Math.sqrt(l)}})();var nr=class{constructor(e,t,n){this.isOrientedBox=!0,this.min=new W,this.max=new W,this.matrix=new ut,this.invMatrix=new ut,this.points=Array(8).fill().map(()=>new W),this.satAxes=[,,,].fill().map(()=>new W),this.satBounds=[,,,].fill().map(()=>new qn),this.alignedSatBounds=[,,,].fill().map(()=>new qn),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),n&&this.matrix.copy(n)}set(e,t,n){this.min.copy(e),this.max.copy(t),this.matrix.copy(n),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}};nr.prototype.update=(function(){return function(){let e=this.matrix,t=this.min,n=this.max,r=this.points;for(let i=0;i<=1;i++)for(let a=0;a<=1;a++)for(let o=0;o<=1;o++){let s=r[1*i|2*a|4*o];s.x=i?n.x:t.x,s.y=a?n.y:t.y,s.z=o?n.z:t.z,s.applyMatrix4(e)}let i=this.satBounds,a=this.satAxes,o=r[0];for(let e=0;e<3;e++){let t=a[e],n=i[e],s=r[1<<e];t.subVectors(o,s),n.setFromPoints(t,r)}let s=this.alignedSatBounds;s[0].setFromPointsField(r,`x`),s[1].setFromPointsField(r,`y`),s[2].setFromPointsField(r,`z`),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1}})(),nr.prototype.intersectsBox=(function(){let e=new qn;return function(t){this.needsUpdate&&this.update();let n=t.min,r=t.max,i=this.satBounds,a=this.satAxes,o=this.alignedSatBounds;if(e.min=n.x,e.max=r.x,o[0].isSeparated(e)||(e.min=n.y,e.max=r.y,o[1].isSeparated(e))||(e.min=n.z,e.max=r.z,o[2].isSeparated(e)))return!1;for(let n=0;n<3;n++){let r=a[n],o=i[n];if(e.setFromBox(r,t),o.isSeparated(e))return!1}return!0}})(),nr.prototype.intersectsTriangle=(function(){let e=new tr,t=[,,,],n=new qn,r=new qn,i=new W;return function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(e.copy(a),e.update(),a=e);let o=this.satBounds,s=this.satAxes;t[0]=a.a,t[1]=a.b,t[2]=a.c;for(let e=0;e<3;e++){let r=o[e],i=s[e];if(n.setFromPoints(i,t),r.isSeparated(n))return!1}let c=a.satBounds,l=a.satAxes,u=this.points;for(let e=0;e<3;e++){let t=c[e],r=l[e];if(n.setFromPoints(r,u),t.isSeparated(n))return!1}for(let e=0;e<3;e++){let a=s[e];for(let e=0;e<4;e++){let o=l[e];if(i.crossVectors(a,o),n.setFromPoints(i,t),r.setFromPoints(i,u),n.isSeparated(r))return!1}}return!0}})(),nr.prototype.closestPointToPoint=(function(){return function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t}})(),nr.prototype.distanceToPoint=(function(){let e=new W;return function(t){return this.closestPointToPoint(t,e),t.distanceTo(e)}})(),nr.prototype.distanceToBox=(function(){let e=[`x`,`y`,`z`],t=Array(12).fill().map(()=>new ot),n=Array(12).fill().map(()=>new ot),r=new W,i=new W;return function(a,o=0,s=null,c=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(s||c)&&(a.getCenter(i),this.closestPointToPoint(i,r),a.closestPointToPoint(r,i),s&&s.copy(r),c&&c.copy(i)),0;let l=o*o,u=a.min,d=a.max,f=this.points,p=1/0;for(let e=0;e<8;e++){let t=f[e];i.copy(t).clamp(u,d);let n=t.distanceToSquared(i);if(n<p&&(p=n,s&&s.copy(t),c&&c.copy(i),n<l))return Math.sqrt(n)}let m=0;for(let r=0;r<3;r++)for(let i=0;i<=1;i++)for(let a=0;a<=1;a++){let o=(r+1)%3,s=(r+2)%3,c=i<<o|a<<s,l=1<<r|i<<o|a<<s,p=f[c],h=f[l];t[m].set(p,h);let g=e[r],_=e[o],v=e[s],y=n[m],b=y.start,x=y.end;b[g]=u[g],b[_]=i?u[_]:d[_],b[v]=a?u[v]:d[_],x[g]=d[g],x[_]=i?u[_]:d[_],x[v]=a?u[v]:d[_],m++}for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let n=0;n<=1;n++){i.x=e?d.x:u.x,i.y=t?d.y:u.y,i.z=n?d.z:u.z,this.closestPointToPoint(i,r);let a=i.distanceToSquared(r);if(a<p&&(p=a,s&&s.copy(r),c&&c.copy(i),a<l))return Math.sqrt(a)}for(let e=0;e<12;e++){let a=t[e];for(let e=0;e<12;e++){let t=n[e];Yn(a,t,r,i);let o=r.distanceToSquared(i);if(o<p&&(p=o,s&&s.copy(r),c&&c.copy(i),o<l))return Math.sqrt(o)}}return Math.sqrt(p)}})();var rr=new class extends gn{constructor(){super(()=>new tr)}},ir=new W,ar=new W;function or(e,t,n={},r=0,i=1/0){let a=r*r,o=i*i,s=1/0,c=null;if(e.shapecast({boundsTraverseOrder:e=>(ir.copy(t).clamp(e.min,e.max),ir.distanceToSquared(t)),intersectsBounds:(e,t,n)=>n<s&&n<o,intersectsTriangle:(e,n)=>{e.closestPointToPoint(t,ir);let r=t.distanceToSquared(ir);return r<s&&(ar.copy(ir),s=r,c=n),r<a}}),s===1/0)return null;let l=Math.sqrt(s);return n.point?n.point.copy(ar):n.point=ar.clone(),n.distance=l,n.faceIndex=c,n}var sr=!0,cr=new W,lr=new W,ur=new W,dr=new U,fr=new U,pr=new U,mr=new W,hr=new W,gr=new W,_r=new W;function vr(e,t,n,r,i,a,o,s){let c;if(c=a===1?e.intersectTriangle(r,n,t,!0,i):e.intersectTriangle(t,n,r,a!==2,i),c===null)return null;let l=e.origin.distanceTo(i);return l<o||l>s?null:{distance:l,point:i.clone()}}function yr(e,t,n,r,i,a,o,s,c,l,u){cr.fromBufferAttribute(t,a),lr.fromBufferAttribute(t,o),ur.fromBufferAttribute(t,s);let d=vr(e,cr,lr,ur,_r,c,l,u);if(d){if(r){dr.fromBufferAttribute(r,a),fr.fromBufferAttribute(r,o),pr.fromBufferAttribute(r,s),d.uv=new U;let e=st.getInterpolation(_r,cr,lr,ur,dr,fr,pr,d.uv);sr||(d.uv=e)}if(i){dr.fromBufferAttribute(i,a),fr.fromBufferAttribute(i,o),pr.fromBufferAttribute(i,s),d.uv1=new U;let e=st.getInterpolation(_r,cr,lr,ur,dr,fr,pr,d.uv1);sr||(d.uv1=e)}if(n){mr.fromBufferAttribute(n,a),hr.fromBufferAttribute(n,o),gr.fromBufferAttribute(n,s),d.normal=new W;let t=st.getInterpolation(_r,cr,lr,ur,mr,hr,gr,d.normal);d.normal.dot(e.direction)>0&&d.normal.multiplyScalar(-1),sr||(d.normal=t)}let t={a,b:o,c:s,normal:new W,materialIndex:0};if(st.getNormal(cr,lr,ur,t.normal),d.face=t,d.faceIndex=a,sr){let e=new W;st.getBarycoord(_r,cr,lr,ur,e),d.barycoord=e}}return d}function br(e){return e&&e.isMaterial?e.side:e}function xr(e,t,n,r,i,a,o){let s=r*3,c=s+0,l=s+1,u=s+2,{index:d,groups:f}=e;e.index&&(c=d.getX(c),l=d.getX(l),u=d.getX(u));let{position:p,normal:m,uv:h,uv1:g}=e.attributes;if(Array.isArray(t)){let e=r*3;for(let s=0,d=f.length;s<d;s++){let{start:d,count:_,materialIndex:v}=f[s];if(e>=d&&e<d+_){let e=br(t[v]),s=yr(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=v,i)i.push(s);else return s}}}}else{let e=br(t),s=yr(n,p,m,h,g,c,l,u,e,a,o);if(s){if(s.faceIndex=r,s.face.materialIndex=0,i)i.push(s);else return s}}return null}function $(e,t,n,r){let i=e.a,a=e.b,o=e.c,s=t,c=t+1,l=t+2;n&&(s=n.getX(s),c=n.getX(c),l=n.getX(l)),i.x=r.getX(s),i.y=r.getY(s),i.z=r.getZ(s),a.x=r.getX(c),a.y=r.getY(c),a.z=r.getZ(c),o.x=r.getX(l),o.y=r.getY(l),o.z=r.getZ(l)}function Sr(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,l=r+i;e<l;e++)xr(c,t,n,e,a,o,s)}function Cr(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,c=r+i;e<c;e++){let r;r=xr(s,t,n,e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function wr(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let n=e,s=t+e;n<s;n++){let e;if(e=n,$(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Tr(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(e,n,a=!1){let l=e*2;if(q(l,s)){let t=J(e,o),n=Jt(l,s),a=1/0,u=1/0,d=1/0,f=-1/0,p=-1/0,m=-1/0;for(let e=3*t,o=3*(t+n);e<o;e++){let t=r[e],n=i.getX(t),o=i.getY(t),s=i.getZ(t);n<a&&(a=n),n>f&&(f=n),o<u&&(u=o),o>p&&(p=o),s<d&&(d=s),s>m&&(m=s)}return c[e+0]!==a||c[e+1]!==u||c[e+2]!==d||c[e+3]!==f||c[e+4]!==p||c[e+5]!==m?(c[e+0]=a,c[e+1]=u,c[e+2]=d,c[e+3]=f,c[e+4]=p,c[e+5]=m,!0):!1}{let r=Y(e),i=X(e,o),s=a,l=!1,u=!1;if(t){if(!s){let e=r/8+n/32,a=i/8+n/32;l=t.has(e),u=t.has(a),s=!l&&!u}}else l=!0,u=!0;let f=s||l,p=s||u,m=!1;f&&(m=d(r,n,s));let h=!1;p&&(h=d(i,n,s));let g=m||h;if(g)for(let t=0;t<3;t++){let n=r+t,a=i+t,o=c[n],s=c[n+3],l=c[a],u=c[a+3];c[e+t]=o<l?o:l,c[e+t+3]=s>u?s:u}return g}}}function Er(e,t,n,r,i){let a,o,s,c,l,u,d=1/n.direction.x,f=1/n.direction.y,p=1/n.direction.z,m=n.origin.x,h=n.origin.y,g=n.origin.z,_=t[e],v=t[e+3],y=t[e+1],b=t[e+3+1],x=t[e+2],S=t[e+3+2];return d>=0?(a=(_-m)*d,o=(v-m)*d):(a=(v-m)*d,o=(_-m)*d),f>=0?(s=(y-h)*f,c=(b-h)*f):(s=(b-h)*f,c=(y-h)*f),a>c||s>o||((s>a||isNaN(a))&&(a=s),(c<o||isNaN(o))&&(o=c),p>=0?(l=(x-g)*p,u=(S-g)*p):(l=(S-g)*p,u=(x-g)*p),a>u||l>o)?!1:((l>a||a!==a)&&(a=l),(u<o||o!==o)&&(o=u),a<=i&&o>=r)}function Dr(e,t,n,r,i,a,o,s){let{geometry:c,_indirectBuffer:l}=e;for(let e=r,u=r+i;e<u;e++)xr(c,t,n,l?l[e]:e,a,o,s)}function Or(e,t,n,r,i,a,o){let{geometry:s,_indirectBuffer:c}=e,l=1/0,u=null;for(let e=r,d=r+i;e<d;e++){let r;r=xr(s,t,n,c?c[e]:e,null,a,o),r&&r.distance<l&&(u=r,l=r.distance)}return u}function kr(e,t,n,r,i,a,o){let{geometry:s}=n,{index:c}=s,l=s.attributes.position;for(let s=e,u=t+e;s<u;s++){let e;if(e=n.resolveTriangleIndex(s),$(o,e*3,c,l),o.needsUpdate=!0,r(o,e,i,a))return!0}return!1}function Ar(e,t,n,r,i,a,o){Q.setBuffer(e._roots[t]),jr(0,e,n,r,i,a,o),Q.clearBuffer()}function jr(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=Q,u=e*2;if(q(u,c))Sr(t,n,r,J(e,l),Jt(u,c),i,a,o);else{let c=Y(e);Er(c,s,r,a,o)&&jr(c,t,n,r,i,a,o);let u=X(e,l);Er(u,s,r,a,o)&&jr(u,t,n,r,i,a,o)}}var Mr=[`x`,`y`,`z`];function Nr(e,t,n,r,i,a){Q.setBuffer(e._roots[t]);let o=Pr(0,e,n,r,i,a);return Q.clearBuffer(),o}function Pr(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=Q,l=e*2;if(q(l,s))return Cr(t,n,r,J(e,c),Jt(l,s),i,a);{let s=Yt(e,c),l=Mr[s],u=r.direction[l]>=0,d,f;u?(d=Y(e),f=X(e,c)):(d=X(e,c),f=Y(e));let p=Er(d,o,r,i,a)?Pr(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Er(f,o,r,i,a)?Pr(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var Fr=new ct,Ir=new tr,Lr=new tr,Rr=new ut,zr=new nr,Br=new nr;function Vr(e,t,n,r){Q.setBuffer(e._roots[t]);let i=Hr(0,e,n,r);return Q.clearBuffer(),i}function Hr(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=Q,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),zr.set(n.boundingBox.min,n.boundingBox.max,r),i=zr),q(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=J(e,s),m=Jt(c,o);if(Rr.copy(r).invert(),n.boundsTree)return K(Z(e),a,Br),Br.matrix.copy(Rr),Br.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>Br.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let t=p*3,n=(m+p)*3;t<n;t+=3)if($(Lr,t,l,u),Lr.needsUpdate=!0,e.intersectsTriangle(Lr))return!0;return!1}});{let e=zn(n);for(let t=p*3,n=(m+p)*3;t<n;t+=3){$(Ir,t,l,u),Ir.a.applyMatrix4(Rr),Ir.b.applyMatrix4(Rr),Ir.c.applyMatrix4(Rr),Ir.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if($(Lr,t,d,f),Lr.needsUpdate=!0,Ir.intersectsTriangle(Lr))return!0}}}else{let o=Y(e),c=X(e,s);return K(Z(o),a,Fr),!!(i.intersectsBox(Fr)&&Hr(o,t,n,r,i)||(K(Z(c),a,Fr),i.intersectsBox(Fr)&&Hr(c,t,n,r,i)))}}var Ur=new ut,Wr=new nr,Gr=new nr,Kr=new W,qr=new W,Jr=new W,Yr=new W;function Xr(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),Wr.set(t.boundingBox.min,t.boundingBox.max,n),Wr.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=rr.getPrimitive(),p=rr.getPrimitive(),m=Kr,h=qr,g=null,_=null;i&&(g=Jr,_=Yr);let v=1/0,y=null,b=null;return Ur.copy(n).invert(),Gr.matrix.copy(Ur),e.shapecast({boundsTraverseOrder:e=>Wr.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(Gr.min.copy(e.min),Gr.max.copy(e.max),Gr.needsUpdate=!0),!0),intersectsRange:(e,r)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:e=>Gr.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,i)=>{for(let o=t,s=t+i;o<s;o++){$(p,3*o,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++){$(f,3*t,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=t,b=o),e<a)return!0}}}});{let i=zn(t);for(let t=0,o=i;t<o;t++){$(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=e,i=e+r;n<i;n++){$(f,3*n,l,c),f.needsUpdate=!0;let e=f.distanceToTriangle(p,m,g);if(e<v&&(h.copy(m),_&&_.copy(g),v=e,y=n,b=t),e<a)return!0}}}}}),rr.releasePrimitive(f),rr.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(Ur),h.applyMatrix4(Ur),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function Zr(e,t=null){t&&Array.isArray(t)&&(t=new Set(t));let n=e.geometry,r=n.index?n.index.array:null,i=n.attributes.position,a,o,s,c,l=0,u=e._roots;for(let e=0,t=u.length;e<t;e++)a=u[e],o=new Uint32Array(a),s=new Uint16Array(a),c=new Float32Array(a),d(0,l),l+=a.byteLength;function d(n,a,l=!1){let u=n*2;if(q(u,s)){let t=J(n,o),a=Jt(u,s),l=1/0,d=1/0,f=1/0,p=-1/0,m=-1/0,h=-1/0;for(let n=t,o=t+a;n<o;n++){let t=3*e.resolveTriangleIndex(n);for(let e=0;e<3;e++){let n=t+e;n=r?r[n]:n;let a=i.getX(n),o=i.getY(n),s=i.getZ(n);a<l&&(l=a),a>p&&(p=a),o<d&&(d=o),o>m&&(m=o),s<f&&(f=s),s>h&&(h=s)}}return c[n+0]!==l||c[n+1]!==d||c[n+2]!==f||c[n+3]!==p||c[n+4]!==m||c[n+5]!==h?(c[n+0]=l,c[n+1]=d,c[n+2]=f,c[n+3]=p,c[n+4]=m,c[n+5]=h,!0):!1}{let e=Y(n),r=X(n,o),i=l,s=!1,u=!1;if(t){if(!i){let n=e/8+a/32,o=r/8+a/32;s=t.has(n),u=t.has(o),i=!s&&!u}}else s=!0,u=!0;let f=i||s,p=i||u,m=!1;f&&(m=d(e,a,i));let h=!1;p&&(h=d(r,a,i));let g=m||h;if(g)for(let t=0;t<3;t++){let i=e+t,a=r+t,o=c[i],s=c[i+3],l=c[a],u=c[a+3];c[n+t]=o<l?o:l,c[n+t+3]=s>u?s:u}return g}}}function Qr(e,t,n,r,i,a,o){Q.setBuffer(e._roots[t]),$r(0,e,n,r,i,a,o),Q.clearBuffer()}function $r(e,t,n,r,i,a,o){let{float32Array:s,uint16Array:c,uint32Array:l}=Q,u=e*2;if(q(u,c))Dr(t,n,r,J(e,l),Jt(u,c),i,a,o);else{let c=Y(e);Er(c,s,r,a,o)&&$r(c,t,n,r,i,a,o);let u=X(e,l);Er(u,s,r,a,o)&&$r(u,t,n,r,i,a,o)}}var ei=[`x`,`y`,`z`];function ti(e,t,n,r,i,a){Q.setBuffer(e._roots[t]);let o=ni(0,e,n,r,i,a);return Q.clearBuffer(),o}function ni(e,t,n,r,i,a){let{float32Array:o,uint16Array:s,uint32Array:c}=Q,l=e*2;if(q(l,s))return Or(t,n,r,J(e,c),Jt(l,s),i,a);{let s=Yt(e,c),l=ei[s],u=r.direction[l]>=0,d,f;u?(d=Y(e),f=X(e,c)):(d=X(e,c),f=Y(e));let p=Er(d,o,r,i,a)?ni(d,t,n,r,i,a):null;if(p){let e=p.point[l];if(u?e<=o[f+s]:e>=o[f+s+3])return p}let m=Er(f,o,r,i,a)?ni(f,t,n,r,i,a):null;return p&&m?p.distance<=m.distance?p:m:p||m||null}}var ri=new ct,ii=new tr,ai=new tr,oi=new ut,si=new nr,ci=new nr;function li(e,t,n,r){Q.setBuffer(e._roots[t]);let i=ui(0,e,n,r);return Q.clearBuffer(),i}function ui(e,t,n,r,i=null){let{float32Array:a,uint16Array:o,uint32Array:s}=Q,c=e*2;if(i===null&&(n.boundingBox||n.computeBoundingBox(),si.set(n.boundingBox.min,n.boundingBox.max,r),i=si),q(c,o)){let i=t.geometry,l=i.index,u=i.attributes.position,d=n.index,f=n.attributes.position,p=J(e,s),m=Jt(c,o);if(oi.copy(r).invert(),n.boundsTree)return K(Z(e),a,ci),ci.matrix.copy(oi),ci.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>ci.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(r),e.b.applyMatrix4(r),e.c.applyMatrix4(r),e.needsUpdate=!0;for(let n=p,r=m+p;n<r;n++)if($(ai,3*t.resolveTriangleIndex(n),l,u),ai.needsUpdate=!0,e.intersectsTriangle(ai))return!0;return!1}});{let e=zn(n);for(let n=p,r=m+p;n<r;n++){$(ii,3*t.resolveTriangleIndex(n),l,u),ii.a.applyMatrix4(oi),ii.b.applyMatrix4(oi),ii.c.applyMatrix4(oi),ii.needsUpdate=!0;for(let t=0,n=e*3;t<n;t+=3)if($(ai,t,d,f),ai.needsUpdate=!0,ii.intersectsTriangle(ai))return!0}}}else{let o=Y(e),c=X(e,s);return K(Z(o),a,ri),!!(i.intersectsBox(ri)&&ui(o,t,n,r,i)||(K(Z(c),a,ri),i.intersectsBox(ri)&&ui(c,t,n,r,i)))}}var di=new ut,fi=new nr,pi=new nr,mi=new W,hi=new W,gi=new W,_i=new W;function vi(e,t,n,r={},i={},a=0,o=1/0){t.boundingBox||t.computeBoundingBox(),fi.set(t.boundingBox.min,t.boundingBox.max,n),fi.needsUpdate=!0;let s=e.geometry,c=s.attributes.position,l=s.index,u=t.attributes.position,d=t.index,f=rr.getPrimitive(),p=rr.getPrimitive(),m=mi,h=hi,g=null,_=null;i&&(g=gi,_=_i);let v=1/0,y=null,b=null;return di.copy(n).invert(),pi.matrix.copy(di),e.shapecast({boundsTraverseOrder:e=>fi.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o&&(t&&(pi.min.copy(e.min),pi.max.copy(e.max),pi.needsUpdate=!0),!0),intersectsRange:(r,i)=>{if(t.boundsTree){let s=t.boundsTree;return s.shapecast({boundsTraverseOrder:e=>pi.distanceToBox(e),intersectsBounds:(e,t,n)=>n<v&&n<o,intersectsRange:(t,o)=>{for(let x=t,S=t+o;x<S;x++){let t=s.resolveTriangleIndex(x);$(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let t=r,n=r+i;t<n;t++){let n=e.resolveTriangleIndex(t);$(f,3*n,l,c),f.needsUpdate=!0;let r=f.distanceToTriangle(p,m,g);if(r<v&&(h.copy(m),_&&_.copy(g),v=r,y=t,b=x),r<a)return!0}}}})}{let o=zn(t);for(let t=0,s=o;t<s;t++){$(p,3*t,d,u),p.a.applyMatrix4(n),p.b.applyMatrix4(n),p.c.applyMatrix4(n),p.needsUpdate=!0;for(let n=r,o=r+i;n<o;n++){let r=e.resolveTriangleIndex(n);$(f,3*r,l,c),f.needsUpdate=!0;let i=f.distanceToTriangle(p,m,g);if(i<v&&(h.copy(m),_&&_.copy(g),v=i,y=n,b=t),i<a)return!0}}}}}),rr.releasePrimitive(f),rr.releasePrimitive(p),v===1/0?null:(r.point?r.point.copy(h):r.point=h.clone(),r.distance=v,r.faceIndex=y,i&&(i.point?i.point.copy(_):i.point=_.clone(),i.point.applyMatrix4(di),h.applyMatrix4(di),i.distance=h.sub(i.point).length(),i.faceIndex=b),r)}function yi(e,t,n){return e===null?null:(e.point.applyMatrix4(t.matrixWorld),e.distance=e.point.distanceTo(n.ray.origin),e.object=t,e)}var bi=new nr,xi=new $e,Si=new W,Ci=new ut,wi=new W,Ti=[`getX`,`getY`,`getZ`],Ei=class e extends Kn{static serialize(e,t={}){t={cloneBuffers:!0,...t};let n=e.geometry,r=e._roots,i=e._indirectBuffer,a=n.getIndex(),o={version:1,roots:null,index:null,indirectBuffer:null};return t.cloneBuffers?(o.roots=r.map(e=>e.slice()),o.index=a?a.array.slice():null,o.indirectBuffer=i?i.slice():null):(o.roots=r,o.index=a?a.array:null,o.indirectBuffer=i),o}static deserialize(t,n,r={}){r={setIndex:!0,indirect:!!t.indirectBuffer,...r};let{index:i,roots:a,indirectBuffer:o}=t;t.version||(console.warn(`MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`),c(a));let s=new e(n,{...r,[Vt]:!0});if(s._roots=a,s._indirectBuffer=o||null,r.setIndex){let e=n.getIndex();if(e===null){let e=new Nt(t.index,1,!1);n.setIndex(e)}else e.array!==i&&(e.array.set(i),e.needsUpdate=!0)}return s;function c(e){for(let t=0;t<e.length;t++){let n=e[t],r=new Uint32Array(n),i=new Uint16Array(n);for(let e=0,t=n.byteLength/32;e<t;e++){let t=8*e;q(2*t,i)||(r[t+6]=r[t+6]/8-e)}}}}get primitiveStride(){return 3}get resolveTriangleIndex(){return this.resolvePrimitiveIndex}constructor(e,t={}){t.maxLeafTris&&(console.warn(`MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.`),t={...t,targetLeafSize:t.maxLeafTris}),super(e,t)}shiftTriangleOffsets(e){return super.shiftPrimitiveOffsets(e)}writePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=(i?i[e]:e)*3,c=s+0,l=s+1,u=s+2;o&&(c=o[c],l=o[l],u=o[u]);for(let e=0;e<3;e++){let r=a[Ti[e]](c),i=a[Ti[e]](l),o=a[Ti[e]](u),s=r;i<s&&(s=i),o<s&&(s=o);let d=r;i>d&&(d=i),o>d&&(d=o),t[n+e]=s,t[n+e+3]=d}return t}computePrimitiveBounds(e,t,n){let r=this.geometry,i=this._indirectBuffer,a=r.attributes.position,o=r.index?r.index.array:null,s=a.normalized;if(e<0||t+e-n.offset>n.length/6)throw Error(`MeshBVH: compute triangle bounds range is invalid.`);let c=a.array,l=a.offset||0,u=3;a.isInterleavedBufferAttribute&&(u=a.data.stride);let d=[`getX`,`getY`,`getZ`],f=n.offset;for(let r=e,p=e+t;r<p;r++){let e=(i?i[r]:r)*3,t=(r-f)*6,p=e+0,m=e+1,h=e+2;o&&(p=o[p],m=o[m],h=o[h]),s||(p=p*u+l,m=m*u+l,h=h*u+l);for(let e=0;e<3;e++){let r,i,o;s?(r=a[d[e]](p),i=a[d[e]](m),o=a[d[e]](h)):(r=c[p+e],i=c[m+e],o=c[h+e]);let l=r;i<l&&(l=i),o<l&&(l=o);let u=r;i>u&&(u=i),o>u&&(u=o);let f=(u-l)/2,g=e*2;n[t+g+0]=l+f,n[t+g+1]=f+(Math.abs(l)+f)*Bt}}return n}raycastObject3D(e,t,n=[]){let{material:r}=e;if(r===void 0)return;Ci.copy(e.matrixWorld).invert(),xi.copy(t.ray).applyMatrix4(Ci),wi.setFromMatrixScale(e.matrixWorld),Si.copy(xi.direction).multiply(wi);let i=Si.length(),a=t.near/i,o=t.far/i;if(t.firstHitOnly===!0){let i=this.raycastFirst(xi,r,a,o);i=yi(i,e,t),i&&n.push(i)}else{let i=this.raycast(xi,r,a,o);for(let r=0,a=i.length;r<a;r++){let a=yi(i[r],e,t);a&&n.push(a)}}return n}refit(e=null){return(this.indirect?Zr:Tr)(this,e)}raycast(e,t=0,n=0,r=1/0){let i=this._roots,a=[],o=this.indirect?Qr:Ar;for(let s=0,c=i.length;s<c;s++)o(this,s,t,e,a,n,r);return a}raycastFirst(e,t=0,n=0,r=1/0){let i=this._roots,a=null,o=this.indirect?ti:Nr;for(let s=0,c=i.length;s<c;s++){let i=o(this,s,t,e,n,r);i!=null&&(a==null||i.distance<a.distance)&&(a=i)}return a}intersectsGeometry(e,t){let n=!1,r=this._roots,i=this.indirect?li:Vr;for(let a=0,o=r.length;a<o&&(n=i(this,a,e,t),!n);a++);return n}shapecast(e){let t=rr.getPrimitive(),n=super.shapecast({...e,intersectsPrimitive:e.intersectsTriangle,scratchPrimitive:t,iterate:this.indirect?kr:wr});return rr.releasePrimitive(t),n}bvhcast(t,n,r){let{intersectsRanges:i,intersectsTriangles:a}=r,o=rr.getPrimitive(),s=this.geometry.index,c=this.geometry.attributes.position,l=this.indirect?e=>{let t=this.resolveTriangleIndex(e);$(o,t*3,s,c)}:e=>{$(o,e*3,s,c)},u=rr.getPrimitive(),d=t.geometry.index,f=t.geometry.attributes.position,p=t.indirect?e=>{let n=t.resolveTriangleIndex(e);$(u,n*3,d,f)}:e=>{$(u,e*3,d,f)};if(a){if(!(t instanceof e))throw Error(`MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`);let r=(e,t,r,i,s,c,d,f)=>{for(let m=r,h=r+i;m<h;m++){p(m),u.a.applyMatrix4(n),u.b.applyMatrix4(n),u.c.applyMatrix4(n),u.needsUpdate=!0;for(let n=e,r=e+t;n<r;n++)if(l(n),o.needsUpdate=!0,a(o,u,n,m,s,c,d,f))return!0}return!1};if(i){let e=i;i=function(t,n,i,a,o,s,c,l){return e(t,n,i,a,o,s,c,l)?!0:r(t,n,i,a,o,s,c,l)}}else i=r}return super.bvhcast(t,n,{intersectsRanges:i})}intersectsBox(e,t){return bi.set(e.min,e.max,t),bi.needsUpdate=!0,this.shapecast({intersectsBounds:e=>bi.intersectsBox(e),intersectsTriangle:e=>bi.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,n={},r={},i=0,a=1/0){return(this.indirect?vi:Xr)(this,e,t,n,r,i,a)}closestPointToPoint(e,t={},n=0,r=1/0){return or(this,e,t,n,r)}};function Di(e){switch(e){case 1:return`R`;case 2:return`RG`;case 3:return`RGBA`;case 4:return`RGBA`}throw Error()}function Oi(e){switch(e){case 1:return St;case 2:return He;case 3:return G;case 4:return G}}function ki(e){switch(e){case 1:return Ye;case 2:return Ve;case 3:return rt;case 4:return rt}}var Ai=class extends et{constructor(){super(),this.minFilter=H,this.magFilter=H,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t=this.overrideItemSize,n=e.itemSize,r=e.count;if(t!==null){if(n*r%t!==0)throw Error(`VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.`);e.itemSize=t,e.count=r*n/t}let i=e.itemSize,a=e.count,o=e.normalized,s=e.array.constructor,c=s.BYTES_PER_ELEMENT,l=this._forcedType,u=i;if(l===null)switch(s){case Float32Array:l=z;break;case Uint8Array:case Uint16Array:case Uint32Array:l=ht;break;case Int8Array:case Int16Array:case Int32Array:l=qe}let d,f,p,m,h=Di(i);switch(l){case z:p=1,f=Oi(i),o&&c===1?(m=s,h+=`8`,s===Uint8Array?d=Ie:(d=Mt,h+=`_SNORM`)):(m=Float32Array,h+=`32F`,d=z);break;case qe:h+=c*8+`I`,p=o?2**(s.BYTES_PER_ELEMENT*8-1):1,f=ki(i),c===1?(m=Int8Array,d=Mt):c===2?(m=Int16Array,d=at):(m=Int32Array,d=qe);break;case ht:h+=c*8+`UI`,p=o?2**(s.BYTES_PER_ELEMENT*8-1):1,f=ki(i),c===1?(m=Uint8Array,d=Ie):c===2?(m=Uint16Array,d=kt):(m=Uint32Array,d=ht)}u===3&&(f===1023||f===1033)&&(u=4);let g=Math.ceil(Math.sqrt(a))||1,_=u*g*g,v=new m(_),y=e.normalized;e.normalized=!1;for(let t=0;t<a;t++){let n=u*t;v[n]=e.getX(t)/p,i>=2&&(v[n+1]=e.getY(t)/p),i>=3&&(v[n+2]=e.getZ(t)/p,u===4&&(v[n+3]=1)),i>=4&&(v[n+3]=e.getW(t)/p)}e.normalized=y,this.internalFormat=h,this.format=f,this.type=d,this.image.width=g,this.image.height=g,this.image.data=v,this.needsUpdate=!0,this.dispose(),e.itemSize=n,e.count=r}},ji=class extends Ai{constructor(){super(),this._forcedType=ht}},Mi=class extends Ai{constructor(){super(),this._forcedType=z}},Ni=class{constructor(){this.index=new ji,this.position=new Mi,this.bvhBounds=new et,this.bvhContents=new et,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(Fi(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let n=e._indirectBuffer;if(this._cachedIndexAttr===null||this._cachedIndexAttr.count!==n.length){if(t.index)this._cachedIndexAttr=t.index.clone();else{let e=Bn(Rn(t));this._cachedIndexAttr=new Nt(e,1,!1)}}Pi(t,n,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:n,bvhContents:r}=this;e&&e.dispose(),t&&t.dispose(),n&&n.dispose(),r&&r.dispose()}};function Pi(e,t,n){let r=n.array,i=e.index?e.index.array:null;for(let e=0,n=t.length;e<n;e++){let n=3*e,a=3*t[e];for(let e=0;e<3;e++)r[n+e]=i?i[a+e]:a+e}}function Fi(e,t,n){let r=e._roots;if(r.length!==1)throw Error(`MeshBVHUniformStruct: Multi-root BVHs not supported.`);let i=r[0],a=new Uint16Array(i),o=new Uint32Array(i),s=new Float32Array(i),c=i.byteLength/32,l=2*Math.ceil(Math.sqrt(c/2)),u=new Float32Array(4*l*l),d=Math.ceil(Math.sqrt(c)),f=new Uint32Array(2*d*d);for(let e=0;e<c;e++){let t=e*32/4,n=t*2,r=Z(t);for(let t=0;t<3;t++)u[8*e+0+t]=s[r+0+t],u[8*e+4+t]=s[r+3+t];if(q(n,a)){let r=Jt(n,a),i=J(t,o),s=zt|r;f[e*2+0]=s,f[e*2+1]=i}else{let n=o[t+6],r=Yt(t,o);f[e*2+0]=r,f[e*2+1]=n}}t.image.data=u,t.image.width=l,t.image.height=l,t.format=G,t.type=z,t.internalFormat=`RGBA32F`,t.minFilter=H,t.magFilter=H,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose(),n.image.data=f,n.image.width=d,n.image.height=d,n.format=Ve,n.type=ht,n.internalFormat=`RG32UI`,n.minFilter=H,n.magFilter=H,n.generateMipmaps=!1,n.needsUpdate=!0,n.dispose()}var Ii=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,Li=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int pointer = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( pointer > - 1 && pointer < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ pointer ];
		pointer --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = currNodeIndex + boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			pointer ++;
			stack[ pointer ] = c2;

			pointer ++;
			stack[ pointer ] = c1;

		}

	}

	return found;

}
`,Ri=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`;function zi(e,t,n=0){if(e.isInterleavedBufferAttribute){let r=e.itemSize;for(let i=0,a=e.count;i<a;i++){let a=i+n;t.setX(a,e.getX(i)),r>=2&&t.setY(a,e.getY(i)),r>=3&&t.setZ(a,e.getZ(i)),r>=4&&t.setW(a,e.getW(i))}}else{let r=t.array,i=r.constructor,a=r.BYTES_PER_ELEMENT*e.itemSize*n;new i(r.buffer,a,e.array.length).set(e.array)}}function Bi(e,t=null){let n=e.array.constructor,r=e.normalized,i=e.itemSize,a=t===null?e.count:t;return new Nt(new n(i*a),i,r)}function Vi(e,t){if(!e&&!t)return!0;if(!!e!=!!t)return!1;let n=e.count===t.count,r=e.normalized===t.normalized,i=e.array.constructor===t.array.constructor,a=e.itemSize===t.itemSize;return!(!n||!r||!i||!a)}function Hi(e){let t=e[0].index!==null,n=new Set(Object.keys(e[0].attributes));if(!e[0].getAttribute(`position`))throw Error(`StaticGeometryGenerator: position attribute is required.`);for(let r=0;r<e.length;++r){let i=e[r],a=0;if(t!==(i.index!==null))throw Error(`StaticGeometryGenerator: All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`);for(let e in i.attributes){if(!n.has(e))throw Error(`StaticGeometryGenerator: All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`);a++}if(a!==n.size)throw Error(`StaticGeometryGenerator: All geometries must have the same number of attributes.`)}}function Ui(e){let t=0;for(let n=0,r=e.length;n<r;n++)t+=e[n].getIndex().count;return t}function Wi(e){let t=0;for(let n=0,r=e.length;n<r;n++)t+=e[n].getAttribute(`position`).count;return t}function Gi(e,t,n){e.index&&e.index.count!==t&&e.setIndex(null);let r=e.attributes;for(let t in r)r[t].count!==n&&e.deleteAttribute(t)}function Ki(e,t={},n=new dt){let{useGroups:r=!1,forceUpdate:i=!1,skipAssigningAttributes:a=[],overwriteIndex:o=!0}=t;Hi(e);let s=e[0].index!==null,c=s?Ui(e):-1,l=Wi(e);if(Gi(n,c,l),r){let t=0;for(let r=0,i=e.length;r<i;r++){let i=e[r],a;a=s?i.getIndex().count:i.getAttribute(`position`).count,n.addGroup(t,a,r),t+=a}}if(s){let t=!1;if(n.index||(n.setIndex(new Nt(new Uint32Array(c),1,!1)),t=!0),t||o){let r=0,o=0,s=n.getIndex();for(let n=0,c=e.length;n<c;n++){let c=e[n],l=c.getIndex();if(i||t||!a[n])for(let e=0;e<l.count;++e)s.setX(r+e,l.getX(e)+o);r+=l.count,o+=c.getAttribute(`position`).count}}}let u=Object.keys(e[0].attributes);for(let t=0,r=u.length;t<r;t++){let r=!1,o=u[t];if(!n.getAttribute(o)){let t=e[0].getAttribute(o);n.setAttribute(o,Bi(t,l)),r=!0}let s=0,c=n.getAttribute(o);for(let t=0,n=e.length;t<n;t++){let n=e[t],l=!i&&!r&&a[t],u=n.getAttribute(o);if(!l){if(o===`color`&&c.itemSize!==u.itemSize)for(let e=s,t=u.count;e<t;e++)u.setXYZW(e,c.getX(e),c.getY(e),c.getZ(e),1);else zi(u,c,s)}s+=u.count}}}function qi(e,t,n){let r=e.index,i=e.attributes.position.count,a=r?r.count:i,o=e.groups;o.length===0&&(o=[{count:a,start:0,materialIndex:0}]);let s=e.getAttribute(`materialIndex`);if(!s||s.count!==i){let t;t=n.length<=255?new Uint8Array(i):new Uint16Array(i),s=new Nt(t,1,!1),e.deleteAttribute(`materialIndex`),e.setAttribute(`materialIndex`,s)}let c=s.array;for(let e=0;e<o.length;e++){let i=o[e],s=i.start,l=i.count,u=Math.min(l,a-s),d=Array.isArray(t)?t[i.materialIndex]:t,f=n.indexOf(d);for(let e=0;e<u;e++){let t=s+e;r&&(t=r.getX(t)),c[t]=f}}}function Ji(e,t){if(!e.index){let t=e.attributes.position.count,n=Array(t);for(let e=0;e<t;e++)n[e]=e;e.setIndex(n)}if(!e.attributes.normal&&t&&t.includes(`normal`)&&e.computeVertexNormals(),!e.attributes.uv&&t&&t.includes(`uv`)){let t=e.attributes.position.count;e.setAttribute(`uv`,new Nt(new Float32Array(t*2),2,!1))}if(!e.attributes.uv2&&t&&t.includes(`uv2`)){let t=e.attributes.position.count;e.setAttribute(`uv2`,new Nt(new Float32Array(t*2),2,!1))}if(!e.attributes.tangent&&t&&t.includes(`tangent`)){if(e.attributes.uv&&e.attributes.normal)e.computeTangents();else{let t=e.attributes.position.count;e.setAttribute(`tangent`,new Nt(new Float32Array(t*4),4,!1))}}if(!e.attributes.color&&t&&t.includes(`color`)){let t=e.attributes.position.count,n=new Float32Array(t*4);n.fill(1),e.setAttribute(`color`,new Nt(n,4))}}function Yi(e){let t=0;if(e.byteLength!==0){let n=new Uint8Array(e);for(let r=0;r<e.byteLength;r++){let e=n[r];t=(t<<5)-t+e,t|=0}}return t}function Xi(e){let t=e.uuid,n=Object.values(e.attributes);e.index&&(n.push(e.index),t+=`index|${e.index.version}`);let r=Object.keys(n).sort();for(let e of r){let r=n[e];t+=`${e}_${r.version}|`}return t}function Zi(e){let t=e.skeleton;return t?(t.boneTexture||t.computeBoneTexture(),`${Yi(t.boneTexture.image.data.buffer)}_${t.boneTexture.uuid}`):null}var Qi=class{constructor(e=null){this.matrixWorld=new ut,this.geometryHash=null,this.skeletonHash=null,this.primitiveCount=-1,e!==null&&this.updateFrom(e)}updateFrom(e){let t=e.geometry,n=(t.index?t.index.count:t.attributes.position.count)/3;this.matrixWorld.copy(e.matrixWorld),this.geometryHash=Xi(t),this.primitiveCount=n,this.skeletonHash=Zi(e)}didChange(e){let t=e.geometry,n=(t.index?t.index.count:t.attributes.position.count)/3;return!(this.matrixWorld.equals(e.matrixWorld)&&this.geometryHash===Xi(t)&&this.skeletonHash===Zi(e)&&this.primitiveCount===n)}},$i=new W,ea=new W,ta=new W,na=new bt,ra=new W,ia=new W,aa=new bt,oa=new bt,sa=new ut,ca=new ut;function la(e,t,n){let r=e.skeleton,i=e.geometry,a=r.bones,o=r.boneInverses;aa.fromBufferAttribute(i.attributes.skinIndex,t),oa.fromBufferAttribute(i.attributes.skinWeight,t),sa.elements.fill(0);for(let e=0;e<4;e++){let t=oa.getComponent(e);if(t!==0){let n=aa.getComponent(e);ca.multiplyMatrices(a[n].matrixWorld,o[n]),da(sa,ca,t)}}return sa.multiply(e.bindMatrix).premultiply(e.bindMatrixInverse),n.transformDirection(sa),n}function ua(e,t,n,r,i){ra.set(0,0,0);for(let a=0,o=e.length;a<o;a++){let o=t[a],s=e[a];o!==0&&(ia.fromBufferAttribute(s,r),n?ra.addScaledVector(ia,o):ra.addScaledVector(ia.sub(i),o))}i.add(ra)}function da(e,t,n){let r=e.elements,i=t.elements;for(let e=0,t=i.length;e<t;e++)r[e]+=i[e]*n}function fa(e){let{index:t,attributes:n}=e;if(t)for(let e=0,n=t.count;e<n;e+=3){let n=t.getX(e),r=t.getX(e+2);t.setX(e,r),t.setX(e+2,n)}else for(let e in n){let t=n[e],r=t.itemSize;for(let e=0,n=t.count;e<n;e+=3)for(let n=0;n<r;n++){let r=t.getComponent(e,n),i=t.getComponent(e+2,n);t.setComponent(e,n,i),t.setComponent(e+2,n,r)}}return e}function pa(e,t={},n=new dt){t={applyWorldTransforms:!0,attributes:[],...t};let r=e.geometry,i=t.applyWorldTransforms,a=t.attributes.includes(`normal`),o=t.attributes.includes(`tangent`),s=r.attributes,c=n.attributes;for(let e in n.attributes)(!t.attributes.includes(e)||!(e in r.attributes))&&n.deleteAttribute(e);!n.index&&r.index&&(n.index=r.index.clone()),c.position||n.setAttribute(`position`,Bi(s.position)),a&&!c.normal&&s.normal&&n.setAttribute(`normal`,Bi(s.normal)),o&&!c.tangent&&s.tangent&&n.setAttribute(`tangent`,Bi(s.tangent)),Vi(r.index,n.index),Vi(s.position,c.position),a&&Vi(s.normal,c.normal),o&&Vi(s.tangent,c.tangent);let l=s.position,u=a?s.normal:null,d=o?s.tangent:null,f=r.morphAttributes.position,p=r.morphAttributes.normal,m=r.morphAttributes.tangent,h=r.morphTargetsRelative,g=e.morphTargetInfluences,_=new xt;_.getNormalMatrix(e.matrixWorld),r.index&&n.index.array.set(r.index.array);for(let t=0,n=s.position.count;t<n;t++)$i.fromBufferAttribute(l,t),u&&ea.fromBufferAttribute(u,t),d&&(na.fromBufferAttribute(d,t),ta.fromBufferAttribute(d,t)),g&&(f&&ua(f,g,h,t,$i),p&&ua(p,g,h,t,ea),m&&ua(m,g,h,t,ta)),e.isSkinnedMesh&&(e.applyBoneTransform(t,$i),u&&la(e,t,ea),d&&la(e,t,ta)),i&&$i.applyMatrix4(e.matrixWorld),c.position.setXYZ(t,$i.x,$i.y,$i.z),u&&(i&&ea.applyNormalMatrix(_),c.normal.setXYZ(t,ea.x,ea.y,ea.z)),d&&(i&&ta.transformDirection(e.matrixWorld),c.tangent.setXYZW(t,ta.x,ta.y,ta.z,na.w));for(let e in t.attributes){let r=t.attributes[e];r!==`position`&&r!==`tangent`&&r!==`normal`&&r in s&&(c[r]||n.setAttribute(r,Bi(s[r])),Vi(s[r],c[r]),zi(s[r],c[r]))}return e.matrixWorld.determinant()<0&&fa(n),n}var ma=class extends dt{constructor(){super(),this.version=0,this.hash=null,this._diff=new Qi}isCompatible(e,t){let n=e.geometry;for(let e=0;e<t.length;e++){let r=t[e],i=n.attributes[r],a=this.attributes[r];if(i&&!Vi(i,a))return!1}return!0}updateFrom(e,t){let n=this._diff;return n.didChange(e)?(pa(e,t,this),n.updateFrom(e),this.version++,this.hash=`${this.uuid}_${this.version}`,!0):!1}};function ha(e,t){for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(e=>{e.isMesh&&t(e)})}function ga(e){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];Array.isArray(r.material)?t.push(...r.material):t.push(r.material)}return t}function _a(e,t,n){if(e.length===0){t.setIndex(null);let e=t.attributes;for(let n in e)t.deleteAttribute(n);for(let e in n.attributes)t.setAttribute(n.attributes[e],new Nt(new Float32Array,4,!1))}else Ki(e,n,t);for(let e in t.attributes)t.attributes[e].needsUpdate=!0}var va=class{constructor(e){this.objects=null,this.useGroups=!0,this.applyWorldTransforms=!0,this.generateMissingAttributes=!0,this.overwriteIndex=!0,this.attributes=[`position`,`normal`,`color`,`tangent`,`uv`,`uv2`],this._intermediateGeometry=new Map,this._geometryMergeSets=new WeakMap,this._mergeOrder=[],this._dummyMesh=null,this.setObjects(e||[])}_getDummyMesh(){if(!this._dummyMesh){let e=new Ot,t=new dt;t.setAttribute(`position`,new Nt(new Float32Array(9),3)),this._dummyMesh=new Et(t,e)}return this._dummyMesh}_getMeshes(){let e=[];return ha(this.objects,t=>{e.push(t)}),e.sort((e,t)=>e.uuid>t.uuid?1:e.uuid<t.uuid?-1:0),e.length===0&&e.push(this._getDummyMesh()),e}_updateIntermediateGeometries(){let{_intermediateGeometry:e}=this,t=this._getMeshes(),n=new Set(e.keys()),r={attributes:this.attributes,applyWorldTransforms:this.applyWorldTransforms};for(let i=0,a=t.length;i<a;i++){let a=t[i],o=a.uuid;n.delete(o);let s=e.get(o);(!s||!s.isCompatible(a,this.attributes))&&(s&&s.dispose(),s=new ma,e.set(o,s)),s.updateFrom(a,r)&&this.generateMissingAttributes&&Ji(s,this.attributes)}n.forEach(t=>{e.delete(t)})}setObjects(e){this.objects=Array.isArray(e)?[...e]:[e]}generate(e=new dt){let{useGroups:t,overwriteIndex:n,_intermediateGeometry:r,_geometryMergeSets:i}=this,a=this._getMeshes(),o=[],s=[],c=i.get(e)||[];this._updateIntermediateGeometries();let l=!1;a.length!==c.length&&(l=!0);for(let e=0,t=a.length;e<t;e++){let t=a[e],n=r.get(t.uuid);s.push(n);let i=c[e];!i||i.uuid!==n.uuid?(o.push(!1),l=!0):i.version===n.version?o.push(!0):o.push(!1)}_a(s,e,{useGroups:t,forceUpdate:l,skipAssigningAttributes:o,overwriteIndex:n}),l&&e.dispose(),i.set(e,s.map(e=>({version:e.version,uuid:e.uuid})));let u=0;return l?u=2:o.includes(!1)&&(u=1),{changeType:u,materials:ga(a),geometry:e}}};function ya(e){let t=new Set;for(let n=0,r=e.length;n<r;n++){let r=e[n];for(let e in r){let n=r[e];n&&n.isTexture&&t.add(n)}}return Array.from(t)}function ba(e){let t=[],n=new Set;for(let r=0,i=e.length;r<i;r++)e[r].traverse(e=>{e.visible&&(e.isRectAreaLight||e.isSpotLight||e.isPointLight||e.isDirectionalLight)&&(t.push(e),e.iesMap&&n.add(e.iesMap))});return{lights:t,iesTextures:Array.from(n).sort((e,t)=>e.uuid<t.uuid?1:e.uuid>t.uuid?-1:0)}}var xa=class{get initialized(){return!!this.bvh}constructor(e){this.bvhOptions={},this.attributes=[`position`,`normal`,`tangent`,`color`,`uv`,`uv2`],this.generateBVH=!0,this.bvh=null,this.geometry=new dt,this.staticGeometryGenerator=new va(e),this._bvhWorker=null,this._pendingGenerate=null,this._buildAsync=!1,this._materialUuids=null}setObjects(e){this.staticGeometryGenerator.setObjects(e)}setBVHWorker(e){this._bvhWorker=e}async generateAsync(e=null){if(!this._bvhWorker)throw Error(`PathTracingSceneGenerator: "setBVHWorker" must be called before "generateAsync" can be called.`);if(this.bvh instanceof Promise)return this._pendingGenerate||=new Promise(async()=>(await this.bvh,this._pendingGenerate=null,this.generateAsync(e))),this._pendingGenerate;{this._buildAsync=!0;let t=this.generate(e);return this._buildAsync=!1,t.bvh=this.bvh=await t.bvh,t}}generate(e=null){let{staticGeometryGenerator:t,geometry:n,attributes:r}=this,i=t.objects;t.attributes=r,i.forEach(e=>{e.traverse(e=>{e.isSkinnedMesh&&e.skeleton&&e.skeleton.update()})});let a=t.generate(n),o=a.materials,s=a.changeType!==0||this._materialUuids===null||this._materialUuids.length!==length;if(!s){for(let e=0,t=o.length;e<t;e++)if(o[e].uuid!==this._materialUuids[e]){s=!0;break}}let c=ya(o),{lights:l,iesTextures:u}=ba(i);if(s&&(qi(n,o,o),this._materialUuids=o.map(e=>e.uuid)),this.generateBVH){if(this.bvh instanceof Promise)throw Error(`PathTracingSceneGenerator: BVH is already building asynchronously.`);if(a.changeType===2){let t={strategy:2,maxLeafTris:1,indirect:!0,onProgress:e,...this.bvhOptions};this.bvh=this._buildAsync?this._bvhWorker.generate(n,t):new Ei(n,t)}else a.changeType===1&&this.bvh.refit()}return{bvhChanged:a.changeType!==0,bvh:this.bvh,needsMaterialIndexUpdate:s,lights:l,iesTextures:u,geometry:n,materials:o,textures:c,objects:i}}},Sa=class extends Je{set needsUpdate(e){super.needsUpdate=!0,this.dispatchEvent({type:`recompilation`})}constructor(e){super(e);for(let e in this.uniforms)Object.defineProperty(this,e,{get(){return this.uniforms[e].value},set(t){this.uniforms[e].value=t}})}setDefine(e,t=void 0){if(t==null){if(e in this.defines)return delete this.defines[e],this.needsUpdate=!0,!0}else if(this.defines[e]!==t)return this.defines[e]=t,this.needsUpdate=!0,!0;return!1}},Ca=class extends Sa{constructor(e){super({blending:0,uniforms:{target1:{value:null},target2:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				uniform float opacity;

				uniform sampler2D target1;
				uniform sampler2D target2;

				varying vec2 vUv;

				void main() {

					vec4 color1 = texture2D( target1, vUv );
					vec4 color2 = texture2D( target2, vUv );

					float invOpacity = 1.0 - opacity;
					float totalAlpha = color1.a * invOpacity + color2.a * opacity;

					if ( color1.a != 0.0 || color2.a != 0.0 ) {

						gl_FragColor.rgb = color1.rgb * ( invOpacity * color1.a / totalAlpha ) + color2.rgb * ( opacity * color2.a / totalAlpha );
						gl_FragColor.a = totalAlpha;

					} else {

						gl_FragColor = vec4( 0.0 );

					}

				}`}),this.setValues(e)}};function wa(e=1){let t=`uint`;return e>1&&(t=`uvec`+e),`
		${t} sobolReverseBits( ${t} x ) {

			x = ( ( ( x & 0xaaaaaaaau ) >> 1 ) | ( ( x & 0x55555555u ) << 1 ) );
			x = ( ( ( x & 0xccccccccu ) >> 2 ) | ( ( x & 0x33333333u ) << 2 ) );
			x = ( ( ( x & 0xf0f0f0f0u ) >> 4 ) | ( ( x & 0x0f0f0f0fu ) << 4 ) );
			x = ( ( ( x & 0xff00ff00u ) >> 8 ) | ( ( x & 0x00ff00ffu ) << 8 ) );
			return ( ( x >> 16 ) | ( x << 16 ) );

		}

		${t} sobolHashCombine( uint seed, ${t} v ) {

			return seed ^ ( v + ${t}( ( seed << 6 ) + ( seed >> 2 ) ) );

		}

		${t} sobolLaineKarrasPermutation( ${t} x, ${t} seed ) {

			x += seed;
			x ^= x * 0x6c50b47cu;
			x ^= x * 0xb82f1e52u;
			x ^= x * 0xc7afe638u;
			x ^= x * 0x8d22f6e6u;
			return x;

		}

		${t} nestedUniformScrambleBase2( ${t} x, ${t} seed ) {

			x = sobolLaineKarrasPermutation( x, seed );
			x = sobolReverseBits( x );
			return x;

		}
	`}function Ta(e=1){let t=`uint`,n=`float`,r=``,i=`.r`,a=`1u`;return e>1&&(t=`uvec`+e,n=`vec`+e,r=e+``,e===2?(i=`.rg`,a=`uvec2( 1u, 2u )`):e===3?(i=`.rgb`,a=`uvec3( 1u, 2u, 3u )`):(i=``,a=`uvec4( 1u, 2u, 3u, 4u )`)),`

		${n} sobol${r}( int effect ) {

			uint seed = sobolGetSeed( sobolBounceIndex, uint( effect ) );
			uint index = sobolPathIndex;

			uint shuffle_seed = sobolHashCombine( seed, 0u );
			uint shuffled_index = nestedUniformScrambleBase2( sobolReverseBits( index ), shuffle_seed );
			${n} sobol_pt = sobolGetTexturePoint( shuffled_index )${i};
			${t} result = ${t}( sobol_pt * 16777216.0 );

			${t} seed2 = sobolHashCombine( seed, ${a} );
			result = nestedUniformScrambleBase2( result, seed2 );

			return SOBOL_FACTOR * ${n}( result >> 8 );

		}
	`}var Ea=`

	// Utils
	const float SOBOL_FACTOR = 1.0 / 16777216.0;
	const uint SOBOL_MAX_POINTS = 256u * 256u;

	${wa(1)}
	${wa(2)}
	${wa(3)}
	${wa(4)}

	uint sobolHash( uint x ) {

		// finalizer from murmurhash3
		x ^= x >> 16;
		x *= 0x85ebca6bu;
		x ^= x >> 13;
		x *= 0xc2b2ae35u;
		x ^= x >> 16;
		return x;

	}

`,Da=`

	const uint SOBOL_DIRECTIONS_1[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0xa0000000u, 0xf0000000u,
		0x88000000u, 0xcc000000u, 0xaa000000u, 0xff000000u,
		0x80800000u, 0xc0c00000u, 0xa0a00000u, 0xf0f00000u,
		0x88880000u, 0xcccc0000u, 0xaaaa0000u, 0xffff0000u,
		0x80008000u, 0xc000c000u, 0xa000a000u, 0xf000f000u,
		0x88008800u, 0xcc00cc00u, 0xaa00aa00u, 0xff00ff00u,
		0x80808080u, 0xc0c0c0c0u, 0xa0a0a0a0u, 0xf0f0f0f0u,
		0x88888888u, 0xccccccccu, 0xaaaaaaaau, 0xffffffffu
	);

	const uint SOBOL_DIRECTIONS_2[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x60000000u, 0x90000000u,
		0xe8000000u, 0x5c000000u, 0x8e000000u, 0xc5000000u,
		0x68800000u, 0x9cc00000u, 0xee600000u, 0x55900000u,
		0x80680000u, 0xc09c0000u, 0x60ee0000u, 0x90550000u,
		0xe8808000u, 0x5cc0c000u, 0x8e606000u, 0xc5909000u,
		0x6868e800u, 0x9c9c5c00u, 0xeeee8e00u, 0x5555c500u,
		0x8000e880u, 0xc0005cc0u, 0x60008e60u, 0x9000c590u,
		0xe8006868u, 0x5c009c9cu, 0x8e00eeeeu, 0xc5005555u
	);

	const uint SOBOL_DIRECTIONS_3[ 32 ] = uint[ 32 ](
		0x80000000u, 0xc0000000u, 0x20000000u, 0x50000000u,
		0xf8000000u, 0x74000000u, 0xa2000000u, 0x93000000u,
		0xd8800000u, 0x25400000u, 0x59e00000u, 0xe6d00000u,
		0x78080000u, 0xb40c0000u, 0x82020000u, 0xc3050000u,
		0x208f8000u, 0x51474000u, 0xfbea2000u, 0x75d93000u,
		0xa0858800u, 0x914e5400u, 0xdbe79e00u, 0x25db6d00u,
		0x58800080u, 0xe54000c0u, 0x79e00020u, 0xb6d00050u,
		0x800800f8u, 0xc00c0074u, 0x200200a2u, 0x50050093u
	);

	const uint SOBOL_DIRECTIONS_4[ 32 ] = uint[ 32 ](
		0x80000000u, 0x40000000u, 0x20000000u, 0xb0000000u,
		0xf8000000u, 0xdc000000u, 0x7a000000u, 0x9d000000u,
		0x5a800000u, 0x2fc00000u, 0xa1600000u, 0xf0b00000u,
		0xda880000u, 0x6fc40000u, 0x81620000u, 0x40bb0000u,
		0x22878000u, 0xb3c9c000u, 0xfb65a000u, 0xddb2d000u,
		0x78022800u, 0x9c0b3c00u, 0x5a0fb600u, 0x2d0ddb00u,
		0xa2878080u, 0xf3c9c040u, 0xdb65a020u, 0x6db2d0b0u,
		0x800228f8u, 0x400b3cdcu, 0x200fb67au, 0xb00ddb9du
	);

	uint getMaskedSobol( uint index, uint directions[ 32 ] ) {

		uint X = 0u;
		for ( int bit = 0; bit < 32; bit ++ ) {

			uint mask = ( index >> bit ) & 1u;
			X ^= mask * directions[ bit ];

		}
		return X;

	}

	vec4 generateSobolPoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			return vec4( 0.0 );

		}

		// NOTE: this sobol "direction" is also available but we can't write out 5 components
		// uint x = index & 0x00ffffffu;
		uint x = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_1 ) ) & 0x00ffffffu;
		uint y = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_2 ) ) & 0x00ffffffu;
		uint z = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_3 ) ) & 0x00ffffffu;
		uint w = sobolReverseBits( getMaskedSobol( index, SOBOL_DIRECTIONS_4 ) ) & 0x00ffffffu;

		return vec4( x, y, z, w ) * SOBOL_FACTOR;

	}

`,Oa=`

	// Seeds
	uniform sampler2D sobolTexture;
	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;

	uint sobolGetSeed( uint bounce, uint effect ) {

		return sobolHash(
			sobolHashCombine(
				sobolHashCombine(
					sobolHash( bounce ),
					sobolPixelIndex
				),
				effect
			)
		);

	}

	vec4 sobolGetTexturePoint( uint index ) {

		if ( index >= SOBOL_MAX_POINTS ) {

			index = index % SOBOL_MAX_POINTS;

		}

		uvec2 dim = uvec2( textureSize( sobolTexture, 0 ).xy );
		uint y = index / dim.x;
		uint x = index - y * dim.x;
		vec2 uv = vec2( x, y ) / vec2( dim );
		return texture( sobolTexture, uv );

	}

	${Ta(1)}
	${Ta(2)}
	${Ta(3)}
	${Ta(4)}

`,ka=class extends Sa{constructor(){super({blending:0,uniforms:{resolution:{value:new U}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`

				${Ea}
				${Da}

				varying vec2 vUv;
				uniform vec2 resolution;
				void main() {

					uint index = uint( gl_FragCoord.y ) * uint( resolution.x ) + uint( gl_FragCoord.x );
					gl_FragColor = generateSobolPoint( index );

				}
			`})}},Aa=class{generate(e,t=256){let n=new Tt(t,t,{type:z,format:G,minFilter:H,magFilter:H,generateMipmaps:!1}),r=e.getRenderTarget();e.setRenderTarget(n);let i=new pt(new ka);return i.material.resolution.set(t,t),i.render(e),e.setRenderTarget(r),i.dispose(),n}},ja=class extends jt{set bokehSize(e){this.fStop=this.getFocalLength()/e}get bokehSize(){return this.getFocalLength()/this.fStop}constructor(...e){super(...e),this.fStop=1.4,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=25,this.anamorphicRatio=1}copy(e,t){return super.copy(e,t),this.fStop=e.fStop,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio,this}},Ma=class{constructor(){this.bokehSize=0,this.apertureBlades=0,this.apertureRotation=0,this.focusDistance=10,this.anamorphicRatio=1}updateFrom(e){e instanceof ja?(this.bokehSize=e.bokehSize,this.apertureBlades=e.apertureBlades,this.apertureRotation=e.apertureRotation,this.focusDistance=e.focusDistance,this.anamorphicRatio=e.anamorphicRatio):(this.bokehSize=0,this.apertureRotation=0,this.apertureBlades=0,this.focusDistance=10,this.anamorphicRatio=1)}};function Na(e){let t=new Uint16Array(e.length);for(let n=0,r=e.length;n<r;++n)t[n]=B.toHalfFloat(e[n]);return t}function Pa(e,t,n=0,r=e.length){let i=n,a=n+r-1;for(;i<a;){let n=i+a>>1;e[n]<t?i=n+1:a=n}return i-n}function Fa(e,t,n){return .2126*e+.7152*t+.0722*n}function Ia(e,t=We){let n=e.clone();n.source=new V({...n.image});let{width:r,height:i,data:a}=n.image,o=a;if(n.type!==t){o=t===1016?new Uint16Array(a.length):new Float32Array(a.length);let e;e=a instanceof Int8Array||a instanceof Int16Array||a instanceof Int32Array?2**(8*a.BYTES_PER_ELEMENT-1)-1:2**(8*a.BYTES_PER_ELEMENT)-1;for(let r=0,i=a.length;r<i;r++){let i=a[r];n.type===1016&&(i=B.fromHalfFloat(a[r])),n.type!==1015&&n.type!==1016&&(i/=e),t===1016&&(o[r]=B.toHalfFloat(i))}n.image.data=o,n.type=t}if(n.flipY){let e=o;o=o.slice();for(let t=0;t<i;t++)for(let n=0;n<r;n++){let a=i-t-1,s=4*(t*r+n),c=4*(a*r+n);o[c+0]=e[s+0],o[c+1]=e[s+1],o[c+2]=e[s+2],o[c+3]=e[s+3]}n.flipY=!1,n.image.data=o}return n}var La=class{constructor(){let e=new et(Na(new Float32Array([0,0,0,0])),1,1);e.type=We,e.format=G,e.minFilter=gt,e.magFilter=gt,e.wrapS=Ze,e.wrapT=Ze,e.generateMipmaps=!1,e.needsUpdate=!0;let t=new et(Na(new Float32Array([0,1])),1,2);t.type=We,t.format=St,t.minFilter=gt,t.magFilter=gt,t.generateMipmaps=!1,t.needsUpdate=!0;let n=new et(Na(new Float32Array([0,0,1,1])),2,2);n.type=We,n.format=St,n.minFilter=gt,n.magFilter=gt,n.generateMipmaps=!1,n.needsUpdate=!0,this.map=e,this.marginalWeights=t,this.conditionalWeights=n,this.totalSum=0}getPixelWeight(e,t,n){return Fa(e,t,n)}dispose(){this.marginalWeights.dispose(),this.conditionalWeights.dispose(),this.map.dispose()}updateFrom(e){let t=Ia(e);t.wrapS=Ze,t.wrapT=Be;let{width:n,height:r,data:i}=t.image,a=new Float32Array(n*r),o=new Float32Array(n*r),s=new Float32Array(r),c=new Float32Array(r),l=0,u=0;for(let e=0;e<r;e++){let t=0;for(let s=0;s<n;s++){let c=e*n+s,u=B.fromHalfFloat(i[4*c+0]),d=B.fromHalfFloat(i[4*c+1]),f=B.fromHalfFloat(i[4*c+2]),p=this.getPixelWeight(u,d,f,e,r);t+=p,l+=p,a[c]=p,o[c]=t}if(t!==0)for(let r=e*n,i=e*n+n;r<i;r++)a[r]/=t,o[r]/=t;u+=t,s[e]=t,c[e]=u}if(u!==0)for(let e=0,t=s.length;e<t;e++)s[e]/=u,c[e]/=u;let d=new Uint16Array(r),f=new Uint16Array(n*r);for(let e=0;e<r;e++){let t=Pa(c,(e+1)/r);d[e]=B.toHalfFloat((t+.5)/r)}for(let e=0;e<r;e++)for(let t=0;t<n;t++){let r=e*n+t,i=Pa(o,(t+1)/n,e*n,n);f[r]=B.toHalfFloat((i+.5)/n)}this.dispose();let{marginalWeights:p,conditionalWeights:m}=this;p.image={width:r,height:1,data:d},p.needsUpdate=!0,m.image={width:n,height:r,data:f},m.needsUpdate=!0,this.totalSum=l,this.map=t}},Ra=6,za=11,Ba=0,Va=1,Ha=2,Ua=3,Wa=4,Ga=new W,Ka=new W,qa=new ut,Ja=new ze,Ya=new W,Xa=new W,Za=new W(0,1,0),Qa=class{constructor(){let e=new et(new Float32Array(4),1,1);e.format=G,e.type=z,e.wrapS=Be,e.wrapT=Be,e.generateMipmaps=!1,e.minFilter=H,e.magFilter=H,this.tex=e,this.count=0}updateFrom(e,t=[]){let n=this.tex,r=Math.max(e.length*Ra,1),i=Math.ceil(Math.sqrt(r));n.image.width!==i&&(n.dispose(),n.image.data=new Float32Array(i*i*4),n.image.width=i,n.image.height=i);let a=n.image.data;for(let n=0,r=e.length;n<r;n++){let r=e[n],i=n*Ra*4,o=0;for(let e=0;e<24;e++)a[i+e]=0;r.getWorldPosition(Ka),a[i+o++]=Ka.x,a[i+o++]=Ka.y,a[i+o++]=Ka.z;let s=Ba;if(r.isRectAreaLight&&r.isCircular?s=Va:r.isSpotLight?s=Ha:r.isDirectionalLight||r.isSunLight?s=Ua:r.isPointLight&&(s=Wa),a[i+o++]=s,a[i+o++]=r.color.r,a[i+o++]=r.color.g,a[i+o++]=r.color.b,a[i+o++]=r.intensity,r.getWorldQuaternion(Ja),r.isRectAreaLight)Ga.set(r.width,0,0).applyQuaternion(Ja),a[i+o++]=Ga.x,a[i+o++]=Ga.y,a[i+o++]=Ga.z,o++,Ka.set(0,r.height,0).applyQuaternion(Ja),a[i+o++]=Ka.x,a[i+o++]=Ka.y,a[i+o++]=Ka.z,a[i+o++]=Ga.cross(Ka).length()*(r.isCircular?Math.PI/4:1);else if(r.isSpotLight){let e=r.radius||0;Ya.setFromMatrixPosition(r.matrixWorld),Xa.setFromMatrixPosition(r.target.matrixWorld),qa.lookAt(Ya,Xa,Za),Ja.setFromRotationMatrix(qa),Ga.set(1,0,0).applyQuaternion(Ja),a[i+o++]=Ga.x,a[i+o++]=Ga.y,a[i+o++]=Ga.z,o++,Ka.set(0,1,0).applyQuaternion(Ja),a[i+o++]=Ka.x,a[i+o++]=Ka.y,a[i+o++]=Ka.z,a[i+o++]=Math.PI*e*e,a[i+o++]=e,a[i+o++]=r.decay,a[i+o++]=r.distance,a[i+o++]=Math.cos(r.angle),a[i+o++]=Math.cos(r.angle*(1-r.penumbra)),a[i+o++]=r.iesMap?t.indexOf(r.iesMap):-1}else if(r.isPointLight){let e=Ga.setFromMatrixPosition(r.matrixWorld);a[i+o++]=e.x,a[i+o++]=e.y,a[i+o++]=e.z,o++,o+=4,o+=1,a[i+o++]=r.decay,a[i+o++]=r.distance}else if(r.isDirectionalLight){let e=Ga.setFromMatrixPosition(r.matrixWorld),t=Ka.setFromMatrixPosition(r.target.matrixWorld);Xa.subVectors(e,t).normalize(),a[i+o++]=Xa.x,a[i+o++]=Xa.y,a[i+o++]=Xa.z}else r.isSunLight&&(Xa.setFromMatrixPosition(r.matrixWorld).normalize(),a[i+o++]=Xa.x,a[i+o++]=Xa.y,a[i+o++]=Xa.z);a[i+za]=+!!r.visibleToCameraRays}this.count=e.length;let o=Yi(a.buffer);return this.hash!==o&&(this.hash=o,n.needsUpdate=!0,!0)}};function $a(e,t,n,r,i){if(t>r)throw Error();let a=e.length/t,o=e.constructor.BYTES_PER_ELEMENT*8,s=1;switch(e.constructor){case Uint8Array:case Uint16Array:case Uint32Array:s=2**o-1;break;case Int8Array:case Int16Array:case Int32Array:s=2**(o-1)-1}for(let o=0;o<a;o++){let a=4*o,c=t*o;for(let o=0;o<r;o++)n[i+a+o]=t>=o+1?e[c+o]/s:0}}var eo=class extends Xe{constructor(){super(),this._textures=[],this.type=z,this.format=G,this.internalFormat=`RGBA32F`}updateAttribute(e,t){let n=this._textures[e];n.updateFrom(t);let r=n.image,i=this.image;if(r.width!==i.width||r.height!==i.height)throw Error(`FloatAttributeTextureArray: Attribute must be the same dimensions when updating single layer.`);let{width:a,height:o,data:s}=i,c=a*o*4*e,l=t.itemSize;l===3&&(l=4),$a(n.image.data,l,s,4,c),this.dispose(),this.needsUpdate=!0}setAttributes(e){let t=e[0].count,n=e.length;for(let r=0,i=n;r<i;r++)if(e[r].count!==t)throw Error(`FloatAttributeTextureArray: All attributes must have the same item count.`);let r=this._textures;for(;r.length<n;){let e=new Mi;r.push(e)}for(;r.length>n;)r.pop();for(let t=0,i=n;t<i;t++)r[t].updateFrom(e[t]);let i=r[0].image,a=this.image;(i.width!==a.width||i.height!==a.height||i.depth!==n)&&(a.width=i.width,a.height=i.height,a.depth=n,a.data=new Float32Array(a.width*a.height*a.depth*4));let{data:o,width:s,height:c}=a;for(let t=0,i=n;t<i;t++){let n=r[t],i=s*c*4*t,a=e[t].itemSize;a===3&&(a=4),$a(n.image.data,a,o,4,i)}this.dispose(),this.needsUpdate=!0}},to=class extends eo{updateNormalAttribute(e){this.updateAttribute(0,e)}updateTangentAttribute(e){this.updateAttribute(1,e)}updateUvAttribute(e){this.updateAttribute(2,e)}updateColorAttribute(e){this.updateAttribute(3,e)}updateFrom(e,t,n,r){this.setAttributes([e,t,n,r])}};function no(e,t){return e.uuid<t.uuid?1:e.uuid>t.uuid?-1:0}function ro(e){return`${e.source.uuid}:${e.colorSpace}`}function io(e){let t=new Set,n=[];for(let r=0,i=e.length;r<i;r++){let i=e[r],a=ro(i);t.has(a)||(t.add(a),n.push(i))}return n}function ao(e){let t=e.map(e=>e.iesMap||null).filter(e=>e),n=new Set(t);return Array.from(n).sort(no)}function oo(e){let t=new Set;for(let n=0,r=e.length;n<r;n++){let r=e[n];for(let e in r){let n=r[e];n&&n.isTexture&&t.add(n)}}return io(Array.from(t)).sort(no)}function so(e){let t=[];return e.traverseVisible(e=>{(e.isRectAreaLight||e.isSpotLight||e.isPointLight||e.isDirectionalLight||e.isSunLight)&&t.push(e)}),t.sort(no)}var co=188,lo=class{constructor(){this._features={}}isUsed(e){return e in this._features}setUsed(e,t=!0){t===!1?delete this._features[e]:this._features[e]=!0}reset(){this._features={}}},uo=class extends et{constructor(){super(new Float32Array(4),1,1),this.format=G,this.type=z,this.wrapS=Be,this.wrapT=Be,this.minFilter=H,this.magFilter=H,this.generateMipmaps=!1,this.features=new lo}updateFrom(e,t){function n(e,t,n=-1){if(t in e&&e[t]){let n=ro(e[t]);return u[n]}return n}function r(e,t,n){return t in e?e[t]:n}function i(e,t,n,r){let i=e[t]&&e[t].isTexture?e[t]:null;if(i){i.matrixAutoUpdate&&i.updateMatrix();let e=i.matrix.elements,t=0;n[r+t++]=e[0],n[r+t++]=e[3],n[r+t++]=e[6],t++,n[r+t++]=e[1],n[r+t++]=e[4],n[r+t++]=e[7],t++}return 8}let a=0,o=e.length*47,s=Math.ceil(Math.sqrt(o))||1,{image:c,features:l}=this,u={};for(let e=0,n=t.length;e<n;e++)u[ro(t[e])]=e;c.width!==s&&(this.dispose(),c.data=new Float32Array(s*s*4),c.width=s,c.height=s);let d=c.data;l.reset();for(let t=0,o=e.length;t<o;t++){let o=e[t];if(o.isFogVolumeMaterial){l.setUsed(`FOG`);for(let e=0;e<co;e++)d[a+e]=0;d[a+0+0]=o.color.r,d[a+0+1]=o.color.g,d[a+0+2]=o.color.b,d[a+8+3]=r(o,`emissiveIntensity`,0),d[a+12+0]=o.emissive.r,d[a+12+1]=o.emissive.g,d[a+12+2]=o.emissive.b,d[a+52+1]=o.density,d[a+52+3]=0,d[a+56+2]=4,a+=co;continue}d[a++]=o.color.r,d[a++]=o.color.g,d[a++]=o.color.b,d[a++]=n(o,`map`),d[a++]=r(o,`metalness`,0),d[a++]=n(o,`metalnessMap`),d[a++]=r(o,`roughness`,0),d[a++]=n(o,`roughnessMap`),d[a++]=r(o,`ior`,1.5),d[a++]=r(o,`transmission`,0),d[a++]=n(o,`transmissionMap`),d[a++]=r(o,`emissiveIntensity`,0),`emissive`in o?(d[a++]=o.emissive.r,d[a++]=o.emissive.g,d[a++]=o.emissive.b):(d[a++]=0,d[a++]=0,d[a++]=0),d[a++]=n(o,`emissiveMap`),d[a++]=n(o,`normalMap`),`normalScale`in o?(d[a++]=o.normalScale.x,d[a++]=o.normalScale.y):(d[a++]=1,d[a++]=1),d[a++]=r(o,`clearcoat`,0),d[a++]=n(o,`clearcoatMap`),d[a++]=r(o,`clearcoatRoughness`,0),d[a++]=n(o,`clearcoatRoughnessMap`),d[a++]=n(o,`clearcoatNormalMap`),`clearcoatNormalScale`in o?(d[a++]=o.clearcoatNormalScale.x,d[a++]=o.clearcoatNormalScale.y):(d[a++]=1,d[a++]=1),a++,d[a++]=r(o,`sheen`,0),`sheenColor`in o?(d[a++]=o.sheenColor.r,d[a++]=o.sheenColor.g,d[a++]=o.sheenColor.b):(d[a++]=0,d[a++]=0,d[a++]=0),d[a++]=n(o,`sheenColorMap`),d[a++]=r(o,`sheenRoughness`,0),d[a++]=n(o,`sheenRoughnessMap`),d[a++]=n(o,`iridescenceMap`),d[a++]=n(o,`iridescenceThicknessMap`),d[a++]=r(o,`iridescence`,0),d[a++]=r(o,`iridescenceIOR`,1.3);let s=r(o,`iridescenceThicknessRange`,[100,400]);d[a++]=s[0],d[a++]=s[1],`specularColor`in o?(d[a++]=o.specularColor.r,d[a++]=o.specularColor.g,d[a++]=o.specularColor.b):(d[a++]=1,d[a++]=1,d[a++]=1),d[a++]=n(o,`specularColorMap`),d[a++]=r(o,`specularIntensity`,1),d[a++]=n(o,`specularIntensityMap`);let c=r(o,`thickness`,0)===0&&r(o,`attenuationDistance`,1/0)===1/0;if(d[a++]=Number(c),a++,`attenuationColor`in o?(d[a++]=o.attenuationColor.r,d[a++]=o.attenuationColor.g,d[a++]=o.attenuationColor.b):(d[a++]=1,d[a++]=1,d[a++]=1),d[a++]=r(o,`attenuationDistance`,1/0),d[a++]=n(o,`alphaMap`),d[a++]=o.opacity,d[a++]=o.alphaTest,!c&&o.transmission>0)d[a++]=0;else switch(o.side){case 0:d[a++]=1;break;case 1:d[a++]=-1;break;case 2:d[a++]=0}d[a++]=Number(r(o,`matte`,!1)),d[a++]=Number(r(o,`castShadow`,!0)),d[a++]=Number(o.vertexColors)|Number(o.flatShading)<<1,d[a++]=Number(o.transparent),a+=i(o,`map`,d,a),a+=i(o,`metalnessMap`,d,a),a+=i(o,`roughnessMap`,d,a),a+=i(o,`transmissionMap`,d,a),a+=i(o,`emissiveMap`,d,a),a+=i(o,`normalMap`,d,a),a+=i(o,`clearcoatMap`,d,a),a+=i(o,`clearcoatNormalMap`,d,a),a+=i(o,`clearcoatRoughnessMap`,d,a),a+=i(o,`sheenColorMap`,d,a),a+=i(o,`sheenRoughnessMap`,d,a),a+=i(o,`iridescenceMap`,d,a),a+=i(o,`iridescenceThicknessMap`,d,a),a+=i(o,`specularColorMap`,d,a),a+=i(o,`specularIntensityMap`,d,a),a+=i(o,`alphaMap`,d,a)}let f=Yi(d.buffer);return this.hash!==f&&(this.hash=f,this.needsUpdate=!0,!0)}},fo=new Ct;function po(e){return e?`${e.uuid}:${e.version}`:null}function mo(e,t){for(let n in t)n in e&&(e[n]=t[n])}var ho=class extends lt{constructor(e,t,n){let r={format:G,type:Ie,minFilter:gt,magFilter:gt,wrapS:Ze,wrapT:Ze,generateMipmaps:!1,...n};super(e,t,1,r),mo(this.texture,r),this.texture.setTextures=(...e)=>{this.setTextures(...e)},this.hashes=[null];let i=new pt(new go);this.fsQuad=i}setTextures(e,t,n=this.width,r=this.height){let i=e.getRenderTarget(),a=e.toneMapping,o=e.getClearAlpha();e.getClearColor(fo);let s=t.length||1;(n!==this.width||r!==this.height||this.depth!==s)&&(this.setSize(n,r,s),this.hashes=Array(s).fill(null)),e.setClearColor(0,0),e.toneMapping=0;let c=this.fsQuad,l=this.hashes,u=!1;for(let n=0,r=s;n<r;n++){let r=t[n],i=po(r);r&&(l[n]!==i||r.isWebGLRenderTarget)&&(r.matrixAutoUpdate=!1,r.matrix.identity(),c.material.map=r,e.setRenderTarget(this,n),c.render(e),r.updateMatrix(),r.matrixAutoUpdate=!0,l[n]=i,u=!0)}return c.material.map=null,e.setClearColor(fo,o),e.setRenderTarget(i),e.toneMapping=a,u}dispose(){super.dispose(),this.fsQuad.dispose()}},go=class extends Je{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}constructor(){super({uniforms:{map:{value:null}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				varying vec2 vUv;
				void main() {

					gl_FragColor = texture2D( map, vUv );

				}
			`})}};function _o(e,t=Math.random()){for(let n=e.length-1;n>0;n--){let r=Math.floor(t()*(n+1)),i=e[n];e[n]=e[r],e[r]=i}return e}var vo=class{constructor(e,t,n=Math.random){let r=e**t,i=new Uint16Array(r),a=r;for(let e=0;e<r;e++)i[e]=e;this.samples=new Float32Array(t),this.strataCount=e,this.reset=function(){for(let e=0;e<r;e++)i[e]=e;a=0},this.reshuffle=function(){a=0},this.next=function(){let{samples:r}=this;a>=i.length&&(_o(i,n),this.reshuffle());let o=i[a++];for(let i=0;i<t;i++)r[i]=(o%e+n())/e,o=Math.floor(o/e);return r}}},yo=class{constructor(e,t,n=Math.random){let r=0;for(let e of t)r+=e;let i=new Float32Array(r),a=[],o=0;for(let r of t){let t=new vo(e,r,n);t.samples=new Float32Array(i.buffer,o,t.samples.length),o+=t.samples.length*4,a.push(t)}this.samples=i,this.strataCount=e,this.next=function(){for(let e of a)e.next();return i},this.reshuffle=function(){for(let e of a)e.reshuffle()},this.reset=function(){for(let e of a)e.reset()}}},bo=class{constructor(e=0){this.m=2147483648,this.a=1103515245,this.c=12345,this.seed=e}nextInt(){return this.seed=(this.a*this.seed+this.c)%this.m,this.seed}nextFloat(){return this.nextInt()/(this.m-1)}},xo=class extends et{constructor(e=1,t=1,n=8){super(new Float32Array(1),1,1,G,z),this.minFilter=H,this.magFilter=H,this.strata=n,this.sampler=null,this.generator=new bo,this.stableNoise=!1,this.random=()=>this.stableNoise?this.generator.nextFloat():Math.random(),this.init(e,t,n)}init(e=this.image.height,t=this.image.width,n=this.strata){let{image:r}=this;if(r.width===t&&r.height===e&&this.sampler!==null)return;let i=new yo(n,Array(e*t).fill(4),this.random);r.width=t,r.height=e,r.data=i.samples,this.sampler=i,this.dispose(),this.next()}next(){this.sampler.next(),this.needsUpdate=!0}reset(){this.sampler.reset(),this.generator.seed=0}};function So(e,t=Math.random){for(let n=e.length-1;n>0;n--){let r=~~((t()-1e-6)*n),i=e[n];e[n]=e[r],e[r]=i}}function Co(e,t){e.fill(0);for(let n=0;n<t;n++)e[n]=1}var wo=class{constructor(e){this.count=0,this.size=-1,this.sigma=-1,this.radius=-1,this.lookupTable=null,this.score=null,this.binaryPattern=null,this.resize(e),this.setSigma(1.5)}findVoid(){let{score:e,binaryPattern:t}=this,n=1/0,r=-1;for(let i=0,a=t.length;i<a;i++){if(t[i]!==0)continue;let a=e[i];a<n&&(n=a,r=i)}return r}findCluster(){let{score:e,binaryPattern:t}=this,n=-1/0,r=-1;for(let i=0,a=t.length;i<a;i++){if(t[i]!==1)continue;let a=e[i];a>n&&(n=a,r=i)}return r}setSigma(e){if(e===this.sigma)return;let t=~~(Math.sqrt(20*e**2)+1),n=2*t+1,r=new Float32Array(n*n),i=e*e;for(let e=-t;e<=t;e++)for(let a=-t;a<=t;a++){let o=(t+a)*n+e+t,s=e*e+a*a;r[o]=Math.E**(-s/(2*i))}this.lookupTable=r,this.sigma=e,this.radius=t}resize(e){this.size!==e&&(this.size=e,this.score=new Float32Array(e*e),this.binaryPattern=new Uint8Array(e*e))}invert(){let{binaryPattern:e,score:t,size:n}=this;t.fill(0);for(let t=0,r=e.length;t<r;t++)if(e[t]===0){let r=~~(t/n),i=t-r*n;this.updateScore(i,r,1),e[t]=1}else e[t]=0}updateScore(e,t,n){let{size:r,score:i,lookupTable:a}=this,o=this.radius,s=2*o+1;for(let c=-o;c<=o;c++)for(let l=-o;l<=o;l++){let u=a[(o+l)*s+c+o],d=e+c;d=d<0?r+d:d%r;let f=t+l;f=f<0?r+f:f%r;let p=f*r+d;i[p]+=n*u}}addPointIndex(e){this.binaryPattern[e]=1;let t=this.size,n=~~(e/t),r=e-n*t;this.updateScore(r,n,1),this.count++}removePointIndex(e){this.binaryPattern[e]=0;let t=this.size,n=~~(e/t),r=e-n*t;this.updateScore(r,n,-1),this.count--}copy(e){this.resize(e.size),this.score.set(e.score),this.binaryPattern.set(e.binaryPattern),this.setSigma(e.sigma),this.count=e.count}},To=class{constructor(){this.random=Math.random,this.sigma=1.5,this.size=64,this.majorityPointsRatio=.1,this.samples=new wo(1),this.savedSamples=new wo(1)}generate(){let{samples:e,savedSamples:t,sigma:n,majorityPointsRatio:r,size:i}=this;e.resize(i),e.setSigma(n);let a=Math.floor(i*i*r),o=e.binaryPattern;Co(o,a),So(o,this.random);for(let t=0,n=o.length;t<n;t++)o[t]===1&&e.addPointIndex(t);for(;;){let t=e.findCluster();e.removePointIndex(t);let n=e.findVoid();if(t===n){e.addPointIndex(t);break}e.addPointIndex(n)}let s=new Uint32Array(i*i);t.copy(e);let c;for(c=e.count-1;c>=0;){let t=e.findCluster();e.removePointIndex(t),s[t]=c,c--}let l=i*i;for(c=t.count;c<l/2;){let e=t.findVoid();t.addPointIndex(e),s[e]=c,c++}for(t.invert();c<l;){let e=t.findCluster();t.removePointIndex(e),s[e]=c,c++}return{data:s,maxValue:l}}};function Eo(e){return e>=3?4:e}function Do(e){switch(e){case 1:return St;case 2:return He;default:return G}}var Oo=class extends et{constructor(e=64,t=1){super(new Float32Array(4),1,1,G,z),this.minFilter=H,this.magFilter=H,this.size=e,this.channels=t,this.update()}update(){let e=this.channels,t=this.size,n=new To;n.channels=e,n.size=t;let r=Eo(e),i=Do(r);(this.image.width!==t||i!==this.format)&&(this.image.width=t,this.image.height=t,this.image.data=new Float32Array(t**2*r),this.format=i,this.dispose());let a=this.image.data;for(let t=0,i=e;t<i;t++){let e=n.generate(),i=e.data,o=e.maxValue;for(let e=0,n=i.length;e<n;e++){let n=i[e]/o;a[e*r+t]=n}}this.needsUpdate=!0}},ko=`

	struct PhysicalCamera {

		float focusDistance;
		float anamorphicRatio;
		float bokehSize;
		int apertureBlades;
		float apertureRotation;

	};

`,Ao=`

	struct EquirectHdrInfo {

		sampler2D marginalWeights;
		sampler2D conditionalWeights;
		sampler2D map;

		float totalSum;

	};

`,jo=`

	#define RECT_AREA_LIGHT_TYPE 0
	#define CIRC_AREA_LIGHT_TYPE 1
	#define SPOT_LIGHT_TYPE 2
	#define DIR_LIGHT_TYPE 3
	#define POINT_LIGHT_TYPE 4

	struct LightsInfo {

		sampler2D tex;
		uint count;

	};

	struct Light {

		vec3 position;
		int type;

		vec3 color;
		float intensity;

		vec3 u;
		vec3 v;
		float area;

		// spot light fields
		float radius;
		float near;
		float decay;
		float distance;
		float coneCos;
		float penumbraCos;
		int iesProfile;

	};

	Light readLightInfo( sampler2D tex, uint index ) {

		uint i = index * 6u;

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );

		Light l;
		l.position = s0.rgb;
		l.type = int( round( s0.a ) );

		l.color = s1.rgb;
		l.intensity = s1.a;

		l.u = s2.rgb;
		l.v = s3.rgb;
		l.area = s3.a;

		if ( l.type == SPOT_LIGHT_TYPE || l.type == POINT_LIGHT_TYPE ) {

			vec4 s4 = texelFetch1D( tex, i + 4u );
			vec4 s5 = texelFetch1D( tex, i + 5u );
			l.radius = s4.r;
			l.decay = s4.g;
			l.distance = s4.b;
			l.coneCos = s4.a;

			l.penumbraCos = s5.r;
			l.iesProfile = int( round( s5.g ) );

		} else {

			l.radius = 0.0;
			l.decay = 0.0;
			l.distance = 0.0;

			l.coneCos = 0.0;
			l.penumbraCos = 0.0;
			l.iesProfile = - 1;

		}

		return l;

	}

`,Mo=`

	struct Material {

		vec3 color;
		int map;

		float metalness;
		int metalnessMap;

		float roughness;
		int roughnessMap;

		float ior;
		float transmission;
		int transmissionMap;

		float emissiveIntensity;
		vec3 emissive;
		int emissiveMap;

		int normalMap;
		vec2 normalScale;

		float clearcoat;
		int clearcoatMap;
		int clearcoatNormalMap;
		vec2 clearcoatNormalScale;
		float clearcoatRoughness;
		int clearcoatRoughnessMap;

		int iridescenceMap;
		int iridescenceThicknessMap;
		float iridescence;
		float iridescenceIor;
		float iridescenceThicknessMinimum;
		float iridescenceThicknessMaximum;

		vec3 specularColor;
		int specularColorMap;

		float specularIntensity;
		int specularIntensityMap;
		bool thinFilm;

		vec3 attenuationColor;
		float attenuationDistance;

		int alphaMap;

		bool castShadow;
		float opacity;
		float alphaTest;

		float side;
		bool matte;

		float sheen;
		vec3 sheenColor;
		int sheenColorMap;
		float sheenRoughness;
		int sheenRoughnessMap;

		bool vertexColors;
		bool flatShading;
		bool transparent;
		bool fogVolume;

		mat3 mapTransform;
		mat3 metalnessMapTransform;
		mat3 roughnessMapTransform;
		mat3 transmissionMapTransform;
		mat3 emissiveMapTransform;
		mat3 normalMapTransform;
		mat3 clearcoatMapTransform;
		mat3 clearcoatNormalMapTransform;
		mat3 clearcoatRoughnessMapTransform;
		mat3 sheenColorMapTransform;
		mat3 sheenRoughnessMapTransform;
		mat3 iridescenceMapTransform;
		mat3 iridescenceThicknessMapTransform;
		mat3 specularColorMapTransform;
		mat3 specularIntensityMapTransform;
		mat3 alphaMapTransform;

	};

	mat3 readTextureTransform( sampler2D tex, uint index ) {

		mat3 textureTransform;

		vec4 row1 = texelFetch1D( tex, index );
		vec4 row2 = texelFetch1D( tex, index + 1u );

		textureTransform[0] = vec3(row1.r, row2.r, 0.0);
		textureTransform[1] = vec3(row1.g, row2.g, 0.0);
		textureTransform[2] = vec3(row1.b, row2.b, 1.0);

		return textureTransform;

	}

	Material readMaterialInfo( sampler2D tex, uint index ) {

		uint i = index * uint( MATERIAL_PIXELS );

		vec4 s0 = texelFetch1D( tex, i + 0u );
		vec4 s1 = texelFetch1D( tex, i + 1u );
		vec4 s2 = texelFetch1D( tex, i + 2u );
		vec4 s3 = texelFetch1D( tex, i + 3u );
		vec4 s4 = texelFetch1D( tex, i + 4u );
		vec4 s5 = texelFetch1D( tex, i + 5u );
		vec4 s6 = texelFetch1D( tex, i + 6u );
		vec4 s7 = texelFetch1D( tex, i + 7u );
		vec4 s8 = texelFetch1D( tex, i + 8u );
		vec4 s9 = texelFetch1D( tex, i + 9u );
		vec4 s10 = texelFetch1D( tex, i + 10u );
		vec4 s11 = texelFetch1D( tex, i + 11u );
		vec4 s12 = texelFetch1D( tex, i + 12u );
		vec4 s13 = texelFetch1D( tex, i + 13u );
		vec4 s14 = texelFetch1D( tex, i + 14u );

		Material m;
		m.color = s0.rgb;
		m.map = int( round( s0.a ) );

		m.metalness = s1.r;
		m.metalnessMap = int( round( s1.g ) );
		m.roughness = s1.b;
		m.roughnessMap = int( round( s1.a ) );

		m.ior = s2.r;
		m.transmission = s2.g;
		m.transmissionMap = int( round( s2.b ) );
		m.emissiveIntensity = s2.a;

		m.emissive = s3.rgb;
		m.emissiveMap = int( round( s3.a ) );

		m.normalMap = int( round( s4.r ) );
		m.normalScale = s4.gb;

		m.clearcoat = s4.a;
		m.clearcoatMap = int( round( s5.r ) );
		m.clearcoatRoughness = s5.g;
		m.clearcoatRoughnessMap = int( round( s5.b ) );
		m.clearcoatNormalMap = int( round( s5.a ) );
		m.clearcoatNormalScale = s6.rg;

		m.sheen = s6.a;
		m.sheenColor = s7.rgb;
		m.sheenColorMap = int( round( s7.a ) );
		m.sheenRoughness = s8.r;
		m.sheenRoughnessMap = int( round( s8.g ) );

		m.iridescenceMap = int( round( s8.b ) );
		m.iridescenceThicknessMap = int( round( s8.a ) );
		m.iridescence = s9.r;
		m.iridescenceIor = s9.g;
		m.iridescenceThicknessMinimum = s9.b;
		m.iridescenceThicknessMaximum = s9.a;

		m.specularColor = s10.rgb;
		m.specularColorMap = int( round( s10.a ) );

		m.specularIntensity = s11.r;
		m.specularIntensityMap = int( round( s11.g ) );
		m.thinFilm = bool( s11.b );

		m.attenuationColor = s12.rgb;
		m.attenuationDistance = s12.a;

		m.alphaMap = int( round( s13.r ) );

		m.opacity = s13.g;
		m.alphaTest = s13.b;
		m.side = s13.a;

		m.matte = bool( s14.r );
		m.castShadow = bool( s14.g );
		m.vertexColors = bool( int( s14.b ) & 1 );
		m.flatShading = bool( int( s14.b ) & 2 );
		m.fogVolume = bool( int( s14.b ) & 4 );
		m.transparent = bool( s14.a );

		uint firstTextureTransformIdx = i + 15u;

		// mat3( 1.0 ) is an identity matrix
		m.mapTransform = m.map == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx );
		m.metalnessMapTransform = m.metalnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 2u );
		m.roughnessMapTransform = m.roughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 4u );
		m.transmissionMapTransform = m.transmissionMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 6u );
		m.emissiveMapTransform = m.emissiveMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 8u );
		m.normalMapTransform = m.normalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 10u );
		m.clearcoatMapTransform = m.clearcoatMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 12u );
		m.clearcoatNormalMapTransform = m.clearcoatNormalMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 14u );
		m.clearcoatRoughnessMapTransform = m.clearcoatRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 16u );
		m.sheenColorMapTransform = m.sheenColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 18u );
		m.sheenRoughnessMapTransform = m.sheenRoughnessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 20u );
		m.iridescenceMapTransform = m.iridescenceMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 22u );
		m.iridescenceThicknessMapTransform = m.iridescenceThicknessMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 24u );
		m.specularColorMapTransform = m.specularColorMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 26u );
		m.specularIntensityMapTransform = m.specularIntensityMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 28u );
		m.alphaMapTransform = m.alphaMap == - 1 ? mat3( 1.0 ) : readTextureTransform( tex, firstTextureTransformIdx + 30u );

		return m;

	}

`,No=`

	struct SurfaceRecord {

		// surface type
		bool volumeParticle;

		// geometry
		vec3 faceNormal;
		bool frontFace;
		vec3 normal;
		mat3 normalBasis;
		mat3 normalInvBasis;

		// cached properties
		float eta;
		float f0;

		// material
		float roughness;
		float filteredRoughness;
		float metalness;
		vec3 color;
		vec3 emission;

		// transmission
		float ior;
		float transmission;
		bool thinFilm;
		vec3 attenuationColor;
		float attenuationDistance;

		// clearcoat
		vec3 clearcoatNormal;
		mat3 clearcoatBasis;
		mat3 clearcoatInvBasis;
		float clearcoat;
		float clearcoatRoughness;
		float filteredClearcoatRoughness;

		// sheen
		float sheen;
		vec3 sheenColor;
		float sheenRoughness;

		// iridescence
		float iridescence;
		float iridescenceIor;
		float iridescenceThickness;

		// specular
		vec3 specularColor;
		float specularIntensity;
	};

	struct ScatterRecord {
		float specularPdf;
		float pdf;
		vec3 direction;
		vec3 color;
	};

`,Po=`

	// samples the the given environment map in the given direction
	vec3 sampleEquirectColor( sampler2D envMap, vec3 direction ) {

		return texture2D( envMap, equirectDirectionToUv( direction ) ).rgb;

	}

	// gets the pdf of the given direction to sample
	float equirectDirectionPdf( vec3 direction ) {

		vec2 uv = equirectDirectionToUv( direction );
		float theta = uv.y * PI;
		float sinTheta = sin( theta );
		if ( sinTheta == 0.0 ) {

			return 0.0;

		}

		return 1.0 / ( 2.0 * PI * PI * sinTheta );

	}

	// samples the color given env map with CDF and returns the pdf of the direction
	float sampleEquirect( vec3 direction, inout vec3 color ) {

		float totalSum = envMapInfo.totalSum;
		if ( totalSum == 0.0 ) {

			color = vec3( 0.0 );
			return 1.0;

		}

		vec2 uv = equirectDirectionToUv( direction );
		color = texture2D( envMapInfo.map, uv ).rgb;

		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}

	// samples a direction of the envmap with color and retrieves pdf
	float sampleEquirectProbability( vec2 r, inout vec3 color, inout vec3 direction ) {

		// sample env map cdf
		float v = texture2D( envMapInfo.marginalWeights, vec2( r.x, 0.0 ) ).x;
		float u = texture2D( envMapInfo.conditionalWeights, vec2( r.y, v ) ).x;
		vec2 uv = vec2( u, v );

		vec3 derivedDirection = equirectUvToDirection( uv );
		direction = derivedDirection;
		color = texture2D( envMapInfo.map, uv ).rgb;

		float totalSum = envMapInfo.totalSum;
		float lum = luminance( color );
		ivec2 resolution = textureSize( envMapInfo.map, 0 );
		float pdf = lum / totalSum;

		return float( resolution.x * resolution.y ) * pdf * equirectDirectionPdf( direction );

	}
`,Fo=`

	float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

		return smoothstep( coneCosine, penumbraCosine, angleCosine );

	}

	float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

		// based upon Frostbite 3 Moving to Physically-based Rendering
		// page 32, equation 26: E[window1]
		// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), EPSILON );

		if ( cutoffDistance > 0.0 ) {

			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

		}

		return distanceFalloff;

	}

	float getPhotometricAttenuation( sampler2DArray iesProfiles, int iesProfile, vec3 posToLight, vec3 lightDir, vec3 u, vec3 v ) {

		float cosTheta = dot( posToLight, lightDir );
		float angle = acos( cosTheta ) / PI;

		return texture2D( iesProfiles, vec3( angle, 0.0, iesProfile ) ).r;

	}

	struct LightRecord {

		float dist;
		vec3 direction;
		float pdf;
		vec3 emission;
		int type;

	};

	bool intersectLightAtIndex( sampler2D lights, vec3 rayOrigin, vec3 rayDirection, uint l, inout LightRecord lightRec ) {

		bool didHit = false;
		Light light = readLightInfo( lights, l );

		vec3 u = light.u;
		vec3 v = light.v;

		// check for backface
		vec3 normal = normalize( cross( u, v ) );
		if ( dot( normal, rayDirection ) > 0.0 ) {

			u *= 1.0 / dot( u, u );
			v *= 1.0 / dot( v, v );

			float dist;

			// MIS / light intersection is not supported for punctual lights.
			if(
				( light.type == RECT_AREA_LIGHT_TYPE && intersectsRectangle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) ) ||
				( light.type == CIRC_AREA_LIGHT_TYPE && intersectsCircle( light.position, normal, u, v, rayOrigin, rayDirection, dist ) )
			) {

				float cosTheta = dot( rayDirection, normal );
				didHit = true;
				lightRec.dist = dist;
				lightRec.pdf = ( dist * dist ) / ( light.area * cosTheta );
				lightRec.emission = light.color * light.intensity;
				lightRec.direction = rayDirection;
				lightRec.type = light.type;

			}

		}

		return didHit;

	}

	LightRecord randomAreaLightSample( Light light, vec3 rayOrigin, vec2 ruv ) {

		vec3 randomPos;
		if( light.type == RECT_AREA_LIGHT_TYPE ) {

			// rectangular area light
			randomPos = light.position + light.u * ( ruv.x - 0.5 ) + light.v * ( ruv.y - 0.5 );

		} else if( light.type == CIRC_AREA_LIGHT_TYPE ) {

			// circular area light
			float r = 0.5 * sqrt( ruv.x );
			float theta = ruv.y * 2.0 * PI;
			float x = r * cos( theta );
			float y = r * sin( theta );

			randomPos = light.position + light.u * x + light.v * y;

		}

		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );
		vec3 direction = toLight / dist;
		vec3 lightNormal = normalize( cross( light.u, light.v ) );

		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.emission = light.color * light.intensity;
		lightRec.dist = dist;
		lightRec.direction = direction;

		// TODO: the denominator is potentially zero
		lightRec.pdf = lightDistSq / ( light.area * dot( direction, lightNormal ) );

		return lightRec;

	}

	LightRecord randomSpotLightSample( Light light, sampler2DArray iesProfiles, vec3 rayOrigin, vec2 ruv ) {

		float radius = light.radius * sqrt( ruv.x );
		float theta = ruv.y * 2.0 * PI;
		float x = radius * cos( theta );
		float y = radius * sin( theta );

		vec3 u = light.u;
		vec3 v = light.v;
		vec3 normal = normalize( cross( u, v ) );

		float angle = acos( light.coneCos );
		float angleTan = tan( angle );
		float startDistance = light.radius / max( angleTan, EPSILON );

		vec3 randomPos = light.position - normal * startDistance + u * x + v * y;
		vec3 toLight = randomPos - rayOrigin;
		float lightDistSq = dot( toLight, toLight );
		float dist = sqrt( lightDistSq );

		vec3 direction = toLight / max( dist, EPSILON );
		float cosTheta = dot( direction, normal );

		float spotAttenuation = light.iesProfile != - 1 ?
			getPhotometricAttenuation( iesProfiles, light.iesProfile, direction, normal, u, v ) :
			getSpotAttenuation( light.coneCos, light.penumbraCos, cosTheta );

		float distanceAttenuation = getDistanceAttenuation( dist, light.distance, light.decay );
		LightRecord lightRec;
		lightRec.type = light.type;
		lightRec.dist = dist;
		lightRec.direction = direction;
		lightRec.emission = light.color * light.intensity * distanceAttenuation * spotAttenuation;
		lightRec.pdf = 1.0;

		return lightRec;

	}

	LightRecord randomLightSample( sampler2D lights, sampler2DArray iesProfiles, uint lightCount, vec3 rayOrigin, vec3 ruv ) {

		LightRecord result;

		// pick a random light
		uint l = uint( ruv.x * float( lightCount ) );
		Light light = readLightInfo( lights, l );

		if ( light.type == SPOT_LIGHT_TYPE ) {

			result = randomSpotLightSample( light, iesProfiles, rayOrigin, ruv.yz );

		} else if ( light.type == POINT_LIGHT_TYPE ) {

			vec3 lightRay = light.u - rayOrigin;
			float lightDist = length( lightRay );
			float cutoffDistance = light.distance;
			float distanceFalloff = 1.0 / max( pow( lightDist, light.decay ), 0.01 );
			if ( cutoffDistance > 0.0 ) {

				distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDist / cutoffDistance ) ) );

			}

			LightRecord rec;
			rec.direction = normalize( lightRay );
			rec.dist = length( lightRay );
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity * distanceFalloff;
			rec.type = light.type;
			result = rec;

		} else if ( light.type == DIR_LIGHT_TYPE ) {

			LightRecord rec;
			rec.dist = 1e10;
			rec.direction = light.u;
			rec.pdf = 1.0;
			rec.emission = light.color * light.intensity;
			rec.type = light.type;

			result = rec;

		} else {

			// sample the light
			result = randomAreaLightSample( light, rayOrigin, ruv.yz );

		}

		return result;

	}

`,Io=`

	vec3 sampleHemisphere( vec3 n, vec2 uv ) {

		// https://www.rorydriscoll.com/2009/01/07/better-sampling/
		// https://graphics.pixar.com/library/OrthonormalB/paper.pdf
		float sign = n.z == 0.0 ? 1.0 : sign( n.z );
		float a = - 1.0 / ( sign + n.z );
		float b = n.x * n.y * a;
		vec3 b1 = vec3( 1.0 + sign * n.x * n.x * a, sign * b, - sign * n.x );
		vec3 b2 = vec3( b, sign + n.y * n.y * a, - n.y );

		float r = sqrt( uv.x );
		float theta = 2.0 * PI * uv.y;
		float x = r * cos( theta );
		float y = r * sin( theta );
		return x * b1 + y * b2 + sqrt( 1.0 - uv.x ) * n;

	}

	vec2 sampleTriangle( vec2 a, vec2 b, vec2 c, vec2 r ) {

		// get the edges of the triangle and the diagonal across the
		// center of the parallelogram
		vec2 e1 = a - b;
		vec2 e2 = c - b;
		vec2 diag = normalize( e1 + e2 );

		// pick the point in the parallelogram
		if ( r.x + r.y > 1.0 ) {

			r = vec2( 1.0 ) - r;

		}

		return e1 * r.x + e2 * r.y;

	}

	vec2 sampleCircle( vec2 uv ) {

		float angle = 2.0 * PI * uv.x;
		float radius = sqrt( uv.y );
		return vec2( cos( angle ), sin( angle ) ) * radius;

	}

	vec3 sampleSphere( vec2 uv ) {

		float u = ( uv.x - 0.5 ) * 2.0;
		float t = uv.y * PI * 2.0;
		float f = sqrt( 1.0 - u * u );

		return vec3( f * cos( t ), f * sin( t ), u );

	}

	vec2 sampleRegularPolygon( int sides, vec3 uvw ) {

		sides = max( sides, 3 );

		vec3 r = uvw;
		float anglePerSegment = 2.0 * PI / float( sides );
		float segment = floor( float( sides ) * r.x );

		float angle1 = anglePerSegment * segment;
		float angle2 = angle1 + anglePerSegment;
		vec2 a = vec2( sin( angle1 ), cos( angle1 ) );
		vec2 b = vec2( 0.0, 0.0 );
		vec2 c = vec2( sin( angle2 ), cos( angle2 ) );

		return sampleTriangle( a, b, c, r.yz );

	}

	// samples an aperture shape with the given number of sides. 0 means circle
	vec2 sampleAperture( int blades, vec3 uvw ) {

		return blades == 0 ?
			sampleCircle( uvw.xy ) :
			sampleRegularPolygon( blades, uvw );

	}


`,Lo=`

	bool totalInternalReflection( float cosTheta, float eta ) {

		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		return eta * sinTheta > 1.0;

	}

	// https://google.github.io/filament/Filament.md.html#materialsystem/diffusebrdf
	float schlickFresnel( float cosine, float f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0 ) {

		return f0 + ( 1.0 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	vec3 schlickFresnel( float cosine, vec3 f0, vec3 f90 ) {

		return f0 + ( f90 - f0 ) * pow( 1.0 - cosine, 5.0 );

	}

	float dielectricFresnel( float cosThetaI, float eta ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float ni = eta;
		float nt = 1.0;

		// Check for total internal reflection
		float sinThetaISq = 1.0f - cosThetaI * cosThetaI;
		float sinThetaTSq = eta * eta * sinThetaISq;
		if( sinThetaTSq >= 1.0 ) {

			return 1.0;

		}

		float sinThetaT = sqrt( sinThetaTSq );

		float cosThetaT = sqrt( max( 0.0, 1.0f - sinThetaT * sinThetaT ) );
		float rParallel = ( ( nt * cosThetaI ) - ( ni * cosThetaT ) ) / ( ( nt * cosThetaI ) + ( ni * cosThetaT ) );
		float rPerpendicular = ( ( ni * cosThetaI ) - ( nt * cosThetaT ) ) / ( ( ni * cosThetaI ) + ( nt * cosThetaT ) );
		return ( rParallel * rParallel + rPerpendicular * rPerpendicular ) / 2.0;

	}

	// https://raytracing.github.io/books/RayTracingInOneWeekend.html#dielectrics/schlickapproximation
	float iorRatioToF0( float eta ) {

		return pow( ( 1.0 - eta ) / ( 1.0 + eta ), 2.0 );

	}

	vec3 evaluateFresnel( float cosTheta, float eta, vec3 f0, vec3 f90 ) {

		if ( totalInternalReflection( cosTheta, eta ) ) {

			return f90;

		}

		return schlickFresnel( cosTheta, f0, f90 );

	}

	// TODO: disney fresnel was removed and replaced with this fresnel function to better align with
	// the glTF but is causing blown out pixels. Should be revisited
	// float evaluateFresnelWeight( float cosTheta, float eta, float f0 ) {

	// 	if ( totalInternalReflection( cosTheta, eta ) ) {

	// 		return 1.0;

	// 	}

	// 	return schlickFresnel( cosTheta, f0 );

	// }

	// https://schuttejoe.github.io/post/disneybsdf/
	float disneyFresnel( vec3 wo, vec3 wi, vec3 wh, float f0, float eta, float metalness ) {

		float dotHV = dot( wo, wh );
		if ( totalInternalReflection( dotHV, eta ) ) {

			return 1.0;

		}

		float dotHL = dot( wi, wh );
		float dielectricFresnel = dielectricFresnel( abs( dotHV ), eta );
		float metallicFresnel = schlickFresnel( dotHL, f0 );

		return mix( dielectricFresnel, metallicFresnel, metalness );

	}

`,Ro=`

	// Fast arccos approximation used to remove banding artifacts caused by numerical errors in acos.
	// This is a cubic Lagrange interpolating polynomial for x = [-1, -1/2, 0, 1/2, 1].
	// For more information see: https://github.com/gkjohnson/three-gpu-pathtracer/pull/171#issuecomment-1152275248
	float acosApprox( float x ) {

		x = clamp( x, -1.0, 1.0 );
		return ( - 0.69813170079773212 * x * x - 0.87266462599716477 ) * x + 1.5707963267948966;

	}

	// An acos with input values bound to the range [-1, 1].
	float acosSafe( float x ) {

		return acos( clamp( x, -1.0, 1.0 ) );

	}

	float saturateCos( float val ) {

		return clamp( val, 0.001, 1.0 );

	}

	float square( float t ) {

		return t * t;

	}

	vec2 square( vec2 t ) {

		return t * t;

	}

	vec3 square( vec3 t ) {

		return t * t;

	}

	vec4 square( vec4 t ) {

		return t * t;

	}

	vec2 rotateVector( vec2 v, float t ) {

		float ac = cos( t );
		float as = sin( t );
		return vec2(
			v.x * ac - v.y * as,
			v.x * as + v.y * ac
		);

	}

	// forms a basis with the normal vector as Z
	mat3 getBasisFromNormal( vec3 normal ) {

		vec3 other;
		if ( abs( normal.x ) > 0.5 ) {

			other = vec3( 0.0, 1.0, 0.0 );

		} else {

			other = vec3( 1.0, 0.0, 0.0 );

		}

		vec3 ortho = normalize( cross( normal, other ) );
		vec3 ortho2 = normalize( cross( normal, ortho ) );
		return mat3( ortho2, ortho, normal );

	}

`,zo=`

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the rectangle on that same plane.
	// Plane intersection: https://lousodrome.net/blog/light/2020/07/03/intersection-of-a-ray-and-a-plane/
	bool intersectsRectangle( vec3 center, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( center - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 p = rayOrigin + rayDirection * t;
			vec3 vi = p - center;

			// check if p falls inside the rectangle
			float a1 = dot( u, vi );
			if ( abs( a1 ) <= 0.5 ) {

				float a2 = dot( v, vi );
				if ( abs( a2 ) <= 0.5 ) {

					dist = t;
					return true;

				}

			}

		}

		return false;

	}

	// Finds the point where the ray intersects the plane defined by u and v and checks if this point
	// falls in the bounds of the circle on that same plane. See above URL for a description of the plane intersection algorithm.
	bool intersectsCircle( vec3 position, vec3 normal, vec3 u, vec3 v, vec3 rayOrigin, vec3 rayDirection, inout float dist ) {

		float t = dot( position - rayOrigin, normal ) / dot( rayDirection, normal );

		if ( t > EPSILON ) {

			vec3 hit = rayOrigin + rayDirection * t;
			vec3 vi = hit - position;

			float a1 = dot( u, vi );
			float a2 = dot( v, vi );

			if( length( vec2( a1, a2 ) ) <= 0.5 ) {

				dist = t;
				return true;

			}

		}

		return false;

	}

`,Bo=`

	// add texel fetch functions for texture arrays
	vec4 texelFetch1D( sampler2DArray tex, int layer, uint index ) {

		uint width = uint( textureSize( tex, 0 ).x );
		uvec2 uv;
		uv.x = index % width;
		uv.y = index / width;

		return texelFetch( tex, ivec3( uv, layer ), 0 );

	}

	vec4 textureSampleBarycoord( sampler2DArray tex, int layer, vec3 barycoord, uvec3 faceIndices ) {

		return
			barycoord.x * texelFetch1D( tex, layer, faceIndices.x ) +
			barycoord.y * texelFetch1D( tex, layer, faceIndices.y ) +
			barycoord.z * texelFetch1D( tex, layer, faceIndices.z );

	}

`,Vo=`

	// TODO: possibly this should be renamed something related to material or path tracing logic

	#ifndef RAY_OFFSET
	#define RAY_OFFSET 1e-4
	#endif

	// adjust the hit point by the surface normal by a factor of some offset and the
	// maximum component-wise value of the current point to accommodate floating point
	// error as values increase.
	vec3 stepRayOrigin( vec3 rayOrigin, vec3 rayDirection, vec3 offset, float dist ) {

		vec3 point = rayOrigin + rayDirection * dist;
		vec3 absPoint = abs( point );
		float maxPoint = max( absPoint.x, max( absPoint.y, absPoint.z ) );
		return point + offset * ( maxPoint + 1.0 ) * RAY_OFFSET;

	}

	// https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_volume/README.md#attenuation
	vec3 transmissionAttenuation( float dist, vec3 attColor, float attDist ) {

		vec3 ot = - log( attColor ) / attDist;
		return exp( - ot * dist );

	}

	vec3 getHalfVector( vec3 wi, vec3 wo, float eta ) {

		// get the half vector - assuming if the light incident vector is on the other side
		// of the that it's transmissive.
		vec3 h;
		if ( wi.z > 0.0 ) {

			h = normalize( wi + wo );

		} else {

			// Scale by the ior ratio to retrieve the appropriate half vector
			// From Section 2.2 on computing the transmission half vector:
			// https://blog.selfshadow.com/publications/s2015-shading-course/burley/s2015_pbs_disney_bsdf_notes.pdf
			h = normalize( wi + wo * eta );

		}

		h *= sign( h.z );
		return h;

	}

	vec3 getHalfVector( vec3 a, vec3 b ) {

		return normalize( a + b );

	}

	// The discrepancy between interpolated surface normal and geometry normal can cause issues when a ray
	// is cast that is on the top side of the geometry normal plane but below the surface normal plane. If
	// we find a ray like that we ignore it to avoid artifacts.
	// This function returns if the direction is on the same side of both planes.
	bool isDirectionValid( vec3 direction, vec3 surfaceNormal, vec3 geometryNormal ) {

		bool aboveSurfaceNormal = dot( direction, surfaceNormal ) > 0.0;
		bool aboveGeometryNormal = dot( direction, geometryNormal ) > 0.0;
		return aboveSurfaceNormal == aboveGeometryNormal;

	}

	// ray sampling x and z are swapped to align with expected background view
	vec2 equirectDirectionToUv( vec3 direction ) {

		// from Spherical.setFromCartesianCoords
		vec2 uv = vec2( atan( direction.z, direction.x ), acos( direction.y ) );
		uv /= vec2( 2.0 * PI, PI );

		// apply adjustments to get values in range [0, 1] and y right side up
		uv.x += 0.5;
		uv.y = 1.0 - uv.y;
		return uv;

	}

	vec3 equirectUvToDirection( vec2 uv ) {

		// undo above adjustments
		uv.x -= 0.5;
		uv.y = 1.0 - uv.y;

		// from Vector3.setFromSphericalCoords
		float theta = uv.x * 2.0 * PI;
		float phi = uv.y * PI;

		float sinPhi = sin( phi );

		return vec3( sinPhi * cos( theta ), cos( phi ), sinPhi * sin( theta ) );

	}

	// power heuristic for multiple importance sampling
	float misHeuristic( float a, float b ) {

		float aa = a * a;
		float bb = b * b;
		return aa / ( aa + bb );

	}

	// tentFilter from Peter Shirley's 'Realistic Ray Tracing (2nd Edition)' book, pg. 60
	// erichlof/THREE.js-PathTracing-Renderer/
	float tentFilter( float x ) {

		return x < 0.5 ? sqrt( 2.0 * x ) - 1.0 : 1.0 - sqrt( 2.0 - ( 2.0 * x ) );

	}
`,Ho=`

	// https://www.shadertoy.com/view/wltcRS
	uvec4 WHITE_NOISE_SEED;

	void rng_initialize( vec2 p, int frame ) {

		// white noise seed
		WHITE_NOISE_SEED = uvec4( p, uint( frame ), uint( p.x ) + uint( p.y ) );

	}

	// https://www.pcg-random.org/
	void pcg4d( inout uvec4 v ) {

		v = v * 1664525u + 1013904223u;
		v.x += v.y * v.w;
		v.y += v.z * v.x;
		v.z += v.x * v.y;
		v.w += v.y * v.z;
		v = v ^ ( v >> 16u );
		v.x += v.y*v.w;
		v.y += v.z*v.x;
		v.z += v.x*v.y;
		v.w += v.y*v.z;

	}

	// returns [ 0, 1 ]
	float pcgRand() {

		pcg4d( WHITE_NOISE_SEED );
		return float( WHITE_NOISE_SEED.x ) / float( 0xffffffffu );

	}

	vec2 pcgRand2() {

		pcg4d( WHITE_NOISE_SEED );
		return vec2( WHITE_NOISE_SEED.xy ) / float(0xffffffffu);

	}

	vec3 pcgRand3() {

		pcg4d( WHITE_NOISE_SEED );
		return vec3( WHITE_NOISE_SEED.xyz ) / float( 0xffffffffu );

	}

	vec4 pcgRand4() {

		pcg4d( WHITE_NOISE_SEED );
		return vec4( WHITE_NOISE_SEED ) / float( 0xffffffffu );

	}
`,Uo=`

	uniform sampler2D stratifiedTexture;
	uniform sampler2D stratifiedOffsetTexture;

	uint sobolPixelIndex = 0u;
	uint sobolPathIndex = 0u;
	uint sobolBounceIndex = 0u;
	vec4 pixelSeed = vec4( 0 );

	vec4 rand4( int v ) {

		ivec2 uv = ivec2( v, sobolBounceIndex );
		vec4 stratifiedSample = texelFetch( stratifiedTexture, uv, 0 );
		return fract( stratifiedSample + pixelSeed.r ); // blue noise + stratified samples

	}

	vec3 rand3( int v ) {

		return rand4( v ).xyz;

	}

	vec2 rand2( int v ) {

		return rand4( v ).xy;

	}

	float rand( int v ) {

		return rand4( v ).x;

	}

	void rng_initialize( vec2 screenCoord, int frame ) {

		// tile the small noise texture across the entire screen
		ivec2 noiseSize = ivec2( textureSize( stratifiedOffsetTexture, 0 ) );
		ivec2 pixel = ivec2( screenCoord.xy ) % noiseSize;
		vec2 pixelWidth = 1.0 / vec2( noiseSize );
		vec2 uv = vec2( pixel ) * pixelWidth + pixelWidth * 0.5;

		// note that using "texelFetch" here seems to break Android for some reason
		pixelSeed = texture( stratifiedOffsetTexture, uv );

	}

`,Wo=`

	// diffuse
	float diffuseEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// https://schuttejoe.github.io/post/disneybsdf/
		float fl = schlickFresnel( wi.z, 0.0 );
		float fv = schlickFresnel( wo.z, 0.0 );

		float metalFactor = ( 1.0 - surf.metalness );
		float transFactor = ( 1.0 - surf.transmission );
		float rr = 0.5 + 2.0 * surf.roughness * fl * fl;
		float retro = rr * ( fl + fv + fl * fv * ( rr - 1.0f ) );
		float lambert = ( 1.0f - 0.5f * fl ) * ( 1.0f - 0.5f * fv );

		// TODO: subsurface approx?

		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		color = ( 1.0 - F ) * transFactor * metalFactor * wi.z * surf.color * ( retro + lambert ) / PI;

		return wi.z / PI;

	}

	vec3 diffuseDirection( vec3 wo, SurfaceRecord surf ) {

		vec3 lightDirection = sampleSphere( rand2( 11 ) );
		lightDirection.z += 1.0;
		lightDirection = normalize( lightDirection );

		return lightDirection;

	}

	// specular
	float specularEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// if roughness is set to 0 then D === NaN which results in black pixels
		float metalness = surf.metalness;
		float roughness = surf.filteredRoughness;

		float eta = surf.eta;
		float f0 = surf.f0;

		vec3 f0Color = mix( f0 * surf.specularColor * surf.specularIntensity, surf.color, surf.metalness );
		vec3 f90Color = vec3( mix( surf.specularIntensity, 1.0, surf.metalness ) );
		vec3 F = evaluateFresnel( dot( wo, wh ), eta, f0Color, f90Color );

		vec3 iridescenceF = evalIridescence( 1.0, surf.iridescenceIor, dot( wi, wh ), surf.iridescenceThickness, f0Color );
		F = mix( F, iridescenceF,  surf.iridescence );

		// PDF
		// See 14.1.1 Microfacet BxDFs in https://www.pbr-book.org/
		float incidentTheta = acos( wo.z );
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );
		float ggxPdf = D * G1 * max( 0.0, abs( dot( wo, wh ) ) ) / abs ( wo.z );

		color = wi.z * F * G * D / ( 4.0 * abs( wi.z * wo.z ) );
		return ggxPdf / ( 4.0 * dot( wo, wh ) );

	}

	vec3 specularDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 12 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}


	// transmission
	/*
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		// See section 4.2 in https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;
		bool thinFilm = surf.thinFilm;

		color = surf.transmission * surf.color;

		float denom = pow( eta * dot( wi, wh ) + dot( wo, wh ), 2.0 );
		return ggxPDF( wo, wh, filteredRoughness ) / denom;

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float filteredRoughness = surf.filteredRoughness;
		float eta = surf.eta;
		bool frontFace = surf.frontFace;

		// sample ggx vndf distribution which gives a new normal
		vec3 halfVector = ggxDirection(
			wo,
			vec2( filteredRoughness ),
			rand2( 13 )
		);

		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );
		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}

		return normalize( lightDirection );

	}
	*/

	// TODO: This is just using a basic cosine-weighted specular distribution with an
	// incorrect PDF value at the moment. Update it to correctly use a GGX distribution
	float transmissionEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		color = surf.transmission * surf.color;

		// PDF
		// float F = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		// float F = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );
		// if ( F >= 1.0 ) {

		// 	return 0.0;

		// }

		// return 1.0 / ( 1.0 - F );

		// reverted to previous to transmission. The above was causing black pixels
		float eta = surf.eta;
		float f0 = surf.f0;
		float cosTheta = min( wo.z, 1.0 );
		float sinTheta = sqrt( 1.0 - cosTheta * cosTheta );
		float reflectance = schlickFresnel( cosTheta, f0 );
		bool cannotRefract = eta * sinTheta > 1.0;
		if ( cannotRefract ) {

			return 0.0;

		}

		return 1.0 / ( 1.0 - reflectance );

	}

	vec3 transmissionDirection( vec3 wo, SurfaceRecord surf ) {

		float roughness = surf.filteredRoughness;
		float eta = surf.eta;
		vec3 halfVector = normalize( vec3( 0.0, 0.0, 1.0 ) + sampleSphere( rand2( 13 ) ) * roughness );
		vec3 lightDirection = refract( normalize( - wo ), halfVector, eta );

		if ( surf.thinFilm ) {

			lightDirection = - refract( normalize( - lightDirection ), - vec3( 0.0, 0.0, 1.0 ), 1.0 / eta );

		}
		return normalize( lightDirection );

	}

	// clearcoat
	float clearcoatEval( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf, inout vec3 color ) {

		float ior = 1.5;
		float f0 = iorRatioToF0( ior );
		bool frontFace = surf.frontFace;
		float roughness = surf.filteredClearcoatRoughness;

		float eta = frontFace ? 1.0 / ior : ior;
		float G = ggxShadowMaskG2( wi, wo, roughness );
		float D = ggxDistribution( wh, roughness );
		float F = schlickFresnel( dot( wi, wh ), f0 );

		float fClearcoat = F * D * G / ( 4.0 * abs( wi.z * wo.z ) );
		color = color * ( 1.0 - surf.clearcoat * F ) + fClearcoat * surf.clearcoat * wi.z;

		// PDF
		// See equation (27) in http://jcgt.org/published/0003/02/03/
		return ggxPDF( wo, wh, roughness ) / ( 4.0 * dot( wi, wh ) );

	}

	vec3 clearcoatDirection( vec3 wo, SurfaceRecord surf ) {

		// sample ggx vndf distribution which gives a new normal
		float roughness = surf.filteredClearcoatRoughness;
		vec3 halfVector = ggxDirection(
			wo,
			vec2( roughness ),
			rand2( 14 )
		);

		// apply to new ray by reflecting off the new normal
		return - reflect( wo, halfVector );

	}

	// sheen
	vec3 sheenColor( vec3 wo, vec3 wi, vec3 wh, SurfaceRecord surf ) {

		float cosThetaO = saturateCos( wo.z );
		float cosThetaI = saturateCos( wi.z );
		float cosThetaH = wh.z;

		float D = velvetD( cosThetaH, surf.sheenRoughness );
		float G = velvetG( cosThetaO, cosThetaI, surf.sheenRoughness );

		// See equation (1) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
		vec3 color = surf.sheenColor;
		color *= D * G / ( 4.0 * abs( cosThetaO * cosThetaI ) );

		return color;

	}

	// bsdf
	void getLobeWeights(
		vec3 wo, vec3 wi, vec3 wh, vec3 clearcoatWo, SurfaceRecord surf,
		inout float diffuseWeight, inout float specularWeight, inout float transmissionWeight, inout float clearcoatWeight
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;
		// float fEstimate = evaluateFresnelWeight( dot( wo, wh ), surf.eta, surf.f0 );
		float fEstimate = disneyFresnel( wo, wi, wh, surf.f0, surf.eta, surf.metalness );

		float transSpecularProb = mix( max( 0.25, fEstimate ), 1.0, metalness );
		float diffSpecularProb = 0.5 + 0.5 * metalness;

		diffuseWeight = ( 1.0 - transmission ) * ( 1.0 - diffSpecularProb );
		specularWeight = transmission * transSpecularProb + ( 1.0 - transmission ) * diffSpecularProb;
		transmissionWeight = transmission * ( 1.0 - transSpecularProb );
		clearcoatWeight = surf.clearcoat * schlickFresnel( clearcoatWo.z, 0.04 );

		float totalWeight = diffuseWeight + specularWeight + transmissionWeight + clearcoatWeight;
		diffuseWeight /= totalWeight;
		specularWeight /= totalWeight;
		transmissionWeight /= totalWeight;
		clearcoatWeight /= totalWeight;
	}

	float bsdfEval(
		vec3 wo, vec3 clearcoatWo, vec3 wi, vec3 clearcoatWi, SurfaceRecord surf,
		float diffuseWeight, float specularWeight, float transmissionWeight, float clearcoatWeight, inout float specularPdf, inout vec3 color
	) {

		float metalness = surf.metalness;
		float transmission = surf.transmission;

		float spdf = 0.0;
		float dpdf = 0.0;
		float tpdf = 0.0;
		float cpdf = 0.0;
		color = vec3( 0.0 );

		vec3 halfVector = getHalfVector( wi, wo, surf.eta );

		// diffuse
		if ( diffuseWeight > 0.0 && wi.z > 0.0 ) {

			dpdf = diffuseEval( wo, wi, halfVector, surf, color );
			color *= 1.0 - surf.transmission;

		}

		// ggx specular
		if ( specularWeight > 0.0 && wi.z > 0.0 ) {

			vec3 outColor;
			spdf = specularEval( wo, wi, getHalfVector( wi, wo ), surf, outColor );
			color += outColor;

		}

		// transmission
		if ( transmissionWeight > 0.0 && wi.z < 0.0 ) {

			tpdf = transmissionEval( wo, wi, halfVector, surf, color );

		}

		// sheen
		color *= mix( 1.0, sheenAlbedoScaling( wo, wi, surf ), surf.sheen );
		color += sheenColor( wo, wi, halfVector, surf ) * surf.sheen;

		// clearcoat
		if ( clearcoatWi.z >= 0.0 && clearcoatWeight > 0.0 ) {

			vec3 clearcoatHalfVector = getHalfVector( clearcoatWo, clearcoatWi );
			cpdf = clearcoatEval( clearcoatWo, clearcoatWi, clearcoatHalfVector, surf, color );

		}

		float pdf =
			dpdf * diffuseWeight
			+ spdf * specularWeight
			+ tpdf * transmissionWeight
			+ cpdf * clearcoatWeight;

		// retrieve specular rays for the shadows flag
		specularPdf = spdf * specularWeight + cpdf * clearcoatWeight;

		return pdf;

	}

	float bsdfResult( vec3 worldWo, vec3 worldWi, SurfaceRecord surf, inout vec3 color ) {

		if ( surf.volumeParticle ) {

			color = surf.color / ( 4.0 * PI );
			return 1.0 / ( 4.0 * PI );

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 wi = normalize( surf.normalInvBasis * worldWi );

		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		vec3 clearcoatWi = normalize( surf.clearcoatInvBasis * worldWi );

		vec3 wh = getHalfVector( wo, wi, surf.eta );
		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		getLobeWeights( wo, wi, wh, clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float specularPdf;
		return bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, specularPdf, color );

	}

	ScatterRecord bsdfSample( vec3 worldWo, SurfaceRecord surf ) {

		if ( surf.volumeParticle ) {

			ScatterRecord sampleRec;
			sampleRec.specularPdf = 0.0;
			sampleRec.pdf = 1.0 / ( 4.0 * PI );
			sampleRec.direction = sampleSphere( rand2( 16 ) );
			sampleRec.color = surf.color / ( 4.0 * PI );
			return sampleRec;

		}

		vec3 wo = normalize( surf.normalInvBasis * worldWo );
		vec3 clearcoatWo = normalize( surf.clearcoatInvBasis * worldWo );
		mat3 normalBasis = surf.normalBasis;
		mat3 invBasis = surf.normalInvBasis;
		mat3 clearcoatNormalBasis = surf.clearcoatBasis;
		mat3 clearcoatInvBasis = surf.clearcoatInvBasis;

		float diffuseWeight;
		float specularWeight;
		float transmissionWeight;
		float clearcoatWeight;
		// using normal and basically-reflected ray since we don't have proper half vector here
		getLobeWeights( wo, wo, vec3( 0, 0, 1 ), clearcoatWo, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight );

		float pdf[4];
		pdf[0] = diffuseWeight;
		pdf[1] = specularWeight;
		pdf[2] = transmissionWeight;
		pdf[3] = clearcoatWeight;

		float cdf[4];
		cdf[0] = pdf[0];
		cdf[1] = pdf[1] + cdf[0];
		cdf[2] = pdf[2] + cdf[1];
		cdf[3] = pdf[3] + cdf[2];

		if( cdf[3] != 0.0 ) {

			float invMaxCdf = 1.0 / cdf[3];
			cdf[0] *= invMaxCdf;
			cdf[1] *= invMaxCdf;
			cdf[2] *= invMaxCdf;
			cdf[3] *= invMaxCdf;

		} else {

			cdf[0] = 1.0;
			cdf[1] = 0.0;
			cdf[2] = 0.0;
			cdf[3] = 0.0;

		}

		vec3 wi;
		vec3 clearcoatWi;

		float r = rand( 15 );
		if ( r <= cdf[0] ) { // diffuse

			wi = diffuseDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[1] ) { // specular

			wi = specularDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[2] ) { // transmission / refraction

			wi = transmissionDirection( wo, surf );
			clearcoatWi = normalize( clearcoatInvBasis * normalize( normalBasis * wi ) );

		} else if ( r <= cdf[3] ) { // clearcoat

			clearcoatWi = clearcoatDirection( clearcoatWo, surf );
			wi = normalize( invBasis * normalize( clearcoatNormalBasis * clearcoatWi ) );

		}

		ScatterRecord result;
		result.pdf = bsdfEval( wo, clearcoatWo, wi, clearcoatWi, surf, diffuseWeight, specularWeight, transmissionWeight, clearcoatWeight, result.specularPdf, result.color );
		result.direction = normalize( surf.normalBasis * wi );

		return result;

	}

`,Go=`

	// returns the hit distance given the material density
	float intersectFogVolume( Material material, float u ) {

		// https://raytracing.github.io/books/RayTracingTheNextWeek.html#volumes/constantdensitymediums
		return material.opacity == 0.0 ? INFINITY : ( - 1.0 / material.opacity ) * log( u );

	}

	ScatterRecord sampleFogVolume( SurfaceRecord surf, vec2 uv ) {

		ScatterRecord sampleRec;
		sampleRec.specularPdf = 0.0;
		sampleRec.pdf = 1.0 / ( 2.0 * PI );
		sampleRec.direction = sampleSphere( uv );
		sampleRec.color = surf.color;
		return sampleRec;

	}

`,Ko=`

	// The GGX functions provide sampling and distribution information for normals as output so
	// in order to get probability of scatter direction the half vector must be computed and provided.
	// [0] https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.pdf
	// [1] https://hal.archives-ouvertes.fr/hal-01509746/document
	// [2] http://jcgt.org/published/0007/04/01/
	// [4] http://jcgt.org/published/0003/02/03/

	// trowbridge-reitz === GGX === GTR

	vec3 ggxDirection( vec3 incidentDir, vec2 roughness, vec2 uv ) {

		// TODO: try GGXVNDF implementation from reference [2], here. Needs to update ggxDistribution
		// function below, as well

		// Implementation from reference [1]
		// stretch view
		vec3 V = normalize( vec3( roughness * incidentDir.xy, incidentDir.z ) );

		// orthonormal basis
		vec3 T1 = ( V.z < 0.9999 ) ? normalize( cross( V, vec3( 0.0, 0.0, 1.0 ) ) ) : vec3( 1.0, 0.0, 0.0 );
		vec3 T2 = cross( T1, V );

		// sample point with polar coordinates (r, phi)
		float a = 1.0 / ( 1.0 + V.z );
		float r = sqrt( uv.x );
		float phi = ( uv.y < a ) ? uv.y / a * PI : PI + ( uv.y - a ) / ( 1.0 - a ) * PI;
		float P1 = r * cos( phi );
		float P2 = r * sin( phi ) * ( ( uv.y < a ) ? 1.0 : V.z );

		// compute normal
		vec3 N = P1 * T1 + P2 * T2 + V * sqrt( max( 0.0, 1.0 - P1 * P1 - P2 * P2 ) );

		// unstretch
		N = normalize( vec3( roughness * N.xy, max( 0.0, N.z ) ) );

		return N;

	}

	// Below are PDF and related functions for use in a Monte Carlo path tracer
	// as specified in Appendix B of the following paper
	// See equation (34) from reference [0]
	float ggxLamda( float theta, float roughness ) {

		float tanTheta = tan( theta );
		float tanTheta2 = tanTheta * tanTheta;
		float alpha2 = roughness * roughness;

		float numerator = - 1.0 + sqrt( 1.0 + alpha2 * tanTheta2 );
		return numerator / 2.0;

	}

	// See equation (34) from reference [0]
	float ggxShadowMaskG1( float theta, float roughness ) {

		return 1.0 / ( 1.0 + ggxLamda( theta, roughness ) );

	}

	// See equation (125) from reference [4]
	float ggxShadowMaskG2( vec3 wi, vec3 wo, float roughness ) {

		float incidentTheta = acos( wi.z );
		float scatterTheta = acos( wo.z );
		return 1.0 / ( 1.0 + ggxLamda( incidentTheta, roughness ) + ggxLamda( scatterTheta, roughness ) );

	}

	// See equation (33) from reference [0]
	float ggxDistribution( vec3 halfVector, float roughness ) {

		float a2 = roughness * roughness;
		a2 = max( EPSILON, a2 );
		float cosTheta = halfVector.z;
		float cosTheta4 = pow( cosTheta, 4.0 );

		if ( cosTheta == 0.0 ) return 0.0;

		float theta = acosSafe( halfVector.z );
		float tanTheta = tan( theta );
		float tanTheta2 = pow( tanTheta, 2.0 );

		float denom = PI * cosTheta4 * pow( a2 + tanTheta2, 2.0 );
		return ( a2 / denom );

	}

	// See equation (3) from reference [2]
	float ggxPDF( vec3 wi, vec3 halfVector, float roughness ) {

		float incidentTheta = acos( wi.z );
		float D = ggxDistribution( halfVector, roughness );
		float G1 = ggxShadowMaskG1( incidentTheta, roughness );

		return D * G1 * max( 0.0, dot( wi, halfVector ) ) / wi.z;

	}

`,qo=`

	// XYZ to sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	vec3 fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 iorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float iorToFresnel0( float transmittedIor, float incidentIor ) {

		return square( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ) );

	}

	// Fresnel equations for dielectric/dielectric interfaces. See https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;

		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - square( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * square( phase ) );
		xyz /= 1.0685e-7;

		vec3 srgb = XYZ_TO_REC709 * xyz;
		return srgb;

	}

	// See Section 4. Analytic Spectral Integration, A Practical Extension to Microfacet Theory for the Modeling of Varying Iridescence, https://hal.archives-ouvertes.fr/hal-01518344/document
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIor -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIor = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );

		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = square( outsideIOR / iridescenceIor ) * ( 1.0 - square( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = iorToFresnel0( iridescenceIor, outsideIOR );
		float R12 = schlickFresnel( cosTheta1, R0 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIor < outsideIOR ) {

			phi12 = PI;

		}

		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = iorToFresnel0( baseIOR, iridescenceIor );
		vec3 R23 = schlickFresnel( cosTheta2, R1 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[0] < iridescenceIor ) {

			phi23[ 0 ] = PI;

		}

		if ( baseIOR[1] < iridescenceIor ) {

			phi23[ 1 ] = PI;

		}

		if ( baseIOR[2] < iridescenceIor ) {

			phi23[ 2 ] = PI;

		}

		// Phase shift
		float OPD = 2.0 * iridescenceIor * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = square( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

`,Jo=`

	// See equation (2) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetD( float cosThetaH, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		float invAlpha = 1.0 / alpha;

		float sqrCosThetaH = cosThetaH * cosThetaH;
		float sinThetaH = max( 1.0 - sqrCosThetaH, 0.001 );

		return ( 2.0 + invAlpha ) * pow( sinThetaH, 0.5 * invAlpha ) / ( 2.0 * PI );

	}

	float velvetParamsInterpolate( int i, float oneMinusAlphaSquared ) {

		const float p0[5] = float[5]( 25.3245, 3.32435, 0.16801, -1.27393, -4.85967 );
		const float p1[5] = float[5]( 21.5473, 3.82987, 0.19823, -1.97760, -4.32054 );

		return mix( p1[i], p0[i], oneMinusAlphaSquared );

	}

	float velvetL( float x, float alpha ) {

		float oneMinusAlpha = 1.0 - alpha;
		float oneMinusAlphaSquared = oneMinusAlpha * oneMinusAlpha;

		float a = velvetParamsInterpolate( 0, oneMinusAlphaSquared );
		float b = velvetParamsInterpolate( 1, oneMinusAlphaSquared );
		float c = velvetParamsInterpolate( 2, oneMinusAlphaSquared );
		float d = velvetParamsInterpolate( 3, oneMinusAlphaSquared );
		float e = velvetParamsInterpolate( 4, oneMinusAlphaSquared );

		return a / ( 1.0 + b * pow( abs( x ), c ) ) + d * x + e;

	}

	// See equation (3) in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetLambda( float cosTheta, float alpha ) {

		return abs( cosTheta ) < 0.5 ? exp( velvetL( cosTheta, alpha ) ) : exp( 2.0 * velvetL( 0.5, alpha ) - velvetL( 1.0 - cosTheta, alpha ) );

	}

	// See Section 3, Shadowing Term, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float velvetG( float cosThetaO, float cosThetaI, float roughness ) {

		float alpha = max( roughness, 0.07 );
		alpha = alpha * alpha;

		return 1.0 / ( 1.0 + velvetLambda( cosThetaO, alpha ) + velvetLambda( cosThetaI, alpha ) );

	}

	float directionalAlbedoSheen( float cosTheta, float alpha ) {

		cosTheta = saturate( cosTheta );

		float c = 1.0 - cosTheta;
		float c3 = c * c * c;

		return 0.65584461 * c3 + 1.0 / ( 4.16526551 + exp( -7.97291361 * sqrt( alpha ) + 6.33516894 ) );

	}

	float sheenAlbedoScaling( vec3 wo, vec3 wi, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );
		float eWi = directionalAlbedoSheen( saturateCos( wi.z ), alpha );

		return min( 1.0 - maxSheenColor * eWo, 1.0 - maxSheenColor * eWi );

	}

	// See Section 5, Layering, in http://www.aconty.com/pdf/s2017_pbs_imageworks_sheen.pdf
	float sheenAlbedoScaling( vec3 wo, SurfaceRecord surf ) {

		float alpha = max( surf.sheenRoughness, 0.07 );
		alpha = alpha * alpha;

		float maxSheenColor = max( max( surf.sheenColor.r, surf.sheenColor.g ), surf.sheenColor.b );

		float eWo = directionalAlbedoSheen( saturateCos( wo.z ), alpha );

		return 1.0 - maxSheenColor * eWo;

	}

`,Yo=`

#ifndef FOG_CHECK_ITERATIONS
#define FOG_CHECK_ITERATIONS 30
#endif

// returns whether the given material is a fog material or not
bool isMaterialFogVolume( sampler2D materials, uint materialIndex ) {

	uint i = materialIndex * uint( MATERIAL_PIXELS );
	vec4 s14 = texelFetch1D( materials, i + 14u );
	return bool( int( s14.b ) & 4 );

}

// returns true if we're within the first fog volume we hit
bool bvhIntersectFogVolumeHit(
	vec3 rayOrigin, vec3 rayDirection,
	usampler2D materialIndexAttribute, sampler2D materials,
	inout Material material
) {

	material.fogVolume = false;

	for ( int i = 0; i < FOG_CHECK_ITERATIONS; i ++ ) {

		// find nearest hit
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bool hit = bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		if ( hit ) {

			// if it's a fog volume return whether we hit the front or back face
			uint materialIndex = uTexelFetch1D( materialIndexAttribute, faceIndices.x ).r;
			if ( isMaterialFogVolume( materials, materialIndex ) ) {

				material = readMaterialInfo( materials, materialIndex );
				return side == - 1.0;

			} else {

				// move the ray forward
				rayOrigin = stepRayOrigin( rayOrigin, rayDirection, - faceNormal, dist );

			}

		} else {

			return false;

		}

	}

	return false;

}

`,Xo=`

	// step through multiple surface hits and accumulate color attenuation based on transmissive surfaces
	// returns true if a solid surface was hit
	bool attenuateHit(
		RenderState state,
		Ray ray, float rayDist,
		out vec3 color
	) {

		// store the original bounce index so we can reset it after
		uint originalBounceIndex = sobolBounceIndex;

		int traversals = state.traversals;
		int transmissiveTraversals = state.transmissiveTraversals;
		bool isShadowRay = state.isShadowRay;
		Material fogMaterial = state.fogMaterial;

		vec3 startPoint = ray.origin;

		// hit results
		SurfaceHit surfaceHit;

		color = vec3( 1.0 );

		bool result = true;
		for ( int i = 0; i < traversals; i ++ ) {

			sobolBounceIndex ++;

			int hitType = traceScene( ray, fogMaterial, surfaceHit );

			if ( hitType == FOG_HIT ) {

				result = true;
				break;

			} else if ( hitType == SURFACE_HIT ) {

				float totalDist = distance( startPoint, ray.origin + ray.direction * surfaceHit.dist );
				if ( totalDist > rayDist ) {

					result = false;
					break;

				}

				// TODO: attenuate the contribution based on the PDF of the resulting ray including refraction values
				// Should be able to work using the material BSDF functions which will take into account specularity, etc.
				// TODO: should we account for emissive surfaces here?

				uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
				Material material = readMaterialInfo( materials, materialIndex );

				// adjust the ray to the new surface
				bool isEntering = surfaceHit.side == 1.0;
				ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

				#if FEATURE_FOG

				if ( material.fogVolume ) {

					fogMaterial = material;
					fogMaterial.fogVolume = surfaceHit.side == 1.0;
					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;
					continue;

				}

				#endif

				if ( ! material.castShadow && isShadowRay ) {

					continue;

				}

				vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
				vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

				// albedo
				vec4 albedo = vec4( material.color, material.opacity );
				if ( material.map != - 1 ) {

					vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
					albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

				}

				if ( material.vertexColors ) {

					albedo *= vertexColor;

				}

				// alphaMap
				if ( material.alphaMap != - 1 ) {

					vec3 uvPrime = material.alphaMapTransform * vec3( uv, 1 );
					albedo.a *= texture2D( textures, vec3( uvPrime.xy, material.alphaMap ) ).x;

				}

				// transmission
				float transmission = material.transmission;
				if ( material.transmissionMap != - 1 ) {

					vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
					transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

				}

				// metalness
				float metalness = material.metalness;
				if ( material.metalnessMap != - 1 ) {

					vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
					metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

				}

				float alphaTest = material.alphaTest;
				bool useAlphaTest = alphaTest != 0.0;
				float transmissionFactor = ( 1.0 - metalness ) * transmission;
				if (
					transmissionFactor < rand( 9 ) && ! (
						// material sidedness
						material.side != 0.0 && surfaceHit.side == material.side

						// alpha test
						|| useAlphaTest && albedo.a < alphaTest

						// opacity
						|| material.transparent && ! useAlphaTest && albedo.a < rand( 10 )
					)
				) {

					result = true;
					break;

				}

				if ( surfaceHit.side == 1.0 && isEntering ) {

					// only attenuate by surface color on the way in
					color *= mix( vec3( 1.0 ), albedo.rgb, transmissionFactor );

				} else if ( surfaceHit.side == - 1.0 ) {

					// attenuate by medium once we hit the opposite side of the model
					color *= transmissionAttenuation( surfaceHit.dist, material.attenuationColor, material.attenuationDistance );

				}

				bool isTransmissiveRay = dot( ray.direction, surfaceHit.faceNormal * surfaceHit.side ) < 0.0;
				if ( ( isTransmissiveRay || isEntering ) && transmissiveTraversals > 0 ) {

					i -= sign( transmissiveTraversals );
					transmissiveTraversals --;

				}

			} else {

				result = false;
				break;

			}

		}

		// reset the bounce index
		sobolBounceIndex = originalBounceIndex;
		return result;

	}

`,Zo=`

	vec3 ndcToRayOrigin( vec2 coord ) {

		vec4 rayOrigin4 = cameraWorldMatrix * invProjectionMatrix * vec4( coord, - 1.0, 1.0 );
		return rayOrigin4.xyz / rayOrigin4.w;
	}

	Ray getCameraRay() {

		vec2 ssd = vec2( 1.0 ) / resolution;

		// Jitter the camera ray by finding a uv coordinate at a random sample
		// around this pixel's UV coordinate for AA
		vec2 ruv = rand2( 0 );
		vec2 jitteredUv = vUv + vec2( tentFilter( ruv.x ) * ssd.x, tentFilter( ruv.y ) * ssd.y );
		Ray ray;

		#if CAMERA_TYPE == 2

			// Equirectangular projection
			vec4 rayDirection4 = vec4( equirectUvToDirection( jitteredUv ), 0.0 );
			vec4 rayOrigin4 = vec4( 0.0, 0.0, 0.0, 1.0 );

			rayDirection4 = cameraWorldMatrix * rayDirection4;
			rayOrigin4 = cameraWorldMatrix * rayOrigin4;

			ray.direction = normalize( rayDirection4.xyz );
			ray.origin = rayOrigin4.xyz / rayOrigin4.w;

		#else

			// get [- 1, 1] normalized device coordinates
			vec2 ndc = 2.0 * jitteredUv - vec2( 1.0 );
			ray.origin = ndcToRayOrigin( ndc );

			#if CAMERA_TYPE == 1

				// Orthographic projection
				ray.direction = ( cameraWorldMatrix * vec4( 0.0, 0.0, - 1.0, 0.0 ) ).xyz;
				ray.direction = normalize( ray.direction );

			#else

				// Perspective projection
				ray.direction = normalize( mat3( cameraWorldMatrix ) * ( invProjectionMatrix * vec4( ndc, 0.0, 1.0 ) ).xyz );

			#endif

		#endif

		#if FEATURE_DOF
		{

			// depth of field
			vec3 focalPoint = ray.origin + normalize( ray.direction ) * physicalCamera.focusDistance;

			// get the aperture sample
			// if blades === 0 then we assume a circle
			vec3 shapeUVW= rand3( 1 );
			int blades = physicalCamera.apertureBlades;
			float anamorphicRatio = physicalCamera.anamorphicRatio;
			vec2 apertureSample = sampleAperture( blades, shapeUVW );
			apertureSample *= physicalCamera.bokehSize * 0.5 * 1e-3;

			// rotate the aperture shape
			apertureSample =
				rotateVector( apertureSample, physicalCamera.apertureRotation ) *
				saturate( vec2( anamorphicRatio, 1.0 / anamorphicRatio ) );

			// create the new ray
			ray.origin += ( cameraWorldMatrix * vec4( apertureSample, 0.0, 0.0 ) ).xyz;
			ray.direction = focalPoint - ray.origin;

		}
		#endif

		ray.direction = normalize( ray.direction );

		return ray;

	}

`,Qo=`

	vec3 directLightContribution( vec3 worldWo, SurfaceRecord surf, RenderState state, vec3 rayOrigin ) {

		vec3 result = vec3( 0.0 );

		// uniformly pick a light or environment map
		if( lightsDenom != 0.0 && rand( 5 ) < float( lights.count ) / lightsDenom ) {

			// sample a light or environment
			LightRecord lightRec = randomLightSample( lights.tex, iesProfiles, lights.count, rayOrigin, rand3( 6 ) );

			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, lightRec.direction ) < 0.0;
			if ( isSampleBelowSurface ) {

				lightRec.pdf = 0.0;

			}

			// check if a ray could even reach the light area
			Ray lightRay;
			lightRay.origin = rayOrigin;
			lightRay.direction = lightRec.direction;
			vec3 attenuatedColor;
			if (
				lightRec.pdf > 0.0 &&
				isDirectionValid( lightRec.direction, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, lightRay, lightRec.dist, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float lightMaterialPdf = bsdfResult( worldWo, lightRec.direction, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( lightMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					float lightPdf = lightRec.pdf / lightsDenom;
					float misWeight = lightRec.type == SPOT_LIGHT_TYPE || lightRec.type == DIR_LIGHT_TYPE || lightRec.type == POINT_LIGHT_TYPE ? 1.0 : misHeuristic( lightPdf, lightMaterialPdf );
					result = attenuatedColor * lightRec.emission * state.throughputColor * sampleColor * misWeight / lightPdf;

				}

			}

		} else if ( envMapInfo.totalSum != 0.0 && environmentIntensity != 0.0 ) {

			// find a sample in the environment map to include in the contribution
			vec3 envColor, envDirection;
			float envPdf = sampleEquirectProbability( rand2( 7 ), envColor, envDirection );
			envDirection = invEnvRotation3x3 * envDirection;

			// this env sampling is not set up for transmissive sampling and yields overly bright
			// results so we ignore the sample in this case.
			// TODO: this should be improved but how? The env samples could traverse a few layers?
			bool isSampleBelowSurface = ! surf.volumeParticle && dot( surf.faceNormal, envDirection ) < 0.0;
			if ( isSampleBelowSurface ) {

				envPdf = 0.0;

			}

			// check if a ray could even reach the surface
			Ray envRay;
			envRay.origin = rayOrigin;
			envRay.direction = envDirection;
			vec3 attenuatedColor;
			if (
				envPdf > 0.0 &&
				isDirectionValid( envDirection, surf.normal, surf.faceNormal ) &&
				! attenuateHit( state, envRay, INFINITY, attenuatedColor )
			) {

				// get the material pdf
				vec3 sampleColor;
				float envMaterialPdf = bsdfResult( worldWo, envDirection, surf, sampleColor );
				bool isValidSampleColor = all( greaterThanEqual( sampleColor, vec3( 0.0 ) ) );
				if ( envMaterialPdf > 0.0 && isValidSampleColor ) {

					// weight the direct light contribution
					envPdf /= lightsDenom;
					float misWeight = misHeuristic( envPdf, envMaterialPdf );
					result = attenuatedColor * environmentIntensity * envColor * state.throughputColor * sampleColor * misWeight / envPdf;

				}

			}

		}

		// Function changed to have a single return statement to potentially help with crashes on Mac OS.
		// See issue #470
		return result;

	}

`,$o=`

	#define SKIP_SURFACE 0
	#define HIT_SURFACE 1
	int getSurfaceRecord(
		Material material, SurfaceHit surfaceHit, sampler2DArray attributesArray,
		float accumulatedRoughness,
		inout SurfaceRecord surf
	) {

		if ( material.fogVolume ) {

			vec3 normal = vec3( 0, 0, 1 );

			SurfaceRecord fogSurface;
			fogSurface.volumeParticle = true;
			fogSurface.color = material.color;
			fogSurface.emission = material.emissiveIntensity * material.emissive;
			fogSurface.normal = normal;
			fogSurface.faceNormal = normal;
			fogSurface.clearcoatNormal = normal;

			surf = fogSurface;
			return HIT_SURFACE;

		}

		// uv coord for textures
		vec2 uv = textureSampleBarycoord( attributesArray, ATTR_UV, surfaceHit.barycoord, surfaceHit.faceIndices.xyz ).xy;
		vec4 vertexColor = textureSampleBarycoord( attributesArray, ATTR_COLOR, surfaceHit.barycoord, surfaceHit.faceIndices.xyz );

		// albedo
		vec4 albedo = vec4( material.color, material.opacity );
		if ( material.map != - 1 ) {

			vec3 uvPrime = material.mapTransform * vec3( uv, 1 );
			albedo *= texture2D( textures, vec3( uvPrime.xy, material.map ) );

		}

		if ( material.vertexColors ) {

			albedo *= vertexColor;

		}

		// alphaMap
		if ( material.alphaMap != - 1 ) {

			vec3 uvPrime = material.alphaMapTransform * vec3( uv, 1 );
			albedo.a *= texture2D( textures, vec3( uvPrime.xy, material.alphaMap ) ).x;

		}

		// possibly skip this sample if it's transparent, alpha test is enabled, or we hit the wrong material side
		// and it's single sided.
		// - alpha test is disabled when it === 0
		// - the material sidedness test is complicated because we want light to pass through the back side but still
		// be able to see the front side. This boolean checks if the side we hit is the front side on the first ray
		// and we're rendering the other then we skip it. Do the opposite on subsequent bounces to get incoming light.
		float alphaTest = material.alphaTest;
		bool useAlphaTest = alphaTest != 0.0;
		if (
			// material sidedness
			material.side != 0.0 && surfaceHit.side != material.side

			// alpha test
			|| useAlphaTest && albedo.a < alphaTest

			// opacity
			|| material.transparent && ! useAlphaTest && albedo.a < rand( 3 )
		) {

			return SKIP_SURFACE;

		}

		// fetch the interpolated smooth normal
		vec3 normal = normalize( textureSampleBarycoord(
			attributesArray,
			ATTR_NORMAL,
			surfaceHit.barycoord,
			surfaceHit.faceIndices.xyz
		).xyz );

		// roughness
		float roughness = material.roughness;
		if ( material.roughnessMap != - 1 ) {

			vec3 uvPrime = material.roughnessMapTransform * vec3( uv, 1 );
			roughness *= texture2D( textures, vec3( uvPrime.xy, material.roughnessMap ) ).g;

		}

		// metalness
		float metalness = material.metalness;
		if ( material.metalnessMap != - 1 ) {

			vec3 uvPrime = material.metalnessMapTransform * vec3( uv, 1 );
			metalness *= texture2D( textures, vec3( uvPrime.xy, material.metalnessMap ) ).b;

		}

		// emission
		vec3 emission = material.emissiveIntensity * material.emissive;
		if ( material.emissiveMap != - 1 ) {

			vec3 uvPrime = material.emissiveMapTransform * vec3( uv, 1 );
			emission *= texture2D( textures, vec3( uvPrime.xy, material.emissiveMap ) ).xyz;

		}

		// transmission
		float transmission = material.transmission;
		if ( material.transmissionMap != - 1 ) {

			vec3 uvPrime = material.transmissionMapTransform * vec3( uv, 1 );
			transmission *= texture2D( textures, vec3( uvPrime.xy, material.transmissionMap ) ).r;

		}

		// normal
		if ( material.flatShading ) {

			// if we're rendering a flat shaded object then use the face normals - the face normal
			// is provided based on the side the ray hits the mesh so flip it to align with the
			// interpolated vertex normals.
			normal = surfaceHit.faceNormal * surfaceHit.side;

		}

		vec3 baseNormal = normal;
		if ( material.normalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( normal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, normal );

				vec3 uvPrime = material.normalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.normalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.normalScale;
				normal = vTBN * texNormal;

			}

		}

		normal *= surfaceHit.side;

		// clearcoat
		float clearcoat = material.clearcoat;
		if ( material.clearcoatMap != - 1 ) {

			vec3 uvPrime = material.clearcoatMapTransform * vec3( uv, 1 );
			clearcoat *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatMap ) ).r;

		}

		// clearcoatRoughness
		float clearcoatRoughness = material.clearcoatRoughness;
		if ( material.clearcoatRoughnessMap != - 1 ) {

			vec3 uvPrime = material.clearcoatRoughnessMapTransform * vec3( uv, 1 );
			clearcoatRoughness *= texture2D( textures, vec3( uvPrime.xy, material.clearcoatRoughnessMap ) ).g;

		}

		// clearcoatNormal
		vec3 clearcoatNormal = baseNormal;
		if ( material.clearcoatNormalMap != - 1 ) {

			vec4 tangentSample = textureSampleBarycoord(
				attributesArray,
				ATTR_TANGENT,
				surfaceHit.barycoord,
				surfaceHit.faceIndices.xyz
			);

			// some provided tangents can be malformed (0, 0, 0) causing the normal to be degenerate
			// resulting in NaNs and slow path tracing.
			if ( length( tangentSample.xyz ) > 0.0 ) {

				vec3 tangent = normalize( tangentSample.xyz );
				vec3 bitangent = normalize( cross( clearcoatNormal, tangent ) * tangentSample.w );
				mat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );

				vec3 uvPrime = material.clearcoatNormalMapTransform * vec3( uv, 1 );
				vec3 texNormal = texture2D( textures, vec3( uvPrime.xy, material.clearcoatNormalMap ) ).xyz * 2.0 - 1.0;
				texNormal.xy *= material.clearcoatNormalScale;
				clearcoatNormal = vTBN * texNormal;

			}

		}

		clearcoatNormal *= surfaceHit.side;

		// sheenColor
		vec3 sheenColor = material.sheenColor;
		if ( material.sheenColorMap != - 1 ) {

			vec3 uvPrime = material.sheenColorMapTransform * vec3( uv, 1 );
			sheenColor *= texture2D( textures, vec3( uvPrime.xy, material.sheenColorMap ) ).rgb;

		}

		// sheenRoughness
		float sheenRoughness = material.sheenRoughness;
		if ( material.sheenRoughnessMap != - 1 ) {

			vec3 uvPrime = material.sheenRoughnessMapTransform * vec3( uv, 1 );
			sheenRoughness *= texture2D( textures, vec3( uvPrime.xy, material.sheenRoughnessMap ) ).a;

		}

		// iridescence
		float iridescence = material.iridescence;
		if ( material.iridescenceMap != - 1 ) {

			vec3 uvPrime = material.iridescenceMapTransform * vec3( uv, 1 );
			iridescence *= texture2D( textures, vec3( uvPrime.xy, material.iridescenceMap ) ).r;

		}

		// iridescence thickness
		float iridescenceThickness = material.iridescenceThicknessMaximum;
		if ( material.iridescenceThicknessMap != - 1 ) {

			vec3 uvPrime = material.iridescenceThicknessMapTransform * vec3( uv, 1 );
			float iridescenceThicknessSampled = texture2D( textures, vec3( uvPrime.xy, material.iridescenceThicknessMap ) ).g;
			iridescenceThickness = mix( material.iridescenceThicknessMinimum, material.iridescenceThicknessMaximum, iridescenceThicknessSampled );

		}

		iridescence = iridescenceThickness == 0.0 ? 0.0 : iridescence;

		// specular color
		vec3 specularColor = material.specularColor;
		if ( material.specularColorMap != - 1 ) {

			vec3 uvPrime = material.specularColorMapTransform * vec3( uv, 1 );
			specularColor *= texture2D( textures, vec3( uvPrime.xy, material.specularColorMap ) ).rgb;

		}

		// specular intensity
		float specularIntensity = material.specularIntensity;
		if ( material.specularIntensityMap != - 1 ) {

			vec3 uvPrime = material.specularIntensityMapTransform * vec3( uv, 1 );
			specularIntensity *= texture2D( textures, vec3( uvPrime.xy, material.specularIntensityMap ) ).a;

		}

		surf.volumeParticle = false;

		surf.faceNormal = surfaceHit.faceNormal;
		surf.normal = normal;

		surf.metalness = metalness;
		surf.color = albedo.rgb;
		surf.emission = emission;

		surf.ior = material.ior;
		surf.transmission = transmission;
		surf.thinFilm = material.thinFilm;
		surf.attenuationColor = material.attenuationColor;
		surf.attenuationDistance = material.attenuationDistance;

		surf.clearcoatNormal = clearcoatNormal;
		surf.clearcoat = clearcoat;

		surf.sheen = material.sheen;
		surf.sheenColor = sheenColor;

		surf.iridescence = iridescence;
		surf.iridescenceIor = material.iridescenceIor;
		surf.iridescenceThickness = iridescenceThickness;

		surf.specularColor = specularColor;
		surf.specularIntensity = specularIntensity;

		// apply perceptual roughness factor from gltf. sheen perceptual roughness is
		// applied by its brdf function
		// https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#microfacet-surfaces
		surf.roughness = roughness * roughness;
		surf.clearcoatRoughness = clearcoatRoughness * clearcoatRoughness;
		surf.sheenRoughness = sheenRoughness;

		// frontFace is used to determine transmissive properties and PDF. If no transmission is used
		// then we can just always assume this is a front face.
		surf.frontFace = surfaceHit.side == 1.0 || transmission == 0.0;
		surf.eta = material.thinFilm || surf.frontFace ? 1.0 / material.ior : material.ior;
		surf.f0 = iorRatioToF0( surf.eta );

		// Compute the filtered roughness value to use during specular reflection computations.
		// The accumulated roughness value is scaled by a user setting and a "magic value" of 5.0.
		// If we're exiting something transmissive then scale the factor down significantly so we can retain
		// sharp internal reflections
		surf.filteredRoughness = applyFilteredGlossy( surf.roughness, accumulatedRoughness );
		surf.filteredClearcoatRoughness = applyFilteredGlossy( surf.clearcoatRoughness, accumulatedRoughness );

		// get the normal frames
		surf.normalBasis = getBasisFromNormal( surf.normal );
		surf.normalInvBasis = inverse( surf.normalBasis );

		surf.clearcoatBasis = getBasisFromNormal( surf.clearcoatNormal );
		surf.clearcoatInvBasis = inverse( surf.clearcoatBasis );

		return HIT_SURFACE;

	}
`,es=`

	struct Ray {

		vec3 origin;
		vec3 direction;

	};

	struct SurfaceHit {

		uvec4 faceIndices;
		vec3 barycoord;
		vec3 faceNormal;
		float side;
		float dist;

	};

	struct RenderState {

		bool firstRay;
		bool transmissiveRay;
		bool isShadowRay;
		float accumulatedRoughness;
		int transmissiveTraversals;
		int traversals;
		uint depth;
		vec3 throughputColor;
		Material fogMaterial;

	};

	RenderState initRenderState() {

		RenderState result;
		result.firstRay = true;
		result.transmissiveRay = true;
		result.isShadowRay = false;
		result.accumulatedRoughness = 0.0;
		result.transmissiveTraversals = 0;
		result.traversals = 0;
		result.throughputColor = vec3( 1.0 );
		result.depth = 0u;
		result.fogMaterial.fogVolume = false;
		return result;

	}

`,ts=`

	#define NO_HIT 0
	#define SURFACE_HIT 1
	#define LIGHT_HIT 2
	#define FOG_HIT 3

	// Passing the global variable 'lights' into this function caused shader program errors.
	// So global variables like 'lights' and 'bvh' were moved out of the function parameters.
	// For more information, refer to: https://github.com/gkjohnson/three-gpu-pathtracer/pull/457
	int traceScene(
		Ray ray, Material fogMaterial, inout SurfaceHit surfaceHit
	) {

		int result = NO_HIT;
		bool hit = bvhIntersectFirstHit( bvh, ray.origin, ray.direction, surfaceHit.faceIndices, surfaceHit.faceNormal, surfaceHit.barycoord, surfaceHit.side, surfaceHit.dist );

		#if FEATURE_FOG

		if ( fogMaterial.fogVolume ) {

			// offset the distance so we don't run into issues with particles on the same surface
			// as other objects
			float particleDist = intersectFogVolume( fogMaterial, rand( 1 ) );
			if ( particleDist + RAY_OFFSET < surfaceHit.dist ) {

				surfaceHit.side = 1.0;
				surfaceHit.faceNormal = normalize( - ray.direction );
				surfaceHit.dist = particleDist;
				return FOG_HIT;

			}

		}

		#endif

		if ( hit ) {

			result = SURFACE_HIT;

		}

		return result;

	}

`,ns=class extends Sa{onBeforeRender(){this.setDefine(`FEATURE_DOF`,this.physicalCamera.bokehSize===0?0:1),this.setDefine(`FEATURE_BACKGROUND_MAP`,+!!this.backgroundMap),this.setDefine(`FEATURE_FOG`,+!!this.materials.features.isUsed(`FOG`))}constructor(e){super({transparent:!0,depthWrite:!1,defines:{FEATURE_MIS:1,FEATURE_RUSSIAN_ROULETTE:1,FEATURE_DOF:1,FEATURE_BACKGROUND_MAP:0,FEATURE_FOG:1,RANDOM_TYPE:2,CAMERA_TYPE:0,DEBUG_MODE:0,ATTR_NORMAL:0,ATTR_TANGENT:1,ATTR_UV:2,ATTR_COLOR:3,MATERIAL_PIXELS:47},uniforms:{resolution:{value:new U},opacity:{value:1},bounces:{value:10},transmissiveBounces:{value:10},filterGlossyFactor:{value:0},physicalCamera:{value:new Ma},cameraWorldMatrix:{value:new ut},invProjectionMatrix:{value:new ut},bvh:{value:new Ni},attributesArray:{value:new to},materialIndexAttribute:{value:new ji},materials:{value:new uo},textures:{value:new ho().texture},lights:{value:new Qa},iesProfiles:{value:new ho(360,180,{type:We,wrapS:Be,wrapT:Be}).texture},environmentIntensity:{value:1},environmentRotation:{value:new ut},envMapInfo:{value:new La},backgroundBlur:{value:0},backgroundMap:{value:null},backgroundAlpha:{value:1},backgroundIntensity:{value:1},backgroundRotation:{value:new ut},seed:{value:0},sobolTexture:{value:null},stratifiedTexture:{value:new xo},stratifiedOffsetTexture:{value:new Oo(64,1)}},vertexShader:`

				varying vec2 vUv;
				void main() {

					vec4 mvPosition = vec4( position, 1.0 );
					mvPosition = modelViewMatrix * mvPosition;
					gl_Position = projectionMatrix * mvPosition;

					vUv = uv;

				}

			`,fragmentShader:`
				#define RAY_OFFSET 1e-4
				#define INFINITY 1e20

				precision highp isampler2D;
				precision highp usampler2D;
				precision highp sampler2DArray;
				vec4 envMapTexelToLinear( vec4 a ) { return a; }
				#include <common>

				// bvh intersection
				${Ii}
				${Ri}
				${Li}

				// uniform structs
				${ko}
				${jo}
				${Ao}
				${Mo}
				${No}

				// random
				#if RANDOM_TYPE == 2 	// Stratified List

					${Uo}

				#elif RANDOM_TYPE == 1 	// Sobol

					${Ho}
					${Ea}
					${Oa}

					#define rand(v) sobol(v)
					#define rand2(v) sobol2(v)
					#define rand3(v) sobol3(v)
					#define rand4(v) sobol4(v)

				#else 					// PCG

				${Ho}

					// Using the sobol functions seems to break the the compiler on MacOS
					// - specifically the "sobolReverseBits" function.
					uint sobolPixelIndex = 0u;
					uint sobolPathIndex = 0u;
					uint sobolBounceIndex = 0u;

					#define rand(v) pcgRand()
					#define rand2(v) pcgRand2()
					#define rand3(v) pcgRand3()
					#define rand4(v) pcgRand4()

				#endif

				// common
				${Bo}
				${Lo}
				${Vo}
				${Ro}
				${zo}

				// environment
				uniform EquirectHdrInfo envMapInfo;
				uniform mat4 environmentRotation;
				uniform float environmentIntensity;

				// lighting
				uniform sampler2DArray iesProfiles;
				uniform LightsInfo lights;

				// background
				uniform float backgroundBlur;
				uniform float backgroundAlpha;
				#if FEATURE_BACKGROUND_MAP

				uniform sampler2D backgroundMap;
				uniform mat4 backgroundRotation;
				uniform float backgroundIntensity;

				#endif

				// camera
				uniform mat4 cameraWorldMatrix;
				uniform mat4 invProjectionMatrix;
				#if FEATURE_DOF

				uniform PhysicalCamera physicalCamera;

				#endif

				// geometry
				uniform sampler2DArray attributesArray;
				uniform usampler2D materialIndexAttribute;
				uniform sampler2D materials;
				uniform sampler2DArray textures;
				uniform BVH bvh;

				// path tracer
				uniform int bounces;
				uniform int transmissiveBounces;
				uniform float filterGlossyFactor;
				uniform int seed;

				// image
				uniform vec2 resolution;
				uniform float opacity;

				varying vec2 vUv;

				// globals
				mat3 envRotation3x3;
				mat3 invEnvRotation3x3;
				float lightsDenom;

				// sampling
				${Io}
				${Po}
				${Fo}

				${Yo}
				${Ko}
				${Jo}
				${qo}
				${Go}
				${Wo}

				float applyFilteredGlossy( float roughness, float accumulatedRoughness ) {

					return clamp(
						max(
							roughness,
							accumulatedRoughness * filterGlossyFactor * 5.0 ),
						0.0,
						1.0
					);

				}

				vec3 sampleBackground( vec3 direction, vec2 uv ) {

					vec3 sampleDir = sampleHemisphere( direction, uv ) * 0.5 * backgroundBlur;

					#if FEATURE_BACKGROUND_MAP

					sampleDir = normalize( mat3( backgroundRotation ) * direction + sampleDir );
					return backgroundIntensity * sampleEquirectColor( backgroundMap, sampleDir );

					#else

					sampleDir = normalize( envRotation3x3 * direction + sampleDir );
					return environmentIntensity * sampleEquirectColor( envMapInfo.map, sampleDir );

					#endif

				}

				${es}
				${Zo}
				${ts}
				${Xo}
				${Qo}
				${$o}

				void main() {

					// init
					rng_initialize( gl_FragCoord.xy, seed );
					sobolPixelIndex = ( uint( gl_FragCoord.x ) << 16 ) | uint( gl_FragCoord.y );
					sobolPathIndex = uint( seed );

					// get camera ray
					Ray ray = getCameraRay();

					// inverse environment rotation
					envRotation3x3 = mat3( environmentRotation );
					invEnvRotation3x3 = inverse( envRotation3x3 );
					lightsDenom =
						( environmentIntensity == 0.0 || envMapInfo.totalSum == 0.0 ) && lights.count != 0u ?
							float( lights.count ) :
							float( lights.count + 1u );

					// final color
					gl_FragColor = vec4( 0, 0, 0, 1 );

					// surface results
					SurfaceHit surfaceHit;
					ScatterRecord scatterRec;

					// path tracing state
					RenderState state = initRenderState();
					state.transmissiveTraversals = transmissiveBounces;
					#if FEATURE_FOG

					state.fogMaterial.fogVolume = bvhIntersectFogVolumeHit(
						ray.origin, - ray.direction,
						materialIndexAttribute, materials,
						state.fogMaterial
					);

					#endif

					for ( int i = 0; i < bounces; i ++ ) {

						sobolBounceIndex ++;

						state.depth ++;
						state.traversals = bounces - i;
						state.firstRay = i == 0 && state.transmissiveTraversals == transmissiveBounces;

						int hitType = traceScene( ray, state.fogMaterial, surfaceHit );

						// check if we intersect any lights and accumulate the light contribution
						// TODO: we can add support for light surface rendering in the else condition if we
						// add the ability to toggle visibility of the the light
						if ( ! state.firstRay && ! state.transmissiveRay ) {

							LightRecord lightRec;
							float lightDist = hitType == NO_HIT ? INFINITY : surfaceHit.dist;
							for ( uint i = 0u; i < lights.count; i ++ ) {

								if (
									intersectLightAtIndex( lights.tex, ray.origin, ray.direction, i, lightRec ) &&
									lightRec.dist < lightDist
								) {

									#if FEATURE_MIS

									// weight the contribution
									// NOTE: Only area lights are supported for forward sampling and can be hit
									float misWeight = misHeuristic( scatterRec.pdf, lightRec.pdf / lightsDenom );
									gl_FragColor.rgb += lightRec.emission * state.throughputColor * misWeight;

									#else

									gl_FragColor.rgb += lightRec.emission * state.throughputColor;

									#endif

								}

							}

						}

						if ( hitType == NO_HIT ) {

							if ( state.firstRay || state.transmissiveRay ) {

								gl_FragColor.rgb += sampleBackground( ray.direction, rand2( 2 ) ) * state.throughputColor;
								gl_FragColor.a = backgroundAlpha;

							} else {

								#if FEATURE_MIS

								// get the PDF of the hit envmap point
								vec3 envColor;
								float envPdf = sampleEquirect( envRotation3x3 * ray.direction, envColor );
								envPdf /= lightsDenom;

								// and weight the contribution
								float misWeight = misHeuristic( scatterRec.pdf, envPdf );
								gl_FragColor.rgb += environmentIntensity * envColor * state.throughputColor * misWeight;

								#else

								gl_FragColor.rgb +=
									environmentIntensity *
									sampleEquirectColor( envMapInfo.map, envRotation3x3 * ray.direction ) *
									state.throughputColor;

								#endif

							}
							break;

						}

						uint materialIndex = uTexelFetch1D( materialIndexAttribute, surfaceHit.faceIndices.x ).r;
						Material material = readMaterialInfo( materials, materialIndex );

						#if FEATURE_FOG

						if ( hitType == FOG_HIT ) {

							material = state.fogMaterial;
							state.accumulatedRoughness += 0.2;

						} else if ( material.fogVolume ) {

							state.fogMaterial = material;
							state.fogMaterial.fogVolume = surfaceHit.side == 1.0;

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );

							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );
							continue;

						}

						#endif

						// early out if this is a matte material
						if ( material.matte && state.firstRay ) {

							gl_FragColor = vec4( 0.0 );
							break;

						}

						// if we've determined that this is a shadow ray and we've hit an item with no shadow casting
						// then skip it
						if ( ! material.castShadow && state.isShadowRay ) {

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						SurfaceRecord surf;
						if (
							getSurfaceRecord(
								material, surfaceHit, attributesArray, state.accumulatedRoughness,
								surf
							) == SKIP_SURFACE
						) {

							// only allow a limited number of transparency discards otherwise we could
							// crash the context with too long a loop.
							i -= sign( state.transmissiveTraversals );
							state.transmissiveTraversals -= sign( state.transmissiveTraversals );

							ray.origin = stepRayOrigin( ray.origin, ray.direction, - surfaceHit.faceNormal, surfaceHit.dist );
							continue;

						}

						scatterRec = bsdfSample( - ray.direction, surf );
						state.isShadowRay = scatterRec.specularPdf < rand( 4 );

						bool isBelowSurface = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal ) < 0.0;
						vec3 hitPoint = stepRayOrigin( ray.origin, ray.direction, isBelowSurface ? - surf.faceNormal : surf.faceNormal, surfaceHit.dist );

						// next event estimation
						#if FEATURE_MIS

						gl_FragColor.rgb += directLightContribution( - ray.direction, surf, state, hitPoint );

						#endif

						// accumulate a roughness value to offset diffuse, specular, diffuse rays that have high contribution
						// to a single pixel resulting in fireflies
						// TODO: handle transmissive surfaces
						if ( ! surf.volumeParticle && ! isBelowSurface ) {

							// determine if this is a rough normal or not by checking how far off straight up it is
							vec3 halfVector = normalize( - ray.direction + scatterRec.direction );
							state.accumulatedRoughness += max(
								sin( acosApprox( dot( halfVector, surf.normal ) ) ),
								sin( acosApprox( dot( halfVector, surf.clearcoatNormal ) ) )
							);

							state.transmissiveRay = false;

						}

						// accumulate emissive color
						gl_FragColor.rgb += ( surf.emission * state.throughputColor );

						// skip the sample if our PDF or ray is impossible
						if ( scatterRec.pdf <= 0.0 || ! isDirectionValid( scatterRec.direction, surf.normal, surf.faceNormal ) ) {

							break;

						}

						// if we're bouncing around the inside a transmissive material then decrement
						// perform this separate from a bounce
						bool isTransmissiveRay = ! surf.volumeParticle && dot( scatterRec.direction, surf.faceNormal * surfaceHit.side ) < 0.0;
						if ( ( isTransmissiveRay || isBelowSurface ) && state.transmissiveTraversals > 0 ) {

							state.transmissiveTraversals --;
							i --;

						}

						//

						// handle throughput color transformation
						// attenuate the throughput color by the medium color
						if ( ! surf.frontFace ) {

							state.throughputColor *= transmissionAttenuation( surfaceHit.dist, surf.attenuationColor, surf.attenuationDistance );

						}

						#if FEATURE_RUSSIAN_ROULETTE

						// russian roulette path termination
						// https://www.arnoldrenderer.com/research/physically_based_shader_design_in_arnold.pdf
						uint minBounces = 3u;
						float depthProb = float( state.depth < minBounces );

						float rrProb = luminance( state.throughputColor * scatterRec.color / scatterRec.pdf );
						rrProb /= luminance( state.throughputColor );
						rrProb = sqrt( rrProb );
						rrProb = max( rrProb, depthProb );
						rrProb = min( rrProb, 1.0 );
						if ( rand( 8 ) > rrProb ) {

							break;

						}

						// perform sample clamping here to avoid bright pixels
						state.throughputColor *= min( 1.0 / rrProb, 20.0 );

						#endif

						// adjust the throughput and discard and exit if we find discard the sample if there are any NaNs
						state.throughputColor *= scatterRec.color / scatterRec.pdf;
						if ( any( isnan( state.throughputColor ) ) || any( isinf( state.throughputColor ) ) ) {

							break;

						}

						//

						// prepare for next ray
						ray.direction = scatterRec.direction;
						ray.origin = hitPoint;

					}

					gl_FragColor.a *= opacity;

					#if DEBUG_MODE == 1

					// output the number of rays checked in the path and number of
					// transmissive rays encountered.
					gl_FragColor.rgb = vec3(
						float( state.depth ),
						transmissiveBounces - state.transmissiveTraversals,
						0.0
					);
					gl_FragColor.a = 1.0;

					#endif

				}

			`}),this.setValues(e)}};function*rs(){let{_renderer:e,_fsQuad:t,_blendQuad:n,_primaryTarget:r,_blendTargets:i,_sobolTarget:a,_subframe:o,alpha:s,material:c}=this,l=new bt,u=new bt,d=n.material,[f,p]=i;for(;;){s?(d.opacity=this._opacityFactor/(this.samples+1),c.blending=0,c.opacity=1):(c.opacity=this._opacityFactor/(this.samples+1),c.blending=1);let[i,m,h,g]=o,_=r.width,v=r.height;c.resolution.set(_*h,v*g),c.sobolTexture=a.texture,c.stratifiedTexture.init(20,c.bounces+c.transmissiveBounces+5),c.stratifiedTexture.next(),c.seed++;let y=this.tiles.x||1,b=this.tiles.y||1,x=y*b,S=Math.ceil(_*h),C=Math.ceil(v*g),w=Math.floor(i*_),T=Math.floor(m*v),E=Math.ceil(S/y),ee=Math.ceil(C/b);for(let i=0;i<b;i++)for(let a=0;a<y;a++){let o=e.getRenderTarget(),c=e.autoClear,m=e.getScissorTest();e.getScissor(l),e.getViewport(u);let h=a,g=i;if(!this.stableTiles){let e=this._currentTile%(y*b);h=e%y,g=~~(e/y),this._currentTile=e+1}let _=b-g-1;r.scissor.set(w+h*E,T+_*ee,Math.min(E,S-h*E),Math.min(ee,C-_*ee)),r.viewport.set(w,T,S,C),e.setRenderTarget(r),e.setScissorTest(!0),e.autoClear=!1,t.render(e),e.setViewport(u),e.setScissor(l),e.setScissorTest(m),e.setRenderTarget(o),e.autoClear=c,s&&(d.target1=f.texture,d.target2=r.texture,e.setRenderTarget(p),n.render(e),e.setRenderTarget(o)),this.samples+=1/x,a===y-1&&i===b-1&&(this.samples=Math.round(this.samples)),yield}[f,p]=[p,f]}}var is=new Ct,as=class{get material(){return this._fsQuad.material}set material(e){this._fsQuad.material.removeEventListener(`recompilation`,this._compileFunction),e.addEventListener(`recompilation`,this._compileFunction),this._fsQuad.material=e}get target(){return this._alpha?this._blendTargets[1]:this._primaryTarget}set alpha(e){this._alpha!==e&&(e||(this._blendTargets[0].dispose(),this._blendTargets[1].dispose()),this._alpha=e,this.reset())}get alpha(){return this._alpha}get isCompiling(){return!!this._compilePromise}constructor(e){this.camera=null,this.tiles=new U(3,3),this.stableNoise=!1,this.stableTiles=!0,this.samples=0,this._subframe=new bt(0,0,1,1),this._opacityFactor=1,this._renderer=e,this._alpha=!1,this._fsQuad=new pt(new ns),this._blendQuad=new pt(new Ca),this._task=null,this._currentTile=0,this._compilePromise=null,this._sobolTarget=new Aa().generate(e),this._primaryTarget=new Tt(1,1,{format:G,type:z,magFilter:H,minFilter:H}),this._blendTargets=[new Tt(1,1,{format:G,type:z,magFilter:H,minFilter:H}),new Tt(1,1,{format:G,type:z,magFilter:H,minFilter:H})],this._compileFunction=()=>{let e=this.compileMaterial(this._fsQuad._mesh);e.then(()=>{this._compilePromise===e&&(this._compilePromise=null)}),this._compilePromise=e},this.material.addEventListener(`recompilation`,this._compileFunction)}compileMaterial(){return this._renderer.compileAsync(this._fsQuad._mesh)}setCamera(e){let{material:t}=this;t.cameraWorldMatrix.copy(e.matrixWorld),t.invProjectionMatrix.copy(e.projectionMatrixInverse),t.physicalCamera.updateFrom(e);let n=0;e.projectionMatrix.elements[15]>0&&(n=1),e.isEquirectCamera&&(n=2),t.setDefine(`CAMERA_TYPE`,n),this.camera=e}setSize(e,t){e=Math.ceil(e),t=Math.ceil(t),(this._primaryTarget.width!==e||this._primaryTarget.height!==t)&&(this._primaryTarget.setSize(e,t),this._blendTargets[0].setSize(e,t),this._blendTargets[1].setSize(e,t),this.reset())}getSize(e){e.x=this._primaryTarget.width,e.y=this._primaryTarget.height}dispose(){this._primaryTarget.dispose(),this._blendTargets[0].dispose(),this._blendTargets[1].dispose(),this._sobolTarget.dispose(),this._fsQuad.dispose(),this._blendQuad.dispose(),this._task=null}reset(){let{_renderer:e,_primaryTarget:t,_blendTargets:n}=this,r=e.getRenderTarget(),i=e.getClearAlpha();e.getClearColor(is),e.setRenderTarget(t),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(n[0]),e.setClearColor(0,0),e.clearColor(),e.setRenderTarget(n[1]),e.setClearColor(0,0),e.clearColor(),e.setClearColor(is,i),e.setRenderTarget(r),this.samples=0,this._task=null,this.material.stratifiedTexture.stableNoise=this.stableNoise,this.stableNoise&&(this.material.seed=0,this.material.stratifiedTexture.reset())}update(){this.material.onBeforeRender(),!this.isCompiling&&(this._task||=rs.call(this),this._task.next())}},os=new U,ss=new U,cs=new Ue,ls=new Ct,us=class extends et{constructor(e=512,t=512){super(new Uint16Array(e*t*4),e,t,G,We,303,Ze,Be,gt,gt),this.generationCallback=null}update(){this.dispose(),this.needsUpdate=!0;let{data:e,width:t,height:n}=this.image;for(let r=0;r<t;r++)for(let i=0;i<n;i++){ss.set(t,n),os.set(r/t,i/n),os.x-=.5,os.y=1-os.y,cs.theta=os.x*2*Math.PI,cs.phi=os.y*Math.PI,cs.radius=1,this.generationCallback(cs,os,ss,ls);let a=4*(i*t+r);e[a+0]=B.toHalfFloat(ls.r),e[a+1]=B.toHalfFloat(ls.g),e[a+2]=B.toHalfFloat(ls.b),e[a+3]=B.toHalfFloat(1)}}copy(e){return super.copy(e),this.generationCallback=e.generationCallback,this}},ds=new W,fs=class extends us{constructor(e=512){super(e,e),this.topColor=new Ct().set(16777215),this.bottomColor=new Ct().set(0),this.exponent=2,this.generationCallback=(e,t,n,r)=>{ds.setFromSpherical(e);let i=ds.y*.5+.5;r.lerpColors(this.bottomColor,this.topColor,i**this.exponent)}}copy(e){return super.copy(e),this.topColor.copy(e.topColor),this.bottomColor.copy(e.bottomColor),this}},ps=class extends Je{get map(){return this.uniforms.map.value}set map(e){this.uniforms.map.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}constructor(e){super({uniforms:{map:{value:null},opacity:{value:1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}
			`,fragmentShader:`
				uniform sampler2D map;
				uniform float opacity;
				varying vec2 vUv;

				vec4 clampedTexelFatch( sampler2D map, ivec2 px, int lod ) {

					vec4 res = texelFetch( map, ivec2( px.x, px.y ), 0 );

					#if defined( TONE_MAPPING )

					res.xyz = toneMapping( res.xyz );

					#endif

			  		return linearToOutputTexel( res );

				}

				void main() {

					vec2 size = vec2( textureSize( map, 0 ) );
					vec2 pxUv = vUv * size;
					vec2 pxCurr = floor( pxUv );
					vec2 pxFrac = fract( pxUv ) - 0.5;
					vec2 pxOffset;
					pxOffset.x = pxFrac.x > 0.0 ? 1.0 : - 1.0;
					pxOffset.y = pxFrac.y > 0.0 ? 1.0 : - 1.0;

					vec2 pxNext = clamp( pxOffset + pxCurr, vec2( 0.0 ), size - 1.0 );
					vec2 alpha = abs( pxFrac );

					vec4 p1 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxCurr.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxCurr.y ), 0 ),
						alpha.x
					);

					vec4 p2 = mix(
						clampedTexelFatch( map, ivec2( pxCurr.x, pxNext.y ), 0 ),
						clampedTexelFatch( map, ivec2( pxNext.x, pxNext.y ), 0 ),
						alpha.x
					);

					gl_FragColor = mix( p1, p2, alpha.y );
					gl_FragColor.a *= opacity;
					#include <premultiplied_alpha_fragment>

				}
			`}),this.setValues(e)}},ms=class extends Je{constructor(){super({uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:`
				varying vec2 vUv;
				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`
				#define ENVMAP_TYPE_CUBE_UV

				uniform samplerCube envMap;
				uniform float flipEnvMap;
				varying vec2 vUv;

				#include <common>
				#include <cube_uv_reflection_fragment>

				${Vo}

				void main() {

					vec3 rayDirection = equirectUvToDirection( vUv );
					rayDirection.x *= flipEnvMap;
					gl_FragColor = textureCube( envMap, rayDirection );

				}`}),this.depthWrite=!1,this.depthTest=!1}},hs=class{constructor(e){this._renderer=e,this._quad=new pt(new ms)}generate(e,t=null,n=null){if(!e.isCubeTexture)throw Error(`CubeToEquirectMaterial: Source can only be cube textures.`);let r=e.images[0],i=this._renderer,a=this._quad;t===null&&(t=4*r.height),n===null&&(n=2*r.height);let o=new Tt(t,n,{type:z,colorSpace:r.colorSpace}),s=r.height,c=Math.log2(s)-2,l=1/s,u=1/(3*Math.max(2**c,112));a.material.defines.CUBEUV_MAX_MIP=`${c}.0`,a.material.defines.CUBEUV_TEXEL_WIDTH=u,a.material.defines.CUBEUV_TEXEL_HEIGHT=l,a.material.uniforms.envMap.value=e,a.material.uniforms.flipEnvMap.value=e.isRenderTargetTexture?1:-1,a.material.needsUpdate=!0;let d=i.getRenderTarget(),f=i.autoClear;i.autoClear=!0,i.setRenderTarget(o),a.render(i),i.setRenderTarget(d),i.autoClear=f;let p=new Uint16Array(t*n*4),m=new Float32Array(t*n*4);i.readRenderTargetPixels(o,0,0,t,n,m),o.dispose();for(let e=0,t=m.length;e<t;e++)p[e]=B.toHalfFloat(m[e]);let h=new et(p,t,n,G,We);return h.minFilter=At,h.magFilter=gt,h.wrapS=Ze,h.wrapT=Ze,h.mapping=303,h.needsUpdate=!0,h}dispose(){this._quad.dispose()}};function gs(e){return e.extensions.get(`EXT_float_blend`)}var _s=new U,vs=class{get multipleImportanceSampling(){return!!this._pathTracer.material.defines.FEATURE_MIS}set multipleImportanceSampling(e){this._pathTracer.material.setDefine(`FEATURE_MIS`,+!!e)}get transmissiveBounces(){return this._pathTracer.material.transmissiveBounces}set transmissiveBounces(e){this._pathTracer.material.transmissiveBounces=e}get bounces(){return this._pathTracer.material.bounces}set bounces(e){this._pathTracer.material.bounces=e}get filterGlossyFactor(){return this._pathTracer.material.filterGlossyFactor}set filterGlossyFactor(e){this._pathTracer.material.filterGlossyFactor=e}get samples(){return this._pathTracer.samples}get target(){return this._pathTracer.target}get tiles(){return this._pathTracer.tiles}get stableNoise(){return this._pathTracer.stableNoise}set stableNoise(e){this._pathTracer.stableNoise=e}get isCompiling(){return!!this._pathTracer.isCompiling}constructor(e){console.warn(`WebGLPathTracer: This class has been deprecated and will be removed in a future release. Use "WebGPUPathTracer" instead.`),this._renderer=e,this._generator=new xa,this._pathTracer=new as(e),this._queueReset=!1,this._clock=new Qe,this._compilePromise=null,this._lowResPathTracer=new as(e),this._lowResPathTracer.tiles.set(1,1),this._quad=new pt(new ps({map:null,transparent:!0,blending:0,premultipliedAlpha:e.getContextAttributes().premultipliedAlpha})),this._materials=null,this._previousEnvironment=null,this._previousBackground=null,this._internalBackground=null,this.renderDelay=100,this.minSamples=5,this.fadeDuration=500,this.enablePathTracing=!0,this.pausePathTracing=!1,this.dynamicLowRes=!1,this.lowResScale=.25,this.renderScale=1,this.synchronizeRenderSize=!0,this.rasterizeScene=!0,this.renderToCanvas=!0,this.textureSize=new U(1024,1024),this.rasterizeSceneCallback=(e,t)=>{this._renderer.render(e,t)},this.renderToCanvasCallback=(e,t,n)=>{let r=t.autoClear;t.autoClear=!1,n.render(t),t.autoClear=r},this.setScene(new Ge,new jt)}setBVHWorker(e){this._generator.setBVHWorker(e)}setScene(e,t,n={}){e.updateMatrixWorld(!0),t.updateMatrixWorld();let r=this._generator;if(r.setObjects(e),this._buildAsync)return r.generateAsync(n.onProgress).then(n=>this._updateFromResults(e,t,n));{let n=r.generate();return this._updateFromResults(e,t,n)}}setSceneAsync(...e){this._buildAsync=!0;let t=this.setScene(...e);return this._buildAsync=!1,t}setCamera(e){this.camera=e,this.updateCamera()}updateCamera(){let e=this.camera;e.updateMatrixWorld(),this._pathTracer.setCamera(e),this._lowResPathTracer.setCamera(e),this.reset()}updateMaterials(){let e=this._pathTracer.material,t=this._renderer,n=this._materials,r=this.textureSize,i=oo(n);e.textures.setTextures(t,i,r.x,r.y),e.materials.updateFrom(n,i),this.reset()}updateLights(){let e=this.scene,t=this._renderer,n=this._pathTracer.material,r=so(e),i=ao(r);n.lights.updateFrom(r,i),n.iesProfiles.setTextures(t,i),this.reset()}updateEnvironment(){let e=this.scene,t=this._pathTracer.material;if(this._internalBackground&&=(this._internalBackground.dispose(),null),t.backgroundBlur=e.backgroundBlurriness,t.backgroundIntensity=e.backgroundIntensity??1,t.backgroundRotation.makeRotationFromEuler(e.backgroundRotation).invert(),e.background===null)t.backgroundMap=null,t.backgroundAlpha=0;else if(e.background.isColor){this._colorBackground=this._colorBackground||new fs(16);let n=this._colorBackground;n.topColor.equals(e.background)||(n.topColor.set(e.background),n.bottomColor.set(e.background),n.update()),t.backgroundMap=n,t.backgroundAlpha=1}else if(e.background.isCubeTexture){if(e.background!==this._previousBackground){let n=new hs(this._renderer).generate(e.background);this._internalBackground=n,t.backgroundMap=n,t.backgroundAlpha=1}}else t.backgroundMap=e.background,t.backgroundAlpha=1;if(t.environmentIntensity=e.environment===null?0:e.environmentIntensity??1,t.environmentRotation.makeRotationFromEuler(e.environmentRotation).invert(),this._previousEnvironment!==e.environment&&e.environment!==null){if(e.environment.isCubeTexture){let n=new hs(this._renderer).generate(e.environment);t.envMapInfo.updateFrom(n)}else t.envMapInfo.updateFrom(e.environment)}this._previousEnvironment=e.environment,this._previousBackground=e.background,this.reset()}_updateFromResults(e,t,n){let{materials:r,geometry:i,bvh:a,bvhChanged:o,needsMaterialIndexUpdate:s}=n;this._materials=r;let c=this._pathTracer.material;return o&&(c.bvh.updateFrom(a),c.attributesArray.updateFrom(i.attributes.normal,i.attributes.tangent,i.attributes.uv,i.attributes.color)),s&&c.materialIndexAttribute.updateFrom(i.attributes.materialIndex),this._previousScene=e,this.scene=e,this.camera=t,this.updateCamera(),this.updateMaterials(),this.updateEnvironment(),this.updateLights(),n}renderSample(){let e=this._lowResPathTracer,t=this._pathTracer,n=this._renderer,r=this._clock,i=this._quad;this._updateScale(),this._queueReset&&(t.reset(),e.reset(),this._queueReset=!1,i.material.opacity=0,r.start());let a=r.getDelta()*1e3,o=r.getElapsedTime()*1e3;if(!this.pausePathTracing&&this.enablePathTracing&&this.renderDelay<=o&&!this.isCompiling&&t.update(),t.alpha=t.material.backgroundAlpha!==1||!gs(n),e.alpha=t.alpha,this.renderToCanvas){let n=this._renderer,r=this.minSamples;if(o>=this.renderDelay&&this.samples>=this.minSamples&&(this.fadeDuration===0?i.material.opacity=1:i.material.opacity=Math.min(i.material.opacity+a/this.fadeDuration,1)),!this.enablePathTracing||this.samples<r||i.material.opacity<1){if(this.dynamicLowRes&&!this.isCompiling){e.samples<1&&(e.material=t.material,e.update());let r=i.material.opacity;i.material.opacity=1-i.material.opacity,i.material.map=e.target.texture,i.render(n),i.material.opacity=r}(!this.dynamicLowRes&&this.rasterizeScene||this.dynamicLowRes&&this.isCompiling)&&this.rasterizeSceneCallback(this.scene,this.camera)}this.enablePathTracing&&i.material.opacity>0&&(i.material.opacity<1&&(i.material.blending=this.dynamicLowRes?2:1),i.material.map=t.target.texture,this.renderToCanvasCallback(t.target,n,i),i.material.blending=0)}}reset(){this._queueReset=!0,this._pathTracer.samples=0}dispose(){this._quad.dispose(),this._quad.material.dispose(),this._pathTracer.dispose()}_updateScale(){if(this.synchronizeRenderSize){this._renderer.getDrawingBufferSize(_s);let e=Math.floor(this.renderScale*_s.x),t=Math.floor(this.renderScale*_s.y);if(this._pathTracer.getSize(_s),_s.x!==e||_s.y!==t){let n=this.lowResScale;this._pathTracer.setSize(e,t),this._lowResPathTracer.setSize(Math.floor(e*n),Math.floor(t*n))}}}getRenderTime(){return this._clock.getElapsedTime()*1e3}},ys=class extends nt{constructor(){super(),this.isEquirectCamera=!0}},bs=class extends Sa{constructor(e){super({blending:0,transparent:!1,depthWrite:!1,depthTest:!1,defines:{USE_SLIDER:0},uniforms:{sigma:{value:5},threshold:{value:.03},kSigma:{value:1},map:{value:null},opacity:{value:1}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}

			`,fragmentShader:`

				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
				//  Copyright (c) 2018-2019 Michele Morrone
				//  All rights reserved.
				//
				//  https://michelemorrone.eu - https://BrutPitt.com
				//
				//  me@michelemorrone.eu - brutpitt@gmail.com
				//  twitter: @BrutPitt - github: BrutPitt
				//
				//  https://github.com/BrutPitt/glslSmartDeNoise/
				//
				//  This software is distributed under the terms of the BSD 2-Clause license
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

				uniform sampler2D map;

				uniform float sigma;
				uniform float threshold;
				uniform float kSigma;
				uniform float opacity;

				varying vec2 vUv;

				#define INV_SQRT_OF_2PI 0.39894228040143267793994605993439
				#define INV_PI 0.31830988618379067153776752674503

				// Parameters:
				//	 sampler2D tex	 - sampler image / texture
				//	 vec2 uv		   - actual fragment coord
				//	 float sigma  >  0 - sigma Standard Deviation
				//	 float kSigma >= 0 - sigma coefficient
				//		 kSigma * sigma  -->  radius of the circular kernel
				//	 float threshold   - edge sharpening threshold
				vec4 smartDeNoise( sampler2D tex, vec2 uv, float sigma, float kSigma, float threshold ) {

					float radius = round( kSigma * sigma );
					float radQ = radius * radius;

					float invSigmaQx2 = 0.5 / ( sigma * sigma );
					float invSigmaQx2PI = INV_PI * invSigmaQx2;

					float invThresholdSqx2 = 0.5 / ( threshold * threshold );
					float invThresholdSqrt2PI = INV_SQRT_OF_2PI / threshold;

					vec4 centrPx = texture2D( tex, uv );
					centrPx.rgb *= centrPx.a;

					float zBuff = 0.0;
					vec4 aBuff = vec4( 0.0 );
					vec2 size = vec2( textureSize( tex, 0 ) );

					vec2 d;
					for ( d.x = - radius; d.x <= radius; d.x ++ ) {

						float pt = sqrt( radQ - d.x * d.x );

						for ( d.y = - pt; d.y <= pt; d.y ++ ) {

							float blurFactor = exp( - dot( d, d ) * invSigmaQx2 ) * invSigmaQx2PI;

							vec4 walkPx = texture2D( tex, uv + d / size );
							walkPx.rgb *= walkPx.a;

							vec4 dC = walkPx - centrPx;
							float deltaFactor = exp( - dot( dC.rgba, dC.rgba ) * invThresholdSqx2 ) * invThresholdSqrt2PI * blurFactor;

							zBuff += deltaFactor;
							aBuff += deltaFactor * walkPx;

						}

					}

					return aBuff / zBuff;

				}

				void main() {

					gl_FragColor = smartDeNoise( map, vec2( vUv.x, vUv.y ), sigma, kSigma, threshold );
					#include <tonemapping_fragment>
					#include <colorspace_fragment>
					#include <premultiplied_alpha_fragment>

					gl_FragColor.a *= opacity;

				}

			`}),this.setValues(e)}},xs=`/oidn/rt_hdr_alb_nrm.tza`,Ss;function Cs(){return typeof navigator<`u`&&`gpu`in navigator}function ws(){return Ss??=Cs()?e(async()=>{let{initUNetFromURL:e}=await import(`./BKrtBI0x.js`);return{initUNetFromURL:e}},[],import.meta.url).then(async({initUNetFromURL:e})=>e(await n(xs)??xs,void 0,{aux:!0,hdr:!0})).catch(e=>(console.warn(e),null)):Promise.resolve(null),Ss}function Ts(e,t){let{width:n,height:r}=t,i=()=>{};return{result:new Promise((a,o)=>{i=e.tileExecute({color:{data:t.color,width:n,height:r},albedo:new ImageData(t.albedo,n,r),normal:new ImageData(t.normal,n,r),done:e=>a(e.data),error:o})}),abort:i}}var Es=.001,Ds=5,Os=8,ks=Dt.degToRad(52),As=.2,js=13,Ms={horizon:.26,overhead:.18,ground:.13},Ns=[{side:3840,passes:600},{side:2560,passes:600},{side:1920,passes:600},{side:1600,passes:600},{side:1280,passes:400},{side:1024,passes:300},{side:800,passes:200},{side:640,passes:150},{side:512,passes:100}],Ps=120,Fs=[{side:3840,passes:160},{side:2560,passes:160},{side:1920,passes:160},{side:1600,passes:160},{side:1280,passes:128},{side:1024,passes:96},{side:800,passes:64},{side:640,passes:48},{side:512,passes:32}],Is=[8,32],Ls={side:640,passes:3},Rs=60,zs=10,Bs={sigma:2,kSigma:1.5,threshold:.06},Vs={early:1.4,most:.3,young:64,youngSigma:3},Hs=16184559,Us=.86,Ws={spacing:1400,clear:700,size:250,glow:.03,color:16774632},Gs={glow:.58,under:60,inset:60,color:16775924},Ks={width:30,front:60,glow:4.5,color:16772827},qs={glow:1.5,color:15003135,clear:20},Js={back:700,up:350,width:1.6,height:1,glow:.55,color:16775665,margin:200,ahead:2500},Ys=24,Xs={height:Dt.degToRad(38),turn:Dt.degToRad(28),spread:.03,glow:900},Zs=.42,Qs=.12,$s=[1,4,16,48],ec=32,tc={room:2,open:1.5,share:.95,white:1,darkest:.1,brightest:.5,least:.02,most:40},nc=.75,rc=.15,ic=.12,ac={share:.4,most:1.5,side:64,blur:4},oc=[`uniform sampler2D raw;`,`uniform vec2 cell;`,`uniform vec3 backdrop;`,`uniform float middleLog;`,`varying vec2 vUv;`,`void main() {`,`	float sum = 0.0;`,`	for (int i = 0; i < 4; i++) {`,`		for (int j = 0; j < 4; j++) {`,`			vec3 light = texture2D(raw, vUv + (vec2(float(i), float(j)) - 1.5) * cell * 0.25).rgb;`,`			bool empty = all(lessThan(abs(light - backdrop), vec3(0.0005)));`,`			sum += empty ? middleLog : log2(max(dot(max(light, 0.0), vec3(0.2126, 0.7152, 0.0722)), 1e-4));`,`		}`,`	}`,`	gl_FragColor = vec4(sum / 16.0, 0.0, 0.0, 1.0);`,`}`].join(`
`),sc=[`uniform sampler2D map;`,`uniform vec2 way;`,`varying vec2 vUv;`,`void main() {`,`	float sum = 0.0;`,`	float weight = 0.0;`,`	for (int i = -8; i <= 8; i++) {`,`		float w = exp(-float(i * i) / ${(2*ac.blur*ac.blur).toFixed(1)});`,`		sum += texture2D(map, vUv + way * float(i)).r * w;`,`		weight += w;`,`	}`,`	gl_FragColor = vec4(sum / weight, 0.0, 0.0, 1.0);`,`}`].join(`
`),cc=`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,lc=[`uniform sampler2D map;`,`uniform float exposure;`,`uniform sampler2D local;`,`uniform float middleLog;`,`uniform float balance;`,`uniform float most;`,`uniform sampler2D raw;`,`uniform vec3 backdrop;`,`uniform vec3 backdropShown;`,`uniform sampler2D smoothedMap;`,`uniform float patched;`,`varying vec2 vUv;`,`vec3 develop(vec3 color) {`,`	const float knee = ${nc.toFixed(3)};`,`	const float pale = ${rc.toFixed(3)};`,`	const float toe = ${(ic*ic).toFixed(5)};`,`	float least = max(min(color.r, min(color.g, color.b)), 0.0);`,`	color -= least * toe / (least * least + toe);`,`	float peak = max(color.r, max(color.g, color.b));`,`	if (peak < knee) return color;`,`	float d = 1.0 - knee;`,`	float top = 1.0 - d * d / (peak + d - knee);`,`	color *= top / peak;`,`	float g = 1.0 - 1.0 / (pale * (peak - top) + 1.0);`,`	return mix(color, vec3(top), g);`,`}`,`void main() {`,`	vec3 light = texture2D(map, vUv).rgb;`,`	vec3 seen = texture2D(raw, vUv).rgb;`,`	if (patched > 0.5 && max(light.r, max(light.g, light.b)) <= 1e-6 && seen.r + seen.g + seen.b > 3e-3) light = texture2D(smoothedMap, vUv).rgb;`,`	if (all(lessThan(abs(seen - backdrop), vec3(0.0005)))) {`,`		gl_FragColor = vec4(backdropShown, 1.0);`,`		#include <colorspace_fragment>`,`		return;`,`	}`,`	float lift = clamp(-balance * (texture2D(local, vUv).r - middleLog), -most, most);`,`	gl_FragColor = vec4(clamp(develop(max(light, 0.0) * exposure * exp2(lift)), 0.0, 1.0), 1.0);`,`	#include <colorspace_fragment>`,`}`].join(`
`);function uc(e,t){let n=i(e,`wall`);if(n.length===0)return null;let r=Math.max(...n.map(e=>e.height));return t.camera.position.y<r?r:null}var dc=1600;function fc(e,t){let n=t.camera.position,a=T(e);if(a.length===0)return n.clone();let o=i(e,`wall`),s=o.length>0?Math.max(...o.map(e=>e.height)):1/0,c={x:n.x,y:-n.z};if(n.y>0&&n.y<s&&a.some(e=>r(c,e)))return n.clone();let l=t.camera.getWorldDirection(new W),u=l.y<-.001?-n.y/l.y:0,d={x:n.x+l.x*u,y:-(n.z+l.z*u)},f=null,p=1/0;for(let e of a){let t=pc([e]),n=Math.hypot(t.x-d.x,t.y-d.y);n<p&&(p=n,f=t)}return f?new W(f.x,Math.min(dc,s*.6),-f.y):n.clone()}function pc(e){let t=e.flat(),n=t.reduce((e,t)=>a(e,t),{x:0,y:0});return f(n,1/Math.max(t.length,1))}function mc(e,t,n){let r=d(e),i=a(e.start,f(r,t.offset+t.width/2));return o(m(n,i),u(r))>0}function hc(e,t){let n=[];for(let r of i(e,`opening`)){let i=l(e,r.wallId,`wall`);i&&r.type===`window`&&!t.hidden.has(r.id)&&n.push({opening:r,wall:i})}return n.sort((e,t)=>t.opening.width*t.opening.height-e.opening.width*e.opening.height)}function gc(e,n,r){let[i]=hc(e,n);if(!i)return null;let a=d(i.wall),o=mc(i.wall,i.opening,r)?c(a):u(a),s=n.camera.getWorldDirection(new W),l={x:s.x,y:-s.z},f=t(o)*(Math.PI/180),p=e=>-(Math.cos(f+e)*l.x+Math.sin(f+e)*l.y),m=f+(p(Xs.turn)>=p(-Xs.turn)?Xs.turn:-Xs.turn),h=Math.cos(Xs.height);return new W(Math.cos(m)*h,Math.sin(Xs.height),-Math.sin(m)*h)}function _c(e,t,n){let a=i(e,`wall`).filter(e=>!t.hidden.has(e.id));if(a.length<3||n.length===0)return!1;let o=(e,t,n)=>{let r=m(n.end,n.start),i=Math.hypot(r.x,r.y),a=t.x*r.y-t.y*r.x;if(i<1||Math.abs(a)<1e-9)return!1;let o=m(n.start,e),s=(o.x*r.y-o.y*r.x)/a,c=(o.x*t.y-o.y*t.x)/a,l=n.thickness/i;return s>0&&c>=-l&&c<=1+l};return n.every(e=>{let t=pc([e]);if(!r(t,e))return!1;for(let e=0;e<Ys;e++){let n=e/Ys*2*Math.PI+.01,r={x:Math.cos(n),y:Math.sin(n)};if(!a.some(e=>o(t,r,e)))return!1}return!0})}function vc(e,t,n){let i={x:e.position.x,y:-e.position.z,z:e.position.y},o=e.getWorldDirection(new W),s=new W(o.x,-o.z,o.y),c=t.find(e=>r(i,e));if(!c)return null;let l=Math.hypot(s.x,s.y),u=l>1e-6?{x:-s.x/l,y:-s.y/l}:{x:0,y:0},d=e=>[[0,0],[1,0],[-1,0],[0,1],[0,-1]].every(([t,n])=>r({x:e.x+t*Js.margin,y:e.y+n*Js.margin},c)),p=i;for(let e of[1,.75,.5,.25]){let t=a(i,f(u,Js.back*e));if(d(t)){p=t;break}}let m=Math.max(Math.min(i.z+Js.up,n-200),Math.min(900,n-200)),h=new De(Js.color,Js.glow,Js.width,Js.height);h.position.set(p.x,p.y,m);let g=new W(i.x,i.y,i.z).addScaledVector(s.normalize(),Js.ahead).sub(h.position).normalize();return h.quaternion.setFromUnitVectors(new W(0,0,-1),g),h}function yc(e,n,o,s){let c=new it;for(let e of o){let t=e.map(e=>e.x),n=e.map(e=>e.y),[i,a]=[Math.min(...t),Math.min(...n)],[o,l]=[Math.max(...t)-i,Math.max(...n)-a],u={x:Math.max(o-2*Gs.inset,200),y:Math.max(l-2*Gs.inset,200)},d=new De(Gs.color,Gs.glow*o*l/(u.x*u.y),u.x*Es,u.y*Es);d.position.set(i+o/2,a+l/2,s-Gs.under),d.rotation.x=Math.PI,c.add(d);let f={x:Math.max(o-2*Ws.clear,0),y:Math.max(l-2*Ws.clear,0)},p=Math.max(1,Math.round(f.x/Ws.spacing)+1),m=Math.max(1,Math.round(f.y/Ws.spacing)+1),h={x:p>1?f.x/(p-1):0,y:m>1?f.y/(m-1):0},g={x:i+(p>1?Ws.clear:o/2),y:a+(m>1?Ws.clear:l/2)},_=Ws.size*Es,v=Ws.glow*o*l*Es*Es/(p*m*(Math.PI/4)*_*_);for(let t=0;t<p;t++)for(let n=0;n<m;n++){let i={x:g.x+t*h.x,y:g.y+n*h.y};if(!r(i,e))continue;let a=new De(Ws.color,v,_,_);a.isCircular=!0,a.position.set(i.x,i.y,s-3),c.add(a)}}for(let t of i(e,`cabinet`)){if(t.type!==`upper`||t.block||n.hidden.has(t.id))continue;let{pose:r,base:i}=p(e,t),a=new it;w(a,r,t.depth,i);let o=new Le(Ks.color,Ks.glow,Math.max(t.width-80,100)*Es,Ks.width*Es);o.position.set(t.width/2,Math.min(Ks.front,t.depth/2),-3),a.add(o),c.add(a)}{let r=pc(o);for(let{opening:i,wall:o}of hc(e,n)){let e=d(o),n=a(o.start,f(e,i.offset)),s=new it;s.position.set(n.x,n.y,i.sill),s.rotation.z=Dt.degToRad(t(e));let l=new Le(qs.color,qs.glow,i.width*Es,i.height*Es),u=mc(o,i,r);l.position.set(i.width/2,u?o.thickness+qs.clear:-qs.clear,i.height/2),l.rotation.x=u?-Math.PI/2:Math.PI/2,s.add(l),c.add(s)}}return c}function bc(e){let t=[];e.traverse(e=>{e instanceof Et&&Array.isArray(e.material)&&t.push(e)});for(let e of t){let t=e.material,n=e.geometry,r=n.index?n.index.count:n.attributes.position.count,i=n.groups.length>0?n.groups:[{start:0,count:r,materialIndex:0}];for(let a of i){let i=t[a.materialIndex??0];if(!i)continue;let o=Math.min(a.start+a.count,r);if(o<=a.start)continue;let s=new Uint32Array(o-a.start);for(let e=a.start;e<o;e++)s[e-a.start]=n.index?n.index.getX(e):e;let c=new dt;for(let[e,t]of Object.entries(n.attributes))c.setAttribute(e,t);c.setIndex(new Nt(s,1));let l=new Et(c,i);l.userData.ownsGeometry=!0,l.position.copy(e.position),l.quaternion.copy(e.quaternion),l.scale.copy(e.scale),e.parent?.add(l)}e.updateMatrix();for(let t of[...e.children])t.applyMatrix4(e.matrix),e.parent?.add(t);e.removeFromParent(),e.userData.ownsGeometry&&n.dispose()}}function xc(e,t,n,r){let i=new it;i.rotation.x=-Math.PI/2,i.scale.setScalar(Es);for(let r of Object.values(e.entities)){if(t.hidden.has(r.id)||!ee(r)||r.kind===`point`)continue;let a=E(e,r,n),o=t.openness.get(r.id);o&&g(a,o),i.add(a)}for(let t of ne(e,n))i.add(t);let a=T(e);if(r!==null){let e=new mt({color:Hs,...re(1)});for(let t of a){let n=new Et(new Ft(new tt(t.map(e=>new U(e.x,e.y)))),e);n.position.z=r,n.userData.ownsGeometry=!0,i.add(n)}i.userData.plaster=e}let o=new mt({color:16777215,roughness:0,transmission:1,ior:1.5,thickness:1}),s=[],c=new Map,l=new Map;i.traverse(e=>{if(!(e instanceof Et))e instanceof Ke&&s.push(e);else{if(e.material===n.unseen)s.push(e);else if(e.material===n.glass)e.material=o;else if(typeof e.userData.glass==`string`){let t=e.userData.glass,n=c.get(t);n||(n=new mt({color:t,roughness:.02,transmission:.85,ior:1.5,thickness:1}),c.set(t,n)),e.material=n}else{let t=e=>{if(!(e instanceof _t)||!e.userData.render)return e;let t=l.get(e);if(!t){let n=e.clone();if(Object.assign(n,e.userData.render),!n.map){let e=Math.max(n.color.r,n.color.g,n.color.b);e>Us&&n.color.multiplyScalar(Us/e)}t=n,l.set(e,t)}return t};e.material=Array.isArray(e.material)?e.material.map(t):t(e.material)}for(let t of[e.material].flat())t.side=2}});for(let e of s)e.removeFromParent(),v(e);return bc(i),n.metal.metalness=n.steel.metalness=1,n.metal.roughness=.28,n.steel.roughness=.32,i.userData.own=[o,...c.values(),...l.values(),...i.userData.plaster?[i.userData.plaster]:[]],i}function Sc(e,t){let n=t;for(let t of[n._pathTracer,n._lowResPathTracer])t.compileMaterial=()=>{let n=e.getRenderTarget();e.setRenderTarget(t._primaryTarget);let r=e.compileAsync(t._fsQuad._mesh,new nt);return e.setRenderTarget(n),r}}var Cc=2048,wc=2048;function Tc(e,t){e.traverse(e=>{if(e instanceof Et)for(let n of[e.material].flat()){if(!(n instanceof _t))continue;let e=n.map;if(!e||e.wrapS!==1002)continue;let r=e.image;if(!r?.width||!r.height)continue;let i=t.get(e.source.uuid);if(!i){let n=Math.min(1,Cc/Math.max(r.width,r.height)),[a,o]=[Math.round(r.width*n),Math.round(r.height*n)],s=document.createElement(`canvas`);s.width=2*a,s.height=2*o;let c=s.getContext(`2d`);if(!c)continue;for(let[e,t]of[[1,1],[-1,1],[1,-1],[-1,-1]])c.setTransform(e,0,0,t,e<0?2*a:0,t<0?2*o:0),c.drawImage(r,0,o,a,o);i=new Re(s),i.colorSpace=e.colorSpace,i.wrapS=i.wrapT=Ze,t.set(e.source.uuid,i)}let a=`${e.source.uuid}|${e.rotation}`,o=t.get(a);o||(o=i.clone(),o.repeat.copy(e.repeat).multiplyScalar(.5),o.offset.copy(e.offset).multiplyScalar(.5),o.center.copy(e.center),o.rotation=e.rotation,o.needsUpdate=!0,t.set(a,o)),n.map=o}})}function Ec(e,t){let n=e.getWorldDirection(new W).setY(0);n.lengthSq()<1e-6&&n.copy(e.up).applyQuaternion(e.quaternion).setY(0),n.normalize();let r=new W(n.z,0,-n.x),i=n.clone().multiplyScalar(-.45).addScaledVector(r,.9).normalize().multiplyScalar(Math.cos(ks)).setY(Math.sin(ks)),a=new us(512,256),o=new W;return a.generationCallback=(e,n,r,a)=>{let s=n.x*2*Math.PI,c=(.5-n.y)*Math.PI;if(o.set(Math.cos(c)*Math.cos(s),Math.sin(c),Math.cos(c)*Math.sin(s)),t){let e=t.enclosed?Qs:Zs,n=t.sun?Xs.glow*Math.exp(-(1-o.dot(t.sun))/(Xs.spread*Xs.spread)):0;a.setRGB(e+n,e+n*.95,e+n*.86);return}let l=o.y>0?Ms.horizon+Ms.overhead*o.y:Ms.ground,u=js*Math.exp(-(1-o.dot(i))/(As*As));a.setRGB(l*.93+u,l*.97+u*.96,l+u*.9)},a.update(),a}function Dc(e){let t=Ns.map(e=>e.side).sort((e,t)=>e-t);return t.find(t=>t>=e)??t[t.length-1]}var Oc=3e4;async function kc(e,t,n,r=new S){let i=performance.now()+Oc;for(;;){let a=xc(e,t,r,uc(e,t));v(a);for(let e of a.userData.own)e.dispose();let o=r.awaiting+ +!ie()+ +!b();if(n(o),o===0||performance.now()>=i)return r;let[s,c,l]=[r.awaiting,x(),te()],u=()=>r.awaiting===s&&x()===c&&te()===l&&!(r.awaiting===0&&ie()&&b())&&performance.now()<i;for(;u();)await Ac(r,i-performance.now())}}function Ac(e,t){return new Promise(n=>{let r=e.onArrival,i=[],a=()=>{for(let e of i)e();e.onArrival===o&&(e.onArrival=r),n()},o=()=>{r?.(),a()};e.onArrival=o,i.push(_(a),h(a),y(a));let s=setTimeout(a,Math.max(0,t));i.push(()=>clearTimeout(s))})}var jc=32;function Mc(e,t,n,r){for(let i=0;i<r;i+=jc)for(let a=0;a<n;a+=jc){let[o,s]=[Math.min(a+jc,n),Math.min(i+jc,r)],c=0,l=0;for(let r=i;r<s;r++)for(let i=a;i<o;i++){let a=(r*n+i)*4,[o,s,u]=[e[a],e[a+1],e[a+2]];if(!(Number.isFinite(o)&&Number.isFinite(s)&&Number.isFinite(u)))return!0;c=Math.max(c,o,s,u),l+=t[a]+t[a+1]+t[a+2]}if(!(c>1e-6||l/((o-a)*(s-i))<.001))return!0}return!1}function Nc(e){for(let t=0;t<e.length;t+=4)Number.isFinite(e[t])&&Number.isFinite(e[t+1])&&Number.isFinite(e[t+2])||e.fill(0,t,t+4)}var Pc=class{canvas;#e;#t;#n=new Ge;#r;#i;#a;#o=0;metered=null;#s;#c=1;#l;#u=new Et(new ft(2,2),new bs(Bs));#d=new Tt(1,1,{type:We,depthBuffer:!1,magFilter:H,minFilter:H});#f=0;#p=!1;#m=!1;#h=[0,1].map(()=>new Tt(1,1,{type:We,depthBuffer:!1,magFilter:gt,minFilter:gt}));#g=new Et(new ft(2,2),new Je({uniforms:{raw:{value:null},cell:{value:new U},backdrop:{value:new Ct(C.background)},middleLog:{value:0}},vertexShader:cc,fragmentShader:oc,depthTest:!1,depthWrite:!1,toneMapped:!1}));#_=new Et(new ft(2,2),new Je({uniforms:{map:{value:null},way:{value:new U}},vertexShader:cc,fragmentShader:sc,depthTest:!1,depthWrite:!1,toneMapped:!1}));#v;#y=null;#b=null;#x={passes:0,at:0};#S=0;#C=0;#w=0;#T=!1;#E;#D=new yt(-1,1,1,-1,0,1);#O=Cs();#k=null;#A=null;#j=null;#M=new Et(new ft(2,2),new Je({uniforms:{map:{value:null},raw:{value:null},exposure:{value:1},local:{value:null},middleLog:{value:0},balance:{value:0},most:{value:ac.most},smoothedMap:{value:null},patched:{value:0},backdrop:{value:new Ct(C.background)},backdropShown:{value:new Ct(C.background)}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:lc,depthTest:!1,depthWrite:!1,toneMapped:!1}));#N=0;#P=null;#F=!1;#I=!1;#L=!1;#R=!1;#z=new Map;#B=!1;#V;#H;#U;constructor(e,t,n,r=null,i=1,a={}){this.#c=2**(a.brightness??0),this.#V=r,this.#H=i,this.#U=a.budget??Ps,this.#r=a.assets??new S;let o=new vt({antialias:!1,preserveDrawingBuffer:!0});if(this.#e=o,this.canvas=o.domElement,this.canvas.addEventListener(`webglcontextlost`,()=>this.#T=!0),!o.extensions.has(`EXT_color_buffer_float`))throw o.dispose(),Error(`This device cannot keep the light of a picture as it adds up`);o.setPixelRatio(1),o.toneMapping=7,this.#v=n;for(let e of this.#h)e.setSize(ac.side,Math.max(4,Math.round(ac.side/n)));this.#K(Ls.side);let c;if(a.panorama){let n=new ys;n.position.copy(fc(e,t)).multiplyScalar(Es);let r=t.camera.getWorldDirection(new W);n.rotation.set(0,Math.atan2(-r.z,r.x),0),n.updateMatrixWorld(),c=n}else{let e=a.region,r=e?n*e.height/e.width:n,i=new jt(t.camera.fov,r,.05,700);if(e){let t=1e3;i.setViewOffset(t*r,t,e.x*t*r,e.y*t,e.width*t*r,e.height*t)}i.position.copy(t.camera.position).multiplyScalar(Es),i.quaternion.copy(t.camera.quaternion),i.updateMatrixWorld(),c=i}this.#E=c,a.panorama?this.#Z():ws().then(e=>{this.#k=e,e||this.#Z()});let l=uc(e,t),u=T(e),d=_c(e,t,u);if(this.#i=xc(e,t,this.#r,l),Tc(this.#i,this.#z),this.#r.onArrival=()=>this.#B=!0,this.#a=Ec(c,l===null?null:{enclosed:d,sun:gc(e,t,pc(u))}),l!==null&&s(e).lighting?.auto!==!1){this.#i.add(yc(e,t,u,l));let n=vc(t.camera,u,l);n&&this.#i.add(n)}this.#i.add(Pe(e,t.hidden)),this.#n.add(this.#i),this.#n.environment=this.#a;let f=new Ct(C.background);this.#n.background=f,this.#l=.2126*f.r+.7152*f.g+.0722*f.b,this.#s=l===null?tc.open:tc.room,a.measured&&(this.#s=a.measured.exposure,this.#f=a.measured.middleLog,this.#p=!0,this.#m=!0),o.toneMappingExposure=this.#s*this.#c;let p=new vs(o);Sc(o,p),p.bounces=a.bounces??Ds,p.transmissiveBounces=Os,p.filterGlossyFactor=.5,p.tiles.set(2,2),p.renderDelay=0,p.fadeDuration=0,p.minSamples=1,p.dynamicLowRes=!0,p.rasterizeScene=!1,p.textureSize.set(wc,wc),p.renderToCanvasCallback=e=>{let{width:t,height:n}=this.canvas;(this.#d.width!==t||this.#d.height!==n)&&this.#d.setSize(t,n),this.#u.material.map=e.texture,o.setRenderTarget(this.#d),o.render(this.#u,this.#D),this.#$()},p.setScene(this.#n,c),this.#t=p}get passes(){return Math.floor(this.#t.samples)}get wanted(){return this.#b?.passes??0}get done(){return this.#I&&!this.#R}get stage(){return this.done?`done`:this.#b?this.#F?`cleaning`:`tracing`:`timing`}get size(){return{width:this.canvas.width,height:this.canvas.height}}get#W(){return this.#b!==null&&this.passes>=this.#b.passes}get#G(){return this.#O?Fs:Ns}get remaining(){return!this.#b||this.#w===0?null:Math.max(this.#b.passes-this.passes,0)*this.#w/1e3}get lost(){return this.#T}#K(e){let t=this.#v>=1;this.#e.setSize(Math.round(t?e:e*this.#v),Math.round(t?e/this.#v:e),!1)}#q(e,t){let n=this.#G,r=this.#V===null?void 0:n.find(e=>e.side===this.#V);if(r)return this.#X(r);let i=n.find(n=>e*(n.side/t)**2*n.passes*this.#H<=this.#U*1e3);return this.#X(i??n[n.length-1])}#J(e,t,n){this.#b=e,this.#w=t;let r=Dt.clamp(Math.ceil(Math.sqrt(t/Rs)),1,zs);this.#t.tiles.set(r,r),this.#K(e.side),this.#t.reset(),this.#x={passes:0,at:n},this.#Y()}#Y(){this.#N++,this.#A?.abort(),this.#A=null,this.#j?.dispose(),this.#j=null,this.#F=!1,this.#I=!1}#X(e){return{side:e.side,passes:Math.max(8,Math.round(e.passes*this.#H))}}#Z(){this.#O=!1,this.#A=null;let e=this.#b?.side,t=e===void 0?void 0:Ns.find(t=>t.side===e);t&&(this.#b=this.#X(t))}#Q(){let e=this.#e,[t,n]=this.#h,r=this.#g.material.uniforms;r.raw.value=this.#t.target.texture,r.cell.value.set(1/t.width,1/t.height),r.middleLog.value=this.#f,e.setRenderTarget(t),e.render(this.#g,this.#D);let i=this.#_.material.uniforms;return i.map.value=t.texture,i.way.value.set(1/t.width,0),e.setRenderTarget(n),e.render(this.#_,this.#D),i.map.value=n.texture,i.way.value.set(0,1/t.height),e.setRenderTarget(t),e.render(this.#_,this.#D),e.setRenderTarget(null),t}#$(){let e=this.#s*this.#c,t=this.#M.material.uniforms;t.map.value=this.#j??this.#d.texture,t.smoothedMap.value=this.#d.texture,t.patched.value=+!!this.#j,t.raw.value=this.#t.target.texture,t.exposure.value=e,t.balance.value=this.#p?ac.share:0,t.local.value=this.#p?this.#Q().texture:null,t.middleLog.value=this.#f,this.#e.toneMappingExposure=e,this.#e.setRenderTarget(null),this.#e.render(this.#M,this.#D)}get measured(){return this.#p?{exposure:this.#s,middleLog:this.#f}:null}get brightness(){return Math.log2(this.#c)}set brightness(e){let t=2**e;t!==this.#c&&(this.#c=t,this.passes>0&&!this.#T&&this.#$())}#ee(e,t){if(this.#P?.begun===this.#N)return this.#P;let n=this.#e,r=new Tt(e,t),i=()=>{let i=new Uint8Array(e*t*4);return n.setRenderTarget(r),n.setClearColor(0,1),n.clear(),n.render(this.#n,this.#E),n.readRenderTargetPixels(r,0,0,e,t,i),new Uint8ClampedArray(i.buffer)},a=this.#n.background;this.#n.background=null;let o={color:n.getClearColor(new Ct),alpha:n.getClearAlpha()},s=new Map,c=e=>{let t=s.get(e);if(!t){let n=e;t=new Ot({color:n.color,map:n.map??null,side:2}),s.set(e,t)}return t},l=[];this.#i.traverse(e=>{if(!(e instanceof Et))return;let t=e.material;l.push([e,t]),e.material=Array.isArray(t)?t.map(c):c(t)});let u=i();for(let[e,t]of l)e.material=t;for(let e of s.values())e.dispose();let d=new wt({side:2});this.#n.overrideMaterial=d;let f=i();return this.#n.overrideMaterial=null,d.dispose(),this.#n.background=a,n.setClearColor(o.color,o.alpha),n.setRenderTarget(null),r.dispose(),this.#P={begun:this.#N,albedo:u,normal:f},this.#P}#te(e,t=2){let n=this.#k;if(!n||this.#A)return;let r=this.#t.target,{width:i,height:a}=r,o=new Float32Array(i*a*4);this.#e.readRenderTargetPixels(r,0,0,i,a,o);let{albedo:s,normal:c}=this.#ee(i,a),l=this.#N,u=Ts(n,{width:i,height:a,color:o,albedo:s,normal:c});this.#A=u,e&&(this.#F=!0),u.result.then(n=>{this.#L||l!==this.#N||(this.#A=null,t>0&&Mc(n,o,i,a)?(this.#F=!1,this.#te(e,t-1)):(Nc(n),this.#j?.dispose(),this.#j=new et(n,i,a,G,z),this.#j.needsUpdate=!0,this.#$(),e&&(this.#I=!0)))},e=>{this.#L||l!==this.#N||(console.warn(e),this.#F=!1,this.#Z())})}#ne(e){let t=performance.now();if(!this.#b){if(e===1&&this.#S===0&&(this.#S=t),e<1+Ls.passes||this.#S===0)return;let n=(t-this.#S)/Ls.passes,r=this.#q(n,Ls.side);r&&this.#J(r,n*(r.side/Ls.side)**2,t);return}if(this.#C!==null&&(e===1&&this.#C===0&&(this.#C=t),e>=5&&this.#C!==0)){let n=(t-this.#C)/(e-1),r=this.#q(n,this.#b.side);if(this.#C=null,r&&r.side!==this.#b.side){this.#J(r,n*(r.side/this.#b.side)**2,t);return}this.#w=n}let{passes:n,at:r}=this.#x;e>n&&n>0&&(this.#w+=((t-r)/(e-n)-this.#w)*.2),e!==n&&(this.#x={passes:e,at:t})}step(){if(this.#T||(this.#B&&(this.#B=!1,Tc(this.#i,this.#z),this.#t.updateMaterials(),this.#b||(this.#S=0),this.#C!==null&&(this.#C=0),this.#x={passes:0,at:performance.now()},this.#o=0,this.#Y()),this.#I||!this.#re()))return;if(this.#ie(),this.#W){this.#O?this.#F||this.#te(!0):this.#I=!0;return}this.#t.renderSample();let e=this.#e.getContext();this.#y=e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0),e.flush()}#re(){let e=this.#y;if(!e)return!0;let t=this.#e.getContext();return t.clientWaitSync(e,0,0)!==t.TIMEOUT_EXPIRED&&(t.deleteSync(e),this.#y=null,!0)}#ie(){let e=this.passes;if(e===this.#o)return;if(this.#o=e,this.#ne(e),this.passes!==e){this.#o=0;return}let t=this.#u.material;t.threshold=Dt.clamp(Vs.early/Math.sqrt(Math.max(e,1)),Bs.threshold,Vs.most),t.sigma=e<Vs.young?Vs.youngSigma:Bs.sigma,this.#b&&$s.includes(e)&&!this.#m&&this.#ae(),this.#b&&Is.includes(e)&&e<this.#b.passes&&this.#te(!1)}#ae(){this.#R||(this.#R=!0,this.#oe().catch(e=>console.warn(e)).finally(()=>this.#R=!1))}async#oe(){let e=this.#t.target,{width:t,height:n}=e,r=this.#N,i=await Promise.all(Array.from({length:ec},async(r,i)=>{let a=Math.floor((i+.5)*n/ec),o=new Float32Array(t*4);return await this.#e.readRenderTargetPixelsAsync(e,0,a,t,1,o),{y:a,row:o}}));if(this.#L||r!==this.#N||this.#t.target!==e||e.width!==t||e.height!==n)return;let a=[],o=0;for(let{y:e,row:r}of i)for(let i=0;i<r.length;i+=16){let[s,c,l]=[r[i]??0,r[i+1]??0,r[i+2]??0],u=.2126*s+.7152*c+.0722*l;if(!(Math.abs(u-this.#l)>.002)||!Number.isFinite(u))continue;let d=Math.log2(Math.max(u,1e-4)),f=Math.log2(Math.max(s,c,l,1e-4));a.push({stops:d,strongest:f,u:(i/4+.5)/t,v:(e+.5)/n}),o+=d}if(a.length<200)return;this.#f=o/a.length;let s=this.#se(a),c=(e,t)=>Dt.clamp(-ac.share*(s(e,t)-this.#f),-ac.most,ac.most),l=a.map(({stops:e,u:t,v:n})=>e+c(t,n)),u=a.map(({strongest:e,u:t,v:n})=>e+c(t,n)).sort((e,t)=>e-t),d=2**(l.reduce((e,t)=>e+t,0)/l.length),f=2**(u[Math.floor((u.length-1)*tc.share)]??-40);if(!(d>0)||!(f>0))return;this.#p=!0;let p=Dt.clamp(tc.white/f,tc.darkest/d,tc.brightest/d);this.#s=Dt.clamp(p,tc.least,tc.most),this.#$()}#se(e){let[t,n]=[this.#h[0].width,this.#h[0].height],r=new Float64Array(t*n),i=new Float64Array(t*n);for(let{stops:a,u:o,v:s}of e){let e=Math.min(n-1,Math.floor(s*n))*t+Math.min(t-1,Math.floor(o*t));r[e]=r[e]+a,i[e]=i[e]+1}let a=Array.from({length:17},(e,t)=>Math.exp(-((t-8)**2)/(2*ac.blur*ac.blur))),o=(e,r)=>{let i=new Float64Array(e.length);for(let o=0;o<n;o++)for(let s=0;s<t;s++){let c=0;for(let i=-8;i<=8;i++){let[l,u]=r?[Math.min(t-1,Math.max(0,s+i)),o]:[s,Math.min(n-1,Math.max(0,o+i))];c+=e[u*t+l]*a[i+8]}i[o*t+s]=c}return i},s=o(o(r,!0),!1),c=o(o(i,!0),!1);return(e,r)=>{let i=Math.min(n-1,Math.max(0,Math.floor(r*n)))*t+Math.min(t-1,Math.max(0,Math.floor(e*t)));return c[i]>1e-6?s[i]/c[i]:this.#f}}toBlob(e=`image/png`){return new Promise(t=>this.canvas.toBlob(t,e,.92))}dispose(){this.#L=!0,this.#y&&this.#e.getContext().deleteSync(this.#y),this.#y=null,this.#A?.abort(),this.#j?.dispose(),this.#M.geometry.dispose(),this.#M.material.dispose(),this.#r.onArrival=null;for(let e of this.#z.values())e.dispose();this.#t.dispose(),this.#u.geometry.dispose(),this.#u.material.dispose(),this.#d.dispose();for(let e of this.#h)e.dispose();for(let e of[this.#g,this.#_])e.geometry.dispose(),e.material.dispose();v(this.#i);for(let e of this.#i.userData.own)e.dispose();this.#r.dispose(),this.#a.dispose(),this.#e.dispose(),this.#e.forceContextLoss()}},Fc=L(`<img class="whole svelte-qhkvja" alt=""/>`),Ic=L(`<!> <div class="part svelte-qhkvja"></div>`,1),Lc=L(`<em class="svelte-qhkvja"> </em>`),Rc=L(`<li><span class="mark svelte-qhkvja" aria-hidden="true"><!></span> <!></li>`),zc=L(`<div class="steps svelte-qhkvja" role="status"><span class="spinner svelte-qhkvja" aria-hidden="true"></span> <ol class="svelte-qhkvja"></ol></div>`),Bc=L(`<p class="note svelte-qhkvja">Render indisponível neste computador.</p>`),Vc=L(`<p class="note svelte-qhkvja"> </p>`),Hc=L(`<img class="svelte-qhkvja"/>`),Uc=L(`<img alt="" class="svelte-qhkvja"/> <!>`,1),Wc=L(`<button type="button" class="back svelte-qhkvja"><!> Voltar ao render</button>`),Gc=L(`<div class="viewing svelte-qhkvja"><!> <!></div>`),Kc=L(`<div class="chip svelte-qhkvja" role="status"><span class="pulse svelte-qhkvja" aria-hidden="true"></span> <span class="bar svelte-qhkvja"><span class="svelte-qhkvja"></span></span></div>`),qc=L(`<span class="drawn svelte-qhkvja"></span>`),Jc=L(`<div class="drawer svelte-qhkvja" role="presentation"><!></div>`),Yc=L(`<button type="button" class="back svelte-qhkvja"><!> Imagem inteira</button>`),Xc=L(`<button type="button" class="svelte-qhkvja">Desfazer</button>`),Zc=L(`<div class="said svelte-qhkvja" role="status"> <!></div>`),Qc=L(`<div class="seg svelte-qhkvja" role="group" aria-label="Região"><button type="button" title="Renderizar só uma parte da imagem: arraste sobre ela">Região</button></div>`),$c=L(`<button type="button"> </button>`),el=L(`<span class="status svelte-qhkvja"> </span>`),tl=L(`<footer class="svelte-qhkvja"><div class="seg svelte-qhkvja" role="group" aria-label="Tipo"><button type="button">Foto</button> <button type="button" title="Panorama 360° em volta de onde a câmera está: olha-se em volta arrastando">360°</button></div> <!> <div class="seg svelte-qhkvja" role="group" aria-label="Qualidade"></div> <div class="seg svelte-qhkvja" role="group" aria-label="Resolução"></div> <div class="seg svelte-qhkvja" role="group" aria-label="Formato"></div> <label class="bright svelte-qhkvja"><!> <input type="range" aria-label="Brilho" class="svelte-qhkvja"/></label> <span class="grow svelte-qhkvja"></span> <!> <button class="btn primary svelte-qhkvja" type="button"> </button></footer>`),nl=L(`<p class="empty svelte-qhkvja">Os renders salvos ficam aqui.</p>`),rl=L(`<li><button type="button" class="thumb svelte-qhkvja" title="Ver"><img class="svelte-qhkvja"/></button> <div class="about svelte-qhkvja"><span class="when svelte-qhkvja"> </span> <span class="actions svelte-qhkvja"><button type="button" aria-label="Baixar" class="svelte-qhkvja"><!></button> <button type="button" class="svelte-qhkvja"><!></button> <button type="button" title="Compartilhar no WhatsApp" aria-label="Compartilhar no WhatsApp" class="svelte-qhkvja"><!></button> <button type="button" class="drop svelte-qhkvja" title="Excluir" aria-label="Excluir"><!></button></span></div></li>`),il=L(`<div class="studio svelte-qhkvja"><div class="main svelte-qhkvja"><div class="stage svelte-qhkvja"><canvas width="96" height="54" aria-hidden="true"></canvas> <!> <!> <!> <!> <!> <!> <!></div> <!></div> <aside class="gallery svelte-qhkvja" aria-label="Renders salvos"><h3 class="svelte-qhkvja">Galeria</h3> <!> <ul class="svelte-qhkvja"></ul></aside></div>`);function al(e,t){Ee(t,!0);let n=be(()=>t.job?.queue&&t.job.queue.length>0?t.job.queue:null),r=I(0),i=be(()=>{if(!t.job)return null;let e=P(n)?.[P(r)];return e?{...t.job,camera:e.camera,hidden:e.hidden}:t.job}),a=I(null),o=I(null),s=I(!1),c=I(null),l=I(void 0),u=I(pe({width:0,height:0})),d=[{id:`gather`,label:`Carregando acabamentos e modelos`},{id:`build`,label:`Montando a cena`},{id:`timing`,label:`Medindo este computador`},{id:`tracing`,label:`Aprimorando a imagem`}],f,p,m=0;function h(e){let t=performance.now();!p||t-m<700||(m=t,p.getContext(`2d`)?.drawImage(e,0,0,p.width,p.height))}let g=null,_=I(`gather`),v=I(0),y=I(0),b=I(0),x=I(null),S=I(pe({width:0,height:0})),C=I(-1),w=null,T=I(!1),E=I(null);de(()=>t.job)||N(E,Me.items[0]??null,!0);let ee=I(null);me(()=>{let e=P(E);if(!e)return;let t=null,n=!1;return Me.picture(e).then(e=>{!n&&e&&(t=URL.createObjectURL(e),N(ee,t,!0))}),()=>{n=!0,N(ee,null),t&&URL.revokeObjectURL(t)}});let te=I(null),ne,re=I(null),ie=be(()=>t.job!==null&&P(_)!==`done`&&P(_)!==`failed`);me(()=>t.onbusy?.(P(ie)));let ue=be(()=>P(x)===null||P(x)<1?``:P(x)<90?`${Math.ceil(P(x)/5)*5} s`:`${Math.round(P(x)/60)} min`),L=be(()=>P(n)?`${P(n)[P(r)]?.name??``} · ${P(r)+1} de ${P(n).length}`:``),De=be(()=>P(n)!==null&&P(r)===P(n).length-1&&P(_)===`done`&&P(y)>0&&P(C)===P(y)),Pe=be(()=>{switch(P(_)){case`gather`:return P(v)>0?`Carregando acabamentos e modelos · faltam ${P(v)}`:`Carregando acabamentos e modelos`;case`build`:return`Montando a cena para o render`;case`timing`:return`Medindo a velocidade deste computador`;case`tracing`:return`Aprimorando a imagem · passo ${P(y)} de ${P(b)}${P(ue)?` · ${P(ue)}`:``}`;case`cleaning`:return`Removendo o ruído`;case`done`:return P(De)?`Fila pronta · ${P(n)?.length??0} ${P(n)?.length===1?`render salvo`:`renders salvos`} na galeria`:`Pronto · ${P(S).width} × ${P(S).height}${P(a)?` · região`:``}`;case`failed`:return`Render indisponível neste computador`}}),Ie=be(()=>P(L)&&!P(De)?`${P(L)} · ${P(Pe)}`:P(Pe)),Le=be(()=>d.findIndex(e=>e.id===P(_)));function z(e){if(!document.hidden){let t=!1,n=()=>{t||(t=!0,cancelAnimationFrame(r),clearTimeout(i),e())},r=requestAnimationFrame(n),i=setTimeout(n,40);return()=>{t=!0,cancelAnimationFrame(r),clearTimeout(i)}}let t=new MessageChannel;return t.port1.onmessage=()=>{t.port1.close(),e()},t.port2.postMessage(0),()=>t.port1.close()}function Re(e,t){clearTimeout(ne),N(te,{text:e,undo:t},!0),ne=setTimeout(()=>N(te,null),t?6e3:3500)}let ze=be(()=>R.long),Be=be(()=>R.quality),Ve=be(()=>R.aspect),He=be(()=>R.panorama);me(()=>{if(!P(i))return;let e=P(ze),t=Ae.find(e=>e.id===P(Be))??Ae[2],n=P(Ve),r=P(He),s=P(i),c=P(a),u=de(()=>P(o)),d=()=>{},p=null,w=!1;de(()=>{N(_,`gather`),N(v,0),N(y,0),N(b,0),N(x,null),N(C,-1)});let T=()=>{p&&!w&&(p.step(),N(y,p.passes,!0),N(b,p.wanted,!0),N(x,p.remaining,!0),N(S,p.size,!0),N(_,p.lost?P(y)===0?`failed`:`done`:p.stage,!0),P(y)>0&&!c&&(p.done&&(m=0),h(p.canvas)),!p.lost&&!p.done&&(d=z(T)))},E=async()=>{let i=Oe(s),a=r?2:n??i.camera.aspect;if(!r&&a>i.camera.aspect){let e=Math.atan(Math.tan(i.camera.fov*Math.PI/360)*(i.camera.aspect/a));i.camera.fov=e*360/Math.PI,i.camera.updateProjectionMatrix()}let o=c?a*c.width/c.height:a,m=e??u?.long??null,h=c&&m!==null?Dc(Math.max(c.width*(a>=1?m:m*a),c.height*(a>=1?m/a:m))):e,y=await kc(s.doc,i,e=>N(v,e,!0));if(w)y.dispose();else if(N(_,`build`),await new Promise(e=>z(()=>setTimeout(e,0))),w)y.dispose();else{try{let e=de(()=>R.brightness);p=new Pc(s.doc,i,o,h,t.factor,{budget:t.budget,bounces:t.bounces,assets:y,brightness:e,...r&&{panorama:!0},...c&&{region:c},...c&&u?.measured&&{measured:u.measured}})}catch(e){console.error(e),y.dispose(),N(_,`failed`);return}g=p,(c&&P(l)?P(l):f).append(p.canvas),N(_,`timing`),d=z(T)}};return d=z(()=>d=z(()=>void E())),()=>{w=!0,d(),g=null,p?.canvas.remove(),p?.dispose(),p=null}});let B=I(0);me(()=>{let e=R.brightness;N(B,e,!0),g&&(g.brightness=e)});function Ue(e){let t=Ne.most,n=Math.round(Math.min(Math.max(e,-t),t)/Ne.step)*Ne.step;n!==R.brightness&&(R.set({brightness:n}),N(C,-1))}let We=be(()=>P(B)===0?`Brilho automático`:`Brilho ${P(B)>0?`+`:`−`}${Math.abs(P(B)).toLocaleString(`pt-BR`)}`);ve(()=>clearTimeout(ne)),me(()=>{if(!P(n)||P(_)!==`done`||P(y)===0||P(T))return;let e=P(r),t=()=>{P(r)===e&&e+1<P(n).length&&N(r,e+1)};de(()=>{P(C)===P(y)?t():$e().catch(e=>console.error(e)).then(t)})}),me(()=>{let e=f,t=new ResizeObserver(()=>N(u,{width:e.clientWidth,height:e.clientHeight},!0));return t.observe(e),()=>t.disconnect()});let V=be(()=>{let e=P(o)?.aspect??(P(S).height>0?P(S).width/P(S).height:0);if(!(e>0)||P(u).width===0||P(u).height===0)return null;let t=Math.min(P(u).height,P(u).width/e),n=t*e;return{left:(P(u).width-n)/2,top:(P(u).height-t)/2,width:n,height:t}});function Ge(e){if(!P(o)){if(!g||P(S).width===0||P(S).height===0)return;N(o,{url:g.canvas.toDataURL(`image/jpeg`,.9),aspect:P(S).width/P(S).height,long:Math.max(P(S).width,P(S).height),measured:g.measured},!0)}N(a,e,!0)}function Ke(){N(a,null),N(o,null),N(s,!1),N(c,null)}let qe=!1;me(()=>{P(Ve),P(He),qe?de(Ke):qe=!0});function Je(e){let t=e.currentTarget.getBoundingClientRect(),n=e=>Math.min(1,Math.max(0,e));return{x:n((e.clientX-t.left)/t.width),y:n((e.clientY-t.top)/t.height)}}let Ye=null;function Xe(e){e.currentTarget.setPointerCapture(e.pointerId),Ye=Je(e),N(c,{...Ye,width:0,height:0},!0)}function Ze(e){if(!Ye)return;let t=Je(e);N(c,{x:Math.min(Ye.x,t.x),y:Math.min(Ye.y,t.y),width:Math.abs(t.x-Ye.x),height:Math.abs(t.y-Ye.y)},!0)}function Qe(){let e=P(c);Ye=null,N(c,null),N(s,!1),e&&e.width>.03&&e.height>.03&&Ge(e)}async function $e(){if(g&&t.job&&!P(T)){N(T,!0);try{let e=R.format,i=P(y),a=await g.toBlob(e===`jpg`?`image/jpeg`:`image/png`);if(!a)return;let o=await Me.add(a,t.job.title,e,P(S).width,P(S).height,R.panorama,P(n)?.[P(r)]?.name);N(C,i,!0),w=o.id,N(re,o.id,!0),setTimeout(()=>{P(re)===o.id&&N(re,null)},1600),Re(`Render salvo na galeria`)}finally{N(T,!1)}}}let et=e=>e===`png`?`jpg`:`png`;async function tt(e){await Me.share(e)===`copied`&&Re(`Imagem copiada · cole na conversa do WhatsApp (Ctrl+V)`)}async function nt(e){let n=await Me.picture(e);Me.remove(e),P(E)?.id===e.id&&N(E,t.job?null:Me.items[0]??null,!0),w===e.id&&N(C,-1),n&&Re(`Render excluído`,()=>void Me.restore(e,n))}let rt=e=>new Date(e).toLocaleString(`pt-BR`,{day:`2-digit`,month:`2-digit`,hour:`2-digit`,minute:`2-digit`});var it=il(),at=M(it),ot=M(at),st=M(ot);let ct;Se(st,e=>p=e,()=>p);var lt=F(st,2),ut=e=>{var t=Ic(),n=fe(t),r=e=>{var t=Fc();let n;D(()=>{Ce(t,`src`,P(o).url),n=_e(t,``,n,{left:`${P(V).left??``}px`,top:`${P(V).top??``}px`,width:`${P(V).width??``}px`,height:`${P(V).height??``}px`})}),A(e,t)};k(n,e=>{P(V)&&e(r)});var i=F(n,2);let s;Se(i,e=>N(l,e),()=>P(l)),D(()=>s=_e(i,``,s,{left:`${P(V)?P(V).left+P(a).x*P(V).width:0}px`,top:`${P(V)?P(V).top+P(a).y*P(V).height:0}px`,width:`${P(V)?P(a).width*P(V).width:0}px`,height:`${P(V)?P(a).height*P(V).height:0}px`})),A(e,t)};k(lt,e=>{P(a)&&P(o)&&e(ut)});var dt=F(lt,2),ft=e=>{var t=zc(),n=F(M(t),2);Te(n,23,()=>d,e=>e.id,(e,t,n)=>{var r=Rc();let i;var a=M(r),o=M(a),s=e=>{Fe(e,{name:`check`,size:12})};k(o,e=>{P(n)<P(Le)&&e(s)}),O(a);var c=F(a),l=F(c),u=e=>{var t=Lc(),n=xe(t);D(()=>se(n,`· faltam ${P(v)??``}`)),A(e,t)};k(l,e=>{P(t).id===`gather`&&P(n)===P(Le)&&P(v)>0&&e(u)}),O(r),D(()=>{i=ge(r,1,`svelte-qhkvja`,null,i,{done:P(n)<P(Le),now:P(n)===P(Le)}),se(c,` ${P(t).label??``}`)}),A(e,r)}),O(n),O(t),A(e,t)},pt=e=>{var t=Bc();A(e,t)},mt=e=>{var t=Vc(),n=xe(t,!0);D(()=>se(n,Me.items.length>0?`Escolha um render na galeria.`:`Nenhum render salvo ainda.`)),A(e,t)};k(dt,e=>{t.job&&P(_)!==`failed`&&P(y)===0?e(ft):P(_)===`failed`?e(pt,1):!t.job&&!P(E)&&e(mt,2)});var ht=F(dt,2),gt=e=>{var n=Gc(),r=M(n),i=e=>{var t=ce(),n=fe(t);ae(n,()=>P(ee),e=>{It(e,{get src(){return P(ee)}})}),A(e,t)},a=e=>{var t=Uc(),n=fe(t),r=F(n,2),i=e=>{var t=Hc();D(()=>{Ce(t,`src`,P(ee)),Ce(t,`alt`,`Render salvo de ${P(E).project??``}`)}),A(e,t)};k(r,e=>{P(ee)&&e(i)}),D(()=>Ce(n,`src`,P(E).thumb)),A(e,t)};k(r,e=>{P(E).panorama&&P(ee)?e(i):e(a,-1)});var o=F(r,2),s=e=>{var t=Wc(),n=M(t);Fe(n,{name:`left`,size:14}),le(),O(t),j(`click`,t,()=>N(E,null)),A(e,t)};k(o,e=>{t.job&&e(s)}),O(n),A(e,n)};k(ht,e=>{P(E)&&e(gt)});var _t=F(ht,2),vt=e=>{var t=Kc(),n=F(M(t)),r=F(n),i=M(r);let a;O(r),O(t),D(e=>{se(n,` ${P(Ie)??``} `),a=_e(i,``,a,{width:e})},[()=>`${P(b)?Math.min(100,P(y)/P(b)*100):0}%`]),A(e,t)};k(_t,e=>{t.job&&P(y)>0&&!P(E)&&P(_)!==`done`&&e(vt)});var yt=F(_t,2),bt=e=>{var t=Jc();let n;var r=M(t),i=e=>{var t=qc();let n;D(()=>n=_e(t,``,n,{left:`${P(c).x*100}%`,top:`${P(c).y*100}%`,width:`${P(c).width*100}%`,height:`${P(c).height*100}%`})),A(e,t)};k(r,e=>{P(c)&&e(i)}),O(t),D(()=>n=_e(t,``,n,{left:`${P(V).left??``}px`,top:`${P(V).top??``}px`,width:`${P(V).width??``}px`,height:`${P(V).height??``}px`})),j(`pointerdown`,t,Xe),j(`pointermove`,t,Ze),j(`pointerup`,t,Qe),oe(`pointercancel`,t,Qe),A(e,t)};k(yt,e=>{P(s)&&P(V)&&!P(E)&&e(bt)});var xt=F(yt,2),St=e=>{var t=Yc(),n=M(t);Fe(n,{name:`left`,size:14}),le(),O(t),j(`click`,t,Ke),A(e,t)};k(xt,e=>{P(a)&&!P(E)&&e(St)});var Ct=F(xt,2),wt=e=>{var t=Zc(),n=M(t),r=F(n),i=e=>{var t=Xc();j(`click`,t,()=>(P(te)?.undo?.(),N(te,null))),A(e,t)};k(r,e=>{P(te).undo&&e(i)}),O(t),D(()=>se(n,`${P(te).text??``} `)),A(e,t)};k(Ct,e=>{P(te)&&e(wt)}),O(ot),Se(ot,e=>f=e,()=>f);var H=F(ot,2),U=e=>{var t=tl(),r=M(t),i=M(r);let o;var c=F(i,2);let l;O(r);var u=F(r,2),d=e=>{var t=Qc(),n=M(t);let r;O(t),D(()=>{n.disabled=!P(a)&&P(y)===0,r=ge(n,1,`svelte-qhkvja`,null,r,{on:P(s)||P(a)!==null})}),j(`click`,n,()=>N(s,!P(s))),A(e,t)};k(u,e=>{!R.panorama&&!P(n)&&e(d)});var f=F(u,2);Te(f,21,()=>Ae,e=>e.id,(e,t)=>{var n=$c();let r;var i=xe(n,!0);D(()=>{r=ge(n,1,`svelte-qhkvja`,null,r,{on:R.quality===P(t).id}),se(i,P(t).label)}),j(`click`,n,()=>R.set({quality:P(t).id})),A(e,n)}),O(f);var p=F(f,2);Te(p,21,()=>ke,e=>e.id,(e,t)=>{var n=$c();let r;var i=xe(n,!0);D(()=>{Ce(n,`title`,P(t).long===null?`A melhor imagem que este computador termina no tempo da qualidade`:`${P(t).long} pontos no lado maior`),r=ge(n,1,`svelte-qhkvja`,null,r,{on:R.size===P(t).id}),se(i,P(t).label)}),j(`click`,n,()=>R.set({size:P(t).id})),A(e,n)}),O(p);var m=F(p,2);Te(m,21,()=>je,e=>e.id,(e,t)=>{var n=$c();let r;var i=xe(n,!0);D(()=>{r=ge(n,1,`svelte-qhkvja`,null,r,{on:R.format===P(t).id}),se(i,P(t).label)}),j(`click`,n,()=>R.set({format:P(t).id})),A(e,n)}),O(m);var h=F(m,2),g=M(h);Fe(g,{name:`light`,size:15});var v=F(g,2);ye(v),O(h);var b=F(h,4),x=e=>{var t=el(),n=xe(t,!0);D(()=>se(n,P(Ie))),A(e,t)};k(b,e=>{(P(y)===0||P(_)===`done`||P(_)===`failed`)&&e(x)});var S=F(b,2),w=xe(S,!0);O(t),D(()=>{o=ge(i,1,`svelte-qhkvja`,null,o,{on:!R.panorama}),l=ge(c,1,`svelte-qhkvja`,null,l,{on:R.panorama}),Ce(h,`title`,`${P(We)??``} · duplo clique volta ao automático`),Ce(v,`min`,-Ne.most),Ce(v,`max`,Ne.most),Ce(v,`step`,Ne.step),he(v,P(B)),S.disabled=P(y)===0||P(T)||P(C)===P(y),se(w,P(T)?`Salvando…`:P(C)===P(y)&&P(y)>0?`Salvo`:`Salvar`)}),j(`click`,i,()=>R.set({panorama:!1})),j(`click`,c,()=>R.set({panorama:!0})),j(`dblclick`,v,()=>Ue(0)),j(`input`,v,e=>Ue(Number(e.currentTarget.value))),j(`click`,S,$e),A(e,t)};k(H,e=>{t.job&&e(U)}),O(at);var Tt=F(at,2),Et=F(M(Tt),2),W=e=>{var t=nl();A(e,t)};k(Et,e=>{Me.items.length===0&&e(W)});var Dt=F(Et,2);Te(Dt,21,()=>Me.items,e=>e.id,(e,n)=>{var r=rl();let i;var a=M(r),o=xe(a),s=F(a,2),c=M(s),l=xe(c),u=F(c,2),d=M(u),f=M(d);Fe(f,{name:`download`,size:15}),O(d);var p=F(d,2),m=M(p);Fe(m,{name:`export`,size:15}),O(p);var h=F(p,2),g=M(h);Fe(g,{name:`share`,size:15}),O(h);var _=F(h,2),v=M(_);Fe(v,{name:`trash`,size:15}),O(_),O(u),O(s),O(r),D((e,t,a,s,u)=>{i=ge(r,1,`svelte-qhkvja`,null,i,{on:P(E)?.id===P(n).id,fresh:P(re)===P(n).id}),Ce(o,`src`,P(n).thumb),Ce(o,`alt`,`Render de ${P(n).project??``}`),Ce(c,`title`,P(n).view),se(l,`${P(n).view?`${P(n).view} · `:``}${e??``} · ${t??``}`),Ce(d,`title`,`Baixar (${a??``})`),Ce(p,`title`,`Exportar como ${s??``}`),Ce(p,`aria-label`,`Exportar como ${u??``}`)},[()=>rt(P(n).at),()=>P(n).format.toUpperCase(),()=>P(n).format.toUpperCase(),()=>et(P(n).format).toUpperCase(),()=>et(P(n).format).toUpperCase()]),j(`click`,a,()=>N(E,t.job&&P(E)?.id===P(n).id?null:P(n),!0)),j(`click`,d,()=>Me.download(P(n))),j(`click`,p,()=>Me.download(P(n),et(P(n).format))),j(`click`,h,()=>tt(P(n))),j(`click`,_,()=>nt(P(n))),A(e,r)}),O(Dt),O(Tt),O(it),D(()=>ct=ge(st,1,`backdrop svelte-qhkvja`,null,ct,{shown:t.job!==null&&P(y)>0&&!P(E)})),A(e,it),we()}ue([`click`,`pointerdown`,`pointermove`,`pointerup`,`dblclick`,`input`]);export{al as t};