import{Mb as s,O as o,U as n,Vb as e}from"./chunk-6QD3BH2K.js";var u=(()=>{class t{constructor(){this._HttpClient=n(s)}checkout(r,i){return this._HttpClient.post(`${e.baseUrl}/api/v1/orders/checkout-session/${i}?url=${e.frontUrl}`,{shippingAddress:r})}getAllOrders(r){return this._HttpClient.get(`${e.baseUrl}/api/v1/orders/user/${r}`)}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();export{u as a};
