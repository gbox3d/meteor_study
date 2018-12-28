import './recoverPasswd.html'

Template.recoverPasswd.events({
  "click button[name=send]"(evt,instance) {

    evt.preventDefault()

    let email = (instance.find('input[name=email]').value).trim()

    console.log('send ' + email)

    Accounts.forgotPassword({email: email}, function(err)
    {
      if(err)
      {
        if(err.message == 'User not found [403]')
        {
          console.log(err.message);
          // showLoadingEffect.set(false);
          //Bert.alert( '해당메일로 가입자가 없습니다.' , 'danger', 'growl-top-right' );
        }
        else
        {
          console.log('오류로 메일 발송에 실패했습니다. 잠시후 다시 시도해주세요.')
          // showLoadingEffect.set(false);
          //Bert.alert( '오류로 메일 발송에 실패했습니다. 잠시후 다시 시도해주세요.' , 'danger', 'growl-top-right' );
        }
      }
      else
      {
        console.log('비밀번호 변경에 관한 메일을 발송했습니다.')
        // showLoadingEffect.set(false);
        //Bert.alert( '비밀번호 변경에 관한 메일을 발송했습니다.' , 'success', 'growl-top-right' );
      }
    });
  }
})

//라우터 세팅
FlowRouter.route('/recoverPasswd', {
  name:'recoverPasswd',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "recoverPasswd"
    });
  }
});


