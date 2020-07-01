var request = require("request");

var options = { method: 'GET',
  url: 'http://localhost:3000/audits/findAll',
 };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});



//-----------------------------------------------------------
var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:3000/audits/create',
  headers: 
   { 
     'content-type': 'application/json' },
  body: { clause_classification: 'admin', clause: 'clean' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


//--------------------------------------

var request = require("request");

var options = { method: 'POST',
  url: 'http://localhost:3000/audits/create',
  headers: 
   { 'postman-token': 'd67e4b15-abd9-0f87-cb4e-5df7bd3f52ea',
     'cache-control': 'no-cache' },
  body: ' { "clause_classification": "Hr",\n        "clause": "posh traing",\n        "yes": "yes",\n        "evidence_file_name": "puja",\n        "comments": "comments 2",\n        "fileAttachment":"fileAttachment",\n        "ext":"ext"\n        }' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
//-------------------------------------------
var request = require("request");

var options = { method: 'DELETE',
  url: 'http://localhost:3000/audits/delete/5e6a1af8ebf1971b4044704f',
  headers: 
   { 'postman-token': '6f14a482-ef62-7997-7c54-94d077240fee',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
