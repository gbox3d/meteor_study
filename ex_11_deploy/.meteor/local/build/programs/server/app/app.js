var require = meteorInstall({"server":{"main.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/main.js                                                    //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.startup(function () {
  console.log('start app');
  console.log(Meteor.settings);
});
///////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});

var exports = require("/server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiXSwibmFtZXMiOlsiTWV0ZW9yIiwic3RhcnR1cCIsImNvbnNvbGUiLCJsb2ciLCJzZXR0aW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsTUFBTSxDQUFDQyxPQUFQLENBQWUsWUFBWTtBQUV2QkMsU0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWjtBQUNBRCxTQUFPLENBQUNDLEdBQVIsQ0FBWUgsTUFBTSxDQUFDSSxRQUFuQjtBQUNILENBSkQsRSIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiTWV0ZW9yLnN0YXJ0dXAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc29sZS5sb2coJ3N0YXJ0IGFwcCcpXG4gICAgY29uc29sZS5sb2coTWV0ZW9yLnNldHRpbmdzKVxufSkiXX0=
