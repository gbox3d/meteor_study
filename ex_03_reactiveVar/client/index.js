import {Template} from "meteor/templating";
import {ReactiveVar} from 'meteor/reactive-var'

import './index.html'

const msg_rctVar = new ReactiveVar();
const msg_rctVar2 = new ReactiveVar();

const msg_nonReactiveVar = 'hello normal';

Template.main.onCreated(function () {
  msg_rctVar.set('hello reactive');
  msg_rctVar2.set('hi test2');
});


/*
리액티브변수가 바뀌면  해당 리액티브 변수를 사용하는 helpers 함수들이 모두 자동으로 재호출된다
msg_rctVar 가 내용이 바뀌면 output_msg, msg1 헬퍼함수가 모두 재호출된다.
msg_rctVar2 가 내용이 바뀌면 output_msg, msg2 헬퍼함수가 모두 재호출된다.
 */

Template.main.helpers({
  output_msg () {
    console.log('output_msg');
    let _r =  `${msg_rctVar.get()} + ${ msg_rctVar2.get()}`;
    return _r;
  },
  msg1 () {
    console.log(`test1 ${msg_rctVar.get()} changed`);
    return msg_rctVar.get();
  },
  msg2() {
    console.log(`test2  ${msg_rctVar2.get()} changed`);
    return msg_rctVar2.get();
  },
  output_msg_noReactive() {
    return msg_nonReactiveVar;
  }
});

Template.main.events({
  "click [name='test1'] button"(event,instance) {
    msg_rctVar.set( instance.find("[name='test1'] input").value );
  },
  "click [name='test2'] button"(event,instance) {
    msg_rctVar2.set( instance.find("[name='test2'] input").value );
  }
});


Meteor.startup(function () {
  console.log('meteor app now start..');
});
