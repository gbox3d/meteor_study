## 라우터 사용하기

플로우라우터 설치
``` shell 
meteor add kadira:flow-router

``` 

lib/router.js 파일에서부터 시작된다.

``` js
FlowRouter.route('/', {
  name:'index',
  action: function () {
    BlazeLayout.render('layout',{
      layout : "index"
    });
  }
});

```

위코드의 의미는 라우터 / 는 이름이 index 이고 layout 템플릿에 랜더링하는데 index 탬플릿이 사용된다는 뜻이다.   