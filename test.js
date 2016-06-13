"use strict";

const kladrApi = require("./");
const Kladr = new kladrApi();

let q = {query: 'Благ', contentType: 'city', withParent: 0};

Kladr.getData(q, (err, result)=>{
    if(err)
        console.error(err);
    else
        console.log(result);
});