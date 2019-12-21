var require = meteorInstall({"client":{"index.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// client/index.js                                                   //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.startup(function () {
  console.log('start up');
  console.log(Meteor.settings);
  document.querySelector('[name=test-text]').innerText = "".concat(Meteor.settings.public.race, " , ").concat(Meteor.settings.public.class, " ");
});
///////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html"
  ]
});

var exports = require("/client/index.js");