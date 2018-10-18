import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {BufferLoader} from "./lib/buffer-loader";

import './main.html';


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.msg = new ReactiveVar('stop');

  try {
    //context = new webkitAudioContext();
    // var context;
    // var bufferLoader;
    // var bufferList;
    // var gainNode;

    this.context = new AudioContext();
    this.msg.set( 'this browser support webkitAudioContext ');

    this.bufferLoader = new BufferLoader(this.context, [
        './sounds/katusha.mp3', './sounds/hit1.wav'],
       (_bufferList)=> {//로딩이 모두 완료 되면...
        this.msg.set( 'load ok' );
        // Create two sources and play them both together.
        this.bufferList = _bufferList;
      }
    );
    this.bufferLoader.load();
  }
  catch(e)
  {
    this.msg.set( e );
  }


});

Template.hello.helpers({
  // counter() {
  //   return Template.instance().counter.get();
  // },
  getMsg() {
    return Template.instance().msg.get()
  }
});

Template.hello.events({
  'click button.playbtn'(event, instance) {
    // increment the counter when button is clicked
    instance.msg.set('play');

    if(instance.soundSource === undefined) {
      let context = instance.context;

      if (!context.createGain)
        context.createGain = context.createGainNode;

      let source1 = context.createBufferSource();
      source1.buffer = instance.bufferList[0];

      let gainNode = context.createGain();
      source1.connect(gainNode);
      gainNode.connect(context.destination);

      //연주 끝나면..
      source1.onended = (evt)=> {
        console.log('end play');
      }

      source1.start();

      instance.soundSource = source1
      instance.gainNode = gainNode
    }
    else {
      console.log("now playing")

    }
  },
  "click button.stopbtn"(event,instance) {

    if(instance.soundSource !== undefined) {
      instance.soundSource.stop(0)
      instance.soundSource = undefined
    }


  }
});
