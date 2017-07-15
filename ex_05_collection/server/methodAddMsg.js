Meteor.methods({
  'msgLog/add' : function(obj) {
    obj.createdAt = new Date();
    msgLog.insert(obj);
  }
});