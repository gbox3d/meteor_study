# manage user

## 필요 모듈 설치 

```bash

meteor add accounts-password@1.5.1  
meteor add alanning:roles  

```

## 로그인처리 

로그인 
```js
Meteor.loginWithPassword(
            evt.target.id.value, evt.target.passwd.value,
            function (err) {
                if(err) {
                    alert(err.reason);
                }
                else {
                    alert(`${Meteor.userId()} login `);
                }
            });
```

로그아웃
```js
Meteor.logout()

```

## 로그인 정보 접근  

html 상에서 현재 유져 데이터 접근은 {{currentUser}} 로 할수 있다.  
클라이언트 측 스크립트상에서는 Meteor.userId(), Meteor.user() 로 접근 가능하다.      
그러나 사용자 데이터중 profile 만 접근가능하다.  모든 정보를 얻으려면 해당 콜랙션을 구독 시켜야 한다.    
```js
//자신의 상세 정보 받아오기
Meteor.publish('users/userData', function() {

  return Meteor.users.find({_id:this.userId});
});

```

````js
instance.subscribe("users/userData")
````

서버에서 특히 method 함수 안에서  this.userID 로 현재 클라이언트측에서 요청한 사용자의 아이디를 얻을수 있다.
이것은 요청 상대에 따라 그때그때 달라진다.
서버에서도 클라이언트 처럼  Meteor.userId(), Meteor.user() 역시 사용가능하다.
```js
Meteor.methods({
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
})

```