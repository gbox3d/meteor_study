import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './createAcount.html'

//라우터 세팅
FlowRouter.route('/createAcount', {
  name:'register',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "createAcount"
    });
  }
});


Template.createAcount.events({
  'click #createForm button[name=ok]'(evt,instance) {

    let inputUser = {
      username: instance.find('input[name=userName]').value,
      email: instance.find('input[name=userEmail]').value,
      password: instance.find('input[name=userPasswd]').value,
      profile: {
        job: instance.find('input[name=userJob]').value
      }
    }

    //서버 함수 호출
    Meteor.call('register',inputUser,(err)=> {
      if(!err) {
        console.log('success')
        FlowRouter.go('/')
      }
      else {
        console.log(err)
      }

    })
    console.log(inputUser)
  }
})
