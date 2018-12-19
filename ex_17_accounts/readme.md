사용자 계정 처리
=====

### 프로잭트 셋팅 
필요한 패키지 설치

```bash
meteor add accounts-password
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



### 기타 사항 

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

