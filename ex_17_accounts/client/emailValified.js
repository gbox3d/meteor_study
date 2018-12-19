import {ReactiveVar} from "meteor/reactive-var";
import {Template} from "meteor/templating";

import './emailValified.html'

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