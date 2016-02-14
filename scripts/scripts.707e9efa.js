"use strict";angular.module("cop21App",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","angular-loading-bar"]).config(["$routeProvider",function(a){a.when("/viz",{templateUrl:"views/viz.html",controller:"VizCtrl"}).otherwise({redirectTo:"/viz"})}]).config(["cfpLoadingBarProvider",function(a){a.includeSpinner=!1}]),angular.module("cop21App").constant("TABLES_ID","1W9jjSjJ5Lj84hmR7fJirW4CaG745-gXsQZi7vLPJJBA").constant("DELEGATIONS_ID","15qB8XYJC-rGobvEhT4ijuK_sBXByt_t3Wy8zjEn_t5s").constant("EDGES_ID","1K6tPH4kD0vFxcK2j5eiFzTRpyo4oNvLxoSm1uT9usk4"),angular.module("cop21App").controller("MainCtrl",["$scope","apiService","EDGES_ID","parseGdocDataFilter",function(a,b,c,d){b.getGoogleDriveDoc(c,{tqx:"responseHandler:JSON_CALLBACK"}).then(function(a){console.log(d(a))},function(a){console.log(a)})}]),angular.module("cop21App").controller("VizCtrl",["$scope","$interval","EDGES_ID","TABLES_ID","DELEGATIONS_ID","apiService","getStepsFilter","parseSankeyFilter","tableNetworkFilter","cfpLoadingBar",function(a,b,c,d,e,f,g,h,i,j){j.start(),a.sankeyFull=!1,a.firstGraph,a.allTables,a.allDelegations,a.allEdges,a.allTablesMap={},a.allDelegationsMap={},a.steps,a.lastSteps,a.currentStep,a.maxSize=10,a.graphData={},a.sankeyData,a.sankeyDataFull,a.update=!0,a.autoplay=!1,a.playModel=0,a.pauseModel=1,a.updateData=function(){a.firstGraph=!1,a.allTables=a.allTablesStep.filter(function(b){return b.step==a.lastSteps}),a.allTables.map(function(b){a.allTablesMap[b.id]=b.name}),a.graphData.tables=i(a.allEdges.filter(function(b){return b.step==a.currentStep||b.step==a.currentStep-1}),a.allTables),a.graphData.delegations=a.allEdges.filter(function(b){return b.step==a.currentStep}),1==a.currentStep?a.sankeyData=h(a.allEdges.filter(function(b){return b.step==a.currentStep||b.step==a.currentStep+1})):a.sankeyData=h(a.allEdges.filter(function(b){return b.step==a.currentStep||b.step==a.currentStep-1})),a.sankeyDataFull=h(a.allEdges),a.update=a.update?!1:!0};var k,l=function(){angular.isDefined(k)&&(b.cancel(k),k=void 0)};a.autoplay=function(){a.playModel=1,a.pauseModel=0,k=b(function(){a.currentStep==a.lastSteps?(l(),a.playModel=0,a.pauseModel=1):(a.currentStep++,a.updateData(),a.playModel=1,a.pauseModel=0)},5e3)},a.stopplay=function(){l(),a.playModel=0,a.pauseModel=1},a.updateStep=function(){a.firstGraph=!0,j.start(),f.getTable(e).then(function(b){a.allDelegations=b,j.set(.3),f.getTable(d).then(function(b){a.allTablesStep=b,j.set(.6),f.getTable(c).then(function(b){j.set(.9),j.complete(),a.steps=g(b),a.lastSteps=a.steps[a.steps.length-1],a.currentStep=a.lastSteps,a.allEdges=b,a.allTables=a.allTablesStep.filter(function(b){return b.step==a.lastSteps}),a.allDelegations.map(function(b){a.allDelegationsMap[b.id]=b.name}),a.allTables.map(function(b){a.allTablesMap[b.id]=b.name}),a.delegationsHistory=d3.nest().key(function(a){return a.entity}).entries(a.allEdges),a.delegationsHistory=a.delegationsHistory.map(function(b){return{entity:b.key,history:b.values.map(function(b){return a.allTablesMap[b.delegation]})}}),a.graphData.tables=i(a.allEdges.filter(function(b){return b.step==a.currentStep||b.step==a.currentStep-1}),a.allTables),a.graphData.delegations=a.allEdges.filter(function(b){return b.step==a.currentStep}),a.sankeyData=h(a.allEdges.filter(function(b){return b.step==a.currentStep||b.step==a.currentStep-1})),a.sankeyDataFull=h(a.allEdges),a.update=a.update?!1:!0},function(a){console.log(a)})},function(a){console.log(a)})},function(a){console.log(a)})},a.openSankey=function(){a.sankeyFull=!0},a.closeSankey=function(){a.sankeyFull=!1},a.updateStep()}]),angular.module("cop21App").controller("UpdateCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("cop21App").factory("apiService",["$q","$http",function(a,b){var c="https://docs.google.com/spreadsheets/d/";return{getGoogleDriveDoc:function(d,e){var f=a.defer();return b({method:"JSONP",url:c+d+"/gviz/tq",params:e}).success(function(a){f.resolve(a)}).error(function(){f.reject("An error occured while fetching data")}),f.promise},getFile:function(c){var d=a.defer();return b.get(c).success(function(a){d.resolve(a)}).error(function(){d.reject("An error occured while fetching file")}),d.promise},getTable:function(b){var c=a.defer();return Tabletop.init({key:b,simpleSheet:!0,parseNumbers:!0,callback:function(a,b){c.resolve(a)}}),c.promise}}}]),angular.module("cop21App").filter("parseGdocData",function(){return function(a){var b=[];return a.table.rows.forEach(function(c){var d={};c.c.forEach(function(b,c){d[a.table.cols[c].label]=b.v}),b.push(d)}),b}}),angular.module("cop21App").controller("MockupCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("cop21App").directive("graph",function(){return{restrict:"A",link:function(a,b,c){var d=cop21.network().width(b.width()).height(b.height()),e=d3.select(b[0]);a.$watch("update",function(b,c){b!=c&&e.datum(a.graphData).call(d.allDelegationsMap(a.allDelegationsMap).delegationsHistory(a.delegationsHistory).first(a.firstGraph))})}}}),angular.module("cop21App").filter("parseSankey",function(){return function(a){var b={nodes:[],links:[]},c=d3.nest().key(function(a){return a.entity}).entries(a),d=[];c.forEach(function(a){for(var b=a.values.length,c=b-1;c>0;c--){var e={},f=a.values[c].delegation+"_"+a.values[c].step,g=a.values[c-1].delegation+"_"+a.values[c-1].step;e.source=g,e.target=f,d.push(e)}});var e=d3.nest().key(function(a){return a.source+"-"+a.target}).entries(d);e.forEach(function(a){var c=a.key.split("-"),d={};d.source=c[0],d.target=c[1],d.value=a.values.length,b.links.push(d)});var f=d3.nest().key(function(a){return a.source}).entries(d);f=f.map(function(a){return a.key});var g=d3.nest().key(function(a){return a.target}).entries(d);g=g.map(function(a){return a.key});var h=f.concat(g);h.forEach(function(a,c){a&&b.nodes.push({name:a,id:c})});var i={};return b.nodes.forEach(function(a){i[a.name]=a}),b.links=b.links.map(function(a){return{source:i[a.source],target:i[a.target],value:a.value}}),b}}),angular.module("cop21App").directive("sankey",function(){return{restrict:"A",link:function(a,b,c){var d=cop21.sankey().width(b.width()).height(b.height()),e=d3.select(b[0]);a.$watch("update",function(b,c){if(b!=c){var f=1==a.currentStep?2:a.currentStep;d.allTablesMap(a.allTablesMap).currentStep(f),e.datum(a.sankeyData).call(d)}})}}}),angular.module("cop21App").filter("tableNetwork",function(){return function(a,b){var c={nodes:[],links:[]},d=d3.nest().key(function(a){return a.step}).entries(a).map(function(a){return a.key}),e=[d[d.length-2],d[d.length-1]],f=a.filter(function(a){return a.step.toString()==e[0]||a.step.toString()==e[1]}),g=d3.nest().key(function(a){return a.entity}).key(function(a){return a.delegation}).entries(f),h=[];g.forEach(function(a){if(a.values.length>1){var b=[a.values[0].key,a.values[1].key];b.sort(function(a,b){return d3.ascending(parseInt(a.split("_")[1]),parseInt(b.split("_")[1]))});var c={source:b[0],target:b[1]};h.push(c)}});var i=a.filter(function(a){return a.step.toString()==e[1]}),j=d3.nest().key(function(a){return a.delegation}).rollup(function(a){return a.length}).entries(i),k={};b.forEach(function(a,b){k[a.id]=b;var c=j.filter(function(b){return a.id==b.key})[0];c?a.degree=c.values:a.degree=0});var l=d3.nest().key(function(a){return a.source+"-"+a.target}).entries(h).map(function(a){return{source:k[a.key.split("-")[0]],target:k[a.key.split("-")[1]],value:a.values.length}});return c.nodes=b,c.links=l,c}}),angular.module("cop21App").filter("getSteps",function(){return function(a){var b,c=d3.nest().key(function(a){return a.step}).entries(a).map(function(a){return parseInt(a.key)});return b=c.sort(function(a,b){return d3.ascending(a,b)})}}),angular.module("cop21App").directive("fullSankey",function(){return{restrict:"A",link:function(a,b,c){{var d=cop21.sankey().width(b.width()).height(b.height()).margin({top:0,right:50,bottom:50,left:50}),e=d3.select(b[0]);1==a.currentStep?2:a.currentStep}d.allTablesMap(a.allTablesMap).currentStep(null),e.datum(a.sankeyDataFull).call(d),a.$watch("update",function(b,c){if(b!=c){{1==a.currentStep?2:a.currentStep}d.allTablesMap(a.allTablesMap).currentStep(null),e.datum(a.sankeyDataFull).call(d)}})}}});