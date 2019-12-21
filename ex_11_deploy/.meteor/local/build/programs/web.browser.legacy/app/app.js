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
  document.querySelector('[name=test-text]').innerText = Meteor.settings.public.race + " , " + Meteor.settings.public.class + " ";
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