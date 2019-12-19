(this["webpackJsonppf-visualizer-app"]=this["webpackJsonppf-visualizer-app"]||[]).push([[0],{32:function(e,t,i){},33:function(e,t,i){},43:function(e,t,i){e.exports=i(59)},48:function(e,t,i){},49:function(e,t,i){},59:function(e,t,i){"use strict";i.r(t);var n=i(0),a=i.n(n),o=i(26),s=i.n(o),r=(i(48),i(49),i(9)),c=i(10),h=i(14),d=i(11),u=i(15),l=i(25),p=i(42),g=(i(32),function(e){function t(e){var i;return Object(r.a)(this,t),(i=Object(h.a)(this,Object(d.a)(t).call(this,e))).preventDragHandler=function(e){e.preventDefault()},i.handleChangeNode=function(){var e=i.state.type;i.state.type!==y.START&&i.state.type!==y.END&&(i.props.weight===f.DEFAULT?e=i.toggleWall():i.toggleWeight()),i.props.onMouseDown(i.state,e)},i.setWeightType=function(e){i.setState({weight:e})},i.setNode=function(e){i.setState({type:e})},i.state={x:e.node.x,y:e.node.y,type:e.node.type,weight:e.weight,canModify:!0},i}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"componentWillUnmount",value:function(){this.props.onRef(void 0)}},{key:"toggleWall",value:function(){var e=this.state.type;return this.state.type===y.DEFAULT||this.state.type===y.VISITED||this.state.type===y.VISITED_NOANIMATION||this.state.type===y.PATH||this.state.type===y.PATH_NOANIMATION?(e=y.WALL,this.setState({weight:f.DEFAULT})):this.state.type!==y.WALL&&this.state.type!==y.WEIGHT_THREE&&this.state.type!==y.WEIGHT_FIVE&&this.state.type!==y.WEIGHT_EIGHT||(e=y.DEFAULT),this.setState({type:e}),e}},{key:"toggleWeight",value:function(){this.state.weight===f.DEFAULT?this.state.type!==y.WALL&&this.setState({weight:this.props.weight}):this.setState({weight:f.DEFAULT})}},{key:"render",value:function(){var e=this,t=this.state.type,i=t===y.START?"node-start":t===y.END?"node-end":t===y.WALL?"node-wall":t===y.VISITED?"node-visited":t===y.PATH?"node-path":t===y.VISITED_NOANIMATION?"node-visited-nonanimated":t===y.PATH_NOANIMATION?"node-path-nonanimated":"",n=this.state.weight,o=n===f.WEIGHT_THREE?"node-three":n===f.WEIGHT_FIVE?"node-five":n===f.WEIGHT_EIGHT?"node-eight":"";return a.a.createElement("div",{className:"node ".concat(i),onMouseDown:function(){return e.handleChangeNode()},onMouseEnter:function(){return e.props.onMouseEnter(e.state)},onMouseUp:function(){return e.props.onMouseUp()},onDragStart:this.preventDragHandler},a.a.createElement("div",{className:"".concat(o)}))}}]),t}(n.Component)),y={DEFAULT:1,START:2,END:3,WALL:4,VISITED:5,PATH:6,VISITED_NOANIMATION:7,PATH_NOANIMATION:8},f={DEFAULT:1,WEIGHT_THREE:2,WEIGHT_FIVE:3,WEIGHT_EIGHT:4};function E(e,t,i){var n=[],a=[],o=!0,s=!1,r=void 0;try{for(var c,h=e[Symbol.iterator]();!(o=(c=h.next()).done);o=!0){var d=c.value,u=!0,l=!1,p=void 0;try{for(var g,y=d[Symbol.iterator]();!(u=(g=y.next()).done);u=!0){var f=g.value;a.push(f)}}catch(T){l=!0,p=T}finally{try{u||null==y.return||y.return()}finally{if(l)throw p}}}}catch(T){s=!0,r=T}finally{try{o||null==h.return||h.return()}finally{if(s)throw r}}for(t.distance=0;0!==a.length;){a.sort((function(e,t){return e.distance-t.distance}));var E=a.shift();if(E.distance===1/0)return n;if(E.isVisited=!0,E===i)return n;E!==t&&n.push(E),v(E,e)}return n}function T(e,t){for(var i=[],n=t.prevNode;null!==n&&n!==e;)i.unshift(n),n=n.prevNode;return i}function v(e,t){var i=[],n=e.x,a=e.y;a>0&&i.push(t[a-1][n]),a<t.length-1&&i.push(t[a+1][n]),n>0&&i.push(t[a][n-1]),n<t[0].length-1&&i.push(t[a][n+1]);var o=i.filter((function(e){return!e.isVisited&&e.type!==y.WALL})),s=!0,r=!1,c=void 0;try{for(var h,d=o[Symbol.iterator]();!(s=(h=d.next()).done);s=!0){var u=h.value;e.distance+u.weight<u.distance&&(u.distance=e.distance+u.weight,u.prevNode=e)}}catch(l){r=!0,c=l}finally{try{s||null==d.return||d.return()}finally{if(r)throw c}}}function m(e,t,i){var n=e.x,a=e.y;n>0&&!t[a][n-1].isVisited&&t[a][n-1].type!==y.WALL&&i.unshift(t[a][n-1]),a<t.length-1&&!t[a+1][n].isVisited&&t[a+1][n].type!==y.WALL&&i.unshift(t[a+1][n]),n<t[0].length-1&&!t[a][n+1].isVisited&&t[a][n+1].type!==y.WALL&&i.unshift(t[a][n+1]),a>0&&!t[a-1][n].isVisited&&t[a-1][n].type!==y.WALL&&i.unshift(t[a-1][n])}function N(e,t,i){var n=e.x,a=e.y;n>0&&!t[a][n-1].isVisited&&t[a][n-1].type!==y.WALL&&(t[a][n-1].isVisited=!0,i.push(t[a][n-1])),a<t.length-1&&!t[a+1][n].isVisited&&t[a+1][n].type!==y.WALL&&(t[a+1][n].isVisited=!0,i.push(t[a+1][n])),n<t[0].length-1&&!t[a][n+1].isVisited&&t[a][n+1].type!==y.WALL&&(t[a][n+1].isVisited=!0,i.push(t[a][n+1])),a>0&&!t[a-1][n].isVisited&&t[a-1][n].type!==y.WALL&&(t[a-1][n].isVisited=!0,i.push(t[a-1][n]))}var A=14,I=12,W=36,L=12,D=function(e){function t(e){var i;Object(r.a)(this,t),(i=Object(h.a)(this,Object(d.a)(t).call(this,e))).handleMouseDown=function(e,t){i.isMousePressed=!0,i.clickedNode=Object(p.a)({},e);var n=i.state.weight;if(n===f.DEFAULT)i.grid[e.y][e.x].type=t;else{var a=n===f.WEIGHT_THREE?3:n===f.WEIGHT_FIVE?5:n===f.WEIGHT_EIGHT?8:1;i.grid[e.y][e.x].weight=a}i.clickedNode.type!==y.START&&i.clickedNode.type!==y.END&&(e.canModify=!1,i.modfiedNodes.push(e))},i.handleMouseEnter=function(e){if(i.isMousePressed&&e.canModify){var t=i.state.weight;i.clickedNode.type!==y.START&&i.clickedNode.type!==y.END?(t===f.DEFAULT?i.toggleWall(e):i.toggleWeight(e),e.canModify=!1,i.modfiedNodes.push(e)):i.moveStartorEndNode(e)}},i.handleMouseUp=function(){i.isMousePressed=!1,i.clickedNode=null;for(var e=0;e<i.modfiedNodes.length;e++){var t=i.modfiedNodes[e];i["node-".concat(t.y,"-").concat(t.x)].setState({canModify:!0})}i.modfiedNodes=[]};var n="Weight 3"===i.props.weightname?f.WEIGHT_THREE:"Weight 5"===i.props.weightname?f.WEIGHT_FIVE:"Weight 8"===i.props.weightname?f.WEIGHT_EIGHT:f.DEFAULT;return i.state={weight:n},i.grid=i.constructInitGrid(),i.startNode=i.grid[I][A],i.endNode=i.grid[L][W],i.isMousePressed=!1,i.algorithm=null,i.clickedNode=null,i.modfiedNodes=[],i}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"componentWillUnmount",value:function(){this.props.onRef(void 0)}},{key:"changeWeightType",value:function(e){var t="Weight 3"===e?f.WEIGHT_THREE:"Weight 5"===e?f.WEIGHT_FIVE:"Weight 8"===e?f.WEIGHT_EIGHT:f.DEFAULT;this.setState({weight:t})}},{key:"resetGrid",value:function(){var e=this.props.rows,t=this.props.cols;this.algorithm=null;for(var i=0;i<e;i++)for(var n=0;n<t;n++)this.grid[i][n].type!==y.START&&this.grid[i][n].type!==y.END&&(this.grid[i][n].type=y.DEFAULT,this.grid[i][n].weight=1,this["node-".concat(i,"-").concat(n)].setNode(y.DEFAULT),this["node-".concat(i,"-").concat(n)].setWeightType(f.DEFAULT))}},{key:"resetGridforVisualize",value:function(){for(var e=this.props.rows,t=this.props.cols,i=0;i<e;i++)for(var n=0;n<t;n++)this.grid[i][n].prevNode=null,this.grid[i][n].distance=1/0,this.grid[i][n].isVisited=!1,this.grid[i][n].type!==y.VISITED&&this.grid[i][n].type!==y.PATH||(this.grid[i][n].type=y.DEFAULT,this["node-".concat(i,"-").concat(n)].setNode(y.DEFAULT))}},{key:"visualize",value:function(e,t){this.resetGridforVisualize(),this.algorithm=e;var i=this.calculateVisualizedNodes(e),n=Object(l.a)(i,2),a=n[0],o=n[1];this.animateNodes(a,o,t)}},{key:"adaptAlgorithm",value:function(){this.resetGridforVisualize();for(var e=this.calculateVisualizedNodes(this.props.algorithm),t=Object(l.a)(e,2),i=t[0],n=t[1],a=0;a<i.length+n.length;a++){var o=void 0;a<i.length?((o=i[a]).type=y.VISITED,this["node-".concat(o.y,"-").concat(o.x)].setNode(y.VISITED_NOANIMATION)):((o=n[a-i.length]).type=y.PATH,this["node-".concat(o.y,"-").concat(o.x)].setNode(y.PATH_NOANIMATION))}}},{key:"calculateVisualizedNodes",value:function(e){var t,i;switch(e){case"Dijkstra":t=E(this.grid,this.startNode,this.endNode),i=T(this.startNode,this.endNode);break;case"A* Search":break;case"Depth First Search":var n=function(e,t,i){var n=[],a=[];for(a.push(t);0!==a.length;){var o=a.shift();if(!o.isVisited){if(o.isVisited=!0,o===i)return[n,!0];o!==t&&n.push(o),m(o,e,a)}}return[n,!1]}(this.grid,this.startNode,this.endNode),a=Object(l.a)(n,2);t=a[0],i=a[1]?t:[];break;case"Breadth First Search":var o=function(e,t,i){var n=[],a=[];for(a.push(t),t.isVisited=!0;0!==a.length;){var o=a.shift();if(o===i)return[n,!0];N(o,e,a),o!==t&&n.push(o)}return[n,!1]}(this.grid,this.startNode,this.endNode),s=Object(l.a)(o,2);t=s[0],i=s[1]?t:[];break;default:t=E(this.grid,this.startNode,this.endNode),i=T(this.startNode,this.endNode)}return[t,i]}},{key:"animateNodes",value:function(e,t,i){for(var n=this,a=function(a){a===e.length?setTimeout((function(){for(var e=function(e){setTimeout((function(){var i=t[e];i.type=y.PATH,n["node-".concat(i.y,"-").concat(i.x)].setNode(y.PATH)}),10+2*i*e)},a=0;a<t.length;a++)e(a)}),10+i*a):setTimeout((function(){var t=e[a];t.type=y.VISITED,n["node-".concat(t.y,"-").concat(t.x)].setNode(y.VISITED)}),10+i*a)},o=0;o<=e.length;o++)a(o)}},{key:"toggleWall",value:function(e){var t=e.type;e.type===y.DEFAULT||e.type===y.VISITED||e.type===y.VISITED_NOANIMATION||e.type===y.PATH||e.type===y.PATH_NOANIMATION?(t=y.WALL,this.grid[e.y][e.x].weight=1/0,this["node-".concat(e.y,"-").concat(e.x)].setWeightType(f.DEFAULT)):e.type!==y.WALL&&e.type!==y.WEIGHT_THREE&&e.type!==y.WEIGHT_FIVE&&e.type!==y.WEIGHT_EIGHT||(t=y.DEFAULT),this["node-".concat(e.y,"-").concat(e.x)].setNode(t),this.grid[e.y][e.x].type=t}},{key:"toggleWeight",value:function(e){if(e.type!==y.START&&e.type!==y.END&&e.type!==y.WALL){var t,i=(t=e.weight===f.DEFAULT?this.state.weight:f.DEFAULT)===f.WEIGHT_THREE?3:t===f.WEIGHT_FIVE?5:t===f.WEIGHT_EIGHT?8:1;this.grid[e.y][e.x].weight=i,this["node-".concat(e.y,"-").concat(e.x)].setWeightType(t)}}},{key:"moveStartorEndNode",value:function(e){if(e.type!==y.WALL&&e.type!==y.START&&e.type!==y.END){var t=this.clickedNode.x,i=this.clickedNode.y,n=e.x,a=e.y;this["node-".concat(i,"-").concat(t)].setNode(y.DEFAULT),this.grid[i][t].type=y.DEFAULT,this["node-".concat(a,"-").concat(n)].setNode(this.clickedNode.type),this.grid[a][n].type=this.clickedNode.type,this.grid[a][n].type===y.START?this.startNode=this.grid[a][n]:this.endNode=this.grid[a][n],this.clickedNode.x=n,this.clickedNode.y=a,this.algorithm&&this.adaptAlgorithm()}}},{key:"constructInitGrid",value:function(){for(var e=this.props.rows,t=this.props.cols,i=[],n=0;n<e;n++){for(var a=[],o=0;o<t;o++){var s={x:o,y:n,type:o===A&&n===I?y.START:o===W&&n===L?y.END:y.DEFAULT,isVisited:!1,distance:1/0,weight:1,prevNode:null};a.push(s)}i.push(a)}return i}},{key:"render",value:function(){var e=this,t=this.state.weight;return a.a.createElement("div",{className:"grid"},this.grid.map((function(i,n){return a.a.createElement("div",{key:n,id:"row"},i.map((function(i,o){return a.a.createElement(g,{key:o,id:"node-".concat(n,"-").concat(o),node:i,onMouseDown:e.handleMouseDown,onMouseEnter:e.handleMouseEnter,onMouseUp:e.handleMouseUp,weight:t,onRef:function(t){return e["node-".concat(n,"-").concat(o)]=t}})})))})))}}]),t}(n.Component),w=i(62),S=i(63),k=i(34),H=i(61),V=(i(33),function(e){function t(e){var i;return Object(r.a)(this,t),(i=Object(h.a)(this,Object(d.a)(t).call(this,e))).state={name:e.name,type:e.type},i}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return"button"===this.state.type?a.a.createElement("li",null,a.a.createElement(k.a,{id:"button",onClick:function(){return e.props.onClick()}},this.state.name)):a.a.createElement("li",null,a.a.createElement(H.a,null,a.a.createElement(H.a.Toggle,{id:"dropdown-toggle"},this.state.name+" : "+this.props.curItem+"  "),a.a.createElement(H.a.Menu,null,this.props.itemList.map((function(t){return a.a.createElement(H.a.Item,{key:t,onSelect:function(){return e.props.onChangeItem(t)},id:"dropdown-item"},t)})))))}}]),t}(n.Component)),O=["Dijkstra","A* Search","Depth First Search","Breadth First Search"],b=["Wall","Weight 3","Weight 5","Weight 8"],F=["Fast","Medium","Slow"],G=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(h.a)(this,Object(d.a)(t).call(this))).handleChangeAlgorithm=function(t){e.setState({curAlgorithm:t})},e.handleChangeSpeed=function(t){e.setState({curSpeed:t})},e.handleChangeWeight=function(t){e.setState({curWeight:t}),e.grid.changeWeightType(t)},e.handleReset=function(){e.grid.resetGrid()},e.handleVisualize=function(){var t=12;switch(e.state.curSpeed){case"Fast":t=12;break;case"Medium":t=16;break;case"Slow":t=20;break;default:t=12}e.grid.visualize(e.state.curAlgorithm,t)},e.state={curAlgorithm:"Dijkstra",curSpeed:"Fast",curWeight:"Wall"},e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return a.a.createElement("div",null,a.a.createElement(w.a,{variant:"custom"},a.a.createElement(w.a.Brand,{href:"#home"},"Pathfinding Visualizer"),a.a.createElement(S.a,null,a.a.createElement(V,{name:"Visualize",type:"button",onClick:this.handleVisualize}),a.a.createElement(V,{name:"Reset Board",type:"button",onClick:this.handleReset}),a.a.createElement(V,{name:"Add Node",type:"dropdown",itemList:b,curItem:this.state.curWeight,onChangeItem:this.handleChangeWeight}),a.a.createElement(V,{name:"Algorithms",type:"dropdown",itemList:O,curItem:this.state.curAlgorithm,onChangeItem:this.handleChangeAlgorithm}),a.a.createElement(V,{name:"Speed",type:"dropdown",itemList:F,curItem:this.state.curSpeed,onChangeItem:this.handleChangeSpeed}))),a.a.createElement(D,{rows:24,cols:54,algorithm:this.state.curAlgorithm,weightname:this.state.curWeight,onRef:function(t){return e.grid=t}}))}}]),t}(n.Component);i(56),i(57),i(58);var M=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(G,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(M,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[43,1,2]]]);
//# sourceMappingURL=main.1b7d0e67.chunk.js.map