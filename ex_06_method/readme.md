method and settings
========

실행시 settings.json의 내용을 읽어들이기위해서  

```
meteor run -s setting.json
```


아래처럼 작성한 내용을 코드에서 접근 가능하다.

```json

{
  "test_msg" : "hello"
}

```

코드에서 접근은  

```
Meteor.settings.test_msg
```
