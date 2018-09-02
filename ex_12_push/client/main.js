import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

import '../lib/collection'

Template.main.onCreated(function () {

  //구독시작
  this.handler = this.subscribe('Ticker/core','tick');

  //구독한 값이 바뀔때 이밴트 처리 (서버 에서 날라온 푸쉬와 같은 작용)
  Ticker.find().observeChanges({

    changed(id,fileds) {

      console.log('observe change ' + id)
      console.log(fileds);
    }
  })

  console.log(this)

})

Template.main.helpers({
  "Ticker"() {
    //템플릿 접근은 {{Ticker.val}}
    return Ticker.findOne()
  }
})

Template.main.events({
  "click #btn-tick"(event,instance) {
    instance.handler.stop(); //기존것 구독해지
    instance.handler = instance.subscribe('Ticker/core','tick'); //새로구독
    console.log(instance)
  },
  "click #btn-tack"(event,instance) {
    instance.handler.stop(); //기존것 구독해지
    instance.handler = instance.subscribe('Ticker/core','tack'); //새로 구독
  },
})