import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  if(MsgLog.find().count() <= 0) {
    console.log('create data')

    MsgLog.insert({text:'melon',className:'fruit'})
    MsgLog.insert({text:'apple',className:'fruit'})
    MsgLog.insert({text:'grape',className:'fruit'})
    MsgLog.insert({text:'mango',className:'fruit'})
    MsgLog.insert({text:'berry',className:'fruit'})

    MsgLog.insert({text:'wolf',className:'animal'})
    MsgLog.insert({text:'lion',className:'animal'})
    MsgLog.insert({text:'tiger',className:'animal'})
    MsgLog.insert({text:'elephant',className:'animal'})
    MsgLog.insert({text:'zibra',className:'animal'})


  }
  else {
    console.log('data exist')
  }

});
