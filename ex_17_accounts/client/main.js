import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);

    //https://themeteorchef.com/tutorials/client-side-alerts-with-bert

    Bert.alert( 'Yes, I do Mind!', 'info');
  },
});


Template.accountTest.events({
  'click #createForm button[name=ok]'(evt,instance) {

    console.log('click ok')
    //
    // {
    //   username: inputUser.name,
    //     email: inputUser.email,
    //   password: inputUser.password,
    //   profile: {
    //   job : inputUser.profile.job
    // }
    // }

    var inputUser = {
      username: instance.find('input[name=userName]').value,
      email: instance.find('input[name=userEmail]').value,
      password: instance.find('input[name=userPasswd]').value,
      // passwordAgain: instance.find('input[name=userPasswd]').value,
      profile: {
        job: instance.find('input[name=userJob]').value
      }
    }

    Meteor.call('register',inputUser,(err)=> {
      if(!err) {
        console.log('success')
      }
      else {
        console.log(err)
      }

    })
    console.log(inputUser)
  },
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
  }
})

Template.accountTest.helpers({
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
      layout : "accountTest"
    });
  }
});

FlowRouter.route('/test', {
  name:'test',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "test"
    });
  }
});


var valifiedMsg = new ReactiveVar()


Template.emailValified.helpers(
  {
    "valifiedMsg"() {

      return valifiedMsg.get();
    }
  }
);

//이메일 인증 관련
FlowRouter.route( '/verify-email/:token', {
  name: 'verify-email',
  action( params ) {

    console.log(params.token)

    let _ins = BlazeLayout.render('layout',{
      layout : "emailValified"
    });

    valifiedMsg.set({
      result : '인증중..',
      token : params.token
    })


    Accounts.verifyEmail( params.token, ( error ) => {
      if ( error )
      {
        console.log( error.reason)
        valifiedMsg.set(
          {
            result : '이메일 인증에 실패했습니다. ' + error.reason,
            token : params.token
          }
        )
        //Bert.alert( error.reason, 'danger' );
      }
      else
      {
        console.log('이메일 인증에 성공했습니다.')
        valifiedMsg.set(
          {
            result : '이메일 인증에 성공했습니다.',
            token : params.token
          }
        )
        //FlowRouter.go( '/' );
        //Bert.alert( '이메일 인증에 성공했습니다.', 'success' );
      }
    });

  }
});