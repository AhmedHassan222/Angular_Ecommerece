import{a as D}from"./chunk-G5KA7DMQ.js";import{a as T}from"./chunk-LCHTYEEI.js";import{h as y}from"./chunk-KQV4JGGR.js";import{Ba as x,Ib as I,Jb as _,Kb as O,Pa as f,Qa as S,Ra as h,Sa as e,Ta as t,U as l,W as p,db as i,eb as o,ka as c,lb as v,pb as m,qa as a,qb as u,rb as E}from"./chunk-6QD3BH2K.js";function g(r,s){if(r&1&&(e(0,"tr")(1,"td"),i(2),m(3,"date"),t(),e(4,"td"),i(5),t(),e(6,"td"),i(7),t(),e(8,"td"),i(9),t(),e(10,"td"),i(11),m(12,"currency"),t(),e(13,"td"),i(14),t()()),r&2){let n=s.$implicit;a(2),o(u(3,6,n.paidAt)),a(3),o(n.id),a(2),o(n.isDelivered?"Delivered":"Pending"),a(2),o(n.paymentMethodType),a(2),o(E(12,8,n.totalOrderPrice,"EGP")),a(3),o(n.cartItems.length)}}function C(r,s){r&1&&(e(0,"h3",4),i(1,"No Orders!"),t())}var R=(()=>{class r{constructor(){this._OrderService=l(T),this._ToastrService=l(y),this._PLATFORM_ID=l(c),this.orders=x([])}ngOnInit(){if(O(this._PLATFORM_ID)){let n=D(localStorage.getItem("token"));this._OrderService.getAllOrders(n.id).subscribe({next:d=>{this.orders=d}})}}static{this.\u0275fac=function(d){return new(d||r)}}static{this.\u0275cmp=p({type:r,selectors:[["app-orders"]],standalone:!0,features:[v],decls:21,vars:1,consts:[[1,"section"],[1,"container-fluid"],[1,"table","overflow-x-auto","w-100","table-striped"],["scope","col"],[1,"h5","my-4"]],template:function(d,P){d&1&&(e(0,"section",0)(1,"div",1)(2,"table",2)(3,"thead")(4,"tr")(5,"th",3),i(6,"Data"),t(),e(7,"th",3),i(8,"ID"),t(),e(9,"th",3),i(10,"Status"),t(),e(11,"th",3),i(12,"Payment"),t(),e(13,"th",3),i(14,"Total"),t(),e(15,"th",3),i(16,"Items"),t()()(),e(17,"tbody"),S(18,g,15,11,"tr",null,f,!1,C,2,0,"h3",4),t()()()()),d&2&&(a(18),h(P.orders()))},dependencies:[I,_]})}}return r})();export{R as OrdersComponent};
