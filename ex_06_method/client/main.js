import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);

    //서버측 메써드를 호출한다.
    Meteor.call("main/hello",
      {msg:'click :' + instance.counter.get()},
      function (err,result) {
        console.log(err); //에러 여부( 에러가 없으면 undefined)
        console.log(result); //결과값

      });
  },
});
