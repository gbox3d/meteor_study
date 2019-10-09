//bootstrap 사용하기
import 'bootstrap/dist/js/bootstrap.bundle';

//async npm 사용하기
const async = require('async')
// import async from 'async'

import html2canvas from "html2canvas";

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);

  this.asyncTestMsg = new ReactiveVar('ready')

  async.waterfall([
      (next)=> {

        Meteor.setTimeout(()=> {
          next(null,"hi")

        },1000)

      },
      (arg1,next)=> {
        this.asyncTestMsg.set(arg1)
        Meteor.setTimeout(()=> {
          next(null,"async")
        },1000)
      }
    ],
    (err,_)=> {

      this.asyncTestMsg.set(_)

    })


  // console.log(html2canvas)

});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  asyncTestMsg() {
    return Template.instance().asyncTestMsg.get()

  }
});

Template.hello.events({
  'click button[name=count]'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
  'click button[name=scr-capture]'(event, instance) {
    html2canvas(document.body).then(_=> {
      console.log(_)
      let destCtx = document.querySelector('canvas[name=output]').getContext('2d');


//call its drawImage() function passing it the source canvas directly
      destCtx.drawImage(_, 0, 0,256,256);

    });

  }
});
