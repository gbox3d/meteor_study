## 배포

### 실행인자

미티어로 만든 어플리캐이션을 인자를 줘서 실행하고 싶으면 다음과 같이 한다.  

개발할때는 meteor 인자로  -s settings.json  을 넘겨준다.  
배포할때는 METEOR_SETTINGS 환경변수에 settings.json 내용을 넣어준다.
이렇게 넘겨준 값은 meteor.settings 로 접근할 수 있다.  


참고 : 
https://blog.meteor.com/the-meteor-chef-making-use-of-settings-json-3ed5be2d0bad   


빌드한 앱을 실행시키는 스크립트 예는 다음과 같다.  

```shell script
ROOT_URL=http://127.0.0.1 MAIL_URL=NULL PORT=3000 METEOR_SETTINGS='{"public" : {"race" : "human","class" : "wizardry"},"private" : {}}' node main.js

```

