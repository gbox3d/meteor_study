Void Collection
======

DB 커넥션없이 콜랙숀을 사용하는 예제  

MONGO_URL=NULL 로 설정 후
collection.js 를 클라이언트측에서만 임포트 시키고 서버측에서 는 임포트 시키지 말아야한다.


```js

Posts = new Mongo.Collection(
  'Posts'
)

```


