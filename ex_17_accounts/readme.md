사용자 계정 처리
=====

### 프로잭트 셋팅 
필요한 패키지 설치

```bash
meteor add accounts-password
meteor add alanning:roles

```

필요한 노드 모듈 설치
```bash
meteor npm install --save bcrypt
``` 

라우터 설치 
```bash
meteor add kadira:flow-router
meteor add kadira:blaze-layout
```


### 실행환경변수 설정법 

이메일 관련 기능을 사용하려면 사용할 이메일 계정 정보 실행시 환경 변수로 넘겨주어야한다.
gmail의 경우에는 다음과 같이 이메일 환경 변수 설정

```bash
MAIL_URL="smtps://이메일주소:패스워드@smtp.gmail.com:465/"
```
### 1 회원생성

계정에 대한 처리는 Account 객체를 사용한다.  

계정생성하기 예  
```js

let _Id = Accounts.createUser({
      username: "testman",
      password: "1122",
    })
//role 추가 
Roles.addUsersToRoles(_Id, [ 'king' ])

```  


### 2 이메일 인증받기

emailTemplates 의 verifyEmail가지고 서버측에서 인증메일 형식을 정의한다.
```js

//가입확인 메일 커스터 마이징
Accounts.emailTemplates.siteName = "account sample";
Accounts.emailTemplates.from     = "admin <admin@gmail.com>"; // 보내는 주소 정보
// 가입확인 메일
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "Meteor accounts 가입확인 메일";
  },
  text( user, url ) {

    let emailAddress   = user.username,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "메일아이디@gmail.com",
      emailBody      = `이메일 주소를 확인하려면 (${emailAddress}) 다음 링크를 방문하십시오. \n\n link: ${urlWithoutHash} \n\n 만약 확인을 요청하지 않은 경우, 이 이메일을 무시하십시오. 문제가 있다고 생각되면 다음 서비스 지원팀에 문의하십시오. \n\n 문의주소 : ${supportEmail}.`;

    console.log('mailUser');
    console.log(user);

    return emailBody;
  }
}

```

인증메일을 요청하는 sendVerificationEmail 함수는 클라이언트 측에서 호출한다.
```js
Accounts.sendVerificationEmail( 인증받을계정이름 )
```
다음과 같은 형식으로 인증 토큰을 받을 링크가 이메일로 보내진다.

```
/verify-email/:token
```
라우터에서 인증 토큰을 verifyEmail 로 받아내서 인증 처리를 완료해준다.
(emailValified.js )


```js
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
      }
    })

  }
})
```

#### 정리  

템플릿설정(서버) -> 인증메일 보내기 (클라이언트) -> 인증 토큰을 url 받아 처리하기 (클라이언트)

### 3 비밀번호 재설정

1. emailTemplates 의 resetPassword 가지고 서버측에서 비밀번호 변경 위한 이메일 템플릿을 정의 한다.  

```js

// 비밀번호 변경 메일
Accounts.emailTemplates.resetPassword = {
  subject() {
    return "Meteor accounts 비밀번호 변경 메일";
  },
  text( user, url ) {
    //let emailAddress   = user.emails[0].address,
    let username   = user.username,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "이메일 주소",
      emailBody      = `${username} 의 비밀번호 변경 을 원하시면 다음 링크를 클릭해주세요. \n\n link: ${urlWithoutHash} \n\n 만약 확인을 요청하지 않은 경우, 이 이메일을 무시하십시오. 문제가 있다고 생각되면 다음 서비스 지원팀에 문의하십시오. \n\n 문의 주소 : ${supportEmail}.`;

    console.log('mailUser');
    console.log(user);

    return emailBody;
  }
};

```

2. 패스워드 변경을 위한 메일을 요청한다. 

클라이언트 측에서 forgotPassword 에 email주소를 인자로 넘겨준다.
```js
Accounts.forgotPassword({email: email}, function(err)
    {
      if(err)
      {
        if(err.message == 'User not found [403]')
        {
          console.log(err.message);
        }
        else
        {
          console.log('오류로 메일 발송에 실패했습니다. 잠시후 다시 시도해주세요.')
        }
      }
      else
      {
        console.log('비밀번호 변경에 관한 메일을 발송했습니다.')
      }
   });
```

3. 패스워드 변경을 위한 토큰을 받는다  

토큰은 '/reset-password/:token' 으로 받는다.  
```js

FlowRouter.route( '/reset-password/:token', {
  name: 'reset password',
  action( params )
  {

    BlazeLayout.render('layout',{
      layout : "resetPasswd"
    });


    recoverMsg.set({
      result : '인증토큰 전달',
      token : params.token
    })

  }
})

```

4. 패스워드를 변경한다.

resetPassword 함수를 사용한다.  
```js

Template.resetPasswd.events({
  "click [name=change-pass]"(evt,instance) {

    //....

    // 비밀번호 재발급
    Accounts.resetPassword( '인증토큰' , '새로운 패스워드', function(err)
    {
      if(err)
      {
        console.log('패스워드 변경중 오류가 발생했습니다.')
      }
      else
      {
        console.log('패스워드를 변경했습니다 ')
      }
    })

  }

})
```


### 기타 사항 


현제로그인된 사용자얻기
```js
Meteor.user()
```

블레이즈 템플릿쪽에서 currentUser로 접근가능하다.  
```html
<div>{{currentUser.username}} 님 환영 해요. 당신 직업은 {{currentUser.profile.job}}</div>
```

모든 사용자 유져 정보 지우기

```js
Meteor.users.remove({})
```

특정 이메일을 가진 사용자 찾기
```js
Meteor.users.find({"emails.address":"gbox3d@gmail.com"}).fetch()

```




참고 :

https://medium.com/freeseamew/meteor-custom-account-%EA%B0%95%EC%A2%8C-2-fdbbb854db6e
https://docs.meteor.com/api/email.html

