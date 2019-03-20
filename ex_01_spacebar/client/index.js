
import './index.html'

let rtVal = new ReactiveVar();
let arrayTest = new ReactiveVar(['ios','android']);
let eachTest = new ReactiveVar([{name:'alpha'},{name:'beta'}])
let withTest = new ReactiveVar({name:'atholf',call:'123456'})

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
  "test_spacebars"() {
    return rtVal.get();
  },
  "test_array"() {
    return arrayTest.get()
  },
  "eachTest"() {
    return eachTest.get()
  },
  "withTest"() {
    return withTest.get();
  }

});