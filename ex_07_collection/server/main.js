
const moment = require('moment')

Meteor.startup(function () {

  console.log(Meteor.settings)

  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))



});

Meteor.publish('msgLog/list',
  function ({_limit}) {
  console.log(_limit)
    return MsgLog.find({},
      {
        sort : {
          createdAt : -1 // 최신것 부터 받아가기
        },
        limit:_limit //갯수 지정
      })
  }
);

Meteor.methods({
  'msgLog/add' : function(obj) {
    obj.createdAt = new Date();
    MsgLog.insert(obj);
  },
  'msgLog/remove' : function({_id}) {
    MsgLog.remove({_id:_id});
  },
  'msgLog/update' : function({_id,msg}) {
    console.log(_id)
    MsgLog.update({_id:_id},{
      $set : {
        msg : msg
      }
    });
  }
});



