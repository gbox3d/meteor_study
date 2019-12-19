import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  // code to run on server at startup
  if(Meteor.users.find({username:'admin'}).count() > 0 ) {
    let admin = Meteor.users.find({username:'admin'}).fetch()[0]
    console.log('관리자가 생성되어 있습니다. id :' + admin._id)
  }
  else {
    console.log('관리자를 생성합니다')
    let adminId = Accounts.createUser({
      username: "admin",
      password: "1234",
    });

    console.log("set the admin role to the admin account");
    Roles.addUsersToRoles(adminId, [ 'admin' ])
    console.log('admin 이 성공적으로 생성 되었습니다.');
  }

  Accounts.config({
    sendVerificationEmail: true
  });

  //process.env.MAIL_URL="smtps://이메일주소:패스워드@smtp.gmail.com:465/";



});

Meteor.methods({
  "register"(inputUser) {
    // 회원가입 시작
    try
    {
      Accounts.createUser(inputUser);
    }
    catch (err)
    {
      throw err;
    }

  },
  // 가입 확인 메일 발송
  "sendVerificationLink"(user)
  {
    var userId = user;
    if ( userId ) {
      return Accounts.sendVerificationEmail( userId );
    }
  }


})

//이밴트 핸들러 지정
Accounts.onCreateUser(function (options, user) {

  console.log("create user ")
  console.log(user)
  console.log(options)

  user.profile = options.profile; // 이렇게 안해주면 profile이 없는 상태로 가입됨...


  Meteor.setTimeout(function() { // setTimeout을 걸어주지 않으면 메일 발송이 안됨

    Meteor.call('sendVerificationLink', user._id, function (err)
    {
      if (err)
      {
        throw error.reason;
      }
    });

  }, 2 * 1000);


  return user;  // 꼭 새 사용자 객체를 반환해야 함.(가이드에 나와있는 내용임)

});

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
};

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
