import{n as o}from"./index-5f54572c.js";const c={name:"page-mode-item",props:{source:{type:Object,default(){return{}}}}};var d=function(){var e=this,t=e._self._c;return t("div",{staticClass:"item-inner"},[t("div",{staticClass:"head"},[t("span",[e._v("# "+e._s(e.source.index))]),t("span",[e._v(e._s(e.source.name))])]),t("div",{staticClass:"desc"},[e._v(e._s(e.source.desc))])])},m=[],g=o(c,d,m,!1,null,"4c3eddc2",null,null);const _=g.exports;const p={name:"PageModeItemList",props:{source:{type:Object,default(){return{}}},listCard:{type:Array,default(){return[]}}},data(){return{imgList:[]}},created(){console.log("created---111",this.source.index),this.getData()},mounted(){console.log("mounted---2222",this.source.index)},methods:{getData(){const n=Array.from({length:1}).map((e,t)=>({key:t,name:`Edward King ${t}`,age:32,address:`London, Park Lane no. ${t}`}));setTimeout(()=>{this.imgList=n},500)}}};var v=function(){var e=this,t=e._self._c;return t("div",{staticClass:"item-inner"},[t("div",{staticClass:"head"},[t("span",[e._v("# "+e._s(e.source.index))]),t("span",[e._v(e._s(e.source.name))])]),t("div",{staticClass:"desc"},[e._v(e._s(e.source.desc))]),e._l(e.listCard,function(a,s){return[t("el-card",{key:`img${s}`,staticClass:"box-card"},[t("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[t("span",[e._v("图片名称")]),t("el-button",{staticStyle:{float:"right",padding:"3px 0"},attrs:{type:"text"}},[e._v("操作按钮")])],1),e._l(4,function(i){return t("div",{key:i,staticClass:"text item"},[e._v(e._s("列表内容 "+i))])})],2)]})],2)},I=[],y=o(p,v,I,!1,null,"0abbcc03",null,null);const w=y.exports;function f(n=1,e=6){const t=x[1],a=[];let s=1;for(;s--;)a.push(t[1]);return`${a.join(". ")}.`}const b=["I messed up tonight I lost another fight","I still mess up but I'll just start again","I keep falling down I keep on hitting the ground","I always get up now to see what's next","Birds don't just fly they fall down and get up","Nobody learns without getting it won","I won't give up no I won't give in","Till I reach the end and then I'll start again","No I won't leave I wanna try everything","I wanna try even though I could fail","I won't give up no I won't give in","Till I reach the end and then I'll start again","No I won't leave I wanna try everything","I wanna try even though I could fail","Look at how far you've come you filled your heart with love","Baby you've done enough that cut your breath","Don't beat yourself up don't need to run so fast","Sometimes we come last but we did our best","I won't give up no I won't give in","Till I reach the end and then I'll start again","No I won't leave I wanna try everything","I wanna try even though I could fail","I won't give up no I won't give in","Till I reach the end and then I'll start again","No I won't leave I wanna try everything","I wanna try even though I could fail","I'll keep on making those new mistakes","I'll keep on making them every day","Those new mistakes"],k=["I will run I will climb I will soar","I'm undefeated","Jumping out of my skin pull the chord","Yeah I believe it","The past is everything we were don't make us who we are","So I'll dream until I make it real and all I see is stars","It's not until you fall that you fly","When your dreams come alive you're unstoppable","Take a shot chase the sun find the beautiful","We will glow in the dark turning dust to gold","And we'll dream it possible","And we'll dream it possible","I will chase I will reach I will fly","Until I'm breaking until I'm breaking","Out of my cage like a bird in the night","I know I'm changing I know I'm changing","In into something big better than before","And if it takes takes a thousand lives","Then it's worth fighting for","It's not until you fall that you fly","When your dreams come alive you're unstoppable","Take a shot chase the sun find the beautiful","We will glow in the dark turning dust to gold","And we'll dream it possible","It possible","From the bottom to the top","We're sparking wild fire's","Never quit and never stop","The rest of our lives","From the bottom to the top","We're sparking wild fire's","Never quit and never stop","It's not until you fall that you fly","When your dreams come alive you're unstoppable","Take a shot chase the sun find the beautiful","We will glow in the dark turning dust to gold","And we'll dream it possible","And we'll dream it possible"],T=["I can almost see it","That dream I'm dreamin' but","There's a voice inside my head saying","You'll never reach it","Every step I'm taking","Every move I make feels","Lost with no direction","My faith is shakin","But I I gotta keep tryin","Gotta keep my head held high","There's always gonna be another mountain","I'm always gonna wanna make it move","Always gonna be an uphill battle","Sometimes I'm gonna have to lose","Ain't about how fast I get there","Ain't about what's waitin on the other side","It's the climb","The struggles I'm facing","The chances I'm taking","Sometimes might knock me down but","No I'm not breaking","I may not know it","But these are the moments that","I'm gonna remember most yeah","Just gotta keep going","And I I gotta be strong","Just keep pushing on 'cause","There's always gonna be another mountain","I'm always gonna wanna make it move","Always gonna be an uphill battle","But Sometimes I'm gonna have to lose","Ain't about how fast I get there","Ain't about what's waitin on the other side","It's the climb","Yeah-yeah","There's always gonna be another mountain","I'm always gonna wanna make it move","Always gonna be an uphill battle","Sometimes you're gonna have to lose","Ain't about how fast I get there","Ain't about what's waitin on the other side","It's the climb","Yeah-yeah-yea","Keep on moving","Keep climbing","Keep the faith","Baby It's all about","It's all about the climb","Keep your faith","Whoa O Whoa"],x=[b,k,T],l=n=>`${n}$${Math.random().toString(16).substr(9)}`;const u=1e3,h=[];let r=u;for(;r--;){const n=u-r;h.push({index:n,name:l(n)+n,id:l(n),desc:f()})}const C={name:"PageMode",components:{ItemList:w},data(){return{listCard:[],items:h,itemComponent:_}},created(){this.getDataSS()},methods:{totop(){console.log("reach totop")},tobottom(){console.log("reach tobottom")},getDataSS(){}}};var A=function(){var e=this,t=e._self._c;return t("div",{staticClass:"example"},[t("h2",[e._v("This is page footer")]),t("div",{staticClass:"example-content"},[t("virtual-list",{ref:"vsl",staticClass:"list-page scroll-touch",attrs:{"data-key":"id","data-sources":e.items,"data-component":e.itemComponent,"data-page-visable":!0,"estimate-size":300,keeps:10,"item-class":"list-item-page","page-mode":!0,"col-split":3},on:{totop:e.totop,tobottom:e.tobottom},scopedSlots:e._u([{key:"item",fn:function(a){return[t("ItemList",{attrs:{"list-card":e.listCard,source:a.item}})]}}])}),e._m(0)],1)])},$=[function(){var n=this,e=n._self._c;return e("div",{staticClass:"bottom"},[e("h2",[n._v("This is page footer")])])}],S=o(C,A,$,!1,null,null,null,null);const L=S.exports;const W={name:"PageList",components:{pageMain:L},data(){return{}},methods:{}};var N=function(){var e=this,t=e._self._c;return t("div",{staticClass:"PageList"},[t("pageMain")],1)},M=[],B=o(W,N,M,!1,null,null,null,null);const F=B.exports;export{F as default};
