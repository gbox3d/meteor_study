import { Meteor } from 'meteor/meteor';


import '../lib/collections'

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish("posts/push", function() {


  //return Posts.find({})


  Meteor.setInterval(()=> {

    //console.log(Random)

    console.log('add')



    this.added("Posts",Random.id(), {
      message: 'hi',
      createdAt: new Date()
    })


  },3000)


  this.ready();


});
