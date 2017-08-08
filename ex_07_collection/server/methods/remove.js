Meteor.methods({
  'msgLog/remove' : function({_id}) {
    MsgLog.remove({_id:_id});
  }
});