import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

  console.log(Meteor.settings.test_msg)

});

Meteor.methods({
  "main/hello"({msg}){

    console.log(msg);

    return {err:false,msg : msg}

  }

})