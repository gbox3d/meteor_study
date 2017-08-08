Meteor.methods({
  'msgLog/update' : function({_id,msg}) {
    //obj.createdAt = new Date();
    //MsgLog.insert(obj);
    console.log(_id)
    MsgLog.update({_id:_id},{
      $set : {
        msg : msg
      }
    });
    
  }
});