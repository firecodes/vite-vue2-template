import{n as a}from"./index-34047587.js";const r={data(){return{url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",previewSrcList:this.getData()}},computed:{},created(){},methods:{getData(){const s=[{src:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",maxSrc:"https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg"}],e=["https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg","https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"],t=Array.from({length:100}).map((o,c)=>({key:c,src:`image ${c}`,maxSrc:e[c%e.length]}));return s.concat(t)}}};var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"demo-image__preview"},[t("a-image",{staticStyle:{width:"100px",height:"100px"},attrs:{lazy:"",src:e.url,"preview-src-list":e.previewSrcList}}),t("h3",[e._v("点击图片显示大图，大小图显示不对，是参数没有对应,小图id和大图id")])],1)},m=[],p=a(r,n,m,!1,null,null,null,null);const l=p.exports;export{l as default};