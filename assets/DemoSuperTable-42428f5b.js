var o=(s,e,a)=>new Promise((i,r)=>{var u=t=>{try{n(a.next(t))}catch(l){r(l)}},_=t=>{try{n(a.throw(t))}catch(l){r(l)}},n=t=>t.done?i(t.value):Promise.resolve(t.value).then(u,_);n((a=a.apply(s,e)).next())});import{m}from"./TableClass-7a38df47.js";import{n as c}from"./index-34047587.js";const d={data(){return{data:[],columns:[]}},computed:{},created(){this.TableClass=m,this.TableClass.init(),this.init()},methods:{init(){return o(this,null,function*(){this.columns=this.TableClass.getSuperTableColumns(),this.TableClass.getQueryData(100*100).then(s=>{this.data=s})})}}};var p=function(){var e=this,a=e._self._c;return a("div",{staticClass:"about"},[a("ASuperTable",{attrs:{columns:e.columns,data:e.data}})],1)},h=[],b=c(d,p,h,!1,null,null,null,null);const C=b.exports;export{C as default};
