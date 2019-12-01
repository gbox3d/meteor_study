
import '../lib/collections'

const moment = require('moment')

Meteor.startup(function () {

  console.log(Meteor.settings)

  console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

});

//콜랙션 발간
Meteor.publish('msgLog/list',
    function ({_limit,skip}) {
      console.log(_limit)
      return MsgLog.find({

            createdAt : {$gt : new Date(moment('2018-10-29 09:00')) }

          },
          {
            sort : {
              createdAt : -1 // 최신것 부터 받아가기
            },
              limit:_limit, //갯수 지정
              skip : skip
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



