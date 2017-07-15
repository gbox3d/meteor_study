
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

Meteor.startup(function () {
  console.log('start app');

});

//서버측에서 발행안 내용에 대한 구독을 꼭 해주어야한다.
//미티어 전역에서 구독
Meteor.subscribe('msgLog/list');

Template.main.onCreated(function () {
  //탬플리트 단위로 구독
  //this.subscribe('msgLog/list');
  console.log(this)

});

Template.main.helpers({
  "msgLogSubcribe" : function () {
    return msgLog.find().fetch();
  }

});






