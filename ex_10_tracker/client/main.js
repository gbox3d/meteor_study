import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


/*
이 예제는 정해진 클래스선택하면 그때마다 리스트를 갱신하는 예제이다.

 */

Template.info.onCreated(function () {

  //처음엔 all 로
  this.className = new ReactiveVar('all');


  //모든 리액티브 값들이 변화(set 호출)가 생기면 트랙커가 발동한다.(autorun 함수 호출)
  Tracker.autorun(()=> {

    //리액티브 변수값 확인
    console.log('tracker run ' + this.className.get())

    //리스트를 갱신하기 위하여 서버측의 publish 함수 다시 호출
    // 다시 구독하면( subscribe 재호출 ) 서버측의 publish 가 다시 호출된다.
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