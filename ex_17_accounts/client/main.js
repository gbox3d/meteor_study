import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './main.html'
import './layout.html'


import './createAcount'
import './emailValified'
import './resetPasswd'




Template.home.events({

  'click #loginForm button[name=login]'(evt,instance) {

    //로그인은 별도로 서버에서 구현할 필요가 없다. 미티어 기본 함수가 존재함.
    //클라이언트에서 함수로호출로 처리함
    Meteor.loginWithPassword(
      instance.find('#loginForm input[name=userName]').value,
      instance.find('#loginForm input[name=userPasswd]').value,
      (err)=> {
        if(!err) {
          console.log('success')
        }
        else {
          console.log(err)
        }
      }
    )
  },
  'click #loginForm button[name=logout]'() {
    Meteor.logout((err)=>{
      if(!err) {
        console.log('success')
      }
      else {
        console.log(err)
      }

    })
  },
  'click button[name=emailValified]'() {
    Meteor.call('sendVerificationLink',Meteor.userId(),(err,result)=> {
      if(!err) {
        console.log('success')
        console.log(result)
      }
      else {
        console.log(err)
      }

    })
  },
  "click button[name=register]"() {
    FlowRouter.go('/createAcount');
  },
  "click button[name=resetPasswd]"() {
    FlowRouter.go('/resetPasswd');
  }
})

Template.home.helpers({
  "verifiedUser"() {
    if(Meteor.user().emails)
      return Meteor.user().emails[0].verified
    return false
  }
})

//라우터 세팅
FlowRouter.route('/', {
  name:'index',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "home"
    });
  }
});

