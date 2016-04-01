define("echarts/chart/eventRiver",["require","./base","../layout/eventRiver","zrender/shape/Polygon","../component/axis","../component/grid","../component/dataZoom","../config","../util/ecData","../util/date","zrender/tool/util","zrender/tool/color","../chart"],function(e){function t(e,t,a,i,o){r.call(this,e,t,a,i,o);var n=this;n._ondragend=function(){n.isDragend=!0},this.refresh(i)}var r=e("./base"),a=e("../layout/eventRiver"),i=e("zrender/shape/Polygon");e("../component/axis"),e("../component/grid"),e("../component/dataZoom");var o=e("../config");o.eventRiver={zlevel:0,z:2,clickable:!0,legendHoverLink:!0,itemStyle:{normal:{borderColor:"rgba(0,0,0,0)",borderWidth:1,label:{show:!0,position:"inside",formatter:"{b}"}},emphasis:{borderColor:"rgba(0,0,0,0)",borderWidth:1,label:{show:!0}}}};var n=e("../util/ecData"),l=e("../util/date"),h=e("zrender/tool/util"),s=e("zrender/tool/color");return t.prototype={type:o.CHART_TYPE_EVENTRIVER,_buildShape:function(){var e=this.series;this.selectedMap={},this._dataPreprocessing();for(var t=this.component.legend,r=[],i=0;i<e.length;i++)if(e[i].type===this.type){e[i]=this.reformOption(e[i]),this.legendHoverLink=e[i].legendHoverLink||this.legendHoverLink;var o=e[i].name||"";if(this.selectedMap[o]=t?t.isSelected(o):!0,!this.selectedMap[o])continue;this.buildMark(i),r.push(this.series[i])}a(r,this._intervalX,this.component.grid.getArea()),this._drawEventRiver(),this.addShapeList()},_dataPreprocessing:function(){for(var e,t,r=this.series,a=0,i=r.length;i>a;a++)if(r[a].type===this.type){e=this.component.xAxis.getAxis(r[a].xAxisIndex||0);for(var o=0,n=r[a].data.length;n>o;o++){t=r[a].data[o].evolution;for(var h=0,s=t.length;s>h;h++)t[h].timeScale=e.getCoord(l.getNewDate(t[h].time)-0),t[h].valueScale=Math.pow(t[h].value,.8)}}this._intervalX=Math.round(this.component.grid.getWidth()/40)},_drawEventRiver:function(){for(var e=this.series,t=0;t<e.length;t++){var r=e[t].name||"";if(e[t].type===this.type&&this.selectedMap[r])for(var a=0;a<e[t].data.length;a++)this._drawEventBubble(e[t].data[a],t,a)}},_drawEventBubble:function(e,t,r){var a=this.series,o=a[t],l=o.name||"",h=o.data[r],d=[h,o],u=this.component.legend,v=u?u.getColor(l):this.zr.getColor(t),c=this.deepMerge(d,"itemStyle.normal")||{},p=this.deepMerge(d,"itemStyle.emphasis")||{},f=this.getItemStyleColor(c.color,t,r,h)||v,g=this.getItemStyleColor(p.color,t,r,h)||("string"==typeof f?s.lift(f,-.2):f),m=this._calculateControlPoints(e),x={zlevel:o.zlevel,z:o.z,clickable:this.deepQuery(d,"clickable"),style:{pointList:m,smooth:"spline",brushType:"both",lineJoin:"round",color:f,lineWidth:c.borderWidth,strokeColor:c.borderColor},highlightStyle:{color:g,lineWidth:p.borderWidth,strokeColor:p.borderColor},draggable:"vertical",ondragend:this._ondragend};x=new i(x),this.addLabel(x,o,h,e.name),n.pack(x,a[t],t,a[t].data[r],r,a[t].data[r].name),this.shapeList.push(x)},_calculateControlPoints:function(e){var t=this._intervalX,r=e.y,a=e.evolution,i=a.length;if(!(1>i)){for(var o=[],n=[],l=0;i>l;l++)o.push(a[l].timeScale),n.push(a[l].valueScale);var h=[];h.push([o[0],r]);var l=0;for(l=0;i-1>l;l++)h.push([(o[l]+o[l+1])/2,n[l]/-2+r]);for(h.push([(o[l]+(o[l]+t))/2,n[l]/-2+r]),h.push([o[l]+t,r]),h.push([(o[l]+(o[l]+t))/2,n[l]/2+r]),l=i-1;l>0;l--)h.push([(o[l]+o[l-1])/2,n[l-1]/2+r]);return h}},ondragend:function(e,t){this.isDragend&&e.target&&(t.dragOut=!0,t.dragIn=!0,t.needRefresh=!1,this.isDragend=!1)},refresh:function(e){e&&(this.option=e,this.series=e.series),this.backupShapeList(),this._buildShape()}},h.inherits(t,r),e("../chart").define("eventRiver",t),t}),define("echarts/layout/eventRiver",["require"],function(){function e(e,r,o){function n(e,t){var r=e.importance,a=t.importance;return r>a?-1:a>r?1:0}for(var l=4,h=0;h<e.length;h++){for(var s=0;s<e[h].data.length;s++){null==e[h].data[s].weight&&(e[h].data[s].weight=1);for(var d=0,u=0;u<e[h].data[s].evolution.length;u++)d+=e[h].data[s].evolution[u].valueScale;e[h].data[s].importance=d*e[h].data[s].weight}e[h].data.sort(n)}for(var h=0;h<e.length;h++){null==e[h].weight&&(e[h].weight=1);for(var d=0,s=0;s<e[h].data.length;s++)d+=e[h].data[s].weight;e[h].importance=d*e[h].weight}e.sort(n);for(var v=Number.MAX_VALUE,c=0,h=0;h<e.length;h++)for(var s=0;s<e[h].data.length;s++)for(var u=0;u<e[h].data[s].evolution.length;u++){var p=e[h].data[s].evolution[u].timeScale;v=Math.min(v,p),c=Math.max(c,p)}v=~~v,c=~~c;for(var f=function(){var e=c-v+1+~~r;if(0>=e)return[0];for(var t=[];e--;)t.push(0);return t}(),g=f.slice(0),m=[],x=0,y=0,h=0;h<e.length;h++)for(var s=0;s<e[h].data.length;s++){var b=e[h].data[s];b.time=[],b.value=[];for(var _,S=0,u=0;u<e[h].data[s].evolution.length;u++)_=e[h].data[s].evolution[u],b.time.push(_.timeScale),b.value.push(_.valueScale),S=Math.max(S,_.valueScale);a(b,r,v),b.y=i(g,b,function(e,t){return e.ypx[t]}),b._offset=i(f,b,function(){return l}),x=Math.max(x,b.y+S),y=Math.max(y,b._offset),m.push(b)}t(m,o,x,y)}function t(e,t,r,a){for(var i=t.height,o=a/i>.5?.5:1,n=t.y,l=(t.height-a)/r,h=0,s=e.length;s>h;h++){var d=e[h];d.y=n+l*d.y+d._offset*o,delete d.time,delete d.value,delete d.xpx,delete d.ypx,delete d._offset;for(var u=d.evolution,v=0,c=u.length;c>v;v++)u[v].valueScale*=l}}function r(e,t,r,a){if(e===r)throw new Error("x0 is equal with x1!!!");if(t===a)return function(){return t};var i=(t-a)/(e-r),o=(a*e-t*r)/(e-r);return function(e){return i*e+o}}function a(e,t,a){var i=~~t,o=e.time.length;e.xpx=[],e.ypx=[];for(var n,l=0,h=0,s=0,d=0,u=0;o>l;l++){h=~~e.time[l],d=e.value[l]/2,l===o-1?(s=h+i,u=0):(s=~~e.time[l+1],u=e.value[l+1]/2),n=r(h,d,s,u);for(var v=h;s>v;v++)e.xpx.push(v-a),e.ypx.push(n(v))}e.xpx.push(s-a),e.ypx.push(u)}function i(e,t,r){for(var a,i=0,o=t.xpx.length,n=0;o>n;n++)a=r(t,n),i=Math.max(i,a+e[t.xpx[n]]);for(n=0;o>n;n++)a=r(t,n),e[t.xpx[n]]=i+a;return i}return e});