Meteor.methods({
  'msgLog/add' : function(obj) {
    obj.createdAt = new Date();
    MsgLog.insert(obj);
  }
});

Meteor.methods({
  'msgLog/remove' : function({_id}) {
    MsgLog.remove({_id:_id});
  }
});

Meteor.methods({
  'msgLog/update' : function({_id,msg}) {
    console.log(_id)
    MsgLog.update({_id:_id},{
      $set : {
        msg : msg
      }
    });
  }
});

