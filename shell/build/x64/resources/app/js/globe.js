$(function(){function n(n,o){n&&n.length>0&&$.each(n,o)}function o(o){var t=o.areas;t&&n(t,function(o,t){var a=[];n(t.items,function(n,o){a.push([o.y,o.x])}),WE.polygon(a,{color:t.c,opacity:0,weight:1e-5,fill:!0,fillColor:t.c,fillOpacity:.6}).addTo(i)})}var t=$("#globe_wrap"),a=Util.map.getConf();CESIUM_BASE_URL="./js/we_v2/";var i,e={center:[24.196338959003278,-1.6957170305897358],zoom:2};window.Globe={init:function(){t.show(),i||(i=new WE.map("globe_wrap",{sky:!0}),window.earth=i,WE.tileLayer(a.url,{subdomains:a.subdomains}).addTo(i)),i.setView(e.center,e.zoom);var n=Micaps.getConf("aqi_wr");if(n){var r=Util.encryURL(n.dataurl);r="http://10.14.85.116/map/test/planetary/data/1.json",Util.req(r,function(n,t){o(t),setTimeout(function(){var n=[[14.33,72.57],[58,137]];i.panInsideBounds(n)},100)})}},clear:function(){t.hide()}}});