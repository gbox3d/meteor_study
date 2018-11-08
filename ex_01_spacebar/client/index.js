rtVal = new ReactiveVar();

Meteor.startup(function () {
  rtVal.set("<h1> hi </h1>");

});

Template.main.onCreated( function () {

})


Template.main.events({
  'click .test1' (evt) {
    rtVal.set('<h2>hello</h2>');
    evt.preventDefault();
  }

});

Template.main.helpers({
  test_spacebars() {
    return rtVal.get();
  }

});