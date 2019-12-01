
import '../lib/collections'

// const moment = require('moment')
// import moment from 'moment'
//서버측에서 발행한 내용에 대한 구독을 꼭 해주어야한다.

import './index.html'

// let handlerMsgLog
Meteor.startup(function () {

  console.log('start app');
  //미티어 전역에서 구독

});


Template.main.onCreated(function () {
  //탬플리트 단위로 구독
  //this.subscribe('msgLog/list');
  this.handlerMsgLog = Meteor.subscribe('msgLog/list',{_limit:5});
  console.log(this)

  // console.log(moment().format())
  // console.log(moment().valueOf())
  // console.log(new Date(moment()))
  // console.log(moment().toISOString())

});

Template.main.helpers({
  "getMsgLogList" : function () {

    //collections.js 에서 MsgLog 선언된것을 사용함.
    //find, findone 만을 사용해야 리액티브가 발동한다. fetch를 사용하면 안된다.

    return MsgLog.find({},
        {
          sort : {
            createdAt : -1
          }
        });
  }

});

Template.main.events({
  "click .btn-update"(evt,instance) {
    //메씨지 수정창 보이
    console.log(instance);
    console.log(this);

    instance.$('.input-'+this._id).removeClass('hide')

    instance.$('.input-'+ this._id + ' input').val(this.msg)

  },
  "click .btn-update-ok"(evt,instance) {기

    //메씨지 수정
    console.log(instance);
    console.log(this);


    Meteor.call('msgLog/update',{
      _id : this._id,
      msg : instance.$('.input-'+ this._id + ' input').val()
    })
    instance.$('.input-'+this._id).addClass('hide')

  },
  "click .btn-del"(evt,instance) {
    //지우기
    console.log('del ' + this._id)
    Meteor.call('msgLog/remove',{_id:this._id});
  },
  "submit #addMsg"(evt,instance) {
    //메씨지 추가

    try {

      Meteor.call('msgLog/add',{msg : evt.target.msgText.value})

    }
    catch (e){
      console.log(e)
    }

    evt.preventDefault()

  },
  "submit #setLimit"(evt,instance) {
    console.log(evt.target.inputLimit.value)

    //구독취소
    instance.handlerMsgLog.stop()

    //범위 다시 지정하여 재구독
    instance.handlerMsgLog = Meteor.subscribe('msgLog/list', {
      _limit : parseInt(evt.target.Limit.value),
      skip : parseInt(evt.target.Skip.value)
    });

    evt.preventDefault()
  }

});







