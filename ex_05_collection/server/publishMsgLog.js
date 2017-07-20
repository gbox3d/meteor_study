Meteor.publish('msgLog/list',
  function () {
    return MsgLog.find({})
  }
);