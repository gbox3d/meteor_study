import {ReactiveVar} from "meteor/reactive-var";

import "./resetPasswd.html"

let recoverMsg = new ReactiveVar()

Template.resetPasswd.events({
  "click [name=change-pass]"(evt,instance) {

    let password = instance.find('[name=new-passwd]').value

    // 비밀번호 재발급
    Accounts.resetPassword(recoverMsg.get().token, password, function(err)
    {
      if(err)
      {
        console.log('패스워드 변경중 오류가 발생했습니다.')
        //Bert.alert( '패스워드 변경중 오류가 발생했습니다.'  , 'danger', 'growl-top-right' );
      }
      else
      {
        console.log('패스워드를 변경했습니다 ')
        //Bert.alert('패스워드를 변경했습니다 ', 'success', 'growl-top-right');
      }
    });

  }

})

Template.resetPasswd.helpers(
  {
    "recoverMsg"() {

      return recoverMsg.get();
    }
  }
)

FlowRouter.route( '/reset-password/:token', {
  name: 'reset password',
  action( params )
  {
    //window.resetPasswordVar = new ReactiveVar(params.token);

    BlazeLayout.render('layout',{
      layout : "resetPasswd"
    });


    recoverMsg.set({
      result : '인증토큰 전달',
      token : params.token
    })
    // FlowRouter.go( '/resetPasswd' );

  }
});
