import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import '../lib/collections'

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
  this.subPost = this.subscribe('posts/push')
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  "postData"() {
    return Posts.find({},
      {
        limit : 5,
        sort : {
          createdAt : -1
        }
      })

  }
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);


    // 콜랙숀 클리어
    instance.subPost.stop()

    instance.subPost = instance.subscribe('posts/push')


  },
});
