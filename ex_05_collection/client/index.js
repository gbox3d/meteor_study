
Meteor.addMsgLog = function (name,msg) {

  const obj = {
    name : name,
    msg : msg
  };

  Meteor.call('msgLog/add', obj, function (err, result) {
    if (!err) {
      alert('success');
      //router.gotoPath('listOrder');
    }  else {

      alert(err);
    }
  });

}

//서버측에서 발행한 내용에 대한 구독을 꼭 해주어야한다.

Meteor.startup(function () {
  console.log('start app');
  //미티어 전역에서 구독
  Meteor.subscribe('msgLog/list');
});


Template.main.onCreated(function () {
  //탬플리트 단위로 구독
  //this.subscribe('msgLog/list');
  console.log(this)
});

Template.main.helpers({
  "getMsgLogList" : function () {
//collections.js 에서 MsgLog 선언된것을 사용함.
    //fetch를 사용하면 안된다.
    return MsgLog.find();
  }

});






