Meteor.publish('msgLog/list',
  function (className) {

    console.log(className)
    if(className == 'all') {
      return MsgLog.find({})

    }
    else {
      return MsgLog.find({
        className : className
      })
    }

  }
);