collection
==========
미티어의 콜랙숀 객체는 Mongo.Collection ,Meteor.Collection 두가지가 있다.   
콜랙숀은 DB와 동기화시켜주는 객체이다.

서버측에서 publish 하고 클라이언트 측에서 subcribe 한다.

먼저 콜렉숀을 선언한다.(일반적으로 콜랙숀에 대한 선언은 /lib/collections.js 에 둔다.)
```js
MsgLog = new Mongo.Collection('msgLog')
```

다음과 같이 서버측에서 콜렉숀을 발행한다.  
```js
//콜랙션 발간
Meteor.publish('msgLog/list',
    function ({_limit,skip}) {
      console.log(_limit)
      return MsgLog.find({

            createdAt : {$gt : new Date(moment('2018-10-29 09:00')) }

          },
          {
            sort : {
              createdAt : -1 // 최신것 부터 받아가기
            },
              limit:_limit, //갯수 지정
              skip : skip //건너뛰기
          })
    }
);
```

이와 같이 클라이언트측에서 구독한다. 첫번째인자는 구독이름 이고 두번째 인자는 구독에 넘겨줄 인자 오브잭트이다.
```js
handlerMsgLog = Meteor.subscribe('msgLog/list',{_limit:10})
```

템플리트 단위로 구독하려면 onCreated 에서 Meteor 대신 템플릿객체(this)를 쓴다.