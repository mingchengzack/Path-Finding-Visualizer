(this["webpackJsonppf-visualizer-app"]=this["webpackJsonppf-visualizer-app"]||[]).push([[0],{34:function(e,t,n){},35:function(e,t,n){},47:function(e,t,n){e.exports=n(65)},52:function(e,t,n){},53:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),r=n(27),o=n.n(r),s=(n(52),n(53),n(10)),l=n(11),c=n(15),d=n(12),u=n(16),h=n(80),p=n(81),m=n(26),f=n(45),y=(n(34),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).preventDragHandler=function(e){e.preventDefault()},n.setNodeandAnimation=function(e,t){n.setState({type:e,animation:t})},n.setNode=function(e){n.setState({type:e})},n.setAnimation=function(e){n.setState({animation:e})},n.state={x:e.node.x,y:e.node.y,type:e.node.type,animation:E.DEFAULT,canModify:!0},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"componentWillUnmount",value:function(){this.props.onRef(void 0)}},{key:"render",value:function(){var e=this,t=this.state.type,n=t===v.START?"node-start":t===v.END?"node-end":t===v.WALL?"node-wall":t===v.WEIGHT_THREE?"node-three":t===v.WEIGHT_FIVE?"node-five":t===v.WEIGHT_EIGHT?"node-eight":"",i=this.state.animation,r=i===E.VISITED?"visited":i===E.PATH?"path":i===E.GENERATE?"generate":i===E.VISITED_NOANIMATION?"visited-noanimation":i===E.PATH_NOANIMATION?"path-noanimation":"";return a.a.createElement("div",{className:"node ".concat(n," ").concat(r),onMouseDown:function(){return e.props.onMouseDown(e.state)},onMouseEnter:function(){return e.props.onMouseEnter(e.state)},onMouseUp:function(){return e.props.onMouseUp()},onDragStart:this.preventDragHandler})}}]),t}(i.Component)),v={DEFAULT:1,START:2,END:3,WALL:4,WEIGHT_THREE:5,WEIGHT_FIVE:6,WEIGHT_EIGHT:7},E={DEFAULT:1,VISITED:2,PATH:3,GENERATE:4,VISITED_NOANIMATION:5,PATH_NOANIMATION:6};function g(e,t,n){var i=[],a=[],r=!0,o=!1,s=void 0;try{for(var l,c=e[Symbol.iterator]();!(r=(l=c.next()).done);r=!0){var d=l.value,u=!0,h=!1,p=void 0;try{for(var m,f=d[Symbol.iterator]();!(u=(m=f.next()).done);u=!0){var y=m.value;a.push(y)}}catch(E){h=!0,p=E}finally{try{u||null==f.return||f.return()}finally{if(h)throw p}}}}catch(E){o=!0,s=E}finally{try{r||null==c.return||c.return()}finally{if(o)throw s}}for(t.distance=0;0!==a.length;){a.sort((function(e,t){return e.distance-t.distance}));var v=a.shift();if(v.distance===1/0)return i;if(v.isVisited=!0,i.push(v),v===n)return i;T(v,e)}return i}function N(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.prevNode;return t}function T(e,t){var n=[],i=e.x,a=e.y;a>0&&n.push(t[a-1][i]),a<t.length-1&&n.push(t[a+1][i]),i>0&&n.push(t[a][i-1]),i<t[0].length-1&&n.push(t[a][i+1]);var r=n.filter((function(e){return!e.isVisited&&e.type!==v.WALL})),o=!0,s=!1,l=void 0;try{for(var c,d=r[Symbol.iterator]();!(o=(c=d.next()).done);o=!0){var u=c.value;e.distance+u.weight<u.distance&&(u.distance=e.distance+u.weight,u.prevNode=e)}}catch(h){s=!0,l=h}finally{try{o||null==d.return||d.return()}finally{if(s)throw l}}}function A(e,t){var n=[],i=e.x,a=e.y;a>0&&n.push(t[a-1][i]),a<t.length-1&&n.push(t[a+1][i]),i>0&&n.push(t[a][i-1]),i<t[0].length-1&&n.push(t[a][i+1]);var r=n.filter((function(e){return!e.isVisited&&e.type!==v.WALL})),o=!0,s=!1,l=void 0;try{for(var c,d=r[Symbol.iterator]();!(o=(c=d.next()).done);o=!0){var u=c.value;e.distance+u.weight<u.distance&&(u.distance=e.distance+u.weight,u.totalDis=u.distance+u.euclideanDis,u.prevNode=e)}}catch(h){s=!0,l=h}finally{try{o||null==d.return||d.return()}finally{if(s)throw l}}}function I(e,t,n){var i=e.x,a=e.y;i>0&&!t[a][i-1].isVisited&&t[a][i-1].type!==v.WALL&&n.unshift(t[a][i-1]),a<t.length-1&&!t[a+1][i].isVisited&&t[a+1][i].type!==v.WALL&&n.unshift(t[a+1][i]),i<t[0].length-1&&!t[a][i+1].isVisited&&t[a][i+1].type!==v.WALL&&n.unshift(t[a][i+1]),a>0&&!t[a-1][i].isVisited&&t[a-1][i].type!==v.WALL&&n.unshift(t[a-1][i])}function D(e,t,n){var i=e.x,a=e.y;i>0&&!t[a][i-1].isVisited&&t[a][i-1].type!==v.WALL&&(t[a][i-1].isVisited=!0,n.push(t[a][i-1])),a<t.length-1&&!t[a+1][i].isVisited&&t[a+1][i].type!==v.WALL&&(t[a+1][i].isVisited=!0,n.push(t[a+1][i])),i<t[0].length-1&&!t[a][i+1].isVisited&&t[a][i+1].type!==v.WALL&&(t[a][i+1].isVisited=!0,n.push(t[a][i+1])),a>0&&!t[a-1][i].isVisited&&t[a-1][i].type!==v.WALL&&(t[a-1][i].isVisited=!0,n.push(t[a-1][i]))}var k=18,S=10,W=38,w=10,L=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).handleMouseDown=function(e){n.isMousePressed=!0,n.clickedNode=Object(f.a)({},e),n.toggleNode(e,n.props.nodetype),n.clickedNode.type!==v.START&&n.clickedNode.type!==v.END&&(e.canModify=!1,n.modfiedNodes.push(e))},n.handleMouseEnter=function(e){n.isMousePressed&&e.canModify&&(n.clickedNode.type!==v.START&&n.clickedNode.type!==v.END?(n.toggleNode(e,n.props.nodetype),e.canModify=!1,n.modfiedNodes.push(e)):n.moveStartorEndNode(e))},n.handleMouseUp=function(){n.isMousePressed=!1,n.clickedNode=null;for(var e=0;e<n.modfiedNodes.length;e++){var t=n.modfiedNodes[e];n["node-".concat(t.y,"-").concat(t.x)].setState({canModify:!0})}n.modfiedNodes=[]},n.grid=n.constructInitGrid(),n.startNode=n.grid[S][k],n.endNode=n.grid[w][W],n.isMousePressed=!1,n.algorithm=null,n.clickedNode=null,n.modfiedNodes=[],n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"componentWillUnmount",value:function(){this.props.onRef(void 0)}},{key:"resetGrid",value:function(){var e=this.props.rows,t=this.props.cols;this.algorithm=null;for(var n=0;n<e;n++)for(var i=0;i<t;i++)this.grid[n][i].type!==v.START&&this.grid[n][i].type!==v.END&&(this.grid[n][i].type=v.DEFAULT,this.grid[n][i].weight=1,this["node-".concat(n,"-").concat(i)].setNode(v.DEFAULT)),this["node-".concat(n,"-").concat(i)].setAnimation(E.DEFAULT)}},{key:"resetGridforVisualize",value:function(){for(var e=this.props.rows,t=this.props.cols,n=0;n<e;n++)for(var i=0;i<t;i++)this.grid[n][i].prevNode=null,this.grid[n][i].distance=1/0,this.grid[n][i].totalDis=1/0,this.grid[n][i].euclideanDis=1/0,this.grid[n][i].isVisited=!1,this["node-".concat(n,"-").concat(i)].setAnimation(E.DEFAULT)}},{key:"visualize",value:function(e,t){this.resetGridforVisualize(),this.algorithm=e;var n=this.calculateVisualizedNodes(e),i=Object(m.a)(n,2),a=i[0],r=i[1];this.animateNodes(a,r,t)}},{key:"adaptAlgorithm",value:function(){this.resetGridforVisualize();for(var e=this.calculateVisualizedNodes(this.props.algorithm),t=Object(m.a)(e,2),n=t[0],i=t[1],a=0;a<n.length+i.length;a++){var r=void 0;a<n.length?(r=n[a],this["node-".concat(r.y,"-").concat(r.x)].setAnimation(E.VISITED_NOANIMATION)):(r=i[a-n.length],this["node-".concat(r.y,"-").concat(r.x)].setAnimation(E.PATH_NOANIMATION))}}},{key:"calculateVisualizedNodes",value:function(e){var t,n;switch(e){case"Dijkstra":t=g(this.grid,this.startNode,this.endNode),n=1==(n=N(this.endNode)).length?[]:n;break;case"A* Search":t=function(e,t,n){var i,a,r=[],o=[],s=!0,l=!1,c=void 0;try{for(var d,u=e[Symbol.iterator]();!(s=(d=u.next()).done);s=!0){var h=d.value,p=!0,m=!1,f=void 0;try{for(var y,v=h[Symbol.iterator]();!(p=(y=v.next()).done);p=!0){var E=y.value;E.euclideanDis=(i=E,a=n,Math.sqrt((i.x-a.x)*(i.x-a.x)+(i.y-a.y)*(i.y-a.y))),o.push(E)}}catch(N){m=!0,f=N}finally{try{p||null==v.return||v.return()}finally{if(m)throw f}}}}catch(N){l=!0,c=N}finally{try{s||null==u.return||u.return()}finally{if(l)throw c}}for(t.distance=0,t.totalDis=t.euclideanDis;0!==o.length;){o.sort((function(e,t){return e.totalDis-t.totalDis}));var g=o.shift();if(g.distance===1/0)return r;if(g.isVisited=!0,r.push(g),g===n)return r;A(g,e)}return r}(this.grid,this.startNode,this.endNode),n=1==(n=function(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.prevNode;return t}(this.endNode)).length?[]:n;break;case"Depth First Search":var i=function(e,t,n){var i=[],a=[];for(a.push(t);0!==a.length;){var r=a.shift();if(!r.isVisited){if(r.isVisited=!0,i.push(r),r===n)return[i,!0];I(r,e,a)}}return[i,!1]}(this.grid,this.startNode,this.endNode),a=Object(m.a)(i,2);t=a[0],n=a[1]?t:[];break;case"Breadth First Search":var r=function(e,t,n){var i=[],a=[];for(a.push(t),t.isVisited=!0;0!==a.length;){var r=a.shift();if(i.push(r),r===n)return[i,!0];D(r,e,a)}return[i,!1]}(this.grid,this.startNode,this.endNode),o=Object(m.a)(r,2);t=o[0],n=o[1]?t:[];break;default:t=g(this.grid,this.startNode,this.endNode),n=N(this.startNode,this.endNode)}return[t,n]}},{key:"animateNodes",value:function(e,t,n){for(var i=this,a=function(a){a===e.length?setTimeout((function(){for(var e=function(e){setTimeout((function(){var n=t[e];n.type===v.START||n.type===v.END?i["node-".concat(n.y,"-").concat(n.x)].setAnimation(E.PATH_NOANIMATION):i["node-".concat(n.y,"-").concat(n.x)].setAnimation(E.PATH)}),10+2*n*e)},a=0;a<t.length;a++)e(a)}),10+n*a):setTimeout((function(){var t=e[a];i["node-".concat(t.y,"-").concat(t.x)].setAnimation(E.VISITED)}),10+n*a)},r=0;r<=e.length;r++)a(r)}},{key:"toggleNode",value:function(e,t){var n=e.type;if(e.type===v.DEFAULT){var i=(n=t)===v.WEIGHT_THREE?3:n===v.WEIGHT_FIVE?5:n===v.WEIGHT_EIGHT?8:1/0;this.grid[e.y][e.x].weight=i,this["node-".concat(e.y,"-").concat(e.x)].setNodeandAnimation(n,E.GENERATE)}else e.type!==v.WALL&&e.type!==v.WEIGHT_THREE&&e.type!==v.WEIGHT_FIVE&&e.type!==v.WEIGHT_EIGHT||(n=v.DEFAULT,this.grid[e.y][e.x].weight=1,this["node-".concat(e.y,"-").concat(e.x)].setNodeandAnimation(n,E.DEFAULT));this.grid[e.y][e.x].type=n}},{key:"moveStartorEndNode",value:function(e){if(e.type===v.DEFAULT){var t=this.clickedNode.x,n=this.clickedNode.y,i=e.x,a=e.y;this["node-".concat(n,"-").concat(t)].setNode(v.DEFAULT),this.grid[n][t].type=v.DEFAULT,this["node-".concat(a,"-").concat(i)].setNode(this.clickedNode.type),this.grid[a][i].type=this.clickedNode.type,this.grid[a][i].type===v.START?this.startNode=this.grid[a][i]:this.endNode=this.grid[a][i],this.clickedNode.x=i,this.clickedNode.y=a,this.algorithm&&this.adaptAlgorithm()}}},{key:"constructInitGrid",value:function(){for(var e=this.props.rows,t=this.props.cols,n=[],i=0;i<e;i++){for(var a=[],r=0;r<t;r++){var o={x:r,y:i,type:r===k&&i===S?v.START:r===W&&i===w?v.END:v.DEFAULT,isVisited:!1,distance:1/0,totalDis:1/0,euclideanDis:1/0,weight:1,prevNode:null};a.push(o)}n.push(a)}return n}},{key:"render",value:function(){var e=this;return a.a.createElement("div",{className:"grid"},this.grid.map((function(t,n){return a.a.createElement("div",{key:n,id:"row"},t.map((function(t,i){return a.a.createElement(y,{key:i,id:"node-".concat(n,"-").concat(i),node:t,onMouseDown:e.handleMouseDown,onMouseEnter:e.handleMouseEnter,onMouseUp:e.handleMouseUp,onRef:function(t){return e["node-".concat(n,"-").concat(i)]=t}})})))})))}}]),t}(i.Component),b=n(36),V=n(79),O=(n(35),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(d.a)(t).call(this,e))).state={name:e.name,type:e.type},n}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return"button"===this.state.type?a.a.createElement("li",null,a.a.createElement(b.a,{id:"button",onClick:function(){return e.props.onClick()}},this.state.name)):a.a.createElement("li",null,a.a.createElement(V.a,null,a.a.createElement(V.a.Toggle,{id:"dropdown-toggle"},this.state.name+" : "+this.props.curItem+"  "),a.a.createElement(V.a.Menu,null,this.props.itemList.map((function(t){return a.a.createElement(V.a.Item,{key:t,onSelect:function(){return e.props.onChangeItem(t)},id:"dropdown-item"},t)})))))}}]),t}(i.Component)),M=n(78),H=n(77),x=["Dijkstra","A* Search","Depth First Search","Breadth First Search"],G=["Wall","Weight 3","Weight 5","Weight 8"],j=["Fast","Medium","Slow"],F=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(d.a)(t).call(this))).handleChangeAlgorithm=function(t){e.setState({curAlgorithm:t})},e.handleChangeSpeed=function(t){e.setState({curSpeed:t})},e.handleChangeNodeType=function(t){e.setState({curNodeType:t})},e.handleReset=function(){e.grid.resetGrid()},e.handleVisualize=function(){var t=12;switch(e.state.curSpeed){case"Fast":t=12;break;case"Medium":t=16;break;case"Slow":t=20;break;default:t=12}e.grid.visualize(e.state.curAlgorithm,t)},e.state={curAlgorithm:"Dijkstra",curSpeed:"Fast",curNodeType:"Wall"},e}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this,t="Weight 3"===this.state.curNodeType?v.WEIGHT_THREE:"Weight 5"===this.state.curNodeType?v.WEIGHT_FIVE:"Weight 8"===this.state.curNodeType?v.WEIGHT_EIGHT:v.WALL;return a.a.createElement("div",null,a.a.createElement(h.a,{variant:"custom"},a.a.createElement(h.a.Brand,{href:"#home"},"Pathfinding Visualizer"),a.a.createElement(p.a,null,a.a.createElement(O,{name:"Visualize",type:"button",onClick:this.handleVisualize}),a.a.createElement(O,{name:"Reset Board",type:"button",onClick:this.handleReset}),a.a.createElement(O,{name:"Add Node",type:"dropdown",itemList:G,curItem:this.state.curNodeType,onChangeItem:this.handleChangeNodeType}),a.a.createElement(O,{name:"Algorithms",type:"dropdown",itemList:x,curItem:this.state.curAlgorithm,onChangeItem:this.handleChangeAlgorithm}),a.a.createElement(O,{name:"Speed",type:"dropdown",itemList:j,curItem:this.state.curSpeed,onChangeItem:this.handleChangeSpeed}))),a.a.createElement("div",{id:"info"},a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement("div",{className:"start"}),"Start Node"),a.a.createElement("li",null,a.a.createElement("div",{className:"end"}),"End Node"),a.a.createElement("li",null,a.a.createElement("div",{className:"wall"}),"Wall Node"),a.a.createElement("li",null,a.a.createElement("div",{className:"weight3"}),"Weight 3"),a.a.createElement("li",null,a.a.createElement("div",{className:"weight5"}),"Weight 5"),a.a.createElement("li",null,a.a.createElement("div",{className:"weight8"}),"Weight 8"),a.a.createElement("li",null,a.a.createElement("div",{className:"unvisited-node"}),"Unvisited Node"),a.a.createElement("li",null,a.a.createElement("div",{className:"visited-node"}),"Visited Node"),a.a.createElement("li",null,a.a.createElement("div",{className:"path-node"}),"Path Node"))),a.a.createElement("div",{className:"instruction"},a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement(M.a,{style:{color:H.a[500]}},"star"),a.a.createElement("div",null," Pick an Algorithm "))),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement(M.a,{style:{color:H.a[500]}},"star"),a.a.createElement("div",null," Add Wall or Weighted Nodes "))),a.a.createElement("ul",null,a.a.createElement("li",null,a.a.createElement(M.a,{style:{color:H.a[500]}},"star"),a.a.createElement("div",null," Visualize and Enjoy! ")))),a.a.createElement(L,{rows:23,cols:59,algorithm:this.state.curAlgorithm,nodetype:t,onRef:function(t){return e.grid=t}}))}}]),t}(i.Component);n(62),n(63),n(64);var R=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(F,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(R,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[47,1,2]]]);
//# sourceMappingURL=main.248a791f.chunk.js.map