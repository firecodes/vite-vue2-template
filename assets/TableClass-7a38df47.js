const m=function(){const t={};let i=null;return t.init=function(a){i=a,console.log("page.init ",i)},t.getData=function(){return Array.from({length:1e3}).map((n,e)=>({key:e,name:`Edward King ${e}`,age:32,address:`London, Park Lane no. ${e}`,row:`row. ${e}`,row1:`row1. ${e}`,row2:`row2. ${e}`}))},t.getColumns=function(){return[{type:"selection",fixed:"left"},{title:"Name",key:"name",width:200,fixed:"left"},{title:"Age",key:"age",width:100,fixed:"left"},{title:"Row",key:"row"},{title:"Row1",key:"row1"},{title:"Row2",key:"row2",width:100,fixed:"right"},{title:"Address",key:"address",width:200,fixed:"right"}]},t.getRandomData=function(){return Array.from({length:1e3}).map((n,e)=>({key:e,name:`Edward King ${e}`,age:32,address:`London, Park Lane no. ${e}`,row:`row. ${e}`,row1:`row1. ${e}`,row2:`row2. ${e}`}))},t.getQueryData=function(a=100){return new Promise(n=>{const e=t.getSuperTableData(a);n(e)})},t.getSuperTableData=function(a=100){const n=["https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg","https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"];return Array.from({length:a}).map((d,l)=>(()=>{let r="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",o="https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg";return l!==0&&(r="image @{index}",o=n[l%n.length]),{src:r,maxSrc:o,$num:l,Active:1,_state:"modified",Recurring:0,Duration:5,CalendarUID:-1,Notes:"",ActualFinish:null,Start:"2020-06-26T00:00:00",PredecessorLink:[],Work:40,LateStart:"2020-06-26T00:00:00",expanded:!0,ConstraintDate:null,Finish:"2020-07-02T23:59:59",ActualStart:null,OutlineLevel:1,ID:1,Milestone:0,OutlineNumber:"1",Priority:500,l1O10o:"2020-06-26T00:00:00",Manual:0,_uid:117,IgnoreResourceCalendar:0,Rollup:!1,EarnedValueMethod:0,TotalSlack:0,ConstraintType:0,EffortDriven:1,Name:"项目范围规划",EarlyFinish:"2020-07-02T23:59:59",ol10Oo:"2020-07-02T23:59:59",FixedDate:0,_pid:-1,PercentComplete:0}})())},t.getSuperTableColumns=function(){return[{name:"$num",label:"Num",width:100},{name:"Status",label:"状态",width:100},{name:"checkcolumn",label:"选择列",width:100},{name:"ID",label:"ID",width:100,fixed:!0},{name:"Name",label:"名称",width:100,fixed:!0},{name:"Manual",label:"任务模式",width:100,fixed:!0},{name:"TaskType",label:"任务类型",width:100,fixed:!0},{name:"PredecessorLink",label:"前置关系",width:100,fixed:"right"},{name:"Duration",label:"工期",width:100,fixed:"right"},{name:"Work",label:"工时",width:100},{name:"PercentComplete",label:"完成百分比",width:100},{name:"Assignments",label:"资源分配",width:100},{name:"Start",label:"开始时间",width:100,hidden:!0},{name:"Finish",label:"完成时间",width:100,hidden:!0},{name:"ActualStart",label:"实际开始时间",width:100},{name:"ActualFinish",label:"实际完成时间",width:100},{name:"EarlyStart",label:"最早开始时间",width:100},{name:"EarlyFinish",label:"最早完成时间",width:100},{name:"LateStart",label:"最晚开始时间",width:100},{name:"LateFinish",label:"最晚完成时间",width:100},{name:"TotalSlack",label:"可宽延的总时间",width:100},{name:"Critical",label:"关键任务",width:100},{name:"ConstraintType",label:"限制类型",width:100},{name:"ConstraintDate",label:"限制日期",width:100},{name:"Deadline",label:"最后期限",width:100},{name:"WBS",label:"WBS",width:100},{name:"TaskStatus",label:"任务状态",width:100},{name:"Department",label:"部门",width:100},{name:"Principal",label:"负责人",width:100}]},t}();export{m};