(this["webpackJsonpfour-in-a-row-react"]=this["webpackJsonpfour-in-a-row-react"]||[]).push([[0],{153:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(10),o=n.n(i),s=(n(92),n(21)),u=n(17),l=n(8),c=n(9),h=n(13),m=n(14),p=n(15),g=n(5),f=n.n(g),d=n(31),v={messageBoxHeightArithmetic:"".concat(10,"px + 2vmin"),messageBoxFontArithmetic:"".concat(5,"px + 2vmin")},y=function(){function e(){Object(l.a)(this,e)}return Object(c.a)(e,null,[{key:"formSeries",value:function(e,t){var n=f.a.flatten(f.a.range(e).map((function(e){return f.a.range(t-3).map((function(t){return f.a.range(4).map((function(n){return{x:e,y:t+n}}))}))}))),a=f.a.flatten(f.a.range(t).map((function(t){return f.a.range(e-3).map((function(e){return f.a.range(4).map((function(n){return{x:e+n,y:t}}))}))}))),r=f.a.flatten(f.a.range(0,t-3).map((function(t){return f.a.range(e-3).map((function(e){return f.a.range(4).map((function(n){return{x:e+n,y:t+n}}))}))}))),i=f.a.flatten(f.a.range(0,t-3).map((function(t){return f.a.range(e-3).map((function(e){return f.a.range(4).map((function(n){return{x:e+n,y:3+t-n}}))}))})));return[].concat(Object(u.a)(n),Object(u.a)(a),Object(u.a)(r),Object(u.a)(i))}},{key:"stringifyCell",value:function(e){return"".concat(e.x,",").concat(e.y)}},{key:"getLastCellAsString",value:function(e,t){var n=t,a=e[t].length-1;return"".concat(n,",").concat(a)}}]),e}(),k=n(3),b=["Give me your best shot!","you like that?","Failed to see this coming, ha?","Come on, show me what you got!"],C=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(h.a)(this,Object(m.a)(t).call(this,e))).factor=function(e){return Math.pow(e,n.board.length)+2*n.series.length},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"takeStep",value:function(){this.win()||this.blockLose()||this.have2WaysToWin()||this.block2WaysToLose()||this.takeSmartStep()}},{key:"takeSmartStep",value:function(){var e=this.getBestChoise();this.appendToColumn(e,this.mark),this.message=f.a.sample(b)}},{key:"getBestChoise",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=this.getScoreForPosition(this.getAILevel(),this.mark,!0);return f.a.maxBy(this.getAvailableColumns(e),(function(e){return t[e]}))}},{key:"getScoreForPosition",value:function(e,t){var n=this,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=[],i=this.columnsRange.map((function(e){return n.onFillColumn(e,t,(function(){var t=y.getLastCellAsString(n.board,e);if(n.won(t))return 1;if(n.lost(t))return-1;var a=n.stateScore();return r[e]=a,0}))})),o=[].concat(r).sort((function(e,a){return t===n.mark?a-e:e-a})).slice(0,3),s=i.map((function(a,i){return n.onFillColumn(i,t,(function(){return 1===a?n.factor(e):-1===a?-n.factor(e):1===e?r[i]:o.includes(r[i])?n.getScoreForPosition(e-1,n.toggleMark(t)):-1/0}))}));return a?s:f.a.sum(s.filter((function(e){return e!==-1/0})))}},{key:"stateScore",value:function(){var e=this;return f.a.sumBy(this.series.filter((function(t){return t[e.mark]>0&&0===t[e.opponentMark]})),(function(t){return t[e.mark]}))-f.a.sumBy(this.series.filter((function(t){return 0===t[e.mark]&&t[e.opponentMark]>0})),(function(t){return t[e.opponentMark]}))}},{key:"onEveryAvailableStep",value:function(e,t){var n=this;return this.columnsRange.every((function(a){if(n.board[a].length===n.maxHeight)return!0;n.appendToColumn(a,e);var r=t();return n.removeFromColumn(a,e),r}))}},{key:"findStepMatching",value:function(e,t){var n=this;return this.columnsRange.find((function(a){if(n.board[a].length===n.maxHeight)return!1;n.appendToColumn(a,e);var r=t();return n.removeFromColumn(a,e),r}))}},{key:"findStepsMatching",value:function(e,t){var n=this;return this.columnsRange.filter((function(a){if(n.board[a].length===n.maxHeight)return!1;n.appendToColumn(a,e);var r=t();return n.removeFromColumn(a,e),r}))}},{key:"canWinCell",value:function(){var e=this;return this.findStepMatching(this.mark,(function(){return e.won()}))}},{key:"canWin",value:function(){return void 0!==this.canWinCell()}},{key:"canLoseCell",value:function(){var e=this;return this.findStepMatching(this.opponentMark,(function(){return e.lost()}))}},{key:"canLose",value:function(){return void 0!==this.canLoseCell()}},{key:"win",value:function(){var e=this.canWinCell();return void 0!==e&&(this.appendToColumn(e,this.mark),this.message="Got ya!"),void 0!==e}},{key:"blockLose",value:function(){var e=this.canLoseCell();return void 0!==e&&(this.appendToColumn(e,this.mark),this.message="Blocked ya!"),void 0!==e}},{key:"have2WaysToWin",value:function(){var e=this,t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],n=this.findStepMatching(this.mark,(function(){return!e.canLose()&&e.onEveryAvailableStep(e.opponentMark,(function(){return e.canWin()}))}));return void 0!==n&&t&&(this.appendToColumn(n,this.mark),this.message="Got ya in 2 ways!"),void 0!==n}},{key:"block2WaysToLose",value:function(){var e=this,t=this.findStepsMatching(this.mark,(function(){return void 0!==e.findStepMatching(e.opponentMark,(function(){return!e.canWin()&&e.onEveryAvailableStep(e.mark,(function(){return e.canLose()}))}))}));if(t.length>1){if(0===this.getAvailableColumns(t).length)return!1;var n=this.getBestChoise(t);this.appendToColumn(n,this.mark),this.message="Blocked ya from 2 ways!"}return t.length>1}}]),t}(function(){function e(t){var n=this;Object(l.a)(this,e);var a=t.boardColumns,r=t.board,i=t.boardRows,o=t.aiMark,c=t.opponentMark,h=t.getAILevel,m=t.refs;if(this.board=r||f.a.range(a).map((function(e){return[]})),this.maxHeight=i,this.mark=o,this.opponentMark=c,this.getAILevel=h,m)Object.assign(this,m);else{var p=y.formSeries(this.board.length,this.maxHeight),g=new Map(p.map((function(e){var t;return[e,Object(s.a)((t={},Object(k.a)(t,n.mark,0),Object(k.a)(t,n.opponentMark,0),t),f.a.countBy(e,(function(e){return n.board[e.x][e.y]})))]})));this.series=p.map((function(e){return g.get(e)})),this.seriesByCell=f.a.range(4).map((function(e){return f.a.groupBy(p,(function(t){return y.stringifyCell(t[e])}))})).map((function(e){return f.a.mapValues(e,(function(e){return e.map((function(e){return g.get(e)}))}))})).reduce((function(e,t){return Object.keys(t).forEach((function(n){var a;n in e?(a=e[n]).push.apply(a,Object(u.a)(t[n])):e[n]=t[n]})),e}),{})}this.columnsRange=f.a.range(this.board.length)}return Object(c.a)(e,[{key:"appendToColumn",value:function(e,t){this.board[e].push(t),this.lastColumn=e,this.seriesByCell[y.getLastCellAsString(this.board,e)].forEach((function(e){return e[t]++}))}},{key:"removeFromColumn",value:function(e,t){this.seriesByCell[y.getLastCellAsString(this.board,e)].forEach((function(e){return e[t]--})),this.board[e].pop()}},{key:"isTie",value:function(){var e=this;return this.board.every((function(t){return t.length===e.maxHeight}))}},{key:"won",value:function(e){return this.wonByMark(e,this.mark)}},{key:"lost",value:function(e){return this.wonByMark(e,this.opponentMark)}},{key:"wonByMark",value:function(e,t){return e?this.seriesByCell[e].some((function(e){return 4===e[t]})):this.series.some((function(e){return 4===e[t]}))}},{key:"toggleMark",value:function(e){return e===this.mark?this.opponentMark:this.mark}},{key:"onFillColumn",value:function(e,t,n){if(this.isColumnFull(e))return 0;this.appendToColumn(e,t);var a=n();return this.removeFromColumn(e,t),a}},{key:"isColumnFull",value:function(e){return this.board[e].length===this.maxHeight}},{key:"onSwitchedMarks",value:function(e){var t=[this.opponentMark,this.mark];this.mark=t[0],this.opponentMark=t[1];var n=e(),a=[this.opponentMark,this.mark];return this.mark=a[0],this.opponentMark=a[1],n}},{key:"getAvailableColumns",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return this.columnsRange.filter((function(n){return!t.includes(n)&&e.board[n].length<e.maxHeight}))}}]),e}()),w=1,S=2,x=1,O=2,M={board:f.a.range(7).map((function(e){return[]})),boardColumns:7,boardRows:6},j=new C(Object(s.a)({},M,{opponentMark:2,aiMark:1,getAILevel:function(){return A.meta.first.level}})),E=new C(Object(s.a)({},M,{opponentMark:1,aiMark:2,getAILevel:function(){return A.meta.second.level},refs:{series:j.series,seriesByCell:j.seriesByCell}}));window.engine=E;var A={currentPlayer:x,gameMessage:"",width:M.boardColumns,height:M.boardRows,board:M.board,engineFirst:j,engineSecond:E,get meta(){return localStorage.meta?JSON.parse(localStorage.meta):{first:{type:S},second:{type:w,level:7}}},set meta(e){localStorage.meta=JSON.stringify(e)}},B=A,F=d.a.div.withConfig({displayName:"Board__BoardContainer",componentId:"i3xyz9-0"})(["width:calc(100% - ","px);height:calc( 100% - ","px - (",") );background-color:#7f7878;display:grid;grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(7,1fr);grid-row-gap:10px;grid-column-gap:10px;padding:","px;"],20,20,v.messageBoxHeightArithmetic,10),T=function(e){function t(){return Object(l.a)(this,t),Object(h.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.props,n=t.isGameOver,a=t.width,i=t.height,o=t.board,s=t.lastColumn;return r.a.createElement(F,null,f.a.rangeRight(i).map((function(e){return o.map((function(t){return function(e){var t=1===e?"red":"blue";return r.a.createElement("div",{key:f.a.random(1e9),style:{border:e?"0.9vw solid ".concat(t):"none",borderRadius:"100%",background:e?1===e?"radial-gradient(circle, red 60%,transparent 100%)":"radial-gradient(circle, blue 60%, violet 90%)":"gray"}})}(t[e])}))})).flat(),f.a.range(a).map((function(t){return e.button(t,n,s===t)})))}},{key:"button",value:function(e,t,n){var a=this.props,i=a.lastColor,o=a.availableColumns,s=a.onStep,u=a.humanTurn,l=function(){};return!t&&u&&o.includes(e)&&(l=function(){return s(e)}),r.a.createElement("button",{style:{borderRadius:"10px",background:t?"repeating-linear-gradient(45deg, black, ".concat(i," 100%)"):n?"repeating-linear-gradient(45deg, ".concat(i,", transparent 100%)"):"repeating-linear-gradient(45deg, black, transparent 100%)",color:"white",fontWeight:"bold",fontSize:"2.7vw"},key:e,onClick:l},e+1)}}]),t}(r.a.Component);var W=n(86),L=n(85),R=(n(152),[{value:S,label:"Human"},{value:w,label:"AI"}]);function I(e){var t=e.children;return r.a.createElement("div",{style:{minWidth:120}},t)}function H(e){var t=e.children;return r.a.createElement("div",{style:{minWidth:200,color:"black"}},t)}function P(e){var t=e.children;return r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},t)}function _(e){var t=e.data,n=e.turn,a=e.onChange,i=R.find((function(e){return e.value===t.type}));return r.a.createElement("div",{style:{textAlign:"left",padding:20,fontFamily:"arial"}},r.a.createElement(P,null,r.a.createElement(I,null,r.a.createElement("span",null,n+" Player:")),r.a.createElement(H,null,r.a.createElement(W.a,{value:i,onChange:function(e){return a({type:e.value,level:t.level||7})},options:R}))),i.value===w&&r.a.createElement("div",{style:{paddingTop:10}},r.a.createElement(P,null,r.a.createElement(I,null,r.a.createElement("label",null,"Level: ")),r.a.createElement(H,null,r.a.createElement(L.a,{min:1,max:12,value:t.level||7,dots:!0,onChange:function(e){return a({type:t.type,level:e})}})))))}var N=function(e){function t(e){var n;Object(l.a)(this,t);var a=(n=Object(h.a)(this,Object(m.a)(t).call(this,e))).props,r=a.first,i=a.second;return n.state={first:r,second:i},n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.first,a=t.second,i=this.props,o=i.onChange,u=void 0===o?function(){}:o,l=i.onRestart;return r.a.createElement("div",{style:{margin:20,backgroundColor:"#7f7878",display:"grid",gridTemplateColumns:"min-content",borderRadius:"30px",color:"white",fontWeight:"bold"}},r.a.createElement(_,{data:n,turn:"First",onChange:function(t){return e.setState(Object(s.a)({},e.state,{first:t}))&&u({first:t,second:a})}}),r.a.createElement(_,{data:a,turn:"Second",onChange:function(t){return e.setState(Object(s.a)({},e.state,{second:t}))&&u({first:n,second:t})}}),r.a.createElement("button",{style:{margin:20,paddingTop:10,paddingBottom:10,fontSize:25,fontFamily:"arial",fontWeight:"bold",color:"white",background:"repeating-linear-gradient(45deg, transparent, black, transparent 100%)",borderRadius:15},onClick:function(){return l(Object(s.a)({},e.state))}},"Restart"))}}]),t}(r.a.Component),G=d.a.div.withConfig({displayName:"AppStyledElements__PlayGameContianer",componentId:"tokfhg-0"})(["text-align:center;margin:auto;background-color:#282c34;min-height:100vh;max-height:100vh;min-width:100vw;display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;"]),z=d.a.div.withConfig({displayName:"AppStyledElements__MessageAndBoardContainer",componentId:"tokfhg-1"})(["width:",";height:calc("," + ",");min-width:",";min-height:calc("," + ",");max-width:",";max-height:calc("," + ",");padding:10px;"],"40vmax","40vmax",v.messageBoxHeightArithmetic,"300px","300px",v.messageBoxHeightArithmetic,"600px","600px",v.messageBoxHeightArithmetic),J=d.a.div.withConfig({displayName:"AppStyledElements__MessageBox",componentId:"tokfhg-2"})(["padding:10px 0;width:100%;font-size:calc(",");min-height:calc(",");"],v.messageBoxFontArithmetic,v.messageBoxHeightArithmetic),D=d.a.p.withConfig({displayName:"AppStyledElements__Message",componentId:"tokfhg-3"})(["margin:0 0;color:white;font-weight:bold;min-height:calc(",");"],v.messageBoxFontArithmetic),q=function(e){var t=B.board,n=B.engineFirst;e&&(t.forEach((function(e,t){return Object(u.a)(e).reverse().forEach((function(e){return n.removeFromColumn(t,e)}))})),e.forEach((function(e,t){return n.appendToColumn(e,t%2?2:1)}))),B.currentPlayer=e.length%2===0?x:O,Q().lastColumn=f.a.last(e)},U=function(){var e=K();return e.lost()||e.isTie()},V=function(e){var t=B.currentPlayer,n=B.meta;return t===x?n.first.type===e:n.second.type===e},$=function(){return 3-B.currentPlayer},K=function(){var e=B.currentPlayer,t=B.engineFirst,n=B.engineSecond;return e===x?t:n},Q=function(){var e=B.currentPlayer,t=B.engineFirst,n=B.engineSecond;return e===x?n:t},X=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={steps:window.location.pathname.split("").slice(1).map(parseFloat)},n.onStep=function(e){V(S)&&(K().appendToColumn(e,B.currentPlayer===x?1:2),B.gameMessage=""),B.currentPlayer=$(),n.appendState({steps:[].concat(Object(u.a)(n.state.steps),[e])})},n.onRestart=function(e){n.gameOver=!1,B.meta=e,B.gameMessage="",q([]),n.appendState({steps:[]})},window.onpopstate=function(e){e.state&&(q(e.state.steps),n.appendState({steps:e.state.steps}))},q(n.state.steps),n.gameOver=!1,n}return Object(p.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.checkAI()}},{key:"componentDidUpdate",value:function(){this.checkAI()}},{key:"checkAI",value:function(){var e=this;this.gameOver||(U()?(this.gameOver=!0,B.gameMessage=K().lost()?"Player ".concat($()," Won!"):"It's a Draw",this.appendState()):V(w)&&setTimeout((function(){!function(e){var t=K();t.takeStep(),B.gameMessage=t.message,e(t.lastColumn)}(e.onStep)}),100))}},{key:"appendState",value:function(e){f.a.get(e,"steps")&&!f.a.isEqual(e.steps,this.state.steps)&&t.updateWindowState(e.steps),this.setState(Object(s.a)({},this.state,{},e))}},{key:"render",value:function(){var e=this.state.steps,t=B.gameMessage,n=B.width,a=B.height,i=B.board,o=B.meta,s=B.currentPlayer,u=B.engineFirst,l=Q().lastColumn;return r.a.createElement(G,null,r.a.createElement(z,null,r.a.createElement(J,null,r.a.createElement(D,null,t)),r.a.createElement(T,{steps:e,onStep:this.onStep,meta:o,isGameOver:U(),width:n,height:a,board:i,lastColumn:l,lastColor:s===O?"red":"blue",availableColumns:u.getAvailableColumns(),humanTurn:V(S)})),r.a.createElement(N,{first:o.first,second:o.second,onRestart:this.onRestart}))}}],[{key:"updateWindowState",value:function(e){window.history.pushState({steps:e},"4 In a Row","/"+e.join(""))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(X,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},87:function(e,t,n){e.exports=n(153)},92:function(e,t,n){}},[[87,1,2]]]);
//# sourceMappingURL=main.8d26ee45.chunk.js.map