Void Collection
======

DB 커넥션없이 콜랙숀을 사용하는 예제  

```js

Posts = new Mongo.Collection(
  'Posts',
  {connection:null}
);


```
