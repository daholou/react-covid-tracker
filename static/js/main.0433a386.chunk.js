(this["webpackJsonpcovid-tracker"]=this["webpackJsonpcovid-tracker"]||[]).push([[0],{108:function(e,t){},110:function(e,t){},123:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(12),s=n.n(o),i=(n(83),n(84),n(55),n(26)),c=n(27),l=n(32),d=n(31),h=n(137),u=n(34),m=n(1);function f(e){return Object(m.jsx)(h.a.Item,{onClick:function(){e.onClick(e.series)},action:!0,variant:e.series.active?"success":"",className:"unselectable-text",children:Object(m.jsx)(b,{isChecked:e.series.active,name:e.series.name})})}function b(e){return Object(m.jsx)(u.a,{type:"checkbox",label:e.name,checked:e.isChecked,onChange:function(){}})}var v=n(71),j=n(128),g=n(129),O=n(132);function p(e){return Object(m.jsx)(O.a.Group,{controlId:"search.ControlSearch",children:Object(m.jsx)(O.a.Control,{type:"text",value:e.keyword,placeholder:"Search for a location",onChange:function(t){var n=t.target.value;e.setKeyword(n)}})})}var x=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).onClick=function(e){a.props.onToggleActiveTS(e)},a.onKeywordChange=function(e){a.setState({mKeyword:e})},a.onSelectAll=function(e){a.props.onSelectAll(e)},a.state={mKeyword:""},a}return Object(c.a)(n,[{key:"render",value:function(){var e=this,t=this.props.series.data,n=this.state.mKeyword,a=t.slice();return a.sort((function(e,t){return e.active===t.active?e.name.localeCompare(t.name):e.active?-1:1})),Object(m.jsxs)("div",{children:[Object(m.jsx)("div",{className:"head-country centered",children:Object(m.jsxs)(v.a,{children:[Object(m.jsx)(j.a,{className:"justify-content-center",children:Object(m.jsx)(p,{keyword:n,setKeyword:this.onKeywordChange})}),Object(m.jsxs)(j.a,{className:"justify-content-center",children:[Object(m.jsx)(g.a,{className:"btn-sm country-button",onClick:function(){return e.onSelectAll(!0)},variant:"success",children:"Select all"}),Object(m.jsx)(g.a,{className:"btn-sm country-button",onClick:function(){return e.onSelectAll(!1)},variant:"danger",children:"Clear all"})]})]})}),Object(m.jsx)(h.a,{className:"body-country",children:a.map((function(t){return(t.active||t.name.toLowerCase().startsWith(n.toLowerCase()))&&Object(m.jsx)(f,{series:t,onClick:e.onClick},t.name)}))})]})}}]),n}(a.Component),w=n(72),C=n.n(w).a.create({baseURL:"https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/"}),S=n(73);function y(e){return("00"+e.toString(16)).slice(-2)}function T(e){return function(e,t,n){var a=Math.floor(6*e),r=6*e-a,o=n*(1-t),s=n*(1-r*t),i=n*(1-(1-r)*t),c=0,l=0,d=0;switch(a%6){case 0:c=n,l=i,d=o;break;case 1:c=s,l=n,d=o;break;case 2:c=o,l=n,d=i;break;case 3:c=o,l=s,d=n;break;case 4:c=i,l=o,d=n;break;case 5:c=n,l=o,d=s}l*=255,d*=255;var h=y(c*=255),u=y(l),m=y(d);return"#".concat(h).concat(u).concat(m)}(360*((.127+.618033988749895*e)%1),.5,.95)}function D(e,t){for(var n={time:[],data:[]},a=0;a<e.data.length;a++){var r={name:"",entries:[],active:!1,hexColor:"#246284"};r.name=e.data[a].name,n.data.push(r)}for(var o,s,i=function(e,t){for(var n={length:0,indicesA:[],indicesB:[]},a=0,r=0;a<e.length&&r<t.length;){var o=e[a].valueOf(),s=t[r].valueOf();o===s?(n.indicesA.push(a++),n.indicesB.push(r++),n.length++):o<s?a++:r++}return n}(e.time,t.time),c=0;c<i.length;c++){var l=i.indicesA[c],d=i.indicesB[c];n.time.push(e.time[l]);for(var h=0;h<e.data.length;h++){var u=e.data[h].entries[l],m=t.data[h].entries[d],f=(s=m,{numberOfCases:(o=u).numberOfCases+s.numberOfCases,numberOfRecoveries:o.numberOfRecoveries+s.numberOfRecoveries,numberOfDeaths:o.numberOfDeaths+s.numberOfDeaths,numberOfNewCases:o.numberOfNewCases+s.numberOfNewCases,numberOfNewRecoveries:o.numberOfNewRecoveries+s.numberOfNewRecoveries,numberOfNewDeaths:o.numberOfNewDeaths+s.numberOfNewDeaths});n.data[h].entries.push(f)}}return n}function k(e,t){if(e.length<1)throw new Error("No header!");var n=[],a=e[0],r=a.length-4;if(r<0)throw new Error("Less than 4 columns in header!");for(var o=new Array(r),s=0;s<r;s++)o[s]=new Date(a[s+4]);for(var i={},c=1;c<e.length;c++){var l=e[c];if(l.length===a.length){for(var d=new Array(r),h=0;h<r;h++)d[h]=Number(l[4+h]);var u=l[1].trim(),m={name:"",entries:[],active:!1,hexColor:"#246284"};if(u in i)m=n[i[u]];else{i[u]=n.length,m.name=u;for(var f=0;f<r;f++)m.entries.push({numberOfCases:0,numberOfDeaths:0,numberOfRecoveries:0,numberOfNewCases:0,numberOfNewDeaths:0,numberOfNewRecoveries:0});n.push(m)}for(var b=0;b<r;b++)switch(t){case 1:m.entries[b].numberOfCases+=d[b];break;case 2:m.entries[b].numberOfRecoveries+=d[b];break;case 3:m.entries[b].numberOfDeaths+=d[b]}}else console.error("Ignored row ".concat(c," / ").concat(e.length-1,". It has ")+"".concat(l.length," columns, but header has ").concat(a.length))}return n.sort((function(e,t){return e.name.localeCompare(t.name)})),{time:o,data:n}}var V=n(130),R=n(75),N=n(76),_=n.n(N);function A(e){var t=Object(m.jsxs)(O.a.Group,{id:"form.ControlMode",children:[Object(m.jsx)(O.a.Label,{children:"Select mode:"}),Object(m.jsxs)(O.a.Control,{as:"select",size:"sm",onChange:function(t){var n=t.target.value;e.onModeChange(n)},children:[Object(m.jsx)("option",{value:I.newVSTotalConfirmed,children:"New/Total Cases"}),Object(m.jsx)("option",{value:I.totalConfirmedVSTime,children:"Total Cases(t)"}),Object(m.jsx)("option",{value:I.totalRecoveredVSTime,children:"Total Recoveries(t)"}),Object(m.jsx)("option",{value:I.totalDeceasedVSTime,children:"Total Deaths(t)"}),Object(m.jsx)("option",{value:I.newConfirmedVSTime,children:"New Cases(t)"}),Object(m.jsx)("option",{value:I.newRecoveredVSTime,children:"New Recoveries(t)"}),Object(m.jsx)("option",{value:I.newDeceasedVSTime,children:"New Deaths(t)"})]})]}),n=Object(m.jsxs)(O.a.Group,{id:"form.ControlScale",children:[Object(m.jsx)(O.a.Label,{children:"Select scale:"}),Object(m.jsxs)(O.a.Control,{as:"select",size:"sm",onChange:function(t){var n=t.target.value;e.onScaleChange("log"===n)},children:[Object(m.jsx)("option",{value:"log",children:"Logarithmic"}),Object(m.jsx)("option",{value:"lin",children:"Linear"})]})]}),a=Object(m.jsxs)("div",{id:"form.ControlDays",children:["Smooth data over ",Object(m.jsx)("span",{children:Object(m.jsx)("input",{className:"input-small-number",type:"number",onChange:function(t){var n=Number(t.target.value);e.onDaysChange(n)},min:e.range.min,max:e.range.max,step:1,value:e.range.val,onKeyDown:function(e){return e.preventDefault(),!1}})})," ",e.range.val>1?"days":"day"]}),r=Object(m.jsxs)("label",{htmlFor:"double-check",children:["Show ",e.doublingRange.val," ",e.doublingRange.val>1?"days":"day"," doubling time"]}),o=Object(m.jsxs)("div",{id:"form.ControlDoublingDays",children:[Object(m.jsx)(u.a,{id:"double-check",type:"checkbox",label:r,checked:e.doShowRef,onChange:function(t){var n=t.target.checked;e.onShowRefChange(n)}}),Object(m.jsx)(O.a.Control,{type:"range",onChange:function(t){var n=Number(t.target.value);e.onDoublingDaysChange(n)},min:e.doublingRange.min,max:e.doublingRange.max,step:1,value:e.doublingRange.val})]}),s=Object(m.jsx)(u.a,{id:"legend",type:"checkbox",label:"Show legend",checked:e.doShowLegend,onChange:function(t){var n=t.target.checked;e.onShowLegendChange(n)}}),i=[I.newVSTotalConfirmed].includes(e.mode);return Object(m.jsx)("div",{className:"params-view",children:Object(m.jsx)(O.a,{children:Object(m.jsxs)(j.a,{children:[Object(m.jsx)(v.a,{children:t}),Object(m.jsx)(v.a,{children:n}),Object(m.jsxs)(v.a,{children:[Object(m.jsx)(O.a.Row,{children:a}),Object(m.jsx)(O.a.Row,{children:s})]}),i&&Object(m.jsx)(v.a,{children:o})]})})})}var L=n(135),I=Object.freeze({totalConfirmedVSTime:"total cases vs t",totalRecoveredVSTime:"total recoveries vs t",totalDeceasedVSTime:"total deaths vs t",newConfirmedVSTime:"new cases vs t",newRecoveredVSTime:"new recoveries vs t",newDeceasedVSTime:"new deaths vs t",newVSTotalConfirmed:"daily vs current cases"});function E(e){return e.toISOString().slice(0,10)}function M(e){var t=e.toISOString();return"".concat(t.slice(8,10),"/").concat(t.slice(5,7),"/").concat(t.slice(0,4))}function F(e){var t={min:Number.MAX_VALUE,max:Number.MIN_VALUE};return e.reduce((function(e,t){return e.min=Math.min(e.min,t),e.max=Math.max(e.max,t),e}),t)}var P=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).onModeChange=function(e){a.setState({mode:e})},a.onScaleChange=function(e){a.setState({isLogPlot:e})},a.onDaysChange=function(e){a.setState({numberOfDays:e})},a.onDoublingDaysChange=function(e){a.setState({doublingDays:e})},a.onShowRefChange=function(e){a.setState({doShowRef:e})},a.onShowLegendChange=function(e){a.setState({doShowLegend:e})},a.state={mode:I.newVSTotalConfirmed,numberOfDays:15,doublingDays:14,isLogPlot:!0,doShowRef:!0,doShowLegend:!0},a}return Object(c.a)(n,[{key:"timeValue",value:function(e){switch(this.state.mode){case I.totalConfirmedVSTime:return e.numberOfCases;case I.totalRecoveredVSTime:return e.numberOfRecoveries;case I.totalDeceasedVSTime:return e.numberOfDeaths;default:return 0}}},{key:"template",value:function(){return"<i><b>%{fullData.name}</b></i><br>"+(this.state.mode===I.newVSTotalConfirmed?"%{text}<br>":"")+"%{xaxis.title.text}: %{x}<br>%{yaxis.title.text}: %{y}<br><extra></extra>"}},{key:"getData",value:function(){var e=this.props.dts.data.filter((function(e){return e.active})),t=this.props.dts.time.map((function(e){return E(e)}));if(0===e.length)return[];var n,a=[],r=Number.MAX_VALUE,o=Number.MIN_VALUE,s=this.state,i=s.doShowRef,c=s.mode,l=s.doShowLegend,d=Object(R.a)(e);try{for(d.s();!(n=d.n()).done;){var h=n.value,u=this.xData(h),m=F(u.map((function(e){return Number(e)})));r=Math.min(r,m.min),o=Math.max(o,m.max);var f={type:"scatter",mode:"lines",name:h.name,x:u,y:this.yData(h),text:t,hovertemplate:this.template(),showlegend:l,line:{color:h.hexColor}};a.push(f)}}catch(O){d.e(O)}finally{d.f()}if(i&&c===I.newVSTotalConfirmed){var b=this.state.doublingDays,v=[r,o],j=v.map((function(e){return e/b})),g={type:"scatter",mode:"lines",name:"ref",x:v,y:j,line:{color:"#9335a8",dash:"dashdot"},hoverinfo:"skip",showlegend:!1};a.push(g)}return a}},{key:"xData",value:function(e){var t=this.state.mode;switch(t){case I.totalConfirmedVSTime:case I.totalRecoveredVSTime:case I.totalDeceasedVSTime:case I.newConfirmedVSTime:case I.newRecoveredVSTime:case I.newDeceasedVSTime:return this.props.dts.time.map((function(e){return E(e)}));case I.newVSTotalConfirmed:return e.entries.map((function(e){return e.numberOfCases}));default:throw new Error("Unknown mode ".concat(t))}}},{key:"smooth",value:function(e,t){for(var n=new Array(e.length),a=0;a<e.length;a++){for(var r=Math.max(0,a+1-t),o=0,s=r;s<=a;s++)o+=e[s];n[a]=o/(a-r+1)}return n}},{key:"yData",value:function(e){var t=this.state,n=t.mode,a=t.numberOfDays;switch(n){case I.totalConfirmedVSTime:return e.entries.map((function(e){return e.numberOfCases}));case I.totalRecoveredVSTime:return e.entries.map((function(e){return e.numberOfRecoveries}));case I.totalDeceasedVSTime:return e.entries.map((function(e){return e.numberOfDeaths}));case I.newConfirmedVSTime:case I.newVSTotalConfirmed:var r=e.entries.map((function(e){return e.numberOfNewCases}));return this.smooth(r,a);case I.newRecoveredVSTime:var o=e.entries.map((function(e){return e.numberOfNewRecoveries}));return this.smooth(o,a);case I.newDeceasedVSTime:var s=e.entries.map((function(e){return e.numberOfNewDeaths}));return this.smooth(s,a);default:throw new Error("Unknown mode ".concat(n))}}},{key:"xAxisTitle",get:function(){switch(this.state.mode){case I.totalRecoveredVSTime:case I.totalConfirmedVSTime:case I.totalDeceasedVSTime:case I.newConfirmedVSTime:return"Date";case I.newVSTotalConfirmed:return"Total Confirmed Cases";default:return""}}},{key:"xTickFormat",get:function(){switch(this.state.mode){case I.totalRecoveredVSTime:case I.totalConfirmedVSTime:case I.totalDeceasedVSTime:case I.newConfirmedVSTime:return"%d %b %Y";case I.newVSTotalConfirmed:return",.0f";default:return""}}},{key:"xAxisType",get:function(){var e=this.state,t=e.mode,n=e.isLogPlot;switch(t){case I.totalRecoveredVSTime:case I.totalConfirmedVSTime:case I.totalDeceasedVSTime:case I.newConfirmedVSTime:case I.newRecoveredVSTime:case I.newDeceasedVSTime:return"date";case I.newVSTotalConfirmed:return n?"log":"linear";default:return"-"}}},{key:"yAxisType",get:function(){var e=this.state,t=e.mode,n=e.isLogPlot;switch(t){case I.totalRecoveredVSTime:case I.totalConfirmedVSTime:case I.totalDeceasedVSTime:case I.newConfirmedVSTime:case I.newRecoveredVSTime:case I.newDeceasedVSTime:case I.newVSTotalConfirmed:return n?"log":"linear";default:return"-"}}},{key:"yAxisTitle",get:function(){var e=this.state,t=e.mode,n=e.numberOfDays;switch(t){case I.totalRecoveredVSTime:return"Total Recoveries";case I.totalConfirmedVSTime:return"Total Confirmed Cases";case I.totalDeceasedVSTime:return"Total Reported Deaths";case I.newConfirmedVSTime:case I.newVSTotalConfirmed:var a=n>1?"(".concat(n," days avg.)"):"";return"Daily Cases ".concat(a);default:return""}}},{key:"render",value:function(){var e=this.state.mode,t=this.props.dts.time,n="No data provided";if(t.length>=1){var a=M(t[0]),r=M(t[t.length-1]);n="Trajectory of World COVID-19 (".concat(e,") from ").concat(a," to ").concat(r)}var o={title:{text:n,font:{size:18}},xaxis:{title:{text:this.xAxisTitle,font:{size:14,color:"#3649b1"}},type:this.xAxisType,hoverformat:this.xTickFormat},yaxis:{title:{text:this.yAxisTitle,font:{size:14,color:"#3649b1"}},type:this.yAxisType,hoverformat:",.0f"},autosize:!0,legend:{x:0,y:1,font:{family:"sans-serif",size:12,color:"#000"},bgcolor:"#E2E2E2",bordercolor:"#FFFFFF",borderwidth:2}},s=this.getData(),i=s.length>0?Object(m.jsx)(_.a,{className:"graph",data:s,layout:o,config:{responsive:!0},useResizeHandler:!0}):Object(m.jsxs)(L.a,{variant:"warning",children:[Object(m.jsx)(L.a.Heading,{children:"Oops, there is no data to display !"}),Object(m.jsx)("hr",{}),Object(m.jsx)("p",{children:"Please select at least one country in the right panel to display a plot."}),Object(m.jsx)("p",{className:"mb-0",children:"If that doesn't work, try hitting your F5 key to refresh the page."}),Object(m.jsx)("p",{className:"mb-0",children:"If that doesn't work, maybe the data cannot be retrieved, or maybe you've encountered a bug."})]}),c=this.state,l={min:1,val:c.numberOfDays,max:30},d={min:1,val:c.doublingDays,max:100};return Object(m.jsxs)("div",{children:[Object(m.jsx)(j.a,{className:"body-graph",children:Object(m.jsx)("div",{className:"graph-view",children:i})}),Object(m.jsx)(j.a,{className:"footer-graph",children:Object(m.jsx)(A,{range:l,doublingRange:d,mode:e,doShowRef:this.state.doShowRef,doShowLegend:this.state.doShowLegend,onModeChange:this.onModeChange,onScaleChange:this.onScaleChange,onDaysChange:this.onDaysChange,onShowRefChange:this.onShowRefChange,onShowLegendChange:this.onShowLegendChange,onDoublingDaysChange:this.onDoublingDaysChange})})]})}}]),n}(a.Component),U=["france","spain","italy","united kingdom","india"],z=function(e){Object(l.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).onToggleActiveTS=function(e){e.active=!e.active,a.setState({})},a.onSelectAll=function(e){a.state.dts.data.forEach((function(t){return t.active=e})),a.setState({})},a.state={dts:{time:[],data:[]}},a}return Object(c.a)(n,[{key:"loadTimeSeries",value:function(e){return C.get(e).then((function(e){return e.data})).then((function(e){return Object(S.a)(e)})).then((function(e){return e.data}))}},{key:"componentDidMount",value:function(){var e=this;Promise.all([this.loadTimeSeries("time_series_covid19_confirmed_global.csv"),this.loadTimeSeries("time_series_covid19_recovered_global.csv"),this.loadTimeSeries("time_series_covid19_deaths_global.csv")]).then((function(t){var n=function(e,t,n){var a,r,o,s=k(e,1),i=k(t,2),c=k(n,3);if(console.log("C",s.data.length,s.time.length),console.log("R",i.data.length,i.time.length),console.log("D",c.data.length,c.time.length),a=s.data.length,r=i.data.length,o=c.data.length,a!==r||r!==o)throw new Error("Entries count mismatch! "+"Confirmed ".concat(s.data.length,", ")+"Recovered ".concat(i.data.length,", ")+"Deceased ".concat(c.data.length));for(var l=D(s,i),d=D(l,c),h=0;h<s.data.length;h++)d.data[h].hexColor=T(h);for(var u=0;u<s.data.length;u++){var m=d.data[u].entries,f=m.map((function(e){return e.numberOfCases+e.numberOfRecoveries+e.numberOfDeaths}));m[0].numberOfNewCases=m[0].numberOfCases,m[0].numberOfNewRecoveries=m[0].numberOfRecoveries,m[0].numberOfNewDeaths=m[0].numberOfDeaths;for(var b=1;b<m.length;b++){var v=f[b]-f[b-1],j=m[b].numberOfRecoveries-m[b-1].numberOfRecoveries,g=m[b].numberOfDeaths-m[b-1].numberOfDeaths;m[b].numberOfNewCases=v,m[b].numberOfNewRecoveries=j,m[b].numberOfNewDeaths=g}}return d}(t[0],t[1],t[2]);n.data.forEach((function(e){return e.active=U.includes(e.name.toLowerCase())})),e.setState({dts:n})}))}},{key:"render",value:function(){return Object(m.jsx)(V.a,{fluid:!0,className:"container-app",children:Object(m.jsxs)(j.a,{children:[Object(m.jsx)(v.a,{className:"col-graph-view",children:Object(m.jsx)(P,{dts:this.state.dts})}),Object(m.jsx)(v.a,{sm:2,className:"col-country",children:Object(m.jsx)(x,{series:this.state.dts,onToggleActiveTS:this.onToggleActiveTS,onSelectAll:this.onSelectAll})})]})})}}]),n}(a.Component),K=n(133),B=n(134),G=n.p+"static/media/logo.6ce24c58.svg",H=n(54),J=n(131),W=n(136);function X(e){var t=r.a.useState(!1),n=Object(H.a)(t,2),a=n[0],o=n[1],s=r.a.useState(null),i=Object(H.a)(s,2),c=i[0],l=i[1],d=r.a.useRef(null);return Object(m.jsxs)("div",{ref:d,children:[Object(m.jsx)(g.a,{onClick:function(e){o(!a),l(e.target)},variant:"primary",className:"navbar-button",children:e.buttonTitle}),Object(m.jsx)(J.a,{show:a,target:c,placement:"bottom",container:d.current,containerPadding:20,onEnter:void 0,onEntered:void 0,onEntering:void 0,onExit:void 0,onExited:void 0,onExiting:void 0,onHide:function(){o(!1)},transition:!1,rootClose:!0,popperConfig:void 0,rootCloseEvent:void 0,children:Object(m.jsxs)(W.a,{id:"custom-popover-".concat(e.popoverId),children:[Object(m.jsx)(W.a.Title,{as:"h3",children:e.popoverTitle}),Object(m.jsx)(W.a.Content,{children:e.popoverContent})]})})]})}function Y(){var e=Object(m.jsxs)("div",{children:[Object(m.jsxs)("p",{children:["This project takes inspiration from the works of ",Object(m.jsx)("a",{href:"https://aatishb.com/",target:"_blank",rel:"noreferrer",children:"Aatish Bhatia"})," and ",Object(m.jsx)("a",{href:"https://www.youtube.com/user/minutephysics",target:"_blank",rel:"noreferrer",children:"Minute Physics"}),". Credit goes to them for the original idea. Check out their original project ",Object(m.jsx)("a",{href:"https://aatishb.com/covidtrends/",target:"_blank",rel:"noreferrer",children:" over here"})," !"]}),Object(m.jsxs)("p",{children:["My objective was to recreate a similar app by using React instead of Vue, as a part of my training with React and TypeScript. The source for my version of the app can be found ",Object(m.jsx)("a",{href:"https://github.com/daholou/react-covid-tracker",target:"_blank",rel:"noreferrer",children:"right here"})," !"]})]}),t=Object(m.jsxs)("div",{children:[Object(m.jsxs)("p",{children:["The world data is provided by ",Object(m.jsx)("a",{href:"https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_time_series",target:"_blank",rel:"noreferrer",children:"Johns Hopkins University"})," ( updates daily around 23:59 UTC)."]}),Object(m.jsx)("p",{children:"I would like to thank Johns Hopkins University for making this data publicly available, this kind of project would not be possible without it."})]});return Object(m.jsxs)(K.a,{bg:"dark",variant:"dark",className:"header-app",expand:"sm",children:[Object(m.jsx)(K.a.Brand,{children:"COVID-19 Tracker"}),Object(m.jsx)(K.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(m.jsx)(K.a.Collapse,{id:"basic-navbar-nav",children:Object(m.jsxs)(B.a,{className:"mr-auto",as:"ul",children:[Object(m.jsx)(B.a.Item,{as:"li",children:Object(m.jsxs)(B.a.Link,{href:"https://reactjs.org/",target:"_blank",rel:"noreferrer",children:[Object(m.jsx)("img",{src:G,className:"App-logo",alt:"logo"}),"Powered by ReactJS"]})}),Object(m.jsx)(B.a.Item,{as:"li",children:Object(m.jsx)(X,{buttonTitle:"Credits & Source",popoverId:"credits",popoverTitle:"About this WebApp",popoverContent:e})}),Object(m.jsx)(B.a.Item,{as:"li",children:Object(m.jsx)(X,{buttonTitle:"COVID-19 World Data",popoverId:"about",popoverTitle:"Data Origin",popoverContent:t})})]})})]})}function q(){return Object(m.jsxs)("div",{className:"app-frame",children:[Object(m.jsx)(Y,{}),Object(m.jsx)(z,{})]})}var Q=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,138)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),o(e),s(e)}))};s.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(q,{})}),document.getElementById("root")),Q()},55:function(e,t,n){},83:function(e,t,n){}},[[123,1,2]]]);
//# sourceMappingURL=main.0433a386.chunk.js.map