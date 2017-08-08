import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.subscribe('msgLog/list')
  let that = this;
  //https://docs.meteor.com/api/collections.html#Mongo-Cursor-observeChanges
  const cursor = MsgLog.find();
  const handle = cursor.observeChanges({
    added(id,fileds) {
      //서버쪽에서 추가하는 코드 : MsgLog.insert({text:'hello world'})
      console.log('observe add ' + id)
      that.counter.set(that.counter.get() + 1);

    },
    changed(id,fileds) {
      //MsgLog.update({_id:'xRrDwofPCwD8AZGjG'},{$set:{text:'hi'}})
      console.log('observe change ' + id)
    },
    removed(id) {
      //MsgLog.remove({})
      console.log('observe remove ' + id)
      that.counter.set(that.counter.get() - 1);
    }
  })


});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  "getMsgLogList" : function () {
    return MsgLog.find();
  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
