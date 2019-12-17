
Meteor.methods({
  "users/createUser"({username, password, profile, roles}) {

    try {

      let _id = Accounts.createUser({
        username: username,
        password: password
      });


      console.log(_id)
      Roles.addUsersToRoles(_id, roles)

      console.log(username,password,roles);

      return {err:false}

    }
    catch(e) {

      console.log(e.error)

      throw e

    }
  },
  "edit/user"({name,email}) {

    console.log(Meteor.userId())
    console.log(Meteor.user())
    console.log(this.userId)

    Meteor.users.update({
          _id: this.userId //현재 요청하는 아이디
        },
        {
          $set :  {
            "changeAt" : new Date(),
            "profile.name": name,
            "profile.email": email
          }
        });

    return {err: false,user : Meteor.user()}
  }


});

Meteor.publish('users/admin/userList/all', function() {

  if(Roles.userIsInRole(this.userId,["admin","developer"])) {
    console.log(`${this.userId}  acces all user `)
    return Meteor.users.find({});
  }
  else {
    throw Meteor.error;
    console.log('u not admin');
  }
});

//자신의 상세 정보 받아오기
Meteor.publish('users/userData', function() {

  return Meteor.users.find({_id:this.userId});
});


function createAdmin() {
  console.log('관리자를 생성합니다')
  var adminId = Accounts.createUser({
    username: "admin",
    password: "1234",
  });

  console.log(adminId);
  console.log("set the admin role to the admin account");
  Roles.addUsersToRoles(adminId, [ 'admin' ])
  console.log('admin 이 성공적으로 생성 되었습니다.');

}


Meteor.startup(()=> {
  console.log('start server');

  if(Meteor.users.find({username:'admin'}).count() > 0 ) {
    let admin = Meteor.users.find({username:'admin'}).fetch()[0]
    console.log('관리자가 생성되어 있습니다. ' + admin._id)
  }
  else {
    createAdmin();
  }
});