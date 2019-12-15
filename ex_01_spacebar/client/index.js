import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './index.html'

let rtVal = new ReactiveVar();
let _iftest = new ReactiveVar();
let arrayTest = new ReactiveVar(['ios','android']);
let eachTest = new ReactiveVar([{name:'alpha'},{name:'beta'}])
let withTest = new ReactiveVar({name:'atholf',call:'123456'})

Meteor.startup(function () {
  rtVal.set("<h1> hi </h1>");
});



Template.main.onCreated( function () {

})


Template.main.events({
  'submit form[name=testform]' (evt,instance) {

    console.log(evt.target.testval.value)

    _iftest.set(evt.target.testval.value)
    rtVal.set(`<h2>${evt.target.testval.value}</h2>`);
    evt.preventDefault();
  },
  'click form[name=testform] [name=cancel]'(evt) {
    console.log(evt.target)
    evt.preventDefault();
  }

});

Template.main.helpers({
  "test_spacebars"() {
    return rtVal.get();
  },
  "getValue"(val_name) {
    if(val_name === "rtVal")
      return rtVal.get()
    else if(val_name === "_iftest")
      return _iftest.get();
  },
  "equalTo"(a,b) {
    return a === b
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