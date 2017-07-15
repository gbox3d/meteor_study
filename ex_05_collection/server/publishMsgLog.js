Meteor.publish('msgLog/list',
  function () {
    return msgLog.find({})
  }
);