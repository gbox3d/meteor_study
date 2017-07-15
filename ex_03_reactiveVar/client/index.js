msg_rctVar = new ReactiveVar();
msg_nonReactiveVar = 'hello normal';

Template.main.onCreated(function () {
  msg_rctVar.set('hello reactive');
});

//콘솔창을 열고 msg_rctVar.set('....') 해보고 변화를 관찰해본다.
//리액티브변수가 바뀌면 그값을 반환 했던 helpers 함수가 재호출된다
Template.main.helpers({
  output_msg () {
    console.log('check');
    return msg_rctVar.get();
  },
  output_msg_noReactive() {
    return msg_nonReactiveVar;
  }
});


Meteor.startup(function () {
  console.log('meteor app now start..');
});
