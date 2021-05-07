'use strict';
var request = require('request');


    let beginDate = new Date();

     request('https://aynudqfa4hjvcrxlz7z6aydqye.apigateway.eu-frankfurt-1.oci.customer-oci.com/BaggageDemo/getRandomConfCodes', {json: true }, (err, res, body) => {
        let randomIdx = Math.floor( Math.random() * body.length );
        let confCode = body[randomIdx].confCode;
        console.log('randomIdx:', randomIdx);
        console.log('lenght:', body.length);
        console.log('Response:', confCode);
        let reqUrl = "https://aynudqfa4hjvcrxlz7z6aydqye.apigateway.eu-frankfurt-1.oci.customer-oci.com/BaggageDemo/getByConfirmationCode?confNo=" + confCode;


        request(reqUrl, {json: true }, (err, res, body) => {
           let endDate = new Date();

          let result = {};
          result.query= {};
          result.query.confCode = confCode;
          result.query.reqUrl = reqUrl;
          result.query.beginDate = beginDate;
          result.query.endDate = endDate;

          result.answer =  Object.assign({}, body);; 

          console.log('url:', reqUrl);
          console.log('beginDate:', result.query.beginDate);
          console.log('endDate:',result.query.endDate);
          console.log('body:', body.routing );
          console.log('result:', result.answer.routing);

    });
    });

