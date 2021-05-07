'use strict';
var request = require('request');

module.exports = {
  metadata: () => ({
    name: 'complete.training.getByConfirmationCode',
    properties: {
      variable: {required: true,type: 'string'},
      hostAPI: {required: true,type: 'string'}
    },
    supportedActions: ['success', 'failure']
  }),
  invoke: (conversation, done) => {

    const { variable } = conversation.properties();
    const { hostAPI } = conversation.properties();
    let beginDate = new Date();

    let reqUrlgetRandomConfCodes = hostAPI + '/BaggageDemo/getRandomConfCodes' ;


    request(reqUrlgetRandomConfCodes, {json: true }, (err, res, body) => {
        let randomIdx = Math.floor( Math.random() * body.length );
        let confCode = body[randomIdx].confCode;
        let reqUrlgetByConfirmationCode = hostAPI + "/BaggageDemo/getByConfirmationCode?confNo=" + confCode;
    request(reqUrlgetRandomConfCodes, {json: true }, (err, res, body) => {
        let randomIdx = Math.floor( Math.random() * body.length );
        let confCode = body[randomIdx].confCode;
        let reqUrlgetByConfirmationCode = hostAPI + "/BaggageDemo/getByConfirmationCode?confNo=" + confCode;

        request(reqUrlgetByConfirmationCode, {json: true }, (err, res, body) => {
          let endDate = new Date();
          let result = {};
          result.query= {};
          result.query.confCode = confCode;
          result.query.reqUrl = reqUrlgetByConfirmationCode;
          result.query.beginDate = beginDate;
          result.query.endDate = endDate;
          result.answer = body;
          conversation
            .variable(variable,result)
            .variable("routing",body.routing)
            .variable("actions",body.actions)
            .transition('success');

          done();
    });
    });

  }
};
