Meteor.startup(function () {
  console.log('start app');

});

Template.main.onCreated(function () {

  console.log(this)
  console.log('blaze templete createed')

});

Template.main.helpers({

});
