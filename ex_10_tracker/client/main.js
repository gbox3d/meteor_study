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
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.info.onCreated(function () {
  this.className = new ReactiveVar('all');
  Tracker.autorun(()=> {
    console.log('tracker run ' + this.className.get())
    this.subscribe('msgLog/list',this.className.get())
  })
})

Template.info.events({
  'click #btn-animal'(event,instance) {
    instance.className.set('animal')

  },
  'click #btn-fruit'(event,instance) {
    instance.className.set('fruit')
  }
})

Template.info.helpers({
  "getLogs"() {
    return MsgLog.find()
  }
})