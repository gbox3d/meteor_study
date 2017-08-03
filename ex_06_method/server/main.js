import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  "main/hello"({msg}){

    console.log(msg);

    return {err:false,msg : msg}

  }

})