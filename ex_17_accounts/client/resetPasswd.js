import './resetPasswd.html'

Template.resetPasswd.events({
  "click button[name=send]"() {

    console.log('send')
  }
})

//라우터 세팅
FlowRouter.route('/resetPasswd', {
  name:'resetPasswd',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "resetPasswd"
    });
  }
});

