import { Meteor } from 'meteor/meteor';

import '../lib/collection'


Meteor.startup(() => {
  // code to run on server at startup

  if(Ticker.find({name : 'tick'}).count() == 0) {
    console.log('create data')

    Ticker.insert({name:'tick',val:0})
  }
  else {
    console.log(Ticker.find({name : 'tick'}).fetch() );
  }

  if(Ticker.find({name : 'tack'}).count() == 0) {
    console.log('create data')

    Ticker.insert({name:'tack',val:100})
  }
  else {
    console.log(Ticker.find({name : 'tack'}).fetch() );
  }



  function _loop() {


    let tick_cursor = Ticker.find({name:'tick'});
    Ticker.update({name:'tick'},{$set:{val:  tick_cursor.fetch()[0].val + 1 }})

    let tack_cursor = Ticker.find({name:'tack'});
    Ticker.update({name:'tack'},{$set:{val:  tack_cursor.fetch()[0].val + 1 }})


    Meteor.setTimeout(_loop,3000);

    //console.log(tick_cursor.fetch())
    //console.log(tack_cursor.fetch())

  }

  _loop()

});



Meteor.publish('Ticker/core', function (ticker_name) {
  return Ticker.find({name : ticker_name});
})
