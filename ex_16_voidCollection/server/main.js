import { Meteor } from 'meteor/meteor';
// import '../lib/collections'

Meteor.startup(() => {
  // code to run on server at startup
});


let intervalHandler

Meteor.publish("posts/push", function() {

  //console.log(this)

  if(intervalHandler !== null) Meteor.clearInterval(intervalHandler)


  intervalHandler = Meteor.setInterval(()=> {
    //console.log(Random)
    console.log('add')

    this.added("Posts",Random.id(), {
      message: 'hi',
      createdAt: new Date()
    })


  },2000)

  this.ready();


});
