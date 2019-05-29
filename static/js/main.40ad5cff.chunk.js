(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,a){},190:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(12),s=a.n(r),l=(a(99),a(100),a(101),a(92)),o=a(30),c=a(31),u=a(36),d=a(32),f=a(35),m=a(82),h=a.n(m),v=a(195),g=a(88),k=a(191),p=a(192),y=a(193),x=a(194),E=a(196),B=a(33),b=a.n(B),F=a(34),P=a.n(F),S=a(20),T=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(d.a)(t).call(this))).customTotal=function(e,t,a){return i.a.createElement("span",{className:"react-bootstrap-table-pagination-total"},"Showing ",e," to ",t," of ",a," Results")},e.cities=[{city:"MUMBAI",banks:[]},{city:"CHENNAI",banks:[]}],e.sizePerPageList=[{text:"5",value:5},{text:"10",value:10},{text:"20",value:20}],e.state={selectedCity:"Select City",filteredBanks:[],favouriteBanks:[]},e}return Object(f.a)(t,e),Object(c.a)(t,[{key:"filterBanksBasedOnPagination",value:function(e){var t=0+this.state.selectedPagination,a=e.slice(0,t);this.setState({filteredBanks:a})}},{key:"markFaviourites",value:function(e){var t=JSON.parse(localStorage.getItem("favouriteBanks"));t&&(this.setState({favouriteBanks:t}),this.state.favouriteBanks.map(function(t){e.map(function(e){e.ifsc===t.ifsc&&(e.favourite=!0)})}))}},{key:"getBanks",value:function(e){var t=this,a=this.cities.filter(function(t){return t.city===e})[0];0===a.banks.length?h.a.get("https://vast-shore-74260.herokuapp.com/banks?city="+e).then(function(e){t.markFaviourites(e.data),a.banks=e.data,t.setState({filteredBanks:e.data})}).catch(function(e){console.log(e)}):this.setState({filteredBanks:a.banks})}},{key:"handleSearchBoxChange",value:function(e){var t=this;if(console.log(e.target.keyCode),console.log(e.key),"Enter"===e.key){var a=e.target.value,n=this.cities.filter(function(e){return e.city===t.state.selectedCity})[0];if(n)if(""!==a){var i=n.banks.filter(function(e){var t=new RegExp(a,"i");return e.ifsc.match(t)});this.setState({filteredBanks:i})}else this.setState({filteredBanks:n.banks})}}},{key:"handleFavouriteChange",value:function(e){var t=this.state.filteredBanks.filter(function(t){return t.ifsc===e.target.value})[0];if(t.favourite=!t.favourite,console.log(t.favourite),t.favourite)this.state.favouriteBanks.push(t);else{var a=this.state.favouriteBanks.findIndex(function(t){return t.ifsc===e.target.value});console.log(a),console.log(e.target.value),this.state.favouriteBanks.splice(a,1)}console.log(this.state.favouriteBanks),localStorage.setItem("favouriteBanks",JSON.stringify(this.state.favouriteBanks));var n=Object(l.a)({},this.state);this.setState({tempState:n})}},{key:"handleDropdownChange",value:function(e){console.log(e),this.setState({selectedCity:e}),this.getBanks(e)}},{key:"renderCityOptions",value:function(){var e=this;return console.log(this.state),this.cities.map(function(t){return i.a.createElement(v.a.Item,{onSelect:function(t){return e.handleDropdownChange(t)},eventKey:t.city},t.city)})}},{key:"renderBanks",value:function(){var e=this;return this.state.filteredBanks.map(function(t){return i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement(g.a,{value:t.ifsc,variant:t.favourite?"primary":"outline-primary",onClick:function(t){return e.handleFavouriteChange(t)}},"Favourite")),i.a.createElement("td",null,t.bank_id),i.a.createElement("td",null,t.bank_name),i.a.createElement("td",null,t.ifsc),i.a.createElement("td",null,t.branch),i.a.createElement("td",null,t.address),i.a.createElement("td",null,t.city),i.a.createElement("td",null,t.district),i.a.createElement("td",null,t.state))})}},{key:"favouriteButton",value:function(e,t){var a=this;return i.a.createElement(g.a,{value:e.ifsc,variant:e.favourite?"primary":"outline-primary",onClick:function(e){return a.handleFavouriteChange(e)}},"Favourite")}},{key:"render",value:function(){var e=this,t={paginationSize:4,pageStartIndex:0,firstPageText:"First",prePageText:"Back",nextPageText:"Next",lastPageText:"Last",nextPageTitle:"First page",prePageTitle:"Pre page",firstPageTitle:"Next page",lastPageTitle:"Last page",showTotal:!0,paginationTotalRenderer:this.customTotal,sizePerPageList:this.sizePerPageList},a=[{dataField:"favourite",text:"Favourite",sort:!0,formatter:function(t,a,n){return e.favouriteButton(a,n)}},{dataField:"bank_id",text:"Bank ID",sort:!0},{dataField:"bank_name",text:"Bank Name",sort:!0},{dataField:"ifsc",text:"IFSC",sort:!0},{dataField:"branch",text:"Branch",sort:!0},{dataField:"address",text:"Address",sort:!0},{dataField:"city",text:"City",sort:!0},{dataField:"district",text:"District",sort:!0},{dataField:"state",text:"State",sort:!0}];return i.a.createElement(k.a,{className:"mt-5"},i.a.createElement(p.a,null,i.a.createElement(y.a,{lg:"2"},i.a.createElement(v.a,null,i.a.createElement(v.a.Toggle,{variant:"success",id:"city-dropdown"},this.state.selectedCity),i.a.createElement(v.a.Menu,null,this.renderCityOptions()))),i.a.createElement(y.a,{lg:"6"},i.a.createElement(x.a,{className:"mb-3"},i.a.createElement(E.a,{placeholder:"Search...","aria-label":"Search",onKeyPress:function(t){return e.handleSearchBoxChange(t)}}))),i.a.createElement(y.a,{lg:"4",className:"ml-0"},i.a.createElement(S.b,{to:"/favourite"},i.a.createElement(g.a,{variant:"outline-primary"},"Favourites")))),i.a.createElement(b.a,{keyField:"ifsc",data:this.state.filteredBanks,pagination:P()(t),columns:a}))}}]),t}(n.Component),C=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(d.a)(t).call(this))).customTotal=function(e,t,a){return i.a.createElement("span",{className:"react-bootstrap-table-pagination-total"},"Showing ",e," to ",t," of ",a," Results")},e.sizePerPageList=[{text:"5",value:5},{text:"10",value:10}],e.state={favouriteBanks:JSON.parse(localStorage.getItem("favouriteBanks"))},e}return Object(f.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e={paginationSize:4,pageStartIndex:0,firstPageText:"First",prePageText:"Back",nextPageText:"Next",lastPageText:"Last",nextPageTitle:"First page",prePageTitle:"Pre page",firstPageTitle:"Next page",lastPageTitle:"Last page",showTotal:!0,paginationTotalRenderer:this.customTotal,sizePerPageList:this.sizePerPageList};return i.a.createElement(k.a,{className:"mt-5"},i.a.createElement(p.a,null,i.a.createElement(y.a,null,i.a.createElement(S.b,{to:"/"},i.a.createElement(g.a,{variant:"outline-primary"},"Home")))),i.a.createElement(p.a,null,i.a.createElement(y.a,{className:"mt-3"},i.a.createElement(b.a,{keyField:"ifsc",data:this.state.favouriteBanks,pagination:P()(e),columns:[{dataField:"bank_id",text:"Bank ID",sort:!0},{dataField:"bank_name",text:"Bank Name",sort:!0},{dataField:"ifsc",text:"IFSC",sort:!0},{dataField:"branch",text:"Branch",sort:!0},{dataField:"address",text:"Address",sort:!0},{dataField:"city",text:"City",sort:!0},{dataField:"district",text:"District",sort:!0},{dataField:"state",text:"State",sort:!0}]}))))}}]),t}(n.Component),w=a(16);var N=function(){return i.a.createElement(S.a,{basename:"/BankSearch"},i.a.createElement("div",null,i.a.createElement(w.a,{exact:!0,path:"/",component:T}),i.a.createElement(w.a,{path:"/favourite",component:C})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},94:function(e,t,a){e.exports=a(190)},99:function(e,t,a){}},[[94,1,2]]]);
//# sourceMappingURL=main.40ad5cff.chunk.js.map