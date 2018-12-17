사용자 계정 처리
=====

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


gmail의 경우에는 다음과 같이 이메일 환경 변수 설정

```bash
MAIL_URL="smtps://이메일주소:패스워드@smtp.gmail.com:465/"
```


참고 :

https://medium.com/freeseamew/meteor-custom-account-%EA%B0%95%EC%A2%8C-2-fdbbb854db6e
https://docs.meteor.com/api/email.html

