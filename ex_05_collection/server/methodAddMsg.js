Meteor.methods({
  'msgLog/add' : function(obj) {
    obj.createdAt = new Date();
    MsgLog.insert(obj);
  }
});